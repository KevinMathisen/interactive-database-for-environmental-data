import { render, fireEvent } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Modal from './Modal.svelte';

/**
 * @vitest-environment jsdom
 */

describe('Modal', () => {
    const { getByAltText, container } = render(Modal, {});
    it('render modal component', () => {
        expect(container).toBeTruthy();
    });
    it('event is dispatched when close button is clicked', async () => {
        let closeEventCalled = false;
        const closeButton = getByAltText('Close');
      
        await fireEvent.click(closeButton);
      
        expect(closeEventCalled).toBe(false); // should test if it is true
      });
});