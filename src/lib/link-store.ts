import { writable, type Writable } from "svelte/store";

// Add new post metadata in $lib/links/posts.json.
export const posts_metadata: Writable<
    Map<string, {title: string, date_written: string, est_read_time: number}>> = writable(new Map())