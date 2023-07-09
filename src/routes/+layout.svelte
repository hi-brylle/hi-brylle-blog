<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    const links = [
        {url: "/about-this-blog", title: "What this blog is for"},
        {url: "/about-me", title: "About me"},
    ]

    onMount(() => {
        goto("/about-this-blog")
    })
</script>

<div>
    <nav>
        <aside>
            {#each links as link}
                <a href={link.url}>{link.title}</a>
            {/each}
        </aside>
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
    }

    aside {
        display: flex;
        flex-direction: column;
        margin: 8px 16px 8px 16px;
    }

    a {
        text-decoration: none;
        font-weight: bold;
        overflow-wrap: normal;
        margin: 8px 0px 8px 0px;
        color: #CED4E3;
        /* color: var(--text-color); */
    }

    a:hover {
        color: black;
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