import { Locator, Page } from '@playwright/test'

type AssetFormData = {
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
    readonly saveButton: Locator
    readonly cancelButton: Locator

    constructor(readonly page: Page) {
        this.nameInput = page.getByLabel('Asset Name')
        this.assetTypeField = page.getByLabel('Asset Type')
        this.assetEnvironmentField = page.getByLabel('Environment')
        this.assetStatusField = page.getByLabel('Status')
        this.descriptionInput = page.getByLabel('Description')
        this.saveButton = page.getByRole('button', { name: 'Create Asset' })
        this.cancelButton = page.getByRole('button', { name: 'Cancel' })
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

    async submit() {
        await this.saveButton.click()
    }

    async cancel() {
        await this.cancelButton.click()
    }
}