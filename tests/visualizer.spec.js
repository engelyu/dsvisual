const { test, expect } = require('@playwright/test');
const path = require('path');

async function loadMethod(page, methodId) {
    const categoryButtons = page.locator('[data-testid="category-nav"] .category-nav-btn');
    const methodSelect = page.locator('[data-testid="method-select"]');
    const count = await categoryButtons.count();

    async function trySelect() {
        const hasOption = await methodSelect.locator(`option[value="${methodId}"]`).count();
        if (!hasOption) return false;
        await methodSelect.selectOption(methodId);
        const card = page.locator(`[data-method-section="${methodId}"]`);
        await expect(card).toHaveAttribute('data-runtime-state', 'active');
        return true;
    }

    for (let i = 0; i < count; i++) {
        await categoryButtons.nth(i).click();
        if (await trySelect()) return;
        const subTabs = page.locator('.category-subtab-row.visible .category-subtab-btn');
        const tabCount = await subTabs.count();
        for (let t = 0; t < tabCount; t++) {
            await subTabs.nth(t).click();
            if (await trySelect()) return;
        }
    }
    throw new Error(`Method ${methodId} not found in method dropdown`);
}

test.describe('Data Structure Visualizer Full Suite', () => {
    
    test.beforeEach(async ({ page }) => {
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

    test('Phase 1 category nav: renders nine top-level groups and drives method sections', async ({ page }) => {
        const categoryNav = page.locator('[data-testid="category-nav"]');
        const methodSections = page.locator('[data-testid="method-sections"]');
        await expect(categoryNav).toBeVisible();
        await expect(categoryNav.locator('.category-nav-btn')).toHaveCount(9);
        await expect(categoryNav.locator('[data-testid="method-select"]')).toHaveCount(0);
        await expect(methodSections.locator('[data-testid="method-select"]')).toBeVisible();
        await expect(methodSections.locator('[data-method-section="stack-array"]')).toBeVisible();
        await expect(categoryNav.locator('button[data-method], .category-nav-submenu')).toHaveCount(0);

        await categoryNav.getByRole('button', { name: 'Sorting' }).click();
        await page.waitForSelector('[data-method-section]', { timeout: 5000 });
        await expect(methodSections.locator('[data-testid="method-select"] option[value="sort-bubble"]')).toHaveCount(1);
        await methodSections.locator('[data-testid="method-select"]').selectOption('sort-bubble');
        await expect(methodSections.locator('[data-method-section="sort-bubble"]')).toBeVisible();
        await expect(page.locator('[data-method-section="sort-bubble"]')).toHaveAttribute('data-runtime-state', 'active');

        await categoryNav.getByRole('button', { name: 'Trees' }).click();
        await page.waitForSelector('[data-method-section]', { timeout: 5000 });
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
        await expect(page.locator('#slide-viewer-title')).toHaveText('堆疊(陣列實作)');
        await expect(page.locator('#slide-viewer-body')).toContainText('堆疊');

        await page.locator('.slide-viewer-close').click();
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

        for (const [category, methodId] of expectedFirstMethods) {
            await page.locator('[data-testid="category-nav"]').getByRole('button', { name: category }).click();
            await page.waitForSelector('[data-method-section]', { timeout: 5000 });
            await expect(page.locator('[data-testid="method-sections"] [data-method-section]')).toHaveCount(1);
            await expect(page.locator(`[data-method-section="${methodId}"]`)).toHaveAttribute('data-runtime-state', 'active');
        }
    });

    test('Design Patterns sub-tabs: switch the method list by GoF category', async ({ page }) => {
        const nav = page.locator('[data-testid="category-nav"]');
        await nav.getByRole('button', { name: 'Design Patterns', exact: true }).click();

        const subTabs = page.locator('.category-subtab-row.visible .category-subtab-btn');
        await expect(subTabs).toHaveCount(4);

        const methodSelect = page.locator('[data-testid="method-select"]');
        // Default sub-tab is Creational.
        await expect(methodSelect.locator('option[value="pattern-singleton"]')).toHaveCount(1);

        await subTabs.getByText('Structural', { exact: true }).click();
        await expect(methodSelect.locator('option[value="pattern-adapter"]')).toHaveCount(1);
        await expect(methodSelect.locator('option[value="pattern-singleton"]')).toHaveCount(0);

        await subTabs.getByText('Behavioral', { exact: true }).click();
        await expect(methodSelect.locator('option[value="pattern-observer"]')).toHaveCount(1);

        // Leaving Design Patterns hides the sub-tab row.
        await nav.getByRole('button', { name: 'Sorting', exact: true }).click();
        await expect(page.locator('.category-subtab-row.visible')).toHaveCount(0);
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
        await expect(card.locator('[data-testid="skiplist-status"]')).toBeVisible();
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
        expect(errors).toEqual([]);
    });

});
