import { render, fireEvent } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import RadioInput from './RadioInput.svelte';

/**
 * @vitest-environment jsdom
 */

describe('RadioInput', () => {
  it('renders options and binds selected prop to radio inputs', async () => {
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ];
    const { getByLabelText, component } = render(RadioInput, { name: 'test', options, selected: 'option1' });
    
    const radioInput1 = getByLabelText('Option 1');
    const radioInput2 = getByLabelText('Option 2');

    expect(radioInput1.checked).toBe(true);
    expect(radioInput2.checked).toBe(false);

    await fireEvent.click(radioInput2);

    // Rerender the component with the updated prop
    component.$set({ selected: 'option2' });

    expect(radioInput1.checked).toBe(false);
    expect(radioInput2.checked).toBe(true);
  });
});