<script>
    //Imports the onMount function from svelte.
    import { onMount } from 'svelte';

    let Plotly;

    //Initializes the Plotly library when the component is mounted.
    onMount(async () => {
        Plotly = await import('plotly.js-dist-min');
    
        //Data for the bar chart.
        let stationData = [
            {species: 'Ørret', count: 20},
            {species: 'Harr', count: 14},
            {species: 'Gjedde', count: 26}
        ];
    
        //Retreves the species names and the count of each species from the stationData array.
        let speciesNames = stationData.map(function(item) { return item.species; });
        let speciesCounts = stationData.map(function(item) { return item.count; });

        //Label for each bar in the bar chart.
        let textLabels = stationData.map(function(item) { return item.species + ' ' + item.count; });
        
        
        //Set the data, layout and color for the bar chart 
        let data = [{
            x: speciesNames,
            y: speciesCounts,
            type: 'bar',
            text: textLabels,
            textposition: 'auto',
            
            //Color, border and transparency of the bars. 
            marker: {
                color: 'rgb(158,202,225)',
                opacity: 0.7,
                
                line: {
                    color: 'rgb(8,48,107)',
                    width: 2
                }
            }
        }];
    
        //The displayed title, font size and cornerradius of the bars. 
        let layout = { 
            title: 'FORDELING AV ARTER',
            font: {size: 15},
            barcornerradius: 10
        };

        //Adjust the size of the graphs according to the screen size.
        let config = {responsive: true};
    
        //Creates the bar chart. 
        Plotly.newPlot('barAloneOne', data, layout, config);
    });
</script>

<!--Displays the bar chart with id "barAloneOne"-->
<div id='barAloneOne'></div>

<style>

</style>