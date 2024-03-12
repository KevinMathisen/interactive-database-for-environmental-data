<script>
    import LeafletMap from '$lib/LeafletMap.svelte';
    import Filter from '$lib/filter.svelte'; 
    import { getRivers, getStations } from '../utils/dataManager.js';
    import { getSelectableSpecies, filterRiversByDateAndSpecies, filterStationsByDateAndSpecies } from '../utils/filterData.js';
    import { riverStore } from '../stores/riverStore.js';
    import { stationStore } from '../stores/stationStore.js';

    let rivers;             // Rivers with coordinates
    let stations;           // Stations with coordinates
    let selectableSpecies;  // All unique species

    let dataType;           // "river" or "station", chosen by user
    let selectedSpecies;    // Species user wants to look at
    let selectedStartDate;  // Start date for the time user wants to look at
	let selectedEndDate;    // End date for the time user wants to look at

    let filteredRivers;     // Rivers filtered by date and species
    let filteredStations;   // Stations filtered by date and species
  
    let sideBar = false;
    let sideBarTitle = 'Sidebar';
  
    function stationClicked(event) {
        sideBar = true;
        sideBarTitle = event.detail.text.name;
    }

      function mapClicked(event) {
          sideBar = false;
    }

    // Get rivers and stations from API
    getRivers();
    getStations();

    // Get rivers and stations from stores
    $: rivers = $riverStore;
    $: stations = $stationStore;
    $: selectableSpecies = getSelectableSpecies(rivers);

    // Find which rivers and stations to show on the map based on user input
    $: filteredRivers = filterRiversByDateAndSpecies(rivers, selectedSpecies, selectedStartDate, selectedEndDate);
    $: filteredStations = filterStationsByDateAndSpecies(stations, selectedSpecies, selectedStartDate, selectedEndDate);


</script>

<Filter 
    showCloseButton=true 
    {selectableSpecies}
    bind:dataType
    bind:selectedSpecies 
    bind:selectedStartDate 
    bind:selectedEndDate/>

<LeafletMap {dataType} {rivers} {stations} on:map={mapClicked} on:message={stationClicked}/>



{#if sideBar}
    <div class="sidebar">{sideBarTitle}</div>
{/if}


<style>
    .sidebar {
        position: absolute;
        top: 80px;
        right: 0;
        width: 200px;
        height: calc(100vh - 200px);
        background-color: #f4f4f4;
        z-index: 1000;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
</style>