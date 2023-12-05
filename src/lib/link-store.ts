import { derived, writable, type Writable } from "svelte/store";

export const navbar_hidden = writable(false)
export const nav_links = writable([
    {url: "/app-wide-sveltekit-sse", title: "App-wide server-side push in SvelteKit using Server-Sent Events", selected: false},
    {url: "/serial-port-sveltekit-sse", title: "Architecting server-side push for Node SerialPort in SvelteKit using Server-Sent Events", selected: false},
    {url: "/about-me", title: "About me", selected: false},
    {url: "/about-this-blog", title: "What this blog is for", selected: false},
])

export const links = derived(nav_links, (values: (typeof nav_links) extends Writable<infer T> ? T : never) => {    
    let map = new Map<string, string>()
    values.map((value: typeof values[number]) => {
        map.set(value.url, value.title)
    })
    return map
})