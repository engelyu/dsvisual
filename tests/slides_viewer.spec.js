const { test, expect } = require('@playwright/test');
const path = require('path');

const FILE_URL = 'file://' + path.resolve(__dirname, '..', 'index.html');

async function loadMethod(page, methodId) {
    const navItem = page.locator(
        `.category-nav-item:has(.category-nav-method[data-method-id="${methodId}"])`);
    await navItem.locator('.category-nav-btn').click();
    await navItem.locator(`.category-nav-method[data-method-id="${methodId}"]`).click();
    const card = page.locator(`[data-method-section="${methodId}"]`);
    await expect(card).toHaveAttribute('data-runtime-state', 'active');
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {}
  });
});

async function openStackArraySlides(page) {
  await page.goto(FILE_URL);
  await loadMethod(page, 'stack-array');
  await page.locator('.method-slides-btn[data-method="stack-array"]').click();
  await expect(page.locator('[data-testid="slide-viewer"]')).toBeVisible();
}

test('slide deck has multiple pages and navigates', async ({ page }) => {
  await openStackArraySlides(page);
  await expect(page.locator('#slide-viewer-progress')).toContainText('Slide 1 / 8');
  await page.locator('#slide-next').click();
  await expect(page.locator('#slide-viewer-progress')).toContainText('Slide 2 / 8');
});

test('language toggle switches slide content', async ({ page }) => {
  await openStackArraySlides(page);
  await expect(page.locator('#slide-viewer-title')).toHaveText('Stack (Array Implementation)');
  await page.locator('[data-testid="lang-toggle"]').click();
  await expect(page.locator('#slide-viewer-title')).toHaveText('堆疊(陣列實作)');
});

test('math renders via KaTeX and mermaid renders as SVG', async ({ page }) => {
  await openStackArraySlides(page);
  // Navigate to the operation-flow slide (slide 3) which has a mermaid diagram.
  await page.locator('#slide-next').click();
  await page.locator('#slide-next').click();
  await expect(page.locator('#slide-viewer-body svg').first()).toBeVisible();
  // Navigate to the complexity slide (slide 5) which has a KaTeX formula.
  await page.locator('#slide-next').click();
  await page.locator('#slide-next').click();
  await expect(page.locator('#slide-viewer-body .katex').first()).toBeVisible();
});
