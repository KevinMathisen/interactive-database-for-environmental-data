// import { addFeedbackToStore } from './addFeedbackToStore.js';
// import { FEEDBACK_TYPES, FEEDBACK_CODES, FEEDBACK_MESSAGES } from '../constants/feedbackMessages';
import headersConstants from '../constants/headers.js';
import { riverStore } from '../stores/riverStore.js'
import { stationStore } from '../stores/stationStore.js'
import { get } from 'svelte/store'

/**
 * Converts river objects into arrays for display in a table
 * @param {Map<number, object>} rivers - The rivers to convert to array
 * @returns {{headers: string[], rows: string[][]}} - Headers and rows for the table
 */
export function formatRiversForTable (rivers) {
  const headers = headersConstants.RIVER_HEADERS_TABLE

  const rows = []
  rivers.forEach(river => {
    rows.push([
      river.id,
      river.name,
      river.startDate,
      river.projectId
    ])
  })

  return { headers, rows }
}

/**
 * Converts station objects into arrays for display in a table
 * @param {Map<number, object>} stations - The stations to convert to array
 * @returns {{headers: string[], rows: string[][]}} - Headers and rows for the table
 */
export function formatStationsForTable (stations) {
  const headers = headersConstants.STATION_HEADERS_TABLE

  const rows = []
  stations.forEach(station => {
    rows.push([
      station.id,
      station.name,
      station.date,
      station.time
    ])
  })

  return { headers, rows }
}

/**
 * Converts a river object into a string array for insertion into an Excel file
 * Each string is an attribute of the object and a column in the Excel file 
 * 
 * @param {River} river - The river to create a row for
 * @returns {string[]} - A row in excel
 */
function createRowForRiver(river) {
  return [
    river.startDate, river.endDate, river.name, river.boatType, river.position.coordinates[1],
    river.position.coordinates[0], river.waterflow, river.skipper, river.crew[0], river.crew[1], river.crew[2],
    river.projectId, river.comment
  ]
}

/**
 * Converts a station object into a string array for insertion into an Excel file
 * Each string is an attribute of the object and a column in the Excel file 
 * 
 * @param {Station} station - The station to create a row for
 * @returns {string[]} - A row in excel
 */
function createRowForStation(station) {
  return [
    row.name.split(' ')[1], row.date, row.time, row.startPos.coordinates[0], row.startPos.coordinates[1],
    row.endPos.coordinates[0], row.endPos.coordinates[1], row.riverType, row.weather, row.waterTemp, row.airTemp,
    row.conductivity, row.transectLength, row.secFished, row.voltage, row.pulse, row.display, row.gpxFile,
    row.description, row.comment
  ]
}

/**
 * Converts an observation object into a string array for insertion into an Excel file
 * Each string is an attribute of the object and a column in the Excel file 
 * 
 * @param {Observation} observation - The observation to create a row for
 * @returns {string[]} - A row in excel
 */
function createRowForObservation(observation) {
  return [
    observation.id, observation.station, observation.round, observation.species, 
    observation.length, observation.count, observation.gender, observation.age, observation.released,
    observation.sampleType, observation.comment
  ]
}