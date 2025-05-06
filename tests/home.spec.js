// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Home Page Tests', () => {
  test('has title', async ({ page }) => {
  await page.goto('https://play.grafana.org/a/grafana-synthetic-monitoring-app/home');
  await expect(page).toHaveTitle('Testing & synthetics - Grafana');
});
});
