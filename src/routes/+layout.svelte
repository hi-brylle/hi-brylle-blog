<script lang="ts">
	import { posts_medata_derived } from '$lib/link-store.js';
    import { posts_metadata } from '$lib/link-store.js';
    import { onMount } from 'svelte';

	export let data;

    const to_url_map = ((raw_metadata: {
        url: string;
        title: string;
        date_written: string;
        est_read_time: number;
        }) => {
            let map = new Map<string, {title: string, date_written: string, est_read_time: number}>()
            map.set(raw_metadata.url, {title: raw_metadata.title, date_written: raw_metadata.date_written, est_read_time: raw_metadata.est_read_time})
            return map
    })

    onMount(() => {
        posts_metadata.set([...$posts_metadata, ...data.posts])
        console.log($posts_metadata)

        posts_medata_derived.set([...$posts_medata_derived, ...data.posts.map(to_url_map)])
        console.log($posts_medata_derived)
    })
</script>

<slot />


