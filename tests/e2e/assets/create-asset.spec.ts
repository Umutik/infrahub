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
        await assetFormPage.goto()
        await assetFormPage.fillForm({
            name: 'Test Asset',
            type: 'Router',
            environment: 'Production',
            status: 'active',
            description: 'This is a test asset'
        })

        await assetFormPage.submit()

        const assetsPage = new AssetsPage(page)
        await assetsPage.expectLoaded()
        await assetsPage.expectAssetVisible('Test Asset')
    })
})