import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'
import { DashboardPage } from '../../pages/DashboardPage'

const EMAIL = process.env.TEST_USER_EMAIL ?? 'playwright@infrahub.dev'
const PASSWORD = process.env.TEST_USER_PASSWORD ?? 'PlaywrightPass123!'

test.describe('Authentication - Login', () => {
  test('valid credentials log in and redirect to dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const dashboardPage = new DashboardPage(page)

    await loginPage.goto()
    await loginPage.loginAndWaitForDashboard(EMAIL, PASSWORD)

    await expect(page).toHaveURL(/\/dashboard/)

    await dashboardPage.expectLoaded()
    await dashboardPage.expectStatsVisible()
  })
})
