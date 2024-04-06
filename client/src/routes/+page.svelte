<script>
  import LeafletMap from './LeafletMap.svelte'
  import Filter from '$lib/filter.svelte'
  import { getRivers, getStations, getRiverSummary, getStationSummary } from '../utils/dataManager.js'
  import { getSelectableSpecies, filterRiversByDateAndSpecies, filterStationsByDateAndSpecies } from '../utils/filterData.js'
  import { riverStore } from '../stores/riverStore.js'
  import { stationStore } from '../stores/stationStore.js'
  import Sidebar from '$lib/Sidebar.svelte'
  import { onMount } from 'svelte'
  import RiverSummary from '$lib/RiverSummary.svelte'
  import StationSummary from '$lib/StationSummary.svelte'
  import { River } from '../models/River.js'
  import { Station } from '../models/Station.js'
  import UserFeedbackMessage from '$lib/UserFeedbackMessage.svelte'
  import { page } from '$app/stores'
 

  let rivers = new Map() // Rivers with coordinates
  let stations = new Map() // Stations with coordinates
  let selectableSpecies // All unique species

  let dataType = 'river' // "river" or "station", chosen by user
  let selectedSpecies // Species user wants to look at
  let selectedStartDate // Start date for the time user wants to look at
  let selectedEndDate // End date for the time user wants to look at

  let filteredRivers // Rivers filtered by date and species
  let filteredStations // Stations filtered by date and species

  let selectedRiver = new River() // River the user has chosen
  let selectedStation = new Station() // Station the user has chosen

  let showLeftSidebar = true
  let sideBarTitle = ''

  // Set sidebar title based on data type
  $: sideBarTitle = dataType === 'river' ? 'Elvedata' : 'Stasjonsdata'

  /**
   * Handles the click event on a station
   * @param {Event} event - The click event
   */
  function stationClicked (event) {
    getStationSummary(event.detail.station.id)
      .then(_ => {
        selectedRiver = new River()
        selectedStation = stations.get(event.detail.station.id)
      })
  }

  /**
   * Handles the click event on a river
   * @param {Event} event - The click event
   */
  function riverClicked (event) {
    getRiverSummary(event.detail.river.id)
      .then(_ => {
        selectedStation = new Station()
        selectedRiver = rivers.get(event.detail.river.id)
      })
  }

  onMount(async () => {
    // Get rivers and stations from API
    await Promise.all([getRivers(), getStations()])
    // Get if the user has selected a river or station from URL
    getUrlParams()
  })

  // Get rivers and stations from stores
  $: rivers = $riverStore
  $: stations = $stationStore
  $: selectableSpecies = getSelectableSpecies(rivers)

  // Find which rivers and stations to show on the map based on user input
  $: filteredRivers = filterRiversByDateAndSpecies(rivers, selectedSpecies, selectedStartDate, selectedEndDate)
  $: filteredStations = filterStationsByDateAndSpecies(stations, selectedSpecies, selectedStartDate, selectedEndDate)

  // Remove selected river or station when the user switches between data types
  $: if (dataType === 'station') {
    selectedRiver = new River()
  } else if (dataType === 'river') {
    selectedStation = new Station()
  }

  // Update URL to reflect selected river or station
  $: updateUrl(selectedRiver, selectedStation)

  /**
   * Toggles the right sidebar by resetting the selected river and station
   */
  function toggleRightSidebar () {
    selectedRiver = new River()
    selectedStation = new Station()
  }

  /**
   * Updates the URL to reflect the selected river or station
   * @param {River} selectedRiver - The selected river
   * @param {Station} selectedStation - The selected station
   */
  function updateUrl(selectedRiver, selectedStation) {
    let url = new URL(window.location.href)
    if (selectedRiver.id) {
      url.searchParams.set('river', selectedRiver.id)
    } else {
      url.searchParams.delete('river')
    }

    if (selectedStation.id) {
      url.searchParams.set('station', selectedStation.id)
    } else {
      url.searchParams.delete('station')
    }

    history.pushState({}, '', url)
  }

  /**
   * Gets the river or station based on the URL parameters
   */
  function getUrlParams() {
    let searchParams = new URLSearchParams($page.url.search)
    let riverId = Number(searchParams.get('river'))
    let stationId = Number(searchParams.get('station'))

    if (riverId) {
      dataType = 'river'
      getRiverSummary(riverId)
        .then(_ => {
          selectedStation = new Station()
          selectedRiver = rivers.get(riverId)
        })
    } else if (stationId) {
      dataType = 'station'
      getStationSummary(stationId)
        .then(_ => {
          selectedRiver = new River()
          selectedStation = stations.get(stationId)
        })
    }
  
  }

</script>

<!-- User feedback modal, invisible unless there is feedback to show to user -->
<UserFeedbackMessage />

<LeafletMap
  {dataType}
  rivers={filteredRivers}
  stations={filteredStations}
  {selectedRiver}
  {selectedStation}
  on:stationClicked={stationClicked}
  on:riverClicked={riverClicked}/>


<div class="leftSidebar">
  <Sidebar title="Filter" typeClose="sideButton" side="left">
    <Filter
      {selectableSpecies}
      bind:dataType
      bind:selectedSpecies
      bind:selectedStartDate
      bind:selectedEndDate/>
  </Sidebar>
</div>


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
    top: var(--header-height);
    left: 0;
    height: calc(100vh - var(--header-height));
    width: fit-content;
  }
  .rightSidebar {
    position: absolute;
    top: var(--header-height);
    right: 0;
    height: calc(100vh - var(--header-height));
    width: fit-content;
  }
</style>
