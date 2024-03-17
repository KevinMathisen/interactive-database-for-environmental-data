<script>
    import { page } from '$app/stores'
</script>

<header>
    <div class="logoHeader">
        <img src="/NINA_logo_emblem.png" alt="Logo" height="60px">
        <p>Nina</p>
    </div>
    <div class="centerItem" class:active={$page.url.pathname === '/'}>
        <a href="/" >Kart</a>
        <img src="/mapIcon.svg" alt="listIcon" height="60px" class="headerIcon">
    </div>
    <div class="centerItem" class:active={$page.url.pathname === '/list'}>
        <a href="/list">List</a>
        <img src="/listIcon.svg" alt="listIcon" height="60px" class="headerIcon">
    </div>
    <div class="centerItem" class:active={$page.url.pathname === '/graph'}>
        <a href="/graph">Grafer</a>
        <img src="/graphIcon.svg" alt="listIcon" height="60px" class="headerIcon">
    </div>
    <div class="centerItem" class:active={$page.url.pathname === '/upload'}>
        <a href="/upload">Last opp</a>
        <img src="/uploadIcon.svg" alt="listIcon" height="60px" class="headerIcon">
    </div>
    <div class="centerItem" class:active={$page.url.pathname === '/download'}>
        <a href="/download">Last ned</a>
        <img src="/dowloadIcon.svg" alt="listIcon" height="60px" class="headerIcon">
    </div>
    <div class="LogOut centerItem">
        Logg ut
    </div>
</header>

<style>
    header {
        display: flex;
        flex-direction: row;
        background-color: white;
        align-items: center;
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

    header > :nth-child(2), header > :nth-child(3), header > :nth-child(4), header > :nth-child(5), header > :nth-child(6)  {
        font-size: 1.5rem;
        width: 180px;
        height: 80px;
    }

    header > :nth-child(7) {
        font-size: 1.5rem;
        width: 180px;
        height: 60px;
        margin-right: 1.5rem;
    }

    .LogOut {
        color:white;
        background-color: #435768;
        border-radius: 5px;
    }

    .centerItem {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    a {
        color: #000; /* Change links color to black */
        text-decoration: none; /* Optionally remove underline */
    }

    .active {
        text-decoration: underline;
    }
</style>
