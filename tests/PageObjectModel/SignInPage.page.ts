import { Page } from 'playwright';

export default class SignInPage {
    page: Page;
    

    constructor(page: Page) {
        this.page = page;
    }

    // Locators

    private emailInput = 'input#email';
    private passwordInput = "input[title='Password']";
    private signInButton = "button#send2";

    // Actions

    async navigateTo() {
        await this.page.goto('https://example.com/signin');
    }

    async enterEmail(email: string) {
        await this.page.fill(this.emailInput, email);
    }

    async enterPassword(password: string) {
        await this.page.fill(this.passwordInput, password);
    }

    async clickSignIn() {
        await this.page.click(this.signInButton);
    }

    async signIn(username: string, password: string) {
        await this.enterEmail(username);
        await this.enterPassword(password);
        await this.clickSignIn();
    }
}