<script>
  import CollapsibleSection from './CollapsibleSection.svelte'
  import Button from './user-input/Button.svelte'
  import StationOverview from './StationSummarySections/StationOverview.svelte'
  import StationInfo from './StationSummarySections/StationInfo.svelte'
  import StationFishData from './StationSummarySections/StationFishData.svelte'
  import { Station } from '../models/Station'
  import { DATATYPE_STATION } from '../constants/dataTypes'

  export let station = new Station() // Station to show
  export let wide = false // Whether to show the station summary as wide

  // Path to the map with the station selected as a query parameter
  let mapRef = ''
  $: mapRef = `/?${DATATYPE_STATION}=${station.id}`

  // Path to the graph with the station selected as a query parameter
  let graphRef = ''
  $: graphRef = `/graph?${DATATYPE_STATION}=${station.id}`

  // Path to the download page with the station selected as a query parameter
  let downloadRef = ''
  $: downloadRef = `/download?${DATATYPE_STATION}=${station.id}`

  $: mainContentClass = wide ? 'maincontent wide' : 'maincontent'
</script>

<div class='container'>
  <div class={mainContentClass}>
    <div class='column'>
      <!-- Station name, date, time, and button to go to river -->
      <div role='tooltip'>
        <CollapsibleSection title={station.name} collapsable={false}>
          <StationOverview {station} on:goToRiverData />
        </CollapsibleSection>
      </div>
      <!-- General station info such as description, weather, power settings -->
      <div role='tooltip'>
        <CollapsibleSection title='Info'>
          <StationInfo {station} />
        </CollapsibleSection>
      </div>
    </div>

    <div class='column' role='table'>
      <!-- Fish data for the station -->
      <CollapsibleSection title='Fiskedata'>
        <StationFishData {station} />
      </CollapsibleSection>
    </div>
  </div>

  <!-- Buttons to show diagram and download data -->
  <div class='footer'>
    <div role='button'>
      <Button type='blue' size='medium' href={graphRef}>
        Se graf
        <img src='/graphIcon2.svg' alt='Graph' height='40px' class='white-color'>
      </Button>
    </div>
    <!-- Show in map button if the summary is wide -->
    {#if wide}
      <div role='button'>
        <Button type='blue' size='medium' href={mapRef}>
          Se i kart
          <img src='/mapIcon.svg' alt='Map' height='50px' class='white-color'>
        </Button>
      </div>
    {/if}

    <div role='button'>
      <Button type='orange' size='medium' href={downloadRef}>
        Last ned
        <img src='/dowloadIcon.svg' alt='Download' height='50px' class='white-color'>
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
    border-top: 2px solid #435768;
  }

  /* Transformes the icon color to white */
  .white-color{
    filter: invert(100%);
  }
</style>
