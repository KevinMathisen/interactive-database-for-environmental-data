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