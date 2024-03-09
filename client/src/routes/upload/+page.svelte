<script> // Upload page logic here

</script>
 
<div class="uploadBody">

    <!--Defines the bos where you click to choose files -->
    <div class="uploadFilesBox">
        <img src="/uploadCloudIcon.svg" alt="listIcon" height="60px" id="uploadCloudIcon">
        <p>Dra og slipp filer eller</p>
        <div id="uploadFilesBoxButton" class="colorChange">Bla gjennom Filer</div>
    </div>

        <!-- Defines the text under the upload files box -->
    <div class="uploadFilesBoxText">
        <p>Maksimal fil størrelse: 10 MB</p>
        <p>Kun tillatt å laste opp filer av typen: .csv and .xls</p>
    </div>

        <!-- Defines the overview over files selected -->
    <div class="uploadFilesUploaded">
        <p>Filer som er valgt:</p>
    </div>
</div>

<!-- Defines the upload files button -->     
<button class="uploadButton">Last opp</button>

<style> 
    .uploadBody {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .uploadFilesBox {
        border: 2px dashed black;
        margin-top:3rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 900px;
        font-size: 1.5rem;
    }

    #uploadCloudIcon {
        margin-top:1rem;
        height: 100px;
    }

    #uploadFilesBoxButton {
        background-color: #435768;
        padding: 1rem 5rem 1rem 5rem;
        margin: 3rem 0 1rem 0;
        border-radius: 1rem;
    }

    .uploadFilesBoxText {
        margin-right: 35rem;
    }

    .uploadFilesUploaded {
        margin-top: 3rem;
        font-size: 2rem;
        height: 200px;
        width: 900px;
    }

    .uploadButton {
        position: fixed;
        right: 500px;
        bottom: 100px;
        font-size: 1.2rem;
        background-color: tomato;
        border-radius: 1rem;
        width: 200px;
        height:60px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
