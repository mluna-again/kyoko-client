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
});
