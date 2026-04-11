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
    'tree_bst.cpp': 'codeTreeBST',
    'tree_avl.cpp': 'codeTreeAVL',
    'tree_rb.cpp': 'codeTreeRB',
    'tree_splay.cpp': 'codeTreeSplay',
    'stack_array.cpp': 'codeArray',
    'stack_linkedlist.cpp': 'codeLinkedList',
    'queue.cpp': 'codeQueue',
    'graph.cpp': 'codeGraph',
    'list_array.cpp': 'codeListArray',
    'list_linked.cpp': 'codeListLinked',
    'hash_chaining.cpp': 'codeHashChain',
    'hash_open_address.cpp': 'codeHashOpen',
    'hash_bucket.cpp': 'codeHashBucket'
};

let out = '// Auto-generated code DB for visualization\n';
for (const [file, varName] of Object.entries(mappings)) {
    if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        out += `const ${varName} = \`${content.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;\n\n`;
    }
}



fs.writeFileSync('code_db.js', out);
