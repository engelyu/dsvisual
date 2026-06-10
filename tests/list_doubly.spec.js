const { test, expect } = require('@playwright/test');
const path = require('path');

async function loadMethod(page, methodId) {
    const navItem = page.locator(`.category-nav-item:has(.category-nav-method[data-method-id="${methodId}"])`);
    await navItem.locator('.category-nav-btn').click();
    await navItem.locator(`.category-nav-method[data-method-id="${methodId}"]`).click();
    await expect(page.locator(`[data-method-section="${methodId}"]`)).toHaveAttribute('data-runtime-state', 'active');
}

test.describe('Doubly / Circular Linked List', () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
        await page.goto('file://' + path.resolve(__dirname, '../index.html'));
        await loadMethod(page, 'list-doubly');
    });

    test('renders nodes; circular toggle adds wrap indicator; code filename', async ({ page }) => {
        const sec = page.locator('[data-method-section="list-doubly"]');
        await expect(sec.locator('.code-panel-filename')).toContainText('list_doubly.cpp');
        await expect(sec.locator('.dl-node')).toHaveCount(4);
        await sec.locator('.dl-circular').check();
        await sec.locator('.dl-apply').click();
        await expect(sec.locator('.dl-wrap')).toBeVisible();
    });
});
