import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'

const EMAIL = process.env.TEST_USER_EMAIL ?? 'playwright@infrahub.dev'
const PASSWORD = process.env.TEST_USER_PASSWORD ?? 'PlaywrightPass123!'

test.describe('Authentication - Login', () => {
  test('valid credentials log in and redirect to dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page)

    await loginPage.goto()
    await loginPage.loginAndWaitForDashboard(EMAIL, PASSWORD)

    await expect(page).toHaveURL(/\/dashboard/)
    await expect(page.getByText('Recent Assets')).toBeVisible()
  })
})
