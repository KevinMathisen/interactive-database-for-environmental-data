import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Button from './Button.svelte';
import { writable } from 'svelte/store';

/**
 * @vitest-environment jsdom
 */

        // this test doesnt work properly, cant utilize the mock store ($page)

//describe('Button', () => {
  //it('button loaded correctly', () => {
    // Mock $page store behavior
    //const $page = writable({ url: { pathname: '#' } });

    // Render Button component with mocked $page store
    //render(Button, { props: { page: $page } });

    // Assert button presence
    //const button = screen.getByRole('button');
    //expect(button).toBeInTheDocument();
  //});
//});
