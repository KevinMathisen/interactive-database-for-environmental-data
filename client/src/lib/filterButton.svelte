<script>
    let count = 0;
  
    function toggleFilter() {
        console.log("hi")
    }
</script>
  
<button id="filterButton" on:click={toggleFilter}>&lt;</button>
  
<style>
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      left: 300px;
      top: 50vh;
      height: 80px;
      width: 35px;
      background-color: white;
      border: 3px solid black;
      border-radius: 0 1rem 1rem 0;
      font-size: 2rem;
      font-weight: lighter;
      transition: transform 1.5s ease;    /* Animation for the button */
      z-index: 900;                       /* Makes the button overlap the map, but not overlap the filter */
      cursor: pointer;
    }
  
    button:hover {
      background-color: #435768;
    }
</style>
  