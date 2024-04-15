<script>
    import { validateText } from '../../utils/validation'

    export let searchQuery // search query
    export let dataType // type of data to search for

    let userSearchQuery = '' // what user has entered in search field
    let placeholder // placeholder text for search field
    const helpText = 'Bruk filter for å filtrere resultat'

    // Set placeholder text based on data type
    $: placeholder = `Søk etter ${dataType === 'river' ? 'Elv navn eller prosjektnummer' : 'Stasjon navn'}`

    // Update search query if user input is valid
    $: if (userSearchQuery && validateText(userSearchQuery)) {
      searchQuery = userSearchQuery.toLowerCase()
    } else {
      // Reset search query if user input is empty or invalid
      searchQuery = ''
    }
</script>

<div class=container>
    <!-- Search field -->
    <label>
        <input type='search' id='listSearch' name='listSearch' placeholder={placeholder} bind:value={userSearchQuery}/>
    </label>

    <div class=helpText>{helpText}</div>
</div>

<style>
    .container {
        padding: 2em 2em 2em 0em;
        width: 100%;
        height: fit-content;
    }

    .helpText {
        padding: 0.5em;
    }

    #listSearch {
        width: 100%;
        max-width: 600px;
        height: 45px;
        padding: 8px;
        border: 1px solid black;
        border-radius: 10px;
        background-color: #ebebeb;
        outline: none;
        font-size: 16px;
        color: #000000;
    }
</style>
