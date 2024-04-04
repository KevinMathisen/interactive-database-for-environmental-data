<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte'
    import { redIcon, orangeIcon, blueIcon } from '../constants/leafletIcons.js'
    import { mapLayers } from '../constants/leafletLayers.js'
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

    // River and station layer groups
    let riverLayerGroup = leaflet.layerGroup()
    let stationLayerGroup = leaflet.layerGroup()

    // called when this component is mounted
    onMount(async () => {
      // defines the map and sets the view to Norway
      map = leaflet.map(mapElement, {
        layers: [mapLayers.Terrain] // Default layer
      }).setView([61, 12.09], 6)

      // Add terrain and satellite layers to the map
      leaflet.control.layers(mapLayers).addTo(map)

      // Add river and station layer groups to the map
      riverLayerGroup.addTo(map)
      stationLayerGroup.addTo(map)
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
        updateStations()
      } else if (dataType === 'river') { // handles everything when user choses to view river data
        updateRivers()
      }
    }
    // update river or station points when they change
    $: if (rivers || stations || dataType) {
      updateMap()
    }

    // Update if map displayes rivers or station based on data type
    $: updateVisibleLayers(dataType)

    /**
     * Updates the visible layers on the map
     * @param {string} dataType - The data type chosen by the user
     */
    function updateVisibleLayers (dataType) {
      if (!map) {
        return
      }

      if (dataType === 'station') {
        riverLayerGroup.removeFrom(map)
        stationLayerGroup.addTo(map)
      } else if (dataType === 'river') {
        stationLayerGroup.removeFrom(map)
        riverLayerGroup.addTo(map)
      }
    }

    /**
     * Adds each station as a marker in the map
     */
    function updateStations () {
      stations.forEach(station => {
        // Checks if the station already has a marker
        if (stationMarkers.has(station.id)) {
          return
        }

        // Create the station start, end, and line markers
        let stationMarker = createStationMarker(station)

        // Store the markers and line in a map using the station id as key
        stationMarkers.set(station.id, stationMarker)
      })
    }

    function createStationMarker(station) {
      // Get start and end position of the station
      const startPos = [station.startPos.coordinates[1], station.startPos.coordinates[0]]
      const endPos = [station.endPos.coordinates[1], station.endPos.coordinates[0]]

      // creates a marker for the start position of the station
      const startMarker = leaflet.marker(startPos, { icon: redIcon } )
        .addTo(stationLayerGroup)
        .on('click', () => stationSelected(stationMarker, station))
      
      // creates a marker for the end position of the station
      const endMarker = leaflet.marker(endPos, { icon: redIcon } )
        .addTo(stationLayerGroup)
        .on('click', () => stationSelected(stationMarker, station))

      // drawing the line between the start and end position of the station
      const polyline = leaflet.polyline([startPos, endPos], { color: 'red' })
        .addTo(stationLayerGroup)
        .on('click', () => stationSelected(stationMarker, station))

      // Return the markers and line in a object
      const stationMarker = {
        startMarker: startMarker,
        endMarker: endMarker,
        line: polyline
      }

      return stationMarker
    }

    /**
     * Handle when a station is clicked
     * Updates the colors of station markers to reflect the selected station,
     *  and sends the selected station to the parent component
     * @param {object} stationMarker - The station start, end, and line markers
     * @param {object} station - The station data
     */
    function stationSelected (stationMarker, station) {
      // Revert the previously selected station to red
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
     * Adds each river as a marker in the map
     */
    function updateRivers () {
      rivers.forEach(river => {    
        // Checks if the river already has a marker
        if (riverMarkers.has(river.id)) {
          return
        }

        // Create a marker for the river
        const marker = leaflet.marker(
          [river.position.coordinates[1], river.position.coordinates[0]])
          .addTo(riverLayerGroup)
          .on('click', () => riverSelected(marker, river))

        // Store the marker in a map using the river id as key
        riverMarkers.set(river.id, marker)
      })
    }

    /**
     * Handle when a river is clicked
     * Updates the colors of river markers to reflect the selected river,
     *   and sends the selected river to the parent component
     * @param {object} marker - The river marker
     * @param {object} river - The river data
     */
    function riverSelected (marker, river) {
      // Revert the previously selected river to blue
      if (selectedRiver) {
        let oldSelectedMarker = riverMarkers.get(selectedRiver.id)
        if (oldSelectedMarker) {
          oldSelectedMarker.setIcon(blueIcon)
        }
      }

      // Set the selected river to orange
      marker.setIcon(orangeIcon)
      // Send the selected river to the parent component
      dispatch('riverClicked', { text: river })
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
