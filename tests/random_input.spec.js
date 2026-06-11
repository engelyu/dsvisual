const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUri = 'file://' + path.resolve(__dirname, '../index.html');

async function openSettings(page) {
  await page.click('#settings-toggle');
  await expect(page.locator('#settings-drawer')).toBeVisible();
}

test('difficulty is remembered per category and persists across reload', async ({ page }) => {
  await page.goto(fileUri);
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  await openSettings(page);
  const sel = page.locator('#input-difficulty');
  await expect(sel).toHaveValue('normal');
  await sel.selectOption('large');
  await page.click('#settings-drawer .settings-drawer-close');

  await page.reload();
  await openSettings(page);
  await expect(page.locator('#input-difficulty')).toHaveValue('large');

  const stored = await page.evaluate(() => Object.keys(localStorage).filter((k) => k.startsWith('dsvisual.inputDifficulty.')));
  expect(stored.length).toBeGreaterThanOrEqual(1);
});

async function loadMethod(page, methodId) {
  const navItem = page.locator(
    `.category-nav-item:has(.category-nav-method[data-method-id="${methodId}"])`);
  await navItem.locator('.category-nav-btn').click();
  await navItem.locator(`.category-nav-method[data-method-id="${methodId}"]`).click();
  const card = page.locator(`[data-method-section="${methodId}"]`);
  await expect(card).toHaveAttribute('data-runtime-state', 'active');
}

test('random button on tree-traversal changes the input field', async ({ page }) => {
  await page.goto(fileUri);
  await loadMethod(page, 'tree-traversal');

  const section = page.locator('[data-method-section="tree-traversal"]');
  const input = section.locator('.tt-input');
  const before = await input.inputValue();
  await section.locator('.rand-btn').click();
  await expect(input).not.toHaveValue(before);
});
