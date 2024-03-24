<script>
    // Imports the onMount function from svelte.
    import { onMount } from 'svelte'

    let Plotly

    // Initializes the Plotly library when the component is mounted.
    onMount(async () => {
      Plotly = await import('plotly.js-dist-min')
      // The data for the pie chart.
      const stationData = [
        { species: 'Ørret', count: 20 },
        { species: 'Harr', count: 14 },
        { species: 'Andre', count: 26 }
      ]

      // Adds the names and the count of each species into two separate arrays.
      const labels = stationData.map(function (item) { return item.species })
      const values = stationData.map(function (item) { return item.count })

      // Adds the names and the count of the species into one array.
      const textLabels = stationData.map(function (item) { return item.species + ' ' + item.count })

      // Sets the data on the axes, the chart type and the name of the slices in the pie chart.
      const data = [{
        values,
        labels,
        type: 'pie',
        text: textLabels,
        textposition: 'auto'
      }]

      // The title and fontsize.
      const text = {
        title: 'FORDELING AV ARTER',
        font: { size: 14 }
      }

      // Creates the pie chart.
      Plotly.newPlot('sectorOne', data, text)
    })
</script>

<!--Displays the pie chart with id "sectorOne"-->
<div id='sectorOne'></div>

<style>

</style>
