const { test, expect } = require('@playwright/test');
const path = require('path');

async function loadMethod(page, methodId) {
    const navItem = page.locator(`.category-nav-item:has(.category-nav-method[data-method-id="${methodId}"])`);
    await navItem.locator('.category-nav-btn').click();
    await navItem.locator(`.category-nav-method[data-method-id="${methodId}"]`).click();
    await expect(page.locator(`[data-method-section="${methodId}"]`)).toHaveAttribute('data-runtime-state', 'active');
}

test.describe('Maze stack backtracking', () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
        await page.goto('file://' + path.resolve(__dirname, '../index.html'));
        await loadMethod(page, 'maze-stack');
    });

    test('renders grid, steps to a found path; code filename', async ({ page }) => {
        const sec = page.locator('[data-method-section="maze-stack"]');
        await expect(sec.locator('.code-panel-filename')).toContainText('maze_stack.cpp');
        await expect(sec.locator('.mz-tbl')).toBeVisible();
        const step = sec.locator('.stepctl [data-action="step"]');
        for (let i = 0; i < 40; i++) await step.click();
        await expect(sec.locator('.mz-cell.path').first()).toBeVisible();
    });
});
