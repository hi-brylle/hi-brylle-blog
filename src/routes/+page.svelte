<script lang="ts">
    import { nav_links } from "$lib/link-store";
</script>

<div>

    <aside>
        <h2>
            Kumusta &#x1F44B
        </h2>
        <p>
            Hi, my name is Brylle. I'm currently taking a Master's in Computer Science
            at the University of the Philippines Diliman. This blog is a sort of documentation for my thoughts on things.
            I write mostly about software architecture, domain-driven design, functional programming, compilers, lambda calculus, and type theory.
        </p>
        <p>
            Resume <a href="/resume.pdf" target="_blank">here</a>.
            Github <a href="https://github.com/hi-brylle" target="_blank">here</a>.
        </p>
    </aside>

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
    aside {
        margin: 0;
        padding: 5%;
    }

    h2 {
        padding: 0;
        margin: 0;
        color: #CED4E3;
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

    p {
        color: #CED4E3;
    }
</style>
