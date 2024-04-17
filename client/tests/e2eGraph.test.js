import { test, expect } from '@playwright/test'
import { riverWithSpeciesJson, riverSummaryJson, stationSummaryJson, stationWithSpeciesJson } from './test-data/postgrestTestData'

const RIVER_ENDPOINT = '/river_with_species'
const STATION_ENDPOINT = '/station_with_species'
const POSTGREST_URL = 'http://localhost:8000/postgrest'
const RIVER_SUMMARY = '/river_summary?id=eq.3'
const STATION_SUMMARY = '/station_summary?id=eq.11'

test.describe('Tests the graph page', () => {
  test('Testing expected values from graph page', async ({ page }) => {
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
    await page.goto('/graph')
    await page.waitForTimeout(1000)
    await page.click('.close')
    await page.click('text=Rediger')
    await page.waitForTimeout(2000)
    await page.fill('input[placeholder="Legg til Elv"]', 'Gaula')
    await expect(page.locator('text=Gaula 2021-09-30')).toBeVisible()
    await page.click('text=+')
    await page.waitForTimeout(500)
    await page.click('text=Ferdig')
    await page.waitForTimeout(500)
    await page.click('text=egendefinert')
    await page.waitForTimeout(500)
    await page.fill('input[placeholder="Legg til art"]', 'aure')
    await page.waitForTimeout(500)
    await page.click('text=+')
    await page.waitForTimeout(500)
    await page.click('text=Sektordiagram')
    await page.waitForTimeout(500)
    await page.getByRole('button', { name: 'Velg elver/stasjoner' }).click()
    await page.locator('#showPlotA').uncheck()
    await page.getByRole('button', { name: 'Art', exact: true }).click()
    await page.getByRole('button', { name: 'Fordeling av arter' }).click()
    await page.getByPlaceholder('mm').click()
    await page.waitForTimeout(500)
    await page.getByPlaceholder('mm').fill('15')
    await page.waitForTimeout(500)
  }, { timeout: 30000 })
})
