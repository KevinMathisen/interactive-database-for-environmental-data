import { describe, it, expect } from 'vitest'
import {
  filterRiversBySearch,
  filterStationsBySearch,
  filterRiversByDateAndSpecies,
  filterStationsByDateAndSpecies,
  filterObservationsBySpecies,
  getSelectableSpecies,
  filterRiversByNameAndDateCombined,
  filterStationsByNameAndDateCombined,
  filtersStationsByRiver
} from './filterData'
import { River } from '../models/River.js'
import { Station, Observation } from '../models/Station.js'

describe('test filterRiversByDateAndSpecies function', () => {
  it('should return an empty map if the input is an empty map', () => {
    expect(filterRiversByDateAndSpecies(new Map(), ['species1'], '2024-01-02', '2024-02-01')).toEqual(new Map())
  })

  it('should return the whole map if the species is the same and the date is inside time range', () => {
    const inputRivers = new Map([[0, new River({ name: 'name', species: ['species1'], startDate: '2024-01-01', endDate: '2024-01-03' })]])
    const expectedRivers = new Map([[0, new River({ name: 'name', species: ['species1'], startDate: '2024-01-01', endDate: '2024-01-03' })]])
    expect(filterRiversByDateAndSpecies(inputRivers, ['species1'], '2024-01-02', '2024-02-01')).toEqual(expectedRivers)
  })

  it('should return the whole map if the species is empty and the date is inside time range', () => {
    const inputRivers = new Map([[0, new River({ name: 'name', species: ['species1'], startDate: '2024-01-01', endDate: '2024-01-03' })]])
    const expectedRivers = new Map([[0, new River({ name: 'name', species: ['species1'], startDate: '2024-01-01', endDate: '2024-01-03' })]])
    expect(filterRiversByDateAndSpecies(inputRivers, [], '2024-01-02', '2024-02-01')).toEqual(expectedRivers)
  })

  it('should return an empty map if the species is not the same', () => {
    const inputRivers = new Map([[0, new River({ name: 'name', species: ['species1'], startDate: '2024-01-01', endDate: '2024-01-03' })]])
    expect(filterRiversByDateAndSpecies(inputRivers, ['species2'], '2024-01-02', '2024-02-01')).toEqual(new Map())
  })

  it('should return an empty map if the date is not inside time range', () => {
    const inputRivers = new Map([[0, new River({ name: 'name', species: ['species1'], startDate: '2024-01-01', endDate: '2024-01-03' })]])
    expect(filterRiversByDateAndSpecies(inputRivers, ['species1'], '2024-01-04', '2024-02-01')).toEqual(new Map())
  })
})

describe('test filterStationsByDateAndSpecies function', () => {
  it('should return an empty map if the input is an empty map', () => {
    expect(filterStationsByDateAndSpecies(new Map(), ['species1'], '2024-01-01', '2024-02-01')).toEqual(new Map())
  })

  it('should return the whole map if the species is the same and the date is inside time range', () => {
    const inputStations = new Map([[0, new Station({ name: 'name', species: ['species1'], date: '2024-01-01' })]])
    const expectedStations = new Map([[0, new Station({ name: 'name', species: ['species1'], date: '2024-01-01' })]])
    expect(filterStationsByDateAndSpecies(inputStations, ['species1'], '2024-01-01', '2024-02-01')).toEqual(expectedStations)
  })

  it('should return the whole map if the species is empty and the date is inside time range', () => {
    const inputStations = new Map([[0, new Station({ name: 'name', species: ['species1'], date: '2024-01-01' })]])
    const expectedStations = new Map([[0, new Station({ name: 'name', species: ['species1'], date: '2024-01-01' })]])
    expect(filterStationsByDateAndSpecies(inputStations, [], '2024-01-01', '2024-02-01')).toEqual(expectedStations)
  })

  it('should return an empty map if the species is not the same', () => {
    const inputStations = new Map([[0, new Station({ name: 'name', species: ['species1'], date: '2024-01-01' })]])
    expect(filterStationsByDateAndSpecies(inputStations, ['species2'], '2024-01-01', '2024-02-01')).toEqual(new Map())
  })

  it('should return an empty map if the date is not inside time range', () => {
    const inputStations = new Map([[0, new Station({ name: 'name', species: ['species1'], date: '2024-01-01' })]])
    expect(filterStationsByDateAndSpecies(inputStations, ['species1'], '2024-01-02', '2024-02-01')).toEqual(new Map())
  })
})

describe('test filterObservationsBySpecies function', () => {
  it('should return an empty array if the input is an empty array', () => {
    expect(filterObservationsBySpecies([], ['species'])).toEqual([])
  })

  it('should return the whole array if the species is the same', () => {
    const observations = [new Observation({ species: 'species1' })]
    expect(filterObservationsBySpecies(observations, ['species1'])).toEqual(observations)
  })

  it('should return the whole array if the species is empty', () => {
    const observations = [new Observation({ species: 'species1' })]
    expect(filterObservationsBySpecies(observations, [])).toEqual(observations)
  })

  it('should return an empty array if the species is not the same', () => {
    const observations = [new Observation({ species: 'species1' })]
    expect(filterObservationsBySpecies(observations, ['species2'])).toEqual([])
  })
})

