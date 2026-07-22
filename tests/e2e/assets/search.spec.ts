import { test } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'
import { AssetsPage } from '../../pages/AssetsPage'

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

    await assetsPage.goto()
    await assetsPage.expectLoaded()

    await assetsPage.searchFor('db-prod')

    await assetsPage.expectAssetVisible('db-prod-02')
    await assetsPage.expectAssetNotVisible('test03')
  })
})