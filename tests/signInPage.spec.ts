import { test, expect } from "@playwright/test";
import { LoginPage } from "../pageObjects/loginPage_PO";

test.describe("Login flow", () => {
  let loginPage: LoginPage;
  //Before Hook
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.visit();
    await loginPage.acceptCookies();
  });

  //Assertions
  test("Verify login form and buttons are visible", async ({ page }) => {
    await loginPage.asserations();
  });

  //Negative Scenario
  test("Negative Scenario for login", async ({ page }) => {
    await loginPage.login("invaliduser1", "invalidpass");
    await loginPage.assertErrorMessage();
  });

  //Positive Scenario
  test("Positive scenario for login", async ({ page }) => {
    await loginPage.login("plandayqa@outlook.com", "APItesting21");
    await expect(page).toHaveURL("https://test1234.planday.com/home");
  });
});
