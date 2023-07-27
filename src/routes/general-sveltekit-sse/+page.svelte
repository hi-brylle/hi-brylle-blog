<script>
    import Gist from "$lib/components/Gist.svelte";
    const date_written = "27 July 2023"
    const read_time_est = "X-minute read"
</script>

<main>
    <h1>
        Generalizing server-side push in SvelteKit using Server-Sent Events
    </h1>

    <p>{date_written} &bull; {read_time_est}</p>

    <p>
        The usage of a <code>PassThrough</code> Stream is the key to tying together
        the pieces of the server-side push solution in this blog <a href="/serial-port-sveltekit-sse#solution" target="_blank">entry</a>.
        This still feels constrained by the fact that SSEs need to reside in a GET endpoint. A question logically follows:
        is it possible for disparate parts of the server to fire off messages intended for dispatch by
        the client side without the client sending a message first, i.e, a triggered server-side push from anywhere?
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

    <p>
        The SSE GET endpoint is simple. Just import the <code>PassThrough</code> Stream object here and attach an 
        <code>on.("data", ...)</code> handler for the <code>controller</code> to enqueue.
        Don't forget the <code>data:</code> prefix and the two newlines.
    </p>

    <p>
        The client-side solution asks if it's possible to listen to the SSE endpoint and
        dispatch the received messages regardless of the user's current location in the website.
        I discovered that SvelteKit's <code>hooks.client</code> file is capable of doing this.
        This is where an <code>EventSource</code> would be constructed with the URL of the SSE GET endpoint
        as argument.
    </p>

</main>

<style>
    main {
        padding: 50px 100px 50px 100px;
        color: #CED4E3;
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