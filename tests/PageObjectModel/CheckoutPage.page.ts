import { Page } from 'playwright';

export class CheckoutPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators
    private tableRate=()=> this.page.locator("input[value='flatrate_flatrate']");        
    private continueButton = ()=> this.page.locator("button.continue");
    private placeOrderButton = ()=> this.page.getByRole('button',{name:"Place Order"});
    private OrderID = ()=> this.page.locator("div.checkout-success a strong");

    //Actions
    public async selectTableRate(){
        await this.tableRate().check();
    }
    public async clickContinueButton(){
        await this.continueButton().click();
    }
    public async clickPlaceOrderButton(){
        await this.placeOrderButton().click();
    }
    public async getOrderID(){
        return await this.OrderID().innerText();
    }
}