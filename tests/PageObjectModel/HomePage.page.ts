import { expect,Page  } from "@playwright/test";

export default class HomePage {

    page: Page;

    constructor(page:Page){
        this.page = page;
    }   

    public async navigateToHomePage(){
        await this.page.goto("https://magento.softwaretestingboard.com/");
    }

    // Locators
    SignInLabel = ()=> this.page.locator("header.page-header li:nth-child(2) a:has-text('Sign in')");
    PageTitle = ()=> this.page.locator("h1.page-title span ");  
    ProductItems = ()=> this.page.locator("ol.product-items");
    LoggedInMessage = ()=> this.page.locator("header.page-header span.logged-in");
    SearchInput = ()=> this.page.locator("input[placeholder='Search entire store here...']");
    CartLink = ()=> this.page.locator("a:has-text('shopping cart')");
    ExtendSettings = ()=> this.page.locator("header.page-header button.switch");
    MyAccountLink = ()=> this.page.locator("header.page-header li:nth-child(1) a:has-text('My Account')");


    //Actions
    public async clickSignInLabel(){
        await this.SignInLabel().click();
    }
    public async enterSearchInput(productname:string){
        await this.SearchInput().pressSequentially(productname);
        await this.SearchInput().press("Enter");
    }
    public async addProductToCart(){

    await this.page.locator("ol.product-items>li:nth-child(1) div.size div[index='2']").click();

    await this.page.locator("ol.product-items>li:nth-child(1) div.color div[index='1']").click();

    await this.page.locator("ol.product-items>li:nth-child(1) Button").click(); 

    return await this.page.locator("ol.product-items>li:nth-child(1) strong a").innerText();

    }
    public async clickCartLink(){
        await this.CartLink().click();
    }

    //Assertions
    public async isPageTitleVisible(){
        await expect(this.PageTitle()).toBeVisible();
    }
    public async isSignInLabelVisible(){
        await expect(this.SignInLabel()).toBeVisible();
    }
    public async isProductItemsVisible(){
        await expect(this.ProductItems()).toBeVisible();
    }
    public async isLoggedInMessageVisible(){       
        await expect(this.LoggedInMessage()).toBeVisible();
    }
    public async ExtendSettingsClick(){
        await this.ExtendSettings().click();
    }
    public async MyAccountLinkClick(){
        await this.MyAccountLink().click();
    }
}
