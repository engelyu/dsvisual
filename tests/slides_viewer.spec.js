const { test, expect } = require('@playwright/test');
const path = require('path');

const FILE_URL = 'file://' + path.resolve(__dirname, '..', 'index.html');

async function openStackArraySlides(page) {
  await page.goto(FILE_URL);
  const categoryButtons = page.locator('[data-testid="category-nav"] .category-nav-btn');
  const methodSelect = page.locator('[data-testid="method-select"]');
  const count = await categoryButtons.count();
  for (let i = 0; i < count; i++) {
    await categoryButtons.nth(i).click();
    if (await methodSelect.locator('option[value="stack-array"]').count()) {
      await methodSelect.selectOption('stack-array');
      break;
    }
  }
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
  await expect(page.locator('#slide-viewer-title')).toHaveText('堆疊(陣列實作)');
  await page.locator('[data-testid="slide-lang-toggle"]').click();
  await expect(page.locator('#slide-viewer-title')).toHaveText('Stack (Array Implementation)');
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
