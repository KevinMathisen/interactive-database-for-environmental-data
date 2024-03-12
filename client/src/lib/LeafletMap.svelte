<script>    
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
    import { createEventDispatcher } from 'svelte';
    import leaflet from 'leaflet';
   
    export let stations;    // imported data containg station objects
    export let rivers;      // imported data containg river objects
    export let dataType;    // defines data type chosen by user
    

	const dispatch = createEventDispatcher();
    let map;       
    let mapElement;     // used to bind the map to the page
    let markers = [];   // Array to store markers used by the map
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

        map.on('zoomend', mapZoomed);

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
            removeLines();
            addRivers(leaflet);
        }
    }   

        // called when the map is clicked
    function onMapClick(e) {
        dispatch('map');
    }

    function mapZoomed(e) {
        if(dataType === 'river') {
            let zoomLevel = map.getZoom();
            if (zoomLevel > 10 && zoomChanged !== 1) {
                zoomChanged = 1;
                removeMarkers();
                addStations(leaflet, true);
            } else if (zoomLevel <= 10 && zoomChanged !== 0){
                zoomChanged = 0;
                removeMarkers();
                removeLines();
                addStations(leaflet);
            }
        }
    }
    
        // adds station markers to the map
    function addStations(leaflet, zoomDetail = false) {
        let zoom = true;
            // loops through all stations and adds a marker for each
        stations.forEach(station => {
            if (zoom) {
                const startMarker = leaflet.marker([station.startPos.coordinates[1] , station.startPos.coordinates[0]], { icon: redIcon }).addTo(map);
                const endMarker = leaflet.marker([station.endPos.coordinates[1] , station.endPos.coordinates[0]], { icon: redIcon }).addTo(map);
        
                    // drawing the line between the start and end position of the station
                let positions =  [    
                    [station.startPos.coordinates[1], station.startPos.coordinates[0]], 
                    [station.endPos.coordinates[1], station.endPos.coordinates[0]]
                ];
                let polyline = leaflet.polyline(positions, {color: 'red'}).addTo(map);

                startMarker.on('click', (e) => { // handles clicks events for each station
                    stationSelected(station, leaflet, e, true);
                });
                endMarker.on('click', (e) => { // handles clicks events for each station
                    stationSelected(station, leaflet, e, true);
                });

                lines.push(polyline);
                markers.push(startMarker);     
                markers.push(endMarker);
            }
            else {
                let coordinate1 = average(station.startPos.coordinates[1], station.endPos.coordinates[1]);
                let coordinate2 = average(station.startPos.coordinates[0], station.endPos.coordinates[0]);
                const marker = leaflet.marker([coordinate1, coordinate2], { icon: redIcon }).addTo(map);
                marker.on('click', (e) => { // handles clicks events for each station
                    stationSelected(station, leaflet, e, false);
                });
                markers.push(marker);
            }
                   
        });
    }
        // called when a station marker is clicked
    function stationSelected(station, leaflet, e, detail) {
        if(!detail) {
            if(clickedMarker) {
                clickedMarker.setIcon(redIcon); 
            }
            clickedMarker = e.target;
            clickedMarker.setIcon(blueIcon);
        }
        else{
            markerIndex = markers.indexOf(clickedMarker);
            if(clickedMarker) {
                clickedMarker.setIcon(redIcon);
                (markerIndex % 2 === 0) ? markers[markerIndex + 1].setIcon(redIcon) : markers[markerIndex - 1].setIcon(redIcon); 
            }
            if(lineIndex) {
                lines[lineIndex].setStyle({color: 'red'});
            }
            clickedMarker = e.target;
            markerIndex = markers.indexOf(clickedMarker);
            clickedMarker.setIcon(blueIcon);
            (markerIndex % 2 === 0) ? markers[markerIndex + 1].setIcon(blueIcon) : markers[markerIndex - 1].setIcon(blueIcon);            
            clickedMarker.setIcon(blueIcon);
            if (markerIndex <= 1) {
                lineIndex = 0;
            } else if (markerIndex % 2 === 0) {
                lineIndex = markerIndex / 2;
            } else {
                lineIndex = (markerIndex - 1) / 2;
            }
            lines[lineIndex].setStyle({color: 'blue'});
        }
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
            markers.push(marker);
        });
    }

        // removes all markers from the map
    function removeMarkers() {
        markers.forEach(marker => {
            map.removeLayer(marker);
        });
        markers = [];
    }

    function removeLines() {
        lines.forEach(line => {
            map.removeLayer(line);
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