// Diable eslint camelcase rule because of the PostgreSQL naming convention
/* eslint-disable camelcase */

/*
 * River model
 */
export class River {
  constructor ({
    id = null,
    name = null,
    start_date = null,
    end_date = null,
    project_id = null,
    waterflow = null,
    boat_type = null,
    crew1 = null,
    crew2 = null,
    crew3 = null,
    pos = null,
    comment = null,
    species = null,
    stations = null
  } = {}) {
    this.id = id;
    this.name = name;
    this.startDate = start_date;
    this.endDate = end_date;
    this.projectId = project_id;
    this.waterflow = waterflow;
    this.boatType = boat_type;
    this.crew = [crew1, crew2, crew3];
    this.position = pos;
    this.comment = comment;
    this.species = species;
    this.stations = stations;
  }
}

/* eslint-enable camelcase */
