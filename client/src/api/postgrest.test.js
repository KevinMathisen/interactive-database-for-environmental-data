import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchRivers, fetchStations, fetchRiverSummary, fetchStationSummary, fetchStationDownload } from './postgrest'
import {
  POSTGREST_URL,
  RIVERS_ENDPOINT,
  STATIONS_ENDPOINT,
  RIVER_SUMMARY_ENDPOINT,
  STATION_SUMMARY_ENDPOINT,
  STATION_DOWNLOAD_ENDPOINT
} from '../constants/endpoints.js'

// Mock the fetch function
global.fetch = vi.fn()

describe('test fetchRivers function', {}, () => {
  beforeEach(() => {
    // Clear all mocks
    vi.clearAllMocks()
  })

  it('fetchRivers should call fetch with the correct URL', async () => {
    // Set up test
    const endpoint = RIVERS_ENDPOINT
    const expectedUrl = `${POSTGREST_URL}/${endpoint}`
    const mockResponse = { data: 'example-data' }
    global.fetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse)
    })

    // Run function
    await fetchRivers()

    // Assert
    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, { method: 'GET' })
  })

  it('fetchRivers should return the correct response as JSON', async () => {
    // Set up test
    const mockResponse = { data: 'example-data' }
    global.fetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse)
    })

    // Run function
    const result = await fetchRivers()

    // Assert
    expect(result).toEqual(mockResponse)
  })

  it('fetchRivers should throw an error if the response status is not ok', async () => {
    // Set up test
    const mockResponse = { statusText: 'Not Found' }
    global.fetch.mockResolvedValue({
      status: 404,
      ok: false,
      statusText: mockResponse.statusText,
      json: vi.fn().mockResolvedValue(mockResponse)
    })

    // Run function and Assert
    await expect(fetchRivers()).rejects.toThrowError(
      mockResponse.statusText
    )
  })

  it('fetchRivers should return null if the response status is 204', async () => {
    // Set up test
    const mockResponse = { statusText: 'No Content' }
    global.fetch.mockResolvedValue({
      status: 204,
      ok: true,
      statusText: mockResponse.statusText,
      json: vi.fn().mockResolvedValue(mockResponse)
    })

    // Run function
    const result = await fetchRivers()

    // Assert
    expect(result).toBeNull()
  })
})

describe('test fetchStations function', {}, () => {
  beforeEach(() => {
    // Clear all mocks
    vi.clearAllMocks()
  })

  it('fetchStations should call fetch with the correct URL', async () => {
    // Set up test
    const endpoint = STATIONS_ENDPOINT
    const expectedUrl = `${POSTGREST_URL}/${endpoint}`
    const mockResponse = { data: 'example-data' }
    global.fetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse)
    })

    // Run function
    await fetchStations()

    // Assert
    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, { method: 'GET' })
  })

  it('fetchStations should return the correct response as JSON', async () => {
    // Set up test
    const mockResponse = { data: 'example-data' }
    global.fetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse)
    })

    // Run function
    const result = await fetchStations()

    // Assert
    expect(result).toEqual(mockResponse)
  })

  it('fetchStations should throw an error if the response status is not ok', async () => {
    // Set up test
    const mockResponse = { statusText: 'Not Found' }
    global.fetch.mockResolvedValue({
      status: 404,
      statusText: mockResponse.statusText,
      json: vi.fn().mockResolvedValue(mockResponse)
    })

    // Run function and Assert
    await expect(fetchStations()).rejects.toThrowError(
      mockResponse.statusText
    )
  })

  it('fetchStations should return null if the response status is 204', async () => {
    // Set up test
    const mockResponse = { statusText: 'No Content' }
    global.fetch.mockResolvedValue({
      status: 204,
      ok: true,
      statusText: mockResponse.statusText,
      json: vi.fn().mockResolvedValue(mockResponse)
    })

    // Run function
    const result = await fetchStations()

    // Assert
    expect(result).toBeNull()
  })
})

describe('test fetchRiverSummary function', {}, () => {
  beforeEach(() => {
    // Clear all mocks
    vi.clearAllMocks()
  })

  it('fetchRiverSummary should call fetch with the correct URL', async () => {
    // Set up test
    const id = 1
    const endpoint = `${RIVER_SUMMARY_ENDPOINT}?id=eq.${id}`
    const expectedUrl = `${POSTGREST_URL}/${endpoint}`
    const mockResponse = { data: 'example-data' }
    global.fetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse)
    })

    // Run function
    await fetchRiverSummary(id)

    // Assert
    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, { method: 'GET' })
  })

  it('fetchRiverSummary should return the correct response as JSON', async () => {
    // Set up test
    const mockResponse = { data: 'example-data' }
    global.fetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse)
    })

    // Run function
    const result = await fetchRiverSummary(1)

    // Assert
    expect(result).toEqual(mockResponse)
  })

  it('fetchRiverSummary should throw an error if the response status is not ok', async () => {
    // Set up test
    const mockResponse = { statusText: 'Not Found' }
    global.fetch.mockResolvedValue({
      status: 404,
      statusText: mockResponse.statusText,
      json: vi.fn().mockResolvedValue(mockResponse)
    })

    // Run function and Assert
    await expect(fetchRiverSummary(1)).rejects.toThrowError(
      mockResponse.statusText
    )
  })

  it('fetchRiverSummary should return null if the response status is 204', async () => {
    // Set up test
    const mockResponse = { statusText: 'No Content' }
    global.fetch.mockResolvedValue({
      status: 204,
      ok: true,
      statusText: mockResponse.statusText,
      json: vi.fn().mockResolvedValue(mockResponse)
    })

    // Run function
    const result = await fetchRiverSummary(1)

    // Assert
    expect(result).toBeNull()
  })
})

