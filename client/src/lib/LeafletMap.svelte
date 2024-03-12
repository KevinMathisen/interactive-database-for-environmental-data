<script>    
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
    import { createEventDispatcher } from 'svelte';
    import leaflet from 'leaflet';

    export let stations;
    export let rivers;
    export let dataType;

    

	const dispatch = createEventDispatcher();
    let map;
    let mapElement;
    let markers = [];


    onMount(async () => {
        // Initialize your map here
        map = leaflet.map(mapElement).setView([60.5, 12.09], 7);

        leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        map.on('click', onMapClick);
        addStations(leaflet);
        
    });

    
    onDestroy(async () => {
        if(map) {
            console.log('Unloading Leaflet map.');
            map.remove();
        }
    });

    $: if (dataType) {
        if(dataType === 'station') {
            removeMarkers();
            addStations(leaflet);
        } else if(dataType === 'river') {
            removeMarkers();
            addRivers(leaflet);
        }
    }   

    function onMapClick(e) {
        dispatch('map');
    }

    function addStations(leaflet) {
        stations.forEach(station => {
            let coordinate1 = average(station.startPos.coordinates[0], station.endPos.coordinates[0]);
            let coordinate2 = average(station.startPos.coordinates[1], station.endPos.coordinates[1]);
            const marker = leaflet.marker([coordinate2 , coordinate1]).addTo(map);
            marker.on('click', () => {
                stationSelected(station, leaflet);
            });
            markers.push(marker);
        });
    }

    function stationSelected(station, leaflet) {
        dispatch('message', {
			text: station.name
		});
        
        // alert(`Marker ${station.name} clicked`);
    }

    function addRivers(leaflet) {
        rivers.forEach(river => {
            console.log(river);
            let coordinate1 = river.position.coordinates[0];
            let coordinate2 = river.position.coordinates[1];
            const marker = leaflet.marker([coordinate2 , coordinate1]).addTo(map);
            markers.push(marker);
        });
    }


    function removeMarkers() {
        markers.forEach(marker => {
            map.removeLayer(marker);
        });
        markers = [];
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