import { test } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'
import { AssetsPage } from '../../pages/AssetsPage'
import { AssetFormPage } from '../../pages/AssetFormPage'

const EMAIL = process.env.TEST_USER_EMAIL!
const PASSWORD = process.env.TEST_USER_PASSWORD!

test.describe('Assets page Delete Asset', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)

    await loginPage.goto()
    await loginPage.loginAndWaitForDashboard(EMAIL, PASSWORD)
  })

  test('deletes an existing asset', async ({ page }) => {
    const assetsPage = new AssetsPage(page)
    const assetFormPage = new AssetFormPage(page)

    const assetName = `PW-DELETE-${Date.now()}`

    let assetCreated = false

    try {

      await assetFormPage.goto()
      await assetFormPage.fillForm({
        name: assetName,
        type: 'Router',
        environment: 'Staging',
        status: 'active',
        description: 'This asset was created for deletion test',
      })

      await assetFormPage.submitCreate()
      assetCreated = true
      await assetsPage.expectAssetVisible(assetName)

      await assetsPage.deleteAsset(assetName)
      assetCreated = false
      await assetsPage.expectAssetNotVisible(assetName)
    } finally {
      if (assetCreated) {
        await assetsPage.goto()
        await assetsPage.deleteAsset(assetName)
      }
    }
  })
})