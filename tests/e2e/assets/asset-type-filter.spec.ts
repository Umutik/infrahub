import { test, expect } from '@playwright/test'
import { AssetsPage } from '../../pages/AssetsPage'
import { LoginPage } from '../../pages/LoginPage'
import { AssetFormPage } from '../../pages/AssetFormPage'

const EMAIL = process.env.TEST_USER_EMAIL!
const PASSWORD = process.env.TEST_USER_PASSWORD!

test.describe('Asset Page Asset Type Filter', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.goto()
        await loginPage.loginAndWaitForDashboard(EMAIL, PASSWORD)
    })

    test('filters assets by server type', async ({ page }) => {
        const assetsPage = new AssetsPage(page)
        const assetFormPage = new AssetFormPage(page)

        const timestamp = Date.now()
        const serverAssetName = `PW-TYPE-SERVER-${timestamp}`
        const routerAssetName = `PW-TYPE-ROUTER-${timestamp}`

        const createdAssets: string[] = []

        try {
            await assetFormPage.goto()
            await assetFormPage.fillForm({
                name: serverAssetName,
                type: 'Server',
                environment: 'Production',
                status: 'active',
                description: 'Created for server type test'
            })

            await assetFormPage.submitCreate()
            createdAssets.push(serverAssetName)

            await assetFormPage.goto()
            await assetFormPage.fillForm({
                name: routerAssetName,
                type: 'Router',
                environment: 'Staging',
                status: 'active',
                description: 'Created for router type test'
            })

            await assetFormPage.submitCreate()
            createdAssets.push(routerAssetName)

            await assetsPage.goto()
            await assetsPage.expectLoaded()
            await assetsPage.filterByType('Server')

            await expect(assetsPage.assetTypeFilter).toHaveValue('Server')

            await assetsPage.expectAssetVisible(serverAssetName)
            await assetsPage.expectAssetNotVisible(routerAssetName)

            await expect(assetsPage.assetRows.first()).toBeVisible()
            const rowCount = await assetsPage.assetRows.count()

            for (let index = 0; index < rowCount; index++) {
                const row = assetsPage.assetRows.nth(index)
                const typeCell = assetsPage.getTypeCell(row)

                await expect(typeCell).toHaveText('Server')
            }
        } finally {
            await assetsPage.goto()

            for (const assetName of createdAssets) {
                await assetsPage.deleteAsset(assetName)
            }
        }
    })
})