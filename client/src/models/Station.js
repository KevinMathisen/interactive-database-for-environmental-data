/*
 * Station model
 */
export class Station {
  constructor ({
    id = null,
    name = null,
    date = null,
    startPos = null,
    endPos = null,
    time = null,
    riverId = null,
    description = null,
    comment = null,
    riverType = null,
    weather = null,
    waterTemp = null,
    airTemp = null,
    secFished = null,
    voltage = null,
    pulse = null,
    conductivity = null,
    species = null,
    observations = null,
    transectLength = null,
    display = null,
    gpxFile = null
  } = {}) {
    this.id = id
    this.name = name
    this.date = date
    this.startPos = startPos
    this.endPos = endPos
    this.time = time
    this.riverId = riverId
    this.description = description
    this.comment = comment
    this.riverType = riverType
    this.weather = weather
    this.waterTemp = waterTemp
    this.airTemp = airTemp
    this.secFished = secFished
    this.voltage = voltage
    this.pulse = pulse
    this.conductivity = conductivity
    this.species = species
    this.observations = observations ? observations.map(observation => new Observation(observation)) : null
    this.transectLength = transectLength
    this.display = display
    this.gpxFile = gpxFile
  }

  // Diable eslint camelcase rule because of the PostgreSQL naming convention
  /* eslint-disable camelcase */
  static fromJson (object) {
    return new Station({
      id: object.id,
      name: object.name,
      date: object.date,
      startPos: object.start_pos,
      endPos: object.end_pos,
      time: object.time,
      riverId: object.river_id,
      description: object.description,
      comment: object.comment,
      riverType: object.river_type,
      weather: object.weather,
      waterTemp: object.water_temp,
      airTemp: object.air_temp,
      secFished: object.sec_fished,
      voltage: object.voltage,
      pulse: object.pulse,
      conductivity: object.conductivity,
      species: object.species,
      observations: object.observations,
      transectLength: object.transect_length,
      display: object.display,
      gpxFile: object.gpx_file
    })
  }
  /* eslint-enable camelcase */
}

/*
 * Observation model
 */
export class Observation {
  constructor ({
    id = null,
    station = null,
    round = null,
    species = null,
    length = null,
    count = null,
    gender = null,
    age = null,
    released = null,
    sampletype = null,
    comment = null
  } = {}) {
    this.id = id
    this.station = station
    this.round = round
    this.species = species
    this.length = length
    this.count = count
    this.gender = gender
    this.age = age
    this.released = released
    this.sampletype = sampletype
    this.comment = comment
  }
}


