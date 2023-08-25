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
        padding: 3.5em 7em 3.5em 7em;
        color: #CED4E3;
    }

    p {
        text-align: justify;
        text-justify: inter-word;
    }
</style>