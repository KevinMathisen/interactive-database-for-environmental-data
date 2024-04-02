import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import HistogramComponent from './HistogramComponent.svelte';

/**
 * @vitest-environment jsdom
 */

describe('HistogramComponent', () => {
  it('HistogramComponent renders correctly', () => {
    const { container } = render(HistogramComponent);

    // Check if the chart container is rendered
    expect(container.querySelector('#fishHistogram')).toBeTruthy();
  });
});