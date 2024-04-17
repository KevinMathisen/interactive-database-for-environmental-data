<script>
  import SortableTable from '../SortableTable.svelte'
  import { formatRiverObservationsForTable } from '../../utils/formatData.js'

  export let stations // Stations under river to get observations from

  let tableContent = {
    headers: [],
    rows: []
  }

  // Get the table content
  $: tableContent = formatRiverObservationsForTable(stations)

</script>

<!-- Table with fish data for the river, where the Sum row is highlighted -->
<SortableTable
  headers={tableContent.headers}
  rows={tableContent.rows}
  clickable=false
  datatype='observation'
  markRow='sum'
  on:rowClick
/>
