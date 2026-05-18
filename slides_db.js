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
          { type: 'svg', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 130" width="340" height="130"><g font-family="sans-serif" font-size="11" text-anchor="middle"><text x="70" y="14" fill="#64748b">Before (RR case)</text><circle cx="40" cy="40" r="14" fill="#fecaca" stroke="#dc2626"/><text x="40" y="45">10</text><circle cx="80" cy="75" r="14" fill="#fecaca" stroke="#dc2626"/><text x="80" y="80">20</text><circle cx="115" cy="110" r="14" fill="#dbeafe" stroke="#2563eb"/><text x="115" y="115">30</text><line x1="50" y1="52" x2="68" y2="63" stroke="#64748b"/><line x1="88" y1="87" x2="104" y2="98" stroke="#64748b"/><text x="200" y="14" fill="#64748b">After (Left Rotate)</text><circle cx="200" cy="40" r="14" fill="#dcfce7" stroke="#16a34a"/><text x="200" y="45">20</text><circle cx="160" cy="75" r="14" fill="#dbeafe" stroke="#2563eb"/><text x="160" y="80">10</text><circle cx="240" cy="75" r="14" fill="#dbeafe" stroke="#2563eb"/><text x="240" y="80">30</text><line x1="190" y1="52" x2="172" y2="63" stroke="#64748b"/><line x1="210" y1="52" x2="228" y2="63" stroke="#64748b"/><text x="145" y="120" fill="#dc2626">bf=2</text><text x="200" y="120" fill="#16a34a">bf=0</text></g></svg>' },
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
          { type: 'svg', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 130" width="300" height="130"><g font-family="sans-serif" font-size="12" text-anchor="middle"><circle cx="150" cy="20" r="16" fill="#1e293b" stroke="#1e293b"/><text x="150" y="25" fill="white">7</text><circle cx="80" cy="65" r="16" fill="#dc2626" stroke="#991b1b"/><text x="80" y="70" fill="white">3</text><circle cx="220" cy="65" r="16" fill="#dc2626" stroke="#991b1b"/><text x="220" y="70" fill="white">11</text><circle cx="45" cy="110" r="16" fill="#1e293b" stroke="#1e293b"/><text x="45" y="115" fill="white">1</text><circle cx="115" cy="110" r="16" fill="#1e293b" stroke="#1e293b"/><text x="115" y="115" fill="white">5</text><line x1="140" y1="34" x2="92" y2="51" stroke="#64748b"/><line x1="160" y1="34" x2="208" y2="51" stroke="#64748b"/><line x1="70" y1="79" x2="55" y2="96" stroke="#64748b"/><line x1="90" y1="79" x2="105" y2="96" stroke="#64748b"/></g></svg>' },
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
          { type: 'code', lang: 'cpp', code: 'Node* splay(Node* root, int key) {\n    if (!root || root->key == key) return root;\n    if (root->key > key) {          // key is in left subtree\n        if (!root->left) return root;\n        if (root->left->key > key) { // Zig-Zig (left-left)\n            root->left->left = splay(root->left->left, key);\n            root = rightRotate(root);\n        } else if (root->left->key < key) { // Zig-Zag (left-right)\n            root->left->right = splay(root->left->right, key);\n            if (root->left->right)\n                root->left = leftRotate(root->left);\n        }\n        return root->left ? rightRotate(root) : root;\n    } else {                        // key is in right subtree\n        if (!root->right) return root;\n        if (root->right->key < key) { // Zig-Zig (right-right)\n            root->right->right = splay(root->right->right, key);\n            root = leftRotate(root);\n        }\n        return root->right ? leftRotate(root) : root;\n    }\n}' },
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
            { zh: '空間代價高:每節點固定 26 個指標,最壞 $O(26^L)$ 空間。', en: 'High space cost: each node holds 26 pointers — worst case $O(26^L)$ space.' },
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

};

module.exports = SLIDES_DB;
