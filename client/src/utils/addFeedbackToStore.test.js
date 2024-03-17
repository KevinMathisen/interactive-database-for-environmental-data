import { describe, it, expect, vi, beforeEach } from 'vitest';
import { addFeedbackToStore } from './addFeedbackToStore';
import { userFeedbackStore } from '../stores/userFeedbackStore';
import { FEEDBACK_TYPES, FEEDBACK_CODES, FEEDBACK_MESSAGES } from '../constants/feedbackMessages';
import { UserFeedback } from '../models/UserFeedback';

vi.mock('../stores/userFeedbackStore', () => ({
  userFeedbackStore: {
    subscribe: vi.fn(),
    update: vi.fn(),
    set: vi.fn()
  }
}));

describe('test addFeedbackToStore function', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('should add an error message to the userFeedbackStore', () => {
    const type = FEEDBACK_TYPES.ERROR;
    const code = FEEDBACK_CODES.POSTGREST_UNAVAILABLE;
    const message = FEEDBACK_MESSAGES.POSTGREST_UNAVAILABLE;
    const feedback = new UserFeedback(type, code, message);
    const currentFeedback = [];
    const expectedFeedback = [feedback];

    // capture updates
    let capturedUpdate;
    userFeedbackStore.update.mockImplementationOnce(updateFn => {
      capturedUpdate = updateFn;
    });

    addFeedbackToStore(type, code, message);

    // assert
    expect(userFeedbackStore.update).toHaveBeenCalledTimes(1);
    expect(capturedUpdate(currentFeedback)).toEqual(expectedFeedback);
  });

  it('should add a success message to the userFeedbackStore', () => {
    const type = FEEDBACK_TYPES.SUCCESS;
    const code = FEEDBACK_CODES.CREATED;
    const message = FEEDBACK_MESSAGES.CREATED;
    const feedback = new UserFeedback(type, code, message);
    const feedback2 = new UserFeedback(type, code, message);
    const currentFeedback = [feedback2];
    const expectedFeedback = [feedback2, feedback];

    // capture updates
    let capturedUpdate;
    userFeedbackStore.update.mockImplementationOnce(updateFn => {
      capturedUpdate = updateFn;
    });

    addFeedbackToStore(type, code, message);

    // assert
    expect(userFeedbackStore.update).toHaveBeenCalledTimes(1);
    expect(capturedUpdate(currentFeedback)).toEqual(expectedFeedback);
  });
});
