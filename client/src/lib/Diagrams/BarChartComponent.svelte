<script>
  // Imports the onMount function from svelte.
  import { onMount } from 'svelte'

  export let plotData = new Map()
  export let absoluteValues = 'absolute'
  let Plotly

  // Initializes the Plotly library when the component is mounted.
  onMount(async () => {
    Plotly = await import('plotly.js-dist-min')
  })

  $: if (Plotly && plotData.size > 0) {
    drawPlot(plotData)
  }

  /**
   * Creates and draws a grouped bar chart with the given data
   * @param {Map<string, Map<string, number>>} plotData - The data to be displayed in the bar chart
   */
  function drawPlot (plotData) {
    // Create bars for each species in each observation point
    const traces = []
    plotData.forEach((observationPoint, name) => {
      traces.push({
        x: Array.from(observationPoint.keys()),
        y: Array.from(observationPoint.values()),
        type: 'bar',
        name,
        text: Array.from(observationPoint.entries(), ([key, value]) => `${key}: ${value}`),
        textposition: 'auto'
      })
    })

    // Set the barmode to 'group', add title, font size and the cornerradius og the displayed bars.
    const layout = {
      barmode: 'group',
      title: 'Stolpediagram for antall arter observert i elv/stasjon',
      font: { size: 15 },
      barcornerradius: 10,
      yaxis: { title: `Antall fisk${absoluteValues === 'absolute' ? '' : '/min'}` }
    }

    // Make graph responsive, remove some buttons from the modebar, add edit link
    const config = {
      responsive: true,
      modeBarButtonsToRemove: ['select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d'],
      showLink: true,
      plotlyServerURL: 'https://chart-studio.plotly.com'
    }

    // Creates the grouped bar chart.
    Plotly.newPlot('barGroupOne', traces, layout, config)
  }
</script>

{#if plotData.size === 0}
  <p>Velg elv/stasjon</p>
{/if}

<!--Displays the grouped bar chart with id='barGroupOne'-->
<div id='barGroupOne'></div>

<style>

</style>
