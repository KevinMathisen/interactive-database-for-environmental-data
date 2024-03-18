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

//  - - - - DOWNLOAD FUNCTIONALITY - - - -
/**
 * Generates an Excel file from the given data
 * @param {Map<number, River>} rivers - The rivers to generate the Excel file from
 * @param {Map<number, Station>} stations - The stations to generate the Excel file from
 * @param {string} type - - The type of data ('river' or 'station')
 * @returns {Promise<Blob>} A promise that resolves with a Blob representing the Excel file.
 */
export async function generateExcelFile (rivers, stations, type) {
  try {
    // Format the data for Excel
    let data = type === 'river' ? formatRiversForExcel(rivers) : formatStationsForExcel(stations)

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
    const blob = new Blob([buffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})

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
 * @returns {string} - A string containing the CSV file
 */
export async function generateCSVFile (rivers, stations, type) {
  try {
    // Format the data for CSV
    let data = type === 'river' ? formatRiversForCsv(rivers) : formatStationsForCsv(stations)

    // Generate and return CSV content, where each row is separated by a newline, and each column by a comma
    const csvContent = [
      data.header.join(','), 
      ...data.rows.join(',')
    ].join('\n')

    // Convert the CSV content to a blob
    const blob = new Blob([csvContent], {type: 'text/csv'});

    // Return the blob
    return blob;
  } catch (error) {
    addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.NOT_FOUND, FEEDBACK_MESSAGES.ERROR_GENERATING_FILE)
    return new Blob()
  }
}

//  - - - - UPLOAD FUNCTIONALITY - - - -

/**
 * Validated the file type and size
 * @param {File} file - The file to validate
 * @returns {boolean} - True if the file is valid, else false
 */
export function validateFile (file) {
  // Check if the file type is valid
  if (!['.csv', '.xlsx'].includes(file.name.slice(file.name.lastIndexOf('.')))) {
    addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.UNSUPPORTED_CONTENT_TYPE, FEEDBACK_MESSAGES.UNSUPPORTED_CONTENT_TYPE)
    return false
  }
  // Check if the file size exceeds the limit
  if (file.size > 10 * 1024 * 1024) {
    addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.CONTENT_TO_LARGE, FEEDBACK_MESSAGES.CONTENT_TO_LARGE)
    return false
  }
  return true
}

/**
 * Reads the content of a CSV file
 * @param {File} file - The file to check
 * @param {Array<File>} filesArray - The array of files to check
 * @returns {boolean} - True if the file exists in the array, else false
 */
export function fileExistsInArray (file, filesArray) {
  return filesArray.some(existingFile => existingFile.name === file.name)
}
