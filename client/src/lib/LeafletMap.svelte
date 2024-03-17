<script>    
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
    import { createEventDispatcher } from 'svelte';
    import leaflet from 'leaflet';
   
    export let stations;    // Imported data containg station objects
    export let rivers;      // Imported data containg river objects
    export let dataType;    // Defines data type chosen by user
    

	const dispatch = createEventDispatcher();
    let map;       
    let mapElement;     // Used to bind the map to the page
    let stationMarkers = [];   // Array to store stationmarkers used by the map
    let riverMarkers =  [];    // Array to store river markers used by the map
    let lines = [];     // Array to store lines used by the map
    let stationIndex;
    let lineIndex = -1;
    let riverIndex = -1;
    

        //custom icon for the stations
    const redIcon = new L.Icon({ 
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

        //custom icon for the stations
    const blueIcon = new L.Icon({ 
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const greenIcon = new L.Icon({ 
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

        // called when this component is mounted
    onMount(async () => {
            // defines the map which
        map = leaflet.map(mapElement).setView([61, 12.09], 6);

            // adds the actual map to the page
        leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

            // calls function when the map is clicked
        map.on('click', onMapClick);

            // waits for data to be loaded before adding markers to the map
        while (rivers.size === 0) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        addRivers();
    });

        // called when this component is unmounted
    onDestroy(async () => {
        if(map) {
            console.log('Unloading Leaflet map.');
            map.remove();
        }
    });

    function updateMap() {
        if (dataType) {
            if(dataType === 'station') {  // handles everything when user choses to view station data
                removeMarkers();
                addStations();
            } else if(dataType === 'river') { // handles everything when user choses to view river data
                removeMarkers();
                addRivers();
            }
        } 
    }
        // called when the data type is changed
    $: [rivers, stations, dataType], updateMap();

        // called when the map is clicked
    function onMapClick(e) {
        dispatch('map');
    }
        
        // adds station markers to the map
    function addStations() {
            // loops through all stations and adds a marker for each
        stations.forEach(station => {
            
            const startMarker = leaflet.marker([station.startPos.coordinates[1] , station.startPos.coordinates[0]], { icon: redIcon }).addTo(map);
            const endMarker = leaflet.marker([station.endPos.coordinates[1] , station.endPos.coordinates[0]], { icon: redIcon }).addTo(map);
        
                // drawing the line between the start and end position of the station
            let positions =  [    
                [station.startPos.coordinates[1], station.startPos.coordinates[0]], 
                [station.endPos.coordinates[1], station.endPos.coordinates[0]]
            ];
            let polyline = leaflet.polyline(positions, {color: 'red'}).addTo(map);

            startMarker.on('click', (e) => { // handles click events for each station
                stationSelected(station, e);
            });
            endMarker.on('click', (e) => { // handles click events for each station
                stationSelected(station, e);
            });
            lines.push(polyline);
            stationMarkers.push(startMarker);     
            stationMarkers.push(endMarker);                   
        });
    }
        // Called when a station marker is clicked
    function stationSelected(station, e) {

            // calculate which points need to be turned red
        if(lineIndex >= 0) {
            stationMarkers[stationIndex].setIcon(redIcon);
            (stationIndex % 2 === 0) ? stationMarkers[stationIndex + 1].setIcon(redIcon) : stationMarkers[stationIndex - 1].setIcon(redIcon); 
            lines[lineIndex].setStyle({color: 'red'});
        }

        stationIndex = stationMarkers.indexOf(e.target);
        stationMarkers[stationIndex].setIcon(greenIcon);
        (stationIndex % 2 === 0) ? stationMarkers[stationIndex + 1].setIcon(greenIcon) : stationMarkers[stationIndex - 1].setIcon(greenIcon);            
        if (stationIndex <= 1) {
            lineIndex = 0;
        } else if (stationIndex % 2 === 0) {
            lineIndex = stationIndex / 2;
        } else {
            lineIndex = (stationIndex - 1) / 2;
        }
        lines[lineIndex].setStyle({color: 'green'});
            // Sends the station name to the parent component
        dispatch('stationClicked', {
			text: station
		});
    }

        // adds river markers to the map
    function addRivers() {
        rivers.forEach(river => {
            let coordinate1 = river.position.coordinates[0];
            let coordinate2 = river.position.coordinates[1];
            const marker = leaflet.marker([coordinate2 , coordinate1]).addTo(map);
            riverMarkers.push(marker);
            marker.on('click', (e) => { // handles clicks events for each river
                riverSelected(river, e);
            });
        });
    }

    function riverSelected(river, e) {
            // calculate which river needs to be turned red
        if(riverIndex >= 0) {
            riverMarkers[riverIndex].setIcon(blueIcon);
        }
            // calculate which river needs to be turned blue
        riverIndex = riverMarkers.indexOf(e.target);
        riverMarkers[riverIndex].setIcon(greenIcon);
            // Sends the river name to the parent component
        dispatch('riverClicked', { 
			text: river
		});
    }

        // removes markers from the map
    function removeMarkers() {
        stationMarkers.forEach(marker => {
            map.removeLayer(marker);
        });
        lines.forEach(line => {
            map.removeLayer(line);
        });
        
        riverMarkers.forEach(marker => {
        map.removeLayer(marker);
        });
        riverMarkers = [];
        stationMarkers = [];
        lines = [];
        lineIndex = -1; 
        riverIndex = -1;       
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