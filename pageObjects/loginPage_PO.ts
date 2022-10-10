import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  //Define Selectors
  readonly page: Page;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly logInButton: Locator;
  readonly errorMessage: Locator;
  readonly cookies: Locator;
  readonly showButton: Locator;
  readonly forgottenButton: Locator;
  readonly loginForm: Locator;

  //Init selectors using constructor
  constructor(page: Page) {
    this.page = page;
    this.userNameInput = page.locator("#Username");
    this.passwordInput = page.locator("#Password");
    this.showButton = page.locator("#show-icon");
    this.logInButton = page.locator("#MainLoginButton");
    this.errorMessage = page.locator("#Password-validation-error");
    this.cookies = page.locator("#cookie-consent-button");
    this.forgottenButton = page.locator(
      "#login-form__password-forgotten-button"
    );
    this.loginForm = page.locator(".login-form");
  }

  //Define login page methods
  async visit() {
    await this.page.goto("https://test1234.planday.com/home");
  }

  async asserations() {
    await expect(this.page).toHaveTitle("Login | Planday");
    const userNameField = await this.userNameInput;
    await expect(userNameField).toBeVisible();
    const passwordField = await this.passwordInput;
    await expect(passwordField).toBeVisible();
    const showButton = await this.showButton;
    await expect(showButton).toBeVisible();
    const logInButton = await this.logInButton;
    await expect(logInButton).toBeVisible();
    const forgotPasswordButton = await this.forgottenButton;
    await expect(forgotPasswordButton).toBeVisible();
    const loginForm = await this.loginForm;
    await expect(loginForm).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.userNameInput.type(username);
    await this.passwordInput.type(password);
    await this.logInButton.click();
  }

  async acceptCookies() {
    await this.cookies.click();
  }

  async assertErrorMessage() {
    await expect(this.errorMessage).toContainText(
      "The username or password is incorrect."
    );
  }
}
