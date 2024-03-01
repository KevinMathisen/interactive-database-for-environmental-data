<div class="graphFilter">
    <div class="graphHeader">Filter for Grafer</div>

            <!-- Defines the form for choosing elvedata or stasjonsdata -->
    <h3>Type data</h3>
        <form action=" ">
        <div class="graphFilterDataContainer">
            <div class="graphSetWidthForButtons"><label for="graphStasjonsdata">Stasjonsdata</label></div>
            <input type="radio" id="graphStasjonsdata" name="color" value="graphStasjonsdata">
        </div>
        <div class="graphFilterDataContainer">
            <div class="graphSetWidthForButtons"><label for="graphElvedata">Elvedata</label></div>
            <input type="radio" id="graphElvedata" name="color" value="graphElvedata">
        </div>            
    </form> 
        
        <!-- Defines the form for choosing elvedata or stasjonsdata -->
    <h3>Stasjoner valgt</h3>
    <div id="graphSearchField">
        <label for="listSearch"></label>
        <input type="search" id="graphStationSearchField" name="graphStationSearchField" placeholder="Legg til stasjon" />
    </div>

        <!-- Defines the form for choosing elvedata or stasjonsdata -->
    <h3>Art</h3>
    <form action=" ">
        <div class="graphFilterDataContainer">
            <div class="graphSetWidthForButtons"><label for="graphVelgAlle">Velg Alle</label></div>
            <input type="radio" id="graphVelgAlle" name="color" value="graphVelgAlle">
        </div>
            
        <div class="graphFilterDataContainer">
            <div class="graphSetWidthForButtons"><label for="graphEgendefinert">Egendefinert</label></div>
            <input type="radio" id="graphEgendefinert" name="color" value="graphEgendefinert">
        </div>

            <!-- Defines the drop-down search menu -->
        <div class="graphFilterDataContainer">
            <label for="fishOptions"></label>
            <select id="fishOptions" name="fishOptions">
                <option value="Sei">Sei</option>
                <option value="Flyndre">Flyndre</option>
                <option value="Torsk">Torsk</option>
                <option value="Makrell">Makrell</option>
                <option value="Steinbit">Steinbit</option>
            </select>
        </div>
    </form>

        <!-- Defines the form for choosing elvedata or stasjonsdata -->
    <h3>Fordeling av arter</h3>
    <div class="graphFilterDataContainer">
        <div class="graphSetWidthForButtons"><label for="graphVis">Vis</label></div>
        <input type="checkbox" id="graphVis" name="color" value="graphVis">
    </div>
    <p>Y-akse verdi</p>
    <div class="graphFilterDataContainer">
        <div class="graphSetWidthForButtons"><label for="graphAntallPerArt">Antall per art</label></div>
        <input type="radio" id="graphAntallPerArt" name="color" value="graphAntallPerArt">
    </div>
    <div class="graphFilterDataContainer">
        <div class="graphSetWidthForButtons"><label for="graphAntMinPerArt">Ant/min per art</label></div>
        <input type="radio" id="graphAntMinPerArt" name="color" value="graphAntMinPerArt">
    </div>

    <p>Diagram type</p>
    <div class="graphFilterDataContainer">
        <div class="graphSetWidthForButtons"><label for="graphStolpediagram">Stolpediagram</label></div>
        <input type="radio" id="graphStolpediagram" name="color" value="graphStolpediagram">
    </div>
    <div class="graphFilterDataContainer">
        <div class="graphSetWidthForButtons"><label for="graphSektordiagram">Sektordiagram</label></div>
        <input type="radio" id="graphSektordiagram" name="color" value="graphSektordiagram">
    </div>

            <!-- Defines the form for choosing elvedata or stasjonsdata -->
    <h3>Fordeling av lengde</h3>
    <div class="graphFilterDataContainer">
        <div class="graphSetWidthForButtons"><label for="graphVis2">Vis</label></div>
        <input type="checkbox" id="graphVis2" name="color" value="graphVis2">
    </div>
    <p>Intervall i mm</p>
    <div id="graphSearchField2" class="searchField">
        <label for="graphStationSearchField2"></label>
        <input type="search" id="graphStationSearchField2" name="graphStationSearchField2" placeholder="mm" />
    </div>
    <p>Diagramtype</p>
    <div class="graphFilterDataContainer">
        <div class="graphSetWidthForButtons"><label for="graphHistogram">Histogram</label></div>
        <input type="radio" id="graphHistogram" name="color" value="graphHistogram">
    </div>
    <div class="graphFilterDataContainer">
        <div class="graphSetWidthForButtons"><label for="graphBoksplott">Boksplott</label></div>
        <input type="radio" id="graphBoksplott" name="color" value="graphBoksplott">
    </div>


</div>

<style>
    /* ----------------- FILTER -----------------*/

    .graphFilter {
        position: fixed;
        width: 300px;
        height: calc(100vh - 80px);         /* Height of the page subtracted by height of the header*/
        top: 80px;                 
        background-color: white;
        border-right: 5px solid black;
        height: calc(100vh - 80px);
    }

    .graphHeader {
        height: 60px;
        font-size: 2.5rem;
        background-color: #435768;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .graphFilterDataContainer {
        font-size: 1rem;
        padding: 0 0 0 1rem;
    }

    #graphSearchField {
        padding: 0 0 0 1rem;
    }

    #graphSearchField2 {
        padding: 0 0 0 1rem;
        width: 50px;
    }

    #graphStationSearchField[type="search"] {
        width: 200px; 
        height: 25px;
        padding: 8px; 
        border: 1px solid black; 
        border-radius: 3px; 
        background-color: #ebebeb;     /* Color for the searchfield */
        outline: none; 
        color: #000000;
    }

    #graphStationSearchField2[type="search"] {
        width: 70px; 
        height: 25px;
        padding: 8px;
        border: 1px solid black;
        border-radius: 3px; 
        background-color: #ebebeb;     /* Color for the searchfield */
        outline: none; 
        color: #000000;
    }
    h3 {
        color: #435768;
        font-size: 1.5rem;
        padding-left: 1rem;
        margin: 1rem 0 0.5rem 0;
    }

    .graphFilter p {
        font-size: 1.2rem;
        padding: 0.5rem 0 0 1rem;
        margin: 0;
        text-decoration: underline;
    }

    .graphSetWidthForButtons { /* Used to position the radio buttons */
        width: 120px;
        display: inline-block;
    }
</style>