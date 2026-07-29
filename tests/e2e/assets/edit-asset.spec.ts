import { test } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'
import { AssetsPage } from '../../pages/AssetsPage'
import { AssetFormPage } from '../../pages/AssetFormPage'

const EMAIL =
    process.env.TEST_USER_EMAIL ?? 'playwright@infrahub.dev'

const PASSWORD =
    process.env.TEST_USER_PASSWORD ?? 'PlaywrightPass123!'

test.describe('Assets Page Edit Asset', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)

        await loginPage.goto()
        await loginPage.loginAndWaitForDashboard(EMAIL, PASSWORD)
    })

    test('Edit Asset', async ({ page }) => {
        const assetsPage = new AssetsPage(page)
        const assetFormPage = new AssetFormPage(page)

        const timestamp = Date.now()
        const originalName = `PW-EDIT-${timestamp}`
        const updatedName = `PW-UPDATED-${timestamp}`

        await assetFormPage.goto()

        await assetFormPage.fillForm({
            name: originalName,
            type: 'Router',
            environment: 'Production',
            status: 'active',
            description: 'Asset created for edit test'
        })

        await assetFormPage.submitCreate()

        await page.reload()

        await assetsPage.expectAssetVisible(originalName)
        await assetsPage.clickEditForAsset(originalName)

        await assetFormPage.expectFormValues({
            name: originalName,
            type: 'Router',
            environment: 'Production',
            status: 'active',
            description: 'Asset created for edit test'
        })

        await assetFormPage.fillForm({
            name: updatedName,
            type: 'Switch',
            environment: 'Staging',
            status: 'inactive',
            description: 'This asset was edited with new values'
        })

        await assetFormPage.submitEdit()

        await assetsPage.goto()
        await page.reload()

        await assetsPage.expectAssetVisible(updatedName)
        await assetsPage.expectAssetNotVisible(originalName)
    })
})