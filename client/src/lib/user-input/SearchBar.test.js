import { render, fireEvent } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import SearchBar from './SearchBar.svelte'

/**
 * @vitest-environment jsdom
 */

describe('SearchBar', () => {
  it('binds searchQuery prop to search input', async () => {
    const { getByPlaceholderText } = render(SearchBar, { searchQuery: '', dataType: 'river' })

    const searchInput = getByPlaceholderText('Søk etter Elv navn')
    await fireEvent.input(searchInput, { target: { value: 'test query' } })

    expect(searchInput.value).toBe('test query')
  })
})
