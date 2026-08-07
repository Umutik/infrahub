import { test } from 'playwright/test'
import { LoginPage } from '../../pages/LoginPage'
import { AssetsPage } from '../../pages/AssetsPage'

const EMAIL = process.env.TEST_USER_EMAIL ?? 'playwright@infrahub.dev'
const PASSWORD = process.env.TEST_USER_PASSWORD ?? 'PlaywrightPass123!' 

test.describe('Assets Page', () => {
    test('authenticated user can open assets page', async ({ page }) => {
        const loginPage = new LoginPage(page)
        const assetsPage = new AssetsPage(page)
    
        await loginPage.goto()
        await loginPage.loginAndWaitForDashboard(EMAIL, PASSWORD)
    
        await assetsPage.goto()
        await assetsPage.expectLoaded()
    })
})

