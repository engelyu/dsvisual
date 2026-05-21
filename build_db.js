const fs = require('fs');

const mappings = {
    'search_linear.cpp': 'codeSearchLinear',
    'search_binary.cpp': 'codeSearchBinary',
    'sort_bubble.cpp': 'codeSortBubble',
    'sort_selection.cpp': 'codeSortSelect',
    'sort_insertion.cpp': 'codeSortInsert',
    'sort_quick.cpp': 'codeSortQuick',
    'sort_merge.cpp': 'codeSortMerge',
    'sort_shell.cpp': 'codeSortShell',
    'sort_bucket.cpp': 'codeSortBucket',
    'sort_counting.cpp': 'codeSortCounting',
    'sort_radix.cpp': 'codeSortRadix',
    'sort_heap.cpp': 'codeSortHeap',
    'sort_shaker.cpp': 'codeSortShaker',
    'tree_bst.cpp': 'codeTreeBST',
    'tree_avl.cpp': 'codeTreeAVL',
    'tree_rb.cpp': 'codeTreeRB',
    'tree_splay.cpp': 'codeTreeSplay',
    'tree_dsu.cpp':        'codeTreeDSU',
    'stack_array.cpp': 'codeArray',
    'stack_linkedlist.cpp': 'codeLinkedList',
    'queue.cpp': 'codeQueue',
    'graph.cpp': 'codeGraph',
    'graph_adjlist.cpp':   'codeGraphAdjlist',
    'graph_bfs.cpp':       'codeGraphBFS',
    'graph_dfs.cpp':       'codeGraphDFS',
    'graph_traversal.cpp': 'codeGraphTraversal',
    'graph_kruskal.cpp': 'codeGraphKruskal',
    'graph_dijkstra.cpp': 'codeGraphDijkstra',
    'graph_topo.cpp': 'codeGraphTopo',
    'list_array.cpp': 'codeListArray',
    'list_linked.cpp': 'codeListLinked',
    'hash_chaining.cpp': 'codeHashChain',
    'hash_open_address.cpp': 'codeHashOpen',
    'hash_bucket.cpp': 'codeHashBucket',
    'heap_binary.cpp': 'codeHeapBinary',
    'heap_binomial.cpp': 'codeHeapBinomial',
    'heap_fibonacci.cpp': 'codeHeapFibonacci',
    'heap_leftist.cpp': 'codeHeapLeftist',
    'heap_skew.cpp': 'codeHeapSkew',
    'heap_dary.cpp': 'codeHeapDary',
    'heap_pairing.cpp': 'codeHeapPairing',
    'tree_trie.cpp': 'codeTreeTrie',
    'tree_radix.cpp': 'codeTreeRadix',
    'tree_ternary.cpp': 'codeTreeTST',
    'tree_btree.cpp': 'codeTreeBTree',
    'tree_bplus.cpp': 'codeTreeBPlus',
    'oop_inheritance.cpp': 'codeOOPInheritance',
    'oop_polymorphism.cpp': 'codeOOPPolymorphism',
    'oop_encapsulation.cpp': 'codeOOPEncapsulation',
    'oop_abstraction.cpp': 'codeOOPAbstraction',
    'oop_adhoc.cpp': 'codeOOPAdhoc',
    'oop_templates.cpp': 'codeOOPTemplates',
    'pattern_singleton.cpp': 'codePatternSingleton',
    'pattern_factory.cpp': 'codePatternFactory',
    'pattern_adapter.cpp': 'codePatternAdapter',
    'pattern_decorator.cpp': 'codePatternDecorator',
    'pattern_observer.cpp': 'codePatternObserver',
    'pattern_strategy.cpp': 'codePatternStrategy',
    'deque.cpp': 'codeDeque',
    'search_kmp.cpp': 'codeSearchKMP',
    'search_bm.cpp': 'codeSearchBM',
    'search_rk.cpp': 'codeSearchRK',
    'search_strcompare.cpp': 'codeSearchStrCompare'
};

let out = '// Auto-generated code DB for visualization\n';
for (const [file, varName] of Object.entries(mappings)) {
    if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        out += `const ${varName} = \`${content.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;\n\n`;
    }
}



fs.writeFileSync('code_db.js', out);
