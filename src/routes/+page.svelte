<script lang="ts">
    import { nav_links } from "$lib/link-store";
    import { IconBrandGithub  } from '@tabler/icons-svelte';
    import { IconFileCertificate  } from '@tabler/icons-svelte';

    let mouse_on_resume = false
    let mouse_on_github = false
</script>

<div>
    <aside>
        <h2>
            Kumusta &#x1F44B
        </h2>
        <p>
            Hi, my name is Brylle. I'm currently taking a Master's in Computer Science
            at the University of the Philippines Diliman. This blog is a sort of documentation for my thoughts on things.
            I write mostly about software architecture, domain-driven design, functional programming. (I wish to write soon about compilers, lambda calculus, and type theory).
        </p>
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        <p>
            <a href="/resume.pdf" title="hire me" target="_blank"
            on:mouseover={() => { mouse_on_resume = true }}
            on:mouseout={() => { mouse_on_resume = false }}>
                <IconFileCertificate color={mouse_on_resume ? "black" : "#CED4E3"}/>
            </a>
            <a href="https://github.com/hi-brylle" title="see my projects" target="_blank"
            on:mouseover={() => { mouse_on_github = true }}
            on:mouseout={() => { mouse_on_github = false }}>
                <IconBrandGithub color={mouse_on_github ? "black" : "#CED4E3"}/>
            </a>
        </p>
    </aside>

    <hr>

    <ul>
        {#each $nav_links as link}
            <li>
            <h1>
                <a href={link.url}>{link.title}</a>
            </h1>
            <p>{link.date_written} &bull; {link.est_read_time}-minute read</p>
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

    hr {
        margin: 0% 5%;
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
