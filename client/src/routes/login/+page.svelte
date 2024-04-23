<script>
  import UserFeedbackMessage from '$lib/UserFeedbackMessage.svelte'
  import Button from '$lib/user-input/Button.svelte'
  import { authLogin } from '../../api/auth.js'
  import { FEEDBACK_CODES, FEEDBACK_MESSAGES, FEEDBACK_TYPES } from '../../constants/feedbackMessages.js'
  import { addFeedbackToStore } from '../../utils/addFeedbackToStore.js'
  import { validateText, validatePassword } from '../../utils/validation.js'

  let username = '' // Username input
  let password = '' // Password input

  /**
   * Submits the login form
   */
  function submitForm () {
    // Should validate input before sending
    if (!username || !password) {
      addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.FORBIDDEN, FEEDBACK_MESSAGES.LOGIN_FIELD_EMPTY)
      return
    } else if (!username || !validateText(username)) {
      return
    } else if (!password || !validatePassword(password)) {
      return
    }

    // Send login request
    authLogin(username, password).then((success) => {
      // If login was successful, reset the input fields
      if (success) {
        username = ''
        password = ''
      }
    })
  }

  /**
   * Handles the keydown event of Enter key
   * @param {KeyboardEvent} event - The keydown event
   */
  function handleKeyDown (event) {
    if (event.key === 'Enter') {
      submitForm()
    }
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
        <input type='text' bind:value={username} name='username' id='username' placeholder='Skriv inn brukernavn' required on:keydown={handleKeyDown}/>
      </div>

      <div class='inputContainer'>
        <!-- Password input -->
        <label for='password'>Passord</label>
        <input type='password' bind:value={password} name='password' id='password' placeholder='Skriv inn passord' required on:keydown={handleKeyDown}/>
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
