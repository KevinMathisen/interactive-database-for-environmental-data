import { render, fireEvent } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import PlotLengthOptions from './PlotLengthOptions.svelte'

/**
 * @vitest-environment jsdom
 */

describe('PlotLengthOptions', () => {
  const { getByLabelText, getByPlaceholderText } =
  render(PlotLengthOptions, { showPlotB: false, intervallPlotB: 0, plotTypeB: 'histogram', combineSpecies: false })
  it('binds showPlotB prop to checkbox', async () => {
    const checkbox = getByLabelText('Vis')

    await fireEvent.click(checkbox)

    expect(checkbox.checked).toBe(true)
  })

  it('binds intervallPlotB prop to number input', async () => {
    const numberInput = getByPlaceholderText('mm')

    await fireEvent.input(numberInput, { target: { value: '10' } })

    expect(numberInput.value).toBe('10')
  })

  it('binds plotTypeB prop to radio input', async () => {
    const radioInput = getByLabelText('Histogram')

    await fireEvent.click(radioInput)

    expect(radioInput.checked).toBe(true)
  })
})
