<script>
	import { userFeedbackStore } from '../store/userFeedbackStore.js';
	import Modal from './Modal.svelte';
	import { onDestroy } from 'svelte';
	//import { get } from 'svelte/store';

	export let type;

	let showModal = true;
	let userFeedbackMessage = '';

	const unsubscribeFeedback = userFeedbackStore.subscribe((feedback) => {
		if (feedback[type]) {
			userFeedbackMessage = feedback[type].message;
		}
	});

	onDestroy(() => {
		unsubscribeFeedback();
	});

	function handleClose() {
		showModal = false;
	}
</script>

{#if showModal}
	<Modal {showModal} message={userFeedbackMessage} {type} on:close={handleClose} />
{/if}
