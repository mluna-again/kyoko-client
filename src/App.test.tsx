import { test, expect } from "@playwright/test";

test("homepage", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(page.locator('text=Choose').first()).toBeVisible()

	await page.type('#room-name', "Secret Base")
	await page.type('#player-name', "Kanna")
	await page.click('text=Create game')

  await expect(page.locator('text=Feeling lonely?').first()).toBeVisible()
});
