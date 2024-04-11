import { userFeedbackStore } from '../stores/userFeedbackStore'
import { UserFeedback } from '../models/UserFeedback'
import { get } from 'svelte/store'

/**
 * Adds a feedback message to the userFeedbackStore which will be displayed to the user
 * Can either be an error message, info, or a success message
 * @param {string} type - The type of feedback (error, info, success)
 * @param {string} code - The code of the feedback
 * @param {string} message - The message to display to the user
 */
export function addFeedbackToStore (type, code, message) {
  // Dont add feedback if feedback with same code is already displayed
  if (get(userFeedbackStore).some(f => f.code === code) ) {
    return
  }

  // Create a new feedback object
  const feedback = new UserFeedback(type, code, message)

  // Add the feedback to the store
  userFeedbackStore.update(currentFeedback => [...currentFeedback, feedback])
}
