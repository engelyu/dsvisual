const { test, expect } = require('@playwright/test');
const path = require('path');

const FILE_URL = 'file://' + path.resolve(__dirname, '..', 'index.html');

test.describe('UX polish — code density slider', () => {

    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => {
            try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {}
        });
        await page.goto(FILE_URL);
        await page.waitForSelector('.code-panel-body');
        // Reset localStorage so tests don't bleed state
        await page.evaluate(() => localStorage.removeItem('dsvisual.codeDensity'));
        await page.reload();
        await page.waitForSelector('.code-panel-body');
    });

    test('settings drawer opens on toggle and closes on × button', async ({ page }) => {
        const drawer = page.locator('#settings-drawer');
        await expect(drawer).toBeHidden();
        await page.locator('#settings-toggle').click();
        await expect(drawer).toBeVisible();
        await page.locator('.settings-drawer-close').click();
        await expect(drawer).toBeHidden();
    });

    test('settings drawer closes on backdrop click and Escape', async ({ page }) => {
        await page.locator('#settings-toggle').click();
        await page.locator('.settings-drawer-backdrop').click();
        await expect(page.locator('#settings-drawer')).toBeHidden();

        await page.locator('#settings-toggle').click();
        await page.keyboard.press('Escape');
        await expect(page.locator('#settings-drawer')).toBeHidden();
    });

    test('slider changes code-panel-body line-height and value display', async ({ page }) => {
        await page.locator('#settings-toggle').click();
        const slider = page.locator('#code-density-slider');
        // Drag the slider to 1.30 (browser drops trailing zeros → '1.3')
        await slider.evaluate((el) => {
            el.value = '1.30';
            el.dispatchEvent(new Event('input', { bubbles: true }));
        });

        // The value display shows the slider's value (browser strips trailing zeros to '1.3')
        await expect(page.locator('#code-density-value')).toHaveText(/^1\.30?$/);
        // The CSS custom property is set on :root.
        const v = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--code-line-height'));
        expect(parseFloat(v)).toBeCloseTo(1.3, 2);

        // The MAIN APP code panel's computed line-height must follow the slider
        // (not be overridden by Prism's pre[class*=language-] rule).
        const mainPanel = page.locator('.method-section-card .code-panel-body').first();
        const fontSize = await mainPanel.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
        const lh = await mainPanel.evaluate((el) => parseFloat(getComputedStyle(el).lineHeight));
        expect(lh).toBeCloseTo(fontSize * 1.3, 1);

        // CRITICAL: the inner <code> is what actually controls visible text spacing,
        // because Prism sets line-height: 1.5 on `code[class*="language-"]` directly.
        // If we only override the <pre>, the user sees no visible change.
        const codeEl = mainPanel.locator('code');
        const codeFs = await codeEl.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
        const codeLh = await codeEl.evaluate((el) => parseFloat(getComputedStyle(el).lineHeight));
        expect(codeLh).toBeCloseTo(codeFs * 1.3, 1);
    });

    test('density persists across page reload', async ({ page }) => {
        await page.locator('#settings-toggle').click();
        await page.locator('#code-density-slider').evaluate((el) => {
            el.value = '1.20';
            el.dispatchEvent(new Event('input', { bubbles: true }));
        });
        await page.reload();
        await page.waitForSelector('.code-panel-body');
        const lh = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--code-line-height'));
        expect(parseFloat(lh.trim())).toBeCloseTo(1.20, 2);
    });

    test('reset button restores 1.55 and clears localStorage', async ({ page }) => {
        await page.locator('#settings-toggle').click();
        await page.locator('#code-density-slider').evaluate((el) => {
            el.value = '1.20';
            el.dispatchEvent(new Event('input', { bubbles: true }));
        });
        await page.locator('#code-density-reset').click();
        await expect(page.locator('#code-density-value')).toHaveText('1.55');
        const stored = await page.evaluate(() => localStorage.getItem('dsvisual.codeDensity'));
        expect(stored).toBeNull();
    });

    test('preview block inside drawer updates with slider', async ({ page }) => {
        await page.locator('#settings-toggle').click();
        const previewPre = page.locator('.settings-row-preview .code-panel-body');
        const previewCode = previewPre.locator('code');
        await expect(previewPre).toBeVisible();
        const before = await previewCode.evaluate((el) => parseFloat(getComputedStyle(el).lineHeight));
        await page.locator('#code-density-slider').evaluate((el) => {
            el.value = '1.0';
            el.dispatchEvent(new Event('input', { bubbles: true }));
        });
        const after = await previewCode.evaluate((el) => parseFloat(getComputedStyle(el).lineHeight));
        expect(after).toBeLessThan(before);
    });
});

