import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  generateExcelFile,
  generateCSVFile,
  fileExistsInArray
} from './fileHandler.js'
import * as formatData from './formatData.js'
import * as addFeedbackToStore from './addFeedbackToStore'

// Mocking modules
vi.mock('./formatData.js', () => ({
  formatRiversForExcel: vi.fn(),
  formatStationsForExcel: vi.fn(),
  formatRiversForCsv: vi.fn(),
  formatStationsForCsv: vi.fn()
}))

vi.mock('./addFeedbackToStore', () => ({
  addFeedbackToStore: vi.fn()
}))

describe('test generateExcelFile function', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('should return an empty blob and add error feedback to store if an error occurs', async () => {
    const rivers = new Map()
    const stations = new Map()
    const type = 'river'
    formatData.formatRiversForExcel.mockImplementation(() => { throw new Error() })
    addFeedbackToStore.addFeedbackToStore.mockReturnValue()

    const result = await generateExcelFile(rivers, stations, type)

    expect(result).toBeInstanceOf(Blob)
    expect(result.size).toBe(0)
    expect(addFeedbackToStore.addFeedbackToStore).toHaveBeenCalled()
  })

  it('should generate an Excel file from river data', async () => {
    const rivers = new Map()
    const stations = new Map()
    const type = 'river'
    const mockData = {
      riverHeader: ['Name'],
      riverRows: [['river1'], ['river2']],
      stationHeader: ['Name'],
      stationRows: [['station1'], ['station2']],
      observationHeader: ['Name'],
      observationRows: [['observation1'], ['observation2']]
    }
    formatData.formatRiversForExcel.mockReturnValue(mockData)

    const result = await generateExcelFile(rivers, stations, type)

    expect(result).toBeInstanceOf(Blob)
    expect(result.size).toBeGreaterThan(0)
    expect(result.type).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  })

  it('should generate an Excel file from station data', async () => {
    const rivers = new Map()
    const stations = new Map()
    const type = 'station'
    const mockData = {
      riverHeader: ['Name'],
      riverRows: [['river1'], ['river2']],
      stationHeader: ['Name'],
      stationRows: [['station1'], ['station2']],
      observationHeader: ['Name'],
      observationRows: [['observation1'], ['observation2']]
    }
    formatData.formatStationsForExcel.mockReturnValue(mockData)

    const result = await generateExcelFile(rivers, stations, type)

    expect(result).toBeInstanceOf(Blob)
    expect(result.size).toBeGreaterThan(0)
    expect(result.type).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  })
})

describe('test generateCSVFile function', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('should return an empty blob and add error feedback to store if an error occurs', async () => {
    const rivers = new Map()
    const stations = new Map()
    const type = 'river'
    formatData.formatRiversForCsv.mockImplementation(() => { throw new Error() })
    addFeedbackToStore.addFeedbackToStore.mockReturnValue()

    const result = await generateCSVFile(rivers, stations, type)

    expect(result).toBeInstanceOf(Blob)
    expect(result.size).toBe(0)
    expect(addFeedbackToStore.addFeedbackToStore).toHaveBeenCalled()
  })

  it('should generate a CSV file from river data', async () => {
    const rivers = new Map()
    const stations = new Map()
    const type = 'river'
    const mockData = {
      header: ['Name'],
      rows: [['river1'], ['river2']]
    }
    formatData.formatRiversForCsv.mockReturnValue(mockData)

    const result = await generateCSVFile(rivers, stations, type)

    expect(result).toBeInstanceOf(Blob)
    expect(result.size).toBeGreaterThan(0)
    expect(result.type).toBe('text/csv')
  })

  it('should generate a CSV file from station data', async () => {
    const rivers = new Map()
    const stations = new Map()
    const type = 'station'
    const mockData = {
      header: ['Name'],
      rows: [['station1'], ['station2']]
    }
    formatData.formatStationsForCsv.mockReturnValue(mockData)

    const result = await generateCSVFile(rivers, stations, type)

    expect(result).toBeInstanceOf(Blob)
    expect(result.size).toBeGreaterThan(0)
    expect(result.type).toBe('text/csv')
  })
})