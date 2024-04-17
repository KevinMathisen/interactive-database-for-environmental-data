<svelte:head>
  <!-- Preload icons -->
  <link rel="preload" href="/closeIcon.svg" as="image">
  <link rel="preload" href="/downloadIcon.svg" as="image">
  <link rel="preload" href="/editIcon.svg" as="image">
  <link rel="preload" href="/errorIcon.svg" as="image">
  <link rel="preload" href="/fileSearchIcon.svg" as="image">
  <link rel="preload" href="/graphIcon.svg" as="image">
  <link rel="preload" href="/listIcon.svg" as="image">
  <link rel="preload" href="/loginIcon.svg" as="image">
  <link rel="preload" href="/logoutIcon.svg" as="image">
  <link rel="preload" href="/mapIcon.svg" as="image">
  <link rel="preload" href="/marker-icon-blue.png" as="image">
  <link rel="preload" href="/marker-icon-orange.png" as="image">
  <link rel="preload" href="/marker-icon-red.png" as="image">
  <link rel="preload" href="/marker-shadow.png" as="image">
  <link rel="preload" href="/successIcon.svg" as="image">
  <link rel="preload" href="/uploadIcon.svg" as="image">
</svelte:head>

<script>
  import Header from '$lib/Header.svelte'
  import '../global.css'
</script>

<Header />
<main>
  <slot />
</main>
