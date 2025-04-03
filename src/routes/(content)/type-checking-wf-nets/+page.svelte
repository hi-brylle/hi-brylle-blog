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
        specifying syntax and type rules in this entry. The semantics can come in later as requirement
        for the soundness theorem.
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
        and function identifiers, respectively. There is a special initial assignment
        <Katex>var\; I_s: T_s = val()</Katex> that corresponds to the starting place. Non-initial
        assignments have a function call on the RHS that allows for either one variable
        <Katex>I'</Katex> as argument, or a product construction of multiple objects
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
        One thing that requires explanation, as it strays away from typical expectation of PL research
        literature, is the syntax for non-initial assignments: given that functions can have product
        or sum types as return types, why does the type of the variable <Katex>I</Katex> remain
        atomic, indicated by <Katex>T</Katex>? Answering this segues the topic to those ad hoc rules
        mentioned in the introduction, but as prelude, we want things to be simple: one atomic type
        per place, and we type check function declarations and assignments instead.
    </p>

    <h2>
        Conclusion
    </h2>

    <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At omnis aliquam, totam doloremque dicta dolores debitis consequuntur tempore illo aspernatur sequi vitae, cum accusamus accusantium. Odit similique veritatis animi deleniti.
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