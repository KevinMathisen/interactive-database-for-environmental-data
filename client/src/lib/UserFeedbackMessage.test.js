import { render, fireEvent } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
// import { get } from 'svelte/store'
import { userFeedbackStore } from '../stores/userFeedbackStore.js'
import UserFeedbackMessage from './UserFeedbackMessage.svelte'

/**
 * @vitest-environment jsdom
 */

describe('UserFeedbackMessage', () => {
  it('renders correctly and handles close event', async () => {
    // Set up the userFeedbackStore
    userFeedbackStore.set([{ message: 'Test message', type: 'info' }])

    const { getByText, getByAltText } = render(UserFeedbackMessage)

    // Check if the feedback message is rendered correctly
    expect(getByText('Test message')).toBeTruthy()

    // Check if the feedback type is rendered correctly
    expect(getByAltText('info')).toBeTruthy()

    // Simulate the close event
    await fireEvent.click(getByAltText('info'))
  })
})
