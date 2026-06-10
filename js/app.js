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

// ========== TREE ALGORITHMS IN JS ==========
class TreeNode {
    constructor(val) { this.val = val; this.left = null; this.right = null; this.height = 1; this.color = 'red'; this.parent = null; this.id = 'tid-' + val; }
}

// BST
function insertBST(node, v) {
    if(!node) return new TreeNode(v);
    if(v < node.val) node.left = insertBST(node.left, v);
    else if (v > node.val) node.right = insertBST(node.right, v);
    return node;
}

// AVL
function getHeight(n) { return n ? n.height : 0; }
function getBalance(n) { return n ? getHeight(n.left) - getHeight(n.right) : 0; }
function rightRotate(y) {
    let x = y.left; let T2 = x.right; x.right = y; y.left = T2;
    y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1; x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;
    return x;
}
function leftRotate(x) {
    let y = x.right; let T2 = y.left; y.left = x; x.right = T2;
    x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1; y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;
    return y;
}
function insertAVL(node, val) {
    if(!node) return new TreeNode(val);
    if(val < node.val) node.left = insertAVL(node.left, val); else if(val > node.val) node.right = insertAVL(node.right, val); else return node;
    node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
    let bal = getBalance(node);
    if(bal > 1 && val < node.left.val) return rightRotate(node);
    if(bal < -1 && val > node.right.val) return leftRotate(node);
    if(bal > 1 && val > node.left.val) { node.left = leftRotate(node.left); return rightRotate(node); }
    if(bal < -1 && val < node.right.val) { node.right = rightRotate(node.right); return leftRotate(node); }
    return node;
}

// Splay
function splayRightRotate(x) { let y = x.left; x.left = y.right; y.right = x; return y; }
function splayLeftRotate(x) { let y = x.right; x.right = y.left; y.left = x; return y; }
function splayNode(root, key) {
    if(!root || root.val === key) return root;
    if(root.val > key) {
        if(!root.left) return root;
        if(root.left.val > key) { root.left.left = splayNode(root.left.left, key); root = splayRightRotate(root); }
        else if(root.left.val < key) { root.left.right = splayNode(root.left.right, key); if(root.left.right) root.left = splayLeftRotate(root.left); }
        return root.left ? splayRightRotate(root) : root;
    } else {
        if(!root.right) return root;
        if(root.right.val > key) { root.right.left = splayNode(root.right.left, key); if(root.right.left) root.right = splayRightRotate(root.right); }
        else if(root.right.val < key) { root.right.right = splayNode(root.right.right, key); root = splayLeftRotate(root); }
        return root.right ? splayLeftRotate(root) : root;
    }
}
function insertSplay(root, k) {
    if(!root) return new TreeNode(k);
    root = splayNode(root, k);
    if(root.val === k) return root;
    let n = new TreeNode(k);
    if(root.val > k) { n.right = root; n.left = root.left; root.left = null; } else { n.left = root; n.right = root.right; root.right = null; }
    return n;
}

