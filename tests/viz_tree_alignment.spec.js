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

// For each edge <line>, both endpoints must coincide with a node's VISUAL center
// (accounting for the .tree-node translate(-50%,-50%) centering). Returns the worst
// mismatch distance in CSS px between any line endpoint and its nearest node center.
async function worstEdgeNodeGap(page, stageSel, nodesSel, edgesSel) {
    return await page.evaluate(([stageSel, nodesSel, edgesSel]) => {
        const stage = document.querySelector(stageSel);
        const sr = stage.getBoundingClientRect();
        const centers = Array.from(document.querySelectorAll(nodesSel)).map((n) => {
            const r = n.getBoundingClientRect();
            return { x: r.left + r.width / 2 - sr.left, y: r.top + r.height / 2 - sr.top };
        });
        const lines = Array.from(document.querySelectorAll(edgesSel));
        if (!lines.length || !centers.length) return { gap: Infinity, lines: lines.length, nodes: centers.length };
        const nearest = (px, py) => Math.min(...centers.map((c) => Math.hypot(c.x - px, c.y - py)));
        let worst = 0;
        for (const ln of lines) {
            const x1 = parseFloat(ln.getAttribute('x1')), y1 = parseFloat(ln.getAttribute('y1'));
            const x2 = parseFloat(ln.getAttribute('x2')), y2 = parseFloat(ln.getAttribute('y2'));
            worst = Math.max(worst, nearest(x1, y1), nearest(x2, y2));
        }
        return { gap: worst, lines: lines.length, nodes: centers.length };
    }, [stageSel, nodesSel, edgesSel]);
}

test.describe('Tree edge/node alignment', () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
        await page.goto('file://' + path.resolve(__dirname, '../index.html'));
    });

    test('tree-traversal: every edge endpoint lands on a node center', async ({ page }) => {
        await loadMethod(page, 'tree-traversal');
        const sec = '[data-method-section="tree-traversal"] ';
        const res = await worstEdgeNodeGap(page, sec + '.tt-stage', sec + '.tt-nodes .tree-node', sec + '.tt-edges line');
        expect(res.lines).toBeGreaterThan(0);
        expect(res.gap).toBeLessThan(2);
    });

    test('huffman: every edge endpoint lands on a node center (after building the tree)', async ({ page }) => {
        await loadMethod(page, 'huffman');
        const sec = '[data-method-section="huffman"] ';
        const step = page.locator(sec + '.stepctl [data-action="step"]');
        for (let i = 0; i < 25; i++) await step.click();
        const res = await worstEdgeNodeGap(page, sec + '.hf-stage', sec + '.hf-nodes .tree-node', sec + '.hf-edges line');
        expect(res.lines).toBeGreaterThan(0);
        expect(res.gap).toBeLessThan(2);
    });
});
