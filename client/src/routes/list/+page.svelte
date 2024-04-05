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
    import { River } from '../../models/River.js';
    import { Station } from '../../models/Station.js';

    let rivers // Rivers with coordinates
    let stations // Stations with coordinates
    let selectableSpecies // All unique species

    let dataType // "river" or "station", chosen by user
    let selectedSpecies // Species user wants to look at
    let selectedStartDate // Start date for the time user wants to look at
    let selectedEndDate // End date for the time user wants to look at
    let searchQuery = '' // Search query from user

    let selectedRiver = new River // River the user has chosen
    let selectedStation = new Station // Station the user has chosen
    let riverStationPageTitle = ''

    let filteredRivers // Rivers filtered by date and species
    let filteredStations // Stations filtered by date and species
    let filteredBySearchRivers // Rivers filtered by search
    let filteredBySearchStations // Stations filtered by search
    let headers = [] // Header for the table
    let rows = [] // Rows for the table

    $: riverStationPageTitle = dataType === 'river' ? 'Elvedata' : 'Stasjonsdata'

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

    $: filteredBySearchRivers = filterRiversBySearch(filteredRivers, searchQuery)
    $: filteredBySearchStations = filterStationsBySearch(filteredStations, searchQuery)

    /**
     * Log the river/station clicked by the user,
     * TODO: should open a new page with the data
     * @param {Event} event - The click event
     */
    function handleRowClick (event) {
      console.log('Row clicked:', event.detail)
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
      getStationSummary(event.detail.id)
        .then(_ => {
          selectedRiver = new River()
          selectedStation = stations.get(event.detail.id)
        })
    }

    /**
     * Handles the click event on a river
     * @param {Event} event - The click event
     */
    function riverClicked (event) {
      getRiverSummary(event.detail.id)
        .then(_ => {
          selectedStation = new Station()
          selectedRiver = rivers.get(event.detail.id)
        })
    }

    // Remove selected river or station when the user switches between data types
    $: if (dataType === 'station') {
      selectedRiver = new River()
    } else if (dataType === 'river') {
      selectedStation = new Station()
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

    // Update the table when the user input changes
    $: ({ headers, rows } = createHeaderAndData(dataType, filteredBySearchRivers, filteredBySearchStations))

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
      <RiverSummary river={selectedRiver} wide={true}/>
  </Sidebar>
</div>
{:else if selectedStation.id}
<div class='riverStationPage'>
  <Sidebar title={riverStationPageTitle} typeClose='cross' on:close={toggleSummaryPage}>
      <StationSummary station={selectedStation} wide={true}/>
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
