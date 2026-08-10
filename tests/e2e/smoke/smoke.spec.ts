import { test } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'
import { DashboardPage } from '../../pages/DashboardPage'
import { AssetsPage } from '../../pages/AssetsPage'
import { AssetFormPage } from '../../pages/AssetFormPage'


const EMAIL = process.env.TEST_USER_EMAIL!
const PASSWORD = process.env.TEST_USER_PASSWORD!

test.describe('Smoke Test', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.goto()
        await loginPage.loginAndWaitForDashboard(EMAIL, PASSWORD)
    })

    test( 'user can login, create and delete an asset', async ({ page }) => {
        const assetsPage = new AssetsPage(page)
        const assetFormPage = new AssetFormPage(page)
        const dashboardPage = new DashboardPage(page)
        await dashboardPage.expectLoaded()
        await assetsPage.goto()
        await assetsPage.expectLoaded()

        const assetName = `PW-SMOKE-${Date.now()}`
        let assetCreated = false

        await assetFormPage.goto()
        await assetFormPage.fillForm({
            name: assetName,
            type: 'Router',
            environment: 'Production',
            status: 'active',
            description: 'Created for smoke test',
        })

        await assetFormPage.submitCreate()
        assetCreated = true

        try {
            await assetsPage.expectAssetVisible(assetName)

            await assetsPage.deleteAsset(assetName)
            assetCreated = false
            await assetsPage.expectAssetNotVisible(assetName)
        } finally {
            // Clean up if an assertion failed after creation (before the happy-path delete)
            if (assetCreated) {
                await assetsPage.deleteAsset(assetName)
            }
        }
    })
})
