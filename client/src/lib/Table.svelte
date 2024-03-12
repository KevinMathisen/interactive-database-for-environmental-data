<script>
	/*
		Parent should send the headers and data to diplay. 
		Each row of data should have the id as the first element, 
		  which will not be displayed in the table.
		When a row is clicked, the id of the row and the datatypew will be sent 
		  to the parent, which should handle the event.
	*/
	import { createEventDispatcher  } from "svelte";
	const dispatch = createEventDispatcher();

	export let datatype = '';		// "river", "station", or "observation"
	export let headers = [];		// Header names
	export let rows = [];			// Rows of data
	export let clickable = false;	// If the rows are clickable

	let sortKey = '';			// Header name to sort by
	let sortDirection = ''; 	// Sorting direction, 'asc' or 'desc'
	let sortedRows = [];		// Rows sorted based on sortKey and sortDirection

	// Sort rows based on sortKey and sortDirection
	$: sortedRows = sortRows(sortDirection, sortKey);

	/**
	 * Sort order of rows based on selected header and direction
	 */
	function sortRows() {
		const sorted = [...rows];

		// If no header selected, return the original rows
		if (!sortKey) return sorted;

		// Sort the rows based on the selected header and direction
		sorted.sort((a, b) => {
			// Index of elements to sort by is +1 because the first element is the id
			let indexKey = headers.indexOf(sortKey)+1;
			let aVal = a[indexKey];
			let bVal = b[indexKey];

			if (sortDirection === 'asc') return aVal > bVal ? 1 : -1;
			if (sortDirection === 'desc') return aVal < bVal ? 1 : -1;
			return 0;
		});

		return sorted;
	}

	/**
	 * Handle click on header to sort the rows
	 * @param {string} header - Header name
	 */
	function handleHeaderClick(header) {
		// If the header is already selected, change the direction or deselect it
		if (sortKey === header) {
			if (sortDirection === 'asc') sortDirection = 'desc';
			else {
				sortKey = '';
				sortDirection = '';
			}
		// If the header is not selected, select it and set the direction to ascending
		} else {
			sortKey = header;
			sortDirection = 'asc';
		}
	}

	/**
	 * Send the id and datatype of a row when it is clicked to the parent
	 * Only sends the event if the rows are clickable
	 * @param {string} id - Id of the row
	 */
	function handleClickRow(id) {
		if (clickable) dispatch('rowClick', {id, datatype});
	}
</script>

<table>
	<thead>
		<tr>
			<!-- Create the headers and add the sorting arrow if the header is selected -->
			{#each headers as header}
				<th 
					on:click={() => handleHeaderClick(header)}
					class:sortable={sortKey === header}
					class:asc={sortDirection === 'asc' && sortKey === header}
					class:desc={sortDirection === 'desc' && sortKey === header}
				>
					{header}
				</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		<!-- Create the rows and add the click event if the rows are clickable -->
		{#each sortedRows as row}
			<tr
				on:click={() => handleClickRow(row[0])}
				class:clickable={clickable}
			>
				<!-- Create the cells, do not display the id -->
				{#each row as cell, index}
					{#if index !== 0}
            			<td>{cell}</td>
          			{/if}

				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
	  width: 100%;
	  border-collapse: collapse;
	}
	/* Header */
	th {
	  cursor: pointer;
	  position: relative;
	  background: #f0f0f0;
	  padding: 8px;
	  border-bottom: 1px solid black;
	  text-align: left;
	}

	/* When the header is selected, change the background color */
	.sortable {
	  background: #cacaca;
	}
	/* When the header is selected, add the sorting arrow */
	.desc::after, .asc::after {
	  content: '';
	  position: absolute;
	  right: 16px;
	  top: 10%;
	  border: 10px solid transparent;
	  border-bottom-color: #333; /* Arrow down */
	}
	/* When the direction is descending, change direction of arrow */
	.asc::after {
	  border-bottom-color: transparent;
	  border-top-color: #333; /* Arrow up */
	  top: 40%;
	}
	/* Rows */
	td {
	  padding: 8px;
	  border-bottom: 1px solid #eee;
	}
	/* Change background color of even rows*/
	tr:nth-child(even) {
	  background: #f9f9f9;
	}
	/* When the rows are clickable, change the background color on hover */
	tr.clickable:hover {
	  background: #f0f0f0;
	  cursor: pointer;
	}
  </style>