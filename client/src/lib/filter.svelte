<script>
    import CollapsibleSection from "./CollapsibleSection.svelte";
    import RadioInput from "./RadioInput.svelte";
    import DateInput from "./DateInput.svelte";
    import SpeciesInput from "./SpeciesInput.svelte";

</script>

<div class=container style="width: {showFilter ? "20em" : "0px"}">
    <div class=main>
        <form > 
            <h1>Filter for Kart</h1>

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

    {#if showCloseButton}
        <button id="filterButton" on:click={toggleFilter}>&gt;</button>
    {/if}

</div>

<style>
    .container {
        position: absolute;
        top: 80px;
        left: 0;
        display: flex;
        align-items: center;
        width: 20em;
        height: calc(100vh - 80px);
        background-color: white;
        border-right: 1px solid black;
        transition: width 0.2s ease;    /* Animation for the menu */
        z-index: 1000;                      /* Makes the menu overlap the map */
    }

    .main {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        overflow: auto;
    }

    h1 {
        height: 60px;
        font-size: 2.5rem;
        background-color: #435768;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 0px;
        margin-bottom: 0.5em;
    }

    button {
      position: absolute;
      right: -35px;
      top: 50%;
      transform: translateY(-50%);
      height: 80px;
      width: 35px;
      background-color: white;
      border: 1px solid black;
      border-radius: 0 1rem 1rem 0;
      font-size: 2rem;
      font-weight: lighter;
      transition: transform 1.5s ease;    
      z-index: 1000;                       /* Makes the button overlap the map*/
      cursor: pointer;
    }
  
    button:hover {
      background-color: #435768;
    }
</style>