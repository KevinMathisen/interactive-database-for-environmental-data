import { writable } from 'svelte/store'

export const authStore = writable({
  authenticated: false,
  username: null
})