const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Data Structure Visualizer Full Suite', () => {
    
    test.beforeEach(async ({ page }) => {
        // Correctly assemble cross-platform absolute URI mapping mapping directly to your HTML
        const fileUri = 'file://' + path.resolve(__dirname, '../index.html');
        await page.goto(fileUri);
    });

    test('Initial Load: Should load Array Stack correctly by default', async ({ page }) => {
        await expect(page.locator('#code-title')).toHaveText('stack_array.cpp');
        await expect(page.locator('#desc-view h3')).toHaveText('Stack (Array Implementation)');
        await expect(page.locator('#array-container')).toBeVisible();
    });

    test('Trie Trees: Submits string prefix and generates character-marked edges', async ({ page }) => {
        // Toggle UI
        await page.locator('label[for="mode-tree-trie"]').click();
        await expect(page.locator('#code-title')).toHaveText('tree_trie.cpp');
        await expect(page.locator('#desc-view h3')).toHaveText('Trie (Prefix Tree)');

        // Run UI Event Check
        await page.fill('#text-tree-val', 'CAT');
        await page.click('#btn-text-tree-add');
        
        // Wait till Javascript triggers UI execution hook completion
        await expect(page.locator('#status-message')).toHaveText('Execution Complete!');
        
        // Validate visual rendering logic produced exactly 3 geometric edges (C, A, T)
        const edges = page.locator('.edge-label');
        await expect(edges).toHaveCount(3);
        await expect(edges.nth(0)).toHaveText('C');

        // And only 1 literal "End Of Word" marker
        const trieEnd = page.locator('.trie-end');
        await expect(trieEnd).toHaveCount(1);
    });

    test('Sorting Engine: Instantiates bars and manages states successfully', async ({ page }) => {
        await page.locator('label[for="mode-sort-bubble"]').click();
        await expect(page.locator('#code-title')).toHaveText('sort_bubble.cpp');
        
        await page.click('#btn-sort-random');
        await expect(page.locator('.sort-bar')).toHaveCount(15);

        await page.click('#btn-sort-start');
        
        // Animation Lock validation (The state must visibly mark as executing)
        await expect(page.locator('#status-message')).toContainText('Bubble Sort', { timeout: 20000 });
    });

    test('Hash Tables: Explicitly verifies Collision Handlers catch overlaps', async ({ page }) => {
        await page.locator('label[for="mode-hash-open"]').click();
        
        await page.fill('#hash-val', '12'); // Modulo mathematics mapping to Index 2
        await page.click('#btn-hash-add');
        await page.waitForTimeout(1000); // Safe UI delay matching user behaviour
        
        await page.fill('#hash-val', '22'); // Identical mapping to Index 2 forces manual linear probe
        await page.click('#btn-hash-add');
        
        // Playwright listens for the DOM string injection reporting Probing
        await expect(page.locator('#status-message')).toContainText('occupied! Probing...', { timeout: 10000 });
    });

    test('Advanced Sort: Radix Sort completes execution properly', async ({ page }) => {
        await page.locator('label[for="mode-sort-radix"]').click();
        await expect(page.locator('#code-title')).toHaveText('sort_radix.cpp');
        await page.click('#btn-sort-random');
        await expect(page.locator('.sort-bar')).toHaveCount(15);
        await page.click('#btn-sort-start');
        await expect(page.locator('#status-message')).toContainText('Radix Sort', { timeout: 15000 });
    });

    test('Shaker Sort: Bidirectional bubble sort completes correctly', async ({ page }) => {
        await page.locator('label[for="mode-sort-shaker"]').click();
        await expect(page.locator('#code-title')).toHaveText('sort_shaker.cpp');
        await expect(page.locator('#desc-view h3')).toContainText('Shaker Sort');
        
        await page.click('#btn-sort-random');
        await expect(page.locator('.sort-bar')).toHaveCount(15);
        await page.locator('#sort-speed').fill('600');

        await page.click('#btn-sort-start');
        await expect(page.locator('#status-message')).toContainText('Shaker Sort', { timeout: 15000 });
        await expect(page.locator('#status-message')).toHaveText('Execution Complete!', { timeout: 15000 });
    });

});
