<script>
    // Imports the onMount function from svelte.
    import { onMount } from 'svelte'

    let Plotly

    // Initializes the Plotly library when the component is mounted.
    onMount(async () => {
      Plotly = await import('plotly.js-dist-min')

      // Data for the histogram, the number of fish in each length interval from 0cm to 200cm.
      const orretData = [8, 10, 20, 33, 25, 66, 70, 2, 70, 23, 25, 2, 32, 89, 28, 89, 23, 49, 48, 4]
      const harrData = [10, 23, 29, 83, 94, 39, 29, 49, 58, 29, 49, 70, 74, 57, 47, 37, 28, 54, 44, 27]
      const gjeddeData = [23, 47, 25, 45, 67, 35, 57, 2, 34, 45, 38, 35, 27, 18, 47, 73, 48, 29, 38, 28]

      // The displayed intervals for the x-axis
      const xValues = Array.from({ length: 20 }, (v, i) => (i * 10) + 5)

      // Makes bars for "ørret" with color 'blue' and transparency.
      const traceOrret = {
        x: xValues,
        y: orretData,
        type: 'bar',
        name: 'Ørret',
        marker: { color: 'blue', opacity: 0.6 },
        width: 10 // Width of each bar to fill the interval
      }

      // Makes bars for "harr" with color 'orange' and transparency.
      const traceHarr = {
        x: xValues,
        y: harrData,
        type: 'bar',
        name: 'Harr',
        marker: { color: 'orange', opacity: 0.6 },
        width: 10
      }

      // Makes bars for "gjedde" with color 'green' and transparency.
      const traceGjedde = {
        x: xValues,
        y: gjeddeData,
        type: 'bar',
        name: 'Gjedde',
        marker: { color: 'green', opacity: 0.6 },
        width: 10
      }

      // Make linechat for "ørret" with color 'blue' and width 2.
      const traceOrretLine = {
        x: xValues,
        y: orretData,
        mode: 'lines+markers',
        type: 'scatter',
        name: 'Ørret',
        line: { shape: 'line', color: 'blue', width: 2 }, // hvh
        marker: { color: 'blue', size: 8 }
      }

      // Make linechat for "harr" with color 'orange' and width 2.
      const traceHarrLine = {
        x: xValues,
        y: harrData,
        mode: 'lines+markers',
        type: 'scatter',
        name: 'Harr',
        line: { shape: 'line', color: 'orange', width: 2 },
        marker: { color: 'orange', size: 8 }
      }

      // Make linechat for "gjedde" with color 'darkgreen' and width 2.
      const traceGjeddeLine = {
        x: xValues,
        y: gjeddeData,
        mode: 'lines+markers',
        type: 'scatter',
        name: 'Gjedde',
        line: { shape: 'line', color: 'darkgreen', width: 2 }, // spline
        marker: { color: 'darkgreen', size: 8 }
      }

      // Combines all the charts into one array.
      const data = [traceOrret, traceHarr, traceGjedde, traceOrretLine, traceHarrLine, traceGjeddeLine]

      // Displays the title, names of the axes and makes the charts with overlay with no gaps between the bars.
      const layout = {
        title: 'Fish Count Distribution by Length Interval',
        xaxis: { title: 'Length (cm)', dtick: 10 }, // Names the x-axis and sets the interval between each number to 10.
        yaxis: { title: 'Count' },
        barmode: 'overlay',
        hovermode: 'closest',
        bargap: 0
        // I stedet for 135 (130 - 140)
      }

      // Make the fish histogram with the linecharts.
      Plotly.newPlot('fishHistogram', data, layout)
    })
</script>

<!--Displays the bar chart with id "fishHistogram"-->
<div id="fishHistogram"></div>

<style>

</style>
