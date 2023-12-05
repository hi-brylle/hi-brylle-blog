import { derived, writable, type Writable } from "svelte/store";

export const nav_links = writable([
    {url: "/app-wide-sveltekit-sse", title: "App-wide server-side push in SvelteKit using Server-Sent Events", date_written: "28 July 2023", est_read_time: 4},
    {url: "/serial-port-sveltekit-sse", title: "Architecting server-side push for Node SerialPort in SvelteKit using Server-Sent Events", date_written: "13 July 2023", est_read_time: 5},
])

export const links = derived(nav_links, (values: (typeof nav_links) extends Writable<infer T> ? T : never) => {    
    let map = new Map<string, {title: string, date_written: string, est_read_time: number}>()
    values.map((value: typeof values[number]) => {
        map.set(value.url, {title: value.title, date_written: value.date_written, est_read_time: value.est_read_time})
    })
    return map
})