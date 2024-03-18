<script>
  import { page } from '$app/stores'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let color = 'blue' // The default color for the button.
  export let center = true // The default center for the button.
  export let href = '#' // The default link for the button.
  export let type = '' // The default type for the button.
  export let ifNotPicture = false // Contains an svg icon.

  /**
   *
   */
  function handleClick () {
    dispatch('downloadFile')
    dispatch('uploadFile')
    dispatch('selectFile')
  }
</script>

<a class="{color} {type}"
  href={href}
  class:center={center}
  class:active={$page.url.pathname === href}
  class:ifNotPicture={ifNotPicture}
  on:click={handleClick}>
  <slot></slot>
</a>

<style>
  a {
    vertical-align: baseline;
    text-align: justify;
    text-decoration: none;
    cursor: pointer;
    padding: 5px 10px;
    border: 0;
    border-radius: 15px;
    font-weight: bold;
    font-size: 0.8em;
  }

  .none {
    background-color: white;
    color: #000000;
  }

  .none:hover,
  .none.active {
    border: #435768;
    border-style: solid;
  }

  .blue {
    background-color: #435768;
    color: white;
  }

  .blue:hover,
  .blue.ifNotPicture:hover{
    background-color: #34495E;
    color: white;
  }

  .blue.ifNotPicture {
    background-color: #435768;
    color: white;
    width: 10em;
    height: 2.8em;
  }

  .orange {
    background-color: #FF5B37;
    color: white;
  }

  .orange:hover{
    background-color: #ff3c11;
    color: white;
  }

  .green {
    background-color: #3EA642;
    color: white;
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .download{
    position: fixed;
    right: 52em;
    bottom: 10em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    border-radius: 1rem;
    width: 200px;
    height: 60px;
  }

  .uploadButton {
    position: fixed;
    right: 500px;
    bottom: 100px;
    font-size: 1.2rem;
    border-radius: 1rem;
    width: 200px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
