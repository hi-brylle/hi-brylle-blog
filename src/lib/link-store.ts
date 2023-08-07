import { derived, writable } from "svelte/store";

export const links = writable([
    {url: "/about-this-blog", title: "What this blog is for", selected: false},
    {url: "/about-me", title: "About me", selected: false},
    {url: "/serial-port-sveltekit-sse", title: "Architecting server-side push for Node SerialPort in SvelteKit using Server-Sent Events", selected: false},
    {url: "/app-wide-sveltekit-sse", title: "App-wide server-side push in SvelteKit using Server-Sent Events", selected: false},
])

export const links_derived = derived(links, (values: { url: string; title: string; selected: boolean; }[]) => {    
    let map = new Map<string, string>()
    values.map((value: { url: string; title: string; selected: boolean; }) => {
        map.set(value.url, value.title)
    })
    return map
})