import { get } from 'svelte/store'
import {
  fetchRivers,
  fetchStations,
  fetchRiverSummary,
  fetchStationSummary,
  fetchStationDownload
} from '../api/postgrest.js'
import {
  doesAllRiversExistInStore,
  doesAllStationsExistInStore,
  checkIfRiverSummaryExists,
  checkIfStationSummaryExists,
  checkIfStationDownloadExists
} from './checkIfDataExists.js'
import { riverStore } from '../stores/riverStore.js'
import { stationStore } from '../stores/stationStore.js'
import { River } from '../models/River.js'
import { Station } from '../models/Station.js'
import { addFeedbackToStore } from './addFeedbackToStore.js'
import { FEEDBACK_TYPES, FEEDBACK_CODES, FEEDBACK_MESSAGES } from '../constants/feedbackMessages'
import { filtersStationsByRiver } from './filterData.js'
import {
  validateRiverWithSpecies,
  validateStationWithSpecies,
  validateRiverSummary,
  validateStationSummary,
  validateStationDownload
} from './validation.js'

/**
 * Updates a store with given objects converted to a given class
 * Ensures that if there is any overlap between new and existing objects,
 * that the properties of the new object overwrite the old one, while the
 * old properties are kept
 * @param {import('svelte/store').Writable} store - The store to update
 * @param {Array<object>} objects - The objects to update the store with
 * @param {Function} Class - The class to convert the objects to
 * @returns {void}
 */
function updateStoreWithObjects (store, objects, Class) {
  // If the store is empty, simply set the store with the objects converted to the class
  if (get(store).size === 0) {
    const objectMap = new Map(objects.map(object => [object.id, Class.fromJson(object)]))
    store.set(objectMap)
    return
  }

  // If the store is not empty, update the store with the objects
  store.update(currentMap => {
    objects.forEach(newObject => {
      // If the object does not exist in the store, add it
      if (!currentMap.has(newObject.id)) {
        currentMap.set(newObject.id, Class.fromJson(newObject))
        return
      }

      const existingObject = currentMap.get(newObject.id)
      // Get the new object from json and remove any null values to avoid overwriting existing values
      const newClassObject = Class.fromJson(newObject)
      const newObjectFiltered = Object.fromEntries(Object.entries(newClassObject).filter(([_, value]) => value !== null))

      // Merge the new object with the existing object
      const updatedObject = new Class({
        ...existingObject,
        ...newObjectFiltered
      })

      // Update the map with the updated object
      currentMap.set(newObject.id, updatedObject)
    })

    return currentMap
  })
}

/**
 * Updates a store with a given object converted to a given class
 * Ensures that if there is any overlap between a new and existing object,
 * that the properties of the new object overwrite the old one, while the
 * old properties are kept
 * @param {import('svelte/store').Writable} store - The store to update
 * @param {object} object - The object to update the store with
 * @param {Function} Class - The class to convert the object to
 * @returns {void}
 */
function updateStoreWithObject (store, object, Class) {
  store.update(currentMap => {
    // If the object does not exist in the store, add it
    if (!currentMap.has(object.id)) {
      currentMap.set(object.id, Class.fromJson(object))
      return currentMap
    }

    const existingObject = currentMap.get(object.id)
    // Get the new object from json and remove any null values to avoid overwriting existing values
    const newObject = Class.fromJson(object)
    const newObjectFiltered = Object.fromEntries(Object.entries(newObject).filter(([_, value]) => value !== null))

    // Merge the new object with the existing object
    const updatedObject = new Class({
      ...existingObject,
      ...newObjectFiltered
    })

    // Update the map with the updated object
    currentMap.set(object.id, updatedObject)

    return currentMap
  })
}

/**
 * Ensures that all rivers are stored in the river store such that the
 * map and list page can display them
 * @returns {void}
 */
export async function getRivers () {
  if (doesAllRiversExistInStore()) {
    return
  }

  try {
    const fetchedRivers = await fetchRivers()

    // Validate the fetched rivers
    if (!fetchedRivers || !validateRiverWithSpecies(fetchedRivers)) {
      return
    }

    updateStoreWithObjects(riverStore, fetchedRivers, River)
  } catch (error) {
    addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.POSTGREST_UNAVAILABLE, FEEDBACK_MESSAGES.POSTGREST_UNAVAILABLE)
  }
}

/**
 * Ensures that all stations are stored in the station store such that the
 * map and list page can display them
 * @returns {void}
 */
