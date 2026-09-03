import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'
import { DashboardPage } from '../../pages/DashboardPage'

const EMAIL = process.env.TEST_USER_EMAIL!
const PASSWORD = process.env.TEST_USER_PASSWORD!

test.describe('Dashboard Page validation', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.goto()
        await loginPage.loginAndWaitForDashboard(EMAIL, PASSWORD)
    })

    test('should display dashboard data when assets exist', async ({ page }) => {
        const dashboardPage = new DashboardPage(page)

        await expect(page).toHaveURL(/\/dashboard/)
        await dashboardPage.expectLoaded()
        await dashboardPage.expectStatsVisible()
        await dashboardPage.expectRecentAssetsVisible()

    })
})

