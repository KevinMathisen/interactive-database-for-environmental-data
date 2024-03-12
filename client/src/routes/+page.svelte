<script>
    import LeafletMap from '$lib/LeafletMap.svelte';
    import Filter from '$lib/filter.svelte';
    import { getRivers, getStations } from '../utils/dataManager.js';
    import { getSelectableSpecies, filterRiversByDateAndSpecies, filterStationsByDateAndSpecies } from '../utils/filterData.js';
    import { riverStore } from '../stores/riverStore.js';
    import { stationStore } from '../stores/stationStore.js';
	import Sidebar from '../lib/Sidebar.svelte';

    let rivers;             // Rivers with coordinates
    let stations;           // Stations with coordinates
    let selectableSpecies;  // All unique species

    let dataType;           // "river" or "station", chosen by user
    let selectedSpecies;    // Species user wants to look at
    let selectedStartDate;  // Start date for the time user wants to look at
	let selectedEndDate;    // End date for the time user wants to look at

    let filteredRivers;     // Rivers filtered by date and species
    let filteredStations;   // Stations filtered by date and species

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



<LeafletMap {dataType} {filteredRivers} {filteredStations}/>

<div class="sidebar">
    <Sidebar title="Filter" typeClose="cross">
        <Filter 
            showCloseButton=true 
            {selectableSpecies}
            bind:dataType
            bind:selectedSpecies 
            bind:selectedStartDate 
            bind:selectedEndDate/>
    </Sidebar>
</div>


<style>
    .sidebar {
        position: absolute;
        top: 80px;
        left: 0;
        height: calc(100vh - 80px);
        width: 20em;
    }
</style>