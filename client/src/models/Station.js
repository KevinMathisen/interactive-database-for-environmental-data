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
		observations = null,
		transect_length = null,
		display = null,
		gpx_file = null
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
		this.transectLength = transect_length;
		this.display = display;
		this.gpxFile = gpx_file;
	}
}

/*
 * Observation model
 */
class Observation {
	constructor({
		id = null,
		station = null,
		round = null,
		species = null,
		length = null,
		count = null,
		gender = null,
		age = null,
		released = null,
		sample_type = null,
		comment = null
	} = {}) {
		this.id = id;
		this.station = station;
		this.round = round;
		this.species = species;
		this.length = length;
		this.count = count;
		this.gender = gender;
		this.age = age;
		this.released = released;
		this.sampleType = sample_type;
		this.comment = comment;
	}
}
