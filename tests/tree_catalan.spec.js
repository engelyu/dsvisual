const { test, expect } = require('@playwright/test');
const { loadMethod } = require('./helpers');
const path = require('path');

test.describe('Counting Trees (Catalan)', () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
        await page.goto('file://' + path.resolve(__dirname, '../index.html'));
        await loadMethod(page, 'tree-catalan');
    });

    test('n=3 enumerates to 5 and verifies the closed form', async ({ page }) => {
        const sec = page.locator('[data-method-section="tree-catalan"]');
        await sec.locator('.cat-nbtn[data-n="3"]').click();
        await sec.locator('.stepctl [data-action="run"]').click();
        await expect(sec.locator('.cat-verdict.cat-ok')).toContainText('= 5', { timeout: 15000 });
        await expect(sec.locator('.cat-total')).toContainText('5');
    });

    test('n=2 enumerates to 2', async ({ page }) => {
        const sec = page.locator('[data-method-section="tree-catalan"]');
        await sec.locator('.cat-nbtn[data-n="2"]').click();
        await sec.locator('.stepctl [data-action="run"]').click();
        await expect(sec.locator('.cat-verdict.cat-ok')).toContainText('= 2', { timeout: 15000 });
    });

    test('numeric panel shows C4=14 and C5=42', async ({ page }) => {
        const sec = page.locator('[data-method-section="tree-catalan"]');
        await expect(sec.locator('.cat-seq-row[data-n="4"]')).toContainText('14');
        await expect(sec.locator('.cat-seq-row[data-n="5"]')).toContainText('42');
    });
});
