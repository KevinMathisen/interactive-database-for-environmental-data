import { FEEDBACK_TYPES, FEEDBACK_CODES, FEEDBACK_MESSAGES } from '../constants/feedbackMessages';

export class UserFeedback {
  constructor (type = FEEDBACK_TYPES.ERROR, code = FEEDBACK_CODES.GENERIC, message = FEEDBACK_MESSAGES.GENERIC) {
    this.type = type;
    this.code = code;
    this.message = message;
  }
}
