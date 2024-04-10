<script>
  import { page } from '$app/stores'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let href = '' // The default link for the button
  export let type = '' // Can be either 'header', 'blue', 'orange', 'green'.
  export let size = 'medium' // Button sizes 'small', 'medium', 'large' or 'extende'.

  /**
   * Handles the appropriate function when the user clicks on the button.
   * @param {Event} event - The event object
   */
  function handleClick (event) {
    if (href === '') {
      event.preventDefault()
    }
    dispatch('buttonClick')
  }
</script>

<!-- The variables needed for the button. -->
<a class="{type} {size}"
  href={href}
  class:active={$page.url.pathname === href}
  on:click={handleClick}>
  <slot></slot>
</a>

<style>
  a {
    display: flex;
    align-items: center;      /*Centers the content vertically*/
    justify-content: center;  /* Centers the content in the buttons horizontally */
    white-space: nowrap;      /*Does not lett the text in the buttons wrap*/
    vertical-align: baseline; /*Aligns the icons and the text on the same level.*/
    cursor: pointer;          /*Pointer for the mouse*/
    text-decoration: none;    /*Deletes the underline on the link*/
    font-weight: bold;        /*Bold text*/
  }

  .small {
    font-size: 0.8rem;
    width: 140px;
    height: 50px;
    border-radius: 1rem;
    justify-content: space-evenly;
  }

  .medium {
    font-size: 1rem;
    width: 180px;
    height: 60px;
    border-radius: 1rem;
    justify-content: space-evenly;
  }

  .large {
    font-size: 1.2rem;
    width: 250px;
    height: 70px;
    border-radius: 1rem;
    justify-content: space-evenly;
  }

  .extended{
    font-size: 1.2rem;
    width: 100%;
    height: calc(100% - 10px);
    margin: 5px 0px;
  }

  .header{
    display: flex;
    border-style: solid;
    border: 0;
    color: #000000;
  }

  .header:hover{
    background-color: rgb(238, 235, 235);
    border-bottom: 5px solid rgb(238, 235, 235);
  }

  .header.active{
    border-bottom: 5px solid #435768;
  }

  .blue {
    border-radius: 15px;
    background-color: #435768;
    color: white;
  }

  .blue:hover {
    box-shadow: 0px 5px 5px #36526e;
    transform: translateY(-3px);
  }

  .blue:active {
    background-color: #253544;
    box-shadow: 0px 0px 0px #36526e;
    transform: translateY(-0px);
  }

  .green {
    background-color: #3EA642;
    color: white;
  }

  .green:hover {
    background-color: #48c24c;
    box-shadow: 0px 5px 5px #24b129;
    transform: translateY(-3px);
  }

  .green:active {
    background-color: #005e03;
    box-shadow: 0px 0px 0px #24b129;
    transform: translateY(-0px);
  }

  .orange {
    display: flex;
    background-color: #FF5B37;
    color: white;
  }

  .orange:hover {
    background-color: #ff3c11;
    box-shadow: 0px 5px 5px #ff6c47;
    transform: translateY(-3px);
  }

  .orange:active {
    background-color: #aa1f00;
    box-shadow: 0px 0px 0px #ff6c47;
    transform: translateY(-0px);
  }
</style>
