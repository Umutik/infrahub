import { expect, Locator, Page } from '@playwright/test'

export class AssetsPage {
  readonly searchInput: Locator
  readonly statusFilter: Locator
  readonly assetTypeFilter: Locator
  readonly environmentFilter: Locator
  readonly assetsTable: Locator
  readonly assetRows: Locator
  readonly clearFiltersButton: Locator
  readonly newAssetLink: Locator

  constructor(private readonly page: Page) {
    this.searchInput = page.getByLabel('Search assets by name')
    this.statusFilter = page.getByLabel('Filter by status')
    this.assetTypeFilter = page.getByLabel('Filter by asset type')
    this.environmentFilter = page.getByLabel('Filter by environment')
    this.assetsTable = page.getByRole('table')

    this.assetRows = this.assetsTable.getByRole('row').filter({
      has: page.getByRole('cell'),
    })

    this.clearFiltersButton = page.getByRole('button', {
      name: 'Clear filters',
    })

    this.newAssetLink = page.getByRole('link', {
      name: '+ New Asset',
    })
  }

  async goto() {
    await this.page.goto('/assets')
  }

  async expectLoaded() {
    await expect(this.searchInput).toBeVisible()
    await expect(this.newAssetLink).toBeVisible()
  }

  async expectAssetVisible(name: string) {
    await expect(this.getRowByAssetName(name)).toBeVisible()
  }

  async expectAssetNotVisible(name: string) {
    await expect(this.getRowByAssetName(name)).toHaveCount(0)
  }

  async searchFor(text: string) {
    await this.searchInput.fill(text)
    await expect(this.searchInput).toHaveValue(text)
  }

  async filterByStatus(status: string) {
    await this.statusFilter.selectOption(status)
  }

  async filterByType(type: string) {
    await this.assetTypeFilter.selectOption(type)
  }

  async filterByEnvironment(environment: string) {
    await this.environmentFilter.selectOption(environment)
  }

  async clearFilters() {
    await this.clearFiltersButton.click()
  }

  async clickViewForAsset(name: string) {
    const row = this.getRowByAssetName(name)

    await row.getByRole('link', {
      name,
      exact: true,
    }).click()
  }

  async clickNewAsset() {
    await this.newAssetLink.click()
  }

  async clickEditForAsset(name: string) {
    const row = this.getRowByAssetName(name)
  
    await row.getByRole('link', {
      name: 'Edit',
      exact: true,
    }).click()
  }

  async deleteAsset(name: string) {
    const row = this.getRowByAssetName(name)
  
    this.page.once('dialog', dialog => dialog.accept())
  
    const deleteResponsePromise = this.page.waitForResponse(response =>
      response.request().method() === 'DELETE' &&
      response.url().includes('/api/assets')
    )
  
    await row.getByRole('button', {
      name: `Delete ${name}`,
      exact: true,
    }).click()
  
    const response = await deleteResponsePromise
    expect(response.ok()).toBeTruthy()
  }

  getRowByAssetName(name: string): Locator {
    return this.assetsTable.getByRole('row').filter({
      has: this.page.getByRole('link', {
        name,
        exact: true,
      }),
    })
  }

  getTypeCell(row: Locator): Locator {
    return row.getByRole('cell').nth(1)
  }

  getEnvironmentCell(row: Locator): Locator {
    return row.getByRole('cell').nth(2)
  }

  getStatusCell(row: Locator): Locator {
    return row.getByRole('cell').nth(3)
  }
}