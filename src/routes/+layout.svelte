<script lang="ts">
    import { posts_metadata } from '$lib/link-store.js';
    import { onMount } from 'svelte';

	export let data;

    onMount(() => {
        posts_metadata.set([...$posts_metadata, ...data.posts])
        console.log($posts_metadata)
    })
</script>

<slot />


