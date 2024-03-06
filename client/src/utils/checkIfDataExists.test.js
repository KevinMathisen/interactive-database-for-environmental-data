import { describe, it, expect, vi } from 'vitest'
import { get } from 'svelte/store'
import { doesAllRiversExistInStore, doesAllStationsExistInStore, checkIfRiverSummaryExists, checkIfStationSummaryExists, checkIfStationDownloadExists } from './checkIfDataExists.js'

// Mock the get method from Svelte's store module
vi.mock('svelte/store', () => ({
  get: vi.fn(),
  writable: vi.fn(() => ({
	  subscribe: vi.fn(),
	  set: vi.fn(),
	  update: vi.fn()
  }))
}))

describe('test doesAllRiversExistInStore function', () => {
  it('should return false if riverStore contains no data', () => {
    // Mock the get method to return an empty map
    get.mockReturnValue(new Map())
    expect(doesAllRiversExistInStore()).toBe(false)
  })

  it('should return false if riverStore contains data with no coordinates', () => {
    // Mock the get method to return a map with an object with no coordinates
    get.mockReturnValue(new Map().set(1, { id: 1, species: null }))

    expect(doesAllRiversExistInStore()).toBe(false)
  })

  it('should return true if riverStore contains data with coordinates', () => {
    // Mock the get method to return a map with an object with coordinates
    get.mockReturnValue(new Map().set(1, { id: 1, pos: [1, 2] }))

    expect(doesAllRiversExistInStore()).toBe(true)
  })
})

describe('test doesAllStationsExistInStore function', () => {
  it('should return false if stationStore contains no data', () => {
    // Mock the get method to return an empty map
    get.mockReturnValue(new Map())
    expect(doesAllStationsExistInStore()).toBe(false)
  })

  it('should return false if stationStore contains data with no coordinates', () => {
    // Mock the get method to return a map with an object with no coordinates
    get.mockReturnValue(new Map().set(1, { id: 1, species: null }))

    expect(doesAllStationsExistInStore()).toBe(false)
  })

  it('should return true if stationStore contains data with coordinates', () => {
    // Mock the get method to return a map with an object with coordinates
    get.mockReturnValue(new Map().set(1, { id: 1, pos: [1, 2] }))

    expect(doesAllStationsExistInStore()).toBe(true)
  })
})
