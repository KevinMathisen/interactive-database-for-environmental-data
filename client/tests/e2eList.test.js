import { test, expect } from '@playwright/test'
import {riverWithSpeciesJson, riverSummaryJson, stationDownloadJson, stationSummaryJson, stationWithSpeciesJson} from './test-data/postgrestTestData'

const RIVER_ENDPOINT = '/river_with_species'
const STATION_ENDPOINT = '/station_with_species'
const POSTGREST_URL = 'http://localhost:8000/postgrest'
const RIVER_SUMMARY = '/river_summary?id=eq.3'
const STATION_SUMMARY = '/station_summary?id=eq.11'

test.describe('Tests the list page', () => {
  test('Testing selection, searching, summary and show in the map functionality', async ({ page }) => {
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
      await page.goto('/list')
      await page.getByLabel('Stasjonsdata').check()
      await page.waitForTimeout(500)
      await page.locator('#listSearch').fill('Gaula 1')
      await page.waitForTimeout(500)
      await page.click('text=gaula 1')
      await page.waitForTimeout(500)
      await page.click('text=Se i kart')
      await page.waitForTimeout(500)
      expect(page.getByText('Gaula 1')).toBeVisible()
      await page.waitForTimeout(500)
    } catch (error) {
      throw error
    }
  }, { timeout: 30000 })
})
