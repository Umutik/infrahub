import { test, expect } from '@playwright/test'
import { AssetsPage } from '../../pages/AssetsPage'
import { LoginPage } from '../../pages/LoginPage'

const EMAIL = process.env.TEST_USER_EMAIL!
const PASSWORD = process.env.TEST_USER_PASSWORD!

test.describe('Asset Page Status Filter', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)

        await loginPage.goto()
        await loginPage.loginAndWaitForDashboard(EMAIL, PASSWORD)
    }) 

    test('filters assets by active status', async ({ page }) => {
        const assetsPage = new AssetsPage(page)
      
        await assetsPage.goto()
        await assetsPage.expectLoaded()
        
        await assetsPage.filterByStatus('active')

        await page.waitForURL(url =>
          url.searchParams.get('status') === 'active'
        )
        
        await expect(assetsPage.assetRows.first()).toBeVisible()
      
        const rowCount = await assetsPage.assetRows.count()
      
        expect(rowCount).toBeGreaterThan(0)
      
        for (let index = 0; index < rowCount; index++) {
          const row = assetsPage.assetRows.nth(index)
          const statusCell = assetsPage.getStatusCell(row)
      
          await expect(statusCell).toHaveText('Active')
        }
      })
    })
