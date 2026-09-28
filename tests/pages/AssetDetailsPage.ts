import { expect, Locator, Page } from '@playwright/test'

export interface AssetDetailsData {
  name: string
  type: string
  environment: string
  status: string
  description: string
}

export class AssetDetailsPage {
  readonly statusSection: Locator
  readonly typeSection: Locator
  readonly environmentSection: Locator
  readonly descriptionSection: Locator

  constructor(private readonly page: Page) {
    this.statusSection = page
      .getByText('Status', { exact: true })
      .locator('..')

    this.typeSection = page
      .getByText('Asset Type', { exact: true })
      .locator('..')

    this.environmentSection = page
      .getByText('Environment', { exact: true })
      .locator('..')

    this.descriptionSection = page
      .getByText('Description', { exact: true })
      .locator('..')
  }

  async expectLoaded(name: string) {
    await expect(this.page).toHaveURL(/\/assets\/[^/]+$/)

    await expect(
      this.page.getByRole('heading', {
        name,
        exact: true,
      })
    ).toBeVisible()
  }

  async expectDetails(data: AssetDetailsData) {
    await expect(this.typeSection).toContainText(data.type)
    await expect(this.environmentSection).toContainText(data.environment)
    await expect(this.statusSection).toContainText(
      new RegExp(data.status, 'i')
    )
    await expect(this.descriptionSection).toContainText(data.description)
  }
}