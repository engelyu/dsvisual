const { test, expect } = require('@playwright/test');
const path = require('path');

async function loadMethod(page, methodId) {
    const navItem = page.locator(`.category-nav-item:has(.category-nav-method[data-method-id="${methodId}"])`);
    await navItem.locator('.category-nav-btn').click();
    await navItem.locator(`.category-nav-method[data-method-id="${methodId}"]`).click();
    await expect(page.locator(`[data-method-section="${methodId}"]`)).toHaveAttribute('data-runtime-state', 'active');
}

test.describe('nano-bpe-encode', () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
        await page.goto('file://' + path.resolve(__dirname, '../index.html'));
    });

    test('mode button appears in nav and code filename shows', async ({ page }) => {
        await loadMethod(page, 'nano-bpe-encode');
        const sec = page.locator('[data-method-section="nano-bpe-encode"]');
        await expect(sec.locator('.code-panel-filename')).toContainText('nano-bpe-encode.cpp');
    });

    test('renders be-tokens after stepping to completion', async ({ page }) => {
        await loadMethod(page, 'nano-bpe-encode');
        const sec = page.locator('[data-method-section="nano-bpe-encode"]');

        const inputRow = sec.locator('[data-testid="be-input"]');
        await expect(inputRow).toBeVisible();

        const step = sec.locator('.stepctl [data-action="step"]');
        for (let i = 0; i < 40; i++) await step.click();

        const tokens = sec.locator('[data-testid="be-tokens"]');
        await expect(tokens).toBeVisible();
        await expect(tokens.locator('.be-token')).toHaveCount(4);
        await expect(sec.locator('.be-phase')).toContainText('done');
    });
});
