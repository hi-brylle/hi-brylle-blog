<script lang="ts">
    import { page } from "$app/stores";
    import { links } from "$lib/link-store";

    const {title, date_written, est_read_time} = $links.get($page.url.pathname)??{}
</script>

<main>
    <h1>
        {title}
    </h1>

    <p>{date_written} &bull; {est_read_time}-minute read</p>

    <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea enim porro a excepturi alias repellat, totam iste dolorem provident, illum error sint omnis ab assumenda possimus nulla minima, consequatur unde!
    </p>

    <h2>
        A primer on Petri nets
    </h2>

    <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis, neque numquam, vel at qui id, sit quidem harum quod dolores asperiores. Natus molestiae quam veniam voluptates delectus repellat, ullam dolores!
    </p>

    <h2>
        A primer on type systems
    </h2>

    <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto amet tenetur accusantium delectus beatae maxime tempore a unde facilis fugit numquam adipisci reiciendis autem, iste non quod porro eos et.
    </p>

    <h4>
        References:
    </h4>

    <ul>
        <li><a href="http://lucacardelli.name/papers/typesystems.pdf">Type Systems</a></li>
    </ul>
</main>

<style>
    main {
        color: #CED4E3;
    }
    main {
        padding: 2em 6em 3em 6em;
    }
    @media screen and (max-width: 768px) {
        main {
            padding: 1em 2em 1em 2em;
        }
    }

    p {
        text-align: start;
    }

    a {
        color: #CED4E3
    }

    a:hover {
        color: black;
    }

    @media screen and (max-width: 768px) {
        * {
            font-size: smaller;
        }
    }

</style>