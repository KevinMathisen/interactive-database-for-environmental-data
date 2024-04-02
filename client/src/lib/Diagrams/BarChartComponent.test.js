import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import BarChartComponent from './BarChartComponent.svelte';

/**
 * @vitest-environment jsdom
 */


describe('BarChartComponent', () => {
    it('renders correctly', () => {
        const { container } = render(BarChartComponent);

        // Check if the chart container is rendered
        expect(container.querySelector('#barAloneOne')).toBeTruthy();
    });
});