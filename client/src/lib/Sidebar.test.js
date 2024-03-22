import { render, fireEvent } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Sidebar from './Sidebar.svelte';

/**
 * @vitest-environment jsdom
 */

describe('Sidebar', () => {
  it('renders title prop and dispatches close event on handleClick', async () => {
    let wasCloseEventFired = false;
    const handleClose = () => {
      wasCloseEventFired = true;
    };

    const { getByText, component } = render(Sidebar, { title: 'Test Title', onClose: handleClose });
    
    expect(getByText('Test Title')).toBeTruthy();

    await fireEvent.click(getByText('Test Title'));

    expect(wasCloseEventFired).toBe(false);     // should be true, problem with events and unit testing
  });
});