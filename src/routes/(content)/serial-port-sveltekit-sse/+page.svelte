<script lang="ts">
    import Snippet from "$lib/components/Snippet.svelte";

    const title = "Architecting server-side push for Node SerialPort in SvelteKit using Server-Sent Events"
    const date_written = "13 July 2023"
    const est_read_time = 5
</script>

<main>
    <h1>
        {title}
    </h1>

    <p>{date_written} &bull; {est_read_time}-minute read</p>

    <p>
        At work, I am currently working on creating some control panel application for our IoT hardware.
        The requirements necessitate a lot of recurring tasks; overall, an I/O-bound application. I decided
        to use Node.js as the runtime for the backend for its event-loop-based asynchronicity
        and Svelte and SvelteKit for frontend and meta-framework, respectively. The use of the SerialPort library
        is for abstracting away the details of connecting to serial ports, in our case, ports connected to 
        our Arduino microcontrollers. For simplicity, this fullstack setup will have its Node backend be ran locally on a 
        Raspberry Pi that is connected to a touch-screen display.
    </p>

    <h2>
        A Svelte and SvelteKit crash course
    </h2>

    <p>Feel free to skip to the next section if you are already familiar with Svelte and SvelteKit's project structure.</p>

    <p>
        Svelte is a frontend framework for writing declarative and reactive UI.
        Sveltekit is a meta-framework built on top of Svelte for developing web applications.
        Its analog in React would be Next.js; in Vue, it would be Nuxt.js.
    </p>

    <p>
        Svelte has its own <code>.svelte</code> file type that either defines a page or a custom component.
        A <code>.svelte</code> file may contain a <code>script</code> tag for JavaScript or TypeScript,
        HTML and possibly other Svelte components, and a <code>style</code> tag for CSS.
    </p>

    <p>
        SvelteKit has a filesystem-based router. This means that the pages in a web app are described by
        the directories found in the codebase. In a barebones SvelteKit project, <code>src/routes</code>
        is the root route. It contains a single <code>+page.svelte</code> file. The <code>+page</code> name is 
        SvelteKit's convention for specifying a web page in the app. Since this lone <code>+page.svelte</code> file
        resides in the <code>src/routes</code> directory, it is the default web page shown when no other URL paths are specified. 
    </p>

    <p>
        More routes can be nested inside <code>src/routes</code>. Folder names correspond to URL paths and a <code>+page.svelte</code>
        inside a folder defines what UI and functionality that web page contains. So far, these are all about page endpoints.
        SvelteKit uses a different convention for defining standalone endpoints for making APIs.
    </p>

    <p>
        For standalone endpoints, SvelteKit expects a <code>+server.ts</code> or <code>+server.js</code> file inside a folder.
        Again, the folder name would be the URL path, but this time, the lone <code>+server</code> file inside contains the logic
        for HTTP Request-Response. As convention (but not required), standalone endpoints can be contained in a <code>src/routes/api</code> directory.
    </p>

    <h2 id="objective">
        Objective
    </h2>

    <p>
        I want to be able to push Arduino readings to the UI, in a sort of real-time data monitoring screen in the app.
        The SerialPort library handles the opening of the relevant port, the parsing of the bytestream, and the calling of a
        callback that delegates what to do with the data. The other ingredient here are Server-Sent Events.
        SSEs reside in a GET endpoint and allow servers to push data to the frontend without the frontend periodically asking for data 
        via normal HTTP Request-Response. A crucial technical detail to note here is that SSEs in SvelteKit are implemented using 
        <code>ReadableStream</code>.
    </p>

    <p>
        The challenge here is that the port cannot be simply opened (and closed) in a standalone <code>/src/route/api.../+server.ts</code> endpoint
        inside <code>ReadableStream</code> code. The port has other responsibilities, such as saving the readings to a local database and
        sending select readings to a different backend in our project's system. This port code then has to live in its own module.
    </p>

    <h2 id="solution">
        Solution
    </h2>

    <p>
        Originally, this functionality was implemented using WebSockets, but the WebSocket setup in SvelteKit is
        <a href="https://github.com/sveltejs/kit/issues/1491">hacky</a>, and it also felt overkill
        as the client didn't really need duplex communications with the backend.
    </p>

    <p>
        The solution became glaringly obvious once I revisited the ancient port code I wrote months ago.
        SerialPort ports are essentially Node <code>EventEmitter</code> and <code>Stream</code> under the hood.
        <strong>The solution then is to write the Arduino readings into a <code>Stream</code> and pass this <code>Stream</code>
        object to the SSE GET endpoint.</strong>
    </p>

    <p>
        This blog entry documents an example of how the relevant pieces of the solution can fit given the tech stack and constraints.
        The rest of this entry shows code samples. A note on notation: I use <code>...</code> to mean that there exist intermediate pieces
        of code in between the code that I actually show here.
    </p>

    <h2>
        The SerialPort library
    </h2>

    <Snippet highlighted_lines={[18]} code={
    `
    // port.ts

    import { SerialPort } from 'serialport'
    import { ReadlineParser } from 'serialport'
    import { PassThrough } from 'node:stream'

    const port = new SerialPort({
        path: "/dev/ttyACM_DEVICE0",
        baudRate: 9600,
        autoOpen: false
    })

    const parser = this.port.pipe(new ReadlineParser({
        delimiter: "\\r\\n",
        includeDelimiter: true
    }))

    export const stream = new PassThrough()

    ...

    this.parser.on("data", (data) => {
        this.stream.write(data)
    })

    ...
    `
    }/>

    <p>
        The <code>port</code> object abstracts the connection to the port connected to a microcontroller.
        The <code>parser</code> object abstracts the parsing of the bytestream read by the <code>port</code> object.
        The convention I and our IoT engineer agreed upon here is to use a carriage return and a newline per data reading entry,
        hence the usage of something called the <code>ReadlineParser</code>. The crucial solution piece here is the <code>stream</code> object. 
        It's a <code>PassThrough</code> stream that simply passes data written into it to its output with no transformations.
    </p>

    <h2>
        Server-Sent Event endpoint
    </h2>

    <Snippet highlighted_lines={[11, 12, 13]} code={
    `
    // +server.ts
    // This file resides in /routes/api/sse-endpoint/

    import port from "$lib/../../port"
    import type { RequestHandler } from "@sveltejs/kit"

    export const GET = (async ({ request }) => {
        const stream = new ReadableStream({
            start(controller) {
                /** Initializations here */
                port.stream.on("data", (data) => {
                    controller.enqueue(\`data:\$\{data\}\\n\\n\`)
                })
            },
            cancel() {
                /** Cleanup here */
            }
        })
        return new Response(stream, {
            headers: {
                "Content-Type": "text/event-stream",
            }
        })
    }) satisfies RequestHandler
    `
    }/>

    <p>
        This is how standalone SSE endpoints are written in SvelteKit. It is a GET verb that returns a <code>Response</code> that must contain
        some <code>ReadableStream</code> with content type set to <code>text/event-stream</code>. Line 12 contains the crucial solution piece, 
        which is the <code>stream</code> object exported from the port code. This is the part where what's written into it shall be read to be eventually sent to the client,
        using the <code>.on("data", ...)</code> handler. Line 13 shows that it is mandatory in SSEs for the payload to be prefixed by
        <code>data:</code> and to be suffixed by two newlines.
    </p>

    <h2>
        The client-side
    </h2>

    <Snippet code={
    `
    // +page.svelte

    <script lang=\"ts\">
        const subscribe_to_realtime = () => {
            const sse = new EventSource("/api/sse-endpoint")
            sse.onmessage = (event: any) => {
                    const payload = JSON.parse(event.data);
                    /** Now do whatever with this payload */
                }
            }
            return () => { sse.close() }
        }

        ...
        
        onMount(() => {
            
            ...

            const unsub_on_leave = subscribe_to_realtime()
            return unsub_on_leave
        })
    <\/script>

    ...

    html here

    ...
    `    
    }/>

    <p>
        An <code>EventSource</code> object must be constructed with the URL path argument set to the path of the SSE GET endpoint.
        This code resides in some <code>+page.svelte</code> file which means it shows UI. Whenever the user navigates into this page,
        the Arduino data ends up here. When they leave, the resources are cleaned up. The <code>onMount()</code> code handles all these cleanup
        but its explanation is out of the scope of this entry so just look up its <a href="https://svelte.dev/docs/svelte#onmount">documentation</a>.
    </p>
    
    <h4>
        References:
    </h4>

    <ul>
        <li><a href="https://serialport.io">Node SerialPort</a></li>
        <li><a href="https://nodejs.org/api/stream.html">Node Stream Docs</a></li>
        <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events">Server-Sent Events</a></li>
        <li><a href="https://svelte.dev/docs/introduction">Svelte Docs</a></li>
        <li><a href="https://kit.svelte.dev/docs/introduction">SvelteKit Docs</a></li>
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