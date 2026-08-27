import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'
import { AssetsPage } from '../../pages/AssetsPage'
import { AssetFormPage } from '../../pages/AssetFormPage'

const EMAIL = process.env.TEST_USER_EMAIL!
const PASSWORD = process.env.TEST_USER_PASSWORD!

test.describe('Assets Page', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.loginAndWaitForDashboard(EMAIL, PASSWORD)
  })

  test('should load the assets page', async ({ page }) => {
    const assetsPage = new AssetsPage(page)

    await assetsPage.goto()

    await expect(page).toHaveURL(/\/assets/)
    await assetsPage.expectLoaded()
  })

  test('should navigate to new asset page', async ({ page }) => {
    const assetsPage = new AssetsPage(page)
    const assetFormPage = new AssetFormPage(page)

    await assetsPage.goto()
    await assetsPage.clickNewAsset()

    await expect(page).toHaveURL(/\/assets\/new/)
    await assetFormPage.expectCreateFormLoaded()
  })

  test('should update the URL when searching by name', async ({ page }) => {
    const assetsPage = new AssetsPage(page)

    await assetsPage.goto()
    await assetsPage.searchFor('prod')

    await expect(page).toHaveURL(/\/assets\?.*search=prod/)
  })
})
