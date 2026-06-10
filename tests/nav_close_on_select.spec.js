const { test, expect } = require('@playwright/test');
const path = require('path');
const FILE_URL = 'file://' + path.resolve(__dirname, '../index.html');

test.describe('Category nav: dropdown auto-closes after selecting a method', () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
        await page.goto(FILE_URL);
    });

    test('selecting a method closes the dropdown even while the cursor stays over the item', async ({ page }) => {
        const treesItem = page.locator('.category-nav-item:has(.category-nav-method[data-method-id="tree-bst"])');
        const dropdown = treesItem.locator('.category-nav-dropdown');

        await treesItem.locator('.category-nav-btn').click();
        await expect(dropdown).toBeVisible();

        // Click leaves the mouse hovering inside the item — the dropdown must still close.
        await treesItem.locator('.category-nav-method[data-method-id="tree-bst"]').click();
        await expect(page.locator('[data-method-section="tree-bst"]')).toHaveAttribute('data-runtime-state', 'active');
        await expect(dropdown).toBeHidden();
    });

    test('hover-to-preview still works after the cursor leaves and returns', async ({ page }) => {
        const treesItem = page.locator('.category-nav-item:has(.category-nav-method[data-method-id="tree-bst"])');
        const dropdown = treesItem.locator('.category-nav-dropdown');

        await treesItem.locator('.category-nav-btn').click();
        await treesItem.locator('.category-nav-method[data-method-id="tree-bst"]').click();
        await expect(dropdown).toBeHidden();

        // Leave the item (clears the post-pick suppression), then hover to re-open.
        await page.mouse.move(0, 0);
        await treesItem.locator('.category-nav-btn').hover();
        await expect(dropdown).toBeVisible();
    });
});
