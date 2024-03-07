import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getRivers, getStations, getRiverSummary, getStationSummary, getRiverForDownload, getStationForDownload } from './dataManager.js'
import * as postgrest from '../api/postgrest.js'
import * as checkIfDataExists from './checkIfDataExists.js'
import * as addFeedbackToStore from './addFeedbackTostore.js'
import { riverStore } from '../stores/riverStore.js'
import { stationStore } from '../stores/stationStore.js'
import { River } from '../models/River.js'
import { Station } from '../models/Station.js'
import { get } from 'svelte/store'

// Mocking modules
vi.mock('../api/postgrest', () => ({
  fetchRivers: vi.fn(),
  fetchStations: vi.fn(),
  fetchRiverSummary: vi.fn(),
  fetchStationSummary: vi.fn(),
  fetchStationDownload: vi.fn()
}))

vi.mock('./checkIfDataExists', () => ({
  doesAllRiversExistInStore: vi.fn(),
  doesAllStationsExistInStore: vi.fn(),
  checkIfRiverSummaryExists: vi.fn(),
  checkIfStationSummaryExists: vi.fn(),
  checkIfStationDownloadExists: vi.fn()
}))

vi.mock('./addFeedbackTostore', () => ({
  addFeedbackToStore: vi.fn()
}))

vi.mock('svelte/store', () => ({
  get: vi.fn(),
  writable: vi.fn(() => ({
    subscribe: vi.fn(),
    set: vi.fn(),
    update: vi.fn()
  }))
}))

vi.mock('../stores/riverStore', () => ({
  riverStore: {
    subscribe: vi.fn(),
    update: vi.fn(),
    set: vi.fn()
  }
}))

vi.mock('../stores/stationStore', () => ({
  stationStore: {
    subscribe: vi.fn(),
    update: vi.fn(),
    set: vi.fn()
  }
}))

describe('test getRivers function', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('should not fetch rivers if they already exist in store', async () => {
    // Set up test
    checkIfDataExists.doesAllRiversExistInStore.mockReturnValue(true)

    // Run function
    await getRivers()

    // Assert
    expect(postgrest.fetchRivers).not.toHaveBeenCalled()
  })

  it('should catch and log error if fetchRivers throws an error', async () => {
    // Set up test
    checkIfDataExists.doesAllRiversExistInStore.mockReturnValue(false)
    postgrest.fetchRivers.mockRejectedValue(new Error('Test Error'))

    // Run function
    await getRivers()

    // Assert
    expect(addFeedbackToStore.addFeedbackToStore).toHaveBeenCalled()
  })

  it('should catch and log error if updateStoreWithObjects throws an error', async () => {
    // Set up test
    checkIfDataExists.doesAllRiversExistInStore.mockReturnValue(false)
    postgrest.fetchRivers.mockResolvedValue([{ id: 1, name: 'River Test' }])
    vi.mocked(get).mockImplementation(() => { throw new Error('Test Error') })

    // Run function
    await getRivers()

    // Assert
    expect(addFeedbackToStore.addFeedbackToStore).toHaveBeenCalled()
  })

  it('should fetch and update river store if rivers do not exist in store', async () => {
    // set up test
    checkIfDataExists.doesAllRiversExistInStore.mockReturnValue(false)
    const mockedRivers = [{ id: 1, name: 'River Test' }]
    postgrest.fetchRivers.mockResolvedValue(mockedRivers)
    vi.mocked(get).mockReturnValue(new Map())

    // Run function
    await getRivers()

    expect(postgrest.fetchRivers).toHaveBeenCalled()
    // expect the riverStore to have a river in its store
    const expectedRiverMap = new Map(mockedRivers.map(river => [river.id, new River(river)]))
    expect(riverStore.set).toHaveBeenCalledWith(expectedRiverMap)
  })

  it('should update river store if there are only some rivers with no overlap', async () => {
    // set up test
    checkIfDataExists.doesAllRiversExistInStore.mockReturnValue(false)
    const mockedRivers = [{ id: 1, name: 'River Test' }]
    postgrest.fetchRivers.mockResolvedValue(mockedRivers)
    const initialRiverMap = new Map([[2, new River({ id: 2, name: 'River Test 2' })]])
    vi.mocked(get).mockReturnValue(initialRiverMap)

    // capture updates
    let capturedUpdate
    riverStore.update.mockImplementationOnce(updateFn => {
      capturedUpdate = updateFn
    })

    // Run function
    await getRivers()

    // Assert
    expect(postgrest.fetchRivers).toHaveBeenCalled()
    expect(riverStore.update).toHaveBeenCalled()

    // create updated map by using the captured logic on the initialRiverMap
    const updatedRiverMap = capturedUpdate(initialRiverMap)

    expect(updatedRiverMap.has(1)).toBe(true) // The new river
    expect(updatedRiverMap.get(1).name).toEqual('River Test')
    expect(updatedRiverMap.has(2)).toBe(true) // The initially existing river
    expect(updatedRiverMap.get(2).name).toEqual('River Test 2')
  })

  it('should update river store if there are only some rivers with overlap', async () => {
    // set up test
    checkIfDataExists.doesAllRiversExistInStore.mockReturnValue(false)
    const mockedRivers = [{ id: 1, name: 'River Test', start_date: '2024-01-01' }]
    postgrest.fetchRivers.mockResolvedValue(mockedRivers)
    const initialRiverMap = new Map([[1, new River({ id: 1, name: 'River Test' })], [2, new River({ id: 2, name: 'River Test 2' })]])
    vi.mocked(get).mockReturnValue(initialRiverMap)

    // capture updates
    let capturedUpdate
    riverStore.update.mockImplementationOnce(updateFn => {
      capturedUpdate = updateFn
    })

    // Run function
    await getRivers()

    // Assert
    expect(postgrest.fetchRivers).toHaveBeenCalled()
    expect(riverStore.update).toHaveBeenCalled()

    // create updated map by using the captured logic on the initialRiverMap
    const updatedRiverMap = capturedUpdate(initialRiverMap)

    expect(updatedRiverMap.has(1)).toBe(true)
    expect(updatedRiverMap.get(1).name).toEqual('River Test')
    expect(updatedRiverMap.get(1).startDate).toEqual('2024-01-01')
    expect(updatedRiverMap.has(2)).toBe(true)
    expect(updatedRiverMap.get(2).name).toEqual('River Test 2')
  })
})

