import { render, fireEvent } from '@testing-library/svelte'
import { describe, expect, it } from 'vitest'
import Table from './Table.svelte'

/**
 * @vitest-environment jsdom
 */

describe('Table', () => {
  it('renders correctly and sorts rows', async () => {
    const headers = ['Name', 'Age']
    const rows = [[1, 'John', 30], [2, 'Jane', 20]]

    const { getByText } = render(Table, { datatype: 'test', headers, rows, clickable: false })

    // Check if headers are rendered correctly
    headers.forEach(header => {
      expect(getByText(header)).toBeTruthy()
    })

    // Check if rows are rendered correctly
    rows.forEach(row => {
      expect(getByText(row[1])).toBeTruthy()
      expect(getByText(String(row[2]))).toBeTruthy()
    })

    // Click the 'Age' header to sort the rows
    await fireEvent.click(getByText('Age'))

    // Check if rows are sorted correctly
    const sortedRows = [[2, 'Jane', 20], [1, 'John', 30]]
    sortedRows.forEach((row) => {
      const rowElement = getByText(row[1]).closest('tr')
      const cells = rowElement.querySelectorAll('td')
      expect(cells[0].textContent).toBe(row[1])
      expect(cells[1].textContent).toBe(String(row[2]))
    })
  })
})
