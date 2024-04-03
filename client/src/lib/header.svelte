<script>
  import { page } from '$app/stores'
  import Button from './Button.svelte'

  let showDropdown = false;

  function toggleDropdown() {
    showDropdown = !showDropdown;
  }
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
  <div class="Menu centerItem" on:click={toggleDropdown}>
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

  .Menu {
    display: none;
    margin-right: 3rem;
    background-color: #435768;
    width: 200px;
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
      background-color: white;
      width: 40px;
      height: 5px;
      border-radius: 5px;
      position: absolute;
      transition: all 0.5s;
  }

  .MenuIcon::before,
  .MenuIcon::after {
    content: "";
  }

  .MenuIcon::before {
      transform: translate(0, -12px);
  }

  .MenuIcon::after {
      transform: translate(0, 12px);
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
    border: 1px solid #ccc;
    border-radius: 10px;
    width: 200px;
    z-index: 10005;
  }

  .Dropdown ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display:flex;
    flex-direction: column;
    align-items: center;
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
    transform: rotate(45deg);
  }

  .MenuIcon.active::after {
    transform: rotate(-45deg);
  }
</style>
