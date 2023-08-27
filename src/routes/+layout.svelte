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

    let navbar_hidden = false
    let nav_width = "25%"
    let main_width = "75%"
    const toggle_navbar = () => {
        navbar_hidden = !navbar_hidden
    }

    $: if (navbar_hidden) {
        nav_width = "0%"
        main_width = "100%"
    } else {
        nav_width = "25%"
        main_width = "75%"
    }
</script>

<div>
    <nav style="--width:{nav_width};">
        {#each $nav_links as link}
            <a
                href={link.url}
                class:selected={link.selected}>
                {link.title}
            </a>
        {/each}
    </nav>
    <main style="--width:{main_width};">
        <div class="topbar">
            <button on:click={toggle_navbar}>
                <span class="material-symbols-outlined">
                    menu
                </span>
            </button>
        </div>

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
        width: var(--width);
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

    @media (hover: hover) and (pointer: fine) {
        a:hover {
            color: #CED4E3;
        }
    }

    .selected {
        color: #CED4E3
    }

    main {
        position: fixed;
        right: 0;
        top: 0;
        bottom: 0;
        width: var(--width);
        display: block;
        background-color: #2A423E;
        overflow-y: auto;
        margin: 0 0 0 25%;
    }

    .topbar {
        position: sticky;
        top: 0;
        background-color: #2A423E;
        width: 100%;
    }

    button {
        border: 0;
        background-color: #2A423E;
    }

    .material-symbols-outlined {
        color: white;
        padding: 0.5em;
        font-variation-settings:
            'FILL' 0,
            'wght' 700,
            'GRAD' 200,
            'opsz' 48
    }

    .material-symbols-outlined:active {
        color: black;
    }

    @media (hover: hover) and (pointer: fine) {
        .material-symbols-outlined:hover {
            color: black;
        }
    }
</style>