const { test, expect } = require('@playwright/test');
const path = require('path');

async function loadMethod(page, methodId) {
    const navItem = page.locator(`.category-nav-item:has(.category-nav-method[data-method-id="${methodId}"])`);
    await navItem.locator('.category-nav-btn').click();
    await navItem.locator(`.category-nav-method[data-method-id="${methodId}"]`).click();
    await expect(page.locator(`[data-method-section="${methodId}"]`)).toHaveAttribute('data-runtime-state', 'active');
}

test.describe('nano-ngram-next', () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
        await page.goto('file://' + path.resolve(__dirname, '../index.html'));
    });

    test('mode button appears in nav and code filename shows', async ({ page }) => {
        await loadMethod(page, 'nano-ngram-next');
        const sec = page.locator('[data-method-section="nano-ngram-next"]');
        await expect(sec.locator('.code-panel-filename')).toContainText('nano-ngram-next.cpp');
    });

    test('renders ng-bars and completes sampling', async ({ page }) => {
        await loadMethod(page, 'nano-ngram-next');
        const sec = page.locator('[data-method-section="nano-ngram-next"]');

        const barsRow = sec.locator('[data-testid="ng-bars"]');
        await expect(barsRow).toBeVisible();

        const step = sec.locator('.stepctl [data-action="step"]');
        for (let i = 0; i < 20; i++) await step.click();

        await expect(sec.locator('.ng-phase')).toContainText('next token');
    });
});
