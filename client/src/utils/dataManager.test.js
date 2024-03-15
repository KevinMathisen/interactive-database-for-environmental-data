import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getRivers, getStations, getRiverSummary, getStationSummary, getRiverForDownload, getStationForDownload } from './dataManager.js'
import * as postgrest from '../api/postgrest.js'
import * as checkIfDataExists from './checkIfDataExists.js'
import * as addFeedbackToStore from './addFeedbackToStore.js'
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

    expect(updatedRiverMap.has(1)).toBe(true)
    expect(updatedRiverMap.get(1).name).toEqual('River Test')
    expect(updatedRiverMap.has(2)).toBe(true)
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

    expect(updatedStationMap.has(1)).toBe(true)
    expect(updatedStationMap.get(1).observations[0].species).toEqual('Species 1')
    expect(updatedStationMap.has(2)).toBe(true)
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

describe('test getRiverSummary function', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('should not fetch river summary if it already exists in store', async () => {
    // Set up test
    checkIfDataExists.checkIfRiverSummaryExists.mockReturnValue(true)

    // Run function
    await getRiverSummary(1)

    // Assert
    expect(postgrest.fetchRiverSummary).not.toHaveBeenCalled()
  })

  it('should catch and log error if fetchRiverSummary throws an error', async () => {
    // Set up test
    checkIfDataExists.checkIfRiverSummaryExists.mockReturnValue(false)
    postgrest.fetchRiverSummary.mockRejectedValue(new Error('Test Error'))

    // Run function
    await getRiverSummary(1)

    // Assert
    expect(addFeedbackToStore.addFeedbackToStore).toHaveBeenCalled()
  })

  it('should fetch and add river summary to store if river summary does not exist', async () => {
    // set up test
    checkIfDataExists.checkIfRiverSummaryExists.mockReturnValue(false)
    const mockedRiverSummary = [{ id: 1, name: 'River Test', stations: [1, 2] }]
    postgrest.fetchRiverSummary.mockResolvedValue(mockedRiverSummary)
    const mockedStationSummary = [{ id: 1, name: 'Station Test' }, { id: 2, name: 'Station Test 2' }]
    postgrest.fetchStationSummary.mockResolvedValue(mockedStationSummary)

    vi.mocked(get).mockReturnValue(new Map())

    // capture updates
    let capturedUpdateRiver
    riverStore.update.mockImplementationOnce(updateFn => {
      capturedUpdateRiver = updateFn
    })

    // Run function
    await getRiverSummary(1)

    // Assert the river summary
    expect(postgrest.fetchRiverSummary).toHaveBeenCalledWith(1)
    // expect the riverStore to have a river in its store
    expect(riverStore.update).toHaveBeenCalled()

    // create updated map by using the captured logic
    const updatedRiverMap = capturedUpdateRiver(new Map())
    expect(updatedRiverMap.has(1)).toBe(true)
    expect(updatedRiverMap.get(1).name).toEqual('River Test')

    // Assert the station summary
    expect(postgrest.fetchStationSummary).toHaveBeenCalledWith([1, 2])
    expect(stationStore.set).toHaveBeenCalled()

    const expectedStationMap = new Map(mockedStationSummary.map(station => [station.id, new Station(station)]))
    expect(stationStore.set).toHaveBeenCalledWith(expectedStationMap)
  })

  it('should fetch and add river summary to store if river summary and stations summaries overlap', async () => {
    // set up test
    checkIfDataExists.checkIfRiverSummaryExists.mockReturnValue(false)
    const mockedRiverSummary = [{ id: 1, name: 'River Test', stations: [1] }]
    postgrest.fetchRiverSummary.mockResolvedValue(mockedRiverSummary)
    const initialRiverMap = new Map([[1, new River({ id: 1, name: 'River Test' })], [2, new River({ id: 2, name: 'River Test 2' })]])

    const mockedStationSummary = [{ id: 1, name: 'Station Test', observations: [{ species: 'Species 1', count: 1 }] }]
    postgrest.fetchStationSummary.mockResolvedValue(mockedStationSummary)
    const initialStationMap = new Map([[1, new Station({ id: 1, name: 'Station Test' })], [2, new Station({ id: 2, name: 'Station Test 2' })]])

    // Does not matter that 'get()' is not returning the initialStationMap, as get is only used for both rivers and stations for checking if there exists any objects in the store
    vi.mocked(get).mockReturnValue(initialRiverMap)

    // capture updates
    let capturedUpdateRiver
    riverStore.update.mockImplementationOnce(updateFn => {
      capturedUpdateRiver = updateFn
    })
    let capturedUpdateStation
    stationStore.update.mockImplementationOnce(updateFn => {
      capturedUpdateStation = updateFn
    })

    // Run function
    await getRiverSummary(1)

    // Assert the river summary
    expect(postgrest.fetchRiverSummary).toHaveBeenCalledWith(1)
    // expect the riverStore to have a river in its store
    expect(riverStore.update).toHaveBeenCalled()

    // create updated map by using the captured logic
    const updatedRiverMap = capturedUpdateRiver(initialRiverMap)
    expect(updatedRiverMap.has(1)).toBe(true)
    expect(updatedRiverMap.get(1).stations[0]).toEqual(1)

    // Assert the station summary
    expect(postgrest.fetchStationSummary).toHaveBeenCalledWith([1])
    expect(stationStore.update).toHaveBeenCalled()

    // create updated map by using the captured logic
    const updatedStationMap = capturedUpdateStation(initialStationMap)
    expect(updatedStationMap.has(1)).toBe(true)
    expect(updatedStationMap.get(1).observations[0].count).toEqual(1)
  })
})

