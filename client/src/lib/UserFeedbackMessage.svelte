<script>
	import { userFeedbackStore } from '../stores/userFeedbackStore.js';
	import Modal from './Modal.svelte';
	import { SVG_PATHS } from '../constants/svgPaths';

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
	<Modal on:close={handleClose}>
		<img src={type ? SVG_PATHS[type] : SVG_PATHS.close} alt={type} class="icon" />
		<h3>{userFeedbackMessage}</h3>
	</Modal>
{/if}