test.describe('UX polish — visualizer zoom', () => {

    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => {
            try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {}
        });
        await page.goto(FILE_URL);
        await page.waitForSelector('.viz-body-scaled');
    });

    test('zoom in raises percentage and scale to 110%', async ({ page }) => {
        const scaled = page.locator('.viz-body-scaled').first();
        const reset = page.locator('.viz-zoom-controls button[data-zoom="reset"]').first();
        await expect(reset).toHaveText('100%');
        await page.locator('.viz-zoom-controls button[data-zoom="in"]').first().click();
        await expect(reset).toHaveText('110%');
        const t = await scaled.evaluate((el) => getComputedStyle(el).getPropertyValue('--viz-zoom'));
        expect(parseFloat(t)).toBeCloseTo(1.1, 2);
    });

    test('zoom out drops to 90% and reset returns to 100%', async ({ page }) => {
        const reset = page.locator('.viz-zoom-controls button[data-zoom="reset"]').first();
        await page.locator('.viz-zoom-controls button[data-zoom="out"]').first().click();
        await expect(reset).toHaveText('90%');
        await reset.click();
        await expect(reset).toHaveText('100%');
    });

    test('zoom in clamps at 200%', async ({ page }) => {
        const reset = page.locator('.viz-zoom-controls button[data-zoom="reset"]').first();
        const inBtn = page.locator('.viz-zoom-controls button[data-zoom="in"]').first();
        for (let i = 0; i < 20; i++) await inBtn.click();
        await expect(reset).toHaveText('200%');
    });

    test('zoom out clamps at 50%', async ({ page }) => {
        const reset = page.locator('.viz-zoom-controls button[data-zoom="reset"]').first();
        const outBtn = page.locator('.viz-zoom-controls button[data-zoom="out"]').first();
        for (let i = 0; i < 20; i++) await outBtn.click();
        await expect(reset).toHaveText('50%');
    });

    test('switching method resets zoom to 100%', async ({ page }) => {
        const reset = page.locator('.viz-zoom-controls button[data-zoom="reset"]').first();
        // First, set the current method's zoom to 150%
        const inBtn = page.locator('.viz-zoom-controls button[data-zoom="in"]').first();
        for (let i = 0; i < 5; i++) await inBtn.click();
        await expect(reset).toHaveText('150%');

        // Switch to a different method via the category-nav dropdown
        const queueNavItem = page.locator(
            '.category-nav-item:has(.category-nav-method[data-method-id="queue"])');
        await queueNavItem.locator('.category-nav-btn').click();
        await queueNavItem.locator('.category-nav-method[data-method-id="queue"]').click();
        await page.waitForSelector('[data-method-section="queue"][data-runtime-state="active"]');
        const newReset = page.locator('[data-method-section="queue"] .viz-zoom-controls button[data-zoom="reset"]');
        await expect(newReset).toHaveText('100%');
    });

    test('wheel scroll inside visualizer does NOT zoom (gesture zoom disabled)', async ({ page }) => {
        const visual = page.locator('.method-section-visual').first();
        const reset = page.locator('.viz-zoom-controls button[data-zoom="reset"]').first();
        // A Mac trackpad two-finger scroll arrives as a wheel event; it must not change zoom.
        await visual.evaluate((el) => {
            el.dispatchEvent(new WheelEvent('wheel', { deltaY: -100, bubbles: true, cancelable: true }));
        });
        await expect(reset).toHaveText('100%');
        await visual.evaluate((el) => {
            el.dispatchEvent(new WheelEvent('wheel', { deltaY: 100, bubbles: true, cancelable: true }));
        });
        await expect(reset).toHaveText('100%');
    });

    test('zoom controls sit in the section header, not over the visualizer', async ({ page }) => {
        const headerControls = page.locator('.method-section-card .method-section-actions .viz-zoom-controls');
        await expect(headerControls).toBeVisible();
        const visualOverlapControls = page.locator('.method-section-card .method-section-visual > .viz-zoom-controls');
        await expect(visualOverlapControls).toHaveCount(0);
    });
});
