<script>
  import RadioInput from './RadioInput.svelte'

  export let showPlotA
  export let showValueA
  export let plotTypeA

  // Options when choosing y value
    const yValueOptions = [
      { value: 'absolute', label: 'Antall per art' },
      { value: 'relative', label: 'Ant/min per art' }
    ]

  // Options when choosing plot type
    const plotTypeOptions = [
      { value: 'barchart', label: 'Stolpediagram' },
      { value: 'piechart', label: 'Sektordiagram' }
    ]
</script>

<label for="showPlotA">
  Vis
  <input type="checkbox" id="showPlotA" name="showPlotA" bind:checked={showPlotA}>
</label>

{#if showPlotA}
  <h4>Diagram type</h4>
  <RadioInput name="plotTypeA" options={plotTypeOptions} bind:selected={plotTypeA}/>

  <h4>Y-akse verdi</h4>
  <RadioInput name="showPlotA" options={yValueOptions} bind:selected={showValueA}/>
{/if}

<style>
  h4 {
    margin-bottom: 0.5em;
  }

  label {
    display: block;
    padding: 0.5em;
    font-size: 1.2rem;
    cursor: pointer;
    border-radius: 0.5em;
  }

  label:hover {
    background-color: #435768;
    color: white;
  }

  input[type="checkbox"] {
    /* Make the input radio button larger */
    transform: scale(1.25);
  }
</style>
