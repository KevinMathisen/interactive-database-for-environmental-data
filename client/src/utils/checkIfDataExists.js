import { riverStore } from "../stores/riverStore";
import { stationStore } from "../stores/stationStore";

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
function doesDataInStoreExist(store) {
	// checks if the store is empty, if so return false
	if (store.get().size === 0) {
		return false;
	}

	// if the first object in the store does not have coordinates, return false
	return store.get().values().next().value.coordinates !== null;
}

