const { test, expect } = require('@playwright/test');
const path = require('path');
const FILE_URI = 'file://' + path.resolve(__dirname, '../index.html');

async function optionValues(page) {
  return page.$$eval('#pattern-mode-select option', (os) => os.map((o) => o.value));
}

test.describe('pattern menu is scoped to the current category', () => {
  test('creational → only singleton, factory', async ({ page }) => {
    await page.goto(FILE_URI + '#m=pattern-singleton');
    await expect(page.locator('#pattern-mode-select')).toBeVisible();
    expect(await optionValues(page)).toEqual(['singleton', 'factory']);
    await expect(page.locator('#pattern-mode-select')).toHaveValue('singleton');
  });

  test('behavioral → only observer, strategy', async ({ page }) => {
    await page.goto(FILE_URI + '#m=pattern-observer');
    expect(await optionValues(page)).toEqual(['observer', 'strategy']);
    await expect(page.locator('#pattern-mode-select')).toHaveValue('observer');
  });

  test('architectural → its five patterns', async ({ page }) => {
    await page.goto(FILE_URI + '#m=pattern-mvc');
    expect(await optionValues(page)).toEqual(['mvc', 'layered', 'pubsub', 'pipefilter', 'di']);
    await expect(page.locator('#pattern-mode-select')).toHaveValue('mvc');
  });
});
