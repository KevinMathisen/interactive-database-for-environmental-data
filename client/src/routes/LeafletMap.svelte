<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte'
    import { redIcon, orangeIcon, blueIcon } from '../constants/leafletIcons.js'
    import { mapLayers } from '../constants/leafletLayers.js'
    import leaflet from 'leaflet'

    const dispatch = createEventDispatcher()

    export let stations // Imported data containg station objects
    export let rivers // Imported data containg river objects
    export let dataType // Defines data type chosen by user

    export let selectedRiver // The river the user has chosen
    export let selectedStation // The station the user has chosen
  
    let map
    let mapElement // Used to bind the map to the page
    const stationMarkers = new Map() // Map to store stationmarkers used by the map
    const riverMarkers = new Map() // Map to store river markers used by the map

    let previousSelectedRiver // The previously selected river
    let previousSelectedStation // The previously selected station

    // River and station layer groups
    const riverLayerGroup = leaflet.layerGroup()
    const stationLayerGroup = leaflet.layerGroup()

    // update river or station points when they change
    $: if (map && (rivers || stations || dataType)) {
      updateMap()
    }

    // Update if map displayes rivers or station based on data type
    $: updateVisibleLayers(dataType)

    // Remove the selected river markers when a river is unselected by user
    $: if (map && !selectedRiver.id) {
      unSelectRiver(previousSelectedRiver)
    }
    // Remove the selected station markers when a station is unselected by user
    $: if (map && !selectedStation.id) {
      unSelectStation(previousSelectedStation)
    }

    // Select the river marker when the selected river is set
    $: if (map && selectedRiver && selectedRiver.id) {
      selectRiver(selectedRiver)
    }

    // Select the station marker when the selected station is set
    $: if (map && selectedStation && selectedStation.id) {
      selectStation(selectedStation)
    }

    // called when this component is mounted
    onMount(async () => {
      // Wait until the DOM is rendered before creating the map
      setTimeout(() => {
        // defines the map and sets the view to Norway
        map = leaflet.map(mapElement, {
          layers: [mapLayers.Terrain], // Default layer
          zoomControl: false // Disable default zoom control
        }).setView([61, 12.09], 6)

        // Add zoom control in top right corner
        leaflet.control.zoom({ position: 'topright' }).addTo(map)

        // Add terrain and satellite layers to the map
        leaflet.control.layers(mapLayers, null, {
          position: 'bottomright'
        }).addTo(map)

        // Add scale in bottom left corner
        leaflet.control.scale().addTo(map)

        // Add river and station layer groups to the map
        riverLayerGroup.addTo(map)
        stationLayerGroup.addTo(map)
      }, 0)
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

      // Add each station not already added to the map
      stations.forEach(station => {
        // Checks if the station already has a marker
        if (stationMarkers.has(station.id)) {
          return
        }

        // Create the station start, end, and line markers
        const stationMarker = createStationMarker(station)

        // Store the markers and line in a map using the station id as key
        stationMarkers.set(station.id, stationMarker)
      })

      // Remove station markers that are not in the data
      stationMarkers.forEach((stationMarker, id) => {
        if (!stations.has(id)) {
          stationMarker.startMarker.removeFrom(stationLayerGroup)
          stationMarker.endMarker.removeFrom(stationLayerGroup)
          stationMarker.line.removeFrom(stationLayerGroup)
          stationMarkers.delete(id)
        }
      })
    }

    /**
     * Creates a marker for a station
     * @param {object} station - The station data
     * @returns {object} - The station start, end, and line markers
     */
    function createStationMarker (station) {
      // Get start and end position of the station
      const startPos = [station.startPos.coordinates[1], station.startPos.coordinates[0]]
      const endPos = [station.endPos.coordinates[1], station.endPos.coordinates[0]]

      // creates a marker for the start position of the station
      const startMarker = leaflet.marker(startPos, { icon: redIcon })
        .addTo(stationLayerGroup)
        .on('click', () => dispatch('stationClicked', { station }))

      // creates a marker for the end position of the station
      const endMarker = leaflet.marker(endPos, { icon: redIcon })
        .addTo(stationLayerGroup)
        .on('click', () => dispatch('stationClicked', { station }))

      // drawing the line between the start and end position of the station
      const polyline = leaflet.polyline([startPos, endPos], { color: 'red' })
        .addTo(stationLayerGroup)
        .on('click', () => dispatch('stationClicked', { station }))

      // Return the markers and line in a object
      const stationMarker = {
        startMarker,
        endMarker,
        line: polyline
      }

      return stationMarker
    }

    /**
     * Selects the station by changing the colors of the markers and zooming in on the station
     * Deselects the previous selected station
     * @param {object} station - The station to select
     */
    function selectStation(station) {
      // Revert the previously selected station to red
      unSelectStation(previousSelectedStation)

      // Get the markers for the selected station
      const marker = stationMarkers.get(station.id)

      // Set the selected station to orange
      marker.startMarker.setIcon(orangeIcon)
      marker.endMarker.setIcon(orangeIcon)
      marker.line.setStyle({ color: 'orange' })

      // Pan to the selected station and zoom in
      map.flyTo(marker.startMarker.getLatLng(), 13, { duration: 0.5 })

      // Save the selected station as the previous selected station
      previousSelectedStation = station
    }

    /**
     * Unselects the selected station by reverting the colors of the markers
     * @param {object} station - The station to unselect
     */
    function unSelectStation (station) {
      // Check if there is a selected station
      if (!station) {
        return
      }

      // Get the markers for the selected station
      const oldSelectedMarker = stationMarkers.get(station.id)

      // Check if the selected station has markers
      if (!oldSelectedMarker) {
        return
      }

      // Revert the colors of the markers
      oldSelectedMarker.startMarker.setIcon(redIcon)
      oldSelectedMarker.endMarker.setIcon(redIcon)
      oldSelectedMarker.line.setStyle({ color: 'red' })
    }

    /**
     * Adds each river as a marker in the map
     */
    function updateRivers () {

      // Add each river not already added to the map
      rivers.forEach(river => {
        // Checks if the river already has a marker
        if (riverMarkers.has(river.id)) {
          return
        }

        // Create a marker for the river
        const marker = leaflet.marker(
          [river.position.coordinates[1], river.position.coordinates[0]],
          { icon: blueIcon })
          .addTo(riverLayerGroup)
          .on('click', () => dispatch('riverClicked', { river }))

        // Store the marker in a map using the river id as key
        riverMarkers.set(river.id, marker)
      })

      // Remove river markers that are not in the data
      riverMarkers.forEach((marker, id) => {
        if (!rivers.has(id)) {
          marker.removeFrom(riverLayerGroup)
          riverMarkers.delete(id)
        }
      })
    }

    /**
     * Selects the river by changing the color of the marker and zooming in on the river
     * Deselects the previous selected river
     * @param {object} river - The river to select
     */
    function selectRiver(river) {
      // Revert the previously selected river to blue
      unSelectRiver(previousSelectedRiver)

      // Get the marker for the selected river
      const marker = riverMarkers.get(river.id)

      // Set the selected river to orange
      marker.setIcon(orangeIcon)

      // Pan to the selected station and zoom in
      map.flyTo(marker.getLatLng(), 11, { duration: 0.5 })

      // Save the selected river as the previous selected river
      previousSelectedRiver = river
    }

    /**
     * Unselects the selected river by reverting the color of the marker
     * @param {object} river - The river to unselect
     */
    function unSelectRiver (river) {
      // Check if there is a selected river
      if (!river) {
        return
      }

      // Get the marker for the selected river
      const oldSelectedMarker = riverMarkers.get(river.id)

      // Check if the selected river has a marker
      if (!oldSelectedMarker) {
        return
      }

      // Revert the color of the marker
      oldSelectedMarker.setIcon(blueIcon)
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
