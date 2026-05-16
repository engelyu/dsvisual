const { test, expect } = require('@playwright/test');
const path = require('path');

const heapModes = [
    { id: 'mode-heap-binary', title: 'heap_binary.cpp', desc: 'Binary Heap', tutorial: 'Binary Heap' },
    { id: 'mode-heap-binomial', title: 'heap_binomial.cpp', desc: 'Binomial Queue', tutorial: 'Binomial Heap' },
    { id: 'mode-heap-fibonacci', title: 'heap_fibonacci.cpp', desc: 'Fibonacci Heap', tutorial: 'Fibonacci Heap' },
    { id: 'mode-heap-leftist', title: 'heap_leftist.cpp', desc: 'Leftist Heap', tutorial: 'Leftist Heap' },
    { id: 'mode-heap-skew', title: 'heap_skew.cpp', desc: 'Skew Heap', tutorial: 'Skew Heap' },
    { id: 'mode-heap-dary', title: 'heap_dary.cpp', desc: 'D-ary Heap', tutorial: '4-ary Heap' },
    { id: 'mode-heap-pairing', title: 'heap_pairing.cpp', desc: 'Pairing Heap', tutorial: 'Pairing Heap' },
];

async function loadMethod(page, methodId) {
    const categoryButtons = page.locator('[data-testid="category-nav"] .category-nav-btn');
    const count = await categoryButtons.count();
    for (let i = 0; i < count; i++) {
        await categoryButtons.nth(i).click();
        const card = page.locator(`[data-method-section="${methodId}"]`);
        if (await card.count()) {
            await card.locator('.method-load-btn').click();
            await expect(card).toHaveAttribute('data-runtime-state', 'active');
            return;
        }
    }
    throw new Error(`Method ${methodId} not found`);
}

async function loadMethodByRadioId(page, radioId) {
    const methodId = await page.locator(`#${radioId}`).getAttribute('value');
    await loadMethod(page, methodId);
}

