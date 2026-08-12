import { test } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'
import { AssetsPage } from '../../pages/AssetsPage'
import { AssetFormPage } from '../../pages/AssetFormPage'

const EMAIL = process.env.TEST_USER_EMAIL!
const PASSWORD = process.env.TEST_USER_PASSWORD!

test.describe('Assets Page Search', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)

    await loginPage.goto()
    await loginPage.loginAndWaitForDashboard(EMAIL, PASSWORD)
  })

  test('search filters assets by name', async ({ page }) => {
    const assetsPage = new AssetsPage(page)
    const assetFormPage = new AssetFormPage(page)
  
    const timestamp = Date.now()
    const matchingAssetName = `PW-SEARCH-MATCH-${timestamp}`
    const nonMatchingAssetName = `PW-SEARCH-OTHER-${timestamp}`
  
    const createdAssets: string[] = []
  
    try {
      await assetFormPage.goto()
      await assetFormPage.fillForm({
        name: matchingAssetName,
        type: 'Router',
        environment: 'Production',
        status: 'active',
        description: 'Created as matching search data',
      })
      await assetFormPage.submitCreate()
      createdAssets.push(matchingAssetName)
  
      await assetFormPage.goto()
      await assetFormPage.fillForm({
        name: nonMatchingAssetName,
        type: 'Switch',
        environment: 'Staging',
        status: 'inactive',
        description: 'Created as non-matching search data',
      })
      await assetFormPage.submitCreate()
      createdAssets.push(nonMatchingAssetName)
  
      await assetsPage.searchFor(matchingAssetName)
  
      await assetsPage.expectAssetVisible(matchingAssetName)
      await assetsPage.expectAssetNotVisible(nonMatchingAssetName)
    } finally {
      await assetsPage.goto()
  
      for (const assetName of createdAssets) {
        await assetsPage.deleteAsset(assetName)
      }
    }
  })
})