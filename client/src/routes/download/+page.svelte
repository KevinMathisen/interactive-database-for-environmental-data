<script> // Download page logic here 
</script>
    
<div>
    <div id="downloadDataTopText">Last ned data</div>
</div>

    <!-- Defines the area containing the options for dowloading -->
<div class="downloadBody">
    <div class="downloadDataBox">
            <!-- Defines the first area, containing options between riverdata and stationdata -->
        <div class="dowloadBoxGeneral">
            <h3>Type data</h3>
            <form action=" ">
                <div>
                    <div class="setWidthForButtonsUpload"><label for="StasjonsdataUpload">Stasjonsdata</label></div>
                    <input type="radio" id="StasjonsdataUpload" name="color" value="StasjonsdataUpload">
                </div>
                
                <div>
                    <div class="setWidthForButtonsUpload"><label for="ElvedataUpload">Elvedata</label></div>
                    <input type="radio" id="ElvedataUpload" name="color" value="ElvedataUpload">
                </div>            
            </form>
        </div>

            <!-- Defines the second area, containing options between all species or self-specified species -->
        <div class="dowloadBoxGeneral">
            <h3>Art</h3>
            <form action=" ">
                <div>
                    <div class="setWidthForButtonsUpload"><label for="velgAlleArterUpload">Velg alle arter</label></div>
                    <input type="radio" id="velgAlleArterUpload" name="color" value="velgAlleArterUpload">
                </div>
                
                <div>
                    <div class="setWidthForButtonsUpload"><label for="egendefinerteArterUpload">Egendefinerte arter</label></div>
                    <input type="radio" id="egendefinerteArterUpload" name="color" value="egendefinerteArterUpload">
                </div>            
            </form>
        </div>

            <!-- Defines the first area where you can select which stations to include -->
        <div class="dowloadBoxGeneral">
            <p>Stasjoner</p>
            <div>
                <label for="stationOptions"></label>
                <select id="stationOptions" name="stationOptions">
                    <option value="Sei">Sei</option>
                    <option value="Flyndre">Flyndre</option>
                    <option value="Torsk">Torsk</option>
                    <option value="Makrell">Makrell</option>
                    <option value="Steinbit">Steinbit</option>
                </select>
            </div>
        </div>

            <!-- Defines the fourth area where you can select which species to include -->
        <div class="dowloadBoxGeneral">
            <p>Egendefinerte arter</p>
            <div>
                <label for="artOptions"></label>
                <select id="artOptions" name="artOptions">
                    <option value="Sei">Sei</option>
                    <option value="Flyndre">Flyndre</option>
                    <option value="Torsk">Torsk</option>
                    <option value="Makrell">Makrell</option>
                    <option value="Steinbit">Steinbit</option>
                </select>
            </div>
        </div>
    </div>
</div>

<style> 
    #downloadDataTopText {
        height: 100px;
        font-size:3rem;
        width: 100vw;
        background-color: #435768;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .downloadBody {
        display: flex;
        justify-content: center;
    }

    .downloadDataBox {
        display: grid;
        flex-direction: row;
        grid-template-areas: 
        "b1 b2"                   
        "b3 b4";
        grid-template-rows: 250px 300px;
        grid-template-columns: 1fr 1fr;
        width: 1300px;
        font-size: 1.2rem;
        gap: 2rem;
        justify-items: center;
    }

    .downloadDataBox h3 {
        color: #435768;
        font-size: 2rem;
    }

    .downloadDataBox p {
        color: #435768;
        font-size: 1.8rem;
    }

    .dowloadBoxGeneral {
        width: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .downloadDataBox:nth-child(1){
        grid-area: b1;
    }
    .downloadDataBox:nth-child(2){
        grid-area: b2;
    }
    .downloadDataBox:nth-child(3){
        grid-area: b3;
    }
    .downloadDataBox:nth-child(4){
        grid-area: b4;
    }

    .setWidthForButtonsUpload {
        width: 150px;
        display: inline-block;
    }
</style>