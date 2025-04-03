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
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae eveniet natus temporibus, earum facilis dolorum id, adipisci inventore fugiat veniam numquam vero quos possimus repudiandae provident! Nam, minus? Eligendi, reiciendis!
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