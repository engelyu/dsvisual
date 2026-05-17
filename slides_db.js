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
              [ { zh: 'enqueue', en: 'enqueue' }, { zh: '$O(1)$', en: '$O(1)$' }, { zh: '$O(N)$', en: '$O(N)$' } ],
              [ { zh: 'dequeue', en: 'dequeue' }, { zh: '$O(1)$', en: '$O(1)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
              [ { zh: 'peek (front)', en: 'peek (front)' }, { zh: '$O(1)$', en: '$O(1)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
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
            { zh: '從 `size-1` 向下至 `index`,逐一將元素右移:arr[i] = arr[i-1]。', en: 'Iterate from `size-1` down to `index`, shifting each element right: arr[i] = arr[i-1].' },
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
              [ { zh: 'push', en: 'push' }, { zh: '$O(1)$', en: '$O(1)$' }, { zh: '$O(N)$', en: '$O(N)$' } ],
              [ { zh: 'pop', en: 'pop' }, { zh: '$O(1)$', en: '$O(1)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
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
};

module.exports = SLIDES_DB;
