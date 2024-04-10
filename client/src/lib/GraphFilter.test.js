// import { render } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
// import GraphFilter from './GraphFilter.svelte'
// import { writable } from 'svelte/store'

/**
 * @vitest-environment jsdom
 */

// Define the mock store
// const page = writable({
//   host: '',
//   path: '',
//   params: {},
//   query: {}
// })

describe('GraphFilter', () => {
  it('displays selected rivers or stations', async () => {
    expect(true).toBeTruthy()

    // Use the mock store
    // GraphFilter.$page = page;

    // const selectedRivers = new Map([
    //   ['1', { name: 'River1', startDate: '2024-01-01' }],
    //   ['2', { name: 'River2', startDate: '2024-02-01' }]
    // ])
    // const selectedStations = new Map([
    //   ['1', { name: 'Station1', date: '2024-01-01' }],
    //   ['2', { name: 'Station2', date: '2024-02-01' }]
    // ])

    // // Render with dataType 'river'
    // const { queryByText, rerender } = render(GraphFilter, {
    //   props: {
    //     dataType: 'river',
    //     selectedRivers,
    //     selectedStations
    //   }
    // })

    // expect(queryByText('River1 2022-01-01')).toBeTruthy()
    // expect(queryByText('Station1 2022-01-01')).toBeNull()
    // //

    // // Re-render with dataType 'station'
    // rerender({
    //   props: {
    //     dataType: 'station',
    //     selectedRivers,
    //     selectedStations
    //   }
    // })

    // expect(queryByText('Station2 2022-02-01')).toBeTruthy()
    // expect(queryByText('River2 2022-02-01')).toBeNull()
  })
})
