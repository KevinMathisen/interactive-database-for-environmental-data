<script>
  export let name
  export let options
  export let selected
</script>

{#each options as option}
  <label for={option.value}>
    <input id={option.value} type="radio" name={name} value={option.value} bind:group={selected} />
    {option.label}
  </label>
{/each}

<style>
  label {
    display: block;
    padding: 0.5em;
    font-size: 1.2rem;
    cursor: pointer;
    border-radius: 0.5em;
  }

  /* Show when a user hovers over the label */
  label:hover {
    background-color: #435768;
    color: white;
  }

  input {
    /* Make the input radio button larger */
    transform: scale(1.25);
  }

</style>
