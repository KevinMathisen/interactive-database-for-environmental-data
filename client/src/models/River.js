/**
 * Represents a river
 * @class
 * @property {number} id - Unique id of river
 * @property {string} name - Name of river
 * @property {string} startDate - Start date
 * @property {string} endDate - End date
 * @property {string} projectId - Project id
 * @property {number} waterflow - Waterflow
 * @property {string} boatType - Type of boat
 * @property {string} skipper - Skipper/boat driver
 * @property {string[]} crew - Crew members
 * @property {{coordinates: [number, number]}} position - Position of river observation
 * @property {string} comment - Comment
 * @property {string[]} species  - Unique species in river
 * @property {number[]} stations - Id of stations under river
 */
export class River {
  constructor ({
    id = null,
    name = null,
    startDate = null,
    endDate = null,
    projectId = null,
    waterflow = null,
    boatType = null,
    skipper = null,
    crew = null,
    position = null,
    comment = null,
    species = null,
    stations = null
  } = {}) {
    this.id = id
    this.name = name
    this.startDate = startDate
    this.endDate = endDate
    this.projectId = projectId
    this.waterflow = waterflow
    this.boatType = boatType
    this.skipper = skipper
    this.crew = crew
    this.position = position
    this.comment = comment
    this.species = species ? species.map(s => s.toLowerCase()) : null // Ensure species is lowercase
    this.stations = stations
  }

  // Diable eslint camelcase rule because of the PostgreSQL naming convention
  /* eslint-disable camelcase */
  static fromJson (object) {
    return new River({
      id: object.id,
      name: object.name,
      startDate: object.start_date,
      endDate: object.end_date,
      projectId: object.project_id,
      waterflow: object.waterflow,
      boatType: object.boattype,
      skipper: object.skipper,
      crew: object.crew,
      position: object.pos,
      comment: object.comment,
      species: object.species,
      stations: object.stations
    })
  }
  /* eslint-enable camelcase */
}
