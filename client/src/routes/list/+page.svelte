<script> // List page logic here
    import Filter from '$lib/filter.svelte'; 
    import Table from '../../lib/Table.svelte';
    import { getRivers, getStations } from '../../utils/dataManager.js';
    import { getSelectableSpecies, filterRiversByDateAndSpecies, filterStationsByDateAndSpecies, filterRiversBySearch, filterStationsBySearch } from '../../utils/filterData.js';
    import { riverStore } from '../../stores/riverStore.js';
    import { stationStore } from '../../stores/stationStore.js';

    let rivers;             // Rivers with coordinates
    let stations;           // Stations with coordinates
    let selectableSpecies;  // All unique species

    let dataType;           // "river" or "station", chosen by user
    let selectedSpecies;    // Species user wants to look at
    let selectedStartDate;  // Start date for the time user wants to look at
	let selectedEndDate;    // End date for the time user wants to look at
    let searchQuery;        // Search query from user

    let filteredRivers;     // Rivers filtered by date and species
    let filteredStations;   // Stations filtered by date and species
    let filteredBySearchRivers;     // Rivers filtered by search
    let filteredBySearchStations;   // Stations filtered by search
    let header;            // Header for the table
    let rows;              // Rows for the table

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

    $: filteredBySearchRivers = filterRiversBySearch(filteredRivers, searchQuery);
    $: filteredBySearchStations = filterStationsBySearch(filteredStations, searchQuery);

    function handleRowClick(event) {
        console.log('Row clicked:', event.detail);
    }
</script>

<Filter/>


<div id="listSearchField">
    <label for="listSearch"></label>
    <input type="search" id="listSearch" name="listSearch" placeholder="Søk etter Elv navn eller prosjektnummer:" />
    <div id="listSearchBottomText"> Bruk filter for å filtrere resultat</div>
</div>


<div class=tablecontainer>
    <Table 
        headers={['Stasjon Navn', 'Kl.']}
        rows={[
            [1, 'Stasjon 1', '15:00'],
            [2, 'Stasjon 2', '12:00'],
            [3, 'Stasjon 3', '07:00'],
            [4, 'Stasjon 4', '19:00'],
            [5, 'Stasjon 5', '18:00']
        ]}
        clickable=true
        on:rowClick={handleRowClick}
    />
</div>

<style>
    .tablecontainer {
        padding-left: 450px;
        padding-top: 30px;
    }
    /* ----------------- SEARCHFIELD -----------------*/

    #listSearchField {
        padding-left: 500px;
        padding-top: 15px;
    }

    #listSearchBottomText {
        padding-top: 5px;
    }

    input[type="search"] {
        width: 600px; 
        height: 45px;
        padding: 8px; 
        border: 1px solid black; 
        border-radius: 10px; 
        background-color: #ebebeb;     /* Color for the searchfield */
        outline: none; 
        font-size: 16px; 
        color: #000000;
    }

    /* ----------------- TABLE -----------------*/

    #listTable {
        padding-left: 450px;
        padding-top: 30px;
    }

    table {
        border-collapse: collapse;   /* Used to avoid all borders being double-lined */
        font-size: 1.2rem;
    }

    th {
        border-bottom: 1px solid black;
        padding: 8px;
        text-align: center;
        background-color: #bdbcbc;  /* Color for the searchfield */
    }


        /* Defines the width of each column in the table */
    th:nth-child(1), td:nth-child(1) {
        width: 500px;
    }
    th:nth-child(2), td:nth-child(2) {
        width: 150px;
    }
    th:nth-child(3), td:nth-child(3) {
        width: 200px;
    }
    th:nth-child(4), td:nth-child(4) {
        width: 300px;
    }


    td {
        text-align: center;
        padding: 8px;
    }

    tr:nth-child(even) {
        background-color: #f2f2f2;  /* Color for the even numbered rows */
    }
</style>