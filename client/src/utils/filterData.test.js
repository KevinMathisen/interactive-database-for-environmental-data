import { describe, it, expect } from 'vitest'
import { filterRiversBySearch, filterStationsBySearch, filterRiversByDateAndSpecies, filterStationsByDateAndSpecies, filterObservationsBySpecies } from './filterData'
import { River } from '../models/River.js'
import { Station, Observation } from '../models/Station.js'

describe('test filterRiversBySearch function', () => {
	it('should return an empty array if the input is an empty array', () => {
		expect(filterRiversBySearch([], 'search')).toEqual([])
	})

	it('should return the whole array if the input is an empty string', () => {
		expect(filterRiversBySearch([new River({name: 'name', project_id: 'projectId'})], '')).toEqual([new River({name: 'name', project_id: 'projectId'})])
	})

	it('should return an array with the correct river if the input is a substring of the name', () => {
		expect(filterRiversBySearch([new River({name: 'name', project_id: 'projectId'}), new River({name: 'name2', project_id: 'projectId2'})], 'me2')).toEqual([new River({name: 'name2', project_id: 'projectId2'})])
	})

	it('should return an array with the correct river if the input is a substring of the projectId', () => {
		expect(filterRiversBySearch([new River({name: 'name', project_id: 'projectId'}), new River({name: 'name2', project_id: 'projectId2'})], 'projectId2')).toEqual([new River({name: 'name2', project_id: 'projectId2'})])
	})

	it('should return the whole array if the input is a substring of all rivers', () => {
		expect(filterRiversBySearch([new River({name: 'name', project_id: 'projectId'}), new River({name: 'name2', project_id: 'projectId2'})], 'name')).toEqual([new River({name: 'name', project_id: 'projectId'}), new River({name: 'name2', project_id: 'projectId2'})])
	})
})

describe('test filterStationsBySearch function', () => {
	it('should return an empty array if the input is an empty array', () => {
		expect(filterStationsBySearch([], 'search')).toEqual([])
	})

	it('should return the whole array if the input is an empty string', () => {
		expect(filterStationsBySearch([new Station({name: 'name'})], '')).toEqual([new Station({name: 'name'})])
	})

	it('should return an array with the correct station if the input is a substring of the name', () => {
		expect(filterStationsBySearch([new Station({name: 'name'}), new Station({name: 'name2'})], 'me2')).toEqual([new Station({name: 'name2'})])
	})

	it('should return the whole array if the input is a substring of all stations', () => {
		expect(filterStationsBySearch([new Station({name: 'name'}), new Station({name: 'name2'})], 'name')).toEqual([new Station({name: 'name'}), new Station({name: 'name2'})])
	})
})

describe('test filterRiversByDateAndSpecies function', () => {
	it('should return an empty array if the input is an empty array', () => {
		expect(filterRiversByDateAndSpecies([], ['species1'], '2024-01-02', '2024-02-01')).toEqual([])
	})

	it('should return the whole array if the species is the same and the date is inside time range', () => {
		const rivers = [new River({name: 'name', species: ['species1'], start_date: '2024-01-01', end_date: '2024-01-03'})]
		expect(filterRiversByDateAndSpecies(rivers, ['species1'], '2024-01-02', '2024-02-01')).toEqual(rivers)
	})

	it('should return an empty array if the species is not the same', () => {
		const rivers = [new River({name: 'name', species: ['species1'], start_date: '2024-01-01', end_date: '2024-01-03'})]
		expect(filterRiversByDateAndSpecies(rivers, ['species2'], '2024-01-02', '2024-02-01')).toEqual([])
	})

	it('should return an empty array if the date is not inside time range', () => {
		const rivers = [new River({name: 'name', species: ['species1'], start_date: '2024-01-01', end_date: '2024-01-03'})]
		expect(filterRiversByDateAndSpecies(rivers, ['species1'], '2024-01-04', '2024-02-01')).toEqual([])
	})
})

describe('test filterStationsByDateAndSpecies function', () => {
	it('should return an empty array if the input is an empty array', () => {
		expect(filterStationsByDateAndSpecies([], ['species1'], '2024-01-01', '2024-02-01')).toEqual([])
	})

	it('should return the whole array if the species is the same and the date is inside time range', () => {
		const stations = [new Station({name: 'name', species: ['species1'], date: '2024-01-01'})]
		expect(filterStationsByDateAndSpecies(stations, ['species1'], '2024-01-01', '2024-02-01')).toEqual(stations)
	})

	it('should return an empty array if the species is not the same', () => {
		const stations = [new Station({name: 'name', species: ['species1'], date: '2024-01-01'})]
		expect(filterStationsByDateAndSpecies(stations, ['species2'], '2024-01-01', '2024-02-01')).toEqual([])
	})

	it('should return an empty array if the date is not inside time range', () => {
		const stations = [new Station({name: 'name', species: ['species1'], date: '2024-01-01'})]
		expect(filterStationsByDateAndSpecies(stations, ['species1'], '2024-01-02', '2024-02-01')).toEqual([])
	})
})

describe('test filterObservationsBySpecies function', () => {
	it('should return an empty array if the input is an empty array', () => {
		expect(filterObservationsBySpecies([], ['species'])).toEqual([])
	})

	it('should return the whole array if the species is the same', () => {
		const observations = [new Observation({species: 'species1'})]
		expect(filterObservationsBySpecies(observations, ['species1'])).toEqual(observations)
	})

	it('should return an empty array if the species is not the same', () => {
		const observations = [new Observation({species: 'species1'})]
		expect(filterObservationsBySpecies(observations, ['species2'])).toEqual([])
	})
})