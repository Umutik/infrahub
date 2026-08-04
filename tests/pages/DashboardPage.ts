import { Page, Locator, expect } from '@playwright/test'

export class DashboardPage {
  readonly totalAssetsCard: Locator
  readonly activeAssetsCard: Locator
  readonly retiredAssetsCard: Locator
  readonly maintenanceAssetsCard: Locator
  readonly recentAssetsSection: Locator
  readonly heading: Locator

  constructor(page: Page) {
    this.totalAssetsCard = page.getByTestId('stat-total-assets')
    this.activeAssetsCard = page.getByTestId('stat-active-assets')
    this.retiredAssetsCard = page.getByTestId('stat-retired-assets')
    this.maintenanceAssetsCard = page.getByTestId('stat-maintenance-assets')

    this.recentAssetsSection = page.getByRole('heading', {
      name: 'Recent Assets',
    })

    this.heading = page.getByRole('heading', {
      name: 'Dashboard',
    })
  }

  async expectLoaded() {
    await expect(this.heading).toBeVisible()
    await expect(this.recentAssetsSection).toBeVisible()
  }

  async expectStatsVisible() {
    await expect(this.totalAssetsCard).toBeVisible()
    await expect(this.activeAssetsCard).toBeVisible()
    await expect(this.retiredAssetsCard).toBeVisible()
    await expect(this.maintenanceAssetsCard).toBeVisible()
  }
}


