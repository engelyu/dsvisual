const codeArray = `#include <iostream>
using namespace std;
#define MAX_SIZE 5

class StackArray {
// ...
};`;

const codeLinkedList = `#include <iostream>
using namespace std;
struct Node { int data; Node* next; };

class StackLinkedList {
// ...
};`;

const codeQueue = `#include <iostream>
using namespace std;
// ...
};`;

const codeGraph = `#include <iostream>
#include <vector>
using namespace std;
// ...
};`;

const codeTree = `#include <iostream>
using namespace std;
// ...
};`;

const codeSearchLinear = `#include <iostream>
using namespace std;
// ...
}`;

const codeSearchBinary = `#include <iostream>
using namespace std;
// ...
}`;

const codeListArray = `#include <iostream>
using namespace std;

class ArrayList {
private:
    int* arr;
    int capacity;
    int size;

    void resize() {
        capacity *= 2;
        int* newArr = new int[capacity];
        for (int i = 0; i < size; i++) newArr[i] = arr[i];
        delete[] arr;
        arr = newArr;
    }

public:
    ArrayList(int cap = 5) {
        capacity = cap;
        size = 0;
        arr = new int[capacity];
    }

    void insertAt(int index, int value) {
        if (index < 0 || index > size) return;
        if (size == capacity) resize();
        for (int i = size; i > index; i--) {
            arr[i] = arr[i - 1]; // shift right
        }
        arr[index] = value;
        size++;
    }

    void removeAt(int index) {
        if (index < 0 || index >= size) return;
        for (int i = index; i < size - 1; i++) {
            arr[i] = arr[i + 1]; // shift left
        }
        size--;
    }
};`;

const codeListLinked = `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class LinkedList {
private:
    Node* head;

public:
    LinkedList() { head = nullptr; }

    void insertAt(int index, int value) {
        if (index < 0) return;
        Node* newNode = new Node(value);
        if (index == 0) {
            newNode->next = head; head = newNode; return;
        }
        Node* curr = head;
        for (int i = 0; curr != nullptr && i < index - 1; i++) {
            curr = curr->next;
        }
        if (curr == nullptr) return; 
        newNode->next = curr->next;
        curr->next = newNode;
    }

    void removeAt(int index) {
        if (head == nullptr || index < 0) return;
        if (index == 0) {
            Node* temp = head; head = head->next; delete temp; return;
        }
        Node* curr = head;
        for (int i = 0; curr != nullptr && i < index - 1; i++) {
            curr = curr->next;
        }
        if (curr == nullptr || curr->next == nullptr) return;
        Node* temp = curr->next; curr->next = temp->next; delete temp;
    }
};`;

