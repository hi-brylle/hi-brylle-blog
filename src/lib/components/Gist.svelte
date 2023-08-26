<script lang="ts">
    export let gist_url: string
    export let height: number
</script>

<iframe
    src={gist_url + ".pibb"} 
    title="Gist"
    style="width: 100%; height: {height}px; border: 0;">
</iframe>