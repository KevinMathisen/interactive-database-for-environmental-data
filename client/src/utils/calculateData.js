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

