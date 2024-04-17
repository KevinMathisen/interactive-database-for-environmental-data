<script>
  import { fly } from 'svelte/transition'

  export let title = ''
  export let collapsable = true

  let isCollapsed = false

  /**
   * Toggle the collapse state
   * @returns {void}
   */
  function toggleCollapse () {
    if (!collapsable) return

    isCollapsed = !isCollapsed
  }

  /**
   * Handles the keydown event of Enter and Escape keys
   * @param {KeyboardEvent} event - The keydown event
   */
   function handleKeyDown (event) {
     if (event.key === 'Enter') {
       toggleCollapse()
     }
   }
</script>

<div class=collapsibleSection>
  <div class=collapsibleSection-header on:click={toggleCollapse} on:keydown={handleKeyDown} role='button' tabindex='0'>
    {#if collapsable}
      <i class='arrow' class:collapsed={isCollapsed} class:not-collapsed={!isCollapsed}></i>
    {/if}
    <h3>{title}</h3>
  </div>
  {#if !isCollapsed}
    <div class='content' transition:fly={{ y: -30, duration: 100 }}>
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
    border-bottom: 3px solid var(--PCOLOR);
    padding-bottom: 0.5em;
    cursor: pointer;
  }

  .collapsibleSection-header h3 {
    color: var(--PCOLOR);
    font-size: 1.5rem;
    padding-left: 1rem;
    margin: 0%;
  }

  .content {
    padding: 1em;
  }

  .arrow {
    border: solid var(--PCOLOR);
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
