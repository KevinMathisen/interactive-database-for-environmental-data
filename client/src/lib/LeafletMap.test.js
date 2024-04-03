import { render } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import LeafletMap from './LeafletMap.svelte'

/**
 * @vitest-environment jsdom
 */

describe('LeafletMap', () => {
  it('map renders without causing error', () => {
    const stations = []
    const rivers = []
    const dataType = 'station'

    const { container } = render(LeafletMap, {
      props: {
        stations,
        rivers,
        dataType
      }
    })

    expect(container).toBeTruthy()
  })
})
