import{Page ,expect} from '@playwright/test';

export default class ProductPage{
    page:Page;

    constructor(page:Page){
        this.page = page;
    }

    //Locators
    productInfo = ()=>this.page.locator("div.product-info-main");

    productName = ()=>this.page.locator("div.product-info-main h1 span");

    //Actions

    //assertions
    public async isProductPageOpened(productname:string){
        await expect(this.productInfo()).toBeVisible();
        const text = await this.productName().innerText();
        expect(text).toBe(productname);
    }

}
