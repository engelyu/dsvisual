const { test, expect } = require('@playwright/test');
const path = require('path');

const fileUri = 'file://' + path.resolve(__dirname, '../index.html');

async function loadMethod(page, methodId) {
  const navItem = page.locator(
    `.category-nav-item:has(.category-nav-method[data-method-id="${methodId}"])`);
  await navItem.locator('.category-nav-btn').click();
  await navItem.locator(`.category-nav-method[data-method-id="${methodId}"]`).click();
  const card = page.locator(`[data-method-section="${methodId}"]`);
  await expect(card).toHaveAttribute('data-runtime-state', 'active');
}

test('tree-general-binary loads, builds, and steps', async ({ page }) => {
  await page.goto(fileUri);
  await loadMethod(page, 'tree-general-binary');
  await expect(page.locator('[data-method-section][data-runtime-state="active"]')).toBeVisible();
  await expect(page.locator('.tgb-general .tree-node').first()).toBeVisible();
  await expect(page.locator('.tgb-binary .tree-node').first()).toBeVisible();
  await page.click('[data-action="step"]');
});

test('game-tree loads, toggles alpha-beta, steps', async ({ page }) => {
  await page.goto(fileUri);
  await loadMethod(page, 'game-tree');
  await expect(page.locator('[data-method-section][data-runtime-state="active"]')).toBeVisible();
  await expect(page.locator('.gt-stage .tree-node').first()).toBeVisible();
  await page.click('.gt-ab');
  await page.click('[data-action="step"]');
});

test('sort-polyphase loads, applies, steps', async ({ page }) => {
  await page.goto(fileUri);
  await loadMethod(page, 'sort-polyphase');
  await expect(page.locator('[data-method-section][data-runtime-state="active"]')).toBeVisible();
  await expect(page.locator('.pf-stage').first()).toBeVisible();
  await page.click('[data-action="step"]');
});

test('gc-memory loads, switches mode, steps', async ({ page }) => {
  await page.goto(fileUri);
  await loadMethod(page, 'gc-memory');
  await expect(page.locator('[data-method-section][data-runtime-state="active"]')).toBeVisible();
  await expect(page.locator('.gc-stage').first()).toBeVisible();
  await page.selectOption('.gc-mode', 'buddy');
  await page.click('[data-action="step"]');
});

test('file-isam loads, searches, steps', async ({ page }) => {
  await page.goto(fileUri);
  await loadMethod(page, 'file-isam');
  await expect(page.locator('[data-method-section][data-runtime-state="active"]')).toBeVisible();
  await page.fill('.isam-key', '40');
  await page.click('.isam-search');
  await page.click('[data-action="step"]');
});

test('file-inverted loads, queries, steps', async ({ page }) => {
  await page.goto(fileUri);
  await loadMethod(page, 'file-inverted');
  await expect(page.locator('[data-method-section][data-runtime-state="active"]')).toBeVisible();
  await expect(page.locator('.inv-index').first()).toBeVisible();
  await page.fill('.inv-query', 'dog');
  await page.click('.inv-query-btn');
  await page.click('[data-action="step"]');
});
