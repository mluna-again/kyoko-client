import { test, expect } from "@playwright/test";

const PLAYER_NAME = "Kanna";

test.describe("whole app", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");

    await expect(page.locator("text=Choose").first()).toBeVisible();

    await page.type("#room-name", "Secret Base");
    await page.type("#player-name", PLAYER_NAME);
    await page.click("text=Create game");

    await expect(page.locator("text=Feeling lonely?").first()).toBeVisible();
  });

  test("user can create room", async ({ page }) => {
    await expect(page.locator(`text=${PLAYER_NAME}`)).toBeVisible();
  });

  test("user can copy an invitation link", async ({ page }) => {
    await page.locator("text=Invite your friends").click();
    await expect(page.locator("text=Link copied!")).toBeVisible();
  });

  test("new users can join room", async ({ page, browser }) => {
    const newContext = await browser.newContext();
    const secondaryPage = await newContext.newPage();
    await secondaryPage.goto(page.url());
    await expect(secondaryPage.locator("text=Enter your name")).toBeVisible();
    await secondaryPage.type(".swal2-input", "Yukiji");
    await secondaryPage.click(".swal2-confirm");

    await expect(page.locator("text=Kanna")).toBeVisible();
    await expect(page.locator("text=Yukiji")).toBeVisible();
    await expect(secondaryPage.locator("text=Kanna")).toBeVisible();
    await expect(secondaryPage.locator("text=Yukiji")).toBeVisible();
  });
});
