<script>
  import Button from '../Button.svelte'

  export let station // Station to show
</script>

<div class='container'>
  <div class='text'>
    <p>{station.date} - {station.time}</p>
    <p>Prosjektnummer: TODO</p>
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
