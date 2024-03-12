import { addFeedbackToStore } from './addFeedbackToStore.js'
import { FEEDBACK_TYPES, FEEDBACK_CODES, FEEDBACK_MESSAGES } from '../constants/feedbackMessages'

/**
 * Converts the river objects into arrays for display in a table
 * 
 * @param {River[]} rivers - The rivers to convert to array
 * @returns - The rivers as arrays
 */
export function formatRiversForTable (rivers) {
  return rivers.map(river => {
	return [
	  river.id,
	  river.name,
	  river.startDate,
	  river.projectId
	]
  })
}

/**
 * Converts the station objects into arrays for display in a table
 * 
 * @param {Station[]} stations - The stations to convert to array
 * @returns - The stations as arrays
 */
export function formatStationsForTable (stations) {
  return stations.map(station => {
	return [
	  station.id,
	  station.name,
	  station.startDate,
	  station.time
	]
  })
}