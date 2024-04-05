<script>
  import { River } from '../models/River.js'
  import CollapsibleSection from './CollapsibleSection.svelte'
  import Button from './user-input/Button.svelte'
  import RiverOverview from './RiverSummarySections/RiverOverview.svelte'
  import RiverInfo from './RiverSummarySections/RiverInfo.svelte'
  import { getStationsForRiver } from '../utils/dataManager.js'
  import RiverStations from './RiverSummarySections/RiverStations.svelte'

  export let river = new River() // River to show

  let stations = new Map() // Stations under river

  // Get stations for the river
  $: stations = getStationsForRiver(river)
</script>

<div class='container'>

  <div class="maincontent">
    <!-- River name, project id, and date -->
    <CollapsibleSection title={river.name} collapsable={false}>
      <RiverOverview {river} />
    </CollapsibleSection>

    <!-- River info such as observation data, crew, and comments -->
    <CollapsibleSection title="Info">
      <RiverInfo {river} {stations}/>
    </CollapsibleSection>

    <!-- Stations under the river -->
    <CollapsibleSection title="Stasjoner">
      <RiverStations {stations} on:rowClick/>
    </CollapsibleSection>
  </div>

  <!-- Buttons to show diagram and download data -->
  <div class="footer">
    <Button color="blue" type="medium">
      Diagram
      <img src="/graphIcon.svg" alt="graphIcon" height="50px" class="headerIcon">
    </Button>

    <Button color="orange" type="medium">
      Last ned
      <img src="/dowloadIcon.svg" alt="dowloadIcon" height="50px" class="headerIcon">
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
