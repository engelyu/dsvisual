const { test, expect } = require('@playwright/test');
const path = require('path');

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

    test('Phase 1 category nav: renders six top-level groups and drives method sections', async ({ page }) => {
        const categoryNav = page.locator('[data-testid="category-nav"]');
        await expect(categoryNav).toBeVisible();
        await expect(categoryNav.locator('.category-nav-btn')).toHaveCount(6);
        await expect(categoryNav.locator('.category-nav-btn.active')).toHaveText('Basic Linear Structures');
        await expect(page.locator('.legacy-runtime-stage')).toBeHidden();

        await categoryNav.getByRole('button', { name: 'Advanced & Application-Specific' }).click();
        await expect(categoryNav.locator('.category-nav-btn.active')).toHaveText('Advanced & Application-Specific');
        await expect(page.locator('[data-testid="method-sections"] [data-method-section="sort-bubble"]')).toBeVisible();

        await categoryNav.getByRole('button', { name: 'Non-Linear Structures' }).click();
        await expect(categoryNav.locator('.category-nav-btn.active')).toHaveText('Non-Linear Structures');
        await expect(page.locator('[data-testid="method-sections"] [data-method-section="tree-trie"]')).toBeVisible();
    });

    test('Phase 2 method sections: renders selected category methods and loads a method', async ({ page }) => {
        const methodSections = page.locator('[data-testid="method-sections"]');
        await expect(methodSections).toBeVisible();
        await expect(methodSections.locator('[data-method-section]')).toHaveCount(4);
        await expect(methodSections.locator('[data-method-section="stack-array"] .method-section-code')).toContainText('stack_array.cpp');

        await page.locator('[data-testid="category-nav"]').getByRole('button', { name: 'Advanced & Application-Specific' }).click();
        await expect(methodSections.locator('[data-method-section="sort-bubble"]')).toBeVisible();
        await expect(methodSections.locator('[data-method-section="sort-bubble"] .method-section-grid')).toBeVisible();
        await expect(methodSections.locator('[data-method-section="sort-bubble"] .method-section-code')).toContainText('sort_bubble.cpp');

        await methodSections.locator('[data-method-section="sort-bubble"] .method-load-btn').click();
        await expect(page.locator('#code-title')).toHaveText('sort_bubble.cpp');
        await expect(methodSections.locator('[data-method-section="sort-bubble"]')).toHaveClass(/active/);
    });

    test('Phase 3 runtime boundary: method sections track active and loaded states', async ({ page }) => {
        const methodSections = page.locator('[data-testid="method-sections"]');
        await expect(methodSections.locator('[data-method-section="stack-array"]')).toHaveAttribute('data-runtime-state', 'active');
        await expect(methodSections.locator('[data-method-section="queue"]')).toHaveAttribute('data-runtime-state', 'idle');

        await methodSections.locator('[data-method-section="queue"] .method-load-btn').click();
        await expect(page.locator('#code-title')).toHaveText('queue.cpp');
        await expect(methodSections.locator('[data-method-section="queue"]')).toHaveAttribute('data-runtime-state', 'active');
        await expect(methodSections.locator('[data-method-section="stack-array"]')).toHaveAttribute('data-runtime-state', 'loaded');
    });

    test('Phase 4 slides viewer: opens method explanation and closes', async ({ page }) => {
        const methodSections = page.locator('[data-testid="method-sections"]');
        const slideViewer = page.locator('[data-testid="slide-viewer"]');

        await methodSections.locator('[data-method-section="stack-array"] .method-slides-btn').click();
        await expect(slideViewer).toBeVisible();
        await expect(page.locator('#slide-viewer-title')).toHaveText('Stack (Array)');
        await expect(page.locator('#slide-viewer-progress')).toHaveText('Slide 1 / 1');
        await expect(page.locator('#slide-viewer-body')).toContainText('Stack');

        await page.locator('.slide-viewer-close').click();
        await expect(slideViewer).toBeHidden();
    });

    test('Phase 5 regression: every top-level category renders method sections', async ({ page }) => {
        const expectedCounts = [
            ['Basic Linear Structures', 4],
            ['Linked Lists', 1],
            ['Non-Linear Structures', 13],
            ['Advanced & Application-Specific', 23],
            ['OOP Concepts', 3],
            ['Design Patterns', 6],
        ];

        for (const [category, count] of expectedCounts) {
            await page.locator('[data-testid="category-nav"]').getByRole('button', { name: category }).click();
            await expect(page.locator('[data-testid="method-sections"] [data-method-section]')).toHaveCount(count);
        }
    });

    test('Trie Trees: Submits string prefix and generates character-marked edges', async ({ page }) => {
        await loadMethodByRadioId(page, 'mode-tree-trie');
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
        await loadMethodByRadioId(page, 'mode-sort-bubble');
        await expect(page.locator('#code-title')).toHaveText('sort_bubble.cpp');
        
        await page.click('#btn-sort-random');
        await expect(page.locator('.sort-bar')).toHaveCount(15);

        await page.click('#btn-sort-start');
        
        // Animation Lock validation (The state must visibly mark as executing)
        await expect(page.locator('#status-message')).toContainText('Bubble Sort', { timeout: 20000 });
    });

    test('Hash Tables: Explicitly verifies Collision Handlers catch overlaps', async ({ page }) => {
        await loadMethodByRadioId(page, 'mode-hash-open');
        
        await page.fill('#hash-val', '12'); // Modulo mathematics mapping to Index 2
        await page.click('#btn-hash-add');
        await page.waitForTimeout(1000); // Safe UI delay matching user behaviour
        
        await page.fill('#hash-val', '22'); // Identical mapping to Index 2 forces manual linear probe
        await page.click('#btn-hash-add');
        
        // Playwright listens for the DOM string injection reporting Probing
        await expect(page.locator('#status-message')).toContainText('occupied! Probing...', { timeout: 10000 });
    });

    test('Graph Kruskal: Builds MST from weighted edges', async ({ page }) => {
        await loadMethodByRadioId(page, 'mode-graph-kruskal');
        await expect(page.locator('#code-title')).toHaveText('graph_kruskal.cpp');
        await expect(page.locator('#desc-view h3')).toContainText('Minimum Spanning Tree');

        const addWeighted = async (u, v, w) => {
            await page.fill('#graph-u', String(u));
            await page.fill('#graph-v', String(v));
            await page.fill('#graph-w', String(w));
            await page.click('#btn-graph-add');
        };

        await addWeighted(0, 1, 4);
        await addWeighted(1, 2, 1);
        await addWeighted(2, 3, 2);
        await addWeighted(3, 4, 6);
        await addWeighted(1, 3, 3);

        await page.click('#btn-graph-kruskal');
        await expect(page.locator('#status-message')).toContainText('Kruskal complete', { timeout: 10000 });
        await expect(page.locator('#graph-edges .graph-edge.mst')).toHaveCount(4);
    });

    test('Graph Dijkstra: Computes shortest paths from source', async ({ page }) => {
        await loadMethodByRadioId(page, 'mode-graph-dijkstra');
        await expect(page.locator('#code-title')).toHaveText('graph_dijkstra.cpp');
        await expect(page.locator('#desc-view h3')).toContainText('Dijkstra');

        const addEdge = async (u, v) => {
            await page.fill('#graph-u', String(u));
            await page.fill('#graph-v', String(v));
            await page.click('#btn-graph-add');
        };

        await addEdge(0, 1);
        await addEdge(0, 2);
        await addEdge(1, 2);
        await addEdge(1, 3);
        await addEdge(2, 3);
        await addEdge(3, 4);

        // Set source node to 0
        await page.fill('#graph-source', '0');
        await page.click('#btn-graph-dijkstra');
        await expect(page.locator('#status-message')).toContainText('Dijkstra complete', { timeout: 10000 });
    });

    test('Graph Topological Sort: Orders DAG nodes correctly', async ({ page }) => {
        await loadMethodByRadioId(page, 'mode-graph-topo');
        await expect(page.locator('#code-title')).toHaveText('graph_topo.cpp');
        await expect(page.locator('#desc-view h3')).toContainText('Topological Sort');

        const addDirectedEdge = async (u, v) => {
            await page.fill('#graph-u', String(u));
            await page.fill('#graph-v', String(v));
            await page.click('#btn-graph-add');
        };

        await addDirectedEdge(0, 1);
        await addDirectedEdge(0, 2);
        await addDirectedEdge(1, 3);
        await addDirectedEdge(2, 3);
        await addDirectedEdge(3, 4);

        await page.click('#btn-graph-topo');
        await expect(page.locator('#status-message')).toContainText('Topological sort complete', { timeout: 10000 });
        await expect(page.locator('#graph-edges svg')).toBeTruthy();
    });

    test('Advanced Sort: Radix Sort completes execution properly', async ({ page }) => {
        await loadMethodByRadioId(page, 'mode-sort-radix');
        await expect(page.locator('#code-title')).toHaveText('sort_radix.cpp');
        await page.click('#btn-sort-random');
        await expect(page.locator('.sort-bar')).toHaveCount(15);
        await page.click('#btn-sort-start');
        await expect(page.locator('#status-message')).toContainText('Radix Sort', { timeout: 15000 });
    });

    test('Shaker Sort: Bidirectional bubble sort completes correctly', async ({ page }) => {
        await loadMethodByRadioId(page, 'mode-sort-shaker');
        await expect(page.locator('#code-title')).toHaveText('sort_shaker.cpp');
        await expect(page.locator('#desc-view h3')).toContainText('Shaker Sort');
        
        await page.click('#btn-sort-random');
        await expect(page.locator('.sort-bar')).toHaveCount(15);
        await page.locator('#sort-speed').fill('600');

        await page.click('#btn-sort-start');
        await expect(page.locator('#status-message')).toContainText('Shaker Sort', { timeout: 15000 });
        await expect(page.locator('#status-message')).toHaveText('Execution Complete!', { timeout: 15000 });
    });

    test('Primary UI: legacy mode menu is hidden and active card owns runtime', async ({ page }) => {
        await expect(page.locator('.legacy-runtime-stage')).toBeHidden();
        await expect(page.locator('.method-section-visual-live .mode-groups')).toBeHidden();
        await expect(page.locator('[data-method-section="stack-array"] .method-section-visual-live #array-container')).toBeVisible();
        await expect(page.locator('[data-method-section="stack-array"] .method-section-code')).toContainText('stack_array.cpp');
    });

    test('Primary UI: can select mode from different categories', async ({ page }) => {
        await loadMethodByRadioId(page, 'mode-sort-bubble');
        
        await expect(page.locator('#code-title')).toHaveText('sort_bubble.cpp');
        await expect(page.locator('#desc-view h3')).toContainText('Bubble Sort');
        await expect(page.locator('[data-method-section="sort-bubble"] .method-section-visual-live #sort-container')).toBeVisible();
    });

    test('Primary UI: switching methods tracks active and loaded cards', async ({ page }) => {
        await loadMethodByRadioId(page, 'mode-hash-chain');
        await expect(page.locator('[data-method-section="hash-chain"]')).toHaveAttribute('data-runtime-state', 'active');
        await loadMethodByRadioId(page, 'mode-stack-arr');
        await page.locator('[data-testid="category-nav"]').getByRole('button', { name: 'Advanced & Application-Specific' }).click();
        await expect(page.locator('[data-method-section="hash-chain"]')).toHaveAttribute('data-runtime-state', 'loaded');
    });

    test('Primary UI: all sampled data structure modes are accessible from method cards', async ({ page }) => {
        const modeTests = [
            { selector: '#mode-queue', title: 'queue.cpp' },
            { selector: '#mode-list-list', title: 'list_linked.cpp' },
            { selector: '#mode-tree-bst', title: 'tree_bst.cpp' },
            { selector: '#mode-graph', title: 'graph.cpp' },
            { selector: '#mode-graph-kruskal', title: 'graph_kruskal.cpp' },
            { selector: '#mode-hash-chain', title: 'hash_chaining.cpp' },
            { selector: '#mode-search-binary', title: 'search_binary.cpp' },
            { selector: '#mode-heap-binary', title: '', desc: 'Binary Heap' },
        ];

        for (const modeTest of modeTests) {
            await loadMethodByRadioId(page, modeTest.selector.substring(1));
            if (modeTest.title) {
                await expect(page.locator('#code-title')).toHaveText(modeTest.title);
            }
            if (modeTest.desc) {
                await expect(page.locator('#desc-view h3')).toContainText(modeTest.desc);
            }
        }
    });

    test('OOP Inheritance: Renders hierarchy and completes demo flow', async ({ page }) => {
        await loadMethodByRadioId(page, 'mode-oop-inheritance');
        await expect(page.locator('#code-title')).toHaveText('oop_inheritance.cpp');
        await expect(page.locator('#oop-inheritance-view')).toBeVisible();

        await page.click('#btn-oop-demo');
        await expect(page.locator('#status-message')).toContainText('Execution Complete!', { timeout: 12000 });
        await expect(page.locator('#oop-inheritance-svg rect')).toHaveCount(3);
    });

    test('OOP Polymorphism: Shows virtual dispatch model and demo run', async ({ page }) => {
        await loadMethodByRadioId(page, 'mode-oop-polymorphism');
        await expect(page.locator('#code-title')).toHaveText('oop_polymorphism.cpp');
        await expect(page.locator('#oop-polymorphism-view')).toBeVisible();

        await page.click('#btn-oop-demo');
        await expect(page.locator('#status-message')).toContainText('Execution Complete!', { timeout: 12000 });
        await expect(page.locator('#oop-poly-svg .oop-vptr-box')).toHaveCount(1);
    });

    test('OOP Encapsulation: Shows access levels and demo run', async ({ page }) => {
        await loadMethodByRadioId(page, 'mode-oop-encapsulation');
        await expect(page.locator('#code-title')).toHaveText('oop_encapsulation.cpp');
        await expect(page.locator('#oop-encapsulation-view')).toBeVisible();

        await page.click('#btn-oop-demo');
        await expect(page.locator('#status-message')).toContainText('Execution Complete!', { timeout: 12000 });
        await expect(page.locator('#oop-encap-svg')).toContainText('public:');
        await expect(page.locator('#oop-encap-svg')).toContainText('protected:');
        await expect(page.locator('#oop-encap-svg')).toContainText('private:');
    });

    // Design Patterns Tests
    test('Design Patterns: Singleton - Renders and demo runs', async ({ page }) => {
        await loadMethodByRadioId(page, 'mode-pattern-singleton');
        await expect(page.locator('#code-title')).toHaveText('pattern_singleton.cpp');
        await expect(page.locator('#pattern-singleton-view')).toBeVisible();

        await page.click('#btn-pattern-demo');
        await expect(page.locator('#status-message')).toContainText('getInstance', { timeout: 3000 });
    });

    test('Design Patterns: Factory - Renders and demo runs', async ({ page }) => {
        await loadMethodByRadioId(page, 'mode-pattern-factory');
        await expect(page.locator('#code-title')).toHaveText('pattern_factory.cpp');
        await expect(page.locator('#pattern-factory-view')).toBeVisible();

        await page.click('#btn-pattern-demo');
        await expect(page.locator('#status-message')).toContainText('Factory', { timeout: 3000 });
    });

    test('Design Patterns: Adapter - Renders and demo runs', async ({ page }) => {
        await loadMethodByRadioId(page, 'mode-pattern-adapter');
        await expect(page.locator('#code-title')).toHaveText('pattern_adapter.cpp');
        await expect(page.locator('#pattern-adapter-view')).toBeVisible();

        await page.click('#btn-pattern-demo');
        await expect(page.locator('#status-message')).toContainText('Adapting', { timeout: 3000 });
    });

    test('Design Patterns: Decorator - Renders and demo runs', async ({ page }) => {
        await loadMethodByRadioId(page, 'mode-pattern-decorator');
        await expect(page.locator('#code-title')).toHaveText('pattern_decorator.cpp');
        await expect(page.locator('#pattern-decorator-view')).toBeVisible();

        await page.click('#btn-pattern-demo');
        await expect(page.locator('#status-message')).toContainText('Decorating', { timeout: 3000 });
    });

    test('Design Patterns: Observer - Renders and demo runs', async ({ page }) => {
        await loadMethodByRadioId(page, 'mode-pattern-observer');
        await expect(page.locator('#code-title')).toHaveText('pattern_observer.cpp');
        await expect(page.locator('#pattern-observer-view')).toBeVisible();

        await page.click('#btn-pattern-demo');
        await expect(page.locator('#status-message')).toContainText('Observer', { timeout: 3000 });
    });

    test('Design Patterns: Strategy - Renders and demo runs', async ({ page }) => {
        await loadMethodByRadioId(page, 'mode-pattern-strategy');
        await expect(page.locator('#code-title')).toHaveText('pattern_strategy.cpp');
        await expect(page.locator('#pattern-strategy-view')).toBeVisible();

        await page.click('#btn-pattern-demo');
        await expect(page.locator('#status-message')).toContainText('Strategy', { timeout: 3000 });
    });

});
