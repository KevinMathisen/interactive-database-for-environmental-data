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
    <Button type="header" href="/" size='extended'>Kart<img src="/mapIcon.svg" alt="listIcon" height="40em" class="headerIcon"></Button>
  </div>
  <div class="centerItem" class:active={$page.url.pathname === '/list'}>
    <Button type="header" href="/list" size='extended'>Liste<img src="/listIcon.svg" alt="listIcon" height="40em" class="headerIcon"></Button>
  </div>
  <div class="centerItem" class:active={$page.url.pathname === '/graph'}>
    <Button type="header" href="/graph" size='extended'>Graf<img src="/graphIcon2.svg" alt="listIcon" height="30em" class="headerIcon"></Button>
  </div>
  <div class="centerItem" class:active={$page.url.pathname === '/upload'}>
    <Button type="header" href="/upload" size='extended'>Last opp<img src="/uploadIcon2.svg" alt="listIcon" height="40em" class="headerIcon"></Button>
  </div>
  <div class="centerItem" class:active={$page.url.pathname === '/download'}>
    <Button type="header" href="/download" size='extended'>Last ned<img src="/dowloadIcon.svg" alt="listIcon" height="40em" class="headerIcon"></Button>
  </div>
  <div class="LogOut centerItem">
    <Button type="logOut" size='large'>Logg ut<img src="/userIcon.svg" alt="listIcon" height="50em" class="headerIcon"></Button>
  </div>
</header>

<style>
  header {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    background-color: white;
    align-items: center;
    height: 80px;
    padding-bottom: 10px;
  }

  .logoHeader{
    display:flex;
    align-items: center;
    padding-right: 1rem;
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
    position: relative;
    height: 100%;
    width: 100%;
  }

  header > :nth-child(7) {
    padding: 1rem;
  }

  /* .centerItem {
    margin: 10px;
    height: calc(100% - 20px);
  } */

  /* class = white */
  /* .white {
  filter: invert(100%);
  } */
</style>
