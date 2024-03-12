<script>
    //Imports the onMount function from svelte.
    import { onMount } from 'svelte';

    let Plotly;

    //Initializes the Plotly library when the component is mounted.
    onMount(async () => {
        Plotly = await import('plotly.js-dist-min');
        //Data for station 1
        let stationDataOne = [
            {species: 'Ørret', count: 20},
            {species: 'Harr', count: 14},
            {species: 'Gjedde', count: 23}
        ];

        //Data for station 2
        let stationDataTwo = [
            {species: 'Ørret', count: 12},
            {species: 'Harr', count: 18},
            {species: 'Gjedde', count: 29}
        ];


        //Bars for station 1
        let trace1 = {
            x: stationDataOne.map(item => item.species),
            y: stationDataOne.map(item => item.count),
            type: 'bar',
            name: 'Stasjon 1',
            text: stationDataOne.map(item => `${item.species} ${item.count}`),
            textposition: 'auto',
        };

        //Bars for station 2
        let trace2 = {
            x: stationDataTwo.map(item => item.species),
            y: stationDataTwo.map(item => item.count),
            type: 'bar',
            name: 'Stasjon 2',
            text: stationDataTwo.map(item => `${item.species} ${item.count}`),
            textposition: 'auto',
        };

        //Combines the traces into a single array. 
        let data = [trace1, trace2];

        //Set the barmode to 'group' and ands the title, font size and the cornerradius og the displayed bars. 
        let layout = { 
            barmode: 'group',
            title: 'Fordelign av arter',
            font: {size: 15},
            barcornerradius: 10
        };

        //Adjust the graph size according to the screen size.
        let config = { responsive: true };

        //Creates the grouped bar chart.
        Plotly.newPlot('barGroupOne', data, layout, config);
    });        
</script>

<!--Displays the grouped bar chart with id='barGroupOne'-->
<div id='barGroupOne'></div>

<style>

</style>