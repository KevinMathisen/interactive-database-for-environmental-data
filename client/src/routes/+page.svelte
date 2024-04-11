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
  import { addFeedbackToStore } from '../utils/addFeedbackToStore'
  import { FEEDBACK_TYPES, FEEDBACK_CODES, FEEDBACK_MESSAGES } from '../constants/feedbackMessages'
  import { DATATYPE_RIVER, DATATYPE_STATION } from '../constants/dataTypes'
  import { goto } from '$app/navigation'

  let rivers = new Map() // Rivers with coordinates
  let stations = new Map() // Stations with coordinates
  let selectableSpecies // All unique species

  let dataType = DATATYPE_RIVER // 'river' or 'station', chosen by user
  let selectedSpecies // Species user wants to look at
  let selectedStartDate // Start date for the time user wants to look at
  let selectedEndDate // End date for the time user wants to look at

  let filteredRivers // Rivers filtered by date and species
  let filteredStations // Stations filtered by date and species

  let selectedRiver = new River() // River the user has chosen
  let selectedStation = new Station() // Station the user has chosen

  let sideBarTitle = ''

  // Set sidebar title based on data type
  $: sideBarTitle = dataType === DATATYPE_RIVER ? 'Elvedata' : 'Stasjonsdata'

  // Get rivers and stations from stores
  $: rivers = $riverStore
  $: stations = $stationStore
  $: selectableSpecies = getSelectableSpecies(rivers)

  // Find which rivers and stations to show on the map based on user input
  $: filteredRivers = filterRiversByDateAndSpecies(rivers, selectedSpecies, selectedStartDate, selectedEndDate)
  $: filteredStations = filterStationsByDateAndSpecies(stations, selectedSpecies, selectedStartDate, selectedEndDate)

  // Remove selected river or station when the user switches between data types
  $: if (dataType === DATATYPE_STATION) {
    selectedRiver = new River()
  } else if (dataType === DATATYPE_RIVER) {
    selectedStation = new Station()
  }

  // Update URL to reflect selected river or station
  $: if (selectedRiver || selectedStation) {
    updateUrl(selectedRiver, selectedStation)
  }

  onMount(async () => {
    // Get rivers and stations from API
    await Promise.all([getRivers(), getStations()])
    // Get if the user has selected a river or station from URL
    getUrlParams()
  })

  /**
   * Handles the click event on a station
   * @param {Event} event - The click event
   */
  function stationClicked (event) {
    selectStation(event.detail.id)
  }

  /**
   * Selects a station and fetches its data
   * @param {number} stationId - The id of the station to select
   */
  function selectStation (stationId) {
    // Check if the station clicked is in filtered stations
    if (!filteredStations.has(stationId)) {
      addFeedbackToStore(FEEDBACK_TYPES.INFO, FEEDBACK_CODES.NOT_FOUND, FEEDBACK_MESSAGES.STATION_NOT_SELECTABLE)
      return
    }

    // Set the data type to station and get the station summary
    dataType = DATATYPE_STATION
    getStationSummary(stationId)
      .then(_ => {
        selectedRiver = new River()
        selectedStation = stations.get(stationId)
      })
  }

  /**
   * Handles the click event on a river
   * @param {Event} event - The click event
   */
  function riverClicked (event) {
    selectRiver(event.detail.id)
  }

  /**
   * Selects a river and fetches its data
   * @param {number} riverId - The id of the river to select
   */
  function selectRiver (riverId) {
    // Check if the river clicked is in filtered rivers
    if (!filteredRivers.has(riverId)) {
      addFeedbackToStore(FEEDBACK_TYPES.INFO, FEEDBACK_CODES.NOT_FOUND, FEEDBACK_MESSAGES.RIVER_NOT_SELECTABLE)
      return
    }

    // Set the data type to river and get the river summary
    dataType = DATATYPE_RIVER
    getRiverSummary(riverId)
      .then(_ => {
        selectedStation = new Station()
        selectedRiver = rivers.get(riverId)
      })
  }

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
  function updateUrl (selectedRiver, selectedStation) {
    if (typeof window === 'undefined') return

    const url = new URL(window.location.href)
    if (selectedRiver.id) {
      url.searchParams.set(DATATYPE_RIVER, selectedRiver.id)
    } else {
      url.searchParams.delete(DATATYPE_RIVER)
    }

    if (selectedStation.id) {
      url.searchParams.set(DATATYPE_STATION, selectedStation.id)
    } else {
      url.searchParams.delete(DATATYPE_STATION)
    }

    // Update the URL
    goto(url.toString(), { replaceState: true })
  }

  /**
   * Gets the river or station based on the URL parameters
   */
  function getUrlParams () {
    const searchParams = new URLSearchParams($page.url.search)
    const riverId = Number(searchParams.get(DATATYPE_RIVER))
    const stationId = Number(searchParams.get(DATATYPE_STATION))

    if (riverId) {
      selectRiver(riverId)
    } else if (stationId) {
      selectStation(stationId)
    }
  }

</script>

<!-- User feedback modal, invisible unless there is feedback to show to user -->
<UserFeedbackMessage />

<!-- Map with rivers and stations -->
<LeafletMap
  {dataType}
  rivers={filteredRivers}
  stations={filteredStations}
  {selectedRiver}
  {selectedStation}
  on:stationClicked={stationClicked}
  on:riverClicked={riverClicked}/>

<div class='leftSidebar'>
  <!-- Filter sidebar -->
  <Sidebar title='Filter' typeClose='sideButton' side='left'>
    <Filter
      {selectableSpecies}
      bind:dataType
      bind:selectedSpecies
      bind:selectedStartDate
      bind:selectedEndDate/>
  </Sidebar>
</div>

{#if selectedRiver.id}
  <!-- Right sidebar with river summary -->
  <div class='rightSidebar'>
    <Sidebar title={sideBarTitle} typeClose='cross' side='right' on:close={toggleRightSidebar}>
      <RiverSummary river={selectedRiver} on:goToStationData={stationClicked}/>
    </Sidebar>
  </div>
{:else if selectedStation.id}
  <!-- Right sidebar with station summary -->
  <div class='rightSidebar'>
    <Sidebar title={sideBarTitle} typeClose='cross' side='right' on:close={toggleRightSidebar}>
      <StationSummary station={selectedStation} on:goToRiverData={riverClicked}/>
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
