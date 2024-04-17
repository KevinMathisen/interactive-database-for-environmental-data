<script>
  import { createEventDispatcher } from 'svelte'
  import Button from '../user-input/Button.svelte'

  export let station

  const dispatch = createEventDispatcher()

  const projectId = (station.projectId && station.projectId !== 'None') ? station.projectId : 'N/A'

  /**
   * Handles when user clicks on button to go to river by firing event with river id
   */
  function goToRiverData () {
    dispatch('goToRiverData', { id: station.riverId })
  }
</script>

<div class='container'>
  <div class='text'>
    <p>{station.date} - {station.time}</p>
    <p>Prosjektnummer: {projectId}</p>
  </div>

  <!-- Button to go to river data -->
  <div role='button'>
    <Button type='blue' size='medium' on:buttonClick={goToRiverData}>
      Til elvedata
    </Button>
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
  }

</style>
