<script>
    import Gist from "../../lib/components/Gist.svelte";

    
</script>


<main>
    <h1>
        Architecting server-side push for Node SerialPort in SvelteKit using Server-Sent Events
    </h1>

    <p>
        At work, I am currently working on creating some control panel application for our IoT hardware.
        The requirements necessitate a lot of recurring tasks; overall, an I/O-bound application. I decided
        to use Node.js as the runtime for the backend for its event-loop-based asynchronicity
        and Svelte and SvelteKit for frontend and meta-framework, respectively. The use of the SerialPort library
        is for abstracting away the details of connecting to serial ports, in our case, ports connected to 
        our Arduino microcontrollers.
    </p>

    <h2>
        A Svelte and SvelteKit crash course
    </h2>

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

    <h2>The SerialPort library</h2>

    <Gist
        gist_url="https://gist.github.com/hi-brylle/920577f457ab44bf49cef4a8c248c236"
        height={800}
        />

    

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
</style>