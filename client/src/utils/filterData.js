import attributesToFilterOn from '../constants/attributesToFilterOn'
import { addFeedbackToStore } from './addFeedbackToStore.js'
import { FEEDBACK_TYPES, FEEDBACK_CODES, FEEDBACK_MESSAGES } from '../constants/feedbackMessages'

/**
 * Filters a map of objects based on if a value given exists as a substring for a given attribute
 *
 * @param {Map<int, object>} objects - The map of objects to filter
 * @param {string[]} attributes - The attributes to filter on
 * @param {string} value - The value which should exist in the attribute value
 * @returns {Map<int, object>} - A filtered map of objects
 */
function filterDataBasedOnAttributeSubstring(objects, attributes, value) {
  // Checks for each object if the value is a subtext of the attributes, ignoring case
  return new Map([...objects].filter(([key, object]) =>
    attributes.some(attribute => 
      object[attribute] && 
      object[attribute].toLowerCase().includes(value.toLowerCase())
    )
  ));
}

/**
 * Filters a map of objects based on if a given attribute is in a list of values
 *
 * @param {Map<int, object>} objects - The map of objects to filter
 * @param {string} attribute - The attribute to filter on
 * @param {string[]} values - The list of values which should be equal to the attribute value
 * @returns {Map<int, object>} - A filtered map of objects
 */
function filterDataBasedOnAttributeInList(objects, attribute, values) {
  // return the objects which have an attribute that is in the values list
  return new Map([...objects].filter(([key, object]) => 
    values.includes(object[attribute])
  ));
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
 * @param {Map<int, River>} rivers - The map of rivers to filter
 * @param {string} startDate - The start date
 * @param {string} endDate - The end date
 * @returns {Map<int, River>} - A filtered map of rivers
 */
function filterRiversBasedOnDates(rivers, startDate, endDate) {
  // Return all rivers if no start and no end date is given
  if (!startDate && !endDate) return rivers

  // If only one date is set, set the other to the earliest or latest possible date
  if (!startDate) startDate = '1970-01-01'
  else if (!endDate) endDate = '2100-01-01'

  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  // For each river, check if its dates overlap with the start and end date
  return new Map([...rivers].filter(([key, river]) =>
    checkIfDateIsBetween(river[attributesToFilterOn.RIVER_START_DATE], startDateObj, endDateObj) ||
    checkIfDateIsBetween(river[attributesToFilterOn.RIVER_END_DATE], startDateObj, endDateObj)
  ));
}

/**
 * Filters stations based on if they are between the start and end date
 *
 * @param {Map<int, Station>} stations - The map of stations to filter
 * @param {string} startDate - The start date
 * @param {string} endDate - The end date
 * @returns {Map<int, Station>} - A filtered map of stations
 */
function filterStationsBasedOnDate(stations, startDate, endDate) {
  // Return all stations if no start and no end date is given
  if (!startDate && !endDate) return stations

  // If only one date is set, set the other to the earliest or latest possible date
  if (!startDate) startDate = '1970-01-01'
  else if (!endDate) endDate = '2100-01-01'

  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  // For each station, check if the date is between the start and end date
  return new Map([...stations].filter(([key, station]) =>
    checkIfDateIsBetween(station[attributesToFilterOn.STATION_DATE], startDateObj, endDateObj)
  ));
}

/**
 * Returns objects which have a species that is in the speciesToFilterOn
 *
 * @param {Map<int, object>} objects - The map of objects to filter
 * @param {string[]} speciesToFilterOn - The species to filter on
 * @returns {Map<int, object>} - A filtered map of objects
 */
function filterObjectsBasedOnSpecies(objects, speciesToFilterOn) {
  // Use set instead of array for faster lookups
  const speciesToFilterOnSet = new Set(speciesToFilterOn);

  // Return objects which have a species that is in the speciesToFilterOn
  return new Map([...objects].filter(([key, object]) =>
    object[attributesToFilterOn.SPECIES] && 
    object[attributesToFilterOn.SPECIES].some(objectSpecies => speciesToFilterOnSet.has(objectSpecies))
  ));
}

/**
 * Filters rivers based on a searchQuery
 *
 * @param {Map<int, River>} rivers - The map of rivers to filter, keyed by a unique identifier
 * @param {string} searchQuery - The search query
 * @returns {Map<int, River>} - A filtered map of rivers
 */
export function filterRiversBySearch (rivers, searchQuery) {
  try {
    // Filters rivers based on if the searchQuery is a substring of their name or projectId
    return filterDataBasedOnAttributeSubstring(rivers, attributesToFilterOn.RIVER_SEARCH, searchQuery)
  } catch (error) {
    addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.GENERIC, FEEDBACK_MESSAGES.GENERIC)
    return new Map()
  }
}

/**
 * Filters stations based on a searchQuery
 *
 * @param {Map<int, Station>} stations - The map of stations to filter, keyed by a unique identifier
 * @param {string} searchQuery - The search query
 * @returns {Map<int, Station>} - A filtered map of stations
 */
export function filterStationsBySearch (stations, searchQuery) {
  try {
    // Filters stations based on if the searchQuery is a substring of their name or projectId
    return filterDataBasedOnAttributeSubstring(stations, attributesToFilterOn.STATION_SEARCH, searchQuery)
  } catch (error) {
    addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.GENERIC, FEEDBACK_MESSAGES.GENERIC)
    return new Map()
  }
}

/**
 * Filters rivers based on their species and date
 *
 * @param {Map<int, River>} rivers - The map of rivers to filter, keyed by a unique identifier
 * @param {string[]} species - The species to filter on
 * @param {string} startDate - The start of the date interval to filter on
 * @param {string} endDate - The end of the date interval to filter on
 * @returns {Map<int, River>} - A filtered map of rivers
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
    return new Map()
  }
}

/**
 * Filters stations based on their species and date
 *
 * @param {Map<int, Station>} stations - The map of stations to filter, keyed by a unique identifier
 * @param {string[]} species - The species to filter on
 * @param {string} startDate - The start of the date interval to filter on
 * @param {string} endDate - The end of the date interval to filter on
 * @returns {Map<int, Station>} - A filtered map of stations
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
    return new Map()
  }
}

/**
 * Filters observations based on their species
 *
 * @param {Observation[]} observations - The list of observations to filter
 * @param {string[]} species - The species to filter on
 * @returns {Observation[]} - A filtered list of observations
 */
export function filterObservationsBySpecies (observations, species) {
  try {
    // Filter observations based on if they have a species that is in the species list
    return filterDataBasedOnAttributeInList(observations, attributesToFilterOn.SPECIES, species)
  } catch (error) {
    addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.GENERIC, FEEDBACK_MESSAGES.GENERIC)
    return []
  }
}

/**
 * Finds all unqiue species from a list of rivers
 * 
 * @param {Map<string, River>} rivers - The list of rivers to find species from
 * @returns {string[]} - A list of unique species
 */
export function getSelectableSpecies(rivers) {
  // Use set instead of array for faster lookups
  const speciesSet = new Set()

  rivers.forEach(river => {
    river[attributesToFilterOn.SPECIES].forEach(species => speciesSet.add(species))
  })

  return Array.from(speciesSet)
}