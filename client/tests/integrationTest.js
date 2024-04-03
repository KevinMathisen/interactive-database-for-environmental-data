import { test, expect } from '@playwright/test'

test.describe('Download data flow', () => {
  test('users can select rivers and download data in the correct format', async ({ page }) => {
    await page.goto('http://localhost:4173/download') // Navigate to the download page ,
    // Click on the 'Edit rivers' button to open the selection modal
    await page.click('text=Rediger elver')
    // Type 'Ha' into the river search box and wait for the suggestions to appear
    await page.fill('input[placeholder="Legg til Elv"]', 'Ha')
    // The suggestions should appear as clickable options, so we can click the desired river
    await page.click('text=Hallingdalselva 2014-09-16')
    // Close the modal using the class for the close button
    await page.click('button.close') // Using the class from the provided HTML snippet
    // Select file format, for example 'csv'
    await page.click('input[type="radio"][value="csv"]')
    // Click the 'Download' button to start the download process
    const [download] = await Promise.all([
      page.waitForEvent('download'), // Waits for the download event
      page.click('text=Last ned') // Clicks the download button
    ])
    // Assert the filename is as expected
    expect(await download.suggestedFilename()).toBe('data.csv')
    // Assert that there was no download failure
    expect(await download.failure()).toBeFalsy()
    // This part is commented out as it would require access to the file system,
    // which we're not doing in this test. However, it's useful for real-world scenarios.
    // const path = await download.path();
    // expect(path).not.toBe(null);
    // You can perform additional checks on the downloaded file here
  })
})
