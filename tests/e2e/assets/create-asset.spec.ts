import { test } from '@playwright/test'
import { AssetsPage } from '../../pages/AssetsPage'
import { LoginPage } from '../../pages/LoginPage'
import { AssetFormPage } from '../../pages/AssetFormPage'

const EMAIL = process.env.TEST_USER_EMAIL ?? 'playwright@infrahub.dev'
const PASSWORD = process.env.TEST_USER_PASSWORD ?? 'PlaywrightPass123!'

test.describe('Assets Page Create Asset', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)

        await loginPage.goto()
        await loginPage.loginAndWaitForDashboard(EMAIL, PASSWORD)
    })

    test('Create a new asset', async ({ page }) => {
        const assetFormPage = new AssetFormPage(page)
        const assetsPage = new AssetsPage(page)

        const assetName = `PW-CREATE-${Date.now()}`

        await assetFormPage.goto()

        await assetFormPage.fillForm({
            name: assetName,
            type: 'Router',
            environment: 'Production',
            status: 'active',
            description: 'Created by Playwright',
          })
          
          await assetFormPage.submitCreate()
          await assetsPage.expectAssetVisible(assetName)

    })
})