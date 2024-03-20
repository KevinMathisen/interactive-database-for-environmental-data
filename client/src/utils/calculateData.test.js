import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  amountOfFishInStation,
  amountOfFishInStations,
  secondsAndMinutesSpentFishingInStations,
  fishPerMinuteInStation,
  fishPerMinuteInStations,
  dataForAllSpeciesInStation,
  dataForAllSpeciesInStations,
  allUniqueSpeciesInObjects
} from './calculateData.js'
import { River } from '../models/River.js'
import { Station } from '../models/Station.js'

describe('test amountOfFishInStation function', () => {
  it('should return 0 when no observations are present', () => {
    const station = new Station({
      observations: []
    })
    expect(amountOfFishInStation(station)).toBe(0)
  })

  it('should return the sum of the counts of the observations', () => {
    const station = new Station()
    station.observations = [
      { count: 1 },
      { count: 2 },
      { count: 3 }
    ]
    expect(amountOfFishInStation(station)).toBe(6)
  })
})

describe('test amountOfFishInStations function', () => {
  it('should return 0 when no stations are present', () => {
    const stations = new Map()
    expect(amountOfFishInStations(stations)).toBe(0)
  })

  it('should return the sum of the amount of fish in all stations', () => {
    const stations = new Map()
    stations.set(1, new Station({ observations: [{ count: 1 }, { count: 2 }] }))
    stations.set(2, new Station({ observations: [{ count: 3 }, { count: 4 }] }))
    expect(amountOfFishInStations(stations)).toBe(10)
  })
})






