<script>

</script>

<section id="indexLeftSideFilter"> <!-- id is used for animations  -->
    <div class="indexFilterHeader">Filter for Kart</div>

        <!-- Defines the form for choosing elvedata or stasjonsdata -->
    <h3>Type data</h3>
    <form action=" ">
        <div class="indexFilterDataContainer">
            <div class="indexSetWidthForButtons"><label for="Stasjonsdata">Stasjonsdata</label></div>
            <input type="radio" id="Stasjonsdata" name="color" value="Stasjonsdata">
        </div>
        <div class="indexFilterDataContainer">
            <div class="indexSetWidthForButtons"><label for="Elvedata">Elvedata</label></div>
            <input type="radio" id="Elvedata" name="color" value="Elvedata">
        </div>            
    </form>

        <!-- Defines the form for choosing a time interval -->
    <h3>Dato</h3>

        <div class="indexFilterDataContainer">
            <label for="FraDato">Fra</label>
            <input type="date" id="FraDato" name="color" value="FraDato"><br>
        </div>
        
        <div class="indexFilterDataContainer">
            <label for="TilDato">Til</label>
            <input type="date" id="TilDato" name="color" value="TilDato"><br>
        </div>            


        <!-- Defines the form for filtering different species of fish -->
    <h3>Art</h3>
    <form action=" ">
        <div class="indexFilterDataContainer">
            <div class="indexSetWidthForButtons"><label for="VelgAlleMenuFilter">Velg Alle</label></div>
            <input type="radio" id="VelgAlleMenuFilter" name="color" value="VelgAlleMenuFilter">
        </div>
        
        <div class="indexFilterDataContainer">
            <div class="indexSetWidthForButtons"><label for="EgendefinertMenuFilter">Egendefinert</label></div>
            <input type="radio" id="EgendefinertMenuFilter" name="color" value="EgendefinertMenuFilter">
        </div>

            <!-- Defines the drop-down search menu -->
        <div class="indexFilterDataContainer">
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
</section>

<style>
    section {
        position: fixed;
        width: 300px;
        height: calc(100vh - 80px);         /* Height of the page subtracted by height of the header*/
        top: 80px;                          /* Positions the menu under the header */
        background-color: white;
        border-right: 5px solid black;
        transition: transform 1.5s ease;    /* Animation for the menu */
        z-index: 1000;                      /* Makes the menu overlap the map */
    }

    .indexFilterHeader {
        height: 60px;
        font-size: 2.5rem;
        background-color: #435768;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .indexFilterDataContainer {
        font-size: 1.2rem;
        padding: 0 0 0.5rem 1rem;
    }

    /* ----------------- OTHER -----------------*/

    h3 {
        color: #435768;
        font-size: 1.5rem;
        padding-left: 1rem;
    }

    .indexSetWidthForButtons { /* Used to position the radio buttons */
        width: 120px;
        display: inline-block;
    }
</style>