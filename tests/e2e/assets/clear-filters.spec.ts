import { test, expect } from '@playwright/test'
import { AssetsPage } from '../../pages/AssetsPage'
import { LoginPage } from '../../pages/LoginPage'
import { AssetFormPage } from '../../pages/AssetFormPage'


const EMAIL = process.env.TEST_USER_EMAIL!
const PASSWORD = process.env.TEST_USER_PASSWORD!

test.describe('Assets Page Clear Filters', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.goto()
        await loginPage.loginAndWaitForDashboard(EMAIL, PASSWORD)
    })

    test('clear all filters', async ({ page }) => {
        const assetsPage = new AssetsPage(page)
        const assetFormPage = new AssetFormPage(page)

        const timestamp = Date.now()

        const matchingAssetName = `PW-CLEAR-MATCH-${timestamp}`
        const nonMatchingAssetName = `PW-CLEAR-NONMATCH-${timestamp}`

        const createdAssets: string[] = []

        try {

            await assetFormPage.goto()

            await assetFormPage.fillForm({
                name: matchingAssetName,
                type: 'Server',
                environment: 'Development',
                status: 'active',
                description: 'Created for clear filter test'
            })

            await assetFormPage.submitCreate()
            createdAssets.push(matchingAssetName)

            await assetFormPage.goto()

            await assetFormPage.fillForm({
                name: nonMatchingAssetName,
                type: 'Laptop',
                environment: 'Staging',
                status: 'inactive',
                description: ''
            })

            await assetFormPage.submitCreate()
            createdAssets.push(nonMatchingAssetName)

            await assetsPage.goto()
            await assetsPage.expectLoaded()

            const originalRowCount = await assetsPage.assetRows.count()

            await assetsPage.filterByType('Server')
            await page.waitForURL(url =>
                url.searchParams.get('asset_type') === 'Server'
            )
            await expect(assetsPage.assetTypeFilter).toHaveValue('Server')

            await assetsPage.filterByEnvironment('Development')
            await page.waitForURL(url =>
                url.searchParams.get('asset_type') === 'Server' &&
                url.searchParams.get('environment') === 'Development'
            )
            await expect(assetsPage.environmentFilter).toHaveValue('Development')

            await assetsPage.filterByStatus('active')
            await page.waitForURL(url =>
                url.searchParams.get('asset_type') === 'Server' &&
                url.searchParams.get('environment') === 'Development' &&
                url.searchParams.get('status') === 'active'
            )
            await expect(assetsPage.statusFilter).toHaveValue('active')

            await expect(assetsPage.assetRows.first()).toBeVisible()

            await assetsPage.expectAssetVisible(matchingAssetName)
            await assetsPage.expectAssetNotVisible(nonMatchingAssetName)

            const filteredRowCount = await assetsPage.assetRows.count()
            expect(filteredRowCount).toBeGreaterThan(0)

            for (let index = 0; index < filteredRowCount; index++) {
                const row = assetsPage.assetRows.nth(index)

                await expect(assetsPage.getTypeCell(row)).toHaveText('Server')
                await expect(assetsPage.getEnvironmentCell(row)).toHaveText('Development')
                await expect(assetsPage.getStatusCell(row)).toHaveText('Active')
            }

            await assetsPage.clearFilters()

            await expect(assetsPage.statusFilter).toHaveValue('')
            await expect(assetsPage.environmentFilter).toHaveValue('')
            await expect(assetsPage.assetTypeFilter).toHaveValue('')
            await assetsPage.expectAssetVisible(matchingAssetName)
            await assetsPage.expectAssetVisible(nonMatchingAssetName)

            await expect(assetsPage.assetRows).toHaveCount(originalRowCount)

        } finally {
            await assetsPage.goto()

            for (const assetName of createdAssets) {
                await assetsPage.deleteAsset(assetName)
            }
        }
    })
})