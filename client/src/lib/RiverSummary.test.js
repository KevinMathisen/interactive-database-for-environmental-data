import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import RiverSummary from './RiverSummary.svelte';
import { River } from '../models/River.js';

/**
 * @vitest-environment jsdom
 */


 // uses page store
//describe('RiverSummary', () => {
  //it('renders CollapsibleSection and RiverOverview with correct props', () => {
    //const river = new River();
    //river.name = 'Test River';

    //const { getByText } = render(RiverSummary, { river });

    //expect(getByText('Test River')).toBeTruthy();
  //});
//});