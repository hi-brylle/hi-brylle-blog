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