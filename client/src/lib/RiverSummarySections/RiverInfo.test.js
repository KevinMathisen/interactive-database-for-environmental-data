import { render } from '@testing-library/svelte'
import { describe, it, expect } from 'vitest'
import { Station } from '../../models/Station'
import RiverInfo from './RiverInfo.svelte'

/**
 * @vitest-environment jsdom
 */

describe('RiverInfo', () => {
  it('renders correctly with given stations', () => {

    const stations = new Map([
      [1, new Station({ id: '1', secFished: 60, observations: [
          { species: 'laks', count: 10 },
          { species: 'ørret', count: 20 },
      ] })]
    ])
    const river = {
      waterFlow: 1,
      crew: ['crew1', 'crew2'],
      boatType: 'boatType',
      comment: 'comment'
    }

    const { getByText } = render(RiverInfo, { props: { river, stations } })

    // Check if the amount of stations is rendered correctly
    expect(getByText('Antall stasjoner: 1')).toBeTruthy()

    // Check if the total fish caught is rendered correctly
    expect(getByText('Fisk fanget: 30 stk')).toBeTruthy()

    // Check if the total time spent fishing is rendered correctly
    expect(getByText('Tid fisket: 1 min 0 sek')).toBeTruthy()

    // Check if the fish per minute is rendered correctly
    expect(getByText('Fisk per min: 30.00 stk/min')).toBeTruthy()

    expect(1 + 1).toBe(2)
  })
})
