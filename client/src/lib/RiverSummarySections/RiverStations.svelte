<script>
  import { createEventDispatcher } from 'svelte'
  import SortableTable from '../SortableTable.svelte'
  import { formatStationsForSummaryTable } from '../../utils/formatData.js'

  export let stations // Map of stations

  const dispatch = createEventDispatcher()

  let tableContent = {
    headers: [],
    rows: []
  }

  // Format the stations for the table
  $: tableContent = formatStationsForSummaryTable(stations)

  /**
   * Handles when user clicks on a station to go to the station data
   * @param {Event} event - The click event
   */
  function goToStationData (event) {
    console.log('goToStationData',  event.detail.id)
    dispatch('goToStationData', { id: event.detail.id })
  }
</script>

<!-- Table with summary of stations -->
<SortableTable
  headers={tableContent.headers}
  rows={tableContent.rows}
  clickable=true
  datatype="station"
  on:rowClick={goToStationData} />
