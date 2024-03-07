import { userFeedbackStore } from "../stores/userFeedbackStore";
import { UserFeedback } from "../models/userFeedback";

export function addFeedbackToStore(code, message) {
	const feedback = new UserFeedback(code, message);
	userFeedbackStore.update(currentFeedback => [...currentFeedback, feedback]);
}
