import { describe, it, expect } from 'vitest'
import {
  amountOfFishInStation,
  amountOfFishInStations,
  secondsAndMinutesSpentFishingInStations,
  fishPerMinuteInStation,
  fishPerMinuteInStations,
  dataForAllSpeciesInStation,
  dataForAllSpeciesInStations
} from './calculateData.js'
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

describe('test dataForAllSpeciesInStation function', () => {
  it('should return an empty array when no observations are present', () => {
    const station = new Station({ species: [], observations: [] })
    expect(dataForAllSpeciesInStation(station)).toEqual([])
  })

  it('should return the correct data when observations are present', () => {
    const station = new Station({
      species: ['a', 'b'],
      secFished: 60,
      observations: [
        { species: 'a', length: 2, count: 1 },
        { species: 'b', length: 2, count: 1 },
        { species: 'a', length: 1, count: 2 }
      ]
    })

    expect(dataForAllSpeciesInStation(station)).toEqual([
      {
        species: 'a',
        amount: 3,
        amountPerMinute: '3.00',
        averageLength: '1.33',
        medianLength: '1.00',
        minimumLength: 1,
        maximumLength: 2
      },
      {
        species: 'b',
        amount: 1,
        amountPerMinute: '1.00',
        averageLength: '2.00',
        medianLength: '2.00',
        minimumLength: 2,
        maximumLength: 2
      },
      {
        species: 'sum',
        amount: 4,
        amountPerMinute: '4.00',
        averageLength: '1.50',
        medianLength: '1.50',
        minimumLength: 1,
        maximumLength: 2
      }
    ])
  })

  it('should return the correct data when observations with no length are present', () => {
    const station = new Station({
      species: ['a', 'b'],
      secFished: 60,
      observations: [
        { species: 'a', length: 2, count: 1 },
        { species: 'b', length: 2, count: 1 },
        { species: 'a', length: 1, count: 2 },
        { species: 'a', count: 1 },
        { species: 'b', count: 1, length: 0 }
      ]
    })

    expect(dataForAllSpeciesInStation(station)).toEqual([
      {
        species: 'a',
        amount: 4,
        amountPerMinute: '4.00',
        averageLength: '1.33',
        medianLength: '1.00',
        minimumLength: 1,
        maximumLength: 2
      },
      {
        species: 'b',
        amount: 2,
        amountPerMinute: '2.00',
        averageLength: '2.00',
        medianLength: '2.00',
        minimumLength: 2,
        maximumLength: 2
      },
      {
        species: 'sum',
        amount: 6,
        amountPerMinute: '6.00',
        averageLength: '1.50',
        medianLength: '1.50',
        minimumLength: 1,
        maximumLength: 2
      }
    ])
  })
})

describe('test dataForAllSpeciesInStations function', () => {
  it('should return an empty array when no stations are present', () => {
    const stations = new Map()
    expect(dataForAllSpeciesInStations(stations)).toEqual([])
  })

  it('should return the correct data when stations are present', () => {
    const stations = new Map()
    stations.set(1, new Station({
      species: ['a', 'b'],
      secFished: 60,
      observations: [
        { species: 'a', length: 2, count: 1 },
        { species: 'b', length: 2, count: 1 },
        { species: 'a', length: 1, count: 2 }
      ]
    }))
    stations.set(2, new Station({
      species: ['a', 'c'],
      secFished: 60,
      observations: [
        { species: 'a', length: 2, count: 1 },
        { species: 'c', length: 2, count: 1 },
        { species: 'c', length: 1, count: 2 }
      ]
    }))

    expect(dataForAllSpeciesInStations(stations)).toEqual([
      {
        species: 'a',
        amount: 4,
        amountPerMinute: '2.00',
        averageLength: '1.50',
        medianLength: '1.50',
        minimumLength: 1,
        maximumLength: 2
      },
      {
        species: 'b',
        amount: 1,
        amountPerMinute: '0.50',
        averageLength: '2.00',
        medianLength: '2.00',
        minimumLength: 2,
        maximumLength: 2
      },
      {
        species: 'c',
        amount: 3,
        amountPerMinute: '1.50',
        averageLength: '1.33',
        medianLength: '1.00',
        minimumLength: 1,
        maximumLength: 2
      },
      {
        species: 'sum',
        amount: 8,
        amountPerMinute: '4.00',
        averageLength: '1.50',
        medianLength: '1.50',
        minimumLength: 1,
        maximumLength: 2
      }
    ])
  })

  it('should return the correct data when stations with no length are present', () => {
    const stations = new Map()
    stations.set(1, new Station({
      species: ['a', 'b'],
      secFished: 60,
      observations: [
        { species: 'a', length: 2, count: 1 },
        { species: 'b', length: 2, count: 1 },
        { species: 'a', length: 1, count: 2 },
        { species: 'a', count: 1 },
        { species: 'b', count: 1, length: 0 }
      ]
    }))
    stations.set(2, new Station({
      species: ['a', 'c'],
      secFished: 60,
      observations: [
        { species: 'a', length: 2, count: 1 },
        { species: 'c', length: 2, count: 1 },
        { species: 'c', length: 1, count: 2 }
      ]
    }))

    expect(dataForAllSpeciesInStations(stations)).toEqual([
      {
        species: 'a',
        amount: 5,
        amountPerMinute: '2.50',
        averageLength: '1.50',
        medianLength: '1.50',
        minimumLength: 1,
        maximumLength: 2
      },
      {
        species: 'b',
        amount: 2,
        amountPerMinute: '1.00',
        averageLength: '2.00',
        medianLength: '2.00',
        minimumLength: 2,
        maximumLength: 2
      },
      {
        species: 'c',
        amount: 3,
        amountPerMinute: '1.50',
        averageLength: '1.33',
        medianLength: '1.00',
        minimumLength: 1,
        maximumLength: 2
      },
      {
        species: 'sum',
        amount: 10,
        amountPerMinute: '5.00',
        averageLength: '1.50',
        medianLength: '1.50',
        minimumLength: 1,
        maximumLength: 2
      }
    ])
  })
})
