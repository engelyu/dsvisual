const { test, expect } = require('@playwright/test');
const path = require('path');

const FILE_URI = 'file://' + path.resolve(__dirname, '../index.html');

test.describe('i18n', () => {
    test('toggle persists across reload', async ({ browser }) => {
        // No addInitScript; we want to control localStorage directly.
        const context = await browser.newContext({ locale: 'en-US' });
        const page = await context.newPage();
        await page.goto(FILE_URI);
        // Default is en. Switch to zh via the API.
        await page.evaluate(() => window.I18N.setLanguage('zh'));
        await expect(page.locator('html')).toHaveAttribute('lang', 'zh-Hant');
        // Reload — localStorage persists.
        await page.reload();
        await expect(page.locator('html')).toHaveAttribute('lang', 'zh-Hant');
        await expect(page.locator('.category-nav-item[data-group="linear"] .category-nav-btn'))
            .toHaveText('線性結構');
        await context.close();
    });

    test('<html lang> attribute updates on toggle', async ({ page }) => {
        await page.addInitScript(() => {
            try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {}
        });
        await page.goto(FILE_URI);
        await expect(page.locator('html')).toHaveAttribute('lang', 'en');
        await page.evaluate(() => window.I18N.setLanguage('zh'));
        await expect(page.locator('html')).toHaveAttribute('lang', 'zh-Hant');
        await page.evaluate(() => window.I18N.setLanguage('en'));
        await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    });

    test('data-i18n-key walker translates settings drawer', async ({ page }) => {
        await page.addInitScript(() => {
            try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {}
        });
        await page.goto(FILE_URI);
        await expect(page.locator('#settings-drawer-title')).toHaveText('Settings');
        await page.evaluate(() => window.I18N.setLanguage('zh'));
        await expect(page.locator('#settings-drawer-title')).toHaveText('設定');
    });

    test('missing-key fallback returns the raw key', async ({ page }) => {
        await page.addInitScript(() => {
            try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {}
        });
        await page.goto(FILE_URI);
        const result = await page.evaluate(() => window.t('definitely.missing.key'));
        expect(result).toBe('definitely.missing.key');
    });

    test('browser auto-detect: zh-TW locale defaults to zh', async ({ browser }) => {
        const context = await browser.newContext({ locale: 'zh-TW' });
        const page = await context.newPage();
        // NO addInitScript — we want the natural first-visit behavior.
        await page.goto(FILE_URI);
        await expect(page.locator('html')).toHaveAttribute('lang', 'zh-Hant');
        await expect(page.locator('.category-nav-item[data-group="linear"] .category-nav-btn'))
            .toHaveText('線性結構');
        await context.close();
    });

    test('browser auto-detect: en-US locale defaults to en', async ({ browser }) => {
        const context = await browser.newContext({ locale: 'en-US' });
        const page = await context.newPage();
        await page.goto(FILE_URI);
        await expect(page.locator('html')).toHaveAttribute('lang', 'en');
        await expect(page.locator('.category-nav-item[data-group="linear"] .category-nav-btn'))
            .toHaveText('Linear Structures');
        await context.close();
    });

    test('overview pill is leftmost; shows grid; tile click loads method; toggles language', async ({ page }) => {
        await page.addInitScript(() => {
            try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {}
        });
        await page.goto(FILE_URI);
        // Leftmost pill is Overview, labeled "Overview" in en.
        const firstPill = page.locator('.app-category-nav .category-nav-btn').first();
        await expect(firstPill).toHaveText('Overview');
        // Click → overview-section visible, method-sections actually hidden
        // (not just hidden=true on the element — must be display:none too,
        // since .method-sections has display:flex that would otherwise win).
        await firstPill.click();
        await expect(page.locator('[data-testid="overview-section"]')).toBeVisible();
        await expect(page.locator('[data-testid="method-sections"]')).toBeHidden();
        // Grid has 14 categories and 106 tiles (one per method).
        await expect(page.locator('[data-testid="overview-grid"] .overview-category')).toHaveCount(14);
        await expect(page.locator('[data-testid="overview-grid"] .overview-tile')).toHaveCount(106);
        // Click a tile → overview hides, method activates.
        await page.locator('.overview-tile[data-method-id="tree-bst"]').click();
        await expect(page.locator('[data-testid="overview-section"]')).toBeHidden();
        await expect(page.locator('[data-method-section="tree-bst"]'))
            .toHaveAttribute('data-runtime-state', 'active');
        // Re-open overview, then toggle language — content re-renders in zh.
        await firstPill.click();
        await expect(page.locator('[data-testid="overview-section"]')).toBeVisible();
        await page.evaluate(() => window.I18N.setLanguage('zh'));
        await expect(page.locator('.app-category-nav .category-nav-btn').first()).toHaveText('總覽');
        await expect(page.locator('[data-testid="overview-section"] h2')).toHaveText('總覽');
    });

    test('persistent lang-menu in header switches language on click', async ({ page }) => {
        await page.addInitScript(() => {
            try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {}
        });
        await page.goto(FILE_URI);
        const menu = page.locator('[data-testid="lang-menu"]');
        await expect(menu).toBeVisible();
        // Trigger shows the CURRENT language ("English" / "中文"), unlike the
        // slide-viewer toggle which shows the TARGET.
        await expect(menu.locator('.lang-menu-current')).toHaveText('English');
        // Hover the menu to reveal the dropdown (CSS :hover-driven), then click the zh option.
        await menu.hover();
        await menu.locator('.lang-menu-option[data-lang="zh"]').click();
        await expect(page.locator('html')).toHaveAttribute('lang', 'zh-Hant');
        await expect(menu.locator('.lang-menu-current')).toHaveText('中文');
        // Re-hover to reveal the dropdown again so we can read .is-current-lang.
        await menu.hover();
        await expect(menu.locator('.lang-menu-option[data-lang="zh"]'))
            .toHaveClass(/\bis-current-lang\b/);
        await expect(menu.locator('.lang-menu-option[data-lang="en"]'))
            .not.toHaveClass(/\bis-current-lang\b/);
    });
});
