import { riverStore } from '../stores/riverStore'
import { stationStore } from '../stores/stationStore'
import { get } from 'svelte/store'

/**
 * Check if the store contains any data, and if it contains any data,
 *   check if the objects in the store has coordinates
 * Assumes that if the first object in the store does not have any coordinates
 *   that there is not sufficient data in the store to display the data
 *     on the map or list page
 *
 * @param {store} store - The store to check if data exists in
 * @returns {boolean} - True if the store contains suficient data, else false
 */
function doesDataInStoreExist (store) {
  // checks if the store is empty, if so return false
  if (get(store).size === 0) {
    return false
  }

  // if the first object in the store does not have coordinates, return false
  return get(store).values().next().value.coordinates !== null
}

/**
 * Checks if the store contains sufficient data for all rivers to display
 *    them on the map and list page
 *
 * @returns {boolean} - True if the store contains river data for all rivers, else false
 */
export function doesAllRiversExistInStore () {
  return doesDataInStoreExist(riverStore)
}

/**
 * Checks if the store contains sufficient data for all stations to display
 *   them on the map and list page
 *
 * @returns {boolean} - True if the store contains station data for all stations, else false
 */
export function doesAllStationsExistInStore () {
  return doesDataInStoreExist(stationStore)
}

/**
 * Check if an object with a given key exists in specific store,
 *   and if the object has a given property defined
 *
 * @param {store} store - The store to check
 * @param {int} key - The key to check for
 * @param {string} prop - The property to check for
 * @returns {boolean} - True if the property is defined, else false
 */
function checkIfObjectHasProperty (store, key, prop) {
  // Retrive map of data
  const dataMap = get(store)

  // If no object with key given exists, return false
  if (dataMap.has(key) === false) {
    return false
  }

  // Retrieve object with key given
  const data = dataMap.get(key)

  // If the object does not have the property defined, return false
  return data[prop] !== null
}

/**
 * Check if the store contains information for a river summary with the given id
 * Assumes that a river that has the property "skipper" defined also has
 *   the rest of the data needed to display the river summary
 *
 * @param {int} id - The id of the river to check for
 * @returns {boolean} - True if store contains river summary info, else false
 */
export function checkIfRiverSummaryExists (id) {
  return checkIfObjectHasProperty(riverStore, id, 'skipper')
}

/**
 * Check if the store contains information for a station summary with the given id
 * Assumes that a station that has the property "sec_fished" defined also has
 *   the rest of the data needed to display the station summary
 *
 * @param {int} id - The id of the station to check for
 * @returns {boolean} - True if store contains station summary info, else false
 */
export function checkIfStationSummaryExists (id) {
  return checkIfObjectHasProperty(stationStore, id, 'sec_fished')
}

/**
 * Check if the store contains the data needed to download a station
 * Assumes that a station that has the property "display" defined also has
 *   the rest of the data needed to download a station
 *
 * @param {int} id - The id of the station to check for
 * @returns {boolean} - True if store contains data needed to download station, else false
 */
export function checkIfStationDownloadExists (id) {
  return checkIfObjectHasProperty(stationStore, id, 'display')
}
