import { Page ,expect } from "@playwright/test";


export default class SignInPage {
    
    page: Page;

    constructor(page:Page){
        this.page = page;
    }   

    // Locators

    
    private productSection = ()=>this.page.locator("ol.product-items");
    
    private productname = ()=>this.productSection().locator(">li:nth-child(1) strong.product a");
    
    private amount = ()=>this.page.locator("div.results>div:nth-child(1)>p span ");
    
    // Actions

    public async isProductVisible(productname:string){
        const text = await this.productname().innerText();
        await expect(text).toBe(productname);
    }

    public async VerifyAllSearchResultsContainSearchTerm(productname:string){
        await this.page.waitForLoadState("domcontentloaded");
        const amount=+(await this.amount().innerText());
        
        console.log(amount);
        for(let i=1;i<=amount;i++){
            const text = await this.productSection().locator(">li:nth-child("+i+") strong.product a").innerText();
            console.log(text)
            await expect(text.toLowerCase()).toMatch(productname.toLowerCase());
        }
    }
    public async navigateToProductPage(){
        await this.productname().click();
    }

    
}