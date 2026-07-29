import { test } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'
import { AssetsPage } from '../../pages/AssetsPage'
import { AssetFormPage } from '../../pages/AssetFormPage'

const EMAIL = process.env.TEST_USER_EMAIL ?? 'playwright@infrahub.dev'
const PASSWORD = process.env.TEST_USER_PASSWORD ?? 'PlaywrightPass123!'

test.describe('Assets Page Search', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)

    await loginPage.goto()
    await loginPage.loginAndWaitForDashboard(EMAIL, PASSWORD)
  })

  test('search filters assets by name', async ({ page }) => {
    const assetsPage = new AssetsPage(page)
    const assetFormPage = new AssetFormPage(page)

    const assetName = `PW-SEARCH-${Date.now()}`

    await assetFormPage.goto()
    await assetFormPage.fillForm({
        name: assetName,
        type: 'Router',
        environment: 'Production',
        status: 'active',
        description: 'Created for search test',
    })
    await assetFormPage.submitCreate()

    await page.reload()

    await assetsPage.searchFor(assetName)

    await assetsPage.expectAssetVisible(assetName)
    await assetsPage.expectAssetNotVisible('test03')
  })
})