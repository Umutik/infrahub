import { test } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'
import { AssetsPage } from '../../pages/AssetsPage'
import { AssetFormPage } from '../../pages/AssetFormPage'
import { AssetDetailsPage } from '../../pages/AssetDetailsPage'

const EMAIL = process.env.TEST_USER_EMAIL!
const PASSWORD = process.env.TEST_USER_PASSWORD!

test.describe('Asset details validation', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.goto()
        await loginPage.loginAndWaitForDashboard(EMAIL, PASSWORD)
    })

    test('should display the correct asset details', async ({ page }) => {
        const assetsPage = new AssetsPage(page)
        const assetFormPage = new AssetFormPage(page)
        const assetDetailsPage = new AssetDetailsPage(page)

        const assetName = `PW-DETAILS-${Date.now()}`

        const assetData = {
            name: assetName,
            type: 'Router',
            environment: 'Production',
            status: 'active',
            description: 'Asset details validation',
        }

        let assetCreated = false

        await assetFormPage.goto()
        await assetFormPage.fillForm(assetData)
        await assetFormPage.submitCreate()

        assetCreated = true

        try {
            await assetsPage.expectAssetVisible(assetName)
            await assetsPage.clickViewForAsset(assetName)
            await assetDetailsPage.expectLoaded(assetName)
            await assetDetailsPage.expectDetails(assetData)
        } finally {
            if (assetCreated) {
                await assetsPage.goto()
                await assetsPage.deleteAsset(assetName)
            }
        }
    })
})
