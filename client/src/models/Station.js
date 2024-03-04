/*
 * Station model
 */
class Station {
	constructor({
		id = null,
		name = null,
		date = null,
		start_pos = null,
		end_pos = null,
		time = null,
		river_id = null,
		description = null,
		comment = null,
		river_type = null,
		weather = null,
		water_temp = null,
		air_temp = null,
		sec_fished = null,
		voltage = null,
		pulse = null,
		conductivity = null,
		species = null,
		observations = null
	} = {}) {
		this.id = id;
		this.name = name;
		this.date = date;
		this.startPos = start_pos;
		this.endPos = end_pos;
		this.time = time;
		this.riverId = river_id;
		this.description = description;
		this.comment = comment;
		this.riverType = river_type;
		this.weather = weather;
		this.waterTemp = water_temp;
		this.airTemp = air_temp;
		this.secFished = sec_fished;
		this.voltage = voltage;
		this.pulse = pulse;
		this.conductivity = conductivity;
		this.species = species;
		this.observations = observations ? observations.map(observation => new Observation(observation)) : null;
	}
}

/*
 * Observation model
 */
class Observation {
	constructor({
		species = null,
		size = null,
		count = null
	} = {}) {
		this.species = species;
		this.size = size;
		this.count = count;
	}
}
