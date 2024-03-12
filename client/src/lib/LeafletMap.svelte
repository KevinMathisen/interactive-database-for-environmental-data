<script>    
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
    import { createEventDispatcher } from 'svelte';

    export let stations;
    export let rivers;
    export let dataType;

    

	const dispatch = createEventDispatcher();
    let mapElement;
    let map;

    let stations2 = [
        { name: 'Station in Norway', lat: 61.041926, lon: 10.001893 },
        { name: 'Another Station', lat: 60.123456, lon: 11.123456 },
        { name: 'Yet Another Station', lat: 59.123456, lon: 12.123456 }
    ];

    

    onMount(async () => {
        if(browser) {
            const leaflet = await import('leaflet');

            map = leaflet.map(mapElement).setView([60.5, 12.09], 7);

            leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            addData(leaflet);
            map.on('click', onMapClick);            
        }
    });

    onDestroy(async () => {
        if(map) {
            console.log('Unloading Leaflet map.');
            map.remove();
        }
    });

    function onMapClick(e) {
        dispatch('map');
    }

    function addData(leaflet) {
        stations.forEach(station => {
            let coordinate1 = average(station.startPos.coordinates[0], station.endPos.coordinates[0]);
            let coordinate2 = average(station.startPos.coordinates[1], station.endPos.coordinates[1]);
            const marker = leaflet.marker([coordinate2 , coordinate1]).addTo(map);
            marker.on('click', () => {
                stationSelected(station, leaflet);
            });
        });
    }

    function stationSelected(station, leaflet) {
        dispatch('message', {
			text: station.name
		});
        
        // alert(`Marker ${station.name} clicked`);
    }

    function average(num1, num2) {
        return (num1 + num2) / 2;
    }
    
</script>


<div class=leaflet bind:this={mapElement}></div>

<style>
    @import 'leaflet/dist/leaflet.css';
    .leaflet {
        height: calc(100vh - 80px); 
        width: 100%;
    }
</style>