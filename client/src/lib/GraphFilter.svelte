<script>
    import CollapsibleSection from "./CollapsibleSection.svelte";
    import SpeciesInput from "./SpeciesInput.svelte";
    import PlotSpeciesOptions from "./PlotSpeciesOptions.svelte";
    import PlotLengthOptions from "./PlotLengthOptions.svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let riversChosen;
    export let stationsChosen;
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
                {#each riversChosen as river}
                    <li>{river}</li>
                {/each}
            {:else}
                <p>Stasjoner valgt</p>
                {#each stationsChosen as station}
                    <li>{station}</li>
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
    /* ----------------- FILTER -----------------*/

    .main {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        overflow: auto;
    }

    .graphFilterDataContainer {
        font-size: 1rem;
        padding: 0 0 0 1rem;
    }

    #graphSearchField {
        padding: 0 0 0 1rem;
    }

    #graphSearchField2 {
        padding: 0 0 0 1rem;
        width: 50px;
    }

    #graphStationSearchField[type="search"] {
        width: 200px; 
        height: 25px;
        padding: 8px; 
        border: 1px solid black; 
        border-radius: 3px; 
        background-color: #ebebeb;     /* Color for the searchfield */
        outline: none; 
        color: #000000;
    }

    #graphStationSearchField2[type="search"] {
        width: 70px; 
        height: 25px;
        padding: 8px;
        border: 1px solid black;
        border-radius: 3px; 
        background-color: #ebebeb;     /* Color for the searchfield */
        outline: none; 
        color: #000000;
    }
    h3 {
        color: #435768;
        font-size: 1.5rem;
        padding-left: 1rem;
        margin: 1rem 0 0.5rem 0;
    }

    .graphFilter p {
        font-size: 1.2rem;
        padding: 0.5rem 0 0 1rem;
        margin: 0;
        text-decoration: underline;
    }

    .graphSetWidthForButtons { /* Used to position the radio buttons */
        width: 120px;
        display: inline-block;
    }
</style>