import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchRivers, fetchStations, fetchRiverSummary, fetchStationSummary, fetchStationDownload } from './postgrest';
import {
	POSTGREST_URL,
	RIVERS_ENDPOINT,
	STATIONS_ENDPOINT,
	RIVER_SUMMARY_ENDPOINT,
	STATION_SUMMARY_ENDPOINT,
	STATION_DOWNLOAD_ENDPOINT
  } from '../constants/constants.js'

// Mock the fetch function
global.fetch = vi.fn();


describe('test fetchRivers function', {}, () => {
	beforeEach(() => {
		// Clear all mocks
		vi.clearAllMocks();
	});

	it('fetchRivers should call fetch with the correct URL', async () => {
		// Arrange
		const endpoint = RIVERS_ENDPOINT;
		const expectedUrl = `${POSTGREST_URL}/${endpoint}`;
		const mockResponse = { data: 'example-data'};
		global.fetch.mockResolvedValue({
			ok: true,
			json: vi.fn().mockResolvedValue(mockResponse),
		});

		// Act
		await fetchRivers();

		// Assert
		expect(global.fetch).toHaveBeenCalledWith(expectedUrl, { method: 'GET' });
	});

	it('fetchRivers should return the correct response as JSON', async () => {
		// Arrange
		const mockResponse = { data: 'example-data'};
		global.fetch.mockResolvedValue({
			ok: true,
			json: vi.fn().mockResolvedValue(mockResponse),
		});

		// Act
		const result = await fetchRivers();

		// Assert
		expect(result).toEqual(mockResponse);
	});

	it('fetchRivers should throw an error if the response status is not ok', async () => {
		// Arrange
		const mockResponse = { statusText: 'Not Found' };
		global.fetch.mockResolvedValue({
			status: 404,
			ok: false,
			statusText: mockResponse.statusText,
			json: vi.fn().mockResolvedValue(mockResponse),
		});

		// Act and Assert
		await expect(fetchRivers()).rejects.toThrowError(
			mockResponse.statusText
		);
	});

	it('fetchRivers should return null if the response status is 204', async () => {
		// Arrange
		const mockResponse = { statusText: 'No Content' };
		global.fetch.mockResolvedValue({
			status: 204,
			ok: true,
			statusText: mockResponse.statusText,
			json: vi.fn().mockResolvedValue(mockResponse),
		});

		// Act
		const result = await fetchRivers();

		// Assert
		expect(result).toBeNull();
	});
});

describe('test fetchStations function', {}, () => {
	beforeEach(() => {
		// Clear all mocks
		vi.clearAllMocks();
	});

	it('fetchStations should call fetch with the correct URL', async () => {
		// Arrange
		const endpoint = STATIONS_ENDPOINT;
		const expectedUrl = `${POSTGREST_URL}/${endpoint}`;
		const mockResponse = { data: 'example-data'};
		global.fetch.mockResolvedValue({
			ok: true,
			json: vi.fn().mockResolvedValue(mockResponse),
		});

		// Act
		await fetchStations();

		// Assert
		expect(global.fetch).toHaveBeenCalledWith(expectedUrl, { method: 'GET' });
	});

	it('fetchStations should return the correct response as JSON', async () => {
		// Arrange
		const mockResponse = { data: 'example-data'};
		global.fetch.mockResolvedValue({
			ok: true,
			json: vi.fn().mockResolvedValue(mockResponse),
		});

		// Act
		const result = await fetchStations();

		// Assert
		expect(result).toEqual(mockResponse);
	});

	it('fetchStations should throw an error if the response status is not ok', async () => {
		// Arrange
		const mockResponse = { statusText: 'Not Found' };
		global.fetch.mockResolvedValue({
			status: 404,
			statusText: mockResponse.statusText,
			json: vi.fn().mockResolvedValue(mockResponse),
		});

		// Act and Assert
		await expect(fetchStations()).rejects.toThrowError(
			mockResponse.statusText
		);
	});
	
	it('fetchStations should return null if the response status is 204', async () => {
		// Arrange
		const mockResponse = { statusText: 'No Content' };
		global.fetch.mockResolvedValue({
			status: 204,
			ok: true,
			statusText: mockResponse.statusText,
			json: vi.fn().mockResolvedValue(mockResponse),
		});

		// Act
		const result = await fetchStations();

		// Assert
		expect(result).toBeNull();
	});
});


