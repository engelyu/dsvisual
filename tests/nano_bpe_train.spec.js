const { test, expect } = require('@playwright/test');
const path = require('path');

async function loadMethod(page, methodId) {
    const navItem = page.locator(`.category-nav-item:has(.category-nav-method[data-method-id="${methodId}"])`);
    await navItem.locator('.category-nav-btn').click();
    await navItem.locator(`.category-nav-method[data-method-id="${methodId}"]`).click();
    await expect(page.locator(`[data-method-section="${methodId}"]`)).toHaveAttribute('data-runtime-state', 'active');
}

test.describe('nano-bpe-train', () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
        await page.goto('file://' + path.resolve(__dirname, '../index.html'));
    });

    test('mode button appears in nav and code filename shows', async ({ page }) => {
        await loadMethod(page, 'nano-bpe-train');
        const sec = page.locator('[data-method-section="nano-bpe-train"]');
        await expect(sec.locator('.code-panel-filename')).toContainText('nano-bpe-train.cpp');
    });

    test('renders bt-symbols and completes training', async ({ page }) => {
        await loadMethod(page, 'nano-bpe-train');
        const sec = page.locator('[data-method-section="nano-bpe-train"]');

        const symbolsRow = sec.locator('[data-testid="bt-symbols"]');
        await expect(symbolsRow).toBeVisible();

        const step = sec.locator('.stepctl [data-action="step"]');
        for (let i = 0; i < 40; i++) await step.click();

        await expect(sec.locator('.bt-phase')).toContainText('merges learned');
    });
});
