import { render } from '@testing-library/svelte'
import { describe, it, expect } from 'vitest'
import BarChart2Component from './BarChart2Component.svelte'

/**
 * @vitest-environment jsdom
 */

describe('BarChart2Component', () => {
  it('BarChart2Component renders correctly', () => {
    const { container } = render(BarChart2Component)

    // Check if the chart container is rendered
    expect(container.querySelector('#barGroupOne')).toBeTruthy()
  })
})
