import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import BoxPlotComponent from './BoxPlottComponent.svelte';

/**
 * @vitest-environment jsdom
 */

describe('BoxPlotComponent', () => {
  it('renders correctly', () => {
    const { container } = render(BoxPlotComponent);

    // Check if the chart container is rendered
    expect(container.querySelector('#boxPlot')).toBeTruthy();
  });
});