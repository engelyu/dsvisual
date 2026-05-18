// Structured slide content source. Hand-written.
// Consumed only by build_slides.js (Node). Do NOT load this in the browser.
// Text leaves are { zh, en } and may embed inline $...$ LaTeX.

const SLIDES_DB = {
  'stack-list': {
    category: 'Basic Linear Structures',
    title: { zh: '堆疊(鏈結串列實作)', en: 'Stack (Linked List Implementation)' },
    slides: [
      {
        heading: { zh: '堆疊(鏈結串列實作)', en: 'Stack (Linked List Implementation)' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '以動態配置的 `Node` 鏈結串列實作 LIFO 堆疊,不受固定容量限制,可隨需求自由增縮。',
            en: 'A LIFO stack built from dynamically allocated `Node` objects in a linked list — no fixed capacity, grows and shrinks on demand.' } },
        ],
      },
      {
        heading: { zh: '核心概念', en: 'Core Concept' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '每個節點包含資料欄位與指向下一節點的指標。`topNode` 始終指向鏈結串列的頭節點(即堆疊頂端)。',
            en: 'Each node holds a data field and a pointer to the next node. `topNode` always points to the head of the list (the stack top).' } },
          { type: 'bullets', items: [
            { zh: 'push:建立新節點,令其 `next` 指向舊頂端,再更新 `topNode`。', en: 'push: allocate a new node, set its `next` to the old top, then update `topNode`.' },
            { zh: 'pop:讀取 `topNode->data`,將 `topNode` 移至下一節點,`delete` 舊節點。', en: 'pop: read `topNode->data`, advance `topNode` to the next node, `delete` the old node.' },
            { zh: '無堆疊溢位;僅受系統堆積記憶體限制。', en: 'No Stack Overflow; limited only by available heap memory.' },
          ] },
        ],
      },
      {
        heading: { zh: '運作流程', en: 'Operation Flow' },
        blocks: [
          { type: 'steps', items: [
            { zh: '配置新節點並初始化其 `data`。', en: 'Allocate a new node and initialise its `data`.' },
            { zh: '將新節點的 `next` 設為目前 `topNode`。', en: 'Set the new node\'s `next` to the current `topNode`.' },
            { zh: '更新 `topNode` 指向新節點,完成 push。', en: 'Update `topNode` to point to the new node — push complete.' },
            { zh: 'pop 時先儲存頂端值,移動 `topNode`,再釋放舊節點記憶體。', en: 'To pop: save the top value, advance `topNode`, then free the old node.' },
          ] },
          { type: 'mermaid', code: 'flowchart LR\n  E["topNode=null\\n(empty)"] -->|push 10| A["[10]->null"]\n  A -->|push 20| B["[20]->[10]->null"]\n  B -->|pop| A' },
        ],
      },
      {
        heading: { zh: '記憶體結構', en: 'Memory Layout' },
        blocks: [
          { type: 'svg', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 80" width="340" height="80"><g font-family="sans-serif" font-size="13"><rect x="10" y="25" width="80" height="30" fill="#dbeafe" stroke="#2563eb"/><text x="50" y="45" text-anchor="middle">data:20</text><rect x="100" y="25" width="70" height="30" fill="#dbeafe" stroke="#2563eb"/><text x="135" y="45" text-anchor="middle">next ──▶</text><rect x="180" y="25" width="80" height="30" fill="#dbeafe" stroke="#2563eb"/><text x="220" y="45" text-anchor="middle">data:10</text><rect x="270" y="25" width="60" height="30" fill="#dbeafe" stroke="#2563eb"/><text x="300" y="45" text-anchor="middle">next:null</text><text x="50" y="18" text-anchor="middle" fill="#2563eb">topNode</text></g></svg>' },
          { type: 'note', text: {
            zh: '每個節點散落在堆積記憶體中,藉由 `next` 指標串接;`topNode` 永遠指向最新推入的節點。',
            en: 'Each node lives at a scattered heap address; `next` pointers chain them together. `topNode` always points to the most recently pushed node.' } },
        ],
      },
      {
        heading: { zh: '複雜度分析', en: 'Complexity Analysis' },
        blocks: [
          { type: 'table',
            headers: [ { zh: '操作', en: 'Operation' }, { zh: '時間', en: 'Time' }, { zh: '空間', en: 'Space' } ],
            rows: [
              [ { zh: 'push', en: 'push' }, { zh: '$O(1)$', en: '$O(1)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: 'pop', en: 'pop' }, { zh: '$O(1)$', en: '$O(1)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: '空間合計', en: 'Total Space' }, { zh: '—', en: '—' }, { zh: '$O(N)$', en: '$O(N)$' } ],
            ] },
          { type: 'math', tex: 'T_{\\text{push}}(n) = O(1)', caption: {
            zh: '每次 push 僅配置一個節點並更新兩個指標,與堆疊大小無關。',
            en: 'Each push allocates one node and updates two pointers — independent of stack size.' } },
        ],
      },
      {
        heading: { zh: '程式碼', en: 'Source Code' },
        blocks: [
          { type: 'code', lang: 'cpp', code: 'struct Node {\n    int data;\n    Node* next;\n    Node(int val) : data(val), next(nullptr) {}\n};\n\nvoid push(int val) {\n    Node* newNode = new Node(val);\n    newNode->next = topNode;\n    topNode = newNode;\n}\n\nint pop() {\n    if (!topNode) { return -1; } // underflow\n    int val = topNode->data;\n    Node* temp = topNode;\n    topNode = topNode->next;\n    delete temp;\n    return val;\n}' },
        ],
      },
      {
        heading: { zh: '優缺點與使用時機', en: 'Pros, Cons & When to Use' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '優點:動態擴縮,無需預先決定容量上限。', en: 'Pro: dynamically sized — no capacity limit needs to be set in advance.' },
            { zh: '優點:不浪費預留空間。', en: 'Pro: no wasted pre-allocated space.' },
            { zh: '缺點:每個節點需額外儲存一個指標,記憶體使用較不連續。', en: 'Con: each node carries a pointer overhead; memory is non-contiguous (less cache-friendly).' },
            { zh: '適用:元素數量難以預知的場景,如深度優先搜尋、運算式求值。', en: 'Use when element count is unpredictable, e.g. DFS traversal, expression evaluation.' },
          ] },
        ],
      },
      {
        heading: { zh: '小結', en: 'Summary' },
        blocks: [
          { type: 'bullets', items: [
            { zh: 'LIFO:以 `topNode` 指向鏈結串列頭端實作。', en: 'LIFO: implemented by keeping `topNode` at the list head.' },
            { zh: 'push / pop 皆為 $O(1)$,無容量上限。', en: 'Both push and pop are $O(1)$ with no hard capacity limit.' },
            { zh: '相較陣列實作,以額外指標空間換取動態性。', en: 'Compared to array implementation, trades pointer overhead for dynamic sizing.' },
          ] },
        ],
      },
    ],
  },

  'queue': {
    category: 'Basic Linear Structures',
    title: { zh: '佇列(循環陣列)', en: 'Queue (Circular Array)' },
    slides: [
      {
        heading: { zh: '佇列(循環陣列)', en: 'Queue (Circular Array)' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '佇列是一種 FIFO(先進先出)的線性結構,如同排隊等候:最早加入的最先被服務。循環陣列實作以取模運算避免空間浪費。',
            en: 'A queue is a FIFO (First In, First Out) linear structure — like a waiting line: the earliest arrival is served first. The circular array implementation uses the modulo operator to reuse space.' } },
        ],
      },
      {
        heading: { zh: '核心概念', en: 'Core Concept' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '使用固定大小的陣列搭配 `front`、`rear` 兩個指標及 `count` 計數器。`rear` 向後推進時以 `% MAX_SIZE` 折返頭部。',
            en: 'A fixed-size array is used with two pointers `front` and `rear` plus a `count` counter. `rear` wraps back to index 0 via `% MAX_SIZE` after reaching the end.' } },
          { type: 'bullets', items: [
            { zh: '`front` 指向最舊元素;`rear` 指向最新元素的位置。', en: '`front` points to the oldest element; `rear` marks where the newest was placed.' },
            { zh: 'enqueue:先移動 `rear = (rear+1) % MAX_SIZE`,再寫入值並遞增 `count`。', en: 'enqueue: advance `rear = (rear+1) % MAX_SIZE`, write the value, increment `count`.' },
            { zh: 'dequeue:讀取 `arr[front]`,再移動 `front = (front+1) % MAX_SIZE`,遞減 `count`。', en: 'dequeue: read `arr[front]`, advance `front = (front+1) % MAX_SIZE`, decrement `count`.' },
          ] },
        ],
      },
      {
        heading: { zh: '運作流程', en: 'Operation Flow' },
        blocks: [
          { type: 'steps', items: [
            { zh: 'enqueue:若 `count >= MAX_SIZE` 則拒絕(Queue Overflow)。', en: 'enqueue: reject if `count >= MAX_SIZE` (Queue Overflow).' },
            { zh: '以 `(rear+1) % MAX_SIZE` 計算新後端位置並寫入值。', en: 'Compute new rear index `(rear+1) % MAX_SIZE` and write the value.' },
            { zh: 'dequeue:若 `count == 0` 則拒絕(Queue Underflow)。', en: 'dequeue: reject if `count == 0` (Queue Underflow).' },
            { zh: '讀取 `arr[front]`,以 `(front+1) % MAX_SIZE` 移動前端指標。', en: 'Read `arr[front]`, advance `front = (front+1) % MAX_SIZE`.' },
          ] },
          { type: 'mermaid', code: 'flowchart LR\n  E["empty\\ncount=0"] -->|enqueue 10| A["[10]\\nf=0 r=0 c=1"]\n  A -->|enqueue 20| B["[10,20]\\nf=0 r=1 c=2"]\n  B -->|dequeue| C["[20]\\nf=1 r=1 c=1"]' },
        ],
      },
      {
        heading: { zh: '循環陣列示意', en: 'Circular Array Diagram' },
        blocks: [
          { type: 'svg', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 90" width="360" height="90"><g font-family="sans-serif" font-size="12"><rect x="10" y="30" width="60" height="30" fill="#dbeafe" stroke="#2563eb"/><rect x="70" y="30" width="60" height="30" fill="#dbeafe" stroke="#2563eb"/><rect x="130" y="30" width="60" height="30" fill="#fff" stroke="#94a3b8"/><rect x="190" y="30" width="60" height="30" fill="#fff" stroke="#94a3b8"/><rect x="250" y="30" width="60" height="30" fill="#fff" stroke="#94a3b8"/><text x="40" y="50" text-anchor="middle">10</text><text x="100" y="50" text-anchor="middle">20</text><text x="160" y="50" text-anchor="middle"> </text><text x="220" y="50" text-anchor="middle"> </text><text x="280" y="50" text-anchor="middle"> </text><text x="40" y="22" text-anchor="middle" fill="#16a34a">front</text><text x="100" y="22" text-anchor="middle" fill="#dc2626">rear</text><text x="185" y="80" text-anchor="middle" fill="#64748b">↩ wraps around via %</text></g></svg>' },
          { type: 'note', text: {
            zh: '當 `rear` 到達陣列末端後,下一次 enqueue 會以取模回到索引 0,避免「假滿」問題。',
            en: 'When `rear` reaches the end of the array, the next enqueue wraps back to index 0 via modulo — preventing the "false full" problem of naive array queues.' } },
        ],
      },
      {
        heading: { zh: '複雜度分析', en: 'Complexity Analysis' },
        blocks: [
          { type: 'table',
            headers: [ { zh: '操作', en: 'Operation' }, { zh: '時間', en: 'Time' }, { zh: '空間', en: 'Space' } ],
            rows: [
              [ { zh: 'enqueue', en: 'enqueue' }, { zh: '$O(1)$', en: '$O(1)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: 'dequeue', en: 'dequeue' }, { zh: '$O(1)$', en: '$O(1)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: 'peek (front)', en: 'peek (front)' }, { zh: '$O(1)$', en: '$O(1)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: '空間合計', en: 'Total Space' }, { zh: '—', en: '—' }, { zh: '$O(N)$', en: '$O(N)$' } ],
            ] },
          { type: 'math', tex: 'T_{\\text{enqueue}}(n) = O(1)', caption: {
            zh: 'enqueue 僅做一次取模和一次陣列寫入,與佇列長度無關。',
            en: 'enqueue performs one modulo and one array write — independent of queue length.' } },
        ],
      },
      {
        heading: { zh: '程式碼', en: 'Source Code' },
        blocks: [
          { type: 'code', lang: 'cpp', code: 'bool enqueue(int val) {\n    if (count >= MAX_SIZE) {\n        cout << "Queue Overflow!" << endl;\n        return false;\n    }\n    rear = (rear + 1) % MAX_SIZE;\n    arr[rear] = val;\n    count++;\n    return true;\n}\n\nint dequeue() {\n    if (count == 0) {\n        cout << "Queue Underflow!" << endl;\n        return -1;\n    }\n    int val = arr[front];\n    front = (front + 1) % MAX_SIZE;\n    count--;\n    return val;\n}' },
        ],
      },
      {
        heading: { zh: '優缺點與使用時機', en: 'Pros, Cons & When to Use' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '優點:記憶體連續、快取友善,enqueue/dequeue 皆為 $O(1)$。', en: 'Pro: contiguous memory, cache-friendly; both enqueue and dequeue are $O(1)$.' },
            { zh: '優點:取模折返解決了一般陣列佇列的「假滿」問題。', en: 'Pro: modulo wrap-around eliminates the "false full" issue of naive array queues.' },
            { zh: '缺點:容量固定,需事先決定上限。', en: 'Con: fixed capacity — the maximum size must be set in advance.' },
            { zh: '適用:BFS 廣度優先搜尋、排程緩衝、印表機佇列等。', en: 'Use for BFS traversal, task scheduling buffers, printer queues, etc.' },
          ] },
        ],
      },
      {
        heading: { zh: '小結', en: 'Summary' },
        blocks: [
          { type: 'bullets', items: [
            { zh: 'FIFO:以 `front`/`rear` 雙指標管理兩端。', en: 'FIFO: two pointers `front`/`rear` manage both ends.' },
            { zh: 'enqueue / dequeue 皆為 $O(1)$。', en: 'Both enqueue and dequeue are $O(1)$.' },
            { zh: '取模折返是循環陣列的關鍵技巧,有效利用所有槽位。', en: 'Modulo wrap-around is the key trick — all slots are utilised efficiently.' },
          ] },
        ],
      },
    ],
  },

  'list-array': {
    category: 'Basic Linear Structures',
    title: { zh: '陣列串列', en: 'Array-Based List' },
    slides: [
      {
        heading: { zh: '陣列串列', en: 'Array-Based List' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '陣列串列以連續記憶體區塊儲存元素,支援 $O(1)$ 隨機存取;中間插入或刪除需移動後續元素,成本為 $O(N)$。',
            en: 'An array-based list stores elements in a contiguous memory block, enabling $O(1)$ random access; inserting or removing in the middle requires shifting subsequent elements at $O(N)$ cost.' } },
        ],
      },
      {
        heading: { zh: '核心概念', en: 'Core Concept' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '使用動態配置的整數陣列,並以 `size` 追蹤目前元素數量、`capacity` 追蹤已配置容量。',
            en: 'Uses a dynamically allocated integer array; `size` tracks the current element count and `capacity` records the allocated length.' } },
          { type: 'bullets', items: [
            { zh: '插入 index i:將 i 之後的所有元素向右移一格,再寫入新值。', en: 'insert at index i: shift all elements from i onward one slot to the right, then write the new value.' },
            { zh: '刪除 index i:將 i 之後的所有元素向左移一格,遞減 `size`。', en: 'remove at index i: shift all elements after i one slot to the left, decrement `size`.' },
            { zh: '以索引直接存取:`arr[i]` 為 $O(1)$,不論串列大小。', en: 'Direct index access: `arr[i]` is $O(1)$ regardless of list size.' },
          ] },
        ],
      },
      {
        heading: { zh: '運作流程', en: 'Operation Flow' },
        blocks: [
          { type: 'steps', items: [
            { zh: '插入前檢查 `index` 範圍及 `size < capacity`。', en: 'Before inserting, validate `index` bounds and that `size < capacity`.' },
            { zh: '從 `size` 向下至 `index+1`,逐一將元素右移:arr[i] = arr[i-1]。', en: 'Iterate from `size` down to `index+1`, shifting each element right: arr[i] = arr[i-1].' },
            { zh: '在 `arr[index]` 寫入新值,遞增 `size`。', en: 'Write the new value at `arr[index]` and increment `size`.' },
            { zh: '刪除時則反向:從 `index` 向右逐一左移,遞減 `size`。', en: 'For removal: shift elements left from `index` onward, decrement `size`.' },
          ] },
          { type: 'mermaid', code: 'flowchart TD\n  A["arr=[10,30,40]\\ninsert(1,20)"] --> B["shift right:\\n[10,30,30,40]"]\n  B --> C["write arr[1]=20:\\n[10,20,30,40]"]\n  C --> D["size++ done"]' },
        ],
      },
      {
        heading: { zh: '記憶體結構', en: 'Memory Layout' },
        blocks: [
          { type: 'svg', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 90" width="340" height="90"><g font-family="sans-serif" font-size="13"><rect x="10" y="30" width="55" height="30" fill="#dbeafe" stroke="#2563eb"/><rect x="65" y="30" width="55" height="30" fill="#fef9c3" stroke="#ca8a04"/><rect x="120" y="30" width="55" height="30" fill="#dbeafe" stroke="#2563eb"/><rect x="175" y="30" width="55" height="30" fill="#dbeafe" stroke="#2563eb"/><rect x="230" y="30" width="55" height="30" fill="#fff" stroke="#94a3b8"/><text x="37" y="50" text-anchor="middle">10</text><text x="92" y="50" text-anchor="middle" fill="#92400e">20(new)</text><text x="147" y="50" text-anchor="middle">30</text><text x="202" y="50" text-anchor="middle">40</text><text x="257" y="50" text-anchor="middle"> </text><text x="37" y="22" text-anchor="middle" fill="#64748b">[0]</text><text x="92" y="22" text-anchor="middle" fill="#64748b">[1]</text><text x="147" y="22" text-anchor="middle" fill="#64748b">[2]</text><text x="202" y="22" text-anchor="middle" fill="#64748b">[3]</text><text x="257" y="22" text-anchor="middle" fill="#64748b">[4]</text><text x="170" y="82" text-anchor="middle" fill="#2563eb">↑ contiguous block</text></g></svg>' },
          { type: 'note', text: {
            zh: '黃色為新插入的元素,藍色為已存在的元素,白色為閒置空間;所有元素緊鄰存放於連續記憶體。',
            en: 'Yellow cell shows the newly inserted element, blue are existing elements, white is free space; all elements reside in one contiguous block.' } },
        ],
      },
      {
        heading: { zh: '複雜度分析', en: 'Complexity Analysis' },
        blocks: [
          { type: 'table',
            headers: [ { zh: '操作', en: 'Operation' }, { zh: '時間', en: 'Time' }, { zh: '空間', en: 'Space' } ],
            rows: [
              [ { zh: '隨機存取 arr[i]', en: 'random access arr[i]' }, { zh: '$O(1)$', en: '$O(1)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: '尾端插入/刪除', en: 'insert/remove at tail' }, { zh: '$O(1)$', en: '$O(1)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: '中間插入/刪除', en: 'insert/remove at middle' }, { zh: '$O(N)$', en: '$O(N)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: '空間合計', en: 'total space' }, { zh: '—', en: '—' }, { zh: '$O(N)$', en: '$O(N)$' } ],
            ] },
          { type: 'math', tex: 'T_{\\text{insert-mid}}(n) = O(N)', caption: {
            zh: '最壞情況下需移動所有 N 個元素(插入於頭部)。',
            en: 'In the worst case all N elements must be shifted (insertion at head).' } },
        ],
      },
      {
        heading: { zh: '程式碼', en: 'Source Code' },
        blocks: [
          { type: 'code', lang: 'cpp', code: 'void insert(int index, int val) {\n    if (index < 0 || index > size || size >= capacity) return;\n    for (int i = size; i > index; i--) {\n        arr[i] = arr[i - 1]; // Shift right\n    }\n    arr[index] = val;\n    size++;\n}\n\nvoid remove(int index) {\n    if (index < 0 || index >= size) return;\n    for (int i = index; i < size - 1; i++) {\n        arr[i] = arr[i + 1]; // Shift left\n    }\n    size--;\n}' },
        ],
      },
      {
        heading: { zh: '優缺點與使用時機', en: 'Pros, Cons & When to Use' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '優點:記憶體連續,快取命中率高,$O(1)$ 隨機存取。', en: 'Pro: contiguous memory, high cache-hit rate, $O(1)$ random access.' },
            { zh: '優點:無指標額外開銷,記憶體使用率高。', en: 'Pro: no pointer overhead — memory-efficient.' },
            { zh: '缺點:中間插入/刪除需 $O(N)$ 移位操作。', en: 'Con: mid-list insert/remove requires $O(N)$ element shifts.' },
            { zh: '缺點:容量固定,擴容需重新配置並複製。', en: 'Con: fixed capacity — resizing requires reallocation and copying.' },
            { zh: '適用:頻繁隨機讀取、尾端操作為主的場景,如靜態查找表。', en: 'Use for workloads with frequent random reads or tail operations, e.g. static lookup tables.' },
          ] },
        ],
      },
      {
        heading: { zh: '小結', en: 'Summary' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '連續記憶體帶來 $O(1)$ 隨機存取,是與鏈結串列的最大差異。', en: 'Contiguous memory enables $O(1)$ random access — the key advantage over linked lists.' },
            { zh: '中間插入/刪除為 $O(N)$,適合讀多寫少的場景。', en: 'Mid-list insert/remove is $O(N)$; best suited for read-heavy workloads.' },
            { zh: '尾端操作仍為 $O(1)$,可用作簡易的動態陣列基礎。', en: 'Tail operations remain $O(1)$ and serve as the basis for simple dynamic arrays.' },
          ] },
        ],
      },
    ],
  },

  'list-linked': {
    category: 'Linked Lists',
    title: { zh: '單向鏈結串列', en: 'Singly Linked List' },
    slides: [
      {
        heading: { zh: '單向鏈結串列', en: 'Singly Linked List' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '單向鏈結串列由動態配置的 `Node` 物件組成,每個節點含 `data` 欄位與指向下一節點的 `next` 指標,`head` 指向串列的第一個節點。',
            en: 'A singly linked list consists of dynamically allocated `Node` objects, each holding a `data` field and a `next` pointer to the following node; `head` points to the first node in the list.' } },
        ],
      },
      {
        heading: { zh: '核心概念', en: 'Core Concept' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '節點散落於堆積記憶體中,僅靠 `next` 指標鏈接;無需預先宣告容量。插入或刪除只需改動少數指標,但隨機存取必須從 `head` 逐步遍訪。',
            en: 'Nodes are scattered in heap memory and linked only by `next` pointers — no pre-declared capacity needed. Insertion or deletion changes just a few pointers, but random access requires sequential traversal from `head`.' } },
          { type: 'bullets', items: [
            { zh: '在頭部插入:新節點的 `next` 指向舊 `head`,再更新 `head`,$O(1)$。', en: 'Insert at head: set new node\'s `next` to old `head`, then update `head` — $O(1)$.' },
            { zh: '在任意位置插入:先遍訪至前一節點,再調整兩個指標,$O(N)$。', en: 'Insert at arbitrary index: traverse to the predecessor, then rewire two pointers — $O(N)$.' },
            { zh: '刪除節點:遍訪至前一節點,繞過目標節點並 `delete`,$O(N)$。', en: 'Remove a node: traverse to predecessor, bypass the target node and `delete` it — $O(N)$.' },
            { zh: '不支援 $O(1)$ 隨機存取;需從 `head` 逐步走訪至目標索引。', en: 'No $O(1)$ random access — must traverse from `head` to the target index.' },
          ] },
        ],
      },
      {
        heading: { zh: '運作流程', en: 'Operation Flow' },
        blocks: [
          { type: 'steps', items: [
            { zh: '頭部插入:配置新節點,令 `next = head`,再令 `head = newNode`。', en: 'Insert at head: allocate new node, set `next = head`, then set `head = newNode`.' },
            { zh: '中間插入:從 `head` 遍訪至索引 `i-1` 的節點 `temp`。', en: 'Insert in middle: traverse from `head` to node `temp` at index `i-1`.' },
            { zh: '令 `newNode->next = temp->next`,再令 `temp->next = newNode`。', en: 'Set `newNode->next = temp->next`, then set `temp->next = newNode`.' },
            { zh: '刪除:遍訪至前一節點,令 `temp->next = delNode->next`,再 `delete delNode`。', en: 'Remove: traverse to predecessor, set `temp->next = delNode->next`, then `delete delNode`.' },
          ] },
          { type: 'mermaid', code: 'flowchart LR\n  H["head=null\\n(empty)"] -->|insert head 10| A["10 -> null"]\n  A -->|"insert(1, 20)"| B["10 -> 20 -> null"]\n  B -->|remove head| C["20 -> null"]' },
        ],
      },
      {
        heading: { zh: '記憶體結構', en: 'Memory Layout' },
        blocks: [
          { type: 'svg', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 80" width="380" height="80"><g font-family="sans-serif" font-size="12"><rect x="10" y="25" width="70" height="30" fill="#dbeafe" stroke="#2563eb"/><text x="45" y="45" text-anchor="middle">data:10</text><rect x="80" y="25" width="60" height="30" fill="#dbeafe" stroke="#2563eb"/><text x="110" y="45" text-anchor="middle">next ──▶</text><rect x="160" y="25" width="70" height="30" fill="#dbeafe" stroke="#2563eb"/><text x="195" y="45" text-anchor="middle">data:20</text><rect x="230" y="25" width="60" height="30" fill="#dbeafe" stroke="#2563eb"/><text x="260" y="45" text-anchor="middle">next ──▶</text><rect x="310" y="25" width="55" height="30" fill="#f1f5f9" stroke="#94a3b8"/><text x="337" y="45" text-anchor="middle" fill="#64748b">null</text><text x="45" y="18" text-anchor="middle" fill="#2563eb">head</text></g></svg>' },
          { type: 'note', text: {
            zh: '每個節點獨立散落於堆積記憶體,僅靠 `next` 指標串接;`head` 永遠指向第一個節點,尾端節點的 `next` 為 `nullptr`。',
            en: 'Each node lives at an independent heap address, linked only by `next` pointers. `head` always points to the first node; the tail node\'s `next` is `nullptr`.' } },
        ],
      },
      {
        heading: { zh: '複雜度分析', en: 'Complexity Analysis' },
        blocks: [
          { type: 'table',
            headers: [ { zh: '操作', en: 'Operation' }, { zh: '時間', en: 'Time' }, { zh: '空間', en: 'Space' } ],
            rows: [
              [ { zh: '頭部插入/刪除', en: 'insert/remove at head' }, { zh: '$O(1)$', en: '$O(1)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: '任意位置插入/刪除', en: 'insert/remove at index i' }, { zh: '$O(N)$', en: '$O(N)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: '搜尋/隨機存取', en: 'search / random access' }, { zh: '$O(N)$', en: '$O(N)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: '空間合計', en: 'Total Space' }, { zh: '—', en: '—' }, { zh: '$O(N)$', en: '$O(N)$' } ],
            ] },
          { type: 'math', tex: 'T_{\\text{insert-head}} = O(1)', caption: {
            zh: '頭部插入只需更新兩個指標,與串列長度無關。',
            en: 'Inserting at the head updates only two pointers — independent of list length.' } },
        ],
      },
      {
        heading: { zh: '程式碼', en: 'Source Code' },
        blocks: [
          { type: 'code', lang: 'cpp', code: 'struct Node {\n    int data;\n    Node* next;\n    Node(int val) : data(val), next(nullptr) {}\n};\n\nvoid insert(int index, int val) {\n    Node* newNode = new Node(val);\n    if (index == 0) {\n        newNode->next = head;\n        head = newNode;\n        return;\n    }\n    Node* temp = head;\n    for (int i = 0; temp != nullptr && i < index - 1; i++)\n        temp = temp->next;\n    if (!temp) return;\n    newNode->next = temp->next;\n    temp->next = newNode;\n}\n\nvoid remove(int index) {\n    if (!head) return;\n    if (index == 0) {\n        Node* temp = head;\n        head = head->next;\n        delete temp;\n        return;\n    }\n    Node* temp = head;\n    for (int i = 0; temp != nullptr && i < index - 1; i++)\n        temp = temp->next;\n    if (!temp || !temp->next) return;\n    Node* delNode = temp->next;\n    temp->next = delNode->next;\n    delete delNode;\n}' },
        ],
      },
      {
        heading: { zh: '優缺點與使用時機', en: 'Pros, Cons & When to Use' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '優點:頭部插入/刪除為 $O(1)$,動態擴縮無容量上限。', en: 'Pro: head insert/remove is $O(1)$; grows and shrinks dynamically with no capacity ceiling.' },
            { zh: '優點:中間插入/刪除只需調整指標,無需移動其餘元素。', en: 'Pro: mid-list insert/remove only rewires pointers — no element shifting needed.' },
            { zh: '缺點:不支援隨機存取,$O(N)$ 走訪才能到達任意索引。', en: 'Con: no random access — reaching an arbitrary index costs $O(N)$ traversal.' },
            { zh: '缺點:每個節點需額外一個 `next` 指標,記憶體不連續,快取效益低。', en: 'Con: each node carries an extra `next` pointer; non-contiguous memory makes it cache-unfriendly.' },
            { zh: '適用:頻繁在頭部或已知位置插入/刪除,如任務佇列、前向迭代器。', en: 'Use when frequent head or positional insertions/deletions are needed, e.g. task queues, forward-only iterators.' },
          ] },
        ],
      },
      {
        heading: { zh: '小結', en: 'Summary' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '以 `head` 指標管理串列,`next` 鏈接所有節點。', en: 'Managed by a `head` pointer; `next` pointers chain all nodes together.' },
            { zh: '頭部操作 $O(1)$;中間或尾端操作需 $O(N)$ 遍訪。', en: 'Head operations are $O(1)$; middle or tail operations require $O(N)$ traversal.' },
            { zh: '與陣列串列相比:犧牲隨機存取換取高效的指標式插入/刪除。', en: 'Compared to array-based list: trades random access for efficient pointer-based insert/remove.' },
          ] },
        ],
      },
    ],
  },

  'stack-array': {
    category: 'Basic Linear Structures',
    title: { zh: '堆疊(陣列實作)', en: 'Stack (Array Implementation)' },
    slides: [
      {
        heading: { zh: '堆疊(陣列實作)', en: 'Stack (Array Implementation)' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '堆疊是一種 LIFO(後進先出)的線性結構,如同一疊盤子:最後放上的最先被取下。',
            en: 'A stack is a LIFO (Last In, First Out) linear structure, like a pile of plates: the last one placed is the first removed.' } },
        ],
      },
      {
        heading: { zh: '核心概念', en: 'Core Concept' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '陣列實作用一塊固定大小的連續記憶體,搭配一個整數索引 `top` 指向頂端元素。',
            en: 'The array implementation uses a fixed-size contiguous block of memory plus an integer index `top` pointing at the top element.' } },
          { type: 'bullets', items: [
            { zh: '`top` 初始為 -1,代表空堆疊。', en: '`top` starts at -1, meaning the stack is empty.' },
            { zh: '`push` 先遞增 `top` 再寫入;`pop` 先讀取再遞減 `top`。', en: '`push` increments `top` then writes; `pop` reads then decrements `top`.' },
            { zh: '容量固定,推入超過上限會發生 Stack Overflow。', en: 'Capacity is fixed; pushing beyond the limit causes a Stack Overflow.' },
          ] },
        ],
      },
      {
        heading: { zh: '運作流程', en: 'Operation Flow' },
        blocks: [
          { type: 'steps', items: [
            { zh: '檢查 `top` 是否已達容量上限,若是則拒絕推入。', en: 'Check whether `top` has reached capacity; if so, reject the push.' },
            { zh: '遞增 `top`,將新值寫入 `arr[top]`。', en: 'Increment `top` and write the new value into `arr[top]`.' },
            { zh: '彈出時讀取 `arr[top]`,再將 `top` 遞減。', en: 'To pop, read `arr[top]`, then decrement `top`.' },
          ] },
          { type: 'mermaid', code: 'flowchart LR\n  E["Empty top=-1"] -->|push a| A["top=0"]\n  A -->|push b| B["top=1"]\n  B -->|pop| A' },
        ],
      },
      {
        heading: { zh: '記憶體結構', en: 'Memory Layout' },
        blocks: [
          { type: 'svg', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 70" width="320" height="70"><g font-family="sans-serif" font-size="13"><rect x="10" y="20" width="50" height="30" fill="#dbeafe" stroke="#2563eb"/><rect x="60" y="20" width="50" height="30" fill="#dbeafe" stroke="#2563eb"/><rect x="110" y="20" width="50" height="30" fill="#fff" stroke="#94a3b8"/><rect x="160" y="20" width="50" height="30" fill="#fff" stroke="#94a3b8"/><text x="35" y="40" text-anchor="middle">a</text><text x="85" y="40" text-anchor="middle">b</text><text x="85" y="15" text-anchor="middle" fill="#2563eb">top</text></g></svg>' },
          { type: 'note', text: {
            zh: '藍色為已使用的格子,白色為閒置空間;`top` 永遠指向最後一個有效元素。',
            en: 'Blue cells are occupied, white cells are free; `top` always points at the last valid element.' } },
        ],
      },
      {
        heading: { zh: '複雜度分析', en: 'Complexity Analysis' },
        blocks: [
          { type: 'table',
            headers: [ { zh: '操作', en: 'Operation' }, { zh: '時間', en: 'Time' }, { zh: '空間', en: 'Space' } ],
            rows: [
              [ { zh: 'push', en: 'push' }, { zh: '$O(1)$', en: '$O(1)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: 'pop', en: 'pop' }, { zh: '$O(1)$', en: '$O(1)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: '空間合計', en: 'Total Space' }, { zh: '—', en: '—' }, { zh: '$O(N)$', en: '$O(N)$' } ],
            ] },
          { type: 'math', tex: 'T_{\\text{push}}(n) = O(1)', caption: {
            zh: '每次推入只做常數次運算,與堆疊大小無關。',
            en: 'Each push performs a constant number of operations, independent of stack size.' } },
        ],
      },
      {
        heading: { zh: '程式碼', en: 'Source Code' },
        blocks: [
          { type: 'code', lang: 'cpp', code: 'bool push(int val) {\n    if (topIndex >= MAX_SIZE - 1) {\n        cout << "Stack Overflow!" << endl;\n        return false;\n    }\n    arr[++topIndex] = val;\n    return true;\n}\n\nint pop() {\n    if (topIndex < 0) return -1;\n    return arr[topIndex--];\n}' },
        ],
      },
      {
        heading: { zh: '優缺點與使用時機', en: 'Pros, Cons & When to Use' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '優點:記憶體連續、無指標額外開銷,快取友善。', en: 'Pro: contiguous memory, no pointer overhead, cache-friendly.' },
            { zh: '缺點:容量固定,需事先決定大小。', en: 'Con: fixed capacity, size must be decided in advance.' },
            { zh: '適用:容量上限已知的場景,如函式呼叫堆疊、括號配對。', en: 'Use when the maximum size is known, e.g. call stacks, bracket matching.' },
          ] },
        ],
      },
      {
        heading: { zh: '小結', en: 'Summary' },
        blocks: [
          { type: 'bullets', items: [
            { zh: 'LIFO:以單一 `top` 索引管理頂端。', en: 'LIFO: a single `top` index manages the top.' },
            { zh: 'push / pop 皆為 $O(1)$。', en: 'Both push and pop are $O(1)$.' },
            { zh: '固定容量是與鏈結串列實作的主要差異。', en: 'Fixed capacity is the key difference from the linked-list implementation.' },
          ] },
        ],
      },
    ],
  },

  // ── Tree Structures ────────────────────────────────────────────────────────

  'tree-bst': {
    category: 'Non-Linear Structures',
    title: { zh: '二元搜尋樹 (BST)', en: 'Binary Search Tree (BST)' },
    slides: [
      {
        heading: { zh: '二元搜尋樹 (BST)', en: 'Binary Search Tree (BST)' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '二元搜尋樹是一種二元樹結構,每個節點滿足：左子樹所有值 < 節點值 < 右子樹所有值,使得搜尋、插入、刪除均能以 $O(\\log N)$ 完成(平均情況)。',
            en: 'A Binary Search Tree is a binary tree where every node satisfies: all values in the left subtree < node value < all values in the right subtree, enabling $O(\\log N)$ search, insert, and delete on average.' } },
        ],
      },
      {
        heading: { zh: '核心概念', en: 'Core Concept' },
        blocks: [
          { type: 'paragraph', text: {
            zh: 'BST 以 BST 排序性質作為路由規則:搜尋時根據比較結果向左或向右子樹移動,最多遍訪樹的高度層數即可找到目標。',
            en: 'The BST ordering property acts as a routing rule: during search, each comparison directs traversal left or right, reaching the target within at most $O(h)$ steps where $h$ is the tree height.' } },
          { type: 'bullets', items: [
            { zh: '插入:從根遞迴比較,找到第一個 null 位置即插入新節點。', en: 'Insert: recursively compare from root; insert a new node at the first null child.' },
            { zh: '搜尋:比目前節點小則走左,大則走右,相等即命中。', en: 'Search: go left if smaller, right if larger, equal means found.' },
            { zh: '最壞情況:按升序插入退化成鏈結串列,$O(N)$ 搜尋。', en: 'Worst case: inserting in sorted order degenerates into a linked list — $O(N)$ search.' },
            { zh: '中序遍訪輸出有序序列。', en: 'In-order traversal yields a sorted sequence.' },
          ] },
        ],
      },
      {
        heading: { zh: '運作流程', en: 'Operation Flow' },
        blocks: [
          { type: 'steps', items: [
            { zh: '從 `root` 開始,將插入值與當前節點比較。', en: 'Start at `root`; compare the value to insert with the current node.' },
            { zh: '若值 < 節點值則遞迴至左子樹,否則遞迴至右子樹。', en: 'If value < node value recurse into the left subtree; otherwise recurse right.' },
            { zh: '遇到 `nullptr` 即在此建立新節點並返回。', en: 'On encountering `nullptr`, allocate a new node here and return it.' },
            { zh: '回傳路徑逐層更新子指標,完成插入。', en: 'Return up the call stack, updating child pointers at each level to complete the insertion.' },
          ] },
          { type: 'mermaid', code: 'flowchart TD\n  R["root=50"] --> L["30"]\n  R --> RR["70"]\n  L --> LL["20"]\n  L --> LR["40"]\n  RR --> RL["?"]\n  RL -->|"insert(60)"| N["60 inserted"]' },
        ],
      },
      {
        heading: { zh: '樹狀結構示意', en: 'Tree Structure Diagram' },
        blocks: [
          { type: 'svg', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 130" width="300" height="130"><g font-family="sans-serif" font-size="12" text-anchor="middle"><circle cx="150" cy="20" r="16" fill="#dbeafe" stroke="#2563eb"/><text x="150" y="25">50</text><circle cx="80" cy="65" r="16" fill="#dbeafe" stroke="#2563eb"/><text x="80" y="70">30</text><circle cx="220" cy="65" r="16" fill="#dbeafe" stroke="#2563eb"/><text x="220" y="70">70</text><circle cx="45" cy="110" r="16" fill="#dbeafe" stroke="#2563eb"/><text x="45" y="115">20</text><circle cx="115" cy="110" r="16" fill="#dbeafe" stroke="#2563eb"/><text x="115" y="115">40</text><line x1="140" y1="34" x2="92" y2="51" stroke="#64748b"/><line x1="160" y1="34" x2="208" y2="51" stroke="#64748b"/><line x1="70" y1="79" x2="55" y2="96" stroke="#64748b"/><line x1="90" y1="79" x2="105" y2="96" stroke="#64748b"/></g></svg>' },
          { type: 'note', text: {
            zh: '左子節點值 < 父節點值 < 右子節點值;中序遍訪(左-根-右)輸出 20 30 40 50 70 的有序序列。',
            en: 'Left child < parent < right child; in-order traversal (left-root-right) outputs the sorted sequence 20 30 40 50 70.' } },
        ],
      },
      {
        heading: { zh: '複雜度分析', en: 'Complexity Analysis' },
        blocks: [
          { type: 'table',
            headers: [ { zh: '操作', en: 'Operation' }, { zh: '時間(平均)', en: 'Time (avg)' }, { zh: '時間(最壞)', en: 'Time (worst)' } ],
            rows: [
              [ { zh: '搜尋', en: 'search' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' }, { zh: '$O(N)$', en: '$O(N)$' } ],
              [ { zh: '插入', en: 'insert' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' }, { zh: '$O(N)$', en: '$O(N)$' } ],
              [ { zh: '刪除', en: 'delete' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' }, { zh: '$O(N)$', en: '$O(N)$' } ],
              [ { zh: '空間合計', en: 'Total Space' }, { zh: '—', en: '—' }, { zh: '$O(N)$', en: '$O(N)$' } ],
            ] },
          { type: 'math', tex: 'T_{\\text{search}}(n) = O(h),\\quad h = O(\\log N)\\text{ avg},\\; O(N)\\text{ worst}', caption: {
            zh: '平均樹高為 $O(\\log N)$;若插入有序序列則退化至 $O(N)$。',
            en: 'Average tree height is $O(\\log N)$; degrades to $O(N)$ when inserting a sorted sequence.' } },
        ],
      },
      {
        heading: { zh: '程式碼', en: 'Source Code' },
        blocks: [
          { type: 'code', lang: 'cpp', code: 'struct Node {\n    int data;\n    Node* left;\n    Node* right;\n    Node(int val) : data(val), left(nullptr), right(nullptr) {}\n};\n\n// Recursive insert returns updated subtree root\nNode* insert(Node* node, int data) {\n    if (!node) return new Node(data);\n    if (data < node->data)\n        node->left = insert(node->left, data);\n    else if (data > node->data)\n        node->right = insert(node->right, data);\n    return node; // duplicate ignored\n}\n\n// In-order: left -> root -> right (sorted output)\nvoid inorder(Node* node) {\n    if (!node) return;\n    inorder(node->left);\n    cout << node->data << " ";\n    inorder(node->right);\n}' },
        ],
      },
      {
        heading: { zh: '優缺點與使用時機', en: 'Pros, Cons & When to Use' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '優點:實作簡單,平均 $O(\\log N)$ 的搜尋/插入/刪除。', en: 'Pro: simple to implement; average $O(\\log N)$ search/insert/delete.' },
            { zh: '優點:中序遍訪自動產生有序序列,適合範圍查詢。', en: 'Pro: in-order traversal produces a sorted sequence — good for range queries.' },
            { zh: '缺點:無自平衡機制,最壞退化為 $O(N)$ 鏈結串列。', en: 'Con: no self-balancing — worst case degrades to $O(N)$ linked list.' },
            { zh: '適用:資料隨機分佈、對平衡無嚴格要求的小型有序字典。', en: 'Use when data is randomly distributed and strict balancing is not required (small ordered dictionaries).' },
          ] },
        ],
      },
      {
        heading: { zh: '小結', en: 'Summary' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '以左 < 節點 < 右的排序性質實現高效路由。', en: 'BST ordering property (left < node < right) enables efficient routing.' },
            { zh: '平均 $O(\\log N)$,最壞 $O(N)$;不平衡是主要風險。', en: 'Average $O(\\log N)$, worst $O(N)$; imbalance is the main risk.' },
            { zh: 'AVL 與 Red-Black Tree 等自平衡樹解決了此問題。', en: 'Self-balancing variants (AVL, Red-Black Tree) solve the imbalance problem.' },
          ] },
        ],
      },
    ],
  },

  'tree-avl': {
    category: 'Non-Linear Structures',
    title: { zh: 'AVL 高度平衡樹', en: 'AVL Height-Balanced Tree' },
    slides: [
      {
        heading: { zh: 'AVL 高度平衡樹', en: 'AVL Height-Balanced Tree' },
        blocks: [
          { type: 'paragraph', text: {
            zh: 'AVL 樹是第一種自平衡 BST(Adelson-Velsky & Landis,1962),每個節點維護一個 balance factor = height(left) − height(right),任何時刻絕對值均 ≤ 1,保證 $O(\\log N)$ 的所有操作。',
            en: 'The AVL tree is the first self-balancing BST (Adelson-Velsky & Landis, 1962). Every node maintains a balance factor = height(left) − height(right); the absolute value is always ≤ 1, guaranteeing $O(\\log N)$ for all operations.' } },
        ],
      },
      {
        heading: { zh: '核心概念', en: 'Core Concept' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '每次插入後,從插入節點往根回溯,更新沿途節點的 `height`,若發現 balance factor 超出 [−1, 1] 範圍即觸發旋轉修正。',
            en: 'After each insertion, the path from the inserted node back to the root is traced; `height` is updated at each ancestor, and any node whose balance factor leaves [−1, 1] triggers a rotation to restore balance.' } },
          { type: 'bullets', items: [
            { zh: 'LL 情況(左子比右子高 2 且插入在左左):單次右旋(Right Rotate)。', en: 'LL case (left subtree 2 taller, new key in left-left): single right rotation (Right Rotate).' },
            { zh: 'RR 情況(右子比左子高 2 且插入在右右):單次左旋(Left Rotate)。', en: 'RR case (right subtree 2 taller, new key in right-right): single left rotation (Left Rotate).' },
            { zh: 'LR 情況:先對左子左旋再對當前節點右旋(雙旋轉)。', en: 'LR case: first left-rotate the left child, then right-rotate the current node (double rotation).' },
            { zh: 'RL 情況:先對右子右旋再對當前節點左旋(雙旋轉)。', en: 'RL case: first right-rotate the right child, then left-rotate the current node (double rotation).' },
          ] },
        ],
      },
      {
        heading: { zh: '運作流程', en: 'Operation Flow' },
        blocks: [
          { type: 'steps', items: [
            { zh: '按 BST 規則遞迴插入節點。', en: 'Recursively insert the new key following BST ordering rules.' },
            { zh: '返回時更新每個祖先節點的 `height`。', en: 'On the way back up, update the `height` of each ancestor node.' },
            { zh: '計算 `balance = getBalance(node)`,若 |balance| > 1 則判斷旋轉類型。', en: 'Compute `balance = getBalance(node)`; if |balance| > 1, determine the rotation type.' },
            { zh: '執行對應旋轉使子樹恢復平衡,並更新旋轉後節點的高度。', en: 'Apply the appropriate rotation to restore balance, then update heights of the rotated nodes.' },
          ] },
          { type: 'mermaid', code: 'flowchart LR\n  A["insert 10,20,30\\n(triggers RR case)"] -->|"leftRotate(10)"| B["balanced:\\n20 is new root\\n10 left, 30 right"]' },
        ],
      },
      {
        heading: { zh: 'AVL 旋轉示意', en: 'AVL Rotation Diagram' },
        blocks: [
          { type: 'svg', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 130" width="340" height="130"><g font-family="sans-serif" font-size="11" text-anchor="middle"><text x="70" y="14" fill="#64748b">Before (RR case)</text><circle cx="40" cy="40" r="14" fill="#fecaca" stroke="#dc2626"/><text x="40" y="45">10</text><circle cx="80" cy="75" r="14" fill="#fecaca" stroke="#dc2626"/><text x="80" y="80">20</text><circle cx="115" cy="110" r="14" fill="#dbeafe" stroke="#2563eb"/><text x="115" y="115">30</text><line x1="50" y1="52" x2="68" y2="63" stroke="#64748b"/><line x1="88" y1="87" x2="104" y2="98" stroke="#64748b"/><text x="200" y="14" fill="#64748b">After (Left Rotate)</text><circle cx="200" cy="40" r="14" fill="#dcfce7" stroke="#16a34a"/><text x="200" y="45">20</text><circle cx="160" cy="75" r="14" fill="#dbeafe" stroke="#2563eb"/><text x="160" y="80">10</text><circle cx="240" cy="75" r="14" fill="#dbeafe" stroke="#2563eb"/><text x="240" y="80">30</text><line x1="190" y1="52" x2="172" y2="63" stroke="#64748b"/><line x1="210" y1="52" x2="228" y2="63" stroke="#64748b"/><text x="145" y="120" fill="#dc2626">bf=&#x2212;2</text><text x="200" y="120" fill="#16a34a">bf=0</text></g></svg>' },
          { type: 'note', text: {
            zh: '插入 30 後,節點 10 的 balance factor 變為 −2(RR 情況),觸發左旋後以 20 為根的子樹恢復平衡。',
            en: 'After inserting 30, node 10 has balance factor −2 (RR case); a left rotation makes 20 the new subroot and restores balance.' } },
        ],
      },
      {
        heading: { zh: '複雜度分析', en: 'Complexity Analysis' },
        blocks: [
          { type: 'table',
            headers: [ { zh: '操作', en: 'Operation' }, { zh: '時間', en: 'Time' }, { zh: '空間', en: 'Space' } ],
            rows: [
              [ { zh: '搜尋', en: 'search' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: '插入', en: 'insert' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' } ],
              [ { zh: '刪除', en: 'delete' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' } ],
              [ { zh: '空間合計', en: 'Total Space' }, { zh: '—', en: '—' }, { zh: '$O(N)$', en: '$O(N)$' } ],
            ] },
          { type: 'math', tex: 'h_{\\text{AVL}} \\leq 1.44\\,\\log_2(N+2)', caption: {
            zh: 'AVL 樹高度嚴格上界為 $1.44 \\log_2 N$,保證所有操作最壞情況下仍為 $O(\\log N)$。',
            en: 'The AVL tree height is strictly bounded by $1.44 \\log_2 N$, guaranteeing $O(\\log N)$ worst-case for all operations.' } },
        ],
      },
      {
        heading: { zh: '程式碼', en: 'Source Code' },
        blocks: [
          { type: 'code', lang: 'cpp', code: 'int getBalance(Node* N) {\n    return N ? height(N->left) - height(N->right) : 0;\n}\n\nNode* insert(Node* node, int key) {\n    if (!node) return new Node(key);\n    if (key < node->key) node->left = insert(node->left, key);\n    else if (key > node->key) node->right = insert(node->right, key);\n    else return node; // duplicate\n\n    node->height = 1 + max(height(node->left), height(node->right));\n    int balance = getBalance(node);\n\n    if (balance > 1 && key < node->left->key)  return rightRotate(node); // LL\n    if (balance < -1 && key > node->right->key) return leftRotate(node);  // RR\n    if (balance > 1 && key > node->left->key) {                           // LR\n        node->left = leftRotate(node->left); return rightRotate(node);\n    }\n    if (balance < -1 && key < node->right->key) {                         // RL\n        node->right = rightRotate(node->right); return leftRotate(node);\n    }\n    return node;\n}' },
        ],
      },
      {
        heading: { zh: '優缺點與使用時機', en: 'Pros, Cons & When to Use' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '優點:嚴格平衡,保證 $O(\\log N)$ 搜尋,比 Red-Black Tree 更快的查詢。', en: 'Pro: strictly balanced — guarantees $O(\\log N)$ search; faster lookups than Red-Black trees.' },
            { zh: '優點:平衡因子僅需儲存高度差,實作相對直覺。', en: 'Pro: balance factor is just a height difference — relatively intuitive to implement.' },
            { zh: '缺點:插入/刪除可能觸發多次旋轉,比 Red-Black Tree 略慢。', en: 'Con: insert/delete may trigger multiple rotations — slightly slower than Red-Black trees for write-heavy workloads.' },
            { zh: '適用:讀取頻繁、寫入較少的場景,如符號表、資料庫索引。', en: 'Use in read-heavy workloads with infrequent writes, e.g. symbol tables, database indexes.' },
          ] },
        ],
      },
      {
        heading: { zh: '小結', en: 'Summary' },
        blocks: [
          { type: 'bullets', items: [
            { zh: 'balance factor ∈ {−1, 0, 1};超出即觸發 LL/RR/LR/RL 旋轉修正。', en: 'balance factor ∈ {−1, 0, 1}; any violation triggers LL/RR/LR/RL rotation.' },
            { zh: '嚴格高度平衡保證所有操作最壞情況 $O(\\log N)$。', en: 'Strict height balance guarantees $O(\\log N)$ worst-case for all operations.' },
            { zh: '適合查詢密集型場景;寫入頻繁時 Red-Black Tree 是更好的選擇。', en: 'Best for lookup-intensive scenarios; Red-Black Tree is preferred for write-heavy use cases.' },
          ] },
        ],
      },
    ],
  },

  'tree-rb': {
    category: 'Non-Linear Structures',
    title: { zh: '紅黑樹', en: 'Red-Black Tree' },
    slides: [
      {
        heading: { zh: '紅黑樹', en: 'Red-Black Tree' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '紅黑樹是一種自平衡 BST,以節點著色(RED / BLACK)和五條不變量確保樹高不超過 $2\\log_2(N+1)$,廣泛用於 C++ `std::map`、Java `TreeMap`。',
            en: 'A Red-Black Tree is a self-balancing BST that uses node coloring (RED / BLACK) and five invariants to keep tree height within $2\\log_2(N+1)$; widely used in C++ `std::map` and Java `TreeMap`.' } },
        ],
      },
      {
        heading: { zh: '核心概念', en: 'Core Concept' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '五條 Red-Black 不變量共同約束深度差異:每條根至 null 路徑的 black-height 相同,且紅節點不能有紅子節點。',
            en: 'Five Red-Black invariants jointly constrain depth differences: every root-to-null path has the same black-height, and no red node may have a red child.' } },
          { type: 'bullets', items: [
            { zh: '規則 1:每個節點非紅即黑。', en: 'Rule 1: every node is either RED or BLACK.' },
            { zh: '規則 2:根節點必為黑色。', en: 'Rule 2: the root is always BLACK.' },
            { zh: '規則 3:紅色節點的兩個子節點必須為黑色(不能有連續兩個紅節點)。', en: 'Rule 3: both children of a RED node must be BLACK (no two consecutive RED nodes).' },
            { zh: '規則 4:從任一節點到其所有 null 後代,路徑中的黑色節點數相同(black-height)。', en: 'Rule 4: every path from any node to its null descendants contains the same number of BLACK nodes (black-height).' },
            { zh: '規則 5:所有 NIL(葉哨兵)節點均為黑色。', en: 'Rule 5: every NIL (leaf sentinel) node is BLACK.' },
            { zh: '插入後透過重新著色(recoloring)與旋轉(rotation)修復違規。', en: 'After insertion, violations are fixed via recoloring and rotations.' },
          ] },
        ],
      },
      {
        heading: { zh: '運作流程', en: 'Operation Flow' },
        blocks: [
          { type: 'steps', items: [
            { zh: '以標準 BST 插入方式插入新節點,初始著色為紅色。', en: 'Insert the new node using standard BST insertion; color it RED initially.' },
            { zh: '若父節點為黑色則不違規,結束。', en: 'If the parent is BLACK, no violation occurs — done.' },
            { zh: '若父節點為紅色,判斷叔父(uncle)節點顏色。', en: 'If the parent is RED, check the uncle node color.' },
            { zh: 'Case 1(叔父為紅):父、叔父均改黑,祖父改紅,繼續向上修復。', en: 'Case 1 (uncle is RED): recolor parent & uncle BLACK, grandparent RED, continue fix upward.' },
            { zh: 'Case 2/3(叔父為黑):執行旋轉並交換父祖父顏色完成修復。', en: 'Case 2/3 (uncle is BLACK): perform rotation and swap parent/grandparent colors to finish.' },
          ] },
          { type: 'mermaid', code: 'flowchart TD\n  A["BST insert\\n(color RED)"] --> B{"parent BLACK?"}  \n  B -->|yes| C["done"]\n  B -->|no| D{"uncle RED?"}\n  D -->|yes| E["recolor\\n+ fix upward"]\n  D -->|no| F["rotate\\n+ recolor"]' },
        ],
      },
      {
        heading: { zh: '紅黑樹結構示意', en: 'Red-Black Tree Structure' },
        blocks: [
          { type: 'svg', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 130" width="300" height="130"><g font-family="sans-serif" font-size="12" text-anchor="middle"><circle cx="150" cy="20" r="16" fill="#1e293b" stroke="#1e293b"/><text x="150" y="25" fill="white">7</text><circle cx="80" cy="65" r="16" fill="#dc2626" stroke="#991b1b"/><text x="80" y="70" fill="white">3</text><circle cx="220" cy="65" r="16" fill="#1e293b" stroke="#1e293b"/><text x="220" y="70" fill="white">11</text><circle cx="45" cy="110" r="16" fill="#1e293b" stroke="#1e293b"/><text x="45" y="115" fill="white">1</text><circle cx="115" cy="110" r="16" fill="#1e293b" stroke="#1e293b"/><text x="115" y="115" fill="white">5</text><line x1="140" y1="34" x2="92" y2="51" stroke="#64748b"/><line x1="160" y1="34" x2="208" y2="51" stroke="#64748b"/><line x1="70" y1="79" x2="55" y2="96" stroke="#64748b"/><line x1="90" y1="79" x2="105" y2="96" stroke="#64748b"/></g></svg>' },
          { type: 'note', text: {
            zh: '黑節點為深色,紅節點為紅色;根節點 7 為黑色,每條根至 null 路徑包含 2 個黑色節點(black-height=2)。',
            en: 'Black nodes are dark, red nodes are red. Root 7 is BLACK; every root-to-null path passes through 2 BLACK nodes (black-height = 2).' } },
        ],
      },
      {
        heading: { zh: '複雜度分析', en: 'Complexity Analysis' },
        blocks: [
          { type: 'table',
            headers: [ { zh: '操作', en: 'Operation' }, { zh: '時間', en: 'Time' }, { zh: '空間', en: 'Space' } ],
            rows: [
              [ { zh: '搜尋', en: 'search' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: '插入', en: 'insert' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' } ],
              [ { zh: '刪除', en: 'delete' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' } ],
              [ { zh: '空間合計', en: 'Total Space' }, { zh: '—', en: '—' }, { zh: '$O(N)$', en: '$O(N)$' } ],
            ] },
          { type: 'math', tex: 'h_{\\text{RB}} \\leq 2\\log_2(N+1)', caption: {
            zh: 'Red-Black Tree 高度上界為 $2\\log_2(N+1)$,比 AVL 稍鬆但仍保證 $O(\\log N)$。',
            en: 'Red-Black Tree height is bounded by $2\\log_2(N+1)$ — slightly looser than AVL, but still $O(\\log N)$.' } },
        ],
      },
      {
        heading: { zh: '程式碼', en: 'Source Code' },
        blocks: [
          { type: 'code', lang: 'cpp', code: 'enum Color { RED, BLACK };\n\nstruct Node {\n    int data; bool color;\n    Node *left, *right, *parent;\n    Node(int d) : data(d), color(RED),\n        left(nullptr), right(nullptr), parent(nullptr) {}\n};\n\nvoid fixViolation(Node*& root, Node*& pt) {\n    while ((pt != root) && (pt->color != BLACK)\n           && (pt->parent->color == RED)) {\n        Node* parent = pt->parent;\n        Node* grandparent = parent->parent;\n        // Case: parent is left child of grandparent\n        if (parent == grandparent->left) {\n            Node* uncle = grandparent->right;\n            if (uncle && uncle->color == RED) { // Recolor\n                grandparent->color = RED;\n                parent->color = uncle->color = BLACK;\n                pt = grandparent;\n            } else { /* rotate + recolor */ }\n        } /* mirror for right-child case */\n    }\n    root->color = BLACK;\n}' },
        ],
      },
      {
        heading: { zh: '優缺點與使用時機', en: 'Pros, Cons & When to Use' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '優點:插入/刪除旋轉次數有常數上界,寫入效率優於 AVL Tree。', en: 'Pro: insert/delete rotations are bounded by a constant — better write performance than AVL.' },
            { zh: '優點:廣泛支援:C++ `std::map`、`std::set`、Linux 排程器均使用紅黑樹。', en: 'Pro: ubiquitous — used by C++ `std::map`, `std::set`, and the Linux scheduler.' },
            { zh: '缺點:五條不變量使實作複雜,除錯困難。', en: 'Con: five invariants make the implementation complex and difficult to debug.' },
            { zh: '缺點:比 AVL Tree 允許稍大的高度差,搜尋略慢。', en: 'Con: allows slightly larger height imbalance than AVL — marginally slower lookups.' },
            { zh: '適用:讀寫均衡的有序關聯容器,如 map、set、排程優先佇列。', en: 'Use for balanced read/write ordered containers, e.g. map, set, scheduler priority queues.' },
          ] },
        ],
      },
      {
        heading: { zh: '小結', en: 'Summary' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '五條染色不變量約束黑高度,使樹高不超過 $2\\log_2 N$。', en: 'Five coloring invariants constrain black-height, keeping tree height ≤ $2\\log_2 N$.' },
            { zh: '插入最多 2 次旋轉,比 AVL 的潛在多次旋轉更少。', en: 'Insert requires at most 2 rotations — fewer than the potentially multiple rotations in AVL.' },
            { zh: '工業界最廣泛使用的平衡 BST 實作。', en: 'The most widely used self-balancing BST in industrial software.' },
          ] },
        ],
      },
    ],
  },

  'tree-splay': {
    category: 'Non-Linear Structures',
    title: { zh: 'Splay 樹', en: 'Splay Tree' },
    slides: [
      {
        heading: { zh: 'Splay 樹', en: 'Splay Tree' },
        blocks: [
          { type: 'paragraph', text: {
            zh: 'Splay 樹是一種自調整 BST:每次存取(搜尋/插入)節點後,立即以 splay 操作將該節點旋轉至根部,使最近存取的資料保持在樹頂附近,攤銷時間複雜度為 $O(\\log N)$。',
            en: 'A Splay Tree is a self-adjusting BST: after every access (search/insert), the accessed node is rotated to the root via splay operations, keeping recently accessed data near the top. Amortized time complexity is $O(\\log N)$.' } },
        ],
      },
      {
        heading: { zh: '核心概念', en: 'Core Concept' },
        blocks: [
          { type: 'paragraph', text: {
            zh: 'Splay 操作由三種基本旋轉組合構成,根據目標節點與其父/祖父的相對位置選擇不同策略。',
            en: 'Splaying consists of three basic rotation patterns chosen based on the target node\'s position relative to its parent and grandparent.' } },
          { type: 'bullets', items: [
            { zh: 'Zig:目標節點的父節點即為根,對父節點執行單次旋轉。', en: 'Zig: target\'s parent is the root — perform a single rotation on the parent.' },
            { zh: 'Zig-Zig:目標與父節點同為左子(或同為右子)— 先旋轉祖父,再旋轉父節點(同向雙旋)。', en: 'Zig-Zig: target and parent are both left (or both right) children — rotate grandparent first, then parent (same-direction double rotation).' },
            { zh: 'Zig-Zag:目標與父節點方向相反 — 執行兩次異向旋轉。', en: 'Zig-Zag: target and parent are in opposite directions — perform two rotations in alternating directions.' },
            { zh: '局部性原理:若存取模式有 80/20 規律,常用節點自動保持在根附近接近 $O(1)$。', en: 'Locality principle: with 80/20 access patterns, hot nodes self-organize near the root approaching $O(1)$.' },
          ] },
        ],
      },
      {
        heading: { zh: '運作流程', en: 'Operation Flow' },
        blocks: [
          { type: 'steps', items: [
            { zh: '以標準 BST 搜尋找到目標節點(或最接近的節點)。', en: 'Locate the target (or closest) node via standard BST search.' },
            { zh: '判斷目標節點、父節點、祖父節點的相對位置,選擇 Zig/Zig-Zig/Zig-Zag 策略。', en: 'Determine the relative positions of target, parent, and grandparent to select Zig/Zig-Zig/Zig-Zag.' },
            { zh: '執行對應旋轉,將目標節點上移一層或兩層。', en: 'Execute the corresponding rotation(s), moving the target one or two levels up.' },
            { zh: '重複直到目標節點成為新的根節點。', en: 'Repeat until the target node becomes the new root.' },
          ] },
          { type: 'mermaid', code: 'flowchart LR\n  A["search(10)\\ntree: 10->20->30"] -->|"splay(10)"| B["10 becomes root\\n10: left=null, right=20->30"]\n  B -->|"search(30)"| C["splay(30)\\n30 becomes root"]' },
        ],
      },
      {
        heading: { zh: 'Splay 操作示意', en: 'Splay Operation Diagram' },
        blocks: [
          { type: 'svg', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 130" width="340" height="130"><g font-family="sans-serif" font-size="11" text-anchor="middle"><text x="65" y="14" fill="#64748b">Before splay(10)</text><circle cx="65" cy="35" r="14" fill="#dbeafe" stroke="#2563eb"/><text x="65" y="40">30</text><circle cx="35" cy="75" r="14" fill="#dbeafe" stroke="#2563eb"/><text x="35" y="80">20</text><circle cx="10" cy="110" r="14" fill="#fef9c3" stroke="#ca8a04"/><text x="10" y="115">10</text><line x1="56" y1="47" x2="44" y2="63" stroke="#64748b"/><line x1="27" y1="87" x2="17" y2="98" stroke="#64748b"/><text x="220" y="14" fill="#64748b">After splay(10)</text><circle cx="220" cy="35" r="14" fill="#fef9c3" stroke="#ca8a04"/><text x="220" y="40">10</text><circle cx="280" cy="75" r="14" fill="#dbeafe" stroke="#2563eb"/><text x="280" y="80">20</text><circle cx="310" cy="110" r="14" fill="#dbeafe" stroke="#2563eb"/><text x="310" y="115">30</text><line x1="228" y1="47" x2="270" y2="63" stroke="#64748b"/><line x1="288" y1="87" x2="300" y2="98" stroke="#64748b"/></g></svg>' },
          { type: 'note', text: {
            zh: '搜尋 10 後 splay 操作將 10 旋轉至根;下次再存取 10 僅需 $O(1)$,體現局部性優化。',
            en: 'After searching for 10, splay rotates 10 to the root; the next access to 10 costs $O(1)$, demonstrating locality optimization.' } },
        ],
      },
      {
        heading: { zh: '複雜度分析', en: 'Complexity Analysis' },
        blocks: [
          { type: 'table',
            headers: [ { zh: '操作', en: 'Operation' }, { zh: '攤銷時間', en: 'Amortized Time' }, { zh: '最壞單次', en: 'Worst Single' } ],
            rows: [
              [ { zh: '搜尋', en: 'search' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' }, { zh: '$O(N)$', en: '$O(N)$' } ],
              [ { zh: '插入', en: 'insert' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' }, { zh: '$O(N)$', en: '$O(N)$' } ],
              [ { zh: '刪除', en: 'delete' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' }, { zh: '$O(N)$', en: '$O(N)$' } ],
              [ { zh: '空間合計', en: 'Total Space' }, { zh: '—', en: '—' }, { zh: '$O(N)$', en: '$O(N)$' } ],
            ] },
          { type: 'math', tex: 'T_{\\text{amortized}} = O(\\log N)\\text{ per operation}', caption: {
            zh: '攤銷分析保證連續 $m$ 次操作總代價 $O(m \\log N)$;單次最壞為 $O(N)$。',
            en: 'Amortized analysis guarantees total cost of $m$ operations is $O(m \\log N)$; single-call worst case is $O(N)$.' } },
        ],
      },
      {
        heading: { zh: '程式碼', en: 'Source Code' },
        blocks: [
          { type: 'code', lang: 'cpp', code: 'Node* splay(Node* root, int key) {\n    if (!root || root->key == key) return root;\n    if (root->key > key) {          // key is in left subtree\n        if (!root->left) return root;\n        if (root->left->key > key) { // Zig-Zig (left-left)\n            root->left->left = splay(root->left->left, key);\n            root = rightRotate(root);\n        } else if (root->left->key < key) { // Zig-Zag (left-right)\n            root->left->right = splay(root->left->right, key);\n            if (root->left->right)\n                root->left = leftRotate(root->left);\n        }\n        return root->left ? rightRotate(root) : root;\n    } else {                        // key is in right subtree\n        if (!root->right) return root;\n        if (root->right->key > key) { // Zig-Zag (right-left)\n            root->right->left = splay(root->right->left, key);\n            if (root->right->left)\n                root->right = rightRotate(root->right);\n        } else if (root->right->key < key) { // Zig-Zig (right-right)\n            root->right->right = splay(root->right->right, key);\n            root = leftRotate(root);\n        }\n        return root->right ? leftRotate(root) : root;\n    }\n}' },
        ],
      },
      {
        heading: { zh: '優缺點與使用時機', en: 'Pros, Cons & When to Use' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '優點:無需儲存高度/顏色等額外欄位,記憶體使用最精簡。', en: 'Pro: no extra height or color fields needed — minimal memory footprint.' },
            { zh: '優點:局部性優化:頻繁存取的節點自動在根附近,$O(1)$ 第二次存取。', en: 'Pro: locality optimization — frequently accessed nodes self-organize near the root ($O(1)$ on repeat access).' },
            { zh: '缺點:單次操作最壞 $O(N)$,不適合對延遲有嚴格要求的即時系統。', en: 'Con: single-call worst case is $O(N)$ — unsuitable for latency-sensitive real-time systems.' },
            { zh: '適用:具有明顯存取局部性的快取、編譯器符號表、網路路由表。', en: 'Use for workloads with strong access locality: caches, compiler symbol tables, routing tables.' },
          ] },
        ],
      },
      {
        heading: { zh: '小結', en: 'Summary' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '每次存取後 splay 至根;Zig/Zig-Zig/Zig-Zag 三種旋轉策略。', en: 'Every access splays the node to root; three strategies: Zig, Zig-Zig, Zig-Zag.' },
            { zh: '攤銷 $O(\\log N)$,熱點資料趨近 $O(1)$;單次最壞 $O(N)$。', en: 'Amortized $O(\\log N)$; hot data approaches $O(1)$; single worst case $O(N)$.' },
            { zh: '結構最簡(無額外欄位),適合局部性明顯的動態存取模式。', en: 'Structurally minimal (no extra fields); ideal for dynamic workloads with strong access locality.' },
          ] },
        ],
      },
    ],
  },

  'tree-trie': {
    category: 'Non-Linear Structures',
    title: { zh: 'Trie(前綴樹)', en: 'Trie (Prefix Tree)' },
    slides: [
      {
        heading: { zh: 'Trie(前綴樹)', en: 'Trie (Prefix Tree)' },
        blocks: [
          { type: 'paragraph', text: {
            zh: 'Trie 是一種以字元為邊的 26-ary 樹結構,專為字串前綴搜尋設計:搜尋或插入長度 $L$ 的字串只需 $O(L)$ 時間,與樹中字串數量無關。',
            en: 'A Trie is a 26-ary tree where each edge represents a character, purpose-built for string prefix search: inserting or searching for a string of length $L$ costs $O(L)$ — independent of the number of strings in the tree.' } },
        ],
      },
      {
        heading: { zh: '核心概念', en: 'Core Concept' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '節點本身不儲存字元;字元由父節點到子節點的邊(指標陣列的索引 0-25)隱式表示。節點上的 `isEndOfWord` 旗標標示一個有效字串的結尾。',
            en: 'Nodes do not store characters directly; the character is implicitly represented by the edge index (0-25) chosen from the parent\'s `children` array. The `isEndOfWord` flag on a node marks the end of a valid string.' } },
          { type: 'bullets', items: [
            { zh: '插入:逐字元走訪,遇到 `nullptr` 就建立新節點,最後設 `isEndOfWord = true`。', en: 'Insert: traverse character by character; allocate a new node on `nullptr`; set `isEndOfWord = true` at the last character.' },
            { zh: '搜尋:逐字元走訪到底,回傳最後節點的 `isEndOfWord` 值。', en: 'Search: traverse all characters to the end; return the final node\'s `isEndOfWord`.' },
            { zh: '前綴搜尋:只需走訪前綴字元,不用走到 `isEndOfWord`。', en: 'Prefix search: traverse only the prefix characters — no need to reach `isEndOfWord`.' },
            { zh: '空間代價高:每節點固定 26 個指標,儲存 $N$ 個字串共需 $O(N \\cdot L)$ 個節點。', en: 'High space cost: each node holds 26 pointers — storing $N$ strings of length $L$ requires $O(N \\cdot L)$ nodes.' },
          ] },
        ],
      },
      {
        heading: { zh: '運作流程', en: 'Operation Flow' },
        blocks: [
          { type: 'steps', items: [
            { zh: '計算字元索引:`index = c - \'A\'`(索引 0-25)。', en: 'Compute character index: `index = c - \'A\'` (index 0-25).' },
            { zh: '若 `children[index] == nullptr` 則建立新 `TrieNode`。', en: 'If `children[index] == nullptr`, allocate a new `TrieNode`.' },
            { zh: '移動到子節點,繼續處理下一個字元。', en: 'Advance to the child node and process the next character.' },
            { zh: '字串結束時設 `curr->isEndOfWord = true`。', en: 'At the end of the string, set `curr->isEndOfWord = true`.' },
          ] },
          { type: 'mermaid', code: 'flowchart LR\n  ROOT["root"] -->|C| C_NODE["C"]\n  C_NODE -->|A| CA["CA"]\n  CA -->|R| CAR["CAR*"]\n  CA -->|T| CAT["CAT*"]\n  ROOT -->|D| D_NODE["D"]\n  D_NODE -->|O| DO["DO"]\n  DO -->|G| DOG["DOG*"]' },
        ],
      },
      {
        heading: { zh: 'Trie 結構示意', en: 'Trie Structure Diagram' },
        blocks: [
          { type: 'svg', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 130" width="320" height="130"><g font-family="sans-serif" font-size="11" text-anchor="middle"><rect x="138" y="5" width="44" height="22" rx="4" fill="#f1f5f9" stroke="#94a3b8"/><text x="160" y="21">root</text><rect x="60" y="45" width="40" height="22" rx="4" fill="#dbeafe" stroke="#2563eb"/><text x="80" y="61">C</text><rect x="240" y="45" width="40" height="22" rx="4" fill="#dbeafe" stroke="#2563eb"/><text x="260" y="61">D</text><rect x="30" y="88" width="40" height="22" rx="4" fill="#dbeafe" stroke="#2563eb"/><text x="50" y="104">CA</text><rect x="200" y="88" width="40" height="22" rx="4" fill="#dbeafe" stroke="#2563eb"/><text x="220" y="104">DO</text><rect x="5" y="110" width="38" height="18" rx="4" fill="#dcfce7" stroke="#16a34a"/><text x="24" y="123">CAR*</text><rect x="60" y="110" width="38" height="18" rx="4" fill="#dcfce7" stroke="#16a34a"/><text x="79" y="123">CAT*</text><rect x="200" y="110" width="38" height="18" rx="4" fill="#dcfce7" stroke="#16a34a"/><text x="219" y="123">DOG*</text><line x1="155" y1="27" x2="92" y2="45" stroke="#64748b"/><line x1="165" y1="27" x2="248" y2="45" stroke="#64748b"/><line x1="75" y1="67" x2="55" y2="88" stroke="#64748b"/><line x1="85" y1="67" x2="55" y2="88" stroke="#64748b"/><line x1="255" y1="67" x2="215" y2="88" stroke="#64748b"/><line x1="42" y1="110" x2="22" y2="110" stroke="#64748b"/><line x1="55" y1="110" x2="70" y2="110" stroke="#64748b"/></g></svg>' },
          { type: 'note', text: {
            zh: '綠色標記 * 的節點為 `isEndOfWord=true`;前綴 "CA" 共享同一路徑節點,節省重複儲存。',
            en: 'Green nodes marked * have `isEndOfWord=true`; prefix "CA" is shared by CAR and CAT — eliminating redundant storage.' } },
        ],
      },
      {
        heading: { zh: '複雜度分析', en: 'Complexity Analysis' },
        blocks: [
          { type: 'table',
            headers: [ { zh: '操作', en: 'Operation' }, { zh: '時間', en: 'Time' }, { zh: '空間', en: 'Space' } ],
            rows: [
              [ { zh: '插入字串', en: 'insert string' }, { zh: '$O(L)$', en: '$O(L)$' }, { zh: '$O(L)$', en: '$O(L)$' } ],
              [ { zh: '搜尋字串', en: 'search string' }, { zh: '$O(L)$', en: '$O(L)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: '前綴搜尋', en: 'prefix search' }, { zh: '$O(P)$', en: '$O(P)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: '空間合計', en: 'Total Space' }, { zh: '—', en: '—' }, { zh: '$O(N \\cdot L)$', en: '$O(N \\cdot L)$' } ],
            ] },
          { type: 'math', tex: 'T_{\\text{search}}(L) = O(L)', caption: {
            zh: '搜尋/插入時間僅取決於字串長度 $L$,與字典中字串數量 $N$ 完全無關。',
            en: 'Search/insert time depends only on string length $L$, completely independent of the number of strings $N$ in the dictionary.' } },
        ],
      },
      {
        heading: { zh: '程式碼', en: 'Source Code' },
        blocks: [
          { type: 'code', lang: 'cpp', code: 'class TrieNode {\npublic:\n    TrieNode* children[26];\n    bool isEndOfWord;\n    TrieNode() {\n        isEndOfWord = false;\n        for (int i = 0; i < 26; i++) children[i] = nullptr;\n    }\n};\n\nvoid insert(string word) {\n    TrieNode* curr = root;\n    for (char c : word) {\n        int index = c - \'A\'; // uppercase A-Z\n        if (!curr->children[index])\n            curr->children[index] = new TrieNode();\n        curr = curr->children[index];\n    }\n    curr->isEndOfWord = true;\n}\n\nbool search(string word) {\n    TrieNode* curr = root;\n    for (char c : word) {\n        int index = c - \'A\';\n        if (!curr->children[index]) return false;\n        curr = curr->children[index];\n    }\n    return curr->isEndOfWord;\n}' },
        ],
      },
      {
        heading: { zh: '優缺點與使用時機', en: 'Pros, Cons & When to Use' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '優點:前綴搜尋/自動補全 $O(L)$,完全不受字典大小影響。', en: 'Pro: prefix search / autocomplete in $O(L)$ — unaffected by dictionary size.' },
            { zh: '優點:可自然支援所有以相同前綴開頭的單字列舉。', en: 'Pro: naturally supports enumerating all words sharing a prefix.' },
            { zh: '缺點:每節點固定 26 個指標,稀疏時記憶體浪費嚴重。', en: 'Con: each node holds 26 pointers — severe memory waste when the tree is sparse.' },
            { zh: '適用:自動完成、拼字檢查、IP 路由前綴匹配。', en: 'Use for autocomplete, spell checking, and IP routing prefix matching.' },
          ] },
        ],
      },
      {
        heading: { zh: '小結', en: 'Summary' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '字元以邊索引隱式表示;`isEndOfWord` 標記字串結尾。', en: 'Characters are implicitly encoded as edge indices; `isEndOfWord` marks string endings.' },
            { zh: '插入/搜尋 $O(L)$,與字典規模無關。', en: 'Insert/search is $O(L)$ — independent of dictionary size.' },
            { zh: '稀疏時記憶體開銷大;Radix Tree 與 TST 是空間最佳化替代方案。', en: 'High memory cost when sparse; Radix Tree and TST are space-optimized alternatives.' },
          ] },
        ],
      },
    ],
  },

  'tree-radix': {
    category: 'Non-Linear Structures',
    title: { zh: 'Radix 樹(壓縮前綴樹)', en: 'Radix Tree (Compressed Trie)' },
    slides: [
      {
        heading: { zh: 'Radix 樹(壓縮前綴樹)', en: 'Radix Tree (Compressed Trie)' },
        blocks: [
          { type: 'paragraph', text: {
            zh: 'Radix 樹(又稱 Patricia Trie)是 Trie 的空間最佳化版本:將只有單一子節點的線性鏈壓縮成一條帶有字串標籤的邊,大幅減少節點數量。',
            en: 'A Radix Tree (also called Patricia Trie) is a space-optimized Trie: chains of single-child nodes are compressed into one edge with a string label, drastically reducing node count.' } },
        ],
      },
      {
        heading: { zh: '核心概念', en: 'Core Concept' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '插入新字串時,依照最長公共前綴(LCP)找到分叉點;若插入的字串與現有邊的標籤有公共前綴但又不完全相同,則在 LCP 處分裂邊並建立兩個子節點。',
            en: 'On insertion, the longest common prefix (LCP) with existing edge labels is found. If the new string shares part but not all of an existing label, the edge is split at the LCP, creating two child nodes.' } },
          { type: 'bullets', items: [
            { zh: '邊標籤:可以是多字元字串(如 "WATER"),不限單一字元。', en: 'Edge labels: may be multi-character strings (e.g. "WATER"), not limited to one character.' },
            { zh: '分裂:插入 "WATCH" 時,"WATER" 邊在 "WAT" 處分裂成 "ER" 與 "CH" 兩條子邊。', en: 'Splitting: inserting "WATCH" splits the "WATER" edge at "WAT", producing two sub-edges "ER" and "CH".' },
            { zh: '搜尋:逐層比對邊標籤前綴,時間 $O(L)$,但常數比 Trie 更小。', en: 'Search: compare edge labels level by level in $O(L)$ time, with a smaller constant than standard Trie.' },
            { zh: '節點數量上界:最多為插入字串數量的兩倍。', en: 'Node count bound: at most twice the number of inserted strings.' },
          ] },
        ],
      },
      {
        heading: { zh: '運作流程', en: 'Operation Flow' },
        blocks: [
          { type: 'steps', items: [
            { zh: '從根節點出發,比對插入字串與各子邊標籤的最長公共前綴。', en: 'Start at root; find the longest common prefix between the insertion string and each child edge label.' },
            { zh: '若完全匹配:沿邊移動,繼續處理剩餘字元。', en: 'Full match: follow the edge and process the remaining characters.' },
            { zh: '若部分匹配:在 LCP 處分裂邊,建立新中間節點,連接舊後綴與新後綴。', en: 'Partial match: split the edge at the LCP; create a new intermediate node connecting the old suffix and new suffix.' },
            { zh: '若無匹配:在當前節點新增帶有剩餘字元的子邊。', en: 'No match: add a new child edge with the remaining characters at the current node.' },
          ] },
          { type: 'mermaid', code: 'flowchart TD\n  A["insert WATER\\nroot -> WATER*"] -->|"insert WATCH"| B["split at WAT\\nroot -> WAT -> ER*\\n              -> CH*"]' },
        ],
      },
      {
        heading: { zh: 'Radix 樹壓縮示意', en: 'Radix Tree Compression Diagram' },
        blocks: [
          { type: 'svg', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 130" width="320" height="130"><g font-family="sans-serif" font-size="11" text-anchor="middle"><rect x="130" y="5" width="60" height="22" rx="4" fill="#f1f5f9" stroke="#94a3b8"/><text x="160" y="21">root</text><rect x="120" y="50" width="80" height="22" rx="4" fill="#dbeafe" stroke="#2563eb"/><text x="160" y="65">"WAT" node</text><rect x="60" y="100" width="60" height="22" rx="4" fill="#dcfce7" stroke="#16a34a"/><text x="90" y="115">ER* (WATER)</text><rect x="185" y="100" width="60" height="22" rx="4" fill="#dcfce7" stroke="#16a34a"/><text x="215" y="115">CH* (WATCH)</text><line x1="160" y1="27" x2="160" y2="50" stroke="#2563eb" stroke-width="2"/><text x="175" y="44" fill="#64748b" font-size="10">WAT</text><line x1="140" y1="72" x2="95" y2="100" stroke="#64748b"/><text x="107" y="93" fill="#64748b" font-size="10">ER</text><line x1="180" y1="72" x2="210" y2="100" stroke="#64748b"/><text x="205" y="93" fill="#64748b" font-size="10">CH</text></g></svg>' },
          { type: 'note', text: {
            zh: '"WATER" 與 "WATCH" 共享前綴 "WAT" 儲存在同一節點,僅在差異點分叉,相比 Trie 大量節省節點數。',
            en: '"WATER" and "WATCH" share prefix "WAT" in one node, branching only at the point of difference — far fewer nodes than a standard Trie.' } },
        ],
      },
      {
        heading: { zh: '複雜度分析', en: 'Complexity Analysis' },
        blocks: [
          { type: 'table',
            headers: [ { zh: '操作', en: 'Operation' }, { zh: '時間', en: 'Time' }, { zh: '空間', en: 'Space' } ],
            rows: [
              [ { zh: '插入字串', en: 'insert string' }, { zh: '$O(L)$', en: '$O(L)$' }, { zh: '$O(L)$', en: '$O(L)$' } ],
              [ { zh: '搜尋字串', en: 'search string' }, { zh: '$O(L)$', en: '$O(L)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: '空間合計', en: 'Total Space' }, { zh: '—', en: '—' }, { zh: '$O(N \\cdot L)$', en: '$O(N \\cdot L)$' } ],
            ] },
          { type: 'math', tex: 'T_{\\text{search}}(L) = O(L),\\quad \\text{nodes} \\leq 2N', caption: {
            zh: '搜尋時間 $O(L)$;節點總數最多為插入字串數量 $N$ 的兩倍,遠低於標準 Trie。',
            en: 'Search is $O(L)$; total node count is at most $2N$ — far lower than a standard Trie.' } },
        ],
      },
      {
        heading: { zh: '程式碼', en: 'Source Code' },
        blocks: [
          { type: 'code', lang: 'cpp', code: 'class RadixNode {\npublic:\n    map<string, RadixNode*> edges; // edge label -> child\n    bool isEndOfWord;\n    RadixNode() : isEndOfWord(false) {}\n};\n\n// Simplified insert: each word stored as a single edge from root.\n// In a full radix tree, edges are split on longest-common-prefix.\nvoid insert(string word) {\n    RadixNode* curr = root;\n    // Real implementation: scan edges for LCP, split if partial match\n    if (curr->edges.find(word) == curr->edges.end())\n        curr->edges[word] = new RadixNode();\n    curr->edges[word]->isEndOfWord = true;\n    // e.g., insert "WATCH" after "WATER":\n    // find LCP="WAT", split "WATER" edge into "WAT"->"ER" and add "CH"\n}' },
        ],
      },
      {
        heading: { zh: '優缺點與使用時機', en: 'Pros, Cons & When to Use' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '優點:節點數量遠少於 Trie,記憶體使用更高效。', en: 'Pro: far fewer nodes than a Trie — significantly better memory efficiency.' },
            { zh: '優點:搜尋時間 $O(L)$ 不變,同時具備前綴搜尋能力。', en: 'Pro: search time remains $O(L)$ while retaining full prefix-search capability.' },
            { zh: '缺點:分裂/合併邏輯比標準 Trie 複雜,實作更困難。', en: 'Con: split/merge logic is more complex than standard Trie — harder to implement correctly.' },
            { zh: '適用:IP 路由表(最長前綴匹配)、URL 路由、基因序列索引。', en: 'Use for IP routing tables (longest prefix match), URL routing, and genomic sequence indexing.' },
          ] },
        ],
      },
      {
        heading: { zh: '小結', en: 'Summary' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '壓縮線性鏈為多字元邊標籤,節點數上界為插入字串數量的 2 倍。', en: 'Compresses linear chains into multi-char edge labels; node count bounded by 2× the number of strings.' },
            { zh: '搜尋 $O(L)$,記憶體遠優於標準 Trie。', en: 'Search $O(L)$ with memory far superior to standard Trie.' },
            { zh: 'LCP 分裂是核心操作;廣泛用於 IP 路由與 URL 分發器。', en: 'LCP splitting is the core operation; widely used in IP routing and URL dispatchers.' },
          ] },
        ],
      },
    ],
  },

  'tree-ternary': {
    category: 'Non-Linear Structures',
    title: { zh: '三元搜尋樹 (TST)', en: 'Ternary Search Tree (TST)' },
    slides: [
      {
        heading: { zh: '三元搜尋樹 (TST)', en: 'Ternary Search Tree (TST)' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '三元搜尋樹(Ternary Search Tree, TST)是 BST 與 Trie 的混合體:每個節點儲存一個字元並擁有三個子指標(left / eq / right),兼顧字首搜尋能力與低記憶體開銷。',
            en: 'A Ternary Search Tree (TST) is a hybrid of BST and Trie: each node stores one character and has three child pointers (left / eq / right), combining prefix search capability with low memory overhead.' } },
        ],
      },
      {
        heading: { zh: '核心概念', en: 'Core Concept' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '每個節點儲存一個字元 `data`,三個子指標的語意分別為:left(當前字元較小)、eq(當前字元相等,進入下一字元)、right(當前字元較大)。',
            en: 'Each node stores one character `data` with three child pointers: left (current char is smaller), eq (current char matches — advance to next character), right (current char is larger).' } },
          { type: 'bullets', items: [
            { zh: '插入:逐字元比較,等值走 eq 到下一字元,小於走 left,大於走 right。', en: 'Insert: compare character by character; equal → take eq to next char; less → go left; greater → go right.' },
            { zh: '搜尋時間 $O(\\log N + L)$:橫向 BST 搜尋約 $O(\\log N)$,縱向字元匹配 $O(L)$。', en: 'Search time $O(\\log N + L)$: horizontal BST traversal ~$O(\\log N)$, vertical character matching $O(L)$.' },
            { zh: '空間:每節點僅 3 個指標,遠優於 Trie 的 26 個指標/節點。', en: 'Space: only 3 pointers per node — far superior to Trie\'s 26 pointers per node.' },
            { zh: '`isEndOfWord` 標誌設在最後一個字元對應的節點上。', en: '`isEndOfWord` flag is set on the node corresponding to the last character.' },
          ] },
        ],
      },
      {
        heading: { zh: '運作流程', en: 'Operation Flow' },
        blocks: [
          { type: 'steps', items: [
            { zh: '若節點為 `nullptr`:建立新節點並儲存當前字元。', en: 'If node is `nullptr`: allocate a new node storing the current character.' },
            { zh: '若 `word[index] < node->data`:遞迴至 `left` 子節點,`index` 不變。', en: 'If `word[index] < node->data`: recurse into `left` child; index unchanged.' },
            { zh: '若 `word[index] > node->data`:遞迴至 `right` 子節點,`index` 不變。', en: 'If `word[index] > node->data`: recurse into `right` child; index unchanged.' },
            { zh: '若 `word[index] == node->data`:若 index 為最後一字元則設 `isEndOfWord`,否則遞迴至 `eq` 子節點並 `index++`。', en: 'If equal: if last character set `isEndOfWord`; otherwise recurse into `eq` child and increment index.' },
          ] },
          { type: 'mermaid', code: 'flowchart TD\n  R["C(root)"] -->|"eq"| A["A"]\n  A -->|"eq"| R2["R*"]\n  R2 -->|"right"| T["T*"]\n  note1["CAR inserted, then CAT:\\nR->right=T because T > R"]' },
        ],
      },
      {
        heading: { zh: 'TST 結構示意', en: 'TST Structure Diagram' },
        blocks: [
          { type: 'svg', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 130" width="320" height="130"><g font-family="sans-serif" font-size="12" text-anchor="middle"><circle cx="160" cy="20" r="16" fill="#dbeafe" stroke="#2563eb"/><text x="160" y="25">C</text><circle cx="160" cy="60" r="16" fill="#dbeafe" stroke="#2563eb"/><text x="160" y="65">A</text><circle cx="160" cy="100" r="16" fill="#dcfce7" stroke="#16a34a"/><text x="160" y="105">R*</text><circle cx="220" cy="100" r="16" fill="#dcfce7" stroke="#16a34a"/><text x="220" y="105">T*</text><line x1="160" y1="36" x2="160" y2="44" stroke="#2563eb" stroke-dasharray="4"/><text x="175" y="52" fill="#64748b" font-size="10">eq</text><line x1="160" y1="76" x2="160" y2="84" stroke="#2563eb" stroke-dasharray="4"/><text x="175" y="92" fill="#64748b" font-size="10">eq</text><line x1="172" y1="108" x2="207" y2="108" stroke="#64748b"/><text x="193" y="104" fill="#64748b" font-size="10">right</text></g></svg>' },
          { type: 'note', text: {
            zh: '插入 "CAR" 後再插入 "CAT":三個字母 C-A 共享 eq 鏈,在第三字元 R/T 分叉:T > R,所以 T 節點成為 R 的 right 子節點。',
            en: 'After inserting "CAR" then "CAT": C-A share the eq chain; at the third character R vs T — since T > R, the T node becomes the right child of R.' } },
        ],
      },
      {
        heading: { zh: '複雜度分析', en: 'Complexity Analysis' },
        blocks: [
          { type: 'table',
            headers: [ { zh: '操作', en: 'Operation' }, { zh: '時間', en: 'Time' }, { zh: '空間', en: 'Space' } ],
            rows: [
              [ { zh: '插入字串', en: 'insert string' }, { zh: '$O(\\log N + L)$', en: '$O(\\log N + L)$' }, { zh: '$O(L)$', en: '$O(L)$' } ],
              [ { zh: '搜尋字串', en: 'search string' }, { zh: '$O(\\log N + L)$', en: '$O(\\log N + L)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: '空間合計', en: 'Total Space' }, { zh: '—', en: '—' }, { zh: '$O(N \\cdot L)$', en: '$O(N \\cdot L)$' } ],
            ] },
          { type: 'math', tex: 'T_{\\text{search}} = O(\\log N + L)', caption: {
            zh: '$\\log N$ 來自橫向 BST 比較,$L$ 來自縱向字元匹配;每節點僅 3 個指標節省 Trie 的 26 個指標開銷。',
            en: '$\\log N$ from horizontal BST comparisons; $L$ from vertical character matching. Only 3 pointers/node vs. 26 in Trie.' } },
        ],
      },
      {
        heading: { zh: '程式碼', en: 'Source Code' },
        blocks: [
          { type: 'code', lang: 'cpp', code: 'struct TSTNode {\n    char data;\n    bool isEndOfWord;\n    TSTNode *left, *eq, *right;\n    TSTNode(char c) : data(c), isEndOfWord(false),\n        left(nullptr), eq(nullptr), right(nullptr) {}\n};\n\nTSTNode* insertRecursive(TSTNode* root, const string& word, int idx) {\n    if (!root) root = new TSTNode(word[idx]);\n    if (word[idx] < root->data)\n        root->left = insertRecursive(root->left, word, idx);\n    else if (word[idx] > root->data)\n        root->right = insertRecursive(root->right, word, idx);\n    else {\n        if (idx + 1 < (int)word.length())\n            root->eq = insertRecursive(root->eq, word, idx + 1);\n        else\n            root->isEndOfWord = true;\n    }\n    return root;\n}' },
        ],
      },
      {
        heading: { zh: '優缺點與使用時機', en: 'Pros, Cons & When to Use' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '優點:每節點 3 個指標,記憶體遠優於 Trie 的 26 指標。', en: 'Pro: 3 pointers per node — far more memory-efficient than Trie\'s 26 pointers.' },
            { zh: '優點:支援前綴搜尋,比純 BST 更適合字串查詢。', en: 'Pro: supports prefix search — better than plain BST for string queries.' },
            { zh: '缺點:橫向 BST 比較帶來額外 $O(\\log N)$ 開銷,比 Trie 稍慢。', en: 'Con: horizontal BST comparisons add $O(\\log N)$ overhead compared to Trie\'s $O(L)$.' },
            { zh: '適用:拼字檢查、字典提示、近似字串匹配等記憶體敏感場景。', en: 'Use for spell checking, word suggestion, and approximate string matching in memory-sensitive scenarios.' },
          ] },
        ],
      },
      {
        heading: { zh: '小結', en: 'Summary' },
        blocks: [
          { type: 'bullets', items: [
            { zh: 'left / eq / right 三指標融合 BST 橫向比較與 Trie 縱向字元匹配。', en: 'Three pointers (left/eq/right) fuse BST horizontal comparison with Trie vertical character matching.' },
            { zh: '搜尋 $O(\\log N + L)$,每節點僅 3 個指標,是 Trie 的高效替代。', en: 'Search $O(\\log N + L)$ with only 3 pointers/node — an efficient Trie alternative.' },
            { zh: '最適合記憶體受限但需要前綴搜尋的場景,如嵌入式拼字檢查。', en: 'Best for memory-constrained prefix search, e.g. embedded spell checkers.' },
          ] },
        ],
      },
    ],
  },

  'tree-btree': {
    category: 'Non-Linear Structures',
    title: { zh: 'B-Tree(多路平衡樹)', en: 'B-Tree (Multi-way Balanced Tree)' },
    slides: [
      {
        heading: { zh: 'B-Tree(多路平衡樹)', en: 'B-Tree (Multi-way Balanced Tree)' },
        blocks: [
          { type: 'paragraph', text: {
            zh: 'B-Tree 是一種自平衡的多路搜尋樹,每個節點可儲存多個鍵值並有多個子指標,設計目標是最小化磁碟 I/O 次數:一個磁碟頁(block)對應一個節點,廣泛用於資料庫索引。',
            en: 'A B-Tree is a self-balancing multi-way search tree where each node stores multiple keys and has multiple children, designed to minimize disk I/O: one disk page corresponds to one node. Widely used in database indexing.' } },
        ],
      },
      {
        heading: { zh: '核心概念', en: 'Core Concept' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '最小度數 $t$:每個非根節點至少有 $t-1$ 個鍵值、至多有 $2t-1$ 個鍵值;相應地有 $t$ 至 $2t$ 個子指標。所有葉節點在同一層。',
            en: 'Minimum degree $t$: every non-root node has at least $t-1$ and at most $2t-1$ keys; correspondingly $t$ to $2t$ child pointers. All leaf nodes reside at the same level.' } },
          { type: 'bullets', items: [
            { zh: '分裂(Split):節點已滿時($2t-1$ 個鍵),中間鍵推送至父節點,左右各自形成新節點。', en: 'Split: when a node is full ($2t-1$ keys), the median key is pushed up to the parent; left and right halves become new nodes.' },
            { zh: 'B-Tree 向上生長:分裂傳播到根時,樹高增加 1。', en: 'B-Trees grow upward: when a split reaches the root, tree height increases by 1.' },
            { zh: '所有鍵值(含資料)儲存於內部節點與葉節點。', en: 'All key-value data is stored in both internal nodes and leaf nodes.' },
            { zh: '樹高 $O(\\log_t N)$,每層對應一次磁碟讀取。', en: 'Tree height is $O(\\log_t N)$ — each level corresponds to one disk read.' },
          ] },
        ],
      },
      {
        heading: { zh: '運作流程', en: 'Operation Flow' },
        blocks: [
          { type: 'steps', items: [
            { zh: '插入:尋找對應葉節點,若節點未滿直接插入有序位置。', en: 'Insert: locate the appropriate leaf; if not full, insert in sorted position.' },
            { zh: '若葉節點已滿($2t-1$ 鍵):分裂節點,中間鍵上推父節點。', en: 'If leaf is full ($2t-1$ keys): split the node, push median key up to parent.' },
            { zh: '若父節點因此也滿:繼續向上分裂,直到找到有空間的節點或根節點。', en: 'If the parent also becomes full: continue splitting upward until a non-full ancestor or the root is reached.' },
            { zh: '若根節點分裂:建立新根,樹高加 1。', en: 'If the root splits: create a new root, increasing tree height by 1.' },
          ] },
          { type: 'mermaid', code: 'flowchart TD\n  A["insert 5,6\\nleaf=[5,6] ok"] -->|"insert 12\\nleaf=[5,6,12] full t=2"| B["split: push 6 up\\nleft=[5] right=[12]"]\n  B --> C["root=[6]\\nleft child=[5]\\nright child=[12]"]' },
        ],
      },
      {
        heading: { zh: 'B-Tree 節點結構示意', en: 'B-Tree Node Structure Diagram' },
        blocks: [
          { type: 'svg', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 130" width="340" height="130"><g font-family="sans-serif" font-size="11" text-anchor="middle"><rect x="100" y="10" width="140" height="28" rx="4" fill="#dbeafe" stroke="#2563eb"/><text x="140" y="29">10</text><line x1="160" y1="10" x2="160" y2="38" stroke="#94a3b8"/><text x="200" y="29">25</text><rect x="20" y="65" width="80" height="28" rx="4" fill="#f1f5f9" stroke="#94a3b8"/><text x="60" y="84">5 | 8</text><rect x="130" y="65" width="80" height="28" rx="4" fill="#f1f5f9" stroke="#94a3b8"/><text x="170" y="84">12 | 18</text><rect x="240" y="65" width="80" height="28" rx="4" fill="#f1f5f9" stroke="#94a3b8"/><text x="280" y="84">30 | 40</text><line x1="120" y1="38" x2="60" y2="65" stroke="#64748b"/><line x1="160" y1="38" x2="170" y2="65" stroke="#64748b"/><line x1="200" y1="38" x2="280" y2="65" stroke="#64748b"/><text x="170" y="118" fill="#64748b">root node holds keys [10,25] and 3 child pointers</text></g></svg>' },
          { type: 'note', text: {
            zh: '根節點含有 2 個鍵(10, 25)及 3 個子指標;所有葉節點在相同深度,確保 $O(\\log_t N)$ 的最壞情況保證。',
            en: 'The root node holds 2 keys (10, 25) and 3 child pointers; all leaf nodes are at the same depth, guaranteeing $O(\\log_t N)$ worst-case performance.' } },
        ],
      },
      {
        heading: { zh: '複雜度分析', en: 'Complexity Analysis' },
        blocks: [
          { type: 'table',
            headers: [ { zh: '操作', en: 'Operation' }, { zh: '時間', en: 'Time' }, { zh: '空間', en: 'Space' } ],
            rows: [
              [ { zh: '搜尋', en: 'search' }, { zh: '$O(\\log_t N)$', en: '$O(\\log_t N)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: '插入', en: 'insert' }, { zh: '$O(\\log_t N)$', en: '$O(\\log_t N)$' }, { zh: '$O(\\log_t N)$', en: '$O(\\log_t N)$' } ],
              [ { zh: '刪除', en: 'delete' }, { zh: '$O(\\log_t N)$', en: '$O(\\log_t N)$' }, { zh: '$O(\\log_t N)$', en: '$O(\\log_t N)$' } ],
              [ { zh: '空間合計', en: 'Total Space' }, { zh: '—', en: '—' }, { zh: '$O(N)$', en: '$O(N)$' } ],
            ] },
          { type: 'math', tex: 'h \\leq \\log_t \\frac{N+1}{2}', caption: {
            zh: 'B-Tree 高度嚴格上界為 $\\log_t \\frac{N+1}{2}$;$t$ 越大(節點越寬)高度越低,磁碟 I/O 越少。',
            en: 'B-Tree height upper bound is $\\log_t \\frac{N+1}{2}$; larger $t$ (wider nodes) means lower height and fewer disk I/Os.' } },
        ],
      },
      {
        heading: { zh: '程式碼', en: 'Source Code' },
        blocks: [
          { type: 'code', lang: 'cpp', code: 'void splitChild(int i, BTreeNode* y) {\n    // Split y (full child at index i) and push median to this node\n    BTreeNode* z = new BTreeNode(y->t, y->leaf);\n    // z gets the upper half of y\'s keys\n    for (int j = 0; j < t - 1; j++)\n        z->keys.push_back(y->keys[j + t]);\n    if (!y->leaf) // z gets upper half of y\'s children\n        for (int j = 0; j < t; j++)\n            z->children.push_back(y->children[j + t]);\n    // Push median key up to this (parent) node\n    keys.insert(keys.begin() + i, y->keys[t - 1]);\n    y->keys.resize(t - 1);  // trim y to lower half\n    children.insert(children.begin() + i + 1, z);\n}\n\nvoid insert(int k) {\n    if (root->keys.size() == 2 * t - 1) { // root is full: split it\n        BTreeNode* s = new BTreeNode(t, false);\n        s->children.push_back(root);\n        s->splitChild(0, root);\n        root = s;\n    }\n    root->insertNonFull(k);\n}' },
        ],
      },
      {
        heading: { zh: '優缺點與使用時機', en: 'Pros, Cons & When to Use' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '優點:極低樹高($O(\\log_t N)$),最小化磁碟 I/O 次數。', en: 'Pro: very low tree height ($O(\\log_t N)$) — minimizes disk I/O count.' },
            { zh: '優點:所有葉節點等深,保證最壞情況一致性。', en: 'Pro: all leaves at the same depth — consistent worst-case guarantee.' },
            { zh: '缺點:範圍查詢需在非葉節點間來回,不如 B+ Tree 高效。', en: 'Con: range queries must jump between non-leaf nodes — less efficient than B+ Tree.' },
            { zh: '缺點:刪除操作複雜(需借鍵或合併節點)。', en: 'Con: deletion is complex — requires borrowing keys or merging nodes.' },
            { zh: '適用:資料庫系統、檔案系統(如 ext4、NTFS)索引結構。', en: 'Use for database indexing and file system structures (ext4, NTFS).' },
          ] },
        ],
      },
      {
        heading: { zh: '小結', en: 'Summary' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '每節點多鍵多子指標,樹高 $O(\\log_t N)$,有效減少磁碟 I/O。', en: 'Multiple keys and children per node; height $O(\\log_t N)$ — effective at reducing disk I/O.' },
            { zh: '節點滿時分裂並向上推送中間鍵;B-Tree 向上生長。', en: 'Full nodes split and push the median key upward; B-Trees grow upward.' },
            { zh: '資料庫索引基礎結構;B+ Tree 是其葉節點鏈接的擴展版本。', en: 'Foundation of database indexing; B+ Tree is the extension with linked leaf nodes.' },
          ] },
        ],
      },
    ],
  },

  'tree-bplus': {
    category: 'Non-Linear Structures',
    title: { zh: 'B+ 樹(資料庫索引標準)', en: 'B+ Tree (Database Index Standard)' },
    slides: [
      {
        heading: { zh: 'B+ 樹(資料庫索引標準)', en: 'B+ Tree (Database Index Standard)' },
        blocks: [
          { type: 'paragraph', text: {
            zh: 'B+ 樹是 B-Tree 的強化版:所有實際資料僅儲存於葉節點,內部節點只儲存路由用的鍵副本;所有葉節點以 `nextLeaf` 指標串成鏈結串列,使範圍查詢極為高效。廣泛用於 MySQL InnoDB、PostgreSQL。',
            en: 'B+ Tree is an enhanced B-Tree: all actual data resides only in leaf nodes; internal nodes hold only routing key copies. All leaf nodes are linked via `nextLeaf` pointers into a linked list, making range queries extremely efficient. Used by MySQL InnoDB and PostgreSQL.' } },
        ],
      },
      {
        heading: { zh: '核心概念', en: 'Core Concept' },
        blocks: [
          { type: 'paragraph', text: {
            zh: 'B+ 樹與 B-Tree 最關鍵的兩點區別:①所有資料在葉節點;②葉節點橫向連結。這使得範圍查詢只需下降至第一個葉節點,然後橫向掃描即可。',
            en: 'Two key differences from B-Tree: ① all data in leaf nodes; ② leaf nodes are horizontally linked. This enables range queries to descend once to the first leaf node, then scan horizontally.' } },
          { type: 'bullets', items: [
            { zh: '內部節點:僅存放路由鍵(鍵的副本),不含實際資料記錄。', en: 'Internal nodes: store only routing keys (key copies), no actual data records.' },
            { zh: '葉節點:儲存完整的鍵值對,並以 `nextLeaf` 指向下一葉節點。', en: 'Leaf nodes: store complete key-value pairs, with `nextLeaf` pointing to the next leaf.' },
            { zh: '範圍查詢:下降至起始葉節點後橫向遍訪所有相關葉節點。', en: 'Range query: descend to the start leaf, then traverse horizontally through linked leaves.' },
            { zh: '葉分裂時:中間鍵「複製」至父節點(不是移走),葉仍保留完整資料。', en: 'Leaf split: the median key is copied (not moved) up to the parent — the leaf retains all its data.' },
          ] },
        ],
      },
      {
        heading: { zh: '運作流程', en: 'Operation Flow' },
        blocks: [
          { type: 'steps', items: [
            { zh: '插入:沿內部節點路由鍵向下找到對應葉節點。', en: 'Insert: follow internal routing keys downward to the target leaf node.' },
            { zh: '若葉節點未滿:在葉中有序插入鍵值對。', en: 'If leaf is not full: insert the key-value pair in sorted order within the leaf.' },
            { zh: '若葉節點已滿:分裂葉,將中間鍵的副本推送至父節點,更新 `nextLeaf` 鏈。', en: 'If leaf is full: split the leaf, copy the median key up to the parent, and update the `nextLeaf` chain.' },
            { zh: '範圍查詢 `[lo, hi]`:定位 `lo` 的葉節點,沿 `nextLeaf` 掃描直到超過 `hi`。', en: 'Range query `[lo, hi]`: locate the leaf for `lo`, then scan via `nextLeaf` until exceeding `hi`.' },
          ] },
          { type: 'mermaid', code: 'flowchart TD\n  INNER["Internal: [20, 40]"] --> L1["Leaf1: 10,15\\nnextLeaf=L2"]\n  INNER --> L2["Leaf2: 20,30\\nnextLeaf=L3"]\n  INNER --> L3["Leaf3: 40,50\\nnextLeaf=null"]\n  L1 -->|"nextLeaf"| L2\n  L2 -->|"nextLeaf"| L3' },
        ],
      },
      {
        heading: { zh: 'B+ 樹葉節點鏈結示意', en: 'B+ Tree Leaf Chain Diagram' },
        blocks: [
          { type: 'svg', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 130" width="360" height="130"><g font-family="sans-serif" font-size="11" text-anchor="middle"><rect x="130" y="5" width="100" height="24" rx="4" fill="#dbeafe" stroke="#2563eb"/><text x="180" y="22">Internal: 20 | 40</text><rect x="10" y="55" width="90" height="24" rx="4" fill="#dcfce7" stroke="#16a34a"/><text x="55" y="72">10 | 15</text><rect x="135" y="55" width="90" height="24" rx="4" fill="#dcfce7" stroke="#16a34a"/><text x="180" y="72">20 | 30</text><rect x="260" y="55" width="90" height="24" rx="4" fill="#dcfce7" stroke="#16a34a"/><text x="305" y="72">40 | 50</text><line x1="155" y1="29" x2="55" y2="55" stroke="#64748b"/><line x1="180" y1="29" x2="180" y2="55" stroke="#64748b"/><line x1="205" y1="29" x2="305" y2="55" stroke="#64748b"/><line x1="100" y1="67" x2="135" y2="67" stroke="#dc2626" stroke-width="2" marker-end="url(#arr)"/><line x1="225" y1="67" x2="260" y2="67" stroke="#dc2626" stroke-width="2"/><text x="117" y="60" fill="#dc2626" font-size="9">next</text><text x="242" y="60" fill="#dc2626" font-size="9">next</text><text x="180" y="110" fill="#64748b">all data in leaves; horizontal scan for range queries</text></g></svg>' },
          { type: 'note', text: {
            zh: '內部節點僅為路由;所有資料儲存在葉節點;紅色箭頭展示 `nextLeaf` 鏈,實現 $O(K)$ 範圍掃描。',
            en: 'Internal nodes are routing-only; all data lives in leaves. Red arrows show the `nextLeaf` chain enabling $O(K)$ range scan.' } },
        ],
      },
      {
        heading: { zh: '複雜度分析', en: 'Complexity Analysis' },
        blocks: [
          { type: 'table',
            headers: [ { zh: '操作', en: 'Operation' }, { zh: '時間', en: 'Time' }, { zh: '空間', en: 'Space' } ],
            rows: [
              [ { zh: '點查詢', en: 'point search' }, { zh: '$O(\\log_t N)$', en: '$O(\\log_t N)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: '插入', en: 'insert' }, { zh: '$O(\\log_t N)$', en: '$O(\\log_t N)$' }, { zh: '$O(\\log_t N)$', en: '$O(\\log_t N)$' } ],
              [ { zh: '範圍查詢 K 結果', en: 'range query K results' }, { zh: '$O(\\log_t N + K)$', en: '$O(\\log_t N + K)$' }, { zh: '$O(K)$', en: '$O(K)$' } ],
              [ { zh: '空間合計', en: 'Total Space' }, { zh: '—', en: '—' }, { zh: '$O(N)$', en: '$O(N)$' } ],
            ] },
          { type: 'math', tex: 'T_{\\text{range}}(K) = O(\\log_t N + K)', caption: {
            zh: '範圍查詢代價 = 樹高下降 $O(\\log_t N)$ + 橫向掃描 $K$ 個結果;是 B+ 樹相對於 B-Tree 最大的優勢。',
            en: 'Range query cost = tree descent $O(\\log_t N)$ + horizontal scan of $K$ results; this is B+ Tree\'s main advantage over B-Tree.' } },
        ],
      },
      {
        heading: { zh: '程式碼', en: 'Source Code' },
        blocks: [
          { type: 'code', lang: 'cpp', code: 'class BPlusNode {\npublic:\n    vector<int> keys;\n    vector<BPlusNode*> children;\n    BPlusNode* nextLeaf; // leaf-level linked list\n    bool isLeaf;\n    int MAX;\n    BPlusNode(int maxKeys, bool leaf)\n        : MAX(maxKeys), isLeaf(leaf), nextLeaf(nullptr) {}\n};\n\n// B+ Tree theory:\n// 1. All data resides ONLY in leaf nodes.\n// 2. Internal nodes hold routing key COPIES only.\n// 3. Leaves are chained: nextLeaf enables O(K) range scan.\n// Leaf split: copy median key UP (leaf keeps its data).\n// Internal split: push median key UP (key is removed from internal node).\nvoid insert(int k) {\n    if (!root) {\n        root = new BPlusNode(MAX, true);\n        root->keys.push_back(k); return;\n    }\n    // descend to leaf, insert in sorted order,\n    // split and propagate upward if full\n}' },
        ],
      },
      {
        heading: { zh: '優缺點與使用時機', en: 'Pros, Cons & When to Use' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '優點:葉節點鏈結使範圍查詢極高效($O(\\log_t N + K)$),無需回溯。', en: 'Pro: linked leaves make range queries extremely efficient ($O(\\log_t N + K)$) without backtracking.' },
            { zh: '優點:內部節點不存資料,分支因子更大,樹高更低,磁碟 I/O 更少。', en: 'Pro: internal nodes store no data — higher branching factor, lower height, fewer disk I/Os.' },
            { zh: '缺點:資料只在葉節點,點查詢必須到達葉層,不如 B-Tree 的部分路徑命中。', en: 'Con: data only in leaves — point queries must always reach leaf level, unlike B-Tree\'s early hits.' },
            { zh: '缺點:葉分裂需維護 `nextLeaf` 鏈,刪除需修復指標,略複雜。', en: 'Con: leaf splits must maintain the `nextLeaf` chain; deletions require pointer repairs — slightly complex.' },
            { zh: '適用:所有需要範圍查詢的資料庫索引,如 MySQL InnoDB、PostgreSQL、SQLite。', en: 'Use for all database indexes requiring range queries: MySQL InnoDB, PostgreSQL, SQLite.' },
          ] },
        ],
      },
      {
        heading: { zh: '小結', en: 'Summary' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '內部節點僅為路由;所有資料集中在葉節點;葉以 `nextLeaf` 橫向串接。', en: 'Internal nodes are routing-only; all data at leaf level; leaves chained horizontally via `nextLeaf`.' },
            { zh: '範圍查詢 $O(\\log_t N + K)$:下降一次,橫向掃描;是 B+ 樹的決定性優勢。', en: 'Range query $O(\\log_t N + K)$: one descent + horizontal scan — B+ Tree\'s decisive advantage.' },
            { zh: '現代關聯式資料庫(MySQL、PostgreSQL)的標準索引結構。', en: 'Standard index structure of modern relational databases (MySQL, PostgreSQL).' },
          ] },
        ],
      },
    ],
  },

  'graph': {
    category: 'Non-Linear Structures',
    title: { zh: '無向圖(鄰接矩陣)', en: 'Undirected Graph (Adjacency Matrix)' },
    slides: [
      {
        heading: { zh: '無向圖(鄰接矩陣)', en: 'Undirected Graph (Adjacency Matrix)' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '無向圖以 $V \\times V$ 的二維陣列(鄰接矩陣)表示頂點間的連接關係;`adjMatrix[u][v] = 1` 代表邊 (u, v) 存在,且矩陣對稱確保雙向可達。',
            en: 'An undirected graph uses a $V \\times V$ 2-D array (adjacency matrix) to represent vertex connections. `adjMatrix[u][v] = 1` means edge (u, v) exists; symmetry of the matrix guarantees bidirectional reachability.' } },
        ],
      },
      {
        heading: { zh: '核心概念', en: 'Core Concept' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '鄰接矩陣以整數 0/1 記錄每對頂點之間是否存在邊。無向圖中 `adjMatrix[u][v]` 與 `adjMatrix[v][u]` 始終同步更新。',
            en: 'The adjacency matrix records 0/1 for every pair of vertices. In an undirected graph `adjMatrix[u][v]` and `adjMatrix[v][u]` are always updated together.' } },
          { type: 'bullets', items: [
            { zh: '`addEdge(u,v)`:同時設定 `adjMatrix[u][v] = adjMatrix[v][u] = 1`,保持對稱性。', en: '`addEdge(u,v)`: sets both `adjMatrix[u][v]` and `adjMatrix[v][u]` to 1, maintaining symmetry.' },
            { zh: '邊存在查詢:直接讀取 `adjMatrix[u][v]`,時間 $O(1)$。', en: 'Edge existence query: read `adjMatrix[u][v]` directly — $O(1)$ time.' },
            { zh: '空間代價:固定佔用 $O(V^2)$,稀疏圖會浪費大量空間。', en: 'Space cost: always $O(V^2)$, wasteful for sparse graphs.' },
          ] },
        ],
      },
      {
        heading: { zh: '運作流程', en: 'Operation Flow' },
        blocks: [
          { type: 'steps', items: [
            { zh: '初始化:建立 $V \\times V$ 的矩陣,全部填 0。', en: 'Initialise: create a $V \\times V$ matrix filled with 0.' },
            { zh: 'addEdge(u,v):設定 `adjMatrix[u][v] = 1` 及 `adjMatrix[v][u] = 1`。', en: 'addEdge(u,v): set `adjMatrix[u][v] = 1` and `adjMatrix[v][u] = 1`.' },
            { zh: '邊查詢:讀取 `adjMatrix[u][v]`,若為 1 則邊存在。', en: 'Edge query: read `adjMatrix[u][v]`; if 1 the edge exists.' },
            { zh: '鄰居遍歷:掃描第 u 列所有欄位,收集值為 1 的索引。', en: 'Neighbour traversal: scan entire row u, collect indices where the value is 1.' },
          ] },
          { type: 'mermaid', code: 'flowchart LR\n  A["init\\nV×V zeros"] -->|addEdge 0-1| B["M[0][1]=M[1][0]=1"]\n  B -->|addEdge 1-2| C["M[1][2]=M[2][1]=1"]\n  C -->|query 0-2| D["M[0][2]=0\\n(no edge)"]' },
        ],
      },
      {
        heading: { zh: '鄰接矩陣示意', en: 'Adjacency Matrix Diagram' },
        blocks: [
          { type: 'svg', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 140" width="320" height="140"><g font-family="sans-serif" font-size="12" text-anchor="middle"><circle cx="50" cy="70" r="18" fill="#dbeafe" stroke="#2563eb"/><text x="50" y="75">0</text><circle cx="140" cy="20" r="18" fill="#dbeafe" stroke="#2563eb"/><text x="140" y="25">1</text><circle cx="140" cy="120" r="18" fill="#dbeafe" stroke="#2563eb"/><text x="140" y="125">4</text><circle cx="230" cy="20" r="18" fill="#dbeafe" stroke="#2563eb"/><text x="230" y="25">2</text><circle cx="230" cy="120" r="18" fill="#dbeafe" stroke="#2563eb"/><text x="230" y="125">3</text><line x1="68" y1="60" x2="122" y2="28" stroke="#475569"/><line x1="68" y1="80" x2="122" y2="112" stroke="#475569"/><line x1="158" y1="20" x2="212" y2="20" stroke="#475569"/><line x1="158" y1="30" x2="212" y2="110" stroke="#475569"/><line x1="140" y1="38" x2="140" y2="102" stroke="#475569"/><line x1="230" y1="38" x2="230" y2="102" stroke="#475569"/><line x1="140" y1="102" x2="212" y2="112" stroke="#475569"/></g></svg>' },
          { type: 'note', text: {
            zh: '鄰接矩陣沿對角線對稱;此圖共 5 個頂點,其鄰接矩陣為 5×5 的對稱方陣。查詢與新增邊均為 $O(1)$,但空間始終為 $O(V^2)$。',
            en: 'The adjacency matrix is symmetric along the diagonal. Edge queries and additions are both $O(1)$, but space is always $O(V^2)$ regardless of edge count.' } },
        ],
      },
      {
        heading: { zh: '複雜度分析', en: 'Complexity Analysis' },
        blocks: [
          { type: 'table',
            headers: [ { zh: '操作', en: 'Operation' }, { zh: '時間', en: 'Time' }, { zh: '空間', en: 'Space' } ],
            rows: [
              [ { zh: '新增邊 addEdge', en: 'addEdge' }, { zh: '$O(1)$', en: '$O(1)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: '查詢邊', en: 'edge query' }, { zh: '$O(1)$', en: '$O(1)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: '鄰居遍歷', en: 'neighbour traversal' }, { zh: '$O(V)$', en: '$O(V)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: '空間合計', en: 'Total Space' }, { zh: '—', en: '—' }, { zh: '$O(V^2)$', en: '$O(V^2)$' } ],
            ] },
          { type: 'math', tex: 'S = O(V^2)', caption: {
            zh: '無論邊數多少,鄰接矩陣固定佔用 $V^2$ 個整數空間,稠密圖最划算,稀疏圖則浪費嚴重。',
            en: 'Regardless of edge count the matrix always uses $V^2$ integers — cost-efficient for dense graphs, wasteful for sparse ones.' } },
        ],
      },
      {
        heading: { zh: '程式碼', en: 'Source Code' },
        blocks: [
          { type: 'code', lang: 'cpp', code: 'class Graph {\n    int V;\n    vector<vector<int>> adjMatrix;\npublic:\n    Graph(int vertices) {\n        V = vertices;\n        adjMatrix.resize(V, vector<int>(V, 0));\n    }\n\n    void addEdge(int u, int v) {\n        if (u >= 0 && u < V && v >= 0 && v < V) {\n            adjMatrix[u][v] = 1;\n            adjMatrix[v][u] = 1; // undirected: symmetric\n        }\n    }\n\n    void printGraph() {\n        for (int i = 0; i < V; i++) {\n            for (int j = 0; j < V; j++)\n                cout << adjMatrix[i][j] << " ";\n            cout << endl;\n        }\n    }\n};' },
        ],
      },
      {
        heading: { zh: '優缺點與使用時機', en: 'Pros, Cons & When to Use' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '優點:邊存在查詢為 $O(1)$,實作簡單直觀。', en: 'Pro: edge existence query is $O(1)$; implementation is simple and intuitive.' },
            { zh: '優點:對稠密圖(邊數接近 $V^2$)空間利用率高。', en: 'Pro: space-efficient for dense graphs where edge count approaches $V^2$.' },
            { zh: '缺點:空間固定 $O(V^2)$,稀疏圖浪費嚴重。', en: 'Con: fixed $O(V^2)$ space — highly wasteful for sparse graphs.' },
            { zh: '缺點:鄰居遍歷需掃描整列,代價 $O(V)$,不如鄰接串列的 $O(deg)$。', en: 'Con: neighbour traversal scans the whole row at $O(V)$, worse than the $O(\\deg)$ of an adjacency list.' },
            { zh: '適用:稠密圖、需要 $O(1)$ 邊查詢的場景,或圖規模小且實作優先考量簡單性時。', en: 'Use for dense graphs, $O(1)$ edge queries, or when graph is small and simplicity is preferred.' },
          ] },
        ],
      },
      {
        heading: { zh: '小結', en: 'Summary' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '以 $V \\times V$ 對稱矩陣表示無向圖;`adjMatrix[u][v] = adjMatrix[v][u]`。', en: 'A $V \\times V$ symmetric matrix represents the undirected graph; `adjMatrix[u][v] = adjMatrix[v][u]`.' },
            { zh: '邊查詢 $O(1)$;鄰居遍歷 $O(V)$;空間 $O(V^2)$。', en: 'Edge query $O(1)$; neighbour traversal $O(V)$; space $O(V^2)$.' },
            { zh: '稀疏圖建議改用鄰接串列以節省空間並加速遍歷。', en: 'For sparse graphs prefer adjacency lists to save space and speed up traversal.' },
          ] },
        ],
      },
    ],
  },

  'graph-kruskal': {
    category: 'Non-Linear Structures',
    title: { zh: 'Kruskal 最小生成樹', en: 'Kruskal Minimum Spanning Tree' },
    slides: [
      {
        heading: { zh: 'Kruskal 最小生成樹', en: 'Kruskal Minimum Spanning Tree' },
        blocks: [
          { type: 'paragraph', text: {
            zh: 'Kruskal 演算法貪心地依權重由小到大選取邊,並以 Disjoint Set Union(DSU / Union-Find)偵測環路,從而在 $O(E \\log E)$ 時間內建構最小生成樹(MST)。',
            en: 'Kruskal\'s algorithm greedily picks edges in ascending weight order and uses Disjoint Set Union (DSU / Union-Find) to detect cycles, building a Minimum Spanning Tree (MST) in $O(E \\log E)$ time.' } },
        ],
      },
      {
        heading: { zh: '核心概念', en: 'Core Concept' },
        blocks: [
          { type: 'paragraph', text: {
            zh: 'MST 包含連通圖中所有頂點但邊數最少(恰好 $V-1$ 條)且總權重最小的子圖。Kruskal 的關鍵在於用 DSU 以近乎 $O(1)$ 的代價判斷兩頂點是否已連通。',
            en: 'An MST spans all vertices with exactly $V-1$ edges and minimum total weight. Kruskal\'s key insight is using DSU to check connectivity of two vertices in near-$O(1)$ amortized time.' } },
          { type: 'bullets', items: [
            { zh: 'DSU `find(x)`:帶路徑壓縮,回傳 x 所在集合的根節點。', en: 'DSU `find(x)`: with path compression, returns the root of x\'s set.' },
            { zh: 'DSU `unite(a,b)`:合併兩集合;若已在同一集合則回傳 false(代表環路)。', en: 'DSU `unite(a,b)`: merges two sets; returns false if already in the same set (cycle detected).' },
            { zh: '邊依權重排序後依序嘗試加入 MST;取到 $V-1$ 條邊即完成。', en: 'Edges are sorted by weight and greedily accepted; stop when $V-1$ edges are collected.' },
          ] },
        ],
      },
      {
        heading: { zh: '運作流程', en: 'Operation Flow' },
        blocks: [
          { type: 'steps', items: [
            { zh: '將所有邊依權重升冪排序。', en: 'Sort all edges by weight in ascending order.' },
            { zh: '初始化 DSU:每個頂點各自為一個集合。', en: 'Initialise DSU: each vertex is its own set.' },
            { zh: '依序取出最輕的邊 (u,v,w);若 u 與 v 不在同一集合,加入 MST 並合併集合。', en: 'Take the lightest edge (u,v,w); if u and v are in different sets, add it to MST and merge sets.' },
            { zh: '重複直至 MST 包含 $V-1$ 條邊。', en: 'Repeat until MST has $V-1$ edges.' },
          ] },
          { type: 'mermaid', code: 'flowchart LR\n  A["Sort edges\\nby weight"] --> B["Init DSU\\n(V sets)"]\n  B --> C["Pick min edge\\n(u,v,w)"]\n  C --> D{"same set?"}\n  D -->|"yes (cycle)"| C\n  D -->|no| E["Add to MST\\nunite(u,v)"]\n  E --> F{"V-1 edges?"}\n  F -->|no| C\n  F -->|yes| G["MST complete"]' },
        ],
      },
      {
        heading: { zh: 'MST 示意圖', en: 'MST Diagram' },
        blocks: [
          { type: 'svg', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 160" width="300" height="160"><g font-family="sans-serif" font-size="11" text-anchor="middle"><circle cx="50" cy="80" r="16" fill="#dbeafe" stroke="#2563eb"/><text x="50" y="85">0</text><circle cx="130" cy="30" r="16" fill="#dbeafe" stroke="#2563eb"/><text x="130" y="35">1</text><circle cx="130" cy="130" r="16" fill="#dbeafe" stroke="#2563eb"/><text x="130" y="135">2</text><circle cx="220" cy="80" r="16" fill="#dbeafe" stroke="#2563eb"/><text x="220" y="85">3</text><circle cx="270" cy="130" r="16" fill="#dbeafe" stroke="#2563eb"/><text x="270" y="135">4</text><line x1="65" y1="72" x2="115" y2="38" stroke="#16a34a" stroke-width="2.5"/><text x="82" y="48" fill="#16a34a" font-weight="bold">4</text><line x1="130" y1="46" x2="130" y2="114" stroke="#16a34a" stroke-width="2.5"/><text x="118" y="83" fill="#16a34a" font-weight="bold">1</text><line x1="145" y1="120" x2="205" y2="90" stroke="#16a34a" stroke-width="2.5"/><text x="183" y="99" fill="#16a34a" font-weight="bold">2</text><line x1="146" y1="130" x2="254" y2="130" stroke="#16a34a" stroke-width="2.5"/><text x="200" y="124" fill="#16a34a" font-weight="bold">5</text><text x="150" y="155" fill="#475569">MST weight = 1+2+4+5 = 12</text></g></svg>' },
          { type: 'note', text: {
            zh: '綠色邊即 MST 的 4 條邊:(1,2,w=1),(2,3,w=2),(0,1,w=4),(2,4,w=5),總重 12。環路邊如 (1,3) 和 (0,2) 被 DSU 排除。',
            en: 'Green edges form the MST: (1,2,w=1), (2,3,w=2), (0,1,w=4), (2,4,w=5), total weight 12. Cycle edges such as (1,3) and (0,2) are rejected by DSU.' } },
        ],
      },
      {
        heading: { zh: '複雜度分析', en: 'Complexity Analysis' },
        blocks: [
          { type: 'table',
            headers: [ { zh: '階段', en: 'Phase' }, { zh: '時間', en: 'Time' }, { zh: '空間', en: 'Space' } ],
            rows: [
              [ { zh: '排序邊', en: 'Sort edges' }, { zh: '$O(E \\log E)$', en: '$O(E \\log E)$' }, { zh: '$O(E)$', en: '$O(E)$' } ],
              [ { zh: 'DSU 操作(E次)', en: 'DSU ops (E times)' }, { zh: '$O(E \\alpha(V))$', en: '$O(E \\alpha(V))$' }, { zh: '$O(V)$', en: '$O(V)$' } ],
              [ { zh: '總時間', en: 'Total Time' }, { zh: '$O(E \\log E)$', en: '$O(E \\log E)$' }, { zh: '—', en: '—' } ],
              [ { zh: '空間合計', en: 'Total Space' }, { zh: '—', en: '—' }, { zh: '$O(V + E)$', en: '$O(V + E)$' } ],
            ] },
          { type: 'math', tex: 'T_{\\text{Kruskal}} = O(E \\log E)', caption: {
            zh: '排序主導整體複雜度;DSU 以反阿克曼函數 $\\alpha(V)$ 的均攤代價近似 $O(1)$,可忽略。',
            en: 'Sorting dominates the total complexity; DSU operations are amortized $O(\\alpha(V)) \\approx O(1)$ per operation.' } },
        ],
      },
      {
        heading: { zh: '程式碼', en: 'Source Code' },
        blocks: [
          { type: 'code', lang: 'cpp', code: 'struct DSU {\n    vector<int> p, r;\n    DSU(int n): p(n), r(n, 0) { for (int i = 0; i < n; i++) p[i] = i; }\n    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }\n    bool unite(int a, int b) {\n        a = find(a); b = find(b);\n        if (a == b) return false;         // cycle\n        if (r[a] < r[b]) swap(a, b);\n        p[b] = a;\n        if (r[a] == r[b]) r[a]++;\n        return true;\n    }\n};\n\n// Kruskal MST\nsort(edges.begin(), edges.end(),\n     [](const Edge& a, const Edge& b){ return a.w < b.w; });\nDSU dsu(V);\nvector<Edge> mst;\nfor (const auto& e : edges) {\n    if (dsu.unite(e.u, e.v)) {\n        mst.push_back(e);\n        if ((int)mst.size() == V - 1) break;\n    }\n}' },
        ],
      },
      {
        heading: { zh: '優缺點與使用時機', en: 'Pros, Cons & When to Use' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '優點:以邊為中心,適合稀疏圖($E \\ll V^2$)。', en: 'Pro: edge-centric — well-suited for sparse graphs ($E \\ll V^2$).' },
            { zh: '優點:DSU 實作簡單,可離線排序後批次處理。', en: 'Pro: DSU implementation is concise; edges can be sorted offline and processed in bulk.' },
            { zh: '缺點:需事先知道所有邊才能排序,不適用動態邊插入場景。', en: 'Con: requires all edges upfront for sorting — unsuitable for dynamic edge insertions.' },
            { zh: '缺點:相較 Prim 演算法,在稠密圖上效率較低。', en: 'Con: less efficient than Prim\'s algorithm on dense graphs.' },
            { zh: '適用:稀疏加權連通圖的 MST,如網路佈線、電路設計。', en: 'Use for MST of sparse weighted connected graphs: network cabling, circuit design.' },
          ] },
        ],
      },
      {
        heading: { zh: '小結', en: 'Summary' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '排序邊 + DSU 偵測環路:$O(E \\log E)$ 時間建構 MST。', en: 'Sort edges + DSU cycle detection: MST built in $O(E \\log E)$ time.' },
            { zh: 'MST 恰有 $V-1$ 條邊,覆蓋所有頂點且總權重最小。', en: 'MST has exactly $V-1$ edges, spans all vertices with minimum total weight.' },
            { zh: '最佳用於稀疏圖;Prim 演算法在稠密圖上更佳。', en: 'Best for sparse graphs; Prim\'s algorithm is preferred for dense graphs.' },
          ] },
        ],
      },
    ],
  },

  'graph-dijkstra': {
    category: 'Non-Linear Structures',
    title: { zh: 'Dijkstra 最短路徑', en: 'Dijkstra Shortest Path' },
    slides: [
      {
        heading: { zh: 'Dijkstra 最短路徑', en: 'Dijkstra Shortest Path' },
        blocks: [
          { type: 'paragraph', text: {
            zh: 'Dijkstra 演算法以貪心策略從源點出發,每次選取距離最小的未訪問頂點並鬆弛(relax)其鄰邊,於 $O((V+E)\\log V)$ 時間(binary heap)內求得源點到所有頂點的最短路徑。',
            en: 'Dijkstra\'s algorithm greedily selects the unvisited vertex with minimum distance, then relaxes its outgoing edges. With a binary heap it runs in $O((V+E)\\log V)$ and finds shortest paths from a source to all vertices.' } },
        ],
      },
      {
        heading: { zh: '核心概念', en: 'Core Concept' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '維護一個距離陣列 `dist[]`,初始源點為 0,其餘為 INF。優先佇列(min-heap)保證每次取出的頂點距離已是最短;一旦頂點被訪問,其距離不再更新。',
            en: 'Maintain a distance array `dist[]` initialised to INF except the source (0). A min-heap priority queue ensures the next vertex popped has the smallest known distance; once visited, a vertex\'s distance is final.' } },
          { type: 'bullets', items: [
            { zh: 'relax:若 `dist[u] + w(u,v) < dist[v]`,更新 `dist[v]` 並將 (dist[v], v) 推入優先佇列。', en: 'relax: if `dist[u] + w(u,v) < dist[v]`, update `dist[v]` and push (dist[v], v) into the priority queue.' },
            { zh: '惰性刪除:已訪問的頂點若再次從佇列彈出則直接跳過。', en: 'Lazy deletion: if a popped vertex is already visited, skip it.' },
            { zh: '限制:邊權必須非負;負邊請改用 Bellman-Ford。', en: 'Limitation: edge weights must be non-negative; use Bellman-Ford for negative weights.' },
          ] },
        ],
      },
      {
        heading: { zh: '運作流程', en: 'Operation Flow' },
        blocks: [
          { type: 'steps', items: [
            { zh: '初始化 `dist[source]=0`,其餘為 INF;源點推入優先佇列。', en: 'Initialise `dist[source]=0`, all others INF; push source into the priority queue.' },
            { zh: '彈出距離最小的頂點 u;若已訪問則跳過。', en: 'Pop vertex u with minimum distance; skip if already visited.' },
            { zh: '標記 u 為已訪問;對 u 的每條鄰邊 (u,v,w) 執行 relax。', en: 'Mark u as visited; relax each edge (u,v,w) of u.' },
            { zh: '重複直至優先佇列為空;此時 `dist[]` 存有所有最短距離。', en: 'Repeat until the priority queue is empty; `dist[]` then holds all shortest distances.' },
          ] },
          { type: 'mermaid', code: 'flowchart LR\n  A["dist=INF\\npush source"] --> B["pop min u"]\n  B --> C{"visited?"}\n  C -->|yes| B\n  C -->|no| D["mark visited\\nrelax edges"]\n  D --> E{"PQ empty?"}\n  E -->|no| B\n  E -->|yes| F["dist final"]' },
        ],
      },
      {
        heading: { zh: '最短路徑示意圖', en: 'Shortest Path Diagram' },
        blocks: [
          { type: 'svg', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 160" width="320" height="160"><g font-family="sans-serif" font-size="11" text-anchor="middle"><circle cx="40" cy="80" r="16" fill="#fef9c3" stroke="#ca8a04"/><text x="40" y="85">0</text><text x="40" y="65" fill="#ca8a04" font-size="10">d=0</text><circle cx="130" cy="30" r="16" fill="#dbeafe" stroke="#2563eb"/><text x="130" y="35">1</text><text x="130" y="18" fill="#2563eb" font-size="10">d=3</text><circle cx="130" cy="130" r="16" fill="#dbeafe" stroke="#2563eb"/><text x="130" y="135">2</text><text x="130" y="150" fill="#2563eb" font-size="10">d=1</text><circle cx="220" cy="80" r="16" fill="#dbeafe" stroke="#2563eb"/><text x="220" y="85">3</text><text x="220" y="68" fill="#2563eb" font-size="10">d=2</text><circle cx="290" cy="80" r="16" fill="#dbeafe" stroke="#2563eb"/><text x="290" y="85">4</text><text x="290" y="68" fill="#2563eb" font-size="10">d=5</text><line x1="56" y1="70" x2="114" y2="38" stroke="#475569"/><text x="80" y="47" fill="#475569">4</text><line x1="56" y1="90" x2="114" y2="122" stroke="#16a34a" stroke-width="2.5"/><text x="80" y="113" fill="#16a34a" font-weight="bold">1</text><line x1="146" y1="120" x2="204" y2="90" stroke="#16a34a" stroke-width="2.5"/><text x="183" y="100" fill="#16a34a" font-weight="bold">1</text><line x1="130" y1="46" x2="130" y2="114" stroke="#16a34a" stroke-width="2.5"/><text x="118" y="83" fill="#16a34a" font-weight="bold">2</text><line x1="236" y1="80" x2="274" y2="80" stroke="#16a34a" stroke-width="2.5"/><text x="256" y="74" fill="#16a34a" font-weight="bold">3</text></g></svg>' },
          { type: 'note', text: {
            zh: '從節點 0 出發的最短距離:d[0]=0, d[1]=3(0→2→1), d[2]=1(0→2), d[3]=2(0→2→3), d[4]=5(0→2→3→4)。綠色邊為最短路徑樹。',
            en: 'Shortest distances from node 0: d[0]=0, d[1]=3 (0→2→1), d[2]=1 (0→2), d[3]=2 (0→2→3), d[4]=5 (0→2→3→4). Green edges form the shortest-path tree.' } },
        ],
      },
      {
        heading: { zh: '複雜度分析', en: 'Complexity Analysis' },
        blocks: [
          { type: 'table',
            headers: [ { zh: '階段', en: 'Phase' }, { zh: '時間', en: 'Time' }, { zh: '空間', en: 'Space' } ],
            rows: [
              [ { zh: '初始化', en: 'Initialisation' }, { zh: '$O(V)$', en: '$O(V)$' }, { zh: '$O(V)$', en: '$O(V)$' } ],
              [ { zh: 'PQ 操作(V次)', en: 'PQ ops (V pops)' }, { zh: '$O(V \\log V)$', en: '$O(V \\log V)$' }, { zh: '$O(V)$', en: '$O(V)$' } ],
              [ { zh: 'relax(E次)', en: 'relax (E pushes)' }, { zh: '$O(E \\log V)$', en: '$O(E \\log V)$' }, { zh: '$O(E)$', en: '$O(E)$' } ],
              [ { zh: '空間合計', en: 'Total Space' }, { zh: '—', en: '—' }, { zh: '$O(V + E)$', en: '$O(V + E)$' } ],
            ] },
          { type: 'math', tex: 'T_{\\text{Dijkstra}} = O((V+E)\\log V)', caption: {
            zh: '使用 binary heap 優先佇列時;Fibonacci heap 可降至 $O(E + V \\log V)$,但實作複雜。',
            en: 'With a binary heap; using a Fibonacci heap reduces this to $O(E + V \\log V)$ at the cost of implementation complexity.' } },
        ],
      },
      {
        heading: { zh: '程式碼', en: 'Source Code' },
        blocks: [
          { type: 'code', lang: 'cpp', code: 'const int INF = 1e9;\nvector<int> dist(V, INF);\nvector<bool> visited(V, false);\npriority_queue<pair<int,int>,\n               vector<pair<int,int>>,\n               greater<pair<int,int>>> pq;\n\ndist[source] = 0;\npq.push({0, source});\n\nwhile (!pq.empty()) {\n    auto [d, u] = pq.top(); pq.pop();\n    if (visited[u]) continue;\n    visited[u] = true;\n\n    for (auto [v, w] : adj[u]) {\n        if (!visited[v] && dist[u] + w < dist[v]) {\n            dist[v] = dist[u] + w;\n            pq.push({dist[v], v}); // relax\n        }\n    }\n}' },
        ],
      },
      {
        heading: { zh: '優缺點與使用時機', en: 'Pros, Cons & When to Use' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '優點:保證找到非負邊權圖的最短路徑;binary heap 實作效率佳。', en: 'Pro: guarantees shortest paths on graphs with non-negative edge weights; binary heap gives good practical performance.' },
            { zh: '優點:一次執行可得源點到所有頂點的最短距離。', en: 'Pro: one run produces shortest distances from the source to all other vertices.' },
            { zh: '缺點:無法處理負邊;需改用 Bellman-Ford($O(VE)$)或 SPFA。', en: 'Con: cannot handle negative edges; Bellman-Ford ($O(VE)$) or SPFA is needed.' },
            { zh: '缺點:惰性刪除可能使優先佇列中積累冗餘項目,最壞為 $O(E)$。', en: 'Con: lazy deletion may accumulate $O(E)$ stale entries in the priority queue.' },
            { zh: '適用:地圖導航、網路路由協定(OSPF)、遊戲 AI 尋路等。', en: 'Use for map navigation, network routing (OSPF), game AI pathfinding, etc.' },
          ] },
        ],
      },
      {
        heading: { zh: '小結', en: 'Summary' },
        blocks: [
          { type: 'bullets', items: [
            { zh: 'Min-heap + relax:每次擴展距離最小的頂點,直至所有頂點確定最短距離。', en: 'Min-heap + relax: expand the vertex with minimum distance each time until all distances are finalised.' },
            { zh: 'Binary heap 時間複雜度 $O((V+E)\\log V)$;僅適用非負邊權圖。', en: 'Binary heap complexity $O((V+E)\\log V)$; valid only for graphs with non-negative edge weights.' },
            { zh: '廣泛應用於地圖導航、網路路由等需要單源最短路徑的場景。', en: 'Widely used in map navigation and network routing for single-source shortest path problems.' },
          ] },
        ],
      },
    ],
  },

  'graph-topo': {
    category: 'Non-Linear Structures',
    title: { zh: '拓樸排序(Kahn\'s 演算法)', en: 'Topological Sort (Kahn\'s Algorithm)' },
    slides: [
      {
        heading: { zh: '拓樸排序(Kahn\'s 演算法)', en: 'Topological Sort (Kahn\'s Algorithm)' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '拓樸排序對有向無環圖(DAG)的頂點排列出線性順序,使每條有向邊 (u→v) 中 u 都排在 v 之前。Kahn\'s 演算法以 BFS 反覆移除入度為 0 的頂點,時間複雜度 $O(V+E)$。',
            en: 'Topological Sort arranges the vertices of a Directed Acyclic Graph (DAG) so that for every directed edge u→v, u appears before v. Kahn\'s BFS-based algorithm repeatedly removes vertices with in-degree 0 in $O(V+E)$ time.' } },
        ],
      },
      {
        heading: { zh: '核心概念', en: 'Core Concept' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '入度(in-degree)是指向某頂點的邊數。入度為 0 的頂點沒有前置依賴,可安全地排在最前面。每移除一個頂點,其後繼節點的入度遞減,可能解鎖新的入度為 0 頂點。',
            en: 'In-degree is the count of edges pointing into a vertex. A vertex with in-degree 0 has no prerequisites and can safely be placed first. Removing it decrements neighbors\' in-degrees, potentially unlocking new zero-in-degree vertices.' } },
          { type: 'bullets', items: [
            { zh: 'DAG 要求:拓樸排序僅對無環圖有效;若處理完的頂點數少於 V,代表圖含環。', en: 'DAG requirement: topological sort is only valid for acyclic graphs; if fewer than V vertices are processed, a cycle exists.' },
            { zh: '非唯一性:若多個頂點同時入度為 0,排列順序不唯一。', en: 'Non-uniqueness: if multiple vertices have in-degree 0 simultaneously, the ordering is not unique.' },
            { zh: '應用:任務排程、相依套件安裝、編譯器指令排序。', en: 'Applications: task scheduling, dependency resolution, instruction ordering in compilers.' },
          ] },
        ],
      },
      {
        heading: { zh: '運作流程', en: 'Operation Flow' },
        blocks: [
          { type: 'steps', items: [
            { zh: '計算所有頂點的入度;將入度為 0 的頂點加入佇列。', en: 'Compute in-degrees of all vertices; enqueue all vertices with in-degree 0.' },
            { zh: '從佇列取出頂點 u,加入拓樸排序結果。', en: 'Dequeue vertex u and append it to the topological order.' },
            { zh: '對 u 的每個後繼 v 將 `inDegree[v]--`;若 `inDegree[v] == 0` 則入隊。', en: 'For each successor v of u, decrement `inDegree[v]`; if `inDegree[v] == 0` enqueue v.' },
            { zh: '重複直至佇列為空;若結果長度等於 V 則排序成功,否則圖含環。', en: 'Repeat until the queue is empty; if result length equals V the sort succeeded, else a cycle exists.' },
          ] },
          { type: 'mermaid', code: 'flowchart LR\n  A["compute\\nin-degrees"] --> B["enqueue\\nin-degree=0"]\n  B --> C["dequeue u\\nappend to order"]\n  C --> D["decrement\\nneighbors"]\n  D --> E{"in-degree=0?"}\n  E -->|yes| F["enqueue v"]\n  E -->|no| G["skip"]\n  F --> H{"queue\\nempty?"}\n  G --> H\n  H -->|no| C\n  H -->|yes| I{"len=V?"}\n  I -->|yes| J["success"]\n  I -->|no| K["cycle!"]' },
        ],
      },
      {
        heading: { zh: 'DAG 拓樸排序示意', en: 'DAG Topological Sort Diagram' },
        blocks: [
          { type: 'svg', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 120" width="340" height="120"><defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#475569"/></marker></defs><g font-family="sans-serif" font-size="11" text-anchor="middle"><circle cx="30" cy="60" r="16" fill="#fef9c3" stroke="#ca8a04"/><text x="30" y="65">0</text><circle cx="110" cy="25" r="16" fill="#dbeafe" stroke="#2563eb"/><text x="110" y="30">1</text><circle cx="110" cy="95" r="16" fill="#dbeafe" stroke="#2563eb"/><text x="110" y="100">2</text><circle cx="220" cy="60" r="16" fill="#dbeafe" stroke="#2563eb"/><text x="220" y="65">3</text><circle cx="305" cy="60" r="16" fill="#dcfce7" stroke="#16a34a"/><text x="305" y="65">4</text><line x1="46" y1="52" x2="94" y2="32" stroke="#475569" marker-end="url(#arr)"/><line x1="46" y1="68" x2="94" y2="88" stroke="#475569" marker-end="url(#arr)"/><line x1="126" y1="25" x2="204" y2="55" stroke="#475569" marker-end="url(#arr)"/><line x1="110" y1="41" x2="110" y2="79" stroke="#475569" marker-end="url(#arr)"/><line x1="126" y1="95" x2="204" y2="65" stroke="#475569" marker-end="url(#arr)"/><line x1="236" y1="60" x2="289" y2="60" stroke="#475569" marker-end="url(#arr)"/><text x="170" y="112" fill="#475569">Topo order: 0 → 1 → 2 → 3 → 4</text></g></svg>' },
          { type: 'note', text: {
            zh: '節點 0 入度為 0(黃色),率先加入結果。依序處理後,合法的拓樸序為 0→1→2→3→4。所有有向邊均由左指向右,符合拓樸排序定義。',
            en: 'Node 0 has in-degree 0 (yellow) and is processed first. A valid topological order is 0→1→2→3→4. Every directed edge points left-to-right, consistent with the topological ordering.' } },
        ],
      },
      {
        heading: { zh: '複雜度分析', en: 'Complexity Analysis' },
        blocks: [
          { type: 'table',
            headers: [ { zh: '階段', en: 'Phase' }, { zh: '時間', en: 'Time' }, { zh: '空間', en: 'Space' } ],
            rows: [
              [ { zh: '入度計算', en: 'In-degree computation' }, { zh: '$O(V+E)$', en: '$O(V+E)$' }, { zh: '$O(V)$', en: '$O(V)$' } ],
              [ { zh: 'BFS 處理', en: 'BFS processing' }, { zh: '$O(V+E)$', en: '$O(V+E)$' }, { zh: '$O(V)$', en: '$O(V)$' } ],
              [ { zh: '空間合計', en: 'Total Space' }, { zh: '—', en: '—' }, { zh: '$O(V+E)$', en: '$O(V+E)$' } ],
            ] },
          { type: 'math', tex: 'T_{\\text{Kahn}} = O(V + E)', caption: {
            zh: '每個頂點入隊/出隊各一次,每條邊處理一次;線性時間是拓樸排序的理論最優。',
            en: 'Each vertex is enqueued and dequeued exactly once; each edge is processed once — linear time is optimal for topological sort.' } },
        ],
      },
      {
        heading: { zh: '程式碼', en: 'Source Code' },
        blocks: [
          { type: 'code', lang: 'cpp', code: '// Kahn\'s Algorithm (BFS-based topological sort)\nvector<int> inDegree(V, 0);\nfor (auto [u, v] : edges) {\n    adj[u].push_back(v);\n    inDegree[v]++;\n}\n\nqueue<int> q;\nfor (int i = 0; i < V; i++)\n    if (inDegree[i] == 0) q.push(i);\n\nvector<int> topoOrder;\nwhile (!q.empty()) {\n    int u = q.front(); q.pop();\n    topoOrder.push_back(u);\n    for (int v : adj[u]) {\n        if (--inDegree[v] == 0)\n            q.push(v);\n    }\n}\n\nif ((int)topoOrder.size() != V)\n    cout << "ERROR: Cycle detected!\\n";' },
        ],
      },
      {
        heading: { zh: '優缺點與使用時機', en: 'Pros, Cons & When to Use' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '優點:線性時間 $O(V+E)$,同時免費偵測圖中的環(若有)。', en: 'Pro: linear $O(V+E)$ time; cycle detection comes for free.' },
            { zh: '優點:Kahn\'s BFS 實作直觀,易於理解與調試。', en: 'Pro: Kahn\'s BFS approach is intuitive and easy to debug.' },
            { zh: '缺點:僅適用 DAG;含環的有向圖無法產生有效的拓樸排序。', en: 'Con: only valid for DAGs; directed graphs with cycles produce no valid topological order.' },
            { zh: '缺點:若有多個合法排序,結果取決於佇列順序,可能不唯一。', en: 'Con: when multiple valid orderings exist, the result depends on queue order and is not unique.' },
            { zh: '適用:相依套件安裝、Makefile 編譯順序、課程先修要求排序等。', en: 'Use for dependency resolution, Makefile build order, course prerequisite scheduling, etc.' },
          ] },
        ],
      },
      {
        heading: { zh: '小結', en: 'Summary' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '反覆移除入度為 0 的頂點:$O(V+E)$ 線性時間完成拓樸排序。', en: 'Repeatedly removing in-degree-0 vertices achieves topological sort in $O(V+E)$ linear time.' },
            { zh: '僅適用 DAG;若結果長度少於 V 則圖含環,可作為環偵測工具。', en: 'Only for DAGs; if result length is less than V a cycle exists — doubles as a cycle-detection tool.' },
            { zh: '廣泛應用於任務排程、相依解析與編譯器前端的指令排序。', en: 'Widely applied in task scheduling, dependency resolution, and compiler front-end instruction ordering.' },
          ] },
        ],
      },
    ],
  },

  'heap-binary': {
    category: 'Advanced & Application-Specific',
    title: { zh: '二元堆積(Binary Heap)', en: 'Binary Heap' },
    slides: [
      {
        heading: { zh: '二元堆積(Binary Heap)', en: 'Binary Heap' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '以連續陣列儲存的完全二元樹,透過 sift-up 與 sift-down 維持 heap 性質,提供 $O(\\log N)$ 插入與取出及 $O(1)$ 查看頂端元素。',
            en: 'A complete binary tree stored in a contiguous array; heap property is maintained by sift-up and sift-down, giving $O(\\log N)$ insert/extract and $O(1)$ peek.' } },
        ],
      },
      {
        heading: { zh: '核心概念', en: 'Core Concept' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '索引 $i$ 的父節點為 $(i-1)/2$,左子為 $2i+1$,右子為 $2i+2$。Min-Heap 保證每個父節點的鍵值 $\\leq$ 所有子節點;Max-Heap 則相反。',
            en: 'Node at index $i$ has parent $(i-1)/2$, left child $2i+1$, right child $2i+2$. A Min-Heap guarantees every parent key $\\leq$ its children; Max-Heap is the reverse.' } },
          { type: 'bullets', items: [
            { zh: 'insert:新增元素到陣列末端,執行 sift-up 向上修復。', en: 'insert: append to array tail, then sift-up to restore order.' },
            { zh: 'extractTop:將根與末端元素互換後移除,執行 sift-down 向下修復。', en: 'extractTop: swap root with tail, remove tail, then sift-down to restore.' },
            { zh: 'decreaseKey/increaseKey:原地修改鍵值後視情況執行 sift-up 或 sift-down。', en: 'decreaseKey / increaseKey: modify in place, then sift-up or sift-down as needed.' },
            { zh: '陣列連續存取,快取命中率高。', en: 'Contiguous array layout yields excellent cache performance.' },
          ] },
        ],
      },
      {
        heading: { zh: '運作流程', en: 'Operation Flow' },
        blocks: [
          { type: 'steps', items: [
            { zh: 'insert(5):將 5 追加至陣列末端索引位置。', en: 'insert(5): append 5 at the last array position.' },
            { zh: 'sift-up:比較 5 與父節點;若 5 較小(min-heap)則互換,重複直到根或不再違反。', en: 'sift-up: compare 5 with its parent; swap if 5 is smaller (min-heap); repeat until root or no violation.' },
            { zh: 'extractTop:根(最小值)與末端互換後移除末端。', en: 'extractTop: swap root (minimum) with the last element, then remove the last.' },
            { zh: 'sift-down:從根往下選較小的子節點互換,直到葉節點或不再違反。', en: 'sift-down: from root, swap with the smaller child until a leaf or no violation remains.' },
          ] },
          { type: 'mermaid', code: 'flowchart LR\n  A["insert(5)\\nappend to tail"] --> B["sift-up\\n(compare with parent)"]\n  B --> C{"parent > child\\n(min-heap)?"}\n  C -->|"yes"| D["swap & move up"]\n  D --> B\n  C -->|"no"| E["heap property\\nrestored"]' },
        ],
      },
      {
        heading: { zh: '陣列結構示意', en: 'Array Layout Diagram' },
        blocks: [
          { type: 'svg', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 120" width="360" height="120"><g font-family="sans-serif" font-size="12" text-anchor="middle"><rect x="10" y="10" width="40" height="30" fill="#dbeafe" stroke="#2563eb"/><text x="30" y="30">1</text><text x="30" y="8" font-size="9" fill="#64748b">i=0</text><rect x="60" y="10" width="40" height="30" fill="#dbeafe" stroke="#2563eb"/><text x="80" y="30">3</text><text x="80" y="8" font-size="9" fill="#64748b">i=1</text><rect x="110" y="10" width="40" height="30" fill="#dbeafe" stroke="#2563eb"/><text x="130" y="30">2</text><text x="130" y="8" font-size="9" fill="#64748b">i=2</text><rect x="160" y="10" width="40" height="30" fill="#dbeafe" stroke="#2563eb"/><text x="180" y="30">7</text><text x="180" y="8" font-size="9" fill="#64748b">i=3</text><rect x="210" y="10" width="40" height="30" fill="#dbeafe" stroke="#2563eb"/><text x="230" y="30">8</text><text x="230" y="8" font-size="9" fill="#64748b">i=4</text><rect x="260" y="10" width="40" height="30" fill="#dbeafe" stroke="#2563eb"/><text x="280" y="30">5</text><text x="280" y="8" font-size="9" fill="#64748b">i=5</text><rect x="310" y="10" width="40" height="30" fill="#dbeafe" stroke="#2563eb"/><text x="330" y="30">9</text><text x="330" y="8" font-size="9" fill="#64748b">i=6</text><circle cx="80" cy="75" r="14" fill="#fef9c3" stroke="#ca8a04"/><text x="80" y="79">1</text><circle cx="40" cy="105" r="14" fill="#dbeafe" stroke="#2563eb"/><text x="40" y="109">3</text><circle cx="120" cy="105" r="14" fill="#dbeafe" stroke="#2563eb"/><text x="120" y="109">2</text><line x1="80" y1="89" x2="46" y2="92" stroke="#64748b"/><line x1="80" y1="89" x2="114" y2="92" stroke="#64748b"/><text x="180" y="79" font-size="10" fill="#64748b">root=data[0]</text></g></svg>' },
          { type: 'note', text: {
            zh: '上方為陣列表示;下方樹形圖顯示 data[0](根)為最小值。節點 $i$ 的兩個子節點位於 $2i+1$ 與 $2i+2$。',
            en: 'Top: flat array representation. Bottom: tree view where data[0] (root) is the minimum. Children of node $i$ are at $2i+1$ and $2i+2$.' } },
        ],
      },
      {
        heading: { zh: '複雜度分析', en: 'Complexity Analysis' },
        blocks: [
          { type: 'table',
            headers: [ { zh: '操作', en: 'Operation' }, { zh: '時間(最壞)', en: 'Time (Worst)' }, { zh: '空間', en: 'Space' } ],
            rows: [
              [ { zh: 'insert', en: 'insert' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: 'peek', en: 'peek' }, { zh: '$O(1)$', en: '$O(1)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: 'extractTop', en: 'extractTop' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: 'decreaseKey / increaseKey', en: 'decreaseKey / increaseKey' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: 'build-heap ($N$ 個元素)', en: 'build-heap ($N$ elements)' }, { zh: '$O(N)$', en: '$O(N)$' }, { zh: '$O(N)$', en: '$O(N)$' } ],
              [ { zh: '空間合計', en: 'Total Space' }, { zh: '—', en: '—' }, { zh: '$O(N)$', en: '$O(N)$' } ],
            ] },
          { type: 'math', tex: 'T_{\\text{build}}(N) = O(N)', caption: {
            zh: '從底部向上呼叫 sift-down 建堆的總代價為 $O(N)$,優於逐一 insert 的 $O(N \\log N)$。',
            en: 'Building the heap bottom-up with sift-down costs $O(N)$ total — better than $N$ sequential inserts at $O(N \\log N)$.' } },
        ],
      },
      {
        heading: { zh: '程式碼', en: 'Source Code' },
        blocks: [
          { type: 'code', lang: 'cpp', code: 'void siftUp(int i) {\n    while (i > 0) {\n        int p = (i - 1) / 2;\n        if (!cmp(data[i], data[p])) break;\n        swap(data[i], data[p]);\n        i = p;\n    }\n}\n\nvoid siftDown(int i) {\n    int n = static_cast<int>(data.size());\n    while (true) {\n        int left = 2 * i + 1, right = 2 * i + 2, best = i;\n        if (left  < n && cmp(data[left],  data[best])) best = left;\n        if (right < n && cmp(data[right], data[best])) best = right;\n        if (best == i) break;\n        swap(data[i], data[best]);\n        i = best;\n    }\n}\n\nvoid insert(int x) {\n    data.push_back(x);\n    siftUp(static_cast<int>(data.size()) - 1);\n}\n\nint extractTop() {\n    int top = data[0];\n    data[0] = data.back(); data.pop_back();\n    if (!data.empty()) siftDown(0);\n    return top;\n}' },
        ],
      },
      {
        heading: { zh: '優缺點與使用時機', en: 'Pros, Cons & When to Use' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '優點:陣列連續儲存,快取友好,常數因子小。', en: 'Pro: contiguous array storage is cache-friendly with small constant factors.' },
            { zh: '優點:build-heap 為 $O(N)$,適合大量資料一次性建堆。', en: 'Pro: $O(N)$ build-heap is ideal for bulk construction from a large dataset.' },
            { zh: '缺點:高效合併(串接陣列後 build-heap)需 $O(N+M)$,若以逐一重新插入則退化為 $O((N+M)\\log(N+M))$;即使最佳情況仍不適合頻繁 merge。', en: 'Con: efficient merge (concatenate arrays + build-heap) costs $O(N+M)$; naive re-insertion degrades to $O((N+M)\\log(N+M))$ — either way, unsuitable when merges are frequent.' },
            { zh: '缺點:decrease-key 需要知道元素的陣列索引,外部維護索引增加複雜度。', en: 'Con: decrease-key requires knowing the array index, adding bookkeeping overhead.' },
            { zh: '適用:優先佇列、Dijkstra/Prim 演算法、Heap Sort、Top-K 問題。', en: 'Use for: priority queues, Dijkstra/Prim, Heap Sort, Top-K streaming.' },
          ] },
        ],
      },
      {
        heading: { zh: '小結', en: 'Summary' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '完全二元樹以陣列實作:父節點在 $(i-1)/2$,子節點在 $2i+1$/$2i+2$。', en: 'Complete binary tree in an array: parent at $(i-1)/2$, children at $2i+1$/$2i+2$.' },
            { zh: 'insert/$O(\\log N)$ worst-case;extractTop/$O(\\log N)$ worst-case;peek/$O(1)$。', en: 'insert $O(\\log N)$ worst-case; extractTop $O(\\log N)$ worst-case; peek $O(1)$.' },
            { zh: 'build-heap 為 $O(N)$;merge 效率低;快取性能優異。', en: '$O(N)$ build-heap; poor merge performance; excellent cache locality.' },
          ] },
        ],
      },
    ],
  },

  'heap-binomial': {
    category: 'Advanced & Application-Specific',
    title: { zh: '二項堆積(Binomial Heap)', en: 'Binomial Heap' },
    slides: [
      {
        heading: { zh: '二項堆積(Binomial Heap)', en: 'Binomial Heap' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '以二項樹(Binomial Tree)森林組成的堆積結構,合併操作類比二進位加法,提供 $O(\\log N)$ 合併與 $O(1)$ 攤銷插入。',
            en: 'A heap built from a forest of binomial trees; merging mimics binary addition over tree degrees, giving $O(\\log N)$ merge and $O(1)$ amortized insert.' } },
        ],
      },
      {
        heading: { zh: '核心概念', en: 'Core Concept' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '度數為 $k$ 的二項樹 $B_k$ 由兩棵 $B_{k-1}$ 連結而成,共有 $2^k$ 個節點。$N$ 個元素的二項堆積最多含 $\\lfloor\\log_2 N\\rfloor + 1$ 棵樹,每個度數至多出現一次,如同 $N$ 的二進位表示。',
            en: 'Binomial tree $B_k$ is formed by linking two $B_{k-1}$ trees and has $2^k$ nodes. A binomial heap with $N$ elements has at most $\\lfloor\\log_2 N\\rfloor + 1$ trees — one per bit of $N$ set to 1.' } },
          { type: 'bullets', items: [
            { zh: 'insert:建立單節點 $B_0$ 堆積,再與主堆積合併($O(1)$ 攤銷)。', en: 'insert: create a single-node $B_0$ heap then merge with the main heap ($O(1)$ amortized).' },
            { zh: 'merge:按度數升序合併根串列,相同度數的樹執行 link 操作(類似二進位加法進位)。', en: 'merge: combine root lists by degree; link trees of equal degree (like binary carry propagation).' },
            { zh: 'extractTop:找出根串列中最小根,移除後將其子節點反轉為新堆積再合併。', en: 'extractTop: find the minimum root, remove it, reverse its children into a new heap, then merge.' },
          ] },
        ],
      },
      {
        heading: { zh: '運作流程', en: 'Operation Flow' },
        blocks: [
          { type: 'steps', items: [
            { zh: '合併兩個二項堆積:將兩個根串列按度數升序排列後合併。', en: 'Merge two binomial heaps: interleave both root lists sorted by degree.' },
            { zh: '掃描合併後根串列:若連續兩棵樹度數相同,執行 linkTrees (較小根成為父)。', en: 'Scan merged root list: if two consecutive trees share the same degree, call linkTrees (smaller root becomes parent).' },
            { zh: '重複直到每個度數至多一棵樹為止。', en: 'Repeat until every degree appears at most once.' },
            { zh: 'extractTop:線性掃描根串列找最小根;子樹反轉後執行上述合併。', en: 'extractTop: linear scan of root list for minimum; reverse children then apply the merge above.' },
          ] },
          { type: 'mermaid', code: 'flowchart LR\n  H1["H1: B0(3), B1(7)"] --> MERGE["mergeRootLists\\n+ link equal degrees"]\n  H2["H2: B0(1), B1(10)"] --> MERGE\n  MERGE --> OUT["Result: B1(root=1), B2(root=7)\\n(carry-like linking, no B0)"]' },
        ],
      },
      {
        heading: { zh: '二項樹結構示意', en: 'Binomial Tree Structure' },
        blocks: [
          { type: 'svg', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 130" width="340" height="130"><g font-family="sans-serif" font-size="11" text-anchor="middle"><text x="30" y="12" font-size="10" fill="#64748b">B0</text><circle cx="30" cy="25" r="12" fill="#fef9c3" stroke="#ca8a04"/><text x="30" y="29">1</text><text x="110" y="12" font-size="10" fill="#64748b">B1</text><circle cx="110" cy="25" r="12" fill="#fef9c3" stroke="#ca8a04"/><text x="110" y="29">1</text><circle cx="80" cy="65" r="12" fill="#dbeafe" stroke="#2563eb"/><text x="80" y="69">3</text><line x1="110" y1="37" x2="88" y2="53" stroke="#64748b"/><text x="230" y="12" font-size="10" fill="#64748b">B2</text><circle cx="230" cy="25" r="12" fill="#fef9c3" stroke="#ca8a04"/><text x="230" y="29">1</text><circle cx="195" cy="65" r="12" fill="#dbeafe" stroke="#2563eb"/><text x="195" y="69">3</text><circle cx="255" cy="65" r="12" fill="#dbeafe" stroke="#2563eb"/><text x="255" y="69">2</text><circle cx="230" cy="105" r="12" fill="#dbeafe" stroke="#2563eb"/><text x="230" y="109">5</text><line x1="230" y1="37" x2="203" y2="53" stroke="#64748b"/><line x1="230" y1="37" x2="248" y2="53" stroke="#64748b"/><line x1="255" y1="77" x2="242" y2="93" stroke="#64748b"/></g></svg>' },
          { type: 'note', text: {
            zh: '$B_0$ 為單節點;$B_1$ 由兩棵 $B_0$ 連結;$B_2$ 由兩棵 $B_1$ 連結。每棵 $B_k$ 恰有 $2^k$ 節點,根的度數為 $k$。',
            en: '$B_0$ is a single node; $B_1$ links two $B_0$ trees; $B_2$ links two $B_1$ trees. Each $B_k$ has exactly $2^k$ nodes and root degree $k$.' } },
        ],
      },
      {
        heading: { zh: '複雜度分析', en: 'Complexity Analysis' },
        blocks: [
          { type: 'table',
            headers: [ { zh: '操作', en: 'Operation' }, { zh: '時間', en: 'Time' }, { zh: '空間', en: 'Space' } ],
            rows: [
              [ { zh: 'insert (攤銷)', en: 'insert (amortized)' }, { zh: '$O(1)$', en: '$O(1)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: 'peek', en: 'peek' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: 'extractTop (最壞)', en: 'extractTop (worst)' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: 'merge (最壞)', en: 'merge (worst)' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: 'decreaseKey (最壞)', en: 'decreaseKey (worst)' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: '空間合計', en: 'Total Space' }, { zh: '—', en: '—' }, { zh: '$O(N)$', en: '$O(N)$' } ],
            ] },
          { type: 'math', tex: 'T_{\\text{merge}}(N) = O(\\log N)', caption: {
            zh: '合併兩個大小為 $N$ 的二項堆積最多處理 $2\\lfloor\\log_2 N\\rfloor+2$ 棵樹,故為 $O(\\log N)$。',
            en: 'Merging two size-$N$ binomial heaps processes at most $2\\lfloor\\log_2 N\\rfloor+2$ trees, giving $O(\\log N)$.' } },
        ],
      },
      {
        heading: { zh: '程式碼', en: 'Source Code' },
        blocks: [
          { type: 'code', lang: 'cpp', code: 'void linkTrees(BNode* rootY, BNode* rootZ) {\n    rootY->parent = rootZ;\n    rootY->sibling = rootZ->child;\n    rootZ->child = rootY;\n    rootZ->degree++;\n}\n\nBNode* unionHeaps(BNode* h1, BNode* h2) {\n    BNode* newHead = mergeRootLists(h1, h2);\n    if (!newHead) return nullptr;\n\n    BNode* prev = nullptr, *curr = newHead, *next = curr->sibling;\n    while (next) {\n        bool degreeDiff  = curr->degree != next->degree;\n        bool tripleSame  = next->sibling && next->sibling->degree == curr->degree;\n        if (degreeDiff || tripleSame) {\n            prev = curr; curr = next;\n        } else if (cmp(curr->key, next->key)) {\n            curr->sibling = next->sibling;\n            linkTrees(next, curr);\n        } else {\n            if (!prev) newHead = next; else prev->sibling = next;\n            linkTrees(curr, next);\n            curr = next;\n        }\n        next = curr->sibling;\n    }\n    return newHead;\n}' },
        ],
      },
      {
        heading: { zh: '優缺點與使用時機', en: 'Pros, Cons & When to Use' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '優點:$O(\\log N)$ 合併,明顯優於 Binary Heap 的 $O(N+M)$(串接+build-heap)且支援更多使用場景。', en: 'Pro: $O(\\log N)$ merge — superior structure for repeated merges compared to Binary Heap\'s $O(N+M)$ concatenate+build-heap.' },
            { zh: '優點:插入攤銷 $O(1)$,連續插入效率高。', en: 'Pro: $O(1)$ amortized insert; efficient for sequential insertions.' },
            { zh: '缺點:指標結構,快取效能不如陣列式 Binary Heap。', en: 'Con: pointer-based; worse cache performance than array-based Binary Heap.' },
            { zh: '缺點:peek 需要線性掃描根串列 $O(\\log N)$;不提供 $O(1)$ peek。', en: 'Con: peek requires a linear scan of the root list — $O(\\log N)$, not $O(1)$.' },
            { zh: '適用:需要高效合併的優先佇列場景,如事件驅動模擬器、Prim 演算法的外部合併。', en: 'Use when efficient merges are critical: event-driven simulators, external-merge Prim MST.' },
          ] },
        ],
      },
      {
        heading: { zh: '小結', en: 'Summary' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '$N$ 個元素 → 至多 $\\lfloor\\log_2 N\\rfloor+1$ 棵樹,每個度數至多一棵。', en: '$N$ elements → at most $\\lfloor\\log_2 N\\rfloor+1$ trees; at most one tree per degree.' },
            { zh: '合併 $O(\\log N)$,插入攤銷 $O(1)$,extractTop $O(\\log N)$ 最壞。', en: 'Merge $O(\\log N)$; insert $O(1)$ amortized; extractTop $O(\\log N)$ worst-case.' },
            { zh: '結構類比二進位加法:相同度數的樹做 link 如同進位操作。', en: 'Structure mirrors binary addition: linking equal-degree trees is analogous to carrying.' },
          ] },
        ],
      },
    ],
  },

  'heap-fibonacci': {
    category: 'Advanced & Application-Specific',
    title: { zh: '費波那契堆積(Fibonacci Heap)', en: 'Fibonacci Heap' },
    slides: [
      {
        heading: { zh: '費波那契堆積(Fibonacci Heap)', en: 'Fibonacci Heap' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '以循環雙向鏈結根串列延遲合併,配合 cut 與 cascading-cut 維持攤銷界,提供 $O(1)$ 攤銷 insert/merge/decrease-key 及 $O(\\log N)$ 攤銷 extractTop,是理論上最優的優先佇列。',
            en: 'A lazy-melding heap using a circular doubly-linked root list; cut and cascading-cut maintain amortized bounds: $O(1)$ amortized insert/merge/decrease-key and $O(\\log N)$ amortized extractTop — the theoretically optimal priority queue.' } },
        ],
      },
      {
        heading: { zh: '核心概念', en: 'Core Concept' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '所有樹根形成循環雙向鏈結串列(root list),`best` 指向最小根。consolidate 在 extractTop 時才整理結構。decrease-key 透過 cut 將節點移至根串列,再以 cascading-cut 確保父節點最多損失一個子節點。',
            en: 'All tree roots form a circular doubly-linked list (root list); `best` points to the minimum root. Consolidation is deferred until extractTop. decrease-key uses cut to move a node to the root list, and cascading-cut ensures no parent loses more than one child.' } },
          { type: 'bullets', items: [
            { zh: 'insert:建立新節點加入根串列,若鍵值更小則更新 `best` — 純 $O(1)$。', en: 'insert: create node, splice into root list, update `best` if smaller — pure $O(1)$.' },
            { zh: 'merge:將兩個根串列拼接,更新 `best` — $O(1)$ 攤銷。', en: 'merge: splice the two root lists, update `best` — $O(1)$ amortized.' },
            { zh: 'consolidate:將根串列中度數相同的樹兩兩合併,使每個度數至多一棵(在 extractTop 中呼叫)。', en: 'consolidate: link trees of equal degree in the root list until each degree is unique (called inside extractTop).' },
            { zh: 'cascading-cut:若父節點已失去一個子節點(mark=true),則繼續向上 cut。', en: 'cascading-cut: if a parent has already lost one child (mark=true), continue cutting upward.' },
          ] },
        ],
      },
      {
        heading: { zh: '運作流程', en: 'Operation Flow' },
        blocks: [
          { type: 'steps', items: [
            { zh: 'decrease-key(x, k):令 x.key = k;若 k < parent.key,執行 cut(x)。', en: 'decrease-key(x, k): set x.key = k; if k < parent.key, call cut(x).' },
            { zh: 'cut(x):從父節點子串列移除 x,加入根串列,清除 mark。', en: 'cut(x): remove x from its parent\'s child list, add to root list, clear mark.' },
            { zh: 'cascading-cut(parent):若 parent.mark=false 設為 true 並停止;若 true 繼續 cut(parent)。', en: 'cascading-cut(parent): if parent.mark is false set it true and stop; if true, cut(parent) and recurse.' },
            { zh: 'extractTop:將 best 的子節點全部移至根串列,呼叫 consolidate 整理,更新 best。', en: 'extractTop: move all children of best to the root list, call consolidate, update best.' },
          ] },
          { type: 'mermaid', code: 'flowchart TD\n  INSERT["insert(x)\\nO(1) amortized"] --> ROOTLIST["add to root list\\nupdate best"]\n  EXTRACT["extractTop\\nO(log N) amortized"] --> PROMOTE["promote children\\nto root list"]\n  PROMOTE --> CONSOLIDATE["consolidate\\n(link equal-degree trees)"]\n  DKEY["decreaseKey\\nO(1) amortized"] --> CUT["cut node\\nto root list"]\n  CUT --> CCUT["cascading-cut\\n(parent chain)"]' },
        ],
      },
      {
        heading: { zh: 'Fibonacci 堆積根串列示意', en: 'Fibonacci Heap Root List Diagram' },
        blocks: [
          { type: 'svg', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 120" width="360" height="120"><g font-family="sans-serif" font-size="11" text-anchor="middle"><text x="180" y="14" font-size="10" fill="#64748b">root list (circular doubly-linked)</text><circle cx="60" cy="50" r="16" fill="#fef9c3" stroke="#ca8a04" stroke-width="2"/><text x="60" y="54">1</text><text x="60" y="38" font-size="9" fill="#ca8a04">best</text><circle cx="140" cy="50" r="16" fill="#dbeafe" stroke="#2563eb"/><text x="140" y="54">5</text><circle cx="220" cy="50" r="16" fill="#dbeafe" stroke="#2563eb"/><text x="220" y="54">3</text><circle cx="300" cy="50" r="16" fill="#dbeafe" stroke="#2563eb"/><text x="300" y="54">8</text><line x1="76" y1="50" x2="124" y2="50" stroke="#64748b" marker-end="url(#arr)"/><line x1="156" y1="50" x2="204" y2="50" stroke="#64748b"/><line x1="236" y1="50" x2="284" y2="50" stroke="#64748b"/><path d="M 300 66 Q 180 110 60 66" stroke="#64748b" fill="none"/><circle cx="140" cy="90" r="12" fill="#dcfce7" stroke="#16a34a"/><text x="140" y="94">7</text><line x1="140" y1="66" x2="140" y2="78" stroke="#64748b"/><text x="180" y="115" font-size="9" fill="#64748b">circular link back to best</text></g></svg>' },
          { type: 'note', text: {
            zh: '根串列為循環雙向鏈結;`best` 指向最小根(key=1)。子樹可掛在任意根節點下,consolidate 前不整理。',
            en: 'The root list is circular and doubly-linked; `best` points to the minimum root (key=1). Subtrees hang under any root node and are not tidied until consolidate is called.' } },
        ],
      },
      {
        heading: { zh: '複雜度分析', en: 'Complexity Analysis' },
        blocks: [
          { type: 'table',
            headers: [ { zh: '操作', en: 'Operation' }, { zh: '時間', en: 'Time' }, { zh: '空間', en: 'Space' } ],
            rows: [
              [ { zh: 'insert', en: 'insert' }, { zh: '$O(1)$ 最壞', en: '$O(1)$ worst-case' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: 'peek', en: 'peek' }, { zh: '$O(1)$ 最壞', en: '$O(1)$ worst-case' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: 'merge', en: 'merge' }, { zh: '$O(1)$ 最壞', en: '$O(1)$ worst-case' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: 'decrease-key', en: 'decrease-key' }, { zh: '$O(1)$ 攤銷', en: '$O(1)$ amortized' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: 'extractTop', en: 'extractTop' }, { zh: '$O(\\log N)$ 攤銷', en: '$O(\\log N)$ amortized' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: 'delete', en: 'delete' }, { zh: '$O(\\log N)$ 攤銷', en: '$O(\\log N)$ amortized' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: '空間合計', en: 'Total Space' }, { zh: '—', en: '—' }, { zh: '$O(N)$', en: '$O(N)$' } ],
            ] },
          { type: 'math', tex: 'T_{\\text{decrease-key}} = O(1)\\text{ amortized}', caption: {
            zh: '攤銷分析基於勢能函數 $\\Phi = t + 2m$($t$ 為根串列長度,$m$ 為有 mark 的節點數),保證 decrease-key 攤銷 $O(1)$。',
            en: 'Amortized analysis uses potential $\\Phi = t + 2m$ (t = root-list size, m = marked nodes), proving decrease-key costs $O(1)$ amortized.' } },
        ],
      },
      {
        heading: { zh: '程式碼', en: 'Source Code' },
        blocks: [
          { type: 'code', lang: 'cpp', code: 'FNode* insert(int key) {\n    FNode* x = new FNode(key);\n    addToRootList(x);\n    n++;\n    return x;\n}\n\nvoid cut(FNode* x, FNode* y) {      // x: child, y: parent\n    if (y->child == x)\n        y->child = (x->right != x) ? x->right : nullptr;\n    y->degree--;\n    removeNode(x);\n    addToRootList(x);\n}\n\nvoid cascadingCut(FNode* y) {\n    FNode* z = y->parent;\n    if (!z) return;\n    if (!y->mark) { y->mark = true; }\n    else { cut(y, z); cascadingCut(z); }\n}\n\nvoid decreaseOrIncreaseKey(FNode* x, int newKey) {\n    x->key = newKey;\n    FNode* y = x->parent;\n    if (y && cmp(x->key, y->key)) {\n        cut(x, y);\n        cascadingCut(y);\n    }\n    if (!best || cmp(x->key, best->key)) best = x;\n}' },
        ],
      },
      {
        heading: { zh: '優缺點與使用時機', en: 'Pros, Cons & When to Use' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '優點:decrease-key $O(1)$ 攤銷是理論最優,使 Dijkstra 達 $O(E + V\\log V)$。', en: 'Pro: $O(1)$ amortized decrease-key is theoretically optimal, making Dijkstra run in $O(E + V\\log V)$.' },
            { zh: '優點:insert 與 merge 皆為 $O(1)$ 最壞,適合大量插入後集中 extract 的工作負載。', en: 'Pro: $O(1)$ worst-case insert and merge; ideal for insert-heavy then extract-heavy workloads.' },
            { zh: '缺點:實作複雜,常數因子大,指標密集,實際效能常遜於 Binary Heap。', en: 'Con: complex implementation, large constant factors, pointer-intensive — often slower in practice than Binary Heap.' },
            { zh: '缺點:consolidate 最壞單次 $O(N)$,但攤銷 $O(\\log N)$。', en: 'Con: consolidate is $O(N)$ worst-case single call, but $O(\\log N)$ amortized.' },
            { zh: '適用:decrease-key 頻繁的演算法(Dijkstra、Prim、網路流)之理論研究與競賽。', en: 'Use for decrease-key-heavy algorithms (Dijkstra, Prim, network flow) in theory research and competitive programming.' },
          ] },
        ],
      },
      {
        heading: { zh: '小結', en: 'Summary' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '延遲合併根串列:insert/merge/decrease-key 皆 $O(1)$ 攤銷。', en: 'Lazy root-list merging: insert, merge, and decrease-key are all $O(1)$ amortized.' },
            { zh: 'extractTop 觸發 consolidate:攤銷 $O(\\log N)$。', en: 'extractTop triggers consolidate: $O(\\log N)$ amortized.' },
            { zh: '理論最優但實作複雜;適合以 decrease-key 為核心的圖演算法。', en: 'Theoretically optimal but complex; best suited to graph algorithms that rely heavily on decrease-key.' },
          ] },
        ],
      },
    ],
  },

  'heap-leftist': {
    category: 'Advanced & Application-Specific',
    title: { zh: '左傾堆積(Leftist Heap)', en: 'Leftist Heap' },
    slides: [
      {
        heading: { zh: '左傾堆積(Leftist Heap)', en: 'Leftist Heap' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '以 null-path-length (NPL) 為依據保持右脊最短的二元堆積,所有操作皆以 merge 為原語,提供 $O(\\log N)$ 合併、插入與取出。',
            en: 'A binary heap that keeps the right spine shortest by maintaining null-path-length (NPL) invariants; all operations are defined in terms of merge, giving $O(\\log N)$ meld, insert, and extract.' } },
        ],
      },
      {
        heading: { zh: '核心概念', en: 'Core Concept' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '節點的 NPL 定義為到達最近 null 子節點的最短路徑長度。左傾性質:對每個節點,左子節點的 NPL $\\geq$ 右子節點的 NPL,確保右脊長度 $\\leq \\log_2(N+1)$。',
            en: 'NPL of a node is the length of the shortest path to a null descendant. Leftist property: for every node, NPL(left child) $\\geq$ NPL(right child), bounding the right-spine length to $\\leq \\log_2(N+1)$.' } },
          { type: 'bullets', items: [
            { zh: 'merge(a, b):較小根留下,其右子樹與另一棵堆積遞迴合併;若合併後右 NPL > 左 NPL,則交換左右子。', en: 'merge(a, b): keep the smaller root, recursively merge its right subtree with the other heap; swap children if NPL(right) > NPL(left) after merge.' },
            { zh: 'insert(x):建立單節點堆積,與主堆積 merge。', en: 'insert(x): create a singleton heap, then merge with the main heap.' },
            { zh: 'extractTop:移除根,merge 左右子樹。', en: 'extractTop: remove root, merge left and right subtrees.' },
          ] },
        ],
      },
      {
        heading: { zh: '運作流程', en: 'Operation Flow' },
        blocks: [
          { type: 'steps', items: [
            { zh: 'merge(a, b):若 a 為 null 回傳 b;若 b 為 null 回傳 a。', en: 'merge(a, b): if a is null return b; if b is null return a.' },
            { zh: '比較 a.key 與 b.key,令 a 為鍵值較小者(min-heap)。', en: 'Compare a.key and b.key; let a be the smaller-key node (min-heap).' },
            { zh: '遞迴:a.right = merge(a.right, b)。', en: 'Recurse: a.right = merge(a.right, b).' },
            { zh: '維護左傾性質:若 NPL(a.left) < NPL(a.right),交換 a 的左右子;更新 a.npl = NPL(a.right) + 1。', en: 'Restore leftist: if NPL(a.left) < NPL(a.right), swap children; update a.npl = NPL(a.right) + 1.' },
          ] },
          { type: 'mermaid', code: 'flowchart TD\n  MA["merge(a, b)"] --> CMP{"a.key < b.key?"}\n  CMP -->|"yes"| REC["a.right = merge(a.right, b)"]\n  CMP -->|"no"| SWAP0["swap a and b, then recurse"]\n  REC --> NPL{"NPL(left) < NPL(right)?"}\n  NPL -->|"yes"| SWAPLR["swap children"]\n  NPL -->|"no"| UPD["update npl"]\n  SWAPLR --> UPD' },
        ],
      },
      {
        heading: { zh: '左傾樹結構示意', en: 'Leftist Tree Structure' },
        blocks: [
          { type: 'svg', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 130" width="300" height="130"><g font-family="sans-serif" font-size="11" text-anchor="middle"><circle cx="150" cy="20" r="14" fill="#fef9c3" stroke="#ca8a04"/><text x="150" y="24">1</text><text x="165" y="14" font-size="9" fill="#64748b">npl=1</text><circle cx="90" cy="60" r="14" fill="#dbeafe" stroke="#2563eb"/><text x="90" y="64">3</text><text x="105" y="54" font-size="9" fill="#64748b">npl=1</text><circle cx="200" cy="60" r="14" fill="#dbeafe" stroke="#2563eb"/><text x="200" y="64">2</text><text x="215" y="54" font-size="9" fill="#64748b">npl=0</text><circle cx="60" cy="100" r="14" fill="#dbeafe" stroke="#2563eb"/><text x="60" y="104">6</text><text x="75" y="94" font-size="9" fill="#64748b">npl=0</text><circle cx="120" cy="100" r="14" fill="#dbeafe" stroke="#2563eb"/><text x="120" y="104">5</text><text x="135" y="94" font-size="9" fill="#64748b">npl=0</text><line x1="150" y1="34" x2="100" y2="47" stroke="#64748b"/><line x1="150" y1="34" x2="190" y2="47" stroke="#64748b"/><line x1="90" y1="74" x2="68" y2="87" stroke="#64748b"/><line x1="90" y1="74" x2="112" y2="87" stroke="#64748b"/><text x="38" y="120" font-size="9" fill="#94a3b8">left spine</text><text x="220" y="75" font-size="9" fill="#94a3b8">right spine (short)</text></g></svg>' },
          { type: 'note', text: {
            zh: '每個節點標示其 npl 值。左子 npl $\\geq$ 右子 npl;根的右脊極短,確保 merge 遞迴深度為 $O(\\log N)$。',
            en: 'Each node shows its npl value. Left npl $\\geq$ right npl; the right spine is kept very short, bounding merge recursion depth to $O(\\log N)$.' } },
        ],
      },
      {
        heading: { zh: '複雜度分析', en: 'Complexity Analysis' },
        blocks: [
          { type: 'table',
            headers: [ { zh: '操作', en: 'Operation' }, { zh: '時間(最壞)', en: 'Time (Worst)' }, { zh: '空間', en: 'Space' } ],
            rows: [
              [ { zh: 'merge', en: 'merge' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' } ],
              [ { zh: 'insert', en: 'insert' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' } ],
              [ { zh: 'peek', en: 'peek' }, { zh: '$O(1)$', en: '$O(1)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: 'extractTop', en: 'extractTop' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' } ],
              [ { zh: '空間合計', en: 'Total Space' }, { zh: '—', en: '—' }, { zh: '$O(N)$', en: '$O(N)$' } ],
            ] },
          { type: 'math', tex: 'T_{\\text{merge}}(N) = O(\\log N)', caption: {
            zh: 'merge 只沿右脊遞迴,右脊長度 $\\leq \\log_2(N+1)$,故每次 merge 最多 $O(\\log N)$ 步。',
            en: 'merge recurses only along the right spine, whose length is $\\leq \\log_2(N+1)$, so each merge takes at most $O(\\log N)$ steps.' } },
        ],
      },
      {
        heading: { zh: '程式碼', en: 'Source Code' },
        blocks: [
          { type: 'code', lang: 'cpp', code: 'LNode* mergeNodes(LNode* a, LNode* b) {\n    if (!a) return b;\n    if (!b) return a;\n    if (!cmp(a->key, b->key)) swap(a, b); // ensure a has smaller key\n\n    a->right = mergeNodes(a->right, b);   // recurse along right spine\n\n    // restore leftist property\n    if (getNpl(a->left) < getNpl(a->right))\n        swap(a->left, a->right);\n    a->npl = getNpl(a->right) + 1;\n    return a;\n}\n\nvoid insert(int x) {\n    root = mergeNodes(root, new LNode(x));\n}\n\nint extractTop() {\n    int out = root->key;\n    LNode* l = root->left, *r = root->right;\n    delete root;\n    root = mergeNodes(l, r);\n    return out;\n}' },
        ],
      },
      {
        heading: { zh: '優缺點與使用時機', en: 'Pros, Cons & When to Use' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '優點:$O(\\log N)$ merge,適合需要頻繁合併兩個獨立堆積的場景。', en: 'Pro: $O(\\log N)$ merge; ideal when merging two independent heaps frequently.' },
            { zh: '優點:結構規律(NPL 保證右脊短),易於分析。', en: 'Pro: regular structure (NPL guarantees short right spine) — easy to analyze.' },
            { zh: '缺點:需儲存 npl 欄位,且為指標結構,快取效能不如 Binary Heap。', en: 'Con: requires storing npl fields; pointer-based structure is less cache-friendly than Binary Heap.' },
            { zh: '缺點:decrease-key 無法像 Fibonacci Heap 達到 $O(1)$ 攤銷。', en: 'Con: decrease-key cannot achieve $O(1)$ amortized as in Fibonacci Heap.' },
            { zh: '適用:需要合併優先佇列的圖演算法、外部排序中的多路合併。', en: 'Use for graph algorithms with heap merges, and multi-way merge in external sorting.' },
          ] },
        ],
      },
      {
        heading: { zh: '小結', en: 'Summary' },
        blocks: [
          { type: 'bullets', items: [
            { zh: 'NPL 左傾性質保證右脊長度 $O(\\log N)$,所有操作皆以 merge 表達。', en: 'NPL leftist property bounds right-spine length to $O(\\log N)$; all operations expressed via merge.' },
            { zh: 'merge/insert/extractTop 皆 $O(\\log N)$ 最壞;peek $O(1)$。', en: 'merge, insert, extractTop all $O(\\log N)$ worst-case; peek $O(1)$.' },
            { zh: '相較 Skew Heap 多一個 npl 欄位,但提供嚴格最壞保證(非攤銷)。', en: 'Compared to Skew Heap, one extra npl field per node, but provides strict worst-case (not amortized) bounds.' },
          ] },
        ],
      },
    ],
  },

  'heap-skew': {
    category: 'Advanced & Application-Specific',
    title: { zh: '偏斜堆積(Skew Heap)', en: 'Skew Heap' },
    slides: [
      {
        heading: { zh: '偏斜堆積(Skew Heap)', en: 'Skew Heap' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '自調整合併堆積:每次 merge 後無條件交換左右子節點,無需儲存 npl 欄位,以攤銷 $O(\\log N)$ 的代價完成 merge、insert 與 extractTop。',
            en: 'A self-adjusting merge heap that unconditionally swaps left and right children on every merge step — no npl field needed — achieving $O(\\log N)$ amortized for merge, insert, and extractTop.' } },
        ],
      },
      {
        heading: { zh: '核心概念', en: 'Core Concept' },
        blocks: [
          { type: 'paragraph', text: {
            zh: 'Skew Heap 是 Leftist Heap 的簡化版本:Leftist Heap 只在 NPL 違反時交換子節點,而 Skew Heap 每次都無條件交換,以攤銷分析保證 $O(\\log N)$ 效能而不維護任何平衡資訊。',
            en: 'Skew Heap is a simplification of Leftist Heap: Leftist swaps children only when the NPL property is violated; Skew swaps unconditionally every time, relying on amortized analysis for $O(\\log N)$ performance without any balance bookkeeping.' } },
          { type: 'bullets', items: [
            { zh: 'merge(a, b):令較小根為 a;a.right = merge(a.right, b);然後無條件 swap(a.left, a.right)。', en: 'merge(a, b): let a be the smaller root; set a.right = merge(a.right, b); then unconditionally swap(a.left, a.right).' },
            { zh: 'insert(x):建立單節點堆積,與主堆積 merge。', en: 'insert(x): create a singleton heap, then merge with the main heap.' },
            { zh: 'extractTop:移除根,merge 左右子樹。', en: 'extractTop: remove root, merge left and right subtrees.' },
            { zh: '無 npl 欄位,節點結構最小化。', en: 'No npl field — minimal node structure.' },
          ] },
        ],
      },
      {
        heading: { zh: '運作流程', en: 'Operation Flow' },
        blocks: [
          { type: 'steps', items: [
            { zh: 'merge(a, b):若任一為 null 回傳另一方。', en: 'merge(a, b): if either is null, return the other.' },
            { zh: '令 a 的根鍵值 $\\leq$ b 的根鍵值(若否則 swap(a, b))。', en: 'Ensure a.key $\\leq$ b.key (swap a and b if not).' },
            { zh: '遞迴:a.right = merge(a.right, b)。', en: 'Recurse: a.right = merge(a.right, b).' },
            { zh: '無條件交換 a 的左右子:swap(a.left, a.right)。回傳 a。', en: 'Unconditionally swap a\'s children: swap(a.left, a.right). Return a.' },
          ] },
          { type: 'mermaid', code: 'flowchart TD\n  M["merge(a, b)"] --> NULL{"null check"}\n  NULL -->|"a or b null"| RET["return non-null"]\n  NULL -->|"both non-null"| CMP{"a.key <= b.key?"}\n  CMP -->|"no"| SWP["swap(a, b)"]\n  CMP -->|"yes"| REC\n  SWP --> REC["a.right = merge(a.right, b)"]\n  REC --> USWAP["swap(a.left, a.right)\\n(unconditional)"]\n  USWAP --> RETA["return a"]' },
        ],
      },
      {
        heading: { zh: '偏斜堆積結構示意', en: 'Skew Heap Structure Diagram' },
        blocks: [
          { type: 'svg', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 140" width="280" height="140"><g font-family="sans-serif" font-size="11" text-anchor="middle"><circle cx="140" cy="20" r="14" fill="#fef9c3" stroke="#ca8a04"/><text x="140" y="24">2</text><circle cx="80" cy="60" r="14" fill="#dbeafe" stroke="#2563eb"/><text x="80" y="64">5</text><circle cx="180" cy="60" r="14" fill="#dbeafe" stroke="#2563eb"/><text x="180" y="64">7</text><circle cx="50" cy="100" r="14" fill="#dbeafe" stroke="#2563eb"/><text x="50" y="104">12</text><circle cx="110" cy="100" r="14" fill="#dbeafe" stroke="#2563eb"/><text x="110" y="104">18</text><circle cx="160" cy="100" r="14" fill="#dbeafe" stroke="#2563eb"/><text x="160" y="104">30</text><line x1="140" y1="34" x2="90" y2="47" stroke="#64748b"/><line x1="140" y1="34" x2="172" y2="47" stroke="#64748b"/><line x1="80" y1="74" x2="58" y2="87" stroke="#64748b"/><line x1="80" y1="74" x2="102" y2="87" stroke="#64748b"/><line x1="180" y1="74" x2="165" y2="87" stroke="#64748b"/><text x="140" y="135" font-size="9" fill="#64748b">no npl field; shape varies after merges</text></g></svg>' },
          { type: 'note', text: {
            zh: '偏斜堆積無需維護 npl 欄位。每次 merge 後無條件交換子節點使樹形自然平衡,攤銷分析保證操作代價為 $O(\\log N)$。',
            en: 'No npl field is stored. Unconditional child swaps after each merge naturally balance the tree shape; amortized analysis guarantees $O(\\log N)$ per operation.' } },
        ],
      },
      {
        heading: { zh: '複雜度分析', en: 'Complexity Analysis' },
        blocks: [
          { type: 'table',
            headers: [ { zh: '操作', en: 'Operation' }, { zh: '攤銷時間', en: 'Amortized Time' }, { zh: '空間', en: 'Space' } ],
            rows: [
              [ { zh: 'merge', en: 'merge' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' } ],
              [ { zh: 'insert', en: 'insert' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' } ],
              [ { zh: 'peek', en: 'peek' }, { zh: '$O(1)$', en: '$O(1)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: 'extractTop', en: 'extractTop' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' } ],
              [ { zh: '空間合計', en: 'Total Space' }, { zh: '—', en: '—' }, { zh: '$O(N)$', en: '$O(N)$' } ],
            ] },
          { type: 'math', tex: 'T_{\\text{merge}} = O(\\log N)\\text{ amortized}', caption: {
            zh: '以重 / 輕路徑勢能函數分析:無條件交換確保整個操作序列的平均代價為 $O(\\log N)$。',
            en: 'Heavy/light path potential analysis shows unconditional swaps amortize to $O(\\log N)$ over any sequence of operations.' } },
        ],
      },
      {
        heading: { zh: '程式碼', en: 'Source Code' },
        blocks: [
          { type: 'code', lang: 'cpp', code: 'SNode* mergeNodes(SNode* a, SNode* b) {\n    if (!a) return b;\n    if (!b) return a;\n    if (!cmp(a->key, b->key)) swap(a, b); // ensure a has smaller key\n\n    a->right = mergeNodes(a->right, b);   // recurse along right\n    swap(a->left, a->right);              // unconditional swap\n    return a;\n}\n\nvoid insert(int x) {\n    root = mergeNodes(root, new SNode(x));\n}\n\nint extractTop() {\n    int out = root->key;\n    SNode* l = root->left, *r = root->right;\n    delete root;\n    root = mergeNodes(l, r);\n    return out;\n}\n\nvoid merge(SkewHeap& other) {\n    root = mergeNodes(root, other.root);\n    other.root = nullptr;\n}' },
        ],
      },
      {
        heading: { zh: '優缺點與使用時機', en: 'Pros, Cons & When to Use' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '優點:比 Leftist Heap 更簡單,無需 npl 欄位,程式碼最精簡。', en: 'Pro: simpler than Leftist Heap — no npl field; minimal code.' },
            { zh: '優點:攤銷 $O(\\log N)$ merge,適合頻繁合併的場景。', en: 'Pro: $O(\\log N)$ amortized merge; suitable for frequent-merge scenarios.' },
            { zh: '缺點:單次操作最壞可能退化至 $O(N)$,不適合嚴格延遲要求的系統。', en: 'Con: single-call worst case can degrade to $O(N)$ — unsuitable for strict latency requirements.' },
            { zh: '缺點:指標結構,快取效能不如 Binary Heap。', en: 'Con: pointer-based; worse cache performance than Binary Heap.' },
            { zh: '適用:快速原型、教學展示、以及需要 merge 但不需 decrease-key 的中等規模應用。', en: 'Use for rapid prototyping, teaching, and moderate-scale applications needing merge but not decrease-key.' },
          ] },
        ],
      },
      {
        heading: { zh: '小結', en: 'Summary' },
        blocks: [
          { type: 'bullets', items: [
            { zh: 'Leftist Heap 的簡化:去掉 npl,每次 merge 無條件交換子節點。', en: 'Simplifies Leftist Heap: remove npl, swap children unconditionally on every merge.' },
            { zh: 'merge/insert/extractTop 攤銷 $O(\\log N)$;peek $O(1)$。', en: 'merge, insert, extractTop: $O(\\log N)$ amortized; peek $O(1)$.' },
            { zh: '自調整性質使其結構隨操作序列自然平衡,無需顯式平衡資訊。', en: 'Self-adjusting nature naturally balances the structure over operation sequences — no explicit balance info needed.' },
          ] },
        ],
      },
    ],
  },

  'heap-dary': {
    category: 'Advanced & Application-Specific',
    title: { zh: 'D-ary 堆積(4-ary Heap)', en: 'D-ary Heap (4-ary)' },
    slides: [
      {
        heading: { zh: 'D-ary 堆積(4-ary Heap)', en: 'D-ary Heap (4-ary)' },
        blocks: [
          { type: 'paragraph', text: {
            zh: 'Binary Heap 的推廣:每個節點有 $d$ 個子節點($d=4$ 為 4-ary Heap),以更寬的樹減少 sift-up 次數,但 sift-down 每層需比較 $d$ 個子節點。',
            en: 'A generalization of Binary Heap where each node has $d$ children (here $d=4$); the wider tree reduces sift-up depth but sift-down compares $d$ children per level.' } },
        ],
      },
      {
        heading: { zh: '核心概念', en: 'Core Concept' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '節點 $i$ 的父節點為 $(i-1)/d$;第 $j$ 個子節點為 $i \\cdot d + j + 1$($j = 0, \\ldots, d-1$)。高度為 $\\lfloor\\log_d N\\rfloor$,比 Binary Heap 矮。',
            en: 'Node $i$ has parent $(i-1)/d$; its $j$-th child is $i \\cdot d + j + 1$ for $j = 0,\\ldots,d-1$. Tree height is $\\lfloor\\log_d N\\rfloor$ — shallower than Binary Heap.' } },
          { type: 'bullets', items: [
            { zh: 'sift-up:每層只有一次比較(與父節點),步數為 $O(\\log_d N)$,比 Binary Heap 少。', en: 'sift-up: one comparison per level (with parent); $O(\\log_d N)$ steps — fewer than Binary Heap.' },
            { zh: 'sift-down:每層需比較 $d$ 個子節點;總代價 $O(d \\log_d N)$。', en: 'sift-down: compares $d$ children per level; total cost $O(d \\log_d N)$.' },
            { zh: 'insert 優化:大量 insert 場景下 $d > 2$ 可顯著減少 sift-up 的層數。', en: 'insert speedup: for insert-heavy workloads, $d > 2$ significantly reduces sift-up levels.' },
          ] },
        ],
      },
      {
        heading: { zh: '運作流程', en: 'Operation Flow' },
        blocks: [
          { type: 'steps', items: [
            { zh: 'insert(x):追加至陣列末端,執行 sift-up。每步比較 data[i] 與父節點 data[(i-1)/d]。', en: 'insert(x): append to array, then sift-up. Each step compares data[i] with parent data[(i-1)/d].' },
            { zh: 'extractTop:根與末端互換後移除末端。', en: 'extractTop: swap root with last element, pop the last.' },
            { zh: 'sift-down:從根開始,在 $d$ 個子節點中找最小者(min-heap);若小於當前節點則互換並繼續。', en: 'sift-down: starting from root, find the minimum among $d$ children (min-heap); swap if it is smaller than current, then continue.' },
            { zh: '重複直到葉節點或不再違反 heap 性質。', en: 'Repeat until a leaf or no heap-property violation remains.' },
          ] },
          { type: 'mermaid', code: 'flowchart LR\n  A["insert(x)\\nappend + sift-up"] --> B["compare with\\nparent (i-1)/d"]\n  B --> C{"parent > x?"}\n  C -->|"yes"| D["swap, move up"]\n  D --> B\n  C -->|"no"| E["done"]\n  F["extractTop\\nswap root + sift-down"] --> G["find min of\\nd children"]\n  G --> H{"min child < node?"}\n  H -->|"yes"| I["swap, move down"]\n  I --> G\n  H -->|"no"| E' },
        ],
      },
      {
        heading: { zh: '4-ary 堆積陣列示意', en: '4-ary Heap Array Diagram' },
        blocks: [
          { type: 'svg', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 130" width="380" height="130"><g font-family="sans-serif" font-size="11" text-anchor="middle"><rect x="10" y="10" width="40" height="28" fill="#fef9c3" stroke="#ca8a04"/><text x="30" y="28">1</text><text x="30" y="8" font-size="9" fill="#64748b">i=0</text><rect x="60" y="10" width="40" height="28" fill="#dbeafe" stroke="#2563eb"/><text x="80" y="28">3</text><text x="80" y="8" font-size="9" fill="#64748b">i=1</text><rect x="110" y="10" width="40" height="28" fill="#dbeafe" stroke="#2563eb"/><text x="130" y="28">5</text><text x="130" y="8" font-size="9" fill="#64748b">i=2</text><rect x="160" y="10" width="40" height="28" fill="#dbeafe" stroke="#2563eb"/><text x="180" y="28">7</text><text x="180" y="8" font-size="9" fill="#64748b">i=3</text><rect x="210" y="10" width="40" height="28" fill="#dbeafe" stroke="#2563eb"/><text x="230" y="28">9</text><text x="230" y="8" font-size="9" fill="#64748b">i=4</text><rect x="260" y="10" width="40" height="28" fill="#e9d5ff" stroke="#7c3aed"/><text x="280" y="28">4</text><text x="280" y="8" font-size="9" fill="#64748b">i=5</text><rect x="310" y="10" width="40" height="28" fill="#e9d5ff" stroke="#7c3aed"/><text x="330" y="28">6</text><text x="330" y="8" font-size="9" fill="#64748b">i=6</text><circle cx="100" cy="80" r="14" fill="#fef9c3" stroke="#ca8a04"/><text x="100" y="84">1</text><circle cx="30" cy="115" r="12" fill="#dbeafe" stroke="#2563eb"/><text x="30" y="119">3</text><circle cx="70" cy="115" r="12" fill="#dbeafe" stroke="#2563eb"/><text x="70" y="119">5</text><circle cx="110" cy="115" r="12" fill="#dbeafe" stroke="#2563eb"/><text x="110" y="119">7</text><circle cx="150" cy="115" r="12" fill="#dbeafe" stroke="#2563eb"/><text x="150" y="119">9</text><line x1="100" y1="94" x2="38" y2="104" stroke="#64748b"/><line x1="100" y1="94" x2="72" y2="104" stroke="#64748b"/><line x1="100" y1="94" x2="108" y2="104" stroke="#64748b"/><line x1="100" y1="94" x2="142" y2="104" stroke="#64748b"/><text x="300" y="80" font-size="9" fill="#64748b">blue: children of root</text><text x="300" y="95" font-size="9" fill="#64748b">purple: grandchildren</text></g></svg>' },
          { type: 'note', text: {
            zh: '4-ary Heap:根節點(i=0)有 4 個子節點(i=1..4),每個子節點再各有 4 個子節點(i=5..20...)。高度為 $\\lfloor\\log_4 N\\rfloor$。',
            en: '4-ary Heap: the root (i=0) has 4 children (i=1..4); each child has 4 grandchildren (i=5..20...). Height is $\\lfloor\\log_4 N\\rfloor$.' } },
        ],
      },
      {
        heading: { zh: '複雜度分析', en: 'Complexity Analysis' },
        blocks: [
          { type: 'table',
            headers: [ { zh: '操作', en: 'Operation' }, { zh: '時間(最壞)', en: 'Time (Worst)' }, { zh: '空間', en: 'Space' } ],
            rows: [
              [ { zh: 'insert', en: 'insert' }, { zh: '$O(\\log_d N)$', en: '$O(\\log_d N)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: 'peek', en: 'peek' }, { zh: '$O(1)$', en: '$O(1)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: 'extractTop', en: 'extractTop' }, { zh: '$O(d \\cdot \\log_d N)$', en: '$O(d \\cdot \\log_d N)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: 'decreaseKey', en: 'decreaseKey' }, { zh: '$O(\\log_d N)$', en: '$O(\\log_d N)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: '空間合計', en: 'Total Space' }, { zh: '—', en: '—' }, { zh: '$O(N)$', en: '$O(N)$' } ],
            ] },
          { type: 'math', tex: 'T_{\\text{siftDown}}(N) = O(d \\cdot \\log_d N)', caption: {
            zh: 'sift-down 每層比較 $d$ 個子節點,樹高 $\\log_d N$,故總比較次數為 $d \\cdot \\log_d N$。對 $d=4$:每層 4 次比較,高度 $\\log_4 N \\approx 0.5 \\log_2 N$。',
            en: 'sift-down compares $d$ children per level; height is $\\log_d N$, giving $d \\cdot \\log_d N$ comparisons total. For $d=4$: 4 compares per level, height $\\approx 0.5\\log_2 N$.' } },
        ],
      },
      {
        heading: { zh: '程式碼', en: 'Source Code' },
        blocks: [
          { type: 'code', lang: 'cpp', code: 'void siftUp(int index) {\n    while (index > 0) {\n        int p = (index - 1) / d;\n        if (!cmp(data[index], data[p])) break;\n        swap(data[index], data[p]);\n        index = p;\n    }\n}\n\nvoid siftDown(int index) {\n    while (true) {\n        int best = index;\n        for (int offset = 0; offset < d; ++offset) {\n            int c = index * d + offset + 1;\n            if (c < (int)data.size() && cmp(data[c], data[best]))\n                best = c;\n        }\n        if (best == index) break;\n        swap(data[index], data[best]);\n        index = best;\n    }\n}\n\nvoid insert(int value) {\n    data.push_back(value);\n    siftUp((int)data.size() - 1);\n}\n\nint extractTop() {\n    int top = data[0];\n    data[0] = data.back(); data.pop_back();\n    if (!data.empty()) siftDown(0);\n    return top;\n}' },
        ],
      },
      {
        heading: { zh: '優缺點與使用時機', en: 'Pros, Cons & When to Use' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '優點:sift-up 步數為 $O(\\log_d N)$,大 $d$ 時顯著少於 Binary Heap。', en: 'Pro: sift-up takes $O(\\log_d N)$ steps — significantly fewer than Binary Heap for large $d$.' },
            { zh: '優點:陣列連續儲存,快取友好。', en: 'Pro: contiguous array storage gives good cache performance.' },
            { zh: '缺點:sift-down 每層比較 $d$ 個子節點,$d$ 大時單次 extract 比較次數多。', en: 'Con: sift-down compares $d$ children per level; large $d$ increases comparisons per extract.' },
            { zh: '缺點:最佳 $d$ 取決於工作負載(insert vs extract 比例)及快取大小,需調參。', en: 'Con: optimal $d$ depends on workload (insert-to-extract ratio) and cache size — requires tuning.' },
            { zh: '適用:insert 遠多於 extract 的場景(如 Dijkstra 在稀疏圖);$d=4$ 通常是實踐中的良好預設。', en: 'Use when inserts far outnumber extracts (e.g. Dijkstra on sparse graphs); $d=4$ is a good practical default.' },
          ] },
        ],
      },
      {
        heading: { zh: '小結', en: 'Summary' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '每節點有 $d$ 個子節點;父節點 $(i-1)/d$,第 $j$ 子 $id+j+1$。', en: 'Each node has $d$ children; parent is $(i-1)/d$, $j$-th child is $id+j+1$.' },
            { zh: 'insert $O(\\log_d N)$;extractTop $O(d\\log_d N)$;peek $O(1)$。', en: 'insert $O(\\log_d N)$; extractTop $O(d\\log_d N)$; peek $O(1)$.' },
            { zh: '$d=4$ 在 insert 密集的工作負載下通常優於 Binary Heap;$d=2$ 在 extract 密集時更佳。', en: '$d=4$ typically outperforms Binary Heap for insert-heavy workloads; $d=2$ is better for extract-heavy.' },
          ] },
        ],
      },
    ],
  },

  'heap-pairing': {
    category: 'Advanced & Application-Specific',
    title: { zh: '配對堆積(Pairing Heap)', en: 'Pairing Heap' },
    slides: [
      {
        heading: { zh: '配對堆積(Pairing Heap)', en: 'Pairing Heap' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '以 meld(配對連結)為核心原語的多叉樹堆積:insert 與 merge 為 $O(1)$,extractTop 執行成對合併(two-pass pairing),攤銷 $O(\\log N)$,實際效能接近 Fibonacci Heap。',
            en: 'A multiway-tree heap where meld is the core primitive: insert and merge cost $O(1)$; extractTop performs two-pass pairing of children, amortized $O(\\log N)$ — practical performance rivals Fibonacci Heap.' } },
        ],
      },
      {
        heading: { zh: '核心概念', en: 'Core Concept' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '每個節點儲存第一個子節點指標與下一個兄弟指標。meld 操作比較兩根的鍵值,鍵值較大者成為較小者的第一個子節點。extractTop 移除根後對其所有子節點執行 two-pass pairing:先左到右兩兩配對,再右到左合併。',
            en: 'Each node stores a pointer to its first child and its next sibling. meld compares two roots; the larger-key root becomes the first child of the smaller-key root. extractTop removes the root, then performs two-pass pairing on all its children: first pair left-to-right, then merge right-to-left.' } },
          { type: 'bullets', items: [
            { zh: 'meld(a, b):令鍵值較小的根為 a;b.sibling = a.child;a.child = b;回傳 a — $O(1)$。', en: 'meld(a, b): let a be the smaller root; b.sibling = a.child; a.child = b; return a — $O(1)$.' },
            { zh: 'insert(x):建立新節點,meld 至主堆積 — $O(1)$。', en: 'insert(x): create node, meld into main heap — $O(1)$.' },
            { zh: 'extractTop:移除根,對子節點串列執行 mergePairs — 攤銷 $O(\\log N)$。', en: 'extractTop: remove root, call mergePairs on the child list — $O(\\log N)$ amortized.' },
          ] },
        ],
      },
      {
        heading: { zh: '運作流程', en: 'Operation Flow' },
        blocks: [
          { type: 'steps', items: [
            { zh: 'extractTop:根移除後取得其子節點串列(兄弟鏈)。', en: 'extractTop: after removing the root, obtain its child list (sibling chain).' },
            { zh: 'mergePairs — 第一遍(左至右):取出前兩個子節點,meld 為一棵樹,繼續處理剩餘串列。', en: 'mergePairs pass 1 (left-to-right): take the first two children, meld them into one tree, continue with the rest.' },
            { zh: 'mergePairs — 第二遍(右至左):將第一遍產生的成對樹從右到左依序 meld。', en: 'mergePairs pass 2 (right-to-left): meld the paired trees from right to left.' },
            { zh: '最終得到一棵符合 heap 性質的樹,其根為新最小值。', en: 'The result is a single heap-ordered tree; its root is the new minimum.' },
          ] },
          { type: 'mermaid', code: 'flowchart LR\n  INSERT["insert(x)\\nmeld with root\\nO(1)"] --> ROOT["update root\\nif x.key < root.key"]\n  EXTRACT["extractTop\\nremove root"] --> P1["pass 1: pair children\\nleft-to-right"]\n  P1 --> P2["pass 2: meld pairs\\nright-to-left"]\n  P2 --> NEWROOT["new root = final meld"]' },
        ],
      },
      {
        heading: { zh: '配對堆積結構示意', en: 'Pairing Heap Structure Diagram' },
        blocks: [
          { type: 'svg', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 130" width="300" height="130"><g font-family="sans-serif" font-size="11" text-anchor="middle"><circle cx="150" cy="18" r="14" fill="#fef9c3" stroke="#ca8a04"/><text x="150" y="22">2</text><circle cx="60" cy="58" r="12" fill="#dbeafe" stroke="#2563eb"/><text x="60" y="62">5</text><circle cx="100" cy="58" r="12" fill="#dbeafe" stroke="#2563eb"/><text x="100" y="62">7</text><circle cx="150" cy="58" r="12" fill="#dbeafe" stroke="#2563eb"/><text x="150" y="62">12</text><circle cx="200" cy="58" r="12" fill="#dbeafe" stroke="#2563eb"/><text x="200" y="62">18</text><circle cx="50" cy="98" r="10" fill="#dcfce7" stroke="#16a34a"/><text x="50" y="102">30</text><circle cx="80" cy="98" r="10" fill="#dcfce7" stroke="#16a34a"/><text x="80" y="102">9</text><line x1="150" y1="32" x2="65" y2="47" stroke="#64748b"/><line x1="65" y1="47" x2="95" y2="47" stroke="#64748b" stroke-dasharray="4"/><line x1="95" y1="47" x2="145" y2="47" stroke="#64748b" stroke-dasharray="4"/><line x1="145" y1="47" x2="193" y2="47" stroke="#64748b" stroke-dasharray="4"/><line x1="60" y1="70" x2="52" y2="89" stroke="#64748b"/><line x1="52" y1="89" x2="75" y2="89" stroke="#64748b" stroke-dasharray="4"/><text x="150" y="120" font-size="9" fill="#64748b">solid: child link; dashed: sibling chain</text></g></svg>' },
          { type: 'note', text: {
            zh: '根的所有子節點以兄弟鏈(sibling chain)相連,插入時只需改變頭部指標。extractTop 時對整條兄弟鏈進行兩遍配對合併。',
            en: 'All children of a root are linked in a sibling chain; insert only modifies the head pointer. extractTop processes the entire sibling chain with two-pass pairing.' } },
        ],
      },
      {
        heading: { zh: '複雜度分析', en: 'Complexity Analysis' },
        blocks: [
          { type: 'table',
            headers: [ { zh: '操作', en: 'Operation' }, { zh: '攤銷時間', en: 'Amortized Time' }, { zh: '空間', en: 'Space' } ],
            rows: [
              [ { zh: 'insert', en: 'insert' }, { zh: '$O(1)$', en: '$O(1)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: 'peek', en: 'peek' }, { zh: '$O(1)$', en: '$O(1)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: 'merge', en: 'merge' }, { zh: '$O(1)$', en: '$O(1)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: 'extractTop', en: 'extractTop' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: 'decrease-key (近似)', en: 'decrease-key (approx.)' }, { zh: '$O(\\log N)$', en: '$O(\\log N)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: '空間合計', en: 'Total Space' }, { zh: '—', en: '—' }, { zh: '$O(N)$', en: '$O(N)$' } ],
            ] },
          { type: 'math', tex: 'T_{\\text{extractTop}} = O(\\log N)\\text{ amortized}', caption: {
            zh: 'Pairing Heap 的精確攤銷界尚未完全被證明達到 Fibonacci Heap 的 $O(1)$ decrease-key;extractTop 已被證明攤銷 $O(\\log N)$。',
            en: 'The exact amortized bound for decrease-key in Pairing Heap has not been proven to match Fibonacci Heap\'s $O(1)$; extractTop is proven $O(\\log N)$ amortized.' } },
        ],
      },
      {
        heading: { zh: '程式碼', en: 'Source Code' },
        blocks: [
          { type: 'code', lang: 'cpp', code: 'PNode* meld(PNode* a, PNode* b) {\n    if (!a) return b;\n    if (!b) return a;\n    if (!cmp(a->key, b->key)) swap(a, b); // a has smaller key\n    b->sibling = a->child;\n    a->child = b;\n    return a;\n}\n\nPNode* mergePairs(PNode* node) {\n    if (!node || !node->sibling) return node;\n    PNode* first  = node;\n    PNode* second = node->sibling;\n    PNode* rest   = second->sibling;\n    first->sibling  = nullptr;\n    second->sibling = nullptr;\n    return meld(meld(first, second), mergePairs(rest));\n}\n\nvoid insert(int value) {\n    root = meld(root, new PNode(value));\n}\n\nint extractTop() {\n    int top = root->key;\n    PNode* oldRoot = root;\n    root = mergePairs(root->child);\n    oldRoot->child = nullptr;\n    delete oldRoot;\n    return top;\n}' },
        ],
      },
      {
        heading: { zh: '優缺點與使用時機', en: 'Pros, Cons & When to Use' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '優點:實作遠比 Fibonacci Heap 簡單,實際效能接近甚至超越後者。', en: 'Pro: far simpler to implement than Fibonacci Heap, with comparable or better practical performance.' },
            { zh: '優點:insert 與 merge 均為 $O(1)$,extractTop 攤銷 $O(\\log N)$。', en: 'Pro: insert and merge are $O(1)$; extractTop is $O(\\log N)$ amortized.' },
            { zh: '缺點:decrease-key 的精確攤銷界仍是開放問題(目前已知上界為 $O(2^{2\\sqrt{\\log \\log N}})$)。', en: 'Con: tight amortized bound for decrease-key is an open problem (currently known upper bound: $O(2^{2\\sqrt{\\log \\log N}})$).' },
            { zh: '缺點:指標結構,快取效能不如陣列式堆積。', en: 'Con: pointer-based; worse cache performance than array-based heaps.' },
            { zh: '適用:需要高效 insert/merge 的實際應用,是 Fibonacci Heap 更易實作的替代品。', en: 'Use for practical applications needing efficient insert/merge — a simpler drop-in alternative to Fibonacci Heap.' },
          ] },
        ],
      },
      {
        heading: { zh: '小結', en: 'Summary' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '多叉樹以兄弟鏈表示;meld 為 $O(1)$ 核心操作。', en: 'Multiway tree represented by sibling chain; meld is the $O(1)$ core operation.' },
            { zh: 'insert/merge $O(1)$;extractTop 攤銷 $O(\\log N)$;實際效能優異。', en: 'insert/merge $O(1)$; extractTop $O(\\log N)$ amortized; excellent practical performance.' },
            { zh: '比 Fibonacci Heap 更簡單,是業界首選的高效優先佇列實作之一。', en: 'Simpler than Fibonacci Heap; one of the preferred high-performance priority queue implementations in practice.' },
          ] },
        ],
      },
    ],
  },

};

module.exports = SLIDES_DB;
