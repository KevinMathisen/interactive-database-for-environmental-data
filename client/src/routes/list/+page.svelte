<script> // List page logic here
    import Filter from '$lib/filter.svelte'
    import SortableTable from '../../lib/SortableTable.svelte'
    import SearchBar from '../../lib/SearchBar.svelte'
    import Sidebar from '../../lib/Sidebar.svelte'
    import { getRivers, getStations } from '../../utils/dataManager.js'
    import { getSelectableSpecies, filterRiversByDateAndSpecies, filterStationsByDateAndSpecies, filterRiversBySearch, filterStationsBySearch } from '../../utils/filterData.js'
    import { formatRiversForTable, formatStationsForTable } from '../../utils/formatData.js'
    import { riverStore } from '../../stores/riverStore.js'
    import { stationStore } from '../../stores/stationStore.js'
    import { onMount } from 'svelte'
    import UserFeedbackMessage from '../../lib/UserFeedbackMessage.svelte';

    let rivers // Rivers with coordinates
    let stations // Stations with coordinates
    let selectableSpecies // All unique species

    let dataType // "river" or "station", chosen by user
    let selectedSpecies // Species user wants to look at
    let selectedStartDate // Start date for the time user wants to look at
    let selectedEndDate // End date for the time user wants to look at
    let searchQuery = '' // Search query from user

    let filteredRivers // Rivers filtered by date and species
    let filteredStations // Stations filtered by date and species
    let filteredBySearchRivers // Rivers filtered by search
    let filteredBySearchStations // Stations filtered by search
    let headers = [] // Header for the table
    let rows = [] // Rows for the table

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

<!-- Filter sidebar -->
<div class="sidebar">
    <Sidebar title="Filter">
        <Filter
            showCloseButton=true
            {selectableSpecies}
            bind:dataType
            bind:selectedSpecies
            bind:selectedStartDate
            bind:selectedEndDate/>
    </Sidebar>
</div>

<div class=tablecontainer>
    <!-- Search bar -->
    <SearchBar
        bind:searchQuery
        bind:dataType/>

    <!-- Table with Rivers or Stations -->
    <SortableTable
        {headers}
        {rows}
        clickable=true
        on:rowClick={handleRowClick}
    />
</div>

<style>
    .sidebar {
        position: absolute;
        top: var(--header-height);
        left: 0;
        height: calc(100vh - var(--header-height));
        width: 20em;
    }

    .tablecontainer {
        padding-left: 450px;
        padding-right: 100px;
        padding-top: 30px;
    }
</style>
