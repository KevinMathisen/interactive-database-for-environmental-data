<header>
    <div class="logoHeader">  
        <img src="/NINA_logo_emblem.png"  alt="Logo" height="60px">
        <p>Nina</p>
    </div>  
    <div class="centerItem">
        <a href="/">Kart</a>
        <img src="/mapIcon.svg" alt="listIcon" height="60px" class="headerIcon">
    </div>
    <div class="centerItem">
        <a href="/list">Liste</a>
        <img src="/listIcon.svg" alt="listIcon" height="60px" class="headerIcon">
    </div>
    <div class="centerItem">
        <a href="/graph">Grafer</a>
        <img src="/graphIcon.svg" alt="listIcon" height="60px" class="headerIcon">
    </div>
    <div class="centerItem">
        <a href="/upload">Last opp</a>
        <img src="/uploadIcon.svg" alt="listIcon" height="60px" class="headerIcon">
    </div>
    <div class="centerItem">
        <a href="/download">Last ned</a>
        <img src="/dowloadIcon.svg" alt="listIcon" height="60px" class="headerIcon">
    </div>
    <div class="centerItem">Logg inn</div>
</header>

<style>
    header {
        display: flex;
        flex-direction: row;
        background-color: white;
        height: 80px;
        gap: 2rem;
        justify-content: space-between;
    }

    .logoHeader{
        display:flex;
        align-items: center;
        padding-left: 1rem;
        font-size: 2rem;
        font-family: "Inter", sans-serif;
        font-weight: 540;
    }

    .headerIcon {
        padding-left: 0.5rem;
        font-size:2rem;
    }

    header > :nth-child(2), header > :nth-child(3), header > :nth-child(4), header > :nth-child(5), header > :nth-child(6), header > :nth-child(7) {
        font-size: 1.5rem;
        width: 180px;
    }

    .centerItem {
        display: flex;
        justify-content: center;
        align-items: center;
    }   
</style>