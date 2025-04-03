<script lang="ts">
    import Katex from 'svelte-katex'
    import Snippet from "$lib/components/Snippet.svelte";

    const title = "A type checking approach to workflow net soundness"
    const date_written = "3 April 2025"
    const est_read_time = -1
</script>

<main>
    <h1>
        {title}
    </h1>

    <p>{date_written} &bull; {est_read_time}-minute read</p>

    <p>
        In the last <a href="/petri-net-type-systems-correspondence#analog">entry</a>, we observe that
        basic building blocks of sound workflow nets can be given programming language analogs. A rough
        sketch of an algorithm was made that encodes workflow nets into some programming language
        source code, and in essence, code that fails to type check implies that the encoded net is
        unsound. The problem with the initial approach is that, although it is intuitive, it isn't
        rigorous. The language choice felt arbitrary, and making the source code type check as
        successfully as possible required destructuring of values with product or sum types. All these
        are based on experience: when you see a value that is of some sum type, you immediately
        pattern-match it to do work on the extracted value. We aren't interested in working with values,
        however, we only need to check the validity of types and assignments. I made a class 
        presentation on the initial approach and it contained the following slide:
    </p>

    <img src="/images/type-checking-wf-nets/needs-formalization.png" alt="Rule that needs formalization">

    <p>
        It's obvious that this workflow net is unsound due to the deadlock behavior caused by a binary
        function expecting two values of types that belong to the same sum type, but of course, only
        one value of one of the types can actually exist, making the binary function uncallable. This
        entry focuses on how rules such as this can be formalized, and others.
    </p>

    <p>
        Given the possible existence and adherence to ad hoc rules, we ditch the choice of some real
        programming language and design our own. This language will be imperative, simply-typed, and
        first-order. It is imperative so it can model arrows in workflow nets as assignments. It is
        simply-typed because there is no need for parametrized types. It is first-order because there's
        no need to have higher-order functions since workflow nets don't have a notion of 
        'transitions that are arguments or results to and from other transitions'. We will be
        specifying syntax and some core type rules in this entry.
    </p>

    <h2>
        Syntax
    </h2>

    <Katex displayMode>\alpha ::= T \;|\; \alpha_1 + \alpha_2 \;|\; \alpha_1 \times \alpha_2 \qquad \text{"(types)"}</Katex>
    <Katex displayMode>D ::= typedef\; T \;|\; fun\; F: \alpha \to \alpha' \qquad \text{"(declarations)"}</Katex>
    <Katex displayMode>A ::= var\; I_s: T_s = val() \;|\; var\; I: T = F(O) \qquad \text{"(assignments)"}</Katex>
    <Katex displayMode>O ::= I' \;|\; O_1 \times O_2 \qquad \text{"(objects)"}</Katex>
    <Katex displayMode>C ::= C_1;C_2 \;|\; D \;|\; A \qquad \text{"(commands)"}</Katex>

    <p>
        <Katex>T</Katex> represents atomic types. <Katex>I</Katex> and <Katex>F</Katex> are variable
        and function identifiers, respectively. Apostrophes indicate that two or more similar
        non-terminals must actually have different symbols in the concrete syntax. There is a special
        initial assignment <Katex>var\; I_s: T_s = val()</Katex> that corresponds to the starting
        place. Non-initial assignments have a function call on the RHS that allows for either one
        variable <Katex>I'</Katex> as argument, or a product construction of multiple objects
        <Katex>O_1 \times O_2 \times ... \times O_n</Katex>. This simplifies the type system by
        making all functions technically unary, and by making products out of multiple variables,
        an n-ary function can be emulated. Commands are either declarations or assignments.
        Declarations are either atomic type (symbol is just a string) or function declarations.
    </p>

    <p>
        Notice that some worklow net basics are not enforced by this abstract syntax. Looking at
        <Katex>\text{"(commands)"}</Katex>, a valid program can consist only of declarations, i.e.,
        places and transitions only, <em>no</em> arrows, or only of assignments, i.e., no places nor
        transitions, <em>only</em> arrows. We won't add more to the syntax just to enforce this
        because we assume that the workflow net to be encoded gets its basics right. Also, notice that
        types can take on mixed forms, e.g., <Katex>(A \times B) + C</Katex>. Again, we won't bother
        with modifying the syntax to enforce the segragation of product and sum types because input
        workflow nets naturally won't have such mixed types, that is, there is no transition whose
        left side, for example, contains both an AND-join and an OR-join.
    </p>

    <p>
        One thing that requires explanation, as it strays away from typical expectation found in PL
        research literature, is the syntax fragment for non-initial assignments: given that functions
        can have product or sum types as return types, why does the type of the variable
        <Katex>I</Katex> remain atomic (indicated by <Katex>T</Katex>)? Answering this segues the topic
        to those ad hoc rules mentioned in the introduction, but as prelude, we want things to be
        simple: one atomic type per place, and we type check function declarations and assignments
        instead.
    </p>

    <h2>
        Ad hoc type rules
    </h2>

    <p>
        These ad hoc type rules follow the question: if a function that returns a product type assigns
        its return value to a variable with an atomic type, how would it type check? In a normal
        programming language, doing something like <code>var i: B = some_value_BxC;</code> is illegal
        (assume that <code>some_value_BxC</code> has type <Katex>B \times C</Katex>), and for the
        program to type check successfully, <code>some_value_BxC</code> has to be destructured first
        to get the component of the correct intended type. In our language, we will forgo this
        destructuring to reduce clutter in the code and in the syntax design. There's also no need to
        infer which destructuring helper function (a.k.a. <em>projection function</em>) to use just to
        match the type of the variable (also, inference of such kind increases the complexity of this
        project). We can justify this decision by looking at the workflow net: when an AND-split
        transition fires, it produces two tokens and it <em>just knows</em> which place to put each in. This is
        done by arrows in a workflow net, and we can take advantage of this by re-interpreting arrows
        coming out of AND-splits as projection functions that know which component to get for
        assignment with the correct type.
    </p>

    <h3>
        Simplifying product types
    </h3>

    <p>
        We allow assignments of the form <Katex>var\; ident: T = function(obj)</Katex> where
        <Katex>function(obj)</Katex> returns a value of type
        <Katex>T_1 \times T_2 \times ... \times T_n</Katex> as long as <Katex>T</Katex> belongs to the
        set <Katex>\lbrace T_i | 1 \leq i \leq n \rbrace</Katex>. As for function calls, we use
        <Katex>\times</Katex> to make products out of multiple variables having the correct types
        that the function expects. For example, given <Katex>fun\; f: A \times B \to C</Katex> and
        variables <Katex>var\; a: A</Katex>, <Katex>var\; b: B</Katex>, <Katex>var\; c: C</Katex>,
        a valid function call (and assignment) is <Katex>var\; c: C = f(a \times b)</Katex>.
    </p>

    <h3>
        Simplifying sum types
    </h3>

    <p>
        Sum types are tricky to formalize in this project, much less simplify. The approach I present
        is the ninth idea I have tried thinking over for the past two weeks. We return to the slide
        that belonged in a presentation I held in class:
    </p>

    <img src="/images/type-checking-wf-nets/needs-formalization.png" alt="Rule that needs formalization">

    <p>
        There were several questions I asked myself here. How to restrict usage of a value whose type
        is a member of some sum type? Maybe incorporate substructural rules in the type system, making
        values affine (values can be used at most once)? This is already hard enough considering the
        research, learning and mastery needed, but the standard meaning of "affine" gets lost as well:
        it's not enough to restrict reuse of a value, but once a value of a certain type is used,
        other values, whose type belongs to a sum type that certain type belongs to, are forbidden from
        use, even if they have never been used before. This is some weird notion of affinity. What if
        we just do good ol' pattern matching? This is a worse nightmare because then now the syntax
        also has to deal with local scopes. Imagine a input workflow net with lots of OR- constructs:
        its encoding would have lots of nested scpoe. The problem with nested scpoe is that, eventually,
        a variable has to be used elsewhere, so the one-and-only global scope of the syntax has to be
        preserved.
    </p>

    <p>
        Eventually, I settled with adding a specific rule to the type system: only at most one atomic
        type member of a sum type can appear as input type per function. For example, if there exists
        a return type of <Katex>B + C</Katex> in some function, another function with input type
        signature of <Katex>B \times C</Katex> must fail the type check. This is the case for
        Situation B in the image above. Another example: if there exists a function with input type
        signature of <Katex>E \times F</Katex> and types <Katex>E</Katex> and <Katex>F</Katex> 
        belong to two different sum types, there is no problem.
    </p>

    <p>
        This rule, however, is not enough. Consider the image below, with the highlighted function
        of type <Katex>E \times F \to I</Katex>. According to the rule, this function is valid
        because types <Katex>E</Katex> and <Katex>F</Katex> belong to two different sum types
        <Katex>D + E</Katex> and <Katex>F + G</Katex>, respectively; however, the workflow net has
        a deadlock on places H, I, and J. No configuration of tokens in places D, E, F, and G can 
        produce a token each in H, I, and J.
    </p>

    <img src="/images/type-checking-wf-nets/counterexample.png" alt="Counterexample to the rule">

    <p>
        A different kind of check is needed here. Taking inspiration from workflow net semantics again:
        what does it mean when a place may or may not have a token in it? Can this be modeled somehow
        by type system ideas? The answer is yes, via nullable types. This can be made separate from the
        syntax of the language, but for places that are pointed to by OR-splits, their type can be
        interpreted as nullable, denoted by <Katex>T?</Katex>. More importantly, input types that are
        nullable are also "infectious", that is, functions with nullable input types must have nullable
        output types, too. Consider a unary transition: if it's possible that no token gets produced
        in its only input place, then it's easy to see that it may not produce a token to its
        only output place either. This can be generalized to transitions with AND- and OR-joins in
        their input sides.
    </p>

    <p>
        Once nullable type annotations are propagated, another encoding can now be done that produces
        Boolean formulas. Places with nullable types become atomic propositions; transitions become
        logical connectives AND, OR, and XOR (for places whose types belong to the same sum type, as
        there can only be one value allowed at a time among them). The idea of soundness now, on top
        of a successful type checking, is to also see if all Boolean assignments result to a
        tautology for the encoded Boolean formula. Conversely, if there is at least one Boolean
        assignment that results to false, we conclude that the encoded workflow net is unsound (even
        if the type check succeeds).
    </p>

    <img src="/images/type-checking-wf-nets/counterexample-nullable.png" alt="Counterexample to the rule - nullable">

    <p>
        Let's walk through the counterexample above annotated with nullable types now.
    </p>
    <p>K = H AND I AND J</p>
    <p>K = D AND (E AND F) AND G</p>
    <p>K = D AND E AND F AND G</p>
    <p>
        Remember that <Katex>D \oplus E</Katex> and <Katex>F \oplus G</Katex> by virtue of the
        OR-splits that produce them. Setting D and G to be true to set H and J to be true,
        respectively, makes E and F both false. Looking at the simplified formula for K above makes
        it evident that this formula will never be a tautology because of the XOR relationships. Even
        though the type check succeeds, this complementary check proves that this workflow net is
        unsound due to deadlock behavior.
    </p>

    <h2>
        Conclusion
    </h2>

    <p>
        In the effort of making a simple, custom language for encoding workflow nets for soundness
        check, we learned that OR- constructs cause most of the pain and complexity. Now we know
        that soundness in this scheme is two-fold: workflow nets encoded as source code in this custom
        language must pass both the type check and the tautology check to be considered sound.
    </p>

    <p>
        The next entry would focus on the full type system and an encoding algorithm that takes in
        some representation of  the input workflow net and produces code in the language introduced in
        this entry. A soundness theorem for the type system itself also needs to be proven and for
        that, a semantics of the language has to be specified as prerequisite. As usual, this semantics
        will be based largely on workflow new semantics.
    </p>

    <h4>
        References:
    </h4>

    <ul>
        <li><a href="http://lucacardelli.name/papers/typesystems.pdf" target="_blank">Cardelli, Luca. “Type Systems.” ACM Computing Surveys, vol. 28, no. 1, Mar. 1996, pp. 263–64.</a></li>
        <li>Van Der Aalst, W., & Van Hee, K. M. (2004). Workflow Management: Models, Methods, and Systems. MIT press.</li>
    </ul>
</main>

<style>
    main {
        color: #CED4E3;
    }
    main {
        padding: 2em 6em 3em 6em;
    }
    @media screen and (max-width: 768px) {
        main {
            padding: 1em 2em 1em 2em;
        }
    }

    p {
        text-align: start;
    }

    a {
        color: #CED4E3
    }

    a:hover {
        color: black;
    }

    img {
        max-width: 50%;
        height: auto; 
        display: block;
        margin: 0 auto;
    }

    @media screen and (max-width: 768px) {
        * {
            font-size: smaller;
        }
    }

</style>