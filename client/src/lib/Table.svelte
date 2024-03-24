<script>
  export let headers = [] // Header names
  export let rows = [] // Rows of data

</script>

<table>
  <thead>
    <tr>
      <!-- Create the headers -->
      {#each headers as header}
        <th>
          {header}
        </th>
      {/each}
    </tr>
  </thead>
  <tbody>
    <!-- Create the rows -->
    {#each rows as row}
      <tr>
        <!-- Create the cells -->
        {#each row as cell}
          <td>{cell}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  /* Header */
  th {
    background: #f0f0f0;
    padding: 8px;
    border-bottom: 1px solid black;
    text-align: left;
  }
  /* Rows */
  td {
    padding: 8px;
    border-bottom: 1px solid #eee;
  }
  /* Change background color of even rows*/
  tr:nth-child(even) {
    background: #f9f9f9;
  }
</style>
