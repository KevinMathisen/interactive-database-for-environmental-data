// TODO: Should add error handling for when the object is empty

// import { addFeedbackToStore } from './addFeedbackToStore.js';
// import { FEEDBACK_TYPES, FEEDBACK_CODES, FEEDBACK_MESSAGES } from '../constants/feedbackMessages';
import headersConstants from '../constants/headers.js'
import { riverStore } from '../stores/riverStore.js'
import { stationStore } from '../stores/stationStore.js'
import { get } from 'svelte/store'
import {
  amountOfFishInStation,
  fishPerMinuteInStation,
  dataForAllSpeciesInStation
} from './calculateData.js'

/**
 * Converts river objects into arrays for display in a table
 * @param {Map<number, River>} rivers - The rivers to convert to array
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
 * @param {Map<number, Station>} stations - The stations to convert to array
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
 * Formats the station data for the station summary table
 * @param {Map<number, Station>} stations - The stations to be formatted
 * @returns {{headers: string[], rows: string[][]}} - Headers and rows for the table
 */
export function formatStationsForSummaryTable (stations) {
  const headers = headersConstants.STATION_SUMMARY_HEADERS_TABLE

  const rows = []
  // Create a row for each station
  stations.forEach(station => {
    rows.push([
      station.id,
      station.name.split(' ')[1], // Get the station number from the name
      station.riverType,
      station.weather,
      station.secFished,
      amountOfFishInStation(station),
      fishPerMinuteInStation(station)
    ])
  })

  return { headers, rows }
}

/**
 * Formats the station conditions for display in a table
 * @param {Station} station - The station object containing the conditions
 * @returns {{headers: string[], rows: string[][]}} - The headers and rows for the table
 */
export function formatStationConditionsForTable (station) {
  const headers = headersConstants.STATION_CONDITIONS_HEADERS_TABLE

  // If the station is an empty station, return an empty table
  if (station.id === null) {
    return { headers, rows: [] }
  }

  const rows = []
  // Create a row with the station conditions
  rows.push([
    station.riverType,
    station.weather,
    station.waterTemp,
    station.airTemp,
    (station.secFished / 60).toFixed(1)
  ])

  return { headers, rows }
}

/**
 * Formats the station settings for display in a table
 * @param {Station} station - The station object containing the settings
 * @returns {{headers: string[], rows: string[][]}} - The headers and rows for the table
 */
export function formatStationSettingsForTable (station) {
  const headers = headersConstants.STATION_SETTINGS_HEADERS_TABLE

  // If the station is an empty station, return an empty table
  if (station.id === null) {
    return { headers, rows: [] }
  }

  const rows = []
  // Create a row with the station settings
  rows.push([
    station.voltage,
    station.pulse,
    station.conductivity
  ])

  return { headers, rows }
}

/**
 * Formats the station observations for display in a table
 * @param {Station} station - The station object containing the observations
 * @returns {{headers: string[], rows: string[][]}} - The headers and rows for the table
 */
export function formatStationObservationsForTable (station) {
  const headers = headersConstants.STATION_OBSERVATIONS_HEADERS_TABLE

  // If the station is an empty station, return an empty table
  if (station.id === null) {
    return { headers, rows: [] }
  }

  const rows = dataForAllSpeciesInStation(station).map(Object.values)

  // For each row, insert the station id at the start of the row
  rows.forEach(row => row.unshift(station.id))

  return { headers, rows }
}

/**
 * Converts a river object into a string array for insertion into an Excel file
 * Each string is an attribute of the object and a column in the Excel file
 * @param {River} river - The river to create a row for
 * @returns {string[]} - A row in excel
 */
function createRowForRiver (river) {
  return [
    river.startDate, river.endDate, river.name, river.boatType, river.position.coordinates[1],
    river.position.coordinates[0], river.waterflow, river.skipper, river.crew[0], river.crew[1], river.crew[2],
    river.projectId, river.comment
  ].map(attribute => attribute === null ? '' : attribute)
}

/**
 * Converts a station object into a string array for insertion into an Excel file
 * Each string is an attribute of the object and a column in the Excel file
 * @param {Station} station - The station to create a row for
 * @returns {string[]} - A row in excel
 */
function createRowForStation (station) {
  return [
    station.name.split(' ')[1], station.date, station.time, station.startPos.coordinates[1], station.startPos.coordinates[0],
    station.endPos.coordinates[1], station.endPos.coordinates[0], station.riverType, station.weather, station.waterTemp, station.airTemp,
    station.conductivity, station.transectLength, station.secFished, station.voltage, station.pulse, station.display, station.gpxFile,
    station.description, station.comment
  ].map(attribute => attribute === null ? '' : attribute)
}

/**
 * Converts an observation object into a string array for insertion into an Excel file
 * Each string is an attribute of the object and a column in the Excel file
 * @param {Observation} observation - The observation to create a row for
 * @returns {string[]} - A row in excel
 */
function createRowForObservation (observation) {
  return [
    observation.id, observation.station, observation.round, observation.species,
    observation.length, observation.count, observation.gender, observation.age, observation.released,
    observation.sampletype, observation.comment
  ].map(attribute => attribute === null ? '' : attribute)
}

