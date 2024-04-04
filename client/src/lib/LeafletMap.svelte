<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte'
    // import { browser } from '$app/environment';
    import leaflet from 'leaflet'

    export let stations // Imported data containg station objects
    export let rivers // Imported data containg river objects
    export let dataType // Defines data type chosen by user

    export let selectedRiver // The river the user has chosen
    export let selectedStation // The station the user has chosen

    const dispatch = createEventDispatcher()
    let map
    let mapElement // Used to bind the map to the page
    let stationMarkers = new Map // Map to store stationmarkers used by the map
    let riverMarkers = new Map // Map to store river markers used by the map

        // custom icon for the stations
    const redIcon = new leaflet.Icon({
      iconUrl: '/marker-icon-red.png',
      shadowUrl: '/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    })

        // custom icon for the stations
    const blueIcon = new leaflet.Icon({
      iconUrl: '/marker-icon-blue.png',
      shadowUrl: '/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    })

    const orangeIcon = new leaflet.Icon({
      iconUrl: '/marker-icon-orange.png',
      shadowUrl: '/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    })

    // called when this component is mounted
    onMount(async () => {
      // defines the map and sets the view to Norway
      map = leaflet.map(mapElement).setView([61, 12.09], 6)

      // Adds a openstreetmap layer to the map
      leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map)

    })

    // called when this component is unmounted
    onDestroy(async () => {
      if (map) {
        map.remove()
      }
    })

    /**
     * Updates the map based on the data type chosen by the user
     */
    function updateMap () {
      if (!dataType) {
        return
      }

      if (dataType === 'station') { // handles everything when user choses to view station data
        removeMarkers()
        addStations()
      } else if (dataType === 'river') { // handles everything when user choses to view river data
        removeMarkers()
        addRivers()
      }
    }
    // called when the data or data type is changed
    $: if (rivers || stations || dataType) {
      updateMap()
    }

    /**
     * Adds station markers to the map
     */
    function addStations () {
      // Create a marker for each station
      stations.forEach(station => {
        // creates a marker for the start and end position of the station
        const startMarker = leaflet.marker(
          [ station.startPos.coordinates[1], station.startPos.coordinates[0] ], 
          { icon: redIcon }
        ).addTo(map)
        const endMarker = leaflet.marker(
          [ station.endPos.coordinates[1], station.endPos.coordinates[0] ], 
          { icon: redIcon }
        ).addTo(map)

        // drawing the line between the start and end position of the station
        const positions = [
          [station.startPos.coordinates[1], station.startPos.coordinates[0]],
          [station.endPos.coordinates[1], station.endPos.coordinates[0]]
        ]
        const polyline = leaflet.polyline(positions, { color: 'red' }).addTo(map)

        // Store the markers and line in object
        let stationMarker = {
          startMarker: startMarker,
          endMarker: endMarker,
          line: polyline
        }

        // Add click event handler for each marker
        startMarker.on('click', () => stationSelected(stationMarker, station))
        endMarker.on('click', () => stationSelected(stationMarker, station))

        // Store the markers and line in a map using the station id as key
        stationMarkers.set(station.id, stationMarker)
      })
    }

    /**
     * Called when a station marker is clicked
     * @param {object} station - The station data
     * @param {Event} e - The event object
     */
    function stationSelected (stationMarker, station) {
      // Turn old selected station red
      if (selectedStation) {
        let oldSelectedMarker = stationMarkers.get(selectedStation.id)
        if (oldSelectedMarker) {
          oldSelectedMarker.startMarker.setIcon(redIcon)
          oldSelectedMarker.endMarker.setIcon(redIcon)
          oldSelectedMarker.line.setStyle({ color: 'red' })
        }
      }

      // Turn new selected station orange
      stationMarker.startMarker.setIcon(orangeIcon)
      stationMarker.endMarker.setIcon(orangeIcon)
      stationMarker.line.setStyle({ color: 'orange' })

      // Send the selected station to the parent component
      dispatch('stationClicked', { text: station })
    }

    /**
     * Adds river markers to the map
     *
     * Iterates the rivers array and adds a marker for each river
     * Also sets up a click even handler for each marker
     */
    function addRivers () {
      rivers.forEach(river => {
        const coordinate1 = river.position.coordinates[0]
        const coordinate2 = river.position.coordinates[1]
        const marker = leaflet.marker([coordinate2, coordinate1]).addTo(map)
        riverMarkers.set(river.id, marker)
        marker.on('click', () => riverSelected(marker, river))
      })
    }

    /**
     * Called when a river marker is clicked
     * @param {object} river - The river data
     * @param {Event} e - The event object
     */
    function riverSelected (marker, river) {
      console.log('River clicked:', river)
      // calculate which river needs to be turned red
      if (selectedRiver) {
        let oldSelectedMarker = riverMarkers.get(selectedRiver.id)
        if (oldSelectedMarker) {
          oldSelectedMarker.setIcon(blueIcon)
        }
      }

      // calculate which river needs to be turned orange
      marker.setIcon(orangeIcon)
      // Send the selected river to the parent component
      dispatch('riverClicked', { text: river })
    }

    /**
     * Removes all markers from the map
     */
    function removeMarkers () {
      stationMarkers.forEach(stationMarker => {
        map.removeLayer(stationMarker.startMarker)
        map.removeLayer(stationMarker.endMarker)
        map.removeLayer(stationMarker.line)
      })

      riverMarkers.forEach(marker => {
        map.removeLayer(marker)
      })
      riverMarkers = new Map()
      stationMarkers = new Map()
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
