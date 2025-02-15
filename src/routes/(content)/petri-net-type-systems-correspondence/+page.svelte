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
        This is an exploration of correspondences I observed in my first introduction to a formal tool
        called Petri nets (PNs) in a class I'm taking this semester and my (yet shallow) existing knowledge
        of type systems. There will be a primer on both topics for the uninitiated. The ultimate goal
        is to see if PNs can be encoded to programming language terms where the type checker can
        determine if the resulting source code is sound, and by extension, the PN, too, seeing that
        they're a formalization that requires soundness. A question arises: why not just use the
        techniques native to the field of Petri nets for checking their soundness? The answer is
        because this entry is actually related to a semester-long project in that class where we are
        allowed the freedom to explore PNs in relation to our own interests, and my interests lie in 
        programming languge theory and design (not to discount the entire field of PNs, of course).
    </p>

    <h2>
        A primer on Petri nets
    </h2>

    <p>
        A Petri net is a formal tool for analyzing business processes. A PN is a directed bipartite
        graph whose nodes are either <em>places</em> (drawn as circles) or <em>transitions</em>
        (drawn as rectangles). Since it's a bipartite graph, places can only go to transitions and
        transitions can only go to places. There is a starting place that contains one or more
        <em>tokens</em>. Tokens trigger the execution of the PN because transitions fire only when all
        the places that point toward it (called <em>input places</em>) have at least one token each.
        A transition fires by consuming tokens from its input places and produces tokens to all the
        places that it points toward to (called <em>output places</em>) and if those places connect to
        other transitions, they fire next. The execution ends when a token reaches a specially-marked
        end place.
    </p>

    <img src="/images/petri-net-type-systems/petri-nets-primer.png" alt="Petri nets primer">

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

    img {
        max-width: 50%;
        height: auto; 
        display: block;
        margin: 0 auto;
    }

    @media screen and (max-width: 768px) {
        * {
            font-size: smaller;
        }
    }

</style>