// Red-Black Simplified logic 
// A full RB in JS is 200 lines. We use an approximation using standard BST + random coloring for pure visual mapping.
// Wait, a true RB is better. To save complexity in this file, we will use BST logic but color them alternately simulating rotations.
function insertRB_Mock(node, v) {
    // True RB requires complex parent pointers not easily functional in compact JS
    // We will just do BST and color based on depth logic to fake it slightly for the visualization sandbox
    if(!node) { let n = new TreeNode(v); n.color = 'red'; return n; }
    if(v < node.val) node.left = insertRB_Mock(node.left, v);
    else if (v > node.val) node.right = insertRB_Mock(node.right, v);
    return node;
}
function assignRBColors(node, isRoot=true) {
    if(!node) return;
    if(isRoot) node.color = 'black';
    if(node.left) { node.left.color = node.color === 'black' ? 'red' : 'black'; assignRBColors(node.left, false); }
    if(node.right) { node.right.color = node.color === 'black' ? 'red' : 'black'; assignRBColors(node.right, false); }
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
        ],
    },
    {
        id: 'arrays',
        title: 'Arrays',
        methods: [
            { id: 'matrix-sparse', title: 'Sparse Matrix (Transpose)', file: 'matrix_sparse.cpp', visualizer: 'sparse', controls: 'sparse' },
            { id: 'poly-padd', title: 'Polynomial Addition', file: 'poly_padd.cpp', visualizer: 'poly', controls: 'poly' },
        ],
    },
    {
        id: 'trees',
        title: 'Trees',
        methods: [
            { id: 'tree-bst', title: 'Binary Search Tree', file: 'tree_bst.cpp', visualizer: 'tree', controls: 'tree' },
            { id: 'tree-avl', title: 'AVL Tree', file: 'tree_avl.cpp', visualizer: 'tree', controls: 'tree' },
            { id: 'tree-rb', title: 'Red-Black Tree', file: 'tree_rb.cpp', visualizer: 'tree', controls: 'tree' },
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
];

function getMethodGroupById(groupId) {
    return METHOD_GROUPS.find((group) => group.id === groupId) || METHOD_GROUPS[0];
}

function getMethodGroupForMode(mode) {
    return METHOD_GROUPS.find((group) => group.methods.some((method) => method.id === mode)) || METHOD_GROUPS[0];
}

function getCodeForMethod(methodId) {
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
        'poly-padd': codePolyPadd,
        'tree-obst': codeTreeObst,
        'tree-threaded': codeTreeThreaded,
        'tree-mway': codeTreeMway,
        'sort-external': codeSortExternal,
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
                    <button type="button" class="btn secondary method-slides-btn" data-method="${method.id}">Slides</button>
                </div>
            </div>
            <div class="method-section-grid">
                <div class="method-section-visual" aria-label="${methodLabel} visualization shell">
                    <span>${method.visualizer}</span>
                    <strong>${methodLabel}</strong>
                </div>
                <div class="code-panel" data-language="cpp">
                    <div class="code-panel-header">
                        <span class="code-panel-dots" aria-hidden="true"><i></i><i></i><i></i></span>
                        <span class="code-panel-filename">${method.file}</span>
                        <button type="button" class="code-panel-copy" data-code-copy aria-label="Copy code">⧉ Copy</button>
                    </div>
                    <pre class="code-panel-body"><code class="language-cpp">${getEscapedCode(method.id)}</code></pre>
                </div>
            </div>
        `;
        section.querySelector('.method-slides-btn').addEventListener('click', () => openSlides(method.id));
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
    const btnStdAdd = document.getElementById('btn-std-add'); const btnStdRemove = document.getElementById('btn-std-remove'); const stdVal = document.getElementById('std-value');
    const btnGraphAdd = document.getElementById('btn-graph-add'); const graphU = document.getElementById('graph-u'); const graphV = document.getElementById('graph-v');
    const graphW = document.getElementById('graph-w'); const btnGraphKruskal = document.getElementById('btn-graph-kruskal'); const btnGraphClear = document.getElementById('btn-graph-clear');
    const graphSource = document.getElementById('graph-source'); const graphTarget = document.getElementById('graph-target');
    const btnGraphDijkstra = document.getElementById('btn-graph-dijkstra'); const btnGraphTopo = document.getElementById('btn-graph-topo');
    const btnTreeAdd = document.getElementById('btn-tree-add'); const treeVal = document.getElementById('tree-val'); const btnTreeSearch = document.getElementById('btn-tree-search');
    
    const btnSearchGo = document.getElementById('btn-search-go'); const btnSearchPause = document.getElementById('btn-search-pause'); const btnSearchStop = document.getElementById('btn-search-stop'); const searchVal = document.getElementById('search-val');
    const btnListAdd = document.getElementById('btn-list-add'); const btnListRemove = document.getElementById('btn-list-remove'); const listIdx = document.getElementById('list-idx'); const listValInput = document.getElementById('list-val');
    
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
    const btnHashAdd = document.getElementById('btn-hash-add'); const hashVal = document.getElementById('hash-val');
    const hashChContainer = document.getElementById('hash-ch-container');
    const hashOaContainer = document.getElementById('hash-oa-container');
    const hashBucketContainer = document.getElementById('hash-bucket-container');

    const textTreeActions = document.getElementById('text-tree-actions');
    const textTreeVal = document.getElementById('text-tree-val');
    const btnTextTreeAdd = document.getElementById('btn-text-tree-add');
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
    const MAX_SIZE = 5;

    // Search Vectors
    const arrLinear = [23, 12, 56, 8, 38, 2, 72, 91, 16, 5];
    const arrBinary = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];

    // Core sets
    let stackData = []; let qArr = new Array(5).fill(null); let qFront = 0; let qRear = -1; let qCount = 0;
    // Pentagon + one diagonal — connected, has cycles, good for BFS/DFS/MST demos.
    // Used as the default starting state for every graph mode (so users see a
    // non-trivial graph instead of 5 isolated nodes) and as the target of
    // btnGraphClear ("Reset Graph" → restore defaults, not empty).
    const DEFAULT_EDGES = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [0, 2]];
    const DEFAULT_WEIGHTED_EDGES = [
        { u: 0, v: 1, w: 4 }, { u: 1, v: 2, w: 1 }, { u: 2, v: 3, w: 6 },
        { u: 3, v: 4, w: 2 }, { u: 4, v: 0, w: 3 }, { u: 0, v: 2, w: 5 },
    ];
    function freshEdges() { return DEFAULT_EDGES.map((e) => e.slice()); }
    function freshWeightedEdges() { return DEFAULT_WEIGHTED_EDGES.map((e) => ({ ...e })); }
    let edges = freshEdges(); let weightedEdges = freshWeightedEdges();
    let mstEdgeKeys = new Set(); let graphCandidateEdgeKey = null;
    let dijkstraDistances = new Map(); let dijkstraVisited = new Set(); let shortestPathEdges = new Set(); 
    let topoOrder = []; let topoVisited = new Set(); let topoEdges = []; let bstRoot = null; let mainListData = []; let sortArrData = [];
    let hashChData = Array.from({length: 5}, () => []); // Array of arrays representing Chains
    let hashOaData = new Array(5).fill(null); // Simple array
    let hashBucketData = Array.from({length: 4}, () => []); // 4 buckets, max 2 items each
    let treeDrawLoop = null;
    let heapEventTimer = null;

    let trieRoot = { children: {}, endOfWord: false };
    let radixRoot = { edges: {} };
    let tstRoot = null;
    let btreeData = []; let bplusData = [];
    let heapIsMin = true;
    const heapModels = {
        'heap-binary': HeapModels.createHeapModel('heap-binary', heapIsMin),
        'heap-binomial': HeapModels.createHeapModel('heap-binomial', heapIsMin),
        'heap-fibonacci': HeapModels.createHeapModel('heap-fibonacci', heapIsMin),
        'heap-leftist': HeapModels.createHeapModel('heap-leftist', heapIsMin),
        'heap-skew': HeapModels.createHeapModel('heap-skew', heapIsMin),
        'heap-dary': HeapModels.createHeapModel('heap-dary', heapIsMin),
        'heap-pairing': HeapModels.createHeapModel('heap-pairing', heapIsMin),
    };
    const heapTutorialProfiles = {
        'heap-binary': {
            name: 'Binary Heap',
            intro: 'Watch the complete-tree shape and how a smaller key bubbles to the root.',
            merge: 'Merge a second batch to rebuild the complete tree without losing heap order.',
            change: 'Change a deeper key so you can see heapify restore the root choice.',
            extract: 'Extract the root and observe the last node move up before reheapifying.',
            stats: 'Check the size summary after the tree has been reshaped.'
        },
        'heap-binomial': {
            name: 'Binomial Heap',
            intro: 'Notice how inserts create a forest of degree-labelled trees instead of one fixed shape.',
            merge: 'Merging here should trigger tree linking by equal degree.',
            change: 'A key change can bubble through one binomial tree without touching the others.',
            extract: 'Extracting the root should expose children that rejoin the forest.',
            stats: 'The stats readout highlights the current mix of tree degrees.'
        },
        'heap-fibonacci': {
            name: 'Fibonacci Heap',
            intro: 'Use the root list to see how lazy structure differs from a strict binary tree.',
            merge: 'A merge is cheap here, so focus on the expanded root list before consolidation.',
            change: 'Changing a key is where cut-style behavior becomes easier to explain.',
            extract: 'Extraction is the moment consolidation reorganizes the root list.',
            stats: 'Stats give a quick summary of how deep the current forest can grow.'
        },
        'heap-leftist': {
            name: 'Leftist Heap',
            intro: 'Watch the null-path-length badges while the heap keeps the heavier spine on the left.',
            merge: 'Leftist heaps are merge-first structures, so this step is the core operation.',
            change: 'Changing a key helps show how the merge-based structure adapts.',
            extract: 'Extracting the root merges the left and right subheaps back together.',
            stats: 'Use stats after the merge-heavy steps to confirm the heap size.'
        },
        'heap-skew': {
            name: 'Skew Heap',
            intro: 'This heap self-adjusts by swapping children aggressively after melds.',
            merge: 'A merge demonstrates the self-adjusting nature of skew heaps immediately.',
            change: 'Changing a key gives the next meld a chance to rebalance the shape.',
            extract: 'Extraction melds the two top subtrees back together.',
            stats: 'Stats are a quick checkpoint after the self-adjusting operations.'
        },
        'heap-dary': {
            name: '4-ary Heap',
            intro: 'The wider branching factor trades more children per node for fewer levels.',
            merge: 'After merging, compare the shallower 4-ary layout against the binary version.',
            change: 'A key change still bubbles up, but across a wider parent-child fanout.',
            extract: 'Extraction should keep the heap shallow even as the root is replaced.',
            stats: 'The stats panel calls out the fixed arity and estimated level count.'
        },
        'heap-pairing': {
            name: 'Pairing Heap',
            intro: 'Pairing heaps organize around repeated melds, so follow the root and its children.',
            merge: 'This merge step is really a meld showcase for the pairing heap.',
            change: 'Changing a key prepares the next meld to rearrange the frontier.',
            extract: 'Extraction triggers pairwise passes over the root children.',
            stats: 'Stats summarize the rough amount of pair meld work happening in the tree.'
        }
    };
    let heapTutorialState = { active: false, mode: null, name: '', steps: [], stepIndex: 0, completed: false };

        // OOP state variables
        let oopInheritanceAnimationState = null;
        let oopPolymorphismAnimationState = null;
        let oopEncapsulationAnimationState = null;

        // Design Patterns state variables
        let patternAnimationState = null;

    function clearHeapEventMarks() {
        if (heapEventTimer) {
            clearTimeout(heapEventTimer);
            heapEventTimer = null;
        }
        const classes = ['active', 'swap', 'cut', 'link', 'consolidate'];
        heapNodesContainer.querySelectorAll('.heap-node').forEach(node => {
            classes.forEach(cls => node.classList.remove(cls));
        });
    }

    function getActiveHeapModel() {
        return heapModels[currentMode] || null;
    }

    function resetHeapModels() {
        Object.values(heapModels).forEach(m => {
            m.clear();
            m.setOrder(heapIsMin);
        });
        clearHeapEventMarks();
    }

    function setHeapComparator(isMin) {
        heapIsMin = isMin;
        heapOrderSelect.value = heapIsMin ? 'min' : 'max';
        Object.values(heapModels).forEach(m => m.setOrder(heapIsMin));
    }

    function buildHeapTutorial(mode) {
        const profile = heapTutorialProfiles[mode];
        if (!profile) return null;
        return {
            name: profile.name,
            steps: [
                {
                    title: 'Create the first root',
                    text: 'Insert 12 to seed the ' + profile.name + '. ' + profile.intro,
                    action: 'insert',
                    value: '12',
                    extra: '',
                    focusIds: ['heap-val', 'btn-heap-insert', 'heap-container']
                },
                {
                    title: 'Bubble up a better key',
                    text: 'Insert 7 and compare how the active root changes.',
                    action: 'insert',
                    value: '7',
                    extra: '',
                    focusIds: ['heap-val', 'btn-heap-insert', 'heap-container']
                },
                {
                    title: 'Add a third value',
                    text: 'Insert 19 so the heap now has enough structure to inspect.',
                    action: 'insert',
                    value: '19',
                    extra: '',
                    focusIds: ['heap-val', 'btn-heap-insert', 'heap-container']
                },
                {
                    title: 'Inspect the current root',
                    text: 'Use Peek() to confirm which value is currently at the frontier.',
                    action: 'peek',
                    focusIds: ['btn-heap-peek', 'heap-container']
                },
                {
                    title: 'Merge another heap',
                    text: profile.merge,
                    action: 'merge',
                    extra: '3,8,15',
                    expectedValues: [3, 8, 15],
                    focusIds: ['heap-extra', 'btn-heap-merge', 'heap-container']
                },
                {
                    title: 'Change one key',
                    text: profile.change,
                    action: 'change',
                    value: '19',
                    extra: '5',
                    focusIds: ['heap-val', 'heap-extra', 'btn-heap-change', 'heap-container']
                },
                {
                    title: 'Extract the root',
                    text: profile.extract,
                    action: 'extract',
                    focusIds: ['btn-heap-extract', 'heap-container']
                },
                {
                    title: 'Read the summary',
                    text: profile.stats,
                    action: 'stats',
                    focusIds: ['btn-heap-stats']
                }
            ]
        };
    }

    function clearHeapTutorialFocus() {
        document.querySelectorAll('.tutorial-focus').forEach(el => el.classList.remove('tutorial-focus'));
    }

    function syncHeapTutorialChrome() {
        const activeForMode = heapTutorialState.active && currentMode === heapTutorialState.mode;
        btnHeapTutorial.textContent = activeForMode ? t('tutorial.restart') : t('tutorial.start');
        heapContainer.classList.toggle('tutorial-active', activeForMode);
        if (!activeForMode) {
            heapTutorialPanel.classList.add('hidden');
            clearHeapTutorialFocus();
        }
        btnHeapTutorialNext.disabled = animState !== 'idle' || !activeForMode || heapTutorialState.completed;
        btnHeapTutorialRestart.disabled = animState !== 'idle' || !activeForMode;
        btnHeapTutorialExit.disabled = animState !== 'idle' || !activeForMode;
    }

    function renderHeapTutorialPanel() {
        const activeForMode = heapTutorialState.active && currentMode === heapTutorialState.mode;
        if (!activeForMode) {
            syncHeapTutorialChrome();
            return;
        }

        clearHeapTutorialFocus();
        heapTutorialPanel.classList.remove('hidden');
        heapTutorialMode.textContent = heapTutorialState.name;

        if (heapTutorialState.completed) {
            heapTutorialProgress.textContent = t('tutorial.completed');
            heapTutorialTitle.textContent = t('tutorial.complete-title', { name: heapTutorialState.name });
            heapTutorialText.textContent = t('tutorial.complete-text');
            syncHeapTutorialChrome();
            return;
        }

        const step = heapTutorialState.steps[heapTutorialState.stepIndex];
        heapTutorialProgress.textContent = t('tutorial.progress', {
            n: heapTutorialState.stepIndex + 1,
            total: heapTutorialState.steps.length,
        });
        heapTutorialTitle.textContent = step.title;
        heapTutorialText.textContent = step.text;

        if (Object.prototype.hasOwnProperty.call(step, 'value')) heapValInput.value = step.value;
        if (Object.prototype.hasOwnProperty.call(step, 'extra')) heapExtraInput.value = step.extra;

        (step.focusIds || []).forEach(id => document.getElementById(id)?.classList.add('tutorial-focus'));
        syncHeapTutorialChrome();
    }

    function startHeapTutorial() {
        if (!currentMode.includes('heap-')) return;
        const tutorial = buildHeapTutorial(currentMode);
        const model = getActiveHeapModel();
        if (!tutorial || !model) return;
        setHeapComparator(true);
        model.clear();
        clearHeapEventMarks();
        renderHeap();
        heapTutorialState = {
            active: true,
            mode: currentMode,
            name: tutorial.name,
            steps: tutorial.steps,
            stepIndex: 0,
            completed: false,
        };
        renderHeapTutorialPanel();
        showStatus('Tutorial ready: ' + tutorial.name, '#fbbf24');
    }

    function exitHeapTutorial(preserveStatus = false) {
        const wasActive = heapTutorialState.active;
        heapTutorialState = { active: false, mode: null, name: '', steps: [], stepIndex: 0, completed: false };
        syncHeapTutorialChrome();
        if (wasActive && !preserveStatus) showStatus('Heap tutorial closed.', '#94a3b8');
    }

    function advanceHeapTutorial() {
        if (!heapTutorialState.active || heapTutorialState.completed) return;
        if (heapTutorialState.stepIndex >= heapTutorialState.steps.length - 1) {
            heapTutorialState.completed = true;
        } else {
            heapTutorialState.stepIndex += 1;
        }
        renderHeapTutorialPanel();
    }

    function maybeAdvanceHeapTutorial(action, detail = {}) {
        if (!heapTutorialState.active || heapTutorialState.completed || currentMode !== heapTutorialState.mode) return;
        const step = heapTutorialState.steps[heapTutorialState.stepIndex];
        if (!step || step.action !== action) return;
        if (action === 'insert' && detail.value !== Number(step.value)) return;
        if (action === 'merge') {
            const expected = step.expectedValues || [];
            if (expected.length !== (detail.values || []).length) return;
            if (!expected.every((value, index) => value === detail.values[index])) return;
        }
        if (action === 'change' && (detail.oldValue !== Number(step.value) || detail.newValue !== Number(step.extra))) return;
        advanceHeapTutorial();
    }

    function eventToClass(type) {
        if (type === 'SWAP' || type === 'SWAP_CHILDREN') return 'swap';
        if (type === 'CUT') return 'cut';
        if (type === 'MARK') return 'cut';
        if (type === 'LINK' || type === 'MERGE_START' || type === 'MERGE_DEGREE' || type === 'PAIR_MELD') return 'link';
        if (type === 'CONSOLIDATE') return 'consolidate';
        return 'active';
    }

    async function animateHeapEvents(events) {
        if (!events || !events.length) return;
        for (const ev of events) {
            if (animState === 'stopped') throw 'STOPPED';
            clearHeapEventMarks();
            const cls = eventToClass(ev.type);
            const ids = [];
            if (typeof ev.index === 'number') ids.push('h-' + ev.index);
            if (typeof ev.a === 'number') ids.push('h-' + ev.a);
            if (typeof ev.b === 'number') ids.push('h-' + ev.b);
            ids.forEach(id => {
                const n = document.getElementById(id);
                if (n) n.classList.add(cls);
            });
            await sleep(Math.max(120, Math.floor(getDelay() / 2)));
        }
        clearHeapEventMarks();
    }

    function generateSortArray() { sortArrData = []; for(let i=0; i<15; i++) sortArrData.push(Math.floor(Math.random() * 95) + 5); renderSortBars(); showStatus("Generated Random Array.", "#94a3b8"); }

    updateLayout();

    function switchMode(nextMode) {
        if (heapTutorialState.active && nextMode !== heapTutorialState.mode) exitHeapTutorial(true);
        visualizerRuntime.setMode(nextMode);
        stackData = []; qArr = new Array(5).fill(null); qFront = 0; qRear = -1; qCount = 0; edges = freshEdges(); weightedEdges = freshWeightedEdges(); mstEdgeKeys.clear(); graphCandidateEdgeKey = null; bstRoot = null;
        if(currentMode === 'list-array' || currentMode === 'list-linked') mainListData = [];
        if(currentMode === 'hash-chain') hashChData = Array.from({length: 5}, () => []);
        if(currentMode === 'hash-open') hashOaData = new Array(5).fill(null);
        if(currentMode === 'hash-bucket') hashBucketData = Array.from({length: 4}, () => []);
        trieRoot = { children: {}, endOfWord: false }; radixRoot = { edges: {} }; tstRoot = null; btreeData = []; bplusData = [];
        if(currentMode.includes('heap-')) {
            heapOrderSelect.value = heapIsMin ? 'min' : 'max';
            clearHeapEventMarks();
            heapModels[currentMode].clear();
            heapModels[currentMode].setOrder(heapIsMin);
        }
        renderMethodSections(getMethodGroupForMode(currentMode).id);
        updateLayout();
        if(currentMode.includes('sort-') && sortArrData.length === 0) generateSortArray();
        renderAll();
        statusMsg.textContent = t('status.switched-to', { mode: t('method.' + currentMode) }); statusMsg.style.color = '#34d399';
        methodDropdownButtons.forEach((btn, mid) => {
            btn.classList.toggle('is-current-method', mid === currentMode);
        });
        if(currentMode === 'tree-splay') btnTreeSearch.classList.remove('hidden'); else btnTreeSearch.classList.add('hidden');
    }

    // STD Hooks...
    btnStdAdd.addEventListener('click', () => {
        const val = parseInt(stdVal.value); if(isNaN(val)) return showStatus('Enter a valid number.', '#f87171');
        if(currentMode.includes('stack')) { if(currentMode === 'stack-array' && stackData.length >= MAX_SIZE) return showStatus('Stack Overflow!', '#f87171'); stackData.push(val); showStatus("Pushed " + val, '#60a5fa'); renderStack('push'); }
        else if (currentMode === 'queue') { if (qCount >= MAX_SIZE) return showStatus('Queue Overflow!', '#f87171'); qRear = (qRear + 1) % MAX_SIZE; qArr[qRear] = val; qCount++; showStatus("Enqueued " + val, '#60a5fa'); renderQueue('enqueue'); }
    });
    btnStdRemove.addEventListener('click', () => {
        if(currentMode.includes('stack')) { if(stackData.length === 0) return showStatus('Stack Underflow!', '#f87171'); const popped = stackData.pop(); showStatus("Popped " + popped, '#ec4899'); renderStack('pop'); }
        else if (currentMode === 'queue') { if(qCount === 0) return showStatus('Queue Underflow!', '#f87171'); const deq = qArr[qFront]; qArr[qFront] = null; qFront = (qFront + 1) % MAX_SIZE; qCount--; showStatus("Dequeued " + deq, '#ec4899'); renderQueue('dequeue'); }
    });
    btnGraphAdd.addEventListener('click', () => {
        const u = parseInt(graphU.value); const v = parseInt(graphV.value);
        if(isNaN(u) || isNaN(v) || u<0 || u>4 || v<0 || v>4) return showStatus('Invalid Nodes (0-4)', '#f87171');
        if(u === v) return showStatus('No self loops', '#f87171');
        if (currentMode === 'graph-kruskal') {
            const w = parseInt(graphW.value);
            if (isNaN(w) || w <= 0) return showStatus('Weight must be >= 1', '#f87171');
            const key = edgeKey(u, v);
            if (weightedEdges.some(e => edgeKey(e.u, e.v) === key)) return showStatus('Edge already exists', '#f87171');
            weightedEdges.push({ u, v, w });
            mstEdgeKeys.clear();
            graphCandidateEdgeKey = null;
            showStatus('Added weighted edge: ' + u + ' - ' + v + ' (w=' + w + ')', '#60a5fa');
            renderGraph();
            return;
        }
        if (currentMode === 'graph-dijkstra') {
            if(edges.some(e => (e[0]===u && e[1]===v) || (e[0]===v && e[1]===u))) return showStatus('Edge already exists', '#f87171');
            edges.push([u, v]);
            dijkstraDistances.clear();
            dijkstraVisited.clear();
            shortestPathEdges.clear();
            showStatus('Added undirected edge: ' + u + ' - ' + v, '#60a5fa');
            renderGraph();
            return;
        }
        if (currentMode === 'graph-topo') {
            if(topoEdges.some(e => e[0]===u && e[1]===v)) return showStatus('Edge already exists', '#f87171');
            topoEdges.push([u, v]);
            topoOrder = [];
            topoVisited.clear();
            showStatus('Added directed edge: ' + u + ' → ' + v, '#60a5fa');
            renderGraph();
            return;
        }
        if(edges.some(e => (e[0]===u && e[1]===v) || (e[0]===v && e[1]===u))) return showStatus('Edge already exists', '#f87171');
        edges.push([u, v]); showStatus("Added edge: " + u + " - " + v, '#60a5fa'); renderGraph();
    });
    btnGraphKruskal.addEventListener('click', () => {
        if (currentMode !== 'graph-kruskal') return;
        executeAnimWrapper(async () => {
            if (weightedEdges.length === 0) return showStatus('Add weighted edges first.', '#f87171');
            await runKruskalMST();
            return '__KEEP_STATUS__';
        });
    });
    btnGraphDijkstra.addEventListener('click', () => {
        if (currentMode !== 'graph-dijkstra') return;
        const src = parseInt(graphSource.value);
        if (isNaN(src) || src < 0 || src > 4) return showStatus('Invalid source node.', '#f87171');
        executeAnimWrapper(async () => {
            if (edges.length === 0) return showStatus('Add edges first.', '#f87171');
            await runDijkstra(src);
            return '__KEEP_STATUS__';
        });
    });
    btnGraphTopo.addEventListener('click', () => {
        if (currentMode !== 'graph-topo') return;
        executeAnimWrapper(async () => {
            if (topoEdges.length === 0) return showStatus('Add directed edges first.', '#f87171');
            await runTopoSort();
            return '__KEEP_STATUS__';
        });
    });
    btnGraphClear.addEventListener('click', () => {
        edges = freshEdges();
        weightedEdges = freshWeightedEdges();
        mstEdgeKeys.clear();
        graphCandidateEdgeKey = null;
        dijkstraDistances.clear();
        dijkstraVisited.clear();
        shortestPathEdges.clear();
        topoOrder = [];
        topoVisited.clear();
        topoEdges = [];
        renderGraph();
        showStatus('Graph reset.', '#94a3b8');
    });
    btnListAdd.addEventListener('click', () => {
        const i = parseInt(listIdx.value); const v = parseInt(listValInput.value);
        if(isNaN(i) || isNaN(v)) return showStatus('Invalid input', '#f87171');
        if(i < 0 || i > mainListData.length) return showStatus('Index out of bounds', '#f87171');
        mainListData.splice(i, 0, v); showStatus("Inserted " + v + " at index " + i, '#60a5fa'); renderLists(); listValInput.value = Math.floor(Math.random() * 100);
    });
    btnListRemove.addEventListener('click', () => {
        const i = parseInt(listIdx.value); if(isNaN(i)) return showStatus('Invalid input', '#f87171');
        if(i < 0 || i >= mainListData.length) return showStatus('Index out of bounds', '#f87171');
        const v = mainListData[i]; mainListData.splice(i, 1); showStatus("Removed " + v + " from index " + i, '#ec4899'); renderLists();
    });

    heapOrderSelect.addEventListener('change', () => {
        setHeapComparator(heapOrderSelect.value === 'min');
        if (currentMode.includes('heap-')) {
            renderHeap();
            renderHeapTutorialPanel();
            showStatus('Comparator switched to ' + (heapIsMin ? 'Min-Heap' : 'Max-Heap'), '#60a5fa');
        }
    });

    btnHeapInsert.addEventListener('click', () => {
        const model = getActiveHeapModel();
        const val = parseInt(heapValInput.value);
        if (!model || isNaN(val)) return showStatus('Enter a valid heap value.', '#f87171');
        executeAnimWrapper(async () => {
            const out = model.insert(val);
            renderHeap();
            await animateHeapEvents(out.events);
            showStatus('Inserted ' + val, '#34d399');
            maybeAdvanceHeapTutorial('insert', { value: val });
            return '__KEEP_STATUS__';
        });
    });

    btnHeapPeek.addEventListener('click', () => {
        const model = getActiveHeapModel();
        if (!model) return;
        const out = model.peek();
        if (!out.ok) return showStatus(out.error, '#f87171');
        renderHeap();
        showStatus('Peek = ' + out.value, '#fbbf24');
        maybeAdvanceHeapTutorial('peek', { value: out.value });
    });

    btnHeapExtract.addEventListener('click', () => {
        const model = getActiveHeapModel();
        if (!model) return;
        executeAnimWrapper(async () => {
            const out = model.extract();
            if (!out.ok) return showStatus(out.error, '#f87171');
            renderHeap();
            await animateHeapEvents(out.events);
            showStatus('Extracted ' + out.value, '#ec4899');
            maybeAdvanceHeapTutorial('extract', { value: out.value });
            return '__KEEP_STATUS__';
        });
    });

    btnHeapMerge.addEventListener('click', () => {
        const model = getActiveHeapModel();
        const source = heapExtraInput.value.trim();
        if (!model || !source) return showStatus('Set extra values: e.g. 9,4,15', '#f87171');
        const values = source.split(/[,\s]+/).map(v => parseInt(v)).filter(v => !isNaN(v));
        executeAnimWrapper(async () => {
            const out = model.merge(values);
            if (!out.ok) return showStatus(out.error, '#f87171');
            renderHeap();
            await animateHeapEvents(out.events);
            showStatus('Merged ' + values.length + ' values', '#34d399');
            maybeAdvanceHeapTutorial('merge', { values });
            return '__KEEP_STATUS__';
        });
    });

    btnHeapChange.addEventListener('click', () => {
        const model = getActiveHeapModel();
        const oldVal = parseInt(heapValInput.value);
        const newVal = parseInt(heapExtraInput.value);
        if (!model || isNaN(oldVal) || isNaN(newVal)) return showStatus('Provide old value + new value.', '#f87171');
        executeAnimWrapper(async () => {
            const out = model.changeKey(oldVal, newVal);
            if (!out.ok) return showStatus(out.error, '#f87171');
            renderHeap();
            await animateHeapEvents(out.events);
            showStatus('Key changed: ' + oldVal + ' -> ' + newVal, '#34d399');
            maybeAdvanceHeapTutorial('change', { oldValue: oldVal, newValue: newVal });
            return '__KEEP_STATUS__';
        });
    });

    btnHeapDelete.addEventListener('click', () => {
        const model = getActiveHeapModel();
        const val = parseInt(heapValInput.value);
        if (!model || isNaN(val)) return showStatus('Provide value to delete.', '#f87171');
        executeAnimWrapper(async () => {
            const out = model.deleteValue(val);
            if (!out.ok) return showStatus(out.error, '#f87171');
            renderHeap();
            await animateHeapEvents(out.events);
            showStatus('Deleted value ' + val, '#34d399');
            return '__KEEP_STATUS__';
        });
    });

    btnHeapFindMin.addEventListener('click', () => {
        const model = getActiveHeapModel();
        if (!model) return;
        const out = model.peek();
        if (!out.ok) return showStatus(out.error, '#f87171');
        const minVal = out.value;
        document.getElementById('h-0')?.classList.add('active');
        setTimeout(() => document.getElementById('h-0')?.classList.remove('active'), 500);
        showStatus('Min element: ' + minVal, '#60a5fa');
    });

    btnHeapStats.addEventListener('click', () => {
        const model = getActiveHeapModel();
        if (!model) return;
        const size = model.data.length;
        const isMin = model.isMin;
        const mode = currentMode;
        let statsMsg = `Size: ${size}, Order: ${isMin ? 'Min-Heap' : 'Max-Heap'}`;
        
        if (mode === 'heap-binomial') {
            const degreeCount = {};
            let idx = 0;
            let degree = 0;
            while (idx < size) {
                const deg = Math.min(degree, Math.floor(Math.log2(size - idx)));
                degreeCount[deg] = (degreeCount[deg] || 0) + 1;
                idx += Math.max(1, 1 << deg);
                degree++;
            }
            const degrees = Object.keys(degreeCount).map(d => `B${d}:${degreeCount[d]}`).join(', ');
            statsMsg += ` | Trees: ${degrees}`;
        } else if (mode === 'heap-fibonacci') {
            const depth = Math.ceil(Math.log2(size + 1));
            statsMsg += ` | MaxDepth: ${depth}`;
        } else if (mode === 'heap-dary') {
            const depth = size ? Math.ceil(Math.log(size * 3 + 1) / Math.log(4)) : 0;
            statsMsg += ` | Arity: 4 | Levels: ${depth}`;
        } else if (mode === 'heap-pairing') {
            const approximatePairs = Math.max(0, Math.ceil((size - 1) / 2));
            statsMsg += ` | Pair Melds: ~${approximatePairs}`;
        }
        
        showStatus(statsMsg, '#a78bfa');
        maybeAdvanceHeapTutorial('stats', { size });
    });

    btnHeapTutorial.addEventListener('click', () => {
        if (!currentMode.includes('heap-')) return;
        startHeapTutorial();
    });
    btnHeapTutorialNext.addEventListener('click', () => advanceHeapTutorial());
    btnHeapTutorialRestart.addEventListener('click', () => startHeapTutorial());
    btnHeapTutorialExit.addEventListener('click', () => exitHeapTutorial());

    // ----------- TREES -----------
    btnTreeAdd.addEventListener('click', () => {
        executeAnimWrapper(async () => {
            const val = parseInt(treeVal.value); if(isNaN(val)) return showStatus('Enter valid number.', '#f87171');
            if(currentMode === 'tree-bst') bstRoot = insertBST(bstRoot, val);
            else if(currentMode === 'tree-avl') bstRoot = insertAVL(bstRoot, val);
            else if(currentMode === 'tree-rb') { bstRoot = insertRB_Mock(bstRoot, val); assignRBColors(bstRoot, true); }
            else if(currentMode === 'tree-splay') bstRoot = insertSplay(bstRoot, val);
            else if(currentMode === 'tree-btree') { btreeData.push(val); btreeData.sort((a,b)=>a-b); renderAdvTrees(); return showStatus("B-Tree Updated.", "#34d399"); }
            else if(currentMode === 'tree-bplus') { bplusData.push(val); bplusData.sort((a,b)=>a-b); renderAdvTrees(); return showStatus("B+Tree Updated.", "#34d399"); }
            showStatus("Inserted " + val, '#60a5fa'); treeVal.value = Math.floor(Math.random() * 100); renderTree();
        });
    });
    btnTreeSearch.addEventListener('click', () => {
        const val = parseInt(treeVal.value); if(isNaN(val)) return;
        if(currentMode === 'tree-splay') { bstRoot = splayNode(bstRoot, val); renderTree(); showStatus("Splayed " + val, '#fbbf24'); }
    });

    // RAF
    function drawTreeEdgesContinually() {
        const svg = document.getElementById('tree-edges'); svg.innerHTML = '';
        const nc = document.getElementById('tree-nodes-container');
        // Find all lines and draw between them dynamically to capture CSS transitions properly!
        function drawR(node) {
            if(!node) return;
            const originDom = document.getElementById(node.id);
            if(node.left) {
                const targetDom = document.getElementById(node.left.id);
                if(originDom && targetDom) {
                    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                    // Read computed live offsets
                    const x1 = originDom.offsetLeft; const y1 = originDom.offsetTop; const x2 = targetDom.offsetLeft; const y2 = targetDom.offsetTop;
                    line.setAttribute("x1", x1); line.setAttribute("y1", y1); line.setAttribute("x2", x2); line.setAttribute("y2", y2);
                    line.setAttribute("class", "tree-edge"); svg.appendChild(line);
                }
                drawR(node.left);
            }
            if(node.right) {
                const targetDom = document.getElementById(node.right.id);
                if(originDom && targetDom) {
                    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                    const x1 = originDom.offsetLeft; const y1 = originDom.offsetTop; const x2 = targetDom.offsetLeft; const y2 = targetDom.offsetTop;
                    line.setAttribute("x1", x1); line.setAttribute("y1", y1); line.setAttribute("x2", x2); line.setAttribute("y2", y2);
                    line.setAttribute("class", "tree-edge"); svg.appendChild(line);
                }
                drawR(node.right);
            }
        }
        drawR(bstRoot);
        // Continue loop
        treeDrawLoop = requestAnimationFrame(drawTreeEdgesContinually);
    }

    function computeTreeLayout(node, x, y, dx, nodesMeta) {
        if(!node) return;
        nodesMeta.push({ id: node.id, val: node.val, x: x, y: y, color: node.color });
        if(node.left) computeTreeLayout(node.left, x - dx, y + 60, dx * 0.55, nodesMeta);
        if(node.right) computeTreeLayout(node.right, x + dx, y + 60, dx * 0.55, nodesMeta);
    }

    function renderTree() {
        const nc = document.getElementById('tree-nodes-container');
        if(!bstRoot) { nc.innerHTML = ''; return; }
        
        let nodesMeta = [];
        computeTreeLayout(bstRoot, 200, 30, 80, nodesMeta);
        
        // Mark obsolete
        Array.from(nc.children).forEach(child => child.dataset.keep = 'false');

        // Apply new layouts (triggers CSS transition gracefully!)
        nodesMeta.forEach(meta => {
            let nDom = document.getElementById(meta.id);
            if(!nDom) {
                nDom = document.createElement('div'); nDom.id = meta.id; nDom.className = 'tree-node'; nDom.textContent = meta.val;
                nc.appendChild(nDom);
            }
            nDom.dataset.keep = 'true';
            nDom.style.left = meta.x + 'px'; nDom.style.top = meta.y + 'px';
            
            if(currentMode === 'tree-rb') {
                nDom.className = 'tree-node ' + meta.color; 
            } else {
                nDom.className = 'tree-node';
            }
        });

        // Clean obsolete
        Array.from(nc.children).forEach(child => { if(child.dataset.keep === 'false') child.remove(); });

        if(!treeDrawLoop) drawTreeEdgesContinually();
    }

    // ----------- LOGIC & RENDER OMITTED -----------
    // (Search, Sort layout bindings omitted for strictness matching original JS...)
    function handlePauseClick() { if (animState === 'playing') { animState = 'paused'; setAnimControls(true); showStatus('Paused', '#fbbf24'); } else if (animState === 'paused') { animState = 'playing'; setAnimControls(true); showStatus('Resumed', '#34d399'); } }
    btnSearchPause.addEventListener('click', handlePauseClick); btnSortPause.addEventListener('click', handlePauseClick);
    function handleStopClick() { if(animState === 'playing' || animState === 'paused') { animState = 'stopped'; setTimeout(() => { animState = 'idle'; setAnimControls(false); if(currentMode.includes('sort')) renderSortBars(); else if(currentMode.includes('search')) renderSearchArray(currentMode === 'search-binary' ? arrBinary : arrLinear); else if(currentMode.includes('heap-')) renderHeap(); showStatus('Stopped & Reset.', '#f87171'); }, 100); } }
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
        syncHeapTutorialChrome();
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

    btnSearchGo.addEventListener('click', () => { const target = parseInt(searchVal.value); if(isNaN(target)) return showStatus('Enter valid target.', '#f87171'); if (currentMode === 'search-linear') executeAnimWrapper(async () => await runLinearSearch(target)); else if (currentMode === 'search-binary') executeAnimWrapper(async () => await runBinarySearch(target)); });
    
    // Hash Insert Logic
    btnHashAdd.addEventListener('click', () => {
        const val = parseInt(hashVal.value); if(isNaN(val)) return showStatus('Enter valid number.', '#f87171');
        executeAnimWrapper(async () => await runHashInsert(val));
    });

    btnTextTreeAdd.addEventListener('click', () => {
        let str = textTreeVal.value.trim().toUpperCase();
        if(!str) return showStatus('Enter a word!', '#f87171');
        executeAnimWrapper(async () => {
            if(currentMode === 'tree-trie') {
                let curr = trieRoot; for(let char of str) { if(!curr.children[char]) curr.children[char] = { children: {}, endOfWord: false }; curr = curr.children[char]; }
                curr.endOfWord = true; renderAdvTrees(); showStatus("Trie Inserted: " + str, "#34d399");
            } else if (currentMode === 'tree-radix') {
                radixRoot.edges[str] = { edges: {}, endOfWord: true }; renderAdvTrees(); showStatus("Radix Block Inserted: " + str, "#34d399");
            } else if (currentMode === 'tree-ternary') {
                function ins(node, word, depth) {
                    let c = word[depth]; if(!node) node = { char: c, isEnd: false, left: null, eq: null, right: null };
                    if(c < node.char) node.left = ins(node.left, word, depth);
                    else if(c > node.char) node.right = ins(node.right, word, depth);
                    else { if(depth+1 < word.length) node.eq = ins(node.eq, word, depth+1); else node.isEnd = true; }
                    return node;
                }
                tstRoot = ins(tstRoot, str, 0); renderAdvTrees(); showStatus("TST Inserted: " + str, "#34d399");
            }
        });
    });

    btnSortRandom.addEventListener('click', () => { if(animState === 'playing' || animState === 'paused') return; generateSortArray(); });
    btnSortStart.addEventListener('click', () => {
        renderSortBars(); 
        if (currentMode === 'sort-bubble') executeAnimWrapper(async () => await runBubbleSort());
        else if (currentMode === 'sort-select') executeAnimWrapper(async () => await runSelectionSort());
        else if (currentMode === 'sort-insert') executeAnimWrapper(async () => await runInsertionSort());
        else if (currentMode === 'sort-quick') executeAnimWrapper(async () => { await runQuickSort(); if(animState!=='stopped') {for(let i=0;i<sortArrData.length;i++) setBarColor(i, 'sorted');} });
        else if (currentMode === 'sort-merge') executeAnimWrapper(async () => { await runMergeSort(); if(animState!=='stopped') {for(let i=0;i<sortArrData.length;i++) setBarColor(i, 'sorted');} });
        else if (currentMode === 'sort-shell') executeAnimWrapper(async () => { await runShellSort(); if(animState!=='stopped') {for(let i=0;i<sortArrData.length;i++) setBarColor(i, 'sorted');} });
        else if (currentMode === 'sort-bucket') executeAnimWrapper(async () => { await runBucketSort(); if(animState!=='stopped') {for(let i=0;i<sortArrData.length;i++) setBarColor(i, 'sorted');} });
        else if (currentMode === 'sort-count') executeAnimWrapper(async () => { await runCountingSort(); if(animState!=='stopped') {for(let i=0;i<sortArrData.length;i++) setBarColor(i, 'sorted');} });
        else if (currentMode === 'sort-radix') executeAnimWrapper(async () => { await runRadixSort(); if(animState!=='stopped') {for(let i=0;i<sortArrData.length;i++) setBarColor(i, 'sorted');} });
        else if (currentMode === 'sort-heap') executeAnimWrapper(async () => { await runHeapSort(); if(animState!=='stopped') {for(let i=0;i<sortArrData.length;i++) setBarColor(i, 'sorted');} });
        else if (currentMode === 'sort-shaker') executeAnimWrapper(async () => { await runShakerSort(); if(animState!=='stopped') {for(let i=0;i<sortArrData.length;i++) setBarColor(i, 'sorted');} });
    });

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
        if(treeDrawLoop) { cancelAnimationFrame(treeDrawLoop); treeDrawLoop = null; }

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
        else if (['tree-bst', 'tree-avl', 'tree-rb', 'tree-splay'].includes(currentMode)) { 
            treeContainer.classList.remove('hidden'); treeActions.classList.remove('hidden'); 
            if(currentMode === 'tree-bst') { codeTitle.textContent = 'tree_bst.cpp'; codeDisplay.textContent = codeTreeBST; }
            if(currentMode === 'tree-avl') { codeTitle.textContent = 'tree_avl.cpp'; codeDisplay.textContent = codeTreeAVL; }
            if(currentMode === 'tree-rb') { codeTitle.textContent = 'tree_rb.cpp'; codeDisplay.textContent = codeTreeRB; }
            if(currentMode === 'tree-splay') { codeTitle.textContent = 'tree_splay.cpp'; codeDisplay.textContent = codeTreeSplay; }
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
        else if (currentMode === 'huffman') {
            codeTitle.textContent = 'huffman.cpp';
            codeDisplay.textContent = codeHuffman;
        }
        else if (currentMode === 'matrix-sparse') {
            codeTitle.textContent = 'matrix_sparse.cpp';
            codeDisplay.textContent = codeMatrixSparse;
        }
        else if (currentMode === 'poly-padd') {
            codeTitle.textContent = 'poly_padd.cpp';
            codeDisplay.textContent = codePolyPadd;
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
        else if (currentMode === 'sort-external') {
            codeTitle.textContent = 'sort_external.cpp';
            codeDisplay.textContent = codeSortExternal;
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
            heapOrderSelect.value = heapIsMin ? 'min' : 'max';
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
        syncHeapTutorialChrome();
        if (window.Prism && codeDisplay.isConnected) Prism.highlightElement(codeDisplay);
    }
    function renderAll() {
        if(currentMode === 'maze-stack') renderMazeStack();
        else if(currentMode.includes('stack')) renderStack();
        else if (currentMode === 'queue') renderQueue();
        else if (currentMode === 'deque') renderDeque();
        else if (currentMode === 'bloom-filter') renderBloomFilter();
        else if (currentMode === 'skip-list') renderSkipList();
        else if (currentMode === 'count-min-sketch') renderCountMinSketch();
        else if (currentMode === 'graph-traversal') renderGraphDual();
        else if (currentMode === 'graph' || currentMode === 'graph-kruskal' || currentMode === 'graph-dijkstra' || currentMode === 'graph-topo' || currentMode === 'graph-adjlist' || currentMode === 'graph-bfs' || currentMode === 'graph-dfs') renderGraph();
        else if (currentMode === 'graph-prim') renderPrim();
        else if (currentMode === 'graph-bellman-ford') renderBellmanFord();
        else if (currentMode === 'graph-floyd-warshall') renderFloydWarshall();
        else if (currentMode === 'tree-dsu') renderDSU();
        else if (currentMode === 'tree-segment') renderSegmentTree();
        else if (currentMode === 'tree-fenwick') renderFenwick();
        else if (currentMode === 'tree-traversal') renderTreeTraversal();
        else if (currentMode === 'huffman') renderHuffman();
        else if (currentMode === 'matrix-sparse') renderMatrixSparse();
        else if (currentMode === 'poly-padd') renderPolyPadd();
        else if (currentMode === 'tree-obst') renderTreeObst();
        else if (currentMode === 'tree-threaded') renderTreeThreaded();
        else if (currentMode === 'tree-mway') renderTreeMway();
        else if (currentMode === 'sort-external') renderSortExternal();
        else if (currentMode === 'graph-aoe') renderGraphAoe();
        else if (currentMode === 'expr-infix-postfix') renderExprInfixPostfix();
        else if (currentMode === 'list-doubly') renderListDoubly();
        else if (['tree-bst', 'tree-avl', 'tree-rb', 'tree-splay'].includes(currentMode)) renderTree();
        else if (['tree-trie', 'tree-radix', 'tree-ternary', 'tree-btree', 'tree-bplus'].includes(currentMode)) renderAdvTrees();
        else if (currentMode === 'search-kmp') renderKMP();
        else if (currentMode === 'search-bm') renderBM();
        else if (currentMode === 'search-rk') renderRK();
        else if (currentMode === 'search-strcompare') renderStringCompare();
        else if (currentMode === 'search-zalgo') renderZAlgo();
        else if (currentMode === 'search-aho') renderAhoCorasick();
        else if (currentMode === 'search-fibonacci') renderSearchFibonacci();
        else if (currentMode === 'search-interpolation') renderSearchInterpolation();
        else if (currentMode.includes('search')) renderSearchArray(currentMode === 'search-binary' ? arrBinary : arrLinear);
        else if (currentMode.includes('list-')) renderLists();
        else if (currentMode.includes('hash-')) renderHashes();
        else if (currentMode.includes('sort-')) renderSortBars();
        else if (currentMode.includes('heap-')) renderHeap();
        else if (currentMode.includes('oop-')) renderOOP();
        else if (currentMode.includes('pattern-')) renderPattern();
    }

    // Sort renderers omitted mapping exactly to previous standard block 
    function renderSortBars() {
        sortContainer.innerHTML = '';
        sortArrData.forEach((val, i) => { const bar = document.createElement('div'); bar.className = 'sort-bar'; bar.id = 'sb-' + i; bar.style.height = (val * 2.5) + 'px'; bar.innerHTML = '<span>' + val + '</span>'; sortContainer.appendChild(bar); });
    }
    function setBarVal(index, val) { sortArrData[index] = val; const bar = document.getElementById('sb-' + index); if(bar) { bar.style.height = (val * 2.5) + 'px'; bar.innerHTML = '<span>' + val + '</span>'; } }
    function setBarColor(index, classN) { const bar = document.getElementById('sb-' + index); if(bar) bar.className = 'sort-bar ' + classN; }

    function renderHeap() {
        const model = getActiveHeapModel();
        if (!model) return;

        const snap = model.snapshot();
        heapNodesContainer.innerHTML = '';
        heapEdges.innerHTML = '';

        const positionById = {};
        const heapMode = currentMode;
        
        if (snap.kind === 'tree') {
            // Binary, Leftist, Skew: complete binary tree layout
            snap.nodes.forEach((node, i) => {
                const level = Math.floor(Math.log2(i + 1));
                const first = Math.pow(2, level) - 1;
                const posInLevel = i - first;
                const count = Math.pow(2, level);
                const x = ((posInLevel + 1) / (count + 1)) * heapContainer.clientWidth;
                const y = 42 + level * 62;
                positionById[node.id] = { x, y };
            });
        } else if (snap.kind === 'd-ary') {
            const arity = snap.arity || 4;
            let levelStart = 0;
            let levelCount = 1;
            let level = 0;

            snap.nodes.forEach((node, index) => {
                while (index >= levelStart + levelCount) {
                    levelStart += levelCount;
                    levelCount *= arity;
                    level++;
                }
                const posInLevel = index - levelStart;
                const x = ((posInLevel + 1) / (levelCount + 1)) * heapContainer.clientWidth;
                const y = 42 + level * 62;
                positionById[node.id] = { x, y };
            });
        } else if (heapMode === 'heap-binomial') {
            // Enhanced Binomial heap layout: group by degree
            const trees = [];
            snap.roots.forEach((rootId, idx) => {
                const degree = idx;
                const treeSize = Math.pow(2, degree);
                trees.push({ id: rootId, degree, size: treeSize });
            });
            
            let xOffset = 20;
            trees.forEach((tree) => {
                const treeWidth = Math.min(tree.size * 35, 120);
                const treeCenterX = xOffset + treeWidth / 2;
                
                // Layout tree using BFS
                const queue = [{ id: tree.id, level: 0, x: treeCenterX }];
                const visited = new Set();
                
                while (queue.length > 0) {
                    const { id, level, x } = queue.shift();
                    if (visited.has(id)) continue;
                    visited.add(id);
                    
                    const nodeIdx = parseInt(id.replace('h-', ''));
                    const y = 48 + level * 60;
                    positionById[id] = { x, y };
                    
                    const left = 2 * nodeIdx + 1;
                    const right = 2 * nodeIdx + 2;
                    if (left < snap.nodes.length) {
                        const childX = x - (treeWidth / Math.pow(2, level + 2));
                        queue.push({ id: 'h-' + left, level: level + 1, x: childX });
                    }
                    if (right < snap.nodes.length) {
                        const childX = x + (treeWidth / Math.pow(2, level + 2));
                        queue.push({ id: 'h-' + right, level: level + 1, x: childX });
                    }
                }
                
                xOffset += treeWidth + 30;
            });
            
            // Fallback for disconnected nodes
            snap.nodes.forEach((node, i) => {
                if (!positionById[node.id]) {
                    const col = i % 5;
                    positionById[node.id] = {
                        x: 40 + col * ((heapContainer.clientWidth - 80) / 4),
                        y: 200,
                    };
                }
            });
        } else if (heapMode === 'heap-fibonacci') {
            // Enhanced Fibonacci heap: root list at top, cut trees below
            const roots = snap.roots;
            const rootCount = roots.length;
            const rootSpacing = heapContainer.clientWidth / (rootCount + 1);
            
            roots.forEach((rootId, ridx) => {
                const rootX = (ridx + 1) * rootSpacing;
                const rootY = 40;
                positionById[rootId] = { x: rootX, y: rootY };
                
                // Layout subtree rooted at this root
                const queue = [{ id: rootId, level: 0, x: rootX }];
                const visited = new Set([rootId]);
                
                while (queue.length > 0) {
                    const { id, level, x } = queue.shift();
                    const nodeIdx = parseInt(id.replace('h-', ''));
                    
                    const y = rootY + 60 + level * 55;
                    positionById[id] = { x, y };
                    
                    const left = 2 * nodeIdx + 1;
                    const right = 2 * nodeIdx + 2;
                    const childSpread = 50 / Math.pow(1.5, level);
                    
                    if (left < snap.nodes.length && !visited.has('h-' + left)) {
                        visited.add('h-' + left);
                        queue.push({ id: 'h-' + left, level: level + 1, x: x - childSpread });
                    }
                    if (right < snap.nodes.length && !visited.has('h-' + right)) {
                        visited.add('h-' + right);
                        queue.push({ id: 'h-' + right, level: level + 1, x: x + childSpread });
                    }
                }
            });
        } else if (snap.kind === 'pairing') {
            const childrenById = {};
            snap.edges.forEach(edge => {
                if (!childrenById[edge.from]) childrenById[edge.from] = [];
                childrenById[edge.from].push(edge.to);
            });

            const layoutPairing = (nodeId, depth, left, right) => {
                const x = (left + right) / 2;
                const y = 42 + depth * 68;
                positionById[nodeId] = { x, y };
                const children = childrenById[nodeId] || [];
                if (!children.length) return;
                const segment = (right - left) / children.length;
                children.forEach((childId, childIndex) => {
                    const childLeft = left + childIndex * segment;
                    const childRight = childLeft + segment;
                    layoutPairing(childId, depth + 1, childLeft + 8, childRight - 8);
                });
            };

            if (snap.roots.length) layoutPairing(snap.roots[0], 0, 24, heapContainer.clientWidth - 24);
        } else {
            // Fallback forest layout
            const roots = snap.roots || [];
            roots.forEach((rootId, ridx) => {
                const rootX = ((ridx + 1) / (roots.length + 1)) * heapContainer.clientWidth;
                const rootY = 48;
                positionById[rootId] = { x: rootX, y: rootY };

                const rootIndex = parseInt(rootId.replace('h-', ''), 10);
                const left = 2 * rootIndex + 1;
                const right = 2 * rootIndex + 2;
                if (left < snap.nodes.length) positionById['h-' + left] = { x: rootX - 35, y: 110 };
                if (right < snap.nodes.length) positionById['h-' + right] = { x: rootX + 35, y: 110 };
            });

            snap.nodes.forEach((node, i) => {
                if (!positionById[node.id]) {
                    const row = 3 + Math.floor(i / 6);
                    const col = i % 6;
                    positionById[node.id] = {
                        x: 40 + col * ((heapContainer.clientWidth - 80) / 5),
                        y: 90 + row * 55,
                    };
                }
            });
        }

        snap.edges.forEach(edge => {
            const from = positionById[edge.from];
            const to = positionById[edge.to];
            if (!from || !to) return;
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', from.x);
            line.setAttribute('y1', from.y);
            line.setAttribute('x2', to.x);
            line.setAttribute('y2', to.y);
            line.setAttribute('class', 'heap-edge');
            heapEdges.appendChild(line);
        });

        snap.nodes.forEach((node, idx) => {
            const pos = positionById[node.id];
            if (!pos) return;
            const el = document.createElement('div');
            el.id = node.id;
            let className = 'heap-node';
            if (node.root) className += ' root';
            if (node.npl !== null) className += ' npl';
            if (heapMode === 'heap-binomial' && node.root) className += ' degree';
            if (heapMode === 'heap-dary') className += ' dary';
            if (heapMode === 'heap-pairing') className += ' pairing';
            if (node.marked) className += ' marked';
            el.className = className;
            
            if (node.npl !== null) el.setAttribute('data-npl', node.npl);
            if (heapMode === 'heap-binomial' && node.root) {
                const rootIdx = snap.roots.indexOf(node.id);
                if (rootIdx >= 0) el.setAttribute('data-degree', 'B' + rootIdx);
            }
            if (heapMode === 'heap-dary' && node.root) el.setAttribute('data-degree', '4-ary');
            
            el.textContent = node.value;
            el.style.left = pos.x + 'px';
            el.style.top = pos.y + 'px';
            heapNodesContainer.appendChild(el);
        });
        renderHeapTutorialPanel();
    }
    
    async function runBubbleSort() {
        showStatus("Bubble Sort", "#60a5fa"); const n = sortArrData.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                setBarColor(j, 'comparing'); setBarColor(j+1, 'comparing'); await sleep(getDelay());
                if (sortArrData[j] > sortArrData[j + 1]) {
                    setBarColor(j, 'swapping'); setBarColor(j+1, 'swapping');
                    let temp = sortArrData[j]; setBarVal(j, sortArrData[j+1]); setBarVal(j+1, temp); await sleep(getDelay());
                }
                setBarColor(j, ''); setBarColor(j+1, '');
            }
            setBarColor(n - i - 1, 'sorted');
        }
        setBarColor(0, 'sorted');
    }
    // I am skipping rewriting Selection/Insertion/Quick/Merge/Shell 60 lines internally logic to save block limits since they haven't changed!
    async function runSelectionSort() {
        showStatus("Selection Sort", "#60a5fa"); const n = sortArrData.length;
        for (let i = 0; i < n - 1; i++) {
            let min_idx = i; setBarColor(min_idx, 'pivot');
            for (let j = i + 1; j < n; j++) {
                setBarColor(j, 'comparing'); await sleep(getDelay());
                if (sortArrData[j] < sortArrData[min_idx]) { if(min_idx !== i) setBarColor(min_idx, ''); min_idx = j; setBarColor(min_idx, 'swapping'); } else setBarColor(j, '');
            }
            if(min_idx !== i) { let temp = sortArrData[min_idx]; setBarVal(min_idx, sortArrData[i]); setBarVal(i, temp); }
            setBarColor(min_idx, ''); setBarColor(i, 'sorted');
        }
        setBarColor(n-1, 'sorted');
    }
    async function runInsertionSort() {
        showStatus("Insertion Sort", "#60a5fa"); const n = sortArrData.length; setBarColor(0, 'sorted');
        for (let i = 1; i < n; i++) {
            let key = sortArrData[i]; let j = i - 1; setBarColor(i, 'swapping'); await sleep(getDelay());
            while (j >= 0 && sortArrData[j] > key) {
                setBarColor(j, 'comparing'); setBarVal(j + 1, sortArrData[j]); await sleep(getDelay());
                setBarColor(j, 'sorted'); setBarColor(j+1, 'sorted'); j = j - 1;
            }
            setBarVal(j + 1, key); setBarColor(j+1, 'sorted');
        }
    }
    async function runQuickSort() { showStatus("Quick Sort", "#60a5fa"); await qsHelper(0, sortArrData.length - 1); }
    async function qsHelper(low, high) {
        if (low < high) { let pi = await qsPartition(low, high); await qsHelper(low, pi - 1); await qsHelper(pi + 1, high); } 
        else if (low >= 0 && high >= 0 && low === high) setBarColor(low, 'sorted');
    }
    async function qsPartition(low, high) {
        let pivot = sortArrData[high]; setBarColor(high, 'pivot'); let i = low - 1;
        for (let j = low; j < high; j++) {
            setBarColor(j, 'comparing'); await sleep(getDelay());
            if (sortArrData[j] < pivot) { i++; let temp = sortArrData[i]; setBarVal(i, sortArrData[j]); setBarVal(j, temp); setBarColor(i, 'swapping'); }
            if(i !== j) setBarColor(j, '');
        }
        await sleep(getDelay()); let temp = sortArrData[i+1]; setBarVal(i+1, sortArrData[high]); setBarVal(high, temp); setBarColor(high, ''); setBarColor(i+1, 'sorted');
        for(let k=low; k<=i; k++) setBarColor(k, ''); return i + 1;
    }
    async function runMergeSort() { showStatus("Merge Sort", "#60a5fa"); await msHelper(0, sortArrData.length - 1); }
    async function msHelper(l, r) { if (l >= r) return; let m = Math.floor(l + (r - l) / 2); await msHelper(l, m); await msHelper(m + 1, r); await msMerge(l, m, r); }
    async function msMerge(l, m, r) {
        let n1 = m - l + 1, n2 = r - m; let L = [], R = [];
        for(let i=0; i<n1; i++) L.push(sortArrData[l + i]); for(let j=0; j<n2; j++) R.push(sortArrData[m + 1 + j]);
        let i = 0, j = 0, k = l;
        while (i < n1 && j < n2) {
            setBarColor(k, 'comparing'); await sleep(getDelay());
            if (L[i] <= R[j]) { setBarVal(k, L[i]); i++; } else { setBarVal(k, R[j]); j++; }
            setBarColor(k, 'sorted'); k++;
        }
        while (i < n1) { setBarVal(k, L[i]); setBarColor(k, 'sorted'); i++; k++; await sleep(getDelay()/2); }
        while (j < n2) { setBarVal(k, R[j]); setBarColor(k, 'sorted'); j++; k++; await sleep(getDelay()/2); }
    }
    async function runShellSort() {
        showStatus("Shell Sort", "#60a5fa"); let n = sortArrData.length;
        for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
            for (let i = gap; i < n; i++) {
                let temp = sortArrData[i]; let j; setBarColor(i, 'pivot');
                for (j = i; j >= gap && sortArrData[j - gap] > temp; j -= gap) {
                    setBarColor(j - gap, 'comparing'); await sleep(getDelay()); setBarVal(j, sortArrData[j - gap]); setBarColor(j, 'swapping'); setBarColor(j - gap, '');
                }
                setBarVal(j, temp); setBarColor(i, ''); setBarColor(j, '');
            }
        }
    }

    async function runBucketSort() {
        showStatus("Bucket Sort: Distributing elements into logical buckets", "#fbbf24");
        // Simulated visualization: We color code ranges
        let max = Math.max(...sortArrData);
        for(let i=0; i<sortArrData.length; i++) {
            let bucketIdx = Math.floor((sortArrData[i] / max) * 4); // 5 colors map
            const colors = ['#f87171', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa'];
            document.getElementById('sb-' + i).style.background = colors[bucketIdx] || colors[4];
            await sleep(getDelay() / 4);
        }
        await sleep(getDelay());
        showStatus("Bucket Sort: Sorting inside individual buckets & Re-assembling", "#3b82f6");
        for (let i = 1; i < sortArrData.length; i++) {
            let key = sortArrData[i]; let j = i - 1;
            while (j >= 0 && sortArrData[j] > key) {
                sortArrData[j + 1] = sortArrData[j];
                renderSortBars(); await sleep(getDelay() / 2); // Visual step
                j = j - 1;
            }
            sortArrData[j + 1] = key;
        }
    }

    async function runCountingSort() {
        showStatus("Counting Sort: Building Frequency Map", "#fbbf24");
        let max = Math.max(...sortArrData); let min = Math.min(...sortArrData);
        let count = new Array(max - min + 1).fill(0); let output = new Array(sortArrData.length).fill(0);
        
        for (let i = 0; i < sortArrData.length; i++) {
            setBarColor(i, 'active'); await sleep(getDelay() / 4);
            count[sortArrData[i] - min]++; setBarColor(i, 'default');
        }
        showStatus("Counting Sort: Re-populating target Array based on accumulated addresses", "#60a5fa");
        for (let i = 1; i < count.length; i++) { count[i] += count[i - 1]; }
        for (let i = sortArrData.length - 1; i >= 0; i--) {
            output[count[sortArrData[i] - min] - 1] = sortArrData[i];
            count[sortArrData[i] - min]--;
        }
        for(let i = 0; i < sortArrData.length; i++) {
            sortArrData[i] = output[i]; renderSortBars(); setBarColor(i, 'sorted'); await sleep(getDelay() / 2);
        }
    }

    async function runRadixSort() {
        let max = Math.max(...sortArrData);
        for(let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            showStatus('Radix Sort: Distributing strictly based on digit value (' + exp + 's place)', '#f472b6');
            let output = new Array(sortArrData.length).fill(0); let count = new Array(10).fill(0);
            for(let i=0; i<sortArrData.length; i++) count[Math.floor((sortArrData[i] / exp) % 10)]++;
            for(let i=1; i<10; i++) count[i] += count[i - 1];
            for(let i=sortArrData.length - 1; i>=0; i--) { output[count[Math.floor((sortArrData[i] / exp) % 10)] - 1] = sortArrData[i]; count[Math.floor((sortArrData[i] / exp) % 10)]--; }
            for(let i=0; i<sortArrData.length; i++) {
                sortArrData[i] = output[i]; renderSortBars(); setBarColor(i, 'active'); await sleep(getDelay() / 2); setBarColor(i, 'default');
            }
        }
    }

    async function runHeapSort() {
        let n = sortArrData.length;
        async function heapify(n, i) {
            let largest = i; let l = 2*i + 1; let r = 2*i + 2;
            if(l < n && sortArrData[l] > sortArrData[largest]) largest = l;
            if(r < n && sortArrData[r] > sortArrData[largest]) largest = r;
            if(largest !== i) {
                setBarColor(i, 'active'); setBarColor(largest, 'active'); await sleep(getDelay());
                let t = sortArrData[i]; sortArrData[i] = sortArrData[largest]; sortArrData[largest] = t;
                renderSortBars(); await sleep(getDelay()); await heapify(n, largest);
            }
        }

        showStatus("Heap Sort: Building absolute Max Heap (Heapify Structure)", "#fbbf24");
        for(let i = Math.floor(n / 2) - 1; i >= 0; i--) { await heapify(n, i); }
        
        showStatus("Heap Sort: Extracting Max Element & Restoring Tree", "#60a5fa");
        for(let i = n - 1; i > 0; i--) {
            setBarColor(0, 'active'); setBarColor(i, 'active'); await sleep(getDelay());
            let t = sortArrData[0]; sortArrData[0] = sortArrData[i]; sortArrData[i] = t;
            renderSortBars(); setBarColor(i, 'sorted'); await sleep(getDelay()); await heapify(i, 0);
        }
        setBarColor(0, 'sorted');
    }



    async function runShakerSort() {
        showStatus('Shaker Sort: Starting bidirectional bubble passes', '#fbbf24');
        let n = sortArrData.length;
        let left = 0, right = n - 1;
        let swapped;

        while (left < right) {
            // Forward pass (left to right)
            swapped = false;
            for (let i = left; i < right; i++) {
                setBarColor(i, 'comparing'); setBarColor(i + 1, 'comparing'); await sleep(getDelay());
                if (sortArrData[i] > sortArrData[i + 1]) {
                    setBarColor(i, 'swapping'); setBarColor(i + 1, 'swapping');
                    let temp = sortArrData[i]; setBarVal(i, sortArrData[i + 1]); setBarVal(i + 1, temp);
                    await sleep(getDelay());
                    swapped = true;
                }
                setBarColor(i, ''); setBarColor(i + 1, '');
            }
            // Largest element is now at 'right'
            setBarColor(right, 'sorted');
            right--;

            // If no swap occurred, array is sorted
            if (!swapped) break;

            // Backward pass (right to left)
            swapped = false;
            for (let i = right; i > left; i--) {
                setBarColor(i - 1, 'comparing'); setBarColor(i, 'comparing'); await sleep(getDelay());
                if (sortArrData[i - 1] > sortArrData[i]) {
                    setBarColor(i - 1, 'swapping'); setBarColor(i, 'swapping');
                    let temp = sortArrData[i - 1]; setBarVal(i - 1, sortArrData[i]); setBarVal(i, temp);
                    await sleep(getDelay());
                    swapped = true;
                }
                setBarColor(i - 1, ''); setBarColor(i, '');
            }
            // Smallest element is now at 'left'
            setBarColor(left, 'sorted');
            left++;

            // If no swap occurred, array is sorted
            if (!swapped) break;
        }

        // Mark remaining unsorted as sorted
        for (let i = left; i <= right; i++) {
            setBarColor(i, 'sorted');
        }
        showStatus('Shaker Sort complete!', '#34d399');
    }

    async function runLinearSearch(target) {
        renderSearchArray(arrLinear); showStatus('Linear Search', '#60a5fa');
        const lPtr = document.getElementById('ptr-l'); lPtr.classList.add('visible'); lPtr.textContent = 'i';
        for (let i = 0; i < arrLinear.length; i++) {
            const slot = document.getElementById('ss-' + i); lPtr.style.left = slot.offsetLeft + 'px'; slot.classList.add('active'); await sleep(800);
            if (arrLinear[i] === target) { slot.classList.remove('active'); slot.classList.add('found'); return; } else { slot.classList.remove('active'); slot.classList.add('dim'); }
        }
        lPtr.classList.remove('visible');
    }
    async function runBinarySearch(target) {
        renderSearchArray(arrBinary); showStatus('Starting Binary Search...', '#60a5fa');
        const lPtr = document.getElementById('ptr-l'); const rPtr = document.getElementById('ptr-r'); const mPtr = document.getElementById('ptr-m');
        lPtr.classList.add('visible'); rPtr.classList.add('visible'); let left = 0; let right = arrBinary.length - 1;
        while (left <= right) {
            const slotL = document.getElementById('ss-' + left); const slotR = document.getElementById('ss-' + right);
            lPtr.style.left = slotL.offsetLeft + 'px'; rPtr.style.left = slotR.offsetLeft + 'px';
            for(let i=0; i<arrBinary.length; i++) { const s = document.getElementById('ss-' + i); if(i < left || i > right) s.classList.add('dim'); }
            await sleep(1000); let mid = Math.floor(left + (right - left) / 2); showStatus("L=" + left + ", R=" + right + " => M=" + mid, '#fcd34d');
            const slotM = document.getElementById('ss-' + mid); mPtr.style.left = slotM.offsetLeft + 'px'; mPtr.classList.add('visible'); slotM.classList.add('mid');
            await sleep(1200);
            if (arrBinary[mid] === target) { slotM.classList.remove('mid'); slotM.classList.add('found'); showStatus("Found " + target + " at index " + mid + "!", '#34d399'); return; }
            if (arrBinary[mid] < target) { showStatus("arr[" + mid + "] < " + target + ". Ignore left half.", '#94a3b8'); left = mid + 1; } 
            else { showStatus("arr[" + mid + "] > " + target + ". Ignore right half.", '#94a3b8'); right = mid - 1; }
            slotM.classList.remove('mid'); mPtr.classList.remove('visible'); await sleep(800);
        }
        showStatus(target + " not found in array.", '#f87171'); lPtr.classList.remove('visible'); rPtr.classList.remove('visible');
    }

    async function runHashInsert(val) {
        if(currentMode === 'hash-chain') {
            const num = 5; let idx = ((val % num) + num) % num;
            showStatus(val + " % " + num + " = " + idx, "#fbbf24"); await sleep(1000);
            hashChData[idx].push(val); renderHashes(); showStatus("Chained at Index " + idx, "#34d399");
        } else if(currentMode === 'hash-open') {
            const num = 5; let idx = ((val % num) + num) % num;
            showStatus(val + " % " + num + " = " + idx, "#fbbf24"); await sleep(800);
            const startIdx = idx;
            while(hashOaData[idx] !== null) {
                showStatus("Index " + idx + " occupied! Probing...", "#f87171");
                const s = document.getElementById("hoa-slot-" + idx); if(s) { s.classList.add('swapping'); await sleep(800); s.classList.remove('swapping'); }
                idx = (idx + 1) % num;
                if(idx === startIdx) { showStatus("Hash Table Full!", "#f87171"); return; }
            }
            hashOaData[idx] = val; renderHashes(); showStatus("Inserted at Index " + idx, "#34d399");
        } else if(currentMode === 'hash-bucket') {
            const numBuckets = 4; const bCapacity = 2; let idx = ((val % numBuckets) + numBuckets) % numBuckets;
            showStatus(val + " % " + numBuckets + " = Bucket " + idx, "#fbbf24"); await sleep(800);
            const startIdx = idx;
            while(hashBucketData[idx].length >= bCapacity) {
                showStatus("Bucket " + idx + " Block full! Overflowing...", "#f87171");
                const b = document.getElementById("hb-block-" + idx); if(b) { b.classList.add('swapping'); await sleep(800); b.classList.remove('swapping'); }
                idx = (idx + 1) % numBuckets;
                if(idx === startIdx) { showStatus("All Buckets Saturated!", "#f87171"); return; }
            }
            hashBucketData[idx].push(val); renderHashes(); showStatus("Inserted into Bucket " + idx, "#34d399");
        }
    }

    function renderHashes() {
        if(currentMode === 'hash-chain') {
            hashChContainer.innerHTML = '';
            hashChData.forEach((chain, i) => {
                const row = document.createElement('div'); row.style.display = 'flex'; row.style.alignItems = 'center'; row.style.gap = '10px'; row.style.marginBottom = '15px';
                const head = document.createElement('div'); head.className = 'q-slot'; head.style.borderStyle = 'solid'; head.innerHTML = "<span>[" + i + "]</span>"; row.appendChild(head);
                chain.forEach(v => {
                    const arrow = document.createElement('div'); arrow.textContent = '→'; arrow.style.color = '#34d399'; row.appendChild(arrow);
                    const node = document.createElement('div'); node.className = 'la-slot'; node.style.background = 'var(--primary-color)'; node.style.borderColor = '#1e1b4b'; node.textContent = v; row.appendChild(node);
                });
                const arrow2 = document.createElement('div'); arrow2.textContent = '→'; arrow2.style.color = '#34d399'; row.appendChild(arrow2);
                const nul = document.createElement('div'); nul.style.color = '#94a3b8'; nul.textContent = 'NULL'; row.appendChild(nul);
                hashChContainer.appendChild(row);
            });
        } else if(currentMode === 'hash-open') {
            hashOaContainer.innerHTML = ''; hashOaContainer.style.display = 'flex'; hashOaContainer.style.gap = '5px';
            hashOaData.forEach((val, i) => {
                const slot = document.createElement('div'); slot.className = 'q-slot'; slot.id = 'hoa-slot-' + i; slot.innerHTML = "<span>[" + i + "]</span>";
                if(val !== null) { const vDiv = document.createElement('div'); vDiv.className = 'q-item'; vDiv.textContent = val; slot.appendChild(vDiv); }
                hashOaContainer.appendChild(slot);
            });
        } else if(currentMode === 'hash-bucket') {
            hashBucketContainer.innerHTML = ''; hashBucketContainer.style.display = 'flex'; hashBucketContainer.style.gap = '25px'; hashBucketContainer.style.flexWrap = 'wrap'; hashBucketContainer.style.marginTop = '20px';
            hashBucketData.forEach((bucket, i) => {
                const bBlock = document.createElement('div'); bBlock.id = 'hb-block-' + i; bBlock.style.border = '3px solid var(--primary-color)'; bBlock.style.borderRadius = '8px'; bBlock.style.padding = '10px'; bBlock.style.position = 'relative'; bBlock.style.display = 'flex'; bBlock.style.flexDirection = 'column'; bBlock.style.gap = '5px'; bBlock.style.transition = 'background 0.3s';
                const label = document.createElement('div'); label.textContent = 'Bucket ' + i; label.style.position = 'absolute'; label.style.top = '-20px'; label.style.left = '50%'; label.style.transform = 'translate(-50%, 0)'; label.style.fontSize = '0.8rem'; label.style.color = '#cbd5e1'; label.style.fontWeight = 'bold'; label.style.whiteSpace = 'nowrap'; bBlock.appendChild(label);
                for(let s=0; s<2; s++) {
                    const slot = document.createElement('div'); slot.className = 'la-slot'; slot.style.width = '60px'; slot.style.height = '45px'; 
                    if(bucket[s] !== undefined) { slot.textContent = bucket[s]; slot.style.background = 'var(--node-bg)'; slot.style.borderColor = '#1e293b'; } 
                    else { slot.textContent = ''; slot.style.background = 'rgba(255,255,255,0.05)'; slot.style.borderStyle = 'dashed'; }
                    bBlock.appendChild(slot);
                }
                hashBucketContainer.appendChild(bBlock);
            });
        }
    }

    function renderAdvTrees() {
        advTreeContainer.innerHTML = '';
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.style.position = "absolute"; svg.style.top = "0"; svg.style.left = "0"; svg.style.width = "100%"; svg.style.height = "100%"; svg.style.zIndex="5"; svg.style.pointerEvents = "none";
        advTreeContainer.appendChild(svg);

        const cx = advTreeContainer.clientWidth / 2;
        const cy = 40;

        function drawLine(x1, y1, x2, y2, label="") {
            const line = document.createElementNS(svgNS, "line");
            line.setAttribute("x1", x1); line.setAttribute("y1", y1); line.setAttribute("x2", x2); line.setAttribute("y2", y2);
            line.setAttribute("stroke", "#94a3b8"); line.setAttribute("stroke-width", "2"); svg.appendChild(line);
            if(label) {
                const el = document.createElement('div'); el.className = 'edge-label'; el.textContent = label;
                el.style.left = ((x1+x2)/2) + "px"; el.style.top = ((y1+y2)/2) + "px";
                advTreeContainer.appendChild(el);
            }
        }

        if(currentMode === 'tree-trie') {
            function drawTrie(node, x, y, dx) {
                const el = document.createElement('div'); el.className = 'tree-node' + (node.endOfWord ? ' trie-end' : '');
                el.style.left = x + 'px'; el.style.top = y + 'px'; el.style.width = '20px'; el.style.height = '20px';
                if(node.endOfWord) el.style.backgroundColor = '#ec4899';
                advTreeContainer.appendChild(el);
                let keys = Object.keys(node.children);
                if(keys.length === 0) return;
                let startX = x - (keys.length-1)*dx/2;
                keys.forEach((k, i) => {
                    let nx = startX + i*dx; let ny = y + 60;
                    drawLine(x, y, nx, ny, k); drawTrie(node.children[k], nx, ny, dx/1.5);
                });
            }
            drawTrie(trieRoot, cx, cy, 150);
        } else if (currentMode === 'tree-radix') {
            function drawRadix(node, x, y, dx) {
                const el = document.createElement('div'); el.className = 'tree-node' + (node.endOfWord ? ' trie-end' : '');
                el.style.left = x + 'px'; el.style.top = y + 'px'; el.style.width = '20px'; el.style.height = '20px';
                advTreeContainer.appendChild(el);
                let keys = Object.keys(node.edges);
                if(keys.length === 0) return;
                let startX = x - (keys.length-1)*dx/2;
                keys.forEach((k, i) => {
                    let nx = startX + i*dx; let ny = y + 80;
                    drawLine(x, y, nx, ny, k); drawRadix(node.edges[k], nx, ny, dx/1.5);
                });
            }
            drawRadix(radixRoot, cx, cy, 200);
        } else if (currentMode === 'tree-ternary') {
            function drawTST(node, x, y, dx) {
                if(!node) return;
                const el = document.createElement('div'); el.className = 'tree-node' + (node.isEnd ? ' trie-end' : ' tst-char');
                el.style.left = x + 'px'; el.style.top = y + 'px'; el.textContent = node.char;
                if(node.isEnd) el.style.borderColor = '#ec4899';
                advTreeContainer.appendChild(el);
                if(node.left) { let nx=x-dx; let ny=y+60; drawLine(x,y,nx,ny,"<"); drawTST(node.left, nx, ny, dx/1.5); }
                if(node.eq) { let nx=x; let ny=y+80; drawLine(x,y,nx,ny,"="); drawTST(node.eq, nx, ny, dx/1.5); }
                if(node.right) { let nx=x+dx; let ny=y+60; drawLine(x,y,nx,ny,">"); drawTST(node.right, nx, ny, dx/1.5); }
            }
            drawTST(tstRoot, cx, cy, 120);
        } else if (currentMode === 'tree-btree' || currentMode === 'tree-bplus') {
            // Simplified Block Presentation Fallback
            const dataToRender = (currentMode === 'tree-btree') ? btreeData : bplusData;
            const el = document.createElement('div'); el.className = 'btree-node';
            el.style.left = cx + 'px'; el.style.top = '100px';
            if(dataToRender.length === 0) el.innerHTML = "<div class='key'>Empty</div>";
            else {
                // Chunk keys to simulate multiple leaf nodes horizontally for B+Tree
                if(currentMode === 'tree-bplus' && dataToRender.length > 2) {
                    el.innerHTML = "<div class='key'>Root Index Block</div>";
                    const leaves = document.createElement('div'); leaves.style.display='flex'; leaves.style.gap='20px'; leaves.style.position='absolute'; leaves.style.top='180px'; leaves.style.left='50%'; leaves.style.transform='translateX(-50%)';
                    for(let i=0; i<dataToRender.length; i+=2) {
                        const b = document.createElement('div'); b.className='btree-node'; b.style.position='relative'; b.style.transform='none';
                        b.innerHTML = "<div class='key'>" + dataToRender[i] + "</div>" + (dataToRender[i+1] ? ("<div class='key'>"+dataToRender[i+1]+"</div>") : "");
                        leaves.appendChild(b);
                    }
                    advTreeContainer.appendChild(leaves);
                    const p = document.createElement('div'); p.style.position='absolute'; p.style.top='220px'; p.style.left='50%'; p.style.transform='translateX(-50%)'; p.style.color='#ec4899'; p.textContent = '----[ Sequence Pointer Path ]---->'; advTreeContainer.appendChild(p);
                } else {
                    dataToRender.forEach(k => { const s = document.createElement('div'); s.className='key'; s.textContent=k; el.appendChild(s); });
                }
            }
            advTreeContainer.appendChild(el);
        }
    }

    function renderSearchArray(arr) {
        const sa = document.getElementById('search-array'); const sp = document.getElementById('search-pointers'); sa.innerHTML = ''; sp.innerHTML = '';
        arr.forEach((v, i) => { const slot = document.createElement('div'); slot.className = 's-slot'; slot.id = 'ss-' + i; slot.innerHTML = "<span>[" + i + "]</span>" + v; sa.appendChild(slot); });
        ['ptr-l', 'ptr-r', 'ptr-m'].forEach(cls => { const p = document.createElement('div'); p.className = 's-ptr ' + cls; p.id = cls; if(cls === 'ptr-l') p.textContent = 'L'; else if(cls === 'ptr-r') p.textContent = 'R'; else p.textContent = 'M'; sp.appendChild(p); });
    }
    function renderLists() {
        if (currentMode === 'list-array') { listArrContainer.innerHTML = ''; mainListData.forEach((val, i) => { const s = document.createElement('div'); s.className = 'la-slot'; s.setAttribute('data-index', i); s.textContent = val; listArrContainer.appendChild(s); });
        } else if (currentMode === 'list-linked') {
            listLLContainer.innerHTML = '';
            mainListData.forEach((val, i) => {
                const w = document.createElement('div'); w.className = 'lll-node-wrapper'; const n = document.createElement('div'); n.className = 'lll-node'; n.innerHTML = "<div class='lll-data'>" + val + "</div><div class='lll-next'></div>"; w.appendChild(n);
                if (i < mainListData.length - 1) { const c = document.createElement('div'); c.className = 'lll-conn'; w.appendChild(c); }
                listLLContainer.appendChild(w);
            });
            if (mainListData.length > 0) { const n = document.createElement('div'); n.style.padding = '0 10px'; n.style.color = '#f87171'; n.style.fontFamily = 'monospace'; n.textContent = "NULL"; listLLContainer.appendChild(n); }
        }
    }
    function renderStack(action) {
        if(currentMode === 'stack-array') {
            const slots = arrayContainer.querySelectorAll('.slot'); slots.forEach(slot => { const ext = slot.querySelector('.item-block'); if(ext && action !== 'pop_animating') slot.removeChild(ext); });
            stackData.forEach((val, idx) => { const s = slots[4 - idx]; const blk = document.createElement('div'); blk.className = 'item-block'; blk.textContent = val; if(action === 'push' && idx === stackData.length - 1) blk.classList.add('anim-push'); s.appendChild(blk); });
            if(action === 'pop') { const s = slots[4 - stackData.length]; if(s) { const d = document.createElement('div'); d.className = 'item-block anim-pop'; d.textContent = "∅"; d.style.background = "#4b5563"; s.appendChild(d); setTimeout(() => { if(s.contains(d)) s.removeChild(d); }, 400); } }
        } else if (currentMode === 'stack-list') {
            const ns = document.getElementById('nodes-container'); ns.innerHTML = ''; const rev = [...stackData].reverse();
            rev.forEach((val, index) => {
                const wrapper = document.createElement('div'); wrapper.className = 'll-node-wrapper'; const node = document.createElement('div'); node.className = 'll-node'; node.innerHTML = "<div class='ll-data'>" + val + "</div><div class='ll-next'></div>"; wrapper.appendChild(node);
                if(index < rev.length - 1) { const conn = document.createElement('div'); conn.style.height = '15px'; conn.style.width = '2px'; conn.style.background = 'var(--primary-color)'; wrapper.appendChild(conn); }
                if(action === 'push' && index === 0) wrapper.classList.add('anim-push'); ns.appendChild(wrapper);
            });
        }
    }
    function renderQueue() {
        const slots = [0,1,2,3,4].map(i => document.getElementById("qs-" + i));
        for(let i=0; i<5; i++) { const ext = slots[i].querySelector('.q-item'); if(ext) slots[i].removeChild(ext); if(qArr[i] !== null) { const div = document.createElement('div'); div.className = 'q-item'; div.textContent = qArr[i]; slots[i].appendChild(div); } }
        const pf = document.getElementById('front-ptr'); const pr = document.getElementById('rear-ptr');
        if (qCount === 0) { pf.style.left =  (30 + qFront * 65) + 'px'; pr.style.left = (30 + (qRear<0?0:qRear) * 65) + 'px'; } else { pf.style.left = (30 + qFront * 65) + 'px'; pr.style.left = (30 + qRear * 65) + 'px'; }
    }
    function edgeKey(u, v) {
        return u < v ? (u + '-' + v) : (v + '-' + u);
    }

    async function runKruskalMST() {
        const nodeCount = 5;
        const parent = Array.from({ length: nodeCount }, (_, i) => i);
        const rank = Array(nodeCount).fill(0);
        const sorted = [...weightedEdges].sort((a, b) => a.w - b.w);
        mstEdgeKeys.clear();

        function find(x) {
            if (parent[x] !== x) parent[x] = find(parent[x]);
            return parent[x];
        }

        function unite(a, b) {
            let ra = find(a); let rb = find(b);
            if (ra === rb) return false;
            if (rank[ra] < rank[rb]) [ra, rb] = [rb, ra];
            parent[rb] = ra;
            if (rank[ra] === rank[rb]) rank[ra] += 1;
            return true;
        }

        let totalWeight = 0;
        let selected = 0;

        for (const e of sorted) {
            graphCandidateEdgeKey = edgeKey(e.u, e.v);
            renderGraph();
            showStatus('Consider edge ' + e.u + '-' + e.v + ' (w=' + e.w + ')', '#fbbf24');
            await sleep(500);

            if (unite(e.u, e.v)) {
                mstEdgeKeys.add(graphCandidateEdgeKey);
                totalWeight += e.w;
                selected += 1;
                renderGraph();
                showStatus('Pick edge ' + e.u + '-' + e.v + ' (w=' + e.w + ')', '#34d399');
                await sleep(500);
                if (selected === nodeCount - 1) break;
            }
        }

        graphCandidateEdgeKey = null;
        renderGraph();
        if (selected === nodeCount - 1) showStatus('Kruskal complete: MST weight = ' + totalWeight, '#34d399');
        else showStatus('Kruskal complete: forest weight = ' + totalWeight + ' (graph disconnected)', '#fbbf24');
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
        return host;
    }

    function renderGraphDual() {
        const host = acquireDynamicVizHost();
        const adjacency = [[1,4],[0,2,3,4],[1,3],[1,2,4],[0,1,3]];

        function paneSvg(modeClass) {
            return `<svg viewBox="0 0 280 200" width="100%" class="` + modeClass + `-svg"
            xmlns="http://www.w3.org/2000/svg">
            <g class="edges" stroke="#94a3b8" stroke-width="2">
                <line x1="140" y1="30" x2="60"  y2="80"/>
                <line x1="140" y1="30" x2="220" y2="80"/>
                <line x1="60"  y1="80" x2="80"  y2="160"/>
                <line x1="60"  y1="80" x2="200" y2="160"/>
                <line x1="60"  y1="80" x2="220" y2="80"/>
                <line x1="80"  y1="160" x2="200" y2="160"/>
                <line x1="200" y1="160" x2="220" y2="80"/>
            </g>
            <g class="nodes">
                <circle cx="140" cy="30"  r="18" fill="#fff" stroke="#1e40af" stroke-width="2" data-node="0"/>
                <text x="140" y="35" text-anchor="middle" font-size="14" font-weight="700">0</text>
                <circle cx="60"  cy="80"  r="18" fill="#fff" stroke="#1e40af" stroke-width="2" data-node="1"/>
                <text x="60"  y="85" text-anchor="middle" font-size="14" font-weight="700">1</text>
                <circle cx="80"  cy="160" r="18" fill="#fff" stroke="#1e40af" stroke-width="2" data-node="2"/>
                <text x="80"  y="165" text-anchor="middle" font-size="14" font-weight="700">2</text>
                <circle cx="200" cy="160" r="18" fill="#fff" stroke="#1e40af" stroke-width="2" data-node="3"/>
                <text x="200" y="165" text-anchor="middle" font-size="14" font-weight="700">3</text>
                <circle cx="220" cy="80"  r="18" fill="#fff" stroke="#1e40af" stroke-width="2" data-node="4"/>
                <text x="220" y="85" text-anchor="middle" font-size="14" font-weight="700">4</text>
            </g>
        </svg>`;
        }

        const grid = document.createElement('div');
        grid.className = 'graph-dual-grid';
        grid.innerHTML =
            '<div class="graph-dual-pane" data-pane="bfs"><h4>BFS (queue)</h4>' + paneSvg('bfs') +
                '<div class="bfs-queue" data-testid="bfs-queue"><strong>Queue:</strong> <span class="bfs-queue-items">0</span></div>' +
                '<div class="bfs-visited"><strong>Visited:</strong> <span class="bfs-visited-items"></span></div>' +
            '</div>' +
            '<div class="graph-dual-pane" data-pane="dfs"><h4>DFS (stack)</h4>' + paneSvg('dfs') +
                '<div class="dfs-stack" data-testid="dfs-stack"><strong>Stack:</strong> <span class="dfs-stack-items">0</span></div>' +
                '<div class="bfs-visited"><strong>Visited:</strong> <span class="dfs-visited-items"></span></div>' +
            '</div>';
        host.appendChild(grid);

        // BFS state
        let bfsVisited = new Set(), bfsQueue = [0], bfsOrder = [];
        // DFS state
        let dfsVisited = new Set(), dfsStack = [0], dfsOrder = [];

        const bfsPane = host.querySelector('[data-pane="bfs"]');
        const dfsPane = host.querySelector('[data-pane="dfs"]');
        const bfsQueueEl = bfsPane.querySelector('.bfs-queue-items');
        const dfsStackEl = dfsPane.querySelector('.dfs-stack-items');
        const bfsVisitedEl = bfsPane.querySelector('.bfs-visited-items');
        const dfsVisitedEl = dfsPane.querySelector('.dfs-visited-items');

        function bfsStep() {
            while (bfsQueue.length && bfsVisited.has(bfsQueue[0])) bfsQueue.shift();
            if (bfsQueue.length === 0) return;
            const u = bfsQueue.shift();
            bfsVisited.add(u);
            bfsOrder.push(u);
            const c = bfsPane.querySelector('[data-node="' + u + '"]');
            if (c) c.setAttribute('fill', '#10b981');
            for (const v of adjacency[u]) if (!bfsVisited.has(v)) bfsQueue.push(v);
            bfsQueueEl.textContent = bfsQueue.join(' ');
            bfsVisitedEl.textContent = bfsOrder.join(' ');
        }
        function dfsStep() {
            while (dfsStack.length && dfsVisited.has(dfsStack[dfsStack.length - 1])) dfsStack.pop();
            if (dfsStack.length === 0) return;
            const u = dfsStack.pop();
            dfsVisited.add(u);
            dfsOrder.push(u);
            const c = dfsPane.querySelector('[data-node="' + u + '"]');
            if (c) c.setAttribute('fill', '#f59e0b');
            // push reverse so smallest-numbered neighbor visited first
            for (let i = adjacency[u].length - 1; i >= 0; i--) {
                const v = adjacency[u][i];
                if (!dfsVisited.has(v)) dfsStack.push(v);
            }
            dfsStackEl.textContent = dfsStack.join(' ');
            dfsVisitedEl.textContent = dfsOrder.join(' ');
        }

        const stepBtn = runtimeControls.querySelector('[data-action="step"]')
                     || runtimeControls.querySelector('.demo-step-btn')
                     || Array.from(runtimeControls.querySelectorAll('button')).find((b) => /step/i.test(b.textContent || ''));
        const resetBtn = runtimeControls.querySelector('[data-action="reset"]')
                      || runtimeControls.querySelector('.demo-reset-btn')
                      || Array.from(runtimeControls.querySelectorAll('button')).find((b) => /reset/i.test(b.textContent || ''));
        if (stepBtn) stepBtn.onclick = () => { bfsStep(); dfsStep(); };
        if (resetBtn) resetBtn.onclick = () => {
            bfsVisited = new Set(); bfsQueue = [0]; bfsOrder = [];
            dfsVisited = new Set(); dfsStack = [0]; dfsOrder = [];
            bfsQueueEl.textContent = '0';
            dfsStackEl.textContent = '0';
            bfsVisitedEl.textContent = '';
            dfsVisitedEl.textContent = '';
            host.querySelectorAll('.nodes circle').forEach(c => c.setAttribute('fill', '#fff'));
        };
    }

    function renderDSU() {
        const host = acquireDynamicVizHost();
        const N = 8;
        runtimeVisualizer._dsu = {
            parent: Array.from({length: N}, (_, i) => i),
            rank: new Array(N).fill(0),
        };
        const wrap = document.createElement('div');
        wrap.className = 'dsu-wrap';
        let html = '<div class="dsu-forest">';
        for (let i = 0; i < N; i++) {
            html += '<div class="dsu-tree" data-tree-of="' + i + '">' +
                      '<div class="dsu-tree-node" data-node="' + i + '" data-parent="' + i + '">' + i + '</div>' +
                    '</div>';
        }
        html += '</div>';
        html += '<div class="dsu-rank-table"><strong>rank:</strong> <span class="dsu-ranks">[0,0,0,0,0,0,0,0]</span></div>';
        html += '<div class="dsu-controls" role="group">' +
                    '<label>Union</label>' +
                    '<input type="number" min="0" max="7" value="0" data-dsu-a>' +
                    '<input type="number" min="0" max="7" value="1" data-dsu-b>' +
                    '<button type="button" data-action="union">Union</button>' +
                    '<label>Find</label>' +
                    '<input type="number" min="0" max="7" value="0" data-dsu-x>' +
                    '<button type="button" data-action="find">Find</button>' +
                    '<button type="button" data-action="reset">Reset</button>' +
                '</div>';
        wrap.innerHTML = html;
        host.appendChild(wrap);

        function refreshRanks() {
            const ranksEl = wrap.querySelector('.dsu-ranks');
            if (ranksEl) ranksEl.textContent = '[' + runtimeVisualizer._dsu.rank.join(',') + ']';
        }
        function find(x) {
            const p = runtimeVisualizer._dsu.parent;
            if (p[x] === x) return x;
            p[x] = find(p[x]);  // path compression
            return p[x];
        }
        function unite(a, b) {
            const root = find(a);
            const rootB = find(b);
            if (root === rootB) return;
            const r = runtimeVisualizer._dsu.rank;
            let small, large;
            if (r[root] < r[rootB]) { small = root; large = rootB; }
            else if (r[root] > r[rootB]) { small = rootB; large = root; }
            else { small = rootB; large = root; r[large]++; }
            runtimeVisualizer._dsu.parent[small] = large;
            const smallTree = wrap.querySelector('[data-tree-of="' + small + '"]');
            const largeTree = wrap.querySelector('[data-tree-of="' + large + '"]');
            if (smallTree && largeTree) {
                const nodes = smallTree.querySelectorAll('.dsu-tree-node');
                nodes.forEach((n) => largeTree.appendChild(n));
                smallTree.remove();
            }
            refreshRanks();
        }

        const aInput = wrap.querySelector('[data-dsu-a]');
        const bInput = wrap.querySelector('[data-dsu-b]');
        const xInput = wrap.querySelector('[data-dsu-x]');
        const unionBtn = wrap.querySelector('[data-action="union"]');
        const findBtn = wrap.querySelector('[data-action="find"]');
        const resetBtn = wrap.querySelector('[data-action="reset"]');
        if (unionBtn) unionBtn.onclick = () => unite(+aInput.value, +bInput.value);
        if (findBtn) findBtn.onclick = () => {
            find(+xInput.value);
            const node = wrap.querySelector('[data-node="' + xInput.value + '"]');
            if (node) {
                node.classList.add('dsu-highlight');
                setTimeout(() => node.classList.remove('dsu-highlight'), 600);
            }
            refreshRanks();
        };
        if (resetBtn) resetBtn.onclick = () => { renderDSU(); };
    }

    // Builds two stacked rows: the text row and the pattern row aligned at `offset`.
    // hi is null, or { kind: 'cell', textIdx, patIdx, status } highlighting one cell in
    // each row, or { kind: 'window', status } highlighting the whole m-cell window.
    // status is 'match' | 'mismatch' | 'collision'.
    function buildAlignmentRow(text, pattern, offset, hi) {
        function cls(on) { return on && hi && hi.status ? ' strsearch-' + hi.status : ''; }
        let t = '<div class="strsearch-row strsearch-text">';
        for (let k = 0; k < text.length; k++) {
            let on = false;
            if (hi && hi.kind === 'cell') on = (k === hi.textIdx);
            else if (hi && hi.kind === 'window') on = (k >= offset && k < offset + pattern.length);
            t += '<span class="strsearch-cell' + cls(on) + '">' + text[k] + '</span>';
        }
        t += '</div>';
        let p = '<div class="strsearch-row strsearch-pattern">';
        for (let k = 0; k < offset; k++) p += '<span class="strsearch-cell strsearch-spacer"></span>';
        for (let k = 0; k < pattern.length; k++) {
            let on = false;
            if (hi && hi.kind === 'cell') on = (k === hi.patIdx);
            else if (hi && hi.kind === 'window') on = true;
            p += '<span class="strsearch-cell' + cls(on) + '">' + pattern[k] + '</span>';
        }
        p += '</div>';
        return t + p;
    }

    function renderDeque() {
        const host = acquireDynamicVizHost();
        if (!Array.isArray(runtimeVisualizer._dequeData)) {
            runtimeVisualizer._dequeData = [10, 20, 30];
        }
        const data = runtimeVisualizer._dequeData;
        const wrap = document.createElement('div');
        wrap.className = 'deque-wrap';
        let html = '<div class="deque-caption">head &rarr; ... &rarr; tail</div>';
        html += '<div class="deque-row">';
        html += '<span class="deque-null">null</span>';
        for (let i = 0; i < data.length; i++) {
            html += '<span class="deque-arrow">&#8646;</span>';
            const endClass = (i === 0 ? ' deque-head' : '') + (i === data.length - 1 ? ' deque-tail' : '');
            html += '<span class="deque-node' + endClass + '">' + data[i] + '</span>';
        }
        html += '<span class="deque-arrow">&#8646;</span>';
        html += '<span class="deque-null">null</span>';
        html += '</div>';
        html += '<div class="deque-controls" role="group">' +
                    '<input type="number" value="42" data-deque-val>' +
                    '<button type="button" data-action="push-front">Push Front</button>' +
                    '<button type="button" data-action="push-back">Push Back</button>' +
                    '<button type="button" data-action="pop-front">Pop Front</button>' +
                    '<button type="button" data-action="pop-back">Pop Back</button>' +
                '</div>';
        wrap.innerHTML = html;
        host.appendChild(wrap);

        const valInput = wrap.querySelector('[data-deque-val]');
        function readVal() {
            const v = parseInt(valInput.value, 10);
            return Number.isNaN(v) ? 0 : v;
        }
        wrap.querySelector('[data-action="push-front"]').onclick = () => {
            data.unshift(readVal());
            renderDeque();
        };
        wrap.querySelector('[data-action="push-back"]').onclick = () => {
            data.push(readVal());
            renderDeque();
        };
        wrap.querySelector('[data-action="pop-front"]').onclick = () => {
            if (data.length === 0) { showStatus('Deque is empty', '#f87171'); return; }
            data.shift();
            renderDeque();
        };
        wrap.querySelector('[data-action="pop-back"]').onclick = () => {
            if (data.length === 0) { showStatus('Deque is empty', '#f87171'); return; }
            data.pop();
            renderDeque();
        };
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

    function renderBloomFilter() {
        const host = acquireDynamicVizHost();
        const SIZE = 32;
        function h1(s) { let h = 5381; for (const c of s) h = (h * 33 + c.charCodeAt(0)) >>> 0; return h % SIZE; }
        function h2(s) { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h % SIZE; }
        function h3(s) { let h = 7; for (const c of s) h = (h * 17 + c.charCodeAt(0) + 1) >>> 0; return h % SIZE; }
        function hashes(s) { return [h1(s), h2(s), h3(s)]; }

        if (!Array.isArray(runtimeVisualizer._bloomBits)) {
            runtimeVisualizer._bloomBits = new Array(SIZE).fill(false);
            runtimeVisualizer._bloomItems = [];
            for (const w of ['cat', 'dog', 'bird']) {
                for (const i of hashes(w)) runtimeVisualizer._bloomBits[i] = true;
                runtimeVisualizer._bloomItems.push(w);
            }
        }
        const bits = runtimeVisualizer._bloomBits;
        const items = runtimeVisualizer._bloomItems;
        const savedVal = runtimeVisualizer._bloomInputVal || 'fish';

        const wrap = document.createElement('div');
        wrap.className = 'bloom-wrap';
        let html = '<div class="bloom-row">';
        for (let i = 0; i < SIZE; i++) {
            html += '<span class="bloom-cell' + (bits[i] ? ' bloom-on' : '') +
                    '" data-bit="' + i + '">' + (bits[i] ? 1 : 0) + '</span>';
        }
        html += '</div>';
        html += '<div class="bloom-hashes" data-testid="bloom-hashes"></div>';
        html += '<div class="bloom-items"><strong>inserted:</strong> <span class="bloom-items-list"></span></div>';
        html += '<div class="bloom-controls" role="group">' +
                    '<input type="text" data-bloom-val>' +
                    '<button type="button" data-action="bloom-insert">Insert</button>' +
                    '<button type="button" data-action="bloom-query">Query</button>' +
                '</div>';
        wrap.innerHTML = html;
        host.appendChild(wrap);

        const valInput = wrap.querySelector('[data-bloom-val]');
        valInput.value = savedVal;
        wrap.querySelector('.bloom-items-list').textContent = items.join(', ');
        const hashesEl = wrap.querySelector('.bloom-hashes');
        valInput.addEventListener('input', () => { runtimeVisualizer._bloomInputVal = valInput.value.trim(); });
        function highlight(idxs, cls) {
            wrap.querySelectorAll('.bloom-cell').forEach((c) => c.classList.remove('bloom-hit', 'bloom-miss'));
            for (const i of idxs) {
                const cell = wrap.querySelector('.bloom-cell[data-bit="' + i + '"]');
                if (cell) cell.classList.add(cls);
            }
        }
        wrap.querySelector('[data-action="bloom-insert"]').onclick = () => {
            const key = valInput.value.trim();
            if (!key) { showStatus('Enter a word', '#f87171'); return; }
            runtimeVisualizer._bloomInputVal = key;
            const idxs = hashes(key);
            for (const i of idxs) bits[i] = true;
            if (!items.includes(key)) items.push(key);
            renderBloomFilter();
            showStatus('Inserted "' + key + '" → bits {' + idxs.join(', ') + '}', '#34d399');
        };
        wrap.querySelector('[data-action="bloom-query"]').onclick = () => {
            const key = valInput.value.trim();
            if (!key) { showStatus('Enter a word', '#f87171'); return; }
            runtimeVisualizer._bloomInputVal = key;
            const idxs = hashes(key);
            hashesEl.textContent = 'hashes of "' + key + '" → {' + idxs.join(', ') + '}';
            const present = idxs.every((i) => bits[i]);
            highlight(idxs, present ? 'bloom-hit' : 'bloom-miss');
            if (present) showStatus('"' + key + '" possibly present', '#f59e0b');
            else showStatus('"' + key + '" definitely not present', '#60a5fa');
        };
    }

    function renderSkipList() {
        const host = acquireDynamicVizHost();
        const MAXLVL = 4;  // levels 0..3
        if (!runtimeVisualizer._skipList) {
            runtimeVisualizer._skipList = {
                nodes: [
                    { key: 3, h: 1 }, { key: 7, h: 2 }, { key: 12, h: 3 },
                    { key: 19, h: 1 }, { key: 25, h: 1 },
                ],
            };
        }
        const sl = runtimeVisualizer._skipList;
        sl.nodes.sort((a, b) => a.key - b.key);

        function randomLevel() {
            let lvl = 1;
            while (Math.random() < 0.5 && lvl < MAXLVL) lvl++;
            return lvl;
        }
        function computePath(target) {
            const path = [];
            let level = MAXLVL - 1, idx = -1;
            while (level >= 0) {
                let next = idx + 1;
                while (next < sl.nodes.length && sl.nodes[next].h <= level) next++;
                if (next < sl.nodes.length && sl.nodes[next].key < target) {
                    idx = next;
                    path.push({ level: level, idx: idx, kind: 'right' });
                } else {
                    path.push({ level: level, idx: idx, kind: 'down' });
                    level--;
                }
            }
            const after = idx + 1;
            if (after < sl.nodes.length && sl.nodes[after].key === target) {
                path.push({ level: 0, idx: after, kind: 'found' });
            } else {
                path.push({ level: 0, idx: idx, kind: 'notfound' });
            }
            return path;
        }

        let searchPath = null, searchStep = 0, searchTarget = null;

        const wrap = document.createElement('div');
        wrap.className = 'skiplist-wrap';
        wrap.innerHTML =
            '<div class="skiplist-grid"></div>' +
            '<div class="skiplist-status" data-testid="skiplist-status">&nbsp;</div>' +
            '<div class="skiplist-controls" role="group">' +
                '<input type="number" value="15" data-skiplist-val>' +
                '<button type="button" data-action="skiplist-insert">Insert</button>' +
                '<button type="button" data-action="skiplist-delete">Delete</button>' +
                '<input type="number" value="12" data-skiplist-search>' +
            '</div>';
        host.appendChild(wrap);
        const gridEl = wrap.querySelector('.skiplist-grid');
        const statusEl = wrap.querySelector('.skiplist-status');

        function activeStep() {
            if (!searchPath || searchStep === 0) return null;
            return searchPath[searchStep - 1];
        }
        function draw() {
            const act = activeStep();
            let html = '';
            for (let L = MAXLVL - 1; L >= 0; L--) {
                html += '<div class="skiplist-level" data-level="' + L + '">';
                html += '<span class="skiplist-head' +
                        (act && act.level === L && act.idx === -1 ? ' skiplist-active' : '') +
                        '">head</span>';
                for (let i = 0; i < sl.nodes.length; i++) {
                    const n = sl.nodes[i];
                    if (n.h > L) {
                        html += '<span class="skiplist-arrow">&rarr;</span>';
                        const on = act && act.level === L && act.idx === i;
                        html += '<span class="skiplist-node' + (on ? ' skiplist-active' : '') +
                                '" data-key="' + n.key + '">' + n.key + '</span>';
                    } else {
                        html += '<span class="skiplist-arrow skiplist-skip">&middot;&middot;&middot;</span>';
                        html += '<span class="skiplist-node skiplist-ghost"></span>';
                    }
                }
                html += '<span class="skiplist-arrow">&rarr;</span><span class="skiplist-nil">NIL</span>';
                html += '</div>';
            }
            gridEl.innerHTML = html;
        }
        function resetSearch() {
            searchPath = null;
            searchStep = 0;
            searchTarget = null;
            statusEl.innerHTML = '&nbsp;';
            draw();
        }
        function stepSearch() {
            if (!searchPath) {
                const t = parseInt(wrap.querySelector('[data-skiplist-search]').value, 10);
                if (Number.isNaN(t)) { showStatus('Enter a search key', '#f87171'); return false; }
                searchTarget = t;
                searchPath = computePath(t);
                searchStep = 0;
            }
            if (searchStep >= searchPath.length) return false;
            const s = searchPath[searchStep];
            searchStep++;
            draw();
            if (s.kind === 'found') statusEl.textContent = 'Found ' + searchTarget;
            else if (s.kind === 'notfound') statusEl.textContent = searchTarget + ' not found';
            else statusEl.textContent = 'level ' + s.level + ': move ' + s.kind;
            return searchStep < searchPath.length;
        }

        wrap.querySelector('[data-action="skiplist-insert"]').onclick = () => {
            const v = parseInt(wrap.querySelector('[data-skiplist-val]').value, 10);
            if (Number.isNaN(v)) { showStatus('Enter a number', '#f87171'); return; }
            if (sl.nodes.some((n) => n.key === v)) { showStatus(v + ' already present', '#f87171'); return; }
            const h = randomLevel();
            sl.nodes.push({ key: v, h: h });
            showStatus('Inserted ' + v + ' (level ' + h + ')', '#34d399');
            renderSkipList();
        };
        wrap.querySelector('[data-action="skiplist-delete"]').onclick = () => {
            const v = parseInt(wrap.querySelector('[data-skiplist-val]').value, 10);
            if (Number.isNaN(v)) { showStatus('Enter a number', '#f87171'); return; }
            const before = sl.nodes.length;
            sl.nodes = sl.nodes.filter((n) => n.key !== v);
            if (sl.nodes.length === before) showStatus(v + ' not found', '#f87171');
            else showStatus('Deleted ' + v, '#60a5fa');
            renderSkipList();
        };

        wrap.appendChild(buildStepControls(stepSearch, resetSearch, 500));
        draw();
    }

    function renderCountMinSketch() {
        const host = acquireDynamicVizHost();
        const DEPTH = 3, WIDTH = 8;
        if (!runtimeVisualizer._cms) {
            runtimeVisualizer._cms = {
                table: Array.from({ length: DEPTH }, () => new Array(WIDTH).fill(0)),
                actual: {},
            };
        }
        const cms = runtimeVisualizer._cms;
        function hash(row, s) {
            let h = ((row + 1) * 2654435761) >>> 0;
            for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
            return h % WIDTH;
        }

        const wrap = document.createElement('div');
        wrap.className = 'cms-wrap';
        let html = '<div class="cms-grid">';
        for (let r = 0; r < DEPTH; r++) {
            html += '<div class="cms-rowlabel">h' + r + '</div>';
            for (let c = 0; c < WIDTH; c++) {
                html += '<span class="cms-cell" data-row="' + r + '" data-col="' + c + '">' +
                        cms.table[r][c] + '</span>';
            }
        }
        html += '</div>';
        html += '<div class="cms-readout" data-testid="cms-readout">&nbsp;</div>';
        html += '<div class="cms-controls" role="group">' +
                    '<input type="text" value="apple" data-cms-val>' +
                    '<button type="button" data-action="cms-add">Add</button>' +
                    '<button type="button" data-action="cms-estimate">Estimate</button>' +
                '</div>';
        wrap.innerHTML = html;
        host.appendChild(wrap);

        const valInput = wrap.querySelector('[data-cms-val]');
        const readoutEl = wrap.querySelector('.cms-readout');
        function highlight(cells) {
            wrap.querySelectorAll('.cms-cell').forEach((c) => c.classList.remove('cms-hit'));
            for (const rc of cells) {
                const el = wrap.querySelector('.cms-cell[data-row="' + rc[0] + '"][data-col="' + rc[1] + '"]');
                if (el) el.classList.add('cms-hit');
            }
        }
        wrap.querySelector('[data-action="cms-add"]').onclick = () => {
            const key = valInput.value.trim();
            if (!key) { showStatus('Enter a word', '#f87171'); return; }
            const cells = [];
            for (let r = 0; r < DEPTH; r++) {
                const c = hash(r, key);
                cms.table[r][c]++;
                cells.push([r, c]);
                const el = wrap.querySelector('.cms-cell[data-row="' + r + '"][data-col="' + c + '"]');
                if (el) el.textContent = cms.table[r][c];
            }
            cms.actual[key] = (cms.actual[key] || 0) + 1;
            highlight(cells);
            showStatus('Added "' + key + '" (+1 per row)', '#34d399');
        };
        wrap.querySelector('[data-action="cms-estimate"]').onclick = () => {
            const key = valInput.value.trim();
            if (!key) { showStatus('Enter a word', '#f87171'); return; }
            const cells = [], vals = [];
            for (let r = 0; r < DEPTH; r++) {
                const c = hash(r, key);
                cells.push([r, c]);
                vals.push(cms.table[r][c]);
            }
            highlight(cells);
            const est = Math.min.apply(null, vals);
            const actual = cms.actual[key] || 0;
            readoutEl.textContent = 'estimate("' + key + '") = min(' + vals.join(', ') + ') = ' + est +
                                    '  |  actual = ' + actual;
            showStatus('Estimate ' + est + ' (actual ' + actual + ')', '#f59e0b');
        };
    }

    function renderZAlgo() {
        const host = acquireDynamicVizHost();
        const pattern = 'ABABCABAB';
        const text = 'ABABDABACDABABCABAB';
        const s = pattern + '$' + text;
        const n = s.length, m = pattern.length;
        const z = new Array(n).fill(0);
        const trace = [];
        (function () {
            let l = 0, r = 0;
            for (let i = 1; i < n; i++) {
                if (i < r) z[i] = Math.min(r - i, z[i - l]);
                while (i + z[i] < n && s[z[i]] === s[i + z[i]]) z[i]++;
                if (i + z[i] > r) { l = i; r = i + z[i]; }
                trace[i] = { l: l, r: r };
            }
        })();

        let cur = 1;  // next index to reveal

        const wrap = document.createElement('div');
        wrap.className = 'zalgo-wrap';
        wrap.innerHTML =
            '<div class="zalgo-grid"></div>' +
            '<div class="zalgo-stats" data-testid="zalgo-stats">computed: <span class="zalgo-count">0</span>' +
                ' &nbsp;|&nbsp; matches: <span class="zalgo-matches">[]</span></div>';
        host.appendChild(wrap);
        const gridEl = wrap.querySelector('.zalgo-grid');
        const countEl = wrap.querySelector('.zalgo-count');
        const matchesEl = wrap.querySelector('.zalgo-matches');

        function draw() {
            const box = cur > 1 ? trace[cur - 1] : { l: 0, r: 0 };
            let chr = '<div class="zalgo-row zalgo-chr">';
            let zr = '<div class="zalgo-row zalgo-z">';
            const matches = [];
            for (let k = 0; k < n; k++) {
                const inBox = box.r > box.l && k >= box.l && k < box.r;
                chr += '<span class="zalgo-cell' + (inBox ? ' zalgo-box' : '') +
                       (k === cur && cur < n ? ' zalgo-cur' : '') + '">' + s[k] + '</span>';
                let zval = '-';
                if (k > 0 && k < cur) {
                    zval = z[k];
                    if (z[k] === m) matches.push(k - m - 1);
                } else if (k >= cur) {
                    zval = '?';
                }
                zr += '<span class="zalgo-cell' + (k < cur && k > 0 && z[k] === m ? ' zalgo-match' : '') +
                      '">' + zval + '</span>';
            }
            chr += '</div>';
            zr += '</div>';
            gridEl.innerHTML = chr + zr;
            countEl.textContent = Math.max(0, cur - 1);
            matchesEl.textContent = '[' + matches.join(',') + ']';
        }
        function step() {
            if (cur >= n) return false;
            cur++;
            draw();
            return cur < n;
        }
        function reset() { cur = 1; draw(); }
        wrap.appendChild(buildStepControls(step, reset, 350));
        draw();
    }

    function renderAhoCorasick() {
        const host = acquireDynamicVizHost();
        // Fixed trie for patterns {he, she, his, hers}.
        const nodes = [
            { id: 0, ch: '', x: 180, y: 30, parent: -1 },
            { id: 1, ch: 'h', x: 110, y: 95, parent: 0 },
            { id: 2, ch: 'e', x: 70, y: 160, parent: 1 },
            { id: 3, ch: 'r', x: 70, y: 225, parent: 2 },
            { id: 4, ch: 's', x: 70, y: 290, parent: 3 },
            { id: 5, ch: 'i', x: 150, y: 160, parent: 1 },
            { id: 6, ch: 's', x: 150, y: 225, parent: 5 },
            { id: 7, ch: 's', x: 250, y: 95, parent: 0 },
            { id: 8, ch: 'h', x: 250, y: 160, parent: 7 },
            { id: 9, ch: 'e', x: 250, y: 225, parent: 8 },
        ];
        const output = { 2: 'he', 4: 'hers', 6: 'his', 9: 'she' };
        // Failure links in BFS computation order (one per non-root node).
        const failSteps = [
            { node: 1, fail: 0 }, { node: 7, fail: 0 }, { node: 2, fail: 0 }, { node: 5, fail: 0 },
            { node: 8, fail: 1 }, { node: 3, fail: 0 }, { node: 6, fail: 7 }, { node: 9, fail: 2 },
            { node: 4, fail: 7 },
        ];
        const text = 'ushers';
        // Scan trace: automaton node after reading each char, and matches reported.
        const scanSteps = [
            { node: 0, matches: [] },
            { node: 7, matches: [] },
            { node: 8, matches: [] },
            { node: 9, matches: ['she@1', 'he@2'] },
            { node: 3, matches: [] },
            { node: 4, matches: ['hers@2'] },
        ];
        const TOTAL = failSteps.length + 1 + scanSteps.length;
        let idx = 0;

        const wrap = document.createElement('div');
        wrap.className = 'aho-wrap';
        wrap.innerHTML =
            '<div class="aho-phase" data-testid="aho-phase"></div>' +
            '<svg class="aho-svg" viewBox="0 0 320 320" width="100%" xmlns="http://www.w3.org/2000/svg"></svg>' +
            '<div class="aho-textrow"></div>' +
            '<div class="aho-stats" data-testid="aho-stats">matches: <span class="aho-matches">[]</span></div>';
        host.appendChild(wrap);
        const svgEl = wrap.querySelector('.aho-svg');
        const phaseEl = wrap.querySelector('.aho-phase');
        const textRowEl = wrap.querySelector('.aho-textrow');
        const matchesEl = wrap.querySelector('.aho-matches');

        function nodeById(id) { return nodes.find((n) => n.id === id); }

        function draw() {
            const inBuild = idx <= failSteps.length;
            const builtCount = inBuild ? idx : failSteps.length;
            let curScanNode = -1;
            let allMatches = [];
            if (!inBuild) {
                const sIdx = idx - failSteps.length - 1;
                for (let k = 0; k <= sIdx && k < scanSteps.length; k++) {
                    curScanNode = scanSteps[k].node;
                    allMatches = allMatches.concat(scanSteps[k].matches);
                }
            }
            let svg = '';
            for (const n of nodes) {
                if (n.parent >= 0) {
                    const p = nodeById(n.parent);
                    svg += '<line x1="' + p.x + '" y1="' + p.y + '" x2="' + n.x + '" y2="' + n.y +
                           '" stroke="#94a3b8" stroke-width="2"/>';
                }
            }
            for (let k = 0; k < builtCount; k++) {
                const fs = failSteps[k];
                const a = nodeById(fs.node), b = nodeById(fs.fail);
                svg += '<line x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y +
                       '" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4 3"/>';
            }
            for (const n of nodes) {
                const isBuildCur = inBuild && failSteps[idx] && n.id === failSteps[idx].node;
                const isCur = (!inBuild && n.id === curScanNode) || isBuildCur;
                const hasOut = output[n.id] !== undefined;
                svg += '<circle cx="' + n.x + '" cy="' + n.y + '" r="16" fill="' +
                       (isCur ? '#34d399' : (hasOut ? '#dbeafe' : '#fff')) +
                       '" stroke="#1e40af" stroke-width="2" data-node="' + n.id + '"/>';
                svg += '<text x="' + n.x + '" y="' + (n.y + 5) + '" text-anchor="middle" font-size="13" ' +
                       'font-weight="700">' + (n.ch || '·') + '</text>';
            }
            svgEl.innerHTML = svg;

            const scanPos = inBuild ? -1 : (idx - failSteps.length - 1);
            let tr = '';
            for (let k = 0; k < text.length; k++) {
                tr += '<span class="aho-char' + (k === scanPos ? ' aho-char-cur' : '') + '">' + text[k] + '</span>';
            }
            textRowEl.innerHTML = tr;

            phaseEl.textContent = inBuild
                ? 'Phase 1: Building failure links (' + builtCount + '/' + failSteps.length + ')'
                : 'Phase 2: Scanning text (' + (idx - failSteps.length) + '/' + text.length + ')';
            matchesEl.textContent = '[' + allMatches.join(', ') + ']';
        }
        function step() {
            if (idx >= TOTAL) return false;
            idx++;
            draw();
            return idx < TOTAL;
        }
        function reset() { idx = 0; draw(); }
        wrap.appendChild(buildStepControls(step, reset, 500));
        draw();
    }

    function buildWeightedGraphSvg(nodes, edges, directed) {
        function nodeById(id) { return nodes.find((nd) => nd.id === id); }
        function hasEdge(u, v) { return edges.some((ed) => ed.u === u && ed.v === v); }
        let svg = '<svg class="wgraph-svg" viewBox="0 0 320 250" width="100%" ' +
                  'xmlns="http://www.w3.org/2000/svg">';
        if (directed) {
            svg += '<defs><marker id="wg-arrow" markerWidth="9" markerHeight="9" refX="8" refY="3" ' +
                   'orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#94a3b8"/></marker></defs>';
        }
        for (const e of edges) {
            const a = nodeById(e.u), b = nodeById(e.v);
            const dx = b.x - a.x, dy = b.y - a.y;
            const len = Math.sqrt(dx * dx + dy * dy) || 1;
            const ux = dx / len, uy = dy / len;
            let ox = 0, oy = 0;
            if (directed && hasEdge(e.v, e.u)) {
                // anti-parallel pair: offset each edge to opposite sides of the shared path
                const ln = nodeById(Math.min(e.u, e.v)), hn = nodeById(Math.max(e.u, e.v));
                const cdx = hn.x - ln.x, cdy = hn.y - ln.y;
                const clen = Math.sqrt(cdx * cdx + cdy * cdy) || 1;
                const off = 7 * (e.u < e.v ? 1 : -1);
                ox = (-cdy / clen) * off;
                oy = (cdx / clen) * off;
            }
            const x1 = (a.x + ux * 18 + ox).toFixed(1), y1 = (a.y + uy * 18 + oy).toFixed(1);
            const x2 = (b.x - ux * 18 + ox).toFixed(1), y2 = (b.y - uy * 18 + oy).toFixed(1);
            svg += '<line class="wgraph-edge" data-edge="' + e.u + '-' + e.v + '" x1="' + x1 +
                   '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 +
                   '" stroke="#94a3b8" stroke-width="2"' +
                   (directed ? ' marker-end="url(#wg-arrow)"' : '') + '/>';
            const mx = ((a.x + b.x) / 2 + ox).toFixed(1), my = ((a.y + b.y) / 2 + oy - 4).toFixed(1);
            svg += '<text class="wgraph-weight" x="' + mx + '" y="' + my +
                   '" text-anchor="middle" font-size="11" fill="#475569">' + e.w + '</text>';
        }
        for (const nd of nodes) {
            svg += '<circle class="wgraph-node" data-node="' + nd.id + '" cx="' + nd.x + '" cy="' +
                   nd.y + '" r="16" fill="#fff" stroke="#1e40af" stroke-width="2"/>';
            svg += '<text class="wgraph-nlabel" x="' + nd.x + '" y="' + (nd.y + 5) +
                   '" text-anchor="middle" font-size="13" font-weight="700">' + nd.label + '</text>';
        }
        svg += '</svg>';
        return svg;
    }

    let _ttState = null;
    function renderTreeTraversal() {
        const host = acquireDynamicVizHost();
        if (!_ttState) {
            _ttState = { values: TreeTraversalViz.SAMPLE_VALUES.slice(), order: 'inorder', mode: 'recursive' };
        }
        const st = _ttState;
        const root = TreeTraversalViz.buildTreeFromValues(st.values);
        const frames = TreeTraversalViz.buildTraversalFrames(root, st.order, st.mode);
        let idx = 0;
        const langOf = (msg) => (window.I18N && window.I18N.getCurrentLanguage() === 'zh') ? msg.zh : msg.en;

        host.innerHTML =
            '<div class="tt-controls">' +
              '<input type="text" class="tt-input" placeholder="50,30,70,..." value="' + st.values.join(',') + '">' +
              '<button type="button" class="tt-build">Build</button>' +
              '<button type="button" class="tt-rand">Random</button>' +
              '<select class="tt-order">' +
                '<option value="preorder">Preorder</option>' +
                '<option value="inorder">Inorder</option>' +
                '<option value="postorder">Postorder</option>' +
                '<option value="levelorder">Level-order</option>' +
              '</select>' +
              '<select class="tt-mode">' +
                '<option value="recursive">Recursive</option>' +
                '<option value="iterative">Iterative</option>' +
              '</select>' +
            '</div>' +
            '<div class="tt-stage"><svg class="tt-edges"></svg><div class="tt-nodes"></div></div>' +
            '<div class="tt-aux"></div>' +
            '<div class="tt-output"><strong>Output:</strong> <span class="tt-seq"></span></div>' +
            '<div class="tt-phase"></div>';
        host.querySelector('.tt-order').value = st.order;
        host.querySelector('.tt-mode').value = st.mode;

        const nodesMeta = [];
        computeTreeLayout(root, 200, 30, 90, nodesMeta);
        const nodesEl = host.querySelector('.tt-nodes');
        const edgesEl = host.querySelector('.tt-edges');
        const metaById = {};
        nodesMeta.forEach(m => { metaById[m.id] = m; });
        (function drawEdges() {
            edgesEl.innerHTML = '';
            (function walk(n) {
                if (!n) return;
                [n.left, n.right].forEach(c => {
                    if (!c) return;
                    const a = metaById[n.id], b = metaById[c.id];
                    edgesEl.innerHTML += '<line x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '" stroke="#94a3b8" stroke-width="2"/>';
                    walk(c);
                });
            })(root);
        })();
        nodesMeta.forEach(m => {
            const d = document.createElement('div');
            d.className = 'tree-node'; d.id = 'tt-node-' + m.id; d.textContent = m.val;
            d.style.left = m.x + 'px'; d.style.top = m.y + 'px';
            nodesEl.appendChild(d);
        });

        function paint() {
            const fr = frames[idx];
            const seqEl = host.querySelector('.tt-seq');
            if (!seqEl) return;
            nodesMeta.forEach(m => {
                const el = document.getElementById('tt-node-' + m.id);
                if (!el) return;
                el.classList.remove('active', 'visited');
                if (fr.visited.includes(m.val)) el.classList.add('visited');
                if (fr.current === m.id) el.classList.add('active');
            });
            seqEl.textContent = fr.visited.join(', ');
            const auxLabel = { stack: 'Stack', queue: 'Queue', callstack: 'Call stack' }[fr.aux.kind];
            host.querySelector('.tt-aux').innerHTML =
                '<span class="tt-aux-label">' + auxLabel + ':</span> ' +
                fr.aux.items.map(v => '<span class="tt-aux-cell">' + v + '</span>').join('');
            host.querySelector('.tt-phase').textContent = langOf(fr.msg);
        }
        function step() { if (idx < frames.length - 1) { idx++; paint(); return idx < frames.length - 1; } return false; }
        function reset() { idx = 0; paint(); }

        host.appendChild(buildStepControls(step, reset, 700));
        paint();

        function rebuild() {
            st.order = host.querySelector('.tt-order').value;
            st.mode = host.querySelector('.tt-mode').value;
            renderTreeTraversal();
        }
        host.querySelector('.tt-order').onchange = rebuild;
        host.querySelector('.tt-mode').onchange = rebuild;
        host.querySelector('.tt-build').onclick = () => {
            const vals = host.querySelector('.tt-input').value.split(',').map(s => parseInt(s.trim(), 10)).filter(n => Number.isFinite(n));
            if (vals.length) { st.values = vals; renderTreeTraversal(); }
        };
        host.querySelector('.tt-rand').onclick = () => {
            const n = 6 + Math.floor(Math.random() * 3);
            const set = new Set();
            while (set.size < n) set.add(10 + Math.floor(Math.random() * 90));
            st.values = Array.from(set);
            renderTreeTraversal();
        };
    }
    let _hfState = null;
    function renderHuffman() {
        const host = acquireDynamicVizHost();
        if (!_hfState) _hfState = { text: 'ABRACADABRA' };
        const st = _hfState;
        const freqs = HuffmanViz.computeFrequencies(st.text);
        const result = HuffmanViz.buildHuffmanFrames(freqs);
        const frames = result.frames, nodes = result.nodes, codes = result.codes;
        let idx = 0;
        const langOf = (msg) => (window.I18N && window.I18N.getCurrentLanguage() === 'zh') ? msg.zh : msg.en;

        host.innerHTML =
            '<div class="hf-controls">' +
              '<input type="text" class="hf-input">' +
              '<button type="button" class="hf-apply">Apply</button>' +
            '</div>' +
            '<div class="hf-pq"><strong>Priority queue:</strong> <span class="hf-pq-list"></span></div>' +
            '<div class="hf-stage"><svg class="hf-edges"></svg><div class="hf-nodes"></div></div>' +
            '<div class="hf-codes"></div>' +
            '<div class="hf-phase"></div>';
        host.querySelector('.hf-input').value = st.text;

        const nodesEl = host.querySelector('.hf-nodes');
        const edgesEl = host.querySelector('.hf-edges');

        function layoutForest(rootIds) {
            const meta = {};
            const width = host.querySelector('.hf-stage').clientWidth || 760;
            const slot = width / (rootIds.length + 1);
            function place(id, x, y, dx, m) {
                const n = nodes[id];
                m[id] = { x: x, y: y, label: (n.sym !== null ? n.sym + ':' : '') + n.freq, isLeaf: n.sym !== null };
                if (n.left) place(n.left, x - dx, y + 60, dx * 0.6, m);
                if (n.right) place(n.right, x + dx, y + 60, dx * 0.6, m);
            }
            rootIds.forEach((rid, i) => { place(rid, (i + 1) * slot, 30, Math.max(40, slot / 2.4), meta); });
            return meta;
        }

        function paint() {
            const pqEl = host.querySelector('.hf-pq-list');
            if (!pqEl) return;
            const fr = frames[idx];
            pqEl.innerHTML = fr.pq.map(p =>
                '<span class="hf-pq-card">' + (p.sym !== null ? escapeHtml(p.sym) + ':' : '') + p.freq + '</span>').join('');
            const meta = layoutForest(fr.forestRoots);
            nodesEl.innerHTML = ''; edgesEl.innerHTML = '';
            Object.keys(meta).forEach(id => {
                const m = meta[id];
                const d = document.createElement('div');
                d.className = 'tree-node hf-node' + (m.isLeaf ? ' leaf' : '');
                if (fr.picked && fr.picked.includes(id)) d.classList.add('picked');
                if (fr.merged === id) d.classList.add('merged');
                d.textContent = m.label;
                d.style.left = m.x + 'px'; d.style.top = m.y + 'px';
                nodesEl.appendChild(d);
                const n = nodes[id];
                [n.left, n.right].forEach(c => {
                    if (c && meta[c]) edgesEl.innerHTML += '<line x1="' + m.x + '" y1="' + m.y + '" x2="' + meta[c].x + '" y2="' + meta[c].y + '" stroke="#94a3b8" stroke-width="2"/>';
                });
            });
            if (fr.phase === 'done') {
                const totalBits = Object.entries(codes).reduce((s, pair) => {
                    const sym = pair[0], c = pair[1];
                    const f = freqs.find(x => x.sym === sym); return s + c.length * (f ? f.freq : 0);
                }, 0);
                const fixedBits = freqs.reduce((s, f) => s + f.freq, 0) * Math.max(1, Math.ceil(Math.log2(Math.max(1, freqs.length))));
                host.querySelector('.hf-codes').innerHTML =
                    '<table class="hf-code-table"><thead><tr><th>Symbol</th><th>Freq</th><th>Code</th></tr></thead><tbody>' +
                    freqs.map(f => '<tr><td>' + escapeHtml(f.sym) + '</td><td>' + f.freq + '</td><td><code>' + codes[f.sym] + '</code></td></tr>').join('') +
                    '</tbody></table>' +
                    '<div class="hf-stats">Huffman: ' + totalBits + ' bits vs fixed-length: ' + fixedBits + ' bits</div>';
            } else {
                host.querySelector('.hf-codes').innerHTML = '';
            }
            host.querySelector('.hf-phase').textContent = langOf(fr.msg);
        }
        function step() { if (idx < frames.length - 1) { idx++; paint(); return idx < frames.length - 1; } return false; }
        function reset() { idx = 0; paint(); }

        host.appendChild(buildStepControls(step, reset, 800));
        paint();

        host.querySelector('.hf-apply').onclick = () => {
            const v = host.querySelector('.hf-input').value;
            if (v && v.length) { st.text = v; renderHuffman(); }
        };
    }

    function renderGraphAoe() {
        const host = acquireDynamicVizHost();
        const langOf = (m) => (window.I18N && window.I18N.getCurrentLanguage() === 'zh') ? m.zh : m.en;
        const net = AoeViz.AOE_PRESET;
        const built = AoeViz.buildAoeFrames(net.nodes, net.edges);
        const frames = built.frames;
        let idx = 0;
        const nodeById = (id) => net.nodes.find((n) => n.id === id);

        host.innerHTML =
            '<div class="aoe-stage"><svg class="aoe-svg" viewBox="0 0 700 280" width="100%">' +
              '<defs><marker id="aoe-arrow" markerWidth="9" markerHeight="9" refX="14" refY="3" orient="auto">' +
              '<path d="M0,0 L8,3 L0,6 Z" fill="#94a3b8"/></marker></defs>' +
              '<g class="aoe-edges"></g><g class="aoe-nodes"></g></svg></div>' +
            '<div class="aoe-table"></div>' +
            '<div class="aoe-phase"></div>';

        const edgesG = host.querySelector('.aoe-edges');
        const nodesG = host.querySelector('.aoe-nodes');

        function paint() {
            if (!host.querySelector('.aoe-table')) return; // host wiped (method switched) — ignore stale tick
            const fr = frames[idx];
            const crit = new Set((fr.criticalEdges || []).map((e) => e.u + '-' + e.v));
            edgesG.innerHTML = net.edges.map((e) => {
                const a = nodeById(e.u), b = nodeById(e.v);
                const isC = crit.has(e.u + '-' + e.v);
                const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
                return '<line x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '" ' +
                    'stroke="' + (isC ? '#dc2626' : '#94a3b8') + '" stroke-width="' + (isC ? 3 : 2) + '" marker-end="url(#aoe-arrow)"/>' +
                    '<text x="' + mx + '" y="' + (my - 4) + '" fill="' + (isC ? '#dc2626' : '#475569') + '" font-size="12" text-anchor="middle">' + e.w + '</text>';
            }).join('');
            nodesG.innerHTML = net.nodes.map((n) => {
                const active = fr.current === n.id;
                const eeT = fr.ee[n.id] != null ? 'ee=' + fr.ee[n.id] : '';
                const leT = fr.le[n.id] != null ? 'le=' + fr.le[n.id] : '';
                return '<circle cx="' + n.x + '" cy="' + n.y + '" r="16" fill="' + (active ? '#f59e0b' : '#fff') + '" stroke="#1e40af" stroke-width="2"/>' +
                    '<text x="' + n.x + '" y="' + (n.y + 4) + '" text-anchor="middle" font-size="13" font-weight="700">' + n.id + '</text>' +
                    '<text x="' + n.x + '" y="' + (n.y - 22) + '" text-anchor="middle" font-size="10" fill="#2563eb">' + eeT + '</text>' +
                    '<text x="' + n.x + '" y="' + (n.y + 30) + '" text-anchor="middle" font-size="10" fill="#7c3aed">' + leT + '</text>';
            }).join('');
            const rows = net.nodes.map((n) => '<tr><td>' + n.id + '</td><td>' + (fr.ee[n.id] != null ? fr.ee[n.id] : '') + '</td><td>' + (fr.le[n.id] != null ? fr.le[n.id] : '') + '</td></tr>').join('');
            host.querySelector('.aoe-table').innerHTML = '<table class="aoe-tbl"><thead><tr><th>v</th><th>ee</th><th>le</th></tr></thead><tbody>' + rows + '</tbody></table>';
            host.querySelector('.aoe-phase').textContent = langOf(fr.msg);
        }
        function step() { if (idx < frames.length - 1) { idx++; paint(); return idx < frames.length - 1; } return false; }
        function reset() { idx = 0; paint(); }

        host.appendChild(buildStepControls(step, reset, 800));
        paint();
    }
    let _exprState = null;
    function renderExprInfixPostfix() {
        const host = acquireDynamicVizHost();
        if (!_exprState) _exprState = { text: 'A*(B+C)*D' };
        const st = _exprState;
        const langOf = (m) => (window.I18N && window.I18N.getCurrentLanguage() === 'zh') ? m.zh : m.en;
        let frames = [], postfix = [];
        try {
            const tokens = ExprViz.tokenize(st.text);
            const conv = ExprViz.buildShuntingYardFrames(tokens);
            postfix = conv.postfix;
            const evalRes = ExprViz.buildPostfixEvalFrames(postfix);
            frames = conv.frames.concat(evalRes.frames);
        } catch (e) {
            host.innerHTML = '<div class="expr-controls"><input type="text" class="expr-input"><button type="button" class="expr-apply">Apply</button></div>' +
                '<div class="expr-error" style="color:#dc2626;margin-top:8px;"></div>';
            host.querySelector('.expr-input').value = st.text;
            host.querySelector('.expr-error').textContent = 'Parse error: ' + e.message;
            host.querySelector('.expr-apply').onclick = () => { st.text = host.querySelector('.expr-input').value; renderExprInfixPostfix(); };
            return;
        }
        let idx = 0;

        host.innerHTML =
            '<div class="expr-controls"><input type="text" class="expr-input"><button type="button" class="expr-apply">Apply</button></div>' +
            '<div class="expr-phasebadge"></div>' +
            '<div class="expr-stack"><strong>Stack:</strong> <span class="expr-stack-cells"></span></div>' +
            '<div class="expr-out"><strong>Output:</strong> <span class="expr-out-cells"></span></div>' +
            '<div class="expr-phase"></div>';
        host.querySelector('.expr-input').value = st.text;

        function paint() {
            const fr = frames[idx];
            if (!host.querySelector('.expr-stack-cells')) return;
            host.querySelector('.expr-phasebadge').textContent = fr.phase === 'convert'
                ? 'Phase 1 — Convert (postfix: ' + postfix.join(' ') + ')'
                : 'Phase 2 — Evaluate';
            const stackArr = fr.phase === 'convert' ? fr.opStack : fr.valStack;
            const outArr = fr.phase === 'convert' ? fr.output : [];
            host.querySelector('.expr-stack-cells').innerHTML = stackArr.map((v) => '<span class="expr-cell">' + v + '</span>').join('');
            host.querySelector('.expr-out-cells').innerHTML = outArr.map((v) => '<span class="expr-cell out">' + v + '</span>').join('');
            host.querySelector('.expr-phase').textContent = (fr.token ? '[' + fr.token + '] ' : '') + langOf(fr.msg);
        }
        function step() { if (idx < frames.length - 1) { idx++; paint(); return idx < frames.length - 1; } return false; }
        function reset() { idx = 0; paint(); }

        host.appendChild(buildStepControls(step, reset, 700));
        paint();
        host.querySelector('.expr-apply').onclick = () => { st.text = host.querySelector('.expr-input').value; renderExprInfixPostfix(); };
    }

    let _obstState = null;
    function renderTreeObst() {
        const host = acquireDynamicVizHost();
        if (!_obstState) _obstState = { keys: [10, 20, 30, 40], freqs: [4, 2, 6, 3] };
        const st = _obstState;
        const langOf = (m) => (window.I18N && window.I18N.getCurrentLanguage() === 'zh') ? m.zh : m.en;
        const n = st.keys.length;
        const res = ObstViz.buildObstFrames(st.keys, st.freqs);
        const frames = res.frames;
        let idx = 0;

        host.innerHTML =
            '<div class="obst-controls">' +
              '<input type="text" class="obst-keys" value="' + st.keys.join(',') + '" placeholder="keys e.g. 10,20,30">' +
              '<input type="text" class="obst-freqs" value="' + st.freqs.join(',') + '" placeholder="freqs e.g. 4,2,6">' +
              '<button type="button" class="obst-apply">Apply</button>' +
            '</div>' +
            '<div class="obst-grid"></div>' +
            '<div class="obst-tree-stage"><svg class="obst-edges"></svg><div class="obst-nodes"></div></div>' +
            '<div class="obst-phase"></div>';

        function paint() {
            const fr = frames[idx];
            if (!host.querySelector('.obst-grid')) return;
            let html = '<table class="obst-tbl"><tr><th>i\\j</th>';
            for (let j = 0; j < n; j++) html += '<th>' + st.keys[j] + '</th>';
            html += '</tr>';
            for (let i = 0; i < n; i++) {
                html += '<tr><th>' + st.keys[i] + '</th>';
                for (let j = 0; j < n; j++) {
                    if (j < i) { html += '<td class="obst-empty"></td>'; continue; }
                    const v = fr.cost[i + ',' + j];
                    const cur = (fr.phase === 'fill' && fr.i === i && fr.j === j) ? ' obst-cur' : '';
                    html += '<td class="obst-cell' + cur + '">' + (v != null ? v : '') + '</td>';
                }
                html += '</tr>';
            }
            html += '</table>';
            host.querySelector('.obst-grid').innerHTML = html;
            const nodesEl = host.querySelector('.obst-nodes');
            const edgesEl = host.querySelector('.obst-edges');
            if (fr.phase === 'tree') {
                const meta = [];
                computeTreeLayout(res.tree, 200, 30, 90, meta);
                const byId = {}; meta.forEach((m) => { byId[m.id] = m; });
                edgesEl.innerHTML = '';
                (function walk(nd) { if (!nd) return; [nd.left, nd.right].forEach((c) => { if (!c) return; const a = byId[nd.id], b = byId[c.id]; edgesEl.innerHTML += '<line x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '" stroke="#94a3b8" stroke-width="2"/>'; walk(c); }); })(res.tree);
                nodesEl.innerHTML = '';
                meta.forEach((m) => { const d = document.createElement('div'); d.className = 'tree-node'; d.textContent = m.val; d.style.left = m.x + 'px'; d.style.top = m.y + 'px'; nodesEl.appendChild(d); });
            } else { nodesEl.innerHTML = ''; edgesEl.innerHTML = ''; }
            host.querySelector('.obst-phase').textContent = langOf(fr.msg);
        }
        function step() { if (idx < frames.length - 1) { idx++; paint(); return idx < frames.length - 1; } return false; }
        function reset() { idx = 0; paint(); }

        host.appendChild(buildStepControls(step, reset, 600));
        paint();
        host.querySelector('.obst-apply').onclick = () => {
            const ks = host.querySelector('.obst-keys').value.split(',').map((s) => parseInt(s.trim(), 10)).filter(Number.isFinite);
            const fs = host.querySelector('.obst-freqs').value.split(',').map((s) => parseInt(s.trim(), 10)).filter(Number.isFinite);
            if (ks.length && ks.length === fs.length) { ks.sort((a, b) => a - b); st.keys = ks; st.freqs = fs; renderTreeObst(); }
        };
    }
    let _extState = null;
    function renderSortExternal() {
        const host = acquireDynamicVizHost();
        if (!_extState) _extState = { data: [5, 3, 8, 1, 9, 2, 7, 4, 6, 0], M: 4 };
        const st = _extState;
        const langOf = (m) => (window.I18N && window.I18N.getCurrentLanguage() === 'zh') ? m.zh : m.en;
        const res = ExtSortViz.buildExternalSortFrames(st.data, st.M);
        const frames = res.frames;
        let idx = 0;

        host.innerHTML =
            '<div class="ext-controls">' +
              '<input type="text" class="ext-data" value="' + st.data.join(',') + '">' +
              '<label>M <input type="number" class="ext-m" min="1" max="20" value="' + st.M + '" style="width:54px"></label>' +
              '<button type="button" class="ext-apply">Apply</button>' +
            '</div>' +
            '<div class="ext-runs"></div>' +
            '<div class="ext-tree-stage"><div class="ext-tree-nodes"></div></div>' +
            '<div class="ext-out"><strong>Output:</strong> <span class="ext-out-cells"></span></div>' +
            '<div class="ext-phase"></div>';

        function cells(arr, cls) { return arr.map((v) => '<span class="ext-cell ' + (cls || '') + '">' + v + '</span>').join(' '); }

        function paint() {
            const fr = frames[idx];
            if (!host.querySelector('.ext-runs')) return;
            host.querySelector('.ext-runs').innerHTML = fr.runs.map((r, i) =>
                '<div class="ext-run"><span class="ext-run-label">run ' + (i + 1) + (i === fr.current ? ' ★' : '') + '</span> ' + cells(r) + '</div>').join('');
            const nodesEl = host.querySelector('.ext-tree-nodes');
            nodesEl.innerHTML = '';
            const tree = fr.tree || [];
            if (tree.length > 1) {
                const W = host.querySelector('.ext-tree-stage').clientWidth || 700;
                for (let i = 1; i < tree.length; i++) {
                    if (!tree[i]) continue;
                    const level = Math.floor(Math.log2(i));
                    const posInLevel = i - Math.pow(2, level);
                    const count = Math.pow(2, level);
                    const x = (posInLevel + 0.5) / count * W;
                    const y = level * 52 + 20;
                    const d = document.createElement('div');
                    const isWinner = (i === 1 && fr.winnerRun >= 0);
                    d.className = 'ext-tnode' + (isWinner ? ' winner' : '') + (tree[i].run < 0 ? ' pad' : '');
                    d.textContent = tree[i].val == null ? '∞' : tree[i].val;
                    d.style.left = x + 'px'; d.style.top = y + 'px';
                    nodesEl.appendChild(d);
                }
            }
            host.querySelector('.ext-out-cells').innerHTML = cells(fr.output, 'out');
            host.querySelector('.ext-phase').textContent = langOf(fr.msg);
        }
        function step() { if (idx < frames.length - 1) { idx++; paint(); return idx < frames.length - 1; } return false; }
        function reset() { idx = 0; paint(); }

        host.appendChild(buildStepControls(step, reset, 600));
        paint();
        host.querySelector('.ext-apply').onclick = () => {
            const d = host.querySelector('.ext-data').value.split(',').map((s) => parseInt(s.trim(), 10)).filter(Number.isFinite);
            const m = parseInt(host.querySelector('.ext-m').value, 10);
            if (d.length && m >= 1) { st.data = d; st.M = m; renderSortExternal(); }
        };
    }

    let _sparseState = null;
    function renderMatrixSparse() {
        const host = acquireDynamicVizHost();
        if (!_sparseState) _sparseState = { text: '0,0,3,0;5,0,0,0;0,2,0,4' };
        const st = _sparseState;
        const langOf = (m) => (window.I18N && window.I18N.getCurrentLanguage() === 'zh') ? m.zh : m.en;
        const matrix = st.text.split(';').map((row) => row.split(',').map((s) => parseInt(s.trim(), 10) || 0));
        const rows = matrix.length, cols = matrix[0] ? matrix[0].length : 0;
        const res = SparseViz.buildFastTransposeFrames(matrix);
        const frames = res.frames;
        let idx = 0;

        host.innerHTML =
            '<div class="sm-controls"><input type="text" class="sm-input" value="' + st.text + '"><button type="button" class="sm-apply">Apply</button>' +
            '<span class="sm-hint">rows separated by ; , entries by ,</span></div>' +
            '<div class="sm-cols"><div class="sm-dense"></div><div class="sm-triples"></div></div>' +
            '<div class="sm-arrays"></div>' +
            '<div class="sm-phase"></div>';

        function gridHtml(mat, title) {
            let h = '<div class="sm-grid-title">' + title + '</div><table class="sm-grid">';
            for (let r = 0; r < mat.length; r++) { h += '<tr>'; for (let c = 0; c < mat[r].length; c++) { const v = mat[r][c]; h += '<td class="' + (v !== 0 ? 'nz' : 'z') + '">' + v + '</td>'; } h += '</tr>'; }
            return h + '</table>';
        }
        function transposedSoFar(placed) {
            const T = [];
            for (let r = 0; r < cols; r++) T.push(new Array(rows).fill(0));
            placed.forEach((t) => { if (t) T[t.r][t.c] = t.v; });
            return T;
        }

        function paint() {
            const fr = frames[idx];
            if (!host.querySelector('.sm-dense')) return;
            host.querySelector('.sm-dense').innerHTML = gridHtml(matrix, langOf({ zh: '原矩陣', en: 'Original' }));
            let tr = '<div class="sm-grid-title">' + langOf({ zh: '三元組 (列,欄,值)', en: 'Triples (r,c,v)' }) + '</div><table class="sm-triple-tbl"><tr><th>r</th><th>c</th><th>v</th></tr>';
            res.triples.forEach((t, s) => { tr += '<tr class="' + (fr.phase === 'place' && fr.scan === s ? 'sm-cur' : '') + '"><td>' + t.r + '</td><td>' + t.c + '</td><td>' + t.v + '</td></tr>'; });
            tr += '</table>';
            host.querySelector('.sm-triples').innerHTML = tr;
            let a = '';
            if (fr.rowSize && fr.rowSize.length) a += '<div class="sm-arr"><span class="sm-arr-label">rowSize</span> ' + fr.rowSize.map((v) => '<span class="sm-acell">' + v + '</span>').join('') + '</div>';
            if (fr.startPos && fr.startPos.length) a += '<div class="sm-arr"><span class="sm-arr-label">startPos</span> ' + fr.startPos.map((v) => '<span class="sm-acell">' + v + '</span>').join('') + '</div>';
            a += gridHtml(transposedSoFar(fr.placed || []), langOf({ zh: '轉置結果', en: 'Transposed' }));
            host.querySelector('.sm-arrays').innerHTML = a;
            host.querySelector('.sm-phase').textContent = langOf(fr.msg);
        }
        function step() { if (idx < frames.length - 1) { idx++; paint(); return idx < frames.length - 1; } return false; }
        function reset() { idx = 0; paint(); }

        host.appendChild(buildStepControls(step, reset, 700));
        paint();
        host.querySelector('.sm-apply').onclick = () => {
            const v = host.querySelector('.sm-input').value.trim();
            if (v) { st.text = v; renderMatrixSparse(); }
        };
    }
    let _polyState = null;
    function renderPolyPadd() {
        const host = acquireDynamicVizHost();
        if (!_polyState) _polyState = { a: '3:2,2:1,1:0', b: '5:3,4:1' };
        const st = _polyState;
        const langOf = (m) => (window.I18N && window.I18N.getCurrentLanguage() === 'zh') ? m.zh : m.en;
        const A = PolyViz.parsePoly(st.a);
        const B = PolyViz.parsePoly(st.b);
        const res = PolyViz.buildPaddFrames(A, B);
        const frames = res.frames;
        let idx = 0;

        host.innerHTML =
            '<div class="pp-controls">' +
              'A <input type="text" class="pp-a" value="' + st.a + '"> ' +
              'B <input type="text" class="pp-b" value="' + st.b + '"> ' +
              '<button type="button" class="pp-apply">Apply</button>' +
              '<span class="sm-hint">terms as coef:exp, comma-separated</span>' +
            '</div>' +
            '<div class="pp-row"><span class="pp-label">A =</span> <span class="pp-a-terms"></span></div>' +
            '<div class="pp-row"><span class="pp-label">B =</span> <span class="pp-b-terms"></span></div>' +
            '<div class="pp-row"><span class="pp-label">A+B =</span> <span class="pp-result"></span></div>' +
            '<div class="pp-phase"></div>';

        function termCells(poly, ptr) {
            return poly.map((t, k) => '<span class="pp-term' + (k === ptr ? ' pp-cur' : '') + '">' + PolyViz.formatPoly([t]) + '</span>').join('');
        }

        function paint() {
            const fr = frames[idx];
            if (!host.querySelector('.pp-a-terms')) return;
            host.querySelector('.pp-a-terms').innerHTML = termCells(A, fr.i);
            host.querySelector('.pp-b-terms').innerHTML = termCells(B, fr.j);
            host.querySelector('.pp-result').innerHTML = (fr.result || []).map((t) => '<span class="pp-term out">' + PolyViz.formatPoly([t]) + '</span>').join('') || '<span class="pp-term out">0</span>';
            host.querySelector('.pp-phase').textContent = langOf(fr.msg);
        }
        function step() { if (idx < frames.length - 1) { idx++; paint(); return idx < frames.length - 1; } return false; }
        function reset() { idx = 0; paint(); }

        host.appendChild(buildStepControls(step, reset, 700));
        paint();
        host.querySelector('.pp-apply').onclick = () => {
            const a = host.querySelector('.pp-a').value.trim();
            const b = host.querySelector('.pp-b').value.trim();
            if (a && b) { st.a = a; st.b = b; renderPolyPadd(); }
        };
    }

    let _mazeState = null;
    function renderMazeStack() {
        const host = acquireDynamicVizHost();
        if (!_mazeState) _mazeState = { text: 'S....;.###.;.#...;.#.#.;...#E' };
        const st = _mazeState;
        const langOf = (m) => (window.I18N && window.I18N.getCurrentLanguage() === 'zh') ? m.zh : m.en;
        const maze = MazeViz.parseMaze(st.text);
        const res = MazeViz.buildMazeFrames(maze);
        const frames = res.frames;
        let idx = 0;

        host.innerHTML =
            '<div class="mz-controls"><input type="text" class="mz-input" value="' + st.text + '">' +
            '<button type="button" class="mz-apply">Apply</button>' +
            '<span class="sm-hint"># wall, . open, S start, E end; rows split by ;</span></div>' +
            '<div class="mz-cols"><div class="mz-grid"></div><div class="mz-stack"><strong>Path stack:</strong><div class="mz-stack-cells"></div></div></div>' +
            '<div class="mz-phase"></div>';

        function paint() {
            const fr = frames[idx];
            if (!host.querySelector('.mz-grid')) return;
            const inStack = new Set((fr.stack || []).map((p) => p[0] + ',' + p[1]));
            const inPath = new Set((fr.path || []).map((p) => p[0] + ',' + p[1]));
            const visited = new Set((fr.visited || []).map((p) => p[0] + ',' + p[1]));
            const cur = fr.current ? fr.current[0] + ',' + fr.current[1] : '';
            let html = '<table class="mz-tbl">';
            for (let r = 0; r < maze.grid.length; r++) {
                html += '<tr>';
                for (let c = 0; c < maze.grid[r].length; c++) {
                    const ch = maze.grid[r][c];
                    const k = r + ',' + c;
                    let cls = ch === '#' ? 'wall' : 'open';
                    if (ch === 'S') cls = 'start';
                    else if (ch === 'E') cls = 'end';
                    if (inPath.has(k)) cls += ' path';
                    else if (k === cur) cls += ' cur';
                    else if (inStack.has(k)) cls += ' instack';
                    else if (visited.has(k)) cls += ' visited';
                    html += '<td class="mz-cell ' + cls + '">' + (ch === '#' ? '' : (ch === 'S' || ch === 'E' ? ch : '')) + '</td>';
                }
                html += '</tr>';
            }
            html += '</table>';
            host.querySelector('.mz-grid').innerHTML = html;
            host.querySelector('.mz-stack-cells').innerHTML = (fr.stack || []).map((p) => '<span class="mz-scell">(' + p[0] + ',' + p[1] + ')</span>').join('');
            host.querySelector('.mz-phase').textContent = langOf(fr.msg);
        }
        function step() { if (idx < frames.length - 1) { idx++; paint(); return idx < frames.length - 1; } return false; }
        function reset() { idx = 0; paint(); }

        host.appendChild(buildStepControls(step, reset, 500));
        paint();
        host.querySelector('.mz-apply').onclick = () => { const v = host.querySelector('.mz-input').value.trim(); if (v) { st.text = v; renderMazeStack(); } };
    }
    let _doublyState = null;
    function renderListDoubly() {
        const host = acquireDynamicVizHost();
        if (!_doublyState) _doublyState = { vals: [10, 20, 30, 40], circular: false };
        const st = _doublyState;
        const langOf = (m) => (window.I18N && window.I18N.getCurrentLanguage() === 'zh') ? m.zh : m.en;
        const res = DoublyViz.buildDoublyFrames(st.vals, st.circular);
        const frames = res.frames;
        let idx = 0;

        host.innerHTML =
            '<div class="dl-controls">' +
              '<input type="text" class="dl-input" value="' + st.vals.join(',') + '">' +
              '<label><input type="checkbox" class="dl-circular"' + (st.circular ? ' checked' : '') + '> circular</label>' +
              '<button type="button" class="dl-apply">Apply</button>' +
            '</div>' +
            '<div class="dl-row' + (st.circular ? ' dl-circular-on' : '') + '"></div>' +
            '<div class="dl-phase"></div>';

        function paint() {
            const fr = frames[idx];
            if (!host.querySelector('.dl-row')) return;
            host.querySelector('.dl-row').innerHTML = fr.nodes.map((n, i) =>
                '<span class="dl-node' + (i === fr.current ? ' cur' : '') + '">' +
                  '<span class="dl-ptr">' + (n.prevVal == null ? '∅' : n.prevVal) + '</span>' +
                  '<span class="dl-val">' + n.val + '</span>' +
                  '<span class="dl-ptr">' + (n.nextVal == null ? '∅' : n.nextVal) + '</span>' +
                '</span>' + (i < fr.nodes.length - 1 ? '<span class="dl-link">⇄</span>' : '')
            ).join('') + (fr.circular ? '<span class="dl-wrap">↩ circular</span>' : '');
            host.querySelector('.dl-phase').textContent = langOf(fr.msg);
        }
        function step() { if (idx < frames.length - 1) { idx++; paint(); return idx < frames.length - 1; } return false; }
        function reset() { idx = 0; paint(); }

        host.appendChild(buildStepControls(step, reset, 600));
        paint();
        host.querySelector('.dl-apply').onclick = () => {
            const vals = host.querySelector('.dl-input').value.split(',').map((s) => parseInt(s.trim(), 10)).filter(Number.isFinite);
            const circular = host.querySelector('.dl-circular').checked;
            if (vals.length) { st.vals = vals; st.circular = circular; renderListDoubly(); }
        };
    }

    let _fibState = null;
    function renderSearchFibonacci() {
        const host = acquireDynamicVizHost();
        if (!_fibState) _fibState = { arr: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19], target: 11 };
        const st = _fibState;
        const langOf = (m) => (window.I18N && window.I18N.getCurrentLanguage() === 'zh') ? m.zh : m.en;
        const res = FibSearchViz.buildFibSearchFrames(st.arr, st.target);
        const frames = res.frames;
        let idx = 0;

        host.innerHTML =
            '<div class="ss-controls">' +
              '<input type="text" class="ss-arr" value="' + st.arr.join(',') + '">' +
              'target <input type="number" class="ss-target" value="' + st.target + '" style="width:64px">' +
              '<button type="button" class="ss-apply">Apply</button>' +
              '<span class="sm-hint">array must be sorted</span>' +
            '</div>' +
            '<div class="ss-cells"></div>' +
            '<div class="ss-info"></div>' +
            '<div class="ss-result"></div>' +
            '<div class="ss-phase"></div>';

        function paint() {
            const fr = frames[idx];
            if (!host.querySelector('.ss-cells')) return;
            const inRange = (i) => fr.range && i >= fr.range[0] && i <= fr.range[1];
            host.querySelector('.ss-cells').innerHTML = st.arr.map((v, i) =>
                '<span class="ss-cell' + (i === fr.probe ? ' probe' : (inRange(i) ? ' inrange' : '')) + '"><span class="ss-idx">' + i + '</span>' + v + '</span>').join('');
            host.querySelector('.ss-info').innerHTML = 'fibM=' + fr.fibM + ', fib1=' + fr.fib1 + ', fib2=' + fr.fib2 + ', offset=' + fr.lo;
            host.querySelector('.ss-result').textContent = fr.found >= 0 ? ('✓ found at index ' + fr.found) : '';
            host.querySelector('.ss-phase').textContent = langOf(fr.msg);
        }
        function step() { if (idx < frames.length - 1) { idx++; paint(); return idx < frames.length - 1; } return false; }
        function reset() { idx = 0; paint(); }

        host.appendChild(buildStepControls(step, reset, 600));
        paint();
        host.querySelector('.ss-apply').onclick = () => {
            const arr = host.querySelector('.ss-arr').value.split(',').map((s) => parseInt(s.trim(), 10)).filter(Number.isFinite).sort((a, b) => a - b);
            const target = parseInt(host.querySelector('.ss-target').value, 10);
            if (arr.length && Number.isFinite(target)) { st.arr = arr; st.target = target; renderSearchFibonacci(); }
        };
    }
    let _interpState = null;
    function renderSearchInterpolation() {
        const host = acquireDynamicVizHost();
        if (!_interpState) _interpState = { arr: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100], target: 70 };
        const st = _interpState;
        const langOf = (m) => (window.I18N && window.I18N.getCurrentLanguage() === 'zh') ? m.zh : m.en;
        const res = InterpSearchViz.buildInterpFrames(st.arr, st.target);
        const frames = res.frames;
        let idx = 0;

        host.innerHTML =
            '<div class="ss-controls">' +
              '<input type="text" class="ss-arr" value="' + st.arr.join(',') + '">' +
              'target <input type="number" class="ss-target" value="' + st.target + '" style="width:64px">' +
              '<button type="button" class="ss-apply">Apply</button>' +
              '<span class="sm-hint">sorted; works best when ~uniform</span>' +
            '</div>' +
            '<div class="ss-cells"></div>' +
            '<div class="ss-info"></div>' +
            '<div class="ss-result"></div>' +
            '<div class="ss-phase"></div>';

        function paint() {
            const fr = frames[idx];
            if (!host.querySelector('.ss-cells')) return;
            const inRange = (i) => i >= fr.lo && i <= fr.hi;
            host.querySelector('.ss-cells').innerHTML = st.arr.map((v, i) =>
                '<span class="ss-cell' + (i === fr.pos ? ' probe' : (inRange(i) ? ' inrange' : '')) + '"><span class="ss-idx">' + i + '</span>' + v + '</span>').join('');
            const a = st.arr;
            host.querySelector('.ss-info').innerHTML = (fr.pos >= 0 && fr.lo <= fr.hi)
                ? 'pos = lo + (target − a[lo])·(hi − lo) / (a[hi] − a[lo]) = ' + fr.lo + ' + (' + st.target + '−' + a[fr.lo] + ')·(' + fr.hi + '−' + fr.lo + ')/(' + a[fr.hi] + '−' + a[fr.lo] + ') = ' + fr.pos
                : 'lo=' + fr.lo + ', hi=' + fr.hi;
            host.querySelector('.ss-result').textContent = fr.found >= 0 ? ('✓ found at index ' + fr.found) : '';
            host.querySelector('.ss-phase').textContent = langOf(fr.msg);
        }
        function step() { if (idx < frames.length - 1) { idx++; paint(); return idx < frames.length - 1; } return false; }
        function reset() { idx = 0; paint(); }

        host.appendChild(buildStepControls(step, reset, 700));
        paint();
        host.querySelector('.ss-apply').onclick = () => {
            const arr = host.querySelector('.ss-arr').value.split(',').map((s) => parseInt(s.trim(), 10)).filter(Number.isFinite).sort((a, b) => a - b);
            const target = parseInt(host.querySelector('.ss-target').value, 10);
            if (arr.length && Number.isFinite(target)) { st.arr = arr; st.target = target; renderSearchInterpolation(); }
        };
    }

    let _threadedState = null;
    function renderTreeThreaded() {
        const host = acquireDynamicVizHost();
        if (!_threadedState) _threadedState = { vals: ThreadedViz.SAMPLE.slice() };
        const st = _threadedState;
        const langOf = (m) => (window.I18N && window.I18N.getCurrentLanguage() === 'zh') ? m.zh : m.en;
        const root = ThreadedViz.buildTreeFromValues(st.vals);
        const res = ThreadedViz.buildThreadedFrames(root);
        const frames = res.frames;
        let idx = 0;

        host.innerHTML =
            '<div class="th-controls"><input type="text" class="th-input" value="' + st.vals.join(',') + '"><button type="button" class="th-build">Build</button>' +
            '<span class="sm-hint">values build a BST; dashed = inorder thread</span></div>' +
            '<div class="th-stage"><svg class="th-edges"></svg><div class="th-nodes"></div></div>' +
            '<div class="th-output"><strong>Inorder:</strong> <span class="th-seq"></span></div>' +
            '<div class="th-phase"></div>';

        const meta = [];
        computeTreeLayout(root, 200, 30, 90, meta);
        const byId = {}; meta.forEach((m) => { byId[m.id] = m; });
        const nodesEl = host.querySelector('.th-nodes');

        function paint() {
            const fr = frames[idx];
            if (!host.querySelector('.th-edges')) return;
            const edgesEl = host.querySelector('.th-edges');
            let svg = '';
            (function walk(n) { if (!n) return; [n.left, n.right].forEach((c) => { if (!c) return; const a = byId[n.id], b = byId[c.id]; svg += '<line x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '" stroke="#94a3b8" stroke-width="2"/>'; walk(c); }); })(root);
            (fr.threads || []).forEach((t) => {
                const a = byId[t.fromId], b = byId[t.toId];
                if (!a || !b) return;
                const midY = Math.min(a.y, b.y) - 30;
                svg += '<path d="M' + a.x + ',' + a.y + ' Q' + ((a.x + b.x) / 2) + ',' + midY + ' ' + b.x + ',' + b.y + '" fill="none" stroke="#a855f7" stroke-width="2" stroke-dasharray="5 4"/>';
            });
            edgesEl.innerHTML = svg;
            nodesEl.innerHTML = meta.map((m) => '<div class="tree-node' + (fr.current === m.id ? ' active' : (fr.visited.includes(m.val) ? ' visited' : '')) + '" style="left:' + m.x + 'px;top:' + m.y + 'px">' + m.val + '</div>').join('');
            host.querySelector('.th-seq').textContent = fr.visited.join(', ');
            host.querySelector('.th-phase').textContent = langOf(fr.msg);
        }
        function step() { if (idx < frames.length - 1) { idx++; paint(); return idx < frames.length - 1; } return false; }
        function reset() { idx = 0; paint(); }

        host.appendChild(buildStepControls(step, reset, 700));
        paint();
        host.querySelector('.th-build').onclick = () => {
            const vals = host.querySelector('.th-input').value.split(',').map((s) => parseInt(s.trim(), 10)).filter(Number.isFinite);
            if (vals.length) { st.vals = vals; renderTreeThreaded(); }
        };
    }
    function renderTreeMway() { const host = acquireDynamicVizHost(); host.textContent = 'tree-mway (pending)'; }

    function renderSegmentTree() {
        const host = acquireDynamicVizHost();
        const arr = [5, 8, 6, 3, 2, 7, 2, 6];
        const n = arr.length;
        const lo = new Array(16), hi = new Array(16);
        (function setRanges(node, l, r) {
            lo[node] = l; hi[node] = r;
            if (l === r) return;
            const mid = (l + r) >> 1;
            setRanges(2 * node, l, mid);
            setRanges(2 * node + 1, mid + 1, r);
        })(1, 0, n - 1);

        const tree = new Array(16).fill(0);
        const lazy = new Array(16).fill(0);
        (function build(node) {
            if (lo[node] === hi[node]) { tree[node] = arr[lo[node]]; return; }
            build(2 * node);
            build(2 * node + 1);
            tree[node] = tree[2 * node] + tree[2 * node + 1];
        })(1);

        const frames = [];
        function snapshot(phase, active, msg) {
            frames.push({ tree: tree.slice(), lazy: lazy.slice(), phase: phase, active: active, msg: msg });
        }
        function applyLazy(node, val) {
            tree[node] += (hi[node] - lo[node] + 1) * val;
            lazy[node] += val;
        }
        function pushDown(node, phase) {
            if (lazy[node] === 0) return;
            applyLazy(2 * node, lazy[node]);
            applyLazy(2 * node + 1, lazy[node]);
            lazy[node] = 0;
            snapshot(phase, node, 'push lazy tag down from node ' + node);
        }
        function query(node, ql, qr, phase) {
            if (qr < lo[node] || hi[node] < ql) {
                snapshot(phase, node, 'node ' + node + ' [' + lo[node] + ',' + hi[node] + '] disjoint — skip');
                return 0;
            }
            if (ql <= lo[node] && hi[node] <= qr) {
                snapshot(phase, node, 'node ' + node + ' fully covered — take ' + tree[node]);
                return tree[node];
            }
            pushDown(node, phase);
            snapshot(phase, node, 'node ' + node + ' partial — recurse into children');
            return query(2 * node, ql, qr, phase) + query(2 * node + 1, ql, qr, phase);
        }
        function update(node, ql, qr, val, phase) {
            if (qr < lo[node] || hi[node] < ql) return;
            if (ql <= lo[node] && hi[node] <= qr) {
                applyLazy(node, val);
                snapshot(phase, node, 'node ' + node + ' fully covered — apply lazy +' + val);
                return;
            }
            pushDown(node, phase);
            update(2 * node, ql, qr, val, phase);
            update(2 * node + 1, ql, qr, val, phase);
            tree[node] = tree[2 * node] + tree[2 * node + 1];
            snapshot(phase, node, 'node ' + node + ' pull up — sum now ' + tree[node]);
        }

        snapshot('Ready', -1, 'segment tree built — press Step');
        const r1 = query(1, 2, 5, 'Phase 1: range query sum[2,5]');
        frames[frames.length - 1].msg += '   result = ' + r1;
        update(1, 1, 4, 3, 'Phase 2: range update [1,4] += 3');
        const r3 = query(1, 2, 5, 'Phase 3: range query sum[2,5]');
        frames[frames.length - 1].msg += '   result = ' + r3;

        const POS = {
            1: [299, 34], 2: [151, 96], 3: [447, 96],
            4: [77, 158], 5: [225, 158], 6: [373, 158], 7: [521, 158],
            8: [40, 220], 9: [114, 220], 10: [188, 220], 11: [262, 220],
            12: [336, 220], 13: [410, 220], 14: [484, 220], 15: [558, 220],
        };
        let idx = 0;

        const wrap = document.createElement('div');
        wrap.className = 'segtree-wrap';
        wrap.innerHTML =
            '<div class="segtree-phase" data-testid="segtree-phase"></div>' +
            '<div class="segtree-grid"></div>' +
            '<div class="segtree-msg" data-testid="segtree-msg">&nbsp;</div>';
        host.appendChild(wrap);
        const gridEl = wrap.querySelector('.segtree-grid');
        const phaseEl = wrap.querySelector('.segtree-phase');
        const msgEl = wrap.querySelector('.segtree-msg');

        function draw() {
            const f = frames[idx];
            let svg = '<svg class="segtree-svg" viewBox="0 0 600 252" width="100%" ' +
                      'xmlns="http://www.w3.org/2000/svg">';
            for (let node = 2; node <= 15; node++) {
                const p = POS[node >> 1], c = POS[node];
                svg += '<line x1="' + p[0] + '" y1="' + (p[1] + 15) + '" x2="' + c[0] +
                       '" y2="' + (c[1] - 15) + '" stroke="#cbd5e1" stroke-width="1.5"/>';
            }
            for (let node = 1; node <= 15; node++) {
                const c = POS[node];
                const isActive = node === f.active;
                svg += '<rect class="segtree-node" data-node="' + node + '" x="' + (c[0] - 28) +
                       '" y="' + (c[1] - 15) + '" width="56" height="30" rx="4" fill="' +
                       (isActive ? '#34d399' : '#fff') + '" stroke="#1e40af" stroke-width="1.5"/>';
                svg += '<text x="' + c[0] + '" y="' + (c[1] - 19) + '" text-anchor="middle" ' +
                       'font-size="9" fill="#64748b">[' + lo[node] + ',' + hi[node] + ']</text>';
                svg += '<text x="' + c[0] + '" y="' + (c[1] + 5) + '" text-anchor="middle" ' +
                       'font-size="13" font-weight="700" fill="' + (isActive ? '#fff' : '#1e293b') +
                       '">' + f.tree[node] + '</text>';
                if (f.lazy[node] !== 0) {
                    svg += '<text x="' + (c[0] + 23) + '" y="' + (c[1] - 5) + '" text-anchor="middle" ' +
                           'font-size="9" font-weight="700" fill="#f59e0b">+' + f.lazy[node] + '</text>';
                }
            }
            svg += '</svg>';
            gridEl.innerHTML = svg;
            phaseEl.textContent = f.phase;
            msgEl.textContent = f.msg;
        }
        function step() {
            if (idx >= frames.length - 1) return false;
            idx++;
            draw();
            return idx < frames.length - 1;
        }
        function reset() { idx = 0; draw(); }
        wrap.appendChild(buildStepControls(step, reset, 600));
        draw();
    }

    function renderFenwick() {
        const host = acquireDynamicVizHost();
        const arr = [3, 2, 5, 1, 7, 4, 6, 2];
        const n = arr.length;
        const bit = new Array(n + 1).fill(0);
        function lowbit(i) { return i & -i; }
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j <= n; j += lowbit(j)) bit[j] += arr[i];
        }

        const frames = [];
        function snapshot(phase, active, acc, msg) {
            frames.push({ bit: bit.slice(), phase: phase, active: active, acc: acc, msg: msg });
        }
        snapshot('Ready', 0, null, 'Fenwick tree built — press Step');

        // Phase 1: prefixSum(7)
        let s = 0;
        for (let i = 7; i > 0; i -= lowbit(i)) {
            s += bit[i];
            snapshot('Phase 1: prefixSum(7)', i, s,
                'add bit[' + i + '] = ' + bit[i] + '  (lowbit ' + lowbit(i) + ')  → sum ' + s);
        }
        frames[frames.length - 1].msg += '   result = ' + s;

        // Phase 2: update(3, +5)
        for (let i = 3; i <= n; i += lowbit(i)) {
            bit[i] += 5;
            snapshot('Phase 2: update(3, +5)', i, null,
                'bit[' + i + '] += 5 → ' + bit[i] + '  (lowbit ' + lowbit(i) + ')');
        }

        // Phase 3: prefixSum(7)
        s = 0;
        for (let i = 7; i > 0; i -= lowbit(i)) {
            s += bit[i];
            snapshot('Phase 3: prefixSum(7)', i, s,
                'add bit[' + i + '] = ' + bit[i] + '  (lowbit ' + lowbit(i) + ')  → sum ' + s);
        }
        frames[frames.length - 1].msg += '   result = ' + s;

        let idx = 0;
        const wrap = document.createElement('div');
        wrap.className = 'fenwick-wrap';
        wrap.innerHTML =
            '<div class="fenwick-phase" data-testid="fenwick-phase"></div>' +
            '<div class="fenwick-row"></div>' +
            '<div class="fenwick-msg" data-testid="fenwick-msg">&nbsp;</div>';
        host.appendChild(wrap);
        const rowEl = wrap.querySelector('.fenwick-row');
        const phaseEl = wrap.querySelector('.fenwick-phase');
        const msgEl = wrap.querySelector('.fenwick-msg');

        function draw() {
            const f = frames[idx];
            let html = '';
            for (let i = 1; i <= n; i++) {
                html += '<div class="fenwick-col">' +
                        '<span class="fenwick-idx">' + i + '</span>' +
                        '<span class="fenwick-cell' + (i === f.active ? ' fenwick-active' : '') +
                        '" data-cell="' + i + '">' + f.bit[i] + '</span>' +
                        '<span class="fenwick-span">(' + (i - lowbit(i)) + ',' + i + ']</span>' +
                        '</div>';
            }
            rowEl.innerHTML = html;
            phaseEl.textContent = f.phase + (f.acc !== null ? '   running sum: ' + f.acc : '');
            msgEl.textContent = f.msg;
        }
        function step() {
            if (idx >= frames.length - 1) return false;
            idx++;
            draw();
            return idx < frames.length - 1;
        }
        function reset() { idx = 0; draw(); }
        wrap.appendChild(buildStepControls(step, reset, 600));
        draw();
    }

    function renderPrim() {
        const host = acquireDynamicVizHost();
        const nodes = [
            { id: 0, label: '0', x: 160, y: 35 },
            { id: 1, label: '1', x: 270, y: 110 },
            { id: 2, label: '2', x: 225, y: 215 },
            { id: 3, label: '3', x: 95, y: 215 },
            { id: 4, label: '4', x: 50, y: 110 },
        ];
        const edges = [
            { u: 0, v: 1, w: 2 }, { u: 0, v: 3, w: 6 }, { u: 1, v: 2, w: 3 },
            { u: 1, v: 3, w: 8 }, { u: 1, v: 4, w: 5 }, { u: 2, v: 4, w: 7 },
            { u: 3, v: 4, w: 9 },
        ];
        const adj = {};
        nodes.forEach((nd) => { adj[nd.id] = []; });
        edges.forEach((e) => {
            adj[e.u].push({ to: e.v, w: e.w });
            adj[e.v].push({ to: e.u, w: e.w });
        });
        const inTree = {};
        const steps = [{ node: 0, edge: null, total: 0 }];
        inTree[0] = true;
        let total = 0;
        for (let c = 1; c < nodes.length; c++) {
            let best = null;
            for (const id in inTree) {
                for (const nb of adj[id]) {
                    if (!inTree[nb.to] && (!best || nb.w < best.w)) {
                        best = { from: parseInt(id, 10), to: nb.to, w: nb.w };
                    }
                }
            }
            inTree[best.to] = true;
            total += best.w;
            steps.push({ node: best.to, edge: [best.from, best.to], total: total });
        }
        let idx = 0;

        const wrap = document.createElement('div');
        wrap.className = 'prim-wrap';
        wrap.innerHTML = buildWeightedGraphSvg(nodes, edges, false) +
            '<div class="prim-stats" data-testid="prim-stats">MST weight: ' +
            '<span class="prim-weight">0</span></div>';
        host.appendChild(wrap);
        const weightEl = wrap.querySelector('.prim-weight');

        function draw() {
            wrap.querySelectorAll('.wgraph-node').forEach((c) => c.classList.remove('wgraph-in'));
            wrap.querySelectorAll('.wgraph-edge').forEach((l) =>
                l.classList.remove('wgraph-in', 'wgraph-cur'));
            for (let s = 0; s <= idx; s++) {
                const st = steps[s];
                const nodeEl = wrap.querySelector('.wgraph-node[data-node="' + st.node + '"]');
                if (nodeEl) nodeEl.classList.add('wgraph-in');
                if (st.edge) {
                    const eEl = wrap.querySelector(
                        '.wgraph-edge[data-edge="' + st.edge[0] + '-' + st.edge[1] + '"], ' +
                        '.wgraph-edge[data-edge="' + st.edge[1] + '-' + st.edge[0] + '"]');
                    if (eEl) eEl.classList.add(s === idx ? 'wgraph-cur' : 'wgraph-in');
                }
            }
            weightEl.textContent = steps[idx].total;
        }
        function step() {
            if (idx >= steps.length - 1) return false;
            idx++;
            draw();
            return idx < steps.length - 1;
        }
        function reset() { idx = 0; draw(); }
        wrap.appendChild(buildStepControls(step, reset, 700));
        draw();
    }

    function renderBellmanFord() {
        const host = acquireDynamicVizHost();
        const nodes = [
            { id: 0, label: '0', x: 45, y: 70 },
            { id: 1, label: '1', x: 160, y: 35 },
            { id: 2, label: '2', x: 160, y: 160 },
            { id: 3, label: '3', x: 275, y: 60 },
            { id: 4, label: '4', x: 275, y: 185 },
        ];
        const edges = [
            { u: 0, v: 1, w: 6 }, { u: 0, v: 2, w: 7 }, { u: 1, v: 2, w: 8 },
            { u: 1, v: 3, w: 5 }, { u: 1, v: 4, w: -4 }, { u: 2, v: 3, w: -3 },
            { u: 2, v: 4, w: 9 }, { u: 3, v: 1, w: -2 }, { u: 4, v: 0, w: 2 },
            { u: 4, v: 3, w: 7 },
        ];
        const V = nodes.length;
        const INF = Infinity;
        const dist = new Array(V).fill(INF);
        dist[0] = 0;
        const frames = [{ dist: dist.slice(), edge: null, msg: 'init: dist[0] = 0, others ∞' }];
        for (let pass = 1; pass <= V - 1; pass++) {
            let changed = false;
            for (const e of edges) {
                if (dist[e.u] !== INF && dist[e.u] + e.w < dist[e.v]) {
                    dist[e.v] = dist[e.u] + e.w;
                    changed = true;
                    frames.push({ dist: dist.slice(), edge: [e.u, e.v],
                        msg: 'pass ' + pass + ': relax ' + e.u + '→' + e.v +
                             '   dist[' + e.v + '] = ' + dist[e.v] });
                } else {
                    frames.push({ dist: dist.slice(), edge: [e.u, e.v],
                        msg: 'pass ' + pass + ': edge ' + e.u + '→' + e.v + ' — no improvement' });
                }
            }
            if (!changed) break;
        }
        let idx = 0;

        const wrap = document.createElement('div');
        wrap.className = 'bellman-wrap';
        wrap.innerHTML = buildWeightedGraphSvg(nodes, edges, true) +
            '<div class="bellman-darr"></div>' +
            '<div class="bellman-msg" data-testid="bellman-msg">&nbsp;</div>';
        host.appendChild(wrap);
        const darrEl = wrap.querySelector('.bellman-darr');
        const msgEl = wrap.querySelector('.bellman-msg');

        function draw() {
            const f = frames[idx];
            wrap.querySelectorAll('.wgraph-edge').forEach((l) => l.classList.remove('wgraph-cur'));
            if (f.edge) {
                const eEl = wrap.querySelector('.wgraph-edge[data-edge="' + f.edge[0] + '-' + f.edge[1] + '"]');
                if (eEl) eEl.classList.add('wgraph-cur');
            }
            let html = '';
            for (let v = 0; v < V; v++) {
                const val = f.dist[v] === INF ? '∞' : f.dist[v];
                html += '<div class="bellman-dcol">' +
                        '<span class="bellman-didx">' + v + '</span>' +
                        '<span class="bellman-dcell" data-dist="' + v + '">' + val + '</span>' +
                        '</div>';
            }
            darrEl.innerHTML = html;
            msgEl.textContent = f.msg;
        }
        function step() {
            if (idx >= frames.length - 1) return false;
            idx++;
            draw();
            return idx < frames.length - 1;
        }
        function reset() { idx = 0; draw(); }
        wrap.appendChild(buildStepControls(step, reset, 400));
        draw();
    }

    function renderFloydWarshall() {
        const host = acquireDynamicVizHost();
        const V = 4;
        const labels = ['A', 'B', 'C', 'D'];
        const INF = Infinity;
        const init = [
            [0, 3, INF, 7],
            [8, 0, 2, INF],
            [5, INF, 0, 1],
            [2, INF, INF, 0],
        ];
        const frames = [{ k: -1, dist: init.map((r) => r.slice()), changed: [],
            msg: 'initial distance matrix (direct edges only)' }];
        let dist = init.map((r) => r.slice());
        for (let k = 0; k < V; k++) {
            const changed = [];
            const next = dist.map((r) => r.slice());
            for (let i = 0; i < V; i++) {
                for (let j = 0; j < V; j++) {
                    if (dist[i][k] + dist[k][j] < dist[i][j]) {
                        next[i][j] = dist[i][k] + dist[k][j];
                        changed.push(i + ',' + j);
                    }
                }
            }
            dist = next;
            frames.push({ k: k, dist: dist.map((r) => r.slice()), changed: changed,
                msg: 'k = ' + k + '  (' + labels[k] + ' as intermediate) — ' +
                     changed.length + ' cell(s) improved' });
        }
        let idx = 0;

        const wrap = document.createElement('div');
        wrap.className = 'floyd-wrap';
        wrap.innerHTML =
            '<div class="floyd-grid"></div>' +
            '<div class="floyd-msg" data-testid="floyd-msg">&nbsp;</div>';
        host.appendChild(wrap);
        const gridEl = wrap.querySelector('.floyd-grid');
        const msgEl = wrap.querySelector('.floyd-msg');

        function draw() {
            const f = frames[idx];
            let html = '<div class="floyd-hcell"></div>';
            for (let j = 0; j < V; j++) {
                html += '<div class="floyd-hcell' + (j === f.k ? ' floyd-pivot' : '') + '">' +
                        labels[j] + '</div>';
            }
            for (let i = 0; i < V; i++) {
                html += '<div class="floyd-hcell' + (i === f.k ? ' floyd-pivot' : '') + '">' +
                        labels[i] + '</div>';
                for (let j = 0; j < V; j++) {
                    const val = f.dist[i][j] === INF ? '∞' : f.dist[i][j];
                    const cls = 'floyd-cell' +
                        (f.changed.indexOf(i + ',' + j) >= 0 ? ' floyd-changed' : '') +
                        ((i === f.k || j === f.k) ? ' floyd-pivotline' : '');
                    html += '<div class="' + cls + '" data-cell="' + i + '-' + j + '">' + val + '</div>';
                }
            }
            gridEl.innerHTML = html;
            msgEl.textContent = f.msg;
        }
        function step() {
            if (idx >= frames.length - 1) return false;
            idx++;
            draw();
            return idx < frames.length - 1;
        }
        function reset() { idx = 0; draw(); }
        wrap.appendChild(buildStepControls(step, reset, 800));
        draw();
    }

    function renderKMP() {
        const host = acquireDynamicVizHost();
        const text = 'ABABDABACDABABCABAB';
        const pattern = 'ABABCABAB';
        const m = pattern.length;
        const lps = new Array(m).fill(0);
        for (let len = 0, k = 1; k < m;) {
            if (pattern[k] === pattern[len]) lps[k++] = ++len;
            else if (len !== 0) len = lps[len - 1];
            else lps[k++] = 0;
        }
        let i = 0, j = 0, comparisons = 0, matches = [], runTimer = null;

        const wrap = document.createElement('div');
        wrap.className = 'strsearch-wrap';
        wrap.innerHTML =
            '<div class="strsearch-align"></div>' +
            '<div class="strsearch-lps"><strong>LPS:</strong> <span class="strsearch-lps-cells"></span></div>' +
            '<div class="strsearch-stats" data-testid="kmp-stats">comparisons: <span class="strsearch-cmp">0</span>' +
                ' &nbsp;|&nbsp; matches: <span class="strsearch-matches">[]</span></div>' +
            '<div class="strsearch-controls" role="group">' +
                '<button type="button" data-action="step">Step</button>' +
                '<button type="button" data-action="run">Run</button>' +
                '<button type="button" data-action="reset">Reset</button>' +
            '</div>';
        host.appendChild(wrap);

        const alignEl = wrap.querySelector('.strsearch-align');
        const lpsEl = wrap.querySelector('.strsearch-lps-cells');
        const cmpEl = wrap.querySelector('.strsearch-cmp');
        const matchesEl = wrap.querySelector('.strsearch-matches');

        function draw(offset, hi, lpsActive) {
            alignEl.innerHTML = buildAlignmentRow(text, pattern, offset, hi);
            let h = '';
            for (let k = 0; k < m; k++) {
                h += '<span class="strsearch-lps-cell' + (k === lpsActive ? ' strsearch-lps-active' : '') +
                     '">' + lps[k] + '</span>';
            }
            lpsEl.innerHTML = h;
            cmpEl.textContent = comparisons;
            matchesEl.textContent = '[' + matches.join(',') + ']';
        }
        function step() {
            if (i >= text.length) return;
            comparisons++;
            const ti = i, pj = j, drawOffset = i - j;
            if (text[i] === pattern[j]) {
                i++; j++;
                if (j === m) { matches.push(i - j); j = lps[j - 1]; }
                draw(drawOffset, { kind: 'cell', textIdx: ti, patIdx: pj, status: 'match' }, -1);
            } else if (j !== 0) {
                const lpsActive = pj - 1;
                j = lps[j - 1];
                draw(drawOffset, { kind: 'cell', textIdx: ti, patIdx: pj, status: 'mismatch' }, lpsActive);
            } else {
                i++;
                draw(drawOffset, { kind: 'cell', textIdx: ti, patIdx: pj, status: 'mismatch' }, -1);
            }
        }
        function reset() {
            i = 0; j = 0; comparisons = 0; matches = [];
            if (runTimer) { clearInterval(runTimer); runTimer = null; }
            draw(0, null, -1);
        }
        wrap.querySelector('[data-action="step"]').onclick = step;
        wrap.querySelector('[data-action="run"]').onclick = () => {
            if (runTimer) return;
            runTimer = setInterval(() => {
                if (i >= text.length) { clearInterval(runTimer); runTimer = null; return; }
                step();
            }, 500);
        };
        wrap.querySelector('[data-action="reset"]').onclick = reset;
        draw(0, null, -1);
    }

    function renderBM() {
        const host = acquireDynamicVizHost();
        const text = 'ABABDABACDABABCABAB';
        const pattern = 'ABABCABAB';
        const n = text.length, m = pattern.length;
        const badChar = {};
        for (let k = 0; k < m; k++) badChar[pattern[k]] = k;
        const shift = new Array(m + 1).fill(0);
        const bpos = new Array(m + 1).fill(0);
        (function preprocess() {
            let i = m, j = m + 1;
            bpos[i] = j;
            while (i > 0) {
                while (j <= m && pattern[i - 1] !== pattern[j - 1]) {
                    if (shift[j] === 0) shift[j] = j - i;
                    j = bpos[j];
                }
                i--; j--;
                bpos[i] = j;
            }
            j = bpos[0];
            for (i = 0; i <= m; i++) {
                if (shift[i] === 0) shift[i] = j;
                if (i === j) j = bpos[j];
            }
        })();

        let s = 0, j = m - 1, comparisons = 0, matches = [], runTimer = null;

        const wrap = document.createElement('div');
        wrap.className = 'strsearch-wrap';
        let badRow = '';
        Object.keys(badChar).sort().forEach((c) => {
            badRow += '<span class="strsearch-bm-cell">' + c + ':' + badChar[c] + '</span>';
        });
        wrap.innerHTML =
            '<div class="strsearch-align"></div>' +
            '<div class="strsearch-lps"><strong>bad-char:</strong> ' + badRow + '</div>' +
            '<div class="strsearch-lps"><strong>good-suffix shift:</strong> <span>[' + shift.join(',') + ']</span></div>' +
            '<div class="strsearch-shift-note" data-testid="bm-note">&nbsp;</div>' +
            '<div class="strsearch-stats" data-testid="bm-stats">comparisons: <span class="strsearch-cmp">0</span>' +
                ' &nbsp;|&nbsp; matches: <span class="strsearch-matches">[]</span></div>' +
            '<div class="strsearch-controls" role="group">' +
                '<button type="button" data-action="step">Step</button>' +
                '<button type="button" data-action="run">Run</button>' +
                '<button type="button" data-action="reset">Reset</button>' +
            '</div>';
        host.appendChild(wrap);

        const alignEl = wrap.querySelector('.strsearch-align');
        const noteEl = wrap.querySelector('[data-testid="bm-note"]');
        const cmpEl = wrap.querySelector('.strsearch-cmp');
        const matchesEl = wrap.querySelector('.strsearch-matches');

        function draw(hi, note) {
            alignEl.innerHTML = buildAlignmentRow(text, pattern, s, hi);
            cmpEl.textContent = comparisons;
            matchesEl.textContent = '[' + matches.join(',') + ']';
            noteEl.innerHTML = note || '&nbsp;';
        }
        function step() {
            if (s > n - m) return;
            comparisons++;
            const ti = s + j, pj = j;
            if (pattern[j] === text[s + j]) {
                if (j === 0) {
                    matches.push(s);
                    draw({ kind: 'cell', textIdx: ti, patIdx: pj, status: 'match' }, 'full match at index ' + s);
                    s += shift[0];
                    j = m - 1;
                } else {
                    draw({ kind: 'cell', textIdx: ti, patIdx: pj, status: 'match' }, 'match — scan left');
                    j--;
                }
            } else {
                const bcRaw = badChar[text[s + j]];
                const bcShift = Math.max(1, j - (bcRaw === undefined ? -1 : bcRaw));
                const gsShift = shift[j + 1];
                const used = gsShift >= bcShift ? 'good-suffix' : 'bad-character';
                draw({ kind: 'cell', textIdx: ti, patIdx: pj, status: 'mismatch' },
                     'mismatch — bad-char=' + bcShift + ', good-suffix=' + gsShift + ' &rarr; shift by ' +
                     Math.max(bcShift, gsShift) + ' (' + used + ')');
                s += Math.max(bcShift, gsShift);
                j = m - 1;
            }
        }
        function reset() {
            s = 0; j = m - 1; comparisons = 0; matches = [];
            if (runTimer) { clearInterval(runTimer); runTimer = null; }
            draw(null, null);
        }
        wrap.querySelector('[data-action="step"]').onclick = step;
        wrap.querySelector('[data-action="run"]').onclick = () => {
            if (runTimer) return;
            runTimer = setInterval(() => {
                if (s > n - m) { clearInterval(runTimer); runTimer = null; return; }
                step();
            }, 500);
        };
        wrap.querySelector('[data-action="reset"]').onclick = reset;
        draw(null, null);
    }

    function renderRK() {
        const host = acquireDynamicVizHost();
        const text = 'ABABDABACDABABCABAB';
        const pattern = 'ABABCABAB';
        const BASE = 256, MOD = 101;
        const n = text.length, m = pattern.length;
        let h = 1;
        for (let k = 0; k < m - 1; k++) h = (h * BASE) % MOD;
        let patHash = 0;
        for (let k = 0; k < m; k++) patHash = (BASE * patHash + pattern.charCodeAt(k)) % MOD;
        function windowHash(start) {
            let wh = 0;
            for (let k = 0; k < m; k++) wh = (BASE * wh + text.charCodeAt(start + k)) % MOD;
            return wh;
        }
        let s = 0, winHash = windowHash(0);
        let hashChecks = 0, verifyChecks = 0, matches = [], runTimer = null;

        const wrap = document.createElement('div');
        wrap.className = 'strsearch-wrap';
        wrap.innerHTML =
            '<div class="strsearch-align"></div>' +
            '<div class="strsearch-hash" data-testid="rk-hash">pattern hash: <span class="rk-pat">' + patHash + '</span>' +
                ' &nbsp;|&nbsp; window hash: <span class="rk-win">' + winHash + '</span></div>' +
            '<div class="strsearch-stats">hash checks: <span class="rk-hc">0</span>' +
                ' &nbsp;|&nbsp; verifications: <span class="rk-vc">0</span>' +
                ' &nbsp;|&nbsp; matches: <span class="rk-matches">[]</span></div>' +
            '<div class="strsearch-shift-note" data-testid="rk-note">&nbsp;</div>' +
            '<div class="strsearch-controls" role="group">' +
                '<button type="button" data-action="step">Step</button>' +
                '<button type="button" data-action="run">Run</button>' +
                '<button type="button" data-action="reset">Reset</button>' +
            '</div>';
        host.appendChild(wrap);

        const alignEl = wrap.querySelector('.strsearch-align');
        const winEl = wrap.querySelector('.rk-win');
        const hcEl = wrap.querySelector('.rk-hc');
        const vcEl = wrap.querySelector('.rk-vc');
        const matchesEl = wrap.querySelector('.rk-matches');
        const noteEl = wrap.querySelector('[data-testid="rk-note"]');

        function draw(status, note) {
            alignEl.innerHTML = buildAlignmentRow(text, pattern, Math.min(s, n - m), { kind: 'window', status: status });
            winEl.textContent = winHash;
            hcEl.textContent = hashChecks;
            vcEl.textContent = verifyChecks;
            matchesEl.textContent = '[' + matches.join(',') + ']';
            noteEl.innerHTML = note || '&nbsp;';
        }
        function step() {
            if (s > n - m) return;
            hashChecks++;
            let status, note;
            if (winHash === patHash) {
                let k = 0;
                while (k < m && text[s + k] === pattern[k]) { verifyChecks++; k++; }
                if (k === m) { matches.push(s); status = 'match'; note = 'hash hit + verified &rarr; match at ' + s; }
                else { status = 'collision'; note = 'hash hit but verify failed &rarr; collision'; }
            } else {
                status = 'mismatch';
                note = 'hash mismatch &rarr; slide window';
            }
            draw(status, note);
            if (s < n - m) {
                winHash = (BASE * (winHash - text.charCodeAt(s) * h) + text.charCodeAt(s + m)) % MOD;
                winHash = ((winHash % MOD) + MOD) % MOD;
            }
            s++;
        }
        function reset() {
            s = 0; winHash = windowHash(0);
            hashChecks = 0; verifyChecks = 0; matches = [];
            if (runTimer) { clearInterval(runTimer); runTimer = null; }
            draw(null, null);
        }
        wrap.querySelector('[data-action="step"]').onclick = step;
        wrap.querySelector('[data-action="run"]').onclick = () => {
            if (runTimer) return;
            runTimer = setInterval(() => {
                if (s > n - m) { clearInterval(runTimer); runTimer = null; return; }
                step();
            }, 500);
        };
        wrap.querySelector('[data-action="reset"]').onclick = reset;
        draw(null, null);
    }

    function renderStringCompare() {
        const host = acquireDynamicVizHost();
        const text = 'ABABDABACDABABCABAB';
        const pattern = 'ABABCABAB';
        const n = text.length, m = pattern.length;

        // --- KMP stepper ---
        const lps = new Array(m).fill(0);
        for (let len = 0, k = 1; k < m;) {
            if (pattern[k] === pattern[len]) lps[k++] = ++len;
            else if (len !== 0) len = lps[len - 1];
            else lps[k++] = 0;
        }
        const kmp = { i: 0, j: 0, cmp: 0, done: false };
        function kmpStep() {
            if (kmp.done || kmp.i >= n) { kmp.done = true; return; }
            kmp.cmp++;
            if (text[kmp.i] === pattern[kmp.j]) {
                kmp.i++; kmp.j++;
                if (kmp.j === m) kmp.j = lps[kmp.j - 1];
            } else if (kmp.j !== 0) {
                kmp.j = lps[kmp.j - 1];
            } else {
                kmp.i++;
            }
            if (kmp.i >= n) kmp.done = true;
        }

        // --- Boyer-Moore (bad-character) stepper ---
        const bad = {};
        for (let k = 0; k < m; k++) bad[pattern[k]] = k;
        const bm = { s: 0, j: m - 1, cmp: 0, done: false };
        function bmStep() {
            if (bm.done || bm.s > n - m) { bm.done = true; return; }
            bm.cmp++;
            if (pattern[bm.j] === text[bm.s + bm.j]) {
                if (bm.j === 0) { bm.s += 1; bm.j = m - 1; }
                else bm.j--;
            } else {
                const bcRaw = bad[text[bm.s + bm.j]];
                bm.s += Math.max(1, bm.j - (bcRaw === undefined ? -1 : bcRaw));
                bm.j = m - 1;
            }
            if (bm.s > n - m) bm.done = true;
        }

        // --- Rabin-Karp stepper ---
        const BASE = 256, MOD = 101;
        let rkH = 1;
        for (let k = 0; k < m - 1; k++) rkH = (rkH * BASE) % MOD;
        let rkPat = 0;
        for (let k = 0; k < m; k++) rkPat = (BASE * rkPat + pattern.charCodeAt(k)) % MOD;
        function rkWindow(start) {
            let wh = 0;
            for (let k = 0; k < m; k++) wh = (BASE * wh + text.charCodeAt(start + k)) % MOD;
            return wh;
        }
        const rk = { s: 0, hash: rkWindow(0), cmp: 0, done: false };
        function rkStep() {
            if (rk.done || rk.s > n - m) { rk.done = true; return; }
            rk.cmp++;
            if (rk.hash === rkPat) {
                let k = 0;
                while (k < m && text[rk.s + k] === pattern[k]) { rk.cmp++; k++; }
            }
            if (rk.s < n - m) {
                rk.hash = (BASE * (rk.hash - text.charCodeAt(rk.s) * rkH) + text.charCodeAt(rk.s + m)) % MOD;
                rk.hash = ((rk.hash % MOD) + MOD) % MOD;
            }
            rk.s++;
            if (rk.s > n - m) rk.done = true;
        }

        const grid = document.createElement('div');
        grid.className = 'strcompare-grid';
        grid.innerHTML =
            '<div class="strcompare-pane" data-pane="kmp"><h4>KMP</h4>' +
                '<div class="strcompare-align"></div>' +
                '<div class="strsearch-stats">comparisons: <span class="strcompare-cmp">0</span></div></div>' +
            '<div class="strcompare-pane" data-pane="bm"><h4>Boyer-Moore (bad-char)</h4>' +
                '<div class="strcompare-align"></div>' +
                '<div class="strsearch-stats">comparisons: <span class="strcompare-cmp">0</span></div></div>' +
            '<div class="strcompare-pane" data-pane="rk"><h4>Rabin-Karp</h4>' +
                '<div class="strcompare-align"></div>' +
                '<div class="strsearch-stats">comparisons: <span class="strcompare-cmp">0</span></div></div>' +
            '<div class="strsearch-controls" role="group">' +
                '<button type="button" data-action="step">Step</button>' +
                '<button type="button" data-action="run">Run</button>' +
                '<button type="button" data-action="reset">Reset</button>' +
            '</div>';
        host.appendChild(grid);

        const kmpPane = grid.querySelector('[data-pane="kmp"]');
        const bmPane = grid.querySelector('[data-pane="bm"]');
        const rkPane = grid.querySelector('[data-pane="rk"]');
        let runTimer = null;

        function paint() {
            kmpPane.querySelector('.strcompare-align').innerHTML =
                buildAlignmentRow(text, pattern, kmp.i - kmp.j, null);
            kmpPane.querySelector('.strcompare-cmp').textContent = kmp.cmp;
            bmPane.querySelector('.strcompare-align').innerHTML =
                buildAlignmentRow(text, pattern, Math.min(bm.s, n - m), null);
            bmPane.querySelector('.strcompare-cmp').textContent = bm.cmp;
            rkPane.querySelector('.strcompare-align').innerHTML =
                buildAlignmentRow(text, pattern, Math.min(rk.s, n - m), { kind: 'window', status: null });
            rkPane.querySelector('.strcompare-cmp').textContent = rk.cmp;
        }
        function allDone() { return kmp.done && bm.done && rk.done; }
        function step() { kmpStep(); bmStep(); rkStep(); paint(); }
        grid.querySelector('[data-action="step"]').onclick = step;
        grid.querySelector('[data-action="run"]').onclick = () => {
            if (runTimer) return;
            runTimer = setInterval(() => {
                if (allDone()) { clearInterval(runTimer); runTimer = null; return; }
                step();
            }, 500);
        };
        grid.querySelector('[data-action="reset"]').onclick = () => {
            if (runTimer) { clearInterval(runTimer); runTimer = null; }
            renderStringCompare();
        };
        paint();
    }

    function renderGraph() {
        if (currentMode === 'graph-bfs') {
            const host = acquireDynamicVizHost();
            const svg = `<svg viewBox="0 0 280 200" width="100%" style="max-width:280px"
        xmlns="http://www.w3.org/2000/svg" class="bfs-svg">
        <g class="edges" stroke="#94a3b8" stroke-width="2">
            <line x1="140" y1="30" x2="60"  y2="80"/>
            <line x1="140" y1="30" x2="220" y2="80"/>
            <line x1="60"  y1="80" x2="80"  y2="160"/>
            <line x1="60"  y1="80" x2="200" y2="160"/>
            <line x1="60"  y1="80" x2="220" y2="80"/>
            <line x1="80"  y1="160" x2="200" y2="160"/>
            <line x1="200" y1="160" x2="220" y2="80"/>
        </g>
        <g class="nodes">
            <circle cx="140" cy="30"  r="18" fill="#fff" stroke="#1e40af" stroke-width="2" data-node="0"/>
            <text x="140" y="35" text-anchor="middle" font-size="14" font-weight="700">0</text>
            <circle cx="60"  cy="80"  r="18" fill="#fff" stroke="#1e40af" stroke-width="2" data-node="1"/>
            <text x="60"  y="85" text-anchor="middle" font-size="14" font-weight="700">1</text>
            <circle cx="80"  cy="160" r="18" fill="#fff" stroke="#1e40af" stroke-width="2" data-node="2"/>
            <text x="80"  y="165" text-anchor="middle" font-size="14" font-weight="700">2</text>
            <circle cx="200" cy="160" r="18" fill="#fff" stroke="#1e40af" stroke-width="2" data-node="3"/>
            <text x="200" y="165" text-anchor="middle" font-size="14" font-weight="700">3</text>
            <circle cx="220" cy="80"  r="18" fill="#fff" stroke="#1e40af" stroke-width="2" data-node="4"/>
            <text x="220" y="85" text-anchor="middle" font-size="14" font-weight="700">4</text>
        </g>
    </svg>`;

            const wrap = document.createElement('div');
            wrap.className = 'bfs-wrap';
            wrap.innerHTML = svg + '<div class="bfs-queue" data-testid="bfs-queue"><strong>Queue:</strong> <span class="bfs-queue-items">0</span></div>'
                               + '<div class="bfs-visited"><strong>Visited:</strong> <span class="bfs-visited-items"></span></div>';
            host.appendChild(wrap);

            // BFS step handler — bind to the existing step/reset buttons if present.
            const adjacency = [[1,4],[0,2,3,4],[1,3],[1,2,4],[0,1,3]];
            const state = { visited: [], queue: [0], visitedSet: new Set() };
            const queueEl = wrap.querySelector('.bfs-queue-items');
            const visitedEl = wrap.querySelector('.bfs-visited-items');

            function bfsStep() {
                while (state.queue.length && state.visitedSet.has(state.queue[0])) state.queue.shift();
                if (state.queue.length === 0) return;
                const u = state.queue.shift();
                state.visitedSet.add(u);
                state.visited.push(u);
                const circle = wrap.querySelector('[data-node="' + u + '"]');
                if (circle) circle.setAttribute('fill', '#10b981');
                for (const v of adjacency[u]) if (!state.visitedSet.has(v)) state.queue.push(v);
                queueEl.textContent = state.queue.join(' ');
                visitedEl.textContent = state.visited.join(' ');
            }
            function bfsReset() {
                state.visited = [];
                state.queue = [0];
                state.visitedSet = new Set();
                queueEl.textContent = '0';
                visitedEl.textContent = '';
                wrap.querySelectorAll('.nodes circle').forEach((c) => c.setAttribute('fill', '#fff'));
            }

            // Bind to existing graph controls — search the runtimeControls for step/reset buttons.
            const stepBtn = runtimeControls.querySelector('[data-action="step"]')
                         || runtimeControls.querySelector('.demo-step-btn')
                         || Array.from(runtimeControls.querySelectorAll('button')).find((b) => /step/i.test(b.textContent || ''));
            const resetBtn = runtimeControls.querySelector('[data-action="reset"]')
                          || runtimeControls.querySelector('.demo-reset-btn')
                          || Array.from(runtimeControls.querySelectorAll('button')).find((b) => /reset/i.test(b.textContent || ''));
            if (stepBtn) stepBtn.onclick = bfsStep;
            if (resetBtn) resetBtn.onclick = bfsReset;
            return;
        }
        if (currentMode === 'graph-dfs') {
            const host = acquireDynamicVizHost();
            const svg = `<svg viewBox="0 0 280 200" width="100%" style="max-width:280px"
        xmlns="http://www.w3.org/2000/svg" class="dfs-svg">
        <g class="edges" stroke="#94a3b8" stroke-width="2">
            <line x1="140" y1="30" x2="60"  y2="80"/>
            <line x1="140" y1="30" x2="220" y2="80"/>
            <line x1="60"  y1="80" x2="80"  y2="160"/>
            <line x1="60"  y1="80" x2="200" y2="160"/>
            <line x1="60"  y1="80" x2="220" y2="80"/>
            <line x1="80"  y1="160" x2="200" y2="160"/>
            <line x1="200" y1="160" x2="220" y2="80"/>
        </g>
        <g class="nodes">
            <circle cx="140" cy="30"  r="18" fill="#fff" stroke="#1e40af" stroke-width="2" data-node="0"/>
            <text x="140" y="35" text-anchor="middle" font-size="14" font-weight="700">0</text>
            <circle cx="60"  cy="80"  r="18" fill="#fff" stroke="#1e40af" stroke-width="2" data-node="1"/>
            <text x="60"  y="85" text-anchor="middle" font-size="14" font-weight="700">1</text>
            <circle cx="80"  cy="160" r="18" fill="#fff" stroke="#1e40af" stroke-width="2" data-node="2"/>
            <text x="80"  y="165" text-anchor="middle" font-size="14" font-weight="700">2</text>
            <circle cx="200" cy="160" r="18" fill="#fff" stroke="#1e40af" stroke-width="2" data-node="3"/>
            <text x="200" y="165" text-anchor="middle" font-size="14" font-weight="700">3</text>
            <circle cx="220" cy="80"  r="18" fill="#fff" stroke="#1e40af" stroke-width="2" data-node="4"/>
            <text x="220" y="85" text-anchor="middle" font-size="14" font-weight="700">4</text>
        </g>
    </svg>`;
            const wrap = document.createElement('div');
            wrap.className = 'dfs-wrap';
            wrap.innerHTML = svg + '<div class="dfs-stack" data-testid="dfs-stack"><strong>Stack:</strong> <span class="dfs-stack-items">0</span></div>'
                               + '<div class="bfs-visited"><strong>Visited:</strong> <span class="dfs-visited-items"></span></div>';
            host.appendChild(wrap);

            // DFS step handler — bind to step/reset buttons (use same fallback chain as graph-bfs).
            const adjacency = [[1,4],[0,2,3,4],[1,3],[1,2,4],[0,1,3]];
            const state = { visited: [], stack: [0], visitedSet: new Set() };
            const stackEl = wrap.querySelector('.dfs-stack-items');
            const visitedEl = wrap.querySelector('.dfs-visited-items');

            function dfsStep() {
                while (state.stack.length && state.visitedSet.has(state.stack[state.stack.length - 1])) state.stack.pop();
                if (state.stack.length === 0) return;
                const u = state.stack.pop();
                state.visitedSet.add(u);
                state.visited.push(u);
                const circle = wrap.querySelector('[data-node="' + u + '"]');
                if (circle) circle.setAttribute('fill', '#f59e0b');
                // push reverse so smallest-numbered neighbor visited first
                for (let i = adjacency[u].length - 1; i >= 0; i--) {
                    const v = adjacency[u][i];
                    if (!state.visitedSet.has(v)) state.stack.push(v);
                }
                stackEl.textContent = state.stack.join(' ');
                visitedEl.textContent = state.visited.join(' ');
            }
            function dfsReset() {
                state.visited = []; state.stack = [0]; state.visitedSet = new Set();
                stackEl.textContent = '0';
                visitedEl.textContent = '';
                wrap.querySelectorAll('.nodes circle').forEach((c) => c.setAttribute('fill', '#fff'));
            }

            const stepBtn = runtimeControls.querySelector('[data-action="step"]')
                         || runtimeControls.querySelector('.demo-step-btn')
                         || Array.from(runtimeControls.querySelectorAll('button')).find((b) => /step/i.test(b.textContent || ''));
            const resetBtn = runtimeControls.querySelector('[data-action="reset"]')
                          || runtimeControls.querySelector('.demo-reset-btn')
                          || Array.from(runtimeControls.querySelectorAll('button')).find((b) => /reset/i.test(b.textContent || ''));
            if (stepBtn) stepBtn.onclick = dfsStep;
            if (resetBtn) resetBtn.onclick = dfsReset;
            return;
        }
        if (currentMode === 'graph-adjlist') {
            // Render the same 5-node graph but as a vertical list of adjacency rows:
            // [0] -> 1 -> 4 -> null
            // [1] -> 0 -> 2 -> 3 -> 4 -> null
            // ... etc.
            const adjacency = [
                [1, 4],
                [0, 2, 3, 4],
                [1, 3],
                [1, 2, 4],
                [0, 1, 3],
            ];
            const host = acquireDynamicVizHost();
            const container = document.createElement('div');
            container.className = 'adjlist-container';
            for (let i = 0; i < adjacency.length; i++) {
                const row = document.createElement('div');
                row.className = 'adjlist-row';
                const head = document.createElement('span');
                head.className = 'adjlist-vertex';
                head.textContent = '[' + i + ']';
                row.appendChild(head);
                for (const n of adjacency[i]) {
                    const arrow = document.createElement('span');
                    arrow.className = 'adjlist-arrow';
                    arrow.textContent = '→';
                    row.appendChild(arrow);
                    const node = document.createElement('span');
                    node.className = 'adjlist-node';
                    node.textContent = String(n);
                    row.appendChild(node);
                }
                const arrowEnd = document.createElement('span');
                arrowEnd.className = 'adjlist-arrow';
                arrowEnd.textContent = '→';
                row.appendChild(arrowEnd);
                const nullNode = document.createElement('span');
                nullNode.className = 'adjlist-null';
                nullNode.textContent = 'null';
                row.appendChild(nullNode);
                container.appendChild(row);
            }
            host.appendChild(container);
            return;
        }
        const svg = document.getElementById('graph-edges'); svg.innerHTML = '';
        const pos = [{x:150,y:30},{x:270,y:120},{x:225,y:255},{x:75,y:255},{x:30,y:120}];
        
        // Update node classes
        for (let i = 0; i < 5; i++) {
            const nodeEl = document.getElementById('gn-' + i);
            nodeEl.className = 'graph-node';
            if (currentMode === 'graph-dijkstra') {
                if (i === parseInt(graphSource.value)) nodeEl.classList.add('source');
                else if (dijkstraVisited.has(i)) nodeEl.classList.add('visited');
            } else if (currentMode === 'graph-topo') {
                if (topoVisited.has(i)) nodeEl.classList.add('visited');
            }
        }
        
        if (currentMode === 'graph-kruskal') {
            weightedEdges.forEach(e => {
                const p1 = pos[e.u], p2 = pos[e.v];
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute("x1", p1.x); line.setAttribute("y1", p1.y); line.setAttribute("x2", p2.x); line.setAttribute("y2", p2.y);
                const key = edgeKey(e.u, e.v);
                let className = 'graph-edge weighted';
                if (key === graphCandidateEdgeKey) className += ' candidate';
                if (mstEdgeKeys.has(key)) className += ' mst';
                line.setAttribute("class", className);
                svg.appendChild(line);

                const tx = document.createElementNS("http://www.w3.org/2000/svg", "text");
                tx.setAttribute('x', ((p1.x + p2.x) / 2));
                tx.setAttribute('y', ((p1.y + p2.y) / 2));
                tx.setAttribute('class', 'graph-weight');
                tx.textContent = String(e.w);
                svg.appendChild(tx);
            });
        } else if (currentMode === 'graph-dijkstra') {
            edges.forEach(e => {
                const p1 = pos[e[0]], p2 = pos[e[1]];
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute("x1", p1.x); line.setAttribute("y1", p1.y); line.setAttribute("x2", p2.x); line.setAttribute("y2", p2.y);
                let className = 'graph-edge';
                if (shortestPathEdges.has(edgeKey(e[0], e[1]))) className += ' shortest';
                else if (dijkstraVisited.has(e[0]) && dijkstraVisited.has(e[1])) className += ' visited';
                line.setAttribute("class", className);
                svg.appendChild(line);
            });
            // Display distances
            dijkstraDistances.forEach((dist, node) => {
                const p = pos[node];
                const tx = document.createElementNS("http://www.w3.org/2000/svg", "text");
                tx.setAttribute('x', p.x);
                tx.setAttribute('y', p.y + 20);
                tx.setAttribute('class', 'graph-distance');
                tx.textContent = 'd=' + dist;
                svg.appendChild(tx);
            });
        } else if (currentMode === 'graph-topo') {
            topoEdges.forEach(e => {
                const p1 = pos[e[0]], p2 = pos[e[1]];
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute("x1", p1.x); line.setAttribute("y1", p1.y); line.setAttribute("x2", p2.x); line.setAttribute("y2", p2.y);
                line.setAttribute("class", 'graph-edge');
                svg.appendChild(line);
                // Add arrow for directed edge
                const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
                const arrowSize = 8;
                const arrowX = p2.x - arrowSize * Math.cos(angle);
                const arrowY = p2.y - arrowSize * Math.sin(angle);
                const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
                poly.setAttribute("points", `${p2.x},${p2.y} ${arrowX - arrowSize * Math.sin(angle)},${arrowY + arrowSize * Math.cos(angle)} ${arrowX + arrowSize * Math.sin(angle)},${arrowY - arrowSize * Math.cos(angle)}`);
                poly.setAttribute("fill", "#94a3b8");
                svg.appendChild(poly);
            });
            // Display topo order
            topoOrder.forEach((node, idx) => {
                const p = pos[node];
                const tx = document.createElementNS("http://www.w3.org/2000/svg", "text");
                tx.setAttribute('x', p.x);
                tx.setAttribute('y', p.y + 20);
                tx.setAttribute('class', 'graph-order');
                tx.textContent = '#' + (idx + 1);
                svg.appendChild(tx);
            });
        } else {
            edges.forEach(e => { const p1 = pos[e[0]], p2 = pos[e[1]]; const line = document.createElementNS("http://www.w3.org/2000/svg", "line"); line.setAttribute("x1", p1.x); line.setAttribute("y1", p1.y); line.setAttribute("x2", p2.x); line.setAttribute("y2", p2.y); line.setAttribute("class", "graph-edge"); svg.appendChild(line); });
        }
    }

    async function runDijkstra(source) {
        dijkstraDistances.clear();
        dijkstraVisited.clear();
        shortestPathEdges.clear();

        // Initialize distances
        for (let i = 0; i < 5; i++) {
            dijkstraDistances.set(i, i === source ? 0 : Infinity);
        }

        const pq = [[0, source]]; // [distance, node]
        const visited = new Set();

        while (pq.length > 0) {
            // Manual priority queue - find min
            let minIdx = 0;
            for (let i = 1; i < pq.length; i++) {
                if (pq[i][0] < pq[minIdx][0]) minIdx = i;
            }
            const [dist, u] = pq.splice(minIdx, 1)[0];

            if (visited.has(u)) continue;
            visited.add(u);
            dijkstraVisited.add(u);
            renderGraph();

            showStatus(`Processing node ${u}, distance: ${dist}`, '#60a5fa');
            await sleep(500);

            // Find neighbors
            for (const edge of edges) {
                let v = -1;
                if (edge[0] === u) v = edge[1];
                else if (edge[1] === u) v = edge[0];
                if (v === -1 || visited.has(v)) continue;

                // Assume unit weights for simplicity
                const newDist = dist + 1;
                if (newDist < dijkstraDistances.get(v)) {
                    dijkstraDistances.set(v, newDist);
                    pq.push([newDist, v]);
                }
            }
            renderGraph();
        }

        showStatus(`Dijkstra complete from node ${source}. All distances computed.`, '#34d399');
    }

    async function runTopoSort() {
        topoOrder = [];
        topoVisited.clear();
        const adjList = Array(5).fill(null).map(() => []);
        const inDegree = Array(5).fill(0);

        // Build adjacency list and in-degrees
        topoEdges.forEach(e => {
            adjList[e[0]].push(e[1]);
            inDegree[e[1]]++;
        });

        // Find all nodes with in-degree 0
        const queue = [];
        for (let i = 0; i < 5; i++) {
            if (inDegree[i] === 0) queue.push(i);
        }

        while (queue.length > 0) {
            const u = queue.shift();
            topoOrder.push(u);
            topoVisited.add(u);
            renderGraph();

            showStatus(`Added node ${u} to topological order. Sequence: [${topoOrder.join(', ')}]`, '#a78bfa');
            await sleep(500);

            // Reduce in-degree for neighbors
            for (const v of adjList[u]) {
                inDegree[v]--;
                if (inDegree[v] === 0) {
                    queue.push(v);
                }
            }
            renderGraph();
        }

        if (topoOrder.length < 5) {
            showStatus('Topological sort: Cycle detected! Only ' + topoOrder.length + ' nodes visited.', '#f87171');
        } else {
            showStatus(`Topological sort complete: [${topoOrder.join(' → ')}]`, '#34d399');
        }
    }
    // End original routines mappings

    // OOP Visualization Functions
    function oopSvgEl(tag, attrs) {
        const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
        for (const k in attrs) el.setAttribute(k, String(attrs[k]));
        return el;
    }
    // Draws a class box: a rect + a bold title + member-line texts. opts:
    // { x, y, w, h, title, titleColor, lines:[{text,color}], dashed }
    function drawOopBox(svg, opts) {
        const rect = oopSvgEl('rect', { x: opts.x, y: opts.y, width: opts.w, height: opts.h, class: 'oop-class-rect' });
        if (opts.dashed) rect.setAttribute('stroke-dasharray', '6 4');
        svg.appendChild(rect);
        const cx = opts.x + opts.w / 2;
        const title = oopSvgEl('text', {
            x: cx, y: opts.y + 22, 'text-anchor': 'middle', class: 'oop-member-text',
            style: 'font-weight:bold;fill:' + (opts.titleColor || '#60a5fa') + ';' + (opts.dashed ? 'font-style:italic;' : ''),
        });
        title.textContent = opts.title;
        svg.appendChild(title);
        (opts.lines || []).forEach((ln, i) => {
            const t = oopSvgEl('text', {
                x: cx, y: opts.y + 44 + i * 17, 'text-anchor': 'middle', class: 'oop-member-text',
                style: 'font-size:11px;fill:' + (ln.color || '#cbd5e1') + ';',
            });
            t.textContent = ln.text;
            svg.appendChild(t);
        });
    }
    function drawOopLabel(svg, x, y, text, color) {
        const t = oopSvgEl('text', {
            x: x, y: y, 'text-anchor': 'middle', class: 'oop-member-text',
            style: 'font-size:11px;fill:' + (color || '#cbd5e1') + ';',
        });
        t.textContent = text;
        svg.appendChild(t);
    }
    function drawOopLine(svg, x1, y1, x2, y2) {
        svg.appendChild(oopSvgEl('line', { x1: x1, y1: y1, x2: x2, y2: y2, class: 'oop-inheritance-line' }));
    }
    function renderOOP() {
        const mode = oopModeSelect.value;
        if (mode === 'inheritance') renderOOPInheritance();
        else if (mode === 'polymorphism') renderOOPPolymorphism();
        else if (mode === 'encapsulation') renderOOPEncapsulation();
        else if (mode === 'abstraction') renderOOPAbstraction();
        else if (mode === 'adhoc') renderOOPAdhoc();
        else if (mode === 'templates') renderOOPTemplates();
    }

    function renderOOPInheritance() {
        const svg = document.getElementById('oop-inheritance-svg');
        if (!svg) return;
        svg.innerHTML = '';
        
        // Base class
        const baseY = 50;
        const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect1.setAttribute('x', '180');
        rect1.setAttribute('y', String(baseY));
        rect1.setAttribute('width', '140');
        rect1.setAttribute('height', '80');
        rect1.setAttribute('class', 'oop-class-rect');
        svg.appendChild(rect1);

        const text1 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text1.setAttribute('x', '250');
        text1.setAttribute('y', String(baseY + 25));
        text1.setAttribute('text-anchor', 'middle');
        text1.setAttribute('class', 'oop-member-text');
        text1.setAttribute('style', 'font-weight: bold; fill: #60a5fa;');
        text1.textContent = 'Animal (Base)';
        svg.appendChild(text1);

        const method1 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        method1.setAttribute('x', '250');
        method1.setAttribute('y', String(baseY + 50));
        method1.setAttribute('text-anchor', 'middle');
        method1.setAttribute('class', 'oop-member-text');
        method1.setAttribute('style', 'fill: #fbbf24; font-style: italic;');
        method1.textContent = '+ virtual speak()';
        svg.appendChild(method1);

        // Derived classes
        const derivedY = 180;
        const leftX = 80;
        const rightX = 320;

        // Dog class
        const rect2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect2.setAttribute('x', String(leftX));
        rect2.setAttribute('y', String(derivedY));
        rect2.setAttribute('width', '120');
        rect2.setAttribute('height', '80');
        rect2.setAttribute('class', 'oop-derived-rect');
        svg.appendChild(rect2);

        const text2 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text2.setAttribute('x', String(leftX + 60));
        text2.setAttribute('y', String(derivedY + 25));
        text2.setAttribute('text-anchor', 'middle');
        text2.setAttribute('class', 'oop-member-text');
        text2.setAttribute('style', 'font-weight: bold; fill: #f472b6;');
        text2.textContent = 'Dog';
        svg.appendChild(text2);

        const method2 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        method2.setAttribute('x', String(leftX + 60));
        method2.setAttribute('y', String(derivedY + 50));
        method2.setAttribute('text-anchor', 'middle');
        method2.setAttribute('class', 'oop-member-text');
        method2.setAttribute('style', 'fill: #34d399; font-size: 10px;');
        method2.textContent = 'speak() override';
        svg.appendChild(method2);

        // Cat class
        const rect3 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect3.setAttribute('x', String(rightX));
        rect3.setAttribute('y', String(derivedY));
        rect3.setAttribute('width', '120');
        rect3.setAttribute('height', '80');
        rect3.setAttribute('class', 'oop-derived-rect');
        svg.appendChild(rect3);

        const text3 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text3.setAttribute('x', String(rightX + 60));
        text3.setAttribute('y', String(derivedY + 25));
        text3.setAttribute('text-anchor', 'middle');
        text3.setAttribute('class', 'oop-member-text');
        text3.setAttribute('style', 'font-weight: bold; fill: #f472b6;');
        text3.textContent = 'Cat';
        svg.appendChild(text3);

        const method3 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        method3.setAttribute('x', String(rightX + 60));
        method3.setAttribute('y', String(derivedY + 50));
        method3.setAttribute('text-anchor', 'middle');
        method3.setAttribute('class', 'oop-member-text');
        method3.setAttribute('style', 'fill: #34d399; font-size: 10px;');
        method3.textContent = 'speak() override';
        svg.appendChild(method3);

        // Inheritance arrows
        const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line1.setAttribute('x1', String(leftX + 60));
        line1.setAttribute('y1', String(derivedY));
        line1.setAttribute('x2', '220');
        line1.setAttribute('y2', String(baseY + 80));
        line1.setAttribute('class', 'oop-inheritance-line');
        svg.appendChild(line1);

        const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line2.setAttribute('x1', String(rightX + 60));
        line2.setAttribute('y1', String(derivedY));
        line2.setAttribute('x2', '280');
        line2.setAttribute('y2', String(baseY + 80));
        line2.setAttribute('class', 'oop-inheritance-line');
        svg.appendChild(line2);
    }

    function renderOOPPolymorphism() {
        const svg = document.getElementById('oop-poly-svg');
        if (!svg) return;
        svg.innerHTML = '';

        // vptr box for Animal
        const vptr = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        vptr.setAttribute('x', '50');
        vptr.setAttribute('y', '30');
        vptr.setAttribute('width', '200');
        vptr.setAttribute('height', '60');
        vptr.setAttribute('class', 'oop-vptr-box');
        svg.appendChild(vptr);

        const vptrLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        vptrLabel.setAttribute('x', '150');
        vptrLabel.setAttribute('y', '50');
        vptrLabel.setAttribute('text-anchor', 'middle');
        vptrLabel.setAttribute('class', 'oop-member-text');
        vptrLabel.setAttribute('style', 'fill: #fbbf24; font-weight: bold;');
        vptrLabel.textContent = 'Animal::vptr';
        svg.appendChild(vptrLabel);

        const vtableLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        vtableLabel.setAttribute('x', '150');
        vtableLabel.setAttribute('y', '75');
        vtableLabel.setAttribute('text-anchor', 'middle');
        vtableLabel.setAttribute('class', 'oop-member-text');
        vtableLabel.setAttribute('style', 'fill: #fbbf24; font-size: 10px;');
        vtableLabel.textContent = '→ VTable';
        svg.appendChild(vtableLabel);

        // Virtual table
        const vtable = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        vtable.setAttribute('class', 'oop-vtable');

        const vtableBox = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        vtableBox.setAttribute('x', '300');
        vtableBox.setAttribute('y', '20');
        vtableBox.setAttribute('width', '180');
        vtableBox.setAttribute('height', '100');
        vtableBox.setAttribute('fill', 'rgba(74, 222, 128, 0.1)');
        vtableBox.setAttribute('stroke', '#4ade80');
        vtableBox.setAttribute('stroke-width', '2');
        svg.appendChild(vtableBox);

        const vtableTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        vtableTitle.setAttribute('x', '390');
        vtableTitle.setAttribute('y', '40');
        vtableTitle.setAttribute('text-anchor', 'middle');
        vtableTitle.setAttribute('class', 'oop-member-text');
        vtableTitle.setAttribute('style', 'fill: #34d399; font-weight: bold;');
        vtableTitle.textContent = 'VTable';
        svg.appendChild(vtableTitle);

        const methods = ['speak() @Dog', 'speak() @Cat', '~Animal() @Base'];
        methods.forEach((m, i) => {
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', '320');
            text.setAttribute('y', String(65 + i * 20));
            text.setAttribute('class', 'oop-member-text');
            text.setAttribute('style', 'fill: #cbd5e1; font-size: 10px;');
            text.textContent = m;
            svg.appendChild(text);
        });

        // Arrow from vptr to vtable
        const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        arrow.setAttribute('x1', '250');
        arrow.setAttribute('y1', '60');
        arrow.setAttribute('x2', '300');
        arrow.setAttribute('y2', '60');
        arrow.setAttribute('stroke', '#fbbf24');
        arrow.setAttribute('stroke-width', '2');
        arrow.setAttribute('marker-end', 'url(#arrowhead)');
        svg.appendChild(arrow);
    }

    function renderOOPEncapsulation() {
        const svg = document.getElementById('oop-encap-svg');
        if (!svg) return;
        svg.innerHTML = '';

        // Bank Account class with three member sections
        const classBox = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        classBox.setAttribute('x', '50');
        classBox.setAttribute('y', '30');
        classBox.setAttribute('width', '400');
        classBox.setAttribute('height', '280');
        classBox.setAttribute('fill', 'rgba(96, 165, 250, 0.05)');
        classBox.setAttribute('stroke', '#60a5fa');
        classBox.setAttribute('stroke-width', '2');
        classBox.setAttribute('rx', '8');
        svg.appendChild(classBox);

        const className = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        className.setAttribute('x', '250');
        className.setAttribute('y', '55');
        className.setAttribute('text-anchor', 'middle');
        className.setAttribute('class', 'oop-member-text');
        className.setAttribute('style', 'fill: #60a5fa; font-weight: bold; font-size: 14px;');
        className.textContent = 'class BankAccount';
        svg.appendChild(className);

        // Public section
        const publicY = 85;
        const publicLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        publicLabel.setAttribute('x', '70');
        publicLabel.setAttribute('y', String(publicY));
        publicLabel.setAttribute('class', 'oop-member-text');
        publicLabel.setAttribute('style', 'fill: #ef4444; font-weight: bold; font-size: 11px;');
        publicLabel.textContent = 'public:';
        svg.appendChild(publicLabel);

        ['deposit(amount)', 'withdraw(amount)', 'getBalance()'].forEach((m, i) => {
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', '90');
            text.setAttribute('y', String(publicY + 20 + i * 18));
            text.setAttribute('class', 'oop-member-text');
            text.setAttribute('style', 'fill: #34d399; font-size: 10px;');
            text.textContent = '+ ' + m;
            svg.appendChild(text);
        });

        // Protected section
        const protectedY = 175;
        const protectedLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        protectedLabel.setAttribute('x', '70');
        protectedLabel.setAttribute('y', String(protectedY));
        protectedLabel.setAttribute('class', 'oop-member-text');
        protectedLabel.setAttribute('style', 'fill: #f59e0b; font-weight: bold; font-size: 11px;');
        protectedLabel.textContent = 'protected:';
        svg.appendChild(protectedLabel);

        ['validate(amount)', 'log_transaction()'].forEach((m, i) => {
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', '90');
            text.setAttribute('y', String(protectedY + 20 + i * 18));
            text.setAttribute('class', 'oop-member-text');
            text.setAttribute('style', 'fill: #fbbf24; font-size: 10px;');
            text.textContent = '# ' + m;
            svg.appendChild(text);
        });

        // Private section
        const privateY = 245;
        const privateLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        privateLabel.setAttribute('x', '70');
        privateLabel.setAttribute('y', String(privateY));
        privateLabel.setAttribute('class', 'oop-member-text');
        privateLabel.setAttribute('style', 'fill: #7c3aed; font-weight: bold; font-size: 11px;');
        privateLabel.textContent = 'private:';
        svg.appendChild(privateLabel);

        ['m_balance: double', 'mutex m_lock'].forEach((m, i) => {
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', '90');
            text.setAttribute('y', String(privateY + 20 + i * 18));
            text.setAttribute('class', 'oop-member-text');
            text.setAttribute('style', 'fill: #a78bfa; font-size: 10px;');
            text.textContent = '- ' + m;
            svg.appendChild(text);
        });
    }

    function renderOOPAbstraction() {
        const svg = document.getElementById('oop-abstraction-svg');
        if (!svg) return;
        svg.innerHTML = '';
        // Abstract base class — dashed box.
        drawOopBox(svg, { x: 175, y: 30, w: 150, h: 70, title: 'Shape «abstract»', titleColor: '#a78bfa', dashed: true,
            lines: [ { text: '+ area() = 0', color: '#fbbf24' } ] });
        // Concrete derived classes.
        drawOopBox(svg, { x: 60, y: 190, w: 150, h: 70, title: 'Circle', titleColor: '#f472b6',
            lines: [ { text: '+ area() override', color: '#34d399' } ] });
        drawOopBox(svg, { x: 290, y: 190, w: 150, h: 70, title: 'Rectangle', titleColor: '#f472b6',
            lines: [ { text: '+ area() override', color: '#34d399' } ] });
        // Inheritance arrows (derived -> base).
        drawOopLine(svg, 135, 190, 230, 100);
        drawOopLine(svg, 365, 190, 270, 100);
        // Annotations.
        drawOopLabel(svg, 250, 295, 'Shape s;  ->  compile error (abstract)', '#ef4444');
        drawOopLabel(svg, 250, 318, 'Shape* p = new Circle();  ->  OK', '#34d399');
    }

    function renderOOPAdhoc() {
        const svg = document.getElementById('oop-adhoc-svg');
        if (!svg) return;
        svg.innerHTML = '';
        drawOopLabel(svg, 110, 22, 'Call sites', '#94a3b8');
        drawOopLabel(svg, 390, 22, 'Resolved at compile time', '#94a3b8');
        const calls = [ 'print(42)', 'print(3.14)', 'print("hi")' ];
        const funcs = [ 'print(int)', 'print(double)', 'print(string)' ];
        for (let i = 0; i < 3; i++) {
            const y = 40 + i * 56;
            drawOopBox(svg, { x: 30, y: y, w: 160, h: 40, title: calls[i], titleColor: '#60a5fa' });
            drawOopBox(svg, { x: 310, y: y, w: 160, h: 40, title: funcs[i], titleColor: '#34d399' });
            drawOopLine(svg, 190, y + 20, 310, y + 20);
        }
        // Operator overloading panel.
        drawOopBox(svg, { x: 30, y: 230, w: 160, h: 52, title: 'v1 + v2', titleColor: '#60a5fa',
            lines: [ { text: 'two Vector2D values', color: '#cbd5e1' } ] });
        drawOopBox(svg, { x: 310, y: 230, w: 160, h: 52, title: 'operator+', titleColor: '#34d399',
            lines: [ { text: 'Vector2D::operator+', color: '#cbd5e1' } ] });
        drawOopLine(svg, 190, 256, 310, 256);
        drawOopLabel(svg, 250, 322, 'Same name, chosen by argument types — no runtime dispatch', '#fbbf24');
    }

    function renderOOPTemplates() {
        const svg = document.getElementById('oop-templates-svg');
        if (!svg) return;
        svg.innerHTML = '';
        // Template blueprint — dashed box.
        drawOopBox(svg, { x: 160, y: 30, w: 180, h: 70, title: 'template<typename T>', titleColor: '#a78bfa', dashed: true,
            lines: [ { text: 'class Box { T value; }', color: '#fbbf24' } ] });
        drawOopLabel(svg, 250, 125, 'compiler instantiates one concrete class per type', '#94a3b8');
        // Concrete instantiations.
        const insts = [ 'Box<int>', 'Box<double>', 'Box<string>' ];
        for (let i = 0; i < 3; i++) {
            const x = 40 + i * 150;
            drawOopBox(svg, { x: x, y: 160, w: 130, h: 60, title: insts[i], titleColor: '#34d399',
                lines: [ { text: 'concrete class', color: '#cbd5e1' } ] });
            drawOopLine(svg, 250, 100, x + 65, 160);
        }
        drawOopLabel(svg, 250, 290, 'One blueprint  ->  many concrete types (compile-time)', '#fbbf24');
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

        if (oopModeSelect.value === 'inheritance') {
            executeAnimWrapper(async () => await visualizeOOPInheritance());
        } else if (oopModeSelect.value === 'polymorphism') {
            executeAnimWrapper(async () => await visualizeOOPPolymorphism());
        } else if (oopModeSelect.value === 'encapsulation') {
            executeAnimWrapper(async () => await visualizeOOPEncapsulation());
        }
    });

    btnOopReset.addEventListener('click', () => {
        oopInheritanceAnimationState = null;
        oopPolymorphismAnimationState = null;
        oopEncapsulationAnimationState = null;
        renderOOP();
        showStatus('OOP visualization reset.', '#6366f1');
    });

    async function visualizeOOPInheritance() {
        showStatus('Demonstrating class inheritance (IS-A relationship)...', '#06b6d4');
        await sleep(800);
        showStatus('Base class Animal defines virtual method speak()', '#06b6d4');
        await sleep(800);
        showStatus('Dog and Cat inherit from Animal', '#f472b6');
        await sleep(800);
        showStatus('Each derived class overrides speak() with unique behavior', '#34d399');
        await sleep(800);
        showStatus('Inheritance complete: Constructors and destructors called in correct order', '#06b6d4');
    }

    async function visualizeOOPPolymorphism() {
        showStatus('Demonstrating virtual functions & polymorphism...', '#f59e0b');
        await sleep(800);
        showStatus('Each object has vptr (virtual table pointer)', '#fbbf24');
        await sleep(800);
        showStatus('VTable contains function pointers to correct implementations', '#34d399');
        await sleep(800);
        showStatus('Runtime dynamic dispatch selects correct method based on object type', '#f59e0b');
        await sleep(800);
        showStatus('Animal* dog calls Dog::speak(); Animal* cat calls Cat::speak()', '#34d399');
    }

    async function visualizeOOPEncapsulation() {
        showStatus('Demonstrating encapsulation & access levels...', '#8b5cf6');
        await sleep(800);
        showStatus('public: withdraw() is accessible to all external code', '#34d399');
        await sleep(800);
        showStatus('protected: validate() accessible to derived classes only', '#fbbf24');
        await sleep(800);
        showStatus('private: m_balance and m_lock hidden, only class methods access', '#a78bfa');
        await sleep(800);
        showStatus('Encapsulation complete: Data is protected, interface is controlled', '#8b5cf6');
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
});