describe('test getStations function', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('should not fetch stations if they already exist in store', async () => {
    // Set up test
    checkIfDataExists.doesAllStationsExistInStore.mockReturnValue(true)

    // Run function
    await getStations()

    // Assert
    expect(postgrest.fetchStations).not.toHaveBeenCalled()
  })

  it('should catch and log error if fetchStations throws an error', async () => {
    // Set up test
    checkIfDataExists.doesAllStationsExistInStore.mockReturnValue(false)
    postgrest.fetchStations.mockRejectedValue(new Error('Test Error'))

    // Run function
    await getStations()

    // Assert
    expect(addFeedbackToStore.addFeedbackToStore).toHaveBeenCalled()
  })

  it('should catch and log error if updateStoreWithObjects throws an error', async () => {
    // Set up test
    checkIfDataExists.doesAllStationsExistInStore.mockReturnValue(false)
    postgrest.fetchStations.mockResolvedValue([{ id: 1, name: 'Station Test' }])
    vi.mocked(get).mockImplementation(() => { throw new Error('Test Error') })

    // Run function
    await getStations()

    // Assert
    expect(addFeedbackToStore.addFeedbackToStore).toHaveBeenCalled()
  })

  it('should fetch and update station store if stations do not exist in store', async () => {
    // set up test
    checkIfDataExists.doesAllStationsExistInStore.mockReturnValue(false)
    const mockedStations = [{ id: 1, name: 'Station Test' }]
    postgrest.fetchStations.mockResolvedValue(mockedStations)
    vi.mocked(get).mockReturnValue(new Map())

    // Run function
    await getStations()

    expect(postgrest.fetchStations).toHaveBeenCalled()
    // expect the stationStore to have a station in its store
    const expectedStationMap = new Map(mockedStations.map(station => [station.id, new Station(station)]))
    expect(stationStore.set).toHaveBeenCalledWith(expectedStationMap)
  })

  it('should update station store if there are only some stations with no overlap', async () => {
    // set up test
    checkIfDataExists.doesAllStationsExistInStore.mockReturnValue(false)
    const mockedStations = [{ id: 1, name: 'Station Test', observations: [{ species: 'Species 1', count: 1 }] }]
    postgrest.fetchStations.mockResolvedValue(mockedStations)
    const initialStationMap = new Map([[2, new Station({ id: 2, name: 'Station Test 2' })]])
    vi.mocked(get).mockReturnValue(initialStationMap)

    // capture updates
    let capturedUpdate
    stationStore.update.mockImplementationOnce(updateFn => {
      capturedUpdate = updateFn
    })

    // Run function
    await getStations()

    // Assert
    expect(postgrest.fetchStations).toHaveBeenCalled()
    expect(stationStore.update).toHaveBeenCalled()

    // create updated map by using the captured logic on the initialStationMap
    const updatedStationMap = capturedUpdate(initialStationMap)

    expect(updatedStationMap.has(1)).toBe(true) // The new station
    expect(updatedStationMap.get(1).observations[0].species).toEqual('Species 1')
    expect(updatedStationMap.has(2)).toBe(true) // The initially existing station
    expect(updatedStationMap.get(2).name).toEqual('Station Test 2')
  })

  it('should update station store if there are only some stations with overlap', async () => {
    // set up test
    checkIfDataExists.doesAllStationsExistInStore.mockReturnValue(false)
    const mockedStations = [{ id: 1, name: 'Station Test', observations: [{ species: 'Species 1', count: 2 }] }]
    postgrest.fetchStations.mockResolvedValue(mockedStations)
    const initialStationMap = new Map([[1, new Station({ id: 1, name: 'Station Test', observations: [{ species: 'Species 1', count: 1 }] })], [2, new Station({ id: 2, name: 'Station Test 2' })]])
    vi.mocked(get).mockReturnValue(initialStationMap)

    // capture updates
    let capturedUpdate
    stationStore.update.mockImplementationOnce(updateFn => {
      capturedUpdate = updateFn
    })

    // Run function
    await getStations()

    // Assert
    expect(postgrest.fetchStations).toHaveBeenCalled()
    expect(stationStore.update).toHaveBeenCalled()

    // create updated map by using the captured logic on the initialStationMap
    const updatedStationMap = capturedUpdate(initialStationMap)

    expect(updatedStationMap.has(1)).toBe(true)
    expect(updatedStationMap.get(1).name).toEqual('Station Test')
    expect(updatedStationMap.get(1).observations[0].count).toEqual(2)
    expect(updatedStationMap.has(2)).toBe(true)
    expect(updatedStationMap.get(2).name).toEqual('Station Test 2')
  })
})
