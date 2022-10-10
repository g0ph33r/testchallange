import { test, expect } from "@playwright/test";
import { LoginPage } from "../pageObjects/loginPage_PO";
import { SchedulePage } from "../pageObjects/schedulePage_PO";

test.describe("Schedule Page", () => {
  let loginPage: LoginPage;
  let schedulePage: SchedulePage;

  //Before Hook
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    schedulePage = new SchedulePage(page);
    await loginPage.visit();
    await loginPage.acceptCookies();
    await loginPage.login("plandayqa@outlook.com", "APItesting21");
    await expect(page).toHaveURL("https://test1234.planday.com/home");
    await schedulePage.openSchedulePage();
    await expect(page).toHaveURL("https://test1234.planday.com/schedule");
  });

  test("Open schedule page and verify 3 displayed employess", async ({
    page,
  }) => {
    await schedulePage.verifyUserList();
  });

  test("Add shift for the Employee and verify", async ({ page }) => {
    await schedulePage.openShiftCreator();
    await schedulePage.addShift();
    await schedulePage.verifyShiftCell();
  });

  test("Delete Employee shift", async ({ page }) => {
    await schedulePage.deleteUserShift();
  });
});
