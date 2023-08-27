<script lang="ts">
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';
    import { page } from "$app/stores";
    import { nav_links } from "$lib/link-store";

    inject({ mode: dev ? 'development' : 'production' });

    $: {
        $nav_links.forEach((link) => {
            link.selected = $page.url.pathname == link.url ? true : false
        })
        $nav_links = $nav_links
    }
</script>

<div>
    <nav>
        {#each $nav_links as link}
            <a
                href={link.url}
                class:selected={link.selected}>
                {link.title}
            </a>
        {/each}
    </nav>
    <main>
        <slot></slot>
    </main>
</div>

<style>
    div {
        display: flex;
    }

    nav {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        background-color: #3D625B;
        width: 25%;
        overflow-y: auto;
        margin: 0;
        display: flex;
        flex-direction: column;
    }

    a {
        text-decoration: none;
        font-weight: bold;
        overflow-wrap: normal;
        padding: 0.5em;
        color: black;
    }

    a:hover {
        color: #CED4E3;
    }

    .selected {
        color: #CED4E3
    }

    main {
        position: fixed;
        right: 0;
        top: 0;
        bottom: 0;
        width: 75%;
        display: block;
        background-color: #2A423E;
        overflow-y: auto;
        margin: 0 0 0 25%;
    }
</style>