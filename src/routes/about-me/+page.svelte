<script lang="ts">
    import { page } from "$app/stores";
    import { links } from "$lib/link-store";

    const title = $links.get($page.url.pathname)
</script>

<main>
    <h1>
        {title}
    </h1>

    <p>
        Hi, my name is Brylle. I'm currently taking a Master's in Computer Science
        at the University of the Philippines Diliman. My interests include
        domain-driven design, functional programming, compilers, lambda calculus, and type theory.
    </p>

    <p>
        Link to my <a href="/resume.pdf" target="_blank">resume</a>.
    </p>

    <p>
        (Link to my github to come soon)
    </p>
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

    @media screen and (max-width: 768px) {
        * {
            font-size: smaller;
        }
    }

</style>