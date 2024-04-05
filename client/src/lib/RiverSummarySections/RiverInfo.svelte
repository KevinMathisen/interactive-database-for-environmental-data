<script>
  import {
    amountOfFishInStations,
    secondsAndMinutesSpentFishingInStations,
    fishPerMinuteInStations
  } from '../../utils/calculateData.js'
  export let river
  export let stations

  let amountOfStations
  let fishInStations
  let timeSpentFishing
  let fishPerMin

  $: {
    amountOfStations = stations.size
    fishInStations = amountOfFishInStations(stations)
    // Find the minutes and second spent fishing
    timeSpentFishing = secondsAndMinutesSpentFishingInStations(stations)
    fishPerMin = fishPerMinuteInStations(stations)
  }
</script>

<div class="container">
  <h4>Observasjoner</h4>
  <p>Antall stasjoner: {amountOfStations}</p>
  <p>Fisk fanget: {fishInStations} stk</p>
  <p>Tid fisket: {timeSpentFishing.minutes} min {timeSpentFishing.seconds} sek</p>
  <p>Fisk per min: {fishPerMin} stk/min</p>
  <p>Vannføring: {river.waterflow}</p>
  <h4>Mannskap</h4>
  <ul>
    <li>{river.skipper} - Skipper</li>
    {#if river.crew && river.crew.length > 0}
      {#each river.crew as person}
        {#if person}
          <li>{person}</li>
        {/if}
      {/each}
    {/if}
  </ul>
  <h4>Båttype</h4>
  <p>{river.boatType}</p>
  <h4>Kommentar</h4>
  <p>{river.comment}</p>
</div>

<style>
  p {
    margin-left: 0.5em;
  }
</style>

