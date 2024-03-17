<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let title = ''; 
	export let typeClose = '';	// which way to close the sidebar, "cross" or "sideButton"

	/**
	 *
	 */
	function handleClick() {
		dispatch('close');
		console.log('Close');
	}
</script>

<div class=sidebarContainer>
	<!-- Header with title and optional close button -->
	<div class="header">
		<h1>{title}</h1>
		{#if typeClose === 'cross'}
			<div class="crossButton" on:click={handleClick}></div>
		{/if}
	</div>

	<!-- Main content -->
	<div class=mainContent>
		<slot></slot>
	</div>

	<!-- Optional close button on side -->
	{#if typeClose == 'sideButton'}
		<button class="sideButton" on:click={handleClick}>&gt;</button>
	{/if}
</div>

<style>
	.sidebarContainer {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		background-color: white;
		border-left: 1px solid black;
		border-right: 1px solid black;
		z-index: 2000;
		position: relative;
	}

	.header {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
        height: 60px;
        background-color: #435768;
        color: white;
        position: relative;
        margin-top: 0px;
        margin-bottom: 0px;
    }

	h1 {
		font-size: 2rem;
		width: 100%;
		margin: 0px;
		text-align: center;

	}

	.mainContent {
		width: 100%;
		height: calc(100% - 60px);
	}

	.sideButton {
      position: absolute;
      right: -35px;
      top: 50%;
      transform: translateY(-50%);
      height: 80px;
      width: 35px;
      background-color: white;
      border: 1px solid black;
      border-radius: 0 1rem 1rem 0;
      font-size: 2rem;
      font-weight: lighter;
      transition: transform 1.5s ease;    
      z-index: 1000;                       /* Makes the button overlap the map*/
      cursor: pointer;
    }
  
    .sideButton:hover {
      background-color: #435768;
    }

	/* Container for the close symbol */
	.crossButton {
		position: absolute;
		top: 0;
		right: 0;
		width: 40px; 
		height: 40px; 
		opacity: 1; 
		background-color: transparent; 
		cursor: pointer; 
		position: relative; 
		margin-right: 10px;
	}

	/* Creates lines for the cross */
	.crossButton::before, .crossButton::after {
		content: ' '; /* Necessary to display the pseudo-elements */
		position: absolute; 
		height: 3px; 
		width: 100%; 
		top: 50%; 
		left: 0;
		background-color: white;
	}
	.crossButton::before {
		transform: rotate(45deg);
	}
	.crossButton::after {
		transform: rotate(-45deg);
	}
</style>