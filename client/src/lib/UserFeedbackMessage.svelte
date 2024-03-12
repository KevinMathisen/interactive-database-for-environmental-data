<script>
	//import { use } from 'express/lib/application.js';
	import { userFeedbackStore } from '../stores/userFeedbackStore.js';
	import Modal from './Modal.svelte';
	import { onDestroy } from 'svelte';
	//import { get } from 'svelte/store';

	let type = '';

	let showModal = false;
	let userFeedbackMessage = '';

	$: userFeedback = $userFeedbackStore;

	function handleUserFeedback(userFeedback) {
		if (userFeedback.length > 0) {
			userFeedbackMessage = userFeedback[0].message;
			type = userFeedback[0].type;
      console.log(userFeedback);
			showModal = true;
		}
	}

	$: handleUserFeedback(userFeedback);

	function handleClose() {
		showModal = false;
	}
</script>

{#if showModal}
	<Modal {showModal} message={userFeedbackMessage} {type} on:close={handleClose} />
{/if}


