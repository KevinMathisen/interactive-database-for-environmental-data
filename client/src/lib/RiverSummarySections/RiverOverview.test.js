import { render } from '@testing-library/svelte';
import { describe, it, expect} from 'vitest';
import RiverOverview from './RiverOverview.svelte';

/**
 * @vitest-environment jsdom
 */

describe('RiverOverview', () => {
  it('renders correctly with given river data', () => {
    const river = {
      startDate: '2022-01-01',
      endDate: '2022-01-31',
      projectId: '12345',
    };

    const { getByText } = render(RiverOverview, { props: { river } });

    // Check if the start and end dates are rendered correctly
    expect(getByText('2022-01-01 - 2022-01-31')).toBeTruthy();

    // Check if the project ID is rendered correctly
    expect(getByText('Prosjektnummer: 12345')).toBeTruthy();
  });
});