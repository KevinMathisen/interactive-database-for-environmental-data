<script>
    import BarChartComponent from '../../lib/Diagrams/BarChartComponent.svelte';
    import BarChart2Component from '../../lib/Diagrams/BarChart2Component.svelte';
    import PieChartComponent from '../../lib/Diagrams/PieChartComponent.svelte';
    import BoxPlotComponent from '../../lib/Diagrams/BoxPlottComponent.svelte';
    import HistogramComponent from '../../lib/Diagrams/HistogramComponent.svelte';

    //export let data;
    export let type = 'bar';
</script>

<!--Chooses which graph to draw based on what the user wants to see (+page.svelte)- file-->
{#if type=='bar'}
    <BarChartComponent/>
{:else if type=='barGroup'}
    <BarChart2Component/>
{:else if type=='box'}
    <BoxPlotComponent/>
{:else if type=='pie'}
    <PieChartComponent/>
{:else}
    <HistogramComponent/>
{/if}
