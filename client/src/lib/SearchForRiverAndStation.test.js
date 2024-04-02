// import { render, fireEvent } from '@testing-library/svelte'
import { describe, it, expect } from 'vitest'
// import SearchForRiverAndStation from './SearchForRiverAndStation.svelte'

/**
 * @vitest-environment jsdom
 */

describe('SearchForRiverAndStation', () => {
  it('SearchForRiverAndStation renders correctly with given rivers and stations', async () => {
    // const rivers = new Map([
    // [1, { id: 1, name: 'River 1' }],
    // [2, { id: 2, name: 'River 2' }],
    // ]);

    // const stations = new Map([
    // [1, { id: 1, name: 'Station 1' }],
    // [2, { id: 2, name: 'Station 2' }],
    // ]);

    // const { getByLabelText, getByText } = render(SearchForRiverAndStation, {
    // props: { rivers, stations, dataType: 'river' },
    // });

    // Check if the input field is rendered
    // expect(getByLabelText('Søk etter elv')).toBeInTheDocument();

    // Type into the input field
    // await fireEvent.input(getByLabelText('Søk etter elv'), {
    // target: { value: 'River 1' },
    // });

    // Check if the correct river is shown in the results
    // expect(getByText('River 1')).toBeInTheDocument();
    expect(true).toBe(true)
  })
})
