import { test, expect } from '@playwright/test'
import { AssetsPage } from '../../pages/AssetsPage'
import { LoginPage } from '../../pages/LoginPage'

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
        await assetsPage.goto()
        await assetsPage.expectLoaded()
        await assetsPage.filterByType('Server')

        await expect(assetsPage.assetTypeFilter).toHaveValue('Server')

        await expect(assetsPage.assetRows.first()).toBeVisible()
        const rowCount = await assetsPage.assetRows.count()

        for (let index = 0; index < rowCount; index++) {
            const row = assetsPage.assetRows.nth(index)
            const typeCell = assetsPage.getTypeCell(row)

            await expect(typeCell).toHaveText('Server')
        }
    })
})