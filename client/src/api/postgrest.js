/*
 * postgrest.js
 * Module which exports functions which fetches data from the PostgREST API
 */

const POSTGREST_URL = import.meta.env.VITE_POSTGREST_URL;
const RIVERS_ENDPOINT = import.meta.env.VITE_POSTGREST_RIVERS_ENDPOINT;
const STATIONS_ENDPOINT = import.meta.env.VITE_POSTGREST_STATIONS_ENDPOINT;
const RIVER_SUMMARY_ENDPOINT = import.meta.env.VITE_POSTGREST_RIVER_SUMMARY_ENDPOINT;
const STATION_SUMMARY_ENDPOINT = import.meta.env.VITE_POSTGREST_STATION_SUMMARY_ENDPOINT;
const RIVER_ENDPOINT = import.meta.env.VITE_POSTGREST_RIVER_ENDPOINT
const STATION_ENDPOINT = import.meta.env.VITE_POSTGREST_STATION_ENDPOINT
const OBSERVATION_ENDPOINT = import.meta.env.VITE_POSTGREST_OBSERVATION_ENDPOINT

/*
 * Fetches data from the PostgREST API on the endpoint specified
 *
 * @param {string} endpoint - The endpoint with optional parameters 
 * 								to fetch data from
 * @returns {Promise} - A promise which resolves to json data
 * @throws {Error} - Thrown if the fetch fails
 * @async
 * @private
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

/*
 * Handles the response from the fetch request by checking for any errors and
 *   returning json data if none are found
 *
 * @param {Response} response - The response from the fetch request
 * @returns {Promise} - A promise which resolves to json data
 * @throws {Error} - Thrown if the response status is not ok
 * @async
 * @private
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

