<script>
  import CollapsibleSection from "./CollapsibleSection.svelte"
  import Button from "./Button.svelte"
  import StationOverview from "./StationSummarySections/StationOverview.svelte"
  import StationInfo from "./StationSummarySections/StationInfo.svelte"
  import StationFishData from "./StationSummarySections/StationFishData.svelte"
  import { Station } from "../models/Station"

  export let station = new Station() // Station to show
</script>

<div class='container'>
  <div class='maincontent'>
    <!-- Station name, date, time, and button to go to river -->
    <CollapsibleSection title={station.name} collapsable={false}>
      <StationOverview {station} />
    </CollapsibleSection>

    <!-- General station info such as description, weather, power settings -->
    <CollapsibleSection title='Info'>
      <StationInfo {station} />
    </CollapsibleSection>

    <!-- Fish data for the station -->
    <CollapsibleSection title='Fiskedata'>
      <StationFishData {station} />
    </CollapsibleSection>
  </div>

  <!-- Buttons to show diagram and download data -->
  <div class='footer'>
    <Button color='blue' type='medium'>
      Diagram
      <img src='/graphIcon.svg' alt='graphIcon' height='50px' class='headerIcon'>
    </Button>

    <Button color='orange' type='medium'>
      Last ned
      <img src='/dowloadIcon.svg' alt='dowloadIcon' height='50px' class='headerIcon'>
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
</style>