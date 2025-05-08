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

  get filterRegion() {
    return this.page.locator(
      '//label[contains(@data-testid, "region")]/following-sibling::div//div[text()="All"]'
    );
  }

  get buttonRefresh() {
    return this.page.getByTestId("data-testid RefreshPicker run button");
  }

  get rowAllChecks() {
    return this.page.locator(
      'xpath=[data-testid="data-testid Panel header All checks"] [role="table"] [data-testid="data-testid table body"] [role="row"]'
    );
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

  async verifyFilterRegion() {
    await expect(this.filterRegion).toBeVisible();
    await this.filterRegion.click({ force: true });
    await this.filterRegion.type("EMEA");
    await this.page.keyboard.press("Enter");
    let currentUrl = await this.page.url();
    expect(currentUrl).toContain("region=EMEA");
  }

  async clickRefresh() {
    await this.buttonRefresh.click();
  }

  async captureAPIResponseMixedLatencyDenom(page) {
    await this.clickRefresh();
    const requestUrlRegex = /mixed-0-/;
    const specificMixedResponse = await page.waitForResponse(
      (resp) => requestUrlRegex.test(resp.url()) && resp.status() === 200
    );
    const responseBody = await specificMixedResponse.json();
    const { check_name, instance, job } =
      responseBody.results["latency denom"].frames[0].schema.fields[1].labels;
    return { check_name, instance, job };
  }

  async verifyAPIResponseMixedLatencyDenomLabelsOnUI() {
    let APIresult = await this.captureAPIResponseMixedLatencyDenom(this.page);
    let UIresult = await this.verifyAllCells();
    expect(UIresult.textDNS).toContain(APIresult.check_name);
    expect(UIresult.textGrafanaDotCom).toContain(APIresult.instance);
    expect(UIresult.textHostnameDnsResolution).toContain(APIresult.job);
    return { APIresult, UIresult };
  }

  async verifyAllCells() {
    const tableBody = this.page.locator('[data-testid="data-testid table body"] [role="row"]');
    const allCells = tableBody.locator('div[role="cell"]');

    const cellsWithDns = allCells.filter({has: this.page.getByText("dns", { exact: true })});
    expect(cellsWithDns).toBeVisible();
    let textDNS = await cellsWithDns.textContent();

    const cellsWithGrafanaDotCom = allCells.first().filter({ has: this.page.getByText("grafana.com", { exact: true }) });
    expect(cellsWithGrafanaDotCom).toBeVisible();
    let textGrafanaDotCom = await cellsWithGrafanaDotCom.textContent();

    const cellsWithHostnameDnsResolution = allCells.filter({has: this.page.getByText("Grafana Main Hostname DNS Resolution", {exact: true,}),
    });
    expect(cellsWithHostnameDnsResolution).toBeVisible();
    let textHostnameDnsResolution = await cellsWithHostnameDnsResolution.textContent();

    return {
      textDNS,
      textGrafanaDotCom,
      textHostnameDnsResolution,
    };
  }
}
export default HomePage;
