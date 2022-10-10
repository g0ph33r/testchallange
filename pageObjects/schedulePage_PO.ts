import { expect, Locator, Page } from "@playwright/test";

export class SchedulePage {
  //Define Selectors
  readonly page: Page;
  readonly navbarSchedule: Locator;
  readonly plusButton: Locator;
  readonly schedulePageButton: Locator;
  readonly userList: Locator;
  readonly shiftFrom: Locator;
  readonly shiftTo: Locator;
  readonly createShiftButton: Locator;
  readonly userShiftCell: Locator;
  readonly threeDotsIcon: Locator;
  readonly deleteButton: Locator;
  readonly deleteButtonAction: Locator;

  //Init selectors using constructor
  constructor(page: Page) {
    this.page = page;
    this.navbarSchedule = page.locator(
      "//*[@id='root']/div/header/nav[1]/ul/li[2]"
    );
    this.plusButton = page
    
      .frameLocator('[data-testid="app-frame"]')
      .locator('[aria-label="October 10, 2022 Employee One"]');
    this.schedulePageButton = page.locator(
      "//*[@id='root']/div/header/nav[1]/ul/li[2]"
    );
    this.userList = page
      .frameLocator('[data-testid="app-frame"]')
      .locator('[aria-label="grid"]');
    this.shiftFrom = page
      .frameLocator('[data-testid="app-frame"]')
      .locator('[placeholder="From"]');
    this.shiftTo = page
      .frameLocator('[data-testid="app-frame"]')
      .locator('[placeholder="To"]');
    this.createShiftButton = page
      .frameLocator('[data-testid="app-frame"]')
      .locator('button:has-text("Create")');
    this.userShiftCell = page
      .frameLocator('[data-testid="app-frame"]')
      .locator("text=Führungskräfte09:00 -17:00");
    this.threeDotsIcon = page
      .frameLocator('[data-testid="app-frame"]')
      .locator(".three-dots-icon");
    this.deleteButton = page
      .frameLocator('[data-testid="app-frame"]')
      .locator("text=Delete shift");
    this.deleteButtonAction = page
      .frameLocator('[data-testid="app-frame"]')
      .locator('button:has-text("Delete")');
  }

  //Define schedule page methods
  async visit() {
    await this.page.goto("https://test1234.planday.com/home");
  }

  async openSchedulePage() {
    await this.schedulePageButton.click();
  }

  async openShiftCreator() {
    await this.plusButton.click();
  }

  async addShift() {
    await this.shiftFrom.fill("9:00");
    await this.shiftTo.fill("17:00");
    await this.createShiftButton.click();
  }

  async verifyShiftCell() {
    await expect(this.userShiftCell).toBeVisible();
  }

  async verifyUserList() {
    await expect(this.userList).toContainText(
      "Open shiftEOEmployee One0h 0m / 0 ShiftsETEmployee Two0h 0m / 0 ShiftsETEmployee Three0h 0m / 0 Shifts"
    );
  }

  async deleteUserShift() {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await this.userShiftCell.hover();
    await this.threeDotsIcon.click();
    await this.deleteButton.click();
    await this.deleteButtonAction.click();
    await delay(3000);
  }
}
