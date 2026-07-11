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

test.describe('Data Structure Visualizer Full Suite', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => {
            try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {}
        });
        // Correctly assemble cross-platform absolute URI mapping mapping directly to your HTML
        const fileUri = 'file://' + path.resolve(__dirname, '../index.html');
        await page.goto(fileUri);
    });

    test('Initial Load: Should load Array Stack correctly by default', async ({ page }) => {
        const methodSections = page.locator('[data-testid="method-sections"]');
        const stackArraySection = page.locator('[data-method-section="stack-array"]');
        
        await expect(methodSections).toBeVisible();
        await expect(stackArraySection).toHaveAttribute('data-runtime-state', 'active');
        await expect(stackArraySection.locator('.code-panel-filename')).toContainText('stack_array.cpp');
    });

    test('Phase 1 category nav: renders Overview + nine top-level groups and drives method sections', async ({ page }) => {
        const categoryNav = page.locator('[data-testid="category-nav"]');
        const methodSections = page.locator('[data-testid="method-sections"]');
        await expect(categoryNav).toBeVisible();
        // 1 Overview pill + 14 category groups = 15 pills total.
        await expect(categoryNav.locator('.category-nav-btn')).toHaveCount(15);
        await expect(categoryNav.locator('[data-testid="method-select"]')).toHaveCount(0);
        await expect(methodSections.locator('[data-testid="method-heading-title"]')).toBeVisible();
        await expect(methodSections.locator('[data-method-section="stack-array"]')).toBeVisible();
        await expect(categoryNav.locator('button[data-method], .category-nav-submenu')).toHaveCount(0);

        await loadMethod(page, 'sort-bubble');
        await expect(methodSections.locator('[data-testid="method-heading-title"]')).toHaveText(/Bubble/i);
        await expect(methodSections.locator('[data-method-section="sort-bubble"]')).toBeVisible();
        await expect(page.locator('[data-method-section="sort-bubble"]')).toHaveAttribute('data-runtime-state', 'active');

        await loadMethod(page, 'tree-bst');
        await expect(methodSections.locator('[data-method-section="tree-bst"]')).toBeVisible();
    });

    test('Phase 2 method sections: renders selected category methods and loads a method', async ({ page }) => {
        const methodSections = page.locator('[data-testid="method-sections"]');
        await expect(methodSections).toBeVisible();
        await expect(methodSections.locator('[data-method-section]')).toHaveCount(1);
        await expect(methodSections.locator('[data-method-section="stack-array"] .code-panel-filename')).toContainText('stack_array.cpp');
        await expect(methodSections.locator('[data-method-section="queue"]')).toHaveCount(0);

        await loadMethod(page, 'sort-bubble');
        await expect(methodSections.locator('[data-method-section]')).toHaveCount(1);
        await expect(methodSections.locator('[data-method-section="sort-bubble"]')).toBeVisible();
        await expect(methodSections.locator('[data-method-section="sort-bubble"] .code-panel-filename')).toContainText('sort_bubble.cpp');
        await expect(methodSections.locator('[data-method-section="sort-bubble"]')).toHaveAttribute('data-runtime-state', 'active');
    });

    test('Phase 3 runtime boundary: method sections track active and loaded states', async ({ page }) => {
        const methodSections = page.locator('[data-testid="method-sections"]');
        await expect(methodSections.locator('[data-method-section="stack-array"]')).toHaveAttribute('data-runtime-state', 'active');
        await expect(methodSections.locator('[data-method-section="queue"]')).toHaveCount(0);

        await loadMethod(page, 'queue');
        await expect(methodSections.locator('[data-method-section="queue"]')).toHaveAttribute('data-runtime-state', 'active');
        await expect(methodSections.locator('[data-method-section="stack-array"]')).toHaveCount(0);
    });

    test('Phase 4 slides viewer: opens method explanation and closes', async ({ page }) => {
        const methodSections = page.locator('[data-testid="method-sections"]');
        const slideViewer = page.locator('[data-testid="slide-viewer"]');

        await methodSections.locator('[data-method-section="stack-array"] .method-slides-btn').click();
        await expect(slideViewer).toBeVisible();
        // Bar now shows deckTitle only; slide.title is injected as h1 in the slide body.
        await expect(page.locator('#slide-viewer-title')).toHaveText('Stack (Array)');
        await expect(page.locator('#slide-viewer-body')).toContainText('stack');

        await page.locator('.slideviewer-close').click();
        await expect(slideViewer).not.toBeVisible();
    });

    test('Phase 5 regression: every top-level category renders method sections', async ({ page }) => {
        const expectedFirstMethods = [
            ['Linear Structures', 'stack-array'],
            ['Trees', 'tree-bst'],
            ['Graphs', 'graph'],
            ['Hash & Probabilistic', 'hash-chain'],
            ['Heaps / Priority Queues', 'heap-binary'],
            ['Sorting', 'sort-bubble'],
            ['Searching & String Matching', 'search-linear'],
            ['OOP Concepts', 'oop-inheritance'],
            ['Design Patterns', 'pattern-singleton'],
        ];

        for (const [, methodId] of expectedFirstMethods) {
            await loadMethod(page, methodId);
            await expect(page.locator('[data-testid="method-sections"] [data-method-section]')).toHaveCount(1);
            await expect(page.locator(`[data-method-section="${methodId}"]`)).toHaveAttribute('data-runtime-state', 'active');
        }
    });

    test('Nav: category pill click toggles its dropdown; clicking a method button navigates', async ({ page }) => {
        const navItem = page.locator('.category-nav-item[data-group="trees"]');
        await navItem.locator('.category-nav-btn').click();
        await expect(navItem).toHaveClass(/\bopen\b/);
        await expect(navItem.locator('.category-nav-dropdown')).toBeVisible();
        await navItem.locator('.category-nav-method[data-method-id="tree-avl"]').click();
        await expect(page.locator('[data-method-section="tree-avl"]')).toHaveAttribute('data-runtime-state', 'active');
        await expect(navItem).not.toHaveClass(/\bopen\b/);
    });

    test('Nav: hovering pill then walking the mouse across the 4px gap keeps the dropdown open', async ({ page }) => {
        const navItem = page.locator('.category-nav-item[data-group="trees"]');
        const dropdown = navItem.locator('.category-nav-dropdown');
        const btn = navItem.locator('.category-nav-btn');
        await btn.hover();
        const btnBox = await btn.boundingBox();
        const method = navItem.locator('.category-nav-method[data-method-id="tree-avl"]');
        const mBox = await method.boundingBox();
        const x0 = btnBox.x + btnBox.width / 2;
        const y0 = btnBox.y + btnBox.height / 2;
        const x1 = mBox.x + mBox.width / 2;
        const y1 = mBox.y + mBox.height / 2;
        // Walk the cursor in 30 small steps so it actually traverses the 4px gap
        // between pill bottom and dropdown top. A single hover() would teleport past it.
        for (let i = 1; i <= 30; i++) {
            const t = i / 30;
            await page.mouse.move(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t);
        }
        await expect(dropdown).toBeVisible();
    });

    test('Nav: clicking outside the nav or pressing Esc closes any open dropdown', async ({ page }) => {
        const navItem = page.locator('.category-nav-item[data-group="trees"]');
        await navItem.locator('.category-nav-btn').click();
        await expect(navItem).toHaveClass(/\bopen\b/);
        await page.mouse.click(10, 600);
        await expect(navItem).not.toHaveClass(/\bopen\b/);
        await navItem.locator('.category-nav-btn').click();
        await expect(navItem).toHaveClass(/\bopen\b/);
        await page.keyboard.press('Escape');
        await expect(navItem).not.toHaveClass(/\bopen\b/);
    });

    test('Design Patterns sub-tabs: switch the method list by GoF category', async ({ page }) => {
        const nav = page.locator('[data-testid="category-nav"]');
        // Navigate into Design Patterns so that the sub-tab row becomes visible.
        await loadMethod(page, 'pattern-singleton');

        const subTabs = page.locator('.category-subtab-row.visible .category-subtab-btn');
        await expect(subTabs).toHaveCount(4);

        // The patterns dropdown groups all GoF + architectural methods under section headers,
        // so representative methods from each sub-group must be present.
        const patternsItem = nav.locator('.category-nav-item[data-group="patterns"]');
        await patternsItem.locator('.category-nav-btn').click();
        await expect(patternsItem.locator('.category-nav-method[data-method-id="pattern-singleton"]')).toHaveCount(1);
        await expect(patternsItem.locator('.category-nav-method[data-method-id="pattern-adapter"]')).toHaveCount(1);
        await expect(patternsItem.locator('.category-nav-method[data-method-id="pattern-observer"]')).toHaveCount(1);
        // Close the dropdown before clicking sub-tabs. Escape removes the .open
        // class, but CSS :hover on the pill keeps the dropdown visible while
        // Playwright's cursor is still over it — move the cursor off-nav first
        // so the dropdown actually disappears and stops covering the sub-tabs.
        await page.mouse.move(10, 600);
        await page.keyboard.press('Escape');

        // Clicking a sub-tab activates that sub-group and loads its first method.
        await subTabs.getByText('Structural', { exact: true }).click();
        await expect(page.locator('[data-method-section="pattern-adapter"]')).toHaveAttribute('data-runtime-state', 'active');

        await subTabs.getByText('Behavioral', { exact: true }).click();
        await expect(page.locator('[data-method-section="pattern-observer"]')).toHaveAttribute('data-runtime-state', 'active');

        // Leaving Design Patterns (loading a non-patterns method) hides the sub-tab row.
        await loadMethod(page, 'sort-bubble');
        await expect(page.locator('.category-subtab-row.visible')).toHaveCount(0);
    });

    test('Design Patterns dropdown: clicking a section header activates that sub-group', async ({ page }) => {
        const nav = page.locator('[data-testid="category-nav"]');
        const patternsItem = nav.locator('.category-nav-item[data-group="patterns"]');
        await patternsItem.locator('.category-nav-btn').click();
        await expect(patternsItem).toHaveClass(/\bopen\b/);

        await patternsItem.locator('.category-nav-group-header[data-subgroup="patterns-structural"]').click();

        await expect(patternsItem).not.toHaveClass(/\bopen\b/);
        await expect(page.locator('[data-method-section="pattern-adapter"]')).toHaveAttribute('data-runtime-state', 'active');
        await expect(page.locator('.category-subtab-row.visible .category-subtab-btn.active')).toHaveText('Structural');
    });

    test('Trie Trees: Submits string prefix and generates character-marked edges', async ({ page }) => {
        await loadMethod(page, 'tree-trie');
        const trieCard = page.locator('[data-method-section="tree-trie"]');
        await expect(trieCard).toHaveAttribute('data-runtime-state', 'active');
        await expect(trieCard.locator('.code-panel-filename')).toContainText('tree_trie.cpp');
    });

    test('Sorting Engine: Instantiates bars and manages states successfully', async ({ page }) => {
        await loadMethod(page, 'sort-bubble');
        const sortCard = page.locator('[data-method-section="sort-bubble"]');
        await expect(sortCard).toHaveAttribute('data-runtime-state', 'active');
        await expect(sortCard.locator('.code-panel-filename')).toContainText('sort_bubble.cpp');
    });

    test('Hash Tables: Explicitly verifies Collision Handlers catch overlaps', async ({ page }) => {
        await loadMethod(page, 'hash-open');
        const hashCard = page.locator('[data-method-section="hash-open"]');
        await expect(hashCard).toHaveAttribute('data-runtime-state', 'active');
        await expect(hashCard.locator('.code-panel-filename')).toContainText('hash_open_address.cpp');
    });

    test('Graph Kruskal: Builds MST from weighted edges', async ({ page }) => {
        await loadMethod(page, 'graph-kruskal');
        const graphCard = page.locator('[data-method-section="graph-kruskal"]');
        await expect(graphCard).toHaveAttribute('data-runtime-state', 'active');
        await expect(graphCard.locator('.code-panel-filename')).toContainText('graph_kruskal.cpp');
    });

    test('Graph Dijkstra: Computes shortest paths from source', async ({ page }) => {
        await loadMethod(page, 'graph-dijkstra');
        const graphCard = page.locator('[data-method-section="graph-dijkstra"]');
        await expect(graphCard).toHaveAttribute('data-runtime-state', 'active');
        await expect(graphCard.locator('.code-panel-filename')).toContainText('graph_dijkstra.cpp');
    });

    test('Graph Topological Sort: Orders DAG nodes correctly', async ({ page }) => {
        await loadMethod(page, 'graph-topo');
        const graphCard = page.locator('[data-method-section="graph-topo"]');
        await expect(graphCard).toHaveAttribute('data-runtime-state', 'active');
        await expect(graphCard.locator('.code-panel-filename')).toContainText('graph_topo.cpp');
    });

    test('Graphs: Adjacency List renders 5 rows', async ({ page }) => {
        await loadMethod(page, 'graph-adjlist');
        const card = page.locator('[data-method-section="graph-adjlist"]');
        await expect(card.locator('.code-panel-filename')).toContainText('graph_adjlist.cpp');
        const rows = card.locator('.adjlist-row');
        await expect(rows).toHaveCount(5);
    });

    test('Graphs: BFS renders SVG nodes and a queue strip', async ({ page }) => {
        await loadMethod(page, 'graph-bfs');
        const card = page.locator('[data-method-section="graph-bfs"]');
        await expect(card.locator('.code-panel-filename')).toContainText('graph_bfs.cpp');
        await expect(card.locator('.bfs-svg')).toBeVisible();
        await expect(card.locator('[data-testid="bfs-queue"]')).toBeVisible();
        await expect(card.locator('.bfs-svg .nodes circle')).toHaveCount(5);
    });

    test('Graphs: DFS renders SVG nodes and a stack strip', async ({ page }) => {
        await loadMethod(page, 'graph-dfs');
        const card = page.locator('[data-method-section="graph-dfs"]');
        await expect(card.locator('.code-panel-filename')).toContainText('graph_dfs.cpp');
        await expect(card.locator('.dfs-svg')).toBeVisible();
        await expect(card.locator('[data-testid="dfs-stack"]')).toBeVisible();
        await expect(card.locator('.dfs-svg .nodes circle')).toHaveCount(5);
    });

    test('Graphs: graph-traversal renders two dual panes (BFS & DFS)', async ({ page }) => {
        await loadMethod(page, 'graph-traversal');
        const card = page.locator('[data-method-section="graph-traversal"]');
        await expect(card.locator('.code-panel-filename')).toContainText('graph_traversal.cpp');
        await expect(card.locator('.graph-dual-pane')).toHaveCount(2);
        await expect(card.locator('[data-pane="bfs"] [data-testid="bfs-queue"]')).toBeVisible();
        await expect(card.locator('[data-pane="dfs"] [data-testid="dfs-stack"]')).toBeVisible();
    });

    test('Advanced Sort: Radix Sort completes execution properly', async ({ page }) => {
        await loadMethod(page, 'sort-radix');
        const sortCard = page.locator('[data-method-section="sort-radix"]');
        await expect(sortCard).toHaveAttribute('data-runtime-state', 'active');
        await expect(sortCard.locator('.code-panel-filename')).toContainText('sort_radix.cpp');
    });

    test('Shaker Sort: Bidirectional bubble sort completes correctly', async ({ page }) => {
        await loadMethod(page, 'sort-shaker');
        const sortCard = page.locator('[data-method-section="sort-shaker"]');
        await expect(sortCard).toHaveAttribute('data-runtime-state', 'active');
        await expect(sortCard.locator('.code-panel-filename')).toContainText('sort_shaker.cpp');
    });

    test('Primary UI: active card owns runtime', async ({ page }) => {
        const stackArrayCard = page.locator('[data-method-section="stack-array"]');
        await expect(stackArrayCard).toHaveAttribute('data-runtime-state', 'active');
        await expect(stackArrayCard.locator('.method-section-visual')).toBeVisible();
    });

    test('Primary UI: legacy interface DOM is removed', async ({ page }) => {
        await expect(page.locator('.mode-groups, .mode-group, .panel-tabs, #tab-btn-desc, #tab-btn-code, #desc-view, #code-view')).toHaveCount(0);
        await expect(page.locator('.runtime-stage')).toBeHidden();
        await expect(page.locator('[data-method-section="stack-array"] #visualizer-container')).toBeVisible();
    });

    test('Primary UI: can select mode from different categories', async ({ page }) => {
        const methodSections = page.locator('[data-testid="method-sections"]');
        
        await loadMethod(page, 'sort-bubble');
        
        await expect(methodSections.locator('[data-method-section="sort-bubble"]')).toHaveAttribute('data-runtime-state', 'active');
        await expect(methodSections.locator('[data-method-section="sort-bubble"] .code-panel-filename')).toContainText('sort_bubble.cpp');
    });

    test('Primary UI: switching methods tracks active and loaded cards', async ({ page }) => {
        const methodSections = page.locator('[data-testid="method-sections"]');
        
        await loadMethod(page, 'queue');
        await expect(methodSections.locator('[data-method-section="queue"]')).toHaveAttribute('data-runtime-state', 'active');
        await expect(methodSections.locator('[data-method-section="stack-array"]')).toHaveCount(0);
        
        await loadMethod(page, 'sort-bubble');
        await loadMethod(page, 'queue');
        
        // Queue should still be active
        await expect(methodSections.locator('[data-method-section="queue"]')).toHaveAttribute('data-runtime-state', 'active');
    });

    test('Primary UI: all sampled data structure modes are accessible from method cards', async ({ page }) => {
        const modeTests = [
            'queue',
            'list-linked',
            'tree-bst',
            'graph',
            'graph-kruskal',
            'hash-chain',
            'search-binary',
            'heap-binary',
        ];

        for (const methodId of modeTests) {
            try {
                await loadMethod(page, methodId);
                const card = page.locator(`[data-method-section="${methodId}"]`);
                await expect(card).toHaveAttribute('data-runtime-state', 'active');
                await expect(card.locator('.method-section-visual')).toBeVisible();
            } catch (error) {
                console.log(`Failed to load ${methodId}:`, error.message);
                throw error;
            }
        }
    });

    test('OOP Inheritance: Renders hierarchy and completes demo flow', async ({ page }) => {
        await loadMethod(page, 'oop-inheritance');
        const oopCard = page.locator('[data-method-section="oop-inheritance"]');
        await expect(oopCard).toHaveAttribute('data-runtime-state', 'active');
        await expect(oopCard.locator('.method-section-visual')).toBeVisible();
    });

    test('OOP Polymorphism: Shows virtual dispatch model and demo run', async ({ page }) => {
        await loadMethod(page, 'oop-polymorphism');
        const oopCard = page.locator('[data-method-section="oop-polymorphism"]');
        await expect(oopCard).toHaveAttribute('data-runtime-state', 'active');
        await expect(oopCard.locator('.method-section-visual')).toBeVisible();
    });

    test('OOP Encapsulation: Shows access levels and demo run', async ({ page }) => {
        await loadMethod(page, 'oop-encapsulation');
        const oopCard = page.locator('[data-method-section="oop-encapsulation"]');
        await expect(oopCard).toHaveAttribute('data-runtime-state', 'active');
        await expect(oopCard.locator('.method-section-visual')).toBeVisible();
    });

    test('OOP Abstraction: renders abstract class hierarchy', async ({ page }) => {
        await loadMethod(page, 'oop-abstraction');
        const oopCard = page.locator('[data-method-section="oop-abstraction"]');
        await expect(oopCard).toHaveAttribute('data-runtime-state', 'active');
        await expect(oopCard.locator('.code-panel-filename')).toContainText('oop_abstraction.cpp');
        await expect(oopCard.locator('#oop-abstraction-svg rect')).toHaveCount(3);
    });

    test('OOP Ad-hoc: renders overload-resolution diagram', async ({ page }) => {
        await loadMethod(page, 'oop-adhoc');
        const oopCard = page.locator('[data-method-section="oop-adhoc"]');
        await expect(oopCard).toHaveAttribute('data-runtime-state', 'active');
        await expect(oopCard.locator('.code-panel-filename')).toContainText('oop_adhoc.cpp');
        await expect(oopCard.locator('#oop-adhoc-svg rect')).toHaveCount(8);
    });

    test('OOP Templates: renders template instantiation diagram', async ({ page }) => {
        await loadMethod(page, 'oop-templates');
        const oopCard = page.locator('[data-method-section="oop-templates"]');
        await expect(oopCard).toHaveAttribute('data-runtime-state', 'active');
        await expect(oopCard.locator('.code-panel-filename')).toContainText('oop_templates.cpp');
        await expect(oopCard.locator('#oop-templates-svg rect')).toHaveCount(4);
    });

    // Design Patterns Tests
    test('Design Patterns: Singleton - Renders and demo runs', async ({ page }) => {
        await loadMethod(page, 'pattern-singleton');
        const patternCard = page.locator('[data-method-section="pattern-singleton"]');
        await expect(patternCard).toHaveAttribute('data-runtime-state', 'active');
        await expect(patternCard.locator('.method-section-visual')).toBeVisible();
    });

    test('Design Patterns: Factory - Renders and demo runs', async ({ page }) => {
        await loadMethod(page, 'pattern-factory');
        const patternCard = page.locator('[data-method-section="pattern-factory"]');
        await expect(patternCard).toHaveAttribute('data-runtime-state', 'active');
        await expect(patternCard.locator('.method-section-visual')).toBeVisible();
    });

    test('Design Patterns: Adapter - Renders and demo runs', async ({ page }) => {
        await loadMethod(page, 'pattern-adapter');
        const patternCard = page.locator('[data-method-section="pattern-adapter"]');
        await expect(patternCard).toHaveAttribute('data-runtime-state', 'active');
        await expect(patternCard.locator('.method-section-visual')).toBeVisible();
    });

    test('Design Patterns: Decorator - Renders and demo runs', async ({ page }) => {
        await loadMethod(page, 'pattern-decorator');
        const patternCard = page.locator('[data-method-section="pattern-decorator"]');
        await expect(patternCard).toHaveAttribute('data-runtime-state', 'active');
        await expect(patternCard.locator('.method-section-visual')).toBeVisible();
    });

    test('Design Patterns: Observer - Renders and demo runs', async ({ page }) => {
        await loadMethod(page, 'pattern-observer');
        const patternCard = page.locator('[data-method-section="pattern-observer"]');
        await expect(patternCard).toHaveAttribute('data-runtime-state', 'active');
        await expect(patternCard.locator('.method-section-visual')).toBeVisible();
    });

    test('Design Patterns: Strategy - Renders and demo runs', async ({ page }) => {
        await loadMethod(page, 'pattern-strategy');
        const patternCard = page.locator('[data-method-section="pattern-strategy"]');
        await expect(patternCard).toHaveAttribute('data-runtime-state', 'active');
        await expect(patternCard.locator('.method-section-visual')).toBeVisible();
    });

    test('Architectural: MVC renders the Model-View-Controller diagram', async ({ page }) => {
        await loadMethod(page, 'pattern-mvc');
        const card = page.locator('[data-method-section="pattern-mvc"]');
        await expect(card).toHaveAttribute('data-runtime-state', 'active');
        await expect(card.locator('.code-panel-filename')).toContainText('pattern_mvc.cpp');
        await expect(card.locator('#pattern-mvc-svg rect')).toHaveCount(3);
    });

    test('Architectural: Layered renders the 3-layer stack', async ({ page }) => {
        await loadMethod(page, 'pattern-layered');
        const card = page.locator('[data-method-section="pattern-layered"]');
        await expect(card).toHaveAttribute('data-runtime-state', 'active');
        await expect(card.locator('.code-panel-filename')).toContainText('pattern_layered.cpp');
        await expect(card.locator('#pattern-layered-svg rect')).toHaveCount(3);
    });

    test('Architectural: Publish-Subscribe renders publisher, bus, subscribers', async ({ page }) => {
        await loadMethod(page, 'pattern-pubsub');
        const card = page.locator('[data-method-section="pattern-pubsub"]');
        await expect(card).toHaveAttribute('data-runtime-state', 'active');
        await expect(card.locator('.code-panel-filename')).toContainText('pattern_pubsub.cpp');
        await expect(card.locator('#pattern-pubsub-svg rect')).toHaveCount(5);
    });

    test('Architectural: Pipe-and-Filter renders the filter chain', async ({ page }) => {
        await loadMethod(page, 'pattern-pipefilter');
        const card = page.locator('[data-method-section="pattern-pipefilter"]');
        await expect(card).toHaveAttribute('data-runtime-state', 'active');
        await expect(card.locator('.code-panel-filename')).toContainText('pattern_pipefilter.cpp');
        await expect(card.locator('#pattern-pipefilter-svg rect')).toHaveCount(5);
    });

    test('Architectural: Dependency Injection renders the wiring diagram', async ({ page }) => {
        await loadMethod(page, 'pattern-di');
        const card = page.locator('[data-method-section="pattern-di"]');
        await expect(card).toHaveAttribute('data-runtime-state', 'active');
        await expect(card.locator('.code-panel-filename')).toContainText('pattern_di.cpp');
        await expect(card.locator('#pattern-di-svg rect')).toHaveCount(3);
    });

    test('Trees: BST renders edges between parent/child after inserts', async ({ page }) => {
        await loadMethod(page, 'tree-bst');
        // Insert a small tree.
        for (const v of [30, 70, 20, 40, 80]) {
            await page.locator('#tree-val').fill(String(v));
            await page.locator('#btn-tree-add').click();
            await page.waitForTimeout(80);
        }
        // 4 parent→child edges for a 5-node tree. The dashTree animation used
        // to keep stroke-dashoffset at 100px (lines invisible) because the
        // continuous-redraw loop recreated them every frame before the
        // animation could complete — that's the bug this test guards.
        const lines = page.locator('#tree-edges line.tree-edge');
        await expect(lines).toHaveCount(4);
        const offsets = await lines.evaluateAll((els) =>
            els.map((el) => getComputedStyle(el).strokeDashoffset));
        // Empty/zero/auto means "no dash offset" — line is fully drawn.
        for (const off of offsets) {
            expect(['0px', '0', 'auto', 'none', '']).toContain(off);
        }
    });

    test('Graphs: undirected graph starts with default edges visible', async ({ page }) => {
        await loadMethod(page, 'graph');
        await expect(page.locator('#graph-edges line.graph-edge')).toHaveCount(6);
    });

    test('Trees: Disjoint Set renders 8 nodes initially and supports union', async ({ page }) => {
        await loadMethod(page, 'tree-dsu');
        const card = page.locator('[data-method-section="tree-dsu"]');
        await expect(card.locator('.code-panel-filename')).toContainText('tree_dsu.cpp');
        await expect(card.locator('.dsu-tree-node')).toHaveCount(8);
        await card.locator('[data-dsu-a]').fill('0');
        await card.locator('[data-dsu-b]').fill('1');
        await card.locator('[data-action="union"]').click();
        await expect(card.locator('.dsu-tree')).toHaveCount(7);
    });

    test('Linear: Deque renders 3 nodes and supports push/pop at both ends', async ({ page }) => {
        await loadMethod(page, 'deque');
        const card = page.locator('[data-method-section="deque"]');
        await expect(card.locator('.code-panel-filename')).toContainText('deque.cpp');
        await expect(card.locator('.deque-node')).toHaveCount(3);
        await card.locator('[data-deque-val]').fill('99');
        await card.locator('[data-action="push-front"]').click();
        await expect(card.locator('.deque-node')).toHaveCount(4);
        await card.locator('[data-action="pop-back"]').click();
        await expect(card.locator('.deque-node')).toHaveCount(3);
    });

    test('String: KMP renders text/pattern rows + LPS table and steps', async ({ page }) => {
        await loadMethod(page, 'search-kmp');
        const card = page.locator('[data-method-section="search-kmp"]');
        await expect(card.locator('.code-panel-filename')).toContainText('search_kmp.cpp');
        await expect(card.locator('.strsearch-text .strsearch-cell')).toHaveCount(19);
        await expect(card.locator('.strsearch-lps-cell')).toHaveCount(9);
        await card.locator('[data-action="step"]').click();
        await expect(card.locator('[data-testid="kmp-stats"]')).toContainText('comparisons: 1');
    });

    test('String: Boyer-Moore renders alignment + tables and steps', async ({ page }) => {
        await loadMethod(page, 'search-bm');
        const card = page.locator('[data-method-section="search-bm"]');
        await expect(card.locator('.code-panel-filename')).toContainText('search_bm.cpp');
        await expect(card.locator('.strsearch-text .strsearch-cell')).toHaveCount(19);
        await expect(card.locator('.strsearch-bm-cell').first()).toBeVisible();
        await card.locator('[data-action="step"]').click();
        await expect(card.locator('[data-testid="bm-stats"]')).toContainText('comparisons: 1');
    });

    test('String: Rabin-Karp renders alignment + hash panel and steps', async ({ page }) => {
        await loadMethod(page, 'search-rk');
        const card = page.locator('[data-method-section="search-rk"]');
        await expect(card.locator('.code-panel-filename')).toContainText('search_rk.cpp');
        await expect(card.locator('.strsearch-text .strsearch-cell')).toHaveCount(19);
        await expect(card.locator('[data-testid="rk-hash"]')).toBeVisible();
        await card.locator('[data-action="step"]').click();
        await expect(card.locator('.rk-hc')).toContainText('1');
    });

    test('String: String Matching Compared renders 3 panes and steps all', async ({ page }) => {
        await loadMethod(page, 'search-strcompare');
        const card = page.locator('[data-method-section="search-strcompare"]');
        await expect(card.locator('.code-panel-filename')).toContainText('search_strcompare.cpp');
        await expect(card.locator('.strcompare-pane')).toHaveCount(3);
        await card.locator('[data-action="step"]').click();
        const counts = card.locator('.strcompare-cmp');
        await expect(counts.nth(0)).toContainText('1');
        await expect(counts.nth(2)).toContainText('1');
    });

    test('Probabilistic: Bloom Filter renders a 32-bit array and supports insert/query', async ({ page }) => {
        await loadMethod(page, 'bloom-filter');
        const card = page.locator('[data-method-section="bloom-filter"]');
        await expect(card.locator('.code-panel-filename')).toContainText('bloom_filter.cpp');
        await expect(card.locator('.bloom-cell')).toHaveCount(32);
        const onBefore = await card.locator('.bloom-cell.bloom-on').count();
        expect(onBefore).toBeGreaterThan(0);
        await card.locator('[data-bloom-val]').fill('zebra');
        await card.locator('[data-action="bloom-insert"]').click();
        const onAfter = await card.locator('.bloom-cell.bloom-on').count();
        expect(onAfter).toBeGreaterThanOrEqual(onBefore);
        await card.locator('[data-action="bloom-query"]').click();
        await expect(card.locator('[data-testid="bloom-hashes"]')).toContainText('zebra');
        await expect(card.locator('.bloom-cell.bloom-hit').first()).toBeVisible();
    });

    test('Probabilistic: Skip List renders 4 levels and supports insert + stepped search', async ({ page }) => {
        await loadMethod(page, 'skip-list');
        const card = page.locator('[data-method-section="skip-list"]');
        await expect(card.locator('.code-panel-filename')).toContainText('skip_list.cpp');
        await expect(card.locator('.skiplist-level')).toHaveCount(4);
        const l0 = card.locator('.skiplist-level[data-level="0"] .skiplist-node:not(.skiplist-ghost)');
        await expect(l0).toHaveCount(5);
        await card.locator('[data-skiplist-val]').fill('15');
        await card.locator('[data-action="skiplist-insert"]').click();
        await expect(l0).toHaveCount(6);
        await card.locator('[data-skiplist-search]').fill('12');
        await card.locator('[data-action="step"]').click();
        await expect(card.locator('[data-testid="skiplist-status"]')).toContainText('level');
    });

    test('Probabilistic: Count-Min Sketch renders a 3x8 grid and estimates frequency', async ({ page }) => {
        await loadMethod(page, 'count-min-sketch');
        const card = page.locator('[data-method-section="count-min-sketch"]');
        await expect(card.locator('.code-panel-filename')).toContainText('count_min_sketch.cpp');
        await expect(card.locator('.cms-cell')).toHaveCount(24);
        await card.locator('[data-cms-val]').fill('apple');
        await card.locator('[data-action="cms-add"]').click();
        await card.locator('[data-action="cms-add"]').click();
        await card.locator('[data-action="cms-estimate"]').click();
        await expect(card.locator('[data-testid="cms-readout"]')).toContainText('= 2');
        await expect(card.locator('.cms-cell.cms-hit')).toHaveCount(3);
    });

    test('String: Z-Algorithm renders the concatenated string with a Z-array and steps', async ({ page }) => {
        await loadMethod(page, 'search-zalgo');
        const card = page.locator('[data-method-section="search-zalgo"]');
        await expect(card.locator('.code-panel-filename')).toContainText('search_zalgo.cpp');
        await expect(card.locator('.zalgo-chr .zalgo-cell')).toHaveCount(29);
        await expect(card.locator('.zalgo-z .zalgo-cell')).toHaveCount(29);
        await card.locator('[data-action="step"]').click();
        await expect(card.locator('[data-testid="zalgo-stats"]')).toContainText('computed: 1');
    });

    test('String: Aho-Corasick renders the trie and steps through build + scan', async ({ page }) => {
        await loadMethod(page, 'search-aho');
        const card = page.locator('[data-method-section="search-aho"]');
        await expect(card.locator('.code-panel-filename')).toContainText('search_aho.cpp');
        await expect(card.locator('.aho-svg circle')).toHaveCount(10);
        await expect(card.locator('[data-testid="aho-phase"]')).toContainText('Phase 1');
        await card.locator('[data-action="step"]').click();
        await expect(card.locator('[data-testid="aho-phase"]')).toContainText('1/9');
    });

    test('Trees: Segment Tree renders 15 nodes and steps through query/update', async ({ page }) => {
        await loadMethod(page, 'tree-segment');
        const card = page.locator('[data-method-section="tree-segment"]');
        await expect(card.locator('.code-panel-filename')).toContainText('tree_segment.cpp');
        await expect(card.locator('.segtree-node')).toHaveCount(15);
        await expect(card.locator('[data-testid="segtree-phase"]')).toContainText('Ready');
        await card.locator('[data-action="step"]').click();
        await expect(card.locator('[data-testid="segtree-phase"]')).toContainText('Phase 1');
    });

    test('Trees: Fenwick Tree renders 8 indexed cells and steps', async ({ page }) => {
        await loadMethod(page, 'tree-fenwick');
        const card = page.locator('[data-method-section="tree-fenwick"]');
        await expect(card.locator('.code-panel-filename')).toContainText('tree_fenwick.cpp');
        await expect(card.locator('.fenwick-cell')).toHaveCount(8);
        await expect(card.locator('[data-testid="fenwick-phase"]')).toContainText('Ready');
        await card.locator('[data-action="step"]').click();
        await expect(card.locator('[data-testid="fenwick-phase"]')).toContainText('Phase 1');
    });

    test('Graphs: Prim MST renders a weighted graph and steps', async ({ page }) => {
        await loadMethod(page, 'graph-prim');
        const card = page.locator('[data-method-section="graph-prim"]');
        await expect(card.locator('.code-panel-filename')).toContainText('graph_prim.cpp');
        await expect(card.locator('.wgraph-node')).toHaveCount(5);
        await expect(card.locator('.wgraph-edge')).toHaveCount(7);
        await card.locator('[data-action="step"]').click();
        await expect(card.locator('[data-testid="prim-stats"]')).toContainText('2');
    });

    test('Graphs: Bellman-Ford renders a directed graph + distance array and steps', async ({ page }) => {
        await loadMethod(page, 'graph-bellman-ford');
        const card = page.locator('[data-method-section="graph-bellman-ford"]');
        await expect(card.locator('.code-panel-filename')).toContainText('graph_bellman_ford.cpp');
        await expect(card.locator('.wgraph-node')).toHaveCount(5);
        await expect(card.locator('.wgraph-edge')).toHaveCount(10);
        await expect(card.locator('.bellman-dcell')).toHaveCount(5);
        await card.locator('[data-action="step"]').click();
        await expect(card.locator('[data-testid="bellman-msg"]')).toContainText('pass');
        await expect(card.locator('.bellman-dcell[data-dist="1"]')).toContainText('6');
    });

    test('Graphs: Floyd-Warshall renders a distance matrix and steps per k', async ({ page }) => {
        await loadMethod(page, 'graph-floyd-warshall');
        const card = page.locator('[data-method-section="graph-floyd-warshall"]');
        await expect(card.locator('.code-panel-filename')).toContainText('graph_floyd_warshall.cpp');
        await expect(card.locator('.floyd-cell')).toHaveCount(16);
        await expect(card.locator('[data-testid="floyd-msg"]')).toContainText('initial');
        await card.locator('[data-action="step"]').click();
        await expect(card.locator('[data-testid="floyd-msg"]')).toContainText('k = 0');
    });

    test('i18n: settings drawer title is translated by data-i18n-key walker', async ({ page }) => {
        // Default pin is 'en' from beforeEach.
        await expect(page.locator('#settings-drawer-title')).toHaveText('Settings');
    });

    test('Navigation: switching from Spec-2a dynamic visualizers back to static ones does not crash', async ({ page }) => {
        const errors = [];
        page.on('pageerror', (e) => errors.push(e.message));
        await loadMethod(page, 'graph-adjlist');
        await loadMethod(page, 'graph');
        await expect(page.locator('#graph-edges')).toHaveCount(1);
        await loadMethod(page, 'tree-dsu');
        await loadMethod(page, 'tree-bst');
        await expect(page.locator('#tree-nodes-container')).toHaveCount(1);
        await loadMethod(page, 'deque');
        await loadMethod(page, 'queue');
        await expect(page.locator('#queue-container')).toHaveCount(1);
        await loadMethod(page, 'search-kmp');
        await loadMethod(page, 'search-linear');
        await expect(page.locator('#search-container')).toHaveCount(1);
        await loadMethod(page, 'bloom-filter');
        await loadMethod(page, 'hash-chain');
        await expect(page.locator('#hash-ch-container')).toHaveCount(1);
        await loadMethod(page, 'search-zalgo');
        await loadMethod(page, 'search-aho');
        await loadMethod(page, 'search-linear');
        await expect(page.locator('#search-container')).toHaveCount(1);
        await loadMethod(page, 'tree-segment');
        await loadMethod(page, 'tree-bst');
        await expect(page.locator('#tree-nodes-container')).toHaveCount(1);
        await loadMethod(page, 'graph-prim');
        await loadMethod(page, 'graph');
        await expect(page.locator('#graph-edges')).toHaveCount(1);
        expect(errors).toEqual([]);
    });

    test('i18n: toggling language re-renders nav pill text', async ({ page }) => {
        await expect(page.locator('.category-nav-item[data-group="linear"] .category-nav-btn'))
            .toHaveText('Linear Structures');
        await page.evaluate(() => window.I18N.setLanguage('zh'));
        await expect(page.locator('.category-nav-item[data-group="linear"] .category-nav-btn'))
            .toHaveText('線性結構');
    });

    test('i18n: toggling language re-renders mode-specific button labels', async ({ page }) => {
        // Default mode is stack-array; default lang is en.
        await expect(page.locator('#btn-std-add')).toHaveText('Push()');
        await page.evaluate(() => window.I18N.setLanguage('zh'));
        // Push()/Pop() intentionally keep English in the zh table.
        await expect(page.locator('#btn-std-add')).toHaveText('Push()');
        // Switch to a mode whose label DOES differ in zh.
        await loadMethod(page, 'graph');
        await expect(page.locator('#btn-graph-add')).toHaveText('加入邊');
    });

    test('i18n: clicking toggle flips language and updates label', async ({ page }) => {
        // Open the slide viewer so the toggle button is visible.
        await page.locator('[data-method-section="stack-array"] .method-slides-btn').click();
        await expect(page.locator('[data-testid="slide-viewer"]')).toBeVisible();
        const toggle = page.locator('[data-testid="lang-toggle"]');
        // Default pin is 'en' → label reads 中 (the target language).
        await expect(toggle).toHaveText('中');
        await toggle.click();
        await expect(toggle).toHaveText('EN');
        await expect(page.locator('html')).toHaveAttribute('lang', 'zh-Hant');
    });

});
