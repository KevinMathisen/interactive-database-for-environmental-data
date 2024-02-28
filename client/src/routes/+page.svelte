<!-- // Home/Map page logic here </script><style> /* CSS here */ </style><div>Welcome to the Home/Map Page</div> -->
<script>
    import LeafletMap from '$lib/LeafletMap.svelte';
    import Filter from '$lib/filter.svelte';
    import FilterButton from '$lib/filterButton.svelte';
</script>

<LeafletMap />

<Filter/>

<FilterButton/>

