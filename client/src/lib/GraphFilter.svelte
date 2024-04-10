<script>
  import CollapsibleSection from './CollapsibleSection.svelte'
  import SpeciesInput from './user-input/SpeciesInput.svelte'
  import PlotSpeciesOptions from './user-input/PlotSpeciesOptions.svelte'
  import PlotLengthOptions from './user-input/PlotLengthOptions.svelte'
  import Button from './user-input/Button.svelte'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let selectedRivers // Rivers user has chosen to plot
  export let selectedStations // Stations user has chosen to plot
  export let selectableSpecies = [] // Species user can choose
  export let dataType = 'river' // 'river' or 'station'

  export let selectedSpecies = [] // Species user has chosen
  export let includeOthers = false // If to include 'others' category in graphs

  export let showPlotA = true // Show the first plot
  export let showValueA = 'absolute' // 'absolute' or 'relative'
  export let plotTypeA = 'barchart' // 'barchart' or 'piechart'

  export let showPlotB = true // Show the second plot
  export let intervallPlotB = 20 // Interval for the histogram
  export let plotTypeB = 'histogram' // 'histogram' or 'boxplot'
  export let combineSpecies = false // Whether to combine species for each river/station in plot B

  let chooseAll = true // If the user wants to choose all species
  let customSpecies = [] // Species the user has chosen

  // Species the user has choosen; either all or the custom ones
  $: selectedSpecies = (chooseAll || customSpecies.length === 0) ? selectableSpecies : customSpecies

  /**
   * Handles when user wants to select rivers or stations
   */
  function handleSelectRiverStation () {
    dispatch('selectRiverAndStation')
  }

</script>

<div class="main">
  <!-- Input for opening selection of river or stations -->
  <CollapsibleSection title="Velg elver/stasjoner">
    <Button
      on:buttonClick={handleSelectRiverStation}
      type="blue"
      size="small"
      >
      Rediger
      <img src="/editIcon.svg" alt="editIcon" height="30em" class="white-color">
    </Button>

      {#if dataType === 'river' && selectedRivers.size !== 0}
        <!-- Rivers choosen -->
        <h4>Elver valgt</h4>
        <ul>
        {#each Array.from(selectedRivers.entries()) as [_, river]}
          <li>{river.name + ' ' + river.startDate}</li>
        {/each}
        </ul>
      {:else if dataType === 'station' && selectedStations.size !== 0}
        <!-- Stations choosen -->
        <p>Stasjoner valgt</p>
        <ul>
        {#each Array.from(selectedStations.entries()) as [_, station]}
          <li>{station.name + ' ' + station.date}</li>
        {/each}
        </ul>
      {/if}
  </CollapsibleSection>

  <!-- Input for choosing species -->
  <CollapsibleSection title="Art">
    <SpeciesInput {selectableSpecies} bind:chooseAll bind:customSpecies bind:includeOthers showIncludeOthers={true}/>
  </CollapsibleSection>

  <!-- Input for choosing how plot A is displayed -->
  <CollapsibleSection title="Fordeling av arter">
    <PlotSpeciesOptions
      bind:showPlotA
      bind:showValueA
      bind:plotTypeA />
  </CollapsibleSection>

  <!-- Input for choosing how plot B is displayed -->
  <CollapsibleSection title="Fordeling av lengde">
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

  /* Transformes icon color to white */
  .white-color{
    filter: invert(100%);
  }

  h4 {
    margin-bottom: 0;
  }

</style>
