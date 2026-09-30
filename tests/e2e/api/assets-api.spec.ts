import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'

const EMAIL = process.env.TEST_USER_EMAIL!
const PASSWORD = process.env.TEST_USER_PASSWORD!

test('GET /api/assets returns an assets array', async ({ page }) => {
  const loginPage = new LoginPage(page)

  await loginPage.goto()
  await loginPage.loginAndWaitForDashboard(EMAIL, PASSWORD)

  const response = await page.request.get('/api/assets')

  expect(response.status()).toBe(200)

  const body = await response.json()

  expect(Array.isArray(body.data)).toBe(true)
  expect(body).toHaveProperty('data')
  expect(body.data.length).toBeGreaterThan(0)

  const firstAsset = body.data[0]

  expect(firstAsset).toHaveProperty('asset_name')
  expect(typeof firstAsset.asset_name).toBe('string')
  expect(firstAsset).toHaveProperty('asset_type')
  expect(typeof firstAsset.asset_type).toBe('string')
  expect(firstAsset).toHaveProperty('environment')
  expect(typeof firstAsset.environment).toBe('string')
  expect(firstAsset).toHaveProperty('status')
  expect(typeof firstAsset.status).toBe('string')

  const allowedStatuses = [
    'active',
    'inactive',
    'retired',
    'maintenance',
  ]

  expect(allowedStatuses).toContain(firstAsset.status)
})

test('POST /api/assets creates an asset', async ({ page }) => {
  const loginPage = new LoginPage(page)

  await loginPage.goto()
  await loginPage.loginAndWaitForDashboard(EMAIL, PASSWORD)

  const assetName = `PW-API-${Date.now()}`

  const assetData = {
    asset_name: assetName,
    asset_type: 'Router',
    environment: 'Staging',
    status: 'inactive',
    description: 'Created by API test',
  }

  const response = await page.request.post('/api/assets', {
    data: assetData
  })

  expect(response.status()).toBe(201)
  const body = await response.json()

  expect(body.data.asset_name).toBe(assetData.asset_name)
  expect(body.data.asset_type).toBe(assetData.asset_type)
  expect(body.data.environment).toBe(assetData.environment)
  expect(body.data.status).toBe(assetData.status)

  const getResponse = await page.request.get(
    `/api/assets/${body.data.id}`
  )

  expect(getResponse.status()).toBe(200)

  const getBody = await getResponse.json()
  expect(getBody.data.asset_name).toBe(assetData.asset_name)
  expect(getBody.data.asset_type).toBe(assetData.asset_type)
  expect(getBody.data.environment).toBe(assetData.environment)
  expect(getBody.data.status).toBe(assetData.status)

  const deleteResponse = await page.request.delete(
    `/api/assets/${body.data.id}`
  )
  expect(deleteResponse.status()).toBe(204)

  const getAfterDeleteResponse = await page.request.get(
    `/api/assets/${body.data.id}`
  )

  expect(getAfterDeleteResponse.status()).toBe(404)
})
