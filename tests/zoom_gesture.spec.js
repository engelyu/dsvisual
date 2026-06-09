const { test, expect } = require('@playwright/test');
const path = require('path');

async function loadMethod(page, methodId) {
    const navItem = page.locator(
        `.category-nav-item:has(.category-nav-method[data-method-id="${methodId}"])`);
    await navItem.locator('.category-nav-btn').click();
    await navItem.locator(`.category-nav-method[data-method-id="${methodId}"]`).click();
    const card = page.locator(`[data-method-section="${methodId}"]`);
    await expect(card).toHaveAttribute('data-runtime-state', 'active');
}

test.describe('Zoom is controlled only by the zoom buttons (not trackpad gestures)', () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => {
            try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {}
        });
        await page.goto('file://' + path.resolve(__dirname, '../index.html'));
        await loadMethod(page, 'tree-bst');
    });

    test('trackpad wheel/scroll over the visualizer does NOT change zoom', async ({ page }) => {
        const section = page.locator('[data-method-section="tree-bst"]');
        const reset = section.locator('[data-zoom="reset"]');
        await expect(reset).toHaveText('100%');

        // Simulate a Mac trackpad two-finger scroll (delivered as a wheel event) over the viz.
        await section.locator('.method-section-visual').hover();
        await page.mouse.wheel(0, -300);

        // Zoom must be unaffected by the gesture (gesture zoom is disabled).
        await expect(reset).toHaveText('100%');
    });

    test('the zoom buttons still change zoom', async ({ page }) => {
        const section = page.locator('[data-method-section="tree-bst"]');
        const reset = section.locator('[data-zoom="reset"]');
        await expect(reset).toHaveText('100%');

        await section.locator('[data-zoom="in"]').click();
        await expect(reset).toHaveText('110%');

        await section.locator('[data-zoom="out"]').click();
        await expect(reset).toHaveText('100%');

        await section.locator('[data-zoom="in"]').click();
        await section.locator('[data-zoom="reset"]').click();
        await expect(reset).toHaveText('100%');
    });
});
