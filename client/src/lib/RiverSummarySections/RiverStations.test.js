import { render } from '@testing-library/svelte'
import { describe, it, expect } from 'vitest'
import RiverStations from './RiverStations.svelte'
import { Station } from '../../models/Station'

/**
 * @vitest-environment jsdom
 */

describe('RiverStations', () => {
  it('renders correctly with given stations', async () => {
    const stations = new Map([
      [1, new Station({
        id: '1',
        name: 'River 11',
        secFished: 60,
        observations: [
          { species: 'laks', count: 10 },
          { species: 'ørret', count: 20 }
        ]
      })],
      [2, new Station({
        id: '2',
        name: 'River 22',
        secFished: 120,
        observations: [
          { species: 'laks', count: 20 },
          { species: 'ørret', count: 40 }
        ]
      })]
    ])

    const { getByText } = render(RiverStations, { props: { stations } })

    // Check if the stations are rendered correctly
    expect(getByText('11')).toBeTruthy()
    expect(getByText('22')).toBeTruthy()
  })
})
