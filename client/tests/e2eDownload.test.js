import { test, expect } from '@playwright/test'
import {riverWithSpeciesJson, riverSummaryJson, stationDownloadJson, stationSummaryJson, stationWithSpeciesJson} from './test-data/postgrestTestData'

const RIVER_ENDPOINT = '/river_with_species'
const STATION_ENDPOINT = '/station_with_species'
const POSTGREST_URL = 'http://localhost:8000/postgrest'
const RIVER_SUMMARY = '/river_summary?id=eq.3'
const STATION_DOWNLOAD = '/station_download?id=eq.11'
const STATION_SUMMARY = '/station_summary?id=eq.11'

test.describe('Tests the download page', () => {
  test('users can select rivers and download data in the correct format', async ({ page }) => {
    await page.route(`${POSTGREST_URL}${RIVER_ENDPOINT}`, route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([riverWithSpeciesJson])
      })
    })

    await page.route(`${POSTGREST_URL}${RIVER_SUMMARY}`, route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([riverSummaryJson])
      })
    })

    await page.route(`${POSTGREST_URL}${STATION_DOWNLOAD}`, route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([stationDownloadJson])
      })
    })

    await page.route(`${POSTGREST_URL}${STATION_SUMMARY}`, route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([stationSummaryJson])
      })
    })

    await page.route(`${POSTGREST_URL}${STATION_ENDPOINT}`, route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([stationWithSpeciesJson])
      })
    })

    try {
      await page.goto('/download')
      await page.waitForTimeout(500)
      await page.click('text=Rediger')
      await page.waitForTimeout(2000)
      await page.fill('input[placeholder="Legg til Elv"]', 'gaula')
      await page.waitForTimeout(500)
      await expect(page.locator('text=Gaula 2021-09-30')).toBeVisible()
      await page.click('text=+')
      await page.waitForTimeout(500)
      await page.click('text=Ferdig')
      await page.waitForTimeout(500)
      await page.click('text=xlsx')
      await page.waitForTimeout(500)
      const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.click('.downloadButton a')
      ])
      const filename = await download.suggestedFilename()
      expect(filename).toBe('elver.xlsx')
    } catch (error) {
      throw error
    }
  }, { timeout: 30000 })
})
