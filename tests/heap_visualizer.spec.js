const { test, expect } = require('@playwright/test');
const path = require('path');

const heapModes = [
    { id: 'heap-binary', file: 'heap_binary.cpp', title: 'Binary Heap' },
    { id: 'heap-binomial', file: 'heap_binomial.cpp', title: 'Binomial Heap' },
    { id: 'heap-fibonacci', file: 'heap_fibonacci.cpp', title: 'Fibonacci Heap' },
    { id: 'heap-leftist', file: 'heap_leftist.cpp', title: 'Leftist Heap' },
    { id: 'heap-skew', file: 'heap_skew.cpp', title: 'Skew Heap' },
    { id: 'heap-dary', file: 'heap_dary.cpp', title: 'D-ary Heap' },
    { id: 'heap-pairing', file: 'heap_pairing.cpp', title: 'Pairing Heap' },
];

async function loadMethod(page, methodId) {
    const navItem = page.locator(
        `.category-nav-item:has(.category-nav-method[data-method-id="${methodId}"])`);
    await navItem.locator('.category-nav-btn').click();
    await navItem.locator(`.category-nav-method[data-method-id="${methodId}"]`).click();
    const card = page.locator(`[data-method-section="${methodId}"]`);
    await expect(card).toHaveAttribute('data-runtime-state', 'active');
}

test.describe('Heap Visualizer Suite', () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => {
            try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {}
        });
        const fileUri = 'file://' + path.resolve(__dirname, '../index.html');
        await page.goto(fileUri);
    });

    for (const mode of heapModes) {
        test(`${mode.id}: menu selection activates card and opens slides`, async ({ page }) => {
            await loadMethod(page, mode.id);

            const card = page.locator(`[data-method-section="${mode.id}"]`);
            await expect(card).toBeVisible();
            await expect(card.locator('.code-panel-filename')).toHaveText(mode.file);

            await card.locator('.method-slides-btn').click();
            await expect(page.locator('[data-testid="slide-viewer"]')).toBeVisible();
            await expect(page.locator('#slide-viewer-title')).toContainText(mode.title);

            await page.locator('.slide-viewer-close').click();
            await expect(page.locator('[data-testid="slide-viewer"]')).toBeHidden();
        });
    }
});
