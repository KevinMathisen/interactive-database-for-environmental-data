<script>
  import SortableTable from '../SortableTable.svelte'
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
<SortableTable
  headers={tableContent.headers}
  rows={tableContent.rows}
  clickable=true
  datatype="station"
  on:rowClick />