describe('test getStationSummary function', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('should not fetch station summary if it already exists in store', async () => {
    // Set up test
    checkIfDataExists.checkIfStationSummaryExists.mockReturnValue(true)

    // Run function
    await getStationSummary(1)

    // Assert
    expect(postgrest.fetchStationSummary).not.toHaveBeenCalled()
  })

  it('should catch and log error if fetchStationSummary throws an error', async () => {
    // Set up test
    checkIfDataExists.checkIfStationSummaryExists.mockReturnValue(false)
    postgrest.fetchStationSummary.mockRejectedValue(new Error('Test Error'))

    // Run function
    await getStationSummary(1)

    // Assert
    expect(addFeedbackToStore.addFeedbackToStore).toHaveBeenCalled()
  })

  it('should fetch and add station summary to store if station summary does not exist', async () => {
    // set up test
    checkIfDataExists.checkIfStationSummaryExists.mockReturnValue(false)
    const mockedStationSummary = [{ id: 1, name: 'Station Test' }]
    postgrest.fetchStationSummary.mockResolvedValue(mockedStationSummary)
    vi.mocked(get).mockReturnValue(new Map())

    // capture updates
    let capturedUpdate
    stationStore.update.mockImplementationOnce(updateFn => {
      capturedUpdate = updateFn
    })

    // Run function
    await getStationSummary(1)

    // Assert
    expect(postgrest.fetchStationSummary).toHaveBeenCalledWith([1])
    expect(stationStore.update).toHaveBeenCalled()

    // create updated map by using the captured logic
    const updatedStationMap = capturedUpdate(new Map())

    expect(updatedStationMap.has(1)).toBe(true)
    expect(updatedStationMap.get(1).name).toEqual('Station Test')
  })

  it('should fetch and add station summary to store if station summary and stations overlap', async () => {
    // set up test
    checkIfDataExists.checkIfStationSummaryExists.mockReturnValue(false)
    const mockedStationSummary = [{ id: 1, name: 'Station Test', observations: [{ species: 'Species 1', count: 1 }] }]
    postgrest.fetchStationSummary.mockResolvedValue(mockedStationSummary)
    const initialStationMap = new Map([[1, new Station({ id: 1, name: 'Station Test' })], [2, new Station({ id: 2, name: 'Station Test 2' })]])
    vi.mocked(get).mockReturnValue(initialStationMap)

    // capture updates
    let capturedUpdate
    stationStore.update.mockImplementationOnce(updateFn => {
      capturedUpdate = updateFn
    })

    // Run function
    await getStationSummary(1)

    // Assert
    expect(postgrest.fetchStationSummary).toHaveBeenCalledWith([1])
    expect(stationStore.update).toHaveBeenCalled()

    // create updated map by using the captured logic
    const updatedStationMap = capturedUpdate(initialStationMap)

    expect(updatedStationMap.has(1)).toBe(true)
    expect(updatedStationMap.get(1).name).toEqual('Station Test')
    expect(updatedStationMap.get(1).observations[0].count).toEqual(1)
  })
})

