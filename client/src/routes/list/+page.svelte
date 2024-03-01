<script> // List page logic here
    import Filter from '$lib/filter.svelte'; 

        // Define a function to generate table rows
    function generateRows() {
        const rows = [];
        for (let i = 1; i <= 5; i++) {
        const cells = [];
        for (let j = 1; j <= 4; j++) {
            cells.push(`Row ${i}, Col ${j}`);
        }
        rows.push(cells);
        }
        return rows;
    }
</script>

<div id="listSearchField">
    <label for="listSearch"></label>
    <input type="search" id="listSearch" name="listSearch" placeholder="Søk etter Elv navn eller prosjektnummer:" />
    <div id="listSearchBottomText"> Bruk filter for å filtrere resultat</div>
</div>

    <!-- Table containing the list of station/riverdata -->
<div id="listTable">
    <table>
        <thead>
            <tr>
                <th>Stasjon Navn</th>
                <th>Kl.</th>
                <th>Dato</th>
                <th>Prosjektnummer</th>
            </tr>
        </thead>
        <tbody>
            {#each generateRows() as row, i}
                <tr key={i}>
                    {#each row as cell, j}
                    <td key={j}>{cell}</td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<Filter/>

  <!-- Defines the filter options at the left side of the page -->



<style>
    /* ----------------- SEARCHFIELD -----------------*/

    #listSearchField {
        padding-left: 500px;
        padding-top: 15px;
    }

    #listSearchBottomText {
        padding-top: 5px;
    }

    input[type="search"] {
        width: 600px; 
        height: 45px;
        padding: 8px; 
        border: 1px solid black; 
        border-radius: 10px; 
        background-color: #ebebeb;     /* Color for the searchfield */
        outline: none; 
        font-size: 16px; 
        color: #000000;
    }

    /* ----------------- TABLE -----------------*/

    #listTable {
        padding-left: 450px;
        padding-top: 30px;
    }

    table {
        border-collapse: collapse;   /* Used to avoid all borders being double-lined */
        font-size: 1.2rem;
    }

    th {
        border-bottom: 1px solid black;
        padding: 8px;
        text-align: center;
        background-color: #bdbcbc;  /* Color for the searchfield */
    }


        /* Defines the width of each column in the table */
    th:nth-child(1), td:nth-child(1) {
        width: 500px;
    }
    th:nth-child(2), td:nth-child(2) {
        width: 150px;
    }
    th:nth-child(3), td:nth-child(3) {
        width: 200px;
    }
    th:nth-child(4), td:nth-child(4) {
        width: 300px;
    }


    td {
        text-align: center;
        padding: 8px;
    }

    tr:nth-child(even) {
        background-color: #f2f2f2;  /* Color for the even numbered rows */
    }
</style>