import { describe, it, expect } from 'vitest'
import { 
  formatRiversForTable,
  formatStationsForTable
} from './formatData.js'
import { River } from '../models/River.js'
import { Station } from '../models/Station.js'

describe('test formatRiversForTable function', () => {
  it('should return headers and an empty rows array if the input map is empty', () => {
    const formatted = formatRiversForTable(new Map());
    expect(formatted.headers).toEqual(['Navn', 'Dato', 'Projektnummer']);
    expect(formatted.rows).toEqual([]);
  })

  it('should correctly convert river objects into arrays for table display', () => {
    const rivers = new Map([
      [0, new River({ id: '1', name: 'Name1', start_date: '2024-01-01', project_id: 'prosjekt1' })],
      [1, new River({ id: '2', name: 'Name2', start_date: '2024-01-15', project_id: 'prosjekt2' })]
    ]);
    const formatted = formatRiversForTable(rivers);
    expect(formatted.headers).toEqual(['Navn', 'Dato', 'Projektnummer']);
    expect(formatted.rows).toEqual([
      ['1', 'Name1', '2024-01-01', 'prosjekt1'],
      ['2', 'Name2', '2024-01-15', 'prosjekt2']
    ]);
  })
})
  
describe('test formatStationsForTable function', () => {
  it('should return headers and an empty rows array if the input map is empty', () => {
    const formatted = formatStationsForTable(new Map());
    expect(formatted.headers).toEqual(['Navn', 'Dato', 'Kl.']);
    expect(formatted.rows).toEqual([]);
  })

  it('should correctly convert station objects into arrays for table display', () => {
    const stations = new Map([
      [0, new Station({ id: '1', name: 'Navn1', date: '2024-01-01', time: '12:00' })],
      [1, new Station({ id: '2', name: 'Navn2', date: '2024-01-15', time: '13:00' })]
    ]);
    const formatted = formatStationsForTable(stations);
    expect(formatted.headers).toEqual(['Navn', 'Dato', 'Kl.']);
    expect(formatted.rows).toEqual([
      ['1', 'Navn1', '2024-01-01', '12:00'],
      ['2', 'Navn2', '2024-01-15', '13:00']
    ]);
  })
})
  