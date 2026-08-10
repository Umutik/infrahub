import { test, expect } from '@playwright/test'
import { AssetsPage } from '../../pages/AssetsPage'
import { LoginPage } from '../../pages/LoginPage'


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
        await assetsPage.goto()
        await assetsPage.expectLoaded()

        const originalRowCount = await assetsPage.assetRows.count()

        await assetsPage.filterByType('Server')
        await expect(assetsPage.assetTypeFilter).toHaveValue('Server')

        await assetsPage.filterByEnvironment('Development')
        await expect(assetsPage.environmentFilter).toHaveValue('Development')

        await assetsPage.filterByStatus('active')
        await expect(assetsPage.statusFilter).toHaveValue('active')

        await expect(assetsPage.assetRows.first()).toBeVisible()

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

        await expect(assetsPage.assetRows).toHaveCount(originalRowCount)

    })
})