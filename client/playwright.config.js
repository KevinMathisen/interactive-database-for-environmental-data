/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  webServer: {
    command: 'npm run build && npm run preview',
    port: 4173,
    warn: false
  },
  use: {
    baseURL: 'http://localhost:4173',
    viewport: { width: 1920, height: 1080 }
  },
  testDir: 'tests',
  testMatch: /(.+\.)?(test|spec)\.[jt]s/
}

export default config
