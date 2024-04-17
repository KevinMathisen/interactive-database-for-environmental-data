<script>
    import CollapsibleSection from './CollapsibleSection.svelte'
    import RadioInput from './user-input/RadioInput.svelte'
    import DateInput from './user-input/DateInput.svelte'
    import SpeciesInput from './user-input/SpeciesInput.svelte'
    import { DATATYPE_RIVER, DATATYPE_STATION } from '../constants/dataTypes'

    export let selectableSpecies = [] // Species the user can choose

    // User input exported to the page
    export let dataType = DATATYPE_RIVER
    export let selectedStartDate = ''
    export let selectedEndDate = ''
    export let selectedSpecies = []

    let chooseAll = true // If the user wants to choose all species
    let customSpecies = [] // Species the user has chosen

    // Species the user has choosen; either all (which is an empty array) or the custom ones
    $: selectedSpecies = chooseAll ? [] : customSpecies

    // Options when choosing data type
    const dataOptions = [
      { value: DATATYPE_RIVER, label: 'Elvedata' },
      { value: DATATYPE_STATION, label: 'Stasjonsdata' }
    ]

</script>

<div class=main>
    <form>
        <!-- Input for choosing data type -->
        <CollapsibleSection title='Type data'>
            <RadioInput name='dataType' options={dataOptions} bind:selected={dataType} />
        </CollapsibleSection>

        <!-- Input for choosing date -->
        <CollapsibleSection title='Dato'>
            <DateInput bind:selectedStartDate bind:selectedEndDate/>
        </CollapsibleSection>

        <!-- Input for choosing species -->
        <CollapsibleSection title='Art'>
            <SpeciesInput {selectableSpecies} bind:chooseAll bind:customSpecies />
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
