
import { test, expect, Page } from '@playwright/test';


//Placeholder
test("",async ({page})=>{



})






test ("User is able to navigate to homepage and view products without authentication",async ({page})=>{

    await page.goto("https://magento.softwaretestingboard.com/");

    await expect(page.locator("header.page-header li:nth-child(2) a:has-text('Sign in')")).toBeVisible(); //to ensure than you are not logged in 

    await expect(page.locator("h1.page-title span ")).toBeVisible();

    await expect(page.locator("ol.product-items")).toBeVisible();


})

test("User is able to sign in successfully, — assert on Welcome, [username] message is visible ",async ({page})=>{

    await page.goto("https://magento.softwaretestingboard.com/");
    
    await page.locator("header.page-header li:nth-child(2) a").click();
    
    await page.locator("input#email").pressSequentially("Asharf@mail.com");

    await page.locator("input[title='Password']").pressSequentially("Ashraf123");

    await page.locator("button#send2").click()

    await expect(page.locator("header.page-header span.logged-in")).toBeVisible();


})

test("User can search on a specific product",async ({page})=>{

    const productname :string="Layla Tee"

    await page.goto("https://magento.softwaretestingboard.com/");

    await page.locator("input[placeholder='Search entire store here...']").pressSequentially(productname);

    await page.locator("input[placeholder='Search entire store here...']").press("Enter");

    const text = await page.locator("ol.product-items>li:nth-child(1) strong.product a").innerText();

    await expect(text).toBe(productname);   // check if first product matches the search 

})

test("Verify all search result should contain the search term - (search for “backpack”)",async ({page})=>{

    const productname :string="backpack"

    await page.goto("https://magento.softwaretestingboard.com/");

    await page.locator("input[placeholder='Search entire store here...']").pressSequentially(productname);

    await page.locator("input[placeholder='Search entire store here...']").press("Enter");

    const amount=+(await page.locator("div.results>div:nth-child(1)>p span ").innerText()); //Get the number of search results 
    
    console.log(amount);

    for(let i=1;i<=amount;i++){
        const text = await page.locator("ol.product-items>li:nth-child("+i+") strong.product a").innerText();

        console.log(text)

        await expect(text.toLowerCase()).toMatch(productname.toLowerCase());
    }

})


test("Can navigate to a product page, verify that the correct page is opened — assert for product name",async ({page})=>{

    const productname :string="Layla Tee"

    await page.goto("https://magento.softwaretestingboard.com/");

    await page.locator("input[placeholder='Search entire store here...']").pressSequentially(productname);

    await page.locator("input[placeholder='Search entire store here...']").press("Enter");

    await page.locator("ol.product-items>li:nth-child(1) strong.product a").click();

    await expect(page.locator("div.product-info-main")).toBeVisible(); //  verify product page is opened

    const text = await page.locator("div.product-info-main h1 span").innerText();

    await expect(text).toBe(productname);  

   
})




test("Cart",async ({page})=>{

    await page.goto("https://magento.softwaretestingboard.com/");

    const productName= await page.locator("ol.product-items>li:nth-child(1) strong a").innerText();

    await page.locator("ol.product-items>li:nth-child(1) div.size div[index='2']").click();

    await page.locator("ol.product-items>li:nth-child(1) div.color div[index='1']").click();

    await page.locator("ol.product-items>li:nth-child(1) Button").click();   //adding product to cart
 
    await page.locator("a:has-text('shopping cart')").click();

    await expect(page.locator("table#shopping-cart-table tbody>tr:nth-child(1) strong a")).toHaveText(productName);  //assserting the correct prodct to be added 

    await page.locator("table#shopping-cart-table a.action-delete").click(); //Delete

    await expect(page.locator("div.cart-empty>p:nth-child(1)")).toBeVisible();

})