describe('test getSelectableSpecies function', () => {
  it('should return an empty array if the input map is empty', () => {
    expect(getSelectableSpecies(new Map())).toEqual([])
  })

  it('should return a unique list of species from a single river', () => {
    const rivers = new Map([
      [0, new River({ name: 'name', species: ['Torsk', 'Ørret'] })]
    ])
    expect(getSelectableSpecies(rivers)).toEqual(['torsk', 'ørret'])
  })

  it('should return a unique list of species from multiple rivers', () => {
    const rivers = new Map([
      [0, new River({ name: 'name', species: ['Torsk', 'Ørret'] })],
      [1, new River({ name: 'name2', species: ['Torsk', 'Laks'] })]
    ])
    expect(getSelectableSpecies(rivers)).toEqual(expect.arrayContaining(['torsk', 'ørret', 'laks']))
  })

  it('should ignore duplicate species across rivers', () => {
    const rivers = new Map([
      [0, new River({ name: 'name', species: ['Torsk', 'Ørret'] })],
      [1, new River({ name: 'name2', species: ['Torsk', 'Ørret'] })],
      [2, new River({ name: 'name3', species: ['Laks'] })]
    ])
    expect(getSelectableSpecies(rivers)).toEqual(expect.arrayContaining(['torsk', 'ørret', 'laks']))
  })

  it('should return an empty array if no rivers have species', () => {
    const rivers = new Map([
      [0, new River({ name: 'name', species: [] })],
      [1, new River({ name: 'name2', species: [] })]
    ])
    expect(getSelectableSpecies(rivers)).toEqual([])
  })
})

describe('test filterRiversByNameAndDateCombined function', () => {
  it('should return an empty map if the input map is empty', () => {
    expect(filterRiversByNameAndDateCombined(new Map(), 'searchQuery')).toEqual(new Map())
  })

  it('should return a filtered map of rivers matching the name and date combined search query', () => {
    const rivers = new Map([
      [0, new River({ name: 'Name1', startDate: '2024-01-01' })],
      [1, new River({ name: 'Name2', startDate: '2024-01-15' })],
      [2, new River({ name: 'Name1', startDate: '2024-02-01' })]
    ])
    expect(filterRiversByNameAndDateCombined(rivers, 'name1 2024-02')).toEqual(new Map([
      [2, new River({ name: 'Name1', startDate: '2024-02-01' })]
    ]))
  })

  it('should return an empty map if no rivers match the search query', () => {
    const rivers = new Map([
      [0, new River({ name: 'Name1', startDate: '2024-01-01' })],
      [1, new River({ name: 'Name2', startDate: '2024-01-15' })]
    ])
    expect(filterRiversByNameAndDateCombined(rivers, 'name3')).toEqual(new Map())
  })
})

describe('test filterStationsByNameAndDateCombined function', () => {
  it('should return an empty map if the input map is empty', () => {
    expect(filterStationsByNameAndDateCombined(new Map(), 'searchQuery')).toEqual(new Map())
  })

  it('should return a filtered map of stations matching the name and date combined search query', () => {
    const stations = new Map([
      [0, new Station({ name: 'Name1', date: '2024-01-01' })],
      [1, new Station({ name: 'Name2', date: '2024-01-15' })],
      [2, new Station({ name: 'Name1', date: '2024-02-01' })]
    ])
    expect(filterStationsByNameAndDateCombined(stations, 'name1 2024-02')).toEqual(new Map([
      [2, new Station({ name: 'Name1', date: '2024-02-01' })]
    ]))
  })

  it('should return an empty map if no stations match the search query', () => {
    const stations = new Map([
      [0, new Station({ name: 'Name1', date: '2024-01-01' })],
      [1, new Station({ name: 'Name2', date: '2024-01-15' })]
    ])
    expect(filterStationsByNameAndDateCombined(stations, 'ame3')).toEqual(new Map())
  })
})

describe('test filtersStationsByRiver function', () => {
  it('should return an empty map if the river and stations are empty', () => {
    expect(filtersStationsByRiver(new River(), new Map())).toEqual(new Map())
  })

  it('should return an empty map if the river has no stations', () => {
    const river = new River()
    const stations = new Map([[0, new Station({ id: 0 })]])
    expect(filtersStationsByRiver(river, stations)).toEqual(new Map())
  })

  it('should return a map with the correct stations if the river has all stations', () => {
    const river = new River({ id: 0, stations: [0, 1] })
    const stations = new Map([
      [0, new Station({ id: 0 })],
      [1, new Station({ id: 1 })]
    ])
    expect(filtersStationsByRiver(river, stations)).toEqual(stations)
  })

  it('should return a map with the correct stations if the river has some stations', () => {
    const river = new River({ id: 0, stations: [0, 1] })
    const stations = new Map([
      [0, new Station({ id: 0 })],
      [1, new Station({ id: 1 })],
      [2, new Station({ id: 2 })]
    ])
    expect(filtersStationsByRiver(river, stations)).toEqual(new Map([
      [0, new Station({ id: 0 })],
      [1, new Station({ id: 1 })]
    ]))
  })
})
