const { test, expect, devices } = require('@playwright/test');
const path = require('path');

const fileUri = 'file://' + path.resolve(__dirname, '../index.html');
const { defaultBrowserType: _iphoneBrowser, ...iphone12 } = devices['iPhone 12'];
const { defaultBrowserType: _ipadBrowser, ...ipadMini } = devices['iPad Mini'];

async function loadMethod(page, methodId) {
    const navItem = page.locator(
        `.category-nav-item:has(.category-nav-method[data-method-id="${methodId}"])`);
    await navItem.locator('.category-nav-btn').click();
    await navItem.locator(`.category-nav-method[data-method-id="${methodId}"]`).click();
    const card = page.locator(`[data-method-section="${methodId}"]`);
    await expect(card).toHaveAttribute('data-runtime-state', 'active');
}

test.describe('Responsive Viewport: iPhone 12', () => {
  test.use(iphone12);

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {}
    });
    await page.goto(fileUri);
  });

  test('loads default mode and keeps controls accessible on mobile', async ({ page }) => {
    await expect(page.locator('[data-testid="category-nav"]')).toBeVisible();
    const stackCard = page.locator('[data-method-section="stack-array"]');
    await expect(stackCard).toHaveAttribute('data-runtime-state', 'active');
    await expect(stackCard.locator('.code-panel-filename')).toHaveText('stack_array.cpp');
    await expect(stackCard.locator('.method-section-header h3')).toHaveText('Stack (Array)');
    await expect(stackCard.locator('.method-section-visual')).toBeVisible();
    await expect(stackCard.locator('.method-slides-btn')).toBeVisible();
  });

  test('can switch to advanced sorting method on mobile', async ({ page }) => {
    await loadMethod(page, 'sort-bubble');
    const sortCard = page.locator('[data-method-section="sort-bubble"]');
    await expect(sortCard).toHaveAttribute('data-runtime-state', 'active');
    await expect(sortCard.locator('.code-panel-filename')).toHaveText('sort_bubble.cpp');
    await expect(sortCard.locator('.method-section-visual')).toBeVisible();
  });

  test('can access method sections and slides on mobile', async ({ page }) => {
    await expect(page.locator('[data-testid="category-nav"]')).toBeVisible();
    await expect(page.locator('[data-testid="method-sections"] [data-method-section]')).toHaveCount(1);

    await page.locator('[data-method-section="stack-array"] .method-slides-btn').click();
    await expect(page.locator('[data-testid="slide-viewer"]')).toBeVisible();
    await expect(page.locator('#slide-viewer-title')).toHaveText('Stack (Array Implementation)');

    await page.locator('.slide-viewer-close').click();
    await expect(page.locator('[data-testid="slide-viewer"]')).toBeHidden();
  });
});

test.describe('Responsive Viewport: iPad Mini', () => {
  test.use(ipadMini);

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {}
    });
    await page.goto(fileUri);
  });

  test('can switch to tree mode on tablet', async ({ page }) => {
    await loadMethod(page, 'tree-trie');
    const trieCard = page.locator('[data-method-section="tree-trie"]');
    await expect(trieCard).toHaveAttribute('data-runtime-state', 'active');
    await expect(trieCard.locator('.code-panel-filename')).toHaveText('tree_trie.cpp');
    await expect(trieCard.locator('.method-section-visual')).toBeVisible();
  });

  test('can use heap mode after switching menu on tablet', async ({ page }) => {
    await loadMethod(page, 'heap-binary');
    const heapCard = page.locator('[data-method-section="heap-binary"]');
    await expect(heapCard).toHaveAttribute('data-runtime-state', 'active');
    await expect(heapCard.locator('.method-section-header h3')).toContainText('Binary Heap');
    await expect(heapCard.locator('.code-panel-filename')).toHaveText('heap_binary.cpp');
    await expect(heapCard.locator('.method-section-visual')).toBeVisible();
  });
});
