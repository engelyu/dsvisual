const { test, expect } = require('@playwright/test');
const path = require('path');

async function loadMethod(page, methodId) {
    const navItem = page.locator(`.category-nav-item:has(.category-nav-method[data-method-id="${methodId}"])`);
    await navItem.locator('.category-nav-btn').click();
    await navItem.locator(`.category-nav-method[data-method-id="${methodId}"]`).click();
    await expect(page.locator(`[data-method-section="${methodId}"]`)).toHaveAttribute('data-runtime-state', 'active');
}

test.describe('Threaded Binary Tree', () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
        await page.goto('file://' + path.resolve(__dirname, '../index.html'));
        await loadMethod(page, 'tree-threaded');
    });

    test('renders tree + dashed threads; steps to full inorder; code filename', async ({ page }) => {
        const sec = page.locator('[data-method-section="tree-threaded"]');
        await expect(sec.locator('.code-panel-filename')).toContainText('tree_threaded.cpp');
        await expect(sec.locator('.th-edges path')).not.toHaveCount(0);
        const step = sec.locator('.stepctl [data-action="step"]');
        for (let i = 0; i < 12; i++) await step.click();
        await expect(sec.locator('.th-seq')).toContainText('20, 30, 40, 50, 60, 70, 80');
    });
});
