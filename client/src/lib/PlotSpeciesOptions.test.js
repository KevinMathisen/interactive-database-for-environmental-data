import { render, fireEvent } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import PlotSpeciesOptions from './PlotSpeciesOptions.svelte';

/**
 * @vitest-environment jsdom
 */

describe('PlotSpeciesOptions', () => {
  it('binds showPlotA prop to checkbox', async () => {
    const { getByLabelText } = render(PlotSpeciesOptions, { showPlotA: false });
    const checkbox = getByLabelText('Vis');

    await fireEvent.click(checkbox);

    expect(checkbox.checked).toBe(true);
  });
});