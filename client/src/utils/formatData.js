import { addFeedbackToStore } from './addFeedbackToStore.js'
import { FEEDBACK_TYPES, FEEDBACK_CODES, FEEDBACK_MESSAGES } from '../constants/feedbackMessages'

/**
 * Converts river objects into arrays for display in a table
 * 
 * @param {Map<int, River>} rivers - The rivers to convert to array
 * @returns {{headers: string[], rows: string[][]}} - Headers and rows for the table
 */
export function formatRiversForTable (rivers) {
  let headers = ['Navn', 'Dato', 'Projektnummer']

  let rows = []
  rivers.forEach(river => {
    rows.push([
      river.id,
      river.name,
      river.startDate,
      river.projectId
    ])
  })

  return {headers, rows}
}

/**
 * Converts station objects into arrays for display in a table
 * 
 * @param {Map<int, Station>} stations - The stations to convert to array
 * @returns {{headers: string[], rows: string[][]}} - Headers and rows for the table
 */
export function formatStationsForTable (stations) {
  let headers = ['Navn', 'Dato', 'Kl.']
  
  let rows = []
  stations.forEach(station => {
    rows.push([
      station.id,
      station.name,
      station.startDate,
      station.time
    ])
  })

  return {headers, rows}
}