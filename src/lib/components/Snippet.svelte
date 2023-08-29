<script lang="ts">
    import Highlight from "svelte-highlight";
    import typescript from "svelte-highlight/languages/typescript";
    import obsidian from "svelte-highlight/styles/obsidian";

    export let code:string;
</script>

<svelte:head>
    {@html obsidian}
</svelte:head>

<Highlight language={typescript} {code} />


