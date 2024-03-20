import { render, fireEvent, waitFor, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import DateInput from './DateInput.svelte';

/**
 * @vitest-environment jsdom
 */

describe('DateInput', () => {
    it('Component loads correctly, and date values update based on input', async () => {
      let selectedStartDate = '';
      let selectedEndDate = '';
      const { getByLabelText } = render(DateInput, { 
        props: { 
          selectedStartDate, 
          selectedEndDate 
        } 
      });
  
      const startDateInput = getByLabelText('Fra');
      const endDateInput = getByLabelText('Til');
  
      await fireEvent.input(startDateInput, { target: { value: '2022-01-01' } });
      await fireEvent.input(endDateInput, { target: { value: '2022-12-31' } });
  
      expect(startDateInput.value).toBe('2022-01-01');
      expect(endDateInput.value).toBe('2022-12-31');
    });
  });