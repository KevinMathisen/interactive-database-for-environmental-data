import { test, expect } from '@playwright/test'

const RIVER_ENDPOINT = '/river_with_species'
const STATION_ENDPOINT = '/station_with_species'
const POSTGREST_URL = 'http://localhost:8000/postgrest'
const RIVER_SUMMARY = '/river_summary?id=eq.3'
const STATION_DOWNLOAD = '/station_download?id=eq.11'
const STATION_SUMMARY = '/station_summary?id=eq.11'

test.describe('Tests the graph page', () => {
  test('Testing expected values from graph page', async ({ page }) => {
    await page.route(`${POSTGREST_URL}${RIVER_ENDPOINT}`, route => {
      console.log(`Mocking GET request to ${POSTGREST_URL}${RIVER_ENDPOINT}`)
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([{
          id: 3,
          name: 'Gaula',
          pos: {
            type: 'Point',
            coordinates: [10.25962, 63.25848]
          },
          start_date: '2021-09-30',
          end_date: '2021-09-30',
          species: ['aure', 'laks', '3-pigga stingsild', 'skrubbe'],
          project_id: 'Restaureringsprosjektet'
        }])
      })
    })

    await page.route(`${POSTGREST_URL}${RIVER_SUMMARY}`, route => {
      console.log(`Mocking GET request to ${POSTGREST_URL}${RIVER_SUMMARY}`)
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([{
          id: 3,
          name: 'Gaula',
          start_date: '2021-09-30',
          end_date: '2021-09-30',
          project_id: 'Restaureringsprosjektet',
          waterflow: 320,
          boat_type: 'Volt Maria',
          skipper: 'Jon Museth',
          crew: ['Tobias Holter', 'Erik Lie', ''],
          comment: 'Testdatasett',
          stations: [11]
        }
        ])
      })
    })

    await page.route(`${POSTGREST_URL}${STATION_DOWNLOAD}`, route => {
      console.log(`Mocking GET request to ${POSTGREST_URL}${STATION_DOWNLOAD}`)
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([{
          id: 11,
          transect_length: null,
          display: null,
          gpx_file: null,
          observations: [
            {
              species: 'aure',
              length: 176,
              count: 1
            },
            {
              species: 'aure',
              length: 128,
              count: 1
            },
            {
              species: 'aure',
              length: 166,
              count: 1
            },
            {
              species: 'aure',
              length: 171,
              count: 1
            },
            {
              species: 'aure',
              length: 158,
              count: 1
            },
            {
              species: 'aure',
              length: 92,
              count: 1
            },
            {
              species: 'aure',
              length: 260,
              count: 1
            },
            {
              species: 'aure',
              length: 128,
              count: 1
            },
            {
              species: 'aure',
              length: 149,
              count: 1
            },
            {
              species: 'aure',
              length: 115,
              count: 1
            },
            {
              species: 'aure',
              length: 150,
              count: 1
            },
            {
              species: 'aure',
              length: 154,
              count: 1
            },
            {
              species: 'aure',
              length: 169,
              count: 1
            },
            {
              species: 'aure',
              length: 150,
              count: 1
            },
            {
              species: 'aure',
              length: 165,
              count: 1
            },
            {
              species: 'aure',
              length: 115,
              count: 1
            },
            {
              species: 'aure',
              length: 80,
              count: 1
            },
            {
              species: 'aure',
              length: 152,
              count: 1
            },
            {
              species: 'aure',
              length: 102,
              count: 1
            },
            {
              species: 'aure',
              length: 99,
              count: 1
            },
            {
              species: 'aure',
              length: 60,
              count: 1
            },
            {
              species: 'aure',
              length: 58,
              count: 1
            },
            {
              species: 'aure',
              length: 58,
              count: 1
            },
            {
              species: 'aure',
              length: 180,
              count: 1
            },
            {
              species: 'aure',
              length: 78,
              count: 1
            },
            {
              species: 'aure',
              length: 126,
              count: 1
            },
            {
              species: 'aure',
              length: 151,
              count: 1
            },
            {
              species: 'aure',
              length: 55,
              count: 1
            },
            {
              species: 'aure',
              length: 88,
              count: 1
            },
            {
              species: 'aure',
              length: 99,
              count: 1
            },
            {
              species: 'aure',
              length: 72,
              count: 1
            },
            {
              species: 'aure',
              length: 78,
              count: 1
            },
            {
              species: 'aure',
              length: 136,
              count: 1
            },
            {
              species: 'aure',
              length: 196,
              count: 1
            },
            {
              species: 'aure',
              length: 125,
              count: 1
            },
            {
              species: 'aure',
              length: 60,
              count: 1
            },
            {
              species: 'aure',
              length: 138,
              count: 1
            },
            {
              species: 'laks',
              length: 118,
              count: 1
            },
            {
              species: 'laks',
              length: 111,
              count: 1
            },
            {
              species: 'laks',
              length: 89,
              count: 1
            },
            {
              species: 'laks',
              length: 113,
              count: 1
            },
            {
              species: 'laks',
              length: 95,
              count: 1
            },
            {
              species: 'laks',
              length: 121,
              count: 1
            },
            {
              species: 'laks',
              length: 122,
              count: 1
            },
            {
              species: 'laks',
              length: 140,
              count: 1
            },
            {
              species: 'laks',
              length: 118,
              count: 1
            },
            {
              species: 'laks',
              length: 86,
              count: 1
            },
            {
              species: 'laks',
              length: 85,
              count: 1
            },
            {
              species: 'laks',
              length: 82,
              count: 1
            },
            {
              species: 'laks',
              length: 101,
              count: 1
            },
            {
              species: 'laks',
              length: 117,
              count: 1
            },
            {
              species: 'laks',
              length: 78,
              count: 1
            },
            {
              species: 'laks',
              length: 121,
              count: 1
            },
            {
              species: 'laks',
              length: 117,
              count: 1
            },
            {
              species: 'laks',
              length: 71,
              count: 1
            },
            {
              species: 'laks',
              length: 43,
              count: 1
            },
            {
              species: 'laks',
              length: 90,
              count: 1
            },
            {
              species: '3-pigga stingsild',
              length: 25,
              count: 1
            },
            {
              species: '3-pigga stingsild',
              length: 35,
              count: 1
            },
            {
              species: '3-pigga stingsild',
              length: 29,
              count: 1
            },
            {
              species: 'aure',
              length: 108,
              count: 1
            },
            {
              species: 'aure',
              length: 90,
              count: 1
            },
            {
              species: 'aure',
              length: 65,
              count: 1
            },
            {
              species: 'aure',
              length: 108,
              count: 1
            },
            {
              species: 'aure',
              length: 52,
              count: 1
            },
            {
              species: 'aure',
              length: 135,
              count: 1
            },
            {
              species: 'aure',
              length: 53,
              count: 1
            },
            {
              species: 'aure',
              length: 165,
              count: 1
            },
            {
              species: 'aure',
              length: 71,
              count: 1
            },
            {
              species: 'aure',
              length: 69,
              count: 1
            },
            {
              species: 'aure',
              length: 117,
              count: 1
            },
            {
              species: 'aure',
              length: 64,
              count: 1
            },
            {
              species: 'aure',
              length: 218,
              count: 1
            },
            {
              species: 'aure',
              length: 126,
              count: 1
            },
            {
              species: 'aure',
              length: 133,
              count: 1
            },
            {
              species: 'aure',
              length: 87,
              count: 1
            },
            {
              species: 'aure',
              length: 133,
              count: 1
            },
            {
              species: 'aure',
              length: 115,
              count: 1
            },
            {
              species: 'aure',
              length: 56,
              count: 1
            },
            {
              species: 'aure',
              length: 65,
              count: 1
            },
            {
              species: 'aure',
              length: 55,
              count: 1
            },
            {
              species: 'aure',
              length: 104,
              count: 1
            },
            {
              species: 'aure',
              length: 104,
              count: 1
            },
            {
              species: 'skrubbe',
              length: 110,
              count: 1
            },
            {
              species: 'skrubbe',
              length: 114,
              count: 1
            },
            {
              species: 'skrubbe',
              length: 86,
              count: 1
            }
          ]
        }])
      })
    })

    await page.route(`${POSTGREST_URL}${STATION_SUMMARY}`, route => {
      console.log(`Mocking GET request to ${POSTGREST_URL}${STATION_SUMMARY}`)
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([{
          id: 11,
          name: 'Gaula 1',
          date: '2021-09-30',
          time: '8:00',
          river_id: 3,
          description: 'Oppstrøms planlagt tiltaksområde, elvevenstre, Hofstadmoen',
          comment: 'Elve-venstre, forbygning, 200-600 mm substrat',
          river_type: 'Glattstrøm',
          weather: 'Snø',
          water_temp: 8.0,
          air_temp: -1,
          sec_fished: 550,
          voltage: 1000,
          pulse: 60,
          conductivity: 77,
          observations: [
            {
              species: 'aure',
              length: 176,
              count: 1
            },
            {
              species: 'aure',
              length: 128,
              count: 1
            },
            {
              species: 'aure',
              length: 166,
              count: 1
            },
            {
              species: 'aure',
              length: 171,
              count: 1
            },
            {
              species: 'aure',
              length: 158,
              count: 1
            },
            {
              species: 'aure',
              length: 92,
              count: 1
            },
            {
              species: 'aure',
              length: 260,
              count: 1
            },
            {
              species: 'aure',
              length: 128,
              count: 1
            },
            {
              species: 'aure',
              length: 149,
              count: 1
            },
            {
              species: 'aure',
              length: 115,
              count: 1
            },
            {
              species: 'aure',
              length: 150,
              count: 1
            },
            {
              species: 'aure',
              length: 154,
              count: 1
            },
            {
              species: 'aure',
              length: 169,
              count: 1
            },
            {
              species: 'aure',
              length: 150,
              count: 1
            },
            {
              species: 'aure',
              length: 165,
              count: 1
            },
            {
              species: 'aure',
              length: 115,
              count: 1
            },
            {
              species: 'aure',
              length: 80,
              count: 1
            },
            {
              species: 'aure',
              length: 152,
              count: 1
            },
            {
              species: 'aure',
              length: 102,
              count: 1
            },
            {
              species: 'aure',
              length: 99,
              count: 1
            },
            {
              species: 'aure',
              length: 60,
              count: 1
            },
            {
              species: 'aure',
              length: 58,
              count: 1
            },
            {
              species: 'aure',
              length: 58,
              count: 1
            },
            {
              species: 'aure',
              length: 180,
              count: 1
            },
            {
              species: 'skrubbe',
              length: 114,
              count: 1
            },
            {
              species: 'skrubbe',
              length: 86,
              count: 1
            }
          ],
          project_id: 'Restaureringsprosjektet'
        }
        ])
      })
    })

    await page.route(`${POSTGREST_URL}${STATION_ENDPOINT}`, route => {
      console.log(`Mocking GET request to ${POSTGREST_URL}${STATION_ENDPOINT}`)
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([{
          id: 11,
          name: 'Gaula 1',
          start_pos: {
            type: 'Point',
            coordinates: [10.25962, 63.25848]
          },
          end_pos: {
            type: 'Point',
            coordinates: [10.26344, 63.25887]
          },
          date: '2021-09-30',
          time: '08:00',
          species: ['aure', 'laks', '3-pigga stingsild', 'skrubbe']
        }
        ])
      })
    })

    try {
      await page.goto('/graph')
      await page.waitForTimeout(1000)
      await page.screenshot({ path: 'screenshots/graph/1-navigation.png' })

      await page.click('text=Rediger')
      await page.screenshot({ path: 'screenshots/graph/2-edit-rivers.png' })

      await page.fill('input[placeholder="Legg til Elv"]', 'Gaula')
      await expect(page.locator('text=Gaula 2021-09-30')).toBeVisible()
      await page.screenshot({ path: 'screenshots/graph/3-typed-in-search.png' })

      await page.click('text=+')
      await page.screenshot({ path: 'screenshots/graph/4-river-added.png' })

      await page.click('text=Ferdig')
      await page.click('text=egendefinert')
      await page.fill('input[placeholder="Legg til art"]', 'aure')
      await page.click('text=+')
      await page.waitForTimeout(500)
      await page.screenshot({ path: 'screenshots/graph/5-modal-closed.png' })

      await page.click('text=Sektordiagram')
      await page.waitForTimeout(500)
      await page.screenshot({ path: 'screenshots/graph/6-pie-chart.png' })

      await page.getByRole('button', { name: 'Velg elver/stasjoner' }).click()
      await page.locator('#showPlotA').uncheck()
      await page.getByRole('button', { name: 'Art', exact: true }).click()
      await page.getByRole('button', { name: 'Fordeling av arter' }).click()
      await page.waitForTimeout(500)
      await page.screenshot({ path: 'screenshots/graph/7-bar-chart.png' })

      await page.getByPlaceholder('mm').click()
      await page.getByPlaceholder('mm').fill('15')

      await page.waitForTimeout(500)
      await page.screenshot({ path: 'screenshots/graph/8-bar-chart-15.png' })
    } catch (error) {
      logToFile('Test failed: ' + error.message)
      throw error
    }
  }, { timeout: 5000 })
})
