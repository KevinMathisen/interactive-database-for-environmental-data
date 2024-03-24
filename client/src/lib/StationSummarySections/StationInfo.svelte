<script>
  import Table from '../Table.svelte'
  import {
    formatStationConditionsForTable,
    formatStationSettingsForTable
  } from '../../utils/formatData.js'

  export let station // Station to show

  let conditions = {
    headers: [],
    rows: []
  }

  let settings = {
    headers: [],
    rows: []
  }

  // Format the station conditions and settings for displaying in table
  $: conditions = formatStationConditionsForTable(station)
  $: settings = formatStationSettingsForTable(station)
</script>

<div class='container'>
  <h4>Stasjonsbeskrivelse</h4>
  <p>{station.description}</p>

  <h4>Forhold</h4>
  <!-- Table with station conditions -->
  <Table headers={conditions.headers} rows={conditions.rows} />

  <!-- Table with station settings -->
  <h4>Strøminstillinger</h4>
  <Table headers={settings.headers} rows={settings.rows}/>
</div>
