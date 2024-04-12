<script>
  import RadioInput from './RadioInput.svelte'

  export let showPlotB
  export let intervallPlotB
  export let plotTypeB
  export let combineSpecies

  let errorMessage = ''
  let allowSmallIntervall = false
  let userInterval = 20

  // Options when choosing plot type
  const plotTypeOptions = [
    { value: 'histogram', label: 'Histogram' },
    { value: 'boxplot', label: 'Boksplott' }
  ]

  // Only allow intervall under 5 mm if allowSmallIntervall is true
  $: if (userInterval < 5 && !allowSmallIntervall) {
    errorMessage = 'Intervall må være minst 5 mm'
  } else {
    intervallPlotB = userInterval
    errorMessage = ''
  }
</script>

<label for='showPlotB'>
  Vis
  <input type='checkbox' id='showPlotB' name='showPlotB' bind:checked={showPlotB}>
</label>

{#if showPlotB}
  <h4>Diagram type</h4>

  <RadioInput name='plotTypeB' options={plotTypeOptions} bind:selected={plotTypeB}/>

  {#if plotTypeB === 'histogram'}
    <h4>Intervall i mm</h4>
    <!-- Input intervall for plotting-->
    <input type='number' id='intervallPlotB' name='intervallPlotB' bind:value={userInterval} placeholder='mm'/>
    {#if errorMessage}
      <p class='errorMessage'>{errorMessage}</p>
    {/if}

    <p class='textAllowSmallIntervall'>Små intervall under 4 mm kan gjøre siden treg</p>
    <label for='allowSmallIntervall' class='labelAllowSmallIntervall'>
      Tillat små intervall
      <input type='checkbox' id='allowSmallIntervall' name='allowSmallIntervall' bind:checked={allowSmallIntervall}>
    </label>
  {/if}

  <h4>Grupper arter</h4>
  <label for='combineSpecies'>
    Vis sum av valgte arter for hver elv/stasjon
    <input type='checkbox' id='combineSpecies' name='combineSpecies' bind:checked={combineSpecies}>
  </label>
{/if}

<style>
  .errorMessage {
    color: red;
  }

  .textAllowSmallIntervall {
    font-size: 0.8rem;
    margin: 0.25em;
  }

  h4 {
    margin-bottom: 0.5em;
  }

  input[type='number'] {
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

  .labelAllowSmallIntervall {
    padding: 0.25em;
    font-size: 1rem;
  }

  label:hover {
    background-color: #435768;
    color: white;
  }

  input[type='checkbox'] {
    transform: scale(1.25);
  }
</style>
