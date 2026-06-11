(function () {
    'use strict';

    const STORAGE_KEY = 'dsvisual-lang';
    const SUPPORTED = Object.freeze(['zh', 'en']);

    let TRANSLATIONS = {
        en: {
            // Categories
            'group.linear':                 'Linear Structures',
            'group.arrays':                 'Arrays',
            'group.trees':                  'Trees',
            'group.graphs':                 'Graphs',
            'group.hash':                   'Hash & Probabilistic',
            'group.heaps':                  'Heaps / Priority Queues',
            'group.sorting':                'Sorting',
            'group.searching':              'Searching & String Matching',
            'group.oop':                    'OOP Concepts',
            'group.patterns':               'Design Patterns',
            'group.patterns-creational':    'Creational',
            'group.patterns-structural':    'Structural',
            'group.patterns-behavioral':    'Behavioral',
            'group.patterns-architectural': 'Architectural',

            // Methods — Linear
            'method.stack-array':           'Stack (Array)',
            'method.stack-list':            'Stack (List)',
            'method.queue':                 'Queue',
            'method.list-array':            'Array List',
            'method.list-linked':           'Singly Linked List',
            'method.deque':                 'Deque (Double-Ended Queue)',
            'method.maze-stack':            'Maze (Stack Backtracking)',
            'method.list-doubly':           'Doubly / Circular Linked List',

            // Methods — Trees
            'method.tree-bst':              'Binary Search Tree',
            'method.tree-avl':              'AVL Tree',
            'method.tree-rb':               'Red-Black Tree',
            'method.tree-splay':            'Splay Tree',
            'method.tree-trie':             'Trie',
            'method.tree-radix':            'Radix Tree',
            'method.tree-ternary':          'Ternary Search Tree',
            'method.tree-btree':            'B-Tree',
            'method.tree-bplus':            'B+ Tree',
            'method.tree-dsu':              'Disjoint Set (Union-Find)',
            'method.tree-segment':          'Segment Tree',
            'method.tree-fenwick':          'Fenwick Tree (BIT)',
            'method.tree-traversal':        'Tree Traversal',
            'method.huffman':               'Huffman Coding',
            'method.tree-threaded': 'Threaded Binary Tree',
            'method.tree-mway': 'm-way Search Tree',
            'method.tree-expression': 'Expression Tree',

            // Methods — Graphs
            'method.graph':                 'Undirected Graph',
            'method.graph-adjlist':         'Adjacency List',
            'method.graph-traversal':       'BFS vs DFS (Dual-Pane)',
            'method.graph-bfs':             'Breadth-First Search',
            'method.graph-dfs':             'Depth-First Search',
            'method.graph-kruskal':         'Kruskal MST',
            'method.graph-dijkstra':        'Dijkstra (Shortest Path)',
            'method.graph-topo':            'Topological Sort',
            'method.graph-prim':            "Prim's MST",
            'method.graph-bellman-ford':    'Bellman-Ford',
            'method.graph-floyd-warshall':  'Floyd-Warshall',
            'method.graph-aoe':             'AOE / Critical Path',
            'method.expr-infix-postfix':    'Infix → Postfix (Stack)',

            // Methods — Hash & Probabilistic
            'method.hash-chain':            'Hash Chaining',
            'method.hash-open':             'Open Addressing',
            'method.hash-bucket':           'Bucketing',
            'method.bloom-filter':          'Bloom Filter',
            'method.skip-list':             'Skip List',
            'method.count-min-sketch':      'Count-Min Sketch',

            // Methods — Heaps
            'method.heap-binary':           'Binary Heap',
            'method.heap-binomial':         'Binomial Heap',
            'method.heap-fibonacci':        'Fibonacci Heap',
            'method.heap-leftist':          'Leftist Heap',
            'method.heap-skew':             'Skew Heap',
            'method.heap-dary':             '4-ary Heap',
            'method.heap-pairing':          'Pairing Heap',

            'method.tree-obst': 'Optimal BST',
            'method.sort-external': 'External Merge Sort',
            'method.matrix-sparse': 'Sparse Matrix (Transpose)',
            'method.poly-padd': 'Polynomial Addition',

            // Methods — Sorting
            'method.sort-bubble':           'Bubble Sort',
            'method.sort-select':           'Selection Sort',
            'method.sort-insert':           'Insertion Sort',
            'method.sort-quick':            'Quick Sort',
            'method.sort-merge':            'Merge Sort',
            'method.sort-shell':            'Shell Sort',
            'method.sort-bucket':           'Bucket Sort',
            'method.sort-count':            'Counting Sort',
            'method.sort-radix':            'Radix Sort',
            'method.sort-heap':             'Heap Sort',
            'method.sort-shaker':           'Shaker Sort',

            // Methods — Searching & String Matching
            'method.search-linear':         'Linear Search',
            'method.search-binary':         'Binary Search',
            'method.search-kmp':            'KMP (Knuth-Morris-Pratt)',
            'method.search-bm':             'Boyer-Moore',
            'method.search-rk':             'Rabin-Karp',
            'method.search-strcompare':     'String Matching Compared',
            'method.search-zalgo':          'Z-Algorithm',
            'method.search-aho':            'Aho-Corasick',
            'method.search-fibonacci': 'Fibonacci Search',
            'method.search-interpolation': 'Interpolation Search',

            // Methods — OOP
            'method.oop-inheritance':       'Class Inheritance',
            'method.oop-polymorphism':      'Polymorphism (Virtual)',
            'method.oop-encapsulation':     'Encapsulation & Access',
            'method.oop-abstraction':       'Abstraction (Abstract Classes)',
            'method.oop-adhoc':             'Ad-hoc Polymorphism (Overloading)',
            'method.oop-templates':         'Parametric Polymorphism (Templates)',

            // Methods — Design Patterns
            'method.pattern-singleton':     'Singleton',
            'method.pattern-factory':       'Factory Method',
            'method.pattern-adapter':       'Adapter',
            'method.pattern-decorator':     'Decorator',
            'method.pattern-observer':      'Observer',
            'method.pattern-strategy':      'Strategy',
            'method.pattern-mvc':           'MVC (Model-View-Controller)',
            'method.pattern-layered':       'Layered Architecture',
            'method.pattern-pubsub':        'Publish-Subscribe',
            'method.pattern-pipefilter':    'Pipe-and-Filter',
            'method.pattern-di':            'Dependency Injection',

            // Chrome
            'app.title':                    'C++ Algorithms Visualizer',
            'app.subtitle':                 'Data Structures (Stack, Queue, …)',
            'app.methods-available':        '{count} methods available',
            'nav.overview':                 'Overview',
            'overview.title':               'Overview',
            'overview.intro':               'C++ Algorithms Visualizer is an interactive sandbox covering 9 categories of data structures and algorithms — from linear structures to design patterns. Hover any category in the top nav to jump straight to a method, or browse all of them below.',
            'aria.settings-toggle':         'Open settings',
            'aria.category-nav':            'Data structure categories',
            'aria.lang-toggle':             'Switch language',
            'aria.cloud-toggle':            'Open cloud sign-in',
            'aria.viz-host':                'Active interactive visualization',
            'cloud.title':                  'Cloud sign-in',
            'cloud.signin-cta':             'Sign in with Google',
            'cloud.signin-note':            'Permission "See and download your Drive files" is required to view private slides shared with your account.',
            'cloud.current-user':           'Signed in as {name}',
            'cloud.signout':                'Sign out',
            'settings.delay':               'Delay',
            'settings.title':               'Settings',
            'settings.difficulty':          'Random input difficulty',
            'difficulty.normal':            'Normal',
            'difficulty.special':           'Special',
            'difficulty.edge':              'Edge case',
            'difficulty.large':             'Large',
            'settings.density':             'Code panel line-height',
            'settings.preview':             'Preview',
            'slide.progress':               'Slide {n} / {total}',
            'slide.private-chip-aria':      'Private deck',
            'slide.private-signin-row':     '🔒 Sign in to see private slides',
            'slide.private-no-access':      'no access',
            'slide.private-fetch-error':    "couldn't load — retry",
            'slide.no-slides':              'No slides available.',
            'slide.notes-toggle':           'Notes',
            'status.switched-to':           'Switched to {mode}',
            'tutorial.completed':           'Completed',
            'tutorial.complete-title':      '{name} tutorial complete',
            'tutorial.complete-text':       'You walked through insert, peek, merge, change-key, extract, and stats for this heap. Restart to replay it or switch heap modes for another tutorial.',
            'tutorial.progress':            'Step {n} / {total}',
            'tutorial.start':               'Start Tutorial',
            'tutorial.restart':             'Restart Tutorial',

            // Buttons
            'btn.push':                     'Push()',
            'btn.pop':                      'Pop()',
            'btn.enqueue':                  'Enqueue()',
            'btn.dequeue':                  'Dequeue()',
            'btn.insert':                   'Insert',
            'btn.remove':                   'Remove',
            'btn.insert-call':              'Insert()',
            'btn.insert-word':              'Insert Word()',
            'btn.add-edge':                 'Add Edge',
            'btn.add-weighted-edge':        'Add Weighted Edge',
            'btn.add-edge-directed':        'Add Edge (Directed)',
            'btn.run-kruskal':              'Run Kruskal()',
            'btn.run-dijkstra':             'Run Dijkstra()',
            'btn.run-topo':                 'Run Topo Sort()',
            'btn.reset-graph':              'Reset Graph',
            'btn.hash-insert':              'Hash/Insert()',
            'btn.splay-search':             'Splay Search()',
            'btn.find':                     'Find()',
            'btn.pause':                    'Pause',
            'btn.resume':                   'Resume',
            'btn.stop':                     'Stop',
            'btn.randomize':                'Randomize',
            'btn.start':                    'Start()',
            'btn.peek':                     'Peek()',
            'btn.extract':                  'Extract()',
            'btn.heap-merge':               'Merge(+extra)',
            'btn.heap-change':              'Decrease/Increase',
            'btn.heap-delete':              'Delete(value)',
            'btn.copy':                     'Copy',
            'btn.copied':                   '✓ Copied',

            // Placeholders
            'ph.value':                     'Value',
            'ph.value-example':             'Value (e.g. 42)',
            'ph.node-value':                'Node Value',
            'ph.word-example':              'Word (e.g. CAT)',
            'ph.target':                    'Target',
            'ph.index':                     'Index',
            'ph.weight':                    'Weight',
            'ph.u-range':                   'U(0-4)',
            'ph.v-range':                   'V(0-4)',
            'ph.source-range':              'Source(0-4)',
            'ph.target-range':              'Target(0-4)',
            'ph.heap-extra':                'Extra list or new value',
        },
        zh: {
            // Categories
            'group.linear':                 '線性結構',
            'group.arrays':                 '陣列',
            'group.trees':                  '樹',
            'group.graphs':                 '圖',
            'group.hash':                   '雜湊與機率資料結構',
            'group.heaps':                  '堆積 / 優先佇列',
            'group.sorting':                '排序',
            'group.searching':              '搜尋與字串比對',
            'group.oop':                    'OOP 概念',
            'group.patterns':               '設計模式',
            'group.patterns-creational':    '建立型',
            'group.patterns-structural':    '結構型',
            'group.patterns-behavioral':    '行為型',
            'group.patterns-architectural': '架構型',

            // Methods — Linear
            'method.stack-array':           '堆疊（陣列實作）',
            'method.stack-list':            '堆疊（鏈結串列實作）',
            'method.queue':                 '佇列',
            'method.list-array':            '陣列串列',
            'method.list-linked':           '單向鏈結串列',
            'method.deque':                 '雙端佇列',
            'method.maze-stack':            '迷宮(堆疊回溯)',
            'method.list-doubly':           '雙向 / 環狀串列',

            // Methods — Trees
            'method.tree-bst':              '二元搜尋樹',
            'method.tree-avl':              'AVL 樹',
            'method.tree-rb':               '紅黑樹',
            'method.tree-splay':            '伸展樹',
            'method.tree-trie':             'Trie 字典樹',
            'method.tree-radix':            'Radix 樹',
            'method.tree-ternary':          '三元搜尋樹',
            'method.tree-btree':            'B 樹',
            'method.tree-bplus':            'B+ 樹',
            'method.tree-dsu':              '互斥集合（並查集）',
            'method.tree-segment':          '線段樹',
            'method.tree-fenwick':          'Fenwick 樹（BIT）',
            'method.tree-traversal':        '二元樹走訪',
            'method.huffman':               'Huffman 編碼',
            'method.tree-threaded': '引線二元樹',
            'method.tree-mway': 'm 路搜尋樹',
            'method.tree-expression': '運算式樹',

            // Methods — Graphs
            'method.graph':                 '無向圖',
            'method.graph-adjlist':         '鄰接串列',
            'method.graph-traversal':       'BFS vs DFS（並排對照）',
            'method.graph-bfs':             '廣度優先搜尋',
            'method.graph-dfs':             '深度優先搜尋',
            'method.graph-kruskal':         'Kruskal MST',
            'method.graph-dijkstra':        'Dijkstra（最短路徑）',
            'method.graph-topo':            '拓樸排序',
            'method.graph-prim':            "Prim's MST",
            'method.graph-bellman-ford':    'Bellman-Ford',
            'method.graph-floyd-warshall':  'Floyd-Warshall',
            'method.graph-aoe':             'AOE 網路 / 關鍵路徑',
            'method.expr-infix-postfix':    '中序轉後序(堆疊)',

            // Methods — Hash & Probabilistic
            'method.hash-chain':            '鏈結雜湊',
            'method.hash-open':             '開放定址',
            'method.hash-bucket':           '分桶',
            'method.bloom-filter':          '布隆過濾器',
            'method.skip-list':             '跳躍串列',
            'method.count-min-sketch':      'Count-Min Sketch',

            // Methods — Heaps
            'method.heap-binary':           '二元堆積',
            'method.heap-binomial':         '二項堆積',
            'method.heap-fibonacci':        '費氏堆積',
            'method.heap-leftist':          '左偏堆積',
            'method.heap-skew':             '斜堆積',
            'method.heap-dary':             '4 元堆積',
            'method.heap-pairing':          '配對堆積',

            'method.tree-obst': '最佳二元搜尋樹',
            'method.sort-external': '外部合併排序',
            'method.matrix-sparse': '稀疏矩陣(轉置)',
            'method.poly-padd': '多項式相加',

            // Methods — Sorting
            'method.sort-bubble':           '氣泡排序',
            'method.sort-select':           '選擇排序',
            'method.sort-insert':           '插入排序',
            'method.sort-quick':            '快速排序',
            'method.sort-merge':            '合併排序',
            'method.sort-shell':            '希爾排序',
            'method.sort-bucket':           '桶排序',
            'method.sort-count':            '計數排序',
            'method.sort-radix':            '基數排序',
            'method.sort-heap':             '堆積排序',
            'method.sort-shaker':           '雞尾酒排序',

            // Methods — Searching & String Matching
            'method.search-linear':         '線性搜尋',
            'method.search-binary':         '二元搜尋',
            'method.search-kmp':            'KMP（Knuth-Morris-Pratt）',
            'method.search-bm':             'Boyer-Moore',
            'method.search-rk':             'Rabin-Karp',
            'method.search-strcompare':     '字串比對對照',
            'method.search-zalgo':          'Z 演算法',
            'method.search-aho':            'Aho-Corasick',
            'method.search-fibonacci': '費氏搜尋',
            'method.search-interpolation': '內插搜尋',

            // Methods — OOP
            'method.oop-inheritance':       '類別繼承',
            'method.oop-polymorphism':      '多型（虛擬函式）',
            'method.oop-encapsulation':     '封裝與存取控制',
            'method.oop-abstraction':       '抽象（抽象類別）',
            'method.oop-adhoc':             'Ad-hoc 多型（多載）',
            'method.oop-templates':         '參數多型（樣板）',

            // Methods — Design Patterns
            'method.pattern-singleton':     '單例（Singleton）',
            'method.pattern-factory':       '工廠方法（Factory Method）',
            'method.pattern-adapter':       '適配器（Adapter）',
            'method.pattern-decorator':     '裝飾器（Decorator）',
            'method.pattern-observer':      '觀察者（Observer）',
            'method.pattern-strategy':      '策略（Strategy）',
            'method.pattern-mvc':           'MVC（Model-View-Controller）',
            'method.pattern-layered':       '分層架構（Layered）',
            'method.pattern-pubsub':        '發布訂閱（Pub-Sub）',
            'method.pattern-pipefilter':    '管道過濾器（Pipe-and-Filter）',
            'method.pattern-di':            '依賴注入（DI）',

            // Chrome
            'app.title':                    'C++ 演算法視覺化',
            'app.subtitle':                 '資料結構（Stack、Queue、…）',
            'app.methods-available':        '共 {count} 種方法可選',
            'nav.overview':                 '總覽',
            'overview.title':               '總覽',
            'overview.intro':               'C++ 演算法視覺化是一個互動沙盒，涵蓋 9 大類別的資料結構與演算法 — 從線性結構到設計模式。在上方導覽列 hover 任一分類即可直接跳到方法，或從下方瀏覽全部。',
            'aria.settings-toggle':         '開啟設定',
            'aria.category-nav':            '資料結構分類',
            'aria.lang-toggle':             '切換語言',
            'aria.cloud-toggle':            '開啟雲端登入',
            'aria.viz-host':                '互動式視覺化區域',
            'cloud.title':                  '雲端登入',
            'cloud.signin-cta':             '以 Google 登入',
            'cloud.signin-note':            '需要「檢視與下載您的 Google 雲端硬碟檔案」權限,才能讀取分享給您的私人投影片。',
            'cloud.current-user':           '已登入：{name}',
            'cloud.signout':                '登出',
            'settings.delay':               '延遲',
            'settings.title':               '設定',
            'settings.difficulty':          '隨機輸入難度',
            'difficulty.normal':            '一般',
            'difficulty.special':           '特殊',
            'difficulty.edge':              'Edge case',
            'difficulty.large':             '大型',
            'settings.density':             '程式碼面板行距',
            'settings.preview':             '預覽',
            'slide.progress':               '第 {n} 張 / 共 {total} 張',
            'slide.private-chip-aria':      '私人投影片',
            'slide.private-signin-row':     '🔒 登入以檢視私人投影片',
            'slide.private-no-access':      '無存取權',
            'slide.private-fetch-error':    '載入失敗 —— 重試',
            'slide.no-slides':              '此項目尚無投影片。',
            'slide.notes-toggle':           '備註',
            'status.switched-to':           '已切換到 {mode}',
            'tutorial.completed':           '已完成',
            'tutorial.complete-title':      '{name} 教學已完成',
            'tutorial.complete-text':       '你已走過此堆積的 insert、peek、merge、change-key、extract 與 stats。重新開始可重播，或切換到其他堆積模式繼續練習。',
            'tutorial.progress':            '第 {n} 步 / 共 {total} 步',
            'tutorial.start':               '開始教學',
            'tutorial.restart':             '重新開始教學',

            // Buttons
            'btn.push':                     'Push()',
            'btn.pop':                      'Pop()',
            'btn.enqueue':                  'Enqueue()',
            'btn.dequeue':                  'Dequeue()',
            'btn.insert':                   '插入',
            'btn.remove':                   '移除',
            'btn.insert-call':              'Insert()',
            'btn.insert-word':              'Insert Word()',
            'btn.add-edge':                 '加入邊',
            'btn.add-weighted-edge':        '加入加權邊',
            'btn.add-edge-directed':        '加入邊（有向）',
            'btn.run-kruskal':              '執行 Kruskal()',
            'btn.run-dijkstra':             '執行 Dijkstra()',
            'btn.run-topo':                 '執行拓樸排序()',
            'btn.reset-graph':              '重置圖',
            'btn.hash-insert':              'Hash/Insert()',
            'btn.splay-search':             'Splay Search()',
            'btn.find':                     'Find()',
            'btn.pause':                    '暫停',
            'btn.resume':                   '繼續',
            'btn.stop':                     '停止',
            'btn.randomize':                '隨機排序',
            'btn.start':                    'Start()',
            'btn.peek':                     'Peek()',
            'btn.extract':                  'Extract()',
            'btn.heap-merge':               'Merge(+extra)',
            'btn.heap-change':              '減值/增值',
            'btn.heap-delete':              'Delete(value)',
            'btn.copy':                     '複製',
            'btn.copied':                   '✓ 已複製',

            // Placeholders
            'ph.value':                     '數值',
            'ph.value-example':             '數值（例如 42）',
            'ph.node-value':                '節點值',
            'ph.word-example':              '單字（例如 CAT）',
            'ph.target':                    '目標',
            'ph.index':                     '索引',
            'ph.weight':                    '權重',
            'ph.u-range':                   'U(0-4)',
            'ph.v-range':                   'V(0-4)',
            'ph.source-range':              '來源(0-4)',
            'ph.target-range':              '目標(0-4)',
            'ph.heap-extra':                '額外清單或新值',
        },
    };
    let currentLang = detectInitialLanguage();

    function detectInitialLanguage() {
        const saved = (typeof localStorage !== 'undefined')
            ? localStorage.getItem(STORAGE_KEY) : null;
        if (SUPPORTED.indexOf(saved) >= 0) return saved;
        const nav = (typeof navigator !== 'undefined' && navigator.language) || '';
        return nav.toLowerCase().indexOf('zh') === 0 ? 'zh' : 'en';
    }

    function getCurrentLanguage() {
        return currentLang;
    }

    function t(key, vars) {
        const table = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
        let str = table[key];
        if (str == null) {
            console.warn('[i18n] missing key:', key, 'for lang:', currentLang);
            str = (TRANSLATIONS.en && TRANSLATIONS.en[key]) != null
                ? TRANSLATIONS.en[key] : key;
        }
        if (vars) {
            str = str.replace(/\{(\w+)\}/g, function (_, name) {
                return vars[name] != null ? String(vars[name]) : '{' + name + '}';
            });
        }
        return str;
    }

    function applyTranslations(root) {
        root = root || (typeof document !== 'undefined' ? document : null);
        if (!root || !root.querySelectorAll) return;
        root.querySelectorAll('[data-i18n-key]').forEach(function (el) {
            el.textContent = t(el.dataset.i18nKey);
        });
        root.querySelectorAll('[data-i18n-aria-label]').forEach(function (el) {
            el.setAttribute('aria-label', t(el.dataset.i18nAriaLabel));
        });
        root.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
            el.setAttribute('placeholder', t(el.dataset.i18nPlaceholder));
        });
    }

    function setLanguage(lang) {
        if (SUPPORTED.indexOf(lang) < 0) return;
        if (lang === currentLang) return;
        currentLang = lang;
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, lang);
        }
        if (typeof document !== 'undefined' && document.documentElement) {
            document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : 'en';
        }
        applyTranslations();
        if (typeof document !== 'undefined' && document.dispatchEvent) {
            document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang: lang } }));
        }
    }

    // Apply initial <html lang> at load time.
    if (typeof document !== 'undefined' && document.documentElement) {
        document.documentElement.lang = currentLang === 'zh' ? 'zh-Hant' : 'en';
    }

    const api = {
        SUPPORTED: SUPPORTED,
        getCurrentLanguage: getCurrentLanguage,
        setLanguage: setLanguage,
        t: t,
        applyTranslations: applyTranslations,
        _setTablesForTest: function (next) { TRANSLATIONS = next; },
    };
    if (typeof window !== 'undefined') {
        window.I18N = api;
        window.t = t;
    } else {
        globalThis.I18N = api;
        globalThis.t = t;
    }
})();
