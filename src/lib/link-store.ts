import { derived, writable, type Writable } from "svelte/store";

// Add new post metadata in $lib/links/posts.json.
export const posts_metadata: Writable<{
    url: string;
    title: string;
    date_written: string;
    est_read_time: number;
}[]> = writable([])

export const posts_medata_derived: Writable<
    Map<string, {title: string, date_written: string, est_read_time: number}>[]
    > = writable([])

export const links = derived(posts_metadata, (values: (typeof posts_metadata) extends Writable<infer T> ? T : never) => {    
    let map = new Map<string, {title: string, date_written: string, est_read_time: number}>()
    values.map((value: typeof values[number]) => {
        map.set(value.url, {title: value.title, date_written: value.date_written, est_read_time: value.est_read_time})
    })
    return map
})