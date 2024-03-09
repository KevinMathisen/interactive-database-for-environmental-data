import * as attributesToFilterOn from '../constants/attributesToFilterOn'
import { addFeedbackToStore } from './addFeedbackToStore.js'
import { FEEDBACK_TYPES, FEEDBACK_CODES, FEEDBACK_MESSAGES } from '../constants/feedbackMessages'

/**
 * Filters a list of objects based on if a value given exists as a substring for a given attribute
 *
 * @param {object[]} objects - The list of objects to filter
 * @param {string[]} attributes - The attributes to filter on
 * @param {string} value - The value which should exist in the attribute value
 * @returns {object[]} - A filtered list of objects
 */
function filterDataBasedOnAttributeSubstring (objects, attributes, value) {
  // Checks for each object if the value is a subtext of the attributes, ignoring case
  return objects.filter(object =>
    attributes.some(attribute => object[attribute].toLowerCase().includes(value.toLowerCase())))
}

/**
 * Filters a list of objects based on if a given attribute is in a list of values
 *
 * @param {object[]} objects - The list of objects to filter
 * @param {string} attribute - The attribute to filter on
 * @param {string[]} value - The value which should be equal to the attribute value
 * @returns {object[]} - A filtered list of objects
 */
function filterDataBasedOnAttributeInList (objects, attribute, values) {
  // return the objects which have an attribute that is in the values list
  return objects.filter(object => values.includes(object[attribute]))
}

/**
 * Checks if a date is between a start and end date
 *
 * @param {string} date - The date to check
 * @param {date} startDate - The start date
 * @param {date} endDate - The end date
 * @returns {boolean} - True if the date is between the start and end date
 */
function checkIfDateIsBetween (date, startDate, endDate) {
  const dateObj = new Date(date)

  return dateObj >= startDate && dateObj <= endDate
}

/**
 * Filters rivers based on if they are between or have overlap with the start and end date
 *
 * @param {River[]} rivers - The list of rivers to filter
 * @param {string} startDate - The start date
 * @param {string} endDate - The end date
 * @returns {River[]} - A filtered list of rivers
 */
function filterRiversBasedOnDates (rivers, startDate, endDate) {
  const startDateObj = new Date(startDate)
  const endDateObj = new Date(endDate)

  // For each river, check if it is between or has overlap with the start and end date
  return rivers.filter(river =>
    checkIfDateIsBetween(river[attributesToFilterOn.RIVER_START_DATE], startDateObj, endDateObj) ||
      checkIfDateIsBetween(river[attributesToFilterOn.RIVER_END_DATE], startDateObj, endDateObj))
}

/**
 * Filters stations based on if they are between the start and end date
 *
 * @param {Station[]} stations - The list of stations to filter
 * @param {string} startDate - The start date
 * @param {string} endDate - The end date
 * @returns {Station[]} - A filtered list of stations
 */
function filterStationsBasedOnDate (stations, startDate, endDate) {
  const startDateObj = new Date(startDate)
  const endDateObj = new Date(endDate)

  // For each station, check if it is between the start and end date
  return stations.filter(station =>
    checkIfDateIsBetween(station[attributesToFilterOn.STATION_DATE], startDateObj, endDateObj))
}

/**
 * Returns objects which have a species that is in the speciesToFilterOn
 *
 * @param {object[]} objects - The list of objects to filter
 * @param {string[]} speciesToFilterOn - The species to filter on
 * @returns {object[]} - A filtered list of objects
 */
function filterObjectsBasedOnSpecies (objects, speciesToFilterOn) {
  // Use set instead of array for faster lookups
  const speciesToFilterOnSet = new Set(speciesToFilterOn)

  // Return objects which have a species that is in the speciesToFilterOn
  return objects.filter(object =>
    object[attributesToFilterOn.SPECIES].some(objectSpecies => speciesToFilterOnSet.has(objectSpecies)))
}

/**
 * Filters rivers based on a searchQuery
 *
 * @param {River[]} rivers - The list of rivers to filter
 * @param {string} searchQuery - The search query
 * @returns {River[]} - A filtered list of rivers
 */
export function filterRiversBySearch (rivers, searchQuery) {
  try {
    // Filters rivers based on if the searchQuery is a substring of their name or projectId
    return filterDataBasedOnAttributeSubstring(rivers, attributesToFilterOn.RIVER_SEARCH, searchQuery)
  } catch (error) {
    addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.GENERIC, FEEDBACK_MESSAGES.GENERIC)
    return []
  }
}

/**
 * Filters stations based on a searchQuery
 *
 * @param {Station[]} stations - The list of stations to filter
 * @param {*} searchQuery - The search query
 * @returns {Station[]} - A filtered list of stations
 */
export function filterStationsBySearch (stations, searchQuery) {
  try {
    // Filters stations based on if the searchQuery is a substring of their name or projectId
    return filterDataBasedOnAttributeSubstring(stations, attributesToFilterOn.STATION_SEARCH, searchQuery)
  } catch (error) {
    addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.GENERIC, FEEDBACK_MESSAGES.GENERIC)
    return []
  }
}

/**
 * Filters rivers based on their species and date
 *
 * @param {River[]} rivers - The list of rivers to filter
 * @param {string[]} species - The species to filter on
 * @param {string} startDate - The start of the date interval to filter on
 * @param {string} endDate - The end of the date interval to filter on
 * @returns {River[]} - A filtered list of rivers
 */
export function filterRiversByDateAndSpecies (rivers, species, startDate, endDate) {
  try {
    // Filter rivers based on if they are between or have overlap with the start and end date
    const filteredDateRivers = filterRiversBasedOnDates(rivers, startDate, endDate)

    // Filter rivers based on if they have a species that is in the species list
    const filteredSpeciesAndDateRivers = filterObjectsBasedOnSpecies(filteredDateRivers, species)

    return filteredSpeciesAndDateRivers
  } catch (error) {
    addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.GENERIC, FEEDBACK_MESSAGES.GENERIC)
    return []
  }
}

/**
 * Filters stations based on their species and date
 *
 * @param {Station[]} stations - The list of stations to filter
 * @param {string[]} species - The species to filter on
 * @param {string} startDate - The start of the date interval to filter on
 * @param {string} endDate - The end of the date interval to filter on
 * @returns {Station[]} - A filtered list of stations
 */
export function filterStationsByDateAndSpecies (stations, species, startDate, endDate) {
  try {
    // Filter stations based on if they are between the start and end date
    const filteredDateStations = filterStationsBasedOnDate(stations, startDate, endDate)

    // Filter stations based on if they have a species that is in the species list
    const filteredSpeciesAndDateStations = filterObjectsBasedOnSpecies(filteredDateStations, species)

    return filteredSpeciesAndDateStations
  } catch (error) {
    addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.GENERIC, FEEDBACK_MESSAGES.GENERIC)
    return []
  }
}

