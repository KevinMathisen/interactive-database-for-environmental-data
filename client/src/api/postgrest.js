/**
 * postgrest.js
 * Module which exports functions which fetches data from the PostgREST API
 */

const POSTGREST_URL = import.meta.env.VITE_POSTGREST_URL;
const RIVERS_ENDPOINT = import.meta.env.VITE_POSTGREST_RIVERS_ENDPOINT;
const STATIONS_ENDPOINT = import.meta.env.VITE_POSTGREST_STATIONS_ENDPOINT;
const RIVER_SUMMARY_ENDPOINT = import.meta.env.VITE_POSTGREST_RIVER_SUMMARY_ENDPOINT;
const STATION_SUMMARY_ENDPOINT = import.meta.env.VITE_POSTGREST_STATION_SUMMARY_ENDPOINT;
const STATION_DOWNLOAD_ENDPOINT = import.meta.env.VITE_POSTGREST_STATION_DOWNLOAD_ENDPOINT

/**
 * Fetches data from the PostgREST API on the endpoint specified
 *
 * @param {string} endpoint - The endpoint with optional parameters 
 * 								to fetch data from
 * @returns {Promise} - A promise which resolves to json data
 * @throws {Error} - Thrown if the fetch fails
 * @async
 */
async function fetchFromPostgrest(endpoint) {
	// Tries to fetch data, catches any errors 
	try {
		// Fetch data from given url and endpoint
		const response = await fetch(`${POSTGREST_URL}/${endpoint}`, {
			method: 'GET'
		});
		// Return the response
		return handleResponse(response);

	} catch (error) {
		console.error(error);
	}
}

/**
 * Handles the response from the fetch request by checking for any errors and
 *   returning json data if none are found
 *
 * @param {Response} response - The response from the fetch request
 * @returns {Promise} - A promise which resolves to json data
 * @throws {Error} - Thrown if the response status is not ok
 * @async
 */
async function handleResponse(response) {
	// If response status is not ok, throw an error
	if (!response.ok) {
		const errMessage = await response.text();
		const errorDetails = errMessage ? `: ${errMessage}` : '';
		throw new Error(response.statusText);
	}

	// If response status is 204 No Content, return null
	if (response.status === 204) {
		return null;
	}

	// Return response as json
	return response.json();
}

/**
 * Fetches all rivers from PostgREST API on the rivers endpoint
 *
 * @returns {Promise} - A promise which resolves to json data
 * @async
 */
export async function fetchRivers() {
	return fetchFromPostgrest(RIVERS_ENDPOINT);
}

/**
 * Fetches all stations from PostgREST API on the stations endpoint
 *
 * @returns {Promise} - A promise which resolves to json data
 * @async
 */
export async function fetchStations() {
	return fetchFromPostgrest(STATIONS_ENDPOINT);
}

/**
 * Fetches a river with specified ID from PostgREST API on the river summary endpoint
 *
 * @param {int} id - The id of the river to fetch data for
 * @returns {Promise} - A promise which resolves to json data
 * @async
 */
export async function fetchRiverSummary(id) {
	const endpoint = `${RIVER_SUMMARY_ENDPOINT}?id=eq.${id}`;
	return fetchFromPostgrest(endpoint);
}

/**
 * Fetches a station with specified ID from PostgREST API on the station summary endpoint
 *
 * @param {array} id - The id of the station to fetch data for
 * @returns {Promise} - A promise which resolves to json data
 * @async
 */
export async function fetchStationSummary(id) {
	// Create endpoint for either single station or array of stations
	const endpoint = createEndpointForArray(id, STATION_SUMMARY_ENDPOINT);

	return fetchFromPostgrest(endpoint);
}

/**
 * Fetches all data to the river specified with ID from PostgREST API 
 *
 * @param {int} id - The id of the river to fetch data for
 * @returns {Promise} - A promise which resolves to json data
 * @async
 */
export async function fetchAllRiver(id) {
	const endpoint = `${RIVER_ENDPOINT}?id=eq.${id}&`;
	return fetchFromPostgrest(endpoint);
}

/**
 * Fetches all data to the station specified with ID from PostgREST API 
 *
 * @param {array} id - The id of the station to fetch data for
 * @returns {Promise} - A promise which resolves to json data
 * @async
 */
export async function fetchAllStation(id) {
	// Create endpoint for either single station or array of stations
	const endpoint = createEndpointForArray(id, STATION_DOWNLOAD_ENDPOINT);
	
	return fetchFromPostgrest(endpoint);
}

/**
 * Fetches all data to the observation specified with a station ID from PostgREST API 
 *
 * @param {array} id - The id of the station to fetch observations for
 * @returns {Promise} - A promise which resolves to json data
 * @async
 */
export async function fetchAllObservation(id) {
	// Create endpoint for either single station or array of stations
	const endpoint = createEndpointForArray(id, OBSERVATION_ENDPOINT);

	return fetchFromPostgrest(endpoint);
}

/**
 * Creates a postgrest endpoint for either a single id or an array of ids
 * 
 * @param {array} id - The id of the object to fetch data for
 * @param {string} endpoint - The endpoint to fetch data from
 * @returns {string} - The endpoint with the id or ids added
 */
function createEndpointForArray(id, endpoint) {	
	if (id.length === 1) {
		return `${endpoint}?id=eq.${id[0]}`;
	} 

	if (id.length === 0) {
		throw new Error('No id given');
	}
		
	return `${endpoint}?id=in.(${id.join(',')})`;
}