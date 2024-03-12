<script>
	import { createEventDispatcher } from 'svelte';
	import { SVG_PATHS } from '../constants/svgPaths';

	export let showModal = false;
	export let message = '';
	export let type; 

	// Dispatcher to close the modal
	const dispatch = createEventDispatcher();

	/**
	 * Closes the modal on click event
	 */
	function handleClose() {
		dispatch('close');
	}

	$: iconPath = type ? SVG_PATHS[type] : SVG_PATHS.close;
</script>

{#if showModal}
	<div class="backdrop" on:click={handleClose}>
	
		<div class="modal" on:click|stopPropagation>
			<img src={iconPath} alt={type} class="icon" />
			<h3>{message}</h3>
			<button class="close" on:click={handleClose}>
				<img src={SVG_PATHS.close} alt="Close" />
			</button>
		</div>
	</div>
{/if}

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
		z-index: 1000;
	}

	.modal {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		width: 90%;
		max-width: 500px;
		max-height: 300px;
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
