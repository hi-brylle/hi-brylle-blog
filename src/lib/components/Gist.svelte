<script lang="ts">
    import { onMount } from 'svelte'

    export let gist_url: string = ""
    export let height = 1000
    let frame: any;

    onMount(() => {
        frame.srcdoc = `<script src='${gist_url}.js'><${""}/script>`;
    });
  </script>

<iframe
    src="about:blank"
    bind:this={frame}
    title="Gist"
    style="--height: {height}px">
</iframe>

<style>
    iframe {
        border: 0;
        width: 100%;
        height: var(--height);
    }
</style>

  