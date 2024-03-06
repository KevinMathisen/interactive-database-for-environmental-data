<script>
	import { createEventDispatcher } from 'svelte';

	export let showModal = false;
	export let message;
	export let status;
	export let symbol; 
	export let close;

	const dispatch = createEventDispatcher();

	function handleClose() {
		dispatch('close');
	}
</script>

{#if showModal}
	<div class="backdrop" on:click={handleClose}>
		<div class="modal" on:click|stopPropagation>
			{#if status === 'failed-to-load' || status === 'not-authenticated' || status === "wrong-fileformat" || status === "no-element-chosen" || status === "authentication-failed"}
				<div class="message">
					<span class="symbol">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="red"
							version="1.1"
							width="100px"
							height="100px"
							viewBox="0 0 45.311 45.311"
						>
							<g>
								<path d={symbol} />
							</g>
						</svg>
					</span>
					<h3>{message}</h3>
					<span class="close" on:click={handleClose}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
						>
							<rect width="16" height="16" fill="none" />
							<polygon points={close} fill="black" />
						</svg>
					</span>					
				</div>
			{:else}
				<span class="symbol">
					<svg 
						xmlns="http://www.w3.org/2000/svg" 
						width="100px"
						height="100px"
						viewBox="0 0 1024 1024"
					>
						<path fill="green" d={symbol} />
					</svg>
				</span>
				<h3>{message}</h3>
				<span class="close" on:click={handleClose}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
					>
						<rect width="16" height="16" fill="none" />
						<polygon points={close} fill="black" />
					</svg>
				</span>
				
			{/if}
		</div>
	</div>
{/if}


<style>
.backdrop {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(169, 169, 169, 0.9);
  z-index: 1000; 
}

.modal {
  position: relative; 
  width: 90%; 
  max-width: 400px; 
  height: auto; 
  max-height: 200px;
  border-radius: 10px;
  background-color: white;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 1); 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.modal .close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  padding: 10px; 
}

.modal .close svg {
  height: 40px;
  width: 40px;
}

.symbol svg {
  height: 100px; 
  width: auto; 
}

.modal h3 {
  text-align: center;
}

.message {
  text-align: center;
  margin-top: 20px;
}
</style>
