<script lang="ts">
    import { page } from "$app/stores";
    import { links } from "$lib/link-store";
    import Katex from 'svelte-katex'

    const {title, date_written, est_read_time} = $links.get($page.url.pathname)??{}
</script>

<main>
    <h1>
        {title}
    </h1>

    <p>{date_written} &bull; {est_read_time}-minute read</p>

    <p>
        This is an exploration of correspondences I observed in my first introduction to a formal tool
        called Petri nets (PNs) in a class I'm taking this semester and my (yet shallow) existing knowledge
        of type systems. There will be a primer on both topics for the uninitiated. The ultimate goal
        is to see if PNs can be encoded to programming language terms where the type checker can
        determine if the resulting source code is sound, and by extension, the PN, too, seeing that
        they're a formalization that requires soundness. A question arises: why not just use the
        techniques native to the field of Petri nets for checking their soundness? The answer is
        because this entry is actually related to a semester-long project in that class where we are
        allowed the freedom to explore PNs in relation to our own interests, and my interests lie in 
        programming languge theory and design (not to discount the entire field of PNs, of course).
    </p>

    <h2>
        A primer on Petri nets
    </h2>

    <p>
        A Petri net is a formal tool for analyzing business processes. A PN is a directed bipartite
        graph whose nodes are either <em>places</em> (drawn as circles) or <em>transitions</em>
        (drawn as rectangles). Since it's a bipartite graph, places can only go to transitions and
        transitions can only go to places. There is a starting place that contains one or more
        <em>tokens</em>. Tokens trigger the execution of the PN because transitions fire only when all
        the places that point toward it (called <em>input places</em>) have at least one token each.
        A transition fires by consuming tokens from its input places and produces tokens to all the
        places that it points toward to (called <em>output places</em>) and if those places connect to
        other transitions, they fire next. The execution ends when a token reaches a place that marks
        the end of the process being modeled. For example, the Petri net below models the process for
        handling insurance claims.
    </p>

    <img src="/images/petri-net-type-systems/petri-nets-primer.png" alt="Petri nets primer">

    <h2>
        A primer on type systems
    </h2>

    <p>
        Type systems are systems consisting of rules for how terms in a programming language such as
        variables, values, function call results are assigned with something a called a <em>type</em>,
        which restricts what kind of operations can be applied to those terms. Type systems can be
        informal but we'll be taking a quick look at formal type systems in this entry but I'll refer
        to them simply as type systems for brevity.

        Type systems are formalized using natural deduction notation like the following:
    </p>

    <Katex displayMode>\Gamma \vdash String \qquad \Gamma \vdash Number \over \Gamma \vdash String \to Number</Katex>

    <p>
        This is a type rule that says: "If type String and type Number are valid in some typing
        environment, an arrow type from String to Number is valid". Arrow types are the types assigned
        to functions, in this case, say, a function for computing the length of a string: it takes a
        String parameter and outputs a Number result. 
    </p>

    <p>
        A <em>typing environment</em> can be thought of as an object containing key-value pairs of
        terms and their types in a scope. It is denoted by <Katex>\Gamma</Katex> (gamma). The turnstile
        (<Katex>\vdash</Katex>) separates the assumptions in the typing environment from the assertions
        to the right of it. Altogether, a statement of the form <Katex>\Gamma \vdash \zeta</Katex>
        forms a <em>judgment</em>. In the judgment <Katex>\empty \vdash true: Boolean</Katex>, the
        typing environment can be empty, and this is read as "the term <em>true</em> has type
        <em>Boolean</em>" (it is assumed that the term <em>true</em> is a built-in constant in the
        programming language and thus doesn't need a typing environment).
    </p>

    <p>
        Type rules can have zero or more judgments above the horizontal line (<em>premises</em>) and
        only one judgment below (the <em>conclusion</em>). A type rule with no premises is an
        <em>axiom</em>, like the following which says that an empty typing environment is valid:
    </p>

    <Katex displayMode> \over \empty \vdash \diamond</Katex>

    <h2>
        Analogs between Petri nets and programming languages
    </h2>

    <p>
        A transition in a PN consumes tokens from its input places and produces tokens in its output
        places. This corresponds to function calls in programming languages with the restriction that
        the function must have at least one arity and it must have a result. This implies that the Unit
        type (also known as the Void or Null type) cannot be a valid type if we are to encode PNs to a
        programming language.
    </p>

    <p>
        Tokens in a PN inhabit places during execution. Tokens can be thought of as terms in some 
        programming language and places can have associated types mapped to them. Tokens don't
        'move' during a PN's execution but are rather consumed and produced. We can then think of
        a place as a variable that is assigned a value by the result of a function call (in PN terms:
        after a firing has occurred).
    </p>

    <p>
        PN transition semantics also imply that once a variable is consumed (in PL terms: supplied as
        argument in a function call), it can no longer be used for other transitions. Terms can often
        be reused in programming languages, e.g., a file descriptor being used for reading and writing
        to a file multiple times, but there are programming languages such as Rust that only allow the
        usage of a term at most once. 
    </p>

    <p>
        In PNs, assuming it starts with just one token, a place may house a token at most once per
        process because there might be cases where a transition doesn't produce a token at an output
        place. This feature of PNs correspond to programming languages like Rust with something called
        <em>affine type systems</em> that allow usage of terms at most once. (I have not looked deeply
        into affine type systems as this realization just occurred to me while writing this but I'm
        sure to get into it as this project progresses).
    </p>

    <h2>
        Sound Petri net constructs
    </h2>

    <p>
        A sound Petri net is a called <em>Workflow net</em> (WN). WNs are PNs with only one
        <em>start</em> input place and only one <em>end</em> output place. WNs themselves can still
        have errors, so for guaranteeing soundness, it has to fulfill three requirements. (1) For each
        token at start, exactly one token must be produced at the end (implies a case eventually
        completes). (2) If a token is produced at the end, all other places are empty (implies no
        unfinished tasks). And finally (3), all transitions are able to fire starting from the initial
        configuration (one token at start) (implies no redundant tasks that never fire).
    </p>

    <p>
        This entry will talk about the constructive way of checking for soundness of nets. It's possible
        to produce a sound net from basic building blocks that are themselves sound. This is taken form
        the book of Kees Van Hee and Wil van der Aalst titled "Workflow Management: Models, Methods,
        and Systems (Cooperative Information Systems)".
    </p>

    <img src="/images/petri-net-type-systems/sound-nets.png" alt="Sound nets">

    <h4>
        References:
    </h4>

    <ul>
        <li><a href="http://lucacardelli.name/papers/typesystems.pdf">Type Systems</a></li>
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