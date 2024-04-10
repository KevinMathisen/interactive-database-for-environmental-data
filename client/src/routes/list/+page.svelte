<script> // List page logic here
  import Filter from '$lib/filter.svelte'
  import SortableTable from '$lib/SortableTable.svelte'
  import SearchBar from '$lib/user-input/SearchBar.svelte'
  import Sidebar from '$lib/Sidebar.svelte'
  import RiverSummary from '$lib/RiverSummary.svelte'
  import StationSummary from '$lib/StationSummary.svelte'
  import { getRivers, getStations, getRiverSummary, getStationSummary } from '../../utils/dataManager.js'
  import { getSelectableSpecies, filterRiversByDateAndSpecies, filterStationsByDateAndSpecies, filterRiversBySearch, filterStationsBySearch } from '../../utils/filterData.js'
  import { formatRiversForTable, formatStationsForTable } from '../../utils/formatData.js'
  import { riverStore } from '../../stores/riverStore.js'
  import { stationStore } from '../../stores/stationStore.js'
  import { onMount } from 'svelte'
  import UserFeedbackMessage from '$lib/UserFeedbackMessage.svelte'
  import { River } from '../../models/River.js'
  import { Station } from '../../models/Station.js'
  import { page } from '$app/stores'

  let rivers // Rivers with coordinates
  let stations // Stations with coordinates
  let selectableSpecies // All unique species

  let dataType = 'river' // "river" or "station", chosen by user
  let selectedSpecies // Species user wants to look at
  let selectedStartDate // Start date for the time user wants to look at
  let selectedEndDate // End date for the time user wants to look at
  let searchQuery = '' // Search query from user

  let selectedRiver = new River() // River the user has chosen
  let selectedStation = new Station() // Station the user has chosen
  let riverStationPageTitle = ''

  let filteredRivers // Rivers filtered by date and species
  let filteredStations // Stations filtered by date and species
  let filteredBySearchRivers // Rivers filtered by search
  let filteredBySearchStations // Stations filtered by search
  let headers = [] // Header for the table
  let rows = [] // Rows for the table

  // Set data page title based on data type
  $: riverStationPageTitle = dataType === 'river' ? 'Elvedata' : 'Stasjonsdata'

  // Get rivers and stations from stores
  $: rivers = $riverStore
  $: stations = $stationStore
  $: selectableSpecies = getSelectableSpecies(rivers)

  // Find which rivers and stations to show be searchable based on filters
  $: filteredRivers = filterRiversByDateAndSpecies(rivers, selectedSpecies, selectedStartDate, selectedEndDate)
  $: filteredStations = filterStationsByDateAndSpecies(stations, selectedSpecies, selectedStartDate, selectedEndDate)

  // Filter rivers and stations to display based on search query
  $: filteredBySearchRivers = filterRiversBySearch(filteredRivers, searchQuery)
  $: filteredBySearchStations = filterStationsBySearch(filteredStations, searchQuery)

  // Remove selected river or station when the user switches between data types
  $: if (dataType === 'station') {
    selectedRiver = new River()
  } else if (dataType === 'river') {
    selectedStation = new Station()
  }

  // Update the table when the user input changes
  $: ({ headers, rows } = createHeaderAndData(dataType, filteredBySearchRivers, filteredBySearchStations))

  // Update URL to reflect selected river or station
  $: if (selectedRiver || selectedStation) {
    updateUrl(selectedRiver, selectedStation)
  }

  onMount(async () => {
    // Get rivers and stations from API
    await Promise.all([getRivers(), getStations()])
    getUrlParams()
  })

  /**
   * Handles when a river or station in the table is clicked
   * @param {Event} event - The click event
   */
  function handleRowClick (event) {
    if (dataType === 'river') {
      riverClicked(event)
    } else if (dataType === 'station') {
      stationClicked(event)
    }
  }

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
    // Set the data type to station
    dataType = 'station'

    // Get the station data and set the station as the selected station
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
    // Set the data type to river
    dataType = 'river'

    // Get the river data and set the river as the selected river
    getRiverSummary(riverId)
      .then(_ => {
        selectedStation = new Station()
        selectedRiver = rivers.get(riverId)
      })
  }

  /**
   * Toggles the river/station summary by resetting the selected river and station
   */
  function toggleSummaryPage () {
    selectedRiver = new River()
    selectedStation = new Station()
  }

  /**
   * Create the header and data for the table
   * @param {string} dataType - "river" or "station"
   * @param {Map<number, object>} filteredBySearchRivers - Rivers filtered by search
   * @param {Map<number, object>} filteredBySearchStations - Stations filtered by search
   * @returns {{headers: string[], rows: string[][]}} - Headers and rows for the table
   */
  function createHeaderAndData (dataType, filteredBySearchRivers, filteredBySearchStations) {
    if (dataType === 'river') {
      return formatRiversForTable(filteredBySearchRivers)
    } else if (dataType === 'station') {
      return formatStationsForTable(filteredBySearchStations)
    }
    return { headers: [], rows: [] }
  }

  /**
   * Updates the URL to reflect the selected river or station
   * @param {River} selectedRiver - The selected river
   * @param {Station} selectedStation - The selected station
   */
  function updateUrl (selectedRiver, selectedStation) {
    // Check if the code is running in the browser, if not return
    if (typeof window === 'undefined') return

    // Get the current URL
    const url = new URL(window.location.href)

    // Set the selected river in the url
    if (selectedRiver.id) {
      url.searchParams.set('river', selectedRiver.id)
    } else {
      url.searchParams.delete('river')
    }

    // Set the selected station in the url
    if (selectedStation.id) {
      url.searchParams.set('station', selectedStation.id)
    } else {
      url.searchParams.delete('station')
    }

    // Update the URL
    history.pushState({}, '', url)
  }

  /**
   * Gets the river or station based on the URL parameters
   */
  function getUrlParams () {
    // Get the river and station id from the URL if they are defined
    const searchParams = new URLSearchParams($page.url.search)
    const riverId = Number(searchParams.get('river'))
    const stationId = Number(searchParams.get('station'))

    // Select the river or station based on the id in the URL
    if (riverId) {
      selectRiver(riverId)
    } else if (stationId) {
      selectStation(stationId)
    }
  }
