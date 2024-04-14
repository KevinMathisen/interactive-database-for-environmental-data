export const schemaRiverWithSpecies = {
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

export const schemaStationWithSpecies = {
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

export const schemaRiverSummary = {
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

export const schemaStationSummary = {
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

export const schemaStationDownload = {
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