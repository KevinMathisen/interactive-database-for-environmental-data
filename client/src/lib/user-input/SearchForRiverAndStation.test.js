import { render, fireEvent } from '@testing-library/svelte'
import { describe, it, expect } from 'vitest'
import SearchForRiverAndStation from './SearchForRiverAndStation.svelte'
import { River } from '../../models/River'

/**
 * @vitest-environment jsdom
 */

describe('SearchForRiverAndStation', () => {
  it('SearchForRiverAndStation renders correctly with given rivers and stations', async () => {
    const rivers = new Map([
    [1, new River({ id: 1, name: 'River 1', startDate: '2024-01-01' })],
    [2, new River({ id: 2, name: 'River 2', startDate: '2024-01-01' })],
    ])

    const selectedRivers = rivers
    const selectedStations = new Map()

    const stations = new Map()

    const { getByLabelText, getByText } = render(SearchForRiverAndStation, {
    props: { rivers, stations, dataType: 'river', selectedRivers, selectedStations }
    })

    // Check if the choosen rivers is rendered
    expect(getByText('Valgte elver')).toBeTruthy()

    // Check if the correct river is shown
    expect(getByText('River 1 2024-01-01')).toBeTruthy()
  })
})
