import { userFeedbackStore } from "../stores/userFeedbackStore";

export function addFeedbackToStore(feedback) {
	userFeedbackStore.update(currentFeedback => [...currentFeedback, feedback]);
}
