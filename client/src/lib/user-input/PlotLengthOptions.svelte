<script>
  import RadioInput from './RadioInput.svelte'

  export let showPlotB
  export let intervallPlotB
  export let plotTypeB
  export let combineSpecies

  // Options when choosing plot type
    const plotTypeOptions = [
      { value: 'histogram', label: 'Histogram' },
      { value: 'boxplot', label: 'Boksplott' }
    ]
</script>

<label for="showPlotB">
  Vis
  <input type="checkbox" id="showPlotB" name="showPlotB" bind:checked={showPlotB}>
</label>

{#if showPlotB}
  <h4>Diagram type</h4>

  <RadioInput name="plotTypeB" options={plotTypeOptions} bind:selected={plotTypeB}/>

  {#if plotTypeB === 'histogram'}
    <h4>Intervall i mm</h4>
    <!-- Input intervall for plotting-->
    <input type="number" id="intervallPlotB" name="intervallPlotB" bind:value={intervallPlotB} placeholder="mm" />
  {/if}

  <h4>Grupper arter</h4>
  <label for="combineSpecies">
    Vis sum av valgte arter for hver elv/stasjon
    <input type="checkbox" id="combineSpecies" name="combineSpecies" bind:checked={combineSpecies}>
  </label>
{/if}

<style>
  h4 {
    margin-bottom: 0.5em;
  }

  input[type="number"] {
    width: 60%;
    font-size: 16px;
    padding: 0.5em;
    margin: 0.5em;
    border-radius: 0.5em;
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
    transform: scale(1.25);
  }
</style>
