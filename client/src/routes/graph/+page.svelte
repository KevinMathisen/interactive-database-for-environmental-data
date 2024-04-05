<script>
    import GraphFilter from '$lib/GraphFilter.svelte'
    import Sidebar from '../../lib/Sidebar.svelte'
    import PlotlyComponent from './PlotlyComponent.svelte'
    import Modal from '../../lib/Modal.svelte'
    import SelectRiverAndStation from '../../lib/user-input/SelectRiverAndStation.svelte'
    import { riverStore } from '../../stores/riverStore.js'
    import { stationStore } from '../../stores/stationStore.js'
    import { getRiverSummary, getStationSummary, getRivers, getStations } from '../../utils/dataManager.js'
    import { getSelectableSpecies } from '../../utils/filterData.js'
    import { onMount } from 'svelte'
    import UserFeedbackMessage from '../../lib/UserFeedbackMessage.svelte'

    let showSelectRiverAndStationModal = false // Show the modal to select rivers and stations

    let rivers = new Map() // All rivers
    let stations = new Map() // All stations
    let selectedRivers = new Map() // Rivers the user has chosen
    let selectedStations = new Map() // Stations the user has chosen
    let selectableSpecies // All unique species in rivers or stations choosen

    let dataFetched = false // Whether data has been fetched

    let dataType // "river" or "station", chosen by user
    let selectedSpecies // Species user wants to look at
    let includeOthers // Whether to include 'others' category in the graph
    let plotData = new Map() // Data to plot

    let showPlotA // Show the first plot
    let showValueA // 'absolute' or 'relative'
    let plotTypeA // 'barchart' or 'piechart'

    let showPlotB // Show the second plot
    let intervallPlotB // Interval for the histogram
    let plotTypeB // 'histogram' or 'boxplot'
    let combineSpecies // Whether to combine species for each river/station in plot B

    onMount(async () => {
      // Get rivers and stations from API
      getRivers()
      getStations()
    })

    // Get rivers and stations from stores
    $: rivers = $riverStore
    $: stations = $stationStore

    $: if (selectedRivers.size !== 0 || selectedStations.size !== 0) {
      onSelectRiverStation()
    }

    // Get selectable species
    $: selectableSpecies = dataType === 'river' ? getSelectableSpecies(selectedRivers) : getSelectableSpecies(selectedStations)

    // Get data to plot from if data has been fetched
    $: if (dataFetched && (selectedRivers.size > 0 || selectedStations.size > 0) && dataType) {
      plotData = dataType === 'river' ? selectedRivers : selectedStations
      dataFetched = false
    }

    /**
     * Get the selectable species from the rivers or stations
     */
    function onSelectRiverStation () {
      // should get the selected rivers and stations from event
      if (dataType === 'river') {
        selectedRivers.forEach((_, id) => {
          getRiverSummary(id).then(_ => {
            selectedRivers.set(id, rivers.get(id))
            dataFetched = true // Trigger svelte to update
          })
        })
      } else {
        selectedStations.forEach((_, id) => {
          getStationSummary(id).then(_ => {
            selectedStations.set(id, stations.get(id))
            dataFetched = true // Trigger svelte to update
          })
        })
      }
    }

    /**
     * Handles the close event from the modal
     */
    function handleClose () {
      showSelectRiverAndStationModal = false
    }

    /**
     * Handles the clikc event on a river
     */
    function handleSelectRiverStation () {
      showSelectRiverAndStationModal = true
    }

</script>

<!-- User feedback modal, invisible unless there is feedback to show to user -->
<UserFeedbackMessage />

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
                bind:includeOthers
                bind:showPlotA
                bind:showValueA
                bind:plotTypeA
                bind:showPlotB
                bind:intervallPlotB
                bind:plotTypeB
                bind:combineSpecies
                on:selectRiverAndStation={handleSelectRiverStation}
                />
        </Sidebar>
    </div>

    <div class="graphMain">

        {#if showPlotA}
            <div class="graphBox1">
                <h3>FORDELING AV ARTER</h3>
                <PlotlyComponent
                    type={plotTypeA}
                    {plotData}
                    {dataType}
                    species={selectedSpecies}
                    absoluteValues={showValueA}
                    {includeOthers}
                    />
            </div>
        {/if}

        {#if showPlotB}
            <div class="graphBox2">
                <h3>FORDELING AV LENGDE</h3>
                <PlotlyComponent
                    type={plotTypeB}
                    {plotData}
                    {dataType}
                    species={selectedSpecies}
                    interval={intervallPlotB}
                    {includeOthers}
                    {combineSpecies}
                    />
            </div>
        {/if}
    </div>

</div>

<style>
    .graphPage {
        height: calc(100vh - var(--header-height));
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
