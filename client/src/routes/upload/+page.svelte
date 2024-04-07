<script>
  import Papa from 'papaparse'
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

  const filesArray = []
  // let isUploading = false;

  /**
   * Selects files from the user's computer
   */
  function selectFile () {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.multiple = true
    fileInput.accept = '.csv, .xlsx'
    fileInput.click()
    fileInput.addEventListener('change', (e) => {
      const files = e.target.files
      const uploadFilesUploaded = document.querySelector('#filesChosen')
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (!validateFile(file) || fileExistsInArray(file, filesArray)) {
          continue
        }
        const fileDiv = document.createElement('div')
        fileDiv.innerHTML = file.name
        uploadFilesUploaded.appendChild(fileDiv)

        // Add file to array
        filesArray.push(file)
      }
    })
  }

  /**
   *
   */
  function uploadFile () {
    // isUploading = true;
    if (filesArray.length === 0) {
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
    for (const file of filesArray) {
      // Parse CSV file
      if (file.name.endsWith('.csv')) {
        Papa.parse(file, {
          header: true,
          complete: function (results) {
            console.log(results.data)
          }
        })
      } else if (file.name.endsWith('.xlsx')) { // Parse XLSX file
        const reader = new FileReader()
        reader.onload = async function (e) {
          const buffer = new Uint8Array(e.target.result)
          const workbook = new ExcelJS.Workbook()
          await workbook.xlsx.load(buffer)
          const worksheet = workbook.worksheets[0]
          const jsonData = worksheet.getRows(1, worksheet.rowCount).map((row) => row.values)
          console.log(jsonData)
        }
        reader.readAsArrayBuffer(file)
      } else {
        allFilesValid = false
        break
      }
    }

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

<div class="uploadPage">
  <!--Defines the box where you click to choose files -->
  <div class="uploadFilesBox">
    <img src="/uploadCloudIcon.svg" alt="listIcon" height="60px" id="uploadCloudIcon" />
    <p>Dra og slipp filer eller</p>
    <br>
    <Button type="blue" size="large" on:buttonClick={selectFile}>Bla gjennom Filer <img src="/fileSearchIcon.svg" alt="listIcon" height="40px" class="white-color"></Button>
  </div>

  <!-- Defines the text under the upload files box -->
  <div class="uploadFilesBoxText">
    <p>Maksimal fil størrelse: 10 MB</p>
    <p>Kun tillatt å laste opp filer av typen: .csv and .xlsx</p>
  </div>

  <!-- Defines the overview over files selected -->
  <div class="uploadFilesUploaded">
    <p id="filesChosenText">Filer som er valgt:</p>
    <div id="filesChosen"></div>
  </div>

  <!-- The upload files button -->
  <div class="uploadButtonPlacement">
    <Button type="orange" size="medium" on:buttonClick={uploadFile}>Last opp <img src="/uploadIcon2.svg" alt="listIcon" height="40px" class="uploadIcon white-color"></Button>
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

  .uploadFilesUploaded {
    width: 80%;
    max-width: 900px;
    padding: 1rem;
    text-align: left;
  }

  #filesChosenText {
    font-size: 2rem;
    margin: 0;
  }

  #filesChosen {
    padding: 1rem;
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
