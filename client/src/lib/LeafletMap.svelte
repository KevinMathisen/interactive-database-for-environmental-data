<script>
    // https://khromov.se/using-leaflet-with-sveltekit/
    // https://svelte.dev/repl/62271e8fda854e828f26d75625286bc3?version=4.2.12
    // https://www.reddit.com/r/sveltejs/comments/11czcoj/should_i_use_leaflet_with_svelte/
    
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';

    let mapElement;
    let map;

    onMount(async () => {
        if(browser) {
            const leaflet = await import('leaflet');

            map = leaflet.map(mapElement).setView([60.5, 12.09], 7);

            leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            leaflet.marker([61.041926, 10.001893]).addTo(map)
                .bindPopup('Station in Norway')
                .openPopup();
        }
    });

    onDestroy(async () => {
        if(map) {
            console.log('Unloading Leaflet map.');
            map.remove();
        }
    });
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