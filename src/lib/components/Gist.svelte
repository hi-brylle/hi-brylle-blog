<script>
    export let gist_url = ""
    export let height = 1000
</script>

<iframe
    src={gist_url + ".pibb"} 
    title="Gist"
    style="width: 100%; height: {height}px; border: 0;">
</iframe>