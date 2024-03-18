import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  formatRiversForTable,
  formatStationsForTable,
  formatRiversForExcel,
  formatStationsForExcel,
  formatRiversForCsv,
  formatStationsForCsv
} from './formatData.js'
import { River } from '../models/River.js'
import { Station } from '../models/Station.js'
import { get } from 'svelte/store'
import headersConstants from '../constants/headers.js';

vi.mock('svelte/store', () => ({
  get: vi.fn(),
  writable: vi.fn(() => ({
    subscribe: vi.fn(),
    set: vi.fn(),
    update: vi.fn()
  }))
}))


describe('test formatRiversForTable function', () => {
  it('should return headers and an empty rows array if the input map is empty', () => {
    const formatted = formatRiversForTable(new Map())
    expect(formatted.headers).toEqual(['Navn', 'Dato', 'Projektnummer'])
    expect(formatted.rows).toEqual([])
  })

  it('should correctly convert river objects into arrays for table display', () => {
    const rivers = new Map([
      [0, new River({ id: '1', name: 'Name1', startDate: '2024-01-01', projectId: 'prosjekt1' })],
      [1, new River({ id: '2', name: 'Name2', startDate: '2024-01-15', projectId: 'prosjekt2' })]
    ])
    const formatted = formatRiversForTable(rivers)
    expect(formatted.headers).toEqual(['Navn', 'Dato', 'Projektnummer'])
    expect(formatted.rows).toEqual([
      ['1', 'Name1', '2024-01-01', 'prosjekt1'],
      ['2', 'Name2', '2024-01-15', 'prosjekt2']
    ])
  })
})

describe('test formatStationsForTable function', () => {
  it('should return headers and an empty rows array if the input map is empty', () => {
    const formatted = formatStationsForTable(new Map())
    expect(formatted.headers).toEqual(['Navn', 'Dato', 'Kl.'])
    expect(formatted.rows).toEqual([])
  })

  it('should correctly convert station objects into arrays for table display', () => {
    const stations = new Map([
      [0, new Station({ id: '1', name: 'Navn1', date: '2024-01-01', time: '12:00' })],
      [1, new Station({ id: '2', name: 'Navn2', date: '2024-01-15', time: '13:00' })]
    ])
    const formatted = formatStationsForTable(stations)
    expect(formatted.headers).toEqual(['Navn', 'Dato', 'Kl.'])
    expect(formatted.rows).toEqual([
      ['1', 'Navn1', '2024-01-01', '12:00'],
      ['2', 'Navn2', '2024-01-15', '13:00']
    ])
  })
})

