import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'

const envFile =
  process.env.PLAYWRIGHT_ENV === 'production'
    ? '.env.production.test'
    : '.env.test'

dotenv.config({ path: envFile })

const requiredEnvVars = [
  'TEST_USER_EMAIL',
  'TEST_USER_PASSWORD',
]

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`)
  }
}

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,

  expect: {
    timeout: 8000,
  },

  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',

  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
