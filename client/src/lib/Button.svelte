<script>
  import { page } from '$app/stores'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  // Should only take in type of button and derive other properties from that

  // export let color = 'blue' // Can be either 'none', 'blue', 'orange' or 'green'
  // export let center = true // The default center for the button
  export let href = '#' // The default link for the button
  export let type = '' // Can be either 'download' or any optioneble color 'blue', 'uploadButton'
  export let size = 'medium' //can be either 'small', 'medium', 'large' or 'extende', as big ass the header. 
  //export let ifNotPicture = false // Contains an svg icon

  /**
   * Handles the appropriate function when the user clicks on the button. 
   */
  function handleClick () {
    // Should only dispatch one event based on type of button
    dispatch('downloadFile')
    dispatch('uploadFile')
    dispatch('selectFile')
  }
</script>
<!-- class:ifNotPicture={ifNotPicture} -->
<!-- class:center={center} -->
<!-- size={size} -->

<!-- What the button does and the variables it takes inn.  -->
<a class="{type} {size}"
  href={href}
  class:active={$page.url.pathname === href}
  on:click={handleClick}>
  <slot></slot>
</a>

<style>
  a {
    display: flex;
    align-items: center;  /*Centers the content vertically*/
    justify-content: center;  /*Centers the content in the buttons horizontally*/
    white-space: nowrap;  /*Does not lett the text in the buttons wrap*/
    vertical-align: baseline; /*Aligns the icons and the text on the same level.*/
    cursor: pointer;  /*Pointer for the mouse*/
    text-decoration: none;  /*Deletes the underline on the link*/
    font-weight: bold;  /*Bold text*/
  }

  .small {
    font-size: 1rem;
    width: 120px;
    height: 40px;
    border-radius: 1rem;
  }

  .medium {
    font-size: 1.2rem;
    width: 200px;
    height: 60px;
    border-radius: 1rem;
  }

  .large {
    font-size: 1.5rem;
    width: 250px;
    height: 80px;
    border-radius: 1rem;
  }

  .extended{      
    font-size: 1.5rem;
    width: 100%;
    height: 100%;
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

  .logOut{
    display: flex;
    background-color: #435768;
    color: white;
  }

  .blue {
    border-radius: 15px;
    background-color: #435768;
    color: white;
  }

  .blue:hover,
  .logOut:hover{
    box-shadow: 0px 5px 5px #36526e;
    transform: translateY(-3px);
  }

  .blue:active,
  .logOut:active{
    background-color: #253544;
    box-shadow: 0px 0px 0px #36526e;
    transform: translateY(-0px);
  }

  .green {
    background-color: #3EA642;
    color: white;
  }

  .green:hover {
    background-color: #00ac06;
    box-shadow: 0px 5px 5px #00ff08;
    transform: translateY(-3px);
  }

  .green:active {
    background-color: #005e03;
    box-shadow: 0px 0px 0px #00ff08;
    transform: translateY(-0px);
  }

  .orangeButton {
    display: flex;
    position: absolute;
    background-color: #FF5B37;
    color: white;
  }

  .orangeButton:hover {
    background-color: #ff3c11;
    box-shadow: 0px 5px 5px #ff6c47;
    transform: translateY(-3px);
  }

  .orangeButton:active {
    background-color: #aa1f00;
    box-shadow: 0px 0px 0px #ff6c47;
    transform: translateY(-0px);
  }
</style>