</script>

<!-- User feedback modal, invisible unless there is feedback to show to user -->
<UserFeedbackMessage />

<div class='listPage'>
  <!-- Filter sidebar -->
  <div class="sidebar">
    <Sidebar title="Filter" side='left' typeClose="sideButton">
      <Filter
        showCloseButton=true
        {selectableSpecies}
        bind:dataType
        bind:selectedSpecies
        bind:selectedStartDate
        bind:selectedEndDate/>
    </Sidebar>
  </div>

  <div class='listMain'>
    <!-- Search bar -->
    <SearchBar
      bind:searchQuery
      bind:dataType/>

    <!-- Table with Rivers or Stations -->
    <div class='tablecontainer'>
      <SortableTable
        {headers}
        {rows}
        clickable=true
        on:rowClick={handleRowClick}
      />
    </div>
  </div>
</div>

<!-- River/station page, invisible unless a river or station is selected -->
{#if selectedRiver.id}
<div class='riverStationPage'>
  <Sidebar title={riverStationPageTitle} typeClose='cross' on:close={toggleSummaryPage}>
    <RiverSummary river={selectedRiver} wide={true} on:goToStationData={stationClicked}/>
  </Sidebar>
</div>
{:else if selectedStation.id}
<div class='riverStationPage'>
  <Sidebar title={riverStationPageTitle} typeClose='cross' on:close={toggleSummaryPage}>
    <StationSummary station={selectedStation} wide={true} on:goToRiverData={riverClicked}/>
  </Sidebar>
</div>
{/if}

<style>
  .listPage {
    height: calc(100vh - var(--header-height));
    width: 100%;
    display: flex;
  }

  .sidebar {
    height: 100%;
    width: fit-content;
  }

  .listMain {
    flex-grow: 1;
    padding: 4em;
    display: flex;
    flex-direction: column;
  }

  .tablecontainer {
    flex-grow: 1;
    overflow-y: auto;
    display: block;
  }

  .riverStationPage {
    position: absolute;
    top: var(--header-height);
    right: 0;
    height: calc(100vh - var(--header-height));
    width: 100%;
  }
</style>
