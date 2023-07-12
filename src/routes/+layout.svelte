<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    let links = [
        {url: "/about-this-blog", title: "What this blog is for", selected: true},
        {url: "/about-me", title: "About me", selected: false},
        {url: "/serial-port-sveltekit-sse", title: "Architecting server-side push for Node SerialPort in SvelteKit using Server-Sent Events"}
    ]

    const on_link_clicked = (url: string) => {
        links.forEach((link) => {
            link.selected = url == link.url ? true : false
        })
        links = links
    }

    onMount(() => {
        goto("/about-this-blog")
    })
</script>

<div>
    <nav>
        <aside>
            {#each links as link}
                <a
                    href={link.url}
                    on:click={() => { on_link_clicked(link.url) }}
                    style="--text-color: { link.selected ? "#CED4E3" : "black" }">
                    {link.title}
                </a>
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
        color: var(--text-color);
    }

    a:hover {
        color: #CED4E3;
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