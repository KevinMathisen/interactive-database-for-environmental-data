import { test, expect } from '@playwright/test'
import { config } from 'dotenv'

config({ path: '.env.test' })

const UPLOAD_URL = 'http://localhost:8000'
const UPLOAD_ENDPOINT = '/api/upload/'
console.log(`UPLOAD_URL: ${UPLOAD_URL}${UPLOAD_ENDPOINT}`)


test.describe('Tests the upload page', () => {
  test('Testing upload functioality and checking the format', async ({ page }) => {
    /**
     * Intercepts and mocks a POST request to the upload endpoint.
     * @param {Route} route - The intercepted route.
     */
    await page.route(`${UPLOAD_URL}${UPLOAD_ENDPOINT}`, (route) => {
      console.log(`Mocking POST request to ${UPLOAD_URL}${UPLOAD_ENDPOINT}`)

      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true
        })
      })
    })

    try {
      await page.goto('/upload')
      const fileChooserPromise = page.waitForEvent('filechooser')
      await page.getByRole('link', { name: 'Bla gjennom Filer listIcon' }).click()
      const fileChooser = await fileChooserPromise
      await fileChooser.setFiles('tests/test-data/elver.xlsx')
      await page.getByRole('main').getByRole('link', { name: 'Last opp listIcon' }).click()
      expect(await page.locator('//h3')).toHaveText('Opplasting vellykket')
      await page.getByRole('button', { name: 'Close' }).click()
    } catch (error) {
      logToFile('Test failed: ' + error.message)
      throw error
    }
  }, { timeout: 5000 })
})
