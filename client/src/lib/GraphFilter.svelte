<script>
    import CollapsibleSection from "./CollapsibleSection.svelte";
    import SpeciesInput from "./SpeciesInput.svelte";
    import PlotSpeciesOptions from "./PlotSpeciesOptions.svelte";
    import PlotLengthOptions from "./PlotLengthOptions.svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let selectedRivers;
    export let selectedStations;
    export let selectableSpecies = [];  // Species the user can choose
    export let dataType = "river";

    export let selectedSpecies = [];
    
    export let showPlotA = true;
    export let showValueA = 'absolute';
    export let plotTypeA = 'bar';

    export let showPlotB = true;
    export let intervallPlotB = 20;
    export let plotTypeB = 'histogram';

    let chooseAll = true;               // If the user wants to choose all species
    let customSpecies = [];             // Species the user has chosen

    // Species the user has choosen; either all or the custom ones
    $: selectedSpecies = chooseAll ? selectableSpecies : customSpecies;

    function editChoosenPoints() {
        dispatch("editChoosenPoints");
        console.log('editChoosenPoints');
    }

</script>

<div class="main">
    <!-- Input for opening selection of river or stations -->
    <CollapsibleSection title="{dataType === 'river' ? 'Elver' : 'Stasjoner'} valgt">
        <button on:click={editChoosenPoints}>Rediger {dataType === 'river' ? 'elver' : 'stasjoner'}</button>
        <!-- <ul>
            {#if dataType === 'river'}
                <p>Elver valgt</p>
                {#each selectedRivers as river}
                    <li>{river.name}</li>
                {/each}
            {:else}
                <p>Stasjoner valgt</p>
                {#each selectedStations as station}
                    <li>{station.name}</li>
                {/each}
            {/if}
        </ul> -->
    </CollapsibleSection>
    

    <!-- Input for choosing species -->
    <CollapsibleSection title="Art">
        <SpeciesInput {selectableSpecies} bind:chooseAll bind:customSpecies />
    </CollapsibleSection>

    <!-- Input for choosing how plot A is displayed -->
    <CollapsibleSection title="Fordeling av arter">
        <PlotSpeciesOptions 
            bind:showPlotA 
            bind:showValueA 
            bind:plotTypeA />
    </CollapsibleSection>

    <!-- Input for choosing how plot B is displayed -->
    <CollapsibleSection title="Fordeling av lengde">
        <PlotLengthOptions 
            bind:showPlotB 
            bind:intervallPlotB 
            bind:plotTypeB />
    </CollapsibleSection>

</div>

<style>
    .main {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        overflow: auto;
    }

</style>