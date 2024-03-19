<script>
  import Table from '../Table.svelte'
  import { formatStationsForSummaryTable } from '../../utils/formatData.js'

  export let stations // Map of stations

  let tableContent = {
    headers: [],
    rows: []
  }

  // Format the stations for the table
  $: tableContent = formatStationsForSummaryTable(stations)
</script>

<!-- Table with summary of stations -->
<Table
  headers={tableContent.headers}
  rows={tableContent.rows}
  clickable=true
  datatype="station"
  on:rowClick />
