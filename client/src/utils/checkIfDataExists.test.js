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

describe('test checkIfRiverSummaryExists function', () => {
	it('should return false if riverStore does not contain any rivers', () => {
	  // Mock the get method to return a map without a river with key 1
	  get.mockReturnValue(new Map());
	  expect(checkIfRiverSummaryExists(1)).toBe(false);
	});

	it('should return false if riverStore does not contain a river with given key', () => {
	  // Mock the get method to return a map without a river with key 1
	  get.mockReturnValue(new Map().set(2, { id: 2, skipper: 'test' }));
	  expect(checkIfRiverSummaryExists(1)).toBe(false);
	});

	it('should return false if river with key exists, but does not have skipper defined', () => {
	  // Mock the get method to return a map with an object with no skipper
	  get.mockReturnValue(new Map().set(1, { id: 1, skipper: null }));
  
	  expect(checkIfRiverSummaryExists(1)).toBe(false);
	});
  
	// Should return true if a river with skipper exists
	it('should return true if riverStore exists, and has skipper defined', () => {
	  // Mock the get method to return a map with an object with skipper
	  get.mockReturnValue(new Map().set(1, { id: 1, skipper: 'test' }));
  
	  expect(checkIfRiverSummaryExists(1)).toBe(true);
	});
  
});
  

describe('test checkIfStationSummaryExists function', () => {
  it('should return false if no station exists', () => {
	// Mock the get method to return an empty map
	get.mockReturnValue(new Map());
	expect(checkIfStationSummaryExists(1)).toBe(false);
  });

  it('should return false if no station with given key exists', () => {
	// Mock the get method to return a map without a station with key 1
	get.mockReturnValue(new Map().set(2, { id: 2, secFished: 10 }));
	expect(checkIfStationSummaryExists(1)).toBe(false);
  });

  it('should return false if there exists a station with the key, but it does not have seconds fished defined', () => {
	// Mock the get method to return a map with an object with no skipper
	get.mockReturnValue(new Map().set(1, { id: 1, secFished: null }));

	expect(checkIfStationSummaryExists(1)).toBe(false);
  });

  // Should return true if stationStore exists, and has skipper defined
  it('should return true if stationStore exists, and has skipper defined', () => {
	// Mock the get method to return a map with an object with skipper
	get.mockReturnValue(new Map().set(1, { id: 1, skipper: 'test' }));

	expect(checkIfStationSummaryExists(1)).toBe(true);
  });

});

