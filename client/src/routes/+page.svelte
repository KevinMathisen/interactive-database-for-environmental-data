<script>
  import LeafletMap from '$lib/LeafletMap.svelte'
  import Filter from '$lib/filter.svelte'
  import { getRivers, getStations, getRiverSummary, getStationSummary } from '../utils/dataManager.js'
  import { getSelectableSpecies, filterRiversByDateAndSpecies, filterStationsByDateAndSpecies } from '../utils/filterData.js'
  import { riverStore } from '../stores/riverStore.js'
  import { stationStore } from '../stores/stationStore.js'
  import Sidebar from '../lib/Sidebar.svelte'
  import { onMount } from 'svelte'
  import RiverSummary from '../lib/RiverSummary.svelte'
  import StationSummary from '../lib/StationSummary.svelte'
  import { River } from '../models/River.js'
  import { Station } from '../models/Station.js'

  let rivers = new Map() // Rivers with coordinates
  let stations = new Map() // Stations with coordinates
  let selectableSpecies // All unique species

  let dataType // "river" or "station", chosen by user
  let selectedSpecies // Species user wants to look at
  let selectedStartDate // Start date for the time user wants to look at
  let selectedEndDate // End date for the time user wants to look at

  let filteredRivers // Rivers filtered by date and species
  let filteredStations // Stations filtered by date and species

  let selectedRiver = new River() // River the user has chosen
  let selectedStation = new Station() // Station the user has chosen

  let showLeftSidebar = true
  let sideBarTitle = 'Sidebar'

  /**
   * Handles the click event on a station
   * @param {Event} event - The click event
   */
  function stationClicked (event) {
    sideBarTitle = event.detail.text.name
    getStationSummary(11)
      .then(_ => {
        selectedRiver = new River()
        selectedStation = stations.get(11)
      })
  }

  /**
   * Handles the click event on a river
   * @param {Event} event - The click event
   */
  function riverClicked (event) {
    sideBarTitle = event.detail.text.name
    getRiverSummary(3)
      .then(_ => {
        selectedStation = new Station()
        selectedRiver = rivers.get(3)
      })
  }

  onMount(async () => {
    // Get rivers and stations from API
    getRivers()
    getStations()
  })

  // Get rivers and stations from stores
  $: rivers = $riverStore
  $: stations = $stationStore
  $: selectableSpecies = getSelectableSpecies(rivers)

  // Find which rivers and stations to show on the map based on user input
  $: filteredRivers = filterRiversByDateAndSpecies(rivers, selectedSpecies, selectedStartDate, selectedEndDate)
  $: filteredStations = filterStationsByDateAndSpecies(stations, selectedSpecies, selectedStartDate, selectedEndDate)

  /**
   * Toggles the left sidebar
   */
  function toggleLeftSidebar () {
    showLeftSidebar = !showLeftSidebar
  }

  /**
   * Toggles the right sidebar by resetting the selected river and station
   */
  function toggleRightSidebar () {
    selectedRiver = new River()
    selectedStation = new Station()
  }

</script>

<LeafletMap {dataType} rivers={filteredRivers} stations={filteredStations} on:stationClicked={stationClicked} on:riverClicked={riverClicked}/>

{#if showLeftSidebar}
  <div class="leftSidebar">
    <Sidebar title="Filter" typeClose="sideButton" side="left" on:close={toggleLeftSidebar}>
      <Filter
        {selectableSpecies}
        bind:dataType
        bind:selectedSpecies
        bind:selectedStartDate
        bind:selectedEndDate/>
    </Sidebar>
  </div>
{/if}

{#if selectedRiver.id}
  <div class="rightSidebar">
    <Sidebar title={sideBarTitle} typeClose="cross" side="right" on:close={toggleRightSidebar}>
      <RiverSummary river={selectedRiver} />
    </Sidebar>
  </div>
{:else if selectedStation.id}
  <div class="rightSidebar">
    <Sidebar title={sideBarTitle} typeClose="cross" side="right" on:close={toggleRightSidebar}>
      <StationSummary station={selectedStation} />
    </Sidebar>
  </div>
{/if}

<style>
  .leftSidebar {
    position: absolute;
    top: 80px;
    left: 0;
    height: calc(100vh - 80px);
    width: 20em;
  }
  .rightSidebar {
    position: absolute;
    top: 80px;
    right: 0;
    height: calc(100vh - 80px);
    width: 35em;
  }
</style>