describe('test formatRiversForExcel function', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('should return empty rows and correct headers if the input map is empty', () => {
    const formatted = formatRiversForExcel(new Map())

    expect(formatted.riverHeader).toEqual(headersConstants.RIVER_HEADERS_EXCEL)
    expect(formatted.riverRows).toEqual([])
    expect(formatted.stationHeader).toEqual(headersConstants.STATION_HEADERS_EXCEL)
    expect(formatted.stationRows).toEqual([])
    expect(formatted.observationHeader).toEqual(headersConstants.OBSERVATION_HEADERS_EXCEL)
    expect(formatted.observationRows).toEqual([])
  })

  it('should correctly convert river objects into arrays for Excel display', () => {
    const rivers = new Map([
      [1, new River({ 
        id: 1, name: 'Name1', startDate: '2024-01-01', projectId: 'prosjekt1', 
        position: {coordinates: [9.0, 60.5]}, stations: [1], crew: ['Crew1', '', '']})],
      [2, new River({ 
        id: 2, name: 'Name2', startDate: '2024-01-15', projectId: 'prosjekt2', 
        position: {coordinates: [9.1, 60.6]}, stations: [2], crew: ['Crew2', '', '']})]
    ])
    const stations = new Map([
      [1, new Station({ 
        id: 1, name: 'Station 1', date: '2024-01-01', time: '12:00',
        waterTemp: 4, comment: 'Comment1', 
        startPos: {coordinates: [9.0, 60.5]}, endPos: {coordinates: [9.01, 60.51]},
        observations: [
          { id: 1, station: 1, species: 'Species1', length: 2, count: 1, comment: 'Comment1' }
        ]})],
      [2, new Station({
        id: 2, name: 'Station 2', date: '2024-01-15', time: '13:00',
        waterTemp: 6, comment: 'Comment2',
        startPos: {coordinates: [9.1, 60.6]}, endPos: {coordinates: [9.11, 60.61]},
        observations: [
          { id: 2, station: 2, species: 'Species2', length: 3, count: 1, comment: 'Comment2' }
        ]})
      ]
    ])
    vi.mocked(get).mockReturnValue(stations)

    const formatted = formatRiversForExcel(rivers)

    expect(formatted.riverHeader).toEqual(headersConstants.RIVER_HEADERS_EXCEL)
    expect(formatted.riverRows).toEqual([
      ['2024-01-01', '', 'Name1', '', 60.5, 9.0, '', '', 'Crew1', '', '', 'prosjekt1', ''],
      ['2024-01-15', '', 'Name2', '', 60.6, 9.1, '', '', 'Crew2', '', '', 'prosjekt2', '']
    ])
    expect(formatted.stationHeader).toEqual(headersConstants.STATION_HEADERS_EXCEL)
    expect(formatted.stationRows).toEqual([
      ['1', '2024-01-01', '12:00', 60.5, 9, 60.51, 9.01, '', '', 4, '', '', '', '', '', '', '', '', '', 'Comment1'],
      ['2', '2024-01-15', '13:00', 60.6, 9.1, 60.61, 9.11, '', '', 6, '', '', '', '', '', '', '', '', '', 'Comment2']
    ])
    expect(formatted.observationHeader).toEqual(headersConstants.OBSERVATION_HEADERS_EXCEL)
    expect(formatted.observationRows).toEqual([
      [1, 1, '', 'Species1', 2, 1, '', '', '', '', 'Comment1'],
      [2, 2, '', 'Species2', 3, 1, '', '', '', '', 'Comment2']
    ])
  })
})

describe('test formatStationsForExcel function', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('should return empty rows and correct headers if the input map is empty', () => {
    const formatted = formatStationsForExcel(new Map())

    expect(formatted.riverHeader).toEqual(headersConstants.RIVER_HEADERS_EXCEL)
    expect(formatted.riverRows).toEqual([])
    expect(formatted.stationHeader).toEqual(headersConstants.STATION_HEADERS_EXCEL)
    expect(formatted.stationRows).toEqual([])
    expect(formatted.observationHeader).toEqual(headersConstants.OBSERVATION_HEADERS_EXCEL)
    expect(formatted.observationRows).toEqual([])
  })

  it('should correctly convert station objects into arrays for Excel display', () => {
    const rivers = new Map([
      [1, new River({ 
        id: 1, name: 'Name1', startDate: '2024-01-01', projectId: 'prosjekt1', 
        position: {coordinates: [9.0, 60.5]}, stations: [1], crew: ['Crew1', '', '']})],
      [2, new River({ 
        id: 2, name: 'Name2', startDate: '2024-01-15', projectId: 'prosjekt2', 
        position: {coordinates: [9.1, 60.6]}, stations: [2], crew: ['Crew2', '', '']})]
    ])
    const stations = new Map([
      [1, new Station({ 
        id: 1, name: 'Station 1', date: '2024-01-01', time: '12:00',
        waterTemp: 4, comment: 'Comment1', 
        startPos: {coordinates: [9.0, 60.5]}, endPos: {coordinates: [9.01, 60.51]},
        observations: [
          { id: 1, station: 1, species: 'Species1', length: 2, count: 1, comment: 'Comment1' }
        ], riverId: 1})],
      [2, new Station({
        id: 2, name: 'Station 2', date: '2024-01-15', time: '13:00',
        waterTemp: 6, comment: 'Comment2',
        startPos: {coordinates: [9.1, 60.6]}, endPos: {coordinates: [9.11, 60.61]},
        observations: [
          { id: 2, station: 2, species: 'Species2', length: 3, count: 1, comment: 'Comment2' }
        ], riverId: 2})
      ]
    ])
    vi.mocked(get).mockReturnValue(rivers)

    const formatted = formatStationsForExcel(stations)

    expect(formatted.riverHeader).toEqual(headersConstants.RIVER_HEADERS_EXCEL)
    expect(formatted.riverRows).toEqual([
      ['2024-01-01', '', 'Name1', '', 60.5, 9.0, '', '', 'Crew1', '', '', 'prosjekt1', ''],
      ['2024-01-15', '', 'Name2', '', 60.6, 9.1, '', '', 'Crew2', '', '', 'prosjekt2', '']
    ])
    expect(formatted.stationHeader).toEqual(headersConstants.STATION_HEADERS_EXCEL)
    expect(formatted.stationRows).toEqual([
      ['1', '2024-01-01', '12:00', 60.5, 9, 60.51, 9.01, '', '', 4, '', '', '', '', '', '', '', '', '', 'Comment1'],
      ['2', '2024-01-15', '13:00', 60.6, 9.1, 60.61, 9.11, '', '', 6, '', '', '', '', '', '', '', '', '', 'Comment2']
    ])
    expect(formatted.observationHeader).toEqual(headersConstants.OBSERVATION_HEADERS_EXCEL)
    expect(formatted.observationRows).toEqual([
      [1, 1, '', 'Species1', 2, 1, '', '', '', '', 'Comment1'],
      [2, 2, '', 'Species2', 3, 1, '', '', '', '', 'Comment2']
    ])
  })
})

