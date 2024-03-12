<!-- ErrorMessage.svelte -->
<script>
  import { errorStore } from '../store/errorStore.js';
  import Modal from './Modal.svelte';
  import { onDestroy } from 'svelte';
  import { get } from 'svelte/store';

  export let status;
  
  let showModal = true;
  let errorMessage = '';
  let symbolPath = '';
  let closePath = '';

  const unsubscribeError = errorStore.subscribe(errors => {
      if (errors[status]) {
          errorMessage = errors[status].message;
          symbolPath = errors[status].symbolPath;
          closePath = errors[status].closePath;
      }
  });


  onDestroy(() => {
      unsubscribeError();
  });

  function handleClose() {
      showModal = false;
  }
</script>

{#if showModal}
  <Modal
      showModal={showModal}
      message={errorMessage}
      status={status}
      symbol={symbolPath}
      close={closePath}
      on:close={handleClose}
  />
{/if}
