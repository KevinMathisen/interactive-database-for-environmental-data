<script>
  import { onMount } from 'svelte'

  export let plotData = new Map() // The data to be displayed in the graph
  let Plotly

  // Initialise plotly when component is mounted
  onMount(async () => {
    Plotly = await import('plotly.js-dist-min')
  })

  // Draw the plot when plotdate is updated and plotly is loaded
  $: if (Plotly && plotData.size > 0) {
    console.log('drawing plot with plotData: ', plotData)
    drawPlot(plotData)
  }

  /**
   * Creates and draws a histogram with the given data
   * @param {Map<string, {count: number[], intervals: number[], interval: number}>} plotData - The data to be displayed in the histogram
   */
  function drawPlot (plotData) {
    // Creates histogram and lines for each species in each observation point
    const traces = []

    // Define color palette for the histogram
    const colorPalette = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf']
    let colorIndex = 0

    plotData.forEach((observationPoint, name) => {
      // Get color for observationPoint, wrap around if run out of colors
      const color = colorPalette[colorIndex++ % colorPalette.length]

      // Create the text for hover
      const hoverText = observationPoint.intervals.map((intervalCenter, index) => {
        const start = intervalCenter - observationPoint.interval / 2
        const end = intervalCenter + observationPoint.interval / 2
        return `${start.toFixed(1)} - ${end.toFixed(1)}, Antall: ${observationPoint.count[index]}`
      })

      const nameWithEnter = name.replace(' ', '<br>')

      // Create bars for histogram
      traces.push({
        x: observationPoint.intervals,
        y: observationPoint.count,
        type: 'bar',
        name: nameWithEnter,
        width: observationPoint.interval,
        marker: { color, opacity: 0.6 },
        hovertext: hoverText,
        hoverinfo: 'text'
      })
      // Create line to outline histogram
      traces.push({
        x: observationPoint.intervals,
        y: observationPoint.count,
        mode: 'lines+markers',
        type: 'scatter',
        name: nameWithEnter,
        line: { shape: 'line', color, width: 2 },
        marker: { color, size: 8 },
        hovertext: hoverText,
        hoverinfo: 'text'
      })
    })

    // Displays the title, names of the axes and removes gaps between bars
    const layout = {
      title: 'Histogram for lengde på fisk observert i elv/stasjon',
      xaxis: { title: 'Length (mm)', dtick: plotData.entries().next().value[1].interval }, // Set the interval between text on the x-axis the same as the interval between bars
      yaxis: { title: 'Antall' },
      barmode: 'overlay',
      hovermode: 'closest',
      bargap: 0
    }

    // Make graph responsive, remove some buttons from the modebar, add edit link
    const config = {
      responsive: true,
      modeBarButtonsToRemove: ['select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d'],
      showLink: true,
      plotlyServerURL: 'https://chart-studio.plotly.com'
    }

    // Plot the histogram
    Plotly.newPlot('fishHistogram', traces, layout, config)
  }
</script>

<!--Displays the bar chart with id "fishHistogram"-->
<div id="fishHistogram"></div>

<style>

</style>
