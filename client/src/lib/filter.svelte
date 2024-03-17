<script>
    import CollapsibleSection from './CollapsibleSection.svelte';
    import RadioInput from './RadioInput.svelte';
    import DateInput from './DateInput.svelte';
    import SpeciesInput from './SpeciesInput.svelte';

    export let selectableSpecies = [];  // Species the user can choose 

    // User input exported to the page
    export let dataType = 'river';      
    export let selectedStartDate = '';
	export let selectedEndDate = '';
    export let selectedSpecies = [];

    let chooseAll = true;               // If the user wants to choose all species
    let customSpecies = [];             // Species the user has chosen

    // Species the user has choosen; either all or the custom ones
    $: selectedSpecies = chooseAll ? selectableSpecies : customSpecies;

    // Options when choosing data type
    let dataOptions = [
        {value: 'river', label: 'Elvedata'},
        {value: 'station', label: 'Stasjonsdata'}
    ];

</script>

<div class=main>
    <form >
        <!-- Input for choosing data type -->
        <CollapsibleSection title="Type data">
            <RadioInput name="dataType" options={dataOptions} bind:selected={dataType} />
        </CollapsibleSection>

        <!-- Input for choosing date --> 
        <CollapsibleSection title="Dato">
            <DateInput bind:selectedStartDate bind:selectedEndDate/>
        </CollapsibleSection>

        <!-- Input for choosing species -->
        <CollapsibleSection title="Art">
            <SpeciesInput {selectableSpecies} bind:chooseAll bind:customSpecies />
        </CollapsibleSection>   

        <CollapsibleSection title="Valg">
            <p>{dataType}</p>
            <p>Fra {selectedStartDate}, til {selectedEndDate}</p>
            <ul>
                {#each selectedSpecies as species}
                    <li>{species}</li>
                {/each}
            </ul>
        </CollapsibleSection>

    </form>
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