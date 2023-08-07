import { writable } from "svelte/store";

export const links = writable([
    {url: "/about-this-blog", title: "What this blog is for", selected: false},
    {url: "/about-me", title: "About me", selected: false},
    {url: "/serial-port-sveltekit-sse", title: "Architecting server-side push for Node SerialPort in SvelteKit using Server-Sent Events", selected: false},
    {url: "/app-wide-sveltekit-sse", title: "App-wide server-side push in SvelteKit using Server-Sent Events", selected: false},
])