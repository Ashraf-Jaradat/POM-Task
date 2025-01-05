import { expect } from '@playwright/test';
import { Page } from 'playwright';

export class AccountPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators
    private MyOrdersLink = () => this.page.locator("a:has-text('My Orders')");

    private FirstOrderNumber = () => this.page.locator("table.table-order-items tbody>tr:nth-child(1)>td:nth-child(1)");

    // Actions

    public async clickMyOrdersLink() {
        await this.MyOrdersLink().click();
    }
    public async VerifyFirstOrderNumber(ID: string) {
        const text = await this.FirstOrderNumber().innerText();
        expect(text).toBe(ID);
    }

    
}