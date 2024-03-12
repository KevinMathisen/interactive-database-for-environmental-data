<script>
    // https://khromov.se/using-leaflet-with-sveltekit/
    // https://svelte.dev/repl/62271e8fda854e828f26d75625286bc3?version=4.2.12
    // https://www.reddit.com/r/sveltejs/comments/11czcoj/should_i_use_leaflet_with_svelte/
    
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
    import { stationStore } from '/src/stores/stationStore';
    import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
    let mapElement;
    let map;

    let stations = [
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
            console.log('Adding station', station);
            const marker = leaflet.marker([station.lat, station.lon]).addTo(map);
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

    
</script>


<main>
    <div bind:this={mapElement}></div>
</main>

<style>
    @import 'leaflet/dist/leaflet.css';
    main div {
        height: calc(100vh - 80px); 
        width: 100%;
    }
</style>