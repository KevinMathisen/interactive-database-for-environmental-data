<script>
  // Imports the onMount function from svelte.
  import { onMount } from 'svelte'

  export let plotData = new Map() // The data to be displayed in the graph
  let Plotly

  // Initializes the Plotly library when the component is mounted.
  onMount(async () => {
    Plotly = await import('plotly.js-dist-min')
  })

  $: if (Plotly && plotData.size > 0) {
    drawPlot(plotData)
  }

  /**
   * Creates and draws box plots with the given data
   * @param {Map<string, {lengths}>} plotData - The data to be displayed in the box plot
   */
  function drawPlot (plotData) {
    // Width of boxplot given amount of observation points
    const boxWidth = 0.6 - (1 / plotData.size)

    // Create boxplot with dots and mean with standard deviation for each species in each observation point
    const traces = []
    plotData.forEach((observationPoint, name) => {
      const nameWithEnter = name.replace(' ', '<br>')
      traces.push({
        y: observationPoint.lengths,
        type: 'box',
        name: nameWithEnter,
        boxpoints: 'none',
        boxmean: 'sd',
        width: boxWidth
      })
    })

    // The title, font size and the title of the y-axis.
    const layout = {
      title: 'Boksplott for lengde på fisk observert i elv/stasjon',
      font: { size: 15 },
      yaxis: { title: 'Lengde (mm)' },
      boxmode: 'overlay'
    }

    // Make graph responsive, remove some buttons from the modebar, add edit link
    const config = {
      responsive: true,
      modeBarButtonsToRemove: ['select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d'],
      showLink: true,
      plotlyServerURL: 'https://chart-studio.plotly.com',
      modeBarButtonsToAdd: [{
        name: 'Vis punkter',
        icon: Plotly.Icons.pencil,
        click: function (gd) {
          const showPoints = gd.data[0].boxpoints === 'all' ? false : 'all'
          Plotly.restyle(gd, 'boxpoints', showPoints)
        }
      }]
    }

    // Creates the boxplot.
    Plotly.newPlot('boxPlot', traces, layout, config)
  }
</script>

<!--Displays the box plot with id "boxPlot"-->
<div id='boxPlot'></div>

<style>

</style>