describe('test formatRiversForCsv function', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('should return empty rows and correct headers if the input map is empty', () => {
    const formatted = formatRiversForCsv(new Map())

    expect(formatted.header).toEqual([
      ...headersConstants.RIVER_HEADERS_EXCEL, 
      ...headersConstants.STATION_HEADERS_EXCEL, 
      ...headersConstants.OBSERVATION_HEADERS_EXCEL
    ])
    expect(formatted.rows).toEqual([])
  })

  it('should correctly convert river objects into arrays for CSV display', () => {
    const rivers = new Map([
      [1, new River({ 
        id: 1, name: 'Name1', startDate: '2024-01-01', projectId: 'prosjekt1', 
        position: {coordinates: [9.0, 60.5]}, stations: [1], crew: ['Crew1', '', '']})],
      [2, new River({ 
        id: 2, name: 'Name2', startDate: '2024-01-15', projectId: 'prosjekt2', 
        position: {coordinates: [9.1, 60.6]}, stations: [2], crew: ['Crew2', '', '']})]
    ])
    const stations = new Map([
      [1, new Station({ 
        id: 1, name: 'Station 1', date: '2024-01-01', time: '12:00',
        waterTemp: 4, comment: 'Comment1', 
        startPos: {coordinates: [9.0, 60.5]}, endPos: {coordinates: [9.01, 60.51]},
        observations: [
          { id: 1, station: 1, species: 'Species1', length: 2, count: 1, comment: 'Comment1' }
        ]})],
      [2, new Station({
        id: 2, name: 'Station 2', date: '2024-01-15', time: '13:00',
        waterTemp: 6, comment: 'Comment2',
        startPos: {coordinates: [9.1, 60.6]}, endPos: {coordinates: [9.11, 60.61]},
        observations: [
          { id: 2, station: 2, species: 'Species2', length: 3, count: 1, comment: 'Comment2' }
        ]})
      ]
    ])
    vi.mocked(get).mockReturnValue(stations)

    const formatted = formatRiversForCsv(rivers)

    expect(formatted.header).toEqual([
      ...headersConstants.RIVER_HEADERS_EXCEL, 
      ...headersConstants.STATION_HEADERS_EXCEL, 
      ...headersConstants.OBSERVATION_HEADERS_EXCEL
    ])
    expect(formatted.rows).toEqual([
      ['2024-01-01', '', 'Name1', '', 60.5, 9.0, '', '', 'Crew1', '', '', 'prosjekt1', '', 
      '1', '2024-01-01', '12:00', 60.5, 9, 60.51, 9.01, '', '', 4, '', '', '', '', '', '', '', '', '', 'Comment1',
      1, 1, '', 'Species1', 2, 1, '', '', '', '', 'Comment1'],
      ['2024-01-15', '', 'Name2', '', 60.6, 9.1, '', '', 'Crew2', '', '', 'prosjekt2', '',
      '2', '2024-01-15', '13:00', 60.6, 9.1, 60.61, 9.11, '', '', 6, '', '', '', '', '', '', '', '', '', 'Comment2',
      2, 2, '', 'Species2', 3, 1, '', '', '', '', 'Comment2']
    ])
  })
})

