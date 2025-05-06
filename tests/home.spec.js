// @ts-check

import { test, expect } from "@playwright/test";
import HomePage from "../pages/HomePage";

test.describe("Home Page Tests", () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
  });

  test("verify home page labels", async ({ page }) => {
    await homePage.goToHome();
    await homePage.verifyHomePagelabels();
  });
});
