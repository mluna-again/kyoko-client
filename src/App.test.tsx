import { test, expect } from "@playwright/test";

const PLAYER_NAME = "Kanna";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(page.locator("text=Choose").first()).toBeVisible();

  await page.type("#room-name", "Secret Base");
  await page.type("#player-name", PLAYER_NAME);
  await page.click("text=Create game");

  await expect(page.locator("text=Feeling lonely?").first()).toBeVisible();
});

test.describe("create game", () => {
  test("user can create room and enter it", async ({ page }) => {
    await expect(page.locator(`text=${PLAYER_NAME}`)).toBeVisible();
  });
});

test.describe("play game", () => {
  test("user can copy an invitation link", async ({ page, browser }) => {
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
    await page.locator("text=Invite your friends").click();
    await expect(page.locator("text=Link copied!")).toBeVisible();
  });

  test("reveal cards", async ({ page, browser }) => {
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

		await expect(page.locator("text=Pick your cards!")).toBeVisible()
		await expect(secondaryPage.locator("text=Pick your cards!")).toBeVisible()

    await secondaryPage.click("text=34");
		await page.click("text=0")

		await expect(page.locator("text=Reveal cards")).toBeVisible()
		await expect(secondaryPage.locator("text=Reveal cards")).toBeVisible()

    await page.pause();
  });
  // test("game over")
  // test("average message")
  // test("same answer message")
  // test("reset game")
});
