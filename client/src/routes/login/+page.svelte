<script>
  import UserFeedbackMessage from '$lib/UserFeedbackMessage.svelte'
  import Button from '$lib/user-input/Button.svelte'
  import { authLogin } from '../../api/auth.js'

  let username = '' // Username input
  let password = '' // Password input

  function submitForm () {
    // Should validate input before sending
    // username and password should be at least 6 characters
    // username should not contain special characters

    // Send login request
    authLogin(username, password).then((success) => {
      // If login was successful, reset the input fields
      if (success) {
        username = ''
        password = ''
      }
    })
  }
</script>

<UserFeedbackMessage />

<div class='loginPage'>
  <div class='loginHeader'>
    <h1>Logg inn</h1>
  </div>

  <!-- Login form -->
  <form class='loginForm'>
    <div class='inputsContainer'>
      <div class='inputContainer'>
        <!-- Username input -->
        <label for='username'>Brukernavn</label>
        <input type='text' name='username' id='username' placeholder='Skriv inn brukernavn' required/>
      </div>

      <div class='inputContainer'>
        <!-- Password input -->
        <label for='password'>Passord</label>
        <input type='password' name='password' id='password' placeholder='Skriv inn passord' required/>
      </div>
    </div>

    <!-- Submit button -->
    <Button 
      on:buttonClick={submitForm}
      type='orange'
      size='medium'>
      Logg inn
    </Button>
  </form>
</div>

<style>
  .loginPage {
    display: flex;
    flex-direction: column;
    height: calc(100vh - var(--header-height));
    width: 100%;
  }

  .loginHeader {
    height: 100px;
    background-color: #435768;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loginHeader h1 {
    margin: 0;
    font-size:3rem;
    color: white;
  }

  .loginForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
    padding: 2rem;
  }

  .inputsContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 2rem;
  }

  .inputContainer {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 1rem;
    width: fit-content;
  }

  .inputContainer label {
    font-size: 1.2rem;
    margin-left: 1rem;
  }

  .inputContainer input {
    width: calc(100% - 1.6rem);
    font-size: 1.2rem;
    padding: 0.8rem;
    margin: 0.5rem 0;
    border-radius: 0.5rem;
  }
</style>