<script> // Graph page logic here 
    import Graph from '$lib/optionsGraph.svelte'
</script>
    
<div class="graphMain">
    <Graph/>

    <div class="graphBox1">
        <h3>FORDELING AV ARTER</h3>
    </div>

    <div class="graphBox2">
        <h3>FORDELING AV LENGDE</h3>
    </div>
</div>

<style> 
    .graphMain {
        display: grid;
        flex-direction: row;
        grid-template-areas: 
        "filter graph1"                   
        "filter graph2";
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 305px 1fr;  /* Width of the filter, 305 since the border is 5 and filter 300*/
    }
    
    .graphBox1 {
        grid-area: graph1;
    }

    .graphBox1 h3 {
        padding: 1rem 0 0 8rem;
    }

    .graphBox2 {
        grid-area: graph2;
    }

    .graphBox2 h3 {
        padding: 1rem 0 0 8rem;
    }
</style>
