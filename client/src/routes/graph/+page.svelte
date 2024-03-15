<script> // Graph page logic here 
    import GraphFilter from '$lib/GraphFilter.svelte'
	import Sidebar from '../../lib/Sidebar.svelte';
    import PlotlyComponent from './PlotlyComponent.svelte';
    import Modal from '../../lib/Modal.svelte';
    import SelectRiverAndStation from '../../lib/SelectRiverAndStation.svelte';
    import { riverStore } from '../../stores/riverStore.js';
    import { stationStore } from '../../stores/stationStore.js';
    import { getRivers, getStations } from '../../utils/dataManager.js';
    import { getSelectableSpecies } from '../../utils/filterData.js';
    import { onMount } from 'svelte';

    let showSelectRiverAndStationModal = false;

    let rivers = new Map();
    let stations = new Map();
    let selectedRivers = new Map();
    let selectedStations = new Map();
    let selectableSpecies;

    let dataType;
    let selectedSpecies;

    let showPlotA;
    let showValueA;
    let plotTypeA;

    let showPlotB;
    let intervallPlotB;
    let plotTypeB;

    onMount(async () => {
        // Get rivers and stations from API
        getRivers();
        getStations();
    });

    // Get rivers and stations from stores
    $: rivers = $riverStore;
    $: stations = $stationStore;

    // Get selectable species
    $: selectableSpecies = dataType === 'river' ? getSelectableSpecies(rivers) : getSelectableSpecies(stations);

    function onSelectRiverStation() {
        // should get the selected rivers and stations from event
        if (dataType === 'river') {
            selectedRivers = new Map(rivers[3])
            selectableSpecies = getSelectableSpecies(rivers)
        } else {
            selectedStations = new Map(stations[11])
            selectableSpecies = getSelectableSpecies(stations)
        }
    }

    function handleClose() {
        showSelectRiverAndStationModal = false;
    }

    function handleSelectRiverStation() {
        showSelectRiverAndStationModal = true;
    }

</script>

{#if showSelectRiverAndStationModal}
    <Modal on:close={handleClose} large={true}>
        <SelectRiverAndStation 
            {rivers} 
            {stations} 
            bind:dataType 
            bind:selectedRivers 
            bind:selectedStations
            />
    </Modal>
{/if}
    
<div class="graphPage">
    <div class="filterContainer">
        <Sidebar title="Filter for Grafer" typeClose="sideButton">
            <GraphFilter 
                {selectedRivers}
                {selectedStations}
                {selectableSpecies}
                bind:dataType
                bind:selectedSpecies
                bind:showPlotA
                bind:showValueA
                bind:plotTypeA
                bind:showPlotB
                bind:intervallPlotB
                bind:plotTypeB
                on:selectRiverAndStation={handleSelectRiverStation}
                />
        </Sidebar>
    </div>
    
    <div class="graphMain">
        <button on:click={onSelectRiverStation}>Velg elver/stasjoner</button>

        {#if showPlotA}
            <div class="graphBox1">
                <h3>FORDELING AV ARTER</h3>
                <PlotlyComponent type={plotTypeA}/>
            </div>
        {/if}
    
        {#if showPlotB}
            <div class="graphBox2">
                <h3>FORDELING AV LENGDE</h3>
                <PlotlyComponent type={plotTypeB}/>
            </div>
        {/if}
    </div>
    
</div>


<style> 
    .graphPage {
        height: calc(100vh - 80px); 
        width: 100%;
        display: flex;
    }

    .filterContainer {
        width: 300px;
        height: 100%;
    }
    
    .graphMain {
        flex-grow: 1;
        padding: 4em;
        overflow:auto;
    }

    .graphBox1 h3 {
        padding: 1rem 0 0 8rem;
    }

    .graphBox2 h3 {
        padding: 1rem 0 0 8rem;
    }
</style>
