/**
 * Calculates the amount of fish observed in a station
 * 
 * @param {Station} station 
 * @returns {number} - The amount of fish the station observed 
 */
export function amountOfFishInStation (station) {
  return station.observations.reduce((amountOfFish, observation) => amountOfFish + observation.count, 0)
}

/**
 * Calculates the amount of fish observed in multiple stations
 * 
 * @param {Map<number, Station>} stations 
 * @returns {number} - The amount of fish observed in all stations
 */
export function amountOfFishInStations (stations) {
  return Array.from(stations.values()).reduce((amountOfFish, station) => amountOfFish + amountOfFishInStation(station), 0)
}

/**
 * Calculates the time spent fishing in multiple stations
 * 
 * @param {Map<number, Station>} station 
 * @returns {number} - The time spent fishing in all the stations
 */
function secondsSpentFishingInStations (stations) {
  return Array.from(stations.values()).reduce((secSpentFishing, station) => secSpentFishing + station.secFished, 0)
}

/**
 * Calculates the minutes and seconds which together represent the time spent fishing 
 * 
 * @param {Map<number, Station>} stations - The stations to calculate the time spent fishing in
 * @returns {number} - The minutes and seconds spent fishing in all the stations
 */
export function secondsAndMinutesSpentFishingInStations (stations) {
  const secSpentFishing = secondsSpentFishingInStations(stations)
  return {
    seconds: secSpentFishing % 60,
    minutes: Math.floor(secSpentFishing / 60)
  }
}

/**
 * Calculates the amount of fish observed per minute in a station
 * 
 * @param {Station} station - The station to calculate based on
 * @returns {number} - The amount of fish observed per minute
 */
export function fishPerMinuteInStation (station) {
  return ( amountOfFishInStation(station) / (station.secFished / 60) ).toFixed(2)
}

/**
 * Calculates the amount of fish observed per minute in multiple stations
 * 
 * @param {Map<number, Station>} stations - The stations to calculate based on
 * @returns {number} - The amount of fish observed per minute
 */
export function fishPerMinuteInStations (stations) {
  const secSpentFishing = secondsSpentFishingInStations(stations)
  return (amountOfFishInStations(stations) / (secSpentFishing / 60)).toFixed(2)
}

/**
 * Calculates the average length of the fish observed in a station
 * 
 * @param {Observation[]} observations - The observations to calculate the average length of
 * @returns {number} - The average length of the fish observed
 */
function averageLengthObservation(observations) {
  return observations.reduce((totalLength, observation) => totalLength + observation.length, 0) / observations.length
}

/**
 * Calculates the median length of the fish observed in a station
 * 
 * @param {Observation[]} observations - The observations to calculate the median length of
 * @returns {number} - The median length of the fish observed
 */
function medianLengthObservation(observations) {
  // Sort the observations by length
  const sortedObservations = observations.sort((a, b) => a.length - b.length)
  
  // Find the middle index
  const middleIndex = Math.floor(sortedObservations.length / 2)

  // Return the median length, if the amount of observations is even, return the average of the two middle lengths
  return sortedObservations.length % 2 === 0
    ? (sortedObservations[middleIndex - 1].length + sortedObservations[middleIndex].length) / 2
    : sortedObservations[middleIndex].length
}

/**
 * Calculates the minimum length of the fish observed in a station
 * 
 * @param {Observation[]} observations - The observations to calculate the minimum length of
 * @returns {number} - The minimum length of the fish observed
 */
function minimumLengthObservation(observations) {
  return observations.reduce((min, observation) => observation.length < min ? observation.length : min, Infinity)
}

/**
 * Calculates the maximum length of the fish observed in a station
 * 
 * @param {Observation[]} observations - The observations to calculate the maximum length of
 * @returns {number} - The maximum length of the fish observed
 */
function maximumLengthObservation(observations) {
  return observations.reduce((max, observation) => observation.length > max ? observation.length : max, -Infinity)
}

