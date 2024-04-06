<script>
  import CollapsibleSection from './CollapsibleSection.svelte'
  import Button from './user-input/Button.svelte'
  import StationOverview from './StationSummarySections/StationOverview.svelte'
  import StationInfo from './StationSummarySections/StationInfo.svelte'
  import StationFishData from './StationSummarySections/StationFishData.svelte'
  import { Station } from '../models/Station'

  export let station = new Station() // Station to show
  export let wide = false // Whether to show the station summary as wide

  $: mainContentClass = wide ? 'maincontent wide' : 'maincontent';
</script>

<div class='container'>
  <div class={mainContentClass}>
    <div class="column">
      <!-- Station name, date, time, and button to go to river -->
      <CollapsibleSection title={station.name} collapsable={false}>
        <StationOverview {station} />
      </CollapsibleSection>

      <!-- General station info such as description, weather, power settings -->
      <CollapsibleSection title='Info'>
        <StationInfo {station} />
      </CollapsibleSection>
    </div>

    <div class="column">
      <!-- Fish data for the station -->
      <CollapsibleSection title='Fiskedata'>
        <StationFishData {station} />
      </CollapsibleSection>
    </div>
  </div>

  <!-- Buttons to show diagram and download data -->
  <div class='footer'>
    <Button type='blue' size='medium'>
      Diagram
      <img src='/graphIcon2.svg' alt='graphIcon' height='40px' class='headerIcon white-color'>
    </Button>

    <!-- Show in map button if the summary is wide -->
    {#if wide}
      <Button type="blue" size="medium">
        Se i kart
        <img src="/mapIcon.svg" alt="mapIcon" height="50px" class="headerIcon">
      </Button>
    {/if}

    <Button type='orangeButton' size='medium'>
      Last ned
      <img src='/dowloadIcon.svg' alt='dowloadIcon' height='50px' class='headerIcon white-color'>
    </Button>
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
    width: 100% - 2em;
    height: fit-content;
    padding: 1em;
    margin-top: 0.5em;
    position: relative;
  }

  .footer::before {
    content: "";
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
