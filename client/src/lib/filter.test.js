import { render, fireEvent } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Filter from './Filter.svelte';

/**
 * @vitest-environment jsdom
 */

describe('Filter', () => {
  it('species loads correctly', async () => {
    const selectableSpecies = ['species1', 'species2', 'species3'];

    const { component, getByRole } = render(Filter, { props: {selectableSpecies} });

    const list = getByRole('list');

    expect(list.childElementCount).toEqual(3);

  });
});