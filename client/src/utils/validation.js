import Ajv from 'ajv'
import ExcelJS from 'exceljs'
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
  const allowedPattern = /^[a-zA-Z0-9 .,?!-\/]+$/

  // Check if text is valid
  const isTextValid = allowedPattern.test(input)

  if (!isTextValid) {
    addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.FORBIDDEN, FEEDBACK_MESSAGES.INVALID_TEXT)
  }

  // Return if invalid input
  return isTextValid
}

/**
 * Validate password using validator
 * @param {string} input - The input string to validate
 * @returns {boolean} - If the password is allowed or not
 */
export function validatePassword (input) {
  const allowedPattern = /^[a-zA-Z0-9 .,?!@#$%^&*()_+-=\[\]{};':"\\|<>\/~`]+$/

  // Check if password is valid
  const isPasswordValid = allowedPattern.test(input)

  if (!isPasswordValid) {
    addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.FORBIDDEN, FEEDBACK_MESSAGES.INVALID_PASSWORD)
  }

  // Return if invalid input
  return isPasswordValid
}

/**
 * Validate number
 * @param {string} input - The input string to validate 
 * @returns {boolean} - If the input is a number or not
 */
export function validateNumber (input) {
  const isNumberValid = validator.isNumeric(input)

  if (!isNumberValid) {
    addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.FORBIDDEN, FEEDBACK_MESSAGES.INVALID_NUMBER)
  }

  return isNumberValid
}

/**
 * Validate integer
 * @param {string} input - The input string to validate 
 * @returns {boolean} - If the input is an integer or not
 */
export function validateInteger (input) {
  const isIntegerValid =  validator.isInt(input)

  if (!isIntegerValid) {
    addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.FORBIDDEN, FEEDBACK_MESSAGES.INVALID_NUMBER)
  }

  return isIntegerValid
}

/**
 * Validate river with species data
 * @param {object} data - The river with species data to validate
 * @returns {boolean} - If the river with species data is valid or not
 */
export function validateRiverWithSpecies (data) {
  return validateJsonFromPostgrest(data, schemaRiverWithSpecies)
}

/**
 * Validate station with species data
 * @param {object} data - The station with species data to validate
 * @returns {boolean} - If the station with species data is valid or not
 */
export function validateStationWithSpecies (data) {
  return validateJsonFromPostgrest(data, schemaStationWithSpecies)
}

/**
 * Validate river summary data
 * @param {object} data - The river summary data to validate
 * @returns {boolean} - If the river summary data is valid or not
 */
export function validateRiverSummary (data) {
  return validateJsonFromPostgrest(data, schemaRiverSummary)
}

/**
 * Validate station summary data
 * @param {object} data - The station summary data to validate
 * @returns {boolean} - If the station summary data is valid or not
 */
export function validateStationSummary (data) {
  return validateJsonFromPostgrest(data, schemaStationSummary)
}

/**
 * Validate station download data
 * @param {object} data - The river with species data to validate
 * @returns {boolean} - If the station download data is valid or not
 */
export function validateStationDownload (data) {
  return validateJsonFromPostgrest(data, schemaStationDownload)
}

function validateJsonFromPostgrest (data, schema) {
  const isJsonValid = validateJson(data, schema)

  if (!isJsonValid) {
    addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.POSTGREST_UNAVAILABLE, FEEDBACK_MESSAGES.POSTGREST_UNAVAILABLE)
  }

  return isJsonValid
}

/**
 * Validate all strings in a json object
 * @param {object} data - The data to validate
 * @returns {boolean} - If all strings are valid or not
 */
function validateStringsInJson (data) {
  if (typeof data === 'string') {
    // If data is a string, validate it
    return validateText(data)
  } else if (typeof data === 'object') {
    // If object, call validateStringsInJson for each property
    return Object.keys(data).every(key => validateStringsInJson(data[key]))
  } else if (Array.isArray(data)) {
    // If array, call validateStringsInJson for each element
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

/**
 * Convert an excel worksheet to json
 * @param {ExcelJS.Worksheet} worksheet - The worksheet to convert to json
 * @returns {object[]} - Worksheet as json
 */
function worksheetToJson(worksheet) {
  // Get the header and data rows
  const rows = worksheet.getSheetValues()
  const header = rows[0]
  const data = rows.slice(1)

  // Convert each row to json
  const jsonSheet = data.map(row => {
    const jsonRow = {}
    // Go trough each column in the row
    header.forEach((key, index) => {
      // If the cell is not empty, add it to the json row
      if (row[index] !== undefined) {
        jsonRow[key] = row[index]
      }
    })
    return jsonRow
  })

  // Return the json sheet
  return jsonSheet
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
      addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.FORBIDDEN, FEEDBACK_MESSAGES.NO_FILE_SELCETED)
      return false
    }

    // Check if the file is an excel file
    if (!['.xlsx'].includes(excelFile.name.slice(excelFile.name.lastIndexOf('.')))) {
      addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.FORBIDDEN, FEEDBACK_MESSAGES.UNSUPPORTED_CONTENT_TYPE)
      return false
    }

    // Check if the file size exceeds 10 MB
    if (excelFile.size > 10 * 1024 * 1024) {
      addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.FORBIDDEN, FEEDBACK_MESSAGES.CONTENT_TO_LARGE)
      return false
    }

    // Read the file
    const fileContent = await readFile(excelFile)
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.load(fileContent)

    // River, station and observation sheets
    const sheets = workbook.worksheets.slice(0, 3)

    // Validate each sheet
    for (const worksheet of sheets) {
      // Convert the sheet to json
      const jsonSheet = worksheetToJson(worksheet)

      // Validate the json sheet against its schema
      if (!validateJson(jsonSheet, excelSchemas[sheetname])) {
        addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.FORBIDDEN, FEEDBACK_MESSAGES.INVALID_EXCEL_FORMAT)
        return false
      }
    }

    // If all sheets are validated, return true
    return true
  } catch (error) {
    addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.FORBIDDEN, FEEDBACK_MESSAGES.GENERIC)
    return false
  }
}
