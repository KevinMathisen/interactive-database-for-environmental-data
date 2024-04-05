<script>
  import CollapsibleSection from '../CollapsibleSection.svelte'
  import RadioInput from './RadioInput.svelte'
  import DateInput from './DateInput.svelte'
  import SearchForRiverAndStation from './SearchForRiverAndStation.svelte'

  export let rivers
  export let stations

  export let dataType = 'river'
  export let selectedRivers = new Map()
  export let selectedStations = new Map()

  let selectedStartDate
  let selectedEndDate

  const dataOptions = [
    { value: 'river', label: 'Elvedata' },
    { value: 'station', label: 'Stasjonsdata' }
  ]

</script>

<div class="container">
  <h1 class="header">Velg elver eller stasjoner</h1>
  <div class="main">
    <div class="leftColumn">
      <CollapsibleSection title="Type data" collapsable={false}>
        <RadioInput name="dataType" options={dataOptions} bind:selected={dataType} />
      </CollapsibleSection>

      <CollapsibleSection title="Filtrer søk etter dato" collapsable={false}>
        <DateInput bind:selectedStartDate bind:selectedEndDate/>
      </CollapsibleSection>
    </div>

    <div class="rightColumn">
      <SearchForRiverAndStation
        {rivers}
        {stations}
        {dataType}
        bind:selectedRivers
        bind:selectedStations
        {selectedStartDate}
        {selectedEndDate} />
    </div>
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    width: 100%;
  }

  .header {
    text-align: center;
    font-size: 2rem;
    margin: 0px;
    color: #435768;
  }

  .main {
    display: flex;
    height: 100%;
    width: 100%;
    margin: 2em;
  }

  .leftColumn {
    flex: 1;
  }

  .rightColumn {
    flex: 1;
  }
</style>
