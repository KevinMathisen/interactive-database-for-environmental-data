<script>
  import CollapsibleSection from '$lib/CollapsibleSection.svelte'
  import RadioInput from '$lib/user-input/RadioInput.svelte'
  import SpeciesInput from '$lib/user-input/SpeciesInput.svelte'
  import Modal from '$lib/Modal.svelte'
  import SelectRiverAndStation from '$lib/user-input/SelectRiverAndStation.svelte'
  import { generateExcelFile, generateCSVFile } from '../../utils/fileHandler.js'
  import {
    getRivers, getStations,
    getRiverForDownload,
    getStationForDownload
  } from '../../utils/dataManager.js'
  import { getSelectableSpecies } from '../../utils/filterData.js'
  import { riverStore } from '../../stores/riverStore.js'
  import { stationStore } from '../../stores/stationStore.js'
  import { onMount } from 'svelte'
  import UserFeedbackMessage from '$lib/UserFeedbackMessage.svelte'
  import {
    FEEDBACK_TYPES,
    FEEDBACK_CODES,
    FEEDBACK_MESSAGES
  } from '../../constants/feedbackMessages.js'
  import { addFeedbackToStore } from '../../utils/addFeedbackToStore.js'
  import Button from '$lib/user-input/Button.svelte'
  import { page } from '$app/stores'
  import { DATATYPE_RIVER, DATATYPE_STATION } from '../../constants/dataTypes'
  import { goto } from '$app/navigation'
  import { validateInteger } from '../../utils/validation.js'

  let urlParamsLoaded = false // Whether URL parameters have been loaded

  let showSelectRiverAndStationModal = false

  let rivers = new Map() // Rivers with coordinates
  let stations = new Map() // Stations with coordinates
  let selectableSpecies = [] // All unique species

  let dataType = DATATYPE_RIVER // 'river' or 'station', chosen by user
  let selectedRivers = new Map() // Rivers the user has chosen
  let selectedStations = new Map() // Stations the user has chosen

  let selectedSpecies = [] // Species to inlude in the download

  let selectedFormat = '' // Either 'xlsx' or 'csv'

  let chooseAll = true // If the user wants to choose all species
  let customSpecies = [] // Species the user has chosen

  // Species the user can choose
  $: selectableSpecies = dataType === DATATYPE_RIVER ? getSelectableSpecies(selectedRivers) : getSelectableSpecies(selectedStations)

  // Species the user has choosen; either all or the custom ones
  $: selectedSpecies = chooseAll ? selectableSpecies : customSpecies

  const formatOptions = [
    { value: 'xlsx', label: 'xlsx' },
    { value: 'csv', label: 'csv' }
  ]

  onMount(async () => {
    // Get rivers and stations from API
    await Promise.all([getRivers(), getStations()])
    getUrlParams()
  })

  // Get rivers and stations from stores
  $: rivers = $riverStore
  $: stations = $stationStore

  // Update URL to reflect selected rivers or stations
  $: if (dataType && (selectedRivers || selectedStations) && urlParamsLoaded) {
    updateUrl(selectedRivers, selectedStations)
  }

  /**
   * Get the data needed for downloading the selected rivers or stations
   */
  function fetchRiverStationData () {
    if (dataType === DATATYPE_RIVER) {
      // For each selected river, get the summary data and update the selected rivers
      selectedRivers.forEach((_, id) => {
        getRiverForDownload(id).then(_ => {
          selectedRivers.set(id, rivers.get(id))
        })
      })
    } else {
      // For each selected station, get the summary data and update the selected stations
      selectedStations.forEach((_, id) => {
        getStationForDownload(id).then(_ => {
          selectedStations.set(id, stations.get(id))
        })
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
    fetchRiverStationData()

    // Reset the species selected
    customSpecies = []
  }

  /**
   * Handles when the user wants to select rivers or stations
   * @returns {void}
   */
  function handleSelectRiverStation () {
    showSelectRiverAndStationModal = true
  }

  /**
   * Downloads a file with the content specified by the user
   * @returns {void}
   */
  async function downloadFile () {
    // Check if the user has chosen a file format
    if (selectedFormat === '') {
      addFeedbackToStore(
        FEEDBACK_TYPES.ERROR,
        FEEDBACK_CODES.NOT_FOUND,
        FEEDBACK_MESSAGES.NO_FILE_FORMAT_SELECTED
      )
      return
    }

    // Check if the user has chosen rivers but not selected any
    if (dataType === DATATYPE_RIVER && selectedRivers.size === 0) {
      addFeedbackToStore(
        FEEDBACK_TYPES.ERROR,
        FEEDBACK_CODES.NOT_FOUND,
        FEEDBACK_MESSAGES.NO_RIVERS_SELECTED
      )
      return
    }

    // Check if the user has chosen stations but not selected any
    if (dataType === DATATYPE_STATION && selectedStations.size === 0) {
      addFeedbackToStore(
        FEEDBACK_TYPES.ERROR,
        FEEDBACK_CODES.NOT_FOUND,
        FEEDBACK_MESSAGES.NO_STATIONS_SELECTED
      )
      return
    }

    // Create a file name and file extension
    const fileExtension = selectedFormat === 'xlsx' ? '.xlsx' : '.csv'
    const fileName = dataType === DATATYPE_RIVER ? 'elver' : 'stasjoner' + fileExtension

    // Create a blob with the data
    const blob = selectedFormat === 'xlsx'
      ? await generateExcelFile(selectedRivers, selectedStations, dataType, selectedSpecies)
      : await generateCSVFile(selectedRivers, selectedStations, dataType, selectedSpecies)

    // If no file was created, return
    if (blob.size === 0) {
      return
    }

    // Create a URL for the blob
    const blobUrl = URL.createObjectURL(blob)

    // Create a temporary anchor element, set the href and download attributes to the URL and file name
    const a = document.createElement('a')
    a.href = blobUrl
    a.download = fileName
    a.style.display = 'none'

    // Append the anchor element to the DOM and click it
    document.body.appendChild(a).click()

    // Remove the anchor element from the DOM
    document.body.removeChild(a)
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
        if (!isNaN(id)) {
          url.searchParams.append(DATATYPE_RIVER, id)
        }
      })
    } else if (dataType === DATATYPE_STATION) {
      // Add the selected stations to the URL
      selectedStations.forEach((_, id) => {
        if (!isNaN(id)) {
          url.searchParams.append(DATATYPE_STATION, id)
        }
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
    const riverIdsIn = searchParams.getAll(DATATYPE_RIVER)
    const stationIdsIn = searchParams.getAll(DATATYPE_STATION)

    // Check if each river and station id is a valid integer
    if (riverIdsIn.some(id => !validateInteger(id)) || stationIdsIn.some(id => !validateInteger(id))) {
      urlParamsLoaded = true // Set that URL parameters have been loaded
      return
    }

    // Convert the ids to numbers
    const riverIds = riverIdsIn.map(Number)
    const stationIds = stationIdsIn.map(Number)

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

    // Fetch the data needed for the rivers/stations choosen
    fetchRiverStationData()

    urlParamsLoaded = true // Set that URL parameters have been loaded
  }
</script>

{#if showSelectRiverAndStationModal}
  <!-- Modal for selecting rivers and stations -->
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

<!-- User feedback modal, invisible unless there is feedback to show to user -->
<UserFeedbackMessage />

<div class='downloadPage'>

  <div class='downloadHeader' role='banner'>Last ned data</div>

  <!-- Defines the area containing the options for dowloading -->
  <div class='downloadMain'>

    <div class='downloadRow'>
      <div class='rowItem'>
        <!-- Input for opening selection of river or stations -->
        <CollapsibleSection title='Velg elver/stasjoner'>
          <div class='editButton' role='button'>
            <Button
              on:buttonClick={handleSelectRiverStation}
              type='blue'
              size='small'>
                Rediger
                <img src='/editIcon.svg' alt='Edit' height='30em' class='white-color'>
            </Button>
          </div>
          {#if dataType === DATATYPE_RIVER && selectedRivers.size !== 0}
            <!-- Rivers choosen -->
            <h4>Elver valgt</h4>
            <ul>
            {#each Array.from(selectedRivers.entries()) as [_, river]}
              <li>{river.name + ' ' + river.startDate}</li>
            {/each}
            </ul>
          {:else if dataType === DATATYPE_STATION && selectedStations.size !== 0}
            <!-- Stations choosen -->
            <p>Stasjoner valgt</p>
            <ul>
            {#each Array.from(selectedStations.entries()) as [_, station]}
              <li>{station.name + ' ' + station.date}</li>
            {/each}
            </ul>
          {/if}
        </CollapsibleSection>
      </div>

      <div class='rowItem' role='radiogroup'>
        <!-- Input for choosing species -->
        <CollapsibleSection title='Art'>
          <SpeciesInput {selectableSpecies} bind:chooseAll bind:customSpecies />
        </CollapsibleSection>
      </div>
    </div>

    <div class='rowItem2' role='radiogroup'>
      <!-- Input for choosing file format -->
      <CollapsibleSection title='Format'>
        <RadioInput name='format' options={formatOptions} bind:selected={selectedFormat} />
      </CollapsibleSection>
    </div>

  </div>

  <div class='downloadButton' role='button'>
    <!-- Button for downloading the file -->
    <Button type='orange' size='medium' on:buttonClick={downloadFile}>Last ned <img src='/dowloadIcon.svg' alt='Download' height='38px' class='downloadIcon white-color'></Button>
  </div>

</div>

<style>
  .downloadPage {
    display: flex;
    flex-direction: column;
    height: calc(100vh - var(--header-height));
    width: 100%;
  }

  .downloadHeader {
    height: 100px;
    font-size:3rem;
    background-color: var(--PCOLOR);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .downloadMain {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 2rem;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    max-width: 1000px;
    align-items: center;
  }

  .downloadRow {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .rowItem {
    width: 50%;
  }

  .rowItem2 {
    width: 100%;
  }

  .downloadButton {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5rem;
    margin-bottom: 5rem;
  }

  /* Transformes the icon color to white */
  .white-color{
    filter: invert(100%);
  }

  h4 {
    margin-bottom: 0;
  }

  @media screen and (max-width: 900px) {
    .downloadRow{
      flex-direction: column;
    }
    .rowItem {
      width: 100%;
    }
  }
</style>
