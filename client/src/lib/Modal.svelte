<script>
	import { createEventDispatcher } from 'svelte'; 
	import { SVG_PATHS } from '../constants/svgPaths';

	// Dispatcher to close the modal
	const dispatch = createEventDispatcher();

	export let large = false;

	let width;
	let height;

	/**
	 * Closes the modal on click event
	 */
	function handleClose() {
		dispatch('close');
	}

	function handleKeyDown(event) {
		if (event.key === 'Enter' || event.key === 'Escape') {
			handleClose();
		}
	}

	$: width = large ? 800 : 500;
	$: height = large ? 500 : 300;

</script>


<div class="backdrop" on:click|self={handleClose} on:keydown={handleKeyDown} role="presentation">
	<div class="modal" style="width: {width}px; height: {height}px;">
		<slot></slot>
		<button class="close" on:click={handleClose}>
			<img src={SVG_PATHS.close} alt="Close" />
		</button>
	</div>
</div>


<style>
	.backdrop {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 9000;
	}

	.modal {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		width: 90%;
		padding: 20px;
		background-color: #fff;
		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	}

	.modal h3 {
		margin: 20px 0;
		text-align: center;
		color: #333;
		font-size: 1.5rem;
	}

	.icon {
		width: 48px;
		height: 48px;
	}

	.close {
		position: absolute;
		top: 10px;
		right: 10px;
		width: 30px;
		height: 30px;
		background: none;
		border: none;
		cursor: pointer;
	}

	.close img {
		width: 100%;
		height: 100%;
	}

	.success-icon {
		fill: green;
	}

	.error-icon {
		fill: red;
	}

	@media (max-width: 600px) {
		.modal {
			max-width: 90%;
			padding: 15px;
		}

		.modal h3 {
			font-size: 1.2rem;
		}
	}
</style>