test('Checkout',async ({page})=>{

    await page.goto("https://magento.softwaretestingboard.com/");

    const productName= await page.locator("ol.product-items>li:nth-child(1) strong a").innerText();

    await page.locator("ol.product-items>li:nth-child(1) div.size div[index='2']").click();

    await page.locator("ol.product-items>li:nth-child(1) div.color div[index='1']").click();

    await page.locator("ol.product-items>li:nth-child(1) Button").click();   //adding product to cart
 
    await page.locator("a:has-text('shopping cart')").click();

    await page.waitForLoadState('load'); // Waits for the 'load' event

    await page.waitForTimeout(2000);

    await page.locator("div.cart-summary button.checkout span").click({delay:2000}); // Procceed to checkout

    await page.waitForTimeout(2000);

    await page.waitForLoadState('networkidle'); 

    await page.waitForLoadState('load'); 

    await page.getByRole('textbox',{name:"Email Address"}).fill("Ashraf@mail.com");

    await page.getByRole('textbox',{name:"First Name"}).fill("Ashraf");

    await page.getByRole('textbox',{name:"Last Name"}).fill("jaradat");

    await page.getByRole('textbox',{name:"Company"}).fill("sahdbj");

    await page.locator("fieldset.street>div>div:nth-child(1) input").fill('jabsjh');

    await page.getByRole('textbox',{name:"city"}).fill("sadkjba");

    await page.locator("select[name='region_id']").selectOption({index:2});

    await page.locator("input[name='postcode']").fill("12345");

    await page.locator("select[name='country_id']").selectOption("United States");

    await page.locator("input[name='telephone']").fill("1234567890");

    await page.locator("input[value='flatrate_flatrate']").check();

    await page.locator("button.continue").click();

    await page.locator("button.checkout").click();

    await expect(page.locator("h1.page-title")).toBeVisible();
})

test("Order ID ",async ({page})=>{

    await page.goto("https://magento.softwaretestingboard.com/"); 
    // await page.waitForLoadState("networkidle")
    
    await page.locator("header.page-header li:nth-child(2) a").click();
    
    await page.locator("input#email").pressSequentially("Asharf@mail.com");

    await page.locator("input[title='Password']").pressSequentially("Ashraf123");

    await page.locator("button#send2").click()

    await expect(page.locator("header.page-header span.logged-in")).toBeVisible();

    // sign in to account 
    const productName= await page.locator("ol.product-items>li:nth-child(1) strong a").innerText();

    await page.locator("ol.product-items>li:nth-child(1) div.size div[index='2']").click();

    await page.locator("ol.product-items>li:nth-child(1) div.color div[index='1']").click();

    await page.locator("ol.product-items>li:nth-child(1) Button").click();   //adding product to cart
 
    await page.locator("a:has-text('shopping cart')").click();

    await page.waitForLoadState('load'); // Waits for the 'load' event

    await page.waitForTimeout(2000);

    await page.locator("div.cart-summary button.checkout span").click(); // Procceed to checkou
   

    //await page.getByRole('textbox',{name:"Email Address"}).fill("Ashraf@mail.com");

   // await page.getByRole('textbox',{name:"First Name"}).fill("Ashraf");

    //await page.getByRole('textbox',{name:"Last Name"}).fill("jaradat");

    // await page.getByRole('textbox',{name:"Company"}).fill("sahdbj");

    // await page.locator("fieldset.street>div>div:nth-child(1) input").fill('jabsjh');

    // await page.getByRole('textbox',{name:"city"}).fill("sadkjba");

    // await page.locator("select[name='region_id']").selectOption({index:2});

    // await page.locator("input[name='postcode']").fill("12345");

    // await page.locator("select[name='country_id']").selectOption("United States");

    // await page.locator("input[name='telephone']").fill("1234567890");

    await page.locator("input[value='flatrate_flatrate']").check();

    await page.locator("button.continue").click();

    await page.locator("button.checkout").click();

    await expect(page.locator("h1.page-title")).toBeVisible();

    await page.locator('div.checkout-success a strong').waitFor();
    const orderNumber: string = await page.locator('div.checkout-success a strong').innerText();

    //const orderNumber :string =await page.locator("div.checkout-success strong ").innerText();

    console.log(orderNumber)
    //order  product

    await page.locator(" header.page-header button.switch").click();

    //await page.locator("header.page-header div.customer-menu>ul").click();
    await page.locator("header.page-header div.customer-menu>ul>li:nth-child(1) a").click();

    await page.locator("div.sidebar ul.items>li:nth-child(2) a").click();

    await expect(page.locator("table.table-order-items tbody>tr:nth-child(1)>td:nth-child(1)")).toHaveText(orderNumber)

})


