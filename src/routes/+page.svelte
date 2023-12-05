<script lang="ts">
    import { nav_links } from "$lib/link-store";
</script>

<div>
    <ul>
        {#each $nav_links as link}
            <li>
            <h1>
                <a href={link.url}>{link.title}</a>
            </h1>
            {#if link.date_written != undefined}
                <p>{link.date_written} &bull; {link.est_read_time}-minute read</p>
            {/if}
            </li>
        {/each}
    </ul>
</div>

<style>

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

    p {
        color: #CED4E3;
    }
</style>
