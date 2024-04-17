<script>
  import SortableTable from '../SortableTable.svelte'
  import { formatStationObservationsForTable } from '../../utils/formatData.js'

  export let station

  let tableContent = {
    headers: [],
    rows: []
  }

  $: tableContent = formatStationObservationsForTable(station)

</script>

<!-- Table with fish data for the station, where the Sum row is highlighted -->
<SortableTable
  headers={tableContent.headers}
  rows={tableContent.rows}
  clickable=false
  datatype='observation'
  markRow='sum'
  on:rowClick
/>
