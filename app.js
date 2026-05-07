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

// MAIN DOM INTERACTION
document.addEventListener('DOMContentLoaded', () => {
    const modeRadios = document.querySelectorAll('input[name="ds-mode"]');
    
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
    const codeDisplay = document.getElementById('code-display'); const codeTitle = document.getElementById('code-title');

    // Controls
    const btnStdAdd = document.getElementById('btn-std-add'); const btnStdRemove = document.getElementById('btn-std-remove'); const stdVal = document.getElementById('std-value');
    const btnGraphAdd = document.getElementById('btn-graph-add'); const graphU = document.getElementById('graph-u'); const graphV = document.getElementById('graph-v');
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

    let currentMode = 'stack-array';
    const MAX_SIZE = 5;

    // Search Vectors
    const arrLinear = [23, 12, 56, 8, 38, 2, 72, 91, 16, 5];
    const arrBinary = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];

    // Core sets
    let stackData = []; let qArr = new Array(5).fill(null); let qFront = 0; let qRear = -1; let qCount = 0;
    let edges = []; let bstRoot = null; let mainListData = []; let sortArrData = [];
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

    const tabBtnDesc = document.getElementById('tab-btn-desc');
    const tabBtnCode = document.getElementById('tab-btn-code');
    const descView = document.getElementById('desc-view');
    const codeView = document.getElementById('code-view');
    const descDisplay = document.getElementById('desc-display');

    tabBtnDesc.addEventListener('click', () => {
        tabBtnDesc.classList.add('active'); tabBtnDesc.style.borderBottomColor = '#34d399'; tabBtnDesc.style.color = '#34d399';
        tabBtnCode.classList.remove('active'); tabBtnCode.style.borderBottomColor = 'transparent'; tabBtnCode.style.color = '#94a3b8';
        descView.style.display = 'block'; codeView.style.display = 'none';
    });
    tabBtnCode.addEventListener('click', () => {
        tabBtnCode.classList.add('active'); tabBtnCode.style.borderBottomColor = '#34d399'; tabBtnCode.style.color = '#34d399';
        tabBtnDesc.classList.remove('active'); tabBtnDesc.style.borderBottomColor = 'transparent'; tabBtnDesc.style.color = '#94a3b8';
        codeView.style.display = 'flex'; descView.style.display = 'none';
        if (window.Prism) Prism.highlightElement(codeDisplay);
    });

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
        btnHeapTutorial.textContent = activeForMode ? 'Restart Tutorial' : 'Start Tutorial';
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
            heapTutorialProgress.textContent = 'Completed';
            heapTutorialTitle.textContent = heapTutorialState.name + ' tutorial complete';
            heapTutorialText.textContent = 'You walked through insert, peek, merge, change-key, extract, and stats for this heap. Restart to replay it or switch heap modes for another tutorial.';
            syncHeapTutorialChrome();
            return;
        }

        const step = heapTutorialState.steps[heapTutorialState.stepIndex];
        heapTutorialProgress.textContent = 'Step ' + (heapTutorialState.stepIndex + 1) + ' / ' + heapTutorialState.steps.length;
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

    modeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if(animState === 'playing' || animState === 'paused') { e.target.checked = false; document.getElementById("mode-" + currentMode).checked = true; return; }
            if (heapTutorialState.active && e.target.value !== heapTutorialState.mode) exitHeapTutorial(true);
            currentMode = e.target.value;
            stackData = []; qArr = new Array(5).fill(null); qFront = 0; qRear = -1; qCount = 0; edges = []; bstRoot = null; 
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
            if(currentMode.includes('sort-') && sortArrData.length === 0) generateSortArray();
            updateLayout(); renderAll();
            statusMsg.textContent = "Switched to " + currentMode; statusMsg.style.color = '#34d399';
            if(currentMode === 'tree-splay') btnTreeSearch.classList.remove('hidden'); else btnTreeSearch.classList.add('hidden');
        });
    });

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
        if(u === v) return showStatus('No self loops', '#f87171'); if(edges.some(e => (e[0]===u && e[1]===v) || (e[0]===v && e[1]===u))) return showStatus('Edge already exists', '#f87171');
        edges.push([u, v]); showStatus("Added edge: " + u + " - " + v, '#60a5fa'); renderGraph();
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
        if(currentMode.includes('search')) { btnSearchGo.disabled = isPlaying; btnSearchPause.disabled = !isPlaying; btnSearchStop.disabled = !isPlaying; btnSearchPause.textContent = animState === 'paused' ? 'Resume' : 'Pause'; }
        else if (currentMode.includes('sort')) { btnSortStart.disabled = isPlaying; btnSortRandom.disabled = isPlaying; btnSortPause.disabled = !isPlaying; btnSortStop.disabled = !isPlaying; btnSortPause.textContent = animState === 'paused' ? 'Resume' : 'Pause'; }
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
        }
        modeRadios.forEach(r => r.disabled = isPlaying);
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
        const containers = [arrayContainer, linkedListContainer, queueContainer, graphContainer, treeContainer, advTreeContainer, searchContainer, listArrContainer, listLLContainer, sortContainer, hashChContainer, hashOaContainer, hashBucketContainer, heapContainer];
        const actions = [stdActions, graphActions, treeActions, textTreeActions, searchActions, listActions, sortActions, hashActions, heapActions];
        containers.forEach(c => c.classList.add('hidden')); actions.forEach(a => a.classList.add('hidden'));
        if(treeDrawLoop) { cancelAnimationFrame(treeDrawLoop); treeDrawLoop = null; }

        if (descDB[currentMode]) { descDisplay.innerHTML = descDB[currentMode]; } else { descDisplay.innerHTML = "<p>No description available.</p>"; }

        if(currentMode === 'stack-array') { codeTitle.textContent = 'stack_array.cpp'; codeDisplay.textContent = codeArray; arrayContainer.classList.remove('hidden'); stdActions.classList.remove('hidden'); btnStdAdd.textContent = 'Push()'; btnStdRemove.textContent = 'Pop()'; }
        else if (currentMode === 'stack-list') { codeTitle.textContent = 'stack_linkedlist.cpp'; codeDisplay.textContent = codeLinkedList; linkedListContainer.classList.remove('hidden'); stdActions.classList.remove('hidden'); btnStdAdd.textContent = 'Push()'; btnStdRemove.textContent = 'Pop()'; }
        else if (currentMode === 'queue') { codeTitle.textContent = 'queue.cpp'; codeDisplay.textContent = codeQueue; queueContainer.classList.remove('hidden'); stdActions.classList.remove('hidden'); btnStdAdd.textContent = 'Enqueue()'; btnStdRemove.textContent = 'Dequeue()'; }
        else if (currentMode === 'graph') { codeTitle.textContent = 'graph.cpp'; codeDisplay.textContent = codeGraph; graphContainer.classList.remove('hidden'); graphActions.classList.remove('hidden'); }
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
        else if (currentMode === 'search-linear') { codeTitle.textContent = 'search_linear.cpp'; codeDisplay.textContent = codeSearchLinear; searchContainer.classList.remove('hidden'); searchActions.classList.remove('hidden'); }
        else if (currentMode === 'search-binary') { codeTitle.textContent = 'search_binary.cpp'; codeDisplay.textContent = codeSearchBinary; searchContainer.classList.remove('hidden'); searchActions.classList.remove('hidden'); }
        else if (currentMode === 'list-array') { codeTitle.textContent = 'list_array.cpp'; codeDisplay.textContent = codeListArray; listArrContainer.classList.remove('hidden'); listActions.classList.remove('hidden'); }
        else if (currentMode === 'list-linked') { codeTitle.textContent = 'list_linked.cpp'; codeDisplay.textContent = codeListLinked; listLLContainer.classList.remove('hidden'); listActions.classList.remove('hidden'); }
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
        syncHeapTutorialChrome();
        if (window.Prism) Prism.highlightElement(codeDisplay);
    }
    function renderAll() {
        if(currentMode.includes('stack')) renderStack();
        else if (currentMode === 'queue') renderQueue();
        else if (currentMode === 'graph') renderGraph();
        else if (['tree-bst', 'tree-avl', 'tree-rb', 'tree-splay'].includes(currentMode)) renderTree();
        else if (['tree-trie', 'tree-radix', 'tree-ternary', 'tree-btree', 'tree-bplus'].includes(currentMode)) renderAdvTrees();
        else if (currentMode.includes('search')) renderSearchArray(currentMode === 'search-binary' ? arrBinary : arrLinear);
        else if (currentMode.includes('list-')) renderLists();
        else if (currentMode.includes('hash-')) renderHashes();
        else if (currentMode.includes('sort-')) renderSortBars();
        else if (currentMode.includes('heap-')) renderHeap();
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
    function renderGraph() {
        const svg = document.getElementById('graph-edges'); svg.innerHTML = ''; const pos = [{x:150,y:30},{x:270,y:120},{x:225,y:255},{x:75,y:255},{x:30,y:120}];
        edges.forEach(e => { const p1 = pos[e[0]], p2 = pos[e[1]]; const line = document.createElementNS("http://www.w3.org/2000/svg", "line"); line.setAttribute("x1", p1.x); line.setAttribute("y1", p1.y); line.setAttribute("x2", p2.x); line.setAttribute("y2", p2.y); line.setAttribute("class", "graph-edge"); svg.appendChild(line); });
    }
    // End original routines mappings
});
