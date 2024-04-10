<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let title = ''
  export let typeClose = '' // which way to close the sidebar, "cross" or "sideButton"
  export let side = ''
  export let showSidebar = true

  /**
   *
   */
  function handleClick () {
    dispatch('close')
    if (typeClose === 'sideButton') {
      showSidebar = !showSidebar

      // Trigger resize event to update plotly graph size after sidebar is closed
      setTimeout(() => window.dispatchEvent(new Event('resize')), 200)
    }
  }

    /**
     * Handles the keydown event of Enter and Escape keys
     * @param {KeyboardEvent} event - The keydown event
     */
  function handleKeyDown (event) {
    if (event.key === 'Enter') {
      handleClick()
    }
  }
</script>

<div class="sidebarContainer {side}" style="width: {!showSidebar ? '0' : ''};">
  {#if showSidebar}
    <!-- Header with title and optional close button -->
    <div class="header">
      <h1>{title}</h1>
      {#if typeClose === 'cross'}
        <div class="crossButton" on:click={handleClick} on:keydown={handleKeyDown} role="button" tabindex="0"></div>
      {/if}
    </div>

    <!-- Main content -->
    <div class=mainContent>
      <slot></slot>
    </div>
  {/if}

  <!-- Optional close button on side -->
  {#if typeClose === 'sideButton'}
    <button class="sideButton" on:click={handleClick}>
      <div class="arrow {showSidebar ? 'left' : 'right'}"></div>
    </button>
  {/if}
</div>

<style>
  .sidebarContainer {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: white;
    z-index: 2000;
    position: relative;
    transition: width 0.15s ease-in-out;
  }

  .left {
    box-shadow: 5px 0 5px rgba(0, 0, 0, 0.1);
    width: 20em;
  }

  .right {
    box-shadow: -5px 0 5px rgba(0, 0, 0, 0.1);
    width: 35em;
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
    border: 0px;
    border-radius: 0 15px 15px 0;
    z-index: 1000; /* Ensure button is on top of map*/
    cursor: pointer;
    /*Create shadow only on right, top, and bottom of element*/
    box-shadow: 10px 0 10px rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .arrow {
    width: 0;
    height: 0;
    border-top: 13px solid transparent;
    border-bottom: 13px solid transparent;
    box-shadow: none;
  }

  .arrow.left {
    border-right: 13px solid rgb(58, 58, 58);
    margin-right: 10px;
  }

  .arrow.right {
    border-left: 13px solid rgb(58, 58, 58);
  }

  .sideButton:hover {
    background-color: #a3a3a3;
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
