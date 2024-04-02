import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import PieChartComponent from './PieChartComponent.svelte';

/**
 * @vitest-environment jsdom
 */

describe('PieChartComponent', () => {
  it('PieChartComponent renders correctly', () => {
    const { container } = render(PieChartComponent);

    // Check if the chart container is rendered
    expect(container.querySelector('#sectorOne')).toBeTruthy();
  });
});