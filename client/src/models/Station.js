/**
 * Represents a station
 * @class
 * @property {number} id - Unique id of station
 * @property {string} name - Name of station
 * @property {string} date - Date of station
 * @property {{coordinates: [number, number]}} startPos - Start position of station observation
 * @property {{coordinates: [number, number]}} endPos - End position of station observation
 * @property {string} time - Time of day
 * @property {number} riverId - Id of river the station is under
 * @property {string} description - Description
 * @property {string} comment - Comment
 * @property {string} riverType - Type of river
 * @property {string} weather - Weather
 * @property {number} waterTemp - Water temperature
 * @property {number} airTemp - Air temperature
 * @property {number} secFished - Seconds fished
 * @property {number} voltage - Voltage of boat
 * @property {number} pulse - Pulse of boat
 * @property {number} conductivity - Conductivity of water
 * @property {string[]} species - Unique species in station
 * @property {Observation[]} observations - Individual observations
 * @property {number} transectLength - Length of transect
 * @property {boolean} display - Display
 * @property {string} gpxFile - Gpx file
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
    this.species = species ? species.map(s => s.toLowerCase()) : null // Ensure species is lowercase
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

/**
 * Represents an observation
 * @class
 * @property {number} id - Unique id of observation
 * @property {number} station - Number of station
 * @property {number} round - Round
 * @property {string} species - Species of fish
 * @property {number} length - Length of fish
 * @property {number} count - Amount of fish
 * @property {string} gender - Gender
 * @property {number} age - Age
 * @property {boolean} released - If the fish was released
 * @property {string} sampletype - Sample type
 * @property {string} comment - Comment
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
    this.species = species.toLowerCase() // Ensure species is lowercase
    this.length = length
    this.count = count || 1 // Ensure count is at least 1
    this.gender = gender
    this.age = age
    this.released = released
    this.sampletype = sampletype
    this.comment = comment
  }
}
