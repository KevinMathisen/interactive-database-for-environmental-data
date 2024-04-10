<script>
  // Imports the onMount function from svelte.
  import { onMount } from 'svelte'

  export let plotData = new Map()
  let Plotly

  // Initializes the Plotly library when the component is mounted.
  onMount(async () => {
    Plotly = await import('plotly.js-dist-min')
  })

  $: if (Plotly && plotData.size > 0) {
    console.log('drawing plot with plotData: ', plotData)
    drawPlot(plotData)
  }

  /**
   * Creates and draws pie charts with the given data
   * @param {Map<string, Map<string, number>>} plotData - The data to be displayed in the pie chart
   */
  function drawPlot (plotData) {
    // Find the rows and columns for the pie charts
    // The number of rows and columns should be as close to each other as possible
    const columns = plotData.size === 1 ? 1 : plotData.size === 2 ? 2 : 3
    const rows = Math.ceil(plotData.size / columns)

    // Create pie charts for each observation point
    const piecharts = []
    const annotations = []

    plotData.forEach((observationPoint, name) => {
      const nameWithEnter = name.replace(/\s/g, '<br>')

      // Find the position of the pie chart in the grid based on its index and the number of columns
      const row = Math.floor(piecharts.length / columns)
      const column = piecharts.length % columns

      piecharts.push({
        labels: Array.from(observationPoint.keys()),
        values: Array.from(observationPoint.values()),
        type: 'pie',
        name: nameWithEnter,
        textposition: 'auto',
        domain: { row, column },
        hoverinfo: 'label+percent+value+name',
        textinfo: 'label+percent+value'
      })

      annotations.push({
        text: nameWithEnter,
        showarrow: false,
        xref: 'paper',
        yref: 'paper',
        x: (column + 0.5) / columns,
        y: 1 - row / rows,
        font: { size: 16, color: 'black' }
      })
    })

    // The title and fontsize.
    const layout = {
      title: 'Sektordiagram for antall arter observert i elv/stasjon',
      font: { size: 14 },
      grid: { rows, columns, ygaps: 0.2 },
      annotations
    }

    // Make graph responsive, remove some buttons from the modebar, add edit link
    const config = {
      responsive: true,
      modeBarButtonsToRemove: ['select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d'],
      showLink: true,
      plotlyServerURL: 'https://chart-studio.plotly.com'
    }

    // Creates the pie chart.
    Plotly.newPlot('sectorOne', piecharts, layout, config)
  }
</script>

<!--Displays the pie chart with id "sectorOne"-->
<div id='sectorOne'></div>

<style>

</style>
