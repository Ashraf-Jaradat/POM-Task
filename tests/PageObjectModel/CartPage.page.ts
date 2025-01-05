import { Page ,expect } from '@playwright/test';
import { time } from 'console';
import { get } from 'http';

export class CartPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators
    private cartItemName = () => this.page.locator("#shopping-cart-table .product-item-name");
    private cartItemsTable  = () => this.page.locator("table#shopping-cart-table");
    private cartItems = () => this.cartItemsTable().locator("tbody>tr");
    //private cartItemName = () => this.cartItems().locator(":nth-child(1) strong a").innerText();
    private deleteButton = () => this.cartItems().locator(":nth-child(1) a.action-delete");
    private emptyCartMessage = () => this.page.locator("div.cart-empty>p:nth-child(1)");
    private CheckoutButton = () => this.page.locator("div.cart-summary button.checkout span");

    //actions
    async getFirstCartItemName() {
        return await this.cartItemName().first().textContent();
      }
    public async deleteCartItem(){
        await this.deleteButton().click();
    }
    //assertions 
    public async isCartItemVisible(productname:string){
        console.log(await this.getFirstCartItemName());
        expect(this.cartItemName()).toHaveText(productname)
    }
    public async isEmptyCartMessageVisible(){
        await expect(this.emptyCartMessage()).toBeVisible();
    }
    async clickCheckoutButton(){
        await this.page.waitForSelector("   div.cart-summary button.checkout span");
        await this.page.waitForSelector("div.cart-summary button.checkout span");
        await this.CheckoutButton().click();
    }
}