<script>
  import { River } from '../models/River.js'
  import CollapsibleSection from './CollapsibleSection.svelte'
  import Button from './user-input/Button.svelte'
  import RiverOverview from './RiverSummarySections/RiverOverview.svelte'
  import RiverInfo from './RiverSummarySections/RiverInfo.svelte'
  import { getStationsForRiver } from '../utils/dataManager.js'
  import RiverStations from './RiverSummarySections/RiverStations.svelte'
  import RiverFishData from './RiverSummarySections/RiverFishData.svelte'
  import { DATATYPE_RIVER } from '../constants/dataTypes'

  export let river = new River() // River to show
  export let wide = false // Whether to show the river summary as wide

  let stations = new Map() // Stations under river

  // Path to the map, graph, and download page with the river selected as a query parameter
  let mapRef = ''
  $: mapRef = `/?${DATATYPE_RIVER}=${river.id}`

  let graphRef = ''
  $: graphRef = `/graph?${DATATYPE_RIVER}=${river.id}`

  let downloadRef = ''
  $: downloadRef = `/download?${DATATYPE_RIVER}=${river.id}`

  // Get stations for the river
  $: stations = getStationsForRiver(river)

  $: mainContentClass = wide ? 'maincontent wide' : 'maincontent'
</script>

<div class='container'>

  <div class={mainContentClass}>
    <div class='column'>
      <!-- River name, project id, and date -->
      <div role='tooltip'>
        <CollapsibleSection title={river.name} collapsable={false}>
          <RiverOverview {river} />
        </CollapsibleSection>
      </div>
      <!-- River info such as observation data, crew, and comments -->
      <div role='tooltip'>
        <CollapsibleSection title='Info'>
          <RiverInfo {river} {stations}/>
        </CollapsibleSection>
      </div>
    </div>

    <div class='column'>
      <!-- Stations under the river -->
      <div role='table'>
        <CollapsibleSection title='Stasjoner'>
          <RiverStations {stations} on:goToStationData/>
        </CollapsibleSection>
      </div>
      <!-- Fish data for the river -->
      <div role='table'>
        <CollapsibleSection title='Fiskedata'>
          <RiverFishData {stations} />
        </CollapsibleSection>
      </div>
    </div>
  </div>

  <!-- Buttons to show diagram and download data -->
  <div class='footer'>
    {#if wide}
      <!-- Show in map button if the summary is wide -->
      <div role='button'>
        <Button type='blue' size='medium' href={mapRef}>
          Se i kart
          <img src='/mapIcon.svg' alt='Map' height='50px' class='white-color'>
        </Button>
      </div>
    {/if}

    <div role='button'>
      <Button type='blue' size='medium' href={graphRef}>
        Se graf
        <img src='/graphIcon.svg' alt='Graph' height='40px' class='white-color'>
      </Button>
    </div>

    <div role='button'>
      <Button type='orange' size='medium' href={downloadRef}>
        Last ned
        <img src='/downloadIcon.svg' alt='Download' height='50px' class='white-color'>
      </Button>
    </div>
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    width: 100%;
  }

  .maincontent {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: auto;
    width: 100%;
    flex-direction: column;
  }

  .maincontent.wide {
    flex-direction: row;
    margin: 2em 0em;
    padding: 0em 2em;
    height: calc(100% - 4em);
    width: calc(100% - 4em);
  }

  .column {
    flex: 1;
  }

  .footer {
    flex-shrink: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    width: calc(100% - 2em);
    height: fit-content;
    padding: 1em;
    margin-top: 0.5em;
    position: relative;
  }

  .footer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    border-top: 2px solid var(--PCOLOR);
  }

  /* Transformes the icon color to white */
  .white-color{
    filter: invert(100%);
  }
</style>
