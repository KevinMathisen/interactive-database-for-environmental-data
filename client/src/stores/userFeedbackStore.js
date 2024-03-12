import { writable } from 'svelte/store'

export const userFeedbackStore = writable({
  message: '',
  type: ''
});

