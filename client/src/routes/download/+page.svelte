<script>
	import UserFeedbackMessage from '../../lib/UserFeedbackMessage.svelte';
	import { generateExcelFile, generateCSVFile } from '/src/utils/fileHandler';
	import {
		FEEDBACK_TYPES,
		FEEDBACK_CODES,
		FEEDBACK_MESSAGES
	} from '../../constants/feedbackMessages.js';
	import { addFeedbackToStore } from '../../utils/addFeedbackToStore';
	//import { is } from 'express/lib/request';

	let selectedFormat = '';
	let isDownloading = false;

	const sampleData = [
		{ name: 'John Doe', age: 30, email: 'john@example.com' },
		{ name: 'Jane Smith', age: 25, email: 'jane@example.com' },
		{ name: 'Bob Johnson', age: 40, email: 'bob@example.com' }
	];

	const downloadFile = async () => {
		isDownloading = true;
		if (selectedFormat === '' && isDownloading) {
			addFeedbackToStore(
				FEEDBACK_TYPES.ERROR,
				FEEDBACK_CODES.NOT_FOUND,
				FEEDBACK_MESSAGES.NO_FILE_FORMAT_SELECTED
			);
		}
		let fileName = '';
		let blob = null;
		let fileData = null;

		if (selectedFormat === 'xlsx') {
			fileData = await generateExcelFile(sampleData); // Generate Excel file
			// Create a blob from the Excel file data
			blob = new Blob([fileData], {
				type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			});
			fileName = 'data.xlsx';
		} else if (selectedFormat === 'csv') {
			fileData = await generateCSVFile(sampleData); // Generate CSV content
			// Create a Blob from the CSV content
			blob = new Blob([fileData], { type: 'text/csv' });
			fileName = 'data.csv';
		}

		const url = URL.createObjectURL(blob);
		// Create a temporary anchor element
		const a = document.createElement('a');
		a.href = url;

		a.download = fileName; // Set the filename
		document.body.appendChild(a);
		// Programmatically click the anchor element to trigger the download
		a.click();
		// Remove the anchor element from the DOM
		document.body.removeChild(a);
	};
</script>

{#if isDownloading}
	<UserFeedbackMessage />
{/if}

<div>
	<div id="downloadDataTopText">Last ned data</div>
</div>

<!-- Defines the area containing the options for dowloading -->
<div class="downloadBody">
	<div class="downloadDataBox">
		<!-- Defines the first area, containing options between riverdata and stationdata -->
		<div class="dowloadBoxGeneral">
			<h3>Type data</h3>
			<form action=" ">
				<div>
					<div class="setWidthForButtonsUpload">
						<label for="StasjonsdataUpload">Stasjonsdata</label>
					</div>
					<input type="radio" id="StasjonsdataUpload" name="color" value="StasjonsdataUpload" />
				</div>

				<div>
					<div class="setWidthForButtonsUpload"><label for="ElvedataUpload">Elvedata</label></div>
					<input type="radio" id="ElvedataUpload" name="color" value="ElvedataUpload" />
				</div>
			</form>
		</div>

		<!-- Defines the second area, containing options between all species or self-specified species -->
		<div class="dowloadBoxGeneral">
			<h3>Art</h3>
			<form action=" ">
				<div>
					<div class="setWidthForButtonsUpload">
						<label for="velgAlleArterUpload">Velg alle arter</label>
					</div>
					<input type="radio" id="velgAlleArterUpload" name="color" value="velgAlleArterUpload" />
				</div>

				<div>
					<div class="setWidthForButtonsUpload">
						<label for="egendefinerteArterUpload">Egendefinerte arter</label>
					</div>
					<input
						type="radio"
						id="egendefinerteArterUpload"
						name="color"
						value="egendefinerteArterUpload"
					/>
				</div>
			</form>
		</div>

		<!-- Defines the first area where you can select which stations to include -->
		<div class="dowloadBoxGeneral">
			<h3>Stasjoner</h3>
			<div>
				<label for="stationOptions"></label>
				<select id="stationOptions" name="stationOptions">
					<option value="Sei">Sei</option>
					<option value="Flyndre">Flyndre</option>
					<option value="Torsk">Torsk</option>
					<option value="Makrell">Makrell</option>
					<option value="Steinbit">Steinbit</option>
				</select>
			</div>
		</div>

		<!-- Defines the fourth area where you can select which species to include -->
		<div class="dowloadBoxGeneral">
			<h3>Egendefinerte arter</h3>
			<div>
				<label for="artOptions"></label>
				<select id="artOptions" name="artOptions">
					<option value="Sei">Sei</option>
					<option value="Flyndre">Flyndre</option>
					<option value="Torsk">Torsk</option>
					<option value="Makrell">Makrell</option>
					<option value="Steinbit">Steinbit</option>
				</select>
			</div>
		</div>
		<div class="dowloadBoxGeneral">
			<h3>Format</h3>
			<form action=" ">
				<div>
					<div class="setWidthForButtonsUpload"><label for="formatXlsx">xlsx</label></div>
					<input
						type="radio"
						id="formatXlsx"
						name="color"
						value="xlsx"
						bind:group={selectedFormat}
					/>
				</div>

				<div>
					<div class="setWidthForButtonsUpload"><label for="formatCsv">csv</label></div>
					<input type="radio" id="formatCsv" name="color" value="csv" bind:group={selectedFormat} />
				</div>
			</form>
		</div>
	</div>
</div>

<button class="downloadButton" on:click={downloadFile}>Last ned</button>

<style>
	#downloadDataTopText {
		height: 100px;
		font-size: 3rem;
		width: 100vw;
		background-color: #435768;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.downloadBody {
		display: flex;
		justify-content: center;
	}

	.downloadDataBox {
		display: grid;
		flex-direction: row;
		/* grid-template-areas: 
        "b1 b2 b21"                   
        "b3 b4 b41"; */
		grid-template-rows: 250px 300px;
		grid-template-columns: 1fr 1fr 1fr;
		width: 1300px;
		font-size: 1.2rem;
		gap: 2rem;
		justify-items: center;
	}

	.downloadDataBox h3 {
		color: #435768;
		font-size: 2rem;
	}

	.dowloadBoxGeneral {
		width: 400px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/*     .downloadDataBox:nth-child(1){
        grid-area: b1;
    }
    .downloadDataBox:nth-child(2){
        grid-area: b2;
    }
    .downloadDataBox:nth-child(3){
        grid-area: b3;
    }
    .downloadDataBox:nth-child(4){
        grid-area: b4;
    } */

	.setWidthForButtonsUpload {
		width: 150px;
		display: inline-block;
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
