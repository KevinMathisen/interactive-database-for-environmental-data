import Ajv from 'ajv'
import XLSX from 'xlsx'
import validator from 'validator'
import {
  schemaRiverWithSpecies,
  schemaStationWithSpecies,
  schemaRiverSummary,
  schemaStationSummary,
  schemaStationDownload,
  schemaRiverSheet,
  schemaStationSheet,
  schemaObservationSheet
} from '../constants/schemas.js'
import {
  FEEDBACK_TYPES,
  FEEDBACK_CODES,
  FEEDBACK_MESSAGES
} from '../constants/feedbackMessages.js'
import { addFeedbackToStore } from './addFeedbackToStore.js'


/**
 * Validate text using regex to whitelist specific characters
 * @param {string} input - The input string to validate
 * @returns {boolean} - If the input is allowed or not
 */
export function validateText (input) {
  const allowedPattern = /^[a-zA-Z0-9 .,?!\/]+$/

  // Return if invalid input
  return allowedPattern.test(input)
}

/**
 * Validate password using validator
 * @param {string} input - The input string to validate
 * @returns {boolean} - If the password is allowed or not
 */
export function validatePassword (input) {
  const allowedPattern = /^[a-zA-Z0-9 .,?!@#$%^&*()_+-=\[\]{};':"\\|<>\/~`]+$/

  // Return if invalid input
  return allowedPattern.test(input)
}

/**
 * Validate number
 * @param {string} input - The input string to validate 
 * @returns {boolean} - If the input is a number or not
 */
export function validateNumber (input) {
  return validator.isNumeric(input)
}

/**
 * Validate integer
 * @param {string} input - The input string to validate 
 * @returns {boolean} - If the input is an integer or not
 */
export function validateInteger (input) {
  return validator.isInt(input)
}

/**
 * Validate river with species data
 * @param {object} data - The river with species data to validate
 * @returns {boolean} - If the river with species data is valid or not
 */
export function validateRiverWithSpecies (data) {
  return validateJson(data, schemaRiverWithSpecies)
}

/**
 * Validate station with species data
 * @param {object} data - The station with species data to validate
 * @returns {boolean} - If the station with species data is valid or not
 */
export function validateStationWithSpecies (data) {
  return validateJson(data, schemaStationWithSpecies)
}

/**
 * Validate river summary data
 * @param {object} data - The river summary data to validate
 * @returns {boolean} - If the river summary data is valid or not
 */
export function validateRiverSummary (data) {
  return validateJson(data, schemaRiverSummary)
}

/**
 * Validate station summary data
 * @param {object} data - The station summary data to validate
 * @returns {boolean} - If the station summary data is valid or not
 */
export function validateStationSummary (data) {
  return validateJson(data, schemaStationSummary)
}

/**
 * Validate station download data
 * @param {object} data - The river with species data to validate
 * @returns {boolean} - If the station download data is valid or not
 */
export function validateStationDownload (data) {
  return validateJson(data, schemaStationDownload)
}

/**
 * Validate all strings in a json object
 * @param {object} data - The data to validate
 * @returns {boolean} - If all strings are valid or not
 */
function validateStringsInJson (data) {
  if (typeof data === 'string') {
    return validateText(data)
  } else if (typeof data === 'object') {
    // Call validateStringsInJson recursively on each key
    return Object.keys(data).every(key => validateStringsInJson(data[key]))
  } else if (Array.isArray(data)) {
    // Call validateStringsInJson recursively on each element
    return data.every(element => validateStringsInJson(element))
  }
}

/**
 * Validate json data against a schema
 * @param {object} data - The data to validate
 * @param {object} schema - The schema to validate the data against
 */
export function validateJson (data, schema) {
  // Check if data is a json object
  if (!validator.isJSON(data)) {
    return false
  }
  
  // Prepare ajv and schema
  const ajv = new Ajv()
  const validate = ajv.compile(schema)

  // Validate all strings in the json
  if (!validateStringsInJson(data)) {
    return false
  }

  // Validate data against schema
  if (!validate(data)) {
    return false
  }

  return true
}

/**
 * Read a file as an array buffer
 * @param {File} file - The file to read
 * @returns {Promise<ArrayBuffer>} - A promise which resolves to the file content as an array buffer
 */
function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result); // directly pass the result
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

const excelSchemas = {
  'Elvedata': schemaRiverSheet,
  'Stasjonsdata': schemaStationSheet,
  'Individdata': schemaObservationSheet
}

/**
 * Parse and validate excel file content
 * @param {File} file - The file to parse and validate
 * @returns {Promise<boolean>} - A promise which resolves to if the excel file was parsed and validated successfully or not
 */
export async function parseAndValidateExcel (excelFile) {
  try {
    // Check if the file is defined
    if (!excelFile) {
      addFeedbackToStore(
        FEEDBACK_TYPES.ERROR,
        FEEDBACK_CODES.NOT_FOUND,
        FEEDBACK_MESSAGES.NO_FILE_SELCETED
      )
      return false
    }

    // Check if the file is an excel file
    if (!['.xlsx'].includes(excelFile.name.slice(excelFile.name.lastIndexOf('.')))) {
      return false
    }

    // Check if the file size exceeds 10 MB
    if (excelFile.size > 10 * 1024 * 1024) {
      addFeedbackToStore(
        FEEDBACK_TYPES.ERROR,
        FEEDBACK_CODES.CONTENT_TO_LARGE,
        FEEDBACK_MESSAGES.CONTENT_TO_LARGE
      )
      return false
    }

    // Read the file
    const fileContent = await readFile(excelFile)
    const workbook = XLSX.read(fileContent, { type: 'buffer' })

    // River, station and observation sheets
    const sheets = workbook.SheetNames.slice(0, 3)

    // Validate each sheet
    for (const sheetname of sheets) {
      // Retrieve the sheet and convert it to json
      const worksheet = workbook.Sheets[sheetname]
      const jsonSheet = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

      // Validate the json sheet against its schema
      if (!validateJson(jsonSheet, excelSchemas[sheetname])) {
        return false
      }
    }

    // If all sheets are validated, return true
    return true
  } catch (error) {
    console.error('Failed to read or validate workbook', error);
    return false
  }
}
