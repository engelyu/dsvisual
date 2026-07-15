const { test, expect } = require('@playwright/test');
const { loadMethod } = require('./helpers');
const path = require('path');

test.describe('tree-rb (紅黑樹旋轉觀測站)', () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
        await page.goto('file://' + path.resolve(__dirname, '../index.html'));
        await loadMethod(page, 'tree-rb');
    });

    test('renders the sandbox with toolbar, presets, transport and step log', async ({ page }) => {
        const sec = page.locator('[data-method-section="tree-rb"]');
        await expect(sec.locator('[data-testid="rbviz-input"]')).toBeVisible();
        await expect(sec.locator('.rbviz-preset')).toHaveCount(6);
        await expect(sec.locator('[data-testid="rbviz-transport"] .tbtn')).toHaveCount(5);
        // The log itself is empty (zero-height) until the first operation,
        // so assert on its titled column instead.
        await expect(sec.locator('.rbviz-logcol')).toBeVisible();
        await expect(sec.locator('.rbviz-logcol h4')).toHaveText('步驟紀錄');
    });

    test('code panel is a collapsed drawer, opened via the header toggle', async ({ page }) => {
        const sec = page.locator('[data-method-section="tree-rb"]');
        // No side-by-side code panel in the grid; drawer hidden by default.
        await expect(sec.locator('.method-section-grid .code-panel')).toHaveCount(0);
        const drawer = sec.locator('[data-testid="code-drawer"]');
        await expect(drawer).toBeHidden();

        await sec.locator('[data-testid="code-drawer-toggle"]').click();
        await expect(drawer).toBeVisible();
        await expect(drawer.locator('.code-panel-filename')).toContainText('tree_rb.cpp');
        await expect(drawer.locator('code')).toContainText('rotateLeft');

        await drawer.locator('.code-drawer-close').click();
        await expect(drawer).toBeHidden();
    });

    test('inserting values grows the tree with rewindable steps', async ({ page }) => {
        const sec = page.locator('[data-method-section="tree-rb"]');
        const input = sec.locator('[data-testid="rbviz-input"]');
        for (const v of ['10', '5', '15']) {
            await input.fill(v);
            await sec.locator('[data-testid="rbviz-insert"]').click();
        }
        // Playback advances to the final snapshot: 3 nodes on stage.
        await expect(sec.locator('[data-testid="rbviz-stage"] .nd')).toHaveCount(3, { timeout: 15000 });
        await expect(sec.locator('[data-testid="rbviz-transport"] .cnt')).toContainText('4 / 4');
        // Step log groups steps under the three insert operations.
        await expect(sec.locator('[data-testid="rbviz-log"] .op-h')).toHaveCount(3);

        // ArrowLeft rewinds one step.
        await page.keyboard.press('ArrowLeft');
        await expect(sec.locator('[data-testid="rbviz-transport"] .cnt')).toContainText('3 / 4');
    });

    test('duplicate insert is rejected via status message', async ({ page }) => {
        const sec = page.locator('[data-method-section="tree-rb"]');
        const input = sec.locator('[data-testid="rbviz-input"]');
        await input.fill('7');
        await sec.locator('[data-testid="rbviz-insert"]').click();
        await input.fill('7');
        await sec.locator('[data-testid="rbviz-insert"]').click();
        await expect(page.locator('#status-message')).toContainText('已經在樹裡了');
    });

    test('delete preset loads paused on the built tree; slider reaches the deletion', async ({ page }) => {
        const sec = page.locator('[data-method-section="tree-rb"]');
        await sec.locator('.rbviz-preset', { hasText: '刪除三連旋' }).click();
        // Presets no longer autoplay: parked on the fully-built tree, ▶ untouched.
        await expect(sec.locator('[data-testid="rbviz-transport"] .tbtn.play')).toHaveText('▶');
        await expect(sec.locator('[data-testid="rbviz-stage"] .nd')).toHaveCount(31);
        // Jump the slider to the final step: 15 deleted → 30 nodes, with rotation steps logged.
        await sec.locator('[data-testid="rbviz-transport"] input[type=range]')
            .evaluate((el) => { el.value = el.max; el.dispatchEvent(new Event('input', { bubbles: true })); });
        await expect(sec.locator('[data-testid="rbviz-stage"] .nd')).toHaveCount(30);
        await expect(sec.locator('[data-testid="rbviz-log"] .dot.k-rotate').first()).toBeAttached();
    });

    test('clear resets the tree to the empty state', async ({ page }) => {
        const sec = page.locator('[data-method-section="tree-rb"]');
        const input = sec.locator('[data-testid="rbviz-input"]');
        await input.fill('42');
        await sec.locator('[data-testid="rbviz-insert"]').click();
        await sec.locator('[data-testid="rbviz-clear"]').click();
        await expect(sec.locator('[data-testid="rbviz-stage"] .nd')).toHaveCount(0);
        await expect(sec.locator('.rbviz-empty')).toBeVisible();
    });

    test('other tree methods keep the side-by-side code panel', async ({ page }) => {
        await loadMethod(page, 'tree-bst');
        const sec = page.locator('[data-method-section="tree-bst"]');
        await expect(sec.locator('.method-section-grid .code-panel')).toHaveCount(1);
        await expect(sec.locator('[data-testid="code-drawer-toggle"]')).toHaveCount(0);
    });
});
