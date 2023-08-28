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
        This blog contains my thoughts on various things.
        These things include functional programming, software architecture, and compilers.
        Those are the categories I want to be in this blog, but I'd probably
        fill it more with game or book reviews, silly web applications, new interests and associated learning journeys,
        and life updates nobody cares about.
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

    @media screen and (max-width: 768px) {
        * {
            font-size: smaller;
        }
    }

</style>