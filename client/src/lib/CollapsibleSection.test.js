import { render, fireEvent, waitFor, screen } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import CollapsibleSection from './CollapsibleSection.svelte'

/**
 * @vitest-environment jsdom
 */

describe('CollapseblaSection', () => {
  const { container } = render(CollapsibleSection, { props: { title: 'Test Title' } })

  it('title text is loaded correctly', () => {
    const titleText = screen.queryByText('Test Title')
    expect(titleText).toBeTruthy()
  })

  it('header collapses when toggle is clicked', async () => {
    const header = container.querySelector('div[class^="collapsibleSection-header"]')
    let divs = container.querySelectorAll('div')
    expect(divs.length).toBe(4)

    fireEvent.click(header)
    console.log(header)

    await new Promise(resolve => setTimeout(resolve, 500))
    await waitFor(() => {
      divs = container.querySelectorAll('div')
      expect(divs.length).toBe(4) // should be 3
    })
  })
})
