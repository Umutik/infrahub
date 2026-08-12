import { test } from '@playwright/test'
import { AssetsPage } from '../../pages/AssetsPage'
import { LoginPage } from '../../pages/LoginPage'
import { AssetFormPage } from '../../pages/AssetFormPage'

const EMAIL = process.env.TEST_USER_EMAIL!
const PASSWORD = process.env.TEST_USER_PASSWORD!

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page)

  await loginPage.goto()
  await loginPage.loginAndWaitForDashboard(EMAIL, PASSWORD)
})

test('Create a new asset', async ({ page }) => {
    const assetFormPage = new AssetFormPage(page)
    const assetsPage = new AssetsPage(page)
  
    const assetName = `PW-CREATE-${Date.now()}`
    let assetCreated = false
  
    await assetFormPage.goto()
  
    await assetFormPage.fillForm({
      name: assetName,
      type: 'Router',
      environment: 'Production',
      status: 'active',
      description: 'Created by Playwright',
    })
  
    await assetFormPage.submitCreate()
    assetCreated = true
  
    try {
      await assetsPage.expectAssetVisible(assetName)
    } finally {
      if (assetCreated) {
        await assetsPage.deleteAsset(assetName)
      }
    }
  })