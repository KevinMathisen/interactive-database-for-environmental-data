<script>
  import GraphFilter from '$lib/GraphFilter.svelte'
  import Sidebar from '$lib/Sidebar.svelte'
  import PlotlyComponent from './PlotlyComponent.svelte'
  import Modal from '$lib/Modal.svelte'
  import SelectRiverAndStation from '$lib/user-input/SelectRiverAndStation.svelte'
  import { riverStore } from '../../stores/riverStore.js'
  import { stationStore } from '../../stores/stationStore.js'
  import { getRiverSummary, getStationSummary, getRivers, getStations } from '../../utils/dataManager.js'
  import { getSelectableSpecies } from '../../utils/filterData.js'
  import { onMount } from 'svelte'
  import UserFeedbackMessage from '$lib/UserFeedbackMessage.svelte'
  import { page } from '$app/stores'
  import { DATATYPE_RIVER, DATATYPE_STATION } from '../../constants/dataTypes'
  import { goto } from '$app/navigation'

  let showSelectRiverAndStationModal = false // Show the modal to select rivers and stations

  let rivers = new Map() // All rivers
  let stations = new Map() // All stations
  let selectedRivers = new Map() // Rivers the user has chosen
  let selectedStations = new Map() // Stations the user has chosen
  let selectableSpecies // All unique species in rivers or stations choosen

  let dataUpdated = false // Whether data has been fetched

  let dataType // 'river' or 'station', chosen by user
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
    await Promise.all([getRivers(), getStations()])
    getUrlParams()
  })

  // Get rivers and stations from stores
  $: rivers = $riverStore
  $: stations = $stationStore

  // Fetched data for all rivers or stations that are selected
  $: if (selectedRivers.size !== 0 || selectedStations.size !== 0) {
    fetchRiverStationData()
  }

  // Get selectable species
  $: selectableSpecies = dataType === DATATYPE_RIVER ? getSelectableSpecies(selectedRivers) : getSelectableSpecies(selectedStations)

  // Set the data to plot if selected rivers or stations was modified, if new data was fetched or if the data type was changed
  $: if (dataUpdated && (selectedRivers || selectedSpecies) && dataType) {
    updatePlotData()
  }

  // Trigger update of plot data when data type is changed, or if 
  $: if (dataType || (selectedRivers.size === 0 && dataType === DATATYPE_RIVER) || (selectedStations.size === 0 && dataType === DATATYPE_STATION)) {
    dataUpdated = true
  }

  // Update URL to reflect selected rivers or stations
  $: if (dataType && (selectedRivers || selectedStations)) {
    updateUrl(selectedRivers, selectedStations)
  }

  /**
   * Update the plot data based on the selected rivers or stations
   * Will only update if either all rivers or all stations have been fetched
   */
   function updatePlotData () {
     // Reset plot data and set data updated to false
     plotData = new Map()
     dataUpdated = false

     if (dataType === DATATYPE_RIVER) {
       // Check if all rivers have been fetched and can be plotted
       const allRiversFetched = Array.from(selectedRivers.values()).every(river => river?.stations)

       // If all rivers have been fetched, set the plot data to the selected rivers
       plotData = allRiversFetched ? selectedRivers : plotData
     } else if (dataType === DATATYPE_STATION) {
       // Check if all stations have been fetched and can be plotted
       const allStationsFetched = Array.from(selectedStations.values()).every(station => station?.observations)

       // If all stations have been fetched, set the plot data to the selected stations
       plotData = allStationsFetched ? selectedStations : plotData
     }
   }

  /**
   * Get the data needed for plotting the selected rivers or stations
   */
  function fetchRiverStationData () {
    if (dataType === DATATYPE_RIVER) {
      // For each selected river, get the summary data and update the selected rivers
      selectedRivers.forEach((_, id) => {
        getRiverSummary(id).then(_ => {
          selectedRivers.set(id, rivers.get(id))
          dataUpdated = true // Trigger svelte to update
        })
      })
    } else {
      // For each selected station, get the summary data and update the selected stations
      selectedStations.forEach((_, id) => {
        getStationSummary(id).then(_ => {
          selectedStations.set(id, stations.get(id))
          dataUpdated = true // Trigger svelte to update
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

  /**
   * Updates the URL to reflect the selected rivers or stations
   * @param {Map} selectedRivers - The selected rivers
   * @param {Map} selectedStations - The selected stations
   */
  function updateUrl (selectedRivers, selectedStations) {
    // Check if the component is running in the browser
    if (typeof window === 'undefined') return

    // Get the current URL and remove any old river and station parameters
    const url = new URL(window.location.href)
    url.searchParams.delete(DATATYPE_RIVER)
    url.searchParams.delete(DATATYPE_STATION)

    // Add the selected rivers to the URL
    if (dataType === DATATYPE_RIVER) {
      selectedRivers.forEach((_, id) => {
        url.searchParams.append(DATATYPE_RIVER, id)
      })
    } else if (dataType === DATATYPE_STATION) {
      // Add the selected stations to the URL
      selectedStations.forEach((_, id) => {
        url.searchParams.append(DATATYPE_STATION, id)
      })
    }

    // Update the URL
    goto(url.toString(), { replaceState: true })
  }

  /**
   * Gets the rivers or stations based on the URL parameters
   */
   function getUrlParams () {
     // Get the river and station ids
     const searchParams = new URLSearchParams($page.url.search)
     const riverIds = searchParams.getAll(DATATYPE_RIVER).map(Number)
     const stationIds = searchParams.getAll(DATATYPE_STATION).map(Number)

     const selectedRiversUrl = new Map()
     const selectedStationsUrl = new Map()

     // Select the rivers or stations and datatype based on the ids
     if (riverIds.length > 0) {
       dataType = DATATYPE_RIVER
       riverIds.forEach(id => {
         selectedRiversUrl.set(id, rivers.get(id))
       })
       selectedRivers = selectedRiversUrl
     } else if (stationIds.length > 0) {
       dataType = DATATYPE_STATION
       stationIds.forEach(id => {
         selectedStationsUrl.set(id, stations.get(id))
       })
       selectedStations = selectedStationsUrl
     }
   }

</script>

<!-- User feedback modal, invisible unless there is feedback to show to user -->
<UserFeedbackMessage />

{#if showSelectRiverAndStationModal}
  <!-- Modal to select river and stations -->
  <Modal on:close={handleClose} large={true}>
      <SelectRiverAndStation on:close={handleClose}
        {rivers}
        {stations}
        bind:dataType
        bind:selectedRivers
        bind:selectedStations
        />
  </Modal>
{/if}

<div class='graphPage'>
  <!-- Filter sidebar -->
  <div class='filterContainer'>
    <Sidebar title='Filter for Grafer' typeClose='sideButton' side='left'>
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

  <div class='graphMain'>

    {#if showPlotA}
      <!-- Graph for distribution of species -->
      <div class='graphBox'>
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
      <!-- Graph for distribution of length -->
      <div class='graphBox'>
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
    width: fit-content;
    height: 100%;
  }

  .graphMain {
    flex-grow: 1;
    padding: 4em;
    overflow:auto;
  }

  .graphBox {
    width: 100%;
  }

  .graphBox h3 {
    padding: 1rem 0 0 8rem;
  }

</style>