describe('test formatStationsForCsv function', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('should return empty rows and correct headers if the input map is empty', () => {
    const formatted = formatStationsForCsv(new Map())

    expect(formatted.header).toEqual([
      ...headersConstants.RIVER_HEADERS_EXCEL, 
      ...headersConstants.STATION_HEADERS_EXCEL, 
      ...headersConstants.OBSERVATION_HEADERS_EXCEL
    ])
    expect(formatted.rows).toEqual([])
  })

  it('should correctly convert station objects into arrays for CSV display', () => {
    const rivers = new Map([
      [1, new River({ 
        id: 1, name: 'Name1', startDate: '2024-01-01', projectId: 'prosjekt1', 
        position: {coordinates: [9.0, 60.5]}, stations: [1], crew: ['Crew1', '', '']})],
      [2, new River({ 
        id: 2, name: 'Name2', startDate: '2024-01-15', projectId: 'prosjekt2', 
        position: {coordinates: [9.1, 60.6]}, stations: [2], crew: ['Crew2', '', '']})]
    ])
    const stations = new Map([
      [1, new Station({ 
        id: 1, name: 'Station 1', date: '2024-01-01', time: '12:00',
        waterTemp: 4, comment: 'Comment1', 
        startPos: {coordinates: [9.0, 60.5]}, endPos: {coordinates: [9.01, 60.51]},
        observations: [
          { id: 1, station: 1, species: 'Species1', length: 2, count: 1, comment: 'Comment1' }
        ], riverId: 1})],
      [2, new Station({
        id: 2, name: 'Station 2', date: '2024-01-15', time: '13:00',
        waterTemp: 6, comment: 'Comment2',
        startPos: {coordinates: [9.1, 60.6]}, endPos: {coordinates: [9.11, 60.61]},
        observations: [
          { id: 2, station: 2, species: 'Species2', length: 3, count: 1, comment: 'Comment2' }
        ], riverId: 2})
      ]
    ])
    vi.mocked(get).mockReturnValue(rivers)

    const formatted = formatStationsForCsv(stations)

    expect(formatted.header).toEqual([
      ...headersConstants.RIVER_HEADERS_EXCEL, 
      ...headersConstants.STATION_HEADERS_EXCEL, 
      ...headersConstants.OBSERVATION_HEADERS_EXCEL
    ])
    expect(formatted.rows).toEqual([
      ['2024-01-01', '', 'Name1', '', 60.5, 9.0, '', '', 'Crew1', '', '', 'prosjekt1', '', 
      '1', '2024-01-01', '12:00', 60.5, 9, 60.51, 9.01, '', '', 4, '', '', '', '', '', '', '', '', '', 'Comment1',
      1, 1, '', 'Species1', 2, 1, '', '', '', '', 'Comment1'],
      ['2024-01-15', '', 'Name2', '', 60.6, 9.1, '', '', 'Crew2', '', '', 'prosjekt2', '',
      '2', '2024-01-15', '13:00', 60.6, 9.1, 60.61, 9.11, '', '', 6, '', '', '', '', '', '', '', '', '', 'Comment2',
      2, 2, '', 'Species2', 3, 1, '', '', '', '', 'Comment2']
    ])
  })
})