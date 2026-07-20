// C++ Source Code loaded from code_db.js


let animState = 'idle'; 
async function sleep(ms) {
    let waited = 0;
    while (waited < ms) {
        if (animState === 'stopped') throw 'STOPPED';
        if (animState === 'paused') await new Promise(r => setTimeout(r, 50));
        else { const step = Math.min(20, ms - waited); await new Promise(r => setTimeout(r, step)); waited += step; }
    }
}

const METHOD_GROUPS = [
    {
        id: 'linear',
        title: 'Linear Structures',
        methods: [
            { id: 'stack-array', title: 'Stack (Array)', file: 'stack_array.cpp', visualizer: 'stack', controls: 'standard' },
            { id: 'stack-list', title: 'Stack (List)', file: 'stack_linkedlist.cpp', visualizer: 'linked-stack', controls: 'standard' },
            { id: 'queue', title: 'Queue', file: 'queue.cpp', visualizer: 'queue', controls: 'standard' },
            { id: 'list-array', title: 'Array List', file: 'list_array.cpp', visualizer: 'array-list', controls: 'list' },
            { id: 'list-linked', title: 'Singly Linked List', file: 'list_linked.cpp', visualizer: 'linked-list', controls: 'list' },
            { id: 'deque', title: 'Deque (Double-Ended Queue)', file: 'deque.cpp', visualizer: 'deque', controls: 'deque' },
            { id: 'expr-infix-postfix', title: 'Infix → Postfix (Stack)', file: 'expr_infix_postfix.cpp', visualizer: 'expr', controls: 'expr' },
            { id: 'maze-stack', title: 'Maze (Stack Backtracking)', file: 'maze_stack.cpp', visualizer: 'maze', controls: 'maze' },
            { id: 'list-doubly', title: 'Doubly / Circular Linked List', file: 'list_doubly.cpp', visualizer: 'doubly', controls: 'doubly' },
            { id: 'list-equivalence', title: 'Equivalence Classes (Linked List)', file: 'list_equivalence.cpp', visualizer: 'equiv', controls: 'equiv' },
        ],
    },
    {
        id: 'arrays',
        title: 'Arrays',
        methods: [
            { id: 'matrix-sparse', title: 'Sparse Matrix (Transpose)', file: 'matrix_sparse.cpp', visualizer: 'sparse', controls: 'sparse' },
            { id: 'matrix-sparse-list', title: 'Sparse Matrix (Linked List)', file: 'matrix_sparse_list.cpp', visualizer: 'msl', controls: 'msl' },
            { id: 'poly-padd', title: 'Polynomial Addition', file: 'poly_padd.cpp', visualizer: 'poly', controls: 'poly' },
            { id: 'magic-square', title: "Magic Square (Coxeter's Rule)", file: 'magic_square.cpp', visualizer: 'magic-square', controls: 'magic-square' },
            { id: 'magic-latin', title: 'Magic Square — Latin Decomposition', file: 'magic_latin.cpp', visualizer: 'magicLatin', controls: 'magicLatin' },
            { id: 'magic-torus', title: 'Magic Square — Toroidal Tiling', file: 'magic_torus.cpp', visualizer: 'magicTorus', controls: 'magicTorus' },
            { id: 'magic-formula', title: 'Magic Square — O(1) getValue Formula', file: 'magic_formula.cpp', visualizer: 'magicFormula', controls: 'magicFormula' },
            { id: 'magic-symmetry', title: 'Magic Square — Symmetry (D₄)', file: 'magic_symmetry.cpp', visualizer: 'magicSymmetry', controls: 'magicSymmetry' },
        ],
    },
    {
        id: 'trees',
        title: 'Trees',
        methods: [
            { id: 'tree-bst', title: 'Binary Search Tree', file: 'tree_bst.cpp', visualizer: 'tree', controls: 'tree' },
            { id: 'tree-avl', title: 'AVL Tree', file: 'tree_avl.cpp', visualizer: 'tree', controls: 'tree' },
            { id: 'tree-rb', title: 'Red-Black Tree', file: 'tree_rb.cpp', visualizer: 'rbtree', controls: 'rbtree', codeDrawer: true },
            { id: 'tree-splay', title: 'Splay Tree', file: 'tree_splay.cpp', visualizer: 'tree', controls: 'tree' },
            { id: 'tree-trie', title: 'Trie', file: 'tree_trie.cpp', visualizer: 'text-tree', controls: 'text-tree' },
            { id: 'tree-radix', title: 'Radix Tree', file: 'tree_radix.cpp', visualizer: 'text-tree', controls: 'text-tree' },
            { id: 'tree-ternary', title: 'Ternary Search Tree', file: 'tree_ternary.cpp', visualizer: 'text-tree', controls: 'text-tree' },
            { id: 'tree-btree', title: 'B-Tree', file: 'tree_btree.cpp', visualizer: 'advanced-tree', controls: 'tree' },
            { id: 'tree-bplus', title: 'B+ Tree', file: 'tree_bplus.cpp', visualizer: 'advanced-tree', controls: 'tree' },
            { id: 'tree-dsu', title: 'Disjoint Set (Union-Find)', file: 'tree_dsu.cpp', visualizer: 'dsu', controls: 'dsu' },
            { id: 'tree-segment', title: 'Segment Tree', file: 'tree_segment.cpp', visualizer: 'segtree', controls: 'segtree' },
            { id: 'tree-fenwick', title: 'Fenwick Tree (BIT)', file: 'tree_fenwick.cpp', visualizer: 'fenwick', controls: 'fenwick' },
            { id: 'tree-traversal', title: 'Tree Traversal', file: 'tree_traversal.cpp', visualizer: 'tree', controls: 'tree' },
            { id: 'huffman', title: 'Huffman Coding', file: 'huffman.cpp', visualizer: 'tree', controls: 'tree' },
            { id: 'tree-obst', title: 'Optimal BST', file: 'tree_obst.cpp', visualizer: 'obst', controls: 'obst' },
            { id: 'tree-threaded', title: 'Threaded Binary Tree', file: 'tree_threaded.cpp', visualizer: 'threaded', controls: 'threaded' },
            { id: 'tree-mway', title: 'm-way Search Tree', file: 'tree_mway.cpp', visualizer: 'mway', controls: 'mway' },
            { id: 'tree-expression', title: 'Expression Tree', file: 'tree_expression.cpp', visualizer: 'exprtree', controls: 'exprtree' },
            { id: 'tree-general-binary', title: 'General ↔ Binary Tree', file: 'tree_general_binary.cpp', visualizer: 'tgb', controls: 'tgb' },
            { id: 'tree-copy-equal', title: 'Tree COPY & EQUAL', file: 'tree_copy_equal.cpp', visualizer: 'copyequal', controls: 'copyequal' },
            { id: 'decision-tree-coins', title: '8-Coins Decision Tree', file: 'decision_tree_coins.cpp', visualizer: 'coins', controls: 'coins' },
            { id: 'tree-catalan', title: 'Counting Trees (Catalan)', file: 'tree_catalan.cpp', visualizer: 'catalan', controls: 'catalan' },
            { id: 'tree-array-rep', title: 'Array Representation', file: 'tree_array_rep.cpp', visualizer: 'arrayrep', controls: 'arrayrep' },
            { id: 'tree-reconstruct', title: 'Reconstruct Tree', file: 'tree_reconstruct.cpp', visualizer: 'reconstruct', controls: 'reconstruct' },
            { id: 'game-tree', title: 'Game Tree (Minimax / α-β)', file: 'game_tree.cpp', visualizer: 'gametree', controls: 'gametree' },
        ],
    },
    {
        id: 'graphs',
        title: 'Graphs',
        methods: [
            { id: 'graph', title: 'Undirected Graph', file: 'graph.cpp', visualizer: 'graph', controls: 'graph' },
            { id: 'graph-adjlist', title: 'Adjacency List', file: 'graph_adjlist.cpp', visualizer: 'graph', controls: 'graph' },
            { id: 'graph-traversal', title: 'BFS vs DFS (Dual-Pane)', file: 'graph_traversal.cpp', visualizer: 'graph-dual', controls: 'graph-traversal' },
            { id: 'graph-bfs', title: 'Breadth-First Search', file: 'graph_bfs.cpp', visualizer: 'graph', controls: 'graph' },
            { id: 'graph-dfs', title: 'Depth-First Search', file: 'graph_dfs.cpp', visualizer: 'graph', controls: 'graph' },
            { id: 'graph-kruskal', title: 'Kruskal MST', file: 'graph_kruskal.cpp', visualizer: 'graph', controls: 'graph' },
            { id: 'graph-dijkstra', title: 'Dijkstra (Shortest Path)', file: 'graph_dijkstra.cpp', visualizer: 'graph', controls: 'graph' },
            { id: 'graph-topo', title: 'Topological Sort', file: 'graph_topo.cpp', visualizer: 'graph', controls: 'graph' },
            { id: 'graph-prim', title: "Prim's MST", file: 'graph_prim.cpp', visualizer: 'graph-step', controls: 'graph-step' },
            { id: 'graph-bellman-ford', title: 'Bellman-Ford', file: 'graph_bellman_ford.cpp', visualizer: 'graph-step', controls: 'graph-step' },
            { id: 'graph-floyd-warshall', title: 'Floyd-Warshall', file: 'graph_floyd_warshall.cpp', visualizer: 'matrix', controls: 'matrix' },
            { id: 'graph-aoe', title: 'AOE / Critical Path', file: 'graph_aoe.cpp', visualizer: 'aoe', controls: 'aoe' },
        ],
    },
    {
        id: 'hash',
        title: 'Hash & Probabilistic',
        methods: [
            { id: 'hash-chain', title: 'Hash Chaining', file: 'hash_chaining.cpp', visualizer: 'hash', controls: 'hash' },
            { id: 'hash-open', title: 'Open Addressing', file: 'hash_open_address.cpp', visualizer: 'hash', controls: 'hash' },
            { id: 'hash-bucket', title: 'Bucketing', file: 'hash_bucket.cpp', visualizer: 'hash', controls: 'hash' },
            { id: 'bloom-filter', title: 'Bloom Filter', file: 'bloom_filter.cpp', visualizer: 'bloom', controls: 'bloom' },
            { id: 'skip-list', title: 'Skip List', file: 'skip_list.cpp', visualizer: 'skiplist', controls: 'skiplist' },
            { id: 'count-min-sketch', title: 'Count-Min Sketch', file: 'count_min_sketch.cpp', visualizer: 'cms', controls: 'cms' },
            { id: 'cache-lru', title: 'LRU Cache', file: 'lru_cache.cpp', visualizer: 'lru', controls: 'lru' },
        ],
    },
    {
        id: 'heaps',
        title: 'Heaps / Priority Queues',
        methods: [
            { id: 'heap-binary', title: 'Binary Heap', file: 'heap_binary.cpp', visualizer: 'heap', controls: 'heap' },
            { id: 'heap-binomial', title: 'Binomial Heap', file: 'heap_binomial.cpp', visualizer: 'heap', controls: 'heap' },
            { id: 'heap-fibonacci', title: 'Fibonacci Heap', file: 'heap_fibonacci.cpp', visualizer: 'heap', controls: 'heap' },
            { id: 'heap-leftist', title: 'Leftist Heap', file: 'heap_leftist.cpp', visualizer: 'heap', controls: 'heap' },
            { id: 'heap-skew', title: 'Skew Heap', file: 'heap_skew.cpp', visualizer: 'heap', controls: 'heap' },
            { id: 'heap-dary', title: '4-ary Heap', file: 'heap_dary.cpp', visualizer: 'heap', controls: 'heap' },
            { id: 'heap-pairing', title: 'Pairing Heap', file: 'heap_pairing.cpp', visualizer: 'heap', controls: 'heap' },
        ],
    },
    {
        id: 'sorting',
        title: 'Sorting',
        methods: [
            { id: 'sort-bubble', title: 'Bubble Sort', file: 'sort_bubble.cpp', visualizer: 'sort', controls: 'sort' },
            { id: 'sort-select', title: 'Selection Sort', file: 'sort_selection.cpp', visualizer: 'sort', controls: 'sort' },
            { id: 'sort-insert', title: 'Insertion Sort', file: 'sort_insertion.cpp', visualizer: 'sort', controls: 'sort' },
            { id: 'sort-quick', title: 'Quick Sort', file: 'sort_quick.cpp', visualizer: 'sort', controls: 'sort' },
            { id: 'sort-merge', title: 'Merge Sort', file: 'sort_merge.cpp', visualizer: 'sort', controls: 'sort' },
            { id: 'sort-shell', title: 'Shell Sort', file: 'sort_shell.cpp', visualizer: 'sort', controls: 'sort' },
            { id: 'sort-bucket', title: 'Bucket Sort', file: 'sort_bucket.cpp', visualizer: 'sort', controls: 'sort' },
            { id: 'sort-count', title: 'Counting Sort', file: 'sort_counting.cpp', visualizer: 'sort', controls: 'sort' },
            { id: 'sort-radix', title: 'Radix Sort', file: 'sort_radix.cpp', visualizer: 'sort', controls: 'sort' },
            { id: 'sort-heap', title: 'Heap Sort', file: 'sort_heap.cpp', visualizer: 'sort', controls: 'sort' },
            { id: 'sort-shaker', title: 'Shaker Sort', file: 'sort_shaker.cpp', visualizer: 'sort', controls: 'sort' },
            { id: 'sort-external', title: 'External Merge Sort', file: 'sort_external.cpp', visualizer: 'extsort', controls: 'extsort' },
            { id: 'sort-polyphase', title: 'Polyphase Merge (Tapes)', file: 'sort_polyphase.cpp', visualizer: 'polyphase', controls: 'polyphase' },
        ],
    },
    {
        id: 'searching',
        title: 'Searching & String Matching',
        methods: [
            { id: 'search-linear', title: 'Linear Search', file: 'search_linear.cpp', visualizer: 'search', controls: 'search' },
            { id: 'search-binary', title: 'Binary Search', file: 'search_binary.cpp', visualizer: 'search', controls: 'search' },
            { id: 'search-kmp', title: 'KMP (Knuth-Morris-Pratt)', file: 'search_kmp.cpp', visualizer: 'string-search', controls: 'string-search' },
            { id: 'search-bm', title: 'Boyer-Moore', file: 'search_bm.cpp', visualizer: 'string-search', controls: 'string-search' },
            { id: 'search-rk', title: 'Rabin-Karp', file: 'search_rk.cpp', visualizer: 'string-search', controls: 'string-search' },
            { id: 'search-strcompare', title: 'String Matching Compared', file: 'search_strcompare.cpp', visualizer: 'string-compare', controls: 'string-compare' },
            { id: 'search-zalgo', title: 'Z-Algorithm', file: 'search_zalgo.cpp', visualizer: 'string-search', controls: 'string-search' },
            { id: 'search-aho', title: 'Aho-Corasick', file: 'search_aho.cpp', visualizer: 'aho-corasick', controls: 'aho-corasick' },
            { id: 'search-fibonacci', title: 'Fibonacci Search', file: 'search_fibonacci.cpp', visualizer: 'fibsearch', controls: 'fibsearch' },
            { id: 'search-interpolation', title: 'Interpolation Search', file: 'search_interpolation.cpp', visualizer: 'interpsearch', controls: 'interpsearch' },
        ],
    },
    {
        id: 'files',
        title: 'File Structures',
        methods: [
            { id: 'file-isam', title: 'ISAM (Indexed Sequential)', file: 'file_isam.cpp', visualizer: 'isam', controls: 'isam' },
            { id: 'file-inverted', title: 'Inverted Index', file: 'file_inverted.cpp', visualizer: 'inverted', controls: 'inverted' },
        ],
    },
    {
        id: 'memory',
        title: 'Memory / GC',
        methods: [
            { id: 'gc-memory', title: 'Dynamic Storage / GC', file: 'gc_memory.cpp', visualizer: 'gcmem', controls: 'gcmem' },
        ],
    },
    {
        id: 'recursion',
        title: 'Recursion',
        methods: [
            { id: 'recursion', title: 'Recursion (Call Tree & Stack)', file: 'recursion.cpp', visualizer: 'recursion', controls: 'recursion' },
        ],
    },
    {
        id: 'oop',
        title: 'OOP Concepts',
        methods: [
            { id: 'oop-inheritance', title: 'Class Inheritance', file: 'oop_inheritance.cpp', visualizer: 'oop', controls: 'oop' },
            { id: 'oop-polymorphism', title: 'Polymorphism (Virtual)', file: 'oop_polymorphism.cpp', visualizer: 'oop', controls: 'oop' },
            { id: 'oop-encapsulation', title: 'Encapsulation & Access', file: 'oop_encapsulation.cpp', visualizer: 'oop', controls: 'oop' },
            { id: 'oop-abstraction', title: 'Abstraction (Abstract Classes)', file: 'oop_abstraction.cpp', visualizer: 'oop', controls: 'oop' },
            { id: 'oop-adhoc', title: 'Ad-hoc Polymorphism (Overloading)', file: 'oop_adhoc.cpp', visualizer: 'oop', controls: 'oop' },
            { id: 'oop-templates', title: 'Parametric Polymorphism (Templates)', file: 'oop_templates.cpp', visualizer: 'oop', controls: 'oop' },
        ],
    },
    {
        id: 'patterns-creational',
        title: 'Creational',
        parent: 'patterns',
        parentTitle: 'Design Patterns',
        methods: [
            { id: 'pattern-singleton', title: 'Singleton', file: 'pattern_singleton.cpp', visualizer: 'pattern', controls: 'pattern' },
            { id: 'pattern-factory', title: 'Factory Method', file: 'pattern_factory.cpp', visualizer: 'pattern', controls: 'pattern' },
        ],
    },
    {
        id: 'patterns-structural',
        title: 'Structural',
        parent: 'patterns',
        parentTitle: 'Design Patterns',
        methods: [
            { id: 'pattern-adapter', title: 'Adapter', file: 'pattern_adapter.cpp', visualizer: 'pattern', controls: 'pattern' },
            { id: 'pattern-decorator', title: 'Decorator', file: 'pattern_decorator.cpp', visualizer: 'pattern', controls: 'pattern' },
        ],
    },
    {
        id: 'patterns-behavioral',
        title: 'Behavioral',
        parent: 'patterns',
        parentTitle: 'Design Patterns',
        methods: [
            { id: 'pattern-observer', title: 'Observer', file: 'pattern_observer.cpp', visualizer: 'pattern', controls: 'pattern' },
            { id: 'pattern-strategy', title: 'Strategy', file: 'pattern_strategy.cpp', visualizer: 'pattern', controls: 'pattern' },
        ],
    },
    {
        id: 'patterns-architectural',
        title: 'Architectural',
        parent: 'patterns',
        parentTitle: 'Design Patterns',
        methods: [
            { id: 'pattern-mvc', title: 'MVC (Model-View-Controller)', file: 'pattern_mvc.cpp', visualizer: 'pattern', controls: 'pattern' },
            { id: 'pattern-layered', title: 'Layered Architecture', file: 'pattern_layered.cpp', visualizer: 'pattern', controls: 'pattern' },
            { id: 'pattern-pubsub', title: 'Publish-Subscribe', file: 'pattern_pubsub.cpp', visualizer: 'pattern', controls: 'pattern' },
            { id: 'pattern-pipefilter', title: 'Pipe-and-Filter', file: 'pattern_pipefilter.cpp', visualizer: 'pattern', controls: 'pattern' },
            { id: 'pattern-di', title: 'Dependency Injection', file: 'pattern_di.cpp', visualizer: 'pattern', controls: 'pattern' },
        ],
    },
    {
        id: 'nano-llm',
        title: 'nano-LLM',
        methods: [
            { id: 'nano-bpe-encode', title: 'BPE Encode (trie)', file: 'nano-bpe-encode.cpp', visualizer: 'bpeEncode', controls: 'bpeEncode' },
            { id: 'nano-compute-graph', title: 'Compute Graph (DAG)', file: 'nano-compute-graph.cpp', visualizer: 'computeGraph', controls: 'computeGraph' },
            { id: 'nano-bpe-train', title: 'BPE Train (list+heap)', file: 'nano-bpe-train.cpp', visualizer: 'bpeTrain', controls: 'bpeTrain' },
            { id: 'nano-ngram-next', title: 'n-gram Sampling (hash)', file: 'nano-ngram-next.cpp', visualizer: 'ngramNext', controls: 'ngramNext' },
        ],
    },
];

