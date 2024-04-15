import ExcelJS from 'exceljs'
import {
  FEEDBACK_TYPES,
  FEEDBACK_CODES,
  FEEDBACK_MESSAGES
} from '../constants/feedbackMessages.js'
import { addFeedbackToStore } from './addFeedbackToStore'
import {
  formatRiversForExcel,
  formatStationsForExcel,
  formatRiversForCsv,
  formatStationsForCsv
} from './formatData.js'

/**
 * Generates an Excel file from the given data
 * @param {Map<number, River>} rivers - The rivers to generate the Excel file from
 * @param {Map<number, Station>} stations - The stations to generate the Excel file from
 * @param {string} type - - The type of data ('river' or 'station')
 * @param {string[]} selectedSpecies - The species to include in the Excel file
 * @returns {Promise<Blob>} A promise that resolves with a Blob representing the Excel file.
 */
export async function generateExcelFile (rivers, stations, type, selectedSpecies) {
  try {
    // Format the data for Excel
    const data = type === 'river' ? formatRiversForExcel(rivers, selectedSpecies) : formatStationsForExcel(stations, selectedSpecies)

    // Create a new workbook
    const workbook = new ExcelJS.Workbook()

    // Create a river worksheet, and add each river to it
    const riverSheet = workbook.addWorksheet('Elvedata')
    riverSheet.addRow(data.riverHeader)
    data.riverRows.forEach(row => {
      riverSheet.addRow(row)
    })

    // Create a station worksheet, and add each station to it
    const stationSheet = workbook.addWorksheet('Stasjonsdata')
    stationSheet.addRow(data.stationHeader)
    data.stationRows.forEach(row => {
      stationSheet.addRow(row)
    })

    // Create an observation worksheet, and add each observation to it
    const observationSheet = workbook.addWorksheet('Individdata')
    observationSheet.addRow(data.observationHeader)
    data.observationRows.forEach(row => {
      observationSheet.addRow(row)
    })

    // Write the workbook to a buffer
    const buffer = await workbook.xlsx.writeBuffer()

    // Convert the buffer to a blob
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })

    // Return the blob
    return blob
  } catch (error) {
    addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.NOT_FOUND, FEEDBACK_MESSAGES.ERROR_GENERATING_FILE)
    // if error, return empty blob
    return new Blob()
  }
}

/**
 * Generates a CSV file from the given data
 * @param {Map<number, River>} rivers - The rivers to generate the CSV file from
 * @param {Map<number, Station>} stations - The stations to generate the CSV file from
 * @param {string} type - The type of data to generate the CSV file from
 * @param {string[]} selectedSpecies - The species to include in the CSV file
 * @returns {string} - A string containing the CSV file
 */
export async function generateCSVFile (rivers, stations, type, selectedSpecies) {
  try {
    // Format the data for CSV
    const data = type === 'river' ? formatRiversForCsv(rivers, selectedSpecies) : formatStationsForCsv(stations, selectedSpecies)

    // Generate and return CSV content, where each row is separated by a newline, and each column by a comma
    const rows = data.rows.map(row => row.join(','))
    const csvContent = [
      data.header.join(','),
      ...rows
    ].join('\n')

    // Convert the CSV content to a blob
    const blob = new Blob([csvContent], { type: 'text/csv' })

    // Return the blob
    return blob
  } catch (error) {
    addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.NOT_FOUND, FEEDBACK_MESSAGES.ERROR_GENERATING_FILE)
    return new Blob()
  }
}