export async function getStations () {
  if (doesAllStationsExistInStore()) {
    return
  }

  try {
    const fetchedStations = await fetchStations()

    // Validate the fetched stations
    if (!fetchedStations || !validateStationWithSpecies(fetchedStations)) {
      return
    }

    updateStoreWithObjects(stationStore, fetchedStations, Station)
  } catch (error) {
    addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.POSTGREST_UNAVAILABLE, FEEDBACK_MESSAGES.POSTGREST_UNAVAILABLE)
  }
}

/**
 * Ensures that a river summary and its underlying stations are stored
 * in the river store such that the river summary page can display them
 * @param {number} id - The id of the river to get the summary for
 * @returns {void}
 */
export async function getRiverSummary (id) {
  if (checkIfRiverSummaryExists(id)) {
    return
  }

  try {
    const fetchedRiversSummary = await fetchRiverSummary(id)

    // Validate the fetched river summary
    if (!fetchedRiversSummary || !validateRiverSummary(fetchedRiversSummary)) {
      return
    }

    updateStoreWithObject(riverStore, fetchedRiversSummary[0], River)

    // Get data for stations under river
    const fetchedStations = await fetchStationSummary(fetchedRiversSummary[0].stations)

    // Validate the fetched stations
    if (!fetchedStations || !validateStationSummary(fetchedStations)) {
      return
    }

    updateStoreWithObjects(stationStore, fetchedStations, Station)
  } catch (error) {
    addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.POSTGREST_UNAVAILABLE, FEEDBACK_MESSAGES.POSTGREST_UNAVAILABLE)
  }
}

/**
 * Ensures that a station summary is stored in the station store such that
 * the station summary page can display it
 * @param {number} id - The id of the station to get the summary for
 */
export async function getStationSummary (id) {
  if (checkIfStationSummaryExists(id)) {
    return
  }

  try {
    const fetchedStationsSummary = await fetchStationSummary([id])

    // Validate the fetched station summary
    if (!fetchedStationsSummary || !validateStationSummary(fetchedStationsSummary)) {
      return
    }

    updateStoreWithObject(stationStore, fetchedStationsSummary[0], Station)
  } catch (error) {
    addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.POSTGREST_UNAVAILABLE, FEEDBACK_MESSAGES.POSTGREST_UNAVAILABLE)
  }
}

/**
 * Ensures that all stations under a river has their data stored in the store
 * for the river to be downloaded
 * @param {number} id - The id of the river to get the data for
 * @returns {void}
 */
export async function getRiverForDownload (id) {
  // Ensure that river summary is already stored
  await getRiverSummary(id)

  const river = get(riverStore).get(id)

  // Get stations which does not have all of their data ready for download
  const stationsNotFetchedForDownload = river.stations.filter(stationId => !checkIfStationDownloadExists(stationId))

  // Exit the function of all stations are ready for download
  if (stationsNotFetchedForDownload.length === 0) {
    return
  }

  try {
    // Get all download data for all stations under river
    const fetchedStations = await fetchStationDownload(stationsNotFetchedForDownload)

    // Validate the fetched stations
    if (!fetchedStations || !validateStationDownload(fetchedStations)) {
      return
    }

    updateStoreWithObjects(stationStore, fetchedStations, Station)
  } catch (error) {
    addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.POSTGREST_UNAVAILABLE, FEEDBACK_MESSAGES.POSTGREST_UNAVAILABLE)
  }
}

/**
 * Ensures that a station is stored in the station store such that
 * the station can be downloaded
 * @param {number} id - The id of the station to get the data for
 * @returns {void}
 */
export async function getStationForDownload (id) {
  // Ensure that station summary is already stored
  await getStationSummary(id)

  const station = get(stationStore).get(id)

  // Ensure that river summary for station is stored
  await getRiverSummary(station.riverId)

  if (checkIfStationDownloadExists(id)) {
    return
  }

  try {
    const fetchedStations = await fetchStationDownload([id])

    // Validate the fetched station
    if (!fetchedStations || !validateStationDownload(fetchedStations)) {
      return
    }

    updateStoreWithObject(stationStore, fetchedStations[0], Station)
  } catch (error) {
    addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.POSTGREST_UNAVAILABLE, FEEDBACK_MESSAGES.POSTGREST_UNAVAILABLE)
  }
}

/**
 * Retrieves all the stations for a given river
 * @param {object} river - The river object, which has the ID of the stations
 * @returns {Map<number, Station>} - A Map of stations under the given river
 */
export function getStationsForRiver (river) {
  return filtersStationsByRiver(river, get(stationStore))
}

/**
 * Retrieves all observations under a given river
 * @param {object} river - The river object, which has the ID of the stations
 * @returns {Observation[]} - An array of observations under the given river
 */
export function getObservationsForRiver (river) {
  const stations = getStationsForRiver(river)
  let observations = []
  stations.forEach(station => {
    observations = [...observations, ...station.observations]
  })

  return observations
}