function getMethodGroupById(groupId) {
    return METHOD_GROUPS.find((group) => group.id === groupId) || METHOD_GROUPS[0];
}

function getMethodGroupForMode(mode) {
    return METHOD_GROUPS.find((group) => group.methods.some((method) => method.id === mode)) || METHOD_GROUPS[0];
}

function getCodeForMethod(methodId) {
    const b = (typeof window !== 'undefined' && window.VizRegistry) ? window.VizRegistry.behavior(methodId) : null;
    if (b && b.code) return b.code();
    const codeByMethod = {
        'stack-array': codeArray,
        'stack-list': codeLinkedList,
        queue: codeQueue,
        'list-array': codeListArray,
        'list-linked': codeListLinked,
        'deque': codeDeque,
        'expr-infix-postfix': codeExprInfixPostfix,
        'maze-stack': codeMazeStack,
        'list-doubly': codeListDoubly,
        'list-equivalence': codeListEquivalence,
        'tree-bst': codeTreeBST,
        'tree-avl': codeTreeAVL,
        'tree-rb': codeTreeRB,
        'tree-splay': codeTreeSplay,
        'tree-trie': codeTreeTrie,
        'tree-radix': codeTreeRadix,
        'tree-ternary': codeTreeTST,
        'tree-btree': codeTreeBTree,
        'tree-bplus': codeTreeBPlus,
        'tree-dsu': codeTreeDSU,
        'tree-segment': codeTreeSegment,
        'tree-fenwick': codeTreeFenwick,
        'tree-traversal': codeTreeTraversal,
        'huffman': codeHuffman,
        'matrix-sparse': codeMatrixSparse,
        'matrix-sparse-list': codeMatrixSparseList,
        'poly-padd': codePolyPadd,
        'magic-square': codeMagicSquare,
        'magic-latin': codeMagicLatin,
        'magic-torus': codeMagicTorus,
        'magic-formula': codeMagicFormula,
        'magic-symmetry': codeMagicSymmetry,
        'tree-obst': codeTreeObst,
        'tree-threaded': codeTreeThreaded,
        'tree-mway': codeTreeMway,
        'tree-expression': codeTreeExpression,
        'tree-general-binary': codeTreeGeneralBinary,
        'game-tree': codeGameTree,
        'sort-external': codeSortExternal,
        'gc-memory': codeGcMemory,
        'recursion': codeRecursion,
        'file-isam': codeFileIsam,
        'file-inverted': codeFileInverted,
        'sort-polyphase': codeSortPolyphase,
        graph: codeGraph,
        'graph-adjlist': codeGraphAdjlist,
        'graph-traversal': codeGraphTraversal,
        'graph-bfs': codeGraphBFS,
        'graph-dfs': codeGraphDFS,
        'graph-kruskal': codeGraphKruskal,
        'graph-dijkstra': codeGraphDijkstra,
        'graph-topo': codeGraphTopo,
        'graph-prim': codeGraphPrim,
        'graph-bellman-ford': codeGraphBellmanFord,
        'graph-floyd-warshall': codeGraphFloydWarshall,
        'graph-aoe': codeGraphAoe,
        'hash-chain': codeHashChain,
        'hash-open': codeHashOpen,
        'hash-bucket': codeHashBucket,
        'bloom-filter': codeBloomFilter,
        'skip-list': codeSkipList,
        'count-min-sketch': codeCountMinSketch,
        'cache-lru': codeLruCache,
        'nano-bpe-encode': codeNanoBpeEncode,
        'nano-compute-graph': codeNanoComputeGraph,
        'nano-bpe-train': codeNanoBpeTrain,
        'nano-ngram-next': codeNanoNgramNext,
        'search-linear': codeSearchLinear,
        'search-binary': codeSearchBinary,
        'search-kmp': codeSearchKMP,
        'search-bm': codeSearchBM,
        'search-rk': codeSearchRK,
        'search-strcompare': codeSearchStrCompare,
        'search-zalgo': codeSearchZAlgo,
        'search-aho': codeSearchAho,
        'search-fibonacci': codeSearchFibonacci,
        'search-interpolation': codeSearchInterpolation,
        'sort-bubble': codeSortBubble,
        'sort-select': codeSortSelect,
        'sort-insert': codeSortInsert,
        'sort-quick': codeSortQuick,
        'sort-merge': codeSortMerge,
        'sort-shell': codeSortShell,
        'sort-bucket': codeSortBucket,
        'sort-count': codeSortCounting,
        'sort-radix': codeSortRadix,
        'sort-heap': codeSortHeap,
        'sort-shaker': codeSortShaker,
        'heap-binary': codeHeapBinary,
        'heap-binomial': codeHeapBinomial,
        'heap-fibonacci': codeHeapFibonacci,
        'heap-leftist': codeHeapLeftist,
        'heap-skew': codeHeapSkew,
        'heap-dary': codeHeapDary,
        'heap-pairing': codeHeapPairing,
        'oop-inheritance': codeOOPInheritance,
        'oop-polymorphism': codeOOPPolymorphism,
        'oop-encapsulation': codeOOPEncapsulation,
        'oop-abstraction': codeOOPAbstraction,
        'oop-adhoc': codeOOPAdhoc,
        'oop-templates': codeOOPTemplates,
        'pattern-singleton': codePatternSingleton,
        'pattern-factory': codePatternFactory,
        'pattern-adapter': codePatternAdapter,
        'pattern-decorator': codePatternDecorator,
        'pattern-observer': codePatternObserver,
        'pattern-strategy': codePatternStrategy,
        'pattern-mvc': codePatternMVC,
        'pattern-layered': codePatternLayered,
        'pattern-pubsub': codePatternPubSub,
        'pattern-pipefilter': codePatternPipeFilter,
        'pattern-di': codePatternDI,
    };
    return codeByMethod[methodId] || '// Source code pending.';
}

