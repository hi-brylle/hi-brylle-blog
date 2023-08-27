<script>
    import { page } from "$app/stores";
    import { links } from "$lib/link-store";
    import Gist from "$lib/components/Gist.svelte";

    const title = $links.get($page.url.pathname)
    const date_written = "28 July 2023"
    const read_time_est = "4-minute read"
</script>

<main>
    <h1>
        {title}
    </h1>

    <p>{date_written} &bull; {read_time_est}</p>

    <p>
        The usage of a Node.js <code>PassThrough</code> Stream is the key to tying together
        the pieces of the server-side push solution in this blog <a href="/serial-port-sveltekit-sse#solution" target="_blank">entry</a>.
        This, however, still feels constrained by the fact that SSEs need to reside in a GET endpoint. A question logically follows:
        is it possible for disparate parts of the server to fire off messages intended for dispatch by
        the client side without the client sending a message first, i.e, trigger server-side pushes from anywhere?
        I have implemented a solution in SvelteKit and again, the key here is the <code>PassThrough</code> Stream.
    </p>

    <h2>
        Solution
    </h2>

    <p>
        The server-side solution is obvious. Instantiate an exportable <code>PassThrough</code> Stream object somewhere
        and whenever there's some domain action that requires a server-side push, simply import this <code>PassThrough</code> object 
        to the call site and write data (the message) into it. A better design would be to encapsulate this Stream object in some class
        and write methods for writing into it, like in the following snippet.
    </p>

    <Gist
        gist_url="https://gist.github.com/hi-brylle/71fa6ec2239ad6b76aed3710da1fbb28"
        height={550}
    />

    <p>
        The SSE GET endpoint is simple. Just import the <code>PassThrough</code> Stream object here and attach an 
        <code>on.("data", ...)</code> handler for the <code>controller</code> to enqueue.
        Don't forget the <code>data:</code> prefix and the two newlines.
    </p>

    <Gist
        gist_url="https://gist.github.com/hi-brylle/a622019e3fa28f5d4cf83c546390a0f9"
        height={500}
    />

    <p>
        The client-side solution asks if it's possible to listen to the SSE endpoint and
        <em>dispatch the received messages regardless of the user's current location in the website.</em>
        I discovered that <strong>SvelteKit's <code>hooks.client</code> file is capable of doing this.</strong>
        This is where an <code>EventSource</code> would be constructed with the URL of the SSE GET endpoint
        as argument.
    </p>

    <Gist
        gist_url="https://gist.github.com/hi-brylle/35bb1036e13131358ec389cf4a49a7d3"
        height={350}
    />

    <p>
        The <code>hooks.client</code> file  is a special file in SvelteKit whose code,
        specifically client-side code, will run when the app starts up,
        so you can take advantage of Svelte's reactivity features here.
    </p>

    <h2>
        Improvements
    </h2>

    <p>
        To prevent bloating the <code>hooks.client</code> file,
        you can import a function here instead that handles all the different messages you receive
        from the SSE endpoint.
    </p>

    <p>
        The <code>message_stream</code> object is mutable, so instead of exposing it and then attaching 
        an <code>on.("data", ...)</code> handler to it, the class encapsulating it can instead have a 
        function that takes in a closure as argument that captures the <code>data</code> object written into
        <code>message_stream</code>.
    </p>

    <p>
        Unlike the <a href="/serial-port-sveltekit-sse#objective" target="_blank">entry</a> last time where the SSE 
        is busy sending data on short intervals, a more general, app-wide use of SSEs like this may lead to the SSE pushing 
        messages sparsely over time and may result to the disconnection of the client to the GET endpoint due to timeout.
        Prevent this by sending 'keep-alive' messages. This can simply be ":/n/n".
        Use <code>setInterval()</code> for this with interval set to as small as 15 seconds.
        This periodic code should live in SvelteKit's <code>hooks.server</code> file, the server-side 
        equivalent of the <code>hooks.client</code> file.
    </p>

</main>

<style>
    main {
        color: #CED4E3;
    }
    main {
        padding: 3.5em 7em 3.5em 7em;
    }
    @media screen and (max-width: 768px) {
        main {
            padding: 1em 2em 1em 2em;
        }
    }

    p {
        text-align: justify;
        text-justify: inter-word;
    }

    a {
        color: #CED4E3
    }

    a:hover {
        color: black;
    }
</style>