// @ts-check

import { test, expect } from "@playwright/test";
import HomePage from "../pages/HomePage";

test.describe("Home Page Tests", () => {
  let homePage;
  let page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    homePage = new HomePage(page);
    await homePage.goToHome();
    await page.waitForTimeout(5000);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test("verify API data with UI data", async () => {
    await homePage.verifyAPIResponseMixedLatencyDenomLabelsOnUI();
  });

  test("verify home page labels", async () => {
    await homePage.verifyHomePagelabels();
  });

  test("verify region filter", async () => {
    await homePage.verifyFilterRegion();
  });
});
