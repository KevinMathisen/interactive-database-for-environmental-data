/**
 * postgrest.js
 * Module which exports functions which fetches data from the PostgREST API
 */

const POSTGREST_URL = import.meta.env.VITE_POSTGREST_URL
const RIVERS_ENDPOINT = import.meta.env.VITE_POSTGREST_RIVERS_ENDPOINT
const STATIONS_ENDPOINT = import.meta.env.VITE_POSTGREST_STATIONS_ENDPOINT
const RIVER_SUMMARY_ENDPOINT = import.meta.env.VITE_POSTGREST_RIVER_SUMMARY_ENDPOINT
const STATION_SUMMARY_ENDPOINT = import.meta.env.VITE_POSTGREST_STATION_SUMMARY_ENDPOINT
const STATION_DOWNLOAD_ENDPOINT = import.meta.env.VITE_POSTGREST_STATION_DOWNLOAD_ENDPOINT

/**
 * Fetches data from the PostgREST API on the endpoint specified
 *
 * @param {string} endpoint - The endpoint with optional parameters
 *                               to fetch data from
 * @returns {Promise} - A promise which resolves to json data
 * @throws {Error} - Thrown if the fetch fails
 * @async
 */
async function fetchFromPostgrest (endpoint) {
  // Tries to fetch data, catches any errors
  try {
    // Fetch data from given url and endpoint
    const response = await fetch(`${POSTGREST_URL}/${endpoint}`, {
      method: 'GET'
    })
    // Return the response
    return handleResponse(response)
  } catch (error) {
    console.error(error)
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
async function handleResponse (response) {
  // If response status is not ok, throw an error
  if (!response.ok) {
    // const errMessage = await response.text()
    // const errorDetails = errMessage ? `: ${errMessage}` : ''
    throw new Error(response.statusText)
  }

  // If response status is 204 No Content, return null
  if (response.status === 204) {
    return null
  }

  // Return response as json
  return response.json()
}

/**
 * Fetches data needed for the rivers on the map and list page
 *
 * @returns {Promise} - A promise which resolves to json data
 * @async
 */
export async function fetchRivers () {
  return fetchFromPostgrest(RIVERS_ENDPOINT)
}

/**
 * Fetches data needed for the stations on the map and list page
 *
 * @returns {Promise} - A promise which resolves to json data
 * @async
 */
export async function fetchStations () {
  return fetchFromPostgrest(STATIONS_ENDPOINT)
}

/**
 * Fetches all station data needed for the summary page
 *
 * @param {int} id - The id of the river to fetch data for
 * @returns {Promise} - A promise which resolves to json data
 * @async
 */
export async function fetchRiverSummary (id) {
  const endpoint = `${RIVER_SUMMARY_ENDPOINT}?id=eq.${id}`
  return fetchFromPostgrest(endpoint)
}

/**
 * Fetches all station data needed for the summary page
 *
 * @param {array} id - The id of the station to fetch data for
 * @returns {Promise} - A promise which resolves to json data
 * @async
 */
export async function fetchStationSummary (id) {
  // Create endpoint for either single station or array of stations
  const endpoint = createEndpointForArray(id, STATION_SUMMARY_ENDPOINT)

  return fetchFromPostgrest(endpoint)
}

/**
 * Fetches all data required to download a station specified with ID
 *
 * @param {array} id - The id of the station to fetch data for
 * @returns {Promise} - A promise which resolves to json data
 * @async
 */
export async function fetchStationDownload (id) {
  // Create endpoint for either single station or array of stations
  const endpoint = createEndpointForArray(id, STATION_DOWNLOAD_ENDPOINT)

  return fetchFromPostgrest(endpoint)
}

/**
 * Creates a postgrest endpoint for either a single id or an array of ids
 *
 * @param {array} id - The id of the object to fetch data for
 * @param {string} endpoint - The endpoint to fetch data from
 * @returns {string} - The endpoint with the id or ids added
 */
function createEndpointForArray (id, endpoint) {
  // If id is a single number, return endpoint with id
  if (id.length === 1) {
    return `${endpoint}?id=eq.${id[0]}`
  }

  // If no id is given, throw an error
  if (id.length === 0) {
    throw new Error('No id given')
  }

  // If id is an array of numbers, return endpoint with all ids
  return `${endpoint}?id=in.(${id.join(',')})`
}
