<!-- // Home/Map page logic here </script><style> /* CSS here */ </style><div>Welcome to the Home/Map Page</div> -->
<script>
    import LeafletMap from '$lib/LeafletMap.svelte';
    import Filter from '$lib/filter.svelte';
    import FilterButton from '$lib/filterButton.svelte';

    let sideBar = false;
    let sideBarTitle = 'Sidebar';

    function stationClicked(event) {
        // denne kalles også når kartet klikkes, må fikses
		sideBar = true;
        sideBarTitle = event.detail.text;
	}

    function mapClicked(event) {
        sideBar = false;
	}
</script>

<LeafletMap on:map={mapClicked} on:message={stationClicked}/>

<Filter/>

<FilterButton/>

{#if sideBar}
    <div class="sidebar">{sideBarTitle}</div>
{/if}


<style>
    .sidebar {
        position: absolute;
        top: 80px;
        right: 0;
        width: 200px;
        height: calc(100vh - 200px);
        background-color: #f4f4f4;
        z-index: 1000;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
</style>