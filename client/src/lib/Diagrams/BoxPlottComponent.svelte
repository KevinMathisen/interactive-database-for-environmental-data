<script>
    // Imports the onMount function from svelte.
    import { onMount } from 'svelte'

    let Plotly

    // Initializes the Plotly library when the component is mounted.
    onMount(async () => {
      Plotly = await import('plotly.js-dist-min')

      // Data for the box plot
      const orretData = [8, 10, 20, 33, 25, 66, 70, 2, 70, 23, 25, 2, 32, 89, 28, 89, 23, 49, 48, 4]
      const harrData = [10, 23, 29, 83, 94, 39, 29, 49, 58, 29, 49, 70, 74, 57, 47, 37, 28, 54, 44, 27]
      const gjeddeData = [23, 47, 25, 45, 67, 35, 57, 2, 34, 45, 38, 35, 27, 18, 47, 73, 48, 29, 38, 28]

      // The boxplot for "Ørret" in blue, prints out all the dots and the mean with the standard deviation.
      const trace1 = {
        y: orretData,
        type: 'box',
        name: 'Ørret',
        boxpoints: 'all',
        marker: {
          color: 'blue'
        },
        boxmean: 'sd'
      }

      // The boxplot for "Harr" in green, prints out all the dots and the mean with the standard deviation.
      const trace2 = {
        y: harrData,
        type: 'box',
        name: 'Harr',
        boxpoints: 'all',
        marker: {
          color: 'green'
        },
        boxmean: 'sd'
      }

      // The boxplot for "Gjedde" in orange, prints out all the dots and the mean with the standard deviation.
      const trace3 = {
        y: gjeddeData,
        type: 'box',
        name: 'Gjedde',
        boxpoints: 'all',
        marker: {
          color: 'orange'
        },
        boxmean: 'sd'
      }

      // Combines the boxplots into a single array.
      const data = [trace1, trace2, trace3]

      // The title, font size and the title of the y-axis.
      const layout = {
        title: 'Box Plot Styling Mean and Standard Deviation',
        font: { size: 15 },
        yaxis: { title: 'Size (cm)' }
      }

      // Creates the boxplot.
      Plotly.newPlot('boxPlot', data, layout)
    })
</script>

<!--Displays the box plot with id "boxPlot"-->
<div id='boxPlot'></div>

<style>

</style>
