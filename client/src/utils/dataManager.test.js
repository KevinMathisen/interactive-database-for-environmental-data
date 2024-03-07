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

