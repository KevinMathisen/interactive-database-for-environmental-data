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