class VizTreeNode {
    constructor(val, x, y, dx) { this.val = val; this.left = null; this.right = null; this.x = x; this.y = y; this.dx = dx; }
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

document.addEventListener('DOMContentLoaded', () => {
    const modeRadios = document.querySelectorAll('input[name="ds-mode"]');
    
    const arrayContainer = document.getElementById('array-container');
    const linkedListContainer = document.getElementById('linkedlist-container');
    const queueContainer = document.getElementById('queue-container');
    const graphContainer = document.getElementById('graph-container');
    const treeContainer = document.getElementById('tree-container');
    const searchContainer = document.getElementById('search-container');
    const listArrContainer = document.getElementById('list-arr-container');
    const listLLContainer = document.getElementById('list-ll-container');
    
    const stdActions = document.getElementById('std-actions');
    const graphActions = document.getElementById('graph-actions');
    const treeActions = document.getElementById('tree-actions');
    const searchActions = document.getElementById('search-actions');
    const listActions = document.getElementById('list-actions');

    const statusMsg = document.getElementById('status-message');
    const codeDisplay = document.getElementById('code-display');
    const codeTitle = document.getElementById('code-title');

    const btnStdAdd = document.getElementById('btn-std-add');
    const btnStdRemove = document.getElementById('btn-std-remove');
    const stdVal = document.getElementById('std-value');

    const btnGraphAdd = document.getElementById('btn-graph-add');
    const graphU = document.getElementById('graph-u');
    const graphV = document.getElementById('graph-v');

    const btnTreeAdd = document.getElementById('btn-tree-add');
    const treeVal = document.getElementById('tree-val');

    const btnSearchGo = document.getElementById('btn-search-go');
    const btnSearchReset = document.getElementById('btn-search-reset');
    const searchVal = document.getElementById('search-val');

    const btnListAdd = document.getElementById('btn-list-add');
    const btnListRemove = document.getElementById('btn-list-remove');
    const listIdx = document.getElementById('list-idx');
    const listValInput = document.getElementById('list-val');

    let currentMode = 'stack-array';
    const MAX_SIZE = 5;

    const arrLinear = [23, 12, 56, 8, 38, 2, 72, 91, 16, 5];
    const arrBinary = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
    let isSearching = false;

    let stackData = [];
    let qArr = new Array(5).fill(null);
    let qFront = 0; let qRear = -1; let qCount = 0;
    let edges = [];
    let bstRoot = null;
    let mainListData = []; 

    updateLayout();

    modeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if(isSearching) return;
            currentMode = e.target.value;
            stackData = []; qArr = new Array(5).fill(null); qFront = 0; qRear = -1; qCount = 0; edges = []; bstRoot = null; 
            if(currentMode === 'list-array' || currentMode === 'list-linked') mainListData = [];
            updateLayout();
            renderAll();
            statusMsg.textContent = "Switched to " + currentMode;
            statusMsg.style.color = '#34d399';
        });
    });

    btnStdAdd.addEventListener('click', () => {
        const val = parseInt(stdVal.value);
        if(isNaN(val)) return showStatus('Enter a valid number.', '#f87171');
        if(currentMode.includes('stack')) {
            if(currentMode === 'stack-array' && stackData.length >= MAX_SIZE) return showStatus('Stack Overflow!', '#f87171');
            stackData.push(val); showStatus("Pushed " + val, '#60a5fa'); renderStack('push');
        } else if (currentMode === 'queue') {
            if (qCount >= MAX_SIZE) return showStatus('Queue Overflow!', '#f87171');
            qRear = (qRear + 1) % MAX_SIZE; qArr[qRear] = val; qCount++;
            showStatus("Enqueued " + val, '#60a5fa'); renderQueue('enqueue');
        }
        stdVal.value = Math.floor(Math.random() * 100);
    });

    btnStdRemove.addEventListener('click', () => {
        if(currentMode.includes('stack')) {
            if(stackData.length === 0) return showStatus('Stack Underflow!', '#f87171');
            const popped = stackData.pop(); showStatus("Popped " + popped, '#ec4899'); renderStack('pop');
        } else if (currentMode === 'queue') {
            if(qCount === 0) return showStatus('Queue Underflow!', '#f87171');
            const deq = qArr[qFront]; qArr[qFront] = null; qFront = (qFront + 1) % MAX_SIZE; qCount--;
            showStatus("Dequeued " + deq, '#ec4899'); renderQueue('dequeue');
        }
    });

    btnGraphAdd.addEventListener('click', () => {
        const u = parseInt(graphU.value); const v = parseInt(graphV.value);
        if(isNaN(u) || isNaN(v) || u<0 || u>4 || v<0 || v>4) return showStatus('Invalid Nodes (0-4)', '#f87171');
        if(u === v) return showStatus('No self loops', '#f87171');
        if(edges.some(e => (e[0]===u && e[1]===v) || (e[0]===v && e[1]===u))) return showStatus('Edge already exists', '#f87171');
        edges.push([u, v]); showStatus("Added edge: " + u + " - " + v, '#60a5fa'); renderGraph();
    });

    btnTreeAdd.addEventListener('click', () => {
        const val = parseInt(treeVal.value);
        if(isNaN(val)) return showStatus('Enter valid number.', '#f87171');
        function insertBST(node, v, x, y, dx) {
            if(!node) { showStatus("Inserted " + v, '#60a5fa'); return new VizTreeNode(v, x, y, dx); }
            if(v < node.val) node.left = insertBST(node.left, v, node.x - node.dx, node.y + 60, node.dx * 0.6);
            else if (v > node.val) node.right = insertBST(node.right, v, node.x + node.dx, node.y + 60, node.dx * 0.6);
            else showStatus(v + " already exists", '#f87171');
            return node;
        }
        bstRoot = insertBST(bstRoot, val, 200, 30, 90); treeVal.value = Math.floor(Math.random() * 100); renderTree();
    });

    btnSearchGo.addEventListener('click', async () => {
        if(isSearching) return;
        const target = parseInt(searchVal.value);
        if(isNaN(target)) return showStatus('Enter valid target.', '#f87171');
        isSearching = true; modeRadios.forEach(r => r.disabled = true);
        if (currentMode === 'search-linear') await runLinearSearch(target);
        else if (currentMode === 'search-binary') await runBinarySearch(target);
        isSearching = false; modeRadios.forEach(r => r.disabled = false);
    });

    btnSearchReset.addEventListener('click', () => {
        if(isSearching) return;
        renderSearchArray(currentMode === 'search-binary' ? arrBinary : arrLinear); showStatus("Array reset.", "#94a3b8");
    });

    // List Control Actions
    btnListAdd.addEventListener('click', () => {
        const i = parseInt(listIdx.value);
        const v = parseInt(listValInput.value);
        if(isNaN(i) || isNaN(v)) return showStatus('Invalid input', '#f87171');
        if(i < 0 || i > mainListData.length) return showStatus('Index out of bounds', '#f87171');
        mainListData.splice(i, 0, v);
        showStatus("Inserted " + v + " at index " + i, '#60a5fa');
        renderLists();
        listValInput.value = Math.floor(Math.random() * 100);
    });
    
    btnListRemove.addEventListener('click', () => {
        const i = parseInt(listIdx.value);
        if(isNaN(i)) return showStatus('Invalid input', '#f87171');
        if(i < 0 || i >= mainListData.length) return showStatus('Index out of bounds', '#f87171');
        const v = mainListData[i];
        mainListData.splice(i, 1);
        showStatus("Removed " + v + " from index " + i, '#ec4899');
        renderLists();
    });

    function showStatus(msg, color) { statusMsg.textContent = msg; statusMsg.style.color = color; }

    function updateLayout() {
        const containers = [arrayContainer, linkedListContainer, queueContainer, graphContainer, treeContainer, searchContainer, listArrContainer, listLLContainer];
        const actions = [stdActions, graphActions, treeActions, searchActions, listActions];
        containers.forEach(c => c.classList.add('hidden'));
        actions.forEach(a => a.classList.add('hidden'));

        if(currentMode === 'stack-array') {
            codeTitle.textContent = 'stack_array.cpp'; codeDisplay.textContent = codeArray;
            arrayContainer.classList.remove('hidden'); stdActions.classList.remove('hidden');
            btnStdAdd.textContent = 'Push()'; btnStdRemove.textContent = 'Pop()';
        } else if (currentMode === 'stack-list') {
            codeTitle.textContent = 'stack_linkedlist.cpp'; codeDisplay.textContent = codeLinkedList;
            linkedListContainer.classList.remove('hidden'); stdActions.classList.remove('hidden');
            btnStdAdd.textContent = 'Push()'; btnStdRemove.textContent = 'Pop()';
        } else if (currentMode === 'queue') {
            codeTitle.textContent = 'queue.cpp'; codeDisplay.textContent = codeQueue;
            queueContainer.classList.remove('hidden'); stdActions.classList.remove('hidden');
            btnStdAdd.textContent = 'Enqueue()'; btnStdRemove.textContent = 'Dequeue()';
        } else if (currentMode === 'graph') {
            codeTitle.textContent = 'graph.cpp'; codeDisplay.textContent = codeGraph;
            graphContainer.classList.remove('hidden'); graphActions.classList.remove('hidden');
        } else if (currentMode === 'tree') {
            codeTitle.textContent = 'tree.cpp'; codeDisplay.textContent = codeTree;
            treeContainer.classList.remove('hidden'); treeActions.classList.remove('hidden');
        } else if (currentMode === 'search-linear') {
            codeTitle.textContent = 'search_linear.cpp'; codeDisplay.textContent = codeSearchLinear;
            searchContainer.classList.remove('hidden'); searchActions.classList.remove('hidden');
        } else if (currentMode === 'search-binary') {
            codeTitle.textContent = 'search_binary.cpp'; codeDisplay.textContent = codeSearchBinary;
            searchContainer.classList.remove('hidden'); searchActions.classList.remove('hidden');
        } else if (currentMode === 'list-array') {
            codeTitle.textContent = 'list_array.cpp'; codeDisplay.textContent = codeListArray;
            listArrContainer.classList.remove('hidden'); listActions.classList.remove('hidden');
        } else if (currentMode === 'list-linked') {
            codeTitle.textContent = 'list_linked.cpp'; codeDisplay.textContent = codeListLinked;
            listLLContainer.classList.remove('hidden'); listActions.classList.remove('hidden');
        }
        if (window.Prism) Prism.highlightElement(codeDisplay);
    }

    function renderAll() {
        if(currentMode.includes('stack')) renderStack();
        else if (currentMode === 'queue') renderQueue();
        else if (currentMode === 'graph') renderGraph();
        else if (currentMode === 'tree') renderTree();
        else if (currentMode.includes('search')) renderSearchArray(currentMode === 'search-binary' ? arrBinary : arrLinear);
        else if (currentMode.includes('list-')) renderLists();
    }

    function renderLists() {
        if (currentMode === 'list-array') {
            listArrContainer.innerHTML = '';
            mainListData.forEach((val, i) => {
                const s = document.createElement('div');
                s.className = 'la-slot';
                s.setAttribute('data-index', i);
                s.textContent = val;
                listArrContainer.appendChild(s);
            });
        } else if (currentMode === 'list-linked') {
            listLLContainer.innerHTML = '';
            mainListData.forEach((val, i) => {
                const w = document.createElement('div'); w.className = 'lll-node-wrapper';
                const n = document.createElement('div'); n.className = 'lll-node';
                n.innerHTML = "<div class='lll-data'>" + val + "</div><div class='lll-next'></div>";
                w.appendChild(n);
                if (i < mainListData.length - 1) {
                    const c = document.createElement('div'); c.className = 'lll-conn';
                    w.appendChild(c);
                }
                listLLContainer.appendChild(w);
            });
            if (mainListData.length > 0) {
                const n = document.createElement('div');
                n.style.padding = '0 10px'; n.style.color = '#f87171'; n.style.fontFamily = 'monospace';
                n.textContent = "NULL";
                listLLContainer.appendChild(n);
            }
        }
    }

    async function runLinearSearch(target) {
        renderSearchArray(arrLinear); showStatus('Starting Linear Search...', '#60a5fa');
        const lPtr = document.getElementById('ptr-l'); lPtr.classList.add('visible'); lPtr.textContent = 'i';
        for (let i = 0; i < arrLinear.length; i++) {
            const slot = document.getElementById('ss-' + i);
            lPtr.style.left = slot.offsetLeft + 'px';
            slot.classList.add('active');
            showStatus("Checking arr[" + i + "] == " + target, '#fcd34d');
            await sleep(800);
            if (arrLinear[i] === target) {
                slot.classList.remove('active'); slot.classList.add('found');
                showStatus("Found " + target + " at index " + i + "!", '#34d399'); return;
            } else {
                slot.classList.remove('active'); slot.classList.add('dim');
            }
        }
        showStatus(target + " not found in array.", '#f87171'); lPtr.classList.remove('visible');
    }

    async function runBinarySearch(target) {
        renderSearchArray(arrBinary); showStatus('Starting Binary Search...', '#60a5fa');
        const lPtr = document.getElementById('ptr-l'); const rPtr = document.getElementById('ptr-r'); const mPtr = document.getElementById('ptr-m');
        lPtr.classList.add('visible'); rPtr.classList.add('visible');
        let left = 0; let right = arrBinary.length - 1;
        while (left <= right) {
            const slotL = document.getElementById('ss-' + left); const slotR = document.getElementById('ss-' + right);
            lPtr.style.left = slotL.offsetLeft + 'px'; rPtr.style.left = slotR.offsetLeft + 'px';
            for(let i=0; i<arrBinary.length; i++) {
                const s = document.getElementById('ss-' + i);
                if(i < left || i > right) s.classList.add('dim');
            }
            await sleep(1000);
            let mid = Math.floor(left + (right - left) / 2);
            showStatus("L=" + left + ", R=" + right + " => M=" + mid, '#fcd34d');
            const slotM = document.getElementById('ss-' + mid);
            mPtr.style.left = slotM.offsetLeft + 'px'; mPtr.classList.add('visible'); slotM.classList.add('mid');
            await sleep(1200);
            if (arrBinary[mid] === target) {
                slotM.classList.remove('mid'); slotM.classList.add('found');
                showStatus("Found " + target + " at index " + mid + "!", '#34d399'); return;
            }
            if (arrBinary[mid] < target) {
                showStatus("arr[" + mid + "] < " + target + ". Ignore left half.", '#94a3b8'); left = mid + 1;
            } else {
                showStatus("arr[" + mid + "] > " + target + ". Ignore right half.", '#94a3b8'); right = mid - 1;
            }
            slotM.classList.remove('mid'); mPtr.classList.remove('visible'); await sleep(800);
        }
        showStatus(target + " not found in array.", '#f87171'); lPtr.classList.remove('visible'); rPtr.classList.remove('visible');
    }

    function renderSearchArray(arr) {
        const sa = document.getElementById('search-array'); const sp = document.getElementById('search-pointers');
        sa.innerHTML = ''; sp.innerHTML = '';
        arr.forEach((v, i) => {
            const slot = document.createElement('div'); slot.className = 's-slot'; slot.id = 'ss-' + i;
            slot.innerHTML = "<span>[" + i + "]</span>" + v; sa.appendChild(slot);
        });
        ['ptr-l', 'ptr-r', 'ptr-m'].forEach(cls => {
            const p = document.createElement('div'); p.className = 's-ptr ' + cls; p.id = cls;
            if(cls === 'ptr-l') p.textContent = 'L'; else if(cls === 'ptr-r') p.textContent = 'R'; else p.textContent = 'M';
            sp.appendChild(p);
        });
    }

    function renderStack(action) {
        if(currentMode === 'stack-array') {
            const slots = arrayContainer.querySelectorAll('.slot');
            slots.forEach(slot => { const ext = slot.querySelector('.item-block'); if(ext && action !== 'pop_animating') slot.removeChild(ext); });
            stackData.forEach((val, idx) => {
                const s = slots[4 - idx]; const blk = document.createElement('div');
                blk.className = 'item-block'; blk.textContent = val;
                if(action === 'push' && idx === stackData.length - 1) blk.classList.add('anim-push');
                s.appendChild(blk);
            });
            if(action === 'pop') {
                const s = slots[4 - stackData.length];
                if(s) {
                    const d = document.createElement('div'); d.className = 'item-block anim-pop'; d.textContent = "∅"; d.style.background = "#4b5563";
                    s.appendChild(d); setTimeout(() => { if(s.contains(d)) s.removeChild(d); }, 400);
                }
            }
        } else if (currentMode === 'stack-list') {
            const ns = document.getElementById('nodes-container'); ns.innerHTML = '';
            const rev = [...stackData].reverse();
            rev.forEach((val, index) => {
                const wrapper = document.createElement('div'); wrapper.className = 'll-node-wrapper';
                const node = document.createElement('div'); node.className = 'll-node';
                node.innerHTML = "<div class='ll-data'>" + val + "</div><div class='ll-next'></div>"; wrapper.appendChild(node);
                if(index < rev.length - 1) {
                    const conn = document.createElement('div'); conn.style.height = '15px'; conn.style.width = '2px'; conn.style.background = 'var(--primary-color)'; wrapper.appendChild(conn);
                }
                if(action === 'push' && index === 0) wrapper.classList.add('anim-push');
                ns.appendChild(wrapper);
            });
        }
    }
    function renderQueue() {
        const slots = [0,1,2,3,4].map(i => document.getElementById("qs-" + i));
        for(let i=0; i<5; i++) {
            const ext = slots[i].querySelector('.q-item'); if(ext) slots[i].removeChild(ext);
            if(qArr[i] !== null) { const div = document.createElement('div'); div.className = 'q-item'; div.textContent = qArr[i]; slots[i].appendChild(div); }
        }
        const pf = document.getElementById('front-ptr'); const pr = document.getElementById('rear-ptr');
        if (qCount === 0) { pf.style.left =  (30 + qFront * 65) + 'px'; pr.style.left = (30 + (qRear<0?0:qRear) * 65) + 'px'; } 
        else { pf.style.left = (30 + qFront * 65) + 'px'; pr.style.left = (30 + qRear * 65) + 'px'; }
    }
    function renderGraph() {
        const svg = document.getElementById('graph-edges'); svg.innerHTML = '';
        const pos = [{x:150,y:30},{x:270,y:120},{x:225,y:255},{x:75,y:255},{x:30,y:120}];
        edges.forEach(e => {
            const p1 = pos[e[0]], p2 = pos[e[1]];
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", p1.x); line.setAttribute("y1", p1.y); line.setAttribute("x2", p2.x); line.setAttribute("y2", p2.y);
            line.setAttribute("class", "graph-edge"); svg.appendChild(line);
        });
    }
    function renderTree() {
        const nc = document.getElementById('tree-nodes-container'); nc.innerHTML = '';
        const svg = document.getElementById('tree-edges'); svg.innerHTML = '';
        function drawNode(node) {
            if(!node) return;
            const div = document.createElement('div'); div.className = 'tree-node'; div.textContent = node.val;
            div.style.left = node.x + 'px'; div.style.top = node.y + 'px'; nc.appendChild(div);
            if(node.left) {
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line"); line.setAttribute("x1", node.x); line.setAttribute("y1", node.y); line.setAttribute("x2", node.left.x); line.setAttribute("y2", node.left.y); line.setAttribute("class", "tree-edge"); svg.appendChild(line); drawNode(node.left);
            }
            if(node.right) {
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line"); line.setAttribute("x1", node.x); line.setAttribute("y1", node.y); line.setAttribute("x2", node.right.x); line.setAttribute("y2", node.right.y); line.setAttribute("class", "tree-edge"); svg.appendChild(line); drawNode(node.right);
            }
        }
        drawNode(bstRoot);
    }
});
