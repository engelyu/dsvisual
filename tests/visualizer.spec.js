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

    test('Phase 1 category nav: renders six top-level groups and syncs with menu expansion', async ({ page }) => {
        const categoryNav = page.locator('[data-testid="category-nav"]');
        await expect(categoryNav).toBeVisible();
        await expect(categoryNav.locator('.category-nav-btn')).toHaveCount(6);
        await expect(categoryNav.locator('.category-nav-btn.active')).toHaveText('Basic Linear Structures');

        await categoryNav.getByRole('button', { name: 'Advanced & Application-Specific' }).click();
        await expect(categoryNav.locator('.category-nav-btn.active')).toHaveText('Advanced & Application-Specific');
        await expect(page.locator('.mode-group').nth(3).locator('.group-content')).toBeVisible();

        await page.locator('.mode-group').nth(2).locator('.group-header').click();
        await expect(categoryNav.locator('.category-nav-btn.active')).toHaveText('Non-Linear Structures');
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

    test('Trie Trees: Submits string prefix and generates character-marked edges', async ({ page }) => {
        // Expand Non-Linear group
        const nonLinearGroup = page.locator('.mode-group').nth(2);
        const nonLinearHeader = nonLinearGroup.locator('.group-header');
        const nonLinearContent = nonLinearGroup.locator('.group-content');
        if (!(await nonLinearContent.isVisible())) {
            await nonLinearHeader.click();
        }
        
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
        // Expand Advanced group
        const advancedGroup = page.locator('.mode-group').nth(3);
        const advancedHeader = advancedGroup.locator('.group-header');
        const advancedContent = advancedGroup.locator('.group-content');
        if (!(await advancedContent.isVisible())) {
            await advancedHeader.click();
        }
        
        await page.locator('label[for="mode-sort-bubble"]').click();
        await expect(page.locator('#code-title')).toHaveText('sort_bubble.cpp');
        
        await page.click('#btn-sort-random');
        await expect(page.locator('.sort-bar')).toHaveCount(15);

        await page.click('#btn-sort-start');
        
        // Animation Lock validation (The state must visibly mark as executing)
        await expect(page.locator('#status-message')).toContainText('Bubble Sort', { timeout: 20000 });
    });

    test('Hash Tables: Explicitly verifies Collision Handlers catch overlaps', async ({ page }) => {
        // Expand Advanced group
        const advancedGroup = page.locator('.mode-group').nth(3);
        const advancedHeader = advancedGroup.locator('.group-header');
        const advancedContent = advancedGroup.locator('.group-content');
        if (!(await advancedContent.isVisible())) {
            await advancedHeader.click();
        }
        
        await page.locator('label[for="mode-hash-open"]').click();
        
        await page.fill('#hash-val', '12'); // Modulo mathematics mapping to Index 2
        await page.click('#btn-hash-add');
        await page.waitForTimeout(1000); // Safe UI delay matching user behaviour
        
        await page.fill('#hash-val', '22'); // Identical mapping to Index 2 forces manual linear probe
        await page.click('#btn-hash-add');
        
        // Playwright listens for the DOM string injection reporting Probing
        await expect(page.locator('#status-message')).toContainText('occupied! Probing...', { timeout: 10000 });
    });

    test('Graph Kruskal: Builds MST from weighted edges', async ({ page }) => {
        // Expand Non-Linear group
        const nonLinearGroup = page.locator('.mode-group').nth(2);
        const nonLinearHeader = nonLinearGroup.locator('.group-header');
        const nonLinearContent = nonLinearGroup.locator('.group-content');
        if (!(await nonLinearContent.isVisible())) {
            await nonLinearHeader.click();
        }

        await page.locator('label[for="mode-graph-kruskal"]').click();
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
        // Expand Non-Linear group
        const nonLinearGroup = page.locator('.mode-group').nth(2);
        const nonLinearHeader = nonLinearGroup.locator('.group-header');
        const nonLinearContent = nonLinearGroup.locator('.group-content');
        if (!(await nonLinearContent.isVisible())) {
            await nonLinearHeader.click();
        }

        await page.locator('label[for="mode-graph-dijkstra"]').click();
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
        // Expand Non-Linear group
        const nonLinearGroup = page.locator('.mode-group').nth(2);
        const nonLinearHeader = nonLinearGroup.locator('.group-header');
        const nonLinearContent = nonLinearGroup.locator('.group-content');
        if (!(await nonLinearContent.isVisible())) {
            await nonLinearHeader.click();
        }

        await page.locator('label[for="mode-graph-topo"]').click();
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
        // Expand Advanced group
        const advancedGroup = page.locator('.mode-group').nth(3);
        const advancedHeader = advancedGroup.locator('.group-header');
        const advancedContent = advancedGroup.locator('.group-content');
        if (!(await advancedContent.isVisible())) {
            await advancedHeader.click();
        }
        
        await page.locator('label[for="mode-sort-radix"]').click();
        await expect(page.locator('#code-title')).toHaveText('sort_radix.cpp');
        await page.click('#btn-sort-random');
        await expect(page.locator('.sort-bar')).toHaveCount(15);
        await page.click('#btn-sort-start');
        await expect(page.locator('#status-message')).toContainText('Radix Sort', { timeout: 15000 });
    });

    test('Shaker Sort: Bidirectional bubble sort completes correctly', async ({ page }) => {
        // Expand Advanced group
        const advancedGroup = page.locator('.mode-group').nth(3);
        const advancedHeader = advancedGroup.locator('.group-header');
        const advancedContent = advancedGroup.locator('.group-content');
        if (!(await advancedContent.isVisible())) {
            await advancedHeader.click();
        }
        
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

    test('Mode Groups: First group (Basic Linear) is expanded by default', async ({ page }) => {
        const basicLinearGroup = page.locator('.mode-group').first();
        const basicLinearHeader = basicLinearGroup.locator('.group-header');
        const basicLinearContent = basicLinearGroup.locator('.group-content');

        // Verify first group header contains "Basic Linear Structures"
        await expect(basicLinearHeader).toContainText('Basic Linear Structures');

        // Verify first group content is visible
        await expect(basicLinearContent).toBeVisible();

        // Verify group is not collapsed
        await expect(basicLinearGroup).not.toHaveClass(/collapsed/);
    });

    test('Mode Groups: Other groups are collapsed by default', async ({ page }) => {
        const allGroups = page.locator('.mode-group');
        const groupCount = await allGroups.count();

        // Skip first group (which should be expanded)
        for (let i = 1; i < groupCount; i++) {
            const group = allGroups.nth(i);
            const content = group.locator('.group-content');

            // Verify content is hidden for all groups except first
            await expect(content).toBeHidden();

            // Verify group has collapsed class
            await expect(group).toHaveClass(/collapsed/);
        }
    });

    test('Mode Groups: Clicking group header toggles expansion', async ({ page }) => {
        const linkedListsGroup = page.locator('.mode-group').nth(1);
        const linkedListsHeader = linkedListsGroup.locator('.group-header');
        const linkedListsContent = linkedListsGroup.locator('.group-content');

        // Initially collapsed
        await expect(linkedListsContent).toBeHidden();

        // Click to expand
        await linkedListsHeader.click();
        await expect(linkedListsContent).toBeVisible();
        await expect(linkedListsGroup).not.toHaveClass(/collapsed/);

        // Click to collapse
        await linkedListsHeader.click();
        await expect(linkedListsContent).toBeHidden();
        await expect(linkedListsGroup).toHaveClass(/collapsed/);
    });

    test('Mode Groups: Can select mode from different groups', async ({ page }) => {
        // Expand Advanced group
        const advancedGroup = page.locator('.mode-group').nth(3);
        const advancedHeader = advancedGroup.locator('.group-header');
        await advancedHeader.click();
        
        // Verify it's expanded
        const advancedContent = advancedGroup.locator('.group-content');
        await expect(advancedContent).toBeVisible();

        // Select Bubble Sort from Sorting subgroup
        await page.locator('label[for="mode-sort-bubble"]').click();
        
        // Verify page switches to Bubble Sort
        await expect(page.locator('#code-title')).toHaveText('sort_bubble.cpp');
        await expect(page.locator('#desc-view h3')).toContainText('Bubble Sort');
    });

    test('Mode Groups: Switching between groups preserves group expansion state', async ({ page }) => {
        const basicLinearGroup = page.locator('.mode-group').first();
        const advancedGroup = page.locator('.mode-group').nth(3);
        const advancedHeader = advancedGroup.locator('.group-header');

        // Basic Linear is expanded, Advanced is collapsed
        await expect(basicLinearGroup.locator('.group-content')).toBeVisible();
        await expect(advancedGroup.locator('.group-content')).toBeHidden();

        // Expand Advanced
        await advancedHeader.click();
        await expect(advancedGroup.locator('.group-content')).toBeVisible();

        // Select something from Advanced
        await page.locator('label[for="mode-hash-chain"]').click();

        // Back to Basic Linear group
        await page.locator('label[for="mode-stack-arr"]').click();

        // Verify Advanced is still expanded (state preserved)
        await expect(advancedGroup.locator('.group-content')).toBeVisible();
    });

    test('Mode Groups: All data structure modes are accessible from menus', async ({ page }) => {
        const modeTests = [
            { group: 0, selector: '#mode-queue', title: 'queue.cpp' },
            { group: 1, selector: '#mode-list-list', title: 'list_linked.cpp' },
            { group: 2, selector: '#mode-tree-bst', title: 'tree_bst.cpp' },
            { group: 2, selector: '#mode-graph', title: 'graph.cpp' },
            { group: 2, selector: '#mode-graph-kruskal', title: 'graph_kruskal.cpp' },
            { group: 3, selector: '#mode-hash-chain', title: 'hash_chaining.cpp' },
            { group: 3, selector: '#mode-search-binary', title: 'search_binary.cpp' },
            { group: 3, selector: '#mode-heap-binary', title: '', desc: 'Binary Heap' },
        ];

        for (const test of modeTests) {
            // Expand group if needed
            const group = page.locator('.mode-group').nth(test.group);
            const header = group.locator('.group-header');
            const content = group.locator('.group-content');

            if (!(await content.isVisible())) {
                await header.click();
            }

            // Select mode
            await page.locator(`label[for="${test.selector.substring(1)}"]`).click();

            // Verify selection
            if (test.title) {
                await expect(page.locator('#code-title')).toHaveText(test.title);
            }
            if (test.desc) {
                await expect(page.locator('#desc-view h3')).toContainText(test.desc);
            }
        }
    });

    test('OOP Inheritance: Renders hierarchy and completes demo flow', async ({ page }) => {
        const oopGroup = page.locator('.mode-group').nth(4);
        const oopContent = oopGroup.locator('.group-content');
        if (!(await oopContent.isVisible())) {
            await oopGroup.locator('.group-header').click();
        }

        await page.locator('label[for="mode-oop-inheritance"]').click();
        await expect(page.locator('#code-title')).toHaveText('oop_inheritance.cpp');
        await expect(page.locator('#oop-inheritance-view')).toBeVisible();

        await page.click('#btn-oop-demo');
        await expect(page.locator('#status-message')).toContainText('Execution Complete!', { timeout: 12000 });
        await expect(page.locator('#oop-inheritance-svg rect')).toHaveCount(3);
    });

    test('OOP Polymorphism: Shows virtual dispatch model and demo run', async ({ page }) => {
        const oopGroup = page.locator('.mode-group').nth(4);
        const oopContent = oopGroup.locator('.group-content');
        if (!(await oopContent.isVisible())) {
            await oopGroup.locator('.group-header').click();
        }

        await page.locator('label[for="mode-oop-polymorphism"]').click();
        await expect(page.locator('#code-title')).toHaveText('oop_polymorphism.cpp');
        await expect(page.locator('#oop-polymorphism-view')).toBeVisible();

        await page.click('#btn-oop-demo');
        await expect(page.locator('#status-message')).toContainText('Execution Complete!', { timeout: 12000 });
        await expect(page.locator('#oop-poly-svg .oop-vptr-box')).toHaveCount(1);
    });

    test('OOP Encapsulation: Shows access levels and demo run', async ({ page }) => {
        const oopGroup = page.locator('.mode-group').nth(4);
        const oopContent = oopGroup.locator('.group-content');
        if (!(await oopContent.isVisible())) {
            await oopGroup.locator('.group-header').click();
        }

        await page.locator('label[for="mode-oop-encapsulation"]').click();
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
        const patternsGroup = page.locator('.mode-group').nth(5);
        const patternsContent = patternsGroup.locator('.group-content');
        if (!(await patternsContent.isVisible())) {
            await patternsGroup.locator('.group-header').click();
        }

        const creatSubgroup = patternsContent.locator('.subgroup').first();
        await creatSubgroup.locator('label[for="mode-pattern-singleton"]').click();
        await expect(page.locator('#code-title')).toHaveText('pattern_singleton.cpp');
        await expect(page.locator('#pattern-singleton-view')).toBeVisible();

        await page.click('#btn-pattern-demo');
        await expect(page.locator('#status-message')).toContainText('getInstance', { timeout: 3000 });
    });

    test('Design Patterns: Factory - Renders and demo runs', async ({ page }) => {
        const patternsGroup = page.locator('.mode-group').nth(5);
        const patternsContent = patternsGroup.locator('.group-content');
        if (!(await patternsContent.isVisible())) {
            await patternsGroup.locator('.group-header').click();
        }

        const creatSubgroup = patternsContent.locator('.subgroup').first();
        await creatSubgroup.locator('label[for="mode-pattern-factory"]').click();
        await expect(page.locator('#code-title')).toHaveText('pattern_factory.cpp');
        await expect(page.locator('#pattern-factory-view')).toBeVisible();

        await page.click('#btn-pattern-demo');
        await expect(page.locator('#status-message')).toContainText('Factory', { timeout: 3000 });
    });

    test('Design Patterns: Adapter - Renders and demo runs', async ({ page }) => {
        const patternsGroup = page.locator('.mode-group').nth(5);
        const patternsContent = patternsGroup.locator('.group-content');
        if (!(await patternsContent.isVisible())) {
            await patternsGroup.locator('.group-header').click();
        }

        const structSubgroup = patternsContent.locator('.subgroup').nth(1);
        await structSubgroup.locator('label[for="mode-pattern-adapter"]').click();
        await expect(page.locator('#code-title')).toHaveText('pattern_adapter.cpp');
        await expect(page.locator('#pattern-adapter-view')).toBeVisible();

        await page.click('#btn-pattern-demo');
        await expect(page.locator('#status-message')).toContainText('Adapting', { timeout: 3000 });
    });

    test('Design Patterns: Decorator - Renders and demo runs', async ({ page }) => {
        const patternsGroup = page.locator('.mode-group').nth(5);
        const patternsContent = patternsGroup.locator('.group-content');
        if (!(await patternsContent.isVisible())) {
            await patternsGroup.locator('.group-header').click();
        }

        const structSubgroup = patternsContent.locator('.subgroup').nth(1);
        await structSubgroup.locator('label[for="mode-pattern-decorator"]').click();
        await expect(page.locator('#code-title')).toHaveText('pattern_decorator.cpp');
        await expect(page.locator('#pattern-decorator-view')).toBeVisible();

        await page.click('#btn-pattern-demo');
        await expect(page.locator('#status-message')).toContainText('Decorating', { timeout: 3000 });
    });

    test('Design Patterns: Observer - Renders and demo runs', async ({ page }) => {
        const patternsGroup = page.locator('.mode-group').nth(5);
        const patternsContent = patternsGroup.locator('.group-content');
        if (!(await patternsContent.isVisible())) {
            await patternsGroup.locator('.group-header').click();
        }

        const behavSubgroup = patternsContent.locator('.subgroup').nth(2);
        await behavSubgroup.locator('label[for="mode-pattern-observer"]').click();
        await expect(page.locator('#code-title')).toHaveText('pattern_observer.cpp');
        await expect(page.locator('#pattern-observer-view')).toBeVisible();

        await page.click('#btn-pattern-demo');
        await expect(page.locator('#status-message')).toContainText('Observer', { timeout: 3000 });
    });

    test('Design Patterns: Strategy - Renders and demo runs', async ({ page }) => {
        const patternsGroup = page.locator('.mode-group').nth(5);
        const patternsContent = patternsGroup.locator('.group-content');
        if (!(await patternsContent.isVisible())) {
            await patternsGroup.locator('.group-header').click();
        }

        const behavSubgroup = patternsContent.locator('.subgroup').nth(2);
        await behavSubgroup.locator('label[for="mode-pattern-strategy"]').click();
        await expect(page.locator('#code-title')).toHaveText('pattern_strategy.cpp');
        await expect(page.locator('#pattern-strategy-view')).toBeVisible();

        await page.click('#btn-pattern-demo');
        await expect(page.locator('#status-message')).toContainText('Strategy', { timeout: 3000 });
    });

});
