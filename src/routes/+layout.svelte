<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    onMount(() => {
        goto("/about-this-blog")
    })
</script>

<div>
    <nav>
        <a href="/about-this-blog">What's this blog for?</a>
        <a href="/about-me">About me</a>
    </nav>
    <main>
        <slot></slot>
    </main>
</div>

<style>
    div {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
    }

    nav {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        background-color: aqua;
        width: 25%;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
    }

    main {
        position: fixed;
        right: 0;
        top: 0;
        bottom: 0;
        width: 75%;
        display: block;
        background-color: aquamarine;
        overflow-y: auto;
    }
</style>