<!-- SuccessMessage.svelte -->
<script>
	import { errorStore } from '../store/successStore.js';
	import Modal from './Modal.svelte.js';
	import { onDestroy } from 'svelte';
	import { get } from 'svelte/store';

	export let status;

	let showModal = true;
	let successMessage = '';
	let symbolPath = '';
	let closePath = '';

	const unsubscribeSuccess = successStore.subscribe((successes) => {
		if (successes[status]) {
			successMessage = successes[status].message;
			symbolPath = successes[status].symbolPath;
			closePath = successes[status].closePath;
		}
	});

	onDestroy(() => {
		unsubscribeSuccess();
	});

	function handleClose() {
		showModal = false;
	}
</script>

{#if showModal}
	<Modal
		{showModal}
		message={successMessage}
		{status}
		symbol={symbolPath}
		close={closePath}
		on:close={handleClose}
	/>
{/if}
