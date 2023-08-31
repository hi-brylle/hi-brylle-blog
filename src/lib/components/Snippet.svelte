<script lang="ts">
    import Highlight, { LineNumbers } from "svelte-highlight";
    import typescript from "svelte-highlight/languages/typescript";
    import obsidian from "svelte-highlight/styles/obsidian";

    export let code:string;
    export let highlighted_lines: number[] = [];
</script>

<svelte:head>
    {@html obsidian}
</svelte:head>

<Highlight language={typescript} {code} let:highlighted>
    <LineNumbers
        {highlighted}
        hideBorder={true}
        highlightedLines={highlighted_lines}
        --highlighted-background="#2c3180"
        --padding-left=0
        --padding-right=0
        
        />
</Highlight>


