<script>
    export let searchQuery
    export let dataType

    $: searchQuery = searchQuery.toLowerCase()
    let placeholder
    const helpText = 'Bruk filter for å filtrere resultat'

    $: placeholder = `Søk etter ${dataType === 'river' ? 'Elv navn eller prosjektnummer' : 'Stasjon navn'}`
</script>

<div class='container' role='search'>
    <label for='listSearch'>
        <input type='search' id='listSearch' name='listSearch' placeholder={placeholder} bind:value={searchQuery}/>
    </label>

    <h4 class='helpText'>{helpText}</h4>
</div>

<style>

    .container {
        padding: 2em 2em 2em 0em;
        width: 100%;
        height: fit-content;
    }

    .helpText {
        padding-left: 0.5em;
        /* padding: 0.5em; */
    }

    #listSearch {
        width: 100%;
        max-width: 600px;
        height: 45px;
        padding: 8px;
        border: 1px solid black;
        border-radius: 10px;
        background-color: #ebebeb;     /* Color for the searchfield */
        outline: none;
        font-size: 16px;
        color: #000000;
    }

</style>
