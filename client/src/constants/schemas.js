const coordinatesSchema = {
  type: 'object',
  properties: {
    type: { type: ['string', 'null'] },
    crs: {
      type: ['object', 'null'],
      properties: {
        type: { type: 'string' },
        properties: {
          type: 'object',
          properties: {
            name: { type: 'string' }
          }
        }
      }
    },
    coordinates: {
      type: 'array',
      items: { type: 'number' }
    }
  },
  required: ['coordinates'],
  additionalProperties: false
}

const observationSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    species: { type: 'string' },
    length: { type: ['integer', 'null'] },
    count: { type: ['integer', 'null'] },
    round: { type: ['integer', 'null'] },
    gender: { type: ['string', 'null'] },
    age: { type: ['integer', 'null'] },
    released: { type: ['boolean', 'null'] },
    sampletype: { type: ['string', 'null'] },
    comment: { type: 'string' }
  },
  required: ['id', 'species'],
  additionalProperties: false
}

const schemaSingleRiverWithSpecies = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    pos: coordinatesSchema,
    start_date: { type: 'string' },
    end_date: { type: 'string' },
    species: { type: 'array', items: { type: 'string' } },
    project_id: { type: ['string', 'null'] }
  },
  required: ['id', 'name', 'pos', 'start_date', 'end_date', 'species'],
  additionalProperties: false
}

const schemaSingleStationWithSpecies = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    start_pos: coordinatesSchema,
    end_pos: coordinatesSchema,
    date: { type: 'string' },
    time: { type: 'string' },
    species: { type: 'array', items: { type: 'string' } },
    project_id: { type: ['string', 'null'] }
  },
  required: ['id', 'name', 'start_pos', 'end_pos', 'date', 'time', 'species'],
  additionalProperties: false
}

const schemaSingleRiverSummary = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    start_date: { type: 'string' },
    end_date: { type: 'string' },
    project_id: { type: ['string', 'null'] },
    waterflow: { type: ['integer', 'null'] },
    boattype: { type: 'string' },
    skipper: { type: 'string' },
    crew: { type: ['array', 'null'], items: { type: 'string' } },
    comment: { type: ['string', 'null'] },
    stations: { type: 'array', items: { type: 'integer' } }
  },
  required: ['id', 'name', 'start_date', 'end_date', 'boattype', 'skipper', 'stations'],
  additionalProperties: false
}

const schemaSingleStationSummary = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    date: { type: 'string' },
    time: { type: 'string' },
    river_id: { type: 'integer' },
    project_id: { type: ['string', 'null'] },
    description: { type: ['string', 'null'] },
    comment: { type: ['string', 'null'] },
    river_type: { type: ['string', 'null'] },
    weather: { type: ['string', 'null'] },
    water_temp: { type: ['number', 'null'] },
    air_temp: { type: ['integer', 'null'] },
    sec_fished: { type: 'integer' },
    voltage: { type: 'integer' },
    pulse: { type: 'integer' },
    conductivity: { type: ['integer', 'null'] },
    observations: { type: 'array', items: observationSchema },
  },
  required: ['id', 'name', 'date', 'time', 'river_id', 'sec_fished'],
  additionalProperties: false
}

const schemaSingleStationDownload = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    transect_length: { type: ['string', 'null'] },
    display: { type: ['string', 'null'] },
    gpx_file: { type: ['string', 'null']},
    observations: { type: 'array', items: observationSchema }
  },
  required: ['id'],
  additionalProperties: false
}

export const schemaRiverWithSpecies = {
  type: 'array',
  items: schemaSingleRiverWithSpecies
}

export const schemaStationWithSpecies = {
  type: 'array',
  items: schemaSingleStationWithSpecies
}

export const schemaRiverSummary = {
  type: 'array',
  items: schemaSingleRiverSummary
}

export const schemaStationSummary = {
  type: 'array',
  items: schemaSingleStationSummary
}

export const schemaStationDownload = {
  type: 'array',
  items: schemaSingleStationDownload
}

const schemaRiverSheet = {
  type: 'object',
  properties: {
    'Start dato': { type: 'string', format: 'date' },
    'Slutt dato': { type: 'string', format: 'date' },
    'Elv': { type: 'string' },
    'Båttype': { type: 'string' },
    'Lat': { type: 'number' },
    'Long': { type: 'number' },
    'Vannføring (sildre.no)': { type: 'integer' },
    'Skipper': { type: 'string' },
    'Mannskap1': { type: 'string' },
    'Mannskap2': { type: 'string' },
    'Mannskap3': { type: 'string' },
    'Prosjekt': { type: 'string' },
    'Prosjektnummer': { type: 'string' },
    'Kommentar': { type: 'string' },
  },
  required: ['Start dato', 'Slutt dato', 'Elv', 'Båttype', 'Lat', 'Long', 'Skipper']
}

const schemaStationSheet = {
  type: 'object',
  properties: {
    'Stasjon': { type: 'integer' },
    'Båttype': { type: 'string' },
    'Dato': { type: 'string', format: 'date' },
    'Klokkeslett start': { type: 'string' },
    'Lat start': { type: 'number' },
    'Long start': { type: 'number' },
    'Lat stopp': { type: 'number' },
    'Long stopp': { type: 'number' },
    'Dominerende elvetype': { type: 'string' },
    'Vær': { type: 'string' },
    'Vanntemp (Celsius)': { type: 'number' },
    'Lufttemperatur (Celsius)': { type: 'number' },
    'Ledningsevne (µs/cm)': { type: 'number' },
    'Transektlengde (m)': { type: 'number' },
    'Sekunder fisket (s)': { type: 'number' },
    'Volt': { type: 'number' },
    'Puls (DC)': { type: 'number' },
    'Display': { type: 'number' },
    'Gpx file?': { type: 'string' },
    'Stasjonsbeskrivelse': { type: 'string' },
    'Kommentarer til fiske (observasjoner osv)': { type: 'string' },
  },
  required: ['Stasjon', 'Båttype', 'Dato', 'Klokkeslett start', 'Lat start', 'Long start', 'Lat stopp', 'Long stopp', 'Sekunder fisket (s)', 'Volt', 'Puls (DC)']
}

const schemaFishSheet = {
  type: 'object',
  properties: {
    'ID': { type: 'number' },
    'Stasjon': { type: 'number' },
    'Omgang': { type: 'number' },
    'Art': { type: 'string' },
    'Lengde': { type: 'number' },
    'Antall': { type: 'number' },
    'Kjønn': { type: 'string' },
    'Alder': { type: 'number' },
    'Gjenutsatt (ja/nei)': { type: 'string' },
    'Prøvetatt (ja/nei)': { type: 'string' },
    'Kommentar': { type: 'string' },
  },
  required: ['ID', 'Stasjon', 'Art']
}