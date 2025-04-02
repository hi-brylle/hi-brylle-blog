<script lang="ts">
	import { posts_metadata } from '$lib/link-store.js';
    import { onMount } from 'svelte';

	export let data;

    onMount(() => {
        data.posts.forEach((metadata) => {
            posts_metadata.update((map) => {
                map.set(metadata.url, {title: metadata.title, date_written: metadata.date_written, est_read_time: metadata.est_read_time})
                return map
            })
        })
        console.log($posts_metadata)
    })
</script>

<slot />


