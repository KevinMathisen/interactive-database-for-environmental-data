<script>
    import { River } from '../models/River.js'
    import CollapsibleSection from './CollapsibleSection.svelte'
    import Button from './Button.svelte'
    import RiverOverview from './RiverSummarySections/RiverOverview.svelte'
    import RiverInfo from './RiverSummarySections/RiverInfo.svelte'
    import { getStationsForRiver } from '../utils/dataManager.js'
    import RiverStations from './RiverSummarySections/RiverStations.svelte'

    export let river = new River()

    let stations = new Map()

  $: stations = getStationsForRiver(river)
</script>

<div class='container'>

  <div class="maincontent">
    <CollapsibleSection title={river.name} collapsable={false}>
      <RiverOverview {river} />
    </CollapsibleSection>

    <CollapsibleSection title="Info">
      <RiverInfo {river} {stations}/>
    </CollapsibleSection>

    <CollapsibleSection title="Stasjoner">
      <RiverStations {stations} on:rowClick/>
    </CollapsibleSection>
  </div>

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
    left: 10%; /* Center the line */
    width: 80%;
    border-top: 2px solid #435768; /* Adjust color as needed */
  }

</style>
