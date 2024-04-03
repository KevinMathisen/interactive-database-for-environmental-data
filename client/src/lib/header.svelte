<script>
  import { page } from '$app/stores'
  import Button from './Button.svelte'

  let showDropdown = false

  /**
   *
   */
  function toggleDropdown () {
    showDropdown = !showDropdown
  }
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
  <button class="Menu centerItem" on:click={toggleDropdown}>
    <div class="MenuIcon" class:active={showDropdown}></div>
    <div class="MenuIcon::before" class:translate-before={showDropdown}></div>
    <div class="MenuIcon::after" class:translate-after={showDropdown}></div>
    {#if showDropdown}
      <div class="Dropdown">
        <ul>
          <li><a href="/">Kart</a></li>
          <li><a href="/list">Liste</a></li>
          <li><a href="/graph">Graf</a></li>
          <li><a href="/upload">Last opp</a></li>
          <li><a href="/download">Last ned</a></li>
        </ul>
      </div>
    {/if}
    </button>
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

  header > :nth-child(8) {
    padding: 1rem;
  }

  .Menu {
    display: none;
    margin-right: 3rem;
    background-color: #ffffff;
    width: 150px;
    height: 60px;
    position: relative;
    border-radius: 5px;
  }

  .MenuIcon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .MenuIcon,
  .MenuIcon::before,
  .MenuIcon::after {
      background-color: black;
      width: 40px;
      height: 5px;
      border-radius: 5px;
      position: absolute;
      transition: all 0.2s;
  }

  .MenuIcon::before,
  .MenuIcon::after {
    content: "";
  }

  .MenuIcon::before {
      transform: translate(-20px, -12px);
  }

  .MenuIcon::after {
      transform: translate(-20px, 12px);
  }

  @media screen and (max-width: 1350px) {
    header > :nth-child(2),
    header > :nth-child(3),
    header > :nth-child(4),
    header > :nth-child(5),
    header > :nth-child(6) {
      display: none;
    }
    header > :nth-child(7) {
      display: block;
    }
  }

  .Dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    border: 1px solid black;
    border-radius: 10px;
    width: 150px;
    z-index: 10005;
  }

  .Dropdown ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display:flex;
    flex-direction: column;
    align-items: center;
    font-size:1.5rem;
  }

  .Dropdown li {
    padding: 10px;
  }

  .Dropdown a {
    color: black;
    text-decoration: none;
  }

  .Dropdown a:hover {
    background-color: #f4f4f4;
  }

  .translate-before {
    transform: translateX(-20px) rotate(45deg);
  }

  .translate-after {
    transform: translateX(-20px) rotate(-45deg);
  }

  .MenuIcon.active {
    transform: translateX(-20px);
    background-color: transparent;
  }

  .MenuIcon.active::before {
    transform: translateX(-20px) rotate(45deg);
  }

  .MenuIcon.active::after {
    transform: translateX(-20px) rotate(-45deg);
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
