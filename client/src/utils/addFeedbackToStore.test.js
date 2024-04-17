import { describe, it, expect, vi, beforeEach } from 'vitest'
import { addFeedbackToStore } from './addFeedbackToStore'
import { userFeedbackStore } from '../stores/userFeedbackStore'
import { FEEDBACK_TYPES, FEEDBACK_CODES, FEEDBACK_MESSAGES } from '../constants/feedbackMessages'
import { UserFeedback } from '../models/UserFeedback'
import { get } from 'svelte/store'

// Mocking the userFeedbackStore
vi.mock('../stores/userFeedbackStore', () => ({
  userFeedbackStore: {
    subscribe: vi.fn(),
    update: vi.fn(),
    set: vi.fn()
  }
}))

// Mocking get(...) from svelte/store
vi.mock('svelte/store', () => ({
  get: vi.fn(),
  writable: vi.fn(() => ({
    subscribe: vi.fn(),
    set: vi.fn(),
    update: vi.fn()
  }))
}))

describe('test addFeedbackToStore function', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('should not add a feedback message to the userFeedbackStore when a message of same type exists', () => {
    const type = FEEDBACK_TYPES.ERROR
    const code = FEEDBACK_CODES.POSTGREST_UNAVAILABLE
    const message = FEEDBACK_MESSAGES.POSTGREST_UNAVAILABLE
    const feedback = new UserFeedback(type, code, message)
    const currentFeedback = [feedback]

    // Mock get
    vi.mocked(get).mockReturnValue(currentFeedback)

    addFeedbackToStore(type, code, message)

    // assert
    expect(userFeedbackStore.update).not.toHaveBeenCalled()
  })

  it('should add an error message to the userFeedbackStore when no message of same type exists', () => {
    const type = FEEDBACK_TYPES.ERROR
    const code = FEEDBACK_CODES.POSTGREST_UNAVAILABLE
    const message = FEEDBACK_MESSAGES.POSTGREST_UNAVAILABLE
    const feedback = new UserFeedback(type, code, message)
    const currentFeedback = []
    const expectedFeedback = [feedback]

    // Mock get
    vi.mocked(get).mockReturnValue(currentFeedback)

    // capture updates
    let capturedUpdate
    userFeedbackStore.update.mockImplementationOnce(updateFn => {
      capturedUpdate = updateFn
    })

    addFeedbackToStore(type, code, message)

    // assert
    expect(userFeedbackStore.update).toHaveBeenCalledTimes(1)
    expect(capturedUpdate(currentFeedback)).toEqual(expectedFeedback)
  })

  it('should add a success message to the userFeedbackStore', () => {
    const type = FEEDBACK_TYPES.SUCCESS
    const code1 = FEEDBACK_CODES.CREATED
    const code2 = FEEDBACK_CODES.INFO
    const message = FEEDBACK_MESSAGES.CREATED
    const feedback = new UserFeedback(type, code1, message)
    const feedback2 = new UserFeedback(type, code2, message)
    const currentFeedback = [feedback2]
    const expectedFeedback = [feedback2, feedback]

    // Mock get
    vi.mocked(get).mockReturnValue(currentFeedback)

    // capture updates
    let capturedUpdate
    userFeedbackStore.update.mockImplementationOnce(updateFn => {
      capturedUpdate = updateFn
    })

    addFeedbackToStore(type, code1, message)

    // assert
    expect(userFeedbackStore.update).toHaveBeenCalledTimes(1)
    expect(capturedUpdate(currentFeedback)).toEqual(expectedFeedback)
  })
})