// MAIN DOM INTERACTION
document.addEventListener('DOMContentLoaded', () => {
    if (window.I18N) {
        window.I18N.applyTranslations(document);
    }

    const categoryNav = document.getElementById('category-nav');
    const methodSections = document.getElementById('method-sections');
    const slideViewer = document.getElementById('slide-viewer');
    const slideViewerTitle = document.getElementById('slide-viewer-title');
    const slideViewerProgress = document.getElementById('slide-viewer-progress');
    const slideViewerBody = document.getElementById('slide-viewer-body');
    const slideViewerNotes = slideViewer ? slideViewer.querySelector('.slideviewer-notes') : null;
    const slideNotesToggle = slideViewer ? slideViewer.querySelector('.slideviewer-notes-toggle') : null;
    if (slideViewerNotes) {
        slideViewerNotes.setAttribute('aria-label', 'Slide speaker notes');
        slideViewerNotes.setAttribute('role', 'region');
    }
    const slidePrev = document.getElementById('slide-prev');
    const slideNext = document.getElementById('slide-next');
    const slideCloseButtons = document.querySelectorAll('[data-slide-close]');
    const runtimeControls = document.querySelector('.visualization-panel .controls');
    const runtimeVisualizer = document.querySelector('.stack-container-wrapper');
    
    const categoryButtons = new Map();
    const subTabButtons = new Map();
    const methodDropdownButtons = new Map();
    const overviewPillButtons = new Map();
    let dropdownGlobalListenersRegistered = false;

    const overviewSection = document.getElementById('overview-section');
    const overviewGrid = document.querySelector('[data-testid="overview-grid"]');

    function isOverviewVisible() {
        return overviewSection && !overviewSection.hidden;
    }

    function renderOverview() {
        if (!overviewGrid) return;
        overviewGrid.innerHTML = '';
        const renderedParents = new Set();
        METHOD_GROUPS.forEach((group) => {
            let displayGroupId;
            let methods;
            if (group.parent) {
                if (renderedParents.has(group.parent)) return;
                renderedParents.add(group.parent);
                displayGroupId = group.parent;
                methods = METHOD_GROUPS
                    .filter((g) => g.parent === group.parent)
                    .flatMap((g) => g.methods.map((m) => ({ id: m.id, _groupId: g.id })));
            } else {
                displayGroupId = group.id;
                methods = group.methods.map((m) => ({ id: m.id, _groupId: group.id }));
            }
            const card = document.createElement('div');
            card.className = 'overview-category';
            card.dataset.group = displayGroupId;
            const header = document.createElement('h3');
            header.className = 'overview-category-title';
            header.textContent = t('group.' + displayGroupId);
            card.appendChild(header);
            const tiles = document.createElement('div');
            tiles.className = 'overview-methods';
            methods.forEach((m) => {
                const tile = document.createElement('button');
                tile.type = 'button';
                tile.className = 'overview-tile';
                tile.dataset.methodId = m.id;
                tile.textContent = t('method.' + m.id);
                tile.addEventListener('click', () => {
                    hideOverview();
                    setActiveCategory(m._groupId);
                    selectMethod(m.id);
                    scrollToCategory(m._groupId);
                });
                tiles.appendChild(tile);
            });
            card.appendChild(tiles);
            overviewGrid.appendChild(card);
        });
    }

    function showOverview() {
        if (!overviewSection) return;
        if (methodSections) methodSections.classList.add('is-collapsed');
        overviewSection.hidden = false;
        overviewPillButtons.forEach((b) => {
            b.classList.add('active');
            b.setAttribute('aria-current', 'true');
        });
        categoryButtons.forEach((b) => {
            b.classList.remove('active');
            b.setAttribute('aria-current', 'false');
        });
        subTabButtons.forEach((b) => {
            b.classList.remove('active');
            b.setAttribute('aria-current', 'false');
        });
        const subTabRow = categoryNav && categoryNav.querySelector('.category-subtab-row');
        if (subTabRow) subTabRow.classList.remove('visible');
        renderOverview();
        // Scroll so the user lands at the top of the overview, not mid-page.
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function hideOverview() {
        if (!overviewSection || overviewSection.hidden) return;
        overviewSection.hidden = true;
        if (methodSections) methodSections.classList.remove('is-collapsed');
        overviewPillButtons.forEach((b) => {
            b.classList.remove('active');
            b.setAttribute('aria-current', 'false');
        });
    }

    function setActiveCategory(groupId) {
        const group = getMethodGroupById(groupId);
        const parentId = group && group.parent;
        categoryButtons.forEach((button, id) => {
            const isActive = id === groupId || id === parentId;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-current', isActive ? 'true' : 'false');
        });
        subTabButtons.forEach((button, id) => {
            const isActive = id === groupId;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-current', isActive ? 'true' : 'false');
        });
        const subTabRow = categoryNav && categoryNav.querySelector('.category-subtab-row');
        if (subTabRow) subTabRow.classList.toggle('visible', !!parentId);
    }

    function expandModeGroup(groupId) {
        setActiveCategory(groupId);
        renderMethodSections(groupId);
    }

    function getEscapedCode(methodId) {
        return getCodeForMethod(methodId)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    function bindZoomControls(section) {
        const scaled = section.querySelector('.viz-body-scaled');
        const controls = section.querySelector('.viz-zoom-controls');
        const visualHost = section.querySelector('.method-section-visual');
        if (!scaled || !controls || !visualHost) return;
        const resetBtn = controls.querySelector('[data-zoom="reset"]');
        const inBtn = controls.querySelector('[data-zoom="in"]');
        const outBtn = controls.querySelector('[data-zoom="out"]');
        let zoom = 1.0;
        function applyZoom(z) {
            zoom = Math.max(0.5, Math.min(2.0, Math.round(z * 100) / 100));
            scaled.style.setProperty('--viz-zoom', String(zoom));
            resetBtn.textContent = Math.round(zoom * 100) + '%';
        }
        inBtn.addEventListener('click', () => applyZoom(zoom + 0.1));
        outBtn.addEventListener('click', () => applyZoom(zoom - 0.1));
        resetBtn.addEventListener('click', () => applyZoom(1.0));

        // Zoom is controlled exclusively via the +/−/reset buttons above.
        // Gesture-based zoom (mouse wheel + multi-touch pinch) is intentionally NOT bound:
        // on a Mac trackpad, two-finger scroll and pinch both arrive as `wheel` events, which
        // made the visualization zoom during ordinary scrolling. Keeping zoom button-only avoids
        // that and lets the page scroll normally over the visualizer.
        applyZoom(1.0);
    }

    function mountActiveRuntime(section) {
        const visualHost = section.querySelector('.method-section-visual');
        if (!visualHost) return;
        if (!runtimeControls || !runtimeVisualizer) return;
        visualHost.classList.add('method-section-visual-live');
        visualHost.setAttribute('aria-label', 'Active interactive visualization');
        visualHost.innerHTML = '';

        const scaled = document.createElement('div');
        scaled.className = 'viz-body-scaled';
        scaled.appendChild(runtimeControls);
        scaled.appendChild(runtimeVisualizer);
        visualHost.appendChild(scaled);

        bindZoomControls(section);
    }

    function renderMethodSections(groupId) {
        if (!methodSections) return;
        const group = getMethodGroupById(groupId);
        const runtimeFragment = document.createDocumentFragment();
        if (runtimeControls?.parentNode) runtimeFragment.appendChild(runtimeControls);
        if (runtimeVisualizer?.parentNode) runtimeFragment.appendChild(runtimeVisualizer);
        methodSections.innerHTML = '';
        const activeMethodId = arguments[1] || (
            group.methods.some((method) => method.id === visualizerRuntime.activeMode)
                ? visualizerRuntime.activeMode
                : group.methods[0]?.id
        );
        const method = group.methods.find((candidate) => candidate.id === activeMethodId) || group.methods[0];
        if (!method) return;

        const heading = document.createElement('div');
        heading.className = 'method-sections-heading';
        const titleGroup = document.createElement('div');
        titleGroup.className = 'method-sections-title';
        const titleRow = document.createElement('div');
        titleRow.className = 'method-title-row';
        const title = document.createElement('h2');
        const groupLabel = t('group.' + group.id);
        const methodLabel = t('method.' + method.id);
        title.textContent = groupLabel;
        const methodPicker = document.createElement('span');
        methodPicker.className = 'method-heading-title';
        methodPicker.dataset.testid = 'method-heading-title';
        methodPicker.textContent = methodLabel;
        const countText = document.createElement('p');
        countText.textContent = t('app.methods-available', { count: group.methods.length });
        titleRow.appendChild(title);
        titleRow.appendChild(methodPicker);
        titleGroup.appendChild(titleRow);
        titleGroup.appendChild(countText);
        heading.appendChild(titleGroup);
        methodSections.appendChild(heading);

        if (visualizerRuntime.activeMode !== method.id) visualizerRuntime.setMode(method.id);
        const section = document.createElement('section');
        section.className = 'method-section-card active';
        section.dataset.methodSection = method.id;
        section.dataset.runtimeState = 'active';
        // Methods flagged codeDrawer keep the C++ source in a collapsed side
        // drawer (opened via a header button) so the visualization gets the
        // full card width. Everyone else keeps the side-by-side grid.
        const useCodeDrawer = !!method.codeDrawer;
        const codePanelHtml = `
                <div class="code-panel" data-language="cpp">
                    <div class="code-panel-header">
                        <span class="code-panel-dots" aria-hidden="true"><i></i><i></i><i></i></span>
                        <span class="code-panel-filename">${method.file}</span>
                        <button type="button" class="code-panel-copy" data-code-copy aria-label="Copy code">⧉ Copy</button>
                    </div>
                    <pre class="code-panel-body"><code class="language-cpp">${getEscapedCode(method.id)}</code></pre>
                </div>`;
        section.innerHTML = `
            <div class="method-section-header">
                <div>
                    <span class="method-section-kicker">${groupLabel}</span>
                    <h3>${methodLabel}</h3>
                </div>
                <div class="method-section-actions">
                    <div class="viz-zoom-controls" role="toolbar" aria-label="Zoom controls">
                        <button type="button" data-zoom="out" aria-label="Zoom out">−</button>
                        <button type="button" data-zoom="reset" aria-label="Reset zoom">100%</button>
                        <button type="button" data-zoom="in" aria-label="Zoom in">+</button>
                    </div>
                    ${useCodeDrawer ? `<button type="button" class="btn secondary code-drawer-toggle" data-testid="code-drawer-toggle" aria-expanded="false" aria-haspopup="dialog">&lt;/&gt; ${method.file}</button>` : ''}
                    <button type="button" class="btn secondary method-slides-btn" data-method="${method.id}">Slides</button>
                </div>
            </div>
            <div class="method-section-grid${useCodeDrawer ? ' method-section-grid--full' : ''}">
                <div class="method-section-visual" aria-label="${methodLabel} visualization shell">
                    <span>${method.visualizer}</span>
                    <strong>${methodLabel}</strong>
                </div>
                ${useCodeDrawer ? '' : codePanelHtml}
            </div>
            ${useCodeDrawer ? `
            <aside class="code-drawer" data-testid="code-drawer" hidden>
                <button type="button" class="code-drawer-backdrop" data-code-drawer-close aria-label="Close code panel"></button>
                <section class="code-drawer-panel" role="dialog" aria-modal="true" aria-label="${method.file}" tabindex="-1">
                    <header class="code-drawer-header">
                        <h3>${method.file}</h3>
                        <button type="button" class="code-drawer-close" data-code-drawer-close aria-label="Close">×</button>
                    </header>
                    <div class="code-drawer-body">${codePanelHtml}</div>
                </section>
            </aside>` : ''}
        `;
        section.querySelector('.method-slides-btn').addEventListener('click', () => openSlides(method.id));
        const codeDrawerToggle = section.querySelector('.code-drawer-toggle');
        if (codeDrawerToggle) {
            const drawer = section.querySelector('.code-drawer');
            const drawerPanel = drawer.querySelector('.code-drawer-panel');
            const onDrawerKeydown = (e) => { if (e.key === 'Escape') closeDrawer(); };
            const openDrawer = () => {
                drawer.hidden = false;
                drawer.classList.add('open');
                codeDrawerToggle.setAttribute('aria-expanded', 'true');
                drawerPanel.focus();
                document.addEventListener('keydown', onDrawerKeydown);
            };
            const closeDrawer = () => {
                drawer.hidden = true;
                drawer.classList.remove('open');
                codeDrawerToggle.setAttribute('aria-expanded', 'false');
                document.removeEventListener('keydown', onDrawerKeydown);
            };
            codeDrawerToggle.addEventListener('click', openDrawer);
            drawer.querySelectorAll('[data-code-drawer-close]').forEach((btn) => btn.addEventListener('click', closeDrawer));
        }
        methodSections.appendChild(section);
        mountActiveRuntime(section);
        if (window.Prism) Prism.highlightAllUnder(section);
        // Wrap each line in .code-line so the CSS line-number gutter renders.
        section.querySelectorAll('.code-panel-body > code').forEach((codeEl) => {
          const lines = codeEl.innerHTML.split('\n');
          codeEl.innerHTML = lines.map((line) =>
            '<span class="code-line">' + line + '</span>'
          ).join('\n');
        });
    }

    function selectMethod(methodId) {
        switchMode(methodId);
        const want = '#m=' + methodId;
        if (window.location.hash !== want) {
            history.replaceState(null, '', want);
        }
    }

    // Deck list = [{ id, kind: 'public'|'private', titleEn, titleZh, slides: [{title,body}], access }]
    // Single-deck case (deckList.length === 1) hides the picker bar — behaviour
    // identical to the pre-private-slides era.
    let slideDeckList = [];
    let slideDeckIndex = 0;
    let slideIndex = 0;
    let slideMethodId = null;
    let slidePrivateSignInNeeded = false;
    const slideLangToggle = document.getElementById('slide-lang-toggle');

    function getMethodById(methodId) {
        for (const group of METHOD_GROUPS) {
            const method = group.methods.find((candidate) => candidate.id === methodId);
            if (method) return method;
        }
        return null;
    }

    function getPrivateContext() {
        const cfg = window.dsvisualCloudConfig;
        const raw = (cfg && cfg.drive && cfg.drive.privateSlidesFolderId) || '';
        // Defensive: treat literal __…__ placeholder (inject-env didn't run, or env unset)
        // as "not configured" — feature disabled, no Drive calls.
        const folderId = /^__.+__$/.test(raw) ? '' : raw;
        if (!folderId) return { folderId: '', token: null };
        const client = window.cloudClient ? window.cloudClient() : null;
        const token = client ? client.getAccessToken() : null;
        return { folderId: folderId, token: token };
    }

    function publicSlidesFor(methodId) {
        const lang = window.I18N ? window.I18N.getCurrentLanguage() : 'en';
        const entry = window.SLIDES_RENDERED && window.SLIDES_RENDERED[methodId];
        if (!entry || !entry.slides[lang] || entry.slides[lang].length === 0) {
            return [{ title: t('method.' + methodId) || methodId,
                      body: '<p>' + t('slide.no-slides') + '</p>' }];
        }
        return entry.slides[lang];
    }

    function publicDeckFor(methodId) {
        // Both titleEn/titleZh get the current-language value; openSlides()
        // re-rebuilds the deck list when language changes, so the picker
        // re-renders with the correct title for the new language.
        const title = t('method.' + methodId) || methodId;
        return {
            id: methodId + '-public',
            kind: 'public',
            titleEn: title,
            titleZh: title,
            slides: publicSlidesFor(methodId),
            access: 'ok',
        };
    }

    function privateDeckToViewerShape(d) {
        const lang = window.I18N ? window.I18N.getCurrentLanguage() : 'en';
        const md = (lang === 'zh') ? d.zh : d.en;
        const parsed = (window.slideMarkdown && md)
            ? window.slideMarkdown.parseDeck(md) : { slides: [] };
        const slides = parsed.slides.map((s) => ({ title: '', body: s.html }));
        if (slides.length === 0) {
            slides.push({ title: '', body: '<p>' + t('slide.private-no-access') + '</p>' });
        }
        return {
            id: d.id,
            kind: 'private',
            titleEn: d.titleEn,
            titleZh: d.titleZh,
            slides: slides,
            access: d.access,
        };
    }

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, (c) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
        }[c]));
    }

    function deckTitle(deck) {
        const lang = window.I18N ? window.I18N.getCurrentLanguage() : 'en';
        const base = (lang === 'zh') ? deck.titleZh : deck.titleEn;
        return deck.kind === 'private' ? '🔒 ' + base : base;
    }

    function renderDeckBar() {
        if (slideDeckList.length <= 1 && !slidePrivateSignInNeeded) return '';
        const items = slideDeckList.slice();
        if (slidePrivateSignInNeeded) items.push({ __signInRow: true });
        const html = items.map((d, i) => {
            if (d.__signInRow) {
                return '<button type="button" class="slideviewer-deck-btn slideviewer-deck-btn--signin"' +
                       ' data-testid="slideviewer-signin-row">' + t('slide.private-signin-row') + '</button>';
            }
            const classes = ['slideviewer-deck-btn'];
            if (i === slideDeckIndex) classes.push('slideviewer-deck-btn--active');
            if (d.kind === 'private') classes.push('slideviewer-deck-btn--private');
            if (d.kind === 'private' && d.access === 'denied') classes.push('slideviewer-deck-btn--denied');
            if (d.kind === 'private' && d.access === 'error')  classes.push('slideviewer-deck-btn--error');
            const disabled = (d.kind === 'private' && (d.access === 'denied' || d.access === 'error'));
            const suffix =
                (d.kind === 'private' && d.access === 'denied')
                    ? ' <span class="slideviewer-deck-btn__sub">— ' + t('slide.private-no-access') + '</span>'
                : (d.kind === 'private' && d.access === 'error')
                    ? ' <span class="slideviewer-deck-btn__sub">— ' + t('slide.private-fetch-error') + '</span>'
                : '';
            return '<button type="button" class="' + classes.join(' ') + '"' +
                   ' data-deck-index="' + i + '" data-testid="slide-deck-' + i + '"' +
                   (disabled ? ' disabled' : '') + '>' +
                   deckTitle(d) + suffix + '</button>';
        }).join('');
        return '<div class="slideviewer-decks" data-testid="slideviewer-decks">' + html + '</div>';
    }

    function renderSlide() {
        if (!slideViewer || slideDeckList.length === 0) return;
        const deck = slideDeckList[slideDeckIndex];
        const slide = deck.slides[slideIndex] || { title: '', body: '', notes: '' };

        // Bar shows deck name as small label (per-slide title goes in body below).
        slideViewerTitle.textContent = deckTitle(deck);

        // Progress / counter — now in foot meta
        slideViewerProgress.textContent = t('slide.progress', {
            n: slideIndex + 1,
            total: deck.slides.length,
        });

        // Deck bar — rendered into bar between title and lang-toggle.
        // Single-deck case: omit (title stands alone, matching rdvisual).
        const bar = slideViewer.querySelector('.slideviewer-bar');
        const existingDecks = bar.querySelector('.slideviewer-decks');
        if (existingDecks) existingDecks.remove();
        if (slideDeckList.length > 1 || slidePrivateSignInNeeded) {
            const decksHtml = renderDeckBar();
            // renderDeckBar returns '<div class="slideviewer-decks">…</div>'; insert
            // after title so order is: title, decks, lang-toggle, close.
            slideViewerTitle.insertAdjacentHTML('afterend', decksHtml);
            bar.querySelectorAll('[data-deck-index]').forEach((btn) => {
                btn.addEventListener('click', () => {
                    const idx = parseInt(btn.getAttribute('data-deck-index'), 10);
                    if (slideDeckList[idx] &&
                        !(slideDeckList[idx].kind === 'private' &&
                          (slideDeckList[idx].access === 'denied' || slideDeckList[idx].access === 'error'))) {
                        slideDeckIndex = idx;
                        slideIndex = 0;
                        renderSlide();
                    }
                });
            });
            const signinRow = bar.querySelector('[data-testid="slideviewer-signin-row"]');
            if (signinRow) {
                signinRow.addEventListener('click', () => {
                    closeSlides();
                    if (typeof window.openCloudDrawer === 'function') window.openCloudDrawer();
                });
            }
        }

        // Slide body — inject slide.title as <h1> if present (matches rdvisual
        // presentation style: title is large, in the slide content area).
        // Private Marp decks have title inline in slide.html, so slide.title is
        // undefined and no injection happens.
        const titleHtml = slide.title
            ? `<h1 class="slide-title">${escapeHtml(slide.title)}</h1>`
            : '';
        slideViewerBody.innerHTML = titleHtml + slide.body;
        slideViewerBody.scrollTop = 0;

        // Notes panel — show toggle if slide has notes; hide both panel and toggle if not.
        const hasNotes = Boolean(slide.notes && slide.notes.trim());
        if (hasNotes) {
            slideViewerNotes.textContent = slide.notes;
            slideNotesToggle.hidden = false;
            // Don't auto-open on slide change — respect prior toggle state.
            // Panel visibility tracked via slideViewerNotes.hidden.
        } else {
            slideViewerNotes.textContent = '';
            slideViewerNotes.hidden = true;
            slideNotesToggle.hidden = true;
        }

        slidePrev.disabled = slideIndex === 0;
        slideNext.disabled = slideIndex >= deck.slides.length - 1;
    }

    async function fetchAndMergePrivate(methodId) {
        const ctx = getPrivateContext();
        if (!ctx.folderId) { slidePrivateSignInNeeded = false; return; }
        if (!ctx.token) { slidePrivateSignInNeeded = true; return; }
        slidePrivateSignInNeeded = false;
        try {
            const all = await window.privateDecksClient.fetchPrivateDecks({
                accessToken: ctx.token, folderId: ctx.folderId,
            });
            const forThisMethod = all.filter((d) => d.method === methodId);
            if (forThisMethod.length === 0) return;
            // Append private decks (in cache order). Re-render if viewer still open.
            forThisMethod.forEach((d) => slideDeckList.push(privateDeckToViewerShape(d)));
            if (!slideViewer.hidden && slideMethodId === methodId) renderSlide();
        } catch (_) {
            // Silent — leave the picker as public-only.
        }
    }

    function openSlides(methodId) {
        slideMethodId = methodId;
        slideDeckList = [publicDeckFor(methodId)];
        slideDeckIndex = 0;
        slideIndex = 0;
        // Compute sign-in state synchronously so first paint is correct.
        const ctx = getPrivateContext();
        slidePrivateSignInNeeded = Boolean(ctx.folderId) && !ctx.token;
        if (slideViewerNotes) slideViewerNotes.hidden = true;
        renderSlide();
        slideViewer.hidden = false;
        slideViewer.classList.add('open');
        slideViewer.querySelector('.slideviewer-panel').focus();
        slideViewer.addEventListener('keydown', handleSlideKeydown);
        // Kick off async private-deck fetch + merge.
        if (ctx.folderId && ctx.token) {
            fetchAndMergePrivate(methodId);
        }
    }

    function closeSlides() {
        if (!slideViewer) return;
        slideViewer.hidden = true;
        slideViewer.classList.remove('open');
        slideViewer.removeEventListener('keydown', handleSlideKeydown);
    }

    function handleSlideKeydown(e) {
        const deck = slideDeckList[slideDeckIndex];
        if (!deck) return;
        if (e.key === 'Escape') {
            closeSlides();
        } else if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            if (slideIndex < deck.slides.length - 1) { slideIndex++; renderSlide(); }
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            if (slideIndex > 0) { slideIndex--; renderSlide(); }
        }
    }

    slideCloseButtons.forEach((button) => button.addEventListener('click', closeSlides));

    // Click anywhere on overlay background (but not the panel) closes the modal.
    // Replaces the removed .slide-viewer-backdrop button.
    slideViewer.addEventListener('click', (e) => {
        if (e.target === slideViewer) closeSlides();
    });

    slidePrev.addEventListener('click', () => {
        const deck = slideDeckList[slideDeckIndex];
        if (deck && slideIndex > 0) { slideIndex--; renderSlide(); }
    });
    slideNext.addEventListener('click', () => {
        const deck = slideDeckList[slideDeckIndex];
        if (deck && slideIndex < deck.slides.length - 1) { slideIndex++; renderSlide(); }
    });

    if (slideNotesToggle) {
        slideNotesToggle.addEventListener('click', () => {
            slideViewerNotes.hidden = !slideViewerNotes.hidden;
        });
    }

    if (slideLangToggle) {
        slideLangToggle.addEventListener('click', () => {
            const next = window.I18N.getCurrentLanguage() === 'zh' ? 'en' : 'zh';
            window.I18N.setLanguage(next);
            if (!slideViewer.hidden && slideMethodId) {
                // Rebuild deck list with the new language.
                openSlides(slideMethodId);
            }
        });
    }

    // Refresh private decks when user signs in/out from the cloud drawer.
    window.addEventListener('cloud-auth-changed', () => {
        if (window.privateDecksClient) window.privateDecksClient._resetPrivateDecksCache();
        if (!slideViewer.hidden && slideMethodId) openSlides(slideMethodId);
    });

    function updateLangToggleLabel() {
        if (!slideLangToggle) return;
        const cur = window.I18N ? window.I18N.getCurrentLanguage() : 'en';
        // Label shows the TARGET language using the "switch to X" idiom.
        slideLangToggle.textContent = cur === 'zh' ? 'EN' : '中';
        slideLangToggle.setAttribute('data-lang', cur);
    }
    updateLangToggleLabel();

    const langMenu = document.querySelector('.lang-menu');
    const langMenuCurrent = document.querySelector('.lang-menu-current');
    const langMenuOptions = document.querySelectorAll('.lang-menu-option');

    function langDisplayName(lang) {
        return lang === 'zh' ? '中文' : 'English';
    }

    function updateLangMenuLabel() {
        const cur = window.I18N ? window.I18N.getCurrentLanguage() : 'en';
        if (langMenuCurrent) langMenuCurrent.textContent = langDisplayName(cur);
        langMenuOptions.forEach((opt) => {
            opt.classList.toggle('is-current-lang', opt.dataset.lang === cur);
        });
    }
    updateLangMenuLabel();

    langMenuOptions.forEach((opt) => {
        opt.addEventListener('click', () => {
            const next = opt.dataset.lang;
            if (window.I18N) window.I18N.setLanguage(next);
            if (langMenu) langMenu.classList.remove('open');
        });
    });

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-code-copy]');
      if (!btn) return;
      const panel = btn.closest('.code-panel');
      if (!panel) return;
      const codeEl = panel.querySelector('code');
      if (!codeEl) return;
      navigator.clipboard.writeText(codeEl.textContent).then(() => {
        btn.dataset.copied = '1';
        const original = btn.textContent;
        btn.textContent = t('btn.copied');
        setTimeout(() => { btn.textContent = original; delete btn.dataset.copied; }, 1500);
      });
    });

    const DENSITY_STORAGE_KEY = 'dsvisual.codeDensity';
    const DIFFICULTY_KEY_PREFIX = 'dsvisual.inputDifficulty.';
    const DIFFICULTY_VALUES = ['normal', 'special', 'edge', 'large'];

    function getInputDifficulty() {
        const gid = getMethodGroupForMode(currentMode).id;
        let v = null;
        try { v = localStorage.getItem(DIFFICULTY_KEY_PREFIX + gid); } catch (e) { v = null; }
        return DIFFICULTY_VALUES.indexOf(v) === -1 ? 'normal' : v;
    }

    function setInputDifficulty(groupId, value) {
        if (DIFFICULTY_VALUES.indexOf(value) === -1) return;
        try { localStorage.setItem(DIFFICULTY_KEY_PREFIX + groupId, value); } catch (e) { /* ignore */ }
    }

    function syncDifficultySelect() {
        const sel = document.getElementById('input-difficulty');
        if (!sel) return;
        sel.value = getInputDifficulty();
        const cap = document.getElementById('input-difficulty-cat');
        if (cap) {
            const g = getMethodGroupForMode(currentMode);
            cap.textContent = (typeof t === 'function' ? t('group.' + g.id) : g.id) || g.id;
        }
    }

    function bindDifficultySelect() {
        const sel = document.getElementById('input-difficulty');
        if (!sel) return;
        sel.addEventListener('change', () => {
            setInputDifficulty(getMethodGroupForMode(currentMode).id, sel.value);
        });
        syncDifficultySelect();
    }

    function applySavedDensity() {
        const v = localStorage.getItem(DENSITY_STORAGE_KEY);
        if (v) document.documentElement.style.setProperty('--code-line-height', v);
    }

    function bindSettingsDrawer() {
        const toggle = document.getElementById('settings-toggle');
        const drawer = document.getElementById('settings-drawer');
        if (!toggle || !drawer) return;
        const closers = drawer.querySelectorAll('[data-settings-close]');
        const panel = drawer.querySelector('.settings-drawer-panel');
        function onKeydown(e) {
            if (e.key === 'Escape') close();
        }
        function open() {
            drawer.hidden = false;
            drawer.classList.add('open');
            panel.focus();
            document.addEventListener('keydown', onKeydown);
        }
        function close() {
            drawer.hidden = true;
            drawer.classList.remove('open');
            document.removeEventListener('keydown', onKeydown);
        }
        toggle.addEventListener('click', open);
        closers.forEach((btn) => btn.addEventListener('click', close));
    }

    function bindDensitySlider() {
        const slider = document.getElementById('code-density-slider');
        const display = document.getElementById('code-density-value');
        const resetBtn = document.getElementById('code-density-reset');
        if (!slider || !display || !resetBtn) return;
        const saved = localStorage.getItem(DENSITY_STORAGE_KEY) || '1.55';
        slider.value = saved;
        display.textContent = saved;
        slider.addEventListener('input', () => {
            document.documentElement.style.setProperty('--code-line-height', slider.value);
            display.textContent = slider.value;
            localStorage.setItem(DENSITY_STORAGE_KEY, slider.value);
        });
        resetBtn.addEventListener('click', () => {
            slider.value = '1.55';
            display.textContent = '1.55';
            document.documentElement.style.removeProperty('--code-line-height');
            localStorage.removeItem(DENSITY_STORAGE_KEY);
        });
    }

    let applyHashRoute = function () {};   // reassigned inside renderCategoryNav

    function renderCategoryNav() {
        if (!categoryNav) return;
        categoryNav.innerHTML = '';
        categoryButtons.clear();
        subTabButtons.clear();
        methodDropdownButtons.clear();
        overviewPillButtons.clear();

        // Overview pill — always leftmost, no dropdown, click toggles the overview view.
        const overviewItem = document.createElement('div');
        overviewItem.className = 'category-nav-item category-nav-item-overview';
        overviewItem.dataset.group = '__overview__';
        const overviewBtn = document.createElement('button');
        overviewBtn.type = 'button';
        overviewBtn.className = 'category-nav-btn';
        overviewBtn.dataset.group = '__overview__';
        overviewBtn.textContent = t('nav.overview');
        overviewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            categoryNav.querySelectorAll('.category-nav-item.open')
                .forEach((it) => it.classList.remove('open'));
            showOverview();
        });
        overviewItem.appendChild(overviewBtn);
        categoryNav.appendChild(overviewItem);
        overviewPillButtons.set('__overview__', overviewBtn);

        function activateGroup(groupId, methodId) {
            const group = getMethodGroupById(groupId);
            if (!group) return;
            hideOverview();
            const nextMethod = methodId || group.methods[0]?.id;
            setActiveCategory(group.id);
            if (nextMethod) {
                selectMethod(nextMethod);
            }
            scrollToCategory(group.id);
        }

        applyHashRoute = function () {
            const m = /^#m=([A-Za-z0-9-]+)$/.exec(window.location.hash || '');
            if (!m) return;                                   // no/!matching hash -> leave default
            const id = m[1];
            if (!getMethodById(id)) return;                   // unknown id -> leave default (no error)
            if (visualizerRuntime && visualizerRuntime.activeMode === id) return;  // already active
            const group = METHOD_GROUPS.find((g) => g.methods.some((x) => x.id === id));
            if (group) activateGroup(group.id, id);
        };

        function closeAllDropdowns() {
            categoryNav.querySelectorAll('.category-nav-item.open')
                .forEach((it) => it.classList.remove('open'));
        }

        function buildPillItem(parentId, parentTitle, subGroups) {
            const item = document.createElement('div');
            item.className = 'category-nav-item';
            item.dataset.group = parentId;

            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'category-nav-btn';
            btn.dataset.group = parentId;
            btn.textContent = parentTitle;
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const wasOpen = item.classList.contains('open');
                closeAllDropdowns();
                if (!wasOpen) item.classList.add('open');
            });

            const dropdown = document.createElement('div');
            dropdown.className = 'category-nav-dropdown' +
                (subGroups.length > 1 ? ' category-nav-dropdown-grouped' : '');

            subGroups.forEach((sg) => {
                if (subGroups.length > 1) {
                    const header = document.createElement('button');
                    header.type = 'button';
                    header.className = 'category-nav-group-header';
                    header.dataset.subgroup = sg.id;
                    header.textContent = t('group.' + sg.id);
                    header.addEventListener('click', (e) => {
                        e.stopPropagation();
                        activateGroup(sg.id);
                        closeAllDropdowns();
                    });
                    dropdown.appendChild(header);
                }
                sg.methods.forEach((m) => {
                    const mb = document.createElement('button');
                    mb.type = 'button';
                    mb.className = 'category-nav-method';
                    mb.dataset.methodId = m.id;
                    mb.textContent = t('method.' + m.id);
                    mb.addEventListener('click', () => {
                        activateGroup(sg.id, m.id);
                        closeAllDropdowns();
                        // Suppress the CSS :hover re-open until the cursor leaves the item,
                        // so the dropdown closes immediately after a selection.
                        item.classList.add('nav-picked');
                        item.addEventListener('mouseleave', () => item.classList.remove('nav-picked'), { once: true });
                    });
                    methodDropdownButtons.set(m.id, mb);
                    dropdown.appendChild(mb);
                });
            });

            item.appendChild(btn);
            item.appendChild(dropdown);
            categoryButtons.set(parentId, btn);
            return item;
        }

        const subTabRow = document.createElement('div');
        subTabRow.className = 'category-subtab-row';
        subTabRow.dataset.testid = 'category-subtab-row';

        const renderedParents = new Set();
        METHOD_GROUPS.forEach((group) => {
            if (group.parent) {
                if (!renderedParents.has(group.parent)) {
                    renderedParents.add(group.parent);
                    const subGroups = METHOD_GROUPS.filter((g) => g.parent === group.parent);
                    const item = buildPillItem(group.parent, t('group.' + group.parent), subGroups);
                    categoryNav.appendChild(item);
                }
                const tabBtn = document.createElement('button');
                tabBtn.type = 'button';
                tabBtn.className = 'category-subtab-btn';
                tabBtn.dataset.subgroup = group.id;
                tabBtn.dataset.parent = group.parent;
                tabBtn.textContent = t('group.' + group.id);
                tabBtn.addEventListener('click', () => activateGroup(group.id));
                subTabButtons.set(group.id, tabBtn);
                subTabRow.appendChild(tabBtn);
            } else {
                const item = buildPillItem(group.id, t('group.' + group.id), [group]);
                categoryNav.appendChild(item);
            }
        });

        categoryNav.appendChild(subTabRow);

        if (!dropdownGlobalListenersRegistered) {
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.category-nav-item')) closeAllDropdowns();
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') closeAllDropdowns();
            });
            dropdownGlobalListenersRegistered = true;
        }

        const initialGroup = getMethodGroupForMode('stack-array');
        setActiveCategory(initialGroup.id);
    }

    function scrollToCategory(groupId) {
        const section = document.querySelector(`[data-testid="method-sections"]`);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    applySavedDensity();
    bindSettingsDrawer();
    bindDensitySlider();
    renderCategoryNav();
    // Register after the first renderCategoryNav(): that call reassigns applyHashRoute
    // from its no-op placeholder to the real impl (it closes over activateGroup, defined
    // inside renderCategoryNav). Keep this line below — moving it above would no-op routing.
    window.addEventListener('hashchange', applyHashRoute);
    document.addEventListener('languagechange', () => {
        const overviewWasVisible = isOverviewVisible();
        renderCategoryNav();
        if (typeof currentMode === 'string' && currentMode) {
            switchMode(currentMode);
        }
        updateLangToggleLabel();
        updateLangMenuLabel();
        if (slideViewer && !slideViewer.hidden && slideMethodId) {
            slideDeck = buildSlides(slideMethodId);
            if (slideIndex >= slideDeck.length) slideIndex = slideDeck.length - 1;
            renderSlide();
        }
        if (overviewWasVisible) {
            showOverview();
        }
    });

    // Containers
    const arrayContainer = document.getElementById('array-container'); const linkedListContainer = document.getElementById('linkedlist-container');
    const queueContainer = document.getElementById('queue-container'); const graphContainer = document.getElementById('graph-container');
    const treeContainer = document.getElementById('tree-container'); const searchContainer = document.getElementById('search-container');
    const listArrContainer = document.getElementById('list-arr-container'); const listLLContainer = document.getElementById('list-ll-container');
    const sortContainer = document.getElementById('sort-container');
    
    // Action Bars
    const stdActions = document.getElementById('std-actions'); const graphActions = document.getElementById('graph-actions');
    const treeActions = document.getElementById('tree-actions'); const searchActions = document.getElementById('search-actions');
    const listActions = document.getElementById('list-actions'); const sortActions = document.getElementById('sort-actions');
    const heapActions = document.getElementById('heap-actions');

    const statusMsg = document.getElementById('status-message');
    const codeDisplay = document.getElementById('code-display') || document.createElement('code');
    const codeTitle = document.getElementById('code-title') || document.createElement('span');

    // Controls
    const btnStdAdd = document.getElementById('btn-std-add'); const btnStdRemove = document.getElementById('btn-std-remove');
    const btnGraphAdd = document.getElementById('btn-graph-add'); const graphU = document.getElementById('graph-u'); const graphV = document.getElementById('graph-v');
    const graphW = document.getElementById('graph-w'); const btnGraphKruskal = document.getElementById('btn-graph-kruskal'); const btnGraphClear = document.getElementById('btn-graph-clear');
    const graphSource = document.getElementById('graph-source'); const graphTarget = document.getElementById('graph-target');
    const btnGraphDijkstra = document.getElementById('btn-graph-dijkstra'); const btnGraphTopo = document.getElementById('btn-graph-topo');
    const btnTreeSearch = document.getElementById('btn-tree-search');

    const btnSearchGo = document.getElementById('btn-search-go'); const btnSearchPause = document.getElementById('btn-search-pause'); const btnSearchStop = document.getElementById('btn-search-stop'); const searchVal = document.getElementById('search-val');
    const btnSearchRandom = document.getElementById('btn-search-random');

    const btnSortRandom = document.getElementById('btn-sort-random'); const btnSortStart = document.getElementById('btn-sort-start');
    const btnSortPause = document.getElementById('btn-sort-pause'); const btnSortStop = document.getElementById('btn-sort-stop');
    const sortSpeedInput = document.getElementById('sort-speed');

    const heapContainer = document.getElementById('heap-container');
    const heapEdges = document.getElementById('heap-edges');
    const heapNodesContainer = document.getElementById('heap-nodes-container');
    const heapOrderSelect = document.getElementById('heap-order');
    const heapValInput = document.getElementById('heap-val');
    const heapExtraInput = document.getElementById('heap-extra');
    const btnHeapInsert = document.getElementById('btn-heap-insert');
    const btnHeapPeek = document.getElementById('btn-heap-peek');
    const btnHeapExtract = document.getElementById('btn-heap-extract');
    const btnHeapMerge = document.getElementById('btn-heap-merge');
    const btnHeapChange = document.getElementById('btn-heap-change');
    const btnHeapDelete = document.getElementById('btn-heap-delete');
    const btnHeapFindMin = document.getElementById('btn-heap-find-min');
    const btnHeapStats = document.getElementById('btn-heap-stats');
    const btnHeapTutorial = document.getElementById('btn-heap-tutorial');
    const heapTutorialPanel = document.getElementById('heap-tutorial-panel');
    const heapTutorialMode = document.getElementById('heap-tutorial-mode');
    const heapTutorialProgress = document.getElementById('heap-tutorial-progress');
    const heapTutorialTitle = document.getElementById('heap-tutorial-title');
    const heapTutorialText = document.getElementById('heap-tutorial-text');
    const btnHeapTutorialNext = document.getElementById('btn-heap-tutorial-next');
    const btnHeapTutorialRestart = document.getElementById('btn-heap-tutorial-restart');
    const btnHeapTutorialExit = document.getElementById('btn-heap-tutorial-exit');

    const hashActions = document.getElementById('hash-actions');
    const hashChContainer = document.getElementById('hash-ch-container');
    const hashOaContainer = document.getElementById('hash-oa-container');
    const hashBucketContainer = document.getElementById('hash-bucket-container');

    const textTreeActions = document.getElementById('text-tree-actions');
    const advTreeContainer = document.getElementById('advanced-tree-container');

    const oopActions = document.getElementById('oop-actions');
    const oopModeSelect = document.getElementById('oop-mode-select');
    const btnOopDemo = document.getElementById('btn-oop-demo');
    const btnOopReset = document.getElementById('btn-oop-reset');
    const oopContainer = document.getElementById('oop-container');
    const oopInheritanceView = document.getElementById('oop-inheritance-view');
    const oopPolymorphismView = document.getElementById('oop-polymorphism-view');
    const oopEncapsulationView = document.getElementById('oop-encapsulation-view');
    const oopAbstractionView = document.getElementById('oop-abstraction-view');
    const oopAdhocView = document.getElementById('oop-adhoc-view');
    const oopTemplatesView = document.getElementById('oop-templates-view');

    const patternActions = document.getElementById('pattern-actions');
    const patternModeSelect = document.getElementById('pattern-mode-select');
    const PATTERN_OPTION_LABELS = {};
    Array.from(patternModeSelect.options).forEach((o) => { PATTERN_OPTION_LABELS[o.value] = o.textContent; });
    const btnPatternDemo = document.getElementById('btn-pattern-demo');
    const btnPatternReset = document.getElementById('btn-pattern-reset');
    const patternContainer = document.getElementById('pattern-container');
    const patternVisualization = document.getElementById('pattern-visualization');

    let currentMode = 'stack-array';
    const visualizerRuntime = {
        activeMode: currentMode,
        activeGroupId: getMethodGroupForMode(currentMode).id,
        loadedMethods: new Set([currentMode]),
        setMode(mode) {
            this.activeMode = mode;
            this.activeGroupId = getMethodGroupForMode(mode).id;
            this.loadedMethods.add(mode);
            currentMode = mode;
        },
    };
    renderMethodSections(getMethodGroupForMode(currentMode).id);
    window.VizKit = {
        acquireDynamicVizHost,
        buildStepControls,
        getInputDifficulty,
        langOf: (m) => (window.I18N && window.I18N.getCurrentLanguage() === 'zh') ? m.zh : m.en,
        t,
        showStatus,
        executeAnimWrapper,
        getDelay,
    };
    if (window.VizCore) {
        window.VizCore.bindMode(() => currentMode, (m) => { currentMode = m; });
        window.VizCore.domains().forEach((d) => { if (d.init) d.init(); });
    }
    registerBehaviors();
    bindDifficultySelect();

        // OOP state variables
        let oopInheritanceAnimationState = null;
        let oopPolymorphismAnimationState = null;
        let oopEncapsulationAnimationState = null;
        const oopStepState = {
            inheritance: 0,
            polymorphism: 0,
            encapsulation: 0,
            abstraction: 0,
            adhoc: 0,
            templates: 0,
        };

        // Design Patterns state variables
        let patternAnimationState = null;

    updateLayout();

    function switchMode(nextMode) {
        visualizerRuntime.setMode(nextMode);
        if (window.VizCore) window.VizCore.domains().forEach((d) => { if (d.onModeSwitch) d.onModeSwitch(currentMode); });
        renderMethodSections(getMethodGroupForMode(currentMode).id);
        updateLayout();
        renderAll();
        statusMsg.textContent = t('status.switched-to', { mode: t('method.' + currentMode) }); statusMsg.style.color = '#34d399';
        methodDropdownButtons.forEach((btn, mid) => {
            btn.classList.toggle('is-current-method', mid === currentMode);
        });
        if(currentMode === 'tree-splay') btnTreeSearch.classList.remove('hidden'); else btnTreeSearch.classList.add('hidden');
    }

    // ----------- LOGIC & RENDER OMITTED -----------
    // (Search, Sort layout bindings omitted for strictness matching original JS...)
    function handlePauseClick() { if (animState === 'playing') { animState = 'paused'; setAnimControls(true); showStatus('Paused', '#fbbf24'); } else if (animState === 'paused') { animState = 'playing'; setAnimControls(true); showStatus('Resumed', '#34d399'); } }
    btnSearchPause.addEventListener('click', handlePauseClick); btnSortPause.addEventListener('click', handlePauseClick);
    function handleStopClick() { if(animState === 'playing' || animState === 'paused') { animState = 'stopped'; setTimeout(() => { animState = 'idle'; setAnimControls(false); if(currentMode.includes('sort')) { const b = window.VizRegistry && window.VizRegistry.behavior(currentMode); if (b && b.render) b.render(); } else if (currentMode.includes('search')) { const b = window.VizRegistry && window.VizRegistry.behavior(currentMode); if (b && b.render) b.render(); } else if (currentMode.includes('heap-')) { const b = window.VizRegistry && window.VizRegistry.behavior(currentMode); if (b && b.render) b.render(); } showStatus('Stopped & Reset.', '#f87171'); }, 100); } }
    btnSearchStop.addEventListener('click', handleStopClick); btnSortStop.addEventListener('click', handleStopClick);
    function setAnimControls(isPlaying) {
        if(currentMode.includes('search')) { btnSearchGo.disabled = isPlaying; btnSearchPause.disabled = !isPlaying; btnSearchStop.disabled = !isPlaying; btnSearchPause.textContent = animState === 'paused' ? t('btn.resume') : t('btn.pause'); }
        else if (currentMode.includes('sort')) { btnSortStart.disabled = isPlaying; btnSortRandom.disabled = isPlaying; btnSortPause.disabled = !isPlaying; btnSortStop.disabled = !isPlaying; btnSortPause.textContent = animState === 'paused' ? t('btn.resume') : t('btn.pause'); }
        else if (currentMode.includes('heap-')) {
            btnHeapInsert.disabled = isPlaying;
            btnHeapPeek.disabled = isPlaying;
            btnHeapExtract.disabled = isPlaying;
            btnHeapMerge.disabled = isPlaying;
            btnHeapChange.disabled = isPlaying;
            btnHeapDelete.disabled = isPlaying;
            btnHeapFindMin.disabled = isPlaying;
            btnHeapStats.disabled = isPlaying;
            btnHeapTutorial.disabled = isPlaying;
            heapOrderSelect.disabled = isPlaying;
        } else if (currentMode.includes('graph')) {
            btnGraphAdd.disabled = isPlaying;
            btnGraphKruskal.disabled = isPlaying;
            btnGraphClear.disabled = isPlaying;
            graphU.disabled = isPlaying;
            graphV.disabled = isPlaying;
            graphW.disabled = isPlaying;
        } else if (currentMode.includes('oop-')) {
            btnOopDemo.disabled = isPlaying;
            btnOopReset.disabled = isPlaying;
            oopModeSelect.disabled = isPlaying;
        }
        if (window.VizCore) window.VizCore.domains().forEach((d) => { if (d.syncChrome) d.syncChrome(); });
    }
    async function executeAnimWrapper(fn) {
        if(animState === 'playing' || animState === 'paused') return; animState = 'playing'; setAnimControls(true);
        try {
            const result = await fn();
            if(animState === 'playing') {
                animState = 'idle';
                setAnimControls(false);
                if(result !== '__KEEP_STATUS__') showStatus("Execution Complete!", "#34d399");
            }
        } catch (e) { if (e === 'STOPPED') return; else throw e; }
    }

    function showStatus(msg, color) { statusMsg.textContent = msg; statusMsg.style.color = color; }
    function getDelay() { return 610 - parseInt(sortSpeedInput.value); } 
    function updateLayout() {
        const containers = [arrayContainer, linkedListContainer, queueContainer, graphContainer, treeContainer, advTreeContainer, searchContainer, listArrContainer, listLLContainer, sortContainer, hashChContainer, hashOaContainer, hashBucketContainer, heapContainer, oopContainer, patternContainer];
        const actions = [stdActions, graphActions, treeActions, textTreeActions, searchActions, listActions, sortActions, hashActions, heapActions, oopActions, patternActions];
        containers.forEach(c => c.classList.add('hidden')); actions.forEach(a => a.classList.add('hidden'));
        const dynHost = document.getElementById('dynamic-viz-host');
        if (dynHost) dynHost.classList.add('hidden');
        const vizHolder = document.getElementById('visualizer-container');
        if (vizHolder) vizHolder.classList.remove('hidden');

        if(currentMode === 'stack-array') { codeTitle.textContent = 'stack_array.cpp'; codeDisplay.textContent = codeArray; arrayContainer.classList.remove('hidden'); stdActions.classList.remove('hidden'); btnStdAdd.textContent = t('btn.push'); btnStdRemove.textContent = t('btn.pop'); }
        else if (currentMode === 'stack-list') { codeTitle.textContent = 'stack_linkedlist.cpp'; codeDisplay.textContent = codeLinkedList; linkedListContainer.classList.remove('hidden'); stdActions.classList.remove('hidden'); btnStdAdd.textContent = t('btn.push'); btnStdRemove.textContent = t('btn.pop'); }
        else if (currentMode === 'queue') { codeTitle.textContent = 'queue.cpp'; codeDisplay.textContent = codeQueue; queueContainer.classList.remove('hidden'); stdActions.classList.remove('hidden'); btnStdAdd.textContent = t('btn.enqueue'); btnStdRemove.textContent = t('btn.dequeue'); }
        else if (currentMode === 'graph') {
            codeTitle.textContent = 'graph.cpp'; codeDisplay.textContent = codeGraph; graphContainer.classList.remove('hidden'); graphActions.classList.remove('hidden');
            graphW.classList.add('hidden'); btnGraphKruskal.classList.add('hidden'); btnGraphDijkstra.classList.add('hidden'); btnGraphTopo.classList.add('hidden');
            graphSource.classList.add('hidden'); graphTarget.classList.add('hidden');
            btnGraphClear.classList.remove('hidden'); btnGraphAdd.textContent = t('btn.add-edge');
        }
        else if (currentMode === 'graph-adjlist') {
            codeTitle.textContent = 'graph_adjlist.cpp'; codeDisplay.textContent = codeGraphAdjlist; graphActions.classList.remove('hidden');
            graphW.classList.add('hidden'); btnGraphKruskal.classList.add('hidden'); btnGraphDijkstra.classList.add('hidden'); btnGraphTopo.classList.add('hidden');
            graphSource.classList.add('hidden'); graphTarget.classList.add('hidden');
            btnGraphClear.classList.add('hidden'); btnGraphAdd.classList.add('hidden');
        }
        else if (currentMode === 'graph-traversal') {
            codeTitle.textContent = 'graph_traversal.cpp'; codeDisplay.textContent = codeGraphTraversal; graphActions.classList.remove('hidden');
            graphW.classList.add('hidden'); btnGraphKruskal.classList.add('hidden'); btnGraphDijkstra.classList.add('hidden'); btnGraphTopo.classList.add('hidden');
            graphSource.classList.add('hidden'); graphTarget.classList.add('hidden');
            btnGraphClear.classList.add('hidden'); btnGraphAdd.classList.add('hidden');
        }
        else if (currentMode === 'graph-bfs') {
            codeTitle.textContent = 'graph_bfs.cpp'; codeDisplay.textContent = codeGraphBFS; graphActions.classList.remove('hidden');
            graphW.classList.add('hidden'); btnGraphKruskal.classList.add('hidden'); btnGraphDijkstra.classList.add('hidden'); btnGraphTopo.classList.add('hidden');
            graphSource.classList.add('hidden'); graphTarget.classList.add('hidden');
            btnGraphClear.classList.add('hidden'); btnGraphAdd.classList.add('hidden');
        }
        else if (currentMode === 'graph-dfs') {
            codeTitle.textContent = 'graph_dfs.cpp'; codeDisplay.textContent = codeGraphDFS; graphActions.classList.remove('hidden');
            graphW.classList.add('hidden'); btnGraphKruskal.classList.add('hidden'); btnGraphDijkstra.classList.add('hidden'); btnGraphTopo.classList.add('hidden');
            graphSource.classList.add('hidden'); graphTarget.classList.add('hidden');
            btnGraphClear.classList.add('hidden'); btnGraphAdd.classList.add('hidden');
        }
        else if (currentMode === 'graph-kruskal') {
            codeTitle.textContent = 'graph_kruskal.cpp'; codeDisplay.textContent = codeGraphKruskal; graphContainer.classList.remove('hidden'); graphActions.classList.remove('hidden');
            graphW.classList.remove('hidden'); btnGraphKruskal.classList.remove('hidden'); btnGraphDijkstra.classList.add('hidden'); btnGraphTopo.classList.add('hidden');
            graphSource.classList.add('hidden'); graphTarget.classList.add('hidden');
            btnGraphClear.classList.remove('hidden'); btnGraphAdd.textContent = t('btn.add-weighted-edge');
        }
        else if (currentMode === 'graph-dijkstra') {
            codeTitle.textContent = 'graph_dijkstra.cpp'; codeDisplay.textContent = codeGraphDijkstra; graphContainer.classList.remove('hidden'); graphActions.classList.remove('hidden');
            graphW.classList.add('hidden'); btnGraphKruskal.classList.add('hidden'); btnGraphDijkstra.classList.remove('hidden'); btnGraphTopo.classList.add('hidden');
            graphSource.classList.remove('hidden'); graphTarget.classList.add('hidden');
            btnGraphClear.classList.remove('hidden'); btnGraphAdd.textContent = t('btn.add-edge');
        }
        else if (currentMode === 'graph-topo') {
            codeTitle.textContent = 'graph_topo.cpp'; codeDisplay.textContent = codeGraphTopo; graphContainer.classList.remove('hidden'); graphActions.classList.remove('hidden');
            graphW.classList.add('hidden'); btnGraphKruskal.classList.add('hidden'); btnGraphDijkstra.classList.add('hidden'); btnGraphTopo.classList.remove('hidden');
            graphSource.classList.add('hidden'); graphTarget.classList.add('hidden');
            btnGraphClear.classList.remove('hidden'); btnGraphAdd.textContent = t('btn.add-edge-directed');
        }
        else if (currentMode === 'graph-prim') {
            codeTitle.textContent = 'graph_prim.cpp';
            codeDisplay.textContent = codeGraphPrim;
        }
        else if (currentMode === 'graph-bellman-ford') {
            codeTitle.textContent = 'graph_bellman_ford.cpp';
            codeDisplay.textContent = codeGraphBellmanFord;
        }
        else if (currentMode === 'graph-floyd-warshall') {
            codeTitle.textContent = 'graph_floyd_warshall.cpp';
            codeDisplay.textContent = codeGraphFloydWarshall;
        }
        else if (['tree-bst', 'tree-avl', 'tree-splay'].includes(currentMode)) {
            treeContainer.classList.remove('hidden'); treeActions.classList.remove('hidden');
            if(currentMode === 'tree-bst') { codeTitle.textContent = 'tree_bst.cpp'; codeDisplay.textContent = codeTreeBST; }
            if(currentMode === 'tree-avl') { codeTitle.textContent = 'tree_avl.cpp'; codeDisplay.textContent = codeTreeAVL; }
            if(currentMode === 'tree-splay') { codeTitle.textContent = 'tree_splay.cpp'; codeDisplay.textContent = codeTreeSplay; }
        }
        else if (currentMode === 'tree-rb') {
            // Rendered by renderTreeRB() into the dynamic viz host.
            codeTitle.textContent = 'tree_rb.cpp'; codeDisplay.textContent = codeTreeRB;
        }
        else if (['tree-trie', 'tree-radix', 'tree-ternary'].includes(currentMode)) {
            advTreeContainer.classList.remove('hidden'); textTreeActions.classList.remove('hidden');
            if(currentMode === 'tree-trie') { codeTitle.textContent = 'tree_trie.cpp'; codeDisplay.textContent = codeTreeTrie; }
            if(currentMode === 'tree-radix') { codeTitle.textContent = 'tree_radix.cpp'; codeDisplay.textContent = codeTreeRadix; }
            if(currentMode === 'tree-ternary') { codeTitle.textContent = 'tree_ternary.cpp'; codeDisplay.textContent = codeTreeTST; }
        }
        else if (['tree-btree', 'tree-bplus'].includes(currentMode)) {
            advTreeContainer.classList.remove('hidden'); treeActions.classList.remove('hidden');
            if(currentMode === 'tree-btree') { codeTitle.textContent = 'tree_btree.cpp'; codeDisplay.textContent = codeTreeBTree; }
            if(currentMode === 'tree-bplus') { codeTitle.textContent = 'tree_bplus.cpp'; codeDisplay.textContent = codeTreeBPlus; }
        }
        else if (currentMode === 'tree-dsu') {
            codeTitle.textContent = 'tree_dsu.cpp';
            codeDisplay.textContent = codeTreeDSU;
        }
        else if (currentMode === 'tree-segment') {
            codeTitle.textContent = 'tree_segment.cpp';
            codeDisplay.textContent = codeTreeSegment;
        }
        else if (currentMode === 'tree-fenwick') {
            codeTitle.textContent = 'tree_fenwick.cpp';
            codeDisplay.textContent = codeTreeFenwick;
        }
        else if (currentMode === 'tree-traversal') {
            codeTitle.textContent = 'tree_traversal.cpp';
            codeDisplay.textContent = codeTreeTraversal;
        }
        else if (currentMode === 'tree-general-binary') {
            codeTitle.textContent = 'tree_general_binary.cpp';
            codeDisplay.textContent = codeTreeGeneralBinary;
        }
        else if (currentMode === 'game-tree') {
            codeTitle.textContent = 'game_tree.cpp';
            codeDisplay.textContent = codeGameTree;
        }
        else if (currentMode === 'huffman') {
            codeTitle.textContent = 'huffman.cpp';
            codeDisplay.textContent = codeHuffman;
        }
        else if (currentMode === 'matrix-sparse-list') {
            codeTitle.textContent = 'matrix_sparse_list.cpp';
            codeDisplay.textContent = codeMatrixSparseList;
        }
        else if (currentMode === 'poly-padd') {
            codeTitle.textContent = 'poly_padd.cpp';
            codeDisplay.textContent = codePolyPadd;
        }
        else if (currentMode === 'magic-square') {
            codeTitle.textContent = 'magic_square.cpp';
            codeDisplay.textContent = codeMagicSquare;
        }
        else if (currentMode === 'magic-latin') {
            codeTitle.textContent = 'magic_latin.cpp';
            codeDisplay.textContent = codeMagicLatin;
        }
        else if (currentMode === 'magic-torus') {
            codeTitle.textContent = 'magic_torus.cpp';
            codeDisplay.textContent = codeMagicTorus;
        }
        else if (currentMode === 'magic-formula') {
            codeTitle.textContent = 'magic_formula.cpp';
            codeDisplay.textContent = codeMagicFormula;
        }
        else if (currentMode === 'magic-symmetry') {
            codeTitle.textContent = 'magic_symmetry.cpp';
            codeDisplay.textContent = codeMagicSymmetry;
        }
        else if (currentMode === 'tree-obst') {
            codeTitle.textContent = 'tree_obst.cpp';
            codeDisplay.textContent = codeTreeObst;
        }
        else if (currentMode === 'tree-threaded') {
            codeTitle.textContent = 'tree_threaded.cpp';
            codeDisplay.textContent = codeTreeThreaded;
        }
        else if (currentMode === 'tree-mway') {
            codeTitle.textContent = 'tree_mway.cpp';
            codeDisplay.textContent = codeTreeMway;
        }
        else if (currentMode === 'tree-expression') {
            codeTitle.textContent = 'tree_expression.cpp';
            codeDisplay.textContent = codeTreeExpression;
        }
        else if (currentMode === 'sort-external') {
            codeTitle.textContent = 'sort_external.cpp';
            codeDisplay.textContent = codeSortExternal;
        }
        else if (currentMode === 'gc-memory') { codeTitle.textContent = 'gc_memory.cpp'; codeDisplay.textContent = codeGcMemory; }
        else if (currentMode === 'recursion') { codeTitle.textContent = 'recursion.cpp'; codeDisplay.textContent = codeRecursion; }
        else if (currentMode === 'file-isam') { codeTitle.textContent = 'file_isam.cpp'; codeDisplay.textContent = codeFileIsam; }
        else if (currentMode === 'file-inverted') { codeTitle.textContent = 'file_inverted.cpp'; codeDisplay.textContent = codeFileInverted; }
        else if (currentMode === 'sort-polyphase') {
            codeTitle.textContent = 'sort_polyphase.cpp';
            codeDisplay.textContent = codeSortPolyphase;
        }
        else if (currentMode === 'graph-aoe') {
            codeTitle.textContent = 'graph_aoe.cpp';
            codeDisplay.textContent = codeGraphAoe;
        }
        else if (currentMode === 'expr-infix-postfix') {
            codeTitle.textContent = 'expr_infix_postfix.cpp';
            codeDisplay.textContent = codeExprInfixPostfix;
        }
        else if (currentMode === 'maze-stack') {
            codeTitle.textContent = 'maze_stack.cpp';
            codeDisplay.textContent = codeMazeStack;
        }
        else if (currentMode === 'list-doubly') {
            codeTitle.textContent = 'list_doubly.cpp';
            codeDisplay.textContent = codeListDoubly;
        }
        else if (currentMode === 'list-equivalence') {
            codeTitle.textContent = 'list_equivalence.cpp';
            codeDisplay.textContent = codeListEquivalence;
        }
        else if (currentMode === 'cache-lru') {
            codeTitle.textContent = 'lru_cache.cpp';
            codeDisplay.textContent = codeLruCache;
        }
        else if (currentMode === 'nano-bpe-encode') {
            codeTitle.textContent = 'nano-bpe-encode.cpp';
            codeDisplay.textContent = codeNanoBpeEncode;
        }
        else if (currentMode === 'nano-compute-graph') {
            codeTitle.textContent = 'nano-compute-graph.cpp';
            codeDisplay.textContent = codeNanoComputeGraph;
        }
        else if (currentMode === 'nano-bpe-train') {
            codeTitle.textContent = 'nano-bpe-train.cpp';
            codeDisplay.textContent = codeNanoBpeTrain;
        }
        else if (currentMode === 'nano-ngram-next') {
            codeTitle.textContent = 'nano-ngram-next.cpp';
            codeDisplay.textContent = codeNanoNgramNext;
        }
        else if (currentMode === 'search-linear') { codeTitle.textContent = 'search_linear.cpp'; codeDisplay.textContent = codeSearchLinear; searchContainer.classList.remove('hidden'); searchActions.classList.remove('hidden'); }
        else if (currentMode === 'search-binary') { codeTitle.textContent = 'search_binary.cpp'; codeDisplay.textContent = codeSearchBinary; searchContainer.classList.remove('hidden'); searchActions.classList.remove('hidden'); }
        else if (currentMode === 'search-kmp') {
            codeTitle.textContent = 'search_kmp.cpp';
            codeDisplay.textContent = codeSearchKMP;
        }
        else if (currentMode === 'search-bm') {
            codeTitle.textContent = 'search_bm.cpp';
            codeDisplay.textContent = codeSearchBM;
        }
        else if (currentMode === 'search-rk') {
            codeTitle.textContent = 'search_rk.cpp';
            codeDisplay.textContent = codeSearchRK;
        }
        else if (currentMode === 'search-strcompare') {
            codeTitle.textContent = 'search_strcompare.cpp';
            codeDisplay.textContent = codeSearchStrCompare;
        }
        else if (currentMode === 'search-zalgo') {
            codeTitle.textContent = 'search_zalgo.cpp';
            codeDisplay.textContent = codeSearchZAlgo;
        }
        else if (currentMode === 'search-aho') {
            codeTitle.textContent = 'search_aho.cpp';
            codeDisplay.textContent = codeSearchAho;
        }
        else if (currentMode === 'search-fibonacci') {
            codeTitle.textContent = 'search_fibonacci.cpp';
            codeDisplay.textContent = codeSearchFibonacci;
        }
        else if (currentMode === 'search-interpolation') {
            codeTitle.textContent = 'search_interpolation.cpp';
            codeDisplay.textContent = codeSearchInterpolation;
        }
        else if (currentMode === 'list-array') { codeTitle.textContent = 'list_array.cpp'; codeDisplay.textContent = codeListArray; listArrContainer.classList.remove('hidden'); listActions.classList.remove('hidden'); }
        else if (currentMode === 'list-linked') { codeTitle.textContent = 'list_linked.cpp'; codeDisplay.textContent = codeListLinked; listLLContainer.classList.remove('hidden'); listActions.classList.remove('hidden'); }
        else if (currentMode === 'deque') {
            codeTitle.textContent = 'deque.cpp';
            codeDisplay.textContent = codeDeque;
        }
        else if (currentMode === 'bloom-filter') {
            codeTitle.textContent = 'bloom_filter.cpp';
            codeDisplay.textContent = codeBloomFilter;
        }
        else if (currentMode === 'skip-list') {
            codeTitle.textContent = 'skip_list.cpp';
            codeDisplay.textContent = codeSkipList;
        }
        else if (currentMode === 'count-min-sketch') {
            codeTitle.textContent = 'count_min_sketch.cpp';
            codeDisplay.textContent = codeCountMinSketch;
        }
        else if (currentMode.includes('hash-')) {
            hashActions.classList.remove('hidden');
            if(currentMode === 'hash-chain') { codeTitle.textContent = 'hash_chaining.cpp'; codeDisplay.textContent = codeHashChain; hashChContainer.classList.remove('hidden'); }
            if(currentMode === 'hash-open') { codeTitle.textContent = 'hash_open_address.cpp'; codeDisplay.textContent = codeHashOpen; hashOaContainer.classList.remove('hidden'); }
            if(currentMode === 'hash-bucket') { codeTitle.textContent = 'hash_bucket.cpp'; codeDisplay.textContent = codeHashBucket; hashBucketContainer.classList.remove('hidden'); }
        }
        else if (currentMode.includes('sort-')) {
            sortContainer.classList.remove('hidden'); sortActions.classList.remove('hidden');
            if(currentMode === 'sort-bubble') { codeTitle.textContent = 'sort_bubble.cpp'; codeDisplay.textContent = codeSortBubble; }
            else if(currentMode === 'sort-select') { codeTitle.textContent = 'sort_selection.cpp'; codeDisplay.textContent = codeSortSelect; }
            else if(currentMode === 'sort-insert') { codeTitle.textContent = 'sort_insertion.cpp'; codeDisplay.textContent = codeSortInsert; }
            else if(currentMode === 'sort-quick') { codeTitle.textContent = 'sort_quick.cpp'; codeDisplay.textContent = codeSortQuick; }
            else if(currentMode === 'sort-merge') { codeTitle.textContent = 'sort_merge.cpp'; codeDisplay.textContent = codeSortMerge; }
            else if(currentMode === 'sort-shell') { codeTitle.textContent = 'sort_shell.cpp'; codeDisplay.textContent = codeSortShell; }
            else if(currentMode === 'sort-bucket') { codeTitle.textContent = 'sort_bucket.cpp'; codeDisplay.textContent = codeSortBucket; }
            else if(currentMode === 'sort-count') { codeTitle.textContent = 'sort_counting.cpp'; codeDisplay.textContent = codeSortCounting; }
            else if(currentMode === 'sort-radix') { codeTitle.textContent = 'sort_radix.cpp'; codeDisplay.textContent = codeSortRadix; }
            else if(currentMode === 'sort-heap') { codeTitle.textContent = 'sort_heap.cpp'; codeDisplay.textContent = codeSortHeap; }
            else if(currentMode === 'sort-shaker') { codeTitle.textContent = 'sort_shaker.cpp'; codeDisplay.textContent = codeSortShaker; }
        }
        else if (currentMode.includes('heap-')) {
            heapContainer.classList.remove('hidden');
            heapActions.classList.remove('hidden');
            if(currentMode === 'heap-binary') { codeTitle.textContent = 'heap_binary.cpp'; codeDisplay.textContent = codeHeapBinary; }
            else if(currentMode === 'heap-binomial') { codeTitle.textContent = 'heap_binomial.cpp'; codeDisplay.textContent = codeHeapBinomial; }
            else if(currentMode === 'heap-fibonacci') { codeTitle.textContent = 'heap_fibonacci.cpp'; codeDisplay.textContent = codeHeapFibonacci; }
            else if(currentMode === 'heap-leftist') { codeTitle.textContent = 'heap_leftist.cpp'; codeDisplay.textContent = codeHeapLeftist; }
            else if(currentMode === 'heap-skew') { codeTitle.textContent = 'heap_skew.cpp'; codeDisplay.textContent = codeHeapSkew; }
            else if(currentMode === 'heap-dary') { codeTitle.textContent = 'heap_dary.cpp'; codeDisplay.textContent = codeHeapDary; }
            else if(currentMode === 'heap-pairing') { codeTitle.textContent = 'heap_pairing.cpp'; codeDisplay.textContent = codeHeapPairing; }
        }
        else if (currentMode.includes('oop-')) {
            oopContainer.classList.remove('hidden');
            oopActions.classList.remove('hidden');
            oopInheritanceView.classList.add('hidden');
            oopPolymorphismView.classList.add('hidden');
            oopEncapsulationView.classList.add('hidden');
            oopAbstractionView.classList.add('hidden');
            oopAdhocView.classList.add('hidden');
            oopTemplatesView.classList.add('hidden');
            if (currentMode === 'oop-inheritance') {
                codeTitle.textContent = 'oop_inheritance.cpp';
                codeDisplay.textContent = codeOOPInheritance;
                oopInheritanceView.classList.remove('hidden');
                oopModeSelect.value = 'inheritance';
            }
            else if (currentMode === 'oop-polymorphism') {
                codeTitle.textContent = 'oop_polymorphism.cpp';
                codeDisplay.textContent = codeOOPPolymorphism;
                oopPolymorphismView.classList.remove('hidden');
                oopModeSelect.value = 'polymorphism';
            }
            else if (currentMode === 'oop-encapsulation') {
                codeTitle.textContent = 'oop_encapsulation.cpp';
                codeDisplay.textContent = codeOOPEncapsulation;
                oopEncapsulationView.classList.remove('hidden');
                oopModeSelect.value = 'encapsulation';
            }
            else if (currentMode === 'oop-abstraction') {
                codeTitle.textContent = 'oop_abstraction.cpp';
                codeDisplay.textContent = codeOOPAbstraction;
                oopAbstractionView.classList.remove('hidden');
                oopModeSelect.value = 'abstraction';
            }
            else if (currentMode === 'oop-adhoc') {
                codeTitle.textContent = 'oop_adhoc.cpp';
                codeDisplay.textContent = codeOOPAdhoc;
                oopAdhocView.classList.remove('hidden');
                oopModeSelect.value = 'adhoc';
            }
            else if (currentMode === 'oop-templates') {
                codeTitle.textContent = 'oop_templates.cpp';
                codeDisplay.textContent = codeOOPTemplates;
                oopTemplatesView.classList.remove('hidden');
                oopModeSelect.value = 'templates';
            }
        }
        else if (currentMode.includes('pattern-')) {
            patternContainer.classList.remove('hidden');
            patternActions.classList.remove('hidden');
            const views = patternContainer.querySelectorAll('.pattern-view');
            views.forEach(v => v.classList.add('hidden'));
            const patGroup = METHOD_GROUPS.find((g) => g.methods.some((m) => m.id === currentMode));
            if (patGroup) {
                patternModeSelect.innerHTML = patGroup.methods.map((m) => {
                    const v = m.id.replace(/^pattern-/, '');
                    const label = PATTERN_OPTION_LABELS[v] || m.title;
                    return '<option value="' + v + '">' + label + '</option>';
                }).join('');
            }

            if (currentMode === 'pattern-singleton') {
                codeTitle.textContent = 'pattern_singleton.cpp';
                codeDisplay.textContent = codePatternSingleton;
                document.getElementById('pattern-singleton-view').classList.remove('hidden');
                patternModeSelect.value = 'singleton';
            }
            else if (currentMode === 'pattern-factory') {
                codeTitle.textContent = 'pattern_factory.cpp';
                codeDisplay.textContent = codePatternFactory;
                document.getElementById('pattern-factory-view').classList.remove('hidden');
                patternModeSelect.value = 'factory';
            }
            else if (currentMode === 'pattern-adapter') {
                codeTitle.textContent = 'pattern_adapter.cpp';
                codeDisplay.textContent = codePatternAdapter;
                document.getElementById('pattern-adapter-view').classList.remove('hidden');
                patternModeSelect.value = 'adapter';
            }
            else if (currentMode === 'pattern-decorator') {
                codeTitle.textContent = 'pattern_decorator.cpp';
                codeDisplay.textContent = codePatternDecorator;
                document.getElementById('pattern-decorator-view').classList.remove('hidden');
                patternModeSelect.value = 'decorator';
            }
            else if (currentMode === 'pattern-observer') {
                codeTitle.textContent = 'pattern_observer.cpp';
                codeDisplay.textContent = codePatternObserver;
                document.getElementById('pattern-observer-view').classList.remove('hidden');
                patternModeSelect.value = 'observer';
            }
            else if (currentMode === 'pattern-strategy') {
                codeTitle.textContent = 'pattern_strategy.cpp';
                codeDisplay.textContent = codePatternStrategy;
                document.getElementById('pattern-strategy-view').classList.remove('hidden');
                patternModeSelect.value = 'strategy';
            }
            else if (currentMode === 'pattern-mvc') {
                codeTitle.textContent = 'pattern_mvc.cpp';
                codeDisplay.textContent = codePatternMVC;
                document.getElementById('pattern-mvc-view').classList.remove('hidden');
                patternModeSelect.value = 'mvc';
            }
            else if (currentMode === 'pattern-layered') {
                codeTitle.textContent = 'pattern_layered.cpp';
                codeDisplay.textContent = codePatternLayered;
                document.getElementById('pattern-layered-view').classList.remove('hidden');
                patternModeSelect.value = 'layered';
            }
            else if (currentMode === 'pattern-pubsub') {
                codeTitle.textContent = 'pattern_pubsub.cpp';
                codeDisplay.textContent = codePatternPubSub;
                document.getElementById('pattern-pubsub-view').classList.remove('hidden');
                patternModeSelect.value = 'pubsub';
            }
            else if (currentMode === 'pattern-pipefilter') {
                codeTitle.textContent = 'pattern_pipefilter.cpp';
                codeDisplay.textContent = codePatternPipeFilter;
                document.getElementById('pattern-pipefilter-view').classList.remove('hidden');
                patternModeSelect.value = 'pipefilter';
            }
            else if (currentMode === 'pattern-di') {
                codeTitle.textContent = 'pattern_di.cpp';
                codeDisplay.textContent = codePatternDI;
                document.getElementById('pattern-di-view').classList.remove('hidden');
                patternModeSelect.value = 'di';
            }
        }
        if (window.VizCore) window.VizCore.domains().forEach((d) => { if (d.syncChrome) d.syncChrome(); });
        if (window.Prism && codeDisplay.isConnected) Prism.highlightElement(codeDisplay);
    }
    function registerBehaviors() {
        const R = window.VizRegistry;
        if (!R) return;
        const reg = (id, render, code, layout) => R.attach(id, { render, code, layout: layout || null });
        // Arrays
        // Trees
        // Searching & String Matching
        // File Structures
        // Memory / GC
        // Recursion
        // OOP Concepts
        reg('oop-inheritance', renderOOP, () => codeOOPInheritance, null);
        reg('oop-polymorphism', renderOOP, () => codeOOPPolymorphism, null);
        reg('oop-encapsulation', renderOOP, () => codeOOPEncapsulation, null);
        reg('oop-abstraction', renderOOP, () => codeOOPAbstraction, null);
        reg('oop-adhoc', renderOOP, () => codeOOPAdhoc, null);
        reg('oop-templates', renderOOP, () => codeOOPTemplates, null);
        // Design Patterns
        reg('pattern-singleton', renderPattern, () => codePatternSingleton, null);
        reg('pattern-factory', renderPattern, () => codePatternFactory, null);
        reg('pattern-adapter', renderPattern, () => codePatternAdapter, null);
        reg('pattern-decorator', renderPattern, () => codePatternDecorator, null);
        reg('pattern-observer', renderPattern, () => codePatternObserver, null);
        reg('pattern-strategy', renderPattern, () => codePatternStrategy, null);
        reg('pattern-mvc', renderPattern, () => codePatternMVC, null);
        reg('pattern-layered', renderPattern, () => codePatternLayered, null);
        reg('pattern-pubsub', renderPattern, () => codePatternPubSub, null);
        reg('pattern-pipefilter', renderPattern, () => codePatternPipeFilter, null);
        reg('pattern-di', renderPattern, () => codePatternDI, null);
        // nano-LLM
    }
    function renderAll() {
        syncDifficultySelect();
        const b = window.VizRegistry && window.VizRegistry.behavior(currentMode);
        if (b && b.render) { b.render(); return; }
        if (currentMode.includes('oop-')) renderOOP();
        else if (currentMode.includes('pattern-')) renderPattern();
    }

    function acquireDynamicVizHost() {
        const vizContainer = document.getElementById('visualizer-container');
        if (vizContainer) vizContainer.classList.add('hidden');
        let host = document.getElementById('dynamic-viz-host');
        if (!host) {
            host = document.createElement('div');
            host.id = 'dynamic-viz-host';
            runtimeVisualizer.appendChild(host);
        }
        host.classList.remove('hidden');
        host.innerHTML = '';
        host.style.width = '';
        return host;
    }

    function buildStepControls(onStep, onReset, runIntervalMs) {
        const mode = (typeof currentMode !== 'undefined' && currentMode) ? currentMode : 'default';
        const storeKey = 'dsvisual.stepSpeed.' + mode;
        const clampV = (v) => Math.max(10, Math.min(600, v));
        let sliderVal = clampV(610 - (runIntervalMs || 500));
        try {
            const saved = localStorage.getItem(storeKey);
            if (saved !== null && saved !== '') { const n = parseInt(saved, 10); if (Number.isFinite(n)) sliderVal = clampV(n); }
        } catch (e) { /* localStorage unavailable — use default */ }

        const strip = document.createElement('div');
        strip.className = 'stepctl';
        strip.innerHTML =
            '<button type="button" data-action="step">Step</button>' +
            '<button type="button" data-action="run">Run</button>' +
            '<button type="button" data-action="reset">Reset</button>' +
            '<label class="stepctl-speed-wrap">Speed <input type="range" class="stepctl-speed" min="10" max="600" value="' + sliderVal + '"></label>';

        const runBtn = strip.querySelector('[data-action="run"]');
        const slider = strip.querySelector('.stepctl-speed');
        let timer = null;
        let state = 'idle'; // 'idle' | 'running' | 'paused'
        const delay = () => 610 - parseInt(slider.value, 10);

        function setBtn() { runBtn.textContent = (state === 'running') ? 'Pause' : (state === 'paused' ? 'Resume' : 'Run'); }
        function stopTimer() { if (timer) { clearInterval(timer); timer = null; } }
        function startTimer() {
            stopTimer();
            timer = setInterval(() => { const more = onStep(); if (more === false) { stopTimer(); state = 'idle'; setBtn(); } }, delay());
        }
        function run() { state = 'running'; setBtn(); startTimer(); }
        function pause() { stopTimer(); state = 'paused'; setBtn(); }

        strip.querySelector('[data-action="step"]').onclick = () => { if (state === 'running') pause(); onStep(); };
        runBtn.onclick = () => { if (state === 'running') pause(); else run(); };
        strip.querySelector('[data-action="reset"]').onclick = () => { stopTimer(); state = 'idle'; setBtn(); onReset(); };
        slider.addEventListener('input', () => {
            try { localStorage.setItem(storeKey, String(slider.value)); } catch (e) { /* ignore */ }
            if (state === 'running') startTimer(); // live re-apply new speed
        });
        setBtn();
        return strip;
    }

    // End original routines mappings

    // OOP Visualization Functions
    const OOP_STEPS = {
        inheritance: [
            'Base class Animal defines the shared interface.',
            'Derived classes Dog and Cat inherit the common contract.',
            'Overrides specialize behavior while preserving the same API.',
            'Use a base pointer/reference to treat derived objects uniformly.',
        ],
        polymorphism: [
            'An object stores a vptr that points at its virtual table.',
            'The vtable holds function addresses for the concrete type.',
            'A base pointer calls speak(); dispatch follows vptr to Dog::speak.',
            'The same call expression dispatches to Cat::speak for a Cat object.',
        ],
        encapsulation: [
            'The class boundary owns its data and invariants.',
            'public members form the controlled external interface.',
            'protected members are available to derived classes only.',
            'private data is hidden; methods guard all direct access.',
        ],
        abstraction: [
            'Abstract Shape names the operation without implementation.',
            'Concrete classes implement area() with their own formulas.',
            'Instantiating Shape directly is rejected by the compiler.',
            'Code can still depend on Shape* and call the abstract interface.',
        ],
        adhoc: [
            'Several overloads share one function name.',
            'Argument types choose the exact overload at compile time.',
            'Operator overloading gives user types natural expressions.',
            'No runtime dispatch is needed; binding is static.',
        ],
        templates: [
            'A template is a compile-time blueprint parameterized by T.',
            'The compiler instantiates Box<int> where int is used.',
            'Other concrete types get their own generated class.',
            'Parametric polymorphism keeps one source definition type-safe.',
        ],
    };

    const OOP_COLORS = {
        blue: '#1d4ed8',
        pink: '#be185d',
        green: '#047857',
        amber: '#b45309',
        violet: '#6d28d9',
        red: '#b91c1c',
        slate: '#334155',
        cyan: '#0e7490',
    };

    function oopSvgEl(tag, attrs) {
        const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
        for (const k in attrs) el.setAttribute(k, String(attrs[k]));
        return el;
    }

    function oopStep(mode) {
        const steps = OOP_STEPS[mode] || [];
        return Math.max(0, Math.min(oopStepState[mode] || 0, Math.max(steps.length - 1, 0)));
    }

    function setOopStep(mode, idx) {
        const steps = OOP_STEPS[mode] || [];
        oopStepState[mode] = Math.max(0, Math.min(idx, Math.max(steps.length - 1, 0)));
    }

    function oopActiveClass(step, refs) {
        return refs.includes(step) ? ' oop-step-active' : ' oop-step-dim';
    }

    function drawOopBox(svg, opts) {
        const rect = oopSvgEl('rect', {
            x: opts.x, y: opts.y, width: opts.w, height: opts.h, rx: opts.rx || 8,
            class: (opts.className || 'oop-class-rect') + (opts.activeClass || ''),
        });
        if (opts.dashed) rect.setAttribute('stroke-dasharray', '6 4');
        svg.appendChild(rect);
        const cx = opts.x + opts.w / 2;
        const title = oopSvgEl('text', {
            x: cx, y: opts.y + 24, 'text-anchor': 'middle',
            class: 'oop-member-text oop-title-text' + (opts.activeClass || ''),
            style: 'fill:' + (opts.titleColor || OOP_COLORS.blue) + ';' + (opts.dashed ? 'font-style:italic;' : ''),
        });
        title.textContent = opts.title;
        svg.appendChild(title);
        (opts.lines || []).forEach((ln, i) => {
            const t = oopSvgEl('text', {
                x: cx, y: opts.y + 48 + i * 18, 'text-anchor': 'middle',
                class: 'oop-member-text' + (opts.activeClass || ''),
                style: 'fill:' + (ln.color || OOP_COLORS.slate) + ';',
            });
            t.textContent = ln.text;
            svg.appendChild(t);
        });
    }

    function drawOopLabel(svg, x, y, text, color, activeClass) {
        const t = oopSvgEl('text', {
            x: x, y: y, 'text-anchor': 'middle',
            class: 'oop-member-text oop-label-text' + (activeClass || ''),
            style: 'fill:' + (color || OOP_COLORS.slate) + ';',
        });
        t.textContent = text;
        svg.appendChild(t);
    }

    function drawOopLine(svg, x1, y1, x2, y2, activeClass) {
        svg.appendChild(oopSvgEl('line', {
            x1: x1, y1: y1, x2: x2, y2: y2,
            class: 'oop-inheritance-line' + (activeClass || ''),
        }));
    }

    function drawOopStepBadge(svg, mode) {
        const step = oopStep(mode);
        const total = OOP_STEPS[mode].length;
        drawOopLabel(svg, 57, 37, 'Step ' + (step + 1) + '/' + total, OOP_COLORS.slate, ' oop-step-badge-text');
        drawOopLabel(svg, 250, 336, OOP_STEPS[mode][step], OOP_COLORS.slate, ' oop-step-caption');
    }

    function syncOopStepControls() {
        if (!oopActions) return;
        let slot = oopActions.querySelector('[data-oop-step-controls]');
        const mode = oopModeSelect.value;
        if (slot && slot.getAttribute('data-oop-step-mode') === mode) return;
        if (slot) slot.remove();
        slot = document.createElement('div');
        slot.setAttribute('data-oop-step-controls', '');
        slot.setAttribute('data-oop-step-mode', mode);
        slot.appendChild(buildStepControls(() => {
            const next = oopStep(mode) + 1;
            if (next >= OOP_STEPS[mode].length) return false;
            setOopStep(mode, next);
            renderOOP();
            showStatus(OOP_STEPS[mode][oopStep(mode)], '#2563eb');
            return true;
        }, () => {
            setOopStep(mode, 0);
            renderOOP();
            showStatus('OOP visualization reset.', '#6366f1');
        }, 900));
        oopActions.appendChild(slot);
    }

    function renderOOP() {
        const mode = oopModeSelect.value;
        if (mode === 'inheritance') renderOOPInheritance();
        else if (mode === 'polymorphism') renderOOPPolymorphism();
        else if (mode === 'encapsulation') renderOOPEncapsulation();
        else if (mode === 'abstraction') renderOOPAbstraction();
        else if (mode === 'adhoc') renderOOPAdhoc();
        else if (mode === 'templates') renderOOPTemplates();
        syncOopStepControls();
    }

    function renderOOPInheritance() {
        const svg = document.getElementById('oop-inheritance-svg');
        if (!svg) return;
        const step = oopStep('inheritance');
        svg.innerHTML = '';
        drawOopStepBadge(svg, 'inheritance');
        drawOopBox(svg, { x: 180, y: 56, w: 140, h: 84, title: 'Animal (Base)', titleColor: OOP_COLORS.blue,
            activeClass: oopActiveClass(step, [0, 3]), lines: [{ text: '+ virtual speak()', color: OOP_COLORS.amber }] });
        drawOopBox(svg, { x: 70, y: 188, w: 130, h: 86, title: 'Dog', titleColor: OOP_COLORS.pink,
            className: 'oop-derived-rect', activeClass: oopActiveClass(step, [1, 2, 3]), lines: [{ text: 'speak() override', color: OOP_COLORS.green }] });
        drawOopBox(svg, { x: 320, y: 188, w: 130, h: 86, title: 'Cat', titleColor: OOP_COLORS.pink,
            className: 'oop-derived-rect', activeClass: oopActiveClass(step, [1, 2, 3]), lines: [{ text: 'speak() override', color: OOP_COLORS.green }] });
        drawOopLine(svg, 135, 188, 220, 140, oopActiveClass(step, [1, 3]));
        drawOopLine(svg, 385, 188, 280, 140, oopActiveClass(step, [1, 3]));
        drawOopLabel(svg, 250, 166, 'is-a relationship', OOP_COLORS.cyan, oopActiveClass(step, [1]));
        drawOopLabel(svg, 250, 306, 'Animal* p can point to Dog or Cat', OOP_COLORS.green, oopActiveClass(step, [3]));
    }

    function renderOOPPolymorphism() {
        const svg = document.getElementById('oop-poly-svg');
        if (!svg) return;
        const step = oopStep('polymorphism');
        svg.innerHTML = '';
        drawOopStepBadge(svg, 'polymorphism');
        drawOopBox(svg, { x: 34, y: 72, w: 180, h: 78, title: 'Animal* p', titleColor: OOP_COLORS.blue,
            activeClass: oopActiveClass(step, [2, 3]), lines: [{ text: 'p->speak()', color: OOP_COLORS.slate }] });
        drawOopBox(svg, { x: 34, y: 196, w: 180, h: 78, title: 'Object memory', titleColor: OOP_COLORS.amber,
            className: 'oop-vptr-box', activeClass: oopActiveClass(step, [0]), lines: [{ text: 'vptr -> vtable', color: OOP_COLORS.amber }] });
        drawOopBox(svg, { x: 306, y: 54, w: 170, h: 114, title: 'Dog VTable', titleColor: OOP_COLORS.green,
            activeClass: oopActiveClass(step, [1, 2]), lines: [{ text: 'speak: Dog::speak', color: OOP_COLORS.green }, { text: 'dtor: Dog::~Dog', color: OOP_COLORS.slate }] });
        drawOopBox(svg, { x: 306, y: 190, w: 170, h: 114, title: 'Cat VTable', titleColor: OOP_COLORS.pink,
            activeClass: oopActiveClass(step, [1, 3]), lines: [{ text: 'speak: Cat::speak', color: OOP_COLORS.pink }, { text: 'dtor: Cat::~Cat', color: OOP_COLORS.slate }] });
        drawOopLine(svg, 214, 235, 306, 112, oopActiveClass(step, [0, 1, 2]));
        drawOopLine(svg, 214, 235, 306, 248, oopActiveClass(step, [0, 1, 3]));
        drawOopLabel(svg, 254, 96, 'dispatch', OOP_COLORS.green, oopActiveClass(step, [2]));
        drawOopLabel(svg, 254, 268, 'same call, different target', OOP_COLORS.pink, oopActiveClass(step, [3]));
    }

    function renderOOPEncapsulation() {
        const svg = document.getElementById('oop-encap-svg');
        if (!svg) return;
        const step = oopStep('encapsulation');
        svg.innerHTML = '';
        drawOopStepBadge(svg, 'encapsulation');
        drawOopBox(svg, { x: 52, y: 56, w: 396, h: 250, title: 'class BankAccount', titleColor: OOP_COLORS.blue,
            activeClass: oopActiveClass(step, [0]), lines: [] });
        drawOopBox(svg, { x: 84, y: 94, w: 330, h: 64, title: 'public:', titleColor: OOP_COLORS.green,
            activeClass: oopActiveClass(step, [1]), lines: [{ text: '+ deposit()   + withdraw()   + getBalance()', color: OOP_COLORS.green }] });
        drawOopBox(svg, { x: 84, y: 170, w: 330, h: 58, title: 'protected:', titleColor: OOP_COLORS.amber,
            activeClass: oopActiveClass(step, [2]), lines: [{ text: '# validate()   # logTransaction()', color: OOP_COLORS.amber }] });
        drawOopBox(svg, { x: 84, y: 240, w: 330, h: 58, title: 'private:', titleColor: OOP_COLORS.violet,
            activeClass: oopActiveClass(step, [3]), lines: [{ text: '- m_balance   - m_lock', color: OOP_COLORS.violet }] });
        drawOopLabel(svg, 250, 326, step === 3 ? 'Only member functions touch private state directly.' : 'Access modifiers define who may use each member.', OOP_COLORS.slate, '');
    }

    function renderOOPAbstraction() {
        const svg = document.getElementById('oop-abstraction-svg');
        if (!svg) return;
        const step = oopStep('abstraction');
        svg.innerHTML = '';
        drawOopStepBadge(svg, 'abstraction');
        drawOopBox(svg, { x: 170, y: 58, w: 160, h: 78, title: 'Shape abstract', titleColor: OOP_COLORS.violet,
            dashed: true, activeClass: oopActiveClass(step, [0, 2, 3]), lines: [{ text: '+ area() = 0', color: OOP_COLORS.amber }] });
        drawOopBox(svg, { x: 54, y: 200, w: 156, h: 72, title: 'Circle', titleColor: OOP_COLORS.pink,
            className: 'oop-derived-rect', activeClass: oopActiveClass(step, [1, 3]), lines: [{ text: '+ area() override', color: OOP_COLORS.green }] });
        drawOopBox(svg, { x: 290, y: 200, w: 156, h: 72, title: 'Rectangle', titleColor: OOP_COLORS.pink,
            className: 'oop-derived-rect', activeClass: oopActiveClass(step, [1, 3]), lines: [{ text: '+ area() override', color: OOP_COLORS.green }] });
        drawOopLine(svg, 132, 200, 224, 136, oopActiveClass(step, [1, 3]));
        drawOopLine(svg, 368, 200, 276, 136, oopActiveClass(step, [1, 3]));
        drawOopLabel(svg, 250, 168, 'Shape s; compile error', OOP_COLORS.red, oopActiveClass(step, [2]));
        drawOopLabel(svg, 250, 306, 'Shape* p = new Circle(); p->area();', OOP_COLORS.green, oopActiveClass(step, [3]));
    }

    function renderOOPAdhoc() {
        const svg = document.getElementById('oop-adhoc-svg');
        if (!svg) return;
        const step = oopStep('adhoc');
        svg.innerHTML = '';
        drawOopStepBadge(svg, 'adhoc');
        drawOopLabel(svg, 110, 64, 'Call sites', OOP_COLORS.slate, oopActiveClass(step, [0, 1]));
        drawOopLabel(svg, 390, 64, 'Selected overload', OOP_COLORS.slate, oopActiveClass(step, [0, 1]));
        const calls = ['print(42)', 'print(3.14)', 'print("hi")'];
        const funcs = ['print(int)', 'print(double)', 'print(string)'];
        for (let i = 0; i < 3; i++) {
            const y = 84 + i * 48;
            drawOopBox(svg, { x: 34, y: y, w: 154, h: 36, title: calls[i], titleColor: OOP_COLORS.blue, activeClass: oopActiveClass(step, [0, 1]) });
            drawOopBox(svg, { x: 314, y: y, w: 154, h: 36, title: funcs[i], titleColor: OOP_COLORS.green, activeClass: oopActiveClass(step, [0, 1]) });
            drawOopLine(svg, 188, y + 18, 314, y + 18, oopActiveClass(step, [1]));
        }
        drawOopBox(svg, { x: 34, y: 254, w: 154, h: 52, title: 'v1 + v2', titleColor: OOP_COLORS.blue,
            activeClass: oopActiveClass(step, [2]), lines: [{ text: 'Vector2D values', color: OOP_COLORS.slate }] });
        drawOopBox(svg, { x: 314, y: 254, w: 154, h: 52, title: 'operator+', titleColor: OOP_COLORS.green,
            activeClass: oopActiveClass(step, [2]), lines: [{ text: 'Vector2D::operator+', color: OOP_COLORS.slate }] });
        drawOopLine(svg, 188, 280, 314, 280, oopActiveClass(step, [2]));
        drawOopLabel(svg, 250, 230, 'Static binding: the compiler chooses before runtime.', OOP_COLORS.amber, oopActiveClass(step, [3]));
    }

    function renderOOPTemplates() {
        const svg = document.getElementById('oop-templates-svg');
        if (!svg) return;
        const step = oopStep('templates');
        svg.innerHTML = '';
        drawOopStepBadge(svg, 'templates');
        drawOopBox(svg, { x: 152, y: 64, w: 196, h: 78, title: 'template<typename T>', titleColor: OOP_COLORS.violet,
            dashed: true, activeClass: oopActiveClass(step, [0, 3]), lines: [{ text: 'class Box { T value; }', color: OOP_COLORS.amber }] });
        const insts = ['Box<int>', 'Box<double>', 'Box<string>'];
        for (let i = 0; i < 3; i++) {
            const x = 38 + i * 154;
            drawOopBox(svg, { x: x, y: 212, w: 130, h: 62, title: insts[i], titleColor: i === 0 ? OOP_COLORS.green : OOP_COLORS.cyan,
                activeClass: oopActiveClass(step, i === 0 ? [1, 3] : [2, 3]), lines: [{ text: 'concrete class', color: OOP_COLORS.slate }] });
            drawOopLine(svg, 250, 142, x + 65, 212, oopActiveClass(step, i === 0 ? [1, 3] : [2, 3]));
        }
        drawOopLabel(svg, 250, 180, 'The source stays generic; generated code is concrete.', OOP_COLORS.slate, oopActiveClass(step, [3]));
    }

    // OOP Button Listeners
    oopModeSelect.addEventListener('change', () => {
        currentMode = 'oop-' + oopModeSelect.value;
        updateLayout();
        renderAll();
    });

    btnOopDemo.addEventListener('click', () => {
        currentMode = 'oop-' + oopModeSelect.value;
        updateLayout();
        renderAll();
        executeAnimWrapper(async () => await visualizeOOPSteps(oopModeSelect.value));
    });

    btnOopReset.addEventListener('click', () => {
        oopInheritanceAnimationState = null;
        oopPolymorphismAnimationState = null;
        oopEncapsulationAnimationState = null;
        renderOOP();
        showStatus('OOP visualization reset.', '#6366f1');
    });

    async function visualizeOOPSteps(mode) {
        setOopStep(mode, 0);
        renderOOP();
        for (let i = 0; i < OOP_STEPS[mode].length; i++) {
            setOopStep(mode, i);
            renderOOP();
            showStatus(OOP_STEPS[mode][i], '#2563eb');
            await sleep(850);
        }
        return '__KEEP_STATUS__';
    }

    async function visualizeOOPInheritance() {
        return visualizeOOPSteps('inheritance');
    }

    async function visualizeOOPPolymorphism() {
        return visualizeOOPSteps('polymorphism');
    }

    async function visualizeOOPEncapsulation() {
        return visualizeOOPSteps('encapsulation');
    }

    // ========== DESIGN PATTERNS VISUALIZATION ==========
    function renderPattern() {
        const mode = currentMode.replace('pattern-', '');
        if (mode === 'singleton') renderPatternSingleton();
        else if (mode === 'factory') renderPatternFactory();
        else if (mode === 'adapter') renderPatternAdapter();
        else if (mode === 'decorator') renderPatternDecorator();
        else if (mode === 'observer') renderPatternObserver();
        else if (mode === 'strategy') renderPatternStrategy();
        else if (mode === 'mvc') renderPatternMVC();
        else if (mode === 'layered') renderPatternLayered();
        else if (mode === 'pubsub') renderPatternPubSub();
        else if (mode === 'pipefilter') renderPatternPipeFilter();
        else if (mode === 'di') renderPatternDI();
    }

    function renderPatternSingleton() {
        const svg = document.getElementById('pattern-singleton-svg');
        svg.innerHTML = '';
        
        // Singleton box
        const singletonBox = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        singletonBox.setAttribute('x', '150'); singletonBox.setAttribute('y', '80');
        singletonBox.setAttribute('width', '300'); singletonBox.setAttribute('height', '120');
        singletonBox.setAttribute('fill', '#ec4899'); singletonBox.setAttribute('stroke', '#be185d'); singletonBox.setAttribute('stroke-width', '2');
        svg.appendChild(singletonBox);

        // Class name
        const className = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        className.setAttribute('x', '300'); className.setAttribute('y', '105');
        className.setAttribute('text-anchor', 'middle'); className.setAttribute('font-size', '16'); className.setAttribute('font-weight', 'bold');
        className.setAttribute('fill', 'white');
        className.textContent = 'Singleton';
        svg.appendChild(className);

        // Members
        const members = ['- static instance', '- private constructor', '+ getInstance()'];
        members.forEach((m, i) => {
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', '165'); text.setAttribute('y', '130 + i*18');
            text.setAttribute('font-family', 'monospace'); text.setAttribute('font-size', '11'); text.setAttribute('fill', '#fca5a5');
            text.textContent = m;
            svg.appendChild(text);
        });

        // Access arrows
        const arrow1 = createArrow(svg, '300', '200', '300', '240', '#fbbf24');
        const label1 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label1.setAttribute('x', '310'); label1.setAttribute('y', '225');
        label1.setAttribute('font-size', '12'); label1.setAttribute('fill', '#fbbf24');
        label1.textContent = 'Unique Instance';
        svg.appendChild(label1);

        // Instance box
        const instBox = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        instBox.setAttribute('x', '180'); instBox.setAttribute('y', '240');
        instBox.setAttribute('width', '240'); instBox.setAttribute('height', '40');
        instBox.setAttribute('fill', '#fef08a'); instBox.setAttribute('stroke', '#eab308'); instBox.setAttribute('stroke-width', '2');
        svg.appendChild(instBox);

        const instText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        instText.setAttribute('x', '300'); instText.setAttribute('y', '267');
        instText.setAttribute('text-anchor', 'middle'); instText.setAttribute('font-size', '13'); instText.setAttribute('font-family', 'monospace');
        instText.setAttribute('fill', '#78350f');
        instText.textContent = 's1 = Singleton::getInstance()';
        svg.appendChild(instText);
    }

    function renderPatternFactory() {
        const svg = document.getElementById('pattern-factory-svg');
        svg.innerHTML = '';

        // Factory box
        const factoryBox = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        factoryBox.setAttribute('x', '180'); factoryBox.setAttribute('y', '20');
        factoryBox.setAttribute('width', '240'); factoryBox.setAttribute('height', '60');
        factoryBox.setAttribute('fill', '#ec4899'); factoryBox.setAttribute('stroke', '#be185d'); factoryBox.setAttribute('stroke-width', '2');
        svg.appendChild(factoryBox);

        const factoryText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        factoryText.setAttribute('x', '300'); factoryText.setAttribute('y', '55');
        factoryText.setAttribute('text-anchor', 'middle'); factoryText.setAttribute('font-size', '14'); factoryText.setAttribute('font-weight', 'bold');
        factoryText.setAttribute('fill', 'white');
        factoryText.textContent = 'VehicleFactory';
        svg.appendChild(factoryText);

        // Product interface
        const prodBox = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        prodBox.setAttribute('x', '240'); prodBox.setAttribute('y', '120');
        prodBox.setAttribute('width', '120'); prodBox.setAttribute('height', '50');
        prodBox.setAttribute('fill', '#60a5fa'); prodBox.setAttribute('stroke', '#1e40af'); prodBox.setAttribute('stroke-width', '2');
        svg.appendChild(prodBox);

        const prodText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        prodText.setAttribute('x', '300'); prodText.setAttribute('y', '153');
        prodText.setAttribute('text-anchor', 'middle'); prodText.setAttribute('font-size', '12'); prodText.setAttribute('font-weight', 'bold');
        prodText.setAttribute('fill', 'white');
        prodText.textContent = '<<interface>>';
        svg.appendChild(prodText);

        const prodName = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        prodName.setAttribute('x', '300'); prodName.setAttribute('y', '168');
        prodName.setAttribute('text-anchor', 'middle'); prodName.setAttribute('font-size', '11');
        prodName.setAttribute('fill', 'white');
        prodName.textContent = 'Vehicle';
        svg.appendChild(prodName);

        // Concrete products
        const carBox = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        carBox.setAttribute('x', '100'); carBox.setAttribute('y', '220');
        carBox.setAttribute('width', '100'); carBox.setAttribute('height', '40');
        carBox.setAttribute('fill', '#34d399'); carBox.setAttribute('stroke', '#059669'); carBox.setAttribute('stroke-width', '2');
        svg.appendChild(carBox);

        const carText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        carText.setAttribute('x', '150'); carText.setAttribute('y', '247');
        carText.setAttribute('text-anchor', 'middle'); carText.setAttribute('font-size', '12');
        carText.setAttribute('fill', 'white');
        carText.textContent = 'Car';
        svg.appendChild(carText);

        const bikeBox = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bikeBox.setAttribute('x', '280'); bikeBox.setAttribute('y', '220');
        bikeBox.setAttribute('width', '100'); bikeBox.setAttribute('height', '40');
        bikeBox.setAttribute('fill', '#34d399'); bikeBox.setAttribute('stroke', '#059669'); bikeBox.setAttribute('stroke-width', '2');
        svg.appendChild(bikeBox);

        const bikeText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        bikeText.setAttribute('x', '330'); bikeText.setAttribute('y', '247');
        bikeText.setAttribute('text-anchor', 'middle'); bikeText.setAttribute('font-size', '12');
        bikeText.setAttribute('fill', 'white');
        bikeText.textContent = 'Bike';
        svg.appendChild(bikeText);

        // Factory creates arrow
        createArrow(svg, '240', '85', '180', '220', '#f59e0b');
        createArrow(svg, '360', '85', '380', '220', '#f59e0b');

        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', '280'); label.setAttribute('y', '200');
        label.setAttribute('font-size', '11'); label.setAttribute('fill', '#f59e0b');
        label.textContent = 'creates';
        svg.appendChild(label);
    }

    function renderPatternAdapter() {
        const svg = document.getElementById('pattern-adapter-svg');
        svg.innerHTML = '';

        // Legacy system
        const legacyBox = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        legacyBox.setAttribute('x', '50'); legacyBox.setAttribute('y', '100');
        legacyBox.setAttribute('width', '120'); legacyBox.setAttribute('height', '60');
        legacyBox.setAttribute('fill', '#fb7185'); legacyBox.setAttribute('stroke', '#be185d'); legacyBox.setAttribute('stroke-width', '2');
        svg.appendChild(legacyBox);

        const legacyText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        legacyText.setAttribute('x', '110'); legacyText.setAttribute('y', '128');
        legacyText.setAttribute('text-anchor', 'middle'); legacyText.setAttribute('font-size', '11'); legacyText.setAttribute('font-weight', 'bold');
        legacyText.setAttribute('fill', 'white');
        legacyText.textContent = 'Legacy';
        svg.appendChild(legacyText);

        // Adapter bridge
        const adapterBox = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        adapterBox.setAttribute('x', '220'); adapterBox.setAttribute('y', '80');
        adapterBox.setAttribute('width', '160'); adapterBox.setAttribute('height', '100');
        adapterBox.setAttribute('fill', '#10b981'); adapterBox.setAttribute('stroke', '#047857'); adapterBox.setAttribute('stroke-width', '2');
        svg.appendChild(adapterBox);

        const adapterTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        adapterTitle.setAttribute('x', '300'); adapterTitle.setAttribute('y', '100');
        adapterTitle.setAttribute('text-anchor', 'middle'); adapterTitle.setAttribute('font-size', '12'); adapterTitle.setAttribute('font-weight', 'bold');
        adapterTitle.setAttribute('fill', 'white');
        adapterTitle.textContent = 'Adapter';
        svg.appendChild(adapterTitle);

        const adapterLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        adapterLine.setAttribute('x1', '220'); adapterLine.setAttribute('y1', '115');
        adapterLine.setAttribute('x2', '380'); adapterLine.setAttribute('y2', '115');
        adapterLine.setAttribute('stroke', 'rgba(255,255,255,0.3)'); adapterLine.setAttribute('stroke-width', '1');
        svg.appendChild(adapterLine);

        const adapterContent = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        adapterContent.setAttribute('x', '230'); adapterContent.setAttribute('y', '140');
        adapterContent.setAttribute('font-size', '10'); adapterContent.setAttribute('fill', '#d1fae5');
        adapterContent.textContent = '+ fetch()';
        svg.appendChild(adapterContent);

        const adapterImpl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        adapterImpl.setAttribute('x', '230'); adapterImpl.setAttribute('y', '160');
        adapterImpl.setAttribute('font-size', '10'); adapterImpl.setAttribute('font-style', 'italic'); adapterImpl.setAttribute('fill', '#a7f3d0');
        adapterImpl.textContent = 'wraps legacy.getData()';
        svg.appendChild(adapterImpl);

        // Modern system
        const modernBox = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        modernBox.setAttribute('x', '450'); modernBox.setAttribute('y', '100');
        modernBox.setAttribute('width', '120'); modernBox.setAttribute('height', '60');
        modernBox.setAttribute('fill', '#60a5fa'); modernBox.setAttribute('stroke', '#1e40af'); modernBox.setAttribute('stroke-width', '2');
        svg.appendChild(modernBox);

        const modernText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        modernText.setAttribute('x', '510'); modernText.setAttribute('y', '128');
        modernText.setAttribute('text-anchor', 'middle'); modernText.setAttribute('font-size', '11'); modernText.setAttribute('font-weight', 'bold');
        modernText.setAttribute('fill', 'white');
        modernText.textContent = 'Modern';
        svg.appendChild(modernText);

        // Connections
        createArrow(svg, '170', '130', '220', '130', '#fbbf24');
        createArrow(svg, '380', '130', '450', '130', '#fbbf24');
    }

    function renderPatternDecorator() {
        const svg = document.getElementById('pattern-decorator-svg');
        svg.innerHTML = '';

        // Component interface
        const compBox = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        compBox.setAttribute('x', '240'); compBox.setAttribute('y', '20');
        compBox.setAttribute('width', '120'); compBox.setAttribute('height', '50');
        compBox.setAttribute('fill', '#06b6d4'); compBox.setAttribute('stroke', '#0369a1'); compBox.setAttribute('stroke-width', '2');
        svg.appendChild(compBox);

        const compText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        compText.setAttribute('x', '300'); compText.setAttribute('y', '52');
        compText.setAttribute('text-anchor', 'middle'); compBox.setAttribute('font-size', '12'); compText.setAttribute('fill', 'white');
        compText.textContent = 'Coffee';
        svg.appendChild(compText);

        // Simple coffee
        const simpleBox = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        simpleBox.setAttribute('x', '100'); simpleBox.setAttribute('y', '120');
        simpleBox.setAttribute('width', '100'); simpleBox.setAttribute('height', '50');
        simpleBox.setAttribute('fill', '#10b981'); simpleBox.setAttribute('stroke', '#059669'); simpleBox.setAttribute('stroke-width', '2');
        svg.appendChild(simpleBox);

        const simpleText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        simpleText.setAttribute('x', '150'); simpleText.setAttribute('y', '150');
        simpleText.setAttribute('text-anchor', 'middle'); simpleText.setAttribute('font-size', '11'); simpleText.setAttribute('fill', 'white');
        simpleText.textContent = 'SimpleCoffee';
        svg.appendChild(simpleText);

        // Decorators
        const decBox1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        decBox1.setAttribute('x', '280'); decBox1.setAttribute('y', '120');
        decBox1.setAttribute('width', '100'); decBox1.setAttribute('height', '50');
        decBox1.setAttribute('fill', '#f59e0b'); decBox1.setAttribute('stroke', '#d97706'); decBox1.setAttribute('stroke-width', '2');
        svg.appendChild(decBox1);

        const decText1 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        decText1.setAttribute('x', '330'); decText1.setAttribute('y', '150');
        decText1.setAttribute('text-anchor', 'middle'); decText1.setAttribute('font-size', '11'); decText1.setAttribute('fill', 'white');
        decText1.textContent = 'Milk';
        svg.appendChild(decText1);

        const decBox2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        decBox2.setAttribute('x', '460'); decBox2.setAttribute('y', '120');
        decBox2.setAttribute('width', '100'); decBox2.setAttribute('height', '50');
        decBox2.setAttribute('fill', '#f59e0b'); decBox2.setAttribute('stroke', '#d97706'); decBox2.setAttribute('stroke-width', '2');
        svg.appendChild(decBox2);

        const decText2 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        decText2.setAttribute('x', '510'); decText2.setAttribute('y', '150');
        decText2.setAttribute('text-anchor', 'middle'); decText2.setAttribute('font-size', '11'); decText2.setAttribute('fill', 'white');
        decText2.textContent = 'Sugar';
        svg.appendChild(decText2);

        // Inheritance arrows
        createArrow(svg, '150', '120', '280', '70', '#34d399');
        createArrow(svg, '330', '120', '300', '70', '#34d399');
        createArrow(svg, '510', '120', '340', '70', '#34d399');

        // Composition chain
        createArrow(svg, '200', '147', '280', '147', '#fbbf24');
        createArrow(svg, '380', '147', '460', '147', '#fbbf24');

        const label1 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label1.setAttribute('x', '238'); label1.setAttribute('y', '140');
        label1.setAttribute('font-size', '10'); label1.setAttribute('fill', '#fbbf24');
        label1.textContent = 'wraps';
        svg.appendChild(label1);
    }

    function renderPatternObserver() {
        const svg = document.getElementById('pattern-observer-svg');
        svg.innerHTML = '';

        // Subject
        const subjectBox = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        subjectBox.setAttribute('x', '220'); subjectBox.setAttribute('y', '50');
        subjectBox.setAttribute('width', '160'); subjectBox.setAttribute('height', '70');
        subjectBox.setAttribute('fill', '#f97316'); subjectBox.setAttribute('stroke', '#c2410c'); subjectBox.setAttribute('stroke-width', '2');
        svg.appendChild(subjectBox);

        const subText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        subText.setAttribute('x', '300'); subText.setAttribute('y', '75');
        subText.setAttribute('text-anchor', 'middle'); subText.setAttribute('font-size', '12'); subText.setAttribute('font-weight', 'bold');
        subText.setAttribute('fill', 'white');
        subText.textContent = 'Subject';
        svg.appendChild(subText);

        const subMethod = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        subMethod.setAttribute('x', '230'); subMethod.setAttribute('y', '100');
        subMethod.setAttribute('font-size', '10'); subMethod.setAttribute('fill', '#fed7aa');
        subMethod.textContent = '+ notify()';
        svg.appendChild(subMethod);

        // Observers
        for (let i = 0; i < 3; i++) {
            const obsBox = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            obsBox.setAttribute('x', String(60 + i * 170)); obsBox.setAttribute('y', '180');
            obsBox.setAttribute('width', '130'); obsBox.setAttribute('height', '50');
            obsBox.setAttribute('fill', '#06b6d4'); obsBox.setAttribute('stroke', '#0369a1'); obsBox.setAttribute('stroke-width', '2');
            svg.appendChild(obsBox);

            const obsText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            obsText.setAttribute('x', String(125 + i * 170)); obsText.setAttribute('y', '212');
            obsText.setAttribute('text-anchor', 'middle'); obsText.setAttribute('font-size', '11');
            obsText.setAttribute('fill', 'white');
            obsText.textContent = `Observer${i + 1}`;
            svg.appendChild(obsText);

            // Notification arrow
            createArrow(svg, String(280 - 20 * i), '120', String(125 + i * 170), '180', '#34d399');
        }
    }

    function renderPatternStrategy() {
        const svg = document.getElementById('pattern-strategy-svg');
        svg.innerHTML = '';

        // Context
        const contextBox = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        contextBox.setAttribute('x', '50'); contextBox.setAttribute('y', '100');
        contextBox.setAttribute('width', '140'); contextBox.setAttribute('height', '70');
        contextBox.setAttribute('fill', '#f97316'); contextBox.setAttribute('stroke', '#c2410c'); contextBox.setAttribute('stroke-width', '2');
        svg.appendChild(contextBox);

        const contextText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        contextText.setAttribute('x', '120'); contextText.setAttribute('y', '125');
        contextText.setAttribute('text-anchor', 'middle'); contextText.setAttribute('font-size', '11'); contextText.setAttribute('font-weight', 'bold');
        contextText.setAttribute('fill', 'white');
        contextText.textContent = 'Processor';
        svg.appendChild(contextText);

        const contextMethod = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        contextMethod.setAttribute('x', '60'); contextMethod.setAttribute('y', '150');
        contextMethod.setAttribute('font-size', '9'); contextMethod.setAttribute('fill', '#fed7aa');
        contextMethod.textContent = '+ execute()';
        svg.appendChild(contextMethod);

        // Strategy interface
        const stratBox = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        stratBox.setAttribute('x', '280'); stratBox.setAttribute('y', '80');
        stratBox.setAttribute('width', '120'); stratBox.setAttribute('height', '60');
        stratBox.setAttribute('fill', '#06b6d4'); stratBox.setAttribute('stroke', '#0369a1'); stratBox.setAttribute('stroke-width', '2');
        svg.appendChild(stratBox);

        const stratText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        stratText.setAttribute('x', '340'); stratText.setAttribute('y', '100');
        stratText.setAttribute('text-anchor', 'middle'); stratText.setAttribute('font-size', '11'); stratText.setAttribute('font-weight', 'bold');
        stratText.setAttribute('fill', 'white');
        stratText.textContent = '<<interface>>';
        svg.appendChild(stratText);

        const stratMethod = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        stratMethod.setAttribute('x', '340'); stratMethod.setAttribute('y', '125');
        stratMethod.setAttribute('text-anchor', 'middle'); stratMethod.setAttribute('font-size', '10');
        stratMethod.setAttribute('fill', 'white');
        stratMethod.textContent = 'Strategy';
        svg.appendChild(stratMethod);

        // Concrete strategies
        const concreteBg = ['#10b981', '#3b82f6'];
        const concreteNames = ['CardPayment', 'CryptoPayment'];
        for (let i = 0; i < 2; i++) {
            const concBox = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            concBox.setAttribute('x', String(280 + i * 130)); concBox.setAttribute('y', '190');
            concBox.setAttribute('width', '120'); concBox.setAttribute('height', '50');
            concBox.setAttribute('fill', concreteBg[i]); concBox.setAttribute('stroke', '#1f2937'); concBox.setAttribute('stroke-width', '2');
            svg.appendChild(concBox);

            const concText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            concText.setAttribute('x', String(340 + i * 130)); concText.setAttribute('y', '220');
            concText.setAttribute('text-anchor', 'middle'); concText.setAttribute('font-size', '10');
            concText.setAttribute('fill', 'white');
            concText.textContent = concreteNames[i];
            svg.appendChild(concText);

            // Inheritance
            createArrow(svg, String(340 + i * 130), '190', String(340 + i * 25), '140', '#34d399');
        }

        // Context uses strategy
        createArrow(svg, '190', '135', '280', '110', '#fbbf24');
    }

    function renderPatternMVC() {
        const svg = document.getElementById('pattern-mvc-svg');
        if (!svg) return;
        svg.innerHTML = '';
        drawOopBox(svg, { x: 190, y: 26, w: 140, h: 56, title: 'Controller', titleColor: '#f59e0b',
            lines: [ { text: 'handles input', color: '#cbd5e1' } ] });
        drawOopBox(svg, { x: 40, y: 200, w: 140, h: 56, title: 'Model', titleColor: '#34d399',
            lines: [ { text: 'data + state', color: '#cbd5e1' } ] });
        drawOopBox(svg, { x: 340, y: 200, w: 140, h: 56, title: 'View', titleColor: '#60a5fa',
            lines: [ { text: 'renders model', color: '#cbd5e1' } ] });
        drawOopLine(svg, 225, 82, 120, 200);   // Controller -> Model
        drawOopLine(svg, 180, 228, 340, 228);  // Model -> View
        drawOopLine(svg, 400, 200, 295, 82);   // View -> Controller
        drawOopLabel(svg, 150, 150, 'updates', '#f59e0b');
        drawOopLabel(svg, 260, 246, 'notifies', '#34d399');
        drawOopLabel(svg, 372, 150, 'user input', '#60a5fa');
    }

    function renderPatternLayered() {
        const svg = document.getElementById('pattern-layered-svg');
        if (!svg) return;
        svg.innerHTML = '';
        drawOopBox(svg, { x: 150, y: 24, w: 200, h: 58, title: 'Presentation', titleColor: '#60a5fa',
            lines: [ { text: 'formats output', color: '#cbd5e1' } ] });
        drawOopBox(svg, { x: 150, y: 122, w: 200, h: 58, title: 'Business', titleColor: '#f59e0b',
            lines: [ { text: 'applies rules', color: '#cbd5e1' } ] });
        drawOopBox(svg, { x: 150, y: 220, w: 200, h: 58, title: 'Data', titleColor: '#34d399',
            lines: [ { text: 'raw records', color: '#cbd5e1' } ] });
        drawOopLine(svg, 250, 82, 250, 122);    // Presentation -> Business
        drawOopLine(svg, 250, 180, 250, 220);   // Business -> Data
        drawOopLabel(svg, 320, 106, 'calls', '#94a3b8');
        drawOopLabel(svg, 320, 204, 'calls', '#94a3b8');
    }

    function renderPatternPubSub() {
        const svg = document.getElementById('pattern-pubsub-svg');
        if (!svg) return;
        svg.innerHTML = '';
        drawOopBox(svg, { x: 24, y: 130, w: 120, h: 58, title: 'Publisher', titleColor: '#f59e0b',
            lines: [ { text: 'emits events', color: '#cbd5e1' } ] });
        drawOopBox(svg, { x: 196, y: 130, w: 120, h: 58, title: 'EventBus', titleColor: '#a78bfa',
            lines: [ { text: 'broker', color: '#cbd5e1' } ] });
        drawOopBox(svg, { x: 372, y: 36, w: 116, h: 50, title: 'Subscriber A', titleColor: '#34d399' });
        drawOopBox(svg, { x: 372, y: 134, w: 116, h: 50, title: 'Subscriber B', titleColor: '#34d399' });
        drawOopBox(svg, { x: 372, y: 232, w: 116, h: 50, title: 'Subscriber C', titleColor: '#34d399' });
        drawOopLine(svg, 144, 159, 196, 159);   // Publisher -> EventBus
        drawOopLine(svg, 316, 159, 372, 61);    // EventBus -> A
        drawOopLine(svg, 316, 159, 372, 159);   // EventBus -> B
        drawOopLine(svg, 316, 159, 372, 257);   // EventBus -> C
        drawOopLabel(svg, 170, 150, 'publish', '#f59e0b');
        drawOopLabel(svg, 344, 110, 'notify', '#34d399');
    }

    function renderPatternPipeFilter() {
        const svg = document.getElementById('pattern-pipefilter-svg');
        if (!svg) return;
        svg.innerHTML = '';
        const stages = [
            { x: 12, title: 'Input', color: '#94a3b8' },
            { x: 110, title: 'Trim', color: '#34d399' },
            { x: 208, title: 'Upper', color: '#34d399' },
            { x: 306, title: 'Exclaim', color: '#34d399' },
            { x: 404, title: 'Output', color: '#60a5fa' },
        ];
        stages.forEach((s) => {
            drawOopBox(svg, { x: s.x, y: 132, w: 80, h: 56, title: s.title, titleColor: s.color });
        });
        for (let i = 0; i < stages.length - 1; i++) {
            drawOopLine(svg, stages[i].x + 80, 160, stages[i + 1].x, 160);
        }
        drawOopLabel(svg, 250, 220, 'data flows through each filter via pipes', '#94a3b8');
    }

    function renderPatternDI() {
        const svg = document.getElementById('pattern-di-svg');
        if (!svg) return;
        svg.innerHTML = '';
        drawOopBox(svg, { x: 150, y: 24, w: 210, h: 56, title: 'Composition Root', titleColor: '#ec4899',
            lines: [ { text: 'wires dependencies', color: '#cbd5e1' } ] });
        drawOopBox(svg, { x: 50, y: 192, w: 180, h: 70, title: 'ConsoleService', titleColor: '#34d399',
            lines: [ { text: 'concrete Service', color: '#cbd5e1' } ] });
        drawOopBox(svg, { x: 290, y: 192, w: 180, h: 70, title: 'Consumer', titleColor: '#60a5fa',
            lines: [ { text: 'depends on Service', color: '#cbd5e1' }, { text: 'never calls new', color: '#cbd5e1' } ] });
        drawOopLine(svg, 210, 80, 140, 192);   // Composition Root -> Service
        drawOopLine(svg, 300, 80, 380, 192);   // Composition Root -> Consumer
        drawOopLine(svg, 230, 227, 290, 227);  // Service injected -> Consumer
        drawOopLabel(svg, 150, 150, 'creates', '#34d399');
        drawOopLabel(svg, 360, 150, 'injects', '#60a5fa');
        drawOopLabel(svg, 260, 248, 'inject', '#ec4899');
    }

    function createArrow(svg, x1, y1, x2, y2, color) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1); line.setAttribute('y1', y1);
        line.setAttribute('x2', x2); line.setAttribute('y2', y2);
        line.setAttribute('stroke', color); line.setAttribute('stroke-width', '2');
        line.setAttribute('marker-end', 'url(#arrowhead-' + color.substring(1) + ')');
        svg.appendChild(line);
    }

    // Event listeners for Pattern actions
    btnPatternDemo.addEventListener('click', () => {
        const mode = patternModeSelect.value;
        executeAnimWrapper(async () => await visualizePattern(mode));
    });

    btnPatternReset.addEventListener('click', () => {
        patternAnimationState = null;
        renderPattern();
        showStatus('Pattern visualization reset.', '#6366f1');
    });

    async function visualizePattern(mode) {
        if (mode === 'singleton') {
            showStatus('Creating Singleton instance...', '#ec4899');
            await sleep(600);
            showStatus('getInstance() called - checks static instance', '#ec4899');
            await sleep(600);
            showStatus('Instance is null, creating new Singleton()', '#fbbf24');
            await sleep(600);
            showStatus('Singleton created and stored in static variable', '#34d399');
            await sleep(600);
            showStatus('All subsequent getInstance() calls return same instance', '#ec4899');
        } else if (mode === 'factory') {
            showStatus('Using Factory to create objects...', '#ec4899');
            await sleep(600);
            showStatus('VehicleFactory::createVehicle("car") called', '#f59e0b');
            await sleep(600);
            showStatus('Factory returns new Car() instance', '#34d399');
            await sleep(600);
            showStatus('VehicleFactory::createVehicle("bike") called', '#f59e0b');
            await sleep(600);
            showStatus('Factory returns new Bike() instance', '#34d399');
            await sleep(600);
            showStatus('Client code depends on interface, not concrete classes', '#10b981');
        } else if (mode === 'adapter') {
            showStatus('Adapting legacy interface to modern interface...', '#ec4899');
            await sleep(600);
            showStatus('Legacy system uses getData()', '#fb7185');
            await sleep(600);
            showStatus('Adapter wraps legacy object', '#10b981');
            await sleep(600);
            showStatus('fetch() calls legacy.getData() internally', '#34d399');
            await sleep(600);
            showStatus('Modern code calls adapter.fetch()', '#60a5fa');
            await sleep(600);
            showStatus('Incompatible interfaces now work together!', '#34d399');
        } else if (mode === 'decorator') {
            showStatus('Decorating SimpleCoffee with features...', '#ec4899');
            await sleep(600);
            showStatus('Create SimpleCoffee: $2.00', '#34d399');
            await sleep(600);
            showStatus('Add Milk decorator: +$0.50', '#f59e0b');
            await sleep(600);
            showStatus('Compose: new Milk(coffee)', '#34d399');
            await sleep(600);
            showStatus('Result: Coffee with Milk - $2.50', '#fbbf24');
            await sleep(600);
            showStatus('Each decorator adds behavior/cost without subclassing', '#34d399');
        } else if (mode === 'observer') {
            showStatus('Setting up Observer pattern...', '#ec4899');
            await sleep(600);
            showStatus('Create Subject and register Observers', '#f59e0b');
            await sleep(600);
            showStatus('Observer1, Observer2, Observer3 attached', '#34d399');
            await sleep(600);
            showStatus('Subject state changes: notify() called', '#fbbf24');
            await sleep(600);
            showStatus('All observers receive update notification', '#34d399');
            await sleep(600);
            showStatus('Loose coupling: Subject knows only Observer interface', '#06b6d4');
        } else if (mode === 'strategy') {
            showStatus('Using Strategy pattern for flexible algorithms...', '#ec4899');
            await sleep(600);
            showStatus('PaymentProcessor created', '#f59e0b');
            await sleep(600);
            showStatus('setStrategy(CreditCardPayment)', '#34d399');
            await sleep(600);
            showStatus('processPayment(100): Credit Card payment', '#fbbf24');
            await sleep(600);
            showStatus('setStrategy(CryptoCurrencyPayment)', '#34d399');
            await sleep(600);
            showStatus('processPayment(0.005): Crypto payment', '#fbbf24');
            await sleep(600);
            showStatus('Algorithm can be changed at runtime!', '#34d399');
        }
        else if (mode === 'mvc') {
            showStatus('User input arrives at the Controller...', '#f59e0b');
            await sleep(700);
            showStatus('Controller updates the Model (data + state)', '#34d399');
            await sleep(700);
            showStatus('Model change notifies the View, which re-renders', '#60a5fa');
        }
        else if (mode === 'layered') {
            showStatus('Presentation layer formats a request...', '#60a5fa');
            await sleep(700);
            showStatus('Business layer applies rules, calls the layer below', '#f59e0b');
            await sleep(700);
            showStatus('Data layer returns raw records — each layer calls only downward', '#34d399');
        }
        else if (mode === 'pubsub') {
            showStatus('Publisher emits an event to the EventBus...', '#f59e0b');
            await sleep(700);
            showStatus('EventBus fans the event out to every subscriber', '#a78bfa');
            await sleep(700);
            showStatus('Subscribers A, B, C all receive it — fully decoupled', '#34d399');
        }
        else if (mode === 'pipefilter') {
            showStatus('Input enters the pipeline...', '#94a3b8');
            await sleep(700);
            showStatus('Each filter transforms the data and passes it on', '#34d399');
            await sleep(700);
            showStatus('Trim -> Upper -> Exclaim -> Output', '#60a5fa');
        }
        else if (mode === 'di') {
            showStatus('Composition root creates the concrete ConsoleService...', '#34d399');
            await sleep(700);
            showStatus('Service is injected into the Consumer constructor', '#60a5fa');
            await sleep(700);
            showStatus('Consumer depends only on the Service abstraction — easy to test', '#ec4899');
        }
    }

    applyHashRoute();
});
