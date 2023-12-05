<script lang="ts">
    import { nav_links } from "$lib/link-store";
</script>

<div>
    <ul>
        {#each $nav_links as link}
            <li>
            <h1>
            <a
                href={link.url}
                class:selected={link.selected}>
                {link.title}
            </a>
            </h1>
            </li>
        {/each}
    </ul>
</div>

<style>

    div {
        height: 100vh;
        background-color: #2A423E;
    }

    ul {
        margin: 0;
        padding: 5%;
        list-style-type: none;
    }

    li {
        margin-bottom: 5%;
    }

    h1 {
        padding: 0;
        margin: 0;
    }

    a {
        color: #CED4E3;
        text-decoration: none;
    }

    a:hover {
        color: black;
    }
</style>
