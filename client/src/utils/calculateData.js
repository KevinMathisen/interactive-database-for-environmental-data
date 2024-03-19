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