/**
 * Converts Rivers into rows for insertion into an Excel file
 * Includes both rivers and its underlying station and observations
 * @param {Map<number, River>} rivers - The rivers to convert to rows
 * @returns {{
 * riverHeader: string[], riverRows: string[],
 * stationHeader: string[], stationRows: string[],
 * observationHeader: string[], observationRows: string[]
 * }} - Headers and rows for the table
 */
export function formatRiversForExcel (rivers) {
  // Import the headers for the Excel file
  const riverHeader = headersConstants.RIVER_HEADERS_EXCEL
  const stationHeader = headersConstants.STATION_HEADERS_EXCEL
  const observationHeader = headersConstants.OBSERVATION_HEADERS_EXCEL

  const riverRows = []
  const stationRows = []
  const observationRows = []

  // Get stations from store
  const stations = get(stationStore)

  rivers.forEach(river => {
    // Create new row for river
    riverRows.push(createRowForRiver(river))

    river.stations.forEach(stationId => {
      // Get station from store
      const station = stations.get(stationId)

      // Create new row for station
      stationRows.push(createRowForStation(station))

      station.observations.forEach(observation => {
        // Create new row for observation
        observationRows.push(createRowForObservation(observation))
      })
    })
  })

  // Return the headers and and all the rows
  return { riverHeader, riverRows, stationHeader, stationRows, observationHeader, observationRows }
}

/**
 * Converts Stations into rows for insertion into an Excel file
 * Includes stations, their river, and the stations underlying observations
 * @param {Map<number, Station>} stations - The stations to convert to rows
 * @returns {{
 * riverHeader: string[], riverRows: string[],
 * stationHeader: string[], stationRows: string[],
 * observationHeader: string[], observationRows: string[]
 * }} - Headers and rows for the table
 */
export function formatStationsForExcel (stations) {
  // Import the headers for the Excel file
  const riverHeader = headersConstants.RIVER_HEADERS_EXCEL
  const stationHeader = headersConstants.STATION_HEADERS_EXCEL
  const observationHeader = headersConstants.OBSERVATION_HEADERS_EXCEL

  const riverRows = []
  const stationRows = []
  const observationRows = []

  // Get rivers from store
  const rivers = get(riverStore)

  // Find all unique rivers for stations selected
  const uniqueRivers = new Map()
  stations.forEach(station => {
    const river = rivers.get(station.riverId)
    if (!uniqueRivers.has(river.id)) {
      uniqueRivers.set(river.id, river)
    }
  })

  uniqueRivers.forEach(river => {
    // Create new row for river
    riverRows.push(createRowForRiver(river))
  })

  stations.forEach(station => {
    // Create new row for station
    stationRows.push(createRowForStation(station))

    station.observations.forEach(observation => {
      // Create new row for observation
      observationRows.push(createRowForObservation(observation))
    })
  })

  // Return the headers and and all the rows
  return { riverHeader, riverRows, stationHeader, stationRows, observationHeader, observationRows }
}

/**
 * Converts Rivers into rows for insertion into a CSV file
 * Each row is a string array with the river, station and observation data
 * @param {Map<number, River>} rivers - The rivers to convert to rows
 * @returns {{header: string[], rows: string[][]}} - Headers and rows for the table
 */
export function formatRiversForCsv (rivers) {
  const header = [
    ...headersConstants.RIVER_HEADERS_EXCEL,
    ...headersConstants.STATION_HEADERS_EXCEL,
    ...headersConstants.OBSERVATION_HEADERS_EXCEL
  ]

  const rows = []

  // Get stations from store
  const stations = get(stationStore)

  rivers.forEach(river => {
    // Create new row for river
    const riverRow = createRowForRiver(river)

    river.stations.forEach(station => {
      // Get station from store
      station = stations.get(station)

      // Create new row for station
      const stationRow = createRowForStation(station)

      station.observations.forEach(observation => {
        // Create new row for observation
        const observationRow = createRowForObservation(observation)

        // Create a row with river, station and observation data
        rows.push([...riverRow, ...stationRow, ...observationRow])
      })
    })
  })

  // Return the headers and and all the rows
  return { header, rows }
}

/**
 * Converts Stations into rows for insertion into a CSV file
 * Each row is a string array with the river, station and observation data
 * @param {Map<number, Station>} stations - The stations to convert to rows
 * @returns {{header: string[], rows: string[][]}} - Headers and rows for the table
 */
export function formatStationsForCsv (stations) {
  const header = [
    ...headersConstants.RIVER_HEADERS_EXCEL,
    ...headersConstants.STATION_HEADERS_EXCEL,
    ...headersConstants.OBSERVATION_HEADERS_EXCEL
  ]

  const rows = []
  // Get rivers from store
  const rivers = get(riverStore)

  stations.forEach(station => {
    // Create new row for station
    const stationRow = createRowForStation(station)

    // Create new row for river
    const riverRow = createRowForRiver(rivers.get(station.riverId))

    station.observations.forEach(observation => {
      // Create new row for observation
      const observationRow = createRowForObservation(observation)

      // Create a row with river, station and observation data
      rows.push([...riverRow, ...stationRow, ...observationRow])
    })
  })

  return { header, rows }
}
