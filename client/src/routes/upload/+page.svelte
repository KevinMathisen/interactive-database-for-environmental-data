<script>
  import ExcelJS from 'exceljs'
  import {
    FEEDBACK_TYPES,
    FEEDBACK_CODES,
    FEEDBACK_MESSAGES
  } from '../../constants/feedbackMessages.js'
  import { addFeedbackToStore } from '../../utils/addFeedbackToStore.js'
  import UserFeedbackMessage from '$lib/UserFeedbackMessage.svelte'
  import Button from '$lib/user-input/Button.svelte'
  import { validateFile, fileExistsInArray } from '../../utils/fileHandler.js'

  let uploadedFile = null

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
      const file = e.target.files[0]
      
      if (!validateFile(file)) {
        return
      }

      // Select the file
      uploadedFile = file
    })
  }

  /**
   *
   */
  function uploadFile () {
    // isUploading = true;
    if (!uploadedFile) {
      addFeedbackToStore(
        FEEDBACK_TYPES.ERROR,
        FEEDBACK_CODES.NOT_FOUND,
        FEEDBACK_MESSAGES.NO_FILE_SELCETED
      )
      return
    }
    // need to validate that the files are actually csv or xls files. Do this by converting to json
    // and checking if the json data follows the format we have specified
    let allFilesValid = true
    
    // Parse XLSX file
    const reader = new FileReader()
    reader.onload = async function (e) {
      const buffer = new Uint8Array(e.target.result)
      const workbook = new ExcelJS.Workbook()
      await workbook.xlsx.load(buffer)
      const worksheet = workbook.worksheets[0]
      const jsonData = worksheet.getRows(1, worksheet.rowCount).map((row) => row.values)
      console.log(jsonData)
    }
    reader.readAsArrayBuffer(uploadedFile)
    

    if (allFilesValid) {
      addFeedbackToStore(
        FEEDBACK_TYPES.SUCCESS,
        FEEDBACK_CODES.CREATED,
        FEEDBACK_MESSAGES.UPLOAD_SUCCESS
      )
    } else {
      addFeedbackToStore(
        FEEDBACK_TYPES.ERROR,
        FEEDBACK_CODES.NOT_FOUND,
        FEEDBACK_MESSAGES.NOT_FOUND
      )
    }
  }
</script>

<UserFeedbackMessage />

<div class='uploadPage'>
  <!--Defines the box where you click to choose files -->
  <div class='uploadFilesBox'>
    <img src='/uploadCloudIcon.svg' alt='listIcon' height='60px' id='uploadCloudIcon' />
    <p>Dra og slipp filer eller</p>
    <br>
    <Button type='blue' size='large' on:buttonClick={selectFile}>Bla gjennom Filer <img src='/fileSearchIcon.svg' alt='listIcon' height='40px' class='white-color'></Button>
  </div>

  <!-- Defines the text under the upload files box -->
  <div class='uploadFilesBoxText'>
    <p>Maksimal fil størrelse: 10 MB</p>
    <p>Kun tillatt å laste opp filer av typen: .xlsx</p>
  </div>

  <!-- Defines the overview over files selected -->
  <div class='uploadFileUploaded'>
    <p id='fileChosenText'>Valgt fil:</p>
    {#if uploadedFile}
      <p>{uploadedFile.name}</p>
    {:else}
      <p>Ingen fil valgt</p>
    {/if}
  </div>

  <!-- The upload files button -->
  <div class='uploadButtonPlacement'>
    <Button type='orange' size='medium' on:buttonClick={uploadFile}>Last opp <img src='/uploadIcon2.svg' alt='listIcon' height='40px' class='uploadIcon white-color'></Button>
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

  /* @media screen and (max-width: 1000px) {
    .uploadFilesBox {
      width: 500px;
    }
    .uploadFilesBoxText {
      margin-right: 10rem;
    }
    .uploadFilesUploaded {
      width: 500px;
    }

  } */
</style>
