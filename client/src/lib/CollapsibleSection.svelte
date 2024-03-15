<script>
	import { fly } from "svelte/transition";

	export let title = "";
	export let collapsable = true;

	let isCollapsed = false;

	function toggleCollapse() {
		if (!collapsable) return;

		isCollapsed = !isCollapsed;
	}
</script>

<div class=collapsibleSection>
	<div class=collapsibleSection-header on:click={toggleCollapse}>
		{#if collapsable}
			<i class="arrow" class:collapsed={isCollapsed} class:not-collapsed={!isCollapsed}></i>
		{/if}
		<h3>{title}</h3>
	</div>
	{#if !isCollapsed}
		<div class="content" transition:fly={{y: -30, duration: 100}}>
			<slot></slot>
		</div>
	{/if}
</div>

<style>
	.collapsibleSection {
		padding: 1em;
	}

	.collapsibleSection-header {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		background-color: #ffffff;
		border-bottom: 3px solid #435768;
		padding-bottom: 0.5em;
		cursor: pointer;
	}

	.collapsibleSection-header h3 {
		color: #435768;
		font-size: 1.5rem;
		padding-left: 1rem;
		margin: 0%;
	}

	.content {
		padding: 1em;
	}

	.arrow {
		border: solid #435768;
		border-width: 0px 3px 3px 0px;
		display: inline-block;
		padding: 5px;
		transition: transform 0.1s ease;
	}

	.arrow.not-collapsed {
		transform: rotate(45deg);
	}

	.arrow.collapsed {
		transform: rotate(-45deg);
	}
</style>

	