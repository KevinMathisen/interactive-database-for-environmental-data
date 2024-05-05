<script>
  import {
    FEEDBACK_TYPES,
    FEEDBACK_CODES,
    FEEDBACK_MESSAGES
  } from '../../constants/feedbackMessages.js'
  import { addFeedbackToStore } from '../../utils/addFeedbackToStore.js'
  import UserFeedbackMessage from '$lib/UserFeedbackMessage.svelte'
  import Button from '$lib/user-input/Button.svelte'
  import { parseAndValidateExcel } from '../../utils/validation.js'
  import { uploadFileToServer } from '../../api/upload.js'

  let selectedFile = null
  let hover = false

  /**
   * Selects file from the user's computer
   */
  function selectFile () {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.multiple = false
    fileInput.accept = '.xlsx'
    fileInput.click()
    fileInput.addEventListener('change', (e) => {
      selectedFile = e.target.files[0]
    })
  }

  /**
   * Uploads the file to the server if it is a valid XLSX file
   */
  async function uploadFile () {
    // validate XLSX file
    if (!(await parseAndValidateExcel(selectedFile))) {
      return
    }

    // Upload file to server
    await uploadFileToServer(selectedFile).then((success) => {
      // Reset the uploaded file if the upload was successful
      if (success) {
        selectedFile = null
      }
    })
  }

  /**
   * Handles the drop event when a file is dropped in the upload box
   * @param {Event} e - The event object
   */
  function handleDrop (e) {

    // Get the files and check if there is more than one file
    const files = e.dataTransfer.files
    if (files.length > 1) {
      addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.FORBIDDEN, FEEDBACK_MESSAGES.MULTIPLE_FILES)
      hover = false
      return
    }

    // Check if the file is an XLSX file
    if (!files[0].name.endsWith('.xlsx')) {
      addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.FORBIDDEN, FEEDBACK_MESSAGES.UNSUPPORTED_CONTENT_TYPE)
      hover = false
      return
    }

    // Select the file
    selectedFile = files[0]
    hover = false
  }
</script>

<UserFeedbackMessage />

<div class='uploadPage'>
  <!--Defines the box where you can drag and drop or choose files -->
  <div
    class='uploadFilesBox'
    class:hover={hover}
    on:dragover|preventDefault
    on:dragenter|preventDefault={() => { hover = true }}
    on:dragleave|preventDefault={(e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) {
        hover = false
      }
    }}
    on:drop|preventDefault={handleDrop}
    role='button'
    label='Drop files here to load'
    tabindex='0'
  >
    <img src='/uploadCloudIcon.svg' alt='' height='60px' id='uploadCloudIcon' />
    <p>Dra og slipp fil eller</p>
    <br>
    <div role='button'>
      <Button type='blue' size='large' on:buttonClick={selectFile}>Bla gjennom Filer <img src='/fileSearchIcon.svg' alt='File search' height='40px' class='white-color'></Button>
    </div>
  </div>

  <!-- Defines the text under the upload files box -->
  <div class='uploadFilesBoxText'>
    <p>Maksimal fil størrelse: 10 MB</p>
    <p>Kun tillatt å laste opp filer av typen: .xlsx</p>
  </div>

  <!-- Defines the overview over files selected -->
  <div class='uploadFileUploaded'>
    <p id='fileChosenText'>Valgt fil:</p>
    {#if selectedFile}
      <p>{selectedFile.name}
        <button on:click={() => { selectedFile = null }} class='smallButton'>x</button>
      </p>

    {:else}
      <p>Ingen fil valgt</p>
    {/if}
  </div>

  <!-- The upload files button -->
  <div class='uploadButtonPlacement' role='button'>
    <Button type='orange' size='medium' on:buttonClick={uploadFile}>Last opp <img src='/uploadIcon.svg' alt='Upload' height='40px' class='uploadIcon white-color'></Button>
  </div>

</div>

<style>
  .uploadPage {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100vh - var(--header-height));
    width: 100%;
  }

  .uploadFilesBox {
    border: 2px dashed black;
    margin-top: 3rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    max-width: 900px;
    height: 13em;
    font-size: 1.5rem;
  }

  .hover {
    background: lightblue;
  }

  #uploadCloudIcon {
    height: 100px;
  }

  .uploadFilesBoxText {
    width: 80%;
    max-width: 900px;
    padding: 1rem;
    text-align: left;
  }

  .uploadFileUploaded {
    width: 80%;
    max-width: 900px;
    padding: 1rem;
    text-align: left;
  }

  #fileChosenText {
    font-size: 2rem;
    margin: 0;
  }

  .smallButton {
    padding: 0.5em;
    margin: 0.5em 0;
    border-radius: 0.5em;
    cursor: pointer;
  }

  .smallButton:hover {
    background-color: #435768;
    color: white;
  }

  .uploadButtonPlacement {
    display: flex;
    justify-content: center;
    margin-left: auto;
    margin-right: 20%;
  }

  /* Transformes the icon color to white */
  .white-color{
    filter: invert(100%);
  }
</style>
