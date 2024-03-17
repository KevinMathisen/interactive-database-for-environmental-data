<script>    
    import { onMount, onDestroy } from 'svelte';
    //import { browser } from '$app/environment';
    import { createEventDispatcher } from 'svelte';
    import leaflet from 'leaflet';
    import L from 'leaflet';
   
    export let stations;    // Imported data containg station objects
    export let rivers;      // Imported data containg river objects
    export let dataType;    // Defines data type chosen by user
    

	const dispatch = createEventDispatcher();
    let map;       
    let mapElement;     // Used to bind the map to the page
    let stationMarkers = [];   // Array to store stationmarkers used by the map
    let riverMarkers =  [];    // Array to store river markers used by the map
    let lines = [];     // Array to store lines used by the map
    //let zoomChanged = 0;
    let clickedMarker;
    let clickedRiver;
    let markerIndex;
    let lineIndex;
    let riverIndex;
    

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

    /**
     *
     */
    function updateMap() {
        if (dataType) {
            if(dataType === 'station') {  // handles everything when user choses to view station data
                removeMarkers();
                addStations(leaflet);
            } else if(dataType === 'river') { // handles everything when user choses to view river data
                removeMarkers();
                addRivers(leaflet);
            }
        } 
    }
        // called when the data type is changed
    $: [rivers, stations, dataType], updateMap();

        // called when the map is clicked
    /**
     * Dispatches an event to the parent component
     * @param {Event} _ - The event object
     */
    function onMapClick(_) {
        dispatch('map');
    }
        

    /**
     * Adds station markers to the map
     * @param {object} leaflet - Object used to create markers
     */
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
        
    /**
     * Called when a station marker is clicked
     * @param {object} station - The station data
     * @param {object} leaflet - The Leaflet object uses to create markers
     * @param {Event} e - The event object
     */
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
        dispatch('stationClicked', {
			text: station
		});
    }


    /**
     * Adds river markers to the map
     *
     * Iterates the rivers array and adds a marker for each river
     * Also sets up a click even handler for each marker
     * @param {object} leaflet - The Leaflet object uses to create markers
     */
    function addRivers(leaflet) {
        rivers.forEach(river => {
            let coordinate1 = river.position.coordinates[0];
            let coordinate2 = river.position.coordinates[1];
            const marker = leaflet.marker([coordinate2 , coordinate1]).addTo(map);
            riverMarkers.push(marker);
            marker.on('click', (e) => { // handles clicks events for each river
                riverSelected(river, leaflet, e);
            });
        });
    }

    /**
     * Handles click events for each river marker
     * @param {object} river - The river data
     * @param {object} leaflet - The Leaflet object uses to create markers
     * @param {Event} e - The event object
     */
    function riverSelected(river, leaflet, e) {
            // calculate which river needs to be turned red
        if(clickedRiver) {
            riverMarkers[riverIndex].setIcon(blueIcon);
        }
            // calculate which river needs to be turned blue
        clickedRiver = e.target;
        riverIndex = riverMarkers.indexOf(clickedRiver);
        riverMarkers[riverIndex].setIcon(redIcon);
            // Sends the river name to the parent component
        dispatch('riverClicked', { 
			text: river
		});
    }

        // removes markers from the map
    /**
     * Removes all markers from the map
     */
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