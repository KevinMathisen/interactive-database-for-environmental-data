<script>
  import Button from '../user-input/Button.svelte'

  export let station // Station to show

  let projectId = (station.projectId && station.projectId !== 'None') ? station.projectId : 'N/A'
</script>

<div class='container'>
  <div class='text'>
    <p>{station.date} - {station.time}</p>
    <p>Prosjektnummer: {projectId}</p>
  </div>

  <!-- Button to go to river data -->
  <Button color='blue' type='small'>
    Til elvedata
  </Button>

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
