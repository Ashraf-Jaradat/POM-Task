import { test, expect } from '@playwright/test';
import HomePage from './PageObjectModel/HomePage.page';
import  SignInPage  from './PageObjectModel/SignInPage.page';
import SearchPage from './PageObjectModel/SearchPage.page';
import ProductPage from './PageObjectModel/ProductPage.page';
import { CartPage } from './PageObjectModel/CartPage.page';
import { CheckoutPage } from './PageObjectModel/CheckoutPage.page';
import { AccountPage } from './PageObjectModel/AccountPage.page';
import { url } from 'inspector';


const email="Asharf@mail.com";
const password="Ashraf123";
const productname="Layla Tee";
const productname2="Backpack";

test.beforeEach(async ({page})=>{
  await page.goto("/");
  await page.waitForLoadState("domcontentloaded")
})
test ("User is able to navigate to homepage and view products without authentication",async ({page})=>{
    const homePage = new HomePage(page);
    await homePage.isSignInLabelVisible();
    await homePage.isPageTitleVisible();
    await homePage.isProductItemsVisible();
})

test("User is able to sign in successfully, — assert on Welcome, [username] message is visible ",async ({page})=>{  
    const homePage = new HomePage(page);
    const signInPage = new SignInPage(page);
    await homePage.navigateToHomePage();
    await homePage.clickSignInLabel();
    await signInPage.signIn(email,password);
    await homePage.isLoggedInMessageVisible();
});

test("User can search on a specific product",async ({page})=>{
  const homePage = new HomePage(page);
  const searchPage = new SearchPage(page);
  await homePage.enterSearchInput(productname);
  await searchPage.isProductVisible(productname);
});

test("Verify all search result should contain the search term - (search for “backpack”)",async ({page})=>{
  const homePage = new HomePage(page);
  const searchPage = new SearchPage(page);
  await homePage.enterSearchInput(productname2);
  await searchPage.VerifyAllSearchResultsContainSearchTerm(productname2);

});

test("Can navigate to a product page, verify that the correct page is opened — assert for product name",async ({page})=>{
  const homePage = new HomePage(page);
  const searchPage = new SearchPage(page);
  const productPage =new ProductPage(page);

  const productname = "Layla Tee";

  await homePage.enterSearchInput(productname);
  await searchPage.navigateToProductPage();
  await productPage.isProductPageOpened(productname);
});

test ("cart",async ({page})=>{

  const homePage = new HomePage(page);
  const cartPage =new CartPage(page);
  const productname = await homePage.addProductToCart();
  await homePage.clickCartLink();
  await cartPage.isCartItemVisible(productname);
  await cartPage.deleteCartItem();
  await cartPage.isEmptyCartMessageVisible();


})

test("checkout and Order ID cheking ",async ({page})=>{
  const homePage = new HomePage(page);
  const cartPage =new CartPage(page);
  const signInPage = new SignInPage(page);
  const checkoutPage = new CheckoutPage(page);
  const accountPage= new AccountPage(page);
  
  await homePage.clickSignInLabel();
  await signInPage.signIn(email,password); //Signing in

  const productname = await homePage.addProductToCart();
  await homePage.clickCartLink();//ading product to cart

  await cartPage.clickCheckoutButton(); //clicking checkout button
  
  await checkoutPage.selectTableRate(); //selecting table rate

  await checkoutPage.clickContinueButton(); //clicking continue button

  await checkoutPage.clickPlaceOrderButton(); //clicking place order button

  const orderID = await checkoutPage.getOrderID(); //getting order id

  console.log(orderID);

  await homePage.ExtendSettingsClick(); //clicking on extend settings

  await homePage.MyAccountLinkClick(); //signing out

  await accountPage.clickMyOrdersLink();
  
  await accountPage.VerifyFirstOrderNumber(orderID);
})
