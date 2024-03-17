<script>
    import CollapsibleSection from '../../lib/CollapsibleSection.svelte'
    import RadioInput from '../../lib/RadioInput.svelte'
    import SpeciesInput from '../../lib/SpeciesInput.svelte'
    import Modal from '../../lib/Modal.svelte'
    import SelectRiverAndStation from '../../lib/SelectRiverAndStation.svelte'
    import { generateExcelFile, generateCSVFile } from '../../src/utils/fileHandler.js'
    import {
      getRivers, getStations,
      getRiverForDownload,
      getStationForDownload
    } from '../../utils/dataManager.js'
    import { getSelectableSpecies } from '../../utils/filterData.js'
    import { riverStore } from '../../stores/riverStore.js'
    import { stationStore } from '../../stores/stationStore.js'
    import { onMount } from 'svelte'
    import UserFeedbackMessage from '../../lib/UserFeedbackMessage.svelte'
    import {
      FEEDBACK_TYPES,
      FEEDBACK_CODES,
      FEEDBACK_MESSAGES
    } from '../../constants/feedbackMessages.js'
    import { addFeedbackToStore } from '../../utils/addFeedbackToStore.js'

    let showSelectRiverAndStationModal = false

    let rivers = new Map() // Rivers with coordinates
    let stations = new Map() // Stations with coordinates
    let selectableSpecies = [] // All unique species

    let dataType // "river" or "station", chosen by user
    let selectedRivers = new Map() // Rivers the user has chosen
    let selectedStations = new Map() // Stations the user has chosen

    // let selectedSpecies = [];

    let selectedFormat = ''
    let isDownloading = false

    let chooseAll = true // If the user wants to choose all species
    let customSpecies = [] // Species the user has chosen

    // Species the user can choose
    $: selectableSpecies = dataType === 'river' ? getSelectableSpecies(selectedRivers) : getSelectableSpecies(selectedStations)

    // Species the user has choosen; either all or the custom ones
    // $: selectedSpecies = chooseAll ? selectableSpecies : customSpecies;

    const formatOptions = [
      { value: 'xlsx', label: 'xlsx' },
      { value: 'csv', label: 'csv' }
    ]

    onMount(async () => {
      // Get rivers and stations from API
      getRivers()
      getStations()
    })

    // Get rivers and stations from stores
    $: rivers = $riverStore
    $: stations = $stationStore

    /**
     * When the user has chosen rivers or stations, get the data needed for download
     * @returns {void}
     */
    function onSelectRiverStation () {
      // Should get the selected rivers and stations from event
      if (dataType === 'river') {
        // For each river in the selectedRivers map, get the data needed for download if it is not already in the store
        selectedRivers.forEach((_, key) => {
          getRiverForDownload(key)
        })
      } else {
        // For each station in the selectedStations map, get the data needed for download if it is not already in the store
        selectedStations.forEach((_, key) => {
          getStationForDownload(key)
        })
      }
    }

    /**
     * Handles the close event from the modal
     * @returns {void}
     */
    function handleClose () {
      // Close modal
      showSelectRiverAndStationModal = false
      // Retrieve the data needed for the rivers/stations choosen
      onSelectRiverStation()
    }

    /**
     * Handles when the user wants to select rivers or stations
     * @returns {void}
     */
    function handleSelectRiverStation () {
      showSelectRiverAndStationModal = true
      console.log(selectedStations)
    }

    const sampleData = [
      { name: 'John Doe', age: 30, email: 'john@example.com' },
      { name: 'Jane Smith', age: 25, email: 'jane@example.com' },
      { name: 'Bob Johnson', age: 40, email: 'bob@example.com' }
    ]

    const downloadFile = async () => {
      isDownloading = true
      if (selectedFormat === '' && isDownloading) {
        addFeedbackToStore(
          FEEDBACK_TYPES.ERROR,
          FEEDBACK_CODES.NOT_FOUND,
          FEEDBACK_MESSAGES.NO_FILE_FORMAT_SELECTED
        )
      }
      let fileName = ''
      let blob = null
      let fileData = null

      if (selectedFormat === 'xlsx') {
        if (dataType === 'river') { // Generate Excel file
          fileData = await generateExcelFile(selectedRivers, dataType)
        } else {
          fileData = await generateExcelFile(selectedStations, dataType)
        }
        // Create a blob from the Excel file data
        blob = new Blob([fileData], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })
        fileName = 'data.xlsx'
      } else if (selectedFormat === 'csv') {
        fileData = await generateCSVFile(sampleData) // Generate CSV content
        // Create a Blob from the CSV content
        blob = new Blob([fileData], { type: 'text/csv' })
        fileName = 'data.csv'
      }

      const url = URL.createObjectURL(blob)
      // Create a temporary anchor element
      const a = document.createElement('a')
      a.href = url

      a.download = fileName // Set the filename
      document.body.appendChild(a)
      // Programmatically click the anchor element to trigger the download
      a.click()
      // Remove the anchor element from the DOM
      document.body.removeChild(a)
    }
</script>

{#if isDownloading}
    <UserFeedbackMessage />
{/if}

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

<div>
    <div class="downloadHeader">Last ned data</div>
</div>

    <!-- Defines the area containing the options for dowloading -->
<div class="downloadMain">
    <div class="row">
        <div class="rowItem">
            <!-- Input for opening selection of river or stations -->
            <CollapsibleSection title="{dataType === 'river' ? 'Elver' : 'Stasjoner'} valgt">
                <button on:click={handleSelectRiverStation}>Rediger {dataType === 'river' ? 'elver' : 'stasjoner'}</button>
                <ul>
                    {#if dataType === 'river'}
                        <p>Elver valgt</p>
                        {#each Array.from(selectedRivers.entries()) as [_, river]}
                            <li>{river.name + ' ' + river.startDate}</li>
                        {/each}
                    {:else}
                        <p>Stasjoner valgt</p>
                        {#each Array.from(selectedStations.entries()) as [_, station]}
                            <li>{station.name + ' ' + station.date}</li>
                        {/each}
                    {/if}
                </ul>
            </CollapsibleSection>
        </div>

        <div class="rowItem">
            <!-- Input for choosing species -->
            <CollapsibleSection title="Art">
                <SpeciesInput {selectableSpecies} bind:chooseAll bind:customSpecies />
            </CollapsibleSection>
        </div>
    </div>

    <div class="row">
        <!-- Input for choosing file format -->
        <CollapsibleSection title="Format">
            <RadioInput name="format" options={formatOptions} bind:selected={selectedFormat} />
        </CollapsibleSection>
    </div>
</div>

<button class="downloadButton" on:click={downloadFile}>Last ned</button>

<style>
    .downloadHeader {
        height: 100px;
        font-size:3rem;
        width: 100vw;
        background-color: #435768;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .downloadMain {
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    .row {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin: 10px;
    }

    .rowItem {
        margin: 20px;
    }

    .downloadButton {
        position: fixed;
        right: 500px;
        bottom: 100px;
        font-size: 1.2rem;
        background-color: tomato;
        border-radius: 1rem;
        width: 200px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
