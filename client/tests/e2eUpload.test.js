import { test, expect } from '@playwright/test'
import path, { dirname } from 'path'
import { config } from 'dotenv'
import { fileURLToPath } from 'url'

config({ path: '.env.test' })

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const UPLOAD_URL = 'http://localhost:8000'
const UPLOAD_ENDPOINT = '/api/upload/'
const filePath = path.join(__dirname, 'test-data', 'elver.xlsx')

test.describe('Tests the upload page', () => {
  test('Testing upload functioality and checking the format', async ({ page }) => {
    await page.route(`${UPLOAD_URL}${UPLOAD_ENDPOINT}`, (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true
        })
      })
    })
    await page.goto('/upload')
    await page.waitForTimeout(500)
    const fileChooserPromise = page.waitForEvent('filechooser')
    await page.getByRole('link', { name: 'Bla gjennom Filer listIcon' }).click()
    await page.waitForTimeout(3000)
    const fileChooser = await fileChooserPromise
    await fileChooser.setFiles(filePath)
    await page.getByRole('main').getByRole('link', { name: 'Last opp listIcon' }).click()
    await page.waitForTimeout(1000)
    expect(await page.locator('//h3')).toHaveText('Opplasting vellykket')
    await page.getByRole('button', { name: 'Close' }).click()
  }, { timeout: 30000 })
})
