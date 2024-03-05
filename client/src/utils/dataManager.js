import { get } from 'svelte/store';
import { fetchRivers, fetchStations, fetchRiverSummary, fetchStationSummary, fetchAllRiver } from './api/postgrest.js';
import { doesAllRiversExistInStore, doesAllStationsExistInStore, checkIfRiverSummaryExists, checkIfStationSummaryExists, checkIfStationDownloadExists } from './utils/storeUtils.js';
import { riverStore } from './stores/riverStore.js';
import { stationStore } from './stores/stationStore.js';
import { River } from './models/River.js';
import { Station } from './models/Station.js';

/**
 * Updates a store with given objects converted to a given class
 * Ensures that if there is any overlap between new and existing objects,
 *   that the properties of the new object overwrite the old one, while the 
 *     old properties are kept
 * 
 * @param {store} store - The store to update
 * @param {array} objects - The objects to update the store with
 * @param {class} Class - The class to convert the objects to
 * @returns 
 */
function updateStoreWithObjects(store, objects, Class) {
	// If the store is empty, simply set the store with the objects converted to the class
	if (store.get().size === 0) {
		const objectMap = new Map(objects.map(object => [object.id, new Class(object)]));
		store.set(objectMap);
		return;
	}

	// If the store is not empty, update the store with the objects
	store.update(currentMap => {
		objects.forEach(newObject => {
			// If the object does not exist in the store, add it
			if (!currentMap.has(newObject.id)) {
				currentMap.set(newObject.id, new Class(newObject));
				return;
			}

			// If the object already exists in the store, update it
			// by merging the new object with the existing object
			const existingObject = currentMap.get(newObject.id);
			const updatedObject = new Class({
				...existingObject,
				...newObject
			});
			currentMap.set(newObject.id, updatedObject);
		})

		return currentMap;
	});
	
}

/**
 * Updates a store with a given object converted to a given class
 * Ensures that if there is any overlap between a new and existing object,
 *   that the properties of the new object overwrite the old one, while the 
 *     old properties are kept
 * 
 * @param {store} store - The store to update
 * @param {array} object - The object to update the store with
 * @param {class} Class - The class to convert the object to
 * @returns 
 */
function updateStoreWithObject(store, object, Class) {

	store.update(currentMap => {
		// If the object does not exist in the store, add it
		if (!currentMap.has(object.id)) {
			currentMap.set(object.id, new Class(object));
			return currentMap;
		}

		// If the object exists in the store, update it
		const existingObject = currentMap.get(object.id);
		const updatedObject = new Class({
			...existingObject,
			...object
		});
		currentMap.set(object.id, updatedObject);

		return currentMap;
	});
}

