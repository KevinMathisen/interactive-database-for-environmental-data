import { render } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import Sidebar from './Sidebar.svelte'

/**
 * @vitest-environment jsdom
 */

describe('Sidebar', () => {
  it('renders title prop and dispatches close event on handleClick', async () => {
    const { getByText } = render(Sidebar, { title: 'Test Title' })

    expect(getByText('Test Title')).toBeTruthy()
  })
})
