/*
 * River model
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
    this.species = species
    this.stations = stations
  }

  // Diable eslint camelcase rule because of the PostgreSQL naming convention
  /* eslint-disable camelcase */
  static fromJson(object) {
    return new River({
      id: object.id,
      name: object.name,
      startDate: object.start_date,
      endDate: object.end_date,
      projectId: object.project_id,
      waterflow: object.waterflow,
      boatType: object.boat_type,
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


