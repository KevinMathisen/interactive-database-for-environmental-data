<script> // Graph page logic here 
    import GraphFilter from '$lib/GraphFilter.svelte'
	import Sidebar from '../../lib/Sidebar.svelte';
    import PlotlyComponent from './PlotlyComponent.svelte';
</script>
    
<div class="graphPage">
    <div class="filterContainer">
        <Sidebar title="Filter for Grafer" typeClose="sideButton">
            <GraphFilter />
        </Sidebar>
    </div>
    
    <div class="graphMain">
        <div class="graphBox1">
            <h3>FORDELING AV ARTER</h3>
            <PlotlyComponent type={'bar'}/>
        </div>
    
        <div class="graphBox2">
            <h3>FORDELING AV LENGDE</h3>
            <PlotlyComponent type={'box'}/>
        </div>
    </div>
    
</div>


<style> 
    .graphPage {
        height: calc(100vh - 80px); 
        width: 100%;
        display: flex;
    }

    .filterContainer {
        width: 300px;
        height: 100%;
    }
    
    .graphMain {
        flex-grow: 1;
    }

    .graphBox1 h3 {
        padding: 1rem 0 0 8rem;
    }

    .graphBox2 h3 {
        padding: 1rem 0 0 8rem;
    }
</style>