test.describe('Heap Visualizer Suite', () => {
    test.beforeEach(async ({ page }) => {
        const fileUri = 'file://' + path.resolve(__dirname, '../index.html');
        await page.goto(fileUri);
    });

    for (const mode of heapModes) {
        test(`${mode.id}: mode switch shows source + description`, async ({ page }) => {
            await loadMethodByRadioId(page, mode.id);
            await expect(page.locator('#code-title')).toHaveText(mode.title);
            await expect(page.locator('#desc-view h3')).toContainText(mode.desc);
            await expect(page.locator('#heap-container')).toBeVisible();
        });

        test(`${mode.id}: insert / peek / extract / merge / change / delete`, async ({ page }) => {
            await loadMethodByRadioId(page, mode.id);

            await page.fill('#heap-val', '10');
            await page.click('#btn-heap-insert');
            await expect(page.locator('#status-message')).toContainText('Inserted 10');
            await expect(page.locator('#btn-heap-insert')).toBeEnabled();

            await page.fill('#heap-val', '4');
            await page.click('#btn-heap-insert');
            await expect(page.locator('#status-message')).toContainText('Inserted 4');
            await expect(page.locator('#btn-heap-insert')).toBeEnabled();

            await page.fill('#heap-val', '18');
            await page.click('#btn-heap-insert');
            await expect(page.locator('#status-message')).toContainText('Inserted 18');
            await expect(page.locator('#btn-heap-insert')).toBeEnabled();

            await expect(page.locator('.heap-node')).toHaveCount(3);
            await page.click('#btn-heap-peek');
            await expect(page.locator('#status-message')).toContainText('Peek');

            await page.click('#btn-heap-extract');
            await expect(page.locator('#status-message')).toContainText('Extracted');
            await expect(page.locator('#btn-heap-insert')).toBeEnabled();

            await page.fill('#heap-extra', '7,2,30');
            await page.click('#btn-heap-merge');
            await expect(page.locator('#status-message')).toContainText('Merged');
            await expect(page.locator('#btn-heap-insert')).toBeEnabled();

            await page.fill('#heap-val', '30');
            await page.fill('#heap-extra', '1');
            await page.click('#btn-heap-change');
            await expect(page.locator('#status-message')).toContainText('Key changed');
            await expect(page.locator('#btn-heap-insert')).toBeEnabled();

            await page.fill('#heap-val', '7');
            await page.click('#btn-heap-delete');
            await expect(page.locator('#status-message')).toContainText('Deleted');
            await expect(page.locator('#btn-heap-insert')).toBeEnabled();
        });
    }

    test('Min/Max switch changes extracted semantics', async ({ page }) => {
        await loadMethodByRadioId(page, 'mode-heap-binary');

        await page.selectOption('#heap-order', 'min');
        for (const v of [9, 1, 5]) {
            await page.fill('#heap-val', String(v));
            await page.click('#btn-heap-insert');
            await expect(page.locator('#status-message')).toContainText('Inserted');
            await expect(page.locator('#btn-heap-insert')).toBeEnabled();
        }
        await page.click('#btn-heap-extract');
        await expect(page.locator('#status-message')).toContainText('Extracted 1');

        await loadMethodByRadioId(page, 'mode-heap-binary');
        await page.selectOption('#heap-order', 'max');
        for (const v of [9, 1, 5]) {
            await page.fill('#heap-val', String(v));
            await page.click('#btn-heap-insert');
            await expect(page.locator('#status-message')).toContainText('Inserted');
            await expect(page.locator('#btn-heap-insert')).toBeEnabled();
        }
        await page.click('#btn-heap-extract');
        await expect(page.locator('#status-message')).toContainText('Extracted 9');
    });

    for (const mode of heapModes) {
        test(`${mode.id}: tutorial opens and exits`, async ({ page }) => {
            await loadMethodByRadioId(page, mode.id);
            await expect(page.locator('#code-title')).toHaveText(mode.title);
            await expect(page.locator('#btn-heap-tutorial')).toBeVisible();
            await page.click('#btn-heap-tutorial');

            await expect(page.locator('#heap-tutorial-panel')).toBeVisible();
            await expect(page.locator('#heap-tutorial-mode')).toContainText(mode.tutorial);
            await expect(page.locator('#heap-tutorial-title')).toContainText('Create the first root');
            await expect(page.locator('#heap-tutorial-progress')).toContainText('Step 1 / 8');
            await expect(page.locator('#heap-val')).toHaveValue('12');

            await page.click('#btn-heap-tutorial-exit');
            await expect(page.locator('#heap-tutorial-panel')).toBeHidden();
            await expect(page.locator('#btn-heap-tutorial')).toHaveText('Start Tutorial');
        });
    }

    test('Heap tutorial auto-advances and can restart', async ({ page }) => {
        await loadMethodByRadioId(page, 'mode-heap-binary');
        await expect(page.locator('#code-title')).toHaveText('heap_binary.cpp');
        await expect(page.locator('#btn-heap-tutorial')).toBeVisible();
        await page.click('#btn-heap-tutorial');

        await expect(page.locator('#heap-tutorial-progress')).toContainText('Step 1 / 8');
        await page.click('#btn-heap-insert');
        await expect(page.locator('#heap-tutorial-progress')).toContainText('Step 2 / 8');
        await expect(page.locator('#heap-val')).toHaveValue('7');

        await page.click('#btn-heap-insert');
        await expect(page.locator('#heap-tutorial-progress')).toContainText('Step 3 / 8');
        await expect(page.locator('#heap-val')).toHaveValue('19');

        await page.click('#btn-heap-tutorial-restart');
        await expect(page.locator('#heap-tutorial-progress')).toContainText('Step 1 / 8');
        await expect(page.locator('.heap-node')).toHaveCount(0);
        await expect(page.locator('#heap-val')).toHaveValue('12');
    });
});
