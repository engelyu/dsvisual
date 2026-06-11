const { test, expect } = require('@playwright/test');
const path = require('path');

async function loadMethod(page, methodId) {
    const navItem = page.locator(`.category-nav-item:has(.category-nav-method[data-method-id="${methodId}"])`);
    await navItem.locator('.category-nav-btn').click();
    await navItem.locator(`.category-nav-method[data-method-id="${methodId}"]`).click();
    await expect(page.locator(`[data-method-section="${methodId}"]`)).toHaveAttribute('data-runtime-state', 'active');
}

test.describe('m-way Search Tree', () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
        await page.goto('file://' + path.resolve(__dirname, '../index.html'));
        await loadMethod(page, 'tree-mway');
    });

    test('builds multi-key nodes as keys are inserted; code filename', async ({ page }) => {
        const sec = page.locator('[data-method-section="tree-mway"]');
        await expect(sec.locator('.code-panel-filename')).toContainText('tree_mway.cpp');
        const step = sec.locator('.stepctl [data-action="step"]');
        for (let i = 0; i < 12; i++) await step.click();
        await expect(sec.locator('.mw-node').first()).toBeVisible();
        await expect(sec.locator('.mw-node:has(.mw-key:nth-child(2))').first()).toBeVisible();
    });
});
