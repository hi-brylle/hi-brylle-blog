<script lang="ts">
    import Highlight from "svelte-highlight";
    import typescript from "svelte-highlight/languages/typescript";
    import obsidian from "svelte-highlight/styles/obsidian";

    const code =
    `
    const add = (a: number, b: number) => a + b;
    const sub = (a: number, b: number) => a - b;
    `;
</script>

<svelte:head>
    {@html obsidian}
</svelte:head>

<Highlight language={typescript} {code} />


