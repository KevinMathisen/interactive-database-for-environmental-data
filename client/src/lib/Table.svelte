

<script>
	/*
		Component should be wrapped by another component.
		That component should send the headers and data to diplay. 
		Each row of data should have the id as the first element, 
		  which will not be displayed in the table.
		When a row is clicked, the id of the row should be sent to the 
		  parent component, which will handle the event.
	*/
	import { createEventDispatcher  } from "svelte";
	const dispatch = createEventDispatcher();

	export let datatype;			// "river", "station", or "observation"
	export let headers = [];		// Header names
	export let rows = [];			// Rows of data
	export let clickable = false;	// If the rows are clickable

	let sortKey = '';			// Header name to sort by
	let sortDirection = ''; 	// Sorting direction, 'asc' or 'desc'
	let sortedRows = [];		// Rows sorted based on sortKey and sortDirection

	// Sort rows based on sortKey and sortDirection
	$: sortedRows = sortRows(sortDirection, sortKey);

	function sortRows() {
		const sorted = [...rows];
		if (!sortKey) return sorted;

		sorted.sort((a, b) => {
			let indexKey = headers.indexOf(sortKey)+1;
			let aVal = a[indexKey];
			let bVal = b[indexKey];

			if (sortDirection === 'asc') return aVal > bVal ? 1 : -1;
			if (sortDirection === 'desc') return aVal < bVal ? 1 : -1;
			return 0;
		});

		return sorted;
	}

	function handleHeaderClick(header) {
		if (sortKey === header) {
			if (sortDirection === 'asc') sortDirection = 'desc';
			else {
				sortKey = '';
				sortDirection = '';
			}
		} else {
			sortKey = header;
			sortDirection = 'asc';
		}
	}

	function handleClickRow(id) {
		if (clickable) dispatch('rowClick', id);
	}
</script>

<table>
	<thead>
		<tr>
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
		{#each sortedRows as row}
			<tr
				on:click={() => handleClickRow(row[0])}
				class:clickable={clickable}
			>
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
	/* Styling for the table, header, rows, and the sorting arrow */
	table {
	  width: 100%;
	  border-collapse: collapse;
	}
	th {
	  cursor: pointer;
	  position: relative;
	  background: #f0f0f0;
	  padding: 8px;
	  border-bottom: 1px solid black;
	  text-align: left;
	}

	.desc::after, .asc::after {
	  content: '';
	  position: absolute;
	  right: 16px;
	  top: 10%;
	  border: 10px solid transparent;
	  border-bottom-color: #333; /* Arrow down */
	}
	.asc::after {
	  border-bottom-color: transparent;
	  border-top-color: #333; /* Arrow up */
	  top: 40%;
	}
	td {
	  padding: 8px;
	  border-bottom: 1px solid #eee;
	}
	tr:nth-child(even) {
	  background: #f9f9f9;
	}
	tr.clickable:hover {
	  background: #f0f0f0;
	  cursor: pointer;
	}
  </style>