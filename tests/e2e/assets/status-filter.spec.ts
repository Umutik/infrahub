import { test, expect } from '@playwright/test'
import { AssetsPage } from '../../pages/AssetsPage'
import { LoginPage } from '../../pages/LoginPage'
import { AssetFormPage } from '../../pages/AssetFormPage'

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
    const assetFormPage = new AssetFormPage(page)

    const timestamp = Date.now()

    const activeAssetName = `PW-STATUS-ACTIVE-${timestamp}`
    const inactiveAssetName = `PW-STATUS-INACTIVE-${timestamp}`

    const createdAssets: string[] = []

    try {

      await assetFormPage.goto()

      await assetFormPage.fillForm({
        name: activeAssetName,
        type: 'Router',
        environment: 'Production',
        status: 'active',
        description: 'Created for active status filter test'
      })

      await assetFormPage.submitCreate()
      createdAssets.push(activeAssetName)

      await assetFormPage.goto()

      await assetFormPage.fillForm({
        name: inactiveAssetName,
        type: 'Switch',
        environment: 'Staging',
        status: 'inactive',
        description: 'Created for active status filter comparison'
      })

      await assetFormPage.submitCreate()
      createdAssets.push(inactiveAssetName)

      await assetsPage.goto()
      await assetsPage.expectLoaded()

      await assetsPage.filterByStatus('active')

      await page.waitForURL(url =>
        url.searchParams.get('status') === 'active'
      )

      await assetsPage.expectAssetVisible(activeAssetName)
      await assetsPage.expectAssetNotVisible(inactiveAssetName)

      await expect(assetsPage.assetRows.first()).toBeVisible()

      const rowCount = await assetsPage.assetRows.count()

      expect(rowCount).toBeGreaterThan(0)

      for (let index = 0; index < rowCount; index++) {
        const row = assetsPage.assetRows.nth(index)
        const statusCell = assetsPage.getStatusCell(row)

        await expect(statusCell).toHaveText('Active')
      }
    } finally {
      await assetsPage.goto()

      for (const assetName of createdAssets) {
        await assetsPage.deleteAsset(assetName)
      }
    }
  })
})
