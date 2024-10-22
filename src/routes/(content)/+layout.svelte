<script lang="ts">
    import { IconHome } from '@tabler/icons-svelte';

    let mouse_on_home = false
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
 <div>
    <aside>
        <h2>
            <p>
                <a href="/" title="back to home" 
                on:mouseover={() => { mouse_on_home = true }}
                on:mouseout={() => { mouse_on_home = false }}>
                    <IconHome class="icon-home" color={mouse_on_home ? "black" : "#CED4E3"}/>
                    Home
                </a>
            </p>
        </h2>
    </aside>
    <hr>
 </div>

<slot></slot>

<style>
    aside {
        margin: 0;
        padding: 0% 5%;
    }

    h2 {
        padding: 0;
        margin: 0;
        color: #CED4E3;
    }
    @media screen and (max-width: 768px) {
        h2 {
            font-size: small;
        }
    }

    hr {
        margin: 0% 5%;
    }

    a {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        color: #CED4E3;
        text-decoration: none;
    }

    a:hover {
        color: black;
    }

    p {
        color: #CED4E3;
    }

    :global(.icon-home) {
        /* border: solid red 1px; */
    }
</style>