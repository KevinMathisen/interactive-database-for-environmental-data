<script>
	// Upload page logic here
	import Papa from 'papaparse';
	import ExcelJS from 'exceljs';
	import {
		FEEDBACK_TYPES,
		FEEDBACK_CODES,
		FEEDBACK_MESSAGES
	} from '../../constants/feedbackMessages.js';
	import { addFeedbackToStore } from '../../utils/addFeedbackToStore';
	import UserFeedbackMessage from '../../lib/UserFeedbackMessage.svelte';

	import { validateFile, fileExistsInArray } from '/src/utils/fileHandler.js';

	let filesArray = [];
	let isUploading = false;
	let showModal = false;

	function selectFile() {
		const fileInput = document.createElement('input');
		fileInput.type = 'file';
		fileInput.multiple = true;
		fileInput.accept = '.csv, .xlsx';
		fileInput.click();
		fileInput.addEventListener('change', (e) => {
			const files = e.target.files;
			const uploadFilesUploaded = document.querySelector('#filesChosen');
			for (let i = 0; i < files.length; i++) {
				const file = files[i];
				if (!validateFile(file) || fileExistsInArray(file, filesArray)) {
					continue;
				}
				const fileDiv = document.createElement('div');
				fileDiv.innerHTML = file.name;
				uploadFilesUploaded.appendChild(fileDiv);

				// Add file to array
				filesArray.push(file);
			}
		});
	}

	function uploadFile() {
		isUploading = true;
		if (filesArray.length === 0) {
			addFeedbackToStore(
				FEEDBACK_TYPES.ERROR,
				FEEDBACK_CODES.NOT_FOUND,
				FEEDBACK_MESSAGES.NO_FILE_SELCETED
			);
			return;
		}
		// need to validate that the files are actually csv or xls files. Do this by converting to json
		// and checking if the json data follows the format we have specified
		let allFilesValid = true;
		showModal = true;
		for (let file of filesArray) {
			// Parse CSV file
			if (file.name.endsWith('.csv')) {
				Papa.parse(file, {
					header: true,
					complete: function (results) {
						console.log(results.data);
					}
				});
			}
			// Parse XLSX file
			else if (file.name.endsWith('.xlsx')) {
				const reader = new FileReader();
				reader.onload = async function (e) {
					const buffer = new Uint8Array(e.target.result);
					const workbook = new ExcelJS.Workbook();
					await workbook.xlsx.load(buffer);
					const worksheet = workbook.worksheets[0];
					const jsonData = worksheet.getRows(1, worksheet.rowCount).map((row) => row.values);
					console.log(jsonData);
				};
				reader.readAsArrayBuffer(file);
			}else {
				allFilesValid = false;
				break;
			}
		}

		if (allFilesValid) {
			addFeedbackToStore(FEEDBACK_TYPES.SUCCESS, FEEDBACK_CODES.CREATED, FEEDBACK_MESSAGES.UPLOAD_SUCCESS);
		} else {
			addFeedbackToStore(
				FEEDBACK_TYPES.ERROR,
				FEEDBACK_CODES.NOT_FOUND,
				FEEDBACK_MESSAGES.NOT_FOUND
			);
		}
	}
</script>

<UserFeedbackMessage />

<div class="uploadBody">
	<!--Defines the bos where you click to choose files -->
	<div class="uploadFilesBox">
		<img src="/uploadCloudIcon.svg" alt="listIcon" height="60px" id="uploadCloudIcon" />
		<p>Dra og slipp filer eller</p>
		<button id="uploadFilesBoxButton" on:click={selectFile}>Bla gjennom Filer </button>
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
</div>

<!-- Defines the upload files button -->
<button class="uploadButton" on:click={uploadFile}>Last opp</button>

<style>
	.uploadBody {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.uploadFilesBox {
		border: 2px dashed black;
		margin-top: 3rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 900px;
		font-size: 1.5rem;
	}

	#uploadCloudIcon {
		margin-top: 1rem;
		height: 100px;
	}

	#uploadFilesBoxButton {
		background-color: #435768;
		font-size: 1.5rem;
		padding: 1rem 5rem 1rem 5rem;
		margin: 3rem 0 1rem 0;
		border-radius: 1rem;
	}

	.uploadFilesBoxText {
		margin-right: 35rem;
	}

	.uploadFilesUploaded {
		margin-top: 3rem;
		font-size: 2rem;
		height: 200px;
		width: 900px;
	}

	#filesChosenText {
		margin-bottom: 1rem;
	}

	#filesChosen {
		font-size: 1rem;
	}

	.uploadButton {
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
