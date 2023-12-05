<script lang="ts">
    import { goto } from "$app/navigation";
    import { nav_links } from "$lib/link-store";
    import { onMount } from "svelte";

    
</script>

<div>
    {#each $nav_links as link}
        <a
            href={link.url}
            class:selected={link.selected}>
            {link.title}
        </a>
    {/each}
</div>
