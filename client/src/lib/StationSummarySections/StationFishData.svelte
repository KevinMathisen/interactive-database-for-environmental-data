<script>
  import SortableTable from "../SortableTable.svelte"
  import { formatStationObservationsForTable } from "../../utils/formatData.js"

  export let station // Station to show

  let tableContent = {
    headers: [],
    rows: []
  }

  // Format the station observations for displaying in table
  $: tableContent = formatStationObservationsForTable(station)

</script>

<!-- Table with fish data for the station, where the Sum row is highlighted -->
<SortableTable
  headers={tableContent.headers}
  rows={tableContent.rows}
  clickable=false
  datatype="observation"
  markRow='Sum'
  on:rowClick
/>