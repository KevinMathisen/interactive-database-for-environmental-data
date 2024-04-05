import { render } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import { River } from '../models/River.js'
import { Station } from '../models/Station.js'
import LeafletMap from './LeafletMap.svelte'

/**
 * @vitest-environment jsdom
 */

describe('LeafletMap', () => {
  it('map renders without causing error', () => {
    const rivers = []
    const stations = []
    const dataType = 'station'
    const selectedRiver = new River()
    const selectedStation = new Station()

    const { container } = render(LeafletMap, {
      props: {
        rivers,
        stations,
        dataType,
        selectedRiver,
        selectedStation
      }
    })

    expect(container).toBeTruthy()
  })
})