describe('test getRiverForDownload function', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('should exit function if all stations under river are ready for download', async () => {
    // Set up test
    checkIfDataExists.checkIfRiverSummaryExists.mockReturnValue(true)
    checkIfDataExists.checkIfStationDownloadExists.mockReturnValue(true)
    const initialRiverMap = new Map([[1, new River({ id: 1, name: 'River Test', stations: [1, 2] })]])
    vi.mocked(get).mockReturnValue(initialRiverMap)

    // Run function
    await getRiverForDownload(1)

    // Assert
    expect(postgrest.fetchStationDownload).not.toHaveBeenCalled()
  })

  it('should exit and log error if fetchStationDownload throws an error', async () => {
    // Set up test
    checkIfDataExists.checkIfRiverSummaryExists.mockReturnValue(true)
    checkIfDataExists.checkIfStationDownloadExists.mockReturnValue(false)
    postgrest.fetchStationDownload.mockRejectedValue(new Error('Test Error'))

    // Run function
    await getRiverForDownload(1)

    // Assert
    expect(addFeedbackToStore.addFeedbackToStore).toHaveBeenCalled()
  })

  it('should fetch and add station download to store if station download does not exist', async () => {
    // set up test
    checkIfDataExists.checkIfRiverSummaryExists.mockReturnValue(true)
    checkIfDataExists.checkIfStationDownloadExists.mockReturnValue(false)
    const initialRiverMap = new Map([[1, new River({ id: 1, name: 'River Test', stations: [1, 2] })]])
    vi.mocked(get).mockReturnValue(initialRiverMap)

    const mockedStationDownload = [{ id: 1, name: 'Station Test' }, { id: 2, name: 'Station Test 2' }]
    postgrest.fetchStationDownload.mockResolvedValue(mockedStationDownload)

    // capture updates
    let capturedUpdate
    stationStore.update.mockImplementationOnce(updateFn => {
      capturedUpdate = updateFn
    })

    // Run function
    await getRiverForDownload(1)

    // Assert
    expect(postgrest.fetchStationDownload).toHaveBeenCalledWith([1, 2])
    expect(stationStore.update).toHaveBeenCalled()

    // create updated map by using the captured logic
    const updatedStationMap = capturedUpdate(new Map())

    expect(updatedStationMap.has(1)).toBe(true)
    expect(updatedStationMap.get(1).name).toEqual('Station Test')
  })
})

describe('test getStationForDownload function', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('should exit function if station is ready for download', async () => {
    // Set up test
    checkIfDataExists.checkIfStationDownloadExists.mockReturnValue(true)

    // Run function
    await getStationForDownload(1)

    // Assert
    expect(postgrest.fetchStationDownload).not.toHaveBeenCalled()
  })

  it('should exit and log error if fetchStationDownload throws an error', async () => {
    // Set up test
    checkIfDataExists.checkIfStationDownloadExists.mockReturnValue(false)
    postgrest.fetchStationDownload.mockRejectedValue(new Error('Test Error'))

    // Run function
    await getStationForDownload(1)

    // Assert
    expect(addFeedbackToStore.addFeedbackToStore).toHaveBeenCalled()
  })

  it('should fetch and add station download to store if station overlap exists', async () => {
    // set up test
    checkIfDataExists.checkIfStationDownloadExists.mockReturnValue(false)
    const mockedStationDownload = [{ id: 1, name: 'Station Test', observations: [{ species: 'Species 1', count: 1 }] }]
    postgrest.fetchStationDownload.mockResolvedValue(mockedStationDownload)
    const initialStationMap = new Map([[1, new Station({ id: 1, name: 'Station Test' })]])
    vi.mocked(get).mockReturnValue(initialStationMap)

    // capture updates
    let capturedUpdate
    stationStore.update.mockImplementationOnce(updateFn => {
      capturedUpdate = updateFn
    })

    // Run function
    await getStationForDownload(1)

    // Assert
    expect(postgrest.fetchStationDownload).toHaveBeenCalledWith([1])
    expect(stationStore.update).toHaveBeenCalled()

    // create updated map by using the captured logic
    const updatedStationMap = capturedUpdate(initialStationMap)

    expect(updatedStationMap.has(1)).toBe(true)
    expect(updatedStationMap.get(1).observations[0].species).toEqual('Species 1')
  })
})
