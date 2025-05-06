// @ts-check

import { expect } from "@playwright/test";

class HomePage {
  constructor(page) {
    this.page = page;
  }
  //getter methods
  get labelHome() {
    return this.page.locator('xpath=//h1[text()="Home"]');
  }

  get labelRegion() {
    return this.page.locator('xpath=//label[text()="region"]');
  }

  get labelProbe() {
    return this.page.locator('xpath=//label[text()="probe"]');
  }

  get labelCheckType() {
    return this.page.locator('xpath=//label[text()="check type"]');
  }

  get labelAllChecks() {
    return this.page.locator('xpath=//h2[text()="All checks"]');
  }

  get labelErrorRateByLocation() {
    return this.page.locator('xpath=//h2[text()="All error rate by location"]');
  }

  get labelAllCheckErrorPercent() {
    return this.page.locator('xpath=//h2[text()="All check error percentage"]');
  }

  get labelAllLatency() {
    return this.page.locator('xpath=//h2[text()="All latency"]');
  }

  //actions methods
  async goToHome() {
    await this.page.goto("/a/grafana-synthetic-monitoring-app/home");
  }

  async verifyHomePagelabels() {
    await expect(this.labelHome).toBeVisible();
    await expect(this.labelRegion).toBeVisible();
    await expect(this.labelProbe).toBeVisible();
    await expect(this.labelCheckType).toBeVisible();
    await expect(this.labelAllChecks).toBeVisible();
    await expect(this.labelErrorRateByLocation).toBeVisible();
    await expect(this.labelAllCheckErrorPercent).toBeVisible();
    await expect(this.labelAllLatency).toBeVisible();
  }
}

export default HomePage;
