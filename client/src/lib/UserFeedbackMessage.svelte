<script>
  import { userFeedbackStore } from '../stores/userFeedbackStore.js'
  import Modal from './Modal.svelte'
  import { SVG_PATHS } from '../constants/svgPaths'

  $: userFeedback = $userFeedbackStore

  /**
   * Handles the close event of the modal
   * @returns {void}
   */
  function handleClose () {
    userFeedbackStore.update((feedback) => {
      feedback.pop()
      return feedback
    })
  }
</script>

{#each userFeedback as feedback}
  {#if feedback.message}
    <Modal on:close={handleClose}>
      <img
        src={feedback.type ? SVG_PATHS[feedback.type] : SVG_PATHS.CLOSE}
        alt={feedback.type}
        class='icon'
      />
      <h3>{feedback.message}</h3>
    </Modal>
  {/if}
{/each}

<style>
  h3 {
    margin: 20px 0;
    text-align: center;
    color: #333;
    font-size: 1.5rem;
  }

  .icon {
    width: 80px;
    height: 80px;
  }
</style>
