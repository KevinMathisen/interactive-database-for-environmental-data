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

describe('test secondsAndMinutesSpentFishingInStations function', () => {
  it('should return 0 minutes and 0 seconds when no stations are present', () => {
    const stations = new Map()
    expect(secondsAndMinutesSpentFishingInStations(stations)).toEqual({ seconds: 0, minutes: 0 })
  })

  it('should return the correct amount of minutes', () => {
    const stations = new Map()
    stations.set(1, new Station({ secFished: 120 }))
    stations.set(2, new Station({ secFished: 180 }))
    expect(secondsAndMinutesSpentFishingInStations(stations)).toEqual({ seconds: 0, minutes: 5 })
  })

  it('should return the correct amount of seconds', () => {
    const stations = new Map()
    stations.set(1, new Station({ secFished: 120 }))
    stations.set(2, new Station({ secFished: 121 }))
    expect(secondsAndMinutesSpentFishingInStations(stations)).toEqual({ seconds: 1, minutes: 4 })
  })
})

describe('test fishPerMinuteInStation function', () => {
  it('should return 0 when no fish are observed', () => {
    const station = new Station({ observations: [], secFished: 60 })
    expect(fishPerMinuteInStation(station)).toBe('0.00')
  })

  it('should return the correct amount of fish per minute', () => {
    const station = new Station({ observations: [{ count: 60 }], secFished: 60 })
    expect(fishPerMinuteInStation(station)).toBe('60.00')
  })
})

describe('test fishPerMinuteInStations function', () => {
  it('should return 0 when no fish are observed', () => {
    const stations = new Map()
    stations.set(1, new Station({ observations: [], secFished: 60 }))
    expect(fishPerMinuteInStations(stations)).toBe('0.00')
  })

  it('should return the correct amount of fish per minute when 1 station', () => {
    const stations = new Map()
    stations.set(1, new Station({ observations: [{ count: 60 }], secFished: 60 }))
    expect(fishPerMinuteInStations(stations)).toBe('60.00')
  })

  it('should return the correct amount of fish per minute when multiple stations', () => {
    const stations = new Map()
    stations.set(1, new Station({ observations: [{ count: 60 }], secFished: 60 }))
    stations.set(2, new Station({ observations: [{ count: 60 }], secFished: 120 }))
    expect(fishPerMinuteInStations(stations)).toBe('40.00')
  })
})

