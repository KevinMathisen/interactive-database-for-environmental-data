import { cleanup, render } from '@testing-library/svelte'
import { afterEach, describe, expect, it } from 'vitest'
import Filter from './Filter.svelte'

/**
 * @vitest-environment jsdom
 */

describe('Filter', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders correctly', () => {
    const { container } = render(Filter, { props: { selectableSpecies: [] } })
    expect(container).toMatchSnapshot()
  })

  it('renders child components', () => {
    const { getByText } = render(Filter, { props: { selectableSpecies: [] } })

    // Checking if the child components are rendered
    expect(getByText('Type data')).not.toBeNull()
    expect(getByText('Dato')).not.toBeNull()
    expect(getByText('Art')).not.toBeNull()
  })
})
