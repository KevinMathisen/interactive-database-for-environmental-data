<script>
  import { page } from '$app/stores'
  import Button from './Button.svelte'
</script>

<header>
  <div class="logoHeader">
    <img src="/NINA_logo_emblem.png" alt="Logo" height="60px">
    <p>Nina</p>
  </div>
  <div class="centerItem" class:active={$page.url.pathname === '/'}>
    <Button color="none" href="/">Kart<img src="/mapIcon.svg" alt="listIcon" height="50px" class="headerIcon"></Button>
  </div>
  <div class="centerItem" class:active={$page.url.pathname === '/list'}>
    <Button color="none" href="/list">Liste<img src="/listIcon.svg" alt="listIcon" height="50px" class="headerIcon"></Button>
  </div>
  <div class="centerItem" class:active={$page.url.pathname === '/graph'}>
    <Button color="none" href="/graph">Graph<img src="/graphIcon.svg" alt="listIcon" height="50px" class="headerIcon"></Button>
  </div>
  <div class="centerItem" class:active={$page.url.pathname === '/upload'}>
    <Button color="none" href="/upload">Last opp<img src="/uploadIcon.svg" alt="listIcon" height="50px" class="headerIcon"></Button>
  </div>
  <div class="centerItem" class:active={$page.url.pathname === '/download'}>
    <Button color="none" href="/download">Last ned<img src="/dowloadIcon.svg" alt="listIcon" height="50px" class="headerIcon"></Button>
  </div>
  <div class="LogOut centerItem">
    <Button color="blue" ifNotPicture={true}>Logg ut</Button>
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

  header > :nth-child(8) {
    font-size: 1.5rem;
    width: 180px;
    height: 60px;
    margin-right: 1.5rem;
  }

  .centerItem {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
