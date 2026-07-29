import { Locator, Page, expect } from '@playwright/test'

 export type AssetFormData = {
    name: string
    type: string
    environment: string
    status: string
    description?: string
}

export class AssetFormPage {
    readonly nameInput: Locator
    readonly assetTypeField: Locator
    readonly assetEnvironmentField: Locator
    readonly assetStatusField: Locator
    readonly descriptionInput: Locator
    readonly createButton: Locator
    readonly saveChangesButton: Locator
    readonly cancelButton: Locator


    constructor(readonly page: Page) {
        this.nameInput = page.getByLabel('Asset Name')
        this.assetTypeField = page.getByLabel('Asset Type')
        this.assetEnvironmentField = page.getByLabel('Environment')
        this.assetStatusField = page.getByLabel('Status')
        this.descriptionInput = page.getByLabel('Description')
        this.createButton = page.getByRole('button', {
            name: 'Create Asset',
            exact: true,
          })
          
          this.saveChangesButton = page.getByRole('button', {
            name: 'Save Changes',
            exact: true,
          })
          
          this.cancelButton = page.getByRole('button', {
            name: 'Cancel',
            exact: true,
          })
    }

    async goto() {
        await this.page.goto('/assets/new')
    }

    async fillForm(data: AssetFormData) {
        await this.nameInput.fill(data.name)
        await this.assetTypeField.selectOption(data.type)
        await this.assetEnvironmentField.selectOption(data.environment)
        await this.assetStatusField.selectOption(data.status)
        await this.descriptionInput.fill(data.description ?? '')
    }

    async expectFormValues(data: AssetFormData) {
        await expect(this.nameInput).toHaveValue(data.name) 
        await expect(this.assetTypeField).toHaveValue(data.type)
        await expect(this.assetEnvironmentField).toHaveValue(data.environment)
        await expect(this.assetStatusField).toHaveValue(data.status)
        await expect(this.descriptionInput).toHaveValue(data.description ?? '')

    }

    async submitCreate() {
        await this.createButton.click()
        await this.page.waitForURL('/assets')
    }

    async submitEdit() {
        await this.saveChangesButton.click()
        await this.page.waitForURL(/\/assets\/[^/]+$/)
    }

    async cancel() {
        await this.cancelButton.click()
    }
}