describe('test fetchStationSummary function', {}, () => {
  beforeEach(() => {
    // Clear all mocks
    vi.clearAllMocks()
  })

  it('fetchStationSummary should call fetch with the correct URL when 1 id', async () => {
    // Set up test
    const id = [1]
    const endpoint = `${STATION_SUMMARY_ENDPOINT}?id=eq.${id[0]}`
    const expectedUrl = `${POSTGREST_URL}/${endpoint}`
    const mockResponse = { data: 'example-data' }
    global.fetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse)
    })

    // Run function
    await fetchStationSummary(id)

    // Assert
    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, { method: 'GET' })
  })

  it('fetchStationSummary should call fetch with the correct URL when multiple ids', async () => {
    // Set up test
    const id = [1, 2, 3]
    const endpoint = `${STATION_SUMMARY_ENDPOINT}?id=in.(${id.join(',')})`
    const expectedUrl = `${POSTGREST_URL}/${endpoint}`
    const mockResponse = { data: 'example-data' }
    global.fetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse)
    })

    // Run function
    await fetchStationSummary(id)

    // Assert
    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, { method: 'GET' })
  })

  it('fetchStationSummary should return the correct response as JSON', async () => {
    // Set up test
    const mockResponse = { data: 'example-data' }
    global.fetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse)
    })

    // Run function
    const result = await fetchStationSummary([1])

    // Assert
    expect(result).toEqual(mockResponse)
  })

  it('fetchStationSummary should throw an error if the response status is not ok', async () => {
    // Set up test
    const mockResponse = { statusText: 'Not Found' }
    global.fetch.mockResolvedValue({
      status: 404,
      statusText: mockResponse.statusText,
      json: vi.fn().mockResolvedValue(mockResponse)
    })

    // Run function and Assert
    await expect(fetchStationSummary([1])).rejects.toThrowError(
      mockResponse.statusText
    )
  })

  it('fetchStationSummary should return null if the response status is 204', async () => {
    // Set up test
    const mockResponse = { statusText: 'No Content' }
    global.fetch.mockResolvedValue({
      status: 204,
      ok: true,
      statusText: mockResponse.statusText,
      json: vi.fn().mockResolvedValue(mockResponse)
    })

    // Run function
    const result = await fetchStationSummary([1])

    // Assert
    expect(result).toBeNull()
  })
})

describe('test fetchStationDownload function', {}, () => {
  beforeEach(() => {
    // Clear all mocks
    vi.clearAllMocks()
  })

  it('fetchStationDownload should call fetch with the correct URL when 1 id', async () => {
    // Set up test
    const id = [1]
    const endpoint = `${STATION_DOWNLOAD_ENDPOINT}?id=eq.${id[0]}`
    const expectedUrl = `${POSTGREST_URL}/${endpoint}`
    const mockResponse = { data: 'example-data' }
    global.fetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse)
    })

    // Run function
    await fetchStationDownload(id)

    // Assert
    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, { method: 'GET' })
  })

  it('fetchStationDownload should call fetch with the correct URL when multiple ids', async () => {
    // Set up test
    const id = [1, 2, 3]
    const endpoint = `${STATION_DOWNLOAD_ENDPOINT}?id=in.(${id.join(',')})`
    const expectedUrl = `${POSTGREST_URL}/${endpoint}`
    const mockResponse = { data: 'example-data' }
    global.fetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse)
    })

    // Run function
    await fetchStationDownload(id)

    // Assert
    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, { method: 'GET' })
  })

  it('fetchStationDownload should return the correct response as JSON', async () => {
    // Set up test
    const mockResponse = { data: 'example-data' }
    global.fetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse)
    })

    // Run function
    const result = await fetchStationDownload([1])

    // Assert
    expect(result).toEqual(mockResponse)
  })

  it('fetchStationDownload should throw an error if the response status is not ok', async () => {
    // Set up test
    const mockResponse = { statusText: 'Not Found' }
    global.fetch.mockResolvedValue({
      status: 404,
      statusText: mockResponse.statusText,
      json: vi.fn().mockResolvedValue(mockResponse)
    })

    // Run function and Assert
    await expect(fetchStationDownload([1])).rejects.toThrowError(
      mockResponse.statusText
    )
  })

  it('fetchStationDownload should return null if the response status is 204', async () => {
    // Set up test
    const mockResponse = { statusText: 'No Content' }
    global.fetch.mockResolvedValue({
      status: 204,
      ok: true,
      statusText: mockResponse.statusText,
      json: vi.fn().mockResolvedValue(mockResponse)
    })

    // Run function
    const result = await fetchStationDownload([1])

    // Assert
    expect(result).toBeNull()
  })
})
