<script>
  export let selectedStartDate // Start date
  export let selectedEndDate // End date
</script>

<!-- Input for choosing start date -->
<label for='startDate'>
  Fra
  <input id='startDate' type='date' name='startDate' bind:value={selectedStartDate}/>
</label>
<!-- Input for choosing end date -->
<label for='endDate'>
  Til
  <input id='endDate' type='date' name='endDate' bind:value={selectedEndDate}/>
</label>

<style>
  label {
    display: block;
    padding: 0.5em;
    font-size: 1.2rem;
  }
</style>
