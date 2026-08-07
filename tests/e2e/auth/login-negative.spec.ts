import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'

const EMAIL = process.env.TEST_USER_EMAIL ?? 'playwright@infrahub.dev'
 
test.describe('Authentication - Login - Negative', () => {
    test('invalid credentials should show error message', async ({page}) => {
        const loginPage = new LoginPage(page)

        await loginPage.goto()
        await loginPage.login(EMAIL, 'invalidpassword')

        await expect(loginPage.errorMessage).toBeVisible()
        await expect(loginPage.errorMessage).toContainText('Invalid login credentials')
        await expect(page).toHaveURL(/\/login/)
    })
})
