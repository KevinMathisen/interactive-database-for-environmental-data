import { describe, it, expect, vi } from 'vitest';
import { get } from 'svelte/store';
import { doesAllRiversExistInStore, doesAllStationsExistInStore, checkIfRiverSummaryExists, checkIfStationSummaryExists, checkIfStationDownloadExists } from './checkIfDataExists.js';

// Mock the get method from Svelte's store module
vi.mock('svelte/store', () => ({
	get: vi.fn(),
	writable: vi.fn(() => ({
	  subscribe: vi.fn(),
	  set: vi.fn(),
	  update: vi.fn(),
	})),
  }));

