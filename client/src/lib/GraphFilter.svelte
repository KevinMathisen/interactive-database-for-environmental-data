<script>
  import CollapsibleSection from './CollapsibleSection.svelte'
  import SpeciesInput from './user-input/SpeciesInput.svelte'
  import PlotSpeciesOptions from './user-input/PlotSpeciesOptions.svelte'
  import PlotLengthOptions from './user-input/PlotLengthOptions.svelte'
  import Button from './user-input/Button.svelte'
  import { createEventDispatcher } from 'svelte'
  import { DATATYPE_RIVER, DATATYPE_STATION } from '../constants/dataTypes'
  const dispatch = createEventDispatcher()

  export let selectedRivers // Rivers user has chosen to plot
  export let selectedStations // Stations user has chosen to plot
  export let selectableSpecies = []
  export let dataType = DATATYPE_RIVER // DATATYPE_RIVER or DATATYPE_STATION
  export let aggregateData = false

  export let selectedSpecies = [] // Species user has chosen
  export let includeOthers = false // If to include 'others' category in graphs

  export let showPlotA = true
  export let showValueA = 'absolute' // 'absolute' or 'relative'
  export let plotTypeA = 'barchart' // 'barchart' or 'piechart'

  export let showPlotB = true
  export let intervallPlotB = 20 // Interval for the histogram
  export let plotTypeB = 'histogram' // 'histogram' or 'boxplot'
  export let combineSpecies = false // Whether to combine species for each river/station in plot B

  let chooseAll = true // If the user wants to choose all species
  let customSpecies = [] // Species the user has chosen
  let downloadRef = '' // Link to download page with selected rivers or stations

  // Species the user has choosen; either all or the custom ones
  $: selectedSpecies = (chooseAll || customSpecies.length === 0) ? selectableSpecies : customSpecies

  // Update download link when the user has selected rivers or stations
  $: if (selectedRivers || selectedStations) {
    downloadRef = createDownloadLink()
  }

  /**
   * Creates a download link based on the selected rivers or stations
   */
  function createDownloadLink () {
    let url = '/download?'
    if (dataType === DATATYPE_RIVER) {
      url += Array.from(selectedRivers.values()).map(river => `&river=${river.id}`).join('')
    } else if (dataType === DATATYPE_STATION) {
      url += Array.from(selectedStations.values()).map(station => `&station=${station.id}`).join('')
    }
    return url
  }

  /**
   * Handles when user wants to select rivers or stations
   */
  function handleSelectRiverStation () {
    dispatch('selectRiverAndStation')
  }

</script>

<div class='main'>
  <!-- Input for opening selection of river or stations -->
  <CollapsibleSection title='Velg elver/stasjoner'>
    <div class='editButton' role='button'>
      <Button on:buttonClick={handleSelectRiverStation} type='blue' size='small'>
        Rediger
        <img src='/editIcon.svg' alt='Edit' height='30em' class='white-color'>
      </Button>
    </div>

    {#if (selectedRivers.size !== 0 && dataType === DATATYPE_RIVER) || (selectedStations.size !== 0 && dataType === DATATYPE_STATION)} 
      <!-- Button for downloading selected rivers or stations -->
      <div role='button'>
        <Button type='orange' size='small' href={downloadRef}>
          Last ned<br>valgt data
          <img src='/downloadIcon.svg' alt='Download' height='30em' class='white-color'>
        </Button>
      </div>
    {/if}

    {#if dataType === DATATYPE_RIVER && selectedRivers.size !== 0}
      <!-- Rivers choosen -->
      <h4>Elver valgt</h4>
      <ul>
      {#each Array.from(selectedRivers.entries()) as [_, river]}
        <li>{river.name + ' ' + river.startDate}</li>
      {/each}
      </ul>
    {:else if dataType === DATATYPE_STATION && selectedStations.size !== 0}
      <!-- Stations choosen -->
      <p>Stasjoner valgt</p>
      <ul>
      {#each Array.from(selectedStations.entries()) as [_, station]}
        <li>{station.name + ' ' + station.date}</li>
      {/each}
      </ul>
    {/if}

    {#if (selectedRivers.size !== 0 && dataType === DATATYPE_RIVER) || (selectedStations.size !== 0 && dataType === DATATYPE_STATION) }      
      <!-- Input for aggregating choosen rivers/stations -->
      <label for='aggregateData'>
        Aggreger data
        <input type='checkbox' id='aggregateData' name='aggregateData' bind:checked={aggregateData}>
      </label>
    {/if}

  </CollapsibleSection>

  <!-- Input for choosing species -->
  <CollapsibleSection title='Art'>
    <SpeciesInput {selectableSpecies} bind:chooseAll bind:customSpecies bind:includeOthers showIncludeOthers={true}/>
  </CollapsibleSection>

  <!-- Input for choosing how plot A is displayed -->
  <CollapsibleSection title='Fordeling av arter'>
    <PlotSpeciesOptions
      bind:showPlotA
      bind:showValueA
      bind:plotTypeA />
  </CollapsibleSection>

  <!-- Input for choosing how plot B is displayed -->
  <CollapsibleSection title='Fordeling av lengde'>
    <PlotLengthOptions
      bind:showPlotB
      bind:intervallPlotB
      bind:plotTypeB
      bind:combineSpecies />
  </CollapsibleSection>
</div>

<style>
  .main {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: auto;
  }

  .editButton {
    margin-bottom: 1em;
  }

  /* Transformes icon color to white */
  .white-color{
    filter: invert(100%);
  }

  h4 {
    margin-bottom: 0;
  }

  label {
    display: block;
    padding: 0.5em;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 0.5em;
  }

  label:hover {
    background-color: var(--PCOLOR);
    color: white;
  }

  input[type='checkbox'] {
    /* Make the input radio button larger */
    transform: scale(1.25);
  }

</style>
