import { test, expect } from '@playwright/test'
import {riverWithSpeciesJson, riverSummaryJson, stationDownloadJson, stationSummaryJson, stationWithSpeciesJson} from './test-data/postgrestTestData'

const RIVER_ENDPOINT = '/river_with_species'
const STATION_ENDPOINT = '/station_with_species'
const POSTGREST_URL = 'http://localhost:8000/postgrest'
const RIVER_SUMMARY = '/river_summary?id=eq.3'
const STATION_SUMMARY = '/station_summary?id=eq.11'

test.describe('Tests the map page', () => {
  test('Testing selecting riverpoint and summary table', async ({ page }) => {
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
      await page.goto('/')
      await page.waitForTimeout(500)
      await page.locator('.leaflet-marker-icon').first().click()
      await page.waitForTimeout(500)
      await page.click('text=Info')
      await page.waitForTimeout(500)
      await page.getByRole('cell', { name: '1', exact: true }).click()
      await page.waitForTimeout(500)
      expect(page.getByText('Gaula 1')).toBeVisible()
      await page.waitForTimeout(500)
    } catch (error) {
      throw error
    }
  }, { timeout: 30000 })
})
