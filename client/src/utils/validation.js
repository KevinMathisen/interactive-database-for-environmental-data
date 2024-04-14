import Ajv from 'ajv'
import XLSX from 'xlsx'
import validator from 'validator'

const schemaRiverWithSpecies = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    pos: { type: 'string' },
    start_date: { type: 'string' },
    end_date: { type: 'string' },
    species: { type: 'array', items: { type: 'string' } }
  },
  required: ['id', 'name', 'pos', 'start_date', 'end_date', 'species']
}

const schemaStationWithSpecies = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    start_pos: { type: 'string' },
    end_pos: { type: 'string' },
    date: { type: 'string' },
    species: { type: 'array', items: { type: 'string' } }
  },
  required: ['id', 'name', 'start_pos', 'end_pos', 'date', 'species']
}

const schemaRiverSummary = {
  type: 'object',
  properties: {
    ID: { type: 'string' },
    name: { type: 'string' },
    start_date: { type: 'string' },
    end_date: { type: 'string' },
    project_id: { type: 'string' },
    waterflow: { type: 'string' },
    boattype: { type: 'string' },
    skipper: { type: 'string' },
    crew: { type: 'string' },
    comment: { type: 'string' },
    stations: { type: 'array', items: { type: 'string' } }
  },
  required: ['ID', 'name', 'start_date', 'end_date', 'project_id', 'waterflow', 'boattype', 'skipper', 'crew', 'comment', 'stations']
}

const schemaStationSummary = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    date: { type: 'string' },
    time: { type: 'string' },
    river_id: { type: 'string' },
    description: { type: 'string' },
    rivertype: { type: 'string' },
    weather: { type: 'string' },
    water_temp: { type: 'string' },
    air_temp: { type: 'string' },
    sec_fished: { type: 'string' },
    voltage: { type: 'string' },
    pulse: { type: 'string' },
    conductivity: { type: 'string' },
    observations: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          species: { type: 'string' },
          size: { type: 'string' },
          amount: { type: 'string' }
        },
        required: ['species', 'size', 'amount']
      }
    }
  },
  required: ['id', 'name', 'date', 'time', 'river_id', 'description', 'rivertype', 'weather', 'water_temp', 'air_temp', 'sec_fished', 'voltage', 'pulse', 'conductivity', 'observations']
}

const schemaStationDownload = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    transect_length: { type: 'string' },
    display: { type: 'string' },
    gpx_file: { type: 'string' },
    observations: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          station: { type: 'string' },
          round: { type: 'string' },
          species: { type: 'string' },
          length: { type: 'string' },
          count: { type: 'string' },
          gender: { type: 'string' },
          age: { type: 'string' },
          released: { type: 'string' },
          sampletype: { type: 'string' },
          comment: { type: 'string' }
        },
        required: ['id', 'station', 'round', 'species', 'length', 'count', 'gender', 'age', 'released', 'sampletype', 'comment']
      }
    }
  },
  required: ['id', 'transect_length', 'display', 'gpx_file', 'observations']
}

/**
 * Sanitizes input using regex to allow specific characters
 * @param {string} input - The input string to sanitize
 * @returns {string} - The sanitized input string
 */
function sanitizeInput (input) {
  const allowedPattern = /^[a-zA-Z0-9 .,?!]+$/

  // Handles invalid input
  if (!allowedPattern.test(input)) {
    return ''
  }

  // Sanitize input
  return validator.escape(input)
}

/**
 * Validate river with species data
 * @param {object} data - The river with species data to validate
 */
export function validateRiverWithSpecies (data) {
  validateJson(data, schemaRiverWithSpecies)
}

/**
 * Validate station with species data
 * @param {object} data - The station with species data to validate
 */
export function validateStationWithSpecies (data) {
  validateJson(data, schemaStationWithSpecies)
}

/**
 * Validate river summary data
 * @param {object} data - The river summary data to validate
 */
export function validateRiverSummary (data) {
  validateJson(data, schemaRiverSummary)
}

/**
 * Validate station summary data
 * @param {object} data - The station summary data to validate
 */
export function validateStationSummary (data) {
  validateJson(data, schemaStationSummary)
}

/**
 * Validate station download data
 * @param {object} data - The river with species data to validate
 */
export function validateStationDownload (data) {
  validateJson(data, schemaStationDownload)
}

/**
 * Validate json data against a schema
 * @param {object} data - The data to validate
 * @param {object} schema - The schema to validate the data against
 */
export function validateJson (data, schema) {
  const ajv = new Ajv()
  const validate = ajv.compile(schema)

  // Sanitize strings in data before it validates
  Object.keys(data).forEach(key => {
    if (typeof data[key] === 'string') {
      data[key] = sanitizeInput(data[key])
    }
  })
  const valid = validate(data)

  // Throws an error if the data is invalid
  if (!valid) {
    throw new Error(validate.errors.map(error => error.message).join('\n'))
  }
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
  'Elvedata': schemaRiverWithSpecies,
  'Stasjonsdata': schemaStationWithSpecies,
  'Individdata': schemaObservation
}

/**
 * Parse and validate workbook data
 * @param {File} file - The file to parse and validate
 * @returns {Promise<boolean>} - A promise which resolves to if the workbook was parsed and validated successfully or not
 */
export async function parseAndValidateWorkbook (excelFile) {
  try {
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
