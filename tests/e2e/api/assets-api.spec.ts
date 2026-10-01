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

test('POST /api/assets returns 400 for missing required fields', async ({ page }) => {
  const loginPage = new LoginPage(page)

  await loginPage.goto()
  await loginPage.loginAndWaitForDashboard(EMAIL, PASSWORD)

  const invalidAssetData = {
    asset_name: 'Test Asset',
    asset_type: 'Router',
    environment: 'Production',
    description: 'Created by API test', 
  }

  const invalidResponse = await page.request.post('/api/assets', {
    data: invalidAssetData
  })
  expect(invalidResponse.status()).toBe(400)

  const invalidBody = await invalidResponse.json()
  expect(invalidBody.error).toBe('Missing required fields')
})

test('POST /api/assets returns 400 for invalid status', async ({ page }) => {
  const loginPage = new LoginPage(page)

  await loginPage.goto()
  await loginPage.loginAndWaitForDashboard(EMAIL, PASSWORD)

  const invalidAssetStatus = {
    asset_name: 'Test Asset1',
    asset_type: 'Server',
    environment: 'Staging',
    status: 'banana',
    description: 'Created by API test',
  }
   const invalidStatusResponse = await page.request.post('/api/assets', {
    data: invalidAssetStatus
  })

   expect(invalidStatusResponse.status()).toBe(400)

   const invalidStatusBody = await invalidStatusResponse.json()
   expect(invalidStatusBody.error).toBe('Invalid status')

})

test('PUT /api/assets/:id updates an asset', async ({ page }) => {
  const loginPage = new LoginPage(page)

  await loginPage.goto()
  await loginPage.loginAndWaitForDashboard(EMAIL, PASSWORD)

  const assetName = `PW-API-${Date.now()}`

  const assetData = {
    asset_name: assetName,
    asset_type: 'Router',
    environment: 'Staging',
    status: 'retired',
    description: 'Created by API test',
  }

  const createResponse = await page.request.post('/api/assets', {
    data: assetData
  })

  expect(createResponse.status()).toBe(201)
  const createBody = await createResponse.json()

  const assetId = createBody.data.id 

  try {

  const updatedData ={ 
    asset_name: assetName,
    asset_type: 'Router',
    environment: 'Production',
    status: 'active',
    description: 'Created by API test'
  }
  
  const updateResponse = await page.request.put(`/api/assets/${assetId}`, {
    data: updatedData
  })

  expect(updateResponse.status()).toBe(200)
  const updatedBody = await updateResponse.json()
  expect(updatedBody.data.environment).toBe(updatedData.environment)
  expect(updatedBody.data.status).toBe(updatedData.status)

  const getResponse = await page.request.get(`/api/assets/${assetId}`)

  expect(getResponse.status()).toBe(200)
  
  const getBody = await getResponse.json()

  
  expect(getBody.data.environment).toBe(updatedData.environment)
  expect(getBody.data.status).toBe(updatedData.status)

  } finally {
  const deleteResponse = await page.request.delete(`/api/assets/${assetId}`)
  expect(deleteResponse.status()).toBe(204)
  }
})