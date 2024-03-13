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
    let zoomChanged = 0;
    let clickedMarker;
    let markerIndex;
    let lineIndex;
    

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
        addRivers(leaflet);
    });

        // called when this component is unmounted
    onDestroy(async () => {
        if(map) {
            console.log('Unloading Leaflet map.');
            map.remove();
        }
    });

        // called when the data type is changed
    $: if (dataType) {
        if(dataType === 'station') {  // handles everything when user choses to view station data
            removeMarkers();
            addStations(leaflet);
        } else if(dataType === 'river') { // handles everything when user choses to view river data
            removeMarkers();
            addRivers(leaflet);
        }
    }   

        // called when the map is clicked
    function onMapClick(e) {
        dispatch('map');
    }
        
        // adds station markers to the map
    function addStations(leaflet) {
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

            startMarker.on('click', (e) => { // handles clicks events for each station
                console.log('startMarker clicked');
                stationSelected(station, leaflet, e);
            });
            endMarker.on('click', (e) => { // handles clicks events for each station
                stationSelected(station, leaflet, e);
            });
            lines.push(polyline);
            stationMarkers.push(startMarker);     
            stationMarkers.push(endMarker);                   
        });
    }
        // Called when a station marker is clicked
    function stationSelected(station, leaflet, e) {
            // calculate which points need to be turned red
        markerIndex = stationMarkers.indexOf(clickedMarker);
        if(clickedMarker) {
            clickedMarker.setIcon(redIcon);
            (markerIndex % 2 === 0) ? stationMarkers[markerIndex + 1].setIcon(redIcon) : stationMarkers[markerIndex - 1].setIcon(redIcon); 
        }
        if(lineIndex) {
            lines[lineIndex].setStyle({color: 'red'});
        }
            // calculate which points need to be turned blue
        clickedMarker = e.target;
        markerIndex = stationMarkers.indexOf(clickedMarker);
        clickedMarker.setIcon(blueIcon);
        (markerIndex % 2 === 0) ? stationMarkers[markerIndex + 1].setIcon(blueIcon) : stationMarkers[markerIndex - 1].setIcon(blueIcon);            
        clickedMarker.setIcon(blueIcon);
        if (markerIndex <= 1) {
            lineIndex = 0;
        } else if (markerIndex % 2 === 0) {
            lineIndex = markerIndex / 2;
        } else {
            lineIndex = (markerIndex - 1) / 2;
        }
        lines[lineIndex].setStyle({color: 'blue'});
            // Sends the station name to the parent component
        dispatch('message', {
			text: station
		});
    }

        // adds river markers to the map
    function addRivers(leaflet) {
        rivers.forEach(river => {
            let coordinate1 = river.position.coordinates[0];
            let coordinate2 = river.position.coordinates[1];
            const marker = leaflet.marker([coordinate2 , coordinate1]).addTo(map);
            riverMarkers.push(marker);
        });
    }

        // removes relevant markers from the map
    function removeMarkers() {
        if(dataType === 'river') { // removes station markers and lines from the map
            stationMarkers.forEach(marker => {
                map.removeLayer(marker);
            });
            lines.forEach(line => {
                map.removeLayer(line);
            });
        } else if(dataType === 'station') { //removes river markers from the map
            riverMarkers.forEach(marker => {
                map.removeLayer(marker);
            });
        }
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