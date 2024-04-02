import { render } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import Filter from './filter.svelte'

/**
 * @vitest-environment jsdom
 */

describe('Filter', () => {
  it('species loads correctly', async () => {
    const selectableSpecies = ['species1', 'species2', 'species3']

    const { getByRole } = render(Filter, { props: { selectableSpecies } })

    const list = getByRole('list')

    expect(list.childElementCount).toEqual(3)
  })
})
