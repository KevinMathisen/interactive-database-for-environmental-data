<script>
	import RadioInput from './RadioInput.svelte';

	export let showPlotB;
    export let intervallPlotB;
    export let plotTypeB;

	// Options when choosing plot type
    let plotTypeOptions = [
        {value: 'histogram', label: 'Histogram'},
        {value: 'box', label: 'Boksplott'}
    ];
</script>

<label for="showPlotB">
	Vis
	<input type="checkbox" id="showPlotB" name="showPlotB" bind:checked={showPlotB}>
</label>


<h4>Intervall i mm</h4>

<!-- Input intervall for plotting-->
<input type="number" id="intervallPlotB" name="intervallPlotB" bind:value={intervallPlotB} placeholder="mm" />

<h4>Diagram type</h4>

<RadioInput name="plotTypeB" options={plotTypeOptions} bind:selected={plotTypeB}/>