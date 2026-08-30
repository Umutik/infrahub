import { test, expect } from '@playwright/test'
import { AssetsPage } from '../../pages/AssetsPage'
import { LoginPage } from '../../pages/LoginPage'
import { AssetFormPage } from '../../pages/AssetFormPage'

const EMAIL = process.env.TEST_USER_EMAIL!
const PASSWORD = process.env.TEST_USER_PASSWORD!

test.describe('Asset Page Environment Filter', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.goto()
        await loginPage.loginAndWaitForDashboard(EMAIL, PASSWORD)
    })

    test('filters assets by environment', async ({ page }) => {
        const assetsPage = new AssetsPage(page)
        const assetFormPage = new AssetFormPage(page)

        const timestamp = Date.now()

        const developmentAssetName = `PW-ENVIRONMENT-DEVELOPMENT-${timestamp}`
        const productionAssetName = `PW-ENVIRONMENT-PRODUCTION-${timestamp}`

        const createdAssets: string[] = []

        try {

            await assetFormPage.goto()

            await assetFormPage.fillForm({
                name: developmentAssetName,
                type: 'Server',
                environment: 'Development',
                status: 'active',
                description: 'Created for environment filter test'
            })

            await assetFormPage.submitCreate()
            createdAssets.push(developmentAssetName)

            await assetFormPage.goto()

            await assetFormPage.fillForm({
                name: productionAssetName,
                type: 'Router',
                environment: 'Production',
                status: 'active',
                description: 'Created for environment filter negative test'
            })

            await assetFormPage.submitCreate()
            createdAssets.push(productionAssetName)

            await assetsPage.goto()
            await assetsPage.expectLoaded()
            await assetsPage.filterByEnvironment('Development')

            await expect(assetsPage.environmentFilter).toHaveValue('Development')

            await assetsPage.expectAssetVisible(developmentAssetName)
            await assetsPage.expectAssetNotVisible(productionAssetName)

            await expect(assetsPage.assetRows.first()).toBeVisible()
            const rowCount = await assetsPage.assetRows.count()

            for (let index = 0; index < rowCount; index++) {
                const row = assetsPage.assetRows.nth(index)
                const environmentCell = assetsPage.getEnvironmentCell(row)

                await expect(environmentCell).toHaveText('Development')
            }
        } finally {

            await assetsPage.goto()

            for (const assetName of createdAssets) {
                await assetsPage.deleteAsset(assetName)
            }
        }

    })
})
