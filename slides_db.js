// Structured slide content source. Hand-written.
// Consumed only by build_slides.js (Node). Do NOT load this in the browser.
// Text leaves are { zh, en } and may embed inline $...$ LaTeX.

const SLIDES_DB = {
  "stack-list": {
    "category": "Linear Structures",
    "title": {
      "zh": "堆疊(鏈結串列實作)",
      "en": "Stack (Linked List Implementation)"
    },
    "slides": [
      {
        "heading": {
          "zh": "堆疊(鏈結串列實作)",
          "en": "Stack (Linked List Implementation)"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "以動態配置的 `Node` 鏈結串列實作 LIFO 堆疊,不受固定容量限制,可隨需求自由增縮。",
              "en": "A LIFO stack built from dynamically allocated `Node` objects in a linked list — no fixed capacity, grows and shrinks on demand."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "每個節點包含資料欄位與指向下一節點的指標。`topNode` 始終指向鏈結串列的頭節點(即堆疊頂端)。",
              "en": "Each node holds a data field and a pointer to the next node. `topNode` always points to the head of the list (the stack top)."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "push:建立新節點,令其 `next` 指向舊頂端,再更新 `topNode`。",
                "en": "push: allocate a new node, set its `next` to the old top, then update `topNode`."
              },
              {
                "zh": "pop:讀取 `topNode->data`,將 `topNode` 移至下一節點,`delete` 舊節點。",
                "en": "pop: read `topNode->data`, advance `topNode` to the next node, `delete` the old node."
              },
              {
                "zh": "無堆疊溢位;僅受系統堆積記憶體限制。",
                "en": "No Stack Overflow; limited only by available heap memory."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "配置新節點並初始化其 `data`。",
                "en": "Allocate a new node and initialise its `data`."
              },
              {
                "zh": "將新節點的 `next` 設為目前 `topNode`。",
                "en": "Set the new node's `next` to the current `topNode`."
              },
              {
                "zh": "更新 `topNode` 指向新節點,完成 push。",
                "en": "Update `topNode` to point to the new node — push complete."
              },
              {
                "zh": "pop 時先儲存頂端值,移動 `topNode`,再釋放舊節點記憶體。",
                "en": "To pop: save the top value, advance `topNode`, then free the old node."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  E[\"topNode=null\\n(empty)\"] -->|push 10| A[\"[10]->null\"]\n  A -->|push 20| B[\"[20]->[10]->null\"]\n  B -->|pop| A"
          }
        ]
      },
      {
        "heading": {
          "zh": "記憶體結構",
          "en": "Memory Layout"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 340 80\" width=\"340\" height=\"80\"><g font-family=\"sans-serif\" font-size=\"13\"><rect x=\"10\" y=\"25\" width=\"80\" height=\"30\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"50\" y=\"45\" text-anchor=\"middle\">data:20</text><rect x=\"100\" y=\"25\" width=\"70\" height=\"30\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"135\" y=\"45\" text-anchor=\"middle\">next ──▶</text><rect x=\"180\" y=\"25\" width=\"80\" height=\"30\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"220\" y=\"45\" text-anchor=\"middle\">data:10</text><rect x=\"270\" y=\"25\" width=\"60\" height=\"30\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"300\" y=\"45\" text-anchor=\"middle\">next:null</text><text x=\"50\" y=\"18\" text-anchor=\"middle\" fill=\"#2563eb\">topNode</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "每個節點散落在堆積記憶體中,藉由 `next` 指標串接;`topNode` 永遠指向最新推入的節點。",
              "en": "Each node lives at a scattered heap address; `next` pointers chain them together. `topNode` always points to the most recently pushed node."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "操作",
                "en": "Operation"
              },
              {
                "zh": "時間",
                "en": "Time"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "push",
                  "en": "push"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "pop",
                  "en": "pop"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "空間合計",
                  "en": "Total Space"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{push}}(n) = O(1)",
            "caption": {
              "zh": "每次 push 僅配置一個節點並更新兩個指標,與堆疊大小無關。",
              "en": "Each push allocates one node and updates two pointers — independent of stack size."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "struct Node {\n    int data;\n    Node* next;\n    Node(int val) : data(val), next(nullptr) {}\n};\n\nvoid push(int val) {\n    Node* newNode = new Node(val);\n    newNode->next = topNode;\n    topNode = newNode;\n}\n\nint pop() {\n    if (!topNode) {\n        return -1;\n    } // underflow\n    int val = topNode->data;\n    Node* temp = topNode;\n    topNode = topNode->next;\n    delete temp;\n    return val;\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:動態擴縮,無需預先決定容量上限。",
                "en": "Pro: dynamically sized — no capacity limit needs to be set in advance."
              },
              {
                "zh": "優點:不浪費預留空間。",
                "en": "Pro: no wasted pre-allocated space."
              },
              {
                "zh": "缺點:每個節點需額外儲存一個指標,記憶體使用較不連續。",
                "en": "Con: each node carries a pointer overhead; memory is non-contiguous (less cache-friendly)."
              },
              {
                "zh": "適用:元素數量難以預知的場景,如深度優先搜尋、運算式求值。",
                "en": "Use when element count is unpredictable, e.g. DFS traversal, expression evaluation."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "LIFO:以 `topNode` 指向鏈結串列頭端實作。",
                "en": "LIFO: implemented by keeping `topNode` at the list head."
              },
              {
                "zh": "push / pop 皆為 $O(1)$,無容量上限。",
                "en": "Both push and pop are $O(1)$ with no hard capacity limit."
              },
              {
                "zh": "相較陣列實作,以額外指標空間換取動態性。",
                "en": "Compared to array implementation, trades pointer overhead for dynamic sizing."
              }
            ]
          }
        ]
      }
    ]
  },
  "queue": {
    "category": "Linear Structures",
    "title": {
      "zh": "佇列(循環陣列)",
      "en": "Queue (Circular Array)"
    },
    "slides": [
      {
        "heading": {
          "zh": "佇列(循環陣列)",
          "en": "Queue (Circular Array)"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "佇列是一種 FIFO(先進先出)的線性結構,如同排隊等候:最早加入的最先被服務。循環陣列實作以取模運算避免空間浪費。",
              "en": "A queue is a FIFO (First In, First Out) linear structure — like a waiting line: the earliest arrival is served first. The circular array implementation uses the modulo operator to reuse space."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "使用固定大小的陣列搭配 `front`、`rear` 兩個指標及 `count` 計數器。`rear` 向後推進時以 `% MAX_SIZE` 折返頭部。",
              "en": "A fixed-size array is used with two pointers `front` and `rear` plus a `count` counter. `rear` wraps back to index 0 via `% MAX_SIZE` after reaching the end."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "`front` 指向最舊元素;`rear` 指向最新元素的位置。",
                "en": "`front` points to the oldest element; `rear` marks where the newest was placed."
              },
              {
                "zh": "enqueue:先移動 `rear = (rear+1) % MAX_SIZE`,再寫入值並遞增 `count`。",
                "en": "enqueue: advance `rear = (rear+1) % MAX_SIZE`, write the value, increment `count`."
              },
              {
                "zh": "dequeue:讀取 `arr[front]`,再移動 `front = (front+1) % MAX_SIZE`,遞減 `count`。",
                "en": "dequeue: read `arr[front]`, advance `front = (front+1) % MAX_SIZE`, decrement `count`."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "enqueue:若 `count >= MAX_SIZE` 則拒絕(Queue Overflow)。",
                "en": "enqueue: reject if `count >= MAX_SIZE` (Queue Overflow)."
              },
              {
                "zh": "以 `(rear+1) % MAX_SIZE` 計算新後端位置並寫入值。",
                "en": "Compute new rear index `(rear+1) % MAX_SIZE` and write the value."
              },
              {
                "zh": "dequeue:若 `count == 0` 則拒絕(Queue Underflow)。",
                "en": "dequeue: reject if `count == 0` (Queue Underflow)."
              },
              {
                "zh": "讀取 `arr[front]`,以 `(front+1) % MAX_SIZE` 移動前端指標。",
                "en": "Read `arr[front]`, advance `front = (front+1) % MAX_SIZE`."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  E[\"empty\\ncount=0\"] -->|enqueue 10| A[\"[10]\\nf=0 r=0 c=1\"]\n  A -->|enqueue 20| B[\"[10,20]\\nf=0 r=1 c=2\"]\n  B -->|dequeue| C[\"[20]\\nf=1 r=1 c=1\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "循環陣列示意",
          "en": "Circular Array Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 90\" width=\"360\" height=\"90\"><g font-family=\"sans-serif\" font-size=\"12\"><rect x=\"10\" y=\"30\" width=\"60\" height=\"30\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><rect x=\"70\" y=\"30\" width=\"60\" height=\"30\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><rect x=\"130\" y=\"30\" width=\"60\" height=\"30\" fill=\"#fff\" stroke=\"#94a3b8\"/><rect x=\"190\" y=\"30\" width=\"60\" height=\"30\" fill=\"#fff\" stroke=\"#94a3b8\"/><rect x=\"250\" y=\"30\" width=\"60\" height=\"30\" fill=\"#fff\" stroke=\"#94a3b8\"/><text x=\"40\" y=\"50\" text-anchor=\"middle\">10</text><text x=\"100\" y=\"50\" text-anchor=\"middle\">20</text><text x=\"160\" y=\"50\" text-anchor=\"middle\"> </text><text x=\"220\" y=\"50\" text-anchor=\"middle\"> </text><text x=\"280\" y=\"50\" text-anchor=\"middle\"> </text><text x=\"40\" y=\"22\" text-anchor=\"middle\" fill=\"#16a34a\">front</text><text x=\"100\" y=\"22\" text-anchor=\"middle\" fill=\"#dc2626\">rear</text><text x=\"185\" y=\"80\" text-anchor=\"middle\" fill=\"#64748b\">↩ wraps around via %</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "當 `rear` 到達陣列末端後,下一次 enqueue 會以取模回到索引 0,避免「假滿」問題。",
              "en": "When `rear` reaches the end of the array, the next enqueue wraps back to index 0 via modulo — preventing the \"false full\" problem of naive array queues."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "操作",
                "en": "Operation"
              },
              {
                "zh": "時間",
                "en": "Time"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "enqueue",
                  "en": "enqueue"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "dequeue",
                  "en": "dequeue"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "peek (front)",
                  "en": "peek (front)"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "空間合計",
                  "en": "Total Space"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{enqueue}}(n) = O(1)",
            "caption": {
              "zh": "enqueue 僅做一次取模和一次陣列寫入,與佇列長度無關。",
              "en": "enqueue performs one modulo and one array write — independent of queue length."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "bool enqueue(int val) {\n    if (count >= MAX_SIZE) {\n        cout << \"Queue Overflow!\" << endl;\n        return false;\n    }\n    rear = (rear + 1) % MAX_SIZE;\n    arr[rear] = val;\n    count++;\n    return true;\n}\n\nint dequeue() {\n    if (count == 0) {\n        cout << \"Queue Underflow!\" << endl;\n        return -1;\n    }\n    int val = arr[front];\n    front = (front + 1) % MAX_SIZE;\n    count--;\n    return val;\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:記憶體連續、快取友善,enqueue/dequeue 皆為 $O(1)$。",
                "en": "Pro: contiguous memory, cache-friendly; both enqueue and dequeue are $O(1)$."
              },
              {
                "zh": "優點:取模折返解決了一般陣列佇列的「假滿」問題。",
                "en": "Pro: modulo wrap-around eliminates the \"false full\" issue of naive array queues."
              },
              {
                "zh": "缺點:容量固定,需事先決定上限。",
                "en": "Con: fixed capacity — the maximum size must be set in advance."
              },
              {
                "zh": "適用:BFS 廣度優先搜尋、排程緩衝、印表機佇列等。",
                "en": "Use for BFS traversal, task scheduling buffers, printer queues, etc."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "FIFO:以 `front`/`rear` 雙指標管理兩端。",
                "en": "FIFO: two pointers `front`/`rear` manage both ends."
              },
              {
                "zh": "enqueue / dequeue 皆為 $O(1)$。",
                "en": "Both enqueue and dequeue are $O(1)$."
              },
              {
                "zh": "取模折返是循環陣列的關鍵技巧,有效利用所有槽位。",
                "en": "Modulo wrap-around is the key trick — all slots are utilised efficiently."
              }
            ]
          }
        ]
      }
    ]
  },
  "list-array": {
    "category": "Linear Structures",
    "title": {
      "zh": "陣列串列",
      "en": "Array-Based List"
    },
    "slides": [
      {
        "heading": {
          "zh": "陣列串列",
          "en": "Array-Based List"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "陣列串列以連續記憶體區塊儲存元素,支援 $O(1)$ 隨機存取;中間插入或刪除需移動後續元素,成本為 $O(N)$。",
              "en": "An array-based list stores elements in a contiguous memory block, enabling $O(1)$ random access; inserting or removing in the middle requires shifting subsequent elements at $O(N)$ cost."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "使用動態配置的整數陣列,並以 `size` 追蹤目前元素數量、`capacity` 追蹤已配置容量。",
              "en": "Uses a dynamically allocated integer array; `size` tracks the current element count and `capacity` records the allocated length."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "插入 index i:將 i 之後的所有元素向右移一格,再寫入新值。",
                "en": "insert at index i: shift all elements from i onward one slot to the right, then write the new value."
              },
              {
                "zh": "刪除 index i:將 i 之後的所有元素向左移一格,遞減 `size`。",
                "en": "remove at index i: shift all elements after i one slot to the left, decrement `size`."
              },
              {
                "zh": "以索引直接存取:`arr[i]` 為 $O(1)$,不論串列大小。",
                "en": "Direct index access: `arr[i]` is $O(1)$ regardless of list size."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "插入前檢查 `index` 範圍及 `size < capacity`。",
                "en": "Before inserting, validate `index` bounds and that `size < capacity`."
              },
              {
                "zh": "從 `size` 向下至 `index+1`,逐一將元素右移:arr[i] = arr[i-1]。",
                "en": "Iterate from `size` down to `index+1`, shifting each element right: arr[i] = arr[i-1]."
              },
              {
                "zh": "在 `arr[index]` 寫入新值,遞增 `size`。",
                "en": "Write the new value at `arr[index]` and increment `size`."
              },
              {
                "zh": "刪除時則反向:從 `index` 向右逐一左移,遞減 `size`。",
                "en": "For removal: shift elements left from `index` onward, decrement `size`."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart TD\n  A[\"arr=[10,30,40]\\ninsert(1,20)\"] --> B[\"shift right:\\n[10,30,30,40]\"]\n  B --> C[\"write arr[1]=20:\\n[10,20,30,40]\"]\n  C --> D[\"size++ done\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "記憶體結構",
          "en": "Memory Layout"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 340 90\" width=\"340\" height=\"90\"><g font-family=\"sans-serif\" font-size=\"13\"><rect x=\"10\" y=\"30\" width=\"55\" height=\"30\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><rect x=\"65\" y=\"30\" width=\"55\" height=\"30\" fill=\"#fef9c3\" stroke=\"#ca8a04\"/><rect x=\"120\" y=\"30\" width=\"55\" height=\"30\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><rect x=\"175\" y=\"30\" width=\"55\" height=\"30\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><rect x=\"230\" y=\"30\" width=\"55\" height=\"30\" fill=\"#fff\" stroke=\"#94a3b8\"/><text x=\"37\" y=\"50\" text-anchor=\"middle\">10</text><text x=\"92\" y=\"50\" text-anchor=\"middle\" fill=\"#92400e\">20(new)</text><text x=\"147\" y=\"50\" text-anchor=\"middle\">30</text><text x=\"202\" y=\"50\" text-anchor=\"middle\">40</text><text x=\"257\" y=\"50\" text-anchor=\"middle\"> </text><text x=\"37\" y=\"22\" text-anchor=\"middle\" fill=\"#64748b\">[0]</text><text x=\"92\" y=\"22\" text-anchor=\"middle\" fill=\"#64748b\">[1]</text><text x=\"147\" y=\"22\" text-anchor=\"middle\" fill=\"#64748b\">[2]</text><text x=\"202\" y=\"22\" text-anchor=\"middle\" fill=\"#64748b\">[3]</text><text x=\"257\" y=\"22\" text-anchor=\"middle\" fill=\"#64748b\">[4]</text><text x=\"170\" y=\"82\" text-anchor=\"middle\" fill=\"#2563eb\">↑ contiguous block</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "黃色為新插入的元素,藍色為已存在的元素,白色為閒置空間;所有元素緊鄰存放於連續記憶體。",
              "en": "Yellow cell shows the newly inserted element, blue are existing elements, white is free space; all elements reside in one contiguous block."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "操作",
                "en": "Operation"
              },
              {
                "zh": "時間",
                "en": "Time"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "隨機存取 arr[i]",
                  "en": "random access arr[i]"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "尾端插入/刪除",
                  "en": "insert/remove at tail"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "中間插入/刪除",
                  "en": "insert/remove at middle"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "空間合計",
                  "en": "total space"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{insert-mid}}(n) = O(N)",
            "caption": {
              "zh": "最壞情況下需移動所有 N 個元素(插入於頭部)。",
              "en": "In the worst case all N elements must be shifted (insertion at head)."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "void insert(int index, int val) {\n    if (index < 0 || index > size || size >= capacity)\n        return;\n    for (int i = size; i > index; i--) {\n        arr[i] = arr[i - 1]; // Shift right\n    }\n    arr[index] = val;\n    size++;\n}\n\nvoid remove(int index) {\n    if (index < 0 || index >= size)\n        return;\n    for (int i = index; i < size - 1; i++) {\n        arr[i] = arr[i + 1]; // Shift left\n    }\n    size--;\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:記憶體連續,快取命中率高,$O(1)$ 隨機存取。",
                "en": "Pro: contiguous memory, high cache-hit rate, $O(1)$ random access."
              },
              {
                "zh": "優點:無指標額外開銷,記憶體使用率高。",
                "en": "Pro: no pointer overhead — memory-efficient."
              },
              {
                "zh": "缺點:中間插入/刪除需 $O(N)$ 移位操作。",
                "en": "Con: mid-list insert/remove requires $O(N)$ element shifts."
              },
              {
                "zh": "缺點:容量固定,擴容需重新配置並複製。",
                "en": "Con: fixed capacity — resizing requires reallocation and copying."
              },
              {
                "zh": "適用:頻繁隨機讀取、尾端操作為主的場景,如靜態查找表。",
                "en": "Use for workloads with frequent random reads or tail operations, e.g. static lookup tables."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "連續記憶體帶來 $O(1)$ 隨機存取,是與鏈結串列的最大差異。",
                "en": "Contiguous memory enables $O(1)$ random access — the key advantage over linked lists."
              },
              {
                "zh": "中間插入/刪除為 $O(N)$,適合讀多寫少的場景。",
                "en": "Mid-list insert/remove is $O(N)$; best suited for read-heavy workloads."
              },
              {
                "zh": "尾端操作仍為 $O(1)$,可用作簡易的動態陣列基礎。",
                "en": "Tail operations remain $O(1)$ and serve as the basis for simple dynamic arrays."
              }
            ]
          }
        ]
      }
    ]
  },
  "list-linked": {
    "category": "Linear Structures",
    "title": {
      "zh": "單向鏈結串列",
      "en": "Singly Linked List"
    },
    "slides": [
      {
        "heading": {
          "zh": "單向鏈結串列",
          "en": "Singly Linked List"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "單向鏈結串列由動態配置的 `Node` 物件組成,每個節點含 `data` 欄位與指向下一節點的 `next` 指標,`head` 指向串列的第一個節點。",
              "en": "A singly linked list consists of dynamically allocated `Node` objects, each holding a `data` field and a `next` pointer to the following node; `head` points to the first node in the list."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "節點散落於堆積記憶體中,僅靠 `next` 指標鏈接;無需預先宣告容量。插入或刪除只需改動少數指標,但隨機存取必須從 `head` 逐步遍訪。",
              "en": "Nodes are scattered in heap memory and linked only by `next` pointers — no pre-declared capacity needed. Insertion or deletion changes just a few pointers, but random access requires sequential traversal from `head`."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "在頭部插入:新節點的 `next` 指向舊 `head`,再更新 `head`,$O(1)$。",
                "en": "Insert at head: set new node's `next` to old `head`, then update `head` — $O(1)$."
              },
              {
                "zh": "在任意位置插入:先遍訪至前一節點,再調整兩個指標,$O(N)$。",
                "en": "Insert at arbitrary index: traverse to the predecessor, then rewire two pointers — $O(N)$."
              },
              {
                "zh": "刪除節點:遍訪至前一節點,繞過目標節點並 `delete`,$O(N)$。",
                "en": "Remove a node: traverse to predecessor, bypass the target node and `delete` it — $O(N)$."
              },
              {
                "zh": "不支援 $O(1)$ 隨機存取;需從 `head` 逐步走訪至目標索引。",
                "en": "No $O(1)$ random access — must traverse from `head` to the target index."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "頭部插入:配置新節點,令 `next = head`,再令 `head = newNode`。",
                "en": "Insert at head: allocate new node, set `next = head`, then set `head = newNode`."
              },
              {
                "zh": "中間插入:從 `head` 遍訪至索引 `i-1` 的節點 `temp`。",
                "en": "Insert in middle: traverse from `head` to node `temp` at index `i-1`."
              },
              {
                "zh": "令 `newNode->next = temp->next`,再令 `temp->next = newNode`。",
                "en": "Set `newNode->next = temp->next`, then set `temp->next = newNode`."
              },
              {
                "zh": "刪除:遍訪至前一節點,令 `temp->next = delNode->next`,再 `delete delNode`。",
                "en": "Remove: traverse to predecessor, set `temp->next = delNode->next`, then `delete delNode`."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  H[\"head=null\\n(empty)\"] -->|insert head 10| A[\"10 -> null\"]\n  A -->|\"insert(1, 20)\"| B[\"10 -> 20 -> null\"]\n  B -->|remove head| C[\"20 -> null\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "記憶體結構",
          "en": "Memory Layout"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 80\" width=\"380\" height=\"80\"><g font-family=\"sans-serif\" font-size=\"12\"><rect x=\"10\" y=\"25\" width=\"70\" height=\"30\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"45\" y=\"45\" text-anchor=\"middle\">data:10</text><rect x=\"80\" y=\"25\" width=\"60\" height=\"30\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"110\" y=\"45\" text-anchor=\"middle\">next ──▶</text><rect x=\"160\" y=\"25\" width=\"70\" height=\"30\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"195\" y=\"45\" text-anchor=\"middle\">data:20</text><rect x=\"230\" y=\"25\" width=\"60\" height=\"30\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"260\" y=\"45\" text-anchor=\"middle\">next ──▶</text><rect x=\"310\" y=\"25\" width=\"55\" height=\"30\" fill=\"#f1f5f9\" stroke=\"#94a3b8\"/><text x=\"337\" y=\"45\" text-anchor=\"middle\" fill=\"#64748b\">null</text><text x=\"45\" y=\"18\" text-anchor=\"middle\" fill=\"#2563eb\">head</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "每個節點獨立散落於堆積記憶體,僅靠 `next` 指標串接;`head` 永遠指向第一個節點,尾端節點的 `next` 為 `nullptr`。",
              "en": "Each node lives at an independent heap address, linked only by `next` pointers. `head` always points to the first node; the tail node's `next` is `nullptr`."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "操作",
                "en": "Operation"
              },
              {
                "zh": "時間",
                "en": "Time"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "頭部插入/刪除",
                  "en": "insert/remove at head"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "任意位置插入/刪除",
                  "en": "insert/remove at index i"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "搜尋/隨機存取",
                  "en": "search / random access"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "空間合計",
                  "en": "Total Space"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{insert-head}} = O(1)",
            "caption": {
              "zh": "頭部插入只需更新兩個指標,與串列長度無關。",
              "en": "Inserting at the head updates only two pointers — independent of list length."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "struct Node {\n    int data;\n    Node* next;\n    Node(int val) : data(val), next(nullptr) {}\n};\n\nvoid insert(int index, int val) {\n    Node* newNode = new Node(val);\n    if (index == 0) {\n        newNode->next = head;\n        head = newNode;\n        return;\n    }\n    Node* temp = head;\n    for (int i = 0; temp != nullptr && i < index - 1; i++)\n        temp = temp->next;\n    if (!temp)\n        return;\n    newNode->next = temp->next;\n    temp->next = newNode;\n}\n\nvoid remove(int index) {\n    if (!head)\n        return;\n    if (index == 0) {\n        Node* temp = head;\n        head = head->next;\n        delete temp;\n        return;\n    }\n    Node* temp = head;\n    for (int i = 0; temp != nullptr && i < index - 1; i++)\n        temp = temp->next;\n    if (!temp || !temp->next)\n        return;\n    Node* delNode = temp->next;\n    temp->next = delNode->next;\n    delete delNode;\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:頭部插入/刪除為 $O(1)$,動態擴縮無容量上限。",
                "en": "Pro: head insert/remove is $O(1)$; grows and shrinks dynamically with no capacity ceiling."
              },
              {
                "zh": "優點:中間插入/刪除只需調整指標,無需移動其餘元素。",
                "en": "Pro: mid-list insert/remove only rewires pointers — no element shifting needed."
              },
              {
                "zh": "缺點:不支援隨機存取,$O(N)$ 走訪才能到達任意索引。",
                "en": "Con: no random access — reaching an arbitrary index costs $O(N)$ traversal."
              },
              {
                "zh": "缺點:每個節點需額外一個 `next` 指標,記憶體不連續,快取效益低。",
                "en": "Con: each node carries an extra `next` pointer; non-contiguous memory makes it cache-unfriendly."
              },
              {
                "zh": "適用:頻繁在頭部或已知位置插入/刪除,如任務佇列、前向迭代器。",
                "en": "Use when frequent head or positional insertions/deletions are needed, e.g. task queues, forward-only iterators."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "以 `head` 指標管理串列,`next` 鏈接所有節點。",
                "en": "Managed by a `head` pointer; `next` pointers chain all nodes together."
              },
              {
                "zh": "頭部操作 $O(1)$;中間或尾端操作需 $O(N)$ 遍訪。",
                "en": "Head operations are $O(1)$; middle or tail operations require $O(N)$ traversal."
              },
              {
                "zh": "與陣列串列相比:犧牲隨機存取換取高效的指標式插入/刪除。",
                "en": "Compared to array-based list: trades random access for efficient pointer-based insert/remove."
              }
            ]
          }
        ]
      }
    ]
  },
  "stack-array": {
    "category": "Linear Structures",
    "title": {
      "zh": "堆疊(陣列實作)",
      "en": "Stack (Array Implementation)"
    },
    "slides": [
      {
        "heading": {
          "zh": "堆疊(陣列實作)",
          "en": "Stack (Array Implementation)"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "堆疊是一種 LIFO(後進先出)的線性結構,如同一疊盤子:最後放上的最先被取下。",
              "en": "A stack is a LIFO (Last In, First Out) linear structure, like a pile of plates: the last one placed is the first removed."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "陣列實作用一塊固定大小的連續記憶體,搭配一個整數索引 `top` 指向頂端元素。",
              "en": "The array implementation uses a fixed-size contiguous block of memory plus an integer index `top` pointing at the top element."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "`top` 初始為 -1,代表空堆疊。",
                "en": "`top` starts at -1, meaning the stack is empty."
              },
              {
                "zh": "`push` 先遞增 `top` 再寫入;`pop` 先讀取再遞減 `top`。",
                "en": "`push` increments `top` then writes; `pop` reads then decrements `top`."
              },
              {
                "zh": "容量固定,推入超過上限會發生 Stack Overflow。",
                "en": "Capacity is fixed; pushing beyond the limit causes a Stack Overflow."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "檢查 `top` 是否已達容量上限,若是則拒絕推入。",
                "en": "Check whether `top` has reached capacity; if so, reject the push."
              },
              {
                "zh": "遞增 `top`,將新值寫入 `arr[top]`。",
                "en": "Increment `top` and write the new value into `arr[top]`."
              },
              {
                "zh": "彈出時讀取 `arr[top]`,再將 `top` 遞減。",
                "en": "To pop, read `arr[top]`, then decrement `top`."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  E[\"Empty top=-1\"] -->|push a| A[\"top=0\"]\n  A -->|push b| B[\"top=1\"]\n  B -->|pop| A"
          }
        ]
      },
      {
        "heading": {
          "zh": "記憶體結構",
          "en": "Memory Layout"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 70\" width=\"320\" height=\"70\"><g font-family=\"sans-serif\" font-size=\"13\"><rect x=\"10\" y=\"20\" width=\"50\" height=\"30\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><rect x=\"60\" y=\"20\" width=\"50\" height=\"30\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><rect x=\"110\" y=\"20\" width=\"50\" height=\"30\" fill=\"#fff\" stroke=\"#94a3b8\"/><rect x=\"160\" y=\"20\" width=\"50\" height=\"30\" fill=\"#fff\" stroke=\"#94a3b8\"/><text x=\"35\" y=\"40\" text-anchor=\"middle\">a</text><text x=\"85\" y=\"40\" text-anchor=\"middle\">b</text><text x=\"85\" y=\"15\" text-anchor=\"middle\" fill=\"#2563eb\">top</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "藍色為已使用的格子,白色為閒置空間;`top` 永遠指向最後一個有效元素。",
              "en": "Blue cells are occupied, white cells are free; `top` always points at the last valid element."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "操作",
                "en": "Operation"
              },
              {
                "zh": "時間",
                "en": "Time"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "push",
                  "en": "push"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "pop",
                  "en": "pop"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "空間合計",
                  "en": "Total Space"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{push}}(n) = O(1)",
            "caption": {
              "zh": "每次推入只做常數次運算,與堆疊大小無關。",
              "en": "Each push performs a constant number of operations, independent of stack size."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "bool push(int val) {\n    if (topIndex >= MAX_SIZE - 1) {\n        cout << \"Stack Overflow!\" << endl;\n        return false;\n    }\n    arr[++topIndex] = val;\n    return true;\n}\n\nint pop() {\n    if (topIndex < 0)\n        return -1;\n    return arr[topIndex--];\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:記憶體連續、無指標額外開銷,快取友善。",
                "en": "Pro: contiguous memory, no pointer overhead, cache-friendly."
              },
              {
                "zh": "缺點:容量固定,需事先決定大小。",
                "en": "Con: fixed capacity, size must be decided in advance."
              },
              {
                "zh": "適用:容量上限已知的場景,如函式呼叫堆疊、括號配對。",
                "en": "Use when the maximum size is known, e.g. call stacks, bracket matching."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "LIFO:以單一 `top` 索引管理頂端。",
                "en": "LIFO: a single `top` index manages the top."
              },
              {
                "zh": "push / pop 皆為 $O(1)$。",
                "en": "Both push and pop are $O(1)$."
              },
              {
                "zh": "固定容量是與鏈結串列實作的主要差異。",
                "en": "Fixed capacity is the key difference from the linked-list implementation."
              }
            ]
          }
        ]
      }
    ]
  },
  "tree-bst": {
    "category": "Trees",
    "title": {
      "zh": "二元搜尋樹 (BST)",
      "en": "Binary Search Tree (BST)"
    },
    "slides": [
      {
        "heading": {
          "zh": "二元搜尋樹 (BST)",
          "en": "Binary Search Tree (BST)"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "二元搜尋樹是一種二元樹結構,每個節點滿足：左子樹所有值 < 節點值 < 右子樹所有值,使得搜尋、插入、刪除均能以 $O(\\log N)$ 完成(平均情況)。",
              "en": "A Binary Search Tree is a binary tree where every node satisfies: all values in the left subtree < node value < all values in the right subtree, enabling $O(\\log N)$ search, insert, and delete on average."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "BST 以 BST 排序性質作為路由規則:搜尋時根據比較結果向左或向右子樹移動,最多遍訪樹的高度層數即可找到目標。",
              "en": "The BST ordering property acts as a routing rule: during search, each comparison directs traversal left or right, reaching the target within at most $O(h)$ steps where $h$ is the tree height."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "插入:從根遞迴比較,找到第一個 null 位置即插入新節點。",
                "en": "Insert: recursively compare from root; insert a new node at the first null child."
              },
              {
                "zh": "搜尋:比目前節點小則走左,大則走右,相等即命中。",
                "en": "Search: go left if smaller, right if larger, equal means found."
              },
              {
                "zh": "最壞情況:按升序插入退化成鏈結串列,$O(N)$ 搜尋。",
                "en": "Worst case: inserting in sorted order degenerates into a linked list — $O(N)$ search."
              },
              {
                "zh": "中序遍訪輸出有序序列。",
                "en": "In-order traversal yields a sorted sequence."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "從 `root` 開始,將插入值與當前節點比較。",
                "en": "Start at `root`; compare the value to insert with the current node."
              },
              {
                "zh": "若值 < 節點值則遞迴至左子樹,否則遞迴至右子樹。",
                "en": "If value < node value recurse into the left subtree; otherwise recurse right."
              },
              {
                "zh": "遇到 `nullptr` 即在此建立新節點並返回。",
                "en": "On encountering `nullptr`, allocate a new node here and return it."
              },
              {
                "zh": "回傳路徑逐層更新子指標,完成插入。",
                "en": "Return up the call stack, updating child pointers at each level to complete the insertion."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart TD\n  R[\"root=50\"] --> L[\"30\"]\n  R --> RR[\"70\"]\n  L --> LL[\"20\"]\n  L --> LR[\"40\"]\n  RR --> RL[\"?\"]\n  RL -->|\"insert(60)\"| N[\"60 inserted\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "樹狀結構示意",
          "en": "Tree Structure Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 130\" width=\"300\" height=\"130\"><g font-family=\"sans-serif\" font-size=\"12\" text-anchor=\"middle\"><circle cx=\"150\" cy=\"20\" r=\"16\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"150\" y=\"25\">50</text><circle cx=\"80\" cy=\"65\" r=\"16\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"80\" y=\"70\">30</text><circle cx=\"220\" cy=\"65\" r=\"16\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"220\" y=\"70\">70</text><circle cx=\"45\" cy=\"110\" r=\"16\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"45\" y=\"115\">20</text><circle cx=\"115\" cy=\"110\" r=\"16\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"115\" y=\"115\">40</text><line x1=\"140\" y1=\"34\" x2=\"92\" y2=\"51\" stroke=\"#64748b\"/><line x1=\"160\" y1=\"34\" x2=\"208\" y2=\"51\" stroke=\"#64748b\"/><line x1=\"70\" y1=\"79\" x2=\"55\" y2=\"96\" stroke=\"#64748b\"/><line x1=\"90\" y1=\"79\" x2=\"105\" y2=\"96\" stroke=\"#64748b\"/></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "左子節點值 < 父節點值 < 右子節點值;中序遍訪(左-根-右)輸出 20 30 40 50 70 的有序序列。",
              "en": "Left child < parent < right child; in-order traversal (left-root-right) outputs the sorted sequence 20 30 40 50 70."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "操作",
                "en": "Operation"
              },
              {
                "zh": "時間(平均)",
                "en": "Time (avg)"
              },
              {
                "zh": "時間(最壞)",
                "en": "Time (worst)"
              }
            ],
            "rows": [
              [
                {
                  "zh": "搜尋",
                  "en": "search"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                }
              ],
              [
                {
                  "zh": "插入",
                  "en": "insert"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                }
              ],
              [
                {
                  "zh": "刪除",
                  "en": "delete"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                }
              ],
              [
                {
                  "zh": "空間合計",
                  "en": "Total Space"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{search}}(n) = O(h),\\quad h = O(\\log N)\\text{ avg},\\; O(N)\\text{ worst}",
            "caption": {
              "zh": "平均樹高為 $O(\\log N)$;若插入有序序列則退化至 $O(N)$。",
              "en": "Average tree height is $O(\\log N)$; degrades to $O(N)$ when inserting a sorted sequence."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "struct Node {\n    int data;\n    Node* left;\n    Node* right;\n    Node(int val) : data(val), left(nullptr), right(nullptr) {}\n};\n\n// Recursive insert returns updated subtree root\nNode* insert(Node* node, int data) {\n    if (!node)\n        return new Node(data);\n    if (data < node->data)\n        node->left = insert(node->left, data);\n    else if (data > node->data)\n        node->right = insert(node->right, data);\n    return node; // duplicate ignored\n}\n\n// In-order: left -> root -> right (sorted output)\nvoid inorder(Node* node) {\n    if (!node)\n        return;\n    inorder(node->left);\n    cout << node->data << \" \";\n    inorder(node->right);\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:實作簡單,平均 $O(\\log N)$ 的搜尋/插入/刪除。",
                "en": "Pro: simple to implement; average $O(\\log N)$ search/insert/delete."
              },
              {
                "zh": "優點:中序遍訪自動產生有序序列,適合範圍查詢。",
                "en": "Pro: in-order traversal produces a sorted sequence — good for range queries."
              },
              {
                "zh": "缺點:無自平衡機制,最壞退化為 $O(N)$ 鏈結串列。",
                "en": "Con: no self-balancing — worst case degrades to $O(N)$ linked list."
              },
              {
                "zh": "適用:資料隨機分佈、對平衡無嚴格要求的小型有序字典。",
                "en": "Use when data is randomly distributed and strict balancing is not required (small ordered dictionaries)."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "以左 < 節點 < 右的排序性質實現高效路由。",
                "en": "BST ordering property (left < node < right) enables efficient routing."
              },
              {
                "zh": "平均 $O(\\log N)$,最壞 $O(N)$;不平衡是主要風險。",
                "en": "Average $O(\\log N)$, worst $O(N)$; imbalance is the main risk."
              },
              {
                "zh": "AVL 與 Red-Black Tree 等自平衡樹解決了此問題。",
                "en": "Self-balancing variants (AVL, Red-Black Tree) solve the imbalance problem."
              }
            ]
          }
        ]
      }
    ]
  },
  "tree-avl": {
    "category": "Trees",
    "title": {
      "zh": "AVL 高度平衡樹",
      "en": "AVL Height-Balanced Tree"
    },
    "slides": [
      {
        "heading": {
          "zh": "AVL 高度平衡樹",
          "en": "AVL Height-Balanced Tree"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "AVL 樹是第一種自平衡 BST(Adelson-Velsky & Landis,1962),每個節點維護一個 balance factor = height(left) − height(right),任何時刻絕對值均 ≤ 1,保證 $O(\\log N)$ 的所有操作。",
              "en": "The AVL tree is the first self-balancing BST (Adelson-Velsky & Landis, 1962). Every node maintains a balance factor = height(left) − height(right); the absolute value is always ≤ 1, guaranteeing $O(\\log N)$ for all operations."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "每次插入後,從插入節點往根回溯,更新沿途節點的 `height`,若發現 balance factor 超出 [−1, 1] 範圍即觸發旋轉修正。",
              "en": "After each insertion, the path from the inserted node back to the root is traced; `height` is updated at each ancestor, and any node whose balance factor leaves [−1, 1] triggers a rotation to restore balance."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "LL 情況(左子比右子高 2 且插入在左左):單次右旋(Right Rotate)。",
                "en": "LL case (left subtree 2 taller, new key in left-left): single right rotation (Right Rotate)."
              },
              {
                "zh": "RR 情況(右子比左子高 2 且插入在右右):單次左旋(Left Rotate)。",
                "en": "RR case (right subtree 2 taller, new key in right-right): single left rotation (Left Rotate)."
              },
              {
                "zh": "LR 情況:先對左子左旋再對當前節點右旋(雙旋轉)。",
                "en": "LR case: first left-rotate the left child, then right-rotate the current node (double rotation)."
              },
              {
                "zh": "RL 情況:先對右子右旋再對當前節點左旋(雙旋轉)。",
                "en": "RL case: first right-rotate the right child, then left-rotate the current node (double rotation)."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "按 BST 規則遞迴插入節點。",
                "en": "Recursively insert the new key following BST ordering rules."
              },
              {
                "zh": "返回時更新每個祖先節點的 `height`。",
                "en": "On the way back up, update the `height` of each ancestor node."
              },
              {
                "zh": "計算 `balance = getBalance(node)`,若 |balance| > 1 則判斷旋轉類型。",
                "en": "Compute `balance = getBalance(node)`; if |balance| > 1, determine the rotation type."
              },
              {
                "zh": "執行對應旋轉使子樹恢復平衡,並更新旋轉後節點的高度。",
                "en": "Apply the appropriate rotation to restore balance, then update heights of the rotated nodes."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  A[\"insert 10,20,30\\n(triggers RR case)\"] -->|\"leftRotate(10)\"| B[\"balanced:\\n20 is new root\\n10 left, 30 right\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "AVL 旋轉示意",
          "en": "AVL Rotation Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 340 130\" width=\"340\" height=\"130\"><g font-family=\"sans-serif\" font-size=\"11\" text-anchor=\"middle\"><text x=\"70\" y=\"14\" fill=\"#64748b\">Before (RR case)</text><circle cx=\"40\" cy=\"40\" r=\"14\" fill=\"#fecaca\" stroke=\"#dc2626\"/><text x=\"40\" y=\"45\">10</text><circle cx=\"80\" cy=\"75\" r=\"14\" fill=\"#fecaca\" stroke=\"#dc2626\"/><text x=\"80\" y=\"80\">20</text><circle cx=\"115\" cy=\"110\" r=\"14\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"115\" y=\"115\">30</text><line x1=\"50\" y1=\"52\" x2=\"68\" y2=\"63\" stroke=\"#64748b\"/><line x1=\"88\" y1=\"87\" x2=\"104\" y2=\"98\" stroke=\"#64748b\"/><text x=\"200\" y=\"14\" fill=\"#64748b\">After (Left Rotate)</text><circle cx=\"200\" cy=\"40\" r=\"14\" fill=\"#dcfce7\" stroke=\"#16a34a\"/><text x=\"200\" y=\"45\">20</text><circle cx=\"160\" cy=\"75\" r=\"14\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"160\" y=\"80\">10</text><circle cx=\"240\" cy=\"75\" r=\"14\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"240\" y=\"80\">30</text><line x1=\"190\" y1=\"52\" x2=\"172\" y2=\"63\" stroke=\"#64748b\"/><line x1=\"210\" y1=\"52\" x2=\"228\" y2=\"63\" stroke=\"#64748b\"/><text x=\"145\" y=\"120\" fill=\"#dc2626\">bf=&#x2212;2</text><text x=\"200\" y=\"120\" fill=\"#16a34a\">bf=0</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "插入 30 後,節點 10 的 balance factor 變為 −2(RR 情況),觸發左旋後以 20 為根的子樹恢復平衡。",
              "en": "After inserting 30, node 10 has balance factor −2 (RR case); a left rotation makes 20 the new subroot and restores balance."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "操作",
                "en": "Operation"
              },
              {
                "zh": "時間",
                "en": "Time"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "搜尋",
                  "en": "search"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "插入",
                  "en": "insert"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                }
              ],
              [
                {
                  "zh": "刪除",
                  "en": "delete"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                }
              ],
              [
                {
                  "zh": "空間合計",
                  "en": "Total Space"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "h_{\\text{AVL}} \\leq 1.44\\,\\log_2(N+2)",
            "caption": {
              "zh": "AVL 樹高度嚴格上界為 $1.44 \\log_2 N$,保證所有操作最壞情況下仍為 $O(\\log N)$。",
              "en": "The AVL tree height is strictly bounded by $1.44 \\log_2 N$, guaranteeing $O(\\log N)$ worst-case for all operations."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "int getBalance(Node* N) { return N ? height(N->left) - height(N->right) : 0; }\n\nNode* insert(Node* node, int key) {\n    if (!node)\n        return new Node(key);\n    if (key < node->key)\n        node->left = insert(node->left, key);\n    else if (key > node->key)\n        node->right = insert(node->right, key);\n    else\n        return node; // duplicate\n\n    node->height = 1 + max(height(node->left), height(node->right));\n    int balance = getBalance(node);\n\n    if (balance > 1 && key < node->left->key)\n        return rightRotate(node); // LL\n    if (balance < -1 && key > node->right->key)\n        return leftRotate(node);                // RR\n    if (balance > 1 && key > node->left->key) { // LR\n        node->left = leftRotate(node->left);\n        return rightRotate(node);\n    }\n    if (balance < -1 && key < node->right->key) { // RL\n        node->right = rightRotate(node->right);\n        return leftRotate(node);\n    }\n    return node;\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:嚴格平衡,保證 $O(\\log N)$ 搜尋,比 Red-Black Tree 更快的查詢。",
                "en": "Pro: strictly balanced — guarantees $O(\\log N)$ search; faster lookups than Red-Black trees."
              },
              {
                "zh": "優點:平衡因子僅需儲存高度差,實作相對直覺。",
                "en": "Pro: balance factor is just a height difference — relatively intuitive to implement."
              },
              {
                "zh": "缺點:插入/刪除可能觸發多次旋轉,比 Red-Black Tree 略慢。",
                "en": "Con: insert/delete may trigger multiple rotations — slightly slower than Red-Black trees for write-heavy workloads."
              },
              {
                "zh": "適用:讀取頻繁、寫入較少的場景,如符號表、資料庫索引。",
                "en": "Use in read-heavy workloads with infrequent writes, e.g. symbol tables, database indexes."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "balance factor ∈ {−1, 0, 1};超出即觸發 LL/RR/LR/RL 旋轉修正。",
                "en": "balance factor ∈ {−1, 0, 1}; any violation triggers LL/RR/LR/RL rotation."
              },
              {
                "zh": "嚴格高度平衡保證所有操作最壞情況 $O(\\log N)$。",
                "en": "Strict height balance guarantees $O(\\log N)$ worst-case for all operations."
              },
              {
                "zh": "適合查詢密集型場景;寫入頻繁時 Red-Black Tree 是更好的選擇。",
                "en": "Best for lookup-intensive scenarios; Red-Black Tree is preferred for write-heavy use cases."
              }
            ]
          }
        ]
      }
    ]
  },
  "tree-rb": {
    "category": "Trees",
    "title": {
      "zh": "紅黑樹",
      "en": "Red-Black Tree"
    },
    "slides": [
      {
        "heading": {
          "zh": "紅黑樹",
          "en": "Red-Black Tree"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "紅黑樹是一種自平衡 BST,以節點著色(RED / BLACK)和五條不變量確保樹高不超過 $2\\log_2(N+1)$,廣泛用於 C++ `std::map`、Java `TreeMap`。",
              "en": "A Red-Black Tree is a self-balancing BST that uses node coloring (RED / BLACK) and five invariants to keep tree height within $2\\log_2(N+1)$; widely used in C++ `std::map` and Java `TreeMap`."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "五條 Red-Black 不變量共同約束深度差異:每條根至 null 路徑的 black-height 相同,且紅節點不能有紅子節點。",
              "en": "Five Red-Black invariants jointly constrain depth differences: every root-to-null path has the same black-height, and no red node may have a red child."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "規則 1:每個節點非紅即黑。",
                "en": "Rule 1: every node is either RED or BLACK."
              },
              {
                "zh": "規則 2:根節點必為黑色。",
                "en": "Rule 2: the root is always BLACK."
              },
              {
                "zh": "規則 3:紅色節點的兩個子節點必須為黑色(不能有連續兩個紅節點)。",
                "en": "Rule 3: both children of a RED node must be BLACK (no two consecutive RED nodes)."
              },
              {
                "zh": "規則 4:從任一節點到其所有 null 後代,路徑中的黑色節點數相同(black-height)。",
                "en": "Rule 4: every path from any node to its null descendants contains the same number of BLACK nodes (black-height)."
              },
              {
                "zh": "規則 5:所有 NIL(葉哨兵)節點均為黑色。",
                "en": "Rule 5: every NIL (leaf sentinel) node is BLACK."
              },
              {
                "zh": "插入後透過重新著色(recoloring)與旋轉(rotation)修復違規。",
                "en": "After insertion, violations are fixed via recoloring and rotations."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "以標準 BST 插入方式插入新節點,初始著色為紅色。",
                "en": "Insert the new node using standard BST insertion; color it RED initially."
              },
              {
                "zh": "若父節點為黑色則不違規,結束。",
                "en": "If the parent is BLACK, no violation occurs — done."
              },
              {
                "zh": "若父節點為紅色,判斷叔父(uncle)節點顏色。",
                "en": "If the parent is RED, check the uncle node color."
              },
              {
                "zh": "Case 1(叔父為紅):父、叔父均改黑,祖父改紅,繼續向上修復。",
                "en": "Case 1 (uncle is RED): recolor parent & uncle BLACK, grandparent RED, continue fix upward."
              },
              {
                "zh": "Case 2/3(叔父為黑):執行旋轉並交換父祖父顏色完成修復。",
                "en": "Case 2/3 (uncle is BLACK): perform rotation and swap parent/grandparent colors to finish."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart TD\n  A[\"BST insert\\n(color RED)\"] --> B{\"parent BLACK?\"}  \n  B -->|yes| C[\"done\"]\n  B -->|no| D{\"uncle RED?\"}\n  D -->|yes| E[\"recolor\\n+ fix upward\"]\n  D -->|no| F[\"rotate\\n+ recolor\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "紅黑樹結構示意",
          "en": "Red-Black Tree Structure"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 130\" width=\"300\" height=\"130\"><g font-family=\"sans-serif\" font-size=\"12\" text-anchor=\"middle\"><circle cx=\"150\" cy=\"20\" r=\"16\" fill=\"#1e293b\" stroke=\"#1e293b\"/><text x=\"150\" y=\"25\" fill=\"white\">7</text><circle cx=\"80\" cy=\"65\" r=\"16\" fill=\"#dc2626\" stroke=\"#991b1b\"/><text x=\"80\" y=\"70\" fill=\"white\">3</text><circle cx=\"220\" cy=\"65\" r=\"16\" fill=\"#1e293b\" stroke=\"#1e293b\"/><text x=\"220\" y=\"70\" fill=\"white\">11</text><circle cx=\"45\" cy=\"110\" r=\"16\" fill=\"#1e293b\" stroke=\"#1e293b\"/><text x=\"45\" y=\"115\" fill=\"white\">1</text><circle cx=\"115\" cy=\"110\" r=\"16\" fill=\"#1e293b\" stroke=\"#1e293b\"/><text x=\"115\" y=\"115\" fill=\"white\">5</text><line x1=\"140\" y1=\"34\" x2=\"92\" y2=\"51\" stroke=\"#64748b\"/><line x1=\"160\" y1=\"34\" x2=\"208\" y2=\"51\" stroke=\"#64748b\"/><line x1=\"70\" y1=\"79\" x2=\"55\" y2=\"96\" stroke=\"#64748b\"/><line x1=\"90\" y1=\"79\" x2=\"105\" y2=\"96\" stroke=\"#64748b\"/></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "黑節點為深色,紅節點為紅色;根節點 7 為黑色,每條根至 null 路徑包含 2 個黑色節點(black-height=2)。",
              "en": "Black nodes are dark, red nodes are red. Root 7 is BLACK; every root-to-null path passes through 2 BLACK nodes (black-height = 2)."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "操作",
                "en": "Operation"
              },
              {
                "zh": "時間",
                "en": "Time"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "搜尋",
                  "en": "search"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "插入",
                  "en": "insert"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                }
              ],
              [
                {
                  "zh": "刪除",
                  "en": "delete"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                }
              ],
              [
                {
                  "zh": "空間合計",
                  "en": "Total Space"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "h_{\\text{RB}} \\leq 2\\log_2(N+1)",
            "caption": {
              "zh": "Red-Black Tree 高度上界為 $2\\log_2(N+1)$,比 AVL 稍鬆但仍保證 $O(\\log N)$。",
              "en": "Red-Black Tree height is bounded by $2\\log_2(N+1)$ — slightly looser than AVL, but still $O(\\log N)$."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "enum Color { RED, BLACK };\n\nstruct Node {\n    int data;\n    bool color;\n    Node *left, *right, *parent;\n    Node(int d) : data(d), color(RED), left(nullptr), right(nullptr), parent(nullptr) {}\n};\n\nvoid fixViolation(Node*& root, Node*& pt) {\n    while ((pt != root) && (pt->color != BLACK) && (pt->parent->color == RED)) {\n        Node* parent = pt->parent;\n        Node* grandparent = parent->parent;\n        // Case: parent is left child of grandparent\n        if (parent == grandparent->left) {\n            Node* uncle = grandparent->right;\n            if (uncle && uncle->color == RED) { // Recolor\n                grandparent->color = RED;\n                parent->color = uncle->color = BLACK;\n                pt = grandparent;\n            } else { /* rotate + recolor */\n            }\n        } /* mirror for right-child case */\n    }\n    root->color = BLACK;\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:插入/刪除旋轉次數有常數上界,寫入效率優於 AVL Tree。",
                "en": "Pro: insert/delete rotations are bounded by a constant — better write performance than AVL."
              },
              {
                "zh": "優點:廣泛支援:C++ `std::map`、`std::set`、Linux 排程器均使用紅黑樹。",
                "en": "Pro: ubiquitous — used by C++ `std::map`, `std::set`, and the Linux scheduler."
              },
              {
                "zh": "缺點:五條不變量使實作複雜,除錯困難。",
                "en": "Con: five invariants make the implementation complex and difficult to debug."
              },
              {
                "zh": "缺點:比 AVL Tree 允許稍大的高度差,搜尋略慢。",
                "en": "Con: allows slightly larger height imbalance than AVL — marginally slower lookups."
              },
              {
                "zh": "適用:讀寫均衡的有序關聯容器,如 map、set、排程優先佇列。",
                "en": "Use for balanced read/write ordered containers, e.g. map, set, scheduler priority queues."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "五條染色不變量約束黑高度,使樹高不超過 $2\\log_2 N$。",
                "en": "Five coloring invariants constrain black-height, keeping tree height ≤ $2\\log_2 N$."
              },
              {
                "zh": "插入最多 2 次旋轉,比 AVL 的潛在多次旋轉更少。",
                "en": "Insert requires at most 2 rotations — fewer than the potentially multiple rotations in AVL."
              },
              {
                "zh": "工業界最廣泛使用的平衡 BST 實作。",
                "en": "The most widely used self-balancing BST in industrial software."
              }
            ]
          }
        ]
      }
    ]
  },
  "tree-splay": {
    "category": "Trees",
    "title": {
      "zh": "Splay 樹",
      "en": "Splay Tree"
    },
    "slides": [
      {
        "heading": {
          "zh": "Splay 樹",
          "en": "Splay Tree"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "Splay 樹是一種自調整 BST:每次存取(搜尋/插入)節點後,立即以 splay 操作將該節點旋轉至根部,使最近存取的資料保持在樹頂附近,攤銷時間複雜度為 $O(\\log N)$。",
              "en": "A Splay Tree is a self-adjusting BST: after every access (search/insert), the accessed node is rotated to the root via splay operations, keeping recently accessed data near the top. Amortized time complexity is $O(\\log N)$."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "Splay 操作由三種基本旋轉組合構成,根據目標節點與其父/祖父的相對位置選擇不同策略。",
              "en": "Splaying consists of three basic rotation patterns chosen based on the target node's position relative to its parent and grandparent."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "Zig:目標節點的父節點即為根,對父節點執行單次旋轉。",
                "en": "Zig: target's parent is the root — perform a single rotation on the parent."
              },
              {
                "zh": "Zig-Zig:目標與父節點同為左子(或同為右子)— 先旋轉祖父,再旋轉父節點(同向雙旋)。",
                "en": "Zig-Zig: target and parent are both left (or both right) children — rotate grandparent first, then parent (same-direction double rotation)."
              },
              {
                "zh": "Zig-Zag:目標與父節點方向相反 — 執行兩次異向旋轉。",
                "en": "Zig-Zag: target and parent are in opposite directions — perform two rotations in alternating directions."
              },
              {
                "zh": "局部性原理:若存取模式有 80/20 規律,常用節點自動保持在根附近接近 $O(1)$。",
                "en": "Locality principle: with 80/20 access patterns, hot nodes self-organize near the root approaching $O(1)$."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "以標準 BST 搜尋找到目標節點(或最接近的節點)。",
                "en": "Locate the target (or closest) node via standard BST search."
              },
              {
                "zh": "判斷目標節點、父節點、祖父節點的相對位置,選擇 Zig/Zig-Zig/Zig-Zag 策略。",
                "en": "Determine the relative positions of target, parent, and grandparent to select Zig/Zig-Zig/Zig-Zag."
              },
              {
                "zh": "執行對應旋轉,將目標節點上移一層或兩層。",
                "en": "Execute the corresponding rotation(s), moving the target one or two levels up."
              },
              {
                "zh": "重複直到目標節點成為新的根節點。",
                "en": "Repeat until the target node becomes the new root."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  A[\"search(10)\\ntree: 10->20->30\"] -->|\"splay(10)\"| B[\"10 becomes root\\n10: left=null, right=20->30\"]\n  B -->|\"search(30)\"| C[\"splay(30)\\n30 becomes root\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "Splay 操作示意",
          "en": "Splay Operation Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 340 130\" width=\"340\" height=\"130\"><g font-family=\"sans-serif\" font-size=\"11\" text-anchor=\"middle\"><text x=\"65\" y=\"14\" fill=\"#64748b\">Before splay(10)</text><circle cx=\"65\" cy=\"35\" r=\"14\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"65\" y=\"40\">30</text><circle cx=\"35\" cy=\"75\" r=\"14\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"35\" y=\"80\">20</text><circle cx=\"10\" cy=\"110\" r=\"14\" fill=\"#fef9c3\" stroke=\"#ca8a04\"/><text x=\"10\" y=\"115\">10</text><line x1=\"56\" y1=\"47\" x2=\"44\" y2=\"63\" stroke=\"#64748b\"/><line x1=\"27\" y1=\"87\" x2=\"17\" y2=\"98\" stroke=\"#64748b\"/><text x=\"220\" y=\"14\" fill=\"#64748b\">After splay(10)</text><circle cx=\"220\" cy=\"35\" r=\"14\" fill=\"#fef9c3\" stroke=\"#ca8a04\"/><text x=\"220\" y=\"40\">10</text><circle cx=\"280\" cy=\"75\" r=\"14\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"280\" y=\"80\">20</text><circle cx=\"310\" cy=\"110\" r=\"14\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"310\" y=\"115\">30</text><line x1=\"228\" y1=\"47\" x2=\"270\" y2=\"63\" stroke=\"#64748b\"/><line x1=\"288\" y1=\"87\" x2=\"300\" y2=\"98\" stroke=\"#64748b\"/></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "搜尋 10 後 splay 操作將 10 旋轉至根;下次再存取 10 僅需 $O(1)$,體現局部性優化。",
              "en": "After searching for 10, splay rotates 10 to the root; the next access to 10 costs $O(1)$, demonstrating locality optimization."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "操作",
                "en": "Operation"
              },
              {
                "zh": "攤銷時間",
                "en": "Amortized Time"
              },
              {
                "zh": "最壞單次",
                "en": "Worst Single"
              }
            ],
            "rows": [
              [
                {
                  "zh": "搜尋",
                  "en": "search"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                }
              ],
              [
                {
                  "zh": "插入",
                  "en": "insert"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                }
              ],
              [
                {
                  "zh": "刪除",
                  "en": "delete"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                }
              ],
              [
                {
                  "zh": "空間合計",
                  "en": "Total Space"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{amortized}} = O(\\log N)\\text{ per operation}",
            "caption": {
              "zh": "攤銷分析保證連續 $m$ 次操作總代價 $O(m \\log N)$;單次最壞為 $O(N)$。",
              "en": "Amortized analysis guarantees total cost of $m$ operations is $O(m \\log N)$; single-call worst case is $O(N)$."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "Node* splay(Node* root, int key) {\n    if (!root || root->key == key)\n        return root;\n    if (root->key > key) { // key is in left subtree\n        if (!root->left)\n            return root;\n        if (root->left->key > key) { // Zig-Zig (left-left)\n            root->left->left = splay(root->left->left, key);\n            root = rightRotate(root);\n        } else if (root->left->key < key) { // Zig-Zag (left-right)\n            root->left->right = splay(root->left->right, key);\n            if (root->left->right)\n                root->left = leftRotate(root->left);\n        }\n        return root->left ? rightRotate(root) : root;\n    } else { // key is in right subtree\n        if (!root->right)\n            return root;\n        if (root->right->key > key) { // Zig-Zag (right-left)\n            root->right->left = splay(root->right->left, key);\n            if (root->right->left)\n                root->right = rightRotate(root->right);\n        } else if (root->right->key < key) { // Zig-Zig (right-right)\n            root->right->right = splay(root->right->right, key);\n            root = leftRotate(root);\n        }\n        return root->right ? leftRotate(root) : root;\n    }\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:無需儲存高度/顏色等額外欄位,記憶體使用最精簡。",
                "en": "Pro: no extra height or color fields needed — minimal memory footprint."
              },
              {
                "zh": "優點:局部性優化:頻繁存取的節點自動在根附近,$O(1)$ 第二次存取。",
                "en": "Pro: locality optimization — frequently accessed nodes self-organize near the root ($O(1)$ on repeat access)."
              },
              {
                "zh": "缺點:單次操作最壞 $O(N)$,不適合對延遲有嚴格要求的即時系統。",
                "en": "Con: single-call worst case is $O(N)$ — unsuitable for latency-sensitive real-time systems."
              },
              {
                "zh": "適用:具有明顯存取局部性的快取、編譯器符號表、網路路由表。",
                "en": "Use for workloads with strong access locality: caches, compiler symbol tables, routing tables."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "每次存取後 splay 至根;Zig/Zig-Zig/Zig-Zag 三種旋轉策略。",
                "en": "Every access splays the node to root; three strategies: Zig, Zig-Zig, Zig-Zag."
              },
              {
                "zh": "攤銷 $O(\\log N)$,熱點資料趨近 $O(1)$;單次最壞 $O(N)$。",
                "en": "Amortized $O(\\log N)$; hot data approaches $O(1)$; single worst case $O(N)$."
              },
              {
                "zh": "結構最簡(無額外欄位),適合局部性明顯的動態存取模式。",
                "en": "Structurally minimal (no extra fields); ideal for dynamic workloads with strong access locality."
              }
            ]
          }
        ]
      }
    ]
  },
  "tree-trie": {
    "category": "Trees",
    "title": {
      "zh": "Trie(前綴樹)",
      "en": "Trie (Prefix Tree)"
    },
    "slides": [
      {
        "heading": {
          "zh": "Trie(前綴樹)",
          "en": "Trie (Prefix Tree)"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "Trie 是一種以字元為邊的 26-ary 樹結構,專為字串前綴搜尋設計:搜尋或插入長度 $L$ 的字串只需 $O(L)$ 時間,與樹中字串數量無關。",
              "en": "A Trie is a 26-ary tree where each edge represents a character, purpose-built for string prefix search: inserting or searching for a string of length $L$ costs $O(L)$ — independent of the number of strings in the tree."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "節點本身不儲存字元;字元由父節點到子節點的邊(指標陣列的索引 0-25)隱式表示。節點上的 `isEndOfWord` 旗標標示一個有效字串的結尾。",
              "en": "Nodes do not store characters directly; the character is implicitly represented by the edge index (0-25) chosen from the parent's `children` array. The `isEndOfWord` flag on a node marks the end of a valid string."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "插入:逐字元走訪,遇到 `nullptr` 就建立新節點,最後設 `isEndOfWord = true`。",
                "en": "Insert: traverse character by character; allocate a new node on `nullptr`; set `isEndOfWord = true` at the last character."
              },
              {
                "zh": "搜尋:逐字元走訪到底,回傳最後節點的 `isEndOfWord` 值。",
                "en": "Search: traverse all characters to the end; return the final node's `isEndOfWord`."
              },
              {
                "zh": "前綴搜尋:只需走訪前綴字元,不用走到 `isEndOfWord`。",
                "en": "Prefix search: traverse only the prefix characters — no need to reach `isEndOfWord`."
              },
              {
                "zh": "空間代價高:每節點固定 26 個指標,儲存 $N$ 個字串共需 $O(N \\cdot L)$ 個節點。",
                "en": "High space cost: each node holds 26 pointers — storing $N$ strings of length $L$ requires $O(N \\cdot L)$ nodes."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "計算字元索引:`index = c - 'A'`(索引 0-25)。",
                "en": "Compute character index: `index = c - 'A'` (index 0-25)."
              },
              {
                "zh": "若 `children[index] == nullptr` 則建立新 `TrieNode`。",
                "en": "If `children[index] == nullptr`, allocate a new `TrieNode`."
              },
              {
                "zh": "移動到子節點,繼續處理下一個字元。",
                "en": "Advance to the child node and process the next character."
              },
              {
                "zh": "字串結束時設 `curr->isEndOfWord = true`。",
                "en": "At the end of the string, set `curr->isEndOfWord = true`."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  ROOT[\"root\"] -->|C| C_NODE[\"C\"]\n  C_NODE -->|A| CA[\"CA\"]\n  CA -->|R| CAR[\"CAR*\"]\n  CA -->|T| CAT[\"CAT*\"]\n  ROOT -->|D| D_NODE[\"D\"]\n  D_NODE -->|O| DO[\"DO\"]\n  DO -->|G| DOG[\"DOG*\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "Trie 結構示意",
          "en": "Trie Structure Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 130\" width=\"320\" height=\"130\"><g font-family=\"sans-serif\" font-size=\"11\" text-anchor=\"middle\"><rect x=\"138\" y=\"5\" width=\"44\" height=\"22\" rx=\"4\" fill=\"#f1f5f9\" stroke=\"#94a3b8\"/><text x=\"160\" y=\"21\">root</text><rect x=\"60\" y=\"45\" width=\"40\" height=\"22\" rx=\"4\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"80\" y=\"61\">C</text><rect x=\"240\" y=\"45\" width=\"40\" height=\"22\" rx=\"4\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"260\" y=\"61\">D</text><rect x=\"30\" y=\"88\" width=\"40\" height=\"22\" rx=\"4\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"50\" y=\"104\">CA</text><rect x=\"200\" y=\"88\" width=\"40\" height=\"22\" rx=\"4\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"220\" y=\"104\">DO</text><rect x=\"5\" y=\"110\" width=\"38\" height=\"18\" rx=\"4\" fill=\"#dcfce7\" stroke=\"#16a34a\"/><text x=\"24\" y=\"123\">CAR*</text><rect x=\"60\" y=\"110\" width=\"38\" height=\"18\" rx=\"4\" fill=\"#dcfce7\" stroke=\"#16a34a\"/><text x=\"79\" y=\"123\">CAT*</text><rect x=\"200\" y=\"110\" width=\"38\" height=\"18\" rx=\"4\" fill=\"#dcfce7\" stroke=\"#16a34a\"/><text x=\"219\" y=\"123\">DOG*</text><line x1=\"155\" y1=\"27\" x2=\"92\" y2=\"45\" stroke=\"#64748b\"/><line x1=\"165\" y1=\"27\" x2=\"248\" y2=\"45\" stroke=\"#64748b\"/><line x1=\"75\" y1=\"67\" x2=\"55\" y2=\"88\" stroke=\"#64748b\"/><line x1=\"85\" y1=\"67\" x2=\"55\" y2=\"88\" stroke=\"#64748b\"/><line x1=\"255\" y1=\"67\" x2=\"215\" y2=\"88\" stroke=\"#64748b\"/><line x1=\"42\" y1=\"110\" x2=\"22\" y2=\"110\" stroke=\"#64748b\"/><line x1=\"55\" y1=\"110\" x2=\"70\" y2=\"110\" stroke=\"#64748b\"/></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "綠色標記 * 的節點為 `isEndOfWord=true`;前綴 \"CA\" 共享同一路徑節點,節省重複儲存。",
              "en": "Green nodes marked * have `isEndOfWord=true`; prefix \"CA\" is shared by CAR and CAT — eliminating redundant storage."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "操作",
                "en": "Operation"
              },
              {
                "zh": "時間",
                "en": "Time"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "插入字串",
                  "en": "insert string"
                },
                {
                  "zh": "$O(L)$",
                  "en": "$O(L)$"
                },
                {
                  "zh": "$O(L)$",
                  "en": "$O(L)$"
                }
              ],
              [
                {
                  "zh": "搜尋字串",
                  "en": "search string"
                },
                {
                  "zh": "$O(L)$",
                  "en": "$O(L)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "前綴搜尋",
                  "en": "prefix search"
                },
                {
                  "zh": "$O(P)$",
                  "en": "$O(P)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "空間合計",
                  "en": "Total Space"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "$O(N \\cdot L)$",
                  "en": "$O(N \\cdot L)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{search}}(L) = O(L)",
            "caption": {
              "zh": "搜尋/插入時間僅取決於字串長度 $L$,與字典中字串數量 $N$ 完全無關。",
              "en": "Search/insert time depends only on string length $L$, completely independent of the number of strings $N$ in the dictionary."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "class TrieNode {\npublic:\n    TrieNode* children[26];\n    bool isEndOfWord;\n    TrieNode() {\n        isEndOfWord = false;\n        for (int i = 0; i < 26; i++)\n            children[i] = nullptr;\n    }\n};\n\nvoid insert(string word) {\n    TrieNode* curr = root;\n    for (char c : word) {\n        int index = c - 'A'; // uppercase A-Z\n        if (!curr->children[index])\n            curr->children[index] = new TrieNode();\n        curr = curr->children[index];\n    }\n    curr->isEndOfWord = true;\n}\n\nbool search(string word) {\n    TrieNode* curr = root;\n    for (char c : word) {\n        int index = c - 'A';\n        if (!curr->children[index])\n            return false;\n        curr = curr->children[index];\n    }\n    return curr->isEndOfWord;\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:前綴搜尋/自動補全 $O(L)$,完全不受字典大小影響。",
                "en": "Pro: prefix search / autocomplete in $O(L)$ — unaffected by dictionary size."
              },
              {
                "zh": "優點:可自然支援所有以相同前綴開頭的單字列舉。",
                "en": "Pro: naturally supports enumerating all words sharing a prefix."
              },
              {
                "zh": "缺點:每節點固定 26 個指標,稀疏時記憶體浪費嚴重。",
                "en": "Con: each node holds 26 pointers — severe memory waste when the tree is sparse."
              },
              {
                "zh": "適用:自動完成、拼字檢查、IP 路由前綴匹配。",
                "en": "Use for autocomplete, spell checking, and IP routing prefix matching."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "字元以邊索引隱式表示;`isEndOfWord` 標記字串結尾。",
                "en": "Characters are implicitly encoded as edge indices; `isEndOfWord` marks string endings."
              },
              {
                "zh": "插入/搜尋 $O(L)$,與字典規模無關。",
                "en": "Insert/search is $O(L)$ — independent of dictionary size."
              },
              {
                "zh": "稀疏時記憶體開銷大;Radix Tree 與 TST 是空間最佳化替代方案。",
                "en": "High memory cost when sparse; Radix Tree and TST are space-optimized alternatives."
              }
            ]
          }
        ]
      }
    ]
  },
  "tree-radix": {
    "category": "Trees",
    "title": {
      "zh": "Radix 樹(壓縮前綴樹)",
      "en": "Radix Tree (Compressed Trie)"
    },
    "slides": [
      {
        "heading": {
          "zh": "Radix 樹(壓縮前綴樹)",
          "en": "Radix Tree (Compressed Trie)"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "Radix 樹(又稱 Patricia Trie)是 Trie 的空間最佳化版本:將只有單一子節點的線性鏈壓縮成一條帶有字串標籤的邊,大幅減少節點數量。",
              "en": "A Radix Tree (also called Patricia Trie) is a space-optimized Trie: chains of single-child nodes are compressed into one edge with a string label, drastically reducing node count."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "插入新字串時,依照最長公共前綴(LCP)找到分叉點;若插入的字串與現有邊的標籤有公共前綴但又不完全相同,則在 LCP 處分裂邊並建立兩個子節點。",
              "en": "On insertion, the longest common prefix (LCP) with existing edge labels is found. If the new string shares part but not all of an existing label, the edge is split at the LCP, creating two child nodes."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "邊標籤:可以是多字元字串(如 \"WATER\"),不限單一字元。",
                "en": "Edge labels: may be multi-character strings (e.g. \"WATER\"), not limited to one character."
              },
              {
                "zh": "分裂:插入 \"WATCH\" 時,\"WATER\" 邊在 \"WAT\" 處分裂成 \"ER\" 與 \"CH\" 兩條子邊。",
                "en": "Splitting: inserting \"WATCH\" splits the \"WATER\" edge at \"WAT\", producing two sub-edges \"ER\" and \"CH\"."
              },
              {
                "zh": "搜尋:逐層比對邊標籤前綴,時間 $O(L)$,但常數比 Trie 更小。",
                "en": "Search: compare edge labels level by level in $O(L)$ time, with a smaller constant than standard Trie."
              },
              {
                "zh": "節點數量上界:最多為插入字串數量的兩倍。",
                "en": "Node count bound: at most twice the number of inserted strings."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "從根節點出發,比對插入字串與各子邊標籤的最長公共前綴。",
                "en": "Start at root; find the longest common prefix between the insertion string and each child edge label."
              },
              {
                "zh": "若完全匹配:沿邊移動,繼續處理剩餘字元。",
                "en": "Full match: follow the edge and process the remaining characters."
              },
              {
                "zh": "若部分匹配:在 LCP 處分裂邊,建立新中間節點,連接舊後綴與新後綴。",
                "en": "Partial match: split the edge at the LCP; create a new intermediate node connecting the old suffix and new suffix."
              },
              {
                "zh": "若無匹配:在當前節點新增帶有剩餘字元的子邊。",
                "en": "No match: add a new child edge with the remaining characters at the current node."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart TD\n  A[\"insert WATER\\nroot -> WATER*\"] -->|\"insert WATCH\"| B[\"split at WAT\\nroot -> WAT -> ER*\\n              -> CH*\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "Radix 樹壓縮示意",
          "en": "Radix Tree Compression Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 130\" width=\"320\" height=\"130\"><g font-family=\"sans-serif\" font-size=\"11\" text-anchor=\"middle\"><rect x=\"130\" y=\"5\" width=\"60\" height=\"22\" rx=\"4\" fill=\"#f1f5f9\" stroke=\"#94a3b8\"/><text x=\"160\" y=\"21\">root</text><rect x=\"120\" y=\"50\" width=\"80\" height=\"22\" rx=\"4\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"160\" y=\"65\">\"WAT\" node</text><rect x=\"60\" y=\"100\" width=\"60\" height=\"22\" rx=\"4\" fill=\"#dcfce7\" stroke=\"#16a34a\"/><text x=\"90\" y=\"115\">ER* (WATER)</text><rect x=\"185\" y=\"100\" width=\"60\" height=\"22\" rx=\"4\" fill=\"#dcfce7\" stroke=\"#16a34a\"/><text x=\"215\" y=\"115\">CH* (WATCH)</text><line x1=\"160\" y1=\"27\" x2=\"160\" y2=\"50\" stroke=\"#2563eb\" stroke-width=\"2\"/><text x=\"175\" y=\"44\" fill=\"#64748b\" font-size=\"10\">WAT</text><line x1=\"140\" y1=\"72\" x2=\"95\" y2=\"100\" stroke=\"#64748b\"/><text x=\"107\" y=\"93\" fill=\"#64748b\" font-size=\"10\">ER</text><line x1=\"180\" y1=\"72\" x2=\"210\" y2=\"100\" stroke=\"#64748b\"/><text x=\"205\" y=\"93\" fill=\"#64748b\" font-size=\"10\">CH</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "\"WATER\" 與 \"WATCH\" 共享前綴 \"WAT\" 儲存在同一節點,僅在差異點分叉,相比 Trie 大量節省節點數。",
              "en": "\"WATER\" and \"WATCH\" share prefix \"WAT\" in one node, branching only at the point of difference — far fewer nodes than a standard Trie."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "操作",
                "en": "Operation"
              },
              {
                "zh": "時間",
                "en": "Time"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "插入字串",
                  "en": "insert string"
                },
                {
                  "zh": "$O(L)$",
                  "en": "$O(L)$"
                },
                {
                  "zh": "$O(L)$",
                  "en": "$O(L)$"
                }
              ],
              [
                {
                  "zh": "搜尋字串",
                  "en": "search string"
                },
                {
                  "zh": "$O(L)$",
                  "en": "$O(L)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "空間合計",
                  "en": "Total Space"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "$O(N \\cdot L)$",
                  "en": "$O(N \\cdot L)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{search}}(L) = O(L),\\quad \\text{nodes} \\leq 2N",
            "caption": {
              "zh": "搜尋時間 $O(L)$;節點總數最多為插入字串數量 $N$ 的兩倍,遠低於標準 Trie。",
              "en": "Search is $O(L)$; total node count is at most $2N$ — far lower than a standard Trie."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "class RadixNode {\npublic:\n    map<string, RadixNode*> edges; // edge label -> child\n    bool isEndOfWord;\n    RadixNode() : isEndOfWord(false) {}\n};\n\n// Simplified insert: each word stored as a single edge from root.\n// In a full radix tree, edges are split on longest-common-prefix.\nvoid insert(string word) {\n    RadixNode* curr = root;\n    // Real implementation: scan edges for LCP, split if partial match\n    if (curr->edges.find(word) == curr->edges.end())\n        curr->edges[word] = new RadixNode();\n    curr->edges[word]->isEndOfWord = true;\n    // e.g., insert \"WATCH\" after \"WATER\":\n    // find LCP=\"WAT\", split \"WATER\" edge into \"WAT\"->\"ER\" and add \"CH\"\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:節點數量遠少於 Trie,記憶體使用更高效。",
                "en": "Pro: far fewer nodes than a Trie — significantly better memory efficiency."
              },
              {
                "zh": "優點:搜尋時間 $O(L)$ 不變,同時具備前綴搜尋能力。",
                "en": "Pro: search time remains $O(L)$ while retaining full prefix-search capability."
              },
              {
                "zh": "缺點:分裂/合併邏輯比標準 Trie 複雜,實作更困難。",
                "en": "Con: split/merge logic is more complex than standard Trie — harder to implement correctly."
              },
              {
                "zh": "適用:IP 路由表(最長前綴匹配)、URL 路由、基因序列索引。",
                "en": "Use for IP routing tables (longest prefix match), URL routing, and genomic sequence indexing."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "壓縮線性鏈為多字元邊標籤,節點數上界為插入字串數量的 2 倍。",
                "en": "Compresses linear chains into multi-char edge labels; node count bounded by 2× the number of strings."
              },
              {
                "zh": "搜尋 $O(L)$,記憶體遠優於標準 Trie。",
                "en": "Search $O(L)$ with memory far superior to standard Trie."
              },
              {
                "zh": "LCP 分裂是核心操作;廣泛用於 IP 路由與 URL 分發器。",
                "en": "LCP splitting is the core operation; widely used in IP routing and URL dispatchers."
              }
            ]
          }
        ]
      }
    ]
  },
  "tree-ternary": {
    "category": "Trees",
    "title": {
      "zh": "三元搜尋樹 (TST)",
      "en": "Ternary Search Tree (TST)"
    },
    "slides": [
      {
        "heading": {
          "zh": "三元搜尋樹 (TST)",
          "en": "Ternary Search Tree (TST)"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "三元搜尋樹(Ternary Search Tree, TST)是 BST 與 Trie 的混合體:每個節點儲存一個字元並擁有三個子指標(left / eq / right),兼顧字首搜尋能力與低記憶體開銷。",
              "en": "A Ternary Search Tree (TST) is a hybrid of BST and Trie: each node stores one character and has three child pointers (left / eq / right), combining prefix search capability with low memory overhead."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "每個節點儲存一個字元 `data`,三個子指標的語意分別為:left(當前字元較小)、eq(當前字元相等,進入下一字元)、right(當前字元較大)。",
              "en": "Each node stores one character `data` with three child pointers: left (current char is smaller), eq (current char matches — advance to next character), right (current char is larger)."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "插入:逐字元比較,等值走 eq 到下一字元,小於走 left,大於走 right。",
                "en": "Insert: compare character by character; equal → take eq to next char; less → go left; greater → go right."
              },
              {
                "zh": "搜尋時間 $O(\\log N + L)$:橫向 BST 搜尋約 $O(\\log N)$,縱向字元匹配 $O(L)$。",
                "en": "Search time $O(\\log N + L)$: horizontal BST traversal ~$O(\\log N)$, vertical character matching $O(L)$."
              },
              {
                "zh": "空間:每節點僅 3 個指標,遠優於 Trie 的 26 個指標/節點。",
                "en": "Space: only 3 pointers per node — far superior to Trie's 26 pointers per node."
              },
              {
                "zh": "`isEndOfWord` 標誌設在最後一個字元對應的節點上。",
                "en": "`isEndOfWord` flag is set on the node corresponding to the last character."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "若節點為 `nullptr`:建立新節點並儲存當前字元。",
                "en": "If node is `nullptr`: allocate a new node storing the current character."
              },
              {
                "zh": "若 `word[index] < node->data`:遞迴至 `left` 子節點,`index` 不變。",
                "en": "If `word[index] < node->data`: recurse into `left` child; index unchanged."
              },
              {
                "zh": "若 `word[index] > node->data`:遞迴至 `right` 子節點,`index` 不變。",
                "en": "If `word[index] > node->data`: recurse into `right` child; index unchanged."
              },
              {
                "zh": "若 `word[index] == node->data`:若 index 為最後一字元則設 `isEndOfWord`,否則遞迴至 `eq` 子節點並 `index++`。",
                "en": "If equal: if last character set `isEndOfWord`; otherwise recurse into `eq` child and increment index."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart TD\n  R[\"C(root)\"] -->|\"eq\"| A[\"A\"]\n  A -->|\"eq\"| R2[\"R*\"]\n  R2 -->|\"right\"| T[\"T*\"]\n  note1[\"CAR inserted, then CAT:\\nR->right=T because T > R\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "TST 結構示意",
          "en": "TST Structure Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 130\" width=\"320\" height=\"130\"><g font-family=\"sans-serif\" font-size=\"12\" text-anchor=\"middle\"><circle cx=\"160\" cy=\"20\" r=\"16\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"160\" y=\"25\">C</text><circle cx=\"160\" cy=\"60\" r=\"16\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"160\" y=\"65\">A</text><circle cx=\"160\" cy=\"100\" r=\"16\" fill=\"#dcfce7\" stroke=\"#16a34a\"/><text x=\"160\" y=\"105\">R*</text><circle cx=\"220\" cy=\"100\" r=\"16\" fill=\"#dcfce7\" stroke=\"#16a34a\"/><text x=\"220\" y=\"105\">T*</text><line x1=\"160\" y1=\"36\" x2=\"160\" y2=\"44\" stroke=\"#2563eb\" stroke-dasharray=\"4\"/><text x=\"175\" y=\"52\" fill=\"#64748b\" font-size=\"10\">eq</text><line x1=\"160\" y1=\"76\" x2=\"160\" y2=\"84\" stroke=\"#2563eb\" stroke-dasharray=\"4\"/><text x=\"175\" y=\"92\" fill=\"#64748b\" font-size=\"10\">eq</text><line x1=\"172\" y1=\"108\" x2=\"207\" y2=\"108\" stroke=\"#64748b\"/><text x=\"193\" y=\"104\" fill=\"#64748b\" font-size=\"10\">right</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "插入 \"CAR\" 後再插入 \"CAT\":三個字母 C-A 共享 eq 鏈,在第三字元 R/T 分叉:T > R,所以 T 節點成為 R 的 right 子節點。",
              "en": "After inserting \"CAR\" then \"CAT\": C-A share the eq chain; at the third character R vs T — since T > R, the T node becomes the right child of R."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "操作",
                "en": "Operation"
              },
              {
                "zh": "時間",
                "en": "Time"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "插入字串",
                  "en": "insert string"
                },
                {
                  "zh": "$O(\\log N + L)$",
                  "en": "$O(\\log N + L)$"
                },
                {
                  "zh": "$O(L)$",
                  "en": "$O(L)$"
                }
              ],
              [
                {
                  "zh": "搜尋字串",
                  "en": "search string"
                },
                {
                  "zh": "$O(\\log N + L)$",
                  "en": "$O(\\log N + L)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "空間合計",
                  "en": "Total Space"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "$O(N \\cdot L)$",
                  "en": "$O(N \\cdot L)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{search}} = O(\\log N + L)",
            "caption": {
              "zh": "$\\log N$ 來自橫向 BST 比較,$L$ 來自縱向字元匹配;每節點僅 3 個指標節省 Trie 的 26 個指標開銷。",
              "en": "$\\log N$ from horizontal BST comparisons; $L$ from vertical character matching. Only 3 pointers/node vs. 26 in Trie."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "struct TSTNode {\n    char data;\n    bool isEndOfWord;\n    TSTNode *left, *eq, *right;\n    TSTNode(char c)\n        : data(c), isEndOfWord(false), left(nullptr), eq(nullptr), right(nullptr) {}\n};\n\nTSTNode* insertRecursive(TSTNode* root, const string& word, int idx) {\n    if (!root)\n        root = new TSTNode(word[idx]);\n    if (word[idx] < root->data)\n        root->left = insertRecursive(root->left, word, idx);\n    else if (word[idx] > root->data)\n        root->right = insertRecursive(root->right, word, idx);\n    else {\n        if (idx + 1 < (int)word.length())\n            root->eq = insertRecursive(root->eq, word, idx + 1);\n        else\n            root->isEndOfWord = true;\n    }\n    return root;\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:每節點 3 個指標,記憶體遠優於 Trie 的 26 指標。",
                "en": "Pro: 3 pointers per node — far more memory-efficient than Trie's 26 pointers."
              },
              {
                "zh": "優點:支援前綴搜尋,比純 BST 更適合字串查詢。",
                "en": "Pro: supports prefix search — better than plain BST for string queries."
              },
              {
                "zh": "缺點:橫向 BST 比較帶來額外 $O(\\log N)$ 開銷,比 Trie 稍慢。",
                "en": "Con: horizontal BST comparisons add $O(\\log N)$ overhead compared to Trie's $O(L)$."
              },
              {
                "zh": "適用:拼字檢查、字典提示、近似字串匹配等記憶體敏感場景。",
                "en": "Use for spell checking, word suggestion, and approximate string matching in memory-sensitive scenarios."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "left / eq / right 三指標融合 BST 橫向比較與 Trie 縱向字元匹配。",
                "en": "Three pointers (left/eq/right) fuse BST horizontal comparison with Trie vertical character matching."
              },
              {
                "zh": "搜尋 $O(\\log N + L)$,每節點僅 3 個指標,是 Trie 的高效替代。",
                "en": "Search $O(\\log N + L)$ with only 3 pointers/node — an efficient Trie alternative."
              },
              {
                "zh": "最適合記憶體受限但需要前綴搜尋的場景,如嵌入式拼字檢查。",
                "en": "Best for memory-constrained prefix search, e.g. embedded spell checkers."
              }
            ]
          }
        ]
      }
    ]
  },
  "tree-btree": {
    "category": "Trees",
    "title": {
      "zh": "B-Tree(多路平衡樹)",
      "en": "B-Tree (Multi-way Balanced Tree)"
    },
    "slides": [
      {
        "heading": {
          "zh": "B-Tree(多路平衡樹)",
          "en": "B-Tree (Multi-way Balanced Tree)"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "B-Tree 是一種自平衡的多路搜尋樹,每個節點可儲存多個鍵值並有多個子指標,設計目標是最小化磁碟 I/O 次數:一個磁碟頁(block)對應一個節點,廣泛用於資料庫索引。",
              "en": "A B-Tree is a self-balancing multi-way search tree where each node stores multiple keys and has multiple children, designed to minimize disk I/O: one disk page corresponds to one node. Widely used in database indexing."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "最小度數 $t$:每個非根節點至少有 $t-1$ 個鍵值、至多有 $2t-1$ 個鍵值;相應地有 $t$ 至 $2t$ 個子指標。所有葉節點在同一層。",
              "en": "Minimum degree $t$: every non-root node has at least $t-1$ and at most $2t-1$ keys; correspondingly $t$ to $2t$ child pointers. All leaf nodes reside at the same level."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "分裂(Split):節點已滿時($2t-1$ 個鍵),中間鍵推送至父節點,左右各自形成新節點。",
                "en": "Split: when a node is full ($2t-1$ keys), the median key is pushed up to the parent; left and right halves become new nodes."
              },
              {
                "zh": "B-Tree 向上生長:分裂傳播到根時,樹高增加 1。",
                "en": "B-Trees grow upward: when a split reaches the root, tree height increases by 1."
              },
              {
                "zh": "所有鍵值(含資料)儲存於內部節點與葉節點。",
                "en": "All key-value data is stored in both internal nodes and leaf nodes."
              },
              {
                "zh": "樹高 $O(\\log_t N)$,每層對應一次磁碟讀取。",
                "en": "Tree height is $O(\\log_t N)$ — each level corresponds to one disk read."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "插入:尋找對應葉節點,若節點未滿直接插入有序位置。",
                "en": "Insert: locate the appropriate leaf; if not full, insert in sorted position."
              },
              {
                "zh": "若葉節點已滿($2t-1$ 鍵):分裂節點,中間鍵上推父節點。",
                "en": "If leaf is full ($2t-1$ keys): split the node, push median key up to parent."
              },
              {
                "zh": "若父節點因此也滿:繼續向上分裂,直到找到有空間的節點或根節點。",
                "en": "If the parent also becomes full: continue splitting upward until a non-full ancestor or the root is reached."
              },
              {
                "zh": "若根節點分裂:建立新根,樹高加 1。",
                "en": "If the root splits: create a new root, increasing tree height by 1."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart TD\n  A[\"insert 5,6\\nleaf=[5,6] ok\"] -->|\"insert 12\\nleaf=[5,6,12] full t=2\"| B[\"split: push 6 up\\nleft=[5] right=[12]\"]\n  B --> C[\"root=[6]\\nleft child=[5]\\nright child=[12]\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "B-Tree 節點結構示意",
          "en": "B-Tree Node Structure Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 340 130\" width=\"340\" height=\"130\"><g font-family=\"sans-serif\" font-size=\"11\" text-anchor=\"middle\"><rect x=\"100\" y=\"10\" width=\"140\" height=\"28\" rx=\"4\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"140\" y=\"29\">10</text><line x1=\"160\" y1=\"10\" x2=\"160\" y2=\"38\" stroke=\"#94a3b8\"/><text x=\"200\" y=\"29\">25</text><rect x=\"20\" y=\"65\" width=\"80\" height=\"28\" rx=\"4\" fill=\"#f1f5f9\" stroke=\"#94a3b8\"/><text x=\"60\" y=\"84\">5 | 8</text><rect x=\"130\" y=\"65\" width=\"80\" height=\"28\" rx=\"4\" fill=\"#f1f5f9\" stroke=\"#94a3b8\"/><text x=\"170\" y=\"84\">12 | 18</text><rect x=\"240\" y=\"65\" width=\"80\" height=\"28\" rx=\"4\" fill=\"#f1f5f9\" stroke=\"#94a3b8\"/><text x=\"280\" y=\"84\">30 | 40</text><line x1=\"120\" y1=\"38\" x2=\"60\" y2=\"65\" stroke=\"#64748b\"/><line x1=\"160\" y1=\"38\" x2=\"170\" y2=\"65\" stroke=\"#64748b\"/><line x1=\"200\" y1=\"38\" x2=\"280\" y2=\"65\" stroke=\"#64748b\"/><text x=\"170\" y=\"118\" fill=\"#64748b\">root node holds keys [10,25] and 3 child pointers</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "根節點含有 2 個鍵(10, 25)及 3 個子指標;所有葉節點在相同深度,確保 $O(\\log_t N)$ 的最壞情況保證。",
              "en": "The root node holds 2 keys (10, 25) and 3 child pointers; all leaf nodes are at the same depth, guaranteeing $O(\\log_t N)$ worst-case performance."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "操作",
                "en": "Operation"
              },
              {
                "zh": "時間",
                "en": "Time"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "搜尋",
                  "en": "search"
                },
                {
                  "zh": "$O(\\log_t N)$",
                  "en": "$O(\\log_t N)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "插入",
                  "en": "insert"
                },
                {
                  "zh": "$O(\\log_t N)$",
                  "en": "$O(\\log_t N)$"
                },
                {
                  "zh": "$O(\\log_t N)$",
                  "en": "$O(\\log_t N)$"
                }
              ],
              [
                {
                  "zh": "刪除",
                  "en": "delete"
                },
                {
                  "zh": "$O(\\log_t N)$",
                  "en": "$O(\\log_t N)$"
                },
                {
                  "zh": "$O(\\log_t N)$",
                  "en": "$O(\\log_t N)$"
                }
              ],
              [
                {
                  "zh": "空間合計",
                  "en": "Total Space"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "h \\leq \\log_t \\frac{N+1}{2}",
            "caption": {
              "zh": "B-Tree 高度嚴格上界為 $\\log_t \\frac{N+1}{2}$;$t$ 越大(節點越寬)高度越低,磁碟 I/O 越少。",
              "en": "B-Tree height upper bound is $\\log_t \\frac{N+1}{2}$; larger $t$ (wider nodes) means lower height and fewer disk I/Os."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "void splitChild(int i, BTreeNode* y) {\n    // Split y (full child at index i) and push median to this node\n    BTreeNode* z = new BTreeNode(y->t, y->leaf);\n    // z gets the upper half of y's keys\n    for (int j = 0; j < t - 1; j++)\n        z->keys.push_back(y->keys[j + t]);\n    if (!y->leaf) // z gets upper half of y's children\n        for (int j = 0; j < t; j++)\n            z->children.push_back(y->children[j + t]);\n    // Push median key up to this (parent) node\n    keys.insert(keys.begin() + i, y->keys[t - 1]);\n    y->keys.resize(t - 1); // trim y to lower half\n    children.insert(children.begin() + i + 1, z);\n}\n\nvoid insert(int k) {\n    if (root->keys.size() == 2 * t - 1) { // root is full: split it\n        BTreeNode* s = new BTreeNode(t, false);\n        s->children.push_back(root);\n        s->splitChild(0, root);\n        root = s;\n    }\n    root->insertNonFull(k);\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:極低樹高($O(\\log_t N)$),最小化磁碟 I/O 次數。",
                "en": "Pro: very low tree height ($O(\\log_t N)$) — minimizes disk I/O count."
              },
              {
                "zh": "優點:所有葉節點等深,保證最壞情況一致性。",
                "en": "Pro: all leaves at the same depth — consistent worst-case guarantee."
              },
              {
                "zh": "缺點:範圍查詢需在非葉節點間來回,不如 B+ Tree 高效。",
                "en": "Con: range queries must jump between non-leaf nodes — less efficient than B+ Tree."
              },
              {
                "zh": "缺點:刪除操作複雜(需借鍵或合併節點)。",
                "en": "Con: deletion is complex — requires borrowing keys or merging nodes."
              },
              {
                "zh": "適用:資料庫系統、檔案系統(如 ext4、NTFS)索引結構。",
                "en": "Use for database indexing and file system structures (ext4, NTFS)."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "每節點多鍵多子指標,樹高 $O(\\log_t N)$,有效減少磁碟 I/O。",
                "en": "Multiple keys and children per node; height $O(\\log_t N)$ — effective at reducing disk I/O."
              },
              {
                "zh": "節點滿時分裂並向上推送中間鍵;B-Tree 向上生長。",
                "en": "Full nodes split and push the median key upward; B-Trees grow upward."
              },
              {
                "zh": "資料庫索引基礎結構;B+ Tree 是其葉節點鏈接的擴展版本。",
                "en": "Foundation of database indexing; B+ Tree is the extension with linked leaf nodes."
              }
            ]
          }
        ]
      }
    ]
  },
  "tree-bplus": {
    "category": "Trees",
    "title": {
      "zh": "B+ 樹(資料庫索引標準)",
      "en": "B+ Tree (Database Index Standard)"
    },
    "slides": [
      {
        "heading": {
          "zh": "B+ 樹(資料庫索引標準)",
          "en": "B+ Tree (Database Index Standard)"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "B+ 樹是 B-Tree 的強化版:所有實際資料僅儲存於葉節點,內部節點只儲存路由用的鍵副本;所有葉節點以 `nextLeaf` 指標串成鏈結串列,使範圍查詢極為高效。廣泛用於 MySQL InnoDB、PostgreSQL。",
              "en": "B+ Tree is an enhanced B-Tree: all actual data resides only in leaf nodes; internal nodes hold only routing key copies. All leaf nodes are linked via `nextLeaf` pointers into a linked list, making range queries extremely efficient. Used by MySQL InnoDB and PostgreSQL."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "B+ 樹與 B-Tree 最關鍵的兩點區別:①所有資料在葉節點;②葉節點橫向連結。這使得範圍查詢只需下降至第一個葉節點,然後橫向掃描即可。",
              "en": "Two key differences from B-Tree: ① all data in leaf nodes; ② leaf nodes are horizontally linked. This enables range queries to descend once to the first leaf node, then scan horizontally."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "內部節點:僅存放路由鍵(鍵的副本),不含實際資料記錄。",
                "en": "Internal nodes: store only routing keys (key copies), no actual data records."
              },
              {
                "zh": "葉節點:儲存完整的鍵值對,並以 `nextLeaf` 指向下一葉節點。",
                "en": "Leaf nodes: store complete key-value pairs, with `nextLeaf` pointing to the next leaf."
              },
              {
                "zh": "範圍查詢:下降至起始葉節點後橫向遍訪所有相關葉節點。",
                "en": "Range query: descend to the start leaf, then traverse horizontally through linked leaves."
              },
              {
                "zh": "葉分裂時:中間鍵「複製」至父節點(不是移走),葉仍保留完整資料。",
                "en": "Leaf split: the median key is copied (not moved) up to the parent — the leaf retains all its data."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "插入:沿內部節點路由鍵向下找到對應葉節點。",
                "en": "Insert: follow internal routing keys downward to the target leaf node."
              },
              {
                "zh": "若葉節點未滿:在葉中有序插入鍵值對。",
                "en": "If leaf is not full: insert the key-value pair in sorted order within the leaf."
              },
              {
                "zh": "若葉節點已滿:分裂葉,將中間鍵的副本推送至父節點,更新 `nextLeaf` 鏈。",
                "en": "If leaf is full: split the leaf, copy the median key up to the parent, and update the `nextLeaf` chain."
              },
              {
                "zh": "範圍查詢 `[lo, hi]`:定位 `lo` 的葉節點,沿 `nextLeaf` 掃描直到超過 `hi`。",
                "en": "Range query `[lo, hi]`: locate the leaf for `lo`, then scan via `nextLeaf` until exceeding `hi`."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart TD\n  INNER[\"Internal: [20, 40]\"] --> L1[\"Leaf1: 10,15\\nnextLeaf=L2\"]\n  INNER --> L2[\"Leaf2: 20,30\\nnextLeaf=L3\"]\n  INNER --> L3[\"Leaf3: 40,50\\nnextLeaf=null\"]\n  L1 -->|\"nextLeaf\"| L2\n  L2 -->|\"nextLeaf\"| L3"
          }
        ]
      },
      {
        "heading": {
          "zh": "B+ 樹葉節點鏈結示意",
          "en": "B+ Tree Leaf Chain Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 130\" width=\"360\" height=\"130\"><g font-family=\"sans-serif\" font-size=\"11\" text-anchor=\"middle\"><rect x=\"130\" y=\"5\" width=\"100\" height=\"24\" rx=\"4\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"180\" y=\"22\">Internal: 20 | 40</text><rect x=\"10\" y=\"55\" width=\"90\" height=\"24\" rx=\"4\" fill=\"#dcfce7\" stroke=\"#16a34a\"/><text x=\"55\" y=\"72\">10 | 15</text><rect x=\"135\" y=\"55\" width=\"90\" height=\"24\" rx=\"4\" fill=\"#dcfce7\" stroke=\"#16a34a\"/><text x=\"180\" y=\"72\">20 | 30</text><rect x=\"260\" y=\"55\" width=\"90\" height=\"24\" rx=\"4\" fill=\"#dcfce7\" stroke=\"#16a34a\"/><text x=\"305\" y=\"72\">40 | 50</text><line x1=\"155\" y1=\"29\" x2=\"55\" y2=\"55\" stroke=\"#64748b\"/><line x1=\"180\" y1=\"29\" x2=\"180\" y2=\"55\" stroke=\"#64748b\"/><line x1=\"205\" y1=\"29\" x2=\"305\" y2=\"55\" stroke=\"#64748b\"/><line x1=\"100\" y1=\"67\" x2=\"135\" y2=\"67\" stroke=\"#dc2626\" stroke-width=\"2\" marker-end=\"url(#arr)\"/><line x1=\"225\" y1=\"67\" x2=\"260\" y2=\"67\" stroke=\"#dc2626\" stroke-width=\"2\"/><text x=\"117\" y=\"60\" fill=\"#dc2626\" font-size=\"9\">next</text><text x=\"242\" y=\"60\" fill=\"#dc2626\" font-size=\"9\">next</text><text x=\"180\" y=\"110\" fill=\"#64748b\">all data in leaves; horizontal scan for range queries</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "內部節點僅為路由;所有資料儲存在葉節點;紅色箭頭展示 `nextLeaf` 鏈,實現 $O(K)$ 範圍掃描。",
              "en": "Internal nodes are routing-only; all data lives in leaves. Red arrows show the `nextLeaf` chain enabling $O(K)$ range scan."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "操作",
                "en": "Operation"
              },
              {
                "zh": "時間",
                "en": "Time"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "點查詢",
                  "en": "point search"
                },
                {
                  "zh": "$O(\\log_t N)$",
                  "en": "$O(\\log_t N)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "插入",
                  "en": "insert"
                },
                {
                  "zh": "$O(\\log_t N)$",
                  "en": "$O(\\log_t N)$"
                },
                {
                  "zh": "$O(\\log_t N)$",
                  "en": "$O(\\log_t N)$"
                }
              ],
              [
                {
                  "zh": "範圍查詢 K 結果",
                  "en": "range query K results"
                },
                {
                  "zh": "$O(\\log_t N + K)$",
                  "en": "$O(\\log_t N + K)$"
                },
                {
                  "zh": "$O(K)$",
                  "en": "$O(K)$"
                }
              ],
              [
                {
                  "zh": "空間合計",
                  "en": "Total Space"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{range}}(K) = O(\\log_t N + K)",
            "caption": {
              "zh": "範圍查詢代價 = 樹高下降 $O(\\log_t N)$ + 橫向掃描 $K$ 個結果;是 B+ 樹相對於 B-Tree 最大的優勢。",
              "en": "Range query cost = tree descent $O(\\log_t N)$ + horizontal scan of $K$ results; this is B+ Tree's main advantage over B-Tree."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "class BPlusNode {\npublic:\n    vector<int> keys;\n    vector<BPlusNode*> children;\n    BPlusNode* nextLeaf; // leaf-level linked list\n    bool isLeaf;\n    int MAX;\n    BPlusNode(int maxKeys, bool leaf) : MAX(maxKeys), isLeaf(leaf), nextLeaf(nullptr) {}\n};\n\n// B+ Tree theory:\n// 1. All data resides ONLY in leaf nodes.\n// 2. Internal nodes hold routing key COPIES only.\n// 3. Leaves are chained: nextLeaf enables O(K) range scan.\n// Leaf split: copy median key UP (leaf keeps its data).\n// Internal split: push median key UP (key is removed from internal node).\nvoid insert(int k) {\n    if (!root) {\n        root = new BPlusNode(MAX, true);\n        root->keys.push_back(k);\n        return;\n    }\n    // descend to leaf, insert in sorted order,\n    // split and propagate upward if full\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:葉節點鏈結使範圍查詢極高效($O(\\log_t N + K)$),無需回溯。",
                "en": "Pro: linked leaves make range queries extremely efficient ($O(\\log_t N + K)$) without backtracking."
              },
              {
                "zh": "優點:內部節點不存資料,分支因子更大,樹高更低,磁碟 I/O 更少。",
                "en": "Pro: internal nodes store no data — higher branching factor, lower height, fewer disk I/Os."
              },
              {
                "zh": "缺點:資料只在葉節點,點查詢必須到達葉層,不如 B-Tree 的部分路徑命中。",
                "en": "Con: data only in leaves — point queries must always reach leaf level, unlike B-Tree's early hits."
              },
              {
                "zh": "缺點:葉分裂需維護 `nextLeaf` 鏈,刪除需修復指標,略複雜。",
                "en": "Con: leaf splits must maintain the `nextLeaf` chain; deletions require pointer repairs — slightly complex."
              },
              {
                "zh": "適用:所有需要範圍查詢的資料庫索引,如 MySQL InnoDB、PostgreSQL、SQLite。",
                "en": "Use for all database indexes requiring range queries: MySQL InnoDB, PostgreSQL, SQLite."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "內部節點僅為路由;所有資料集中在葉節點;葉以 `nextLeaf` 橫向串接。",
                "en": "Internal nodes are routing-only; all data at leaf level; leaves chained horizontally via `nextLeaf`."
              },
              {
                "zh": "範圍查詢 $O(\\log_t N + K)$:下降一次,橫向掃描;是 B+ 樹的決定性優勢。",
                "en": "Range query $O(\\log_t N + K)$: one descent + horizontal scan — B+ Tree's decisive advantage."
              },
              {
                "zh": "現代關聯式資料庫(MySQL、PostgreSQL)的標準索引結構。",
                "en": "Standard index structure of modern relational databases (MySQL, PostgreSQL)."
              }
            ]
          }
        ]
      }
    ]
  },
  "graph": {
    "category": "Graphs",
    "title": {
      "zh": "無向圖(鄰接矩陣)",
      "en": "Undirected Graph (Adjacency Matrix)"
    },
    "slides": [
      {
        "heading": {
          "zh": "無向圖(鄰接矩陣)",
          "en": "Undirected Graph (Adjacency Matrix)"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "無向圖以 $V \\times V$ 的二維陣列(鄰接矩陣)表示頂點間的連接關係;`adjMatrix[u][v] = 1` 代表邊 (u, v) 存在,且矩陣對稱確保雙向可達。",
              "en": "An undirected graph uses a $V \\times V$ 2-D array (adjacency matrix) to represent vertex connections. `adjMatrix[u][v] = 1` means edge (u, v) exists; symmetry of the matrix guarantees bidirectional reachability."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "鄰接矩陣以整數 0/1 記錄每對頂點之間是否存在邊。無向圖中 `adjMatrix[u][v]` 與 `adjMatrix[v][u]` 始終同步更新。",
              "en": "The adjacency matrix records 0/1 for every pair of vertices. In an undirected graph `adjMatrix[u][v]` and `adjMatrix[v][u]` are always updated together."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "`addEdge(u,v)`:同時設定 `adjMatrix[u][v] = adjMatrix[v][u] = 1`,保持對稱性。",
                "en": "`addEdge(u,v)`: sets both `adjMatrix[u][v]` and `adjMatrix[v][u]` to 1, maintaining symmetry."
              },
              {
                "zh": "邊存在查詢:直接讀取 `adjMatrix[u][v]`,時間 $O(1)$。",
                "en": "Edge existence query: read `adjMatrix[u][v]` directly — $O(1)$ time."
              },
              {
                "zh": "空間代價:固定佔用 $O(V^2)$,稀疏圖會浪費大量空間。",
                "en": "Space cost: always $O(V^2)$, wasteful for sparse graphs."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "初始化:建立 $V \\times V$ 的矩陣,全部填 0。",
                "en": "Initialise: create a $V \\times V$ matrix filled with 0."
              },
              {
                "zh": "addEdge(u,v):設定 `adjMatrix[u][v] = 1` 及 `adjMatrix[v][u] = 1`。",
                "en": "addEdge(u,v): set `adjMatrix[u][v] = 1` and `adjMatrix[v][u] = 1`."
              },
              {
                "zh": "邊查詢:讀取 `adjMatrix[u][v]`,若為 1 則邊存在。",
                "en": "Edge query: read `adjMatrix[u][v]`; if 1 the edge exists."
              },
              {
                "zh": "鄰居遍歷:掃描第 u 列所有欄位,收集值為 1 的索引。",
                "en": "Neighbour traversal: scan entire row u, collect indices where the value is 1."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  A[\"init\\nV×V zeros\"] -->|addEdge 0-1| B[\"M[0][1]=M[1][0]=1\"]\n  B -->|addEdge 1-2| C[\"M[1][2]=M[2][1]=1\"]\n  C -->|query 0-2| D[\"M[0][2]=0\\n(no edge)\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "鄰接矩陣示意",
          "en": "Adjacency Matrix Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 140\" width=\"320\" height=\"140\"><g font-family=\"sans-serif\" font-size=\"12\" text-anchor=\"middle\"><circle cx=\"50\" cy=\"70\" r=\"18\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"50\" y=\"75\">0</text><circle cx=\"140\" cy=\"20\" r=\"18\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"140\" y=\"25\">1</text><circle cx=\"140\" cy=\"120\" r=\"18\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"140\" y=\"125\">4</text><circle cx=\"230\" cy=\"20\" r=\"18\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"230\" y=\"25\">2</text><circle cx=\"230\" cy=\"120\" r=\"18\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"230\" y=\"125\">3</text><line x1=\"68\" y1=\"60\" x2=\"122\" y2=\"28\" stroke=\"#475569\"/><line x1=\"68\" y1=\"80\" x2=\"122\" y2=\"112\" stroke=\"#475569\"/><line x1=\"158\" y1=\"20\" x2=\"212\" y2=\"20\" stroke=\"#475569\"/><line x1=\"158\" y1=\"30\" x2=\"212\" y2=\"110\" stroke=\"#475569\"/><line x1=\"140\" y1=\"38\" x2=\"140\" y2=\"102\" stroke=\"#475569\"/><line x1=\"230\" y1=\"38\" x2=\"230\" y2=\"102\" stroke=\"#475569\"/><line x1=\"140\" y1=\"102\" x2=\"212\" y2=\"112\" stroke=\"#475569\"/></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "鄰接矩陣沿對角線對稱;此圖共 5 個頂點,其鄰接矩陣為 5×5 的對稱方陣。查詢與新增邊均為 $O(1)$,但空間始終為 $O(V^2)$。",
              "en": "The adjacency matrix is symmetric along the diagonal. Edge queries and additions are both $O(1)$, but space is always $O(V^2)$ regardless of edge count."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "操作",
                "en": "Operation"
              },
              {
                "zh": "時間",
                "en": "Time"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "新增邊 addEdge",
                  "en": "addEdge"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "查詢邊",
                  "en": "edge query"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "鄰居遍歷",
                  "en": "neighbour traversal"
                },
                {
                  "zh": "$O(V)$",
                  "en": "$O(V)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "空間合計",
                  "en": "Total Space"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "$O(V^2)$",
                  "en": "$O(V^2)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "S = O(V^2)",
            "caption": {
              "zh": "無論邊數多少,鄰接矩陣固定佔用 $V^2$ 個整數空間,稠密圖最划算,稀疏圖則浪費嚴重。",
              "en": "Regardless of edge count the matrix always uses $V^2$ integers — cost-efficient for dense graphs, wasteful for sparse ones."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "class Graph {\n    int V;\n    vector<vector<int>> adjMatrix;\n\npublic:\n    Graph(int vertices) {\n        V = vertices;\n        adjMatrix.resize(V, vector<int>(V, 0));\n    }\n\n    void addEdge(int u, int v) {\n        if (u >= 0 && u < V && v >= 0 && v < V) {\n            adjMatrix[u][v] = 1;\n            adjMatrix[v][u] = 1; // undirected: symmetric\n        }\n    }\n\n    void printGraph() {\n        for (int i = 0; i < V; i++) {\n            for (int j = 0; j < V; j++)\n                cout << adjMatrix[i][j] << \" \";\n            cout << endl;\n        }\n    }\n};"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:邊存在查詢為 $O(1)$,實作簡單直觀。",
                "en": "Pro: edge existence query is $O(1)$; implementation is simple and intuitive."
              },
              {
                "zh": "優點:對稠密圖(邊數接近 $V^2$)空間利用率高。",
                "en": "Pro: space-efficient for dense graphs where edge count approaches $V^2$."
              },
              {
                "zh": "缺點:空間固定 $O(V^2)$,稀疏圖浪費嚴重。",
                "en": "Con: fixed $O(V^2)$ space — highly wasteful for sparse graphs."
              },
              {
                "zh": "缺點:鄰居遍歷需掃描整列,代價 $O(V)$,不如鄰接串列的 $O(deg)$。",
                "en": "Con: neighbour traversal scans the whole row at $O(V)$, worse than the $O(\\deg)$ of an adjacency list."
              },
              {
                "zh": "適用:稠密圖、需要 $O(1)$ 邊查詢的場景,或圖規模小且實作優先考量簡單性時。",
                "en": "Use for dense graphs, $O(1)$ edge queries, or when graph is small and simplicity is preferred."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "以 $V \\times V$ 對稱矩陣表示無向圖;`adjMatrix[u][v] = adjMatrix[v][u]`。",
                "en": "A $V \\times V$ symmetric matrix represents the undirected graph; `adjMatrix[u][v] = adjMatrix[v][u]`."
              },
              {
                "zh": "邊查詢 $O(1)$;鄰居遍歷 $O(V)$;空間 $O(V^2)$。",
                "en": "Edge query $O(1)$; neighbour traversal $O(V)$; space $O(V^2)$."
              },
              {
                "zh": "稀疏圖建議改用鄰接串列以節省空間並加速遍歷。",
                "en": "For sparse graphs prefer adjacency lists to save space and speed up traversal."
              }
            ]
          }
        ]
      }
    ]
  },
  "tree-dsu": {
    "category": "Trees",
    "title": {
      "zh": "不相交集合（並查集）",
      "en": "Disjoint Set (Union-Find)"
    },
    "slides": [
      {
        "heading": {
          "zh": "不相交集合（並查集）",
          "en": "Disjoint Set (Union-Find)"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "並查集（Union-Find）以森林表示多個不相交集合，支援近 $O(1)$ 的合併與查詢操作，是 Kruskal 最小生成樹與連通性判斷的核心資料結構。",
              "en": "A Disjoint Set (Union-Find) represents multiple disjoint sets as a forest and supports near-$O(1)$ union and find operations — the core data structure for Kruskal's MST and connectivity queries."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "每個集合以樹表示，`parent[i]` 指向父節點，根節點的 `parent` 指向自身。`find` 沿父指標走到根；`union` 將一棵樹的根掛到另一棵樹的根下。",
              "en": "Each set is a tree where `parent[i]` points to the parent; the root satisfies `parent[root] == root`. `find` follows parent pointers to the root; `union` attaches one root under the other."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "路徑壓縮：`find` 回傳時把沿途節點直接連到根，大幅攤平後續查詢。",
                "en": "Path compression: during `find`, redirect every visited node straight to the root, flattening future lookups."
              },
              {
                "zh": "按秩合併：將秩（rank）較小的根掛到秩較大的根下，保持樹高低。",
                "en": "Union by rank: attach the root with smaller rank under the root with larger rank to keep tree height low."
              },
              {
                "zh": "兩者合用可達攤銷 $O(\\alpha(N))$ 時間，對所有實際 $N$ 幾乎等同 $O(1)$。",
                "en": "Together they achieve amortized $O(\\alpha(N))$ time — effectively $O(1)$ for all practical $N$."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "初始化：每個元素自成一個集合，`parent[i] = i`，`rank[i] = 0`。",
                "en": "Init: each element is its own set; `parent[i] = i`, `rank[i] = 0`."
              },
              {
                "zh": "`find(x)`：若 `parent[x] == x` 則返回 `x`，否則遞迴求 `find(parent[x])` 並做路徑壓縮。",
                "en": "`find(x)`: if `parent[x] == x` return `x`; otherwise recurse `find(parent[x])` and path-compress."
              },
              {
                "zh": "`union(a, b)`：分別找到兩集合的根，若根不同，將秩小的根掛到秩大的根下（秩相同時任一方掛另一方並令根秩加一）。",
                "en": "`union(a, b)`: find roots of both sets; if different, attach smaller-rank root under larger-rank root (if equal, pick one and increment its rank)."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart TD\n  R0[\"root: 0\"] --> N0A[\"1\"]\n  R2[\"root: 2\"] --> N2A[\"3\"]\n  R4[\"root: 4\"] --> N4A[\"5\"]\n  R6[\"root: 6\"] --> N6A[\"7\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "示意圖",
          "en": "Layout"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 80\" width=\"400\"><g font-family=\"monospace\" font-size=\"13\"><text x=\"0\" y=\"20\">parent: [0, 0, 2, 2, 4, 4, 6, 6]</text><text x=\"0\" y=\"40\">rank:   [1, 0, 1, 0, 1, 0, 1, 0]</text><text x=\"0\" y=\"60\">Sets: {0,1}  {2,3}  {4,5}  {6,7}</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "8 個元素經 4 次 `union(0,1)` `union(2,3)` `union(4,5)` `union(6,7)` 後形成 4 棵高度為 1 的樹；每棵樹的根秩為 1。",
              "en": "8 elements after 4 pairwise unions `union(0,1)` `union(2,3)` `union(4,5)` `union(6,7)` form 4 trees of height 1; each root has rank 1."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "操作",
                "en": "Operation"
              },
              {
                "zh": "時間",
                "en": "Time"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "初始化",
                  "en": "Init"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                }
              ],
              [
                {
                  "zh": "find（含路徑壓縮）",
                  "en": "find (with path compression)"
                },
                {
                  "zh": "$O(\\alpha(N))$",
                  "en": "$O(\\alpha(N))$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "unite（含按秩合併）",
                  "en": "unite (with union by rank)"
                },
                {
                  "zh": "$O(\\alpha(N))$",
                  "en": "$O(\\alpha(N))$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "O(\\alpha(N)) \\approx O(1) \\text{ for all practical } N",
            "caption": {
              "zh": "$\\alpha$ 為反阿克曼函數，對所有實際 $N$ 均 $\\leq 4$，故視為常數時間。",
              "en": "$\\alpha$ is the inverse Ackermann function; it is $\\leq 4$ for all practical $N$, making operations effectively constant time."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "struct DSU {\n    vector<int> p, r;\n    DSU(int n) : p(n), r(n, 0) {\n        for (int i = 0; i < n; i++)\n            p[i] = i;\n    }\n    int find(int x) {\n        return p[x] == x ? x : p[x] = find(p[x]); // path compression\n    }\n    bool unite(int a, int b) {\n        a = find(a);\n        b = find(b);\n        if (a == b)\n            return false;\n        if (r[a] < r[b])\n            swap(a, b);\n        p[b] = a; // union by rank\n        if (r[a] == r[b])\n            r[a]++;\n        return true;\n    }\n};"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點：實作簡單，攤銷近 $O(1)$，執行極快。",
                "en": "Pro: simple to implement; amortized near-$O(1)$; extremely fast in practice."
              },
              {
                "zh": "優點：應用廣泛——Kruskal 最小生成樹、網路連通性、影像分割等。",
                "en": "Pro: widely applicable — Kruskal's MST, network connectivity, image segmentation."
              },
              {
                "zh": "缺點：不支援高效的「拆分」或「取消合併」操作。",
                "en": "Con: does not support efficient split or un-union operations."
              },
              {
                "zh": "適用：需要快速判斷兩元素是否同集合或合併兩集合的場景。",
                "en": "Use when you need fast same-set queries and set-merge operations."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "以 `parent[]` 陣列 + 路徑壓縮 + 按秩合併，達到攤銷 $O(\\alpha(N))$ 操作。",
                "en": "parent[] array + path compression + union by rank → amortized $O(\\alpha(N))$ per operation."
              },
              {
                "zh": "對所有實際規模，$\\alpha(N) \\leq 4$，操作幾乎等同常數時間。",
                "en": "For all practical sizes, $\\alpha(N) \\leq 4$, making each operation effectively constant time."
              },
              {
                "zh": "是 Kruskal 最小生成樹的核心工具（見 graph-kruskal）。",
                "en": "The workhorse for Kruskal's MST (see graph-kruskal)."
              }
            ]
          }
        ]
      }
    ]
  },
  "tree-segment": {
    "category": "Trees",
    "title": {
      "zh": "線段樹",
      "en": "Segment Tree"
    },
    "slides": [
      {
        "heading": {
          "zh": "線段樹",
          "en": "Segment Tree"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "線段樹是一種二元樹結構，把陣列的每個區間對應到一個節點，讓區間查詢與區間更新都能在 $O(\\log n)$ 內完成。",
              "en": "A segment tree is a binary tree that maps each range of an array to a node, so both range queries and range updates run in $O(\\log n)$."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "每個節點負責一個區間 $[lo, hi]$ 並存放該區間的聚合值（此處為區間和）；葉節點對應單一元素，內部節點的值由兩個子節點合併而成。",
              "en": "Each node owns a range $[lo, hi]$ and stores that range's aggregate (here, the sum); leaves map to single elements, and an internal node's value is merged from its two children."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "區間查詢：從根下降，完全被覆蓋的節點直接取值，不相交則略過。",
                "en": "Range query: descend from the root — a fully covered node is taken whole, a disjoint node is skipped."
              },
              {
                "zh": "lazy propagation：區間更新時在被覆蓋的節點掛上「lazy 標記」，延後傳給子節點。",
                "en": "Lazy propagation: a range update tags a covered node with a lazy mark, deferring the work to its children."
              },
              {
                "zh": "lazy 標記在之後查詢或更新下降經過該節點時才被推下去。",
                "en": "A lazy tag is pushed down only when a later query or update descends through that node."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "區間更新 $[ql, qr]$：完全被覆蓋的節點掛 lazy 標記並更新其聚合值。",
                "en": "Range update $[ql, qr]$: a fully covered node gets a lazy tag and its aggregate is updated."
              },
              {
                "zh": "部分相交的節點先把自己的 lazy 標記推給子節點，再遞迴。",
                "en": "A partially overlapping node first pushes its own lazy tag to its children, then recurses."
              },
              {
                "zh": "區間查詢時同樣下降，經過帶 lazy 標記的節點就推下標記，確保讀到的值正確。",
                "en": "A range query descends the same way, pushing down any lazy tag it passes so the value it reads is correct."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart TD\n  A[\"visit node\"] --> B[\"range disjoint?\"]\n  B -->|yes| C[\"skip\"]\n  B -->|no| D[\"fully covered?\"]\n  D -->|yes| E[\"take value or apply lazy\"]\n  D -->|no| F[\"push lazy down then recurse\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "示意圖",
          "en": "Layout"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 120\" width=\"360\"><g font-family=\"monospace\" font-size=\"11\"><rect x=\"150\" y=\"6\" width=\"60\" height=\"24\" fill=\"none\" stroke=\"#1e40af\"/><text x=\"180\" y=\"22\" text-anchor=\"middle\">[0,7]</text><rect x=\"70\" y=\"50\" width=\"60\" height=\"24\" fill=\"none\" stroke=\"#1e40af\"/><text x=\"100\" y=\"66\" text-anchor=\"middle\">[0,3]</text><rect x=\"230\" y=\"50\" width=\"60\" height=\"24\" fill=\"#fef3c7\" stroke=\"#f59e0b\"/><text x=\"260\" y=\"66\" text-anchor=\"middle\">[4,7] +3</text><line x1=\"180\" y1=\"30\" x2=\"100\" y2=\"50\" stroke=\"#cbd5e1\"/><line x1=\"180\" y1=\"30\" x2=\"260\" y2=\"50\" stroke=\"#cbd5e1\"/><text x=\"10\" y=\"100\">node [4,7] carries a lazy tag +3</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "visualizer 以一棵 15 節點的線段樹腳本化呈現：查詢 → 區間更新 → 再查詢，讓 lazy 標記的產生與下推清楚可見。",
              "en": "The visualizer runs a scripted 15-node segment tree — query, then range update, then query again — making the creation and push-down of lazy tags clearly visible."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "操作",
                "en": "Operation"
              },
              {
                "zh": "複雜度",
                "en": "Complexity"
              }
            ],
            "rows": [
              [
                {
                  "zh": "建樹",
                  "en": "build"
                },
                {
                  "zh": "$O(n)$",
                  "en": "$O(n)$"
                }
              ],
              [
                {
                  "zh": "區間查詢",
                  "en": "range query"
                },
                {
                  "zh": "$O(\\log n)$",
                  "en": "$O(\\log n)$"
                }
              ],
              [
                {
                  "zh": "區間更新（lazy）",
                  "en": "range update (lazy)"
                },
                {
                  "zh": "$O(\\log n)$",
                  "en": "$O(\\log n)$"
                }
              ],
              [
                {
                  "zh": "空間",
                  "en": "space"
                },
                {
                  "zh": "$O(n)$",
                  "en": "$O(n)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{query}}(n) = O(\\log n)",
            "caption": {
              "zh": "查詢路徑在每一層最多展開常數個節點，故與樹高 $\\log n$ 成正比。",
              "en": "A query expands only a constant number of nodes per level, so its cost is proportional to the tree height $\\log n$."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "void update(int node, int lo, int hi, int ql, int qr, long long val) {\n    if (qr < lo || hi < ql)\n        return;\n    if (ql <= lo && hi <= qr) {\n        applyLazy(node, lo, hi, val);\n        return;\n    }\n    pushDown(node, lo, hi);\n    int mid = (lo + hi) / 2;\n    update(2 * node, lo, mid, ql, qr, val);\n    update(2 * node + 1, mid + 1, hi, ql, qr, val);\n    tree[node] = tree[2 * node] + tree[2 * node + 1];\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點：同時支援區間查詢與區間更新，皆為 $O(\\log n)$。",
                "en": "Pro: supports both range queries and range updates, each in $O(\\log n)$."
              },
              {
                "zh": "優點：聚合函式可替換（和、最小值、最大值、GCD 等）。",
                "en": "Pro: the aggregate is swappable — sum, min, max, gcd, and so on."
              },
              {
                "zh": "缺點：實作較 Fenwick 樹複雜，常數較大。",
                "en": "Con: more complex to implement than a Fenwick tree, with a larger constant factor."
              },
              {
                "zh": "適用：需要區間更新、或需要非加法聚合的場景。",
                "en": "Use when range updates are needed, or when the aggregate is not plain addition."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "把陣列區間組成二元樹，查詢與更新沿樹高進行。",
                "en": "Array ranges form a binary tree; queries and updates run along the tree height."
              },
              {
                "zh": "lazy propagation 把區間更新延後到真正需要時才下推。",
                "en": "Lazy propagation defers a range update, pushing it down only when needed."
              },
              {
                "zh": "區間查詢與區間更新皆為 $O(\\log n)$。",
                "en": "Both range query and range update are $O(\\log n)$."
              }
            ]
          }
        ]
      }
    ]
  },
  "deque": {
    "category": "Linear Structures",
    "title": {
      "zh": "雙端佇列",
      "en": "Deque"
    },
    "slides": [
      {
        "heading": {
          "zh": "雙端佇列",
          "en": "Deque (Double-Ended Queue)"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "雙端佇列允許在頭端與尾端都進行插入與刪除;以雙向串列實作時,四種端點操作皆為 $O(1)$。",
              "en": "A deque (double-ended queue) allows insertion and removal at both the front and the back; implemented as a doubly-linked list, all four end operations are $O(1)$."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "每個節點除了資料外,同時持有 `prev` 與 `next` 兩個指標。類別維護 `head` 與 `tail` 兩個指標,因此兩端都能在常數時間存取與更新。",
              "en": "Each node holds two pointers, `prev` and `next`, in addition to its data. The class keeps both a `head` and a `tail` pointer, so either end can be accessed and updated in constant time."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "是堆疊與佇列的推廣:限制只用一端即退化為堆疊或佇列。",
                "en": "Generalizes stack and queue: restrict it to one end and it degenerates into a stack or a queue."
              },
              {
                "zh": "雙向串列讓刪除尾端也是 $O(1)$,單向串列做不到。",
                "en": "The doubly-linked list makes back-removal $O(1)$ too — a singly-linked list cannot."
              },
              {
                "zh": "無固定容量上限,空間隨元素數量成長。",
                "en": "No fixed capacity; space grows with the number of elements."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "`pushFront(v)`:新節點的 `next` 指向舊 `head`,舊 `head` 的 `prev` 指向新節點,更新 `head`。",
                "en": "`pushFront(v)`: the new node's `next` points to the old `head`, the old `head`'s `prev` points to the new node, then update `head`."
              },
              {
                "zh": "`pushBack(v)`:對稱地操作 `tail`。",
                "en": "`pushBack(v)`: the symmetric operation on `tail`."
              },
              {
                "zh": "`popFront` / `popBack`:斷開端點節點並更新對應指標;若清空則 `head` 與 `tail` 皆設為 null。",
                "en": "`popFront` / `popBack`: detach the end node and update the corresponding pointer; if the deque becomes empty, set both `head` and `tail` to null."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  H[\"head\"] --> A[\"5\"]\n  A <--> B[\"10\"]\n  B <--> C[\"20\"]\n  C --> T[\"tail\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "示意圖",
          "en": "Layout"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 70\" width=\"380\"><g font-family=\"monospace\" font-size=\"13\"><text x=\"0\" y=\"25\">head                          tail</text><text x=\"0\" y=\"50\">null &lt;-&gt; 5 &lt;-&gt; 10 &lt;-&gt; 20 &lt;-&gt; null</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "visualizer 以水平節點列呈現,兩端標示 head 與 tail;四顆按鈕分別對應四種端點操作。",
              "en": "The visualizer shows a horizontal row of nodes with head and tail marked at the ends; four buttons map to the four end operations."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "操作",
                "en": "Operation"
              },
              {
                "zh": "時間",
                "en": "Time"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "pushFront / pushBack",
                  "en": "pushFront / pushBack"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "popFront / popBack",
                  "en": "popFront / popBack"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "依索引存取",
                  "en": "access by index"
                },
                {
                  "zh": "$O(n)$",
                  "en": "$O(n)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "整體空間",
                  "en": "Total Space"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "$O(n)$",
                  "en": "$O(n)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{push}} = T_{\\text{pop}} = O(1)",
            "caption": {
              "zh": "四種端點操作皆為常數時間,與元素數量無關。",
              "en": "All four end operations run in constant time, independent of the element count."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "struct Node {\n    int val;\n    Node* prev;\n    Node* next;\n    Node(int v) : val(v), prev(nullptr), next(nullptr) {}\n};\n\nvoid pushFront(int v) {\n    Node* node = new Node(v);\n    if (!head) {\n        head = tail = node;\n    } else {\n        node->next = head;\n        head->prev = node;\n        head = node;\n    }\n    count++;\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:兩端插入與刪除皆 $O(1)$,比單向串列更靈活。",
                "en": "Pro: $O(1)$ insertion and removal at both ends — more flexible than a singly-linked list."
              },
              {
                "zh": "優點:可同時當作堆疊或佇列使用。",
                "en": "Pro: usable as a stack and as a queue at the same time."
              },
              {
                "zh": "缺點:每個節點多一個指標,記憶體開銷略高;隨機存取仍是 $O(n)$。",
                "en": "Con: an extra pointer per node raises memory overhead slightly; random access is still $O(n)$."
              },
              {
                "zh": "適用:滑動視窗、雙端工作佇列、需要兩端操作的演算法(如 0-1 BFS)。",
                "en": "Use for sliding-window problems, double-ended work queues, and algorithms needing both-end access (e.g. 0-1 BFS)."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "雙向串列 + head/tail 指標;四種端點操作皆 $O(1)$。",
                "en": "Doubly-linked list + head/tail pointers; all four end operations are $O(1)$."
              },
              {
                "zh": "是堆疊與佇列的共同推廣。",
                "en": "A common generalization of both the stack and the queue."
              },
              {
                "zh": "空間 $O(n)$,每節點兩個指標。",
                "en": "Space $O(n)$, two pointers per node."
              }
            ]
          }
        ]
      }
    ]
  },
  "graph-adjlist": {
    "category": "Graphs",
    "title": {
      "zh": "鄰接串列",
      "en": "Adjacency List"
    },
    "slides": [
      {
        "heading": {
          "zh": "鄰接串列",
          "en": "Adjacency List"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "以每個頂點為起點的鏈結串列來表示圖的邊；對稀疏圖比鄰接矩陣更省記憶體。",
              "en": "Represent a graph by, for each vertex, a linked list of its neighbors; far more space-efficient than an adjacency matrix on sparse graphs."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "一個大小為 $V$ 的陣列，每格 `adj[v]` 是一條串列，儲存 $v$ 的所有鄰居。無向圖中每條邊 $(u, v)$ 同時加進 `adj[u]` 與 `adj[v]`。",
              "en": "An array of size $V$ where each cell `adj[v]` is a list storing every neighbor of $v$. For an undirected graph, each edge $(u, v)$ is appended to both `adj[u]` and `adj[v]`."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "空間 $O(V + E)$；對稀疏圖明顯優於矩陣的 $O(V^2)$。",
                "en": "Space $O(V + E)$; clearly beats the matrix's $O(V^2)$ on sparse graphs."
              },
              {
                "zh": "遍歷某頂點的鄰居 $O(\\deg(v))$，與該頂點度數成正比。",
                "en": "Iterating $v$'s neighbors is $O(\\deg(v))$, proportional to its degree."
              },
              {
                "zh": "判斷某條邊存在需 $O(\\deg(v))$；矩陣為 $O(1)$。",
                "en": "Edge-exists query is $O(\\deg(v))$ here vs $O(1)$ in a matrix."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "建立大小為 $V$ 的串列陣列，每格初始為空。",
                "en": "Create an array of $V$ empty lists."
              },
              {
                "zh": "插入邊 $(u, v)$ 時，把 $v$ 追加到 `adj[u]`，把 $u$ 追加到 `adj[v]`（無向圖）。",
                "en": "To insert edge $(u, v)$, append $v$ to `adj[u]` and $u$ to `adj[v]` (undirected)."
              },
              {
                "zh": "遍歷頂點 $u$ 的所有鄰居時，逐項走 `adj[u]` 串列。",
                "en": "To iterate all neighbors of $u$, walk through `adj[u]`."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  V0[\"adj[0]\"] --> A[1] --> B[4] --> N0[null]\n  V1[\"adj[1]\"] --> C[0] --> D[2] --> E[3] --> F[4] --> N1[null]\n  V2[\"adj[2]\"] --> G[1] --> H[3] --> N2[null]\n  V3[\"adj[3]\"] --> I[1] --> J[2] --> K[4] --> N3[null]\n  V4[\"adj[4]\"] --> L[0] --> M[1] --> O[3] --> N4[null]"
          }
        ]
      },
      {
        "heading": {
          "zh": "示意圖",
          "en": "Layout"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 110\" width=\"360\"><g font-family=\"monospace\" font-size=\"13\"><text x=\"0\"   y=\"20\">[0] -&gt; 1 -&gt; 4 -&gt; null</text><text x=\"0\"   y=\"40\">[1] -&gt; 0 -&gt; 2 -&gt; 3 -&gt; 4 -&gt; null</text><text x=\"0\"   y=\"60\">[2] -&gt; 1 -&gt; 3 -&gt; null</text><text x=\"0\"   y=\"80\">[3] -&gt; 1 -&gt; 2 -&gt; 4 -&gt; null</text><text x=\"0\"   y=\"100\">[4] -&gt; 0 -&gt; 1 -&gt; 3 -&gt; null</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "同一張 5 節點圖在 visualizer 裡以這樣的串列形式呈現；對照矩陣表示法可看出空間差異。",
              "en": "The same 5-node graph rendered as adjacency lists; compare with the matrix representation to see the space tradeoff."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "操作",
                "en": "Operation"
              },
              {
                "zh": "時間",
                "en": "Time"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "建構",
                  "en": "Build"
                },
                {
                  "zh": "$O(V + E)$",
                  "en": "$O(V + E)$"
                },
                {
                  "zh": "$O(V + E)$",
                  "en": "$O(V + E)$"
                }
              ],
              [
                {
                  "zh": "插入邊",
                  "en": "addEdge"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "遍歷鄰居",
                  "en": "iterate neighbors"
                },
                {
                  "zh": "$O(\\deg(v))$",
                  "en": "$O(\\deg(v))$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "邊查詢",
                  "en": "edge query"
                },
                {
                  "zh": "$O(\\deg(v))$",
                  "en": "$O(\\deg(v))$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "空間合計",
                  "en": "Total Space"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "$O(V + E)$",
                  "en": "$O(V + E)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "O(V + E) \\;\\ll\\; O(V^2) \\text{ when } E \\ll V^2",
            "caption": {
              "zh": "稀疏圖（$E \\ll V^2$）時鄰接串列的空間明顯較佳。",
              "en": "For sparse graphs ($E \\ll V^2$), the adjacency list is substantially more space-efficient."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "class Graph {\n    int V;\n    vector<list<int>> adj;\n\npublic:\n    Graph(int v) : V(v), adj(v) {}\n    void addEdge(int u, int v) {\n        adj[u].push_back(v);\n        adj[v].push_back(u);\n    }\n};"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點：稀疏圖空間 $O(V+E)$ 比矩陣 $O(V^2)$ 小很多。",
                "en": "Pro: $O(V+E)$ space for sparse graphs vs $O(V^2)$ for matrix."
              },
              {
                "zh": "優點：遍歷鄰居只走 $\\deg(v)$ 個元素，不需掃整列。",
                "en": "Pro: iterating neighbors visits only $\\deg(v)$ items, not a full row."
              },
              {
                "zh": "缺點：邊查詢需走串列（$O(\\deg(v))$），矩陣 $O(1)$。",
                "en": "Con: edge query is $O(\\deg(v))$ vs $O(1)$ for matrix."
              },
              {
                "zh": "適用：稀疏圖、邊集合操作為主、需要遍歷鄰居的演算法（BFS / DFS / Dijkstra）。",
                "en": "Use for sparse graphs, edge-iteration-heavy algorithms (BFS / DFS / Dijkstra)."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "陣列 + 串列；每邊存兩次（無向）。",
                "en": "Array + lists; each edge stored twice for undirected."
              },
              {
                "zh": "空間 $O(V+E)$，遍歷鄰居 $O(\\deg(v))$。",
                "en": "Space $O(V+E)$, iterate neighbors $O(\\deg(v))$."
              },
              {
                "zh": "對稀疏圖是首選；BFS / DFS / Dijkstra / Kruskal 內部皆使用此表示。",
                "en": "Default representation for sparse graphs; used internally by BFS / DFS / Dijkstra / Kruskal."
              }
            ]
          }
        ]
      }
    ]
  },
  "graph-kruskal": {
    "category": "Graphs",
    "title": {
      "zh": "Kruskal 最小生成樹",
      "en": "Kruskal Minimum Spanning Tree"
    },
    "slides": [
      {
        "heading": {
          "zh": "Kruskal 最小生成樹",
          "en": "Kruskal Minimum Spanning Tree"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "Kruskal 演算法貪心地依權重由小到大選取邊,並以 Disjoint Set Union(DSU / Union-Find)偵測環路,從而在 $O(E \\log E)$ 時間內建構最小生成樹(MST)。",
              "en": "Kruskal's algorithm greedily picks edges in ascending weight order and uses Disjoint Set Union (DSU / Union-Find) to detect cycles, building a Minimum Spanning Tree (MST) in $O(E \\log E)$ time."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "MST 包含連通圖中所有頂點但邊數最少(恰好 $V-1$ 條)且總權重最小的子圖。Kruskal 的關鍵在於用 DSU 以近乎 $O(1)$ 的代價判斷兩頂點是否已連通。",
              "en": "An MST spans all vertices with exactly $V-1$ edges and minimum total weight. Kruskal's key insight is using DSU to check connectivity of two vertices in near-$O(1)$ amortized time."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "DSU `find(x)`:帶路徑壓縮,回傳 x 所在集合的根節點。",
                "en": "DSU `find(x)`: with path compression, returns the root of x's set."
              },
              {
                "zh": "DSU `unite(a,b)`:合併兩集合;若已在同一集合則回傳 false(代表環路)。",
                "en": "DSU `unite(a,b)`: merges two sets; returns false if already in the same set (cycle detected)."
              },
              {
                "zh": "邊依權重排序後依序嘗試加入 MST;取到 $V-1$ 條邊即完成。",
                "en": "Edges are sorted by weight and greedily accepted; stop when $V-1$ edges are collected."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "將所有邊依權重升冪排序。",
                "en": "Sort all edges by weight in ascending order."
              },
              {
                "zh": "初始化 DSU:每個頂點各自為一個集合。",
                "en": "Initialise DSU: each vertex is its own set."
              },
              {
                "zh": "依序取出最輕的邊 (u,v,w);若 u 與 v 不在同一集合,加入 MST 並合併集合。",
                "en": "Take the lightest edge (u,v,w); if u and v are in different sets, add it to MST and merge sets."
              },
              {
                "zh": "重複直至 MST 包含 $V-1$ 條邊。",
                "en": "Repeat until MST has $V-1$ edges."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  A[\"Sort edges\\nby weight\"] --> B[\"Init DSU\\n(V sets)\"]\n  B --> C[\"Pick min edge\\n(u,v,w)\"]\n  C --> D{\"same set?\"}\n  D -->|\"yes (cycle)\"| C\n  D -->|no| E[\"Add to MST\\nunite(u,v)\"]\n  E --> F{\"V-1 edges?\"}\n  F -->|no| C\n  F -->|yes| G[\"MST complete\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "MST 示意圖",
          "en": "MST Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 160\" width=\"300\" height=\"160\"><g font-family=\"sans-serif\" font-size=\"11\" text-anchor=\"middle\"><circle cx=\"50\" cy=\"80\" r=\"16\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"50\" y=\"85\">0</text><circle cx=\"130\" cy=\"30\" r=\"16\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"130\" y=\"35\">1</text><circle cx=\"130\" cy=\"130\" r=\"16\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"130\" y=\"135\">2</text><circle cx=\"220\" cy=\"80\" r=\"16\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"220\" y=\"85\">3</text><circle cx=\"270\" cy=\"130\" r=\"16\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"270\" y=\"135\">4</text><line x1=\"65\" y1=\"72\" x2=\"115\" y2=\"38\" stroke=\"#16a34a\" stroke-width=\"2.5\"/><text x=\"82\" y=\"48\" fill=\"#16a34a\" font-weight=\"bold\">4</text><line x1=\"130\" y1=\"46\" x2=\"130\" y2=\"114\" stroke=\"#16a34a\" stroke-width=\"2.5\"/><text x=\"118\" y=\"83\" fill=\"#16a34a\" font-weight=\"bold\">1</text><line x1=\"145\" y1=\"120\" x2=\"205\" y2=\"90\" stroke=\"#16a34a\" stroke-width=\"2.5\"/><text x=\"183\" y=\"99\" fill=\"#16a34a\" font-weight=\"bold\">2</text><line x1=\"146\" y1=\"130\" x2=\"254\" y2=\"130\" stroke=\"#16a34a\" stroke-width=\"2.5\"/><text x=\"200\" y=\"124\" fill=\"#16a34a\" font-weight=\"bold\">5</text><text x=\"150\" y=\"155\" fill=\"#475569\">MST weight = 1+2+4+5 = 12</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "綠色邊即 MST 的 4 條邊:(1,2,w=1),(2,3,w=2),(0,1,w=4),(2,4,w=5),總重 12。環路邊如 (1,3) 和 (0,2) 被 DSU 排除。",
              "en": "Green edges form the MST: (1,2,w=1), (2,3,w=2), (0,1,w=4), (2,4,w=5), total weight 12. Cycle edges such as (1,3) and (0,2) are rejected by DSU."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "階段",
                "en": "Phase"
              },
              {
                "zh": "時間",
                "en": "Time"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "排序邊",
                  "en": "Sort edges"
                },
                {
                  "zh": "$O(E \\log E)$",
                  "en": "$O(E \\log E)$"
                },
                {
                  "zh": "$O(E)$",
                  "en": "$O(E)$"
                }
              ],
              [
                {
                  "zh": "DSU 操作(E次)",
                  "en": "DSU ops (E times)"
                },
                {
                  "zh": "$O(E \\alpha(V))$",
                  "en": "$O(E \\alpha(V))$"
                },
                {
                  "zh": "$O(V)$",
                  "en": "$O(V)$"
                }
              ],
              [
                {
                  "zh": "總時間",
                  "en": "Total Time"
                },
                {
                  "zh": "$O(E \\log E)$",
                  "en": "$O(E \\log E)$"
                },
                {
                  "zh": "—",
                  "en": "—"
                }
              ],
              [
                {
                  "zh": "空間合計",
                  "en": "Total Space"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "$O(V + E)$",
                  "en": "$O(V + E)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{Kruskal}} = O(E \\log E)",
            "caption": {
              "zh": "排序主導整體複雜度;DSU 以反阿克曼函數 $\\alpha(V)$ 的均攤代價近似 $O(1)$,可忽略。",
              "en": "Sorting dominates the total complexity; DSU operations are amortized $O(\\alpha(V)) \\approx O(1)$ per operation."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "struct DSU {\n    vector<int> p, r;\n    DSU(int n) : p(n), r(n, 0) {\n        for (int i = 0; i < n; i++)\n            p[i] = i;\n    }\n    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }\n    bool unite(int a, int b) {\n        a = find(a);\n        b = find(b);\n        if (a == b)\n            return false; // cycle\n        if (r[a] < r[b])\n            swap(a, b);\n        p[b] = a;\n        if (r[a] == r[b])\n            r[a]++;\n        return true;\n    }\n};\n\n// Kruskal MST\nsort(edges.begin(), edges.end(), [](const Edge& a, const Edge& b) { return a.w < b.w; });\nDSU dsu(V);\nvector<Edge> mst;\nfor (const auto& e : edges) {\n    if (dsu.unite(e.u, e.v)) {\n        mst.push_back(e);\n        if ((int)mst.size() == V - 1)\n            break;\n    }\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:以邊為中心,適合稀疏圖($E \\ll V^2$)。",
                "en": "Pro: edge-centric — well-suited for sparse graphs ($E \\ll V^2$)."
              },
              {
                "zh": "優點:DSU 實作簡單,可離線排序後批次處理。",
                "en": "Pro: DSU implementation is concise; edges can be sorted offline and processed in bulk."
              },
              {
                "zh": "缺點:需事先知道所有邊才能排序,不適用動態邊插入場景。",
                "en": "Con: requires all edges upfront for sorting — unsuitable for dynamic edge insertions."
              },
              {
                "zh": "缺點:相較 Prim 演算法,在稠密圖上效率較低。",
                "en": "Con: less efficient than Prim's algorithm on dense graphs."
              },
              {
                "zh": "適用:稀疏加權連通圖的 MST,如網路佈線、電路設計。",
                "en": "Use for MST of sparse weighted connected graphs: network cabling, circuit design."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "排序邊 + DSU 偵測環路:$O(E \\log E)$ 時間建構 MST。",
                "en": "Sort edges + DSU cycle detection: MST built in $O(E \\log E)$ time."
              },
              {
                "zh": "MST 恰有 $V-1$ 條邊,覆蓋所有頂點且總權重最小。",
                "en": "MST has exactly $V-1$ edges, spans all vertices with minimum total weight."
              },
              {
                "zh": "最佳用於稀疏圖;Prim 演算法在稠密圖上更佳。",
                "en": "Best for sparse graphs; Prim's algorithm is preferred for dense graphs."
              },
              {
                "zh": "Union-Find 的詳細解說與視覺化:見 `tree-dsu`。",
                "en": "For a detailed walkthrough and visualization of Union-Find, see `tree-dsu`."
              }
            ]
          }
        ]
      }
    ]
  },
  "graph-dijkstra": {
    "category": "Graphs",
    "title": {
      "zh": "Dijkstra 最短路徑",
      "en": "Dijkstra Shortest Path"
    },
    "slides": [
      {
        "heading": {
          "zh": "Dijkstra 最短路徑",
          "en": "Dijkstra Shortest Path"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "Dijkstra 演算法以貪心策略從源點出發,每次選取距離最小的未訪問頂點並鬆弛(relax)其鄰邊,於 $O((V+E)\\log V)$ 時間(binary heap)內求得源點到所有頂點的最短路徑。",
              "en": "Dijkstra's algorithm greedily selects the unvisited vertex with minimum distance, then relaxes its outgoing edges. With a binary heap it runs in $O((V+E)\\log V)$ and finds shortest paths from a source to all vertices."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "維護一個距離陣列 `dist[]`,初始源點為 0,其餘為 INF。優先佇列(min-heap)保證每次取出的頂點距離已是最短;一旦頂點被訪問,其距離不再更新。",
              "en": "Maintain a distance array `dist[]` initialised to INF except the source (0). A min-heap priority queue ensures the next vertex popped has the smallest known distance; once visited, a vertex's distance is final."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "relax:若 `dist[u] + w(u,v) < dist[v]`,更新 `dist[v]` 並將 (dist[v], v) 推入優先佇列。",
                "en": "relax: if `dist[u] + w(u,v) < dist[v]`, update `dist[v]` and push (dist[v], v) into the priority queue."
              },
              {
                "zh": "惰性刪除:已訪問的頂點若再次從佇列彈出則直接跳過。",
                "en": "Lazy deletion: if a popped vertex is already visited, skip it."
              },
              {
                "zh": "限制:邊權必須非負;負邊請改用 Bellman-Ford。",
                "en": "Limitation: edge weights must be non-negative; use Bellman-Ford for negative weights."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "初始化 `dist[source]=0`,其餘為 INF;源點推入優先佇列。",
                "en": "Initialise `dist[source]=0`, all others INF; push source into the priority queue."
              },
              {
                "zh": "彈出距離最小的頂點 u;若已訪問則跳過。",
                "en": "Pop vertex u with minimum distance; skip if already visited."
              },
              {
                "zh": "標記 u 為已訪問;對 u 的每條鄰邊 (u,v,w) 執行 relax。",
                "en": "Mark u as visited; relax each edge (u,v,w) of u."
              },
              {
                "zh": "重複直至優先佇列為空;此時 `dist[]` 存有所有最短距離。",
                "en": "Repeat until the priority queue is empty; `dist[]` then holds all shortest distances."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  A[\"dist=INF\\npush source\"] --> B[\"pop min u\"]\n  B --> C{\"visited?\"}\n  C -->|yes| B\n  C -->|no| D[\"mark visited\\nrelax edges\"]\n  D --> E{\"PQ empty?\"}\n  E -->|no| B\n  E -->|yes| F[\"dist final\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "最短路徑示意圖",
          "en": "Shortest Path Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 160\" width=\"320\" height=\"160\"><g font-family=\"sans-serif\" font-size=\"11\" text-anchor=\"middle\"><circle cx=\"40\" cy=\"80\" r=\"16\" fill=\"#fef9c3\" stroke=\"#ca8a04\"/><text x=\"40\" y=\"85\">0</text><text x=\"40\" y=\"65\" fill=\"#ca8a04\" font-size=\"10\">d=0</text><circle cx=\"130\" cy=\"30\" r=\"16\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"130\" y=\"35\">1</text><text x=\"130\" y=\"18\" fill=\"#2563eb\" font-size=\"10\">d=3</text><circle cx=\"130\" cy=\"130\" r=\"16\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"130\" y=\"135\">2</text><text x=\"130\" y=\"150\" fill=\"#2563eb\" font-size=\"10\">d=1</text><circle cx=\"220\" cy=\"80\" r=\"16\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"220\" y=\"85\">3</text><text x=\"220\" y=\"68\" fill=\"#2563eb\" font-size=\"10\">d=2</text><circle cx=\"290\" cy=\"80\" r=\"16\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"290\" y=\"85\">4</text><text x=\"290\" y=\"68\" fill=\"#2563eb\" font-size=\"10\">d=5</text><line x1=\"56\" y1=\"70\" x2=\"114\" y2=\"38\" stroke=\"#475569\"/><text x=\"80\" y=\"47\" fill=\"#475569\">4</text><line x1=\"56\" y1=\"90\" x2=\"114\" y2=\"122\" stroke=\"#16a34a\" stroke-width=\"2.5\"/><text x=\"80\" y=\"113\" fill=\"#16a34a\" font-weight=\"bold\">1</text><line x1=\"146\" y1=\"120\" x2=\"204\" y2=\"90\" stroke=\"#16a34a\" stroke-width=\"2.5\"/><text x=\"183\" y=\"100\" fill=\"#16a34a\" font-weight=\"bold\">1</text><line x1=\"130\" y1=\"46\" x2=\"130\" y2=\"114\" stroke=\"#16a34a\" stroke-width=\"2.5\"/><text x=\"118\" y=\"83\" fill=\"#16a34a\" font-weight=\"bold\">2</text><line x1=\"236\" y1=\"80\" x2=\"274\" y2=\"80\" stroke=\"#16a34a\" stroke-width=\"2.5\"/><text x=\"256\" y=\"74\" fill=\"#16a34a\" font-weight=\"bold\">3</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "從節點 0 出發的最短距離:d[0]=0, d[1]=3(0→2→1), d[2]=1(0→2), d[3]=2(0→2→3), d[4]=5(0→2→3→4)。綠色邊為最短路徑樹。",
              "en": "Shortest distances from node 0: d[0]=0, d[1]=3 (0→2→1), d[2]=1 (0→2), d[3]=2 (0→2→3), d[4]=5 (0→2→3→4). Green edges form the shortest-path tree."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "階段",
                "en": "Phase"
              },
              {
                "zh": "時間",
                "en": "Time"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "初始化",
                  "en": "Initialisation"
                },
                {
                  "zh": "$O(V)$",
                  "en": "$O(V)$"
                },
                {
                  "zh": "$O(V)$",
                  "en": "$O(V)$"
                }
              ],
              [
                {
                  "zh": "PQ 操作(V次)",
                  "en": "PQ ops (V pops)"
                },
                {
                  "zh": "$O(V \\log V)$",
                  "en": "$O(V \\log V)$"
                },
                {
                  "zh": "$O(V)$",
                  "en": "$O(V)$"
                }
              ],
              [
                {
                  "zh": "relax(E次)",
                  "en": "relax (E pushes)"
                },
                {
                  "zh": "$O(E \\log V)$",
                  "en": "$O(E \\log V)$"
                },
                {
                  "zh": "$O(E)$",
                  "en": "$O(E)$"
                }
              ],
              [
                {
                  "zh": "空間合計",
                  "en": "Total Space"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "$O(V + E)$",
                  "en": "$O(V + E)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{Dijkstra}} = O((V+E)\\log V)",
            "caption": {
              "zh": "使用 binary heap 優先佇列時;Fibonacci heap 可降至 $O(E + V \\log V)$,但實作複雜。",
              "en": "With a binary heap; using a Fibonacci heap reduces this to $O(E + V \\log V)$ at the cost of implementation complexity."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "const int INF = 1e9;\nvector<int> dist(V, INF);\nvector<bool> visited(V, false);\npriority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;\n\ndist[source] = 0;\npq.push({0, source});\n\nwhile (!pq.empty()) {\n    auto [d, u] = pq.top();\n    pq.pop();\n    if (visited[u])\n        continue;\n    visited[u] = true;\n\n    for (auto [v, w] : adj[u]) {\n        if (!visited[v] && dist[u] + w < dist[v]) {\n            dist[v] = dist[u] + w;\n            pq.push({dist[v], v}); // relax\n        }\n    }\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:保證找到非負邊權圖的最短路徑;binary heap 實作效率佳。",
                "en": "Pro: guarantees shortest paths on graphs with non-negative edge weights; binary heap gives good practical performance."
              },
              {
                "zh": "優點:一次執行可得源點到所有頂點的最短距離。",
                "en": "Pro: one run produces shortest distances from the source to all other vertices."
              },
              {
                "zh": "缺點:無法處理負邊;需改用 Bellman-Ford($O(VE)$)或 SPFA。",
                "en": "Con: cannot handle negative edges; Bellman-Ford ($O(VE)$) or SPFA is needed."
              },
              {
                "zh": "缺點:惰性刪除可能使優先佇列中積累冗餘項目,最壞為 $O(E)$。",
                "en": "Con: lazy deletion may accumulate $O(E)$ stale entries in the priority queue."
              },
              {
                "zh": "適用:地圖導航、網路路由協定(OSPF)、遊戲 AI 尋路等。",
                "en": "Use for map navigation, network routing (OSPF), game AI pathfinding, etc."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "Min-heap + relax:每次擴展距離最小的頂點,直至所有頂點確定最短距離。",
                "en": "Min-heap + relax: expand the vertex with minimum distance each time until all distances are finalised."
              },
              {
                "zh": "Binary heap 時間複雜度 $O((V+E)\\log V)$;僅適用非負邊權圖。",
                "en": "Binary heap complexity $O((V+E)\\log V)$; valid only for graphs with non-negative edge weights."
              },
              {
                "zh": "廣泛應用於地圖導航、網路路由等需要單源最短路徑的場景。",
                "en": "Widely used in map navigation and network routing for single-source shortest path problems."
              }
            ]
          }
        ]
      }
    ]
  },
  "graph-topo": {
    "category": "Graphs",
    "title": {
      "zh": "拓樸排序(Kahn's 演算法)",
      "en": "Topological Sort (Kahn's Algorithm)"
    },
    "slides": [
      {
        "heading": {
          "zh": "拓樸排序(Kahn's 演算法)",
          "en": "Topological Sort (Kahn's Algorithm)"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "拓樸排序對有向無環圖(DAG)的頂點排列出線性順序,使每條有向邊 (u→v) 中 u 都排在 v 之前。Kahn's 演算法以 BFS 反覆移除入度為 0 的頂點,時間複雜度 $O(V+E)$。",
              "en": "Topological Sort arranges the vertices of a Directed Acyclic Graph (DAG) so that for every directed edge u→v, u appears before v. Kahn's BFS-based algorithm repeatedly removes vertices with in-degree 0 in $O(V+E)$ time."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "入度(in-degree)是指向某頂點的邊數。入度為 0 的頂點沒有前置依賴,可安全地排在最前面。每移除一個頂點,其後繼節點的入度遞減,可能解鎖新的入度為 0 頂點。",
              "en": "In-degree is the count of edges pointing into a vertex. A vertex with in-degree 0 has no prerequisites and can safely be placed first. Removing it decrements neighbors' in-degrees, potentially unlocking new zero-in-degree vertices."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "DAG 要求:拓樸排序僅對無環圖有效;若處理完的頂點數少於 V,代表圖含環。",
                "en": "DAG requirement: topological sort is only valid for acyclic graphs; if fewer than V vertices are processed, a cycle exists."
              },
              {
                "zh": "非唯一性:若多個頂點同時入度為 0,排列順序不唯一。",
                "en": "Non-uniqueness: if multiple vertices have in-degree 0 simultaneously, the ordering is not unique."
              },
              {
                "zh": "應用:任務排程、相依套件安裝、編譯器指令排序。",
                "en": "Applications: task scheduling, dependency resolution, instruction ordering in compilers."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "計算所有頂點的入度;將入度為 0 的頂點加入佇列。",
                "en": "Compute in-degrees of all vertices; enqueue all vertices with in-degree 0."
              },
              {
                "zh": "從佇列取出頂點 u,加入拓樸排序結果。",
                "en": "Dequeue vertex u and append it to the topological order."
              },
              {
                "zh": "對 u 的每個後繼 v 將 `inDegree[v]--`;若 `inDegree[v] == 0` 則入隊。",
                "en": "For each successor v of u, decrement `inDegree[v]`; if `inDegree[v] == 0` enqueue v."
              },
              {
                "zh": "重複直至佇列為空;若結果長度等於 V 則排序成功,否則圖含環。",
                "en": "Repeat until the queue is empty; if result length equals V the sort succeeded, else a cycle exists."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  A[\"compute\\nin-degrees\"] --> B[\"enqueue\\nin-degree=0\"]\n  B --> C[\"dequeue u\\nappend to order\"]\n  C --> D[\"decrement\\nneighbors\"]\n  D --> E{\"in-degree=0?\"}\n  E -->|yes| F[\"enqueue v\"]\n  E -->|no| G[\"skip\"]\n  F --> H{\"queue\\nempty?\"}\n  G --> H\n  H -->|no| C\n  H -->|yes| I{\"len=V?\"}\n  I -->|yes| J[\"success\"]\n  I -->|no| K[\"cycle!\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "DAG 拓樸排序示意",
          "en": "DAG Topological Sort Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 340 120\" width=\"340\" height=\"120\"><defs><marker id=\"arr\" markerWidth=\"8\" markerHeight=\"8\" refX=\"6\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L8,3 z\" fill=\"#475569\"/></marker></defs><g font-family=\"sans-serif\" font-size=\"11\" text-anchor=\"middle\"><circle cx=\"30\" cy=\"60\" r=\"16\" fill=\"#fef9c3\" stroke=\"#ca8a04\"/><text x=\"30\" y=\"65\">0</text><circle cx=\"110\" cy=\"25\" r=\"16\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"110\" y=\"30\">1</text><circle cx=\"110\" cy=\"95\" r=\"16\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"110\" y=\"100\">2</text><circle cx=\"220\" cy=\"60\" r=\"16\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"220\" y=\"65\">3</text><circle cx=\"305\" cy=\"60\" r=\"16\" fill=\"#dcfce7\" stroke=\"#16a34a\"/><text x=\"305\" y=\"65\">4</text><line x1=\"46\" y1=\"52\" x2=\"94\" y2=\"32\" stroke=\"#475569\" marker-end=\"url(#arr)\"/><line x1=\"46\" y1=\"68\" x2=\"94\" y2=\"88\" stroke=\"#475569\" marker-end=\"url(#arr)\"/><line x1=\"126\" y1=\"25\" x2=\"204\" y2=\"55\" stroke=\"#475569\" marker-end=\"url(#arr)\"/><line x1=\"110\" y1=\"41\" x2=\"110\" y2=\"79\" stroke=\"#475569\" marker-end=\"url(#arr)\"/><line x1=\"126\" y1=\"95\" x2=\"204\" y2=\"65\" stroke=\"#475569\" marker-end=\"url(#arr)\"/><line x1=\"236\" y1=\"60\" x2=\"289\" y2=\"60\" stroke=\"#475569\" marker-end=\"url(#arr)\"/><text x=\"170\" y=\"112\" fill=\"#475569\">Topo order: 0 → 1 → 2 → 3 → 4</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "節點 0 入度為 0(黃色),率先加入結果。依序處理後,合法的拓樸序為 0→1→2→3→4。所有有向邊均由左指向右,符合拓樸排序定義。",
              "en": "Node 0 has in-degree 0 (yellow) and is processed first. A valid topological order is 0→1→2→3→4. Every directed edge points left-to-right, consistent with the topological ordering."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "階段",
                "en": "Phase"
              },
              {
                "zh": "時間",
                "en": "Time"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "入度計算",
                  "en": "In-degree computation"
                },
                {
                  "zh": "$O(V+E)$",
                  "en": "$O(V+E)$"
                },
                {
                  "zh": "$O(V)$",
                  "en": "$O(V)$"
                }
              ],
              [
                {
                  "zh": "BFS 處理",
                  "en": "BFS processing"
                },
                {
                  "zh": "$O(V+E)$",
                  "en": "$O(V+E)$"
                },
                {
                  "zh": "$O(V)$",
                  "en": "$O(V)$"
                }
              ],
              [
                {
                  "zh": "空間合計",
                  "en": "Total Space"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "$O(V+E)$",
                  "en": "$O(V+E)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{Kahn}} = O(V + E)",
            "caption": {
              "zh": "每個頂點入隊/出隊各一次,每條邊處理一次;線性時間是拓樸排序的理論最優。",
              "en": "Each vertex is enqueued and dequeued exactly once; each edge is processed once — linear time is optimal for topological sort."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "// Kahn's Algorithm (BFS-based topological sort)\nvector<int> inDegree(V, 0);\nfor (auto [u, v] : edges) {\n    adj[u].push_back(v);\n    inDegree[v]++;\n}\n\nqueue<int> q;\nfor (int i = 0; i < V; i++)\n    if (inDegree[i] == 0)\n        q.push(i);\n\nvector<int> topoOrder;\nwhile (!q.empty()) {\n    int u = q.front();\n    q.pop();\n    topoOrder.push_back(u);\n    for (int v : adj[u]) {\n        if (--inDegree[v] == 0)\n            q.push(v);\n    }\n}\n\nif ((int)topoOrder.size() != V)\n    cout << \"ERROR: Cycle detected!\\n\";"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:線性時間 $O(V+E)$,同時免費偵測圖中的環(若有)。",
                "en": "Pro: linear $O(V+E)$ time; cycle detection comes for free."
              },
              {
                "zh": "優點:Kahn's BFS 實作直觀,易於理解與調試。",
                "en": "Pro: Kahn's BFS approach is intuitive and easy to debug."
              },
              {
                "zh": "缺點:僅適用 DAG;含環的有向圖無法產生有效的拓樸排序。",
                "en": "Con: only valid for DAGs; directed graphs with cycles produce no valid topological order."
              },
              {
                "zh": "缺點:若有多個合法排序,結果取決於佇列順序,可能不唯一。",
                "en": "Con: when multiple valid orderings exist, the result depends on queue order and is not unique."
              },
              {
                "zh": "適用:相依套件安裝、Makefile 編譯順序、課程先修要求排序等。",
                "en": "Use for dependency resolution, Makefile build order, course prerequisite scheduling, etc."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "反覆移除入度為 0 的頂點:$O(V+E)$ 線性時間完成拓樸排序。",
                "en": "Repeatedly removing in-degree-0 vertices achieves topological sort in $O(V+E)$ linear time."
              },
              {
                "zh": "僅適用 DAG;若結果長度少於 V 則圖含環,可作為環偵測工具。",
                "en": "Only for DAGs; if result length is less than V a cycle exists — doubles as a cycle-detection tool."
              },
              {
                "zh": "廣泛應用於任務排程、相依解析與編譯器前端的指令排序。",
                "en": "Widely applied in task scheduling, dependency resolution, and compiler front-end instruction ordering."
              }
            ]
          }
        ]
      }
    ]
  },
  "graph-traversal": {
    "category": "Graphs",
    "title": {
      "zh": "BFS 與 DFS 比較",
      "en": "BFS vs DFS Compared"
    },
    "slides": [
      {
        "heading": {
          "zh": "BFS 與 DFS 比較",
          "en": "BFS vs DFS Compared"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "對同一張 5 節點圖（0:[1,4]，1:[0,2,3,4]，2:[1,3]，3:[1,2,4]，4:[0,1,3]），BFS 從 0 出發的訪問順序為 0 1 4 2 3，DFS 從 0 出發為 0 1 2 3 4；視覺化器以雙面板同步展示兩者差異。",
              "en": "On the same 5-node graph (0:[1,4], 1:[0,2,3,4], 2:[1,3], 3:[1,2,4], 4:[0,1,3]), BFS from 0 visits 0 1 4 2 3 and DFS from 0 visits 0 1 2 3 4; the visualizer steps both panes in sync to make the contrast visible."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "BFS 使用佇列（Queue），按層次由近而遠探索，天然找到無權最短路徑；DFS 使用堆疊（Stack）或遞迴，優先往深處探索再回溯。",
              "en": "BFS uses a Queue and explores layer by layer from nearest to farthest, naturally finding shortest unweighted paths; DFS uses a Stack or recursion, diving deep before backtracking."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "BFS：佇列；訪問順序 0→1→4→2→3；層次 d=0,1,1,2,2。",
                "en": "BFS: queue; visit order 0→1→4→2→3; layers d=0,1,1,2,2."
              },
              {
                "zh": "DFS：堆疊/遞迴；訪問順序 0→1→2→3→4；沿路徑深入再回溯。",
                "en": "DFS: stack/recursion; visit order 0→1→2→3→4; explores paths fully before backtracking."
              },
              {
                "zh": "兩者時間複雜度均為 $O(V+E)$，空間分別為 $O(V)$（佇列）與 $O(h)$（堆疊深度）。",
                "en": "Both have time $O(V+E)$; space differs: BFS $O(V)$ queue vs DFS $O(h)$ stack depth."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "BFS：將起點 0 入佇列 → 出佇列並訪問 → 將未訪問鄰居依序入佇列 → 重複至佇列空。",
                "en": "BFS: enqueue source 0 → dequeue and visit → enqueue unvisited neighbors in order → repeat until empty."
              },
              {
                "zh": "DFS：將起點 0 入堆疊 → 出堆疊，若未訪問則標記並將鄰居倒序入堆疊 → 重複。",
                "en": "DFS: push source 0 → pop; if unvisited mark it and push neighbors in reverse order → repeat."
              },
              {
                "zh": "比較：相同的圖、相同的起點，不同的資料結構導致截然不同的訪問順序。",
                "en": "Comparison: same graph, same source, but different control structure → different visit orders."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  subgraph BFS\n    B0[\"0\"] --> B1[\"1\"] --> B4[\"4\"] --> B2[\"2\"] --> B3[\"3\"]\n  end\n  subgraph DFS\n    D0[\"0\"] --> D1[\"1\"] --> D2[\"2\"] --> D3[\"3\"] --> D4[\"4\"]\n  end"
          }
        ]
      },
      {
        "heading": {
          "zh": "示意圖",
          "en": "Layout"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 60\" width=\"360\"><g font-family=\"monospace\" font-size=\"14\"><text x=\"0\" y=\"22\">BFS order: 0  1  4  2  3</text><text x=\"0\" y=\"50\">DFS order: 0  1  2  3  4</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "同一張 5 節點圖從頂點 0 出發；BFS 先訪問所有距離 1 的節點（1、4），再訪問距離 2 的節點（2、3）；DFS 則沿最小鄰居一路深入直到盡頭。",
              "en": "Same 5-node graph from vertex 0; BFS first visits all distance-1 nodes (1, 4) then distance-2 nodes (2, 3); DFS dives along the smallest neighbor until it hits a dead end."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "操作",
                "en": "Operation"
              },
              {
                "zh": "時間",
                "en": "Time"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "初始化",
                  "en": "Init"
                },
                {
                  "zh": "$O(V)$",
                  "en": "$O(V)$"
                },
                {
                  "zh": "$O(V)$",
                  "en": "$O(V)$"
                }
              ],
              [
                {
                  "zh": "BFS 遍歷",
                  "en": "BFS traversal"
                },
                {
                  "zh": "$O(V+E)$",
                  "en": "$O(V+E)$"
                },
                {
                  "zh": "$O(V)$",
                  "en": "$O(V)$"
                }
              ],
              [
                {
                  "zh": "DFS 遍歷",
                  "en": "DFS traversal"
                },
                {
                  "zh": "$O(V+E)$",
                  "en": "$O(V+E)$"
                },
                {
                  "zh": "$O(h)$",
                  "en": "$O(h)$"
                }
              ],
              [
                {
                  "zh": "單步展開 $\\deg(v)$",
                  "en": "Single step $\\deg(v)$"
                },
                {
                  "zh": "$O(\\deg(v))$",
                  "en": "$O(\\deg(v))$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{BFS} = T_{DFS} = O(V+E)",
            "caption": {
              "zh": "兩者時間相同，差異在空間：BFS 佇列最多存 $O(V)$ 個節點，DFS 堆疊深度最多為 $O(h)$（$h$ 為 DFS 樹高）。",
              "en": "Both have the same time complexity; the key difference is space: BFS queue holds up to $O(V)$ nodes, while DFS stack depth is at most $O(h)$ (DFS tree height)."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "vector<int> bfsOrder(const vector<vector<int>>& adj, int start) {\n    int n = adj.size();\n    vector<bool> visited(n, false);\n    vector<int> order;\n    queue<int> q;\n    q.push(start);\n    visited[start] = true;\n    while (!q.empty()) {\n        int u = q.front();\n        q.pop();\n        order.push_back(u);\n        for (int v : adj[u])\n            if (!visited[v]) {\n                visited[v] = true;\n                q.push(v);\n            }\n    }\n    return order;\n}\nvector<int> dfsOrder(const vector<vector<int>>& adj, int start) {\n    int n = adj.size();\n    vector<bool> visited(n, false);\n    vector<int> order;\n    stack<int> s;\n    s.push(start);\n    while (!s.empty()) {\n        int u = s.top();\n        s.pop();\n        if (visited[u])\n            continue;\n        visited[u] = true;\n        order.push_back(u);\n        for (auto it = adj[u].rbegin(); it != adj[u].rend(); ++it)\n            if (!visited[*it])\n                s.push(*it);\n    }\n    return order;\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "BFS 優點：能找到無權最短路徑；適合層次遍歷與廣播問題。",
                "en": "BFS pro: finds shortest unweighted path; good for level-order traversal and broadcast problems."
              },
              {
                "zh": "DFS 優點：記憶體用量較小（深度有限時）；是拓樸排序、SCC、環偵測的基礎。",
                "en": "DFS pro: uses less memory for deep narrow graphs; foundation for topological sort, SCC, cycle detection."
              },
              {
                "zh": "BFS 缺點：寬圖記憶體消耗大（佇列可達 $O(V)$）。",
                "en": "BFS con: high memory on wide graphs (queue can reach $O(V)$)."
              },
              {
                "zh": "DFS 缺點：不保證找到最短路徑；不同鄰居遍歷順序會產生不同結果，可能混淆預期。",
                "en": "DFS con: does not guarantee shortest path; different neighbor orderings yield different results, which can be confusing."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "相同資料（圖），不同控制結構（佇列 vs 堆疊）→ 截然不同的訪問順序。",
                "en": "Same data (graph), different control structure (queue vs stack) → completely different traversal orders."
              },
              {
                "zh": "BFS 按距離分層展開，DFS 沿路徑深入再回溯；各有適用場景。",
                "en": "BFS expands by distance layers; DFS explores paths fully before backtracking — each suits different problems."
              },
              {
                "zh": "兩者時間均為 $O(V+E)$；BFS 空間 $O(V)$，DFS 空間 $O(h)$。",
                "en": "Both run in $O(V+E)$ time; BFS uses $O(V)$ space, DFS uses $O(h)$ stack space."
              }
            ]
          }
        ]
      }
    ]
  },
  "graph-bfs": {
    "category": "Graphs",
    "title": {
      "zh": "廣度優先搜尋",
      "en": "Breadth-First Search"
    },
    "slides": [
      {
        "heading": {
          "zh": "廣度優先搜尋",
          "en": "Breadth-First Search"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "BFS（Breadth-First Search，廣度優先搜尋）利用佇列按照距離由近到遠逐層探索圖中節點，是求無權最短路徑的標準演算法。",
              "en": "BFS (Breadth-First Search) uses a queue to explore graph vertices layer by layer in increasing distance from the source — the standard algorithm for shortest unweighted paths."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "以佇列記錄待探索的節點，並維護 `visited` 集合防止重複訪問。每次從佇列前端取出一個節點，訪問後將其所有未訪問鄰居加入佇列。",
              "en": "A queue tracks nodes to explore next, and a `visited` set prevents revisiting. Each iteration dequeues a node, visits it, then enqueues all unvisited neighbors."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "FIFO 佇列保證同一距離的節點先被訪問，再探索更遠的節點。",
                "en": "FIFO queue ensures nodes at the same distance are all visited before exploring farther ones."
              },
              {
                "zh": "從來源 0 出發：距離 0 → {0}，距離 1 → {1,4}，距離 2 → {2,3}。",
                "en": "From source 0: distance 0 → {0}, distance 1 → {1, 4}, distance 2 → {2, 3}."
              },
              {
                "zh": "可同時記錄 `dist[]` 陣列，得到源點到各節點的最短路徑長度。",
                "en": "Can simultaneously maintain a `dist[]` array to record shortest-path distances from source."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "將源點 0 標記為已訪問並入佇列；`visited[0] = true`。",
                "en": "Mark source 0 as visited and enqueue it; `visited[0] = true`."
              },
              {
                "zh": "迴圈：取出佇列前端節點 $u$，訪問它，將所有 `adj[u]` 中未訪問的鄰居標記並入佇列。",
                "en": "Loop: dequeue front node $u$, visit it, mark and enqueue every unvisited neighbor in `adj[u]`."
              },
              {
                "zh": "重複直到佇列為空；訪問序列即為 BFS 序，同時也是層次遍歷順序。",
                "en": "Repeat until the queue is empty; the visit sequence is the BFS order, which equals the level-order traversal."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  L0[\"d=0: 0\"] --> L1[\"d=1: 1, 4\"] --> L2[\"d=2: 2, 3\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "示意圖",
          "en": "Layout"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 110\" width=\"360\"><g font-family=\"monospace\" font-size=\"13\"><text x=\"0\" y=\"20\">Node 0 : d = 0</text><text x=\"0\" y=\"40\">Node 1 : d = 1</text><text x=\"0\" y=\"60\">Node 2 : d = 2</text><text x=\"0\" y=\"80\">Node 3 : d = 2</text><text x=\"0\" y=\"100\">Node 4 : d = 1</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "從頂點 0 出發，5 個節點的 BFS 距離：0 距離為 0，1 和 4 距離為 1，2 和 3 距離為 2；訪問順序 0 1 4 2 3。",
              "en": "BFS distances from vertex 0 for all 5 nodes: node 0 at d=0, nodes 1 and 4 at d=1, nodes 2 and 3 at d=2; visit order 0 1 4 2 3."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "操作",
                "en": "Operation"
              },
              {
                "zh": "時間",
                "en": "Time"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "初始化",
                  "en": "Init"
                },
                {
                  "zh": "$O(V)$",
                  "en": "$O(V)$"
                },
                {
                  "zh": "$O(V)$",
                  "en": "$O(V)$"
                }
              ],
              [
                {
                  "zh": "BFS 遍歷",
                  "en": "BFS traversal"
                },
                {
                  "zh": "$O(V+E)$",
                  "en": "$O(V+E)$"
                },
                {
                  "zh": "$O(V)$",
                  "en": "$O(V)$"
                }
              ],
              [
                {
                  "zh": "最短路徑查詢",
                  "en": "Shortest path query"
                },
                {
                  "zh": "$O(V)$",
                  "en": "$O(V)$"
                },
                {
                  "zh": "$O(V)$",
                  "en": "$O(V)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{BFS} = O(V + E)",
            "caption": {
              "zh": "每個頂點和每條邊各最多處理一次；佇列空間最多同時存 $O(V)$ 個節點。",
              "en": "Each vertex and each edge is processed at most once; the queue holds at most $O(V)$ nodes simultaneously."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "void bfs(const vector<vector<int>>& adj, int start) {\n    int n = adj.size();\n    vector<bool> visited(n, false);\n    queue<int> q;\n    q.push(start);\n    visited[start] = true;\n    while (!q.empty()) {\n        int u = q.front();\n        q.pop();\n        cout << \"Visit \" << u << \"\\n\";\n        for (int v : adj[u]) {\n            if (!visited[v]) {\n                visited[v] = true;\n                q.push(v);\n            }\n        }\n    }\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點：在無權圖中天然找到最短路徑，保證按距離分層訪問。",
                "en": "Pro: naturally finds shortest unweighted paths; guarantees level-order (distance-layer) traversal."
              },
              {
                "zh": "優點：可同時求所有節點到源點的最短距離，只需一次遍歷。",
                "en": "Pro: computes shortest distances from source to all nodes in a single pass."
              },
              {
                "zh": "缺點：寬圖（分枝多）時佇列可達 $O(V)$ 記憶體，對記憶體敏感的場景需注意。",
                "en": "Con: for wide graphs (high branching factor), the queue can hold $O(V)$ nodes, requiring significant memory."
              },
              {
                "zh": "適用：無權最短路徑、層次遍歷、網路廣播、二部圖檢測；鄰接串列為首選（見 graph-adjlist）。",
                "en": "Use for unweighted shortest paths, level-order traversal, network broadcasting, bipartite checking; pairs naturally with the adjacency list (see graph-adjlist)."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "佇列 + `visited` 集合；按距離分層訪問所有可達節點。",
                "en": "Queue + visited set; visits all reachable nodes in distance-layer order."
              },
              {
                "zh": "時間 $O(V+E)$，空間 $O(V)$；在無權圖中找到最短路徑。",
                "en": "Time $O(V+E)$, space $O(V)$; finds shortest paths in unweighted graphs."
              },
              {
                "zh": "與鄰接串列配合使用效果最佳（見 graph-adjlist）。",
                "en": "Pairs naturally with the adjacency list (see graph-adjlist)."
              }
            ]
          }
        ]
      }
    ]
  },
  "graph-dfs": {
    "category": "Graphs",
    "title": {
      "zh": "深度優先搜尋",
      "en": "Depth-First Search"
    },
    "slides": [
      {
        "heading": {
          "zh": "深度優先搜尋",
          "en": "Depth-First Search"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "DFS（Depth-First Search，深度優先搜尋）以堆疊或遞迴的方式優先沿路徑深入探索，是拓樸排序、強連通分量、環偵測等演算法的核心基礎。",
              "en": "DFS (Depth-First Search) uses a stack or recursion to explore as deep as possible along each path before backtracking — the foundational technique for topological sort, SCC, and cycle detection."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "以堆疊（或呼叫堆疊）記錄當前路徑。每次取出頂端節點，若未訪問則標記並將其鄰居（倒序）推入堆疊，使最小鄰居優先被彈出；遞迴版直接對每個鄰居呼叫自身。",
              "en": "A stack (or call stack) tracks the current path. Pop the top node; if unvisited mark it and push its neighbors in reverse order so the smallest neighbor is popped first; the recursive version calls itself on each unvisited neighbor."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "迭代版：堆疊 + `visited` 陣列；倒序入堆疊使最小鄰居先訪問，得到 0 1 2 3 4。",
                "en": "Iterative: stack + visited array; push neighbors in reverse so smallest is popped first, yielding 0 1 2 3 4."
              },
              {
                "zh": "遞迴版：呼叫堆疊即為 DFS 堆疊；對鄰居清單正序遞迴，得到相同順序 0 1 2 3 4。",
                "en": "Recursive: call stack acts as DFS stack; recurse on neighbors in forward order, yielding the same order 0 1 2 3 4."
              },
              {
                "zh": "DFS 樹邊：0→1→2→3→4；其餘為回邊（back edge）或交叉邊，反映圖的深層結構。",
                "en": "DFS tree edges: 0→1→2→3→4; remaining edges are back/cross edges reflecting deeper graph structure."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "將源點 0 推入堆疊（或遞迴進入 0）；`visited[0] = true`。",
                "en": "Push source 0 onto the stack (or enter recursion at 0); `visited[0] = true`."
              },
              {
                "zh": "迭代：彈出頂端節點 $u$，若未訪問則標記並將 `adj[u]` 倒序推入堆疊；遞迴：對每個未訪問鄰居 $v$ 直接呼叫 `dfsRecursive(adj, v, visited)`。",
                "en": "Iterative: pop top $u$; if unvisited mark it and push `adj[u]` reversed; Recursive: for each unvisited neighbor $v$ call `dfsRecursive(adj, v, visited)`."
              },
              {
                "zh": "重複直到堆疊空（迭代）或所有遞迴返回；訪問序列為 0 1 2 3 4。",
                "en": "Repeat until stack is empty (iterative) or all recursions return; visit sequence is 0 1 2 3 4."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  T0[\"0\"] --> T1[\"1\"] --> T2[\"2\"] --> T3[\"3\"] --> T4[\"4\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "示意圖",
          "en": "Layout"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 120\" width=\"360\"><g font-family=\"monospace\" font-size=\"13\"><text x=\"0\" y=\"20\">DFS visit order: 0  1  2  3  4</text><text x=\"0\" y=\"50\">Tree edges  : 0-&gt;1, 1-&gt;2, 2-&gt;3, 3-&gt;4</text><text x=\"0\" y=\"80\">Node 0: neighbors 1,4</text><text x=\"0\" y=\"100\">Node 4: tree edge 3-&gt;4; back edges 4-&gt;0, 4-&gt;1</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "DFS 從 0 出發，沿最小鄰居深入：0→1→2→3→4；5 個節點全部出現。4 最後被訪問是因為 3 的鄰居 4 尚未訪問時才被探索。",
              "en": "DFS from 0 dives along smallest neighbors: 0→1→2→3→4; all 5 nodes appear. Node 4 is visited last when neighbor 4 of node 3 is found unvisited."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "操作",
                "en": "Operation"
              },
              {
                "zh": "時間",
                "en": "Time"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "初始化",
                  "en": "Init"
                },
                {
                  "zh": "$O(V)$",
                  "en": "$O(V)$"
                },
                {
                  "zh": "$O(V)$",
                  "en": "$O(V)$"
                }
              ],
              [
                {
                  "zh": "DFS 遍歷",
                  "en": "DFS traversal"
                },
                {
                  "zh": "$O(V+E)$",
                  "en": "$O(V+E)$"
                },
                {
                  "zh": "$O(h)$",
                  "en": "$O(h)$"
                }
              ],
              [
                {
                  "zh": "最壞情況堆疊深度",
                  "en": "Worst-case stack depth"
                },
                {
                  "zh": "$O(V)$",
                  "en": "$O(V)$"
                },
                {
                  "zh": "$O(V)$",
                  "en": "$O(V)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{DFS} = O(V + E)",
            "caption": {
              "zh": "每個頂點和每條邊各最多處理一次；堆疊深度（遞迴深度）$h$ 最壞為 $O(V)$（線性圖），一般情況遠小於此。",
              "en": "Each vertex and each edge is processed at most once; stack depth $h$ is $O(V)$ in the worst case (path graph), but typically much less."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "void dfsRecursive(const vector<vector<int>>& adj, int u, vector<bool>& visited) {\n    visited[u] = true;\n    cout << \"Visit \" << u << \"\\n\";\n    for (int v : adj[u])\n        if (!visited[v])\n            dfsRecursive(adj, v, visited);\n}\nvoid dfsIterative(const vector<vector<int>>& adj, int start) {\n    int n = adj.size();\n    vector<bool> visited(n, false);\n    stack<int> s;\n    s.push(start);\n    while (!s.empty()) {\n        int u = s.top();\n        s.pop();\n        if (visited[u])\n            continue;\n        visited[u] = true;\n        cout << \"Visit \" << u << \"\\n\";\n        // push in reverse so smallest neighbor is popped first\n        for (auto it = adj[u].rbegin(); it != adj[u].rend(); ++it)\n            if (!visited[*it])\n                s.push(*it);\n    }\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點：對深且窄的圖記憶體用量小（$O(h)$ vs BFS 的 $O(V)$）。",
                "en": "Pro: memory-efficient on deep narrow graphs ($O(h)$ vs BFS $O(V)$)."
              },
              {
                "zh": "優點：是拓樸排序、強連通分量（Tarjan / Kosaraju）、環偵測的核心引擎。",
                "en": "Pro: the engine for topological sort, SCC (Tarjan/Kosaraju), and cycle detection."
              },
              {
                "zh": "缺點：找到的是「一條」路徑，不保證最短路徑。",
                "en": "Con: finds a path but not necessarily the shortest one."
              },
              {
                "zh": "適用：路徑存在性、拓樸排序、連通分量、迷宮求解等；DFS 是拓樸排序的引擎（見 graph-topo）。",
                "en": "Use for path existence, topological sort, connected components, maze solving; DFS is the engine for topological sort (see graph-topo)."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "堆疊（或遞迴）+ `visited` 集合；沿路徑完全探索後再回溯。",
                "en": "Stack (or recursion) + visited set; explores paths fully before backtracking."
              },
              {
                "zh": "時間 $O(V+E)$，空間 $O(h)$；對深窄圖記憶體效率高於 BFS。",
                "en": "Time $O(V+E)$, space $O(h)$; more memory-efficient than BFS for deep narrow graphs."
              },
              {
                "zh": "DFS 是拓樸排序的核心引擎（見 graph-topo）。",
                "en": "DFS is the engine for topological sort (see graph-topo)."
              }
            ]
          }
        ]
      }
    ]
  },
  "heap-binary": {
    "category": "Heaps / Priority Queues",
    "title": {
      "zh": "二元堆積(Binary Heap)",
      "en": "Binary Heap"
    },
    "slides": [
      {
        "heading": {
          "zh": "二元堆積(Binary Heap)",
          "en": "Binary Heap"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "以連續陣列儲存的完全二元樹,透過 sift-up 與 sift-down 維持 heap 性質,提供 $O(\\log N)$ 插入與取出及 $O(1)$ 查看頂端元素。",
              "en": "A complete binary tree stored in a contiguous array; heap property is maintained by sift-up and sift-down, giving $O(\\log N)$ insert/extract and $O(1)$ peek."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "索引 $i$ 的父節點為 $(i-1)/2$,左子為 $2i+1$,右子為 $2i+2$。Min-Heap 保證每個父節點的鍵值 $\\leq$ 所有子節點;Max-Heap 則相反。",
              "en": "Node at index $i$ has parent $(i-1)/2$, left child $2i+1$, right child $2i+2$. A Min-Heap guarantees every parent key $\\leq$ its children; Max-Heap is the reverse."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "insert:新增元素到陣列末端,執行 sift-up 向上修復。",
                "en": "insert: append to array tail, then sift-up to restore order."
              },
              {
                "zh": "extractTop:將根與末端元素互換後移除,執行 sift-down 向下修復。",
                "en": "extractTop: swap root with tail, remove tail, then sift-down to restore."
              },
              {
                "zh": "decreaseKey/increaseKey:原地修改鍵值後視情況執行 sift-up 或 sift-down。",
                "en": "decreaseKey / increaseKey: modify in place, then sift-up or sift-down as needed."
              },
              {
                "zh": "陣列連續存取,快取命中率高。",
                "en": "Contiguous array layout yields excellent cache performance."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "insert(5):將 5 追加至陣列末端索引位置。",
                "en": "insert(5): append 5 at the last array position."
              },
              {
                "zh": "sift-up:比較 5 與父節點;若 5 較小(min-heap)則互換,重複直到根或不再違反。",
                "en": "sift-up: compare 5 with its parent; swap if 5 is smaller (min-heap); repeat until root or no violation."
              },
              {
                "zh": "extractTop:根(最小值)與末端互換後移除末端。",
                "en": "extractTop: swap root (minimum) with the last element, then remove the last."
              },
              {
                "zh": "sift-down:從根往下選較小的子節點互換,直到葉節點或不再違反。",
                "en": "sift-down: from root, swap with the smaller child until a leaf or no violation remains."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  A[\"insert(5)\\nappend to tail\"] --> B[\"sift-up\\n(compare with parent)\"]\n  B --> C{\"parent > child\\n(min-heap)?\"}\n  C -->|\"yes\"| D[\"swap & move up\"]\n  D --> B\n  C -->|\"no\"| E[\"heap property\\nrestored\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "陣列結構示意",
          "en": "Array Layout Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 120\" width=\"360\" height=\"120\"><g font-family=\"sans-serif\" font-size=\"12\" text-anchor=\"middle\"><rect x=\"10\" y=\"10\" width=\"40\" height=\"30\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"30\" y=\"30\">1</text><text x=\"30\" y=\"8\" font-size=\"9\" fill=\"#64748b\">i=0</text><rect x=\"60\" y=\"10\" width=\"40\" height=\"30\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"80\" y=\"30\">3</text><text x=\"80\" y=\"8\" font-size=\"9\" fill=\"#64748b\">i=1</text><rect x=\"110\" y=\"10\" width=\"40\" height=\"30\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"130\" y=\"30\">2</text><text x=\"130\" y=\"8\" font-size=\"9\" fill=\"#64748b\">i=2</text><rect x=\"160\" y=\"10\" width=\"40\" height=\"30\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"180\" y=\"30\">7</text><text x=\"180\" y=\"8\" font-size=\"9\" fill=\"#64748b\">i=3</text><rect x=\"210\" y=\"10\" width=\"40\" height=\"30\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"230\" y=\"30\">8</text><text x=\"230\" y=\"8\" font-size=\"9\" fill=\"#64748b\">i=4</text><rect x=\"260\" y=\"10\" width=\"40\" height=\"30\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"280\" y=\"30\">5</text><text x=\"280\" y=\"8\" font-size=\"9\" fill=\"#64748b\">i=5</text><rect x=\"310\" y=\"10\" width=\"40\" height=\"30\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"330\" y=\"30\">9</text><text x=\"330\" y=\"8\" font-size=\"9\" fill=\"#64748b\">i=6</text><circle cx=\"80\" cy=\"75\" r=\"14\" fill=\"#fef9c3\" stroke=\"#ca8a04\"/><text x=\"80\" y=\"79\">1</text><circle cx=\"40\" cy=\"105\" r=\"14\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"40\" y=\"109\">3</text><circle cx=\"120\" cy=\"105\" r=\"14\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"120\" y=\"109\">2</text><line x1=\"80\" y1=\"89\" x2=\"46\" y2=\"92\" stroke=\"#64748b\"/><line x1=\"80\" y1=\"89\" x2=\"114\" y2=\"92\" stroke=\"#64748b\"/><text x=\"180\" y=\"79\" font-size=\"10\" fill=\"#64748b\">root=data[0]</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "上方為陣列表示;下方樹形圖顯示 data[0](根)為最小值。節點 $i$ 的兩個子節點位於 $2i+1$ 與 $2i+2$。",
              "en": "Top: flat array representation. Bottom: tree view where data[0] (root) is the minimum. Children of node $i$ are at $2i+1$ and $2i+2$."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "操作",
                "en": "Operation"
              },
              {
                "zh": "時間(最壞)",
                "en": "Time (Worst)"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "insert",
                  "en": "insert"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "peek",
                  "en": "peek"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "extractTop",
                  "en": "extractTop"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "decreaseKey / increaseKey",
                  "en": "decreaseKey / increaseKey"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "build-heap ($N$ 個元素)",
                  "en": "build-heap ($N$ elements)"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                }
              ],
              [
                {
                  "zh": "空間合計",
                  "en": "Total Space"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{build}}(N) = O(N)",
            "caption": {
              "zh": "從底部向上呼叫 sift-down 建堆的總代價為 $O(N)$,優於逐一 insert 的 $O(N \\log N)$。",
              "en": "Building the heap bottom-up with sift-down costs $O(N)$ total — better than $N$ sequential inserts at $O(N \\log N)$."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "void siftUp(int i) {\n    while (i > 0) {\n        int p = (i - 1) / 2;\n        if (!cmp(data[i], data[p]))\n            break;\n        swap(data[i], data[p]);\n        i = p;\n    }\n}\n\nvoid siftDown(int i) {\n    int n = static_cast<int>(data.size());\n    while (true) {\n        int left = 2 * i + 1, right = 2 * i + 2, best = i;\n        if (left < n && cmp(data[left], data[best]))\n            best = left;\n        if (right < n && cmp(data[right], data[best]))\n            best = right;\n        if (best == i)\n            break;\n        swap(data[i], data[best]);\n        i = best;\n    }\n}\n\nvoid insert(int x) {\n    data.push_back(x);\n    siftUp(static_cast<int>(data.size()) - 1);\n}\n\nint extractTop() {\n    int top = data[0];\n    data[0] = data.back();\n    data.pop_back();\n    if (!data.empty())\n        siftDown(0);\n    return top;\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:陣列連續儲存,快取友好,常數因子小。",
                "en": "Pro: contiguous array storage is cache-friendly with small constant factors."
              },
              {
                "zh": "優點:build-heap 為 $O(N)$,適合大量資料一次性建堆。",
                "en": "Pro: $O(N)$ build-heap is ideal for bulk construction from a large dataset."
              },
              {
                "zh": "缺點:高效合併(串接陣列後 build-heap)需 $O(N+M)$,若以逐一重新插入則退化為 $O((N+M)\\log(N+M))$;即使最佳情況仍不適合頻繁 merge。",
                "en": "Con: efficient merge (concatenate arrays + build-heap) costs $O(N+M)$; naive re-insertion degrades to $O((N+M)\\log(N+M))$ — either way, unsuitable when merges are frequent."
              },
              {
                "zh": "缺點:decrease-key 需要知道元素的陣列索引,外部維護索引增加複雜度。",
                "en": "Con: decrease-key requires knowing the array index, adding bookkeeping overhead."
              },
              {
                "zh": "適用:優先佇列、Dijkstra/Prim 演算法、Heap Sort、Top-K 問題。",
                "en": "Use for: priority queues, Dijkstra/Prim, Heap Sort, Top-K streaming."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "完全二元樹以陣列實作:父節點在 $(i-1)/2$,子節點在 $2i+1$/$2i+2$。",
                "en": "Complete binary tree in an array: parent at $(i-1)/2$, children at $2i+1$/$2i+2$."
              },
              {
                "zh": "insert/$O(\\log N)$ worst-case;extractTop/$O(\\log N)$ worst-case;peek/$O(1)$。",
                "en": "insert $O(\\log N)$ worst-case; extractTop $O(\\log N)$ worst-case; peek $O(1)$."
              },
              {
                "zh": "build-heap 為 $O(N)$;merge 效率低;快取性能優異。",
                "en": "$O(N)$ build-heap; poor merge performance; excellent cache locality."
              }
            ]
          }
        ]
      }
    ]
  },
  "heap-binomial": {
    "category": "Heaps / Priority Queues",
    "title": {
      "zh": "二項堆積(Binomial Heap)",
      "en": "Binomial Heap"
    },
    "slides": [
      {
        "heading": {
          "zh": "二項堆積(Binomial Heap)",
          "en": "Binomial Heap"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "以二項樹(Binomial Tree)森林組成的堆積結構,合併操作類比二進位加法,提供 $O(\\log N)$ 合併與 $O(1)$ 攤銷插入。",
              "en": "A heap built from a forest of binomial trees; merging mimics binary addition over tree degrees, giving $O(\\log N)$ merge and $O(1)$ amortized insert."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "度數為 $k$ 的二項樹 $B_k$ 由兩棵 $B_{k-1}$ 連結而成,共有 $2^k$ 個節點。$N$ 個元素的二項堆積最多含 $\\lfloor\\log_2 N\\rfloor + 1$ 棵樹,每個度數至多出現一次,如同 $N$ 的二進位表示。",
              "en": "Binomial tree $B_k$ is formed by linking two $B_{k-1}$ trees and has $2^k$ nodes. A binomial heap with $N$ elements has at most $\\lfloor\\log_2 N\\rfloor + 1$ trees — one per bit of $N$ set to 1."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "insert:建立單節點 $B_0$ 堆積,再與主堆積合併($O(1)$ 攤銷)。",
                "en": "insert: create a single-node $B_0$ heap then merge with the main heap ($O(1)$ amortized)."
              },
              {
                "zh": "merge:按度數升序合併根串列,相同度數的樹執行 link 操作(類似二進位加法進位)。",
                "en": "merge: combine root lists by degree; link trees of equal degree (like binary carry propagation)."
              },
              {
                "zh": "extractTop:找出根串列中最小根,移除後將其子節點反轉為新堆積再合併。",
                "en": "extractTop: find the minimum root, remove it, reverse its children into a new heap, then merge."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "合併兩個二項堆積:將兩個根串列按度數升序排列後合併。",
                "en": "Merge two binomial heaps: interleave both root lists sorted by degree."
              },
              {
                "zh": "掃描合併後根串列:若連續兩棵樹度數相同,執行 linkTrees (較小根成為父)。",
                "en": "Scan merged root list: if two consecutive trees share the same degree, call linkTrees (smaller root becomes parent)."
              },
              {
                "zh": "重複直到每個度數至多一棵樹為止。",
                "en": "Repeat until every degree appears at most once."
              },
              {
                "zh": "extractTop:線性掃描根串列找最小根;子樹反轉後執行上述合併。",
                "en": "extractTop: linear scan of root list for minimum; reverse children then apply the merge above."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  H1[\"H1: B0(3), B1(7)\"] --> MERGE[\"mergeRootLists\\n+ link equal degrees\"]\n  H2[\"H2: B0(1), B1(10)\"] --> MERGE\n  MERGE --> OUT[\"Result: B1(root=1), B2(root=7)\\n(carry-like linking, no B0)\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "二項樹結構示意",
          "en": "Binomial Tree Structure"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 340 130\" width=\"340\" height=\"130\"><g font-family=\"sans-serif\" font-size=\"11\" text-anchor=\"middle\"><text x=\"30\" y=\"12\" font-size=\"10\" fill=\"#64748b\">B0</text><circle cx=\"30\" cy=\"25\" r=\"12\" fill=\"#fef9c3\" stroke=\"#ca8a04\"/><text x=\"30\" y=\"29\">1</text><text x=\"110\" y=\"12\" font-size=\"10\" fill=\"#64748b\">B1</text><circle cx=\"110\" cy=\"25\" r=\"12\" fill=\"#fef9c3\" stroke=\"#ca8a04\"/><text x=\"110\" y=\"29\">1</text><circle cx=\"80\" cy=\"65\" r=\"12\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"80\" y=\"69\">3</text><line x1=\"110\" y1=\"37\" x2=\"88\" y2=\"53\" stroke=\"#64748b\"/><text x=\"230\" y=\"12\" font-size=\"10\" fill=\"#64748b\">B2</text><circle cx=\"230\" cy=\"25\" r=\"12\" fill=\"#fef9c3\" stroke=\"#ca8a04\"/><text x=\"230\" y=\"29\">1</text><circle cx=\"195\" cy=\"65\" r=\"12\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"195\" y=\"69\">3</text><circle cx=\"255\" cy=\"65\" r=\"12\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"255\" y=\"69\">2</text><circle cx=\"230\" cy=\"105\" r=\"12\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"230\" y=\"109\">5</text><line x1=\"230\" y1=\"37\" x2=\"203\" y2=\"53\" stroke=\"#64748b\"/><line x1=\"230\" y1=\"37\" x2=\"248\" y2=\"53\" stroke=\"#64748b\"/><line x1=\"255\" y1=\"77\" x2=\"242\" y2=\"93\" stroke=\"#64748b\"/></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "$B_0$ 為單節點;$B_1$ 由兩棵 $B_0$ 連結;$B_2$ 由兩棵 $B_1$ 連結。每棵 $B_k$ 恰有 $2^k$ 節點,根的度數為 $k$。",
              "en": "$B_0$ is a single node; $B_1$ links two $B_0$ trees; $B_2$ links two $B_1$ trees. Each $B_k$ has exactly $2^k$ nodes and root degree $k$."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "操作",
                "en": "Operation"
              },
              {
                "zh": "時間",
                "en": "Time"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "insert (攤銷)",
                  "en": "insert (amortized)"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "peek",
                  "en": "peek"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "extractTop (最壞)",
                  "en": "extractTop (worst)"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "merge (最壞)",
                  "en": "merge (worst)"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "decreaseKey (最壞)",
                  "en": "decreaseKey (worst)"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "空間合計",
                  "en": "Total Space"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{merge}}(N) = O(\\log N)",
            "caption": {
              "zh": "合併兩個大小為 $N$ 的二項堆積最多處理 $2\\lfloor\\log_2 N\\rfloor+2$ 棵樹,故為 $O(\\log N)$。",
              "en": "Merging two size-$N$ binomial heaps processes at most $2\\lfloor\\log_2 N\\rfloor+2$ trees, giving $O(\\log N)$."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "void linkTrees(BNode* rootY, BNode* rootZ) {\n    rootY->parent = rootZ;\n    rootY->sibling = rootZ->child;\n    rootZ->child = rootY;\n    rootZ->degree++;\n}\n\nBNode* unionHeaps(BNode* h1, BNode* h2) {\n    BNode* newHead = mergeRootLists(h1, h2);\n    if (!newHead)\n        return nullptr;\n\n    BNode *prev = nullptr, *curr = newHead, *next = curr->sibling;\n    while (next) {\n        bool degreeDiff = curr->degree != next->degree;\n        bool tripleSame = next->sibling && next->sibling->degree == curr->degree;\n        if (degreeDiff || tripleSame) {\n            prev = curr;\n            curr = next;\n        } else if (cmp(curr->key, next->key)) {\n            curr->sibling = next->sibling;\n            linkTrees(next, curr);\n        } else {\n            if (!prev)\n                newHead = next;\n            else\n                prev->sibling = next;\n            linkTrees(curr, next);\n            curr = next;\n        }\n        next = curr->sibling;\n    }\n    return newHead;\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:$O(\\log N)$ 合併,明顯優於 Binary Heap 的 $O(N+M)$(串接+build-heap)且支援更多使用場景。",
                "en": "Pro: $O(\\log N)$ merge — superior structure for repeated merges compared to Binary Heap's $O(N+M)$ concatenate+build-heap."
              },
              {
                "zh": "優點:插入攤銷 $O(1)$,連續插入效率高。",
                "en": "Pro: $O(1)$ amortized insert; efficient for sequential insertions."
              },
              {
                "zh": "缺點:指標結構,快取效能不如陣列式 Binary Heap。",
                "en": "Con: pointer-based; worse cache performance than array-based Binary Heap."
              },
              {
                "zh": "缺點:peek 需要線性掃描根串列 $O(\\log N)$;不提供 $O(1)$ peek。",
                "en": "Con: peek requires a linear scan of the root list — $O(\\log N)$, not $O(1)$."
              },
              {
                "zh": "適用:需要高效合併的優先佇列場景,如事件驅動模擬器、Prim 演算法的外部合併。",
                "en": "Use when efficient merges are critical: event-driven simulators, external-merge Prim MST."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "$N$ 個元素 → 至多 $\\lfloor\\log_2 N\\rfloor+1$ 棵樹,每個度數至多一棵。",
                "en": "$N$ elements → at most $\\lfloor\\log_2 N\\rfloor+1$ trees; at most one tree per degree."
              },
              {
                "zh": "合併 $O(\\log N)$,插入攤銷 $O(1)$,extractTop $O(\\log N)$ 最壞。",
                "en": "Merge $O(\\log N)$; insert $O(1)$ amortized; extractTop $O(\\log N)$ worst-case."
              },
              {
                "zh": "結構類比二進位加法:相同度數的樹做 link 如同進位操作。",
                "en": "Structure mirrors binary addition: linking equal-degree trees is analogous to carrying."
              }
            ]
          }
        ]
      }
    ]
  },
  "heap-fibonacci": {
    "category": "Heaps / Priority Queues",
    "title": {
      "zh": "費波那契堆積(Fibonacci Heap)",
      "en": "Fibonacci Heap"
    },
    "slides": [
      {
        "heading": {
          "zh": "費波那契堆積(Fibonacci Heap)",
          "en": "Fibonacci Heap"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "以循環雙向鏈結根串列延遲合併,配合 cut 與 cascading-cut 維持攤銷界,提供 $O(1)$ 攤銷 insert/merge/decrease-key 及 $O(\\log N)$ 攤銷 extractTop,是理論上最優的優先佇列。",
              "en": "A lazy-melding heap using a circular doubly-linked root list; cut and cascading-cut maintain amortized bounds: $O(1)$ amortized insert/merge/decrease-key and $O(\\log N)$ amortized extractTop — the theoretically optimal priority queue."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "所有樹根形成循環雙向鏈結串列(root list),`best` 指向最小根。consolidate 在 extractTop 時才整理結構。decrease-key 透過 cut 將節點移至根串列,再以 cascading-cut 確保父節點最多損失一個子節點。",
              "en": "All tree roots form a circular doubly-linked list (root list); `best` points to the minimum root. Consolidation is deferred until extractTop. decrease-key uses cut to move a node to the root list, and cascading-cut ensures no parent loses more than one child."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "insert:建立新節點加入根串列,若鍵值更小則更新 `best` — 純 $O(1)$。",
                "en": "insert: create node, splice into root list, update `best` if smaller — pure $O(1)$."
              },
              {
                "zh": "merge:將兩個根串列拼接,更新 `best` — $O(1)$ 攤銷。",
                "en": "merge: splice the two root lists, update `best` — $O(1)$ amortized."
              },
              {
                "zh": "consolidate:將根串列中度數相同的樹兩兩合併,使每個度數至多一棵(在 extractTop 中呼叫)。",
                "en": "consolidate: link trees of equal degree in the root list until each degree is unique (called inside extractTop)."
              },
              {
                "zh": "cascading-cut:若父節點已失去一個子節點(mark=true),則繼續向上 cut。",
                "en": "cascading-cut: if a parent has already lost one child (mark=true), continue cutting upward."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "decrease-key(x, k):令 x.key = k;若 k < parent.key,執行 cut(x)。",
                "en": "decrease-key(x, k): set x.key = k; if k < parent.key, call cut(x)."
              },
              {
                "zh": "cut(x):從父節點子串列移除 x,加入根串列,清除 mark。",
                "en": "cut(x): remove x from its parent's child list, add to root list, clear mark."
              },
              {
                "zh": "cascading-cut(parent):若 parent.mark=false 設為 true 並停止;若 true 繼續 cut(parent)。",
                "en": "cascading-cut(parent): if parent.mark is false set it true and stop; if true, cut(parent) and recurse."
              },
              {
                "zh": "extractTop:將 best 的子節點全部移至根串列,呼叫 consolidate 整理,更新 best。",
                "en": "extractTop: move all children of best to the root list, call consolidate, update best."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart TD\n  INSERT[\"insert(x)\\nO(1) amortized\"] --> ROOTLIST[\"add to root list\\nupdate best\"]\n  EXTRACT[\"extractTop\\nO(log N) amortized\"] --> PROMOTE[\"promote children\\nto root list\"]\n  PROMOTE --> CONSOLIDATE[\"consolidate\\n(link equal-degree trees)\"]\n  DKEY[\"decreaseKey\\nO(1) amortized\"] --> CUT[\"cut node\\nto root list\"]\n  CUT --> CCUT[\"cascading-cut\\n(parent chain)\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "Fibonacci 堆積根串列示意",
          "en": "Fibonacci Heap Root List Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 120\" width=\"360\" height=\"120\"><g font-family=\"sans-serif\" font-size=\"11\" text-anchor=\"middle\"><text x=\"180\" y=\"14\" font-size=\"10\" fill=\"#64748b\">root list (circular doubly-linked)</text><circle cx=\"60\" cy=\"50\" r=\"16\" fill=\"#fef9c3\" stroke=\"#ca8a04\" stroke-width=\"2\"/><text x=\"60\" y=\"54\">1</text><text x=\"60\" y=\"38\" font-size=\"9\" fill=\"#ca8a04\">best</text><circle cx=\"140\" cy=\"50\" r=\"16\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"140\" y=\"54\">5</text><circle cx=\"220\" cy=\"50\" r=\"16\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"220\" y=\"54\">3</text><circle cx=\"300\" cy=\"50\" r=\"16\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"300\" y=\"54\">8</text><line x1=\"76\" y1=\"50\" x2=\"124\" y2=\"50\" stroke=\"#64748b\" marker-end=\"url(#arr)\"/><line x1=\"156\" y1=\"50\" x2=\"204\" y2=\"50\" stroke=\"#64748b\"/><line x1=\"236\" y1=\"50\" x2=\"284\" y2=\"50\" stroke=\"#64748b\"/><path d=\"M 300 66 Q 180 110 60 66\" stroke=\"#64748b\" fill=\"none\"/><circle cx=\"140\" cy=\"90\" r=\"12\" fill=\"#dcfce7\" stroke=\"#16a34a\"/><text x=\"140\" y=\"94\">7</text><line x1=\"140\" y1=\"66\" x2=\"140\" y2=\"78\" stroke=\"#64748b\"/><text x=\"180\" y=\"115\" font-size=\"9\" fill=\"#64748b\">circular link back to best</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "根串列為循環雙向鏈結;`best` 指向最小根(key=1)。子樹可掛在任意根節點下,consolidate 前不整理。",
              "en": "The root list is circular and doubly-linked; `best` points to the minimum root (key=1). Subtrees hang under any root node and are not tidied until consolidate is called."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "操作",
                "en": "Operation"
              },
              {
                "zh": "時間",
                "en": "Time"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "insert",
                  "en": "insert"
                },
                {
                  "zh": "$O(1)$ 最壞",
                  "en": "$O(1)$ worst-case"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "peek",
                  "en": "peek"
                },
                {
                  "zh": "$O(1)$ 最壞",
                  "en": "$O(1)$ worst-case"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "merge",
                  "en": "merge"
                },
                {
                  "zh": "$O(1)$ 最壞",
                  "en": "$O(1)$ worst-case"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "decrease-key",
                  "en": "decrease-key"
                },
                {
                  "zh": "$O(1)$ 攤銷",
                  "en": "$O(1)$ amortized"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "extractTop",
                  "en": "extractTop"
                },
                {
                  "zh": "$O(\\log N)$ 攤銷",
                  "en": "$O(\\log N)$ amortized"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "delete",
                  "en": "delete"
                },
                {
                  "zh": "$O(\\log N)$ 攤銷",
                  "en": "$O(\\log N)$ amortized"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "空間合計",
                  "en": "Total Space"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{decrease-key}} = O(1)\\text{ amortized}",
            "caption": {
              "zh": "攤銷分析基於勢能函數 $\\Phi = t + 2m$($t$ 為根串列長度,$m$ 為有 mark 的節點數),保證 decrease-key 攤銷 $O(1)$。",
              "en": "Amortized analysis uses potential $\\Phi = t + 2m$ (t = root-list size, m = marked nodes), proving decrease-key costs $O(1)$ amortized."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "FNode* insert(int key) {\n    FNode* x = new FNode(key);\n    addToRootList(x);\n    n++;\n    return x;\n}\n\nvoid cut(FNode* x, FNode* y) { // x: child, y: parent\n    if (y->child == x)\n        y->child = (x->right != x) ? x->right : nullptr;\n    y->degree--;\n    removeNode(x);\n    addToRootList(x);\n}\n\nvoid cascadingCut(FNode* y) {\n    FNode* z = y->parent;\n    if (!z)\n        return;\n    if (!y->mark) {\n        y->mark = true;\n    } else {\n        cut(y, z);\n        cascadingCut(z);\n    }\n}\n\nvoid decreaseOrIncreaseKey(FNode* x, int newKey) {\n    x->key = newKey;\n    FNode* y = x->parent;\n    if (y && cmp(x->key, y->key)) {\n        cut(x, y);\n        cascadingCut(y);\n    }\n    if (!best || cmp(x->key, best->key))\n        best = x;\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:decrease-key $O(1)$ 攤銷是理論最優,使 Dijkstra 達 $O(E + V\\log V)$。",
                "en": "Pro: $O(1)$ amortized decrease-key is theoretically optimal, making Dijkstra run in $O(E + V\\log V)$."
              },
              {
                "zh": "優點:insert 與 merge 皆為 $O(1)$ 最壞,適合大量插入後集中 extract 的工作負載。",
                "en": "Pro: $O(1)$ worst-case insert and merge; ideal for insert-heavy then extract-heavy workloads."
              },
              {
                "zh": "缺點:實作複雜,常數因子大,指標密集,實際效能常遜於 Binary Heap。",
                "en": "Con: complex implementation, large constant factors, pointer-intensive — often slower in practice than Binary Heap."
              },
              {
                "zh": "缺點:consolidate 最壞單次 $O(N)$,但攤銷 $O(\\log N)$。",
                "en": "Con: consolidate is $O(N)$ worst-case single call, but $O(\\log N)$ amortized."
              },
              {
                "zh": "適用:decrease-key 頻繁的演算法(Dijkstra、Prim、網路流)之理論研究與競賽。",
                "en": "Use for decrease-key-heavy algorithms (Dijkstra, Prim, network flow) in theory research and competitive programming."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "延遲合併根串列:insert/merge/decrease-key 皆 $O(1)$ 攤銷。",
                "en": "Lazy root-list merging: insert, merge, and decrease-key are all $O(1)$ amortized."
              },
              {
                "zh": "extractTop 觸發 consolidate:攤銷 $O(\\log N)$。",
                "en": "extractTop triggers consolidate: $O(\\log N)$ amortized."
              },
              {
                "zh": "理論最優但實作複雜;適合以 decrease-key 為核心的圖演算法。",
                "en": "Theoretically optimal but complex; best suited to graph algorithms that rely heavily on decrease-key."
              }
            ]
          }
        ]
      }
    ]
  },
  "heap-leftist": {
    "category": "Heaps / Priority Queues",
    "title": {
      "zh": "左傾堆積(Leftist Heap)",
      "en": "Leftist Heap"
    },
    "slides": [
      {
        "heading": {
          "zh": "左傾堆積(Leftist Heap)",
          "en": "Leftist Heap"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "以 null-path-length (NPL) 為依據保持右脊最短的二元堆積,所有操作皆以 merge 為原語,提供 $O(\\log N)$ 合併、插入與取出。",
              "en": "A binary heap that keeps the right spine shortest by maintaining null-path-length (NPL) invariants; all operations are defined in terms of merge, giving $O(\\log N)$ meld, insert, and extract."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "節點的 NPL 定義為到達最近 null 子節點的最短路徑長度。左傾性質:對每個節點,左子節點的 NPL $\\geq$ 右子節點的 NPL,確保右脊長度 $\\leq \\log_2(N+1)$。",
              "en": "NPL of a node is the length of the shortest path to a null descendant. Leftist property: for every node, NPL(left child) $\\geq$ NPL(right child), bounding the right-spine length to $\\leq \\log_2(N+1)$."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "merge(a, b):較小根留下,其右子樹與另一棵堆積遞迴合併;若合併後右 NPL > 左 NPL,則交換左右子。",
                "en": "merge(a, b): keep the smaller root, recursively merge its right subtree with the other heap; swap children if NPL(right) > NPL(left) after merge."
              },
              {
                "zh": "insert(x):建立單節點堆積,與主堆積 merge。",
                "en": "insert(x): create a singleton heap, then merge with the main heap."
              },
              {
                "zh": "extractTop:移除根,merge 左右子樹。",
                "en": "extractTop: remove root, merge left and right subtrees."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "merge(a, b):若 a 為 null 回傳 b;若 b 為 null 回傳 a。",
                "en": "merge(a, b): if a is null return b; if b is null return a."
              },
              {
                "zh": "比較 a.key 與 b.key,令 a 為鍵值較小者(min-heap)。",
                "en": "Compare a.key and b.key; let a be the smaller-key node (min-heap)."
              },
              {
                "zh": "遞迴:a.right = merge(a.right, b)。",
                "en": "Recurse: a.right = merge(a.right, b)."
              },
              {
                "zh": "維護左傾性質:若 NPL(a.left) < NPL(a.right),交換 a 的左右子;更新 a.npl = NPL(a.right) + 1。",
                "en": "Restore leftist: if NPL(a.left) < NPL(a.right), swap children; update a.npl = NPL(a.right) + 1."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart TD\n  MA[\"merge(a, b)\"] --> CMP{\"a.key < b.key?\"}\n  CMP -->|\"yes\"| REC[\"a.right = merge(a.right, b)\"]\n  CMP -->|\"no\"| SWAP0[\"swap a and b, then recurse\"]\n  REC --> NPL{\"NPL(left) < NPL(right)?\"}\n  NPL -->|\"yes\"| SWAPLR[\"swap children\"]\n  NPL -->|\"no\"| UPD[\"update npl\"]\n  SWAPLR --> UPD"
          }
        ]
      },
      {
        "heading": {
          "zh": "左傾樹結構示意",
          "en": "Leftist Tree Structure"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 130\" width=\"300\" height=\"130\"><g font-family=\"sans-serif\" font-size=\"11\" text-anchor=\"middle\"><circle cx=\"150\" cy=\"20\" r=\"14\" fill=\"#fef9c3\" stroke=\"#ca8a04\"/><text x=\"150\" y=\"24\">1</text><text x=\"165\" y=\"14\" font-size=\"9\" fill=\"#64748b\">npl=1</text><circle cx=\"90\" cy=\"60\" r=\"14\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"90\" y=\"64\">3</text><text x=\"105\" y=\"54\" font-size=\"9\" fill=\"#64748b\">npl=1</text><circle cx=\"200\" cy=\"60\" r=\"14\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"200\" y=\"64\">2</text><text x=\"215\" y=\"54\" font-size=\"9\" fill=\"#64748b\">npl=0</text><circle cx=\"60\" cy=\"100\" r=\"14\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"60\" y=\"104\">6</text><text x=\"75\" y=\"94\" font-size=\"9\" fill=\"#64748b\">npl=0</text><circle cx=\"120\" cy=\"100\" r=\"14\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"120\" y=\"104\">5</text><text x=\"135\" y=\"94\" font-size=\"9\" fill=\"#64748b\">npl=0</text><line x1=\"150\" y1=\"34\" x2=\"100\" y2=\"47\" stroke=\"#64748b\"/><line x1=\"150\" y1=\"34\" x2=\"190\" y2=\"47\" stroke=\"#64748b\"/><line x1=\"90\" y1=\"74\" x2=\"68\" y2=\"87\" stroke=\"#64748b\"/><line x1=\"90\" y1=\"74\" x2=\"112\" y2=\"87\" stroke=\"#64748b\"/><text x=\"38\" y=\"120\" font-size=\"9\" fill=\"#94a3b8\">left spine</text><text x=\"220\" y=\"75\" font-size=\"9\" fill=\"#94a3b8\">right spine (short)</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "每個節點標示其 npl 值。左子 npl $\\geq$ 右子 npl;根的右脊極短,確保 merge 遞迴深度為 $O(\\log N)$。",
              "en": "Each node shows its npl value. Left npl $\\geq$ right npl; the right spine is kept very short, bounding merge recursion depth to $O(\\log N)$."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "操作",
                "en": "Operation"
              },
              {
                "zh": "時間(最壞)",
                "en": "Time (Worst)"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "merge",
                  "en": "merge"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                }
              ],
              [
                {
                  "zh": "insert",
                  "en": "insert"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                }
              ],
              [
                {
                  "zh": "peek",
                  "en": "peek"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "extractTop",
                  "en": "extractTop"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                }
              ],
              [
                {
                  "zh": "空間合計",
                  "en": "Total Space"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{merge}}(N) = O(\\log N)",
            "caption": {
              "zh": "merge 只沿右脊遞迴,右脊長度 $\\leq \\log_2(N+1)$,故每次 merge 最多 $O(\\log N)$ 步。",
              "en": "merge recurses only along the right spine, whose length is $\\leq \\log_2(N+1)$, so each merge takes at most $O(\\log N)$ steps."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "LNode* mergeNodes(LNode* a, LNode* b) {\n    if (!a)\n        return b;\n    if (!b)\n        return a;\n    if (!cmp(a->key, b->key))\n        swap(a, b); // ensure a has smaller key\n\n    a->right = mergeNodes(a->right, b); // recurse along right spine\n\n    // restore leftist property\n    if (getNpl(a->left) < getNpl(a->right))\n        swap(a->left, a->right);\n    a->npl = getNpl(a->right) + 1;\n    return a;\n}\n\nvoid insert(int x) { root = mergeNodes(root, new LNode(x)); }\n\nint extractTop() {\n    int out = root->key;\n    LNode *l = root->left, *r = root->right;\n    delete root;\n    root = mergeNodes(l, r);\n    return out;\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:$O(\\log N)$ merge,適合需要頻繁合併兩個獨立堆積的場景。",
                "en": "Pro: $O(\\log N)$ merge; ideal when merging two independent heaps frequently."
              },
              {
                "zh": "優點:結構規律(NPL 保證右脊短),易於分析。",
                "en": "Pro: regular structure (NPL guarantees short right spine) — easy to analyze."
              },
              {
                "zh": "缺點:需儲存 npl 欄位,且為指標結構,快取效能不如 Binary Heap。",
                "en": "Con: requires storing npl fields; pointer-based structure is less cache-friendly than Binary Heap."
              },
              {
                "zh": "缺點:decrease-key 無法像 Fibonacci Heap 達到 $O(1)$ 攤銷。",
                "en": "Con: decrease-key cannot achieve $O(1)$ amortized as in Fibonacci Heap."
              },
              {
                "zh": "適用:需要合併優先佇列的圖演算法、外部排序中的多路合併。",
                "en": "Use for graph algorithms with heap merges, and multi-way merge in external sorting."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "NPL 左傾性質保證右脊長度 $O(\\log N)$,所有操作皆以 merge 表達。",
                "en": "NPL leftist property bounds right-spine length to $O(\\log N)$; all operations expressed via merge."
              },
              {
                "zh": "merge/insert/extractTop 皆 $O(\\log N)$ 最壞;peek $O(1)$。",
                "en": "merge, insert, extractTop all $O(\\log N)$ worst-case; peek $O(1)$."
              },
              {
                "zh": "相較 Skew Heap 多一個 npl 欄位,但提供嚴格最壞保證(非攤銷)。",
                "en": "Compared to Skew Heap, one extra npl field per node, but provides strict worst-case (not amortized) bounds."
              }
            ]
          }
        ]
      }
    ]
  },
  "heap-skew": {
    "category": "Heaps / Priority Queues",
    "title": {
      "zh": "偏斜堆積(Skew Heap)",
      "en": "Skew Heap"
    },
    "slides": [
      {
        "heading": {
          "zh": "偏斜堆積(Skew Heap)",
          "en": "Skew Heap"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "自調整合併堆積:每次 merge 後無條件交換左右子節點,無需儲存 npl 欄位,以攤銷 $O(\\log N)$ 的代價完成 merge、insert 與 extractTop。",
              "en": "A self-adjusting merge heap that unconditionally swaps left and right children on every merge step — no npl field needed — achieving $O(\\log N)$ amortized for merge, insert, and extractTop."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "Skew Heap 是 Leftist Heap 的簡化版本:Leftist Heap 只在 NPL 違反時交換子節點,而 Skew Heap 每次都無條件交換,以攤銷分析保證 $O(\\log N)$ 效能而不維護任何平衡資訊。",
              "en": "Skew Heap is a simplification of Leftist Heap: Leftist swaps children only when the NPL property is violated; Skew swaps unconditionally every time, relying on amortized analysis for $O(\\log N)$ performance without any balance bookkeeping."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "merge(a, b):令較小根為 a;a.right = merge(a.right, b);然後無條件 swap(a.left, a.right)。",
                "en": "merge(a, b): let a be the smaller root; set a.right = merge(a.right, b); then unconditionally swap(a.left, a.right)."
              },
              {
                "zh": "insert(x):建立單節點堆積,與主堆積 merge。",
                "en": "insert(x): create a singleton heap, then merge with the main heap."
              },
              {
                "zh": "extractTop:移除根,merge 左右子樹。",
                "en": "extractTop: remove root, merge left and right subtrees."
              },
              {
                "zh": "無 npl 欄位,節點結構最小化。",
                "en": "No npl field — minimal node structure."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "merge(a, b):若任一為 null 回傳另一方。",
                "en": "merge(a, b): if either is null, return the other."
              },
              {
                "zh": "令 a 的根鍵值 $\\leq$ b 的根鍵值(若否則 swap(a, b))。",
                "en": "Ensure a.key $\\leq$ b.key (swap a and b if not)."
              },
              {
                "zh": "遞迴:a.right = merge(a.right, b)。",
                "en": "Recurse: a.right = merge(a.right, b)."
              },
              {
                "zh": "無條件交換 a 的左右子:swap(a.left, a.right)。回傳 a。",
                "en": "Unconditionally swap a's children: swap(a.left, a.right). Return a."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart TD\n  M[\"merge(a, b)\"] --> NULL{\"null check\"}\n  NULL -->|\"a or b null\"| RET[\"return non-null\"]\n  NULL -->|\"both non-null\"| CMP{\"a.key <= b.key?\"}\n  CMP -->|\"no\"| SWP[\"swap(a, b)\"]\n  CMP -->|\"yes\"| REC\n  SWP --> REC[\"a.right = merge(a.right, b)\"]\n  REC --> USWAP[\"swap(a.left, a.right)\\n(unconditional)\"]\n  USWAP --> RETA[\"return a\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "偏斜堆積結構示意",
          "en": "Skew Heap Structure Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 280 140\" width=\"280\" height=\"140\"><g font-family=\"sans-serif\" font-size=\"11\" text-anchor=\"middle\"><circle cx=\"140\" cy=\"20\" r=\"14\" fill=\"#fef9c3\" stroke=\"#ca8a04\"/><text x=\"140\" y=\"24\">2</text><circle cx=\"80\" cy=\"60\" r=\"14\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"80\" y=\"64\">5</text><circle cx=\"180\" cy=\"60\" r=\"14\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"180\" y=\"64\">7</text><circle cx=\"50\" cy=\"100\" r=\"14\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"50\" y=\"104\">12</text><circle cx=\"110\" cy=\"100\" r=\"14\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"110\" y=\"104\">18</text><circle cx=\"160\" cy=\"100\" r=\"14\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"160\" y=\"104\">30</text><line x1=\"140\" y1=\"34\" x2=\"90\" y2=\"47\" stroke=\"#64748b\"/><line x1=\"140\" y1=\"34\" x2=\"172\" y2=\"47\" stroke=\"#64748b\"/><line x1=\"80\" y1=\"74\" x2=\"58\" y2=\"87\" stroke=\"#64748b\"/><line x1=\"80\" y1=\"74\" x2=\"102\" y2=\"87\" stroke=\"#64748b\"/><line x1=\"180\" y1=\"74\" x2=\"165\" y2=\"87\" stroke=\"#64748b\"/><text x=\"140\" y=\"135\" font-size=\"9\" fill=\"#64748b\">no npl field; shape varies after merges</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "偏斜堆積無需維護 npl 欄位。每次 merge 後無條件交換子節點使樹形自然平衡,攤銷分析保證操作代價為 $O(\\log N)$。",
              "en": "No npl field is stored. Unconditional child swaps after each merge naturally balance the tree shape; amortized analysis guarantees $O(\\log N)$ per operation."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "操作",
                "en": "Operation"
              },
              {
                "zh": "攤銷時間",
                "en": "Amortized Time"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "merge",
                  "en": "merge"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                }
              ],
              [
                {
                  "zh": "insert",
                  "en": "insert"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                }
              ],
              [
                {
                  "zh": "peek",
                  "en": "peek"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "extractTop",
                  "en": "extractTop"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                }
              ],
              [
                {
                  "zh": "空間合計",
                  "en": "Total Space"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{merge}} = O(\\log N)\\text{ amortized}",
            "caption": {
              "zh": "以重 / 輕路徑勢能函數分析:無條件交換確保整個操作序列的平均代價為 $O(\\log N)$。",
              "en": "Heavy/light path potential analysis shows unconditional swaps amortize to $O(\\log N)$ over any sequence of operations."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "SNode* mergeNodes(SNode* a, SNode* b) {\n    if (!a)\n        return b;\n    if (!b)\n        return a;\n    if (!cmp(a->key, b->key))\n        swap(a, b); // ensure a has smaller key\n\n    a->right = mergeNodes(a->right, b); // recurse along right\n    swap(a->left, a->right);            // unconditional swap\n    return a;\n}\n\nvoid insert(int x) { root = mergeNodes(root, new SNode(x)); }\n\nint extractTop() {\n    int out = root->key;\n    SNode *l = root->left, *r = root->right;\n    delete root;\n    root = mergeNodes(l, r);\n    return out;\n}\n\nvoid merge(SkewHeap& other) {\n    root = mergeNodes(root, other.root);\n    other.root = nullptr;\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:比 Leftist Heap 更簡單,無需 npl 欄位,程式碼最精簡。",
                "en": "Pro: simpler than Leftist Heap — no npl field; minimal code."
              },
              {
                "zh": "優點:攤銷 $O(\\log N)$ merge,適合頻繁合併的場景。",
                "en": "Pro: $O(\\log N)$ amortized merge; suitable for frequent-merge scenarios."
              },
              {
                "zh": "缺點:單次操作最壞可能退化至 $O(N)$,不適合嚴格延遲要求的系統。",
                "en": "Con: single-call worst case can degrade to $O(N)$ — unsuitable for strict latency requirements."
              },
              {
                "zh": "缺點:指標結構,快取效能不如 Binary Heap。",
                "en": "Con: pointer-based; worse cache performance than Binary Heap."
              },
              {
                "zh": "適用:快速原型、教學展示、以及需要 merge 但不需 decrease-key 的中等規模應用。",
                "en": "Use for rapid prototyping, teaching, and moderate-scale applications needing merge but not decrease-key."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "Leftist Heap 的簡化:去掉 npl,每次 merge 無條件交換子節點。",
                "en": "Simplifies Leftist Heap: remove npl, swap children unconditionally on every merge."
              },
              {
                "zh": "merge/insert/extractTop 攤銷 $O(\\log N)$;peek $O(1)$。",
                "en": "merge, insert, extractTop: $O(\\log N)$ amortized; peek $O(1)$."
              },
              {
                "zh": "自調整性質使其結構隨操作序列自然平衡,無需顯式平衡資訊。",
                "en": "Self-adjusting nature naturally balances the structure over operation sequences — no explicit balance info needed."
              }
            ]
          }
        ]
      }
    ]
  },
  "heap-dary": {
    "category": "Heaps / Priority Queues",
    "title": {
      "zh": "D-ary 堆積(4-ary Heap)",
      "en": "D-ary Heap (4-ary)"
    },
    "slides": [
      {
        "heading": {
          "zh": "D-ary 堆積(4-ary Heap)",
          "en": "D-ary Heap (4-ary)"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "Binary Heap 的推廣:每個節點有 $d$ 個子節點($d=4$ 為 4-ary Heap),以更寬的樹減少 sift-up 次數,但 sift-down 每層需比較 $d$ 個子節點。",
              "en": "A generalization of Binary Heap where each node has $d$ children (here $d=4$); the wider tree reduces sift-up depth but sift-down compares $d$ children per level."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "節點 $i$ 的父節點為 $(i-1)/d$;第 $j$ 個子節點為 $i \\cdot d + j + 1$($j = 0, \\ldots, d-1$)。高度為 $\\lfloor\\log_d N\\rfloor$,比 Binary Heap 矮。",
              "en": "Node $i$ has parent $(i-1)/d$; its $j$-th child is $i \\cdot d + j + 1$ for $j = 0,\\ldots,d-1$. Tree height is $\\lfloor\\log_d N\\rfloor$ — shallower than Binary Heap."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "sift-up:每層只有一次比較(與父節點),步數為 $O(\\log_d N)$,比 Binary Heap 少。",
                "en": "sift-up: one comparison per level (with parent); $O(\\log_d N)$ steps — fewer than Binary Heap."
              },
              {
                "zh": "sift-down:每層需比較 $d$ 個子節點;總代價 $O(d \\log_d N)$。",
                "en": "sift-down: compares $d$ children per level; total cost $O(d \\log_d N)$."
              },
              {
                "zh": "insert 優化:大量 insert 場景下 $d > 2$ 可顯著減少 sift-up 的層數。",
                "en": "insert speedup: for insert-heavy workloads, $d > 2$ significantly reduces sift-up levels."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "insert(x):追加至陣列末端,執行 sift-up。每步比較 data[i] 與父節點 data[(i-1)/d]。",
                "en": "insert(x): append to array, then sift-up. Each step compares data[i] with parent data[(i-1)/d]."
              },
              {
                "zh": "extractTop:根與末端互換後移除末端。",
                "en": "extractTop: swap root with last element, pop the last."
              },
              {
                "zh": "sift-down:從根開始,在 $d$ 個子節點中找最小者(min-heap);若小於當前節點則互換並繼續。",
                "en": "sift-down: starting from root, find the minimum among $d$ children (min-heap); swap if it is smaller than current, then continue."
              },
              {
                "zh": "重複直到葉節點或不再違反 heap 性質。",
                "en": "Repeat until a leaf or no heap-property violation remains."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  A[\"insert(x)\\nappend + sift-up\"] --> B[\"compare with\\nparent (i-1)/d\"]\n  B --> C{\"parent > x?\"}\n  C -->|\"yes\"| D[\"swap, move up\"]\n  D --> B\n  C -->|\"no\"| E[\"done\"]\n  F[\"extractTop\\nswap root + sift-down\"] --> G[\"find min of\\nd children\"]\n  G --> H{\"min child < node?\"}\n  H -->|\"yes\"| I[\"swap, move down\"]\n  I --> G\n  H -->|\"no\"| E"
          }
        ]
      },
      {
        "heading": {
          "zh": "4-ary 堆積陣列示意",
          "en": "4-ary Heap Array Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 130\" width=\"380\" height=\"130\"><g font-family=\"sans-serif\" font-size=\"11\" text-anchor=\"middle\"><rect x=\"10\" y=\"10\" width=\"40\" height=\"28\" fill=\"#fef9c3\" stroke=\"#ca8a04\"/><text x=\"30\" y=\"28\">1</text><text x=\"30\" y=\"8\" font-size=\"9\" fill=\"#64748b\">i=0</text><rect x=\"60\" y=\"10\" width=\"40\" height=\"28\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"80\" y=\"28\">3</text><text x=\"80\" y=\"8\" font-size=\"9\" fill=\"#64748b\">i=1</text><rect x=\"110\" y=\"10\" width=\"40\" height=\"28\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"130\" y=\"28\">5</text><text x=\"130\" y=\"8\" font-size=\"9\" fill=\"#64748b\">i=2</text><rect x=\"160\" y=\"10\" width=\"40\" height=\"28\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"180\" y=\"28\">7</text><text x=\"180\" y=\"8\" font-size=\"9\" fill=\"#64748b\">i=3</text><rect x=\"210\" y=\"10\" width=\"40\" height=\"28\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"230\" y=\"28\">9</text><text x=\"230\" y=\"8\" font-size=\"9\" fill=\"#64748b\">i=4</text><rect x=\"260\" y=\"10\" width=\"40\" height=\"28\" fill=\"#e9d5ff\" stroke=\"#7c3aed\"/><text x=\"280\" y=\"28\">4</text><text x=\"280\" y=\"8\" font-size=\"9\" fill=\"#64748b\">i=5</text><rect x=\"310\" y=\"10\" width=\"40\" height=\"28\" fill=\"#e9d5ff\" stroke=\"#7c3aed\"/><text x=\"330\" y=\"28\">6</text><text x=\"330\" y=\"8\" font-size=\"9\" fill=\"#64748b\">i=6</text><circle cx=\"100\" cy=\"80\" r=\"14\" fill=\"#fef9c3\" stroke=\"#ca8a04\"/><text x=\"100\" y=\"84\">1</text><circle cx=\"30\" cy=\"115\" r=\"12\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"30\" y=\"119\">3</text><circle cx=\"70\" cy=\"115\" r=\"12\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"70\" y=\"119\">5</text><circle cx=\"110\" cy=\"115\" r=\"12\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"110\" y=\"119\">7</text><circle cx=\"150\" cy=\"115\" r=\"12\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"150\" y=\"119\">9</text><line x1=\"100\" y1=\"94\" x2=\"38\" y2=\"104\" stroke=\"#64748b\"/><line x1=\"100\" y1=\"94\" x2=\"72\" y2=\"104\" stroke=\"#64748b\"/><line x1=\"100\" y1=\"94\" x2=\"108\" y2=\"104\" stroke=\"#64748b\"/><line x1=\"100\" y1=\"94\" x2=\"142\" y2=\"104\" stroke=\"#64748b\"/><text x=\"300\" y=\"80\" font-size=\"9\" fill=\"#64748b\">blue: children of root</text><text x=\"300\" y=\"95\" font-size=\"9\" fill=\"#64748b\">purple: grandchildren</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "4-ary Heap:根節點(i=0)有 4 個子節點(i=1..4),每個子節點再各有 4 個子節點(i=5..20...)。高度為 $\\lfloor\\log_4 N\\rfloor$。",
              "en": "4-ary Heap: the root (i=0) has 4 children (i=1..4); each child has 4 grandchildren (i=5..20...). Height is $\\lfloor\\log_4 N\\rfloor$."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "操作",
                "en": "Operation"
              },
              {
                "zh": "時間(最壞)",
                "en": "Time (Worst)"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "insert",
                  "en": "insert"
                },
                {
                  "zh": "$O(\\log_d N)$",
                  "en": "$O(\\log_d N)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "peek",
                  "en": "peek"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "extractTop",
                  "en": "extractTop"
                },
                {
                  "zh": "$O(d \\cdot \\log_d N)$",
                  "en": "$O(d \\cdot \\log_d N)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "decreaseKey",
                  "en": "decreaseKey"
                },
                {
                  "zh": "$O(\\log_d N)$",
                  "en": "$O(\\log_d N)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "空間合計",
                  "en": "Total Space"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{siftDown}}(N) = O(d \\cdot \\log_d N)",
            "caption": {
              "zh": "sift-down 每層比較 $d$ 個子節點,樹高 $\\log_d N$,故總比較次數為 $d \\cdot \\log_d N$。對 $d=4$:每層 4 次比較,高度 $\\log_4 N \\approx 0.5 \\log_2 N$。",
              "en": "sift-down compares $d$ children per level; height is $\\log_d N$, giving $d \\cdot \\log_d N$ comparisons total. For $d=4$: 4 compares per level, height $\\approx 0.5\\log_2 N$."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "void siftUp(int index) {\n    while (index > 0) {\n        int p = (index - 1) / d;\n        if (!cmp(data[index], data[p]))\n            break;\n        swap(data[index], data[p]);\n        index = p;\n    }\n}\n\nvoid siftDown(int index) {\n    while (true) {\n        int best = index;\n        for (int offset = 0; offset < d; ++offset) {\n            int c = index * d + offset + 1;\n            if (c < (int)data.size() && cmp(data[c], data[best]))\n                best = c;\n        }\n        if (best == index)\n            break;\n        swap(data[index], data[best]);\n        index = best;\n    }\n}\n\nvoid insert(int value) {\n    data.push_back(value);\n    siftUp((int)data.size() - 1);\n}\n\nint extractTop() {\n    int top = data[0];\n    data[0] = data.back();\n    data.pop_back();\n    if (!data.empty())\n        siftDown(0);\n    return top;\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:sift-up 步數為 $O(\\log_d N)$,大 $d$ 時顯著少於 Binary Heap。",
                "en": "Pro: sift-up takes $O(\\log_d N)$ steps — significantly fewer than Binary Heap for large $d$."
              },
              {
                "zh": "優點:陣列連續儲存,快取友好。",
                "en": "Pro: contiguous array storage gives good cache performance."
              },
              {
                "zh": "缺點:sift-down 每層比較 $d$ 個子節點,$d$ 大時單次 extract 比較次數多。",
                "en": "Con: sift-down compares $d$ children per level; large $d$ increases comparisons per extract."
              },
              {
                "zh": "缺點:最佳 $d$ 取決於工作負載(insert vs extract 比例)及快取大小,需調參。",
                "en": "Con: optimal $d$ depends on workload (insert-to-extract ratio) and cache size — requires tuning."
              },
              {
                "zh": "適用:insert 遠多於 extract 的場景(如 Dijkstra 在稀疏圖);$d=4$ 通常是實踐中的良好預設。",
                "en": "Use when inserts far outnumber extracts (e.g. Dijkstra on sparse graphs); $d=4$ is a good practical default."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "每節點有 $d$ 個子節點;父節點 $(i-1)/d$,第 $j$ 子 $id+j+1$。",
                "en": "Each node has $d$ children; parent is $(i-1)/d$, $j$-th child is $id+j+1$."
              },
              {
                "zh": "insert $O(\\log_d N)$;extractTop $O(d\\log_d N)$;peek $O(1)$。",
                "en": "insert $O(\\log_d N)$; extractTop $O(d\\log_d N)$; peek $O(1)$."
              },
              {
                "zh": "$d=4$ 在 insert 密集的工作負載下通常優於 Binary Heap;$d=2$ 在 extract 密集時更佳。",
                "en": "$d=4$ typically outperforms Binary Heap for insert-heavy workloads; $d=2$ is better for extract-heavy."
              }
            ]
          }
        ]
      }
    ]
  },
  "heap-pairing": {
    "category": "Heaps / Priority Queues",
    "title": {
      "zh": "配對堆積(Pairing Heap)",
      "en": "Pairing Heap"
    },
    "slides": [
      {
        "heading": {
          "zh": "配對堆積(Pairing Heap)",
          "en": "Pairing Heap"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "以 meld(配對連結)為核心原語的多叉樹堆積:insert 與 merge 為 $O(1)$,extractTop 執行成對合併(two-pass pairing),攤銷 $O(\\log N)$,實際效能接近 Fibonacci Heap。",
              "en": "A multiway-tree heap where meld is the core primitive: insert and merge cost $O(1)$; extractTop performs two-pass pairing of children, amortized $O(\\log N)$ — practical performance rivals Fibonacci Heap."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "每個節點儲存第一個子節點指標與下一個兄弟指標。meld 操作比較兩根的鍵值,鍵值較大者成為較小者的第一個子節點。extractTop 移除根後對其所有子節點執行 two-pass pairing:先左到右兩兩配對,再右到左合併。",
              "en": "Each node stores a pointer to its first child and its next sibling. meld compares two roots; the larger-key root becomes the first child of the smaller-key root. extractTop removes the root, then performs two-pass pairing on all its children: first pair left-to-right, then merge right-to-left."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "meld(a, b):令鍵值較小的根為 a;b.sibling = a.child;a.child = b;回傳 a — $O(1)$。",
                "en": "meld(a, b): let a be the smaller root; b.sibling = a.child; a.child = b; return a — $O(1)$."
              },
              {
                "zh": "insert(x):建立新節點,meld 至主堆積 — $O(1)$。",
                "en": "insert(x): create node, meld into main heap — $O(1)$."
              },
              {
                "zh": "extractTop:移除根,對子節點串列執行 mergePairs — 攤銷 $O(\\log N)$。",
                "en": "extractTop: remove root, call mergePairs on the child list — $O(\\log N)$ amortized."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "extractTop:根移除後取得其子節點串列(兄弟鏈)。",
                "en": "extractTop: after removing the root, obtain its child list (sibling chain)."
              },
              {
                "zh": "mergePairs — 第一遍(左至右):取出前兩個子節點,meld 為一棵樹,繼續處理剩餘串列。",
                "en": "mergePairs pass 1 (left-to-right): take the first two children, meld them into one tree, continue with the rest."
              },
              {
                "zh": "mergePairs — 第二遍(右至左):將第一遍產生的成對樹從右到左依序 meld。",
                "en": "mergePairs pass 2 (right-to-left): meld the paired trees from right to left."
              },
              {
                "zh": "最終得到一棵符合 heap 性質的樹,其根為新最小值。",
                "en": "The result is a single heap-ordered tree; its root is the new minimum."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  INSERT[\"insert(x)\\nmeld with root\\nO(1)\"] --> ROOT[\"update root\\nif x.key < root.key\"]\n  EXTRACT[\"extractTop\\nremove root\"] --> P1[\"pass 1: pair children\\nleft-to-right\"]\n  P1 --> P2[\"pass 2: meld pairs\\nright-to-left\"]\n  P2 --> NEWROOT[\"new root = final meld\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "配對堆積結構示意",
          "en": "Pairing Heap Structure Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 130\" width=\"300\" height=\"130\"><g font-family=\"sans-serif\" font-size=\"11\" text-anchor=\"middle\"><circle cx=\"150\" cy=\"18\" r=\"14\" fill=\"#fef9c3\" stroke=\"#ca8a04\"/><text x=\"150\" y=\"22\">2</text><circle cx=\"60\" cy=\"58\" r=\"12\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"60\" y=\"62\">5</text><circle cx=\"100\" cy=\"58\" r=\"12\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"100\" y=\"62\">7</text><circle cx=\"150\" cy=\"58\" r=\"12\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"150\" y=\"62\">12</text><circle cx=\"200\" cy=\"58\" r=\"12\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"200\" y=\"62\">18</text><circle cx=\"50\" cy=\"98\" r=\"10\" fill=\"#dcfce7\" stroke=\"#16a34a\"/><text x=\"50\" y=\"102\">30</text><circle cx=\"80\" cy=\"98\" r=\"10\" fill=\"#dcfce7\" stroke=\"#16a34a\"/><text x=\"80\" y=\"102\">9</text><line x1=\"150\" y1=\"32\" x2=\"65\" y2=\"47\" stroke=\"#64748b\"/><line x1=\"65\" y1=\"47\" x2=\"95\" y2=\"47\" stroke=\"#64748b\" stroke-dasharray=\"4\"/><line x1=\"95\" y1=\"47\" x2=\"145\" y2=\"47\" stroke=\"#64748b\" stroke-dasharray=\"4\"/><line x1=\"145\" y1=\"47\" x2=\"193\" y2=\"47\" stroke=\"#64748b\" stroke-dasharray=\"4\"/><line x1=\"60\" y1=\"70\" x2=\"52\" y2=\"89\" stroke=\"#64748b\"/><line x1=\"52\" y1=\"89\" x2=\"75\" y2=\"89\" stroke=\"#64748b\" stroke-dasharray=\"4\"/><text x=\"150\" y=\"120\" font-size=\"9\" fill=\"#64748b\">solid: child link; dashed: sibling chain</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "根的所有子節點以兄弟鏈(sibling chain)相連,插入時只需改變頭部指標。extractTop 時對整條兄弟鏈進行兩遍配對合併。",
              "en": "All children of a root are linked in a sibling chain; insert only modifies the head pointer. extractTop processes the entire sibling chain with two-pass pairing."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "操作",
                "en": "Operation"
              },
              {
                "zh": "攤銷時間",
                "en": "Amortized Time"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "insert",
                  "en": "insert"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "peek",
                  "en": "peek"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "merge",
                  "en": "merge"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "extractTop",
                  "en": "extractTop"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "decrease-key (近似)",
                  "en": "decrease-key (approx.)"
                },
                {
                  "zh": "$O(\\log N)$",
                  "en": "$O(\\log N)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "空間合計",
                  "en": "Total Space"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{extractTop}} = O(\\log N)\\text{ amortized}",
            "caption": {
              "zh": "Pairing Heap 的精確攤銷界尚未完全被證明達到 Fibonacci Heap 的 $O(1)$ decrease-key;extractTop 已被證明攤銷 $O(\\log N)$。",
              "en": "The exact amortized bound for decrease-key in Pairing Heap has not been proven to match Fibonacci Heap's $O(1)$; extractTop is proven $O(\\log N)$ amortized."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "PNode* meld(PNode* a, PNode* b) {\n    if (!a)\n        return b;\n    if (!b)\n        return a;\n    if (!cmp(a->key, b->key))\n        swap(a, b); // a has smaller key\n    b->sibling = a->child;\n    a->child = b;\n    return a;\n}\n\nPNode* mergePairs(PNode* node) {\n    if (!node || !node->sibling)\n        return node;\n    PNode* first = node;\n    PNode* second = node->sibling;\n    PNode* rest = second->sibling;\n    first->sibling = nullptr;\n    second->sibling = nullptr;\n    return meld(meld(first, second), mergePairs(rest));\n}\n\nvoid insert(int value) { root = meld(root, new PNode(value)); }\n\nint extractTop() {\n    int top = root->key;\n    PNode* oldRoot = root;\n    root = mergePairs(root->child);\n    oldRoot->child = nullptr;\n    delete oldRoot;\n    return top;\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:實作遠比 Fibonacci Heap 簡單,實際效能接近甚至超越後者。",
                "en": "Pro: far simpler to implement than Fibonacci Heap, with comparable or better practical performance."
              },
              {
                "zh": "優點:insert 與 merge 均為 $O(1)$,extractTop 攤銷 $O(\\log N)$。",
                "en": "Pro: insert and merge are $O(1)$; extractTop is $O(\\log N)$ amortized."
              },
              {
                "zh": "缺點:decrease-key 的精確攤銷界仍是開放問題(目前已知上界為 $O(2^{2\\sqrt{\\log \\log N}})$)。",
                "en": "Con: tight amortized bound for decrease-key is an open problem (currently known upper bound: $O(2^{2\\sqrt{\\log \\log N}})$)."
              },
              {
                "zh": "缺點:指標結構,快取效能不如陣列式堆積。",
                "en": "Con: pointer-based; worse cache performance than array-based heaps."
              },
              {
                "zh": "適用:需要高效 insert/merge 的實際應用,是 Fibonacci Heap 更易實作的替代品。",
                "en": "Use for practical applications needing efficient insert/merge — a simpler drop-in alternative to Fibonacci Heap."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "多叉樹以兄弟鏈表示;meld 為 $O(1)$ 核心操作。",
                "en": "Multiway tree represented by sibling chain; meld is the $O(1)$ core operation."
              },
              {
                "zh": "insert/merge $O(1)$;extractTop 攤銷 $O(\\log N)$;實際效能優異。",
                "en": "insert/merge $O(1)$; extractTop $O(\\log N)$ amortized; excellent practical performance."
              },
              {
                "zh": "比 Fibonacci Heap 更簡單,是業界首選的高效優先佇列實作之一。",
                "en": "Simpler than Fibonacci Heap; one of the preferred high-performance priority queue implementations in practice."
              }
            ]
          }
        ]
      }
    ]
  },
  "hash-chain": {
    "category": "Hash & Probabilistic",
    "title": {
      "zh": "雜湊表(分離鏈結法)",
      "en": "Hash Table (Separate Chaining)"
    },
    "slides": [
      {
        "heading": {
          "zh": "雜湊表(分離鏈結法)",
          "en": "Hash Table (Separate Chaining)"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "分離鏈結法以雜湊函數將 key 映射至索引,每個桶(bucket)維護一條獨立的鏈結串列以容納多筆碰撞(collision)元素,load factor 可超過 1.0。",
              "en": "Separate Chaining maps each key to a bucket index via a hash function; each bucket holds an independent linked list of colliding entries, allowing the load factor to exceed 1.0."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "陣列的每個位置儲存一個指向鏈結串列頭節點的指標。當兩個 key 雜湊至相同索引時,新節點插入至該串列的頭端,時間為 $O(1)$。",
              "en": "Each array slot stores a pointer to the head of a linked list. When two keys hash to the same index, the new node is prepended to that list in $O(1)$ time."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "insert:計算 `key % TABLE_SIZE` 得索引,建立新節點插入鏈結串列頭端。",
                "en": "insert: compute `key % TABLE_SIZE` for the index, create a new node, and prepend it to the list."
              },
              {
                "zh": "search:雜湊至對應桶後,線性遍歷鏈結串列比對 key。",
                "en": "search: hash to the bucket, then linearly traverse the list to match the key."
              },
              {
                "zh": "load factor $\\alpha = n / m$($n$:元素數,$m$:桶數);平均鏈長為 $\\alpha$。",
                "en": "load factor $\\alpha = n / m$ ($n$: elements, $m$: buckets); average chain length equals $\\alpha$."
              },
              {
                "zh": "碰撞不影響其他桶,且 load factor 可大於 1。",
                "en": "Collisions are contained within a single bucket; the load factor may exceed 1."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "計算雜湊索引:`idx = key % TABLE_SIZE`。",
                "en": "Compute hash index: `idx = key % TABLE_SIZE`."
              },
              {
                "zh": "建立新節點,令其 `next` 指向 `table[idx]`。",
                "en": "Create a new node; set its `next` to `table[idx]`."
              },
              {
                "zh": "更新 `table[idx]` 指向新節點(頭端插入)。",
                "en": "Update `table[idx]` to point to the new node (head insertion)."
              },
              {
                "zh": "搜尋時遍歷對應桶的串列直至找到 key 或抵達 null。",
                "en": "To search, traverse the corresponding bucket's list until the key is found or null is reached."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart TD\n  K[\"key=33\\nhashIdx=33%5=3\"] --> B3[\"Bucket[3] head\"]\n  B3 --> N33[\"Node(33)->null\"]\n  K2[\"key=43\\nhashIdx=43%5=3\"] --> B3\n  B3 --> N43[\"Node(43)->Node(33)->null\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "記憶體結構示意",
          "en": "Memory Layout Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 130\" width=\"380\" height=\"130\"><g font-family=\"sans-serif\" font-size=\"12\"><rect x=\"10\" y=\"10\" width=\"60\" height=\"22\" fill=\"#e0f2fe\" stroke=\"#0284c7\"/><text x=\"40\" y=\"26\" text-anchor=\"middle\">[0] null</text><rect x=\"10\" y=\"35\" width=\"60\" height=\"22\" fill=\"#e0f2fe\" stroke=\"#0284c7\"/><text x=\"40\" y=\"51\" text-anchor=\"middle\">[1] null</text><rect x=\"10\" y=\"60\" width=\"60\" height=\"22\" fill=\"#e0f2fe\" stroke=\"#0284c7\"/><text x=\"40\" y=\"76\" text-anchor=\"middle\">[2] null</text><rect x=\"10\" y=\"85\" width=\"60\" height=\"22\" fill=\"#dbeafe\" stroke=\"#2563eb\" stroke-width=\"2\"/><text x=\"40\" y=\"101\" text-anchor=\"middle\" fill=\"#1d4ed8\">[3] ──▶</text><rect x=\"10\" y=\"110\" width=\"60\" height=\"22\" fill=\"#e0f2fe\" stroke=\"#0284c7\"/><text x=\"40\" y=\"126\" text-anchor=\"middle\">[4] null</text><rect x=\"90\" y=\"85\" width=\"60\" height=\"22\" fill=\"#dcfce7\" stroke=\"#16a34a\"/><text x=\"120\" y=\"101\" text-anchor=\"middle\">43 ──▶</text><rect x=\"165\" y=\"85\" width=\"60\" height=\"22\" fill=\"#dcfce7\" stroke=\"#16a34a\"/><text x=\"195\" y=\"101\" text-anchor=\"middle\">33 ──▶</text><text x=\"240\" y=\"101\" fill=\"#64748b\">null</text><text x=\"40\" y=\"8\" text-anchor=\"middle\" fill=\"#64748b\">TABLE</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "桶 3 的鏈結串列頭端為最後插入的 43,其後接 33(均滿足 `key % 5 == 3`)。insert 採頭端插入,因此後插入的 43 位於鏈首。其餘桶為 null。",
              "en": "Bucket 3's linked list has 43 at the head (most recently inserted) followed by 33 (both satisfy `key % 5 == 3`). Because insert prepends at the head, the last-inserted key 43 appears first."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "操作",
                "en": "Operation"
              },
              {
                "zh": "平均時間",
                "en": "Avg Time"
              },
              {
                "zh": "最壞時間",
                "en": "Worst Time"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "insert",
                  "en": "insert"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "search",
                  "en": "search"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "delete",
                  "en": "delete"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "空間合計",
                  "en": "Total Space"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "$O(N+M)$",
                  "en": "$O(N+M)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "E[\\text{chain length}] = \\alpha = \\frac{n}{m}",
            "caption": {
              "zh": "平均鏈長等於 load factor $\\alpha$;當 $\\alpha$ 有界時 search 為 $O(1)$ 平均。最壞情況:所有 $N$ 個 key 雜湊至同一桶,退化為 $O(N)$。",
              "en": "Average chain length equals load factor $\\alpha$; search is $O(1)$ average when $\\alpha$ is bounded. Worst case: all $N$ keys hash to one bucket, degrading to $O(N)$."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "struct Node {\n    int data;\n    Node* next;\n    Node(int val) : data(val), next(nullptr) {}\n};\n\nclass HashChaining {\n    int TABLE_SIZE;\n    Node** table;\n\npublic:\n    HashChaining(int size = 5) {\n        TABLE_SIZE = size;\n        table = new Node*[TABLE_SIZE];\n        for (int i = 0; i < TABLE_SIZE; i++)\n            table[i] = nullptr;\n    }\n    int hashFunction(int key) { return key % TABLE_SIZE; }\n    void insert(int key) {\n        int hashIdx = hashFunction(key);\n        Node* newNode = new Node(key);\n        newNode->next = table[hashIdx]; // prepend\n        table[hashIdx] = newNode;\n    }\n    void display() {\n        for (int i = 0; i < TABLE_SIZE; i++) {\n            cout << \"[\" << i << \"] --> \";\n            for (Node* t = table[i]; t; t = t->next)\n                cout << t->data << \" -> \";\n            cout << \"NULL\\n\";\n        }\n    }\n};"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:load factor 可超過 1,不需預留充裕空間。",
                "en": "Pro: load factor may exceed 1 — no need to over-provision capacity."
              },
              {
                "zh": "優點:碰撞僅影響該桶的串列,不引發全表位移。",
                "en": "Pro: collisions only affect the local bucket list; no table-wide displacement."
              },
              {
                "zh": "優點:刪除簡單:直接從串列摘除節點即可。",
                "en": "Pro: deletion is straightforward — remove the node from the list."
              },
              {
                "zh": "缺點:每個節點需額外指標空間,記憶體不連續,快取效能較差。",
                "en": "Con: each node carries a pointer overhead; non-contiguous memory reduces cache efficiency."
              },
              {
                "zh": "缺點:雜湊函數分佈不均時,長鏈退化為 $O(N)$。",
                "en": "Con: a poorly distributed hash function produces long chains and degrades to $O(N)$."
              },
              {
                "zh": "適用:無法預知元素數量、需要簡單刪除、或 load factor 高的場景。",
                "en": "Use when element count is unpredictable, simple deletion is needed, or a high load factor is expected."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "每個桶維護一條鏈結串列;碰撞在桶內就地解決。",
                "en": "Each bucket maintains a linked list; collisions are resolved locally within the bucket."
              },
              {
                "zh": "平均操作 $O(1)$,最壞 $O(N)$;空間 $O(N+M)$。",
                "en": "Average $O(1)$ operations, worst-case $O(N)$; space $O(N+M)$."
              },
              {
                "zh": "load factor $\\alpha = n/m$ 決定平均鏈長;分離鏈結法允許 $\\alpha > 1$,但將 $\\alpha$ 維持在小常數可確保操作平均 $O(1)$。",
                "en": "Load factor $\\alpha = n/m$ determines average chain length; separate chaining allows $\\alpha > 1$, but keeping $\\alpha$ bounded by a small constant ensures $O(1)$ average operations."
              }
            ]
          }
        ]
      }
    ]
  },
  "hash-open": {
    "category": "Hash & Probabilistic",
    "title": {
      "zh": "雜湊表(開放定址法)",
      "en": "Hash Table (Open Addressing)"
    },
    "slides": [
      {
        "heading": {
          "zh": "雜湊表(開放定址法)",
          "en": "Hash Table (Open Addressing)"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "開放定址法將所有元素儲存於陣列本身;碰撞時以線性探測(linear probing)依序尋找下一個空槽,load factor 不可超過 1.0。",
              "en": "Open Addressing stores all elements inside the array itself; on collision, linear probing scans successive slots until an empty one is found, so the load factor must stay below 1.0."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "陣列每個槽僅存放一個元素(或哨兵值 -1 表示空)。碰撞時以 `(idx+1) % TABLE_SIZE` 線性遞增探索,直到找到空槽。",
              "en": "Each array slot holds exactly one element (or sentinel -1 for empty). On collision, the probe sequence `(idx+1) % TABLE_SIZE` advances linearly until an empty slot is found."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "insert:雜湊得初始索引;若槽已佔用則線性探測至空槽後寫入。",
                "en": "insert: hash to initial index; if occupied, probe linearly until an empty slot is found."
              },
              {
                "zh": "陣列已滿(`curr_size >= TABLE_SIZE`)時拒絕插入。",
                "en": "Insertion is rejected when the array is full (`curr_size >= TABLE_SIZE`)."
              },
              {
                "zh": "主叢集(Primary Clustering):連續佔用的槽使後續探測路徑更長。",
                "en": "Primary Clustering: consecutive occupied slots lengthen the probe sequence for subsequent insertions."
              },
              {
                "zh": "load factor 必須小於 1(本實作在 `curr_size >= TABLE_SIZE` 時拒絕)。",
                "en": "The load factor must remain below 1 (this implementation rejects when `curr_size >= TABLE_SIZE`)."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "計算初始索引:`idx = key % TABLE_SIZE`。",
                "en": "Compute initial index: `idx = key % TABLE_SIZE`."
              },
              {
                "zh": "若 `table[idx] != -1`(碰撞),令 `idx = (idx+1) % TABLE_SIZE` 並重複。",
                "en": "If `table[idx] != -1` (collision), set `idx = (idx+1) % TABLE_SIZE` and repeat."
              },
              {
                "zh": "找到空槽後寫入 key,遞增 `curr_size`。",
                "en": "Once an empty slot is found, write the key and increment `curr_size`."
              },
              {
                "zh": "若 `curr_size >= TABLE_SIZE` 則輸出「Hash Table Full!」並返回 false。",
                "en": "If `curr_size >= TABLE_SIZE`, print \"Hash Table Full!\" and return false."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  K1[\"insert 42\\nidx=42%5=2\"] --> S2[\"slot[2]=42\"]\n  K2[\"insert 12\\nidx=12%5=2\\ncollision!\"] --> S2\n  S2 -->|\"probe +1\"| S3[\"slot[3]=12\"]\n  K3[\"insert 32\\nidx=32%5=2\\ncollision!\"] --> S2\n  S2 -->|\"probe +1\"| S3\n  S3 -->|\"probe +1\"| S4[\"slot[4]=32\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "探測序列示意",
          "en": "Probe Sequence Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 90\" width=\"360\" height=\"90\"><g font-family=\"sans-serif\" font-size=\"12\"><rect x=\"10\" y=\"30\" width=\"60\" height=\"28\" fill=\"#e0f2fe\" stroke=\"#0284c7\"/><text x=\"40\" y=\"49\" text-anchor=\"middle\">[0] -1</text><rect x=\"75\" y=\"30\" width=\"60\" height=\"28\" fill=\"#e0f2fe\" stroke=\"#0284c7\"/><text x=\"105\" y=\"49\" text-anchor=\"middle\">[1] -1</text><rect x=\"140\" y=\"30\" width=\"60\" height=\"28\" fill=\"#fef3c7\" stroke=\"#d97706\" stroke-width=\"2\"/><text x=\"170\" y=\"49\" text-anchor=\"middle\" fill=\"#92400e\">[2] 42</text><rect x=\"205\" y=\"30\" width=\"60\" height=\"28\" fill=\"#fef3c7\" stroke=\"#d97706\" stroke-width=\"2\"/><text x=\"235\" y=\"49\" text-anchor=\"middle\" fill=\"#92400e\">[3] 12</text><rect x=\"270\" y=\"30\" width=\"60\" height=\"28\" fill=\"#fef3c7\" stroke=\"#d97706\" stroke-width=\"2\"/><text x=\"300\" y=\"49\" text-anchor=\"middle\" fill=\"#92400e\">[4] 32</text><text x=\"170\" y=\"22\" text-anchor=\"middle\" fill=\"#d97706\">hash(42,12,32)=2</text><path d=\"M170 58 L235 58\" stroke=\"#dc2626\" stroke-width=\"1.5\" marker-end=\"url(#arr)\"/><path d=\"M235 58 L300 58\" stroke=\"#dc2626\" stroke-width=\"1.5\" marker-end=\"url(#arr)\"/><defs><marker id=\"arr\" markerWidth=\"6\" markerHeight=\"6\" refX=\"3\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#dc2626\"/></marker></defs><text x=\"185\" y=\"80\" text-anchor=\"middle\" fill=\"#dc2626\">linear probe +1</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "42、12、32 均雜湊至槽 2(均滿足 `key % 5 == 2`)。線性探測依序將 12 放入槽 3、32 放入槽 4。主叢集效應使後續插入探測距離更長。",
              "en": "42, 12, and 32 all hash to slot 2 (`key % 5 == 2`). Linear probing places 12 in slot 3 and 32 in slot 4. The primary clustering effect increases probe distances for subsequent insertions."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "操作",
                "en": "Operation"
              },
              {
                "zh": "平均時間",
                "en": "Avg Time"
              },
              {
                "zh": "最壞時間",
                "en": "Worst Time"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "insert",
                  "en": "insert"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "search",
                  "en": "search"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                },
                {
                  "zh": "$O(N)$",
                  "en": "$O(N)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "空間合計",
                  "en": "Total Space"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "$O(M)$",
                  "en": "$O(M)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "E[\\text{probes}] \\approx \\frac{1}{2}\\left(1 + \\frac{1}{(1-\\alpha)^2}\\right) \\quad (\\alpha < 1)",
            "caption": {
              "zh": "此為 Knuth 推導的線性探測不成功搜尋公式;由於主叢集(primary clustering)效應,線性探測的實際代價高於簡單的均勻雜湊近似式 $1/(1-\\alpha)$。$\\alpha$ 趨近 1 時探測代價急劇上升。最壞情況所有 key 擠在同一叢集,需掃描 $O(N)$ 個槽。",
              "en": "This is Knuth's formula for expected probes on an unsuccessful search under linear probing. Due to primary clustering, linear probing is worse than the simple uniform-hashing approximation $1/(1-\\alpha)$. Cost spikes sharply as $\\alpha$ approaches 1. Worst case: all keys cluster together, requiring $O(N)$ probes."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "class HashOpenAddressing {\n    int TABLE_SIZE;\n    int* table;\n    int curr_size;\n\npublic:\n    HashOpenAddressing(int size = 5) {\n        TABLE_SIZE = size;\n        table = new int[TABLE_SIZE];\n        for (int i = 0; i < TABLE_SIZE; i++)\n            table[i] = -1;\n        curr_size = 0;\n    }\n    int hashFunction(int key) { return key % TABLE_SIZE; }\n    bool insert(int key) {\n        if (curr_size >= TABLE_SIZE) {\n            cout << \"Hash Table Full!\" << endl;\n            return false;\n        }\n        int idx = hashFunction(key);\n        // Linear Probing\n        while (table[idx] != -1) {\n            idx = (idx + 1) % TABLE_SIZE;\n        }\n        table[idx] = key;\n        curr_size++;\n        return true;\n    }\n};"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:所有資料存於連續陣列,快取效能佳(cache-friendly)。",
                "en": "Pro: all data stored in a contiguous array — excellent cache performance (cache-friendly)."
              },
              {
                "zh": "優點:無需額外指標;記憶體利用率高。",
                "en": "Pro: no pointer overhead; high memory utilization."
              },
              {
                "zh": "缺點:主叢集(Primary Clustering)使高 load factor 下探測代價急增。",
                "en": "Con: Primary Clustering causes probe costs to rise sharply at high load factor."
              },
              {
                "zh": "缺點:load factor 必須 < 1,表格最終會滿。",
                "en": "Con: load factor must remain below 1; the table will eventually fill up."
              },
              {
                "zh": "缺點:刪除需「墓碑」標記以維持探測鏈的完整性。",
                "en": "Con: deletion requires a \"tombstone\" marker to preserve probe chain integrity."
              },
              {
                "zh": "適用:元素數量已知、load factor 可控制在 0.7 以下的快取敏感場景。",
                "en": "Use when element count is known and load factor can be kept below 0.7 for cache-sensitive workloads."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "線性探測將碰撞解決於陣列內;load factor < 1 為必要條件。",
                "en": "Linear probing resolves collisions within the array itself; load factor < 1 is required."
              },
              {
                "zh": "平均 $O(1)$,最壞 $O(N)$;$\\alpha$ 越高效能退化越快。",
                "en": "Average $O(1)$, worst-case $O(N)$; performance degrades rapidly as $\\alpha$ increases."
              },
              {
                "zh": "快取友善且無指標開銷,但主叢集為其主要弱點。",
                "en": "Cache-friendly with no pointer overhead, but Primary Clustering is its main weakness."
              }
            ]
          }
        ]
      }
    ]
  },
  "hash-bucket": {
    "category": "Hash & Probabilistic",
    "title": {
      "zh": "雜湊表(桶定址法)",
      "en": "Hash Table (Bucket Hashing)"
    },
    "slides": [
      {
        "heading": {
          "zh": "雜湊表(桶定址法)",
          "en": "Hash Table (Bucket Hashing)"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "桶定址法將陣列劃分為若干固定容量的「桶」(bucket);每個桶可容納多個元素(本實作每桶 2 槽)。桶未滿時直接插入,桶滿則以線性探測溢位至相鄰桶。",
              "en": "Bucket Hashing divides the array into fixed-capacity buckets; each bucket holds multiple elements (2 slots per bucket in this implementation). Insertions go directly into the bucket when space is available; a full bucket triggers linear probing to the next adjacent bucket."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "每個 `Bucket` 結構包含固定大小的槽陣列(`slots[2]`)與計數器 `count`。雜湊函數 `key % NUM_BUCKETS` 決定主桶索引;主桶已滿時依序探測下一桶。",
              "en": "Each `Bucket` struct contains a fixed-size slot array (`slots[2]`) and a `count`. The hash function `key % NUM_BUCKETS` determines the primary bucket; when full, the next bucket is probed linearly."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "每桶容量固定為 2(本實作),提供少量碰撞緩衝。",
                "en": "Each bucket has a fixed capacity of 2 (this implementation), providing a small collision buffer."
              },
              {
                "zh": "主桶未滿:直接插入至 `slots[count++]`,$O(1)$。",
                "en": "Primary bucket not full: insert directly at `slots[count++]`, $O(1)$."
              },
              {
                "zh": "主桶已滿:線性探測(`idx = (idx+1) % NUM_BUCKETS`)直至找到有空槽的桶。",
                "en": "Primary bucket full: linear probe `idx = (idx+1) % NUM_BUCKETS` until a bucket with space is found."
              },
              {
                "zh": "所有桶皆滿則插入失敗。",
                "en": "Insertion fails if all buckets are fully saturated."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "計算主桶索引:`idx = key % NUM_BUCKETS`。",
                "en": "Compute primary bucket index: `idx = key % NUM_BUCKETS`."
              },
              {
                "zh": "若 `table[idx].count < 2`,寫入 `slots[count++]` 並返回。",
                "en": "If `table[idx].count < 2`, write to `slots[count++]` and return."
              },
              {
                "zh": "否則令 `idx = (idx+1) % NUM_BUCKETS` 並重複步驟 2,直到找到有空間的桶。",
                "en": "Otherwise set `idx = (idx+1) % NUM_BUCKETS` and repeat step 2 until a bucket with space is found."
              },
              {
                "zh": "若繞回原始索引仍未找到,輸出「Catastrophic Failure」。",
                "en": "If the probe wraps back to the start without finding space, print \"Catastrophic Failure\"."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart TD\n  A[\"insert 10\\n10%4=2\\nBucket[2] empty\"] --> B[\"Bucket[2]: slots=[10,-1] count=1\"]\n  C[\"insert 14\\n14%4=2\\nBucket[2] has space\"] --> B2[\"Bucket[2]: slots=[10,14] count=2\"]\n  D[\"insert 22\\n22%4=2\\nBucket[2] FULL\"] --> E[\"probe Bucket[3]\"]\n  E --> F[\"Bucket[3]: slots=[22,-1] count=1\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "桶結構示意",
          "en": "Bucket Structure Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 110\" width=\"380\" height=\"110\"><g font-family=\"sans-serif\" font-size=\"12\"><rect x=\"10\" y=\"15\" width=\"80\" height=\"40\" fill=\"#e0f2fe\" stroke=\"#0284c7\"/><text x=\"50\" y=\"32\" text-anchor=\"middle\" font-weight=\"bold\">Bucket[0]</text><text x=\"50\" y=\"50\" text-anchor=\"middle\">[-1][-1]</text><rect x=\"105\" y=\"15\" width=\"80\" height=\"40\" fill=\"#e0f2fe\" stroke=\"#0284c7\"/><text x=\"145\" y=\"32\" text-anchor=\"middle\" font-weight=\"bold\">Bucket[1]</text><text x=\"145\" y=\"50\" text-anchor=\"middle\">[-1][-1]</text><rect x=\"200\" y=\"15\" width=\"80\" height=\"40\" fill=\"#dbeafe\" stroke=\"#2563eb\" stroke-width=\"2\"/><text x=\"240\" y=\"32\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1d4ed8\">Bucket[2]</text><text x=\"240\" y=\"50\" text-anchor=\"middle\" fill=\"#1d4ed8\">[10][14]</text><rect x=\"295\" y=\"15\" width=\"80\" height=\"40\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\"/><text x=\"335\" y=\"32\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#166534\">Bucket[3]</text><text x=\"335\" y=\"50\" text-anchor=\"middle\" fill=\"#166534\">[22][-1]</text><text x=\"240\" y=\"10\" text-anchor=\"middle\" fill=\"#2563eb\">primary(10,14,22)</text><path d=\"M295 35 L295 65 L335 65 L335 55\" stroke=\"#dc2626\" stroke-width=\"1.5\" marker-end=\"url(#a2)\"/><defs><marker id=\"a2\" markerWidth=\"6\" markerHeight=\"6\" refX=\"3\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L6,3 L0,6 Z\" fill=\"#dc2626\"/></marker></defs><text x=\"280\" y=\"78\" text-anchor=\"middle\" fill=\"#dc2626\">overflow probe</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "10 與 14 均雜湊至 Bucket[2](均為 `key%4==2`),填滿兩個槽。22 也雜湊至 Bucket[2] 但已滿,線性探測至 Bucket[3] 寫入。",
              "en": "10 and 14 both hash to Bucket[2] (`key%4==2`), filling its two slots. 22 also hashes to Bucket[2] but finds it full, so linear probing places it in Bucket[3]."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "操作",
                "en": "Operation"
              },
              {
                "zh": "平均時間",
                "en": "Avg Time"
              },
              {
                "zh": "最壞時間",
                "en": "Worst Time"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "insert",
                  "en": "insert"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                },
                {
                  "zh": "$O(B)$",
                  "en": "$O(B)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "search",
                  "en": "search"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                },
                {
                  "zh": "$O(B)$",
                  "en": "$O(B)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "空間合計",
                  "en": "Total Space"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "$O(B \\cdot K)$",
                  "en": "$O(B \\cdot K)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "\\text{Capacity} = B \\times K",
            "caption": {
              "zh": "$B$ 為桶數,$K$ 為每桶槽數(本實作 $K=2$)。平均 $O(1)$;最壞需探測全部 $B$ 個桶。",
              "en": "$B$ = number of buckets, $K$ = slots per bucket ($K=2$ in this implementation). Average $O(1)$; worst case probes all $B$ buckets."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "struct Bucket {\n    int slots[2];\n    int count;\n    Bucket() {\n        slots[0] = -1;\n        slots[1] = -1;\n        count = 0;\n    }\n};\n\nclass HashBucketing {\n    int NUM_BUCKETS;\n    Bucket* table;\n\npublic:\n    HashBucketing(int buckets = 4) {\n        NUM_BUCKETS = buckets;\n        table = new Bucket[NUM_BUCKETS];\n    }\n    int hashFunction(int key) { return key % NUM_BUCKETS; }\n    bool insert(int key) {\n        int idx = hashFunction(key);\n        if (table[idx].count < 2) {\n            table[idx].slots[table[idx].count++] = key;\n            return true;\n        }\n        int startIdx = idx;\n        idx = (idx + 1) % NUM_BUCKETS;\n        while (idx != startIdx) {\n            if (table[idx].count < 2) {\n                table[idx].slots[table[idx].count++] = key;\n                return true;\n            }\n            idx = (idx + 1) % NUM_BUCKETS;\n        }\n        return false; // all buckets saturated\n    }\n};"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:每桶多槽提供少量碰撞緩衝,減少探測次數。",
                "en": "Pro: multiple slots per bucket provide a small collision buffer, reducing probe frequency."
              },
              {
                "zh": "優點:資料存於連續陣列結構,具快取親和性。",
                "en": "Pro: data stored in a contiguous array structure — cache-friendly."
              },
              {
                "zh": "優點:固定容量設計使記憶體用量可精確預估。",
                "en": "Pro: fixed capacity design makes memory usage precisely predictable."
              },
              {
                "zh": "缺點:每桶容量固定,超出後仍需探測相鄰桶,在高負載時退化。",
                "en": "Con: fixed bucket capacity; overflow still requires adjacent-bucket probing, degrading at high load."
              },
              {
                "zh": "缺點:桶容量固定可能浪費槽空間(桶內只存 1 個元素時另一槽閒置)。",
                "en": "Con: fixed slot count may waste space (a bucket with 1 element leaves 1 slot unused)."
              },
              {
                "zh": "適用:資料量有界、需要簡單可預測記憶體佔用的嵌入式或硬體映射場景。",
                "en": "Use for bounded datasets needing simple, predictable memory footprint, e.g. embedded systems or hardware-mapped address schemes."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "每桶固定 $K$ 槽;主桶未滿時 $O(1)$ 插入。",
                "en": "Each bucket has $K$ fixed slots; $O(1)$ insertion when the primary bucket has space."
              },
              {
                "zh": "主桶滿則線性探測相鄰桶;最壞 $O(B)$。",
                "en": "A full primary bucket triggers linear probing to adjacent buckets; worst case $O(B)$."
              },
              {
                "zh": "兼具快取友善與碰撞緩衝;總容量 $B \\times K$ 固定。",
                "en": "Combines cache-friendliness with a collision buffer; total capacity $B \\times K$ is fixed."
              }
            ]
          }
        ]
      }
    ]
  },
  "bloom-filter": {
    "category": "Hash & Probabilistic",
    "title": {
      "zh": "布隆過濾器",
      "en": "Bloom Filter"
    },
    "slides": [
      {
        "heading": {
          "zh": "布隆過濾器",
          "en": "Bloom Filter"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "布隆過濾器是一種空間效率極高的機率型集合,用來測試「某元素是否屬於集合」。它可能回報誤判存在(false positive),但絕不會漏判(false negative)。",
              "en": "A Bloom filter is a highly space-efficient probabilistic set used to test set membership. It may report a false positive but never a false negative."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "結構是一個 $m$ 位元的位元陣列加上 $k$ 個獨立雜湊函式。插入元素時把 $k$ 個雜湊位置設為 1;查詢時檢查那 $k$ 個位置是否全為 1。",
              "en": "The structure is an $m$-bit array plus $k$ independent hash functions. Insertion sets the $k$ hashed bits to 1; a query checks whether those $k$ bits are all 1."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "$k$ 個位元全為 1 → 「可能存在」,也可能是其他元素恰好湊齊。",
                "en": "All $k$ bits are 1 → \"possibly present\" — other elements may have set those bits."
              },
              {
                "zh": "任一位元為 0 → 「絕對不存在」。",
                "en": "Any bit is 0 → \"definitely not present\"."
              },
              {
                "zh": "不支援刪除:清除位元會誤傷共用該位元的其他元素。",
                "en": "No deletion: clearing a bit would corrupt other elements sharing it."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "插入 $x$:計算 $h_1(x)$、$h_2(x)$、$h_3(x)$,把這 3 個位元設為 1。",
                "en": "Insert $x$: compute $h_1(x)$, $h_2(x)$, $h_3(x)$ and set those 3 bits to 1."
              },
              {
                "zh": "查詢 $y$:計算 $y$ 的 3 個雜湊位置。",
                "en": "Query $y$: compute the 3 hashed positions of $y$."
              },
              {
                "zh": "3 個位元全為 1 回報「可能存在」;任一為 0 回報「絕對不存在」。",
                "en": "All 3 bits 1 → \"possibly present\"; any bit 0 → \"definitely not present\"."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart TD\n  I[\"insert x\"] --> IH[\"compute h1 h2 h3\"]\n  IH --> IS[\"set 3 bits to 1\"]\n  A[\"query y\"] --> B[\"compute h1 h2 h3\"]\n  B --> C[\"all 3 bits = 1?\"]\n  C -->|yes| D[\"possibly present\"]\n  C -->|no| E[\"definitely not present\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "示意圖",
          "en": "Layout"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 70\" width=\"360\"><g font-family=\"monospace\" font-size=\"12\"><text x=\"0\" y=\"16\">insert \"dog\" sets bits 20, 28, 31</text><rect x=\"0\" y=\"28\" width=\"11\" height=\"24\" fill=\"none\" stroke=\"#cbd5e1\"/><rect x=\"11\" y=\"28\" width=\"11\" height=\"24\" fill=\"none\" stroke=\"#cbd5e1\"/><rect x=\"22\" y=\"28\" width=\"11\" height=\"24\" fill=\"none\" stroke=\"#cbd5e1\"/><rect x=\"33\" y=\"28\" width=\"11\" height=\"24\" fill=\"none\" stroke=\"#cbd5e1\"/><rect x=\"44\" y=\"28\" width=\"11\" height=\"24\" fill=\"none\" stroke=\"#cbd5e1\"/><rect x=\"55\" y=\"28\" width=\"11\" height=\"24\" fill=\"none\" stroke=\"#cbd5e1\"/><rect x=\"66\" y=\"28\" width=\"11\" height=\"24\" fill=\"none\" stroke=\"#cbd5e1\"/><rect x=\"77\" y=\"28\" width=\"11\" height=\"24\" fill=\"none\" stroke=\"#cbd5e1\"/><rect x=\"88\" y=\"28\" width=\"11\" height=\"24\" fill=\"none\" stroke=\"#cbd5e1\"/><rect x=\"99\" y=\"28\" width=\"11\" height=\"24\" fill=\"none\" stroke=\"#cbd5e1\"/><rect x=\"110\" y=\"28\" width=\"11\" height=\"24\" fill=\"none\" stroke=\"#cbd5e1\"/><rect x=\"121\" y=\"28\" width=\"11\" height=\"24\" fill=\"none\" stroke=\"#cbd5e1\"/><rect x=\"132\" y=\"28\" width=\"11\" height=\"24\" fill=\"none\" stroke=\"#cbd5e1\"/><rect x=\"143\" y=\"28\" width=\"11\" height=\"24\" fill=\"none\" stroke=\"#cbd5e1\"/><rect x=\"154\" y=\"28\" width=\"11\" height=\"24\" fill=\"none\" stroke=\"#cbd5e1\"/><rect x=\"165\" y=\"28\" width=\"11\" height=\"24\" fill=\"none\" stroke=\"#cbd5e1\"/><rect x=\"176\" y=\"28\" width=\"11\" height=\"24\" fill=\"none\" stroke=\"#cbd5e1\"/><rect x=\"187\" y=\"28\" width=\"11\" height=\"24\" fill=\"none\" stroke=\"#cbd5e1\"/><rect x=\"198\" y=\"28\" width=\"11\" height=\"24\" fill=\"none\" stroke=\"#cbd5e1\"/><rect x=\"209\" y=\"28\" width=\"11\" height=\"24\" fill=\"none\" stroke=\"#cbd5e1\"/><rect x=\"220\" y=\"28\" width=\"11\" height=\"24\" fill=\"#dbeafe\" stroke=\"#3b82f6\"/><rect x=\"231\" y=\"28\" width=\"11\" height=\"24\" fill=\"none\" stroke=\"#cbd5e1\"/><rect x=\"242\" y=\"28\" width=\"11\" height=\"24\" fill=\"none\" stroke=\"#cbd5e1\"/><rect x=\"253\" y=\"28\" width=\"11\" height=\"24\" fill=\"none\" stroke=\"#cbd5e1\"/><rect x=\"264\" y=\"28\" width=\"11\" height=\"24\" fill=\"none\" stroke=\"#cbd5e1\"/><rect x=\"275\" y=\"28\" width=\"11\" height=\"24\" fill=\"none\" stroke=\"#cbd5e1\"/><rect x=\"286\" y=\"28\" width=\"11\" height=\"24\" fill=\"none\" stroke=\"#cbd5e1\"/><rect x=\"297\" y=\"28\" width=\"11\" height=\"24\" fill=\"none\" stroke=\"#cbd5e1\"/><rect x=\"308\" y=\"28\" width=\"11\" height=\"24\" fill=\"#dbeafe\" stroke=\"#3b82f6\"/><rect x=\"319\" y=\"28\" width=\"11\" height=\"24\" fill=\"none\" stroke=\"#cbd5e1\"/><rect x=\"330\" y=\"28\" width=\"11\" height=\"24\" fill=\"none\" stroke=\"#cbd5e1\"/><rect x=\"341\" y=\"28\" width=\"11\" height=\"24\" fill=\"#dbeafe\" stroke=\"#3b82f6\"/></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "visualizer 以 32 格位元陣列呈現;Insert 把 3 個雜湊位元點亮,Query 高亮被檢查的 3 格並回報結果。",
              "en": "The visualizer shows a 32-cell bit array; Insert lights up the 3 hashed bits, Query highlights the 3 checked cells and reports the verdict."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "項目",
                "en": "Aspect"
              },
              {
                "zh": "複雜度",
                "en": "Complexity"
              }
            ],
            "rows": [
              [
                {
                  "zh": "插入 / 查詢時間",
                  "en": "insert / query time"
                },
                {
                  "zh": "$O(k)$",
                  "en": "$O(k)$"
                }
              ],
              [
                {
                  "zh": "空間",
                  "en": "space"
                },
                {
                  "zh": "$O(m)$ 位元",
                  "en": "$O(m)$ bits"
                }
              ],
              [
                {
                  "zh": "漏判(false negative)",
                  "en": "false negative"
                },
                {
                  "zh": "不可能",
                  "en": "impossible"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "P_{\\text{fp}} \\approx \\left(1 - e^{-kn/m}\\right)^k",
            "caption": {
              "zh": "誤判率隨已插入元素數 $n$ 上升;在固定 $m$ 下存在最佳的 $k$。",
              "en": "The false-positive rate rises with the number of inserted elements $n$; for a fixed $m$ there is an optimal $k$."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "void insert(const std::string& key) {\n    bits[hash1(key)] = true;\n    bits[hash2(key)] = true;\n    bits[hash3(key)] = true;\n}\n\nbool possiblyContains(const std::string& key) const {\n    return bits[hash1(key)] && bits[hash2(key)] && bits[hash3(key)];\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:空間遠小於儲存完整元素集合。",
                "en": "Pro: uses far less space than storing the full element set."
              },
              {
                "zh": "優點:插入與查詢皆為固定時間 $O(k)$。",
                "en": "Pro: insertion and query are both constant-time $O(k)$."
              },
              {
                "zh": "缺點:有誤判,且無法刪除元素。",
                "en": "Con: false positives occur, and elements cannot be removed."
              },
              {
                "zh": "適用:快取前置過濾、去重、判斷「絕對沒看過」的場景。",
                "en": "Use for cache pre-filtering, deduplication, and \"definitely never seen\" checks."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "位元陣列加多個雜湊函式構成的機率型集合。",
                "en": "A probabilistic set built from a bit array plus several hash functions."
              },
              {
                "zh": "「絕對不存在」可信;「可能存在」需容忍誤判。",
                "en": "\"Definitely absent\" is certain; \"possibly present\" must tolerate false positives."
              },
              {
                "zh": "以準確度換取極小的空間佔用。",
                "en": "Trades accuracy for a very small space footprint."
              }
            ]
          }
        ]
      }
    ]
  },
  "skip-list": {
    "category": "Hash & Probabilistic",
    "title": {
      "zh": "跳躍列表",
      "en": "Skip List"
    },
    "slides": [
      {
        "heading": {
          "zh": "跳躍列表",
          "en": "Skip List"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "跳躍列表是一種以多層連結串列建構的有序映射;隨機層級使搜尋、插入、刪除的期望複雜度為 $O(\\log n)$,是平衡樹的一種簡單替代方案。",
              "en": "A skip list is an ordered map built from a multi-level linked list; random levels give expected $O(\\log n)$ search, insert, and delete — a simple alternative to balanced trees."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "第 0 層保存每一個節點;較高的層級是「快速車道」,只串接部分節點;搜尋時從最高層往下逐層推進。",
              "en": "Level 0 holds every node; upper levels are express lanes linking only some nodes; a search descends from the top level downward."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "每個節點的高度由擲硬幣決定。",
                "en": "Each node's height is decided by coin flips."
              },
              {
                "zh": "每個節點期望約有 2 個指標。",
                "en": "Each node has about 2 pointers on expectation."
              },
              {
                "zh": "不需旋轉即可(機率上)保持平衡。",
                "en": "It stays balanced (probabilistically) without any rotations."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "從表頭的最高層開始。",
                "en": "Start at the head on the highest level."
              },
              {
                "zh": "當下一個節點的鍵值小於目標時往右移,否則往下降一層。",
                "en": "Move right while the next node's key < target, otherwise drop down a level."
              },
              {
                "zh": "到達第 0 層後,檢查下一個節點是否等於目標。",
                "en": "At level 0, check whether the next node equals the target."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  S[\"start at top level\"] --> R[\"next.key < target?\"]\n  R -->|yes| M[\"move right\"]\n  R -->|no| D[\"drop one level\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "示意圖",
          "en": "Layout"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 130\" width=\"360\"><g font-family=\"monospace\" font-size=\"11\"><text x=\"0\" y=\"12\">level 3</text><text x=\"0\" y=\"40\">level 2</text><text x=\"0\" y=\"68\">level 1</text><text x=\"0\" y=\"96\">level 0</text><line x1=\"60\" y1=\"8\" x2=\"330\" y2=\"8\" stroke=\"#94a3b8\"/><line x1=\"60\" y1=\"36\" x2=\"200\" y2=\"36\" stroke=\"#94a3b8\"/><line x1=\"60\" y1=\"64\" x2=\"330\" y2=\"64\" stroke=\"#94a3b8\"/><line x1=\"60\" y1=\"92\" x2=\"330\" y2=\"92\" stroke=\"#94a3b8\"/><g fill=\"#dbeafe\" stroke=\"#3b82f6\"><rect x=\"54\" y=\"2\" width=\"12\" height=\"96\"/><rect x=\"114\" y=\"58\" width=\"12\" height=\"40\"/><rect x=\"194\" y=\"30\" width=\"12\" height=\"68\"/><rect x=\"264\" y=\"86\" width=\"12\" height=\"12\"/><rect x=\"324\" y=\"58\" width=\"12\" height=\"40\"/></g><text x=\"56\" y=\"114\">head</text><text x=\"117\" y=\"114\">3</text><text x=\"197\" y=\"114\">7</text><text x=\"264\" y=\"114\">12</text><text x=\"325\" y=\"114\">19</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "visualizer 以 4 層堆疊呈現;Insert 擲硬幣決定節點高度,Search 逐步動畫呈現往下推進的路徑。",
              "en": "The visualizer shows 4 stacked levels; Insert coin-flips the node height, and Search animates the descent path step by step."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "操作",
                "en": "Operation"
              },
              {
                "zh": "期望",
                "en": "Expected"
              },
              {
                "zh": "最差",
                "en": "Worst"
              }
            ],
            "rows": [
              [
                {
                  "zh": "搜尋",
                  "en": "search"
                },
                {
                  "zh": "$O(\\log n)$",
                  "en": "$O(\\log n)$"
                },
                {
                  "zh": "$O(n)$",
                  "en": "$O(n)$"
                }
              ],
              [
                {
                  "zh": "插入",
                  "en": "insert"
                },
                {
                  "zh": "$O(\\log n)$",
                  "en": "$O(\\log n)$"
                },
                {
                  "zh": "$O(n)$",
                  "en": "$O(n)$"
                }
              ],
              [
                {
                  "zh": "刪除",
                  "en": "delete"
                },
                {
                  "zh": "$O(\\log n)$",
                  "en": "$O(\\log n)$"
                },
                {
                  "zh": "$O(n)$",
                  "en": "$O(n)$"
                }
              ],
              [
                {
                  "zh": "空間",
                  "en": "space"
                },
                {
                  "zh": "$O(n)$",
                  "en": "$O(n)$"
                },
                {
                  "zh": "$O(n)$",
                  "en": "$O(n)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{search}}(n) = O(\\log n)",
            "caption": {
              "zh": "期望界限來自隨機層級的分布。",
              "en": "The expected bound comes from the random level distribution."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "bool search(int key) {\n    Node* cur = head;\n    for (int i = level; i >= 0; i--) {\n        while (cur->forward[i] && cur->forward[i]->key < key)\n            cur = cur->forward[i];\n    }\n    cur = cur->forward[0];\n    return cur && cur->key == key;\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:比平衡樹更易實作,且支援有序走訪。",
                "en": "Pro: simpler to implement than balanced trees, and supports ordered traversal."
              },
              {
                "zh": "缺點:最差情況會退化,效能取決於亂數品質。",
                "en": "Con: the worst case degrades, and performance depends on RNG quality."
              },
              {
                "zh": "適用:需要有序映射,但想避開紅黑樹複雜度的場景。",
                "en": "Use when you need an ordered map but want to avoid red-black-tree complexity."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "由多層「快速車道」構成的連結串列。",
                "en": "A multi-level express-lane linked list."
              },
              {
                "zh": "以隨機層級取代旋轉來維持平衡。",
                "en": "Random levels replace rotations for balance."
              },
              {
                "zh": "搜尋、插入、刪除的期望複雜度為 $O(\\log n)$。",
                "en": "Search, insert, and delete are expected $O(\\log n)$."
              }
            ]
          }
        ]
      }
    ]
  },
  "count-min-sketch": {
    "category": "Hash & Probabilistic",
    "title": {
      "zh": "Count-Min Sketch",
      "en": "Count-Min Sketch"
    },
    "slides": [
      {
        "heading": {
          "zh": "Count-Min Sketch",
          "en": "Count-Min Sketch"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "Count-Min Sketch 是一種機率型頻率表,能在極小空間內估計每個項目的出現次數;估計值絕不會低估,但可能因雜湊碰撞而高估。",
              "en": "A Count-Min Sketch is a probabilistic frequency table that estimates each item's count in tiny space; the estimate never underestimates but may overestimate due to hash collisions."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "結構是一個 $d \\times w$ 的計數矩陣,每一列對應一個雜湊函式。",
              "en": "The structure is a $d \\times w$ counter matrix, with one hash function per row."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "更新時在每一列各加 1。",
                "en": "An update adds 1 in each row."
              },
              {
                "zh": "估計時取 $d$ 個格子的最小值。",
                "en": "An estimate takes the minimum of the $d$ cells."
              },
              {
                "zh": "碰撞只會灌大計數,因此最小值最接近真實值。",
                "en": "Collisions only inflate counts, so the minimum is closest to the true value."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "update($x$):對每一列 $r$ 計算 $h_r(x)$ 並把該格加 1。",
                "en": "update($x$): for each row $r$ compute $h_r(x)$ and increment that cell."
              },
              {
                "zh": "estimate($x$):讀取那 $d$ 個格子。",
                "en": "estimate($x$): read those $d$ cells."
              },
              {
                "zh": "回傳這 $d$ 個格子的最小值。",
                "en": "Return the minimum of those $d$ cells."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  U[\"update x\"] --> H[\"d row hashes\"]\n  H --> I[\"increment d cells\"]\n  E[\"estimate x\"] --> M[\"take min of d cells\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "示意圖",
          "en": "Layout"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 110\" width=\"300\"><g font-family=\"monospace\" font-size=\"11\"><text x=\"0\" y=\"24\">row 0</text><text x=\"0\" y=\"54\">row 1</text><text x=\"0\" y=\"84\">row 2</text><g stroke=\"#cbd5e1\" fill=\"none\"><rect x=\"44\" y=\"10\" width=\"28\" height=\"24\"/><rect x=\"72\" y=\"10\" width=\"28\" height=\"24\"/><rect x=\"100\" y=\"10\" width=\"28\" height=\"24\"/><rect x=\"128\" y=\"10\" width=\"28\" height=\"24\"/><rect x=\"156\" y=\"10\" width=\"28\" height=\"24\"/><rect x=\"184\" y=\"10\" width=\"28\" height=\"24\"/><rect x=\"212\" y=\"10\" width=\"28\" height=\"24\"/><rect x=\"240\" y=\"10\" width=\"28\" height=\"24\"/><rect x=\"44\" y=\"40\" width=\"28\" height=\"24\"/><rect x=\"72\" y=\"40\" width=\"28\" height=\"24\"/><rect x=\"100\" y=\"40\" width=\"28\" height=\"24\"/><rect x=\"128\" y=\"40\" width=\"28\" height=\"24\"/><rect x=\"156\" y=\"40\" width=\"28\" height=\"24\"/><rect x=\"184\" y=\"40\" width=\"28\" height=\"24\"/><rect x=\"212\" y=\"40\" width=\"28\" height=\"24\"/><rect x=\"240\" y=\"40\" width=\"28\" height=\"24\"/><rect x=\"44\" y=\"70\" width=\"28\" height=\"24\"/><rect x=\"72\" y=\"70\" width=\"28\" height=\"24\"/><rect x=\"100\" y=\"70\" width=\"28\" height=\"24\"/><rect x=\"128\" y=\"70\" width=\"28\" height=\"24\"/><rect x=\"156\" y=\"70\" width=\"28\" height=\"24\"/><rect x=\"184\" y=\"70\" width=\"28\" height=\"24\"/><rect x=\"212\" y=\"70\" width=\"28\" height=\"24\"/><rect x=\"240\" y=\"70\" width=\"28\" height=\"24\"/></g><g fill=\"#dbeafe\" stroke=\"#3b82f6\"><rect x=\"128\" y=\"10\" width=\"28\" height=\"24\"/><rect x=\"212\" y=\"40\" width=\"28\" height=\"24\"/><rect x=\"72\" y=\"70\" width=\"28\" height=\"24\"/></g></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "visualizer 以 3×8 的計數矩陣呈現;Add 高亮被加 1 的 3 個格子,Estimate 顯示最小值並對照真實計數。",
              "en": "The visualizer shows a 3×8 counter matrix; Add highlights the 3 incremented cells, and Estimate shows the min alongside the true count."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "項目",
                "en": "Aspect"
              },
              {
                "zh": "複雜度",
                "en": "Complexity"
              }
            ],
            "rows": [
              [
                {
                  "zh": "更新 / 估計時間",
                  "en": "update / estimate time"
                },
                {
                  "zh": "$O(d)$",
                  "en": "$O(d)$"
                }
              ],
              [
                {
                  "zh": "空間",
                  "en": "space"
                },
                {
                  "zh": "$O(d \\cdot w)$",
                  "en": "$O(d \\cdot w)$"
                }
              ],
              [
                {
                  "zh": "低估",
                  "en": "underestimation"
                },
                {
                  "zh": "不可能",
                  "en": "impossible"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "\\hat{f}(x) \\ge f(x)",
            "caption": {
              "zh": "估計值是真實值的上界;較大的寬度 $w$ 可降低誤差。",
              "en": "The estimate is an upper bound; a larger width $w$ reduces the error."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "void update(const std::string& key) {\n    for (int r = 0; r < DEPTH; r++)\n        table[r][hash(r, key)]++;\n}\n\nint estimate(const std::string& key) const {\n    int est = table[0][hash(0, key)];\n    for (int r = 1; r < DEPTH; r++)\n        est = std::min(est, table[r][hash(r, key)]);\n    return est;\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:空間固定,與不同項目的數量無關。",
                "en": "Pro: fixed space, independent of the number of distinct items."
              },
              {
                "zh": "缺點:有高估誤差,無法做精確查詢。",
                "en": "Con: overestimation error, and no exact queries."
              },
              {
                "zh": "適用:資料流上的重量級元素統計、近似頻率。",
                "en": "Use for heavy-hitter statistics over data streams and approximate frequencies."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "由二維計數矩陣加多個雜湊函式構成。",
                "en": "A 2-D counter matrix plus multiple hash functions."
              },
              {
                "zh": "取最小值可抵銷碰撞造成的超量計數。",
                "en": "Taking the min cancels collision-driven overcounting."
              },
              {
                "zh": "以誤差換取極小且固定的空間。",
                "en": "Trades error for tiny, fixed space."
              }
            ]
          }
        ]
      }
    ]
  },
  "search-zalgo": {
    "category": "Searching & String Matching",
    "title": {
      "zh": "Z 演算法",
      "en": "Z-Algorithm"
    },
    "slides": [
      {
        "heading": {
          "zh": "Z 演算法",
          "en": "Z-Algorithm"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "Z 演算法在線性時間內建立字串的 Z 陣列:$Z[i]$ 是從位置 $i$ 開始、與字串前綴相符的最長長度;它使字串比對達到 $O(n+m)$。",
              "en": "The Z-algorithm builds a string's Z-array in linear time: $Z[i]$ is the longest length, starting at $i$, that matches a prefix of the string; it enables $O(n+m)$ string matching."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "維護一個 $[l, r]$ 視窗(目前已知與前綴相符的最右段),使視窗內的索引可以重用已算好的值。",
              "en": "Maintain an $[l, r]$ window (the rightmost segment known to match a prefix) so indices inside it can reuse already-computed values."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "當 $i$ 落在 $[l,r]$ 內時,從鏡射值 $Z[i-l]$ 開始。",
                "en": "When $i$ is inside $[l,r]$, start from the mirror value $Z[i-l]$."
              },
              {
                "zh": "當 $i$ 落在視窗外時,從零開始逐字元比較。",
                "en": "When $i$ is outside the window, compare characters from zero."
              },
              {
                "zh": "比較完成後更新 $[l,r]$。",
                "en": "Update $[l,r]$ after comparing."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "把 `pattern`、一個分隔符、`text` 串接成一個字串。",
                "en": "Concatenate `pattern`, a separator character, and `text` into one string."
              },
              {
                "zh": "計算這個串接字串的 Z 陣列。",
                "en": "Compute the Z-array of the concatenation."
              },
              {
                "zh": "每個 $Z[i]$ 等於樣式長度的索引即是一處相符。",
                "en": "Every index where $Z[i]$ equals the pattern length is a match."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  C[\"concat P then sep then T\"] --> Z[\"compute Z array\"]\n  Z --> F[\"Z[i] == pattern length means match\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "示意圖",
          "en": "Layout"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 290 90\" width=\"290\"><g font-family=\"monospace\" font-size=\"12\"><text x=\"0\" y=\"16\">string</text><text x=\"0\" y=\"60\">Z</text><g stroke=\"#cbd5e1\" fill=\"none\"><rect x=\"48\" y=\"4\" width=\"28\" height=\"24\"/><rect x=\"76\" y=\"4\" width=\"28\" height=\"24\"/><rect x=\"104\" y=\"4\" width=\"28\" height=\"24\"/><rect x=\"132\" y=\"4\" width=\"28\" height=\"24\"/><rect x=\"160\" y=\"4\" width=\"28\" height=\"24\"/><rect x=\"188\" y=\"4\" width=\"28\" height=\"24\"/><rect x=\"216\" y=\"4\" width=\"28\" height=\"24\"/><rect x=\"48\" y=\"48\" width=\"28\" height=\"24\"/><rect x=\"76\" y=\"48\" width=\"28\" height=\"24\"/><rect x=\"104\" y=\"48\" width=\"28\" height=\"24\"/><rect x=\"132\" y=\"48\" width=\"28\" height=\"24\"/><rect x=\"160\" y=\"48\" width=\"28\" height=\"24\"/><rect x=\"188\" y=\"48\" width=\"28\" height=\"24\"/><rect x=\"216\" y=\"48\" width=\"28\" height=\"24\"/></g><g text-anchor=\"middle\"><text x=\"62\" y=\"21\">a</text><text x=\"90\" y=\"21\">b</text><text x=\"118\" y=\"21\">a</text><text x=\"146\" y=\"21\">b</text><text x=\"174\" y=\"21\">a</text><text x=\"202\" y=\"21\">b</text><text x=\"230\" y=\"21\">c</text><text x=\"62\" y=\"65\">-</text><text x=\"90\" y=\"65\">0</text><text x=\"118\" y=\"65\">4</text><text x=\"146\" y=\"65\">0</text><text x=\"174\" y=\"65\">2</text><text x=\"202\" y=\"65\">0</text><text x=\"230\" y=\"65\">0</text></g></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "visualizer 呈現串接後的字串並逐步填入 Z 陣列,標示 $[l,r]$ 視窗與相符位置。",
              "en": "The visualizer shows the concatenated string and fills in the Z-array step by step, marking the $[l,r]$ window and the match positions."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "項目",
                "en": "Aspect"
              },
              {
                "zh": "複雜度",
                "en": "Complexity"
              }
            ],
            "rows": [
              [
                {
                  "zh": "建立 Z 陣列",
                  "en": "build Z-array"
                },
                {
                  "zh": "$O(n+m)$",
                  "en": "$O(n+m)$"
                }
              ],
              [
                {
                  "zh": "字串比對",
                  "en": "string matching"
                },
                {
                  "zh": "$O(n+m)$",
                  "en": "$O(n+m)$"
                }
              ],
              [
                {
                  "zh": "空間",
                  "en": "space"
                },
                {
                  "zh": "$O(n+m)$",
                  "en": "$O(n+m)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T(n, m) = O(n + m)",
            "caption": {
              "zh": "$n$ 為文字長度、$m$ 為樣式長度；$[l, r]$ 視窗使每個字元至多被比較常數次，因此整趟計算為線性。",
              "en": "$n$ is the text length and $m$ the pattern length; the $[l, r]$ window means each character is compared only a constant number of times, so the whole pass is linear."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "std::vector<int> computeZ(const std::string& s) {\n    int n = static_cast<int>(s.size());\n    std::vector<int> z(n, 0);\n    int l = 0, r = 0;\n    for (int i = 1; i < n; i++) {\n        if (i < r)\n            z[i] = std::min(r - i, z[i - l]);\n        while (i + z[i] < n && s[z[i]] == s[i + z[i]])\n            z[i]++;\n        if (i + z[i] > r) {\n            l = i;\n            r = i + z[i];\n        }\n    }\n    return z;\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:概念簡單、線性時間,且不需失敗函式表。",
                "en": "Pro: simple concept, linear time, and no failure-function table."
              },
              {
                "zh": "缺點:需要額外的串接字串與 $O(n+m)$ 空間。",
                "en": "Con: needs the extra concatenated string and $O(n+m)$ space."
              },
              {
                "zh": "適用:單樣式比對、字串週期與前綴分析。",
                "en": "Use for single-pattern matching, string periodicity, and prefix analysis."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "Z 陣列給出「前綴相符的長度」。",
                "en": "The Z-array gives the length of the prefix match."
              },
              {
                "zh": "$[l,r]$ 視窗達成線性時間。",
                "en": "The $[l,r]$ window achieves linear time."
              },
              {
                "zh": "串接「樣式 + 分隔符 + 文字」即可完成比對。",
                "en": "Concatenating pattern, separator, and text does the matching."
              }
            ]
          }
        ]
      }
    ]
  },
  "search-aho": {
    "category": "Searching & String Matching",
    "title": {
      "zh": "Aho-Corasick 演算法",
      "en": "Aho-Corasick"
    },
    "slides": [
      {
        "heading": {
          "zh": "Aho-Corasick 演算法",
          "en": "Aho-Corasick"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "Aho-Corasick 先把多個樣式建成一棵字典樹,再以 BFS 計算失敗連結,因此單次掃描文字就能找出每個樣式的所有出現位置。",
              "en": "Aho-Corasick builds a trie of multiple patterns, then computes failure links by BFS, so a single text scan finds every occurrence of every pattern."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "字典樹提供 goto 邊;失敗連結指向「目前字串最長真後綴」對應的節點,因此遇到失配時不必倒退文字指標。",
              "en": "The trie supplies goto edges; a failure link points to the node for the longest proper suffix of the current string, so a mismatch never rewinds the text."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "失敗連結以 BFS 由淺至深計算。",
                "en": "Failure links are computed by BFS, shallow-to-deep."
              },
              {
                "zh": "輸出連結沿失敗鏈合併,因此不會漏掉任何相符。",
                "en": "Output links are merged along the failure chain, so no match is missed."
              },
              {
                "zh": "掃描期間文字指標永不向後移動。",
                "en": "The text pointer never moves backward during the scan."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "把每個樣式插入字典樹。",
                "en": "Insert every pattern into the trie."
              },
              {
                "zh": "以 BFS 計算每個節點的失敗連結並合併輸出。",
                "en": "BFS-compute each node's failure link and merge outputs."
              },
              {
                "zh": "掃描文字,沿 goto 前進或沿失敗連結跳回,抵達輸出節點時回報相符。",
                "en": "Scan the text, advancing along goto or jumping back along failure links, reporting a match whenever an output node is reached."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  T[\"build trie\"] --> F[\"BFS failure links\"]\n  F --> S[\"scan text once\"]\n  S --> M[\"report all matches\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "示意圖",
          "en": "Layout"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 150\" width=\"240\"><g font-family=\"monospace\" font-size=\"11\"><line x1=\"120\" y1=\"24\" x2=\"60\" y2=\"74\" stroke=\"#94a3b8\"/><line x1=\"120\" y1=\"24\" x2=\"180\" y2=\"74\" stroke=\"#94a3b8\"/><line x1=\"60\" y1=\"86\" x2=\"60\" y2=\"114\" stroke=\"#94a3b8\"/><line x1=\"180\" y1=\"86\" x2=\"180\" y2=\"114\" stroke=\"#94a3b8\"/><path d=\"M168 124 L96 86\" stroke=\"#ef4444\" stroke-dasharray=\"4 3\" fill=\"none\"/><g fill=\"#dbeafe\" stroke=\"#3b82f6\"><circle cx=\"120\" cy=\"16\" r=\"14\"/><circle cx=\"60\" cy=\"80\" r=\"14\"/><circle cx=\"180\" cy=\"80\" r=\"14\"/><circle cx=\"60\" cy=\"124\" r=\"14\"/><circle cx=\"180\" cy=\"124\" r=\"14\"/></g><g text-anchor=\"middle\"><text x=\"120\" y=\"20\">root</text><text x=\"60\" y=\"84\">h</text><text x=\"180\" y=\"84\">s</text><text x=\"60\" y=\"128\">e</text><text x=\"180\" y=\"128\">h</text></g><text x=\"96\" y=\"112\" fill=\"#ef4444\">fail</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "visualizer 分成兩個逐步階段:先建立失敗連結,再掃描文字 `ushers`。",
              "en": "The visualizer has two stepped phases: first build the failure links, then scan the text `ushers`."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "項目",
                "en": "Aspect"
              },
              {
                "zh": "複雜度",
                "en": "Complexity"
              }
            ],
            "rows": [
              [
                {
                  "zh": "建立時間",
                  "en": "build time"
                },
                {
                  "zh": "$O(\\sum |P_i|)$",
                  "en": "$O(\\sum |P_i|)$"
                }
              ],
              [
                {
                  "zh": "掃描",
                  "en": "scan"
                },
                {
                  "zh": "$O(|text| + \\#matches)$",
                  "en": "$O(|text| + \\#matches)$"
                }
              ],
              [
                {
                  "zh": "空間",
                  "en": "space"
                },
                {
                  "zh": "$O(\\sum |P_i| \\cdot \\sigma)$",
                  "en": "$O(\\sum |P_i| \\cdot \\sigma)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{scan}} = O(|text| + \\#matches)",
            "caption": {
              "zh": "文字指標永不倒退,因此掃描是線性的。",
              "en": "The text pointer never rewinds, so the scan is linear."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "void build() {\n    std::queue<Node*> q;\n    root->fail = root;\n    for (auto& kv : root->children) {\n        kv.second->fail = root;\n        q.push(kv.second);\n    }\n    while (!q.empty()) {\n        Node* cur = q.front();\n        q.pop();\n        for (auto& kv : cur->children) {\n            char c = kv.first;\n            Node* child = kv.second;\n            Node* f = cur->fail;\n            while (f != root && !f->children.count(c))\n                f = f->fail;\n            if (f->children.count(c) && f->children[c] != child)\n                child->fail = f->children[c];\n            else\n                child->fail = root;\n            for (int idx : child->fail->output)\n                child->output.push_back(idx);\n            q.push(child);\n        }\n    }\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:單次掃描即可處理多個樣式,文字永不倒退。",
                "en": "Pro: handles many patterns in one scan, and the text never rewinds."
              },
              {
                "zh": "缺點:必須先建構自動機,空間隨樣式總長與字母表增長。",
                "en": "Con: must build the automaton, and space grows with total pattern length and alphabet."
              },
              {
                "zh": "適用:多關鍵字過濾、入侵偵測、字典比對。",
                "en": "Use for multi-keyword filtering, intrusion detection, and dictionary matching."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "字典樹的 goto 邊加上 BFS 建立的失敗連結。",
                "en": "Trie goto edges plus BFS-built failure links."
              },
              {
                "zh": "單次線性掃描即可找出每個樣式。",
                "en": "One linear scan finds every pattern."
              },
              {
                "zh": "它是 KMP 推廣到多樣式的版本。",
                "en": "It is KMP generalized to multiple patterns."
              }
            ]
          }
        ]
      }
    ]
  },
  "sort-bubble": {
    "category": "Sorting",
    "title": {
      "zh": "泡沫排序法",
      "en": "Bubble Sort"
    },
    "slides": [
      {
        "heading": {
          "zh": "泡沫排序法",
          "en": "Bubble Sort"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "泡沫排序法反覆比較相鄰元素,若順序錯誤則交換,每輪將當前未排序範圍中最大的元素「浮」至末端;加入提前結束機制後,最佳情況可達 $O(n)$。",
              "en": "Bubble Sort repeatedly compares adjacent elements and swaps them if they are out of order, \"bubbling\" the largest unsorted element to the end each pass; with an early-exit flag, the best case reaches $O(n)$."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "外層迴圈控制輪數(最多 $n-1$ 輪);內層迴圈對 `[0, n-i-1]` 範圍做相鄰比較與交換。加入 `swapped` 旗標:若某輪未發生任何交換,代表陣列已有序,立即中止。",
              "en": "The outer loop controls pass count (up to $n-1$ passes); the inner loop compares and swaps adjacent pairs in `[0, n-i-1]`. A `swapped` flag enables early exit: if no swap occurs in a pass, the array is already sorted."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "每輪結束後最右邊的元素確定就位,下一輪範圍縮短一格。",
                "en": "After each pass the rightmost element is in its final position; the next pass spans one fewer element."
              },
              {
                "zh": "stable:相等元素的相對順序不會改變(只在 arr[j] > arr[j+1] 時交換)。",
                "en": "stable: equal elements keep their relative order (swap only when arr[j] > arr[j+1])."
              },
              {
                "zh": "in-place:僅需 $O(1)$ 額外空間。",
                "en": "in-place: only $O(1)$ auxiliary space is needed."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "初始化 `swapped = false`。",
                "en": "Initialise `swapped = false`."
              },
              {
                "zh": "對 `j = 0` 到 `n-i-2`:若 `arr[j] > arr[j+1]`,交換並設 `swapped = true`。",
                "en": "For `j = 0` to `n-i-2`: if `arr[j] > arr[j+1]`, swap and set `swapped = true`."
              },
              {
                "zh": "本輪結束;若 `swapped == false` 則提前結束。",
                "en": "End of pass; if `swapped == false`, exit early."
              },
              {
                "zh": "重複至所有元素就位(最多 $n-1$ 輪)。",
                "en": "Repeat until all elements are in place (at most $n-1$ passes)."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  A[\"[5,3,1,4]\\npass 1\"] --> B[\"[3,1,4,5]\\nlargest=5 settled\"]\n  B --> C[\"[1,3,4,5]\\npass 2 done\"]\n  C --> D[\"[1,3,4,5]\\nno swap: exit early\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "一輪交換示意",
          "en": "One Pass Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 90\" width=\"360\" height=\"90\"><g font-family=\"sans-serif\" font-size=\"13\"><rect x=\"10\" y=\"30\" width=\"50\" height=\"30\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><rect x=\"60\" y=\"30\" width=\"50\" height=\"30\" fill=\"#fef9c3\" stroke=\"#ca8a04\"/><rect x=\"110\" y=\"30\" width=\"50\" height=\"30\" fill=\"#fef9c3\" stroke=\"#ca8a04\"/><rect x=\"160\" y=\"30\" width=\"50\" height=\"30\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><rect x=\"210\" y=\"30\" width=\"50\" height=\"30\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"35\" y=\"50\" text-anchor=\"middle\">1</text><text x=\"85\" y=\"50\" text-anchor=\"middle\">5</text><text x=\"135\" y=\"50\" text-anchor=\"middle\">3</text><text x=\"185\" y=\"50\" text-anchor=\"middle\">2</text><text x=\"235\" y=\"50\" text-anchor=\"middle\">4</text><text x=\"85\" y=\"22\" text-anchor=\"middle\" fill=\"#ca8a04\">j</text><text x=\"135\" y=\"22\" text-anchor=\"middle\" fill=\"#ca8a04\">j+1</text><text x=\"160\" y=\"78\" text-anchor=\"middle\" fill=\"#dc2626\">5 &gt; 3 → swap</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "黃色為當前比較的相鄰對;5 > 3 故交換。每輪最大值持續右移直至落入已排序區。",
              "en": "Yellow cells are the current adjacent pair being compared; 5 > 3 so they swap. The maximum value migrates rightward each pass until it reaches the sorted region."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "情況",
                "en": "Case"
              },
              {
                "zh": "時間複雜度",
                "en": "Time"
              },
              {
                "zh": "空間複雜度",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "最佳(已排序)",
                  "en": "Best (sorted)"
                },
                {
                  "zh": "$O(n)$",
                  "en": "$O(n)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "平均",
                  "en": "Average"
                },
                {
                  "zh": "$O(n^2)$",
                  "en": "$O(n^2)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "最壞(逆序)",
                  "en": "Worst (reverse)"
                },
                {
                  "zh": "$O(n^2)$",
                  "en": "$O(n^2)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "stable / in-place",
                  "en": "stable / in-place"
                },
                {
                  "zh": "是",
                  "en": "Yes"
                },
                {
                  "zh": "輔助空間 $O(1)$",
                  "en": "Auxiliary $O(1)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{worst}}(n) = \\sum_{i=1}^{n-1}(n-i) = \\frac{n(n-1)}{2} = O(n^2)",
            "caption": {
              "zh": "最壞情況為逆序陣列:第 $i$ 輪需比較 $n-i$ 次,總計 $n(n-1)/2$ 次比較。",
              "en": "Worst case is a reverse-sorted array: pass $i$ makes $n-i$ comparisons, totalling $n(n-1)/2$."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "void bubbleSort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        bool swapped = false;\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                int temp = arr[j];\n                arr[j] = arr[j + 1];\n                arr[j + 1] = temp;\n                swapped = true;\n            }\n        }\n        if (!swapped)\n            break; // early exit\n    }\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:stable、in-place,實作最簡單。",
                "en": "Pro: stable, in-place, and trivially simple to implement."
              },
              {
                "zh": "優點:加入提前結束後,幾乎有序資料可達 $O(n)$。",
                "en": "Pro: with early-exit, nearly sorted data completes in $O(n)$."
              },
              {
                "zh": "缺點:平均與最壞均為 $O(n^2)$,大資料集效能差。",
                "en": "Con: average and worst case are $O(n^2)$; poor for large datasets."
              },
              {
                "zh": "缺點:交換次數多,常數因子較 Insertion Sort 大。",
                "en": "Con: high swap count — larger constant factor than Insertion Sort."
              },
              {
                "zh": "適用:教學示範或小型/幾乎已排序的資料集。",
                "en": "Use for teaching demonstrations or tiny / nearly-sorted datasets."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "每輪將最大值「泡」至末端;提前結束可偵測已排序。",
                "en": "Each pass \"bubbles\" the maximum to the end; early exit detects sorted state."
              },
              {
                "zh": "stable、in-place;最佳 $O(n)$,平均/最壞 $O(n^2)$。",
                "en": "stable, in-place; best $O(n)$, average/worst $O(n^2)$."
              },
              {
                "zh": "主要價值在教學與極小資料集;大資料集請選用 Quick/Merge Sort。",
                "en": "Primary value is educational and for tiny datasets; choose Quick/Merge Sort for large inputs."
              }
            ]
          }
        ]
      }
    ]
  },
  "sort-select": {
    "category": "Sorting",
    "title": {
      "zh": "選擇排序法",
      "en": "Selection Sort"
    },
    "slides": [
      {
        "heading": {
          "zh": "選擇排序法",
          "en": "Selection Sort"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "選擇排序法每輪在未排序部分掃描一次,找出最小值並將其與該輪起始位置交換,逐步擴大已排序前綴;最多僅需 $n-1$ 次交換,但比較次數固定為 $O(n^2)$。",
              "en": "Selection Sort scans the unsorted portion once per pass to find the minimum, then swaps it to the front of that portion, growing the sorted prefix one element at a time; at most $n-1$ swaps are made, though comparisons are always $O(n^2)$."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "外層迴圈 `i` 表示已排序前綴長度;內層迴圈從 `i+1` 掃描至末端,記錄最小值索引 `min_idx`。掃描結束後將 `arr[min_idx]` 與 `arr[i]` 交換。",
              "en": "Outer loop index `i` marks the current sorted-prefix length; the inner loop scans from `i+1` to the end, tracking the minimum index `min_idx`. After scanning, swap `arr[min_idx]` with `arr[i]`."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "每輪恰好一次交換(或零次,若最小值已在正確位置)。",
                "en": "Each pass performs exactly one swap (zero if the minimum is already in place)."
              },
              {
                "zh": "NOT stable:交換可能打亂相等元素的原始順序。",
                "en": "NOT stable: the swap can disrupt the original relative order of equal elements."
              },
              {
                "zh": "in-place:僅需 $O(1)$ 額外空間。",
                "en": "in-place: only $O(1)$ auxiliary space."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "令 `min_idx = i`。",
                "en": "Set `min_idx = i`."
              },
              {
                "zh": "對 `j = i+1` 到 `n-1`:若 `arr[j] < arr[min_idx]`,更新 `min_idx = j`。",
                "en": "For `j = i+1` to `n-1`: if `arr[j] < arr[min_idx]`, update `min_idx = j`."
              },
              {
                "zh": "交換 `arr[min_idx]` 與 `arr[i]`。",
                "en": "Swap `arr[min_idx]` with `arr[i]`."
              },
              {
                "zh": "`i` 遞增,繼續下一輪,直至 `i == n-1`。",
                "en": "Increment `i` and start the next pass until `i == n-1`."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  A[\"[64,25,12,22,11]\\ni=0: find min\"] --> B[\"min=11 at idx=4\\nswap with idx=0\"]\n  B --> C[\"[11,25,12,22,64]\\ni=1: find min in [25,12,22,64]\"]\n  C --> D[\"min=12 at idx=2\\nswap with idx=1\"]\n  D --> E[\"[11,12,25,22,64]\\ncontinue...\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "輪次示意",
          "en": "Pass Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 90\" width=\"360\" height=\"90\"><g font-family=\"sans-serif\" font-size=\"13\"><rect x=\"10\" y=\"30\" width=\"50\" height=\"30\" fill=\"#dcfce7\" stroke=\"#16a34a\"/><rect x=\"60\" y=\"30\" width=\"50\" height=\"30\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><rect x=\"110\" y=\"30\" width=\"50\" height=\"30\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><rect x=\"160\" y=\"30\" width=\"50\" height=\"30\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><rect x=\"210\" y=\"30\" width=\"50\" height=\"30\" fill=\"#fef9c3\" stroke=\"#ca8a04\"/><text x=\"35\" y=\"50\" text-anchor=\"middle\">11</text><text x=\"85\" y=\"50\" text-anchor=\"middle\">25</text><text x=\"135\" y=\"50\" text-anchor=\"middle\">12</text><text x=\"185\" y=\"50\" text-anchor=\"middle\">22</text><text x=\"235\" y=\"50\" text-anchor=\"middle\">64</text><text x=\"35\" y=\"22\" text-anchor=\"middle\" fill=\"#16a34a\">i=0</text><text x=\"235\" y=\"22\" text-anchor=\"middle\" fill=\"#ca8a04\">min↑</text><text x=\"130\" y=\"78\" text-anchor=\"middle\" fill=\"#64748b\">green = sorted prefix</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "綠色區域為已排序前綴(i=0 完成後 11 就位);黃色為本輪找到的最小值(64 是 i=0 輪結束後的結果示意)。每輪僅做一次交換。",
              "en": "Green region is the sorted prefix (11 is settled after pass 0); yellow marks the minimum found (illustrative). Only one swap occurs per pass."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "情況",
                "en": "Case"
              },
              {
                "zh": "時間複雜度",
                "en": "Time"
              },
              {
                "zh": "空間複雜度",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "最佳",
                  "en": "Best"
                },
                {
                  "zh": "$O(n^2)$",
                  "en": "$O(n^2)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "平均",
                  "en": "Average"
                },
                {
                  "zh": "$O(n^2)$",
                  "en": "$O(n^2)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "最壞",
                  "en": "Worst"
                },
                {
                  "zh": "$O(n^2)$",
                  "en": "$O(n^2)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "NOT stable / in-place",
                  "en": "NOT stable / in-place"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "輔助空間 $O(1)$",
                  "en": "Auxiliary $O(1)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T(n) = \\sum_{i=0}^{n-2}(n-1-i) = \\frac{n(n-1)}{2} = O(n^2)",
            "caption": {
              "zh": "無論輸入為何,內層迴圈每次都從 i+1 掃描到 n-1,比較次數固定為 $n(n-1)/2$。",
              "en": "Regardless of input, the inner loop always scans from i+1 to n-1, yielding exactly $n(n-1)/2$ comparisons."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "void selectionSort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        int min_idx = i;\n        for (int j = i + 1; j < n; j++) {\n            if (arr[j] < arr[min_idx])\n                min_idx = j;\n        }\n        // Swap minimum into sorted prefix\n        int temp = arr[min_idx];\n        arr[min_idx] = arr[i];\n        arr[i] = temp;\n    }\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:交換次數最少(最多 $n-1$ 次),適合寫入成本高的媒介。",
                "en": "Pro: minimal swaps (at most $n-1$); suitable for write-expensive media like EEPROM."
              },
              {
                "zh": "優點:in-place,額外空間 $O(1)$。",
                "en": "Pro: in-place, $O(1)$ extra space."
              },
              {
                "zh": "缺點:不論輸入狀態,比較次數固定 $O(n^2)$,無法提前結束。",
                "en": "Con: always $O(n^2)$ comparisons regardless of input — no early exit possible."
              },
              {
                "zh": "缺點:NOT stable,相等元素可能亂序。",
                "en": "Con: NOT stable; equal elements may be reordered."
              },
              {
                "zh": "適用:資料量極小,或寫入操作遠比讀取昂貴的場景。",
                "en": "Use when data is tiny, or when writes are far more expensive than reads."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "每輪從未排序部分找最小值,僅做一次交換。",
                "en": "Each pass finds the minimum of the unsorted part and performs exactly one swap."
              },
              {
                "zh": "所有情況均為 $O(n^2)$;NOT stable、in-place。",
                "en": "All cases are $O(n^2)$; NOT stable, in-place."
              },
              {
                "zh": "交換次數最少是其唯一亮點;大多數場合 Insertion Sort 更優。",
                "en": "Minimal swaps is its sole advantage; Insertion Sort outperforms it in most scenarios."
              }
            ]
          }
        ]
      }
    ]
  },
  "sort-insert": {
    "category": "Sorting",
    "title": {
      "zh": "插入排序法",
      "en": "Insertion Sort"
    },
    "slides": [
      {
        "heading": {
          "zh": "插入排序法",
          "en": "Insertion Sort"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "插入排序法模擬整理撲克牌的方式:逐一取出下一張牌(元素),將其插入左側已排好的手牌中的正確位置,直至所有牌有序。幾乎已排序的資料可達 $O(n)$。",
              "en": "Insertion Sort mimics sorting a hand of cards: pick up the next card (element) one at a time and insert it into the correct position within the already-sorted left portion, until all cards are ordered. Nearly-sorted data achieves $O(n)$."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "外層迴圈從 `i=1` 開始,取出 `key = arr[i]`;內層迴圈將所有大於 `key` 的已排序元素向右移一格,再將 `key` 插入騰出的位置。",
              "en": "The outer loop starts at `i=1` and extracts `key = arr[i]`; the inner loop shifts all sorted elements greater than `key` one position right, then inserts `key` into the vacated slot."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "已排序前綴 `arr[0..i-1]` 始終維持有序狀態。",
                "en": "The sorted prefix `arr[0..i-1]` is always maintained in order."
              },
              {
                "zh": "stable:相等元素不互換,原始順序保留。",
                "en": "stable: equal elements are never swapped — original order is preserved."
              },
              {
                "zh": "in-place:僅 $O(1)$ 額外空間。",
                "en": "in-place: only $O(1)$ extra space."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "取 `key = arr[i]`,令 `j = i - 1`。",
                "en": "Take `key = arr[i]`, set `j = i - 1`."
              },
              {
                "zh": "當 `j >= 0` 且 `arr[j] > key`:令 `arr[j+1] = arr[j]`,`j--`(向右移位)。",
                "en": "While `j >= 0` and `arr[j] > key`: set `arr[j+1] = arr[j]`, `j--` (shift right)."
              },
              {
                "zh": "令 `arr[j+1] = key`(插入正確位置)。",
                "en": "Set `arr[j+1] = key` (insert at the correct position)."
              },
              {
                "zh": "`i` 遞增,繼續處理下一個元素。",
                "en": "Increment `i` and process the next element."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  A[\"[12,11,13,5,6]\\ni=1 key=11\"] --> B[\"shift 12 right\\n[12,12,13,5,6]\\ninsert: [11,12,13,5,6]\"]\n  B --> C[\"i=2 key=13\\n13>=12 no shift\\n[11,12,13,5,6]\"]\n  C --> D[\"i=3 key=5\\nshift 13,12,11\\n[5,11,12,13,6]\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "插入示意",
          "en": "Insertion Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 90\" width=\"360\" height=\"90\"><g font-family=\"sans-serif\" font-size=\"13\"><rect x=\"10\" y=\"30\" width=\"50\" height=\"30\" fill=\"#dcfce7\" stroke=\"#16a34a\"/><rect x=\"60\" y=\"30\" width=\"50\" height=\"30\" fill=\"#dcfce7\" stroke=\"#16a34a\"/><rect x=\"110\" y=\"30\" width=\"50\" height=\"30\" fill=\"#fef9c3\" stroke=\"#ca8a04\"/><rect x=\"160\" y=\"30\" width=\"50\" height=\"30\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><rect x=\"210\" y=\"30\" width=\"50\" height=\"30\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"35\" y=\"50\" text-anchor=\"middle\">5</text><text x=\"85\" y=\"50\" text-anchor=\"middle\">11</text><text x=\"135\" y=\"50\" text-anchor=\"middle\">13</text><text x=\"185\" y=\"50\" text-anchor=\"middle\">6</text><text x=\"235\" y=\"50\" text-anchor=\"middle\">12</text><text x=\"185\" y=\"22\" text-anchor=\"middle\" fill=\"#2563eb\">key=6 (i=3)</text><text x=\"80\" y=\"78\" text-anchor=\"middle\" fill=\"#16a34a\">sorted prefix</text><text x=\"235\" y=\"78\" text-anchor=\"middle\" fill=\"#2563eb\">unsorted</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "綠色為已排序前綴 [5,11,13];藍色框的 6 是當前取出的 key。6 < 13,13 右移;6 < 11,11 右移;6 > 5,停止,插入 arr[1]=6。",
              "en": "Green is the sorted prefix [5,11,13]; the blue key=6 (at i=3) is extracted. 6 < 13 so 13 shifts right; 6 < 11 so 11 shifts right; 6 > 5 so stop, insert at arr[1]=6."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "情況",
                "en": "Case"
              },
              {
                "zh": "時間複雜度",
                "en": "Time"
              },
              {
                "zh": "空間複雜度",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "最佳(已排序)",
                  "en": "Best (sorted)"
                },
                {
                  "zh": "$O(n)$",
                  "en": "$O(n)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "平均",
                  "en": "Average"
                },
                {
                  "zh": "$O(n^2)$",
                  "en": "$O(n^2)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "最壞(逆序)",
                  "en": "Worst (reverse)"
                },
                {
                  "zh": "$O(n^2)$",
                  "en": "$O(n^2)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "stable / in-place",
                  "en": "stable / in-place"
                },
                {
                  "zh": "是",
                  "en": "Yes"
                },
                {
                  "zh": "輔助空間 $O(1)$",
                  "en": "Auxiliary $O(1)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{best}}(n) = O(n),\\quad T_{\\text{worst}}(n) = O(n^2)",
            "caption": {
              "zh": "最佳情況:已排序輸入每輪內層迴圈立即結束,共 $n-1$ 次比較;最壞情況為逆序,第 $i$ 輪需移位 $i$ 次。",
              "en": "Best case: sorted input exits the inner loop immediately each pass — only $n-1$ comparisons total; worst case is reverse order, requiring $i$ shifts in pass $i$."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "void insertionSort(int arr[], int n) {\n    for (int i = 1; i < n; i++) {\n        int key = arr[i];\n        int j = i - 1;\n        // Shift elements greater than key one position right\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j = j - 1;\n        }\n        arr[j + 1] = key; // insert\n    }\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:stable、in-place;幾乎排好的資料達 $O(n)$。",
                "en": "Pro: stable, in-place; $O(n)$ for nearly-sorted data."
              },
              {
                "zh": "優點:小資料集優於 Quick/Merge Sort 的常數開銷。",
                "en": "Pro: lower constant overhead than Quick/Merge Sort for small datasets."
              },
              {
                "zh": "優點:可線上運作(online):逐一接收元素並即時插入。",
                "en": "Pro: online algorithm — can insert elements one by one as they arrive."
              },
              {
                "zh": "缺點:平均與最壞 $O(n^2)$,大資料集不適用。",
                "en": "Con: average and worst case $O(n^2)$; not suitable for large datasets."
              },
              {
                "zh": "適用:小陣列、幾乎已排序的串流資料,或作為 Shell Sort 的最終 gap=1 階段。",
                "en": "Use for small arrays, nearly-sorted streaming data, or as the gap=1 final phase of Shell Sort."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "逐元素插入已排序前綴;stable、in-place。",
                "en": "Inserts each element into the sorted prefix one at a time; stable, in-place."
              },
              {
                "zh": "最佳 $O(n)$,平均/最壞 $O(n^2)$。",
                "en": "Best $O(n)$, average/worst $O(n^2)$."
              },
              {
                "zh": "小資料集和幾乎排序資料的最佳選擇之一。",
                "en": "One of the best choices for small or nearly-sorted datasets."
              }
            ]
          }
        ]
      }
    ]
  },
  "sort-quick": {
    "category": "Sorting",
    "title": {
      "zh": "快速排序法",
      "en": "Quick Sort"
    },
    "slides": [
      {
        "heading": {
          "zh": "快速排序法",
          "en": "Quick Sort"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "快速排序法選取一個 pivot 元素,將陣列分割成「小於 pivot」與「大於 pivot」兩部分,再對兩部分遞迴排序。平均情況 $O(n \\log n)$,為最常用的通用排序演算法。",
              "en": "Quick Sort picks a pivot element, partitions the array into elements less than and greater than the pivot, then recursively sorts both parts. Average $O(n \\log n)$ — the most widely used general-purpose sorting algorithm."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "`partition` 函式以 Lomuto 方案選取 `arr[high]` 為 pivot;使用指標 `i`(慢指標)與 `j`(快指標)。`j` 掃描時,若 `arr[j] < pivot` 則 `i++` 後交換 `arr[i]` 與 `arr[j]`。最後將 pivot 放至 `arr[i+1]`。",
              "en": "`partition` uses the Lomuto scheme with `arr[high]` as pivot; pointer `i` (slow) and `j` (fast). When `arr[j] < pivot`, increment `i` then swap `arr[i]` and `arr[j]`. Finally place the pivot at `arr[i+1]`."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "divide-and-conquer:partition 後 pivot 在最終位置,左右子問題獨立。",
                "en": "divide-and-conquer: after partition the pivot is in its final position; left/right sub-problems are independent."
              },
              {
                "zh": "NOT stable:partition 的交換可改變相等元素的相對順序。",
                "en": "NOT stable: the swap during partition can reorder equal elements."
              },
              {
                "zh": "in-place:遞迴棧空間 $O(\\log n)$ 平均,$O(n)$ 最壞。",
                "en": "in-place: recursion stack uses $O(\\log n)$ average, $O(n)$ worst case."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "選取 `pivot = arr[high]`。",
                "en": "Choose `pivot = arr[high]`."
              },
              {
                "zh": "`i = low - 1`;掃描 `j` 從 `low` 到 `high-1`。",
                "en": "Set `i = low - 1`; scan `j` from `low` to `high-1`."
              },
              {
                "zh": "若 `arr[j] < pivot`:先 `i++` 再交換 `arr[i]` 與 `arr[j]`。",
                "en": "If `arr[j] < pivot`: increment `i`, then swap `arr[i]` and `arr[j]`."
              },
              {
                "zh": "掃描結束後交換 `arr[i+1]` 與 `arr[high]`(pivot 就位),回傳 `i+1`。",
                "en": "After scanning, swap `arr[i+1]` with `arr[high]` (pivot lands), return `i+1`."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart TD\n  A[\"quickSort(arr,0,5)\\npivot=arr[5]\"] --> B[\"partition:\\nelements < pivot | pivot | elements > pivot\"]\n  B --> C[\"quickSort(left)\\nrecurse\"]\n  B --> D[\"quickSort(right)\\nrecurse\"]\n  C --> E[\"base: low>=high\\nreturn\"]\n  D --> E"
          }
        ]
      },
      {
        "heading": {
          "zh": "partition 示意",
          "en": "Partition Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 90\" width=\"380\" height=\"90\"><g font-family=\"sans-serif\" font-size=\"12\"><rect x=\"10\" y=\"30\" width=\"50\" height=\"30\" fill=\"#dcfce7\" stroke=\"#16a34a\"/><rect x=\"60\" y=\"30\" width=\"50\" height=\"30\" fill=\"#dcfce7\" stroke=\"#16a34a\"/><rect x=\"110\" y=\"30\" width=\"50\" height=\"30\" fill=\"#dcfce7\" stroke=\"#16a34a\"/><rect x=\"160\" y=\"30\" width=\"50\" height=\"30\" fill=\"#fef9c3\" stroke=\"#ca8a04\" stroke-width=\"2\"/><rect x=\"210\" y=\"30\" width=\"50\" height=\"30\" fill=\"#fee2e2\" stroke=\"#dc2626\"/><rect x=\"260\" y=\"30\" width=\"50\" height=\"30\" fill=\"#fee2e2\" stroke=\"#dc2626\"/><text x=\"35\" y=\"50\" text-anchor=\"middle\">1</text><text x=\"85\" y=\"50\" text-anchor=\"middle\">5</text><text x=\"135\" y=\"50\" text-anchor=\"middle\">7</text><text x=\"185\" y=\"50\" text-anchor=\"middle\">10</text><text x=\"235\" y=\"50\" text-anchor=\"middle\">11</text><text x=\"285\" y=\"50\" text-anchor=\"middle\">12</text><text x=\"185\" y=\"22\" text-anchor=\"middle\" fill=\"#ca8a04\">pivot=10</text><text x=\"65\" y=\"78\" text-anchor=\"middle\" fill=\"#16a34a\">&lt; pivot</text><text x=\"245\" y=\"78\" text-anchor=\"middle\" fill=\"#dc2626\">&gt;= pivot</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "partition 結束後 pivot=10 落在最終位置(index 3);綠色區域 [1,5,7] 均 < 10,紅色區域 [11,12] 均 > 10。兩區域再各自遞迴排序。",
              "en": "After partition, pivot=10 lands at its final position (index 3); green region [1,5,7] are all < 10, red region [11,12] are all > 10. Both regions are then sorted recursively."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "情況",
                "en": "Case"
              },
              {
                "zh": "時間複雜度",
                "en": "Time"
              },
              {
                "zh": "空間複雜度(棧)",
                "en": "Space (stack)"
              }
            ],
            "rows": [
              [
                {
                  "zh": "最佳(每次均分)",
                  "en": "Best (balanced)"
                },
                {
                  "zh": "$O(n \\log n)$",
                  "en": "$O(n \\log n)$"
                },
                {
                  "zh": "$O(\\log n)$",
                  "en": "$O(\\log n)$"
                }
              ],
              [
                {
                  "zh": "平均",
                  "en": "Average"
                },
                {
                  "zh": "$O(n \\log n)$",
                  "en": "$O(n \\log n)$"
                },
                {
                  "zh": "$O(\\log n)$",
                  "en": "$O(\\log n)$"
                }
              ],
              [
                {
                  "zh": "最壞(已排序/逆序)",
                  "en": "Worst (sorted/reverse)"
                },
                {
                  "zh": "$O(n^2)$",
                  "en": "$O(n^2)$"
                },
                {
                  "zh": "$O(n)$",
                  "en": "$O(n)$"
                }
              ],
              [
                {
                  "zh": "NOT stable / in-place",
                  "en": "NOT stable / in-place"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "輔助 $O(\\log n)$ 平均",
                  "en": "Aux $O(\\log n)$ avg"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{avg}}(n) = 2T\\!\\left(\\frac{n}{2}\\right) + O(n) = O(n \\log n)",
            "caption": {
              "zh": "每次 partition 均分時遞迴深度 $\\log n$,每層線性掃描,總計 $O(n \\log n)$。最壞情況(pivot 每次選到最大/最小值)退化為 $O(n^2)$。",
              "en": "With balanced partitions, recursion depth is $\\log n$, each level scans $O(n)$, giving $O(n \\log n)$. Worst case (pivot always max/min) degrades to $O(n^2)$."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "int partition(int arr[], int low, int high) {\n    int pivot = arr[high]; // Lomuto: last element as pivot\n    int i = low - 1;\n    for (int j = low; j < high; j++) {\n        if (arr[j] < pivot) {\n            i++;\n            swap(arr[i], arr[j]);\n        }\n    }\n    swap(arr[i + 1], arr[high]); // place pivot\n    return i + 1;\n}\n\nvoid quickSort(int arr[], int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:平均 $O(n \\log n)$,快取友善,實際最快的通用排序之一。",
                "en": "Pro: average $O(n \\log n)$, cache-friendly — one of the fastest general-purpose sorts in practice."
              },
              {
                "zh": "優點:in-place,記憶體開銷低於 Merge Sort。",
                "en": "Pro: in-place; lower memory overhead than Merge Sort."
              },
              {
                "zh": "缺點:最壞 $O(n^2)$(已排序輸入+固定選 pivot);需隨機化或三數中值選 pivot 改善。",
                "en": "Con: worst case $O(n^2)$ (sorted input + fixed pivot); randomized or median-of-three pivot selection mitigates this."
              },
              {
                "zh": "缺點:NOT stable。",
                "en": "Con: NOT stable."
              },
              {
                "zh": "適用:通用陣列排序;C++ `std::sort` 通常採用 Introsort(Quick+Heap 混合)。",
                "en": "Use for general array sorting; C++ `std::sort` typically uses Introsort (Quick + Heap hybrid)."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "pivot 分割 + 遞迴排序;平均 $O(n \\log n)$,最壞 $O(n^2)$。",
                "en": "Pivot-based partition + recursive sort; average $O(n \\log n)$, worst $O(n^2)$."
              },
              {
                "zh": "NOT stable;in-place(棧空間 $O(\\log n)$ 平均)。",
                "en": "NOT stable; in-place (stack $O(\\log n)$ average)."
              },
              {
                "zh": "實際最快通用排序;隨機化選 pivot 可將最壞情況出現機率降至極低。",
                "en": "Fastest general-purpose sort in practice; randomized pivot makes worst case extremely unlikely."
              }
            ]
          }
        ]
      }
    ]
  },
  "sort-shell": {
    "category": "Sorting",
    "title": {
      "zh": "希爾排序法",
      "en": "Shell Sort"
    },
    "slides": [
      {
        "heading": {
          "zh": "希爾排序法",
          "en": "Shell Sort"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "希爾排序法是 Insertion Sort 的改良版:以遞減的「間距(gap)」分組，先讓遠距元素就位，最後 gap=1 時等同 Insertion Sort 但資料已幾乎有序，大幅降低移位次數。",
              "en": "Shell Sort is an improved Insertion Sort: it uses a decreasing gap sequence to sort elements far apart first, so by the time gap=1 (standard Insertion Sort) the array is nearly sorted, dramatically reducing shifts."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "初始 gap = n/2;每次外層迴圈將 gap 減半。對每個 gap,從索引 `gap` 開始,把 `arr[i]` 與 `arr[i-gap]`、`arr[i-2*gap]`... 做類 Insertion Sort 的向後移位插入。",
              "en": "Initial gap = n/2; each outer iteration halves the gap. For each gap, starting at index `gap`, perform Insertion-Sort-like backward shifts comparing `arr[i]` with `arr[i-gap]`, `arr[i-2*gap]`, etc."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "gap 序列決定複雜度:Knuth 序列 $(3^k-1)/2$ 在實務中表現約 $O(n^{1.3})$,理論最壞上界約為 $O(n^{3/2})$。",
                "en": "Gap sequence determines complexity: Knuth's $(3^k-1)/2$ sequence gives strong empirical performance around $O(n^{1.3})$ in practice, with a proven worst-case bound of about $O(n^{3/2})$."
              },
              {
                "zh": "NOT stable:遠距交換可改變相等元素的相對順序。",
                "en": "NOT stable: long-distance swaps can reorder equal elements."
              },
              {
                "zh": "in-place:僅 $O(1)$ 額外空間。",
                "en": "in-place: only $O(1)$ auxiliary space."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "gap = n/2;while gap > 0。",
                "en": "gap = n/2; while gap > 0."
              },
              {
                "zh": "對 i 從 gap 到 n-1:令 `temp = arr[i]`,向左以步長 gap 移位直到找到正確位置。",
                "en": "For i from gap to n-1: set `temp = arr[i]`, shift left by gap until the correct position is found."
              },
              {
                "zh": "將 `temp` 插入騰出的位置。",
                "en": "Insert `temp` at the vacated position."
              },
              {
                "zh": "gap /= 2;繼續下一輪直至 gap = 0。",
                "en": "gap /= 2; continue until gap = 0."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  A[\"[12,34,54,2,3]\\ngap=2\"] --> B[\"gap=2 pass:\\n[3,2,12,34,54]\"]\n  B --> C[\"gap=1 pass:\\n[2,3,12,34,54]\"]\n  C --> D[\"[2,3,12,34,54]\\nsorted\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "gap 分組示意",
          "en": "Gap Grouping Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 100\" width=\"380\" height=\"100\"><g font-family=\"sans-serif\" font-size=\"12\"><text x=\"10\" y=\"18\" fill=\"#64748b\">gap=2: compare elements 2 apart</text><rect x=\"10\" y=\"28\" width=\"50\" height=\"26\" fill=\"#dbeafe\" stroke=\"#2563eb\" stroke-width=\"2\"/><rect x=\"60\" y=\"28\" width=\"50\" height=\"26\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\"/><rect x=\"110\" y=\"28\" width=\"50\" height=\"26\" fill=\"#dbeafe\" stroke=\"#2563eb\" stroke-width=\"2\"/><rect x=\"160\" y=\"28\" width=\"50\" height=\"26\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\"/><rect x=\"210\" y=\"28\" width=\"50\" height=\"26\" fill=\"#dbeafe\" stroke=\"#2563eb\" stroke-width=\"2\"/><text x=\"35\" y=\"46\" text-anchor=\"middle\">12</text><text x=\"85\" y=\"46\" text-anchor=\"middle\">34</text><text x=\"135\" y=\"46\" text-anchor=\"middle\">54</text><text x=\"185\" y=\"46\" text-anchor=\"middle\">2</text><text x=\"235\" y=\"46\" text-anchor=\"middle\">3</text><text x=\"35\" y=\"78\" text-anchor=\"middle\" fill=\"#2563eb\">group A</text><text x=\"135\" y=\"78\" text-anchor=\"middle\" fill=\"#2563eb\">group A</text><text x=\"235\" y=\"78\" text-anchor=\"middle\" fill=\"#2563eb\">group A</text><text x=\"85\" y=\"78\" text-anchor=\"middle\" fill=\"#16a34a\">group B</text><text x=\"185\" y=\"78\" text-anchor=\"middle\" fill=\"#16a34a\">group B</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "gap=2 時,藍色(idx 0,2,4)和綠色(idx 1,3)各自為一組進行 Insertion Sort;先讓遠距元素就位可減少最終 gap=1 的工作量。",
              "en": "With gap=2, blue (idx 0,2,4) and green (idx 1,3) are sorted independently by Insertion Sort; pre-ordering distant elements reduces the work needed at gap=1."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "情況",
                "en": "Case"
              },
              {
                "zh": "時間複雜度",
                "en": "Time"
              },
              {
                "zh": "空間複雜度",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "最佳",
                  "en": "Best"
                },
                {
                  "zh": "$O(n \\log n)$",
                  "en": "$O(n \\log n)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "平均(Knuth gap)",
                  "en": "Average (Knuth gap)"
                },
                {
                  "zh": "$O(n^{1.3})$",
                  "en": "$O(n^{1.3})$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "最壞(n/2 gap)",
                  "en": "Worst (n/2 gap)"
                },
                {
                  "zh": "$O(n^2)$",
                  "en": "$O(n^2)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "NOT stable / in-place",
                  "en": "NOT stable / in-place"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "輔助空間 $O(1)$",
                  "en": "Auxiliary $O(1)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T(n) \\approx O(n^{1.3}) \\text{ with Knuth gap } g_k = \\frac{3^k-1}{2}",
            "caption": {
              "zh": "Knuth 間距序列(1,4,13,40,...)在實際測試中表現優異;理論複雜度介於 $O(n \\log^2 n)$ 與 $O(n^{4/3})$ 之間。",
              "en": "Knuth's gap sequence (1,4,13,40,...) performs well in practice; theoretical complexity lies between $O(n \\log^2 n)$ and $O(n^{4/3})$."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "void shellSort(int arr[], int n) {\n    for (int gap = n / 2; gap > 0; gap /= 2) {\n        // Insertion sort with current gap\n        for (int i = gap; i < n; i++) {\n            int temp = arr[i];\n            int j;\n            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {\n                arr[j] = arr[j - gap]; // shift right by gap\n            }\n            arr[j] = temp; // insert\n        }\n    }\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:in-place,$O(1)$ 額外空間,實作簡單。",
                "en": "Pro: in-place, $O(1)$ extra space, simple to implement."
              },
              {
                "zh": "優點:比 $O(n^2)$ 排序快得多,且不需額外記憶體(優於 Merge Sort)。",
                "en": "Pro: significantly faster than $O(n^2)$ sorts while requiring no extra memory (unlike Merge Sort)."
              },
              {
                "zh": "缺點:NOT stable;最佳 gap 序列仍是開放研究問題。",
                "en": "Con: NOT stable; the optimal gap sequence remains an open research question."
              },
              {
                "zh": "缺點:大資料集不及 Quick Sort 或 Merge Sort。",
                "en": "Con: outperformed by Quick Sort or Merge Sort for large datasets."
              },
              {
                "zh": "適用:嵌入式系統或記憶體受限環境,需要比 $O(n^2)$ 更快且無需額外空間的排序。",
                "en": "Use in embedded or memory-constrained environments needing something faster than $O(n^2)$ with no extra space."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "遞減 gap 的 Insertion Sort;先遠距就位再細部調整。",
                "en": "Insertion Sort with a decreasing gap; pre-sorts distant elements before fine-tuning."
              },
              {
                "zh": "NOT stable;in-place $O(1)$;複雜度取決於 gap 序列。",
                "en": "NOT stable; in-place $O(1)$; complexity depends on the gap sequence."
              },
              {
                "zh": "記憶體受限場景中性價比高於 Merge Sort。",
                "en": "Better cost-performance than Merge Sort in memory-constrained scenarios."
              }
            ]
          }
        ]
      }
    ]
  },
  "sort-bucket": {
    "category": "Sorting",
    "title": {
      "zh": "桶排序法",
      "en": "Bucket Sort"
    },
    "slides": [
      {
        "heading": {
          "zh": "桶排序法",
          "en": "Bucket Sort"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "桶排序法將輸入元素依其值域分散至若干「桶」中,對各桶個別排序後再依序串接。當輸入均勻分佈時,平均時間複雜度達 $O(n+k)$,其中 $k$ 為桶數。",
              "en": "Bucket Sort distributes input elements into a number of \"buckets\" by value range, sorts each bucket individually, then concatenates. With uniformly distributed input, average time complexity is $O(n+k)$, where $k$ is the number of buckets."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "建立 $n$ 個桶,將 $[0,1)$ 的浮點數以 `bucketIndex = floor(n * arr[i])` 分配。各桶以 Insertion Sort(或 `std::sort`)排序,最後按桶序串接回原陣列。",
              "en": "Create $n$ buckets, assign each element (in $[0,1)$) via `bucketIndex = floor(n * arr[i])`. Sort each bucket with Insertion Sort (or `std::sort`), then concatenate in order."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "元素均勻分佈時,每桶平均含 $O(1)$ 個元素,各桶排序 $O(1)$,整體 $O(n)$。",
                "en": "With uniform distribution, each bucket has $O(1)$ elements on average; each sorts in $O(1)$, giving $O(n)$ overall."
              },
              {
                "zh": "最壞情況:所有元素落入同一桶,退化為 $O(n^2)$(取決於桶內排序)。",
                "en": "Worst case: all elements fall into one bucket, degrading to $O(n^2)$ (depends on the intra-bucket sort)."
              },
              {
                "zh": "NOT in-place:需 $O(n+k)$ 額外空間存放桶結構。",
                "en": "NOT in-place: $O(n+k)$ auxiliary space needed for the bucket structure."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "建立 $n$ 個空桶。",
                "en": "Create $n$ empty buckets."
              },
              {
                "zh": "遍歷陣列,計算 `bucketIndex = (int)(n * arr[i])`,將元素推入對應桶。",
                "en": "Iterate the array, compute `bucketIndex = (int)(n * arr[i])`, push each element into its bucket."
              },
              {
                "zh": "對每個桶內的元素排序(如 Insertion Sort)。",
                "en": "Sort the elements within each bucket (e.g. Insertion Sort)."
              },
              {
                "zh": "依桶序串接所有元素回原陣列。",
                "en": "Concatenate all buckets back into the original array in order."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  A[\"input: [0.78,0.17,0.39,0.26,0.72]\\nn=5 buckets (0..4)\"] --> B[\"distribute\\n(bucketIndex = floor(5*v))\"]\n  B --> C[\"bucket 0: [0.17]\\nbucket 1: [0.39,0.26]\\nbucket 2: []\\nbucket 3: [0.78,0.72]\\nbucket 4: []\"]\n  C --> D[\"sort each bucket\\nbucket 1: [0.26,0.39]\\nbucket 3: [0.72,0.78]\"]\n  D --> E[\"concat: [0.17,0.26,0.39,0.72,0.78]\\nsorted\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "桶分配示意",
          "en": "Bucket Distribution Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 110\" width=\"380\" height=\"110\"><g font-family=\"sans-serif\" font-size=\"11\"><rect x=\"10\" y=\"25\" width=\"60\" height=\"65\" fill=\"#dcfce7\" stroke=\"#16a34a\"/><rect x=\"78\" y=\"25\" width=\"60\" height=\"65\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><rect x=\"146\" y=\"25\" width=\"60\" height=\"65\" fill=\"#f1f5f9\" stroke=\"#94a3b8\"/><rect x=\"214\" y=\"25\" width=\"60\" height=\"65\" fill=\"#fef9c3\" stroke=\"#ca8a04\"/><rect x=\"282\" y=\"25\" width=\"60\" height=\"65\" fill=\"#f1f5f9\" stroke=\"#94a3b8\"/><text x=\"40\" y=\"18\" text-anchor=\"middle\" fill=\"#64748b\">bkt 0</text><text x=\"108\" y=\"18\" text-anchor=\"middle\" fill=\"#64748b\">bkt 1</text><text x=\"176\" y=\"18\" text-anchor=\"middle\" fill=\"#64748b\">bkt 2</text><text x=\"244\" y=\"18\" text-anchor=\"middle\" fill=\"#64748b\">bkt 3</text><text x=\"312\" y=\"18\" text-anchor=\"middle\" fill=\"#64748b\">bkt 4</text><text x=\"40\" y=\"14\" text-anchor=\"middle\" fill=\"#64748b\"></text><text x=\"40\" y=\"62\" text-anchor=\"middle\">0.17</text><text x=\"108\" y=\"55\" text-anchor=\"middle\">0.26</text><text x=\"108\" y=\"71\" text-anchor=\"middle\">0.39</text><text x=\"176\" y=\"62\" text-anchor=\"middle\">—</text><text x=\"244\" y=\"55\" text-anchor=\"middle\">0.72</text><text x=\"244\" y=\"71\" text-anchor=\"middle\">0.78</text><text x=\"312\" y=\"62\" text-anchor=\"middle\">—</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "5 個桶索引 0–4,每桶覆蓋 0.2 的值域。bucketIndex = floor(5×v):0.17→桶0;0.26,0.39→桶1;0.72,0.78→桶3。各桶排序後依序串接得 [0.17,0.26,0.39,0.72,0.78]。",
              "en": "5 buckets (indices 0–4), each covering a 0.2 value range. bucketIndex = floor(5×v): 0.17→bucket 0; 0.26,0.39→bucket 1; 0.72,0.78→bucket 3. Sorting each bucket then concatenating yields [0.17,0.26,0.39,0.72,0.78]."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "情況",
                "en": "Case"
              },
              {
                "zh": "時間複雜度",
                "en": "Time"
              },
              {
                "zh": "空間複雜度",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "最佳/平均(均勻分佈)",
                  "en": "Best/Avg (uniform)"
                },
                {
                  "zh": "$O(n+k)$",
                  "en": "$O(n+k)$"
                },
                {
                  "zh": "$O(n+k)$",
                  "en": "$O(n+k)$"
                }
              ],
              [
                {
                  "zh": "最壞(全部落入一桶)",
                  "en": "Worst (all in one bucket)"
                },
                {
                  "zh": "$O(n^2)$",
                  "en": "$O(n^2)$"
                },
                {
                  "zh": "$O(n+k)$",
                  "en": "$O(n+k)$"
                }
              ],
              [
                {
                  "zh": "stable(取決於桶內排序)",
                  "en": "stable (depends on intra-sort)"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "輔助空間 $O(n+k)$",
                  "en": "Auxiliary $O(n+k)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{avg}}(n,k) = O(n) + k \\cdot O\\!\\left(\\frac{n}{k}\\right)^2 = O\\!\\left(n + \\frac{n^2}{k}\\right)",
            "caption": {
              "zh": "均勻分佈時每桶期望 $n/k$ 個元素,各桶 Insertion Sort 為 $O((n/k)^2)$;取 $k=n$ 使平均降至 $O(n)$。",
              "en": "With uniform distribution each bucket has $n/k$ elements on average, each sorted in $O((n/k)^2)$; setting $k=n$ reduces average cost to $O(n)$."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "void bucketSort(vector<float>& arr) {\n    int n = arr.size();\n    if (n <= 0)\n        return;\n    // Create n empty buckets\n    vector<vector<float>> buckets(n);\n    // Distribute elements into buckets\n    for (int i = 0; i < n; i++) {\n        int bi = (int)(n * arr[i]);\n        if (bi >= n)\n            bi = n - 1;\n        buckets[bi].push_back(arr[i]);\n    }\n    // Sort individual buckets\n    for (int i = 0; i < n; i++)\n        sort(buckets[i].begin(), buckets[i].end());\n    // Concatenate back\n    int index = 0;\n    for (int i = 0; i < n; i++)\n        for (float x : buckets[i])\n            arr[index++] = x;\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:均勻分佈時達 $O(n+k)$,優於比較排序的 $O(n \\log n)$ 下界。",
                "en": "Pro: $O(n+k)$ for uniform input — beats the $O(n \\log n)$ comparison-sort lower bound."
              },
              {
                "zh": "優點:可平行化:各桶獨立排序。",
                "en": "Pro: parallelizable — each bucket is sorted independently."
              },
              {
                "zh": "缺點:效能高度依賴輸入分佈;非均勻時退化至 $O(n^2)$。",
                "en": "Con: performance highly depends on input distribution; degrades to $O(n^2)$ for skewed data."
              },
              {
                "zh": "缺點:需要 $O(n+k)$ 額外空間。",
                "en": "Con: requires $O(n+k)$ extra space."
              },
              {
                "zh": "適用:浮點數均勻分佈在 $[0,1)$ 的場景,如隨機數排序、分佈式系統。",
                "en": "Use when floats are uniformly distributed in $[0,1)$, e.g. random number sorting, distributed systems."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "分散 + 桶內排序 + 串接;非比較排序。",
                "en": "Distribute + intra-bucket sort + concatenate; non-comparison sort."
              },
              {
                "zh": "均勻輸入平均 $O(n+k)$;最壞 $O(n^2)$。",
                "en": "Average $O(n+k)$ for uniform input; worst case $O(n^2)$."
              },
              {
                "zh": "最適合值域已知且近乎均勻分佈的浮點數排序。",
                "en": "Best suited for sorting floats with a known range and near-uniform distribution."
              }
            ]
          }
        ]
      }
    ]
  },
  "sort-count": {
    "category": "Sorting",
    "title": {
      "zh": "計數排序法",
      "en": "Counting Sort"
    },
    "slides": [
      {
        "heading": {
          "zh": "計數排序法",
          "en": "Counting Sort"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "計數排序法不做元素間比較,而是統計每個鍵值出現次數,再由累積計數直接計算每個元素在輸出陣列中的位置。時間與空間均為 $O(n+k)$,其中 $k$ 為值域寬度。",
              "en": "Counting Sort avoids element comparisons: it counts the frequency of each key, then uses cumulative counts to place each element directly at its correct output position. Both time and space are $O(n+k)$, where $k$ is the value range."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "三個步驟:①建立計數陣列 `count[k]` 統計頻率；②對 `count` 做前綴和,令 `count[i]` 表示 $\\leq i$ 的元素個數；③從後往前掃描原陣列,依 `count` 放至 `output`,並遞減計數(保證 stable)。",
              "en": "Three steps: ① build count array `count[k]` for frequencies; ② prefix-sum `count` so `count[i]` is the number of elements $\\leq i$; ③ scan original array from back to front, place each element at `output[count[val]-1]` and decrement (ensuring stable)."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "從後往前掃描保證 stable:相同鍵值後出現的元素置於後方。",
                "en": "Backward scan ensures stable: among equal keys, later elements are placed later."
              },
              {
                "zh": "限制:僅適用整數(或可映射至整數鍵的資料);$k$ 過大時空間浪費。",
                "en": "Restriction: only for integers (or data mappable to integer keys); wastes space when $k$ is very large."
              },
              {
                "zh": "$k \\ll n$ 時效率最高,如年齡、分數等有限值域排序。",
                "en": "Most efficient when $k \\ll n$, e.g. sorting ages, scores, or other bounded integer domains."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "找出最大值 max 與最小值 min;range = max - min + 1。",
                "en": "Find max and min; range = max - min + 1."
              },
              {
                "zh": "建立 `count[range]`(初始化 0),統計各元素頻率:`count[arr[i]-min]++`。",
                "en": "Create `count[range]` (zero-init), count frequencies: `count[arr[i]-min]++`."
              },
              {
                "zh": "前綴和:`count[i] += count[i-1]`。",
                "en": "Prefix sum: `count[i] += count[i-1]`."
              },
              {
                "zh": "從後往前:`output[count[arr[i]-min]-1] = arr[i]; count[arr[i]-min]--`。",
                "en": "Back-to-front: `output[count[arr[i]-min]-1] = arr[i]; count[arr[i]-min]--`."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart TD\n  A[\"input: [4,2,2,8,3,3,1]\"] --> B[\"count freq:\\ncount[1]=1 count[2]=2\\ncount[3]=2 count[4]=1 count[8]=1\"]\n  B --> C[\"prefix sum:\\ncount[1]=1 count[2]=3\\ncount[3]=5 count[4]=6 count[8]=7\"]\n  C --> D[\"place back-to-front:\\noutput=[1,2,2,3,3,4,8]\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "計數陣列示意",
          "en": "Count Array Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 100\" width=\"380\" height=\"100\"><g font-family=\"sans-serif\" font-size=\"11\"><text x=\"10\" y=\"18\" fill=\"#64748b\">count (after prefix sum, values 1-4 shown):</text><rect x=\"10\" y=\"26\" width=\"55\" height=\"26\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><rect x=\"65\" y=\"26\" width=\"55\" height=\"26\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><rect x=\"120\" y=\"26\" width=\"55\" height=\"26\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><rect x=\"175\" y=\"26\" width=\"55\" height=\"26\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"37\" y=\"44\" text-anchor=\"middle\">1</text><text x=\"92\" y=\"44\" text-anchor=\"middle\">3</text><text x=\"147\" y=\"44\" text-anchor=\"middle\">5</text><text x=\"202\" y=\"44\" text-anchor=\"middle\">6</text><text x=\"37\" y=\"66\" text-anchor=\"middle\" fill=\"#64748b\">key=1</text><text x=\"92\" y=\"66\" text-anchor=\"middle\" fill=\"#64748b\">key=2</text><text x=\"147\" y=\"66\" text-anchor=\"middle\" fill=\"#64748b\">key=3</text><text x=\"202\" y=\"66\" text-anchor=\"middle\" fill=\"#64748b\">key=4</text><text x=\"10\" y=\"90\" fill=\"#374151\">output[count[k]-1] = k → place at correct index</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "前綴和後 count[2]=3 表示 $\\leq 2$ 共有 3 個元素,故最後一個 2 應放在 output[2](0-indexed)。從後往前確保 stable。",
              "en": "After prefix sum, count[2]=3 means there are 3 elements $\\leq 2$, so the last occurrence of 2 goes to output[2] (0-indexed). Back-to-front placement ensures stability."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "情況",
                "en": "Case"
              },
              {
                "zh": "時間複雜度",
                "en": "Time"
              },
              {
                "zh": "空間複雜度",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "最佳 / 平均 / 最壞",
                  "en": "Best / Average / Worst"
                },
                {
                  "zh": "$O(n+k)$",
                  "en": "$O(n+k)$"
                },
                {
                  "zh": "$O(n+k)$",
                  "en": "$O(n+k)$"
                }
              ],
              [
                {
                  "zh": "stable / NOT in-place",
                  "en": "stable / NOT in-place"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "輔助空間 $O(n+k)$",
                  "en": "Auxiliary $O(n+k)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T(n,k) = O(n + k)",
            "caption": {
              "zh": "$n$ 為元素個數,$k$ 為值域寬度(max-min+1)。當 $k = O(n)$ 時整體為 $O(n)$,突破比較排序 $O(n \\log n)$ 下界。",
              "en": "$n$ = number of elements, $k$ = value range (max-min+1). When $k = O(n)$ the overall cost is $O(n)$, breaking the comparison-sort $O(n \\log n)$ lower bound."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "void countingSort(vector<int>& arr) {\n    int maxV = *max_element(arr.begin(), arr.end());\n    int minV = *min_element(arr.begin(), arr.end());\n    int range = maxV - minV + 1;\n    vector<int> count(range, 0), output(arr.size());\n    // Count frequencies\n    for (int x : arr)\n        count[x - minV]++;\n    // Cumulative sum\n    for (int i = 1; i < range; i++)\n        count[i] += count[i - 1];\n    // Place back-to-front (stable)\n    for (int i = arr.size() - 1; i >= 0; i--) {\n        output[count[arr[i] - minV] - 1] = arr[i];\n        count[arr[i] - minV]--;\n    }\n    arr = output;\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:stable,$O(n+k)$ 線性時間,可突破比較排序下界。",
                "en": "Pro: stable, $O(n+k)$ linear time — beats the comparison-sort lower bound."
              },
              {
                "zh": "優點:Radix Sort 的子程序(LSD 逐位排序)。",
                "en": "Pro: used as a subroutine in Radix Sort (LSD digit-by-digit sort)."
              },
              {
                "zh": "缺點:僅適用有限整數鍵;$k$ 過大時空間浪費嚴重。",
                "en": "Con: only for bounded integer keys; space waste grows with $k$."
              },
              {
                "zh": "缺點:NOT in-place,需 $O(n+k)$ 額外記憶體。",
                "en": "Con: NOT in-place, needs $O(n+k)$ extra memory."
              },
              {
                "zh": "適用:排序年齡、分數、ASCII 字元等有限整數鍵的大量資料。",
                "en": "Use for large volumes of bounded integer keys like ages, scores, or ASCII characters."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "非比較排序:計數 → 前綴和 → 反向放置。",
                "en": "Non-comparison sort: count → prefix sum → backward placement."
              },
              {
                "zh": "stable;所有情況 $O(n+k)$;輔助空間 $O(n+k)$。",
                "en": "stable; $O(n+k)$ always; $O(n+k)$ auxiliary space."
              },
              {
                "zh": "有限整數值域的最優線性排序;也是 Radix Sort 的核心。",
                "en": "Optimal linear sort for bounded integer domains; also the core of Radix Sort."
              }
            ]
          }
        ]
      }
    ]
  },
  "sort-radix": {
    "category": "Sorting",
    "title": {
      "zh": "基數排序法",
      "en": "Radix Sort"
    },
    "slides": [
      {
        "heading": {
          "zh": "基數排序法",
          "en": "Radix Sort"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "基數排序法從最低有效位(LSD)到最高有效位,對每一位數依序執行一次 stable 的 Counting Sort,最終完成整個整數序列的排序,總時間為 $O(d(n+k))$。",
              "en": "Radix Sort performs one stable Counting Sort pass per digit, from the least significant digit (LSD) to the most significant, sorting the entire integer sequence in $O(d(n+k))$ total time."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "以 `exp = 1, 10, 100, ...` 逐位排序,每次 `countingSortDigit` 對 `(arr[i] / exp) % 10` 進行 Counting Sort。關鍵:每次子排序必須 stable,才能保證低位已建立的順序不被高位破壞。",
              "en": "Sort digit by digit with `exp = 1, 10, 100, ...`; each `countingSortDigit` applies Counting Sort on `(arr[i] / exp) % 10`. Key: each sub-sort must be stable so lower-digit order established earlier is preserved when sorting higher digits."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "$d$ 為最大元素的位數;$k=10$(十進制)。總複雜度 $O(d(n+k))$。",
                "en": "$d$ = number of digits in the maximum element; $k=10$ (decimal). Total: $O(d(n+k))$."
              },
              {
                "zh": "stable:每次 stable 子排序確保整體結果有序。",
                "en": "stable: stable sub-sorts guarantee the final result is correctly ordered."
              },
              {
                "zh": "NOT in-place:需 $O(n+k)$ 輔助空間存放 output 陣列。",
                "en": "NOT in-place: $O(n+k)$ auxiliary space for the output array."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "找出最大值 maxEl;決定位數(迴圈條件 `maxEl / exp > 0`)。",
                "en": "Find maxEl; determine digit count (loop condition `maxEl / exp > 0`)."
              },
              {
                "zh": "對 `exp = 1`:對個位數做 stable Counting Sort。",
                "en": "For `exp = 1`: stable Counting Sort on the units digit."
              },
              {
                "zh": "對 `exp = 10`:對十位數做 stable Counting Sort(保持個位已排好的順序)。",
                "en": "For `exp = 10`: stable Counting Sort on the tens digit (preserving units-digit order)."
              },
              {
                "zh": "重複直至所有位數處理完畢。",
                "en": "Repeat until all digits have been processed."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  A[\"[170,45,75,90,802,24,2,66]\"] --> B[\"sort by 1s:\\n[170,90,802,2,24,45,75,66]\"]\n  B --> C[\"sort by 10s:\\n[802,2,24,45,66,170,75,90]\"]\n  C --> D[\"sort by 100s:\\n[2,24,45,66,75,90,170,802]\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "LSD 位排序示意",
          "en": "LSD Digit-Sort Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 100\" width=\"380\" height=\"100\"><g font-family=\"sans-serif\" font-size=\"11\"><text x=\"10\" y=\"16\" fill=\"#64748b\">Pass 1 (exp=1, sort by units digit):</text><rect x=\"10\" y=\"24\" width=\"40\" height=\"22\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><rect x=\"52\" y=\"24\" width=\"40\" height=\"22\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><rect x=\"94\" y=\"24\" width=\"40\" height=\"22\" fill=\"#fef9c3\" stroke=\"#ca8a04\"/><rect x=\"136\" y=\"24\" width=\"40\" height=\"22\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><rect x=\"178\" y=\"24\" width=\"40\" height=\"22\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"30\" y=\"39\" text-anchor=\"middle\">170</text><text x=\"72\" y=\"39\" text-anchor=\"middle\">45</text><text x=\"114\" y=\"39\" text-anchor=\"middle\">75</text><text x=\"156\" y=\"39\" text-anchor=\"middle\">90</text><text x=\"198\" y=\"39\" text-anchor=\"middle\">802</text><text x=\"10\" y=\"70\" fill=\"#64748b\">After sort by 1s: 170, 90, 802, 2, 24, 45, 75, 66</text><text x=\"10\" y=\"90\" fill=\"#374151\">units: 0,0,2,2,4,5,5,6 → stable sort by 0→9</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "每輪只看一個位數;stable 保證相同位數值的元素保持前一輪排好的順序。三輪後全部有序。",
              "en": "Each pass examines only one digit; stability ensures elements with the same digit value retain their order from the previous pass. Three passes yield a fully sorted array."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "情況",
                "en": "Case"
              },
              {
                "zh": "時間複雜度",
                "en": "Time"
              },
              {
                "zh": "空間複雜度",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "最佳 / 平均 / 最壞",
                  "en": "Best / Average / Worst"
                },
                {
                  "zh": "$O(d(n+k))$",
                  "en": "$O(d(n+k))$"
                },
                {
                  "zh": "$O(n+k)$",
                  "en": "$O(n+k)$"
                }
              ],
              [
                {
                  "zh": "stable / NOT in-place",
                  "en": "stable / NOT in-place"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "輔助空間 $O(n+k)$",
                  "en": "Auxiliary $O(n+k)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T(n,d,k) = O(d \\cdot (n+k))",
            "caption": {
              "zh": "$d$ 為位數,$k$ 為基數(十進制 $k=10$)。對固定位數整數,$d$ 為常數,故整體為 $O(n)$。",
              "en": "$d$ = digit count, $k$ = radix (10 for decimal). For fixed-width integers $d$ is constant, making the overall cost $O(n)$."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "void countingSortDigit(vector<int>& arr, int exp) {\n    int n = arr.size();\n    vector<int> output(n);\n    int count[10] = {0};\n    for (int i = 0; i < n; i++)\n        count[(arr[i] / exp) % 10]++;\n    for (int i = 1; i < 10; i++)\n        count[i] += count[i - 1];\n    // Back-to-front for stability\n    for (int i = n - 1; i >= 0; i--) {\n        output[count[(arr[i] / exp) % 10] - 1] = arr[i];\n        count[(arr[i] / exp) % 10]--;\n    }\n    for (int i = 0; i < n; i++)\n        arr[i] = output[i];\n}\n\nvoid radixSort(vector<int>& arr) {\n    int maxEl = *max_element(arr.begin(), arr.end());\n    for (int exp = 1; maxEl / exp > 0; exp *= 10)\n        countingSortDigit(arr, exp);\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:stable,$O(d(n+k))$ 可在整數固定位數時達 $O(n)$。",
                "en": "Pro: stable, $O(d(n+k))$ — reduces to $O(n)$ for fixed-width integers."
              },
              {
                "zh": "優點:適合多鍵排序(先排次要鍵再排主要鍵)。",
                "en": "Pro: suitable for multi-key sorting (sort secondary key first, then primary)."
              },
              {
                "zh": "缺點:僅適用整數(或可位元化的資料);浮點數需特殊處理。",
                "en": "Con: only for integers (or bitwise-representable data); floats need special handling."
              },
              {
                "zh": "缺點:需 $O(n+k)$ 額外空間;$d$ 很大時(如長字串)效率下降。",
                "en": "Con: $O(n+k)$ extra space; efficiency drops when $d$ is large (e.g. long strings)."
              },
              {
                "zh": "適用:整數排序(如電話號碼、IP 位址、固定長度字串)。",
                "en": "Use for sorting integers (phone numbers, IP addresses, fixed-length strings)."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "LSD 逐位 stable Counting Sort;$O(d(n+k))$。",
                "en": "LSD digit-by-digit stable Counting Sort; $O(d(n+k))$."
              },
              {
                "zh": "stable;NOT in-place;輔助空間 $O(n+k)$。",
                "en": "stable; NOT in-place; $O(n+k)$ auxiliary space."
              },
              {
                "zh": "整數固定位數時可達 $O(n)$,是大規模整數排序的高效選擇。",
                "en": "Achieves $O(n)$ for fixed-width integers — a highly efficient choice for large-scale integer sorting."
              }
            ]
          }
        ]
      }
    ]
  },
  "sort-shaker": {
    "category": "Sorting",
    "title": {
      "zh": "搖晃排序法(雙向冒泡)",
      "en": "Shaker Sort (Cocktail Sort)"
    },
    "slides": [
      {
        "heading": {
          "zh": "搖晃排序法(雙向冒泡)",
          "en": "Shaker Sort (Cocktail Sort)"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "搖晃排序法(又稱雞尾酒排序)是 Bubble Sort 的雙向改良版:前向掃描將最大值移至右端,後向掃描將最小值移至左端,交替進行以縮短小元素移往左側所需的輪數。",
              "en": "Shaker Sort (Cocktail Sort) is a bidirectional Bubble Sort: a forward pass bubbles the largest element to the right, then a backward pass sinks the smallest element to the left, alternating to speed up migration of small elements toward the start."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "維護 `left` 與 `right` 兩個邊界。每輪前向掃描後 `right--`,後向掃描後 `left++`。若某方向掃描無交換則提前結束。",
              "en": "Maintain `left` and `right` boundaries. After each forward pass, `right--`; after each backward pass, `left++`. If either pass has no swaps, exit early."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "解決 Bubble Sort 的「turtle 問題」:小元素靠近末端時,單向冒泡需多輪才能移回頭部。",
                "en": "Solves Bubble Sort's \"turtle problem\": small elements near the end take many forward passes to reach the head."
              },
              {
                "zh": "stable:比較條件 `arr[i-1] > arr[i]` 嚴格大於,相等不交換。",
                "en": "stable: comparison `arr[i-1] > arr[i]` uses strict greater-than, equal elements are not swapped."
              },
              {
                "zh": "in-place:僅 $O(1)$ 額外空間。",
                "en": "in-place: only $O(1)$ auxiliary space."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "初始化 `left=0, right=n-1, swapped=false`。",
                "en": "Initialise `left=0, right=n-1, swapped=false`."
              },
              {
                "zh": "前向掃描 `i` 從 `left` 到 `right-1`:若 `arr[i]>arr[i+1]` 則交換;`right--`。",
                "en": "Forward scan `i` from `left` to `right-1`: swap if `arr[i]>arr[i+1]`; then `right--`."
              },
              {
                "zh": "若本輪無交換,跳出迴圈。",
                "en": "If no swap occurred in this direction, break."
              },
              {
                "zh": "後向掃描 `i` 從 `right` 到 `left+1`:若 `arr[i-1]>arr[i]` 則交換;`left++`。",
                "en": "Backward scan `i` from `right` to `left+1`: swap if `arr[i-1]>arr[i]`; then `left++`."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  A[\"[3,5,1,4,2]\\nleft=0 right=4\"] --> B[\"forward pass:\\n[3,1,4,2,5] right=3\"]\n  B --> C[\"backward pass:\\n[1,3,2,4,5] left=1\"]\n  C --> D[\"forward pass:\\n[1,2,3,4,5] right=2\"]\n  D --> E[\"no swap: done\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "雙向掃描示意",
          "en": "Bidirectional Scan Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 100\" width=\"380\" height=\"100\"><g font-family=\"sans-serif\" font-size=\"12\"><rect x=\"10\" y=\"30\" width=\"50\" height=\"28\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\"/><rect x=\"60\" y=\"30\" width=\"50\" height=\"28\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><rect x=\"110\" y=\"30\" width=\"50\" height=\"28\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><rect x=\"160\" y=\"30\" width=\"50\" height=\"28\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><rect x=\"210\" y=\"30\" width=\"50\" height=\"28\" fill=\"#fee2e2\" stroke=\"#dc2626\" stroke-width=\"2\"/><text x=\"35\" y=\"49\" text-anchor=\"middle\">1</text><text x=\"85\" y=\"49\" text-anchor=\"middle\">3</text><text x=\"135\" y=\"49\" text-anchor=\"middle\">2</text><text x=\"185\" y=\"49\" text-anchor=\"middle\">4</text><text x=\"235\" y=\"49\" text-anchor=\"middle\">5</text><text x=\"35\" y=\"22\" text-anchor=\"middle\" fill=\"#16a34a\">left</text><text x=\"235\" y=\"22\" text-anchor=\"middle\" fill=\"#dc2626\">right</text><path d=\"M 40 72 L 220 72\" stroke=\"#2563eb\" fill=\"none\" marker-end=\"url(#r)\" stroke-width=\"2\"/><path d=\"M 220 86 L 40 86\" stroke=\"#dc2626\" fill=\"none\" stroke-width=\"2\"/><text x=\"120\" y=\"70\" text-anchor=\"middle\" fill=\"#2563eb\" font-size=\"10\">→ forward</text><text x=\"120\" y=\"96\" text-anchor=\"middle\" fill=\"#dc2626\" font-size=\"10\">← backward</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "綠色為 left 邊界(最小已就位),紅色為 right 邊界(最大已就位)。每輪前向後兩個邊界各縮小一格,已就位元素不再參與掃描。",
              "en": "Green marks the left boundary (smallest settled), red marks the right boundary (largest settled). Both boundaries shrink by one after each pair of passes, excluding already-sorted elements."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "情況",
                "en": "Case"
              },
              {
                "zh": "時間複雜度",
                "en": "Time"
              },
              {
                "zh": "空間複雜度",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "最佳(已排序)",
                  "en": "Best (sorted)"
                },
                {
                  "zh": "$O(n)$",
                  "en": "$O(n)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "平均",
                  "en": "Average"
                },
                {
                  "zh": "$O(n^2)$",
                  "en": "$O(n^2)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "最壞(逆序)",
                  "en": "Worst (reverse)"
                },
                {
                  "zh": "$O(n^2)$",
                  "en": "$O(n^2)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "stable / in-place",
                  "en": "stable / in-place"
                },
                {
                  "zh": "是",
                  "en": "Yes"
                },
                {
                  "zh": "輔助空間 $O(1)$",
                  "en": "Auxiliary $O(1)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{best}}(n) = O(n),\\quad T_{\\text{avg/worst}}(n) = O(n^2)",
            "caption": {
              "zh": "雙向掃描對「大部分已排序但末端有小元素」的資料比 Bubble Sort 快一倍;但漸近複雜度仍為 $O(n^2)$。",
              "en": "Bidirectional scanning halves the number of passes for nearly-sorted data with small elements near the end, but the asymptotic complexity remains $O(n^2)$."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "void shakerSort(vector<int>& arr) {\n    int left = 0, right = (int)arr.size() - 1;\n    bool swapped;\n    while (left < right) {\n        // Forward pass: bubble largest to right\n        swapped = false;\n        for (int i = left; i < right; i++) {\n            if (arr[i] > arr[i + 1]) {\n                swap(arr[i], arr[i + 1]);\n                swapped = true;\n            }\n        }\n        right--;\n        if (!swapped)\n            break;\n        // Backward pass: sink smallest to left\n        swapped = false;\n        for (int i = right; i > left; i--) {\n            if (arr[i - 1] > arr[i]) {\n                swap(arr[i - 1], arr[i]);\n                swapped = true;\n            }\n        }\n        left++;\n        if (!swapped)\n            break;\n    }\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:stable、in-place;比 Bubble Sort 更快處理「末端有小元素」的情形。",
                "en": "Pro: stable, in-place; faster than Bubble Sort for arrays with small elements near the end."
              },
              {
                "zh": "優點:雙向掃描減少最壞情況下的輪數。",
                "en": "Pro: bidirectional scanning reduces the number of passes in many cases."
              },
              {
                "zh": "缺點:平均與最壞仍為 $O(n^2)$,大資料集無法與 Quick/Merge Sort 競爭。",
                "en": "Con: average and worst case remain $O(n^2)$; cannot compete with Quick/Merge Sort for large datasets."
              },
              {
                "zh": "適用:教學示範,或近乎有序且偶有小元素遠離正確位置的小型資料集。",
                "en": "Use for educational purposes or small nearly-sorted datasets where occasional small elements are far from their correct position."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "雙向冒泡:前向將最大值移右,後向將最小值移左。",
                "en": "Bidirectional bubble: forward moves the maximum right, backward moves the minimum left."
              },
              {
                "zh": "stable、in-place;最佳 $O(n)$,平均/最壞 $O(n^2)$。",
                "en": "stable, in-place; best $O(n)$, average/worst $O(n^2)$."
              },
              {
                "zh": "改善 Bubble Sort 的 turtle 問題,但漸近複雜度不變;適合教學與小型幾乎排序資料。",
                "en": "Mitigates Bubble Sort's turtle problem, but asymptotic complexity is unchanged; suited for teaching and small nearly-sorted inputs."
              }
            ]
          }
        ]
      }
    ]
  },
  "sort-merge": {
    "category": "Sorting",
    "title": {
      "zh": "合併排序法",
      "en": "Merge Sort"
    },
    "slides": [
      {
        "heading": {
          "zh": "合併排序法",
          "en": "Merge Sort"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "合併排序法採用 divide-and-conquer:將陣列遞迴對半分割至單元素,再將已排序的子陣列兩兩合併回去。所有情況均保證 $O(n \\log n)$,且為 stable。",
              "en": "Merge Sort uses divide-and-conquer: recursively split the array into halves until single elements, then merge sorted sub-arrays back up. Guarantees $O(n \\log n)$ in all cases and is stable."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "`mergeSort(arr, l, r)` 找到中點 `m = l + (r-l)/2`,遞迴排序 `[l,m]` 與 `[m+1,r]`,再呼叫 `merge` 將兩段合併。`merge` 建立臨時陣列 L、R,以雙指標逐一取較小值寫回原陣列。",
              "en": "`mergeSort(arr, l, r)` finds midpoint `m = l + (r-l)/2`, recursively sorts `[l,m]` and `[m+1,r]`, then calls `merge`. `merge` creates temporary arrays L and R, then uses two pointers to write the smaller element back one by one."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "合併時若 L[i] <= R[j],取 L[i],保證相等元素的相對順序不變(stable)。",
                "en": "During merge, taking L[i] when L[i] <= R[j] ensures equal elements keep their relative order (stable)."
              },
              {
                "zh": "NOT in-place:merge 需 $O(n)$ 臨時空間。",
                "en": "NOT in-place: merge requires $O(n)$ auxiliary space."
              },
              {
                "zh": "遞迴深度 $O(\\log n)$,每層合併共 $O(n)$,總計 $O(n \\log n)$。",
                "en": "Recursion depth is $O(\\log n)$; each level merges $O(n)$ total, giving $O(n \\log n)$ overall."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "若 `l >= r` 則回傳(基底情況:單一元素)。",
                "en": "If `l >= r`, return (base case: single element)."
              },
              {
                "zh": "計算 `m = l + (r-l)/2`,遞迴呼叫 `mergeSort(arr, l, m)` 與 `mergeSort(arr, m+1, r)`。",
                "en": "Compute `m = l + (r-l)/2`, recurse `mergeSort(arr, l, m)` and `mergeSort(arr, m+1, r)`."
              },
              {
                "zh": "呼叫 `merge(arr, l, m, r)`:建立 L、R 副本,雙指標合併至 `arr[l..r]`。",
                "en": "Call `merge(arr, l, m, r)`: copy into L and R, use two pointers to merge back into `arr[l..r]`."
              },
              {
                "zh": "剩餘未合併元素直接貼回。",
                "en": "Copy any remaining elements of L or R back."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart TD\n  A[\"[12,11,13,5,6,7]\"] --> B[\"[12,11,13]\"]\n  A --> C[\"[5,6,7]\"]\n  B --> D[\"[12,11]\"]\n  B --> E[\"[13]\"]\n  D --> F[\"[12]\"]\n  D --> G[\"[11]\"]\n  F --> H[\"merge: [11,12]\"]\n  G --> H\n  H --> I[\"merge: [11,12,13]\"]\n  E --> I\n  C --> J[\"merge: [5,6,7]\"]\n  I --> K[\"merge: [5,6,7,11,12,13]\"]\n  J --> K"
          }
        ]
      },
      {
        "heading": {
          "zh": "合併示意",
          "en": "Merge Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 100\" width=\"380\" height=\"100\"><g font-family=\"sans-serif\" font-size=\"12\"><text x=\"10\" y=\"20\" fill=\"#64748b\">L: sorted</text><rect x=\"10\" y=\"28\" width=\"45\" height=\"26\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><rect x=\"55\" y=\"28\" width=\"45\" height=\"26\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><rect x=\"100\" y=\"28\" width=\"45\" height=\"26\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"32\" y=\"46\" text-anchor=\"middle\">5</text><text x=\"77\" y=\"46\" text-anchor=\"middle\">11</text><text x=\"122\" y=\"46\" text-anchor=\"middle\">13</text><text x=\"200\" y=\"20\" fill=\"#64748b\">R: sorted</text><rect x=\"200\" y=\"28\" width=\"45\" height=\"26\" fill=\"#dcfce7\" stroke=\"#16a34a\"/><rect x=\"245\" y=\"28\" width=\"45\" height=\"26\" fill=\"#dcfce7\" stroke=\"#16a34a\"/><rect x=\"290\" y=\"28\" width=\"45\" height=\"26\" fill=\"#dcfce7\" stroke=\"#16a34a\"/><text x=\"222\" y=\"46\" text-anchor=\"middle\">6</text><text x=\"267\" y=\"46\" text-anchor=\"middle\">7</text><text x=\"312\" y=\"46\" text-anchor=\"middle\">12</text><text x=\"190\" y=\"80\" fill=\"#64748b\">merged:</text><text x=\"240\" y=\"80\" fill=\"#374151\">5, 6, 7, 11, 12, 13</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "雙指標分別指向 L 與 R 的頭部;每次取較小者寫入結果,保證 stable(相等取 L 中元素優先)。",
              "en": "Two pointers start at the head of L and R; always take the smaller element into the result, preserving stability (L wins ties)."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "情況",
                "en": "Case"
              },
              {
                "zh": "時間複雜度",
                "en": "Time"
              },
              {
                "zh": "空間複雜度",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "最佳",
                  "en": "Best"
                },
                {
                  "zh": "$O(n \\log n)$",
                  "en": "$O(n \\log n)$"
                },
                {
                  "zh": "$O(n)$",
                  "en": "$O(n)$"
                }
              ],
              [
                {
                  "zh": "平均",
                  "en": "Average"
                },
                {
                  "zh": "$O(n \\log n)$",
                  "en": "$O(n \\log n)$"
                },
                {
                  "zh": "$O(n)$",
                  "en": "$O(n)$"
                }
              ],
              [
                {
                  "zh": "最壞",
                  "en": "Worst"
                },
                {
                  "zh": "$O(n \\log n)$",
                  "en": "$O(n \\log n)$"
                },
                {
                  "zh": "$O(n)$",
                  "en": "$O(n)$"
                }
              ],
              [
                {
                  "zh": "stable / NOT in-place",
                  "en": "stable / NOT in-place"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "輔助空間 $O(n)$",
                  "en": "Auxiliary $O(n)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T(n) = 2T\\!\\left(\\frac{n}{2}\\right) + O(n) = O(n \\log n)",
            "caption": {
              "zh": "遞迴樹深度 $\\log n$;每層合併需 $O(n)$;由主定理得 $T(n) = O(n \\log n)$,三種情況完全相同。",
              "en": "Recursion tree has depth $\\log n$; each level merges $O(n)$; by master theorem $T(n) = O(n \\log n)$ in all cases."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "void merge(int arr[], int l, int m, int r) {\n    int n1 = m - l + 1, n2 = r - m;\n    int L[n1], R[n2];\n    for (int i = 0; i < n1; i++)\n        L[i] = arr[l + i];\n    for (int j = 0; j < n2; j++)\n        R[j] = arr[m + 1 + j];\n    int i = 0, j = 0, k = l;\n    while (i < n1 && j < n2) {\n        if (L[i] <= R[j])\n            arr[k++] = L[i++];\n        else\n            arr[k++] = R[j++];\n    }\n    while (i < n1)\n        arr[k++] = L[i++];\n    while (j < n2)\n        arr[k++] = R[j++];\n}\n\nvoid mergeSort(int arr[], int l, int r) {\n    if (l >= r)\n        return;\n    int m = l + (r - l) / 2;\n    mergeSort(arr, l, m);\n    mergeSort(arr, m + 1, r);\n    merge(arr, l, m, r);\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:stable,$O(n \\log n)$ 三種情況皆一致,無最壞情況退化。",
                "en": "Pro: stable, $O(n \\log n)$ in all cases — no worst-case degradation."
              },
              {
                "zh": "優點:適合鏈結串列排序(merge 操作不需隨機存取)。",
                "en": "Pro: ideal for linked-list sorting (merge does not require random access)."
              },
              {
                "zh": "優點:適合外部排序(External Sort):可分批讀取磁碟區塊合併。",
                "en": "Pro: suitable for external sort: can read and merge disk blocks in batches."
              },
              {
                "zh": "缺點:需 $O(n)$ 額外空間,記憶體開銷大於 Quick Sort。",
                "en": "Con: requires $O(n)$ auxiliary space — more memory overhead than Quick Sort."
              },
              {
                "zh": "適用:需要 stable 排序、鏈結串列排序、外部排序,或對最壞情況有嚴格保證需求。",
                "en": "Use when stability is required, for linked-list sorting, external sort, or when worst-case guarantees are critical."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "divide-and-conquer:遞迴分割 + 線性合併。",
                "en": "divide-and-conquer: recursive split + linear merge."
              },
              {
                "zh": "stable;所有情況 $O(n \\log n)$;輔助空間 $O(n)$。",
                "en": "stable; $O(n \\log n)$ always; $O(n)$ auxiliary space."
              },
              {
                "zh": "外部排序與鏈結串列排序的首選演算法。",
                "en": "The go-to algorithm for external sorting and linked-list sorting."
              }
            ]
          }
        ]
      }
    ]
  },
  "sort-heap": {
    "category": "Sorting",
    "title": {
      "zh": "堆積排序法",
      "en": "Heap Sort"
    },
    "slides": [
      {
        "heading": {
          "zh": "堆積排序法",
          "en": "Heap Sort"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "堆積排序法利用 max-heap 資料結構進行排序:先以 $O(n)$ 建立 max-heap,再反覆將堆頂(最大值)交換至陣列末端並對縮減後的堆執行 sift-down(heapify),逐步將元素置入最終位置。所有情況均保證 $O(n \\log n)$,且為 in-place。",
              "en": "Heap Sort exploits the max-heap data structure: first build a max-heap in $O(n)$, then repeatedly swap the root (maximum) to the end of the array and sift-down the reduced heap. All cases guarantee $O(n \\log n)$ and the algorithm is in-place."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "`heapify(arr, n, i)` 以 sift-down 方式維護以節點 `i` 為根的子堆積:找出 `i`、左子 `2i+1`、右子 `2i+2` 中的最大值索引 `largest`;若 `largest != i` 則交換並遞迴 heapify 受影響的子樹。`heapSort` 分兩階段:①從 `n/2-1` 到 `0` 逐節點呼叫 heapify 建立 max-heap;②每次將 `arr[0]`(堆頂)與 `arr[i]` 交換後縮小堆並重新 heapify。",
              "en": "`heapify(arr, n, i)` restores the max-heap property rooted at `i` by sift-down: find the largest among `i`, left child `2i+1`, and right child `2i+2`; if `largest != i`, swap and recursively heapify the affected subtree. `heapSort` runs in two phases: ① build max-heap by calling heapify from `n/2-1` down to `0`; ② repeatedly swap `arr[0]` (heap root) with `arr[i]`, shrink the heap, and heapify the root."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "Build-heap 階段:從最後一個非葉節點(索引 `n/2-1`)往上對每個節點呼叫 heapify,總時間 $O(n)$。",
                "en": "Build-heap phase: call heapify on every node from the last non-leaf (`n/2-1`) up to the root — total time $O(n)$."
              },
              {
                "zh": "每次 sift-down 沿樹高下降,時間 $O(\\log n)$;共 $n-1$ 次提取,總計 $O(n \\log n)$。",
                "en": "Each sift-down descends the tree height, $O(\\log n)$; $n-1$ extractions give $O(n \\log n)$ total."
              },
              {
                "zh": "NOT stable:將堆頂交換至末端時可能改變相等元素的相對順序。",
                "en": "NOT stable: swapping the root to the end can change the relative order of equal elements."
              },
              {
                "zh": "in-place:遞迴 heapify 棧深度為 $O(\\log n)$(迭代實作可達真正的 $O(1)$)。",
                "en": "in-place: recursion stack uses $O(\\log n)$ (an iterative heapify would achieve true $O(1)$)."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "以 `for i = n/2-1 downto 0` 呼叫 `heapify(arr, n, i)`,將陣列整理成 max-heap。",
                "en": "Call `heapify(arr, n, i)` for `i` from `n/2-1` down to `0` to build a max-heap."
              },
              {
                "zh": "交換 `arr[0]`(最大值)與 `arr[i]`(當前末端),堆大小縮減為 `i`。",
                "en": "Swap `arr[0]` (maximum) with `arr[i]` (current end); reduce heap size to `i`."
              },
              {
                "zh": "對根節點呼叫 `heapify(arr, i, 0)`,恢復 max-heap 性質。",
                "en": "Call `heapify(arr, i, 0)` to restore the max-heap property at the root."
              },
              {
                "zh": "重複步驟 2–3 直至堆大小為 1,陣列即為升序排列。",
                "en": "Repeat steps 2–3 until the heap size reaches 1; the array is then in ascending order."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart TD\n  A[\"build max-heap\\n[13,11,12,5,6,7]\"] --> B[\"swap root to end\\n[7,11,12,5,6,|13]\"]\n  B --> C[\"heapify root\\n[12,11,7,5,6,|13]\"]\n  C --> D[\"swap root to end\\n[6,11,7,5,|12,13]\"]\n  D --> E[\"heapify root\\n[11,6,7,5,|12,13]\"]\n  E --> F[\"repeat until\\nheap size=1\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "Heap 結構示意",
          "en": "Heap Structure Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 140\" width=\"360\" height=\"140\"><g font-family=\"sans-serif\" font-size=\"12\"><text x=\"10\" y=\"16\" fill=\"#64748b\" font-size=\"11\">max-heap after build-heap: [13, 11, 12, 5, 6, 7]</text><circle cx=\"180\" cy=\"42\" r=\"18\" fill=\"#fef9c3\" stroke=\"#ca8a04\" stroke-width=\"2\"/><text x=\"180\" y=\"47\" text-anchor=\"middle\" font-weight=\"bold\">13</text><circle cx=\"100\" cy=\"88\" r=\"18\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"100\" y=\"93\" text-anchor=\"middle\">11</text><circle cx=\"260\" cy=\"88\" r=\"18\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"260\" y=\"93\" text-anchor=\"middle\">12</text><circle cx=\"55\" cy=\"128\" r=\"15\" fill=\"#f1f5f9\" stroke=\"#94a3b8\"/><text x=\"55\" y=\"133\" text-anchor=\"middle\">5</text><circle cx=\"140\" cy=\"128\" r=\"15\" fill=\"#f1f5f9\" stroke=\"#94a3b8\"/><text x=\"140\" y=\"133\" text-anchor=\"middle\">6</text><circle cx=\"220\" cy=\"128\" r=\"15\" fill=\"#f1f5f9\" stroke=\"#94a3b8\"/><text x=\"220\" y=\"133\" text-anchor=\"middle\">7</text><line x1=\"165\" y1=\"56\" x2=\"115\" y2=\"74\" stroke=\"#64748b\"/><line x1=\"195\" y1=\"56\" x2=\"245\" y2=\"74\" stroke=\"#64748b\"/><line x1=\"87\" y1=\"102\" x2=\"65\" y2=\"115\" stroke=\"#94a3b8\"/><line x1=\"113\" y1=\"102\" x2=\"130\" y2=\"115\" stroke=\"#94a3b8\"/><line x1=\"252\" y1=\"102\" x2=\"230\" y2=\"115\" stroke=\"#94a3b8\"/><text x=\"10\" y=\"118\" fill=\"#64748b\" font-size=\"10\">arr: [13,  11,  12,   5,   6,   7]</text><text x=\"10\" y=\"130\" fill=\"#94a3b8\" font-size=\"10\">idx:  [0]   [1]   [2]  [3]  [4]  [5]</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "黃色節點為堆頂(最大值 13),藍色為第二層。父節點 `i` 的左子為 `arr[2i+1]`,右子為 `arr[2i+2]`。節點 12(idx 2)只有左子 7(idx 5),無右子。每個父節點均大於等於其子節點,滿足 max-heap 性質。",
              "en": "Yellow node is the heap root (max value 13); blue nodes are the second level. Parent `i` has left child `arr[2i+1]` and right child `arr[2i+2]`. Node 12 (idx 2) has only a left child 7 (idx 5) — no right child. Every parent is >= its children, satisfying the max-heap property."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "情況",
                "en": "Case"
              },
              {
                "zh": "時間複雜度",
                "en": "Time"
              },
              {
                "zh": "空間複雜度",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "最佳",
                  "en": "Best"
                },
                {
                  "zh": "$O(n \\log n)$",
                  "en": "$O(n \\log n)$"
                },
                {
                  "zh": "$O(\\log n)$",
                  "en": "$O(\\log n)$"
                }
              ],
              [
                {
                  "zh": "平均",
                  "en": "Average"
                },
                {
                  "zh": "$O(n \\log n)$",
                  "en": "$O(n \\log n)$"
                },
                {
                  "zh": "$O(\\log n)$",
                  "en": "$O(\\log n)$"
                }
              ],
              [
                {
                  "zh": "最壞",
                  "en": "Worst"
                },
                {
                  "zh": "$O(n \\log n)$",
                  "en": "$O(n \\log n)$"
                },
                {
                  "zh": "$O(\\log n)$",
                  "en": "$O(\\log n)$"
                }
              ],
              [
                {
                  "zh": "NOT stable / in-place",
                  "en": "NOT stable / in-place"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "輔助 $O(\\log n)$",
                  "en": "Aux $O(\\log n)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T(n) = \\underbrace{O(n)}_{\\text{build-heap}} + \\underbrace{(n-1) \\cdot O(\\log n)}_{\\text{sift-down extractions}} = O(n \\log n)",
            "caption": {
              "zh": "Build-heap 利用下界累加可證明為 $O(n)$(非直覺的 $O(n \\log n)$)。之後 $n-1$ 次提取各需 $O(\\log n)$ sift-down,三種情況複雜度完全相同。",
              "en": "Build-heap is $O(n)$ (proved by summing lower-level work — counterintuitively not $O(n \\log n)$). The $n-1$ extractions each need $O(\\log n)$ sift-down; complexity is identical in all three cases."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "// Sift-down: restore max-heap rooted at index i, heap size n\nvoid heapify(vector<int>& arr, int n, int i) {\n    int largest = i;\n    int left = 2 * i + 1;\n    int right = 2 * i + 2;\n    if (left < n && arr[left] > arr[largest])\n        largest = left;\n    if (right < n && arr[right] > arr[largest])\n        largest = right;\n    if (largest != i) {\n        swap(arr[i], arr[largest]);\n        heapify(arr, n, largest); // recurse on affected subtree\n    }\n}\n\nvoid heapSort(vector<int>& arr) {\n    int n = arr.size();\n    // Phase 1: build max-heap in O(n)\n    for (int i = n / 2 - 1; i >= 0; i--)\n        heapify(arr, n, i);\n    // Phase 2: extract max one by one\n    for (int i = n - 1; i > 0; i--) {\n        swap(arr[0], arr[i]); // move current max to sorted end\n        heapify(arr, i, 0);   // restore heap on reduced range\n    }\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:所有情況 $O(n \\log n)$,無最壞情況退化(優於 Quick Sort)。",
                "en": "Pro: $O(n \\log n)$ in all cases — no worst-case degradation (unlike Quick Sort)."
              },
              {
                "zh": "優點:in-place,$O(\\log n)$ 遞迴棧空間(優於 Merge Sort 的 $O(n)$)。",
                "en": "Pro: in-place, $O(\\log n)$ recursion stack (better than Merge Sort's $O(n)$ auxiliary space)."
              },
              {
                "zh": "優點:build-heap 僅需 $O(n)$,適合只需取 top-k 元素的場景。",
                "en": "Pro: build-heap costs only $O(n)$; excellent for top-k extraction use cases."
              },
              {
                "zh": "缺點:NOT stable,相等元素的相對順序無法保證。",
                "en": "Con: NOT stable — relative order of equal elements is not preserved."
              },
              {
                "zh": "缺點:快取效能差:sift-down 的記憶體存取模式不連續,常數因子大於 Quick Sort。",
                "en": "Con: poor cache performance — sift-down accesses memory non-sequentially; larger constant factor than Quick Sort."
              },
              {
                "zh": "適用:需要嚴格最壞 $O(n \\log n)$ 且記憶體受限的場景;C++ `std::sort` 的 Introsort 在遞迴深度超限時切換至 Heap Sort。",
                "en": "Use when strict $O(n \\log n)$ worst-case is required with limited memory; C++ `std::sort` (Introsort) falls back to Heap Sort when recursion depth exceeds a threshold."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "Build max-heap $O(n)$ + 反覆提取堆頂 $O(n \\log n)$ = 總計 $O(n \\log n)$。",
                "en": "Build max-heap $O(n)$ + repeated root extraction $O(n \\log n)$ = total $O(n \\log n)$."
              },
              {
                "zh": "NOT stable;in-place $O(\\log n)$ 遞迴棧空間;三種情況複雜度完全相同。",
                "en": "NOT stable; in-place $O(\\log n)$ recursion stack; identical complexity in all three cases."
              },
              {
                "zh": "Introsort(C++ `std::sort`)在 Quick Sort 退化時切換至 Heap Sort,結合兩者優點。",
                "en": "Introsort (C++ `std::sort`) switches to Heap Sort when Quick Sort would degrade, combining the best of both."
              }
            ]
          }
        ]
      }
    ]
  },
  "search-linear": {
    "category": "Searching & String Matching",
    "title": {
      "zh": "線性搜尋",
      "en": "Linear Search"
    },
    "slides": [
      {
        "heading": {
          "zh": "線性搜尋",
          "en": "Linear Search"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "線性搜尋從陣列的第一個元素開始,逐一比對每個元素,直到找到目標值或掃描完整個陣列為止;適用於任何未排序或已排序的資料集。",
              "en": "Linear Search scans each element of an array from index 0 in sequence, comparing each to the target until a match is found or the entire array is exhausted — works on any data, sorted or unsorted."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "演算法以單一迴圈由左至右逐格比對,無需陣列預先排序。找到目標則立即回傳其索引;若掃描完成後仍未找到則回傳 `-1`。",
              "en": "A single loop compares each element to the target from left to right — no pre-sorting required. The index is returned immediately on a match; `-1` is returned if the full array is scanned without finding the target."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "可應用於未排序資料:不要求陣列有任何順序。",
                "en": "Works on unsorted data: the array needs no particular order."
              },
              {
                "zh": "最佳情況:目標在索引 0,$O(1)$。",
                "en": "Best case: target is at index 0, $O(1)$."
              },
              {
                "zh": "最壞情況:目標在最後或不存在,$O(n)$。",
                "en": "Worst case: target is last or absent, $O(n)$."
              },
              {
                "zh": "in-place:僅使用迴圈計數器,空間需求為 $O(1)$。",
                "en": "in-place: only a loop counter is used — $O(1)$ auxiliary space."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "設定索引 `i = 0`。",
                "en": "Initialise index `i = 0`."
              },
              {
                "zh": "若 `i >= size`,表示未找到,回傳 `-1`。",
                "en": "If `i >= size`, the target is not present — return `-1`."
              },
              {
                "zh": "比對 `arr[i] == target`:若相等則回傳 `i`。",
                "en": "Compare `arr[i] == target`: if equal, return `i`."
              },
              {
                "zh": "令 `i++`,返回步驟 2 繼續掃描。",
                "en": "Increment `i++` and go back to step 2 to continue scanning."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  A[\"i=0\\narr=[23,12,56,8,38]\\ntarget=38\"] --> B[\"arr[0]=23 != 38\\ni++\"]\n  B --> C[\"arr[1]=12 != 38\\ni++\"]\n  C --> D[\"arr[2]=56 != 38\\ni++\"]\n  D --> E[\"arr[3]=8 != 38\\ni++\"]\n  E --> F[\"arr[4]=38 == 38\\nreturn 4\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "掃描示意",
          "en": "Scan Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 270 90\" width=\"270\" height=\"90\"><g font-family=\"sans-serif\" font-size=\"13\"><rect x=\"10\" y=\"28\" width=\"50\" height=\"30\" fill=\"#fee2e2\" stroke=\"#dc2626\"/><rect x=\"60\" y=\"28\" width=\"50\" height=\"30\" fill=\"#fee2e2\" stroke=\"#dc2626\"/><rect x=\"110\" y=\"28\" width=\"50\" height=\"30\" fill=\"#fee2e2\" stroke=\"#dc2626\"/><rect x=\"160\" y=\"28\" width=\"50\" height=\"30\" fill=\"#fee2e2\" stroke=\"#dc2626\"/><rect x=\"210\" y=\"28\" width=\"50\" height=\"30\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\"/><text x=\"35\" y=\"48\" text-anchor=\"middle\">23</text><text x=\"85\" y=\"48\" text-anchor=\"middle\">12</text><text x=\"135\" y=\"48\" text-anchor=\"middle\">56</text><text x=\"185\" y=\"48\" text-anchor=\"middle\">8</text><text x=\"235\" y=\"48\" text-anchor=\"middle\" fill=\"#15803d\">38</text><text x=\"35\" y=\"22\" text-anchor=\"middle\" fill=\"#64748b\">[0]</text><text x=\"85\" y=\"22\" text-anchor=\"middle\" fill=\"#64748b\">[1]</text><text x=\"135\" y=\"22\" text-anchor=\"middle\" fill=\"#64748b\">[2]</text><text x=\"185\" y=\"22\" text-anchor=\"middle\" fill=\"#64748b\">[3]</text><text x=\"235\" y=\"22\" text-anchor=\"middle\" fill=\"#16a34a\">[4]</text><text x=\"135\" y=\"76\" text-anchor=\"middle\" fill=\"#16a34a\">found target=38</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "陣列為 [23, 12, 56, 8, 38],共 5 個元素。紅色格為已掃描但不符的元素,綠色格為找到目標 38 的位置(索引 4)。",
              "en": "Array is [23, 12, 56, 8, 38] with 5 elements. Red cells are scanned non-matching elements; the green cell is where target 38 was found (index 4)."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "情況",
                "en": "Case"
              },
              {
                "zh": "時間",
                "en": "Time"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "最佳(目標在首位)",
                  "en": "Best (target at index 0)"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "平均",
                  "en": "Average"
                },
                {
                  "zh": "$O(n)$",
                  "en": "$O(n)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "最壞(目標在末位或不存在)",
                  "en": "Worst (target last or absent)"
                },
                {
                  "zh": "$O(n)$",
                  "en": "$O(n)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "空間合計",
                  "en": "Total Space"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{search}}(n) = O(n)",
            "caption": {
              "zh": "平均需比對 $n/2$ 個元素;最壞情況需比對全部 $n$ 個元素。",
              "en": "On average $n/2$ comparisons are made; in the worst case all $n$ elements are compared."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "int linearSearch(int arr[], int size, int target) {\n    for (int i = 0; i < size; i++) {\n        if (arr[i] == target) {\n            return i; // Found at index i\n        }\n    }\n    return -1; // Not found\n}\n\nint main() {\n    int arr[] = {23, 12, 56, 8, 38, 2, 72, 91, 16, 5};\n    int size = sizeof(arr) / sizeof(arr[0]);\n    int target = 38;\n\n    int result = linearSearch(arr, size, target);\n\n    if (result != -1)\n        cout << \"Element \" << target << \" found at index \" << result << endl;\n    else\n        cout << \"Element \" << target << \" not found.\" << endl;\n    return 0;\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:不要求資料排序,可直接應用於任意陣列或串列。",
                "en": "Pro: no sorting prerequisite — applies directly to any array or list."
              },
              {
                "zh": "優點:實作極為簡單,幾乎無額外空間開銷。",
                "en": "Pro: extremely simple to implement with virtually no extra space overhead."
              },
              {
                "zh": "缺點:時間複雜度 $O(n)$,對大型資料集效率低落。",
                "en": "Con: $O(n)$ time complexity — inefficient for large datasets."
              },
              {
                "zh": "適用:資料量小(n ≤ 數百)、資料未排序、或只需搜尋一次的場景。",
                "en": "Use when n is small (a few hundred), data is unsorted, or the array is searched only once."
              },
              {
                "zh": "不適用:需對大型已排序陣列反覆搜尋時,應改用 Binary Search。",
                "en": "Avoid for repeated searches on large sorted arrays — use Binary Search instead."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "從索引 0 逐一比對,無需預先排序。",
                "en": "Scans element-by-element from index 0 — no pre-sorting needed."
              },
              {
                "zh": "最佳 $O(1)$、平均與最壞 $O(n)$;額外空間 $O(1)$。",
                "en": "Best $O(1)$, average and worst $O(n)$; auxiliary space $O(1)$."
              },
              {
                "zh": "簡單可靠,適合小規模或單次搜尋;大規模已排序資料請改用 Binary Search。",
                "en": "Simple and reliable for small or one-off searches; switch to Binary Search for large sorted data."
              }
            ]
          }
        ]
      }
    ]
  },
  "search-binary": {
    "category": "Searching & String Matching",
    "title": {
      "zh": "二元搜尋",
      "en": "Binary Search"
    },
    "slides": [
      {
        "heading": {
          "zh": "二元搜尋",
          "en": "Binary Search"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "二元搜尋在**已排序**陣列上以 divide-and-conquer 策略每次排除一半的搜尋範圍,時間複雜度為 $O(\\log n)$;必要前提:陣列必須已排序。",
              "en": "Binary Search applies a divide-and-conquer strategy on a **sorted** array, halving the search range at each step to achieve $O(\\log n)$ time — the required precondition is that the array must be sorted."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "維護 `left`(左邊界)和 `right`(右邊界)兩個指標。每次計算中間位置 `mid = left + (right - left) / 2`,與目標比較後將搜尋範圍縮減為左半或右半。",
              "en": "Two pointers `left` and `right` define the current search range. Each iteration computes `mid = left + (right - left) / 2` and narrows the range to either the left or right half depending on the comparison result."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "前提條件:陣列必須已排序(升序),否則結果不可靠。",
                "en": "Precondition: the array MUST be sorted (ascending order); results are unreliable on unsorted data."
              },
              {
                "zh": "若 `arr[mid] == target`,立即回傳 `mid`。",
                "en": "If `arr[mid] == target`, return `mid` immediately."
              },
              {
                "zh": "若 `arr[mid] < target`,目標在右半,令 `left = mid + 1`。",
                "en": "If `arr[mid] < target`, the target is in the right half — set `left = mid + 1`."
              },
              {
                "zh": "若 `arr[mid] > target`,目標在左半,令 `right = mid - 1`。",
                "en": "If `arr[mid] > target`, the target is in the left half — set `right = mid - 1`."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "確認陣列已排序,初始化 `left=0`, `right=size-1`。",
                "en": "Confirm array is sorted; initialise `left=0`, `right=size-1`."
              },
              {
                "zh": "迴圈條件:`left <= right`。",
                "en": "Loop condition: `left <= right`."
              },
              {
                "zh": "計算 `mid = left + (right - left) / 2`,與 `target` 比較。",
                "en": "Compute `mid = left + (right - left) / 2` and compare to `target`."
              },
              {
                "zh": "依比較結果更新 `left` 或 `right`;若相等則回傳 `mid`。",
                "en": "Update `left` or `right` based on the comparison; return `mid` on equality."
              },
              {
                "zh": "迴圈結束後仍未找到,回傳 `-1`。",
                "en": "If the loop ends without a match, return `-1`."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  A[\"arr sorted\\nleft=0 right=9\\ntarget=56\"] --> B[\"mid=4 arr[4]=16\\n16 < 56 left=5\"]\n  B --> C[\"mid=7 arr[7]=56\\n56 == 56 return 7\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "指標縮減示意",
          "en": "Pointer Narrowing Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 420 110\" width=\"420\" height=\"110\"><g font-family=\"sans-serif\" font-size=\"12\"><rect x=\"10\" y=\"40\" width=\"38\" height=\"28\" fill=\"#f1f5f9\" stroke=\"#94a3b8\"/><rect x=\"48\" y=\"40\" width=\"38\" height=\"28\" fill=\"#f1f5f9\" stroke=\"#94a3b8\"/><rect x=\"86\" y=\"40\" width=\"38\" height=\"28\" fill=\"#f1f5f9\" stroke=\"#94a3b8\"/><rect x=\"124\" y=\"40\" width=\"38\" height=\"28\" fill=\"#f1f5f9\" stroke=\"#94a3b8\"/><rect x=\"162\" y=\"40\" width=\"38\" height=\"28\" fill=\"#fee2e2\" stroke=\"#dc2626\"/><rect x=\"200\" y=\"40\" width=\"38\" height=\"28\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><rect x=\"238\" y=\"40\" width=\"38\" height=\"28\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><rect x=\"276\" y=\"40\" width=\"38\" height=\"28\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"2\"/><rect x=\"314\" y=\"40\" width=\"38\" height=\"28\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><rect x=\"352\" y=\"40\" width=\"38\" height=\"28\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"29\" y=\"58\" text-anchor=\"middle\" font-size=\"11\">2</text><text x=\"67\" y=\"58\" text-anchor=\"middle\" font-size=\"11\">5</text><text x=\"105\" y=\"58\" text-anchor=\"middle\" font-size=\"11\">8</text><text x=\"143\" y=\"58\" text-anchor=\"middle\" font-size=\"11\">12</text><text x=\"181\" y=\"58\" text-anchor=\"middle\" font-size=\"11\" fill=\"#dc2626\">16</text><text x=\"219\" y=\"58\" text-anchor=\"middle\" font-size=\"11\">23</text><text x=\"257\" y=\"58\" text-anchor=\"middle\" font-size=\"11\">38</text><text x=\"295\" y=\"58\" text-anchor=\"middle\" font-size=\"11\" fill=\"#15803d\">56</text><text x=\"333\" y=\"58\" text-anchor=\"middle\" font-size=\"11\">72</text><text x=\"371\" y=\"58\" text-anchor=\"middle\" font-size=\"11\">91</text><text x=\"29\" y=\"34\" text-anchor=\"middle\" fill=\"#2563eb\" font-size=\"11\">L</text><text x=\"371\" y=\"34\" text-anchor=\"middle\" fill=\"#2563eb\" font-size=\"11\">R</text><text x=\"181\" y=\"34\" text-anchor=\"middle\" fill=\"#dc2626\" font-size=\"11\">mid1</text><text x=\"295\" y=\"34\" text-anchor=\"middle\" fill=\"#16a34a\" font-size=\"11\">mid2</text><text x=\"215\" y=\"100\" text-anchor=\"middle\" fill=\"#64748b\" font-size=\"11\">Round 1: mid=4(16) &lt; 56, L=5 → Round 2: mid=7(56) found</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "第一輪 mid=4(值16),因 16 < 56 將 `left` 移至 5。第二輪 mid=7(值56),命中目標。灰色格已被排除,紅色格為上一輪比較後被排除的中點 (mid),藍色格為當前搜尋範圍,綠色格為找到目標。",
              "en": "Round 1: mid=4 (value 16); since 16 < 56 set `left=5`. Round 2: mid=7 (value 56) — target found. Grey cells are eliminated, the red cell is the midpoint compared and discarded in the previous round, blue cells form the current search range, green cell is the match."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "情況",
                "en": "Case"
              },
              {
                "zh": "時間",
                "en": "Time"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "最佳(目標在中點)",
                  "en": "Best (target at mid)"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "平均",
                  "en": "Average"
                },
                {
                  "zh": "$O(\\log n)$",
                  "en": "$O(\\log n)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "最壞",
                  "en": "Worst"
                },
                {
                  "zh": "$O(\\log n)$",
                  "en": "$O(\\log n)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "空間合計",
                  "en": "Total Space"
                },
                {
                  "zh": "—",
                  "en": "—"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{search}}(n) = O(\\log n)",
            "caption": {
              "zh": "每次迭代將搜尋範圍減半;$n=10^6$ 時最多僅需 20 次比對。",
              "en": "Each iteration halves the search range; for $n=10^6$ at most 20 comparisons are needed."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "int binarySearch(int arr[], int left, int right, int target) {\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n\n        if (arr[mid] == target)\n            return mid;\n\n        if (arr[mid] < target)\n            left = mid + 1;\n        else\n            right = mid - 1;\n    }\n\n    return -1; // Not found\n}\n\nint main() {\n    // Array must be sorted for Binary Search\n    int arr[] = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};\n    int size = sizeof(arr) / sizeof(arr[0]);\n    int target = 56;\n\n    int result = binarySearch(arr, 0, size - 1, target);\n\n    if (result != -1)\n        cout << \"Element \" << target << \" found at index \" << result << endl;\n    return 0;\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:$O(\\log n)$ 時間複雜度,對大型陣列遠優於線性搜尋。",
                "en": "Pro: $O(\\log n)$ time — vastly faster than linear search on large arrays."
              },
              {
                "zh": "優點:in-place 實作(iterative),僅需 $O(1)$ 額外空間。",
                "en": "Pro: in-place iterative implementation uses only $O(1)$ auxiliary space."
              },
              {
                "zh": "缺點(關鍵前提):陣列必須已排序;若資料無序需先排序,成本為 $O(n \\log n)$。",
                "en": "Con (critical precondition): array MUST be sorted first — sorting costs $O(n \\log n)$ if not already done."
              },
              {
                "zh": "缺點:不適用於鏈結串列(無法 $O(1)$ 隨機存取中間元素)。",
                "en": "Con: does not apply to linked lists (no $O(1)$ random access to the middle element)."
              },
              {
                "zh": "適用:靜態或不常更動的已排序陣列,如字典查找、資料庫索引範圍查詢。",
                "en": "Use for static or infrequently modified sorted arrays, e.g. dictionary lookups, database index range queries."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "必要前提:陣列必須已排序。違反此前提將導致錯誤結果。",
                "en": "Critical precondition: the array MUST be sorted. Violating this produces incorrect results."
              },
              {
                "zh": "每輪排除一半範圍,最壞情況僅需 $O(\\log n)$ 次比對。",
                "en": "Each iteration eliminates half the range; worst case is only $O(\\log n)$ comparisons."
              },
              {
                "zh": "與線性搜尋相比:$n=10^6$ 時 Binary Search 約需 20 次,Linear Search 需最多 $10^6$ 次。",
                "en": "Versus linear search: for $n=10^6$, Binary Search needs ~20 comparisons vs up to $10^6$ for Linear Search."
              }
            ]
          }
        ]
      }
    ]
  },
  "search-kmp": {
    "category": "Searching & String Matching",
    "title": {
      "zh": "KMP 字串比對演算法",
      "en": "KMP String Matching"
    },
    "slides": [
      {
        "heading": {
          "zh": "KMP 字串比對演算法",
          "en": "KMP String Matching"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "KMP（Knuth-Morris-Pratt）演算法透過預先計算模式字串的 LPS 陣列，在發生不匹配時直接決定模式可以跳移多遠，從而避免重新比對已比對過的字元；整體時間複雜度為 $O(n+m)$。",
              "en": "KMP (Knuth-Morris-Pratt) avoids re-comparing characters by precomputing how far the pattern can shift on a mismatch using the LPS array; total time is $O(n+m)$."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "**LPS 陣列**（最長公共前後綴，a.k.a. failure function）記錄模式每個位置的最長真前綴同時也是後綴的長度。發生不匹配時，直接令 `j = lps[j-1]` 而不是從頭重來。",
              "en": "The **LPS array** (longest proper prefix that is also a suffix, a.k.a. the failure function) records, at every pattern index, the length of the longest proper prefix which is also a suffix. On a mismatch at index `j`, jump to `lps[j-1]` instead of restarting."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "LPS 陣列在 $O(m)$ 時間內預建完成。",
                "en": "The LPS array is built in $O(m)$ time."
              },
              {
                "zh": "文字指標 `i` 永不後退，每步至少前進一格。",
                "en": "The text index `i` never moves backward; it advances by at least one step each time."
              },
              {
                "zh": "總比對次數 $\\le 2n$，整體複雜度 $O(n+m)$。",
                "en": "Total comparisons $\\le 2n$; overall complexity $O(n+m)$."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "**預處理**：對模式字串執行 `computeLPS`，建立 LPS 陣列。",
                "en": "**Preprocess**: run `computeLPS` on the pattern to build the LPS array."
              },
              {
                "zh": "**匹配推進**：當 `text[i] == pat[j]` 時同時令 `i++` 與 `j++`；若 `j == m` 則記錄一次成功匹配，並令 `j = lps[j-1]`。",
                "en": "**Match advance**: when `text[i] == pat[j]` increment both `i` and `j`; when `j == m` record a match and set `j = lps[j-1]`."
              },
              {
                "zh": "**不匹配處理**：若 `j > 0`，令 `j = lps[j-1]`（不移動 `i`）；若 `j == 0`，令 `i++`。",
                "en": "**Mismatch**: if `j > 0`, set `j = lps[j-1]` (keep `i` fixed); if `j == 0`, increment `i`."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart TD\n  Start[\"Start: i=0, j=0\"] --> Cmp{\"text[i] == pat[j]?\"}\n  Cmp -- Yes --> Adv[\"i++, j++\"]\n  Adv --> Full{\"j == m?\"}\n  Full -- Yes --> Hit[\"Record match; j = lps[j-1]\"]\n  Full -- No --> Cmp\n  Hit --> Cmp\n  Cmp -- No --> JPos{\"j > 0?\"}\n  JPos -- Yes --> Back[\"j = lps[j-1]\"]\n  Back --> Cmp\n  JPos -- No --> Next[\"i++\"]\n  Next --> Done{\"i < n?\"}\n  Done -- Yes --> Cmp\n  Done -- No --> End[\"End\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "示意圖",
          "en": "Layout"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 420 90\" width=\"420\"><g font-family=\"monospace\" font-size=\"13\"><text x=\"0\" y=\"20\">Pattern:  A  B  A  B  C  A  B  A  B</text><text x=\"0\" y=\"45\">Index:    0  1  2  3  4  5  6  7  8</text><text x=\"0\" y=\"70\">LPS:      0  0  1  2  0  1  2  3  4</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "visualizer 在每次利用 LPS 跳移時，高亮對應的 LPS 格位，幫助理解跳移幅度。",
              "en": "The visualizer highlights the active LPS cell on each shift to show how far the pattern jumps."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "階段",
                "en": "Phase"
              },
              {
                "zh": "時間",
                "en": "Time"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "建立 LPS",
                  "en": "Build LPS"
                },
                {
                  "zh": "$O(m)$",
                  "en": "$O(m)$"
                },
                {
                  "zh": "$O(m)$",
                  "en": "$O(m)$"
                }
              ],
              [
                {
                  "zh": "搜尋",
                  "en": "Search"
                },
                {
                  "zh": "$O(n)$",
                  "en": "$O(n)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "總計",
                  "en": "Total"
                },
                {
                  "zh": "$O(n+m)$",
                  "en": "$O(n+m)$"
                },
                {
                  "zh": "$O(m)$",
                  "en": "$O(m)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{KMP}} = O(n + m)",
            "caption": {
              "zh": "KMP 是線性時間演算法；文字指標永不後退，因此不會重複掃描。",
              "en": "KMP is linear-time: the text pointer never retreats, so no character is scanned more than twice."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "vector<int> computeLPS(const string& pat) {\n    int m = pat.size();\n    vector<int> lps(m, 0);\n    int len = 0;\n    for (int i = 1; i < m;) {\n        if (pat[i] == pat[len]) {\n            lps[i++] = ++len;\n        } else if (len != 0) {\n            len = lps[len - 1];\n        } else {\n            lps[i++] = 0;\n        }\n    }\n    return lps;\n}\n\nvoid kmpSearch(const string& text, const string& pat) {\n    int n = text.size(), m = pat.size();\n    vector<int> lps = computeLPS(pat);\n    int i = 0, j = 0;\n    while (i < n) {\n        if (text[i] == pat[j]) {\n            i++;\n            j++;\n            if (j == m) {\n                cout << \"Match at index \" << (i - j) << endl;\n                j = lps[j - 1];\n            }\n        } else if (j != 0) {\n            j = lps[j - 1];\n        } else {\n            i++;\n        }\n    }\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點：保證線性時間，文字指標絕不後退。",
                "en": "Pro: guaranteed linear time; the text pointer never backtracks."
              },
              {
                "zh": "優點：LPS 陣列建構簡單，只需 $O(m)$ 時間與空間。",
                "en": "Pro: the LPS array is straightforward to precompute in $O(m)$ time and space."
              },
              {
                "zh": "缺點：常數因子高於 Boyer-Moore，在一般文字上實際速度較慢。",
                "en": "Con: constant factor higher than Boyer-Moore; slower in practice on typical text."
              },
              {
                "zh": "缺點：未利用字母表特性，無法像 BM 那樣大幅跳移。",
                "en": "Con: does not exploit the alphabet; cannot make large skips like Boyer-Moore."
              },
              {
                "zh": "適用：最壞情況線性保證至關重要的場景（例如重複性高的字串）。",
                "en": "Use when worst-case linearity matters, e.g. highly repetitive strings."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "LPS（failure function）是 KMP 的核心預處理資料。",
                "en": "The LPS (failure function) array is the key precomputed data structure in KMP."
              },
              {
                "zh": "文字指標永不後退；總比對次數 $\\le 2n$。",
                "en": "The text pointer never retreats; total comparisons $\\le 2n$."
              },
              {
                "zh": "時間 $O(n+m)$，空間 $O(m)$。",
                "en": "Time $O(n+m)$, space $O(m)$."
              },
              {
                "zh": "與 BM、RK 的比較見 search-strcompare。",
                "en": "For a comparison with BM and RK, see search-strcompare."
              }
            ]
          }
        ]
      }
    ]
  },
  "search-bm": {
    "category": "Searching & String Matching",
    "title": {
      "zh": "Boyer-Moore 字串比對演算法",
      "en": "Boyer-Moore String Matching"
    },
    "slides": [
      {
        "heading": {
          "zh": "Boyer-Moore 字串比對演算法",
          "en": "Boyer-Moore String Matching"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "Boyer-Moore 演算法從右至左比對模式字串，利用**壞字元**與**好後綴**兩種啟發式規則大幅跳過文字區塊；在實際應用中往往達到次線性的比對速度。",
              "en": "Boyer-Moore scans the pattern right-to-left and uses two heuristics — bad-character and good-suffix — to skip large chunks of text, often achieving sublinear performance in practice."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "**壞字元啟發**：當 `text[s+j]` 與 `pat[j]` 不匹配時，把模式向右對齊，使模式中 `text[s+j]` 最右出現位置與之對應。**好後綴啟發**：已匹配的後綴在模式的其他位置也出現時，直接對齊該位置。每次跳移取兩者的最大值。",
              "en": "The **bad-character** heuristic aligns the mismatched text character with its rightmost occurrence in the pattern. The **good-suffix** heuristic reuses the already-matched suffix to find the next alignment. The shift applied is the `max` of both."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "從右至左比對使得每次不匹配都能跳過多個字元。",
                "en": "Right-to-left scanning enables large jumps on every mismatch."
              },
              {
                "zh": "預處理時間 $O(m + \\sigma)$，$\\sigma$ 為字母表大小。",
                "en": "Preprocessing time is $O(m + \\sigma)$ where $\\sigma$ is the alphabet size."
              },
              {
                "zh": "最佳情況下每次跳移 $m$ 個字元，總比對次數 $O(n/m)$。",
                "en": "Best case skips $m$ characters at a time, giving $O(n/m)$ total comparisons."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "**預處理**：呼叫 `buildBadChar` 建立壞字元表；呼叫 `buildGoodSuffix` 建立好後綴移位表。",
                "en": "**Preprocess**: call `buildBadChar` to build the bad-character table and `buildGoodSuffix` to build the good-suffix shift table."
              },
              {
                "zh": "**右至左比對**：從 `j = m-1` 往左比對；遇到不匹配即停止。",
                "en": "**Right-to-left compare**: match from `j = m-1` downward; stop on the first mismatch."
              },
              {
                "zh": "**移位**：若完全匹配則以 `shift[0]` 移位；否則取 `max(goodSuffix, badChar)` 移位。",
                "en": "**Shift**: on a full match apply `shift[0]`; on mismatch shift by `max(good-suffix, bad-character)`."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart TD\n  Start[\"s=0\"] --> RtL[\"Compare right-to-left: j = m-1\"]\n  RtL --> Match{\"All matched?\"}\n  Match -- Yes --> Hit[\"Record match; s += shift[0]\"]\n  Hit --> Cont{\"s <= n-m?\"}\n  Match -- No --> Calc[\"bcShift = j - badChar[text[s+j]]\"]\n  Calc --> MaxShift[\"s += max(shift[j+1], max(1, bcShift))\"]\n  MaxShift --> Cont\n  Cont -- Yes --> RtL\n  Cont -- No --> End[\"End\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "示意圖",
          "en": "Layout"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 440 100\" width=\"440\"><g font-family=\"monospace\" font-size=\"13\"><text x=\"0\" y=\"20\">Text:     A  B  A  B  D  A  B  A  C  D ...</text><text x=\"0\" y=\"45\">Pattern:  A  B  A  B  C  A  B  A  B</text><text x=\"0\" y=\"65\">Mismatch at j=4 (D vs C)</text><text x=\"0\" y=\"85\">bad-char shift=4  good-suffix shift=4  apply max=4</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "visualizer 同時顯示壞字元表與好後綴表，並標示每次移位採用哪個啟發式規則。",
              "en": "The visualizer shows both the bad-character table and the good-suffix table, highlighting which heuristic determined each shift."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "階段",
                "en": "Phase"
              },
              {
                "zh": "時間",
                "en": "Time"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "預處理",
                  "en": "Preprocessing"
                },
                {
                  "zh": "$O(m + \\sigma)$",
                  "en": "$O(m + \\sigma)$"
                },
                {
                  "zh": "$O(m + \\sigma)$",
                  "en": "$O(m + \\sigma)$"
                }
              ],
              [
                {
                  "zh": "搜尋（最佳）",
                  "en": "Search (best)"
                },
                {
                  "zh": "$O(n/m)$",
                  "en": "$O(n/m)$"
                },
                {
                  "zh": "—",
                  "en": "—"
                }
              ],
              [
                {
                  "zh": "搜尋（最差）",
                  "en": "Search (worst)"
                },
                {
                  "zh": "$O(nm)$",
                  "en": "$O(nm)$"
                },
                {
                  "zh": "—",
                  "en": "—"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{BM,best}} = O(n/m)",
            "caption": {
              "zh": "在一般文字上 BM 為次線性；最差情況（重複字串）退化為 $O(nm)$，可透過 Galil 規則改善。",
              "en": "On typical text BM is sublinear; the worst case (highly repetitive strings) degrades to $O(nm)$, avoidable with the Galil rule."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "vector<int> buildBadChar(const string& pat) {\n    vector<int> badChar(ALPHABET, -1);\n    for (int i = 0; i < (int)pat.size(); i++)\n        badChar[(unsigned char)pat[i]] = i;\n    return badChar;\n}\n\nvoid buildGoodSuffix(const string& pat, vector<int>& shift) {\n    int m = pat.size();\n    vector<int> bpos(m + 1, 0);\n    shift.assign(m + 1, 0);\n    int i = m, j = m + 1;\n    bpos[i] = j;\n    while (i > 0) {\n        while (j <= m && pat[i - 1] != pat[j - 1]) {\n            if (shift[j] == 0)\n                shift[j] = j - i;\n            j = bpos[j];\n        }\n        i--;\n        j--;\n        bpos[i] = j;\n    }\n    j = bpos[0];\n    for (i = 0; i <= m; i++) {\n        if (shift[i] == 0)\n            shift[i] = j;\n        if (i == j)\n            j = bpos[j];\n    }\n}\n\nvoid boyerMooreSearch(const string& text, const string& pat) {\n    int n = text.size(), m = pat.size();\n    vector<int> badChar = buildBadChar(pat);\n    vector<int> shift;\n    buildGoodSuffix(pat, shift);\n    int s = 0;\n    while (s <= n - m) {\n        int j = m - 1;\n        while (j >= 0 && pat[j] == text[s + j])\n            j--;\n        if (j < 0) {\n            cout << \"Match at index \" << s << endl;\n            s += shift[0];\n        } else {\n            int bcShift = j - badChar[(unsigned char)text[s + j]];\n            s += max(shift[j + 1], max(1, bcShift));\n        }\n    }\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點：實際效能為次線性，在大型字母表與長文字上是最快的通用比對器。",
                "en": "Pro: sublinear in practice; the fastest general-purpose matcher on large alphabets and long texts."
              },
              {
                "zh": "優點：右至左掃描讓壞字元跳移通常比 KMP 大。",
                "en": "Pro: right-to-left scanning often yields much larger skips than KMP."
              },
              {
                "zh": "缺點：不加 Galil 規則則最壞情況為 $O(nm)$。",
                "en": "Con: worst case is $O(nm)$ without the Galil rule."
              },
              {
                "zh": "缺點：需要壞字元與好後綴兩張預處理表，實作較複雜。",
                "en": "Con: two preprocessing tables (bad-character and good-suffix) make the implementation more complex."
              },
              {
                "zh": "適用：大型字母表（如自然語言文字）、長模式字串。",
                "en": "Use for large alphabets (e.g. natural language text) and long patterns."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "從右至左掃描；壞字元 + 好後綴雙啟發。",
                "en": "Right-to-left scan; bad-character and good-suffix heuristics."
              },
              {
                "zh": "平均次線性；最差 $O(nm)$。",
                "en": "Average sublinear; worst case $O(nm)$."
              },
              {
                "zh": "大型字母表與長文字的首選演算法。",
                "en": "The go-to algorithm for large alphabets and long texts."
              },
              {
                "zh": "與 KMP、RK 的比較見 search-strcompare。",
                "en": "For a comparison with KMP and RK, see search-strcompare."
              }
            ]
          }
        ]
      }
    ]
  },
  "search-rk": {
    "category": "Searching & String Matching",
    "title": {
      "zh": "Rabin-Karp 字串比對演算法",
      "en": "Rabin-Karp String Matching"
    },
    "slides": [
      {
        "heading": {
          "zh": "Rabin-Karp 字串比對演算法",
          "en": "Rabin-Karp String Matching"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "Rabin-Karp 演算法對文字每個視窗計算滾動雜湊值，並與模式字串的雜湊值比較；只有雜湊命中時才進行逐字元驗證，平均時間複雜度為 $O(n+m)$。",
              "en": "Rabin-Karp compares a rolling hash of each text window against the pattern's hash, verifying character-by-character only on a hash hit; average time complexity is $O(n+m)$."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "**滾動雜湊**：視窗滑動一格時，移除離開字元的貢獻並加入進入字元，整個更新只需 $O(1)$，無需重算整個視窗。",
              "en": "The **rolling hash** updates in $O(1)$ when the window slides — subtract the leaving character's contribution and add the entering character's, without recomputing the whole window."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "雜湊命中不代表一定匹配（偽陽性），需逐字元驗證。",
                "en": "A hash hit may be a false positive (collision) and requires character-by-character verification."
              },
              {
                "zh": "選取良好的模數可使碰撞率極低，偽陽性概率 $O(1/MOD)$。",
                "en": "A good modulus keeps collision rate low; false-positive probability is $O(1/MOD)$."
              },
              {
                "zh": "天然延伸至多模式搜尋：同時比對多個模式的雜湊值。",
                "en": "Extends naturally to multi-pattern search by comparing against multiple pattern hashes simultaneously."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "**初始化**：計算模式字串的雜湊值 `patHash` 與第一個視窗的雜湊值 `winHash`；預計算高位乘法因子 `h`。",
                "en": "**Initialize**: compute the pattern hash `patHash` and the first window hash `winHash`; precompute the high-order multiplier `h`."
              },
              {
                "zh": "**滾動更新**：每次視窗右滑一格，以 $O(1)$ 更新 `winHash`：去除最左字元，加入最右字元。",
                "en": "**Rolling update**: on each slide, update `winHash` in $O(1)$: remove the leftmost character's contribution and add the new rightmost character."
              },
              {
                "zh": "**驗證**：當 `patHash == winHash` 時，逐字元比對確認是否為真正匹配。",
                "en": "**Verify**: when `patHash == winHash`, compare characters one by one to confirm a genuine match."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart TD\n  Init[\"Compute patHash, winHash, h\"] --> Loop{\"s <= n-m?\"}\n  Loop -- No --> End[\"End\"]\n  Loop -- Yes --> HashCmp{\"patHash == winHash?\"}\n  HashCmp -- Yes --> Verify[\"Verify characters\"]\n  Verify --> IsMatch{\"Full match?\"}\n  IsMatch -- Yes --> Record[\"Record match at s\"]\n  IsMatch -- No --> Roll\n  Record --> Roll[\"Roll hash: remove text[s], add text[s+m]\"]\n  HashCmp -- No --> Roll\n  Roll --> Inc[\"s++\"] --> Loop"
          }
        ]
      },
      {
        "heading": {
          "zh": "示意圖",
          "en": "Layout"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 420 100\" width=\"420\"><g font-family=\"monospace\" font-size=\"13\"><text x=\"0\" y=\"20\">patHash = hash(\"ABABCABAB\") = 42</text><text x=\"0\" y=\"45\">Window  s=10: hash(\"ABABCABAB\") = 42  → verify → MATCH</text><text x=\"0\" y=\"70\">Window  s= 0: hash(\"ABABDABAC\") = 87  → skip (no verify)</text><text x=\"0\" y=\"95\">Rolling: winHash = (BASE*(winHash - text[s]*h) + text[s+m]) % MOD</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "visualizer 以不同顏色區分已驗證匹配與碰撞（偽陽性），幫助理解雜湊命中的兩種結果。",
              "en": "The visualizer distinguishes a verified match from a collision (false positive) using different highlight colors."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "階段",
                "en": "Phase"
              },
              {
                "zh": "時間",
                "en": "Time"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "預處理",
                  "en": "Preprocessing"
                },
                {
                  "zh": "$O(m)$",
                  "en": "$O(m)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ],
              [
                {
                  "zh": "搜尋（平均）",
                  "en": "Search (average)"
                },
                {
                  "zh": "$O(n+m)$",
                  "en": "$O(n+m)$"
                },
                {
                  "zh": "—",
                  "en": "—"
                }
              ],
              [
                {
                  "zh": "搜尋（最差）",
                  "en": "Search (worst)"
                },
                {
                  "zh": "$O(nm)$",
                  "en": "$O(nm)$"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{RK,avg}} = O(n + m)",
            "caption": {
              "zh": "最差情況發生於每個視窗都觸發雜湊碰撞而需完整驗證；選擇良好的模數可使此情況極少出現。",
              "en": "The worst case occurs when hash collisions force verification on every window; a good modulus makes this exceedingly rare."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "void rabinKarpSearch(const string& text, const string& pat) {\n    int n = text.size(), m = pat.size();\n    if (m > n)\n        return;\n    int patHash = 0, winHash = 0, h = 1;\n    for (int i = 0; i < m - 1; i++)\n        h = (h * BASE) % MOD;\n    for (int i = 0; i < m; i++) {\n        patHash = (BASE * patHash + pat[i]) % MOD;\n        winHash = (BASE * winHash + text[i]) % MOD;\n    }\n    for (int s = 0; s <= n - m; s++) {\n        if (patHash == winHash) {\n            int j = 0;\n            while (j < m && text[s + j] == pat[j])\n                j++;\n            if (j == m)\n                cout << \"Match at index \" << s << endl;\n        }\n        if (s < n - m) {\n            winHash = (BASE * (winHash - text[s] * h) + text[s + m]) % MOD;\n            if (winHash < 0)\n                winHash += MOD;\n        }\n    }\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點：額外空間 $O(1)$，實作簡單，天然支援多模式搜尋。",
                "en": "Pro: $O(1)$ extra space, simple to implement, extends naturally to multi-pattern search."
              },
              {
                "zh": "優點：平均 $O(n+m)$，在低碰撞率下效能接近 KMP。",
                "en": "Pro: average $O(n+m)$; performs close to KMP under low collision rates."
              },
              {
                "zh": "缺點：對抗性輸入下碰撞率高，退化為 $O(nm)$。",
                "en": "Con: adversarial inputs can force $O(nm)$ through high collision rates."
              },
              {
                "zh": "缺點：每次雜湊命中都需額外的驗證步驟。",
                "en": "Con: every hash hit requires an extra character-by-character verification step."
              },
              {
                "zh": "適用：多模式搜尋、抄襲偵測與文件指紋比對。",
                "en": "Use for multi-pattern search, plagiarism detection, and document fingerprinting."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "滾動雜湊讓每次視窗滑動只需 $O(1)$ 更新。",
                "en": "Rolling hash allows $O(1)$ update per window slide."
              },
              {
                "zh": "雜湊命中時才驗證；平均 $O(n+m)$，空間 $O(1)$。",
                "en": "Verify only on hash hit; average $O(n+m)$, space $O(1)$."
              },
              {
                "zh": "最適合多模式搜尋與指紋比對應用場景。",
                "en": "Best suited for multi-pattern search and fingerprinting applications."
              },
              {
                "zh": "與 KMP、BM 的比較見 search-strcompare。",
                "en": "For a comparison with KMP and BM, see search-strcompare."
              }
            ]
          }
        ]
      }
    ]
  },
  "search-strcompare": {
    "category": "Searching & String Matching",
    "title": {
      "zh": "字串比對演算法比較",
      "en": "String Matching Compared"
    },
    "slides": [
      {
        "heading": {
          "zh": "字串比對演算法比較",
          "en": "String Matching Compared"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "KMP、Boyer-Moore 與 Rabin-Karp 三種演算法均解決精確字串比對問題，但在保證上界、實際速度與空間使用上各有取捨；本頁並排呈現三者差異。",
              "en": "KMP, Boyer-Moore, and Rabin-Karp all solve exact string matching but trade off differently among guaranteed bounds, practical speed, and space; this deck presents all three side by side."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "三種演算法各有一個核心預處理概念：KMP 的 failure function 確保線性；BM 的跳移啟發在實際文字中實現次線性；RK 的滾動雜湊以 $O(1)$ 空間達到平均線性。",
              "en": "Each algorithm has one defining preprocessing idea: KMP's failure function guarantees linearity; BM's skip heuristics achieve sublinearity on real text; RK's rolling hash reaches average linearity with $O(1)$ space."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "KMP：LPS（failure function）—— 保證線性時間，文字指標永不後退。",
                "en": "KMP: LPS / failure function — guaranteed linear time, text pointer never retreats."
              },
              {
                "zh": "BM：壞字元 + 好後綴啟發 —— 實際次線性，大型字母表最快。",
                "en": "BM: bad-character + good-suffix heuristics — sublinear in practice, fastest on large alphabets."
              },
              {
                "zh": "RK：滾動雜湊 —— 平均線性，空間 $O(1)$，天然支援多模式。",
                "en": "RK: rolling hash — average linear, $O(1)$ space, naturally multi-pattern."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "**初始化**：visualizer 以相同文字 `ABABDABACDABABCABAB` 與模式 `ABABCABAB` 同步啟動三個比對窗格。",
                "en": "**Initialize**: the visualizer starts all three panes simultaneously on the shared text `ABABDABACDABABCABAB` and pattern `ABABCABAB`."
              },
              {
                "zh": "**逐步推進**：每按一次「下一步」，三個演算法各前進一個邏輯步驟，各自的比對計數器分別累計。",
                "en": "**Step together**: each press of \"Next\" advances all three algorithms by one logical step; their individual comparison counters accumulate independently."
              },
              {
                "zh": "**完成比較**：某個演算法先找到所有匹配後停止；visualizer 顯示各自的比對次數供比較。",
                "en": "**Compare results**: when an algorithm finishes finding all matches it stops; the visualizer displays each algorithm's comparison count for direct comparison."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  Input[\"Text + Pattern\"] --> KMP[\"KMP lane\"]\n  Input --> BM[\"BM lane\"]\n  Input --> RK[\"RK lane\"]\n  KMP --> KMPOut[\"KMP: Match@10, cmp=N_kmp\"]\n  BM --> BMOut[\"BM:  Match@10, cmp=N_bm\"]\n  RK --> RKOut[\"RK:  Match@10, cmp=N_rk\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "示意圖",
          "en": "Layout"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 420 110\" width=\"420\"><g font-family=\"monospace\" font-size=\"13\"><text x=\"0\" y=\"20\">Algorithm   Time(worst)  Space     Practice</text><text x=\"0\" y=\"40\">KMP         O(n+m)       O(m)      linear</text><text x=\"0\" y=\"60\">BM          O(nm)        O(m+sig)  sublinear</text><text x=\"0\" y=\"80\">RK          O(nm)        O(1)      avg-linear</text><text x=\"0\" y=\"100\">Shared example match at index 10</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "visualizer 三個窗格同步執行；每個窗格在其演算法完成後顯示總比對次數。",
              "en": "The visualizer runs all three panes synchronously; each pane displays its total comparison count when its algorithm finishes."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "演算法",
                "en": "Algorithm"
              },
              {
                "zh": "時間（最差）",
                "en": "Time (worst)"
              },
              {
                "zh": "時間（平均／最佳）",
                "en": "Time (avg/best)"
              },
              {
                "zh": "空間",
                "en": "Space"
              }
            ],
            "rows": [
              [
                {
                  "zh": "KMP",
                  "en": "KMP"
                },
                {
                  "zh": "$O(n+m)$",
                  "en": "$O(n+m)$"
                },
                {
                  "zh": "$O(n+m)$",
                  "en": "$O(n+m)$"
                },
                {
                  "zh": "$O(m)$",
                  "en": "$O(m)$"
                }
              ],
              [
                {
                  "zh": "Boyer-Moore",
                  "en": "Boyer-Moore"
                },
                {
                  "zh": "$O(nm)$",
                  "en": "$O(nm)$"
                },
                {
                  "zh": "$O(n/m)$（最佳）",
                  "en": "$O(n/m)$ (best)"
                },
                {
                  "zh": "$O(m + \\sigma)$",
                  "en": "$O(m + \\sigma)$"
                }
              ],
              [
                {
                  "zh": "Rabin-Karp",
                  "en": "Rabin-Karp"
                },
                {
                  "zh": "$O(nm)$",
                  "en": "$O(nm)$"
                },
                {
                  "zh": "$O(n+m)$（平均）",
                  "en": "$O(n+m)$ (avg)"
                },
                {
                  "zh": "$O(1)$",
                  "en": "$O(1)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "O(n + m) \\text{ — shared baseline}",
            "caption": {
              "zh": "三者的共同基線為 $O(n+m)$；取捨在於：KMP 保證最差、BM 實際最快、RK 最省空間。",
              "en": "The shared baseline is $O(n+m)$; the trade-off is: KMP guarantees worst-case, BM is fastest in practice, RK is most space-thrifty."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "// Each function returns the number of comparisons performed.\n\nint kmpCompares(const string& text, const string& pat) {\n    int n = text.size(), m = pat.size(), cmp = 0;\n    vector<int> lps(m, 0);\n    for (int len = 0, i = 1; i < m;) {\n        if (pat[i] == pat[len])\n            lps[i++] = ++len;\n        else if (len)\n            len = lps[len - 1];\n        else\n            lps[i++] = 0;\n    }\n    int i = 0, j = 0;\n    while (i < n) {\n        cmp++;\n        if (text[i] == pat[j]) {\n            i++;\n            j++;\n            if (j == m)\n                j = lps[j - 1];\n        } else if (j)\n            j = lps[j - 1];\n        else\n            i++;\n    }\n    return cmp;\n}\n\n// Trimmed Boyer-Moore (bad-character heuristic only).\nint bmCompares(const string& text, const string& pat) {\n    int n = text.size(), m = pat.size(), cmp = 0;\n    vector<int> bad(256, -1);\n    for (int i = 0; i < m; i++)\n        bad[(unsigned char)pat[i]] = i;\n    int s = 0;\n    while (s <= n - m) {\n        int j = m - 1;\n        while (j >= 0) {\n            cmp++;\n            if (pat[j] != text[s + j])\n                break;\n            j--;\n        }\n        if (j < 0)\n            s += 1;\n        else\n            s += max(1, j - bad[(unsigned char)text[s + j]]);\n    }\n    return cmp;\n}\n\nint rkCompares(const string& text, const string& pat) {\n    const int BASE = 256, MOD = 101;\n    int n = text.size(), m = pat.size(), cmp = 0;\n    if (m > n)\n        return 0;\n    int ph = 0, wh = 0, h = 1;\n    for (int i = 0; i < m - 1; i++)\n        h = (h * BASE) % MOD;\n    for (int i = 0; i < m; i++) {\n        ph = (BASE * ph + pat[i]) % MOD;\n        wh = (BASE * wh + text[i]) % MOD;\n    }\n    for (int s = 0; s <= n - m; s++) {\n        cmp++; // one hash comparison per window\n        if (ph == wh) {\n            int j = 0;\n            while (j < m && text[s + j] == pat[j]) {\n                cmp++;\n                j++;\n            }\n        }\n        if (s < n - m) {\n            wh = (BASE * (wh - text[s] * h) + text[s + m]) % MOD;\n            if (wh < 0)\n                wh += MOD;\n        }\n    }\n    return cmp;\n}"
          },
          {
            "type": "note",
            "text": {
              "zh": "此處的 `bmCompares` 為比較計數用的精簡版（僅壞字元啟發式）；上方複雜度表描述的是標準完整 Boyer-Moore（含好後綴），其完整實作見 search-bm。",
              "en": "The `bmCompares` shown here is a trimmed comparison-counting variant (bad-character heuristic only); the complexity table above describes the standard full Boyer-Moore (with good-suffix) — see search-bm for the full implementation."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "選 KMP：需要最壞情況線性保證，或字串重複性高（二進位 DNA 序列）。",
                "en": "Choose KMP: when worst-case linear time is required, e.g. highly repetitive binary or DNA strings."
              },
              {
                "zh": "選 BM：追求在大型字母表與長文字上的最快實際速度（自然語言、程式碼搜尋）。",
                "en": "Choose BM: for raw speed on large alphabets and long texts (natural language, code search)."
              },
              {
                "zh": "選 RK：多模式搜尋、記憶體受限、抄襲偵測或文件指紋比對場景。",
                "en": "Choose RK: for multi-pattern search, memory-constrained environments, plagiarism detection, or document fingerprinting."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "同一問題，三種取捨：KMP 保證線性、BM 實際最快、RK 最省空間。",
                "en": "Same problem, three trade-offs: KMP guaranteed linear, BM fastest in practice, RK most space-thrifty."
              },
              {
                "zh": "KMP 適合重複性高的字串；BM 適合大型字母表；RK 適合多模式比對。",
                "en": "KMP suits repetitive strings; BM suits large alphabets; RK suits multi-pattern matching."
              },
              {
                "zh": "三者皆為精確比對演算法；$O(n+m)$ 只是比較的參考基線，三者的最差複雜度其實不同（見複雜度表）。",
                "en": "All three are exact-matching algorithms; $O(n+m)$ is only the reference baseline for comparison — their worst-case complexities actually differ (see the complexity table)."
              },
              {
                "zh": "詳細說明見 search-kmp、search-bm、search-rk。",
                "en": "For detailed coverage see search-kmp, search-bm, and search-rk."
              }
            ]
          }
        ]
      }
    ]
  },
  "oop-inheritance": {
    "category": "OOP Concepts",
    "title": {
      "zh": "類別繼承",
      "en": "Class Inheritance"
    },
    "slides": [
      {
        "heading": {
          "zh": "類別繼承",
          "en": "Class Inheritance"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "繼承(Inheritance)是 OOP 的核心機制之一,允許 derived class(衍生類別)繼承 base class(基底類別)的成員與行為,以 `public` 繼承表達「is-a」關係並實現程式碼重用。",
              "en": "Inheritance is a core OOP mechanism that lets a derived class acquire members and behaviour from a base class. A `public` inheritance expresses an \"is-a\" relationship and enables code reuse."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "Base class 定義共用介面(可含 `virtual` 方法);derived class 繼承後以 `override` 覆寫並擴充功能。建構順序為由上至下(base → derived),解構順序相反。",
              "en": "The base class defines a shared interface (possibly with `virtual` methods); derived classes inherit it and use `override` to specialise behaviour. Construction order is top-down (base → derived); destruction is reversed."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "`public` 繼承:base class 的 `public`/`protected` 成員保持原存取層級。",
                "en": "`public` inheritance: `public` and `protected` members of the base class retain their access level."
              },
              {
                "zh": "`virtual` 解構子:透過 base pointer 刪除物件時確保 derived class 解構子被正確呼叫。",
                "en": "`virtual` destructor: ensures the derived destructor is called correctly when deleting through a base pointer."
              },
              {
                "zh": "建構子鏈結(constructor chaining):建立 derived 物件時先執行 base constructor。",
                "en": "Constructor chaining: the base constructor executes first when a derived object is created."
              },
              {
                "zh": "`override` 關鍵字:在編譯期確認方法確實覆寫 base class 的 `virtual` 函式。",
                "en": "`override` keyword: compile-time guarantee that the method actually overrides a `virtual` function in the base class."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "宣告 base class `Animal`,包含 `virtual speak()` 與 `virtual ~Animal()`。",
                "en": "Declare base class `Animal` with `virtual speak()` and `virtual ~Animal()`."
              },
              {
                "zh": "宣告 derived class `Dog : public Animal`,以 `override` 覆寫 `speak()`。",
                "en": "Declare derived class `Dog : public Animal`, override `speak()` with `override`."
              },
              {
                "zh": "透過 `Animal*` 指標建立 `Dog` 物件;呼叫 `speak()` 透過 vtable 動態分派。",
                "en": "Create a `Dog` object through an `Animal*` pointer; calling `speak()` dispatches dynamically via vtable."
              },
              {
                "zh": "`delete` 時先執行 `Dog::~Dog()`,再執行 `Animal::~Animal()`。",
                "en": "On `delete`, `Dog::~Dog()` runs first, then `Animal::~Animal()`."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart TD\n  A[\"Animal\\n+ speak()\\n+ dtor\"] --> B[\"Dog\\n+ speak() override\\n+ dtor override\"]\n  A --> C[\"Cat\\n+ speak() override\\n+ dtor override\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "類別階層示意",
          "en": "Class Hierarchy Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 160\" width=\"320\" height=\"160\"><g font-family=\"sans-serif\" font-size=\"12\"><rect x=\"100\" y=\"10\" width=\"120\" height=\"50\" rx=\"4\" fill=\"#dbeafe\" stroke=\"#2563eb\" stroke-width=\"1.5\"/><text x=\"160\" y=\"30\" text-anchor=\"middle\" font-weight=\"bold\">Animal</text><text x=\"160\" y=\"46\" text-anchor=\"middle\" font-size=\"11\">+ speak() virtual</text><rect x=\"20\" y=\"100\" width=\"110\" height=\"50\" rx=\"4\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"1.5\"/><text x=\"75\" y=\"120\" text-anchor=\"middle\" font-weight=\"bold\">Dog</text><text x=\"75\" y=\"136\" text-anchor=\"middle\" font-size=\"11\">+ speak() override</text><rect x=\"190\" y=\"100\" width=\"110\" height=\"50\" rx=\"4\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"1.5\"/><text x=\"245\" y=\"120\" text-anchor=\"middle\" font-weight=\"bold\">Cat</text><text x=\"245\" y=\"136\" text-anchor=\"middle\" font-size=\"11\">+ speak() override</text><line x1=\"75\" y1=\"100\" x2=\"148\" y2=\"63\" stroke=\"#64748b\" stroke-width=\"1.5\" marker-end=\"url(#arr)\"/><line x1=\"245\" y1=\"100\" x2=\"172\" y2=\"63\" stroke=\"#64748b\" stroke-width=\"1.5\" marker-end=\"url(#arr)\"/><defs><marker id=\"arr\" markerWidth=\"10\" markerHeight=\"10\" refX=\"5\" refY=\"5\" orient=\"auto\"><path d=\"M0,0 L0,10 L9,5 z\" fill=\"#ffffff\" stroke=\"#64748b\" stroke-width=\"1\"/></marker></defs></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "空心三角形箭頭由 derived class 指向 base class,代表「is-a」繼承關係。`Dog` 與 `Cat` 均為 `Animal`,可透過 `Animal*` 統一操作。",
              "en": "The hollow triangle arrowhead points from the derived class to the base class, denoting the \"is-a\" inheritance relationship. Both `Dog` and `Cat` are `Animal`s and can be handled uniformly through an `Animal*` pointer."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "繼承存取規則",
          "en": "Inheritance Access Rules"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "Base 成員",
                "en": "Base Member"
              },
              {
                "zh": "public 繼承",
                "en": "public Inheritance"
              },
              {
                "zh": "protected 繼承",
                "en": "protected Inheritance"
              },
              {
                "zh": "private 繼承",
                "en": "private Inheritance"
              }
            ],
            "rows": [
              [
                {
                  "zh": "`public`",
                  "en": "`public`"
                },
                {
                  "zh": "`public`",
                  "en": "`public`"
                },
                {
                  "zh": "`protected`",
                  "en": "`protected`"
                },
                {
                  "zh": "`private`",
                  "en": "`private`"
                }
              ],
              [
                {
                  "zh": "`protected`",
                  "en": "`protected`"
                },
                {
                  "zh": "`protected`",
                  "en": "`protected`"
                },
                {
                  "zh": "`protected`",
                  "en": "`protected`"
                },
                {
                  "zh": "`private`",
                  "en": "`private`"
                }
              ],
              [
                {
                  "zh": "`private`",
                  "en": "`private`"
                },
                {
                  "zh": "不可存取",
                  "en": "inaccessible"
                },
                {
                  "zh": "不可存取",
                  "en": "inaccessible"
                },
                {
                  "zh": "不可存取",
                  "en": "inaccessible"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "D \\subseteq B \\implies \\forall\\, b \\in B,\\; d \\in D :\\; d.\\text{is-a}(b)",
            "caption": {
              "zh": "`public` 繼承嚴格滿足 Liskov Substitution Principle(LSP):derived 物件可在任何需要 base 物件之處替代使用。",
              "en": "`public` inheritance satisfies the Liskov Substitution Principle: a derived object may be used wherever a base object is expected."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "class Animal {\npublic:\n    Animal() { cout << \"Animal constructor\" << endl; }\n    virtual ~Animal() { cout << \"Animal destructor\" << endl; }\n\n    virtual void speak() { cout << \"Animal sound\" << endl; }\n};\n\nclass Dog : public Animal {\npublic:\n    Dog() { cout << \"Dog constructor\" << endl; }\n    ~Dog() override { cout << \"Dog destructor\" << endl; }\n\n    void speak() override { cout << \"Woof\" << endl; }\n};\n\nint main() {\n    Animal* a = new Dog(); // is-a: Dog is an Animal\n    a->speak();            // calls Dog::speak via vtable\n    delete a;              // Dog::~Dog then Animal::~Animal\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:程式碼重用 — derived class 自動取得 base class 所有非私有成員。",
                "en": "Pro: code reuse — derived classes automatically acquire all non-private members of the base class."
              },
              {
                "zh": "優點:多型基礎 — `virtual` 方法搭配繼承實現執行期動態分派。",
                "en": "Pro: foundation for polymorphism — `virtual` methods with inheritance enable runtime dynamic dispatch."
              },
              {
                "zh": "缺點:深層繼承鏈(> 3 層)增加理解與維護難度,易形成脆弱基底類別問題。",
                "en": "Con: deep inheritance chains (>3 levels) increase complexity and lead to the fragile base class problem."
              },
              {
                "zh": "缺點:濫用繼承可能違反 LSP;應優先考慮組合(composition over inheritance)。",
                "en": "Con: misusing inheritance can violate LSP; prefer composition over inheritance when in doubt."
              },
              {
                "zh": "適用:確實存在「is-a」語意的場景,如 Animal/Dog/Cat、Shape/Circle/Rectangle。",
                "en": "Use when a genuine \"is-a\" relationship exists, e.g. Animal/Dog/Cat, Shape/Circle/Rectangle."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "繼承以「is-a」關係建立類別階層,實現程式碼重用與多型。",
                "en": "Inheritance establishes class hierarchies via the \"is-a\" relationship, enabling code reuse and polymorphism."
              },
              {
                "zh": "`virtual` 解構子是使用 base pointer 管理 derived 物件的必要條件。",
                "en": "A `virtual` destructor is essential when managing derived objects through base pointers."
              },
              {
                "zh": "`public` 繼承遵守 LSP;`protected`/`private` 繼承則為實作繼承。",
                "en": "`public` inheritance satisfies LSP; `protected`/`private` inheritance is for implementation reuse only."
              },
              {
                "zh": "建構順序 base → derived;解構順序 derived → base。",
                "en": "Construction is base → derived; destruction is derived → base."
              }
            ]
          }
        ]
      }
    ]
  },
  "oop-polymorphism": {
    "category": "OOP Concepts",
    "title": {
      "zh": "多型(虛擬函式)",
      "en": "Polymorphism (Virtual Functions)"
    },
    "slides": [
      {
        "heading": {
          "zh": "多型(虛擬函式)",
          "en": "Polymorphism (Virtual Functions)"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "多型(Polymorphism)讓不同型別的物件能透過相同的介面操作;在 C++ 中以 `virtual` 函式搭配 vtable 機制實現執行期動態分派(dynamic dispatch)。",
              "en": "Polymorphism lets objects of different types be operated on through a common interface. In C++, `virtual` functions together with the vtable mechanism implement runtime dynamic dispatch."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "每個含有 `virtual` 函式的類別都有一張 Virtual Method Table(vtable),紀錄該類別各 `virtual` 函式的實際位址。每個物件含一個隱藏的 vptr 指向其類別的 vtable。",
              "en": "Every class with `virtual` functions has a Virtual Method Table (vtable) storing the actual addresses of its virtual functions. Each object carries a hidden vptr pointing to its class's vtable."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "`virtual` 函式:在 base class 宣告,允許 derived class 以 `override` 覆寫。",
                "en": "`virtual` function: declared in the base class; derived classes may override it with `override`."
              },
              {
                "zh": "`= 0` (pure virtual):使 base class 成為抽象類別,強制所有 derived class 實作。",
                "en": "`= 0` (pure virtual): makes the base class abstract, forcing all derived classes to implement it."
              },
              {
                "zh": "動態分派:呼叫 `ptr->draw()` 時,先取 vptr → 查 vtable → 跳轉到正確函式。",
                "en": "Dynamic dispatch: `ptr->draw()` follows vptr to vtable to the correct function address at runtime."
              },
              {
                "zh": "靜態分派(非 `virtual`):函式位址在編譯期確定,無間接呼叫。",
                "en": "Static dispatch (non-`virtual`): function address resolved at compile time, no indirection."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "宣告 base class `Shape` 含純虛擬函式 `draw()` 與 `area()`。",
                "en": "Declare abstract base class `Shape` with pure virtual `draw()` and `area()`."
              },
              {
                "zh": "`Circle` 和 `Rectangle` 繼承 `Shape` 並以 `override` 實作各自版本。",
                "en": "`Circle` and `Rectangle` inherit `Shape` and implement their own versions with `override`."
              },
              {
                "zh": "透過 `Shape*` 指標儲存不同物件;迴圈呼叫 `shape->draw()` 自動分派。",
                "en": "Store different objects through `Shape*` pointers; the loop calls `shape->draw()`, dispatching automatically."
              },
              {
                "zh": "vtable 查找在執行期完成;每次虛擬呼叫增加兩次指標間接存取的開銷(讀 vptr,再查 vtable 槽)。",
                "en": "vtable lookup happens at runtime; each virtual call adds two pointer indirections overhead (read vptr, then read the vtable slot)."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  CO[\"Circle object\"] --> CVP[\"vptr\"]\n  CVP --> CVT[\"Circle vtable\"]\n  CVT --> CD[\"Circle::draw()\"]\n  RO[\"Rectangle object\"] --> RVP[\"vptr\"]\n  RVP --> RVT[\"Rectangle vtable\"]\n  RVT --> RD[\"Rectangle::draw()\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "vtable 結構示意",
          "en": "vtable Structure Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 170\" width=\"360\" height=\"170\"><g font-family=\"sans-serif\" font-size=\"11\"><text x=\"20\" y=\"16\" font-weight=\"bold\" fill=\"#1e40af\">Circle object</text><rect x=\"20\" y=\"22\" width=\"80\" height=\"26\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"60\" y=\"39\" text-anchor=\"middle\">vptr</text><line x1=\"100\" y1=\"35\" x2=\"150\" y2=\"55\" stroke=\"#2563eb\" stroke-width=\"1.5\" marker-end=\"url(#b)\"/><text x=\"155\" y=\"46\" font-weight=\"bold\" fill=\"#1e40af\">Circle vtable</text><rect x=\"150\" y=\"50\" width=\"110\" height=\"26\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"205\" y=\"67\" text-anchor=\"middle\">Circle::draw()</text><rect x=\"150\" y=\"76\" width=\"110\" height=\"26\" fill=\"#dbeafe\" stroke=\"#2563eb\"/><text x=\"205\" y=\"93\" text-anchor=\"middle\">Circle::area()</text><text x=\"20\" y=\"126\" font-weight=\"bold\" fill=\"#166534\">Rectangle object</text><rect x=\"20\" y=\"132\" width=\"80\" height=\"26\" fill=\"#dcfce7\" stroke=\"#16a34a\"/><text x=\"60\" y=\"149\" text-anchor=\"middle\">vptr</text><line x1=\"100\" y1=\"145\" x2=\"150\" y2=\"125\" stroke=\"#16a34a\" stroke-width=\"1.5\" marker-end=\"url(#g)\"/><text x=\"155\" y=\"116\" font-weight=\"bold\" fill=\"#166534\">Rectangle vtable</text><rect x=\"150\" y=\"120\" width=\"120\" height=\"26\" fill=\"#dcfce7\" stroke=\"#16a34a\"/><text x=\"210\" y=\"137\" text-anchor=\"middle\">Rectangle::draw()</text><rect x=\"150\" y=\"146\" width=\"120\" height=\"20\" fill=\"#dcfce7\" stroke=\"#16a34a\"/><text x=\"210\" y=\"160\" text-anchor=\"middle\">Rectangle::area()</text><defs><marker id=\"b\" markerWidth=\"7\" markerHeight=\"7\" refX=\"6\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L7,3 z\" fill=\"#2563eb\"/></marker><marker id=\"g\" markerWidth=\"7\" markerHeight=\"7\" refX=\"6\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L7,3 z\" fill=\"#16a34a\"/></marker></defs></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "每個物件有一個 vptr;每個類別有一張 vtable。vtable 由編譯器在編譯期建立並存於唯讀資料段,執行期只做指標間接存取。",
              "en": "Each object has one vptr; each class has one vtable. The vtable is built by the compiler at compile time and stored in read-only data. At runtime only pointer indirection occurs."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "靜態 vs 動態分派",
          "en": "Static vs Dynamic Dispatch"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "特性",
                "en": "Property"
              },
              {
                "zh": "靜態分派(非virtual)",
                "en": "Static Dispatch (non-virtual)"
              },
              {
                "zh": "動態分派(virtual)",
                "en": "Dynamic Dispatch (virtual)"
              }
            ],
            "rows": [
              [
                {
                  "zh": "解析時機",
                  "en": "Resolution time"
                },
                {
                  "zh": "編譯期",
                  "en": "Compile time"
                },
                {
                  "zh": "執行期",
                  "en": "Runtime"
                }
              ],
              [
                {
                  "zh": "額外開銷",
                  "en": "Overhead"
                },
                {
                  "zh": "無",
                  "en": "None"
                },
                {
                  "zh": "兩次指標間接存取",
                  "en": "Two pointer indirections"
                }
              ],
              [
                {
                  "zh": "多型支援",
                  "en": "Polymorphism"
                },
                {
                  "zh": "否",
                  "en": "No"
                },
                {
                  "zh": "是",
                  "en": "Yes"
                }
              ],
              [
                {
                  "zh": "抽象類別",
                  "en": "Abstract class"
                },
                {
                  "zh": "不適用",
                  "en": "N/A"
                },
                {
                  "zh": "以 `= 0` 宣告",
                  "en": "Declared with `= 0`"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{virtual}} = T_{\\text{direct}} + 2 \\cdot T_{\\text{ptr-deref}}",
            "caption": {
              "zh": "虛擬函式呼叫的額外開銷:一次存取 vptr + 一次查 vtable,共兩次指標間接存取。",
              "en": "Virtual call overhead: one vptr access + one vtable lookup = two pointer indirections over a direct call."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "class Shape {\npublic:\n    virtual ~Shape() {}\n    virtual void draw() const = 0;   // pure virtual\n    virtual double area() const = 0; // pure virtual\n};\n\nclass Circle : public Shape {\n    double radius;\n\npublic:\n    explicit Circle(double r) : radius(r) {}\n    void draw() const override { cout << \"Drawing Circle(\" << radius << \")\" << endl; }\n    double area() const override { return 3.14159 * radius * radius; }\n};\n\nint main() {\n    vector<Shape*> shapes;\n    shapes.push_back(new Circle(5.0));\n    shapes.push_back(new Circle(3.0));\n\n    for (const auto* s : shapes) {\n        s->draw(); // dynamic dispatch via vtable\n        cout << \"Area: \" << s->area() << endl;\n    }\n    for (auto* s : shapes)\n        delete s;\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:開放/封閉原則(OCP) — 新增 derived class 無需修改已有程式碼。",
                "en": "Pro: Open/Closed Principle — add new derived classes without modifying existing code."
              },
              {
                "zh": "優點:統一介面 — 透過 base pointer/reference 操作異質物件集合。",
                "en": "Pro: uniform interface — operate on heterogeneous collections through base pointers/references."
              },
              {
                "zh": "缺點:虛擬呼叫的 vptr 間接存取可能阻礙內聯優化,影響高頻路徑效能。",
                "en": "Con: vptr indirection may inhibit inlining, impacting performance on hot paths."
              },
              {
                "zh": "缺點:每個物件增加一個 vptr(通常 8 bytes),每個類別有一張 vtable。",
                "en": "Con: each object grows by one vptr (typically 8 bytes); each class has one vtable."
              },
              {
                "zh": "適用:需要以統一介面處理不同型別的場景,如 GUI widget 繪製、遊戲實體更新。",
                "en": "Use when a unified interface must handle different types, e.g. GUI widget rendering, game entity updates."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "`virtual` 函式 + vtable 實現執行期動態分派:vptr → vtable → 實際函式。",
                "en": "`virtual` functions + vtable implement runtime dispatch: vptr → vtable → actual function."
              },
              {
                "zh": "純虛擬函式(`= 0`)使類別成為抽象介面,強制衍生類別實作。",
                "en": "Pure virtual (`= 0`) makes the class an abstract interface, mandating implementation in derived classes."
              },
              {
                "zh": "每次虛擬呼叫的額外成本僅為兩次指標間接存取,多數場景下微不足道。",
                "en": "Virtual call overhead is just two pointer indirections — negligible in most scenarios."
              },
              {
                "zh": "多型是設計模式(Strategy、Template Method 等)的基礎機制。",
                "en": "Polymorphism underpins many design patterns such as Strategy and Template Method."
              },
              {
                "zh": "對照 Go:虛擬函式是執行期 subtype 動態分派;Go interface 是其「結構化、無繼承」的等價物。",
                "en": "Versus Go: virtual functions are runtime subtype dynamic dispatch; a Go interface is the structural, inheritance-free equivalent."
              }
            ]
          }
        ]
      }
    ]
  },
  "pattern-singleton": {
    "category": "Design Patterns",
    "title": {
      "zh": "Singleton 模式",
      "en": "Singleton Pattern"
    },
    "slides": [
      {
        "heading": {
          "zh": "Singleton 模式",
          "en": "Singleton Pattern"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "Singleton 是一種 Creational 設計模式,確保一個類別在整個程式執行期間只存在唯一一個實例,並提供全域存取點。",
              "en": "Singleton is a Creational design pattern that ensures a class has exactly one instance throughout the program's lifetime and provides a global access point to it."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "以 `private` 建構子防止外部直接建立物件;以 `static` 成員指標儲存唯一實例;透過 `static getInstance()` 實現延遲初始化(lazy initialization),並以 `mutex` 保護執行緒安全。",
              "en": "A `private` constructor prevents external instantiation; a `static` member pointer holds the sole instance; `static getInstance()` implements lazy initialization, protected by a `mutex` for thread safety."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "Private constructor:阻止外部以 `new` 或直接宣告建立物件。",
                "en": "Private constructor: blocks external `new` or direct declarations."
              },
              {
                "zh": "Copy constructor / assignment operator deleted:防止複製產生第二份實例。",
                "en": "Copy constructor / assignment operator deleted: prevents a second copy."
              },
              {
                "zh": "Static member pointer (`m_instance`):指向唯一實例,初始為 `nullptr`。",
                "en": "Static member pointer (`m_instance`): holds the unique instance, initially `nullptr`."
              },
              {
                "zh": "`getInstance()` 搭配 `lock_guard`:以 mutex 鎖保護確保多執行緒首次建立的安全性。",
                "en": "`getInstance()` with `lock_guard`: ensures thread-safe first-time creation."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "第一次呼叫 `Singleton::getInstance()`:進入臨界區,`m_instance == nullptr` 成立,建立唯一實例。",
                "en": "First call to `Singleton::getInstance()`: enters critical section, `m_instance == nullptr` holds, creates the unique instance."
              },
              {
                "zh": "後續呼叫:同樣進入臨界區,但 `m_instance != nullptr`,直接回傳既有指標。",
                "en": "Subsequent calls: enter the critical section but `m_instance != nullptr`, so the existing pointer is returned."
              },
              {
                "zh": "所有呼叫者持有相同指標,對實例的修改對全域可見。",
                "en": "All callers hold the same pointer; modifications to the instance are globally visible."
              },
              {
                "zh": "程式結束時解構子被呼叫,清理單一實例資源。",
                "en": "The destructor is called at program termination, cleaning up the single instance."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  C1[\"Client 1\"] -->|\"getInstance()\"| G{\"m_instance\\n== nullptr?\"}\n  C2[\"Client 2\"] -->|\"getInstance()\"| G\n  G -->|\"Yes: create\"| I[\"Singleton\\nInstance\"]\n  G -->|\"No: return\"| I"
          }
        ]
      },
      {
        "heading": {
          "zh": "UML 結構示意",
          "en": "UML Structure Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 160\" width=\"320\" height=\"160\"><g font-family=\"sans-serif\" font-size=\"12\"><rect x=\"80\" y=\"20\" width=\"160\" height=\"120\" rx=\"4\" fill=\"#dbeafe\" stroke=\"#2563eb\" stroke-width=\"1.5\"/><text x=\"160\" y=\"40\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1e3a8a\">Singleton</text><line x1=\"80\" y1=\"48\" x2=\"240\" y2=\"48\" stroke=\"#2563eb\" stroke-width=\"1\"/><text x=\"90\" y=\"65\" font-size=\"11\" fill=\"#374151\">- static m_instance: Singleton*</text><text x=\"90\" y=\"80\" font-size=\"11\" fill=\"#374151\">- static m_mutex: mutex</text><text x=\"90\" y=\"95\" font-size=\"11\" fill=\"#374151\">- m_value: int</text><line x1=\"80\" y1=\"100\" x2=\"240\" y2=\"100\" stroke=\"#2563eb\" stroke-width=\"1\"/><text x=\"90\" y=\"115\" font-size=\"11\" fill=\"#374151\">+ static getInstance(): Singleton*</text><text x=\"90\" y=\"130\" font-size=\"11\" fill=\"#374151\">- Singleton() [private ctor]</text><text x=\"160\" y=\"155\" text-anchor=\"middle\" font-size=\"10\" fill=\"#6b7280\">Copy ctor &amp; operator= deleted</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "`m_instance` 與 `m_mutex` 為 static 成員,儲存於靜態記憶體區,所有呼叫者共用。`getInstance()` 是唯一合法的建立/取得入口。",
              "en": "`m_instance` and `m_mutex` are static members in the static data segment, shared across all callers. `getInstance()` is the only legal creation/access point."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "模式屬性",
          "en": "Pattern Properties"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "屬性",
                "en": "Property"
              },
              {
                "zh": "說明",
                "en": "Description"
              }
            ],
            "rows": [
              [
                {
                  "zh": "GoF 分類",
                  "en": "GoF Category"
                },
                {
                  "zh": "Creational(創建型)",
                  "en": "Creational"
                }
              ],
              [
                {
                  "zh": "參與者",
                  "en": "Participants"
                },
                {
                  "zh": "Singleton 類別本身",
                  "en": "Singleton class itself"
                }
              ],
              [
                {
                  "zh": "意圖",
                  "en": "Intent"
                },
                {
                  "zh": "確保唯一實例並提供全域存取點",
                  "en": "Ensure one instance and provide global access"
                }
              ],
              [
                {
                  "zh": "初始化時機",
                  "en": "Initialization"
                },
                {
                  "zh": "延遲初始化(首次呼叫時)",
                  "en": "Lazy (on first call)"
                }
              ],
              [
                {
                  "zh": "執行緒安全",
                  "en": "Thread Safety"
                },
                {
                  "zh": "需以 mutex 保護",
                  "en": "Requires mutex protection"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "|\\{\\text{instances of } C\\}| = 1",
            "caption": {
              "zh": "Singleton 的核心不變式:類別 $C$ 的實例集合大小恆等於 1。",
              "en": "Core Singleton invariant: the set of instances of class $C$ always has exactly one element."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "class Singleton {\nprivate:\n    static Singleton* m_instance;\n    static mutex m_mutex;\n    int m_value;\n\n    Singleton() : m_value(0) {}\n\npublic:\n    Singleton(const Singleton&) = delete;\n    Singleton& operator=(const Singleton&) = delete;\n\n    static Singleton* getInstance() {\n        lock_guard<mutex> lock(m_mutex);\n        if (m_instance == nullptr) {\n            m_instance = new Singleton();\n        }\n        return m_instance;\n    }\n\n    void setValue(int val) { m_value = val; }\n    int getValue() const { return m_value; }\n};\n\nSingleton* Singleton::m_instance = nullptr;\nmutex Singleton::m_mutex;\n\nint main() {\n    Singleton* s1 = Singleton::getInstance();\n    s1->setValue(42);\n    Singleton* s2 = Singleton::getInstance();\n    cout << (s1 == s2 ? \"Same\" : \"Different\") << endl; // Same\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:保證全域唯一實例,避免多份物件的資源競爭或狀態不一致。",
                "en": "Pro: guarantees a single global instance, avoiding resource conflicts or inconsistent state from multiple objects."
              },
              {
                "zh": "優點:延遲初始化節省資源,僅在真正需要時建立。",
                "en": "Pro: lazy initialization saves resources; the object is created only when first needed."
              },
              {
                "zh": "缺點:全域狀態使單元測試困難,需注意測試間的狀態污染。",
                "en": "Con: global state makes unit testing harder; watch for state leakage between tests."
              },
              {
                "zh": "缺點:隱藏依賴關係,違反顯式依賴原則(Explicit Dependency Principle)。",
                "en": "Con: hides dependencies, violating the Explicit Dependency Principle."
              },
              {
                "zh": "適用:Logger、設定管理器(Configuration manager)、資料庫連線池等需唯一實例的場景。",
                "en": "Use for Logger, Configuration manager, Database connection pool — scenarios requiring a single shared instance."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "Singleton 是 Creational 模式:以 private constructor + static getInstance() 確保唯一實例。",
                "en": "Singleton is a Creational pattern: private constructor + static getInstance() ensures a single instance."
              },
              {
                "zh": "延遲初始化 + mutex 保護是多執行緒環境的標準做法。",
                "en": "Lazy initialization + mutex protection is the standard approach in multi-threaded environments."
              },
              {
                "zh": "複製建構子與賦值運算子須明確 delete,防止意外複製。",
                "en": "Copy constructor and assignment operator must be explicitly deleted to prevent accidental copies."
              },
              {
                "zh": "謹慎使用全域狀態;現代 C++ 推薦以 Meyers Singleton(static local variable)取代裸指標版本。",
                "en": "Use global state cautiously; modern C++ favours the Meyers Singleton (static local variable) over raw pointer."
              }
            ]
          }
        ]
      }
    ]
  },
  "pattern-factory": {
    "category": "Design Patterns",
    "title": {
      "zh": "Factory Method 模式",
      "en": "Factory Method Pattern"
    },
    "slides": [
      {
        "heading": {
          "zh": "Factory Method 模式",
          "en": "Factory Method Pattern"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "本範例示範的是 Simple Factory 變體——以一個 `VehicleFactory` 類別提供靜態方法 `createVehicle()`,根據型別字串集中建立物件。注意:GoF 正式的 Factory Method 模式不同:它定義抽象 `Creator` 類別並宣告工廠方法,由各 `ConcreteCreator` 子類別覆寫以決定實例化哪個產品,無需 if/else 分支。Simple Factory 雖不在 GoF 23 種之列,卻是入門理解工廠概念的好起點。",
              "en": "This example demonstrates the Simple Factory variant — a single `VehicleFactory` class with a static `createVehicle()` method that centralises object creation by branching on a type string. Note: the canonical GoF Factory Method pattern is different — it defines an abstract `Creator` class with a factory method overridden by each `ConcreteCreator` subclass to decide which product to instantiate, with no if/else branching needed. Simple Factory is not among the GoF 23 patterns, but is a useful starting point for understanding the factory concept."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "`VehicleFactory::createVehicle()` 接受型別字串,回傳抽象 `Vehicle*`。客戶端只知道 `Vehicle` 介面,不知道 `Car`/`Truck`/`Bike` 的具體建構細節。",
              "en": "`VehicleFactory::createVehicle()` takes a type string and returns an abstract `Vehicle*`. The client knows only the `Vehicle` interface, not the concrete construction details of `Car`, `Truck`, or `Bike`."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "【Simple Factory】單一 `VehicleFactory` 持有所有建立邏輯,以靜態方法根據字串分支建立產品——這是 Simple Factory,非 GoF Factory Method。",
                "en": "[Simple Factory] A single `VehicleFactory` holds all creation logic; a static method branches on a string — this is Simple Factory, not GoF Factory Method."
              },
              {
                "zh": "Abstract Product(`Vehicle`):定義所有具體產品須實作的介面(`display()`)。",
                "en": "Abstract Product (`Vehicle`): defines the interface (`display()`) that all concrete products must implement."
              },
              {
                "zh": "Concrete Products(`Car`, `Truck`, `Bike`):各自實作 `display()`。",
                "en": "Concrete Products (`Car`, `Truck`, `Bike`): each implements `display()` differently."
              },
              {
                "zh": "Factory(`VehicleFactory`):提供靜態工廠方法,集中封裝建立邏輯。",
                "en": "Factory (`VehicleFactory`): provides a static factory method that centralises creation logic."
              },
              {
                "zh": "`unique_ptr<Vehicle>`:確保資源安全、自動釋放。",
                "en": "`unique_ptr<Vehicle>`: ensures resource safety and automatic deallocation."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "客戶端呼叫 `VehicleFactory::createVehicle(\"car\")`。",
                "en": "Client calls `VehicleFactory::createVehicle(\"car\")`."
              },
              {
                "zh": "工廠方法根據型別字串決定實例化 `Car`、`Truck` 還是 `Bike`。",
                "en": "The factory method decides whether to instantiate `Car`, `Truck`, or `Bike` based on the type string."
              },
              {
                "zh": "回傳 `unique_ptr<Vehicle>`,客戶端以 `Vehicle` 介面操作物件,呼叫 `display()`。",
                "en": "Returns `unique_ptr<Vehicle>`; the client operates on the object through the `Vehicle` interface, calling `display()`."
              },
              {
                "zh": "新增產品時只需修改工廠方法,客戶端無需變動。",
                "en": "Adding a new product requires only modifying the factory method; client code stays unchanged."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  Client -->|\"createVehicle(type)\"| F[\"VehicleFactory\"]\n  F -->|\"type=car\"| Car\n  F -->|\"type=truck\"| Truck\n  F -->|\"type=bike\"| Bike\n  Car -->|implements| V[\"Vehicle interface\"]\n  Truck -->|implements| V\n  Bike -->|implements| V"
          }
        ]
      },
      {
        "heading": {
          "zh": "UML 結構示意",
          "en": "UML Structure Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 180\" width=\"380\" height=\"180\"><g font-family=\"sans-serif\" font-size=\"11\"><rect x=\"140\" y=\"10\" width=\"110\" height=\"40\" rx=\"4\" fill=\"#dbeafe\" stroke=\"#2563eb\" stroke-width=\"1.5\"/><text x=\"195\" y=\"27\" text-anchor=\"middle\" font-weight=\"bold\" font-style=\"italic\" fill=\"#1e3a8a\">Vehicle</text><text x=\"195\" y=\"43\" text-anchor=\"middle\" fill=\"#374151\">+ display() = 0</text><rect x=\"20\" y=\"100\" width=\"90\" height=\"35\" rx=\"4\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"1.5\"/><text x=\"65\" y=\"121\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#166534\">Car</text><rect x=\"150\" y=\"100\" width=\"90\" height=\"35\" rx=\"4\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"1.5\"/><text x=\"195\" y=\"121\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#166534\">Truck</text><rect x=\"280\" y=\"100\" width=\"90\" height=\"35\" rx=\"4\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"1.5\"/><text x=\"325\" y=\"121\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#166534\">Bike</text><line x1=\"65\" y1=\"100\" x2=\"175\" y2=\"52\" stroke=\"#64748b\" stroke-width=\"1.5\" stroke-dasharray=\"4,3\"/><line x1=\"195\" y1=\"100\" x2=\"195\" y2=\"52\" stroke=\"#64748b\" stroke-width=\"1.5\" stroke-dasharray=\"4,3\"/><line x1=\"325\" y1=\"100\" x2=\"215\" y2=\"52\" stroke=\"#64748b\" stroke-width=\"1.5\" stroke-dasharray=\"4,3\"/><rect x=\"130\" y=\"155\" width=\"130\" height=\"20\" rx=\"3\" fill=\"#fef9c3\" stroke=\"#ca8a04\" stroke-width=\"1\"/><text x=\"195\" y=\"169\" text-anchor=\"middle\" fill=\"#92400e\">VehicleFactory::createVehicle()</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "虛線箭頭表示「實作(implements)」關係:所有 Concrete Products 都實作 `Vehicle` 抽象介面。工廠方法封裝物件建立,客戶端僅依賴 `Vehicle`。",
              "en": "Dashed arrows indicate the \"implements\" relationship: all Concrete Products implement the `Vehicle` abstract interface. The factory method encapsulates creation; the client depends only on `Vehicle`."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "模式屬性",
          "en": "Pattern Properties"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "屬性",
                "en": "Property"
              },
              {
                "zh": "說明",
                "en": "Description"
              }
            ],
            "rows": [
              [
                {
                  "zh": "GoF 分類",
                  "en": "GoF Category"
                },
                {
                  "zh": "Creational(創建型)",
                  "en": "Creational"
                }
              ],
              [
                {
                  "zh": "參與者",
                  "en": "Participants"
                },
                {
                  "zh": "Product(`Vehicle`), ConcreteProduct(`Car`/`Truck`/`Bike`), Factory(`VehicleFactory`，Simple Factory 無 ConcreteCreator 子類別層級)",
                  "en": "Product (`Vehicle`), ConcreteProduct (`Car`/`Truck`/`Bike`), Factory (`VehicleFactory`; Simple Factory — no ConcreteCreator subclass hierarchy as in GoF Factory Method)"
                }
              ],
              [
                {
                  "zh": "意圖",
                  "en": "Intent"
                },
                {
                  "zh": "封裝物件建立邏輯,依賴抽象而非具體",
                  "en": "Encapsulate object creation; depend on abstraction"
                }
              ],
              [
                {
                  "zh": "協作方式",
                  "en": "Collaboration"
                },
                {
                  "zh": "Client → Factory → ConcreteProduct → Product interface",
                  "en": "Client → Factory → ConcreteProduct → Product interface"
                }
              ],
              [
                {
                  "zh": "擴展性",
                  "en": "Extensibility"
                },
                {
                  "zh": "新增產品只改工廠,符合 Open/Closed Principle",
                  "en": "New products only need factory changes; follows OCP"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "\\text{Client} \\to \\text{Factory} \\xrightarrow{\\text{returns}} \\text{Product}^*",
            "caption": {
              "zh": "客戶端透過 Factory 取得 Product 的抽象指標,實際型別在工廠內部決定,客戶端無感知。",
              "en": "The client receives an abstract Product pointer from the Factory; the concrete type is decided inside the factory, invisible to the client."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "class Vehicle {\npublic:\n    virtual ~Vehicle() {}\n    virtual void display() const = 0;\n};\n\nclass Car : public Vehicle {\npublic:\n    void display() const override { cout << \"[Car] V6 sedan\" << endl; }\n};\n\nclass Truck : public Vehicle {\npublic:\n    void display() const override { cout << \"[Truck] Diesel cargo\" << endl; }\n};\n\nclass Bike : public Vehicle {\npublic:\n    void display() const override { cout << \"[Bike] 2 wheels, Gasoline\" << endl; }\n};\n\nclass VehicleFactory {\npublic:\n    static unique_ptr<Vehicle> createVehicle(const string& type) {\n        if (type == \"car\")\n            return make_unique<Car>();\n        if (type == \"truck\")\n            return make_unique<Truck>();\n        if (type == \"bike\")\n            return make_unique<Bike>();\n        return nullptr;\n    }\n};\n\nint main() {\n    auto v = VehicleFactory::createVehicle(\"bike\");\n    if (v)\n        v->display(); // [Bike] 2 wheels, Gasoline\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:客戶端與具體類別解耦,降低修改範圍。",
                "en": "Pro: client is decoupled from concrete classes, reducing the scope of changes."
              },
              {
                "zh": "優點:新增產品只需修改工廠一處,符合 Open/Closed Principle。",
                "en": "Pro: adding a product requires only one change in the factory, following the Open/Closed Principle."
              },
              {
                "zh": "優點:便於替換或模擬(mock)具體產品,提升可測試性。",
                "en": "Pro: easy to substitute or mock concrete products, improving testability."
              },
              {
                "zh": "缺點:每新增一種產品都需要新的 ConcreteProduct 類別,類別數量增多。",
                "en": "Con: each new product requires a new ConcreteProduct class, increasing class count."
              },
              {
                "zh": "適用:資料庫驅動程式選擇、UI 元件建立、外掛系統等需依型別動態建立物件的場景。",
                "en": "Use for database driver selection, UI element creation, plug-in systems — any scenario requiring type-based dynamic object creation."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "Factory Method 是 Creational 模式:以工廠方法封裝 new,讓客戶端依賴抽象 Product 介面。",
                "en": "Factory Method is a Creational pattern: encapsulates `new` in a factory method so the client depends on the abstract Product interface."
              },
              {
                "zh": "參與者:Product(抽象)、ConcreteProduct(具體)、Factory(工廠方法)。",
                "en": "Participants: Product (abstract), ConcreteProduct (concrete), Factory (factory method)."
              },
              {
                "zh": "使用 `unique_ptr` 回傳多型指標,兼顧安全與抽象。",
                "en": "Returning `unique_ptr` to a polymorphic pointer combines safety with abstraction."
              },
              {
                "zh": "擴展時遵循 OCP:新增 ConcreteProduct,修改 Factory,其他程式碼不變。",
                "en": "Extension follows OCP: add a ConcreteProduct, modify the Factory, leave all other code unchanged."
              }
            ]
          }
        ]
      }
    ]
  },
  "pattern-adapter": {
    "category": "Design Patterns",
    "title": {
      "zh": "Adapter 模式",
      "en": "Adapter Pattern"
    },
    "slides": [
      {
        "heading": {
          "zh": "Adapter 模式",
          "en": "Adapter Pattern"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "Adapter 是一種 Structural 設計模式,將一個類別的介面轉換成客戶端期望的另一種介面,使原本因介面不相容而無法合作的類別能夠協同工作。",
              "en": "Adapter is a Structural design pattern that converts the interface of a class into another interface clients expect, enabling classes with incompatible interfaces to work together."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "`LegacyAdapter` 實作新的 `ModernDataInterface`,內部持有 `LegacyDataSource` 物件;將客戶端對 `fetch()` 的呼叫翻譯為對 `getDataLegacy()` 的呼叫,屏蔽舊介面的差異。",
              "en": "`LegacyAdapter` implements the new `ModernDataInterface` while holding a `LegacyDataSource` internally; it translates client calls to `fetch()` into `getDataLegacy()` calls, hiding the old interface's differences."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "Target interface(`ModernDataInterface`):客戶端期望使用的介面。",
                "en": "Target interface (`ModernDataInterface`): the interface the client expects to use."
              },
              {
                "zh": "Adaptee(`LegacyDataSource`):存在不相容介面的既有類別。",
                "en": "Adaptee (`LegacyDataSource`): the existing class with the incompatible interface."
              },
              {
                "zh": "Adapter(`LegacyAdapter`):實作 Target,內部以組合(composition)持有 Adaptee。",
                "en": "Adapter (`LegacyAdapter`): implements Target and holds the Adaptee via composition."
              },
              {
                "zh": "客戶端程式碼完全不知道 Adaptee 的存在,僅與 Target 介面互動。",
                "en": "Client code is entirely unaware of the Adaptee; it interacts only with the Target interface."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "客戶端持有 `ModernDataInterface*` 指標,呼叫 `fetch()`。",
                "en": "Client holds a `ModernDataInterface*` pointer and calls `fetch()`."
              },
              {
                "zh": "`LegacyAdapter::fetch()` 被呼叫,內部呼叫 `m_legacy.getDataLegacy()`。",
                "en": "`LegacyAdapter::fetch()` is called; internally it calls `m_legacy.getDataLegacy()`."
              },
              {
                "zh": "Adapter 對回傳值做必要的轉換(如格式轉換、前綴加工)後回傳。",
                "en": "The Adapter performs any necessary conversion (e.g. format transform, prefix processing) and returns the result."
              },
              {
                "zh": "客戶端取得符合 Target 介面規格的資料,感知不到舊系統的存在。",
                "en": "The client receives data conforming to the Target interface spec, with no awareness of the legacy system."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  Client -->|\"fetch()\"| A[\"LegacyAdapter\\nimplements ModernDataInterface\"]\n  A -->|\"getDataLegacy()\"| L[\"LegacyDataSource\"]\n  L -->|\"raw data\"| A\n  A -->|\"adapted data\"| Client"
          }
        ]
      },
      {
        "heading": {
          "zh": "UML 結構示意",
          "en": "UML Structure Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 160\" width=\"400\" height=\"160\"><g font-family=\"sans-serif\" font-size=\"11\"><rect x=\"10\" y=\"55\" width=\"80\" height=\"35\" rx=\"4\" fill=\"#f3f4f6\" stroke=\"#6b7280\" stroke-width=\"1.5\"/><text x=\"50\" y=\"75\" text-anchor=\"middle\" font-weight=\"bold\">Client</text><rect x=\"130\" y=\"10\" width=\"130\" height=\"45\" rx=\"4\" fill=\"#dbeafe\" stroke=\"#2563eb\" stroke-width=\"1.5\"/><text x=\"195\" y=\"28\" text-anchor=\"middle\" font-weight=\"bold\" font-style=\"italic\" fill=\"#1e3a8a\">ModernDataInterface</text><text x=\"195\" y=\"44\" text-anchor=\"middle\" fill=\"#374151\">+ fetch()</text><text x=\"195\" y=\"55\" text-anchor=\"middle\" fill=\"#374151\">+ getFormat()</text><rect x=\"130\" y=\"95\" width=\"130\" height=\"55\" rx=\"4\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"1.5\"/><text x=\"195\" y=\"113\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#166534\">LegacyAdapter</text><text x=\"195\" y=\"128\" text-anchor=\"middle\" fill=\"#374151\">+ fetch()</text><text x=\"195\" y=\"143\" text-anchor=\"middle\" fill=\"#374151\">+ getFormat()</text><rect x=\"300\" y=\"55\" width=\"90\" height=\"35\" rx=\"4\" fill=\"#fef9c3\" stroke=\"#ca8a04\" stroke-width=\"1.5\"/><text x=\"345\" y=\"72\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#92400e\">LegacyData</text><text x=\"345\" y=\"84\" text-anchor=\"middle\" fill=\"#374151\">Source</text><line x1=\"90\" y1=\"72\" x2=\"130\" y2=\"35\" stroke=\"#6b7280\" stroke-width=\"1.5\"/><line x1=\"195\" y1=\"55\" x2=\"195\" y2=\"95\" stroke=\"#2563eb\" stroke-width=\"1.5\" stroke-dasharray=\"4,3\"/><line x1=\"260\" y1=\"122\" x2=\"300\" y2=\"72\" stroke=\"#16a34a\" stroke-width=\"1.5\"/><text x=\"280\" y=\"105\" font-size=\"10\" fill=\"#6b7280\">uses</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "Adapter(Object Adapter 模式)以組合持有 Adaptee,比繼承更靈活。Adapter 實作 Target 介面,客戶端透過 Target 指標操作,完全不知 Adaptee 的存在。",
              "en": "The Adapter (Object Adapter variant) holds the Adaptee via composition, which is more flexible than inheritance. The Adapter implements the Target interface; the client operates through the Target pointer with no knowledge of the Adaptee."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "模式屬性",
          "en": "Pattern Properties"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "屬性",
                "en": "Property"
              },
              {
                "zh": "說明",
                "en": "Description"
              }
            ],
            "rows": [
              [
                {
                  "zh": "GoF 分類",
                  "en": "GoF Category"
                },
                {
                  "zh": "Structural(結構型)",
                  "en": "Structural"
                }
              ],
              [
                {
                  "zh": "參與者",
                  "en": "Participants"
                },
                {
                  "zh": "Target, Adaptee, Adapter, Client",
                  "en": "Target, Adaptee, Adapter, Client"
                }
              ],
              [
                {
                  "zh": "意圖",
                  "en": "Intent"
                },
                {
                  "zh": "轉換介面以消除不相容",
                  "en": "Convert interface to remove incompatibility"
                }
              ],
              [
                {
                  "zh": "組合形式",
                  "en": "Composition Form"
                },
                {
                  "zh": "Object Adapter(組合) vs Class Adapter(多重繼承)",
                  "en": "Object Adapter (composition) vs Class Adapter (multiple inheritance)"
                }
              ],
              [
                {
                  "zh": "執行期開銷",
                  "en": "Runtime Cost"
                },
                {
                  "zh": "一層額外的間接呼叫",
                  "en": "One level of extra indirection"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "\\text{Adapter}: \\text{Target}^* \\xrightarrow{\\text{wraps}} \\text{Adaptee}",
            "caption": {
              "zh": "Adapter 包裝(wrap)Adaptee,向外提供 Target 介面——一層薄薄的橋接轉換。",
              "en": "The Adapter wraps the Adaptee and exposes the Target interface outward — a thin bridging transformation."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "class LegacyDataSource {\npublic:\n    string getDataLegacy() const { return \"Legacy: Raw Binary Data [0x1A, 0x2B]\"; }\n};\n\nclass ModernDataInterface {\npublic:\n    virtual ~ModernDataInterface() {}\n    virtual string fetch() = 0;\n    virtual string getFormat() = 0;\n};\n\nclass LegacyAdapter : public ModernDataInterface {\nprivate:\n    LegacyDataSource m_legacy;\n\npublic:\n    string fetch() override { return \"Adapted: \" + m_legacy.getDataLegacy(); }\n    string getFormat() override { return \"Binary adapted to JSON\"; }\n};\n\nint main() {\n    unique_ptr<ModernDataInterface> adapter = make_unique<LegacyAdapter>();\n    cout << adapter->fetch() << endl;\n    cout << adapter->getFormat() << endl;\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:無需修改既有類別即可整合,對 Adaptee 零侵入。",
                "en": "Pro: integrates existing classes without modification — zero intrusion to the Adaptee."
              },
              {
                "zh": "優點:有助於遺留系統整合、第三方函式庫接入,降低耦合。",
                "en": "Pro: facilitates legacy system integration and third-party library adoption, reducing coupling."
              },
              {
                "zh": "缺點:如果需要適配的方法很多,Adapter 程式碼可能相當冗長。",
                "en": "Con: if many methods need adapting, the Adapter code can become quite verbose."
              },
              {
                "zh": "缺點:額外增加一層間接呼叫,雖通常可忽略,但高頻路徑需注意。",
                "en": "Con: adds an extra indirection layer; usually negligible, but worth noting on hot paths."
              },
              {
                "zh": "適用:整合舊系統或第三方函式庫、API 版本遷移、系統間橋接。",
                "en": "Use when integrating legacy systems or third-party libraries, migrating API versions, or bridging between systems."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "Adapter 是 Structural 模式:以包裝(wrap)方式消除介面不相容,保護現有程式碼不被修改。",
                "en": "Adapter is a Structural pattern: eliminates interface incompatibility by wrapping, protecting existing code from modification."
              },
              {
                "zh": "參與者:Target(期望介面)、Adaptee(既有介面)、Adapter(橋接包裝)、Client。",
                "en": "Participants: Target (desired interface), Adaptee (existing interface), Adapter (bridging wrapper), Client."
              },
              {
                "zh": "Object Adapter 以組合持有 Adaptee,靈活且不受 C++ 多重繼承的限制。",
                "en": "Object Adapter holds the Adaptee via composition — flexible and not constrained by C++ multiple inheritance."
              },
              {
                "zh": "執行期代價僅一層間接呼叫,透明度高,是遺留整合的首選模式。",
                "en": "Runtime cost is just one indirection — highly transparent and the preferred pattern for legacy integration."
              }
            ]
          }
        ]
      }
    ]
  },
  "pattern-decorator": {
    "category": "Design Patterns",
    "title": {
      "zh": "Decorator 模式",
      "en": "Decorator Pattern"
    },
    "slides": [
      {
        "heading": {
          "zh": "Decorator 模式",
          "en": "Decorator Pattern"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "Decorator 是一種 Structural 設計模式,動態地為物件附加額外職責,提供比繼承更靈活的功能擴展方式——裝飾者與被裝飾者實作相同介面,可任意鏈式組合。",
              "en": "Decorator is a Structural design pattern that dynamically attaches additional responsibilities to an object. By sharing the same interface between decorator and decorated object, responsibilities can be chained in any combination — more flexible than inheritance."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "`Coffee` 介面是共用合約。`SimpleCoffee` 是基本實作。`CoffeeDecorator` 持有 `shared_ptr<Coffee>` 並實作相同介面,以組合包裝並委派呼叫,再疊加自己的行為。",
              "en": "The `Coffee` interface is the shared contract. `SimpleCoffee` is the base implementation. `CoffeeDecorator` holds a `shared_ptr<Coffee>` and implements the same interface, delegating calls to the wrapped object while layering its own behaviour."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "Component interface(`Coffee`):宣告 `getDescription()` 和 `getCost()`。",
                "en": "Component interface (`Coffee`): declares `getDescription()` and `getCost()`."
              },
              {
                "zh": "Concrete Component(`SimpleCoffee`):無裝飾的原始物件。",
                "en": "Concrete Component (`SimpleCoffee`): the original undecorated object."
              },
              {
                "zh": "Decorator base(`CoffeeDecorator`):實作 `Coffee`,持有被包裝物件的指標。",
                "en": "Decorator base (`CoffeeDecorator`): implements `Coffee` and holds a pointer to the wrapped object."
              },
              {
                "zh": "Concrete Decorators(`MilkDecorator`, `SugarDecorator`, `WhippedCreamDecorator`):各自疊加描述與費用。",
                "en": "Concrete Decorators (`MilkDecorator`, `SugarDecorator`, `WhippedCreamDecorator`): each layers its own description and cost."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "建立基本 `SimpleCoffee` 物件(描述:\"Simple Coffee\",費用:2.00 元)。",
                "en": "Create a base `SimpleCoffee` object (description: \"Simple Coffee\", cost: USD 2.00)."
              },
              {
                "zh": "以 `MilkDecorator` 包裝,呼叫 `getDescription()` 回傳 \"Simple Coffee + Milk\",費用增加 0.50 元。",
                "en": "Wrap with `MilkDecorator`: `getDescription()` returns \"Simple Coffee + Milk\", cost adds USD 0.50."
              },
              {
                "zh": "再以 `SugarDecorator` 包裝,描述繼續追加 \"+ Sugar\",費用再加 0.25 元。",
                "en": "Wrap with `SugarDecorator`: description appends \"+ Sugar\", cost adds another USD 0.25."
              },
              {
                "zh": "可繼續疊加任意 Decorator;每次呼叫都透過鏈式委派累積結果。",
                "en": "Any number of decorators can be stacked; each call accumulates results through chained delegation."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  SC[\"SimpleCoffee\\n$2.00\"] -->|wrapped by| M[\"MilkDecorator\\n+$0.50\"]\n  M -->|wrapped by| S[\"SugarDecorator\\n+$0.25\"]\n  S -->|wrapped by| W[\"WhippedCreamDecorator\\n+$0.75\"]\n  W -->|\"getCost() = $3.50\"| R[\"Result\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "UML 結構示意",
          "en": "UML Structure Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 190\" width=\"400\" height=\"190\"><g font-family=\"sans-serif\" font-size=\"11\"><rect x=\"140\" y=\"10\" width=\"120\" height=\"45\" rx=\"4\" fill=\"#dbeafe\" stroke=\"#2563eb\" stroke-width=\"1.5\"/><text x=\"200\" y=\"28\" text-anchor=\"middle\" font-weight=\"bold\" font-style=\"italic\" fill=\"#1e3a8a\">Coffee</text><text x=\"200\" y=\"43\" text-anchor=\"middle\" fill=\"#374151\">+ getDescription()</text><text x=\"200\" y=\"55\" text-anchor=\"middle\" fill=\"#374151\">+ getCost()</text><rect x=\"30\" y=\"95\" width=\"110\" height=\"35\" rx=\"4\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"1.5\"/><text x=\"85\" y=\"116\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#166534\">SimpleCoffee</text><rect x=\"240\" y=\"95\" width=\"130\" height=\"55\" rx=\"4\" fill=\"#fef9c3\" stroke=\"#ca8a04\" stroke-width=\"1.5\"/><text x=\"305\" y=\"113\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#92400e\">CoffeeDecorator</text><text x=\"305\" y=\"128\" text-anchor=\"middle\" fill=\"#374151\">- m_coffee: Coffee*</text><text x=\"305\" y=\"143\" text-anchor=\"middle\" fill=\"#374151\">+ getDescription()</text><line x1=\"85\" y1=\"95\" x2=\"180\" y2=\"57\" stroke=\"#64748b\" stroke-width=\"1.5\" stroke-dasharray=\"4,3\"/><line x1=\"305\" y1=\"95\" x2=\"220\" y2=\"57\" stroke=\"#64748b\" stroke-width=\"1.5\" stroke-dasharray=\"4,3\"/><line x1=\"270\" y1=\"95\" x2=\"220\" y2=\"57\" stroke=\"#ca8a04\" stroke-width=\"1.5\" marker-end=\"url(#arr)\"/><text x=\"225\" y=\"78\" font-size=\"9\" fill=\"#92400e\">holds</text><defs><marker id=\"arr\" markerWidth=\"8\" markerHeight=\"8\" refX=\"6\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L8,3 z\" fill=\"#ca8a04\"/></marker></defs><rect x=\"160\" y=\"165\" width=\"90\" height=\"20\" rx=\"3\" fill=\"#fef9c3\" stroke=\"#ca8a04\" stroke-width=\"1\"/><text x=\"205\" y=\"179\" text-anchor=\"middle\" font-size=\"10\" fill=\"#92400e\">MilkDecorator …</text><line x1=\"305\" y1=\"150\" x2=\"205\" y2=\"165\" stroke=\"#ca8a04\" stroke-width=\"1.2\"/></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "Decorator 與 Component 共用相同介面;Decorator base 持有 Component 指標形成自引用結構。具體裝飾者繼承 Decorator base,疊加行為後委派給內部物件。",
              "en": "Decorator and Component share the same interface; the Decorator base holds a Component pointer forming a self-referential structure. Concrete decorators extend the Decorator base, adding behaviour before delegating to the inner object."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "模式屬性",
          "en": "Pattern Properties"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "屬性",
                "en": "Property"
              },
              {
                "zh": "說明",
                "en": "Description"
              }
            ],
            "rows": [
              [
                {
                  "zh": "GoF 分類",
                  "en": "GoF Category"
                },
                {
                  "zh": "Structural(結構型)",
                  "en": "Structural"
                }
              ],
              [
                {
                  "zh": "參與者",
                  "en": "Participants"
                },
                {
                  "zh": "Component, ConcreteComponent, Decorator, ConcreteDecorator",
                  "en": "Component, ConcreteComponent, Decorator, ConcreteDecorator"
                }
              ],
              [
                {
                  "zh": "意圖",
                  "en": "Intent"
                },
                {
                  "zh": "動態附加職責,比繼承更靈活",
                  "en": "Dynamically attach responsibilities — more flexible than inheritance"
                }
              ],
              [
                {
                  "zh": "鏈式深度 $n$",
                  "en": "Chain depth $n$"
                },
                {
                  "zh": "呼叫時間 $O(n)$,空間 $O(n)$",
                  "en": "Call time $O(n)$, space $O(n)$"
                }
              ],
              [
                {
                  "zh": "原則",
                  "en": "Principle"
                },
                {
                  "zh": "Composition over Inheritance",
                  "en": "Composition over Inheritance"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "\\text{cost}(n) = \\text{cost}_0 + \\sum_{i=1}^{n} \\Delta_i",
            "caption": {
              "zh": "鏈式 Decorator 的總成本等於基本元件成本加上所有裝飾者疊加的增量之和。",
              "en": "The total cost of a decorator chain equals the base component cost plus the sum of all increments added by the decorators."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "class Coffee {\npublic:\n    virtual ~Coffee() {}\n    virtual string getDescription() const = 0;\n    virtual double getCost() const = 0;\n};\n\nclass SimpleCoffee : public Coffee {\npublic:\n    string getDescription() const override { return \"Simple Coffee\"; }\n    double getCost() const override { return 2.00; }\n};\n\nclass CoffeeDecorator : public Coffee {\nprotected:\n    shared_ptr<Coffee> m_coffee;\n\npublic:\n    CoffeeDecorator(shared_ptr<Coffee> c) : m_coffee(c) {}\n};\n\nclass MilkDecorator : public CoffeeDecorator {\npublic:\n    MilkDecorator(shared_ptr<Coffee> c) : CoffeeDecorator(c) {}\n    string getDescription() const override {\n        return m_coffee->getDescription() + \" + Milk\";\n    }\n    double getCost() const override { return m_coffee->getCost() + 0.50; }\n};\n\nint main() {\n    shared_ptr<Coffee> c = make_shared<SimpleCoffee>();\n    c = make_shared<MilkDecorator>(c);\n    cout << c->getDescription() << \" $\" << c->getCost() << endl;\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:執行期動態組合,比繼承子類別更靈活,避免類別爆炸。",
                "en": "Pro: dynamic runtime composition — more flexible than subclassing, avoiding class explosion."
              },
              {
                "zh": "優點:遵循 Single Responsibility Principle,每個 Decorator 只負責一個附加功能。",
                "en": "Pro: follows Single Responsibility Principle — each Decorator handles exactly one added responsibility."
              },
              {
                "zh": "優點:符合 Open/Closed Principle — 新增功能增加 Decorator,不修改既有類別。",
                "en": "Pro: follows Open/Closed Principle — add a new Decorator without modifying existing classes."
              },
              {
                "zh": "缺點:大量小 Decorator 類別使系統結構複雜,除錯時難以追蹤呼叫鏈。",
                "en": "Con: many small Decorator classes complicate the structure and make call-chain tracing during debugging harder."
              },
              {
                "zh": "適用:I/O 串流包裝(如 `BufferedReader`)、GUI 元件裝飾、計費/日誌/認證等橫切關注點。",
                "en": "Use for I/O stream wrapping (e.g. `BufferedReader`), GUI component decoration, billing/logging/auth as cross-cutting concerns."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "Decorator 是 Structural 模式:Decorator 與 Component 共用介面,以組合實現動態職責附加。",
                "en": "Decorator is a Structural pattern: Decorator and Component share an interface; composition enables dynamic responsibility attachment."
              },
              {
                "zh": "鏈式組合($n$ 個 Decorator)的呼叫時間為 $O(n)$。",
                "en": "A chain of $n$ Decorators incurs $O(n)$ call time."
              },
              {
                "zh": "核心原則:Composition over Inheritance — 組合比繼承更靈活且不破壞封裝。",
                "en": "Core principle: Composition over Inheritance — composition is more flexible and preserves encapsulation."
              },
              {
                "zh": "典型應用:C++ `std::istream`/`std::ostream` 家族的各層包裝均採用 Decorator 思想。",
                "en": "Classic use: C++ `std::istream`/`std::ostream` family wrappers all embody the Decorator idea."
              }
            ]
          }
        ]
      }
    ]
  },
  "pattern-observer": {
    "category": "Design Patterns",
    "title": {
      "zh": "Observer 模式",
      "en": "Observer Pattern"
    },
    "slides": [
      {
        "heading": {
          "zh": "Observer 模式",
          "en": "Observer Pattern"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "Observer 是一種 Behavioral 設計模式,定義物件之間的一對多依賴關係——當 Subject(被觀察者)改變狀態時,所有已登錄的 Observer(觀察者)都會自動收到通知並更新。",
              "en": "Observer is a Behavioral design pattern that defines a one-to-many dependency between objects — when the Subject changes state, all registered Observers are automatically notified and updated."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "`Subject` 維護一份 Observer 指標清單;狀態變更時呼叫 `notify()`,逐一觸發各 Observer 的 `update()` 方法。Subject 只知道 `Observer` 抽象介面,與具體觀察者鬆耦合。",
              "en": "`Subject` maintains a list of Observer pointers; on state change it calls `notify()`, which invokes each Observer's `update()` method in turn. The Subject knows only the abstract `Observer` interface — loosely coupled from concrete observers."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "Subject:維護觀察者清單;提供 `attach()`/`detach()` 管理訂閱;以 `setState()` 觸發通知。",
                "en": "Subject: maintains the observer list; provides `attach()`/`detach()` for subscription management; triggers notification via `setState()`."
              },
              {
                "zh": "Observer interface:宣告 `update(message)` 方法,所有具體觀察者必須實作。",
                "en": "Observer interface: declares `update(message)`; all concrete observers must implement it."
              },
              {
                "zh": "Concrete Observers(`ConcreteObserverA/B/C`):各自定義收到通知後的行為。",
                "en": "Concrete Observers (`ConcreteObserverA/B/C`): each defines its own reaction to notifications."
              },
              {
                "zh": "鬆耦合:Subject 不知具體 Observer 型別,可在執行期動態增減訂閱者。",
                "en": "Loose coupling: Subject is unaware of concrete Observer types; subscriptions can be added or removed at runtime."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "呼叫 `subject->attach(obs_a/b/c)`,將三個觀察者加入清單。",
                "en": "Call `subject->attach(obs_a/b/c)` to add the three observers to the list."
              },
              {
                "zh": "呼叫 `subject->setState(\"Event1\")`,觸發內部 `notify()`。",
                "en": "Call `subject->setState(\"Event1\")`, which triggers internal `notify()`."
              },
              {
                "zh": "`notify()` 依序呼叫 `ObserverA::update()`、`ObserverB::update()`、`ObserverC::update()`。",
                "en": "`notify()` calls `ObserverA::update()`, `ObserverB::update()`, `ObserverC::update()` in sequence."
              },
              {
                "zh": "可呼叫 `detach()` 移除訂閱,後續 `setState()` 不再通知已移除者。",
                "en": "`detach()` removes a subscription; subsequent `setState()` calls no longer notify the removed observer."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart TD\n  S[\"Subject\\nsetState()\"] -->|\"notify()\"| A[\"ObserverA\\nupdate()\"]\n  S -->|\"notify()\"| B[\"ObserverB\\nupdate()\"]\n  S -->|\"notify()\"| C[\"ObserverC\\nupdate()\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "UML 結構示意",
          "en": "UML Structure Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 380 190\" width=\"380\" height=\"190\"><g font-family=\"sans-serif\" font-size=\"11\"><rect x=\"20\" y=\"60\" width=\"130\" height=\"65\" rx=\"4\" fill=\"#dbeafe\" stroke=\"#2563eb\" stroke-width=\"1.5\"/><text x=\"85\" y=\"78\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1e3a8a\">Subject</text><text x=\"85\" y=\"93\" text-anchor=\"middle\" fill=\"#374151\">- observers: list</text><text x=\"85\" y=\"108\" text-anchor=\"middle\" fill=\"#374151\">+ attach(Observer*)</text><text x=\"85\" y=\"120\" text-anchor=\"middle\" fill=\"#374151\">+ setState(string)</text><rect x=\"230\" y=\"10\" width=\"130\" height=\"40\" rx=\"4\" fill=\"#dbeafe\" stroke=\"#2563eb\" stroke-width=\"1.5\"/><text x=\"295\" y=\"28\" text-anchor=\"middle\" font-weight=\"bold\" font-style=\"italic\" fill=\"#1e3a8a\">Observer</text><text x=\"295\" y=\"43\" text-anchor=\"middle\" fill=\"#374151\">+ update(string) = 0</text><rect x=\"200\" y=\"100\" width=\"90\" height=\"30\" rx=\"4\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"1.5\"/><text x=\"245\" y=\"119\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#166534\">ObsA</text><rect x=\"300\" y=\"100\" width=\"70\" height=\"30\" rx=\"4\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"1.5\"/><text x=\"335\" y=\"119\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#166534\">ObsB …</text><line x1=\"150\" y1=\"92\" x2=\"230\" y2=\"29\" stroke=\"#6b7280\" stroke-width=\"1.5\" stroke-dasharray=\"4,3\"/><line x1=\"245\" y1=\"100\" x2=\"275\" y2=\"52\" stroke=\"#64748b\" stroke-width=\"1.2\" stroke-dasharray=\"3,3\"/><line x1=\"335\" y1=\"100\" x2=\"310\" y2=\"52\" stroke=\"#64748b\" stroke-width=\"1.2\" stroke-dasharray=\"3,3\"/><text x=\"155\" y=\"75\" font-size=\"10\" fill=\"#6b7280\">notifies</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "Subject 持有 `Observer` 抽象指標清單;具體觀察者實作 `Observer` 介面。Subject 與具體觀察者之間完全鬆耦合,可在執行期動態增減訂閱。",
              "en": "Subject holds a list of abstract `Observer` pointers; concrete observers implement the `Observer` interface. Subject and concrete observers are fully loosely coupled — subscriptions can be managed dynamically at runtime."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "模式屬性",
          "en": "Pattern Properties"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "屬性",
                "en": "Property"
              },
              {
                "zh": "說明",
                "en": "Description"
              }
            ],
            "rows": [
              [
                {
                  "zh": "GoF 分類",
                  "en": "GoF Category"
                },
                {
                  "zh": "Behavioral(行為型)",
                  "en": "Behavioral"
                }
              ],
              [
                {
                  "zh": "參與者",
                  "en": "Participants"
                },
                {
                  "zh": "Subject, Observer, ConcreteObserver",
                  "en": "Subject, Observer, ConcreteObserver"
                }
              ],
              [
                {
                  "zh": "意圖",
                  "en": "Intent"
                },
                {
                  "zh": "一對多依賴:Subject 狀態變更自動通知所有 Observer",
                  "en": "One-to-many dependency: Subject state change auto-notifies all Observers"
                }
              ],
              [
                {
                  "zh": "notify() 時間",
                  "en": "notify() Time"
                },
                {
                  "zh": "$O(n)$ 其中 $n$ 為訂閱者數量",
                  "en": "$O(n)$ where $n$ is the number of subscribers"
                }
              ],
              [
                {
                  "zh": "空間",
                  "en": "Space"
                },
                {
                  "zh": "$O(n)$ 觀察者清單",
                  "en": "$O(n)$ observer list"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "\\text{notify}: T(n) = O(n)",
            "caption": {
              "zh": "`notify()` 線性走訪所有 $n$ 個觀察者並呼叫其 `update()`,時間複雜度為 $O(n)$。",
              "en": "`notify()` linearly traverses all $n$ observers and calls their `update()` — time complexity $O(n)$."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "class Observer {\npublic:\n    virtual ~Observer() {}\n    virtual void update(const string& message) = 0;\n};\n\nclass Subject {\n    vector<shared_ptr<Observer>> m_observers;\n    string m_state;\n\npublic:\n    void attach(shared_ptr<Observer> obs) { m_observers.push_back(obs); }\n    void setState(const string& state) {\n        m_state = state;\n        notify();\n    }\n\nprivate:\n    void notify() {\n        for (auto& obs : m_observers)\n            obs->update(m_state);\n    }\n};\n\nclass ConcreteObserverA : public Observer {\npublic:\n    void update(const string& msg) override {\n        cout << \"ObserverA received: \" << msg << endl;\n    }\n};\n\nint main() {\n    auto subject = make_shared<Subject>();\n    subject->attach(make_shared<ConcreteObserverA>());\n    subject->setState(\"Event1\"); // notifies all observers\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:Subject 與 Observer 鬆耦合,可獨立變動;支援廣播通訊。",
                "en": "Pro: Subject and Observer are loosely coupled, changeable independently; supports broadcast communication."
              },
              {
                "zh": "優點:執行期動態增減訂閱者,靈活應對需求變化。",
                "en": "Pro: subscriptions can be added or removed at runtime, accommodating changing requirements flexibly."
              },
              {
                "zh": "缺點:若觀察者眾多或通知鏈複雜,可能造成意外的連鎖更新與效能問題。",
                "en": "Con: many observers or complex notification chains may cause unexpected cascading updates and performance issues."
              },
              {
                "zh": "缺點:觀察者間順序依賴難以控制,除錯可能困難。",
                "en": "Con: ordering dependencies among observers are hard to control and debug."
              },
              {
                "zh": "適用:事件系統、MVC 模型通知 View 更新、即時通知推播、響應式程式設計。",
                "en": "Use for event systems, MVC model-to-view notifications, real-time push notifications, reactive programming."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "Observer 是 Behavioral 模式:Subject 維護訂閱者清單,狀態變更時逐一廣播通知。",
                "en": "Observer is a Behavioral pattern: Subject maintains a subscriber list and broadcasts state changes to all of them."
              },
              {
                "zh": "一對多依賴 + 鬆耦合:Subject 只依賴抽象 `Observer` 介面。",
                "en": "One-to-many dependency + loose coupling: Subject depends only on the abstract `Observer` interface."
              },
              {
                "zh": "`notify()` 為 $O(n)$;可在執行期動態 `attach`/`detach`。",
                "en": "`notify()` is $O(n)$; `attach`/`detach` can be called dynamically at runtime."
              },
              {
                "zh": "Observer 模式是事件驅動架構與 MVC、響應式框架的核心基礎。",
                "en": "Observer is the core foundation of event-driven architectures, MVC, and reactive frameworks."
              }
            ]
          }
        ]
      }
    ]
  },
  "pattern-strategy": {
    "category": "Design Patterns",
    "title": {
      "zh": "Strategy 模式",
      "en": "Strategy Pattern"
    },
    "slides": [
      {
        "heading": {
          "zh": "Strategy 模式",
          "en": "Strategy Pattern"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "Strategy 是一種 Behavioral 設計模式,定義一組可互換的演算法家族,將每種演算法封裝在獨立類別中,讓演算法的變動獨立於使用它的客戶端。",
              "en": "Strategy is a Behavioral design pattern that defines a family of interchangeable algorithms, encapsulates each one in a separate class, and makes them interchangeable so the algorithm can vary independently from the clients that use it."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "`PaymentStrategy` 是抽象策略介面;`CreditCardPayment`、`CryptoCurrencyPayment`、`PayPalPayment` 是具體策略;`PaymentProcessor` 是 Context,持有策略指標並委派 `pay()` 呼叫。",
              "en": "`PaymentStrategy` is the abstract strategy interface; `CreditCardPayment`, `CryptoCurrencyPayment`, and `PayPalPayment` are concrete strategies; `PaymentProcessor` is the Context, holding a strategy pointer and delegating `pay()` calls."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "Strategy interface(`PaymentStrategy`):定義所有具體策略必須實作的 `pay(amount)` 方法。",
                "en": "Strategy interface (`PaymentStrategy`): defines `pay(amount)` that all concrete strategies must implement."
              },
              {
                "zh": "Concrete Strategies:各自封裝特定的支付邏輯,彼此可互換。",
                "en": "Concrete Strategies: each encapsulates a specific payment algorithm and is interchangeable with the others."
              },
              {
                "zh": "Context(`PaymentProcessor`):持有 `shared_ptr<PaymentStrategy>`;透過 `setStrategy()` 在執行期切換策略。",
                "en": "Context (`PaymentProcessor`): holds `shared_ptr<PaymentStrategy>`; switches strategy at runtime via `setStrategy()`."
              },
              {
                "zh": "Context 不知策略的內部邏輯,只呼叫介面方法 `pay()`,完全委派給具體策略。",
                "en": "Context does not know the strategy's internal logic; it calls only the interface method `pay()`, fully delegating to the concrete strategy."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "建立 `PaymentProcessor`(Context)。",
                "en": "Create a `PaymentProcessor` (Context)."
              },
              {
                "zh": "呼叫 `setStrategy(make_shared<CreditCardPayment>(\"...\"))`,設定信用卡策略。",
                "en": "Call `setStrategy(make_shared<CreditCardPayment>(\"...\"))` to set the credit card strategy."
              },
              {
                "zh": "呼叫 `processPayment(99.99)`,Context 委派給 `CreditCardPayment::pay(99.99)`。",
                "en": "Call `processPayment(99.99)`; the Context delegates to `CreditCardPayment::pay(99.99)`."
              },
              {
                "zh": "再呼叫 `setStrategy(...)` 切換為加密貨幣策略,後續 `processPayment` 自動使用新策略。",
                "en": "Call `setStrategy(...)` again to switch to the cryptocurrency strategy; subsequent `processPayment` calls use the new strategy."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  P[\"PaymentProcessor\\n(Context)\"] -->|\"持有/使用\"| SI[\"PaymentStrategy\\ninterface\"]\n  SI -->|implements| CC[\"CreditCard\\nPayment\"]\n  SI -->|implements| CR[\"CryptoCurrency\\nPayment\"]\n  SI -->|implements| PP[\"PayPal\\nPayment\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "UML 結構示意",
          "en": "UML Structure Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 190\" width=\"400\" height=\"190\"><g font-family=\"sans-serif\" font-size=\"11\"><rect x=\"10\" y=\"70\" width=\"130\" height=\"50\" rx=\"4\" fill=\"#dbeafe\" stroke=\"#2563eb\" stroke-width=\"1.5\"/><text x=\"75\" y=\"88\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1e3a8a\">PaymentProcessor</text><text x=\"75\" y=\"103\" text-anchor=\"middle\" fill=\"#374151\">- strategy: Strategy*</text><text x=\"75\" y=\"116\" text-anchor=\"middle\" fill=\"#374151\">+ setStrategy()</text><rect x=\"200\" y=\"10\" width=\"150\" height=\"40\" rx=\"4\" fill=\"#dbeafe\" stroke=\"#2563eb\" stroke-width=\"1.5\"/><text x=\"275\" y=\"28\" text-anchor=\"middle\" font-weight=\"bold\" font-style=\"italic\" fill=\"#1e3a8a\">PaymentStrategy</text><text x=\"275\" y=\"43\" text-anchor=\"middle\" fill=\"#374151\">+ pay(amount) = 0</text><rect x=\"160\" y=\"110\" width=\"90\" height=\"30\" rx=\"4\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"1.5\"/><text x=\"205\" y=\"128\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#166534\">CreditCard</text><rect x=\"260\" y=\"110\" width=\"90\" height=\"30\" rx=\"4\" fill=\"#dcfce7\" stroke=\"#16a34a\" stroke-width=\"1.5\"/><text x=\"305\" y=\"128\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#166534\">Crypto …</text><rect x=\"200\" y=\"155\" width=\"120\" height=\"25\" rx=\"3\" fill=\"#fef3c7\" stroke=\"#d97706\" stroke-width=\"1\"/><text x=\"260\" y=\"172\" text-anchor=\"middle\" font-size=\"10\" fill=\"#92400e\">PayPalPayment …</text><line x1=\"140\" y1=\"93\" x2=\"200\" y2=\"29\" stroke=\"#6b7280\" stroke-width=\"1.5\" stroke-dasharray=\"4,3\"/><line x1=\"205\" y1=\"110\" x2=\"255\" y2=\"52\" stroke=\"#64748b\" stroke-width=\"1.2\" stroke-dasharray=\"3,3\"/><line x1=\"305\" y1=\"110\" x2=\"290\" y2=\"52\" stroke=\"#64748b\" stroke-width=\"1.2\" stroke-dasharray=\"3,3\"/><text x=\"148\" y=\"68\" font-size=\"10\" fill=\"#6b7280\">uses</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "Context 持有抽象 Strategy 指標;具體策略實作 Strategy 介面。執行期可隨時透過 `setStrategy()` 替換策略,Context 程式碼不需任何修改。",
              "en": "Context holds an abstract Strategy pointer; concrete strategies implement the Strategy interface. The strategy can be swapped at any time via `setStrategy()` without any modification to the Context code."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "模式屬性",
          "en": "Pattern Properties"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "屬性",
                "en": "Property"
              },
              {
                "zh": "說明",
                "en": "Description"
              }
            ],
            "rows": [
              [
                {
                  "zh": "GoF 分類",
                  "en": "GoF Category"
                },
                {
                  "zh": "Behavioral(行為型)",
                  "en": "Behavioral"
                }
              ],
              [
                {
                  "zh": "參與者",
                  "en": "Participants"
                },
                {
                  "zh": "Strategy, ConcreteStrategy, Context",
                  "en": "Strategy, ConcreteStrategy, Context"
                }
              ],
              [
                {
                  "zh": "意圖",
                  "en": "Intent"
                },
                {
                  "zh": "封裝可互換演算法,讓演算法獨立於使用者",
                  "en": "Encapsulate interchangeable algorithms; decouple algorithm from its user"
                }
              ],
              [
                {
                  "zh": "切換時機",
                  "en": "Switching"
                },
                {
                  "zh": "執行期(runtime)動態切換",
                  "en": "Dynamic switch at runtime"
                }
              ],
              [
                {
                  "zh": "原則",
                  "en": "Principle"
                },
                {
                  "zh": "Open/Closed — 新增策略不改 Context",
                  "en": "Open/Closed — new strategy does not change Context"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "\\text{Context.execute()} \\equiv \\text{strategy}\\text{->pay}(\\cdot)",
            "caption": {
              "zh": "Context 的執行完全委派給注入的 Strategy 物件;切換策略等同切換整個演算法行為。",
              "en": "Context execution fully delegates to the injected Strategy object; swapping the strategy swaps the entire algorithm behaviour."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "class PaymentStrategy {\npublic:\n    virtual ~PaymentStrategy() {}\n    virtual void pay(double amount) const = 0;\n};\n\nclass CreditCardPayment : public PaymentStrategy {\n    string m_cardNumber;\n\npublic:\n    CreditCardPayment(const string& num) : m_cardNumber(num) {}\n    void pay(double amount) const override { cout << \"CreditCard: $\" << amount << endl; }\n};\n\nclass PaymentProcessor {\n    shared_ptr<PaymentStrategy> m_strategy;\n\npublic:\n    void setStrategy(shared_ptr<PaymentStrategy> s) { m_strategy = s; }\n    void processPayment(double amount) {\n        if (m_strategy)\n            m_strategy->pay(amount);\n    }\n};\n\nint main() {\n    PaymentProcessor processor;\n    processor.setStrategy(make_shared<CreditCardPayment>(\"1234...\"));\n    processor.processPayment(99.99);\n    // switch strategy at runtime:\n    // processor.setStrategy(make_shared<PayPalPayment>(\"x@y.com\"));\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:消除大量 if-else/switch 判斷,以多型取代條件分支。",
                "en": "Pro: eliminates large if-else/switch chains; replaces conditional branching with polymorphism."
              },
              {
                "zh": "優點:演算法可在執行期動態切換,靈活應對需求。",
                "en": "Pro: algorithms can be switched dynamically at runtime, accommodating changing requirements."
              },
              {
                "zh": "優點:符合 Open/Closed Principle — 新增演算法只需新增 ConcreteStrategy。",
                "en": "Pro: follows Open/Closed Principle — adding a new algorithm only requires a new ConcreteStrategy."
              },
              {
                "zh": "缺點:客戶端需了解各策略差異才能選擇合適的策略。",
                "en": "Con: the client must understand the differences between strategies to choose the right one."
              },
              {
                "zh": "適用:排序演算法選擇、壓縮方法、支付方式、遊戲 AI 行為、路由策略等需執行期切換演算法的場景。",
                "en": "Use for sorting algorithm selection, compression methods, payment methods, game AI behaviour, routing strategies — any scenario requiring runtime algorithm switching."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "Strategy 是 Behavioral 模式:封裝一族可互換演算法,以多型委派取代條件邏輯。",
                "en": "Strategy is a Behavioral pattern: encapsulates a family of interchangeable algorithms, replacing conditional logic with polymorphic delegation."
              },
              {
                "zh": "參與者:Strategy(介面)、ConcreteStrategy(具體演算法)、Context(使用者)。",
                "en": "Participants: Strategy (interface), ConcreteStrategy (concrete algorithm), Context (user)."
              },
              {
                "zh": "執行期可透過 `setStrategy()` 切換演算法,Context 無需任何修改。",
                "en": "The algorithm can be switched at runtime via `setStrategy()` without any modification to the Context."
              },
              {
                "zh": "Strategy 是多型的典型應用,也是 Policy-based design 的核心思想之一。",
                "en": "Strategy is a canonical application of polymorphism and is central to policy-based design."
              }
            ]
          }
        ]
      }
    ]
  },
  "pattern-mvc": {
    "category": "Design Patterns",
    "title": {
      "zh": "MVC 模式",
      "en": "MVC Pattern"
    },
    "slides": [
      {
        "heading": {
          "zh": "MVC（Model-View-Controller）",
          "en": "MVC (Model-View-Controller)"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "MVC 把應用拆成三個角色：Model（資料與狀態）、View（呈現）、Controller（處理輸入），以分離關注點。",
              "en": "MVC splits an application into three roles — Model (data and state), View (presentation), and Controller (input handling) — to separate concerns."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "Controller 接收使用者輸入並更新 Model；Model 改變後通知 View 重新呈現。三者各司其職，可獨立替換與測試。",
              "en": "The Controller receives user input and updates the Model; when the Model changes, the View re-renders. Each role has one job and can be replaced or tested independently."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "Model 不知道 View 或 Controller —— 只管資料與規則。",
                "en": "The Model knows nothing of the View or Controller — it owns data and rules only."
              },
              {
                "zh": "View 只負責呈現，從 Model 讀資料。",
                "en": "The View only renders, reading data from the Model."
              },
              {
                "zh": "Controller 是輸入與更新的協調者。",
                "en": "The Controller coordinates input and updates."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "使用者輸入抵達 Controller。",
                "en": "User input reaches the Controller."
              },
              {
                "zh": "Controller 更新 Model 的資料與狀態。",
                "en": "The Controller updates the Model's data and state."
              },
              {
                "zh": "Model 變更後，View 從 Model 讀取並重新呈現。",
                "en": "After the Model changes, the View reads from it and re-renders."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  U[\"User input\"] --> C[\"Controller\"]\n  C --> M[\"Model\"]\n  M --> V[\"View\"]\n  V --> U"
          }
        ]
      },
      {
        "heading": {
          "zh": "示意圖",
          "en": "Layout"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 150\" width=\"360\"><g font-family=\"monospace\" font-size=\"12\"><rect x=\"120\" y=\"10\" width=\"120\" height=\"34\" fill=\"none\" stroke=\"#f59e0b\"/><text x=\"180\" y=\"31\" text-anchor=\"middle\" fill=\"#f59e0b\">Controller</text><rect x=\"20\" y=\"100\" width=\"120\" height=\"34\" fill=\"none\" stroke=\"#34d399\"/><text x=\"80\" y=\"121\" text-anchor=\"middle\" fill=\"#34d399\">Model</text><rect x=\"220\" y=\"100\" width=\"120\" height=\"34\" fill=\"none\" stroke=\"#60a5fa\"/><text x=\"280\" y=\"121\" text-anchor=\"middle\" fill=\"#60a5fa\">View</text><line x1=\"140\" y1=\"44\" x2=\"80\" y2=\"100\" stroke=\"#64748b\"/><line x1=\"140\" y1=\"117\" x2=\"220\" y2=\"117\" stroke=\"#64748b\"/><line x1=\"280\" y1=\"100\" x2=\"220\" y2=\"44\" stroke=\"#64748b\"/></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "visualizer 以三角佈局呈現：Controller 在上，Model 與 View 在下，連線標示 updates / notifies / user input 三種關係。",
              "en": "The visualizer uses a triangle layout: Controller on top, Model and View below, with connectors labelled updates / notifies / user input."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "取捨與使用時機",
          "en": "Trade-offs & When to Use"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "面向",
                "en": "Aspect"
              },
              {
                "zh": "說明",
                "en": "Notes"
              }
            ],
            "rows": [
              [
                {
                  "zh": "關注點分離",
                  "en": "Separation of concerns"
                },
                {
                  "zh": "資料、呈現、輸入各自獨立",
                  "en": "Data, presentation, input are independent"
                }
              ],
              [
                {
                  "zh": "可測試性",
                  "en": "Testability"
                },
                {
                  "zh": "Model 可不靠 UI 單獨測試",
                  "en": "The Model can be tested without a UI"
                }
              ],
              [
                {
                  "zh": "成本",
                  "en": "Cost"
                },
                {
                  "zh": "小程式會顯得過度設計",
                  "en": "Overkill for very small programs"
                }
              ]
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "class Controller {\n    Model& model;\n    View& view;\n\npublic:\n    Controller(Model& m, View& v) : model(m), view(v) {}\n    void handleInput(const string& input) {\n        model.setData(input);\n        view.render(model);\n    }\n};"
          },
          {
            "type": "note",
            "text": {
              "zh": "此處程式碼為精簡示範：Controller 直接呼叫 view.render()。在完整的 MVC 中，Model 透過觀察者（Observer）機制通知 View 重新呈現。",
              "en": "This code is a minimal illustration — the Controller calls view.render() directly. In full MVC, the Model notifies Views to re-render via the Observer pattern."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點：三個角色可獨立開發、替換、測試。",
                "en": "Pro: the three roles can be developed, replaced, and tested independently."
              },
              {
                "zh": "優點：同一 Model 可搭配多個 View。",
                "en": "Pro: one Model can drive multiple Views."
              },
              {
                "zh": "缺點：角色間的協調對小程式而言是額外負擔。",
                "en": "Con: the coordination between roles is overhead for small programs."
              },
              {
                "zh": "適用：具使用者介面、需長期維護的應用。",
                "en": "Use for applications with a user interface that need long-term maintenance."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "Model / View / Controller 分離資料、呈現、輸入。",
                "en": "Model / View / Controller separate data, presentation, and input."
              },
              {
                "zh": "Controller 更新 Model，Model 通知 View。",
                "en": "The Controller updates the Model; the Model notifies the View."
              },
              {
                "zh": "是 UI 架構的經典基礎，衍生出 MVP、MVVM。",
                "en": "The classic UI-architecture foundation; MVP and MVVM derive from it."
              }
            ]
          }
        ]
      }
    ]
  },
  "pattern-layered": {
    "category": "Design Patterns",
    "title": {
      "zh": "分層架構",
      "en": "Layered Architecture"
    },
    "slides": [
      {
        "heading": {
          "zh": "分層架構",
          "en": "Layered Architecture"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "分層架構將系統組織成水平的層次（呈現層、業務層、資料層）；每一層只能呼叫其正下方的層次，以隔離關注點。",
              "en": "Layered architecture organizes a system into horizontal layers (Presentation, Business, Data); each layer uses only the layer directly below it to separate concerns."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "嚴格的向下依賴：任何層都不得向上呼叫，也不得跨層呼叫。每一層只知道它下方的鄰層，從而確保彼此獨立。",
              "en": "Strict downward dependency — a layer never calls upward or skips a layer. Each layer knows only its immediate neighbor below, keeping layers independent."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "每一層只有一個職責，關注點明確。",
                "en": "Each layer has a single responsibility with a clear focus."
              },
              {
                "zh": "下層不知道上層的存在，耦合度低。",
                "en": "Lower layers are unaware of higher ones, keeping coupling low."
              },
              {
                "zh": "替換某層的實作不會向上波及其他層。",
                "en": "Swapping a layer's implementation doesn't ripple upward to other layers."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "請求從呈現層進入，呈現層負責格式化與顯示。",
                "en": "A request enters at the Presentation layer, which handles formatting and display."
              },
              {
                "zh": "呈現層呼叫業務層；業務層套用規則並驗證資料。",
                "en": "The Presentation layer calls the Business layer, which applies rules and validates data."
              },
              {
                "zh": "業務層呼叫資料層取得原始資料；結果逐層往上回傳。",
                "en": "The Business layer calls the Data layer to retrieve raw data; results flow back up through each layer."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart TD\n  Presentation[\"Presentation\"] --> Business[\"Business\"]\n  Business --> Data[\"Data\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "示意圖",
          "en": "Layout"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 160\" width=\"320\"><g font-family=\"monospace\" font-size=\"12\"><rect x=\"60\" y=\"10\" width=\"200\" height=\"34\" fill=\"none\" stroke=\"#60a5fa\"/><text x=\"160\" y=\"31\" text-anchor=\"middle\" fill=\"#60a5fa\">Presentation</text><line x1=\"160\" y1=\"44\" x2=\"160\" y2=\"63\" stroke=\"#64748b\"/><rect x=\"60\" y=\"63\" width=\"200\" height=\"34\" fill=\"none\" stroke=\"#34d399\"/><text x=\"160\" y=\"84\" text-anchor=\"middle\" fill=\"#34d399\">Business</text><line x1=\"160\" y1=\"97\" x2=\"160\" y2=\"116\" stroke=\"#64748b\"/><rect x=\"60\" y=\"116\" width=\"200\" height=\"34\" fill=\"none\" stroke=\"#f59e0b\"/><text x=\"160\" y=\"137\" text-anchor=\"middle\" fill=\"#f59e0b\">Data</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "visualizer 以縱向堆疊呈現三層：呈現層在上、業務層居中、資料層在下，連線代表「呼叫」關係，由上往下單向流動。",
              "en": "The visualizer stacks the three layers vertically: Presentation on top, Business in the middle, Data at the bottom, with connectors showing the downward \"calls\" relationship."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "取捨與使用時機",
          "en": "Trade-offs & When to Use"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "面向",
                "en": "Aspect"
              },
              {
                "zh": "說明",
                "en": "Notes"
              }
            ],
            "rows": [
              [
                {
                  "zh": "關注點分離與可維護性",
                  "en": "Separation of concerns & maintainability"
                },
                {
                  "zh": "各層職責清晰，易於維護",
                  "en": "Each layer has a clear role, making maintenance straightforward"
                }
              ],
              [
                {
                  "zh": "逐層可測試性",
                  "en": "Per-layer testability"
                },
                {
                  "zh": "可以 mock 下層來單獨測試每一層",
                  "en": "Each layer can be tested in isolation by mocking the layer below"
                }
              ],
              [
                {
                  "zh": "成本",
                  "en": "Cost"
                },
                {
                  "zh": "請求須逐層傳遞；有產生純透傳「沉洞層」的風險",
                  "en": "Requests are passed layer-to-layer; risk of pass-through sinkhole layers"
                }
              ]
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "// Business layer — applies rules; calls only the layer below.\nclass BusinessLayer {\n    DataLayer data;\n\npublic:\n    string process() { return \"[validated] \" + data.fetch(); }\n};\n\n// Presentation layer — formats output; calls only the layer below.\nclass PresentationLayer {\n    BusinessLayer business;\n\npublic:\n    void show() { cout << \"Display: \" << business.process() << endl; }\n};"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點：結構清晰，每一層可獨立維護與測試。",
                "en": "Pro: clear structure; each layer can be independently maintained and tested."
              },
              {
                "zh": "優點：替換某層實作（例如切換資料庫）不影響上層邏輯。",
                "en": "Pro: swapping a layer's implementation (e.g., switching databases) does not affect upper layers."
              },
              {
                "zh": "缺點：請求逐層傳遞，增加間接呼叫的開銷。",
                "en": "Con: extra indirection as requests pass through each layer."
              },
              {
                "zh": "缺點：若中間層無實質邏輯，容易淪為純透傳的「沉洞層」。",
                "en": "Con: risk of pass-through sinkhole layers when intermediate layers add no real logic."
              },
              {
                "zh": "適用：具有清晰水平關注點的商業應用程式（如傳統三層式架構）。",
                "en": "Use for business applications with clear horizontal concerns (e.g., classic 3-tier architecture)."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "分層架構以水平層次組織系統，並施加嚴格的向下依賴規則。",
                "en": "Layered architecture organizes a system into horizontal layers with strict downward dependency."
              },
              {
                "zh": "是經典的 n 層式結構，廣泛用於商業應用與 Web 系統。",
                "en": "It is the classic n-tier structure, widely used in business applications and web systems."
              },
              {
                "zh": "清晰的職責分離使各層可獨立開發、測試與替換。",
                "en": "Clear separation of responsibilities allows each layer to be developed, tested, and replaced independently."
              }
            ]
          }
        ]
      }
    ]
  },
  "pattern-pubsub": {
    "category": "Design Patterns",
    "title": {
      "zh": "發布-訂閱",
      "en": "Publish-Subscribe"
    },
    "slides": [
      {
        "heading": {
          "zh": "發布-訂閱模式",
          "en": "Publish-Subscribe Pattern"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "發布者將事件發送至事件匯流排（broker）；訂閱者從匯流排接收事件——發布者與訂閱者彼此完全不知道對方的存在。",
              "en": "Publishers emit events to an event bus (broker); subscribers receive them from the bus — publishers and subscribers never reference each other."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "事件匯流排是解耦的關鍵：它同時對兩端隱藏了對方。一個事件可以扇出（fan-out）至多個訂閱者；訂閱者可以在執行時期動態新增或移除。",
              "en": "The event bus is the key to decoupling: it hides each side from the other. One event fans out to many subscribers; subscribers can be added or removed at runtime."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "發布者與訂閱者完全解耦，互不依賴。",
                "en": "Publishers and subscribers are fully decoupled — neither depends on the other."
              },
              {
                "zh": "單一事件可同時廣播給多個訂閱者（扇出）。",
                "en": "A single event can be broadcast to multiple subscribers simultaneously (fan-out)."
              },
              {
                "zh": "訂閱者可在執行時期動態新增或移除，彈性高。",
                "en": "Subscribers can be dynamically added or removed at runtime for maximum flexibility."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "訂閱者向事件匯流排註冊處理函式（handler）。",
                "en": "Subscribers register their handler functions with the event bus."
              },
              {
                "zh": "發布者呼叫匯流排的 publish() 方法，傳入事件資料。",
                "en": "A publisher calls the bus's publish() method with the event data."
              },
              {
                "zh": "匯流排依序呼叫所有已註冊的處理函式，完成事件派送。",
                "en": "The bus invokes every registered handler in sequence, completing the event dispatch."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  Publisher[\"Publisher\"] --> EventBus[\"EventBus\"]\n  EventBus --> SubscriberA[\"SubscriberA\"]\n  EventBus --> SubscriberB[\"SubscriberB\"]\n  EventBus --> SubscriberC[\"SubscriberC\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "示意圖",
          "en": "Layout"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 160\" width=\"400\"><g font-family=\"monospace\" font-size=\"12\"><rect x=\"10\" y=\"63\" width=\"90\" height=\"34\" fill=\"none\" stroke=\"#f59e0b\"/><text x=\"55\" y=\"84\" text-anchor=\"middle\" fill=\"#f59e0b\">Publisher</text><line x1=\"100\" y1=\"80\" x2=\"150\" y2=\"80\" stroke=\"#64748b\"/><rect x=\"150\" y=\"63\" width=\"90\" height=\"34\" fill=\"none\" stroke=\"#60a5fa\"/><text x=\"195\" y=\"84\" text-anchor=\"middle\" fill=\"#60a5fa\">EventBus</text><line x1=\"240\" y1=\"80\" x2=\"290\" y2=\"30\" stroke=\"#64748b\"/><line x1=\"240\" y1=\"80\" x2=\"290\" y2=\"80\" stroke=\"#64748b\"/><line x1=\"240\" y1=\"80\" x2=\"290\" y2=\"130\" stroke=\"#64748b\"/><rect x=\"290\" y=\"13\" width=\"100\" height=\"34\" fill=\"none\" stroke=\"#34d399\"/><text x=\"340\" y=\"34\" text-anchor=\"middle\" fill=\"#34d399\">Subscriber A</text><rect x=\"290\" y=\"63\" width=\"100\" height=\"34\" fill=\"none\" stroke=\"#34d399\"/><text x=\"340\" y=\"84\" text-anchor=\"middle\" fill=\"#34d399\">Subscriber B</text><rect x=\"290\" y=\"113\" width=\"100\" height=\"34\" fill=\"none\" stroke=\"#34d399\"/><text x=\"340\" y=\"134\" text-anchor=\"middle\" fill=\"#34d399\">Subscriber C</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "visualizer 以左右佈局呈現：發布者在最左，事件匯流排居中，三個訂閱者在右側，連線代表事件流向。",
              "en": "The visualizer uses a left-to-right layout: Publisher on the far left, EventBus in the center, three Subscribers on the right, with connectors showing event flow."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "取捨與使用時機",
          "en": "Trade-offs & When to Use"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "面向",
                "en": "Aspect"
              },
              {
                "zh": "說明",
                "en": "Notes"
              }
            ],
            "rows": [
              [
                {
                  "zh": "解耦",
                  "en": "Decoupling"
                },
                {
                  "zh": "發布者與訂閱者完全不互相依賴",
                  "en": "Publishers and subscribers have zero direct dependency on each other"
                }
              ],
              [
                {
                  "zh": "扇出",
                  "en": "Fan-out"
                },
                {
                  "zh": "一個事件可輕易廣播給多個訂閱者",
                  "en": "One event can easily reach multiple subscribers simultaneously"
                }
              ],
              [
                {
                  "zh": "成本",
                  "en": "Cost"
                },
                {
                  "zh": "事件流難以追蹤；需額外關注訊息順序與傳遞保證",
                  "en": "Event flow is harder to trace; ordering and delivery guarantees need explicit attention"
                }
              ]
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "// Event bus — decouples publishers from subscribers.\nclass EventBus {\n    vector<function<void(const string&)>> subscribers;\n\npublic:\n    void subscribe(function<void(const string&)> handler) {\n        subscribers.push_back(handler);\n    }\n    void publish(const string& event) {\n        for (auto& handler : subscribers)\n            handler(event);\n    }\n};"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點：發布者與訂閱者完全解耦，互不知曉。",
                "en": "Pro: publishers and subscribers are totally decoupled — neither knows of the other."
              },
              {
                "zh": "優點：新增或移除訂閱者無需修改發布者程式碼。",
                "en": "Pro: adding or removing subscribers requires no changes to the publisher."
              },
              {
                "zh": "優點：天然支援一對多的事件扇出。",
                "en": "Pro: naturally supports one-to-many event fan-out."
              },
              {
                "zh": "缺點：間接的控制流使除錯與追蹤更為困難。",
                "en": "Con: indirect control flow makes debugging and tracing harder."
              },
              {
                "zh": "適用：事件驅動系統、UI 事件處理、需要解耦的模組間通訊。",
                "en": "Use for event-driven systems, UI event handling, and decoupled inter-module communication."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "發布-訂閱透過事件匯流排作為仲介，使發布者與訂閱者完全解耦。",
                "en": "Publish-Subscribe uses an event bus as a broker to fully decouple publishers and subscribers."
              },
              {
                "zh": "一個事件可廣播給任意數量的訂閱者，並支援執行時期的動態訂閱。",
                "en": "One event can broadcast to any number of subscribers, with dynamic subscription at runtime."
              },
              {
                "zh": "是事件驅動架構的核心機制，廣泛應用於 UI 框架與訊息系統。",
                "en": "It is the core mechanism of event-driven architecture, widely used in UI frameworks and messaging systems."
              }
            ]
          }
        ]
      }
    ]
  },
  "pattern-pipefilter": {
    "category": "Design Patterns",
    "title": {
      "zh": "管道與過濾器",
      "en": "Pipe-and-Filter"
    },
    "slides": [
      {
        "heading": {
          "zh": "管道與過濾器",
          "en": "Pipe-and-Filter"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "資料透過一連串以管道（pipe）連接的獨立過濾器（filter）逐步流動；每個過濾器負責一種轉換，並將結果傳遞給下一個。",
              "en": "Data flows through a chain of independent filters connected by pipes; each filter transforms its input and passes the result on to the next."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "每個過濾器只有單一職責，且具備統一的輸入／輸出介面，因此過濾器可以自由組合與重新排序。管道線（pipeline）就是一個有序的過濾器列表。",
              "en": "Each filter has a single responsibility and a uniform input/output interface, so filters compose and reorder freely. The pipeline is simply an ordered list of filters."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "統一的「輸入 → 輸出」介面讓過濾器可以任意串接。",
                "en": "The uniform input → output interface allows filters to be chained in any order."
              },
              {
                "zh": "過濾器彼此獨立，可單獨重複使用。",
                "en": "Filters are independent of each other and individually reusable."
              },
              {
                "zh": "管道線只是一個有序的過濾器列表，組合方式靈活。",
                "en": "The pipeline is just an ordered list of filters, enabling flexible composition."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "建立管道線並依序加入所需的過濾器。",
                "en": "Build the pipeline by adding filters in the desired order."
              },
              {
                "zh": "將輸入資料送入管道線的第一個過濾器。",
                "en": "Feed the input data into the first filter of the pipeline."
              },
              {
                "zh": "每個過濾器轉換資料後傳遞給下一個，最終輸出結果。",
                "en": "Each filter transforms the data and forwards it to the next, producing the final output."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  Input[\"Input\"] --> Trim[\"Trim\"]\n  Trim --> Upper[\"Upper\"]\n  Upper --> Exclaim[\"Exclaim\"]\n  Exclaim --> Output[\"Output\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "示意圖",
          "en": "Layout"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 440 80\" width=\"440\"><g font-family=\"monospace\" font-size=\"12\"><rect x=\"10\" y=\"23\" width=\"60\" height=\"34\" fill=\"none\" stroke=\"#64748b\"/><text x=\"40\" y=\"44\" text-anchor=\"middle\" fill=\"#64748b\">Input</text><line x1=\"70\" y1=\"40\" x2=\"90\" y2=\"40\" stroke=\"#64748b\"/><rect x=\"90\" y=\"23\" width=\"70\" height=\"34\" fill=\"none\" stroke=\"#60a5fa\"/><text x=\"125\" y=\"44\" text-anchor=\"middle\" fill=\"#60a5fa\">Trim</text><line x1=\"160\" y1=\"40\" x2=\"180\" y2=\"40\" stroke=\"#64748b\"/><rect x=\"180\" y=\"23\" width=\"70\" height=\"34\" fill=\"none\" stroke=\"#34d399\"/><text x=\"215\" y=\"44\" text-anchor=\"middle\" fill=\"#34d399\">Upper</text><line x1=\"250\" y1=\"40\" x2=\"270\" y2=\"40\" stroke=\"#64748b\"/><rect x=\"270\" y=\"23\" width=\"80\" height=\"34\" fill=\"none\" stroke=\"#f59e0b\"/><text x=\"310\" y=\"44\" text-anchor=\"middle\" fill=\"#f59e0b\">Exclaim</text><line x1=\"350\" y1=\"40\" x2=\"370\" y2=\"40\" stroke=\"#64748b\"/><rect x=\"370\" y=\"23\" width=\"60\" height=\"34\" fill=\"none\" stroke=\"#64748b\"/><text x=\"400\" y=\"44\" text-anchor=\"middle\" fill=\"#64748b\">Output</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "visualizer 以水平鏈呈現過濾器：Input → Trim → Upper → Exclaim → Output，連線代表資料流向（管道）。",
              "en": "The visualizer shows the filter chain horizontally: Input → Trim → Upper → Exclaim → Output, with connectors representing data flow (pipes)."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "取捨與使用時機",
          "en": "Trade-offs & When to Use"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "面向",
                "en": "Aspect"
              },
              {
                "zh": "說明",
                "en": "Notes"
              }
            ],
            "rows": [
              [
                {
                  "zh": "可組合性與重用",
                  "en": "Composability & reuse"
                },
                {
                  "zh": "過濾器可自由組合、重新排序並在不同管道線中重用",
                  "en": "Filters compose freely, can be reordered, and reused across different pipelines"
                }
              ],
              [
                {
                  "zh": "各階段可獨立測試",
                  "en": "Per-stage testability"
                },
                {
                  "zh": "每個過濾器可單獨提供輸入並驗證輸出",
                  "en": "Each filter can be tested in isolation with direct input and output verification"
                }
              ],
              [
                {
                  "zh": "成本",
                  "en": "Cost"
                },
                {
                  "zh": "各階段的資料複製增加開銷；不適合需要緊密回饋迴圈的場景",
                  "en": "Per-stage data copying adds overhead; not ideal for tight feedback loops"
                }
              ]
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "// Filter — one transformation stage.\nclass Filter {\npublic:\n    virtual string process(const string& input) const = 0;\n    virtual ~Filter() {}\n};\n\n// Pipeline — chains filters; data flows through each pipe.\nclass Pipeline {\n    vector<Filter*> filters;\n\npublic:\n    void add(Filter* f) { filters.push_back(f); }\n    string run(const string& input) const {\n        string data = input;\n        for (Filter* f : filters)\n            data = f->process(data);\n        return data;\n    }\n};"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點：過濾器可自由組合、重新排序，彈性極高。",
                "en": "Pro: filters compose and reorder freely for maximum flexibility."
              },
              {
                "zh": "優點：每個過濾器可獨立進行單元測試。",
                "en": "Pro: each filter can be unit-tested in complete isolation."
              },
              {
                "zh": "缺點：各階段的資料複製增加效能開銷。",
                "en": "Con: copying data between stages adds performance overhead."
              },
              {
                "zh": "缺點：對於非線性的資料流，此模式不易套用。",
                "en": "Con: awkward to apply for non-linear data flows."
              },
              {
                "zh": "適用：串流與批次資料轉換（編譯器、資料管線、文字處理）。",
                "en": "Use for stream and batch data transformation (compilers, data pipelines, text processing)."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "管道與過濾器將資料處理拆解為一連串單一職責的獨立過濾器。",
                "en": "Pipe-and-Filter decomposes data processing into a chain of single-responsibility, independent filters."
              },
              {
                "zh": "統一的介面讓過濾器可以自由組合，實現高度可重用的管道線。",
                "en": "The uniform interface enables free composition of filters into highly reusable pipelines."
              },
              {
                "zh": "廣泛應用於編譯器前端、ETL 資料管線與文字處理等場景。",
                "en": "Widely applied in compiler front-ends, ETL pipelines, and text-processing scenarios."
              }
            ]
          }
        ]
      }
    ]
  },
  "pattern-di": {
    "category": "Design Patterns",
    "title": {
      "zh": "依賴注入",
      "en": "Dependency Injection"
    },
    "slides": [
      {
        "heading": {
          "zh": "依賴注入（Dependency Injection）",
          "en": "Dependency Injection"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "依賴注入是控制反轉（Inversion of Control）的實踐方式：物件不自行建立依賴，而是由外部（通常透過建構子）注入——從而讓依賴關係可抽換、可測試。",
              "en": "Dependency Injection is an application of Inversion of Control: instead of an object constructing its own dependencies, they are supplied from outside (typically via the constructor) — making dependencies swappable and testable."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "消費者（Consumer）依賴於一個抽象（介面），而非具體實作；組合根（Composition Root）負責建立具體物件並將其注入消費者。",
              "en": "The consumer depends on an abstraction (interface), not a concrete class; a composition root wires the concrete implementation in."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "消費者從不對其依賴呼叫 new，依賴由外部提供。",
                "en": "The consumer never calls new on its dependency — dependencies are supplied externally."
              },
              {
                "zh": "依賴於介面而非具體類別，使替換實作變得容易。",
                "en": "Depending on an interface rather than a concrete class makes swapping implementations easy."
              },
              {
                "zh": "組合根是唯一負責接線的地方，清晰且集中。",
                "en": "The composition root is the single, centralized wiring place — clear and explicit."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "定義 Service 抽象介面，消費者僅依賴此介面。",
                "en": "Define a Service abstraction; the Consumer depends only on this interface."
              },
              {
                "zh": "Consumer 透過建構子接收 Service& 參數（建構子注入）。",
                "en": "The Consumer takes a Service& in its constructor (constructor injection)."
              },
              {
                "zh": "組合根（main）建立具體的 ConsoleService 並注入至 Consumer。",
                "en": "The composition root (main) creates the concrete ConsoleService and injects it into the Consumer."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  CompositionRoot[\"CompositionRoot\"] -->|creates| ConsoleService[\"ConsoleService\"]\n  CompositionRoot -->|injects| Consumer[\"Consumer\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "示意圖",
          "en": "Layout"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 160\" width=\"400\"><g font-family=\"monospace\" font-size=\"12\"><rect x=\"140\" y=\"10\" width=\"120\" height=\"34\" fill=\"none\" stroke=\"#a78bfa\"/><text x=\"200\" y=\"31\" text-anchor=\"middle\" fill=\"#a78bfa\">CompositionRoot</text><line x1=\"160\" y1=\"44\" x2=\"90\" y2=\"100\" stroke=\"#64748b\"/><line x1=\"240\" y1=\"44\" x2=\"310\" y2=\"100\" stroke=\"#64748b\"/><rect x=\"20\" y=\"100\" width=\"120\" height=\"34\" fill=\"none\" stroke=\"#f59e0b\"/><text x=\"80\" y=\"121\" text-anchor=\"middle\" fill=\"#f59e0b\">ConsoleService</text><rect x=\"260\" y=\"100\" width=\"100\" height=\"34\" fill=\"none\" stroke=\"#34d399\"/><text x=\"310\" y=\"121\" text-anchor=\"middle\" fill=\"#34d399\">Consumer</text><line x1=\"140\" y1=\"117\" x2=\"260\" y2=\"117\" stroke=\"#60a5fa\" stroke-dasharray=\"4\"/><text x=\"200\" y=\"113\" text-anchor=\"middle\" fill=\"#60a5fa\" font-size=\"10\">injects</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "visualizer 以三角佈局呈現：組合根在上，ConsoleService 與 Consumer 在下；實線代表「建立」關係，虛線代表「注入」關係。",
              "en": "The visualizer uses a triangle layout: CompositionRoot on top, ConsoleService and Consumer below; solid connectors show creation and the dashed connector shows injection."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "取捨與使用時機",
          "en": "Trade-offs & When to Use"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "面向",
                "en": "Aspect"
              },
              {
                "zh": "說明",
                "en": "Notes"
              }
            ],
            "rows": [
              [
                {
                  "zh": "可測試性",
                  "en": "Testability"
                },
                {
                  "zh": "極佳——可注入 mock 或 fake 取代真實依賴",
                  "en": "Excellent — inject a mock or fake in place of the real dependency"
                }
              ],
              [
                {
                  "zh": "彈性",
                  "en": "Flexibility"
                },
                {
                  "zh": "無需修改消費者即可替換具體實作",
                  "en": "Swap concrete implementations without touching the consumer"
                }
              ],
              [
                {
                  "zh": "成本",
                  "en": "Cost"
                },
                {
                  "zh": "接線程式碼較多；需維護一個組合根",
                  "en": "More wiring code; a composition root to maintain"
                }
              ]
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "// Service — an abstraction the consumer depends on.\nclass Service {\npublic:\n    virtual string fetch() const = 0;\n    virtual ~Service() {}\n};\n\n// Consumer — receives its dependency; never constructs it.\nclass Consumer {\n    Service& service; // depends on the abstraction\npublic:\n    Consumer(Service& s) : service(s) {} // constructor injection\n    void run() { cout << \"Consumer used: \" << service.fetch() << endl; }\n};"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點：可注入 mock 或 fake，大幅提升單元測試的便利性。",
                "en": "Pro: greatly improves unit testability by allowing mock or fake injection."
              },
              {
                "zh": "優點：替換具體實作無需修改消費者程式碼，彈性極高。",
                "en": "Pro: swap concrete implementations without modifying the consumer, for maximum flexibility."
              },
              {
                "zh": "缺點：需要更多接線程式碼，並需維護一個組合根。",
                "en": "Con: requires more wiring boilerplate and a composition root to maintain."
              },
              {
                "zh": "缺點：間接性增加，對初學者而言較難理解控制流。",
                "en": "Con: added indirection makes control flow harder to follow for beginners."
              },
              {
                "zh": "適用：任何類別擁有可測試或可替換的外部依賴時；注意 DI 是控制反轉的實踐機制。",
                "en": "Use whenever a class has external dependencies you want to test or swap. Note: DI is the practical mechanism behind Inversion of Control."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "依賴注入將依賴從外部供入；消費者依賴抽象而非具體實作。",
                "en": "Dependency Injection supplies dependencies from outside; the consumer depends on an abstraction, not a concrete class."
              },
              {
                "zh": "組合根是唯一的接線場所，使整個系統的依賴關係清晰可見。",
                "en": "The composition root is the single wiring place, making the system's dependency graph explicit."
              },
              {
                "zh": "是可測試、鬆耦合程式碼的基礎，也是控制反轉原則的實踐形式。",
                "en": "It is the foundation of testable, loosely-coupled code and the practical form of Inversion of Control."
              }
            ]
          }
        ]
      }
    ]
  },
  "oop-encapsulation": {
    "category": "OOP Concepts",
    "title": {
      "zh": "封裝與存取控制",
      "en": "Encapsulation & Access Control"
    },
    "slides": [
      {
        "heading": {
          "zh": "封裝與存取控制",
          "en": "Encapsulation & Access Control"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "封裝(Encapsulation)將資料與操作資料的方法綁定在同一個類別中,以 `private`/`protected`/`public` 存取修飾子隱藏實作細節,僅對外暴露受控的 `public` 介面。",
              "en": "Encapsulation bundles data and the methods that operate on that data into a single class. Access specifiers (`private`, `protected`, `public`) hide implementation details while exposing a controlled `public` interface."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "`BankAccount` 範例展示典型封裝:`balance` 設為 `private`,外部只能透過 `deposit()`/`withdraw()`/`getBalance()` 操作,確保不變式(invariant)始終成立。",
              "en": "The `BankAccount` example demonstrates typical encapsulation: `balance` is `private`; external code can only interact via `deposit()`, `withdraw()`, and `getBalance()`, preserving all invariants."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "`public`:類別契約的一部分,任何程式碼均可存取。",
                "en": "`public`: part of the class contract; accessible from anywhere."
              },
              {
                "zh": "`protected`:僅允許類別本身及 derived class 存取;通常用於供子類別覆寫的 helper 方法。",
                "en": "`protected`: accessible by the class and its derived classes; typically used for overridable helper methods."
              },
              {
                "zh": "`private`:僅類別本身可存取;保護資料不受外部直接修改。",
                "en": "`private`: accessible only within the class; protects data from direct external modification."
              },
              {
                "zh": "`const` 成員函式:不可修改物件狀態,提供唯讀存取保證。",
                "en": "`const` member function: cannot modify object state, providing a read-only access guarantee."
              },
              {
                "zh": "`mutex` + `lock_guard`:在 `deposit`/`withdraw` 中保護共享狀態的執行緒安全。",
                "en": "`mutex` + `lock_guard`: protect shared state for thread safety inside `deposit`/`withdraw`."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "外部呼叫 `account.deposit(200)`;進入 `public` 方法,加上 `lock_guard` 鎖定。",
                "en": "Caller invokes `account.deposit(200)`; enters the `public` method, which acquires a `lock_guard`."
              },
              {
                "zh": "方法內部直接存取 `private` 成員 `balance`,完成業務邏輯後釋放鎖。",
                "en": "Inside, the method directly accesses the `private` member `balance`, completing the logic before releasing the lock."
              },
              {
                "zh": "`withdraw` 呼叫 `protected` 方法 `canWithdraw()` 及 `private` 方法 `log()`,外部無法直接呼叫。",
                "en": "`withdraw` calls the `protected` method `canWithdraw()` and the `private` method `log()`, neither of which is directly callable externally."
              },
              {
                "zh": "外部只能透過 `getBalance()` (`public const`) 讀取餘額,無法直接修改。",
                "en": "External code can only read the balance through `getBalance()` (a `public const` method), with no direct modification path."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  EXT[\"External Code\"] -->|\"deposit / withdraw / getBalance\"| PUB[\"public interface\"]\n  PUB -->|uses| PROT[\"protected: canWithdraw()\"]\n  PUB -->|uses| PRIV[\"private: balance / log() / mutex\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "封裝膠囊示意",
          "en": "Encapsulation Capsule Diagram"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 170\" width=\"400\" height=\"170\"><g font-family=\"sans-serif\" font-size=\"11\"><ellipse cx=\"175\" cy=\"85\" rx=\"150\" ry=\"75\" fill=\"#f0f9ff\" stroke=\"#0ea5e9\" stroke-width=\"2\"/><ellipse cx=\"175\" cy=\"85\" rx=\"100\" ry=\"48\" fill=\"#e0f2fe\" stroke=\"#0284c7\" stroke-width=\"1.5\"/><ellipse cx=\"175\" cy=\"85\" rx=\"50\" ry=\"24\" fill=\"#bfdbfe\" stroke=\"#2563eb\" stroke-width=\"1.5\"/><text x=\"175\" y=\"89\" text-anchor=\"middle\" font-weight=\"bold\" fill=\"#1e3a8a\" font-size=\"12\">private</text><text x=\"175\" y=\"49\" text-anchor=\"middle\" fill=\"#075985\" font-size=\"11\">protected</text><text x=\"175\" y=\"22\" text-anchor=\"middle\" fill=\"#0369a1\" font-size=\"11\">public interface</text><text x=\"360\" y=\"89\" text-anchor=\"middle\" fill=\"#64748b\" font-size=\"10\">external</text><line x1=\"345\" y1=\"86\" x2=\"328\" y2=\"86\" stroke=\"#64748b\" stroke-width=\"1\" marker-end=\"url(#ext)\"/><defs><marker id=\"ext\" markerWidth=\"6\" markerHeight=\"6\" refX=\"5\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L6,3 z\" fill=\"#64748b\"/></marker></defs></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "封裝如同一個膠囊:最外層 `public` 介面供外部呼叫;中層 `protected` 僅供繼承;最內層 `private` 資料與邏輯完全隱藏。",
              "en": "Encapsulation is like a capsule: the outermost `public` layer is the external interface; the middle `protected` layer is for subclasses; the innermost `private` core is fully hidden."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "存取層級與可見範圍",
          "en": "Access Levels & Visibility"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "存取修飾子",
                "en": "Access Specifier"
              },
              {
                "zh": "類別本身",
                "en": "Same Class"
              },
              {
                "zh": "Derived Class",
                "en": "Derived Class"
              },
              {
                "zh": "外部程式碼",
                "en": "External Code"
              }
            ],
            "rows": [
              [
                {
                  "zh": "`public`",
                  "en": "`public`"
                },
                {
                  "zh": "可",
                  "en": "Yes"
                },
                {
                  "zh": "可",
                  "en": "Yes"
                },
                {
                  "zh": "可",
                  "en": "Yes"
                }
              ],
              [
                {
                  "zh": "`protected`",
                  "en": "`protected`"
                },
                {
                  "zh": "可",
                  "en": "Yes"
                },
                {
                  "zh": "可",
                  "en": "Yes"
                },
                {
                  "zh": "否",
                  "en": "No"
                }
              ],
              [
                {
                  "zh": "`private`",
                  "en": "`private`"
                },
                {
                  "zh": "可",
                  "en": "Yes"
                },
                {
                  "zh": "否",
                  "en": "No"
                },
                {
                  "zh": "否",
                  "en": "No"
                }
              ],
              [
                {
                  "zh": "`friend`",
                  "en": "`friend`"
                },
                {
                  "zh": "可",
                  "en": "Yes"
                },
                {
                  "zh": "否(不繼承)",
                  "en": "No (not inherited)"
                },
                {
                  "zh": "例外授權",
                  "en": "Explicitly granted"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "\\text{Invariant preserved} \\iff \\forall\\, f \\in public(C) : \\text{post}(f) \\models \\text{inv}(C)",
            "caption": {
              "zh": "封裝的核心目標:透過限制直接存取,確保每次 `public` 方法呼叫後物件狀態仍滿足所有不變式。",
              "en": "The core goal of encapsulation: restricting direct access ensures every `public` method call leaves the object satisfying all class invariants."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "class BankAccount {\npublic:\n    explicit BankAccount(double initialBalance) : balance(initialBalance) {}\n\n    void deposit(double amount) {\n        lock_guard<mutex> guard(accountLock);\n        if (amount > 0) {\n            balance += amount;\n        }\n    }\n\n    bool withdraw(double amount) {\n        lock_guard<mutex> guard(accountLock);\n        if (canWithdraw(amount)) {\n            balance -= amount;\n            log(\"withdraw\", amount);\n            return true;\n        }\n        return false;\n    }\n\n    double getBalance() const { return balance; } // read-only\n\nprotected:\n    bool canWithdraw(double amount) const { return amount > 0 && amount <= balance; }\n\nprivate:\n    void log(const string& type, double amount) const {\n        cout << \"Log: \" << type << \" \" << amount << endl;\n    }\n    double balance;\n    mutable mutex accountLock;\n};"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:不變式保護 — `private` 成員只能透過受控方法修改,防止非法狀態。",
                "en": "Pro: invariant protection — `private` members can only be modified through controlled methods, preventing invalid states."
              },
              {
                "zh": "優點:介面穩定性 — 內部實作可自由重構,只要 `public` 介面不變就不影響呼叫端。",
                "en": "Pro: interface stability — internals can be freely refactored without affecting callers as long as the `public` interface is unchanged."
              },
              {
                "zh": "優點:執行緒安全 — 可在 `public` 方法入口集中加鎖,外部無法繞過。",
                "en": "Pro: thread safety — locks can be centralised at `public` method entries; external code cannot bypass them."
              },
              {
                "zh": "缺點:過度封裝可能導致冗長的 getter/setter,增加樣板程式碼。",
                "en": "Con: over-encapsulation can produce verbose getter/setter boilerplate."
              },
              {
                "zh": "適用:任何需要保護內部狀態或確保執行緒安全的類別,如帳戶、快取、連線池。",
                "en": "Use whenever internal state must be protected or thread safety is needed, e.g. accounts, caches, connection pools."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "封裝 = 資料隱藏 + 受控存取:以存取修飾子劃定邊界。",
                "en": "Encapsulation = data hiding + controlled access: access specifiers define the boundaries."
              },
              {
                "zh": "`private` 保護不變式;`protected` 支援繼承擴充;`public` 定義契約。",
                "en": "`private` guards invariants; `protected` supports inheritance extension; `public` defines the contract."
              },
              {
                "zh": "存取控制在編譯期強制執行,執行期無額外開銷。",
                "en": "Access control is enforced at compile time with zero runtime overhead."
              },
              {
                "zh": "良好封裝是可維護、可測試、執行緒安全程式碼的基礎。",
                "en": "Good encapsulation is the foundation of maintainable, testable, and thread-safe code."
              }
            ]
          }
        ]
      }
    ]
  },
  "oop-abstraction": {
    "category": "OOP Concepts",
    "title": {
      "zh": "抽象化",
      "en": "Abstraction"
    },
    "slides": [
      {
        "heading": {
          "zh": "抽象化",
          "en": "Abstraction"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "抽象化定義「做什麼」(介面)而隱藏「怎麼做」(實作);在 C++ 裡,一個全部成員都是純虛擬函式的抽象類別就是介面。",
              "en": "Abstraction defines what (the interface) while hiding how (the implementation); in C++, an abstract class whose members are all pure virtual functions is an interface."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "只要一個類別含有至少一個純虛擬函式(`virtual ... = 0;`),它就是抽象類別,無法被直接實例化。衍生類別必須 `override` 所有純虛擬函式,才會成為可實例化的具體類別。",
              "en": "A class with at least one pure virtual function (`virtual ... = 0;`) is abstract and cannot be instantiated directly. A derived class must `override` every pure virtual function to become a concrete, instantiable class."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "純虛擬函式 `= 0` 宣告契約,不提供實作。",
                "en": "A pure virtual function `= 0` declares a contract without providing an implementation."
              },
              {
                "zh": "抽象類別無法實例化(`Shape s;` 編譯失敗),但可用基底指標/參考指向衍生物件。",
                "en": "An abstract class cannot be instantiated (`Shape s;` fails to compile), but a base pointer/reference can point to a derived object."
              },
              {
                "zh": "C++ 的介面是名義型別:衍生類別必須明確 `: public Base` 繼承,編譯器才認。",
                "en": "A C++ interface is nominal: the derived class must explicitly inherit `: public Base` for the compiler to accept it."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "宣告抽象基底類別,把契約方法寫成純虛擬 `= 0`,並提供 virtual 解構子。",
                "en": "Declare an abstract base class; write the contract methods as pure virtual `= 0`, and provide a virtual destructor."
              },
              {
                "zh": "每個具體衍生類別 `override` 全部純虛擬函式。",
                "en": "Each concrete derived class overrides every pure virtual function."
              },
              {
                "zh": "透過基底指標/參考使用物件,呼叫在執行期分派到實際型別。",
                "en": "Use objects through a base pointer/reference; calls dispatch at runtime to the actual type."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart TD\n  S[\"Shape «abstract»\\narea() = 0\"] --> C[\"Circle\\narea() override\"]\n  S --> R[\"Rectangle\\narea() override\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "示意圖",
          "en": "Layout"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 420 120\" width=\"420\"><g font-family=\"monospace\" font-size=\"12\"><rect x=\"150\" y=\"10\" width=\"120\" height=\"40\" fill=\"none\" stroke=\"#a78bfa\" stroke-dasharray=\"5 3\"/><text x=\"210\" y=\"28\" text-anchor=\"middle\" fill=\"#a78bfa\">Shape «abstract»</text><text x=\"210\" y=\"42\" text-anchor=\"middle\" fill=\"#fbbf24\">area() = 0</text><rect x=\"40\" y=\"80\" width=\"120\" height=\"32\" fill=\"none\" stroke=\"#f472b6\"/><text x=\"100\" y=\"100\" text-anchor=\"middle\" fill=\"#f472b6\">Circle</text><rect x=\"260\" y=\"80\" width=\"120\" height=\"32\" fill=\"none\" stroke=\"#f472b6\"/><text x=\"320\" y=\"100\" text-anchor=\"middle\" fill=\"#f472b6\">Rectangle</text><line x1=\"100\" y1=\"80\" x2=\"190\" y2=\"50\" stroke=\"#64748b\"/><line x1=\"320\" y1=\"80\" x2=\"230\" y2=\"50\" stroke=\"#64748b\"/></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "visualizer 以虛線方框畫出抽象的 `Shape`,兩個具體子類別 `Circle`、`Rectangle` 各自實作 `area()`。",
              "en": "The visualizer draws the abstract `Shape` as a dashed box; the two concrete subclasses `Circle` and `Rectangle` each implement `area()`."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "成本與取捨",
          "en": "Cost & Trade-offs"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "面向",
                "en": "Aspect"
              },
              {
                "zh": "成本",
                "en": "Cost"
              }
            ],
            "rows": [
              [
                {
                  "zh": "抽象類別本身",
                  "en": "Abstract class itself"
                },
                {
                  "zh": "零額外執行期成本",
                  "en": "Zero extra runtime cost"
                }
              ],
              [
                {
                  "zh": "經基底指標的虛擬呼叫",
                  "en": "Virtual call via base pointer"
                },
                {
                  "zh": "一次 vtable 指標間接",
                  "en": "One vtable pointer indirection"
                }
              ],
              [
                {
                  "zh": "每個多型物件",
                  "en": "Each polymorphic object"
                },
                {
                  "zh": "多一個 vptr 指標",
                  "en": "One extra vptr pointer"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{virtual call}} = T_{\\text{direct call}} + O(1)",
            "caption": {
              "zh": "虛擬呼叫只比直接呼叫多一次常數時間的間接查表。",
              "en": "A virtual call costs just one constant-time table indirection more than a direct call."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "class Shape {\npublic:\n    virtual double area() const = 0; // pure virtual\n    virtual ~Shape() {}\n};\n\nclass Circle : public Shape {\n    double r;\n\npublic:\n    Circle(double radius) : r(radius) {}\n    double area() const override { return 3.14159 * r * r; }\n};"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點:把介面與實作解耦,呼叫端只依賴契約。",
                "en": "Pro: decouples interface from implementation — callers depend only on the contract."
              },
              {
                "zh": "優點:強制衍生類別實作所有契約方法,否則無法實例化。",
                "en": "Pro: forces derived classes to implement every contract method, or they stay non-instantiable."
              },
              {
                "zh": "缺點:虛擬呼叫有一次間接;且 C++ 介面是名義型別,需明確繼承。",
                "en": "Con: a virtual call has one indirection; and a C++ interface is nominal — explicit inheritance is required."
              },
              {
                "zh": "對照 Go:Go interface 是結構化(鴨子)型別,型別具備方法即自動滿足,不需繼承;兩者都屬子型別多型。",
                "en": "Versus Go: a Go interface is structural (duck-typed) — a type satisfies it automatically by having the methods, with no inheritance; both are forms of subtype polymorphism."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "抽象類別 = 含純虛擬函式的契約;全純虛擬 = C++ 的介面。",
                "en": "An abstract class is a contract with pure virtual functions; all-pure-virtual = a C++ interface."
              },
              {
                "zh": "C++ 介面為名義型別(需明確繼承);Go interface 為結構化型別。",
                "en": "A C++ interface is nominal (explicit inheritance); a Go interface is structural."
              },
              {
                "zh": "抽象化補齊 OOP 四大支柱(封裝、抽象、繼承、多型)。",
                "en": "Abstraction completes the four pillars of OOP (encapsulation, abstraction, inheritance, polymorphism)."
              }
            ]
          }
        ]
      }
    ]
  },
  "oop-adhoc": {
    "category": "OOP Concepts",
    "title": {
      "zh": "特設多型(多載)",
      "en": "Ad-hoc Polymorphism (Overloading)"
    },
    "slides": [
      {
        "heading": {
          "zh": "特設多型(多載)",
          "en": "Ad-hoc Polymorphism (Overloading)"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "特設多型讓同一個名稱（函式或運算子）擁有多個互不相關的實作；編譯器在編譯期根據引數型別挑選最合適的版本。",
              "en": "Ad-hoc polymorphism lets one name (a function or operator) have several unrelated implementations; the compiler picks one at compile time from the argument types."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "函式多載允許同名函式使用不同的參數列表；運算子多載則讓 `operator+` 等運算子對自訂型別有意義。解析發生在編譯期，依賴引數的「靜態型別」，沒有執行期分派，也不需要共同的基底型別。",
              "en": "Function overloading (same name, different parameter lists) and operator overloading (`operator+` etc.) are the two mechanisms. Resolution is at compile time by the static types of the arguments — there is no runtime dispatch and no shared base type."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "N 個獨立函式共用同一名稱。",
                "en": "N independent functions sharing a name."
              },
              {
                "zh": "由引數靜態型別決定呼叫哪個版本。",
                "en": "Chosen by argument static types."
              },
              {
                "zh": "零執行期成本；一切在編譯期完成。",
                "en": "Zero runtime cost; everything resolved at compile time."
              },
              {
                "zh": "注意：這與 Go interface 完全不同——Go interface 是執行期子型別分派；Go 甚至不支援函式多載。",
                "en": "Note: this is NOT a Go interface — a Go interface is runtime subtype dispatch; Go does not even have function overloading."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "以不同參數列表宣告各個多載版本，給出各自的特化實作。",
                "en": "Declare overloads with distinct signatures, each providing a type-specific implementation."
              },
              {
                "zh": "在每個呼叫點，編譯器比對引數的靜態型別，選出最佳多載。",
                "en": "At each call site the compiler matches the static argument types and selects the best overload."
              },
              {
                "zh": "運算子多載（`+`、`==` 等）套用同樣的機制，使自訂型別支援慣用語法。",
                "en": "Operator overloading applies the same idea to `+`, `==`, etc., giving custom types idiomatic syntax."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart TD\n  CS1[\"call print(42)\"] --> R[\"compile-time overload resolution\"]\n  CS2[\"call print(3.14)\"] --> R\n  CS3[\"call print(string)\"] --> R\n  R --> F1[\"print(int)\"]\n  R --> F2[\"print(double)\"]\n  R --> F3[\"print(const string&)\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "示意圖",
          "en": "Layout"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 480 160\" width=\"480\"><g font-family=\"monospace\" font-size=\"11\"><rect x=\"10\" y=\"20\" width=\"110\" height=\"28\" fill=\"none\" stroke=\"#60a5fa\"/><text x=\"65\" y=\"39\" text-anchor=\"middle\" fill=\"#60a5fa\">print(42)</text><rect x=\"10\" y=\"65\" width=\"110\" height=\"28\" fill=\"none\" stroke=\"#60a5fa\"/><text x=\"65\" y=\"84\" text-anchor=\"middle\" fill=\"#60a5fa\">print(3.14)</text><rect x=\"10\" y=\"110\" width=\"110\" height=\"28\" fill=\"none\" stroke=\"#60a5fa\"/><text x=\"65\" y=\"129\" text-anchor=\"middle\" fill=\"#60a5fa\">print(\"hi\")</text><rect x=\"180\" y=\"43\" width=\"120\" height=\"28\" fill=\"none\" stroke=\"#fbbf24\"/><text x=\"240\" y=\"62\" text-anchor=\"middle\" fill=\"#fbbf24\">overload resolution</text><line x1=\"120\" y1=\"34\" x2=\"180\" y2=\"57\" stroke=\"#64748b\"/><line x1=\"120\" y1=\"79\" x2=\"180\" y2=\"57\" stroke=\"#64748b\"/><line x1=\"120\" y1=\"124\" x2=\"180\" y2=\"57\" stroke=\"#64748b\"/><rect x=\"340\" y=\"10\" width=\"120\" height=\"28\" fill=\"none\" stroke=\"#f472b6\"/><text x=\"400\" y=\"29\" text-anchor=\"middle\" fill=\"#f472b6\">print(int)</text><rect x=\"340\" y=\"55\" width=\"120\" height=\"28\" fill=\"none\" stroke=\"#f472b6\"/><text x=\"400\" y=\"74\" text-anchor=\"middle\" fill=\"#f472b6\">print(double)</text><rect x=\"340\" y=\"100\" width=\"120\" height=\"28\" fill=\"none\" stroke=\"#f472b6\"/><text x=\"400\" y=\"119\" text-anchor=\"middle\" fill=\"#f472b6\">print(string)</text><line x1=\"300\" y1=\"57\" x2=\"340\" y2=\"24\" stroke=\"#64748b\"/><line x1=\"300\" y1=\"57\" x2=\"340\" y2=\"69\" stroke=\"#64748b\"/><line x1=\"300\" y1=\"57\" x2=\"340\" y2=\"114\" stroke=\"#64748b\"/></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "visualizer 左側顯示三個呼叫點，右側顯示三個已解析的多載；下方另有運算子多載面板展示 `operator+`。",
              "en": "The visualizer draws call sites on the left, resolved overloads on the right, plus an operator-overloading panel."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "成本與取捨",
          "en": "Cost & Trade-offs"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "面向",
                "en": "Aspect"
              },
              {
                "zh": "成本",
                "en": "Cost"
              }
            ],
            "rows": [
              [
                {
                  "zh": "多載解析",
                  "en": "Overload resolution"
                },
                {
                  "zh": "編譯期；執行期 $O(1)$",
                  "en": "Compile-time; $O(1)$ runtime"
                }
              ],
              [
                {
                  "zh": "運算子多載",
                  "en": "Operator overloading"
                },
                {
                  "zh": "與一般函式呼叫相同成本",
                  "en": "Same cost as a normal function call"
                }
              ],
              [
                {
                  "zh": "間接層",
                  "en": "Indirection"
                },
                {
                  "zh": "無 vtable、無間接層",
                  "en": "No vtable, no indirection"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T_{\\text{overloaded call}} = T_{\\text{direct call}}",
            "caption": {
              "zh": "特設多型在程式執行前就已完全解析，執行期與直接函式呼叫等價。",
              "en": "Ad-hoc polymorphism is fully resolved before the program runs; at runtime it is equivalent to a direct call."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "// Function overloading: same name, different parameter types.\nvoid print(int x) { cout << \"int: \" << x << endl; }\nvoid print(double x) { cout << \"double: \" << x << endl; }\nvoid print(const string& x) { cout << \"string: \" << x << endl; }\n\n// Operator overloading.\nstruct Vector2D {\n    double x, y;\n    Vector2D operator+(const Vector2D& o) const { return Vector2D{x + o.x, y + o.y}; }\n};\n\nint main() {\n    print(42);           // resolves to print(int)\n    print(3.14);         // resolves to print(double)\n    print(string(\"hi\")); // resolves to print(const string&)\n\n    Vector2D a{1, 2}, b{3, 4};\n    Vector2D c = a + b; // operator+\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點：自然、易讀的 API——同一個概念只需一個名稱。",
                "en": "Pro: natural, readable APIs — one name for one concept."
              },
              {
                "zh": "優點：零執行期額外開銷。",
                "en": "Pro: zero runtime overhead."
              },
              {
                "zh": "缺點：僅依靜態型別解析，無法提供執行期多型行為。",
                "en": "Con: resolved on static types only — no runtime polymorphism."
              },
              {
                "zh": "缺點：多載集合可能引發歧義，難以追蹤哪個版本被選中。",
                "en": "Con: overload sets can become ambiguous and hard to reason about."
              },
              {
                "zh": "使用時機：同一操作在編譯期已知各型別特化實作時。",
                "en": "Use when the same operation has type-specific implementations known at compile time."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "特設多型 = 編譯期按引數型別多載解析；與子型別多型（執行期）、參數多型（單一泛型體）截然不同。",
                "en": "Ad-hoc polymorphism = compile-time overload resolution by argument types; distinct from subtype polymorphism (runtime) and parametric polymorphism (one generic body)."
              },
              {
                "zh": "函式多載與運算子多載是 C++ 特設多型的兩大機制。",
                "en": "Function overloading and operator overloading are the two mechanisms of ad-hoc polymorphism in C++."
              },
              {
                "zh": "三種多型的比較見 oop-templates。",
                "en": "For a comparison of all three kinds of polymorphism, see oop-templates."
              }
            ]
          }
        ]
      }
    ]
  },
  "oop-templates": {
    "category": "OOP Concepts",
    "title": {
      "zh": "參數多型(樣板)",
      "en": "Parametric Polymorphism (Templates)"
    },
    "slides": [
      {
        "heading": {
          "zh": "參數多型(樣板)",
          "en": "Parametric Polymorphism (Templates)"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "樣板是一個通用的藍圖，能一致地適用於多種型別；編譯器對每種被使用的型別產生一份具體的特化版本。",
              "en": "A template is one generic blueprint that works uniformly for many types; the compiler instantiates a concrete version per type used."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "函式樣板（`template<typename T> T maximum(T,T)`）與類別樣板（`template<typename T> class Box`）是兩大形式。樣板在編譯期執行「結構性鴨子型別」——只要型別支援所需操作即可，不需要繼承關係。C++20 的 `concepts` 進一步將所需操作形式化。",
              "en": "Function templates (`template<typename T> T maximum(T,T)`) and class templates (`template<typename T> class Box`) are the two main forms. Templates are compile-time structural duck typing — any type supporting the required operations works, with no inheritance. C++20 `concepts` formalize the required-operations constraint."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "一份定義，可特化出多種具體型別。",
                "en": "One definition, many instantiated types."
              },
              {
                "zh": "在編譯期解析，無執行期開銷。",
                "en": "Resolved at compile time; zero runtime overhead."
              },
              {
                "zh": "結構性：不需共同基底類別。",
                "en": "Structural: no base class needed."
              },
              {
                "zh": "C++20 `concepts` 將所需操作的約束形式化，改善錯誤訊息。",
                "en": "C++20 `concepts` formalize the required-operations constraint and improve error messages."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "撰寫 `template<typename T>` 定義，用 `T` 代表任意型別。",
                "en": "Write a `template<typename T>` definition, using `T` as a placeholder for any type."
              },
              {
                "zh": "以具體型別使用樣板（如 `Box<int>`、`maximum(3, 7)`）。",
                "en": "Use the template with concrete types (e.g. `Box<int>`, `maximum(3, 7)`)."
              },
              {
                "zh": "編譯器對每個不同的具體型別各產生一份具體的類別或函式。",
                "en": "The compiler generates one concrete class/function per distinct type."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart TD\n  T[\"template T class Box\"]\n  T --> BI[\"Box int\"]\n  T --> BD[\"Box double\"]\n  T --> BS[\"Box string\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "示意圖",
          "en": "Layout"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 420 160\" width=\"420\"><g font-family=\"monospace\" font-size=\"11\"><rect x=\"130\" y=\"10\" width=\"160\" height=\"36\" fill=\"none\" stroke=\"#a78bfa\" stroke-dasharray=\"5 3\"/><text x=\"210\" y=\"26\" text-anchor=\"middle\" fill=\"#a78bfa\">template&lt;typename T&gt;</text><text x=\"210\" y=\"40\" text-anchor=\"middle\" fill=\"#a78bfa\">class Box</text><rect x=\"30\" y=\"100\" width=\"90\" height=\"30\" fill=\"none\" stroke=\"#f472b6\"/><text x=\"75\" y=\"120\" text-anchor=\"middle\" fill=\"#f472b6\">Box&lt;int&gt;</text><rect x=\"160\" y=\"100\" width=\"100\" height=\"30\" fill=\"none\" stroke=\"#f472b6\"/><text x=\"210\" y=\"120\" text-anchor=\"middle\" fill=\"#f472b6\">Box&lt;double&gt;</text><rect x=\"300\" y=\"100\" width=\"100\" height=\"30\" fill=\"none\" stroke=\"#f472b6\"/><text x=\"350\" y=\"120\" text-anchor=\"middle\" fill=\"#f472b6\">Box&lt;string&gt;</text><line x1=\"75\" y1=\"100\" x2=\"175\" y2=\"46\" stroke=\"#64748b\"/><line x1=\"210\" y1=\"100\" x2=\"210\" y2=\"46\" stroke=\"#64748b\"/><line x1=\"350\" y1=\"100\" x2=\"245\" y2=\"46\" stroke=\"#64748b\"/></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "visualizer 以虛線方框顯示樣板藍圖，箭頭向下指向三個以具體型別特化的類別。",
              "en": "The visualizer shows the blueprint as a dashed box and the per-type concrete classes below."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "成本與取捨",
          "en": "Cost & Trade-offs"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "面向",
                "en": "Aspect"
              },
              {
                "zh": "成本",
                "en": "Cost"
              }
            ],
            "rows": [
              [
                {
                  "zh": "執行期",
                  "en": "Runtime"
                },
                {
                  "zh": "零開銷；無間接層，每個特化都是具體程式碼",
                  "en": "Zero overhead; no indirection, each instantiation is concrete code"
                }
              ],
              [
                {
                  "zh": "編譯期",
                  "en": "Compile time"
                },
                {
                  "zh": "較長；每個型別各編譯一次",
                  "en": "Longer; one body compiled per type"
                }
              ],
              [
                {
                  "zh": "二進位大小",
                  "en": "Binary size"
                },
                {
                  "zh": "隨特化型別數量增長（程式碼膨脹）",
                  "en": "Grows per instantiation (code bloat)"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "\\text{code size} \\approx O(\\text{distinct types used})",
            "caption": {
              "zh": "樣板以更長的編譯時間和更大的二進位換取執行期零開銷。",
              "en": "Templates trade longer compile times and larger binaries for zero runtime overhead."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "// Function template.\ntemplate <typename T>\nT maximum(T a, T b) {\n    return (a > b) ? a : b;\n}\n\n// Class template.\ntemplate <typename T>\nclass Box {\n    T value;\n\npublic:\n    Box(T v) : value(v) {}\n    T get() const { return value; }\n    void set(T v) { value = v; }\n};\n\nint main() {\n    cout << maximum(3, 7) << endl;     // T = int\n    cout << maximum(2.5, 1.5) << endl; // T = double\n\n    Box<int> bi(42);\n    Box<string> bs(\"hello\");\n    cout << bi.get() << \" \" << bs.get() << endl;\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點：零執行期成本；完整型別安全；無需繼承即可結構性運作。",
                "en": "Pro: zero runtime cost, full type safety, works structurally without inheritance."
              },
              {
                "zh": "缺點：程式碼膨脹與較長的編譯時間。",
                "en": "Con: code bloat and longer compile times."
              },
              {
                "zh": "缺點：樣板錯誤訊息惡名昭彰地冗長（C++20 `concepts` 可改善）。",
                "en": "Con: template error messages are notoriously verbose (C++20 `concepts` help)."
              },
              {
                "zh": "使用時機：泛用容器與演算法。",
                "en": "Use for generic containers and algorithms."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "多型",
                "en": "Polymorphism"
              },
              {
                "zh": "決定時機",
                "en": "Decided"
              },
              {
                "zh": "C++",
                "en": "C++"
              },
              {
                "zh": "Go",
                "en": "Go"
              }
            ],
            "rows": [
              [
                {
                  "zh": "子型別",
                  "en": "Subtype"
                },
                {
                  "zh": "執行期動態分派",
                  "en": "Runtime dynamic dispatch"
                },
                {
                  "zh": "抽象類別 + 繼承（名義）",
                  "en": "Abstract class + inheritance (nominal)"
                },
                {
                  "zh": "interface（結構化，無繼承）",
                  "en": "interface (structural, no inheritance)"
                }
              ],
              [
                {
                  "zh": "特設",
                  "en": "Ad-hoc"
                },
                {
                  "zh": "編譯期，看引數靜態型別",
                  "en": "Compile-time, by argument static types"
                },
                {
                  "zh": "函式/運算子多載",
                  "en": "Function/operator overloading"
                },
                {
                  "zh": "不支援（無函式多載）",
                  "en": "Not supported (no overloading)"
                }
              ],
              [
                {
                  "zh": "參數",
                  "en": "Parametric"
                },
                {
                  "zh": "編譯期，結構化鴨子型別",
                  "en": "Compile-time, structural duck typing"
                },
                {
                  "zh": "templates / C++20 concepts",
                  "en": "templates / C++20 concepts"
                },
                {
                  "zh": "generics（Go 1.18+）",
                  "en": "generics (Go 1.18+)"
                }
              ]
            ]
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "樣板 = 編譯期參數多型；結構性（鴨子型別）；一份藍圖，多種具體型別。",
                "en": "Templates = compile-time parametric polymorphism; structural (duck-typed); one blueprint, many concrete types."
              },
              {
                "zh": "在精神上最接近 Go interface 的結構性型別，但在編譯期而非執行期解析。",
                "en": "Spiritually closest to a Go interface's structural typing, but resolved at compile time rather than runtime."
              },
              {
                "zh": "上方表格對比 C++ 與 Go 中三種多型的決定時機與機制。",
                "en": "The table above contrasts all three polymorphisms — their timing and mechanisms across C++ and Go."
              }
            ]
          }
        ]
      }
    ]
  },
  "tree-fenwick": {
    "category": "Trees",
    "title": {
      "zh": "Fenwick 樹",
      "en": "Fenwick Tree"
    },
    "slides": [
      {
        "heading": {
          "zh": "Fenwick 樹",
          "en": "Fenwick Tree"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "Fenwick 樹（又稱樹狀陣列）支援單點更新與前綴和查詢，兩者皆為 $O(\\log n)$，只用一個陣列搭配位元技巧 `i & -i` 即可實現。",
              "en": "A Fenwick tree (Binary Indexed Tree) supports point updates and prefix-sum queries, both in $O(\\log n)$, using a single array and the bit trick `i & -i`."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "陣列採用 1-indexed；槽位 `i` 存放區間 `(i - lowbit(i), i]` 的總和，其中 `lowbit(i) = i & -i` 是 `i` 的最低設定位元。",
              "en": "The array is 1-indexed; slot `i` stores the sum of the range `(i - lowbit(i), i]`, where `lowbit(i) = i & -i` is the lowest set bit."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "前綴和透過 `i -= i & -i` 往下走。",
                "en": "A prefix sum walks down via `i -= i & -i`."
              },
              {
                "zh": "單點更新透過 `i += i & -i` 往上走。",
                "en": "A point update walks up via `i += i & -i`."
              },
              {
                "zh": "比線段樹更簡潔、常數更低，但只適用於可逆的聚合（如求和）。",
                "en": "Far simpler and lower-constant than a segment tree, but only for invertible aggregates like sum."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "`prefixSum(i)` 從 `i` 出發，累加 `bit[i]`，再跳到 `i - lowbit(i)`，重複直到 `i` 為 0。",
                "en": "`prefixSum(i)` starts at `i`, adds `bit[i]`, then jumps to `i - lowbit(i)`, repeating until 0."
              },
              {
                "zh": "`update(i, delta)` 把 `delta` 加到 `bit[i]`，再跳到 `i + lowbit(i)`，重複直到超過 `n`。",
                "en": "`update(i, delta)` adds `delta` to `bit[i]`, then jumps to `i + lowbit(i)`, repeating past `n`."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  A[\"prefixSum at i\"] --> B[\"add bit[i]\"]\n  B --> C[\"i = i - lowbit(i)\"]\n  C --> D[\"i > 0?\"]\n  D -->|yes| B\n  D -->|no| E[\"return sum\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "示意圖",
          "en": "Layout"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 120\" width=\"360\"><g font-family=\"monospace\" font-size=\"11\"><text x=\"10\" y=\"20\">bit[1..8]</text><rect x=\"10\" y=\"30\" width=\"40\" height=\"24\" fill=\"none\" stroke=\"#1e40af\"/><text x=\"30\" y=\"46\" text-anchor=\"middle\">1</text><rect x=\"50\" y=\"30\" width=\"40\" height=\"24\" fill=\"#fef3c7\" stroke=\"#f59e0b\"/><text x=\"70\" y=\"46\" text-anchor=\"middle\">2</text><rect x=\"90\" y=\"30\" width=\"40\" height=\"24\" fill=\"none\" stroke=\"#1e40af\"/><text x=\"110\" y=\"46\" text-anchor=\"middle\">3</text><rect x=\"130\" y=\"30\" width=\"40\" height=\"24\" fill=\"#dbeafe\" stroke=\"#1e40af\"/><text x=\"150\" y=\"46\" text-anchor=\"middle\">4</text><rect x=\"170\" y=\"30\" width=\"40\" height=\"24\" fill=\"none\" stroke=\"#1e40af\"/><text x=\"190\" y=\"46\" text-anchor=\"middle\">5</text><rect x=\"210\" y=\"30\" width=\"40\" height=\"24\" fill=\"#fef3c7\" stroke=\"#f59e0b\"/><text x=\"230\" y=\"46\" text-anchor=\"middle\">6</text><rect x=\"250\" y=\"30\" width=\"40\" height=\"24\" fill=\"none\" stroke=\"#1e40af\"/><text x=\"270\" y=\"46\" text-anchor=\"middle\">7</text><rect x=\"290\" y=\"30\" width=\"40\" height=\"24\" fill=\"#bfdbfe\" stroke=\"#1e40af\"/><text x=\"310\" y=\"46\" text-anchor=\"middle\">8</text><text x=\"10\" y=\"78\">slot 4 covers (0,4]</text><text x=\"10\" y=\"96\">slot 8 covers (0,8]</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "visualizer 腳本化執行 prefixSum → update → prefixSum，逐步展示每一步的 `i & -i` 跳躍。",
              "en": "The visualizer scripts prefixSum → update → prefixSum, showing the `i & -i` jumps each step."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "操作",
                "en": "Operation"
              },
              {
                "zh": "複雜度",
                "en": "Complexity"
              }
            ],
            "rows": [
              [
                {
                  "zh": "單點更新",
                  "en": "point update"
                },
                {
                  "zh": "$O(\\log n)$",
                  "en": "$O(\\log n)$"
                }
              ],
              [
                {
                  "zh": "前綴和查詢",
                  "en": "prefix sum"
                },
                {
                  "zh": "$O(\\log n)$",
                  "en": "$O(\\log n)$"
                }
              ],
              [
                {
                  "zh": "建樹",
                  "en": "build"
                },
                {
                  "zh": "$O(n \\log n)$",
                  "en": "$O(n \\log n)$"
                }
              ],
              [
                {
                  "zh": "空間",
                  "en": "space"
                },
                {
                  "zh": "$O(n)$",
                  "en": "$O(n)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T(n) = O(\\log n)",
            "caption": {
              "zh": "每次跳躍會清掉 `i` 的一個設定位元，故最多跳躍 $\\log n$ 次。",
              "en": "Each jump clears one set bit of `i`, so at most $\\log n$ jumps."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "// add delta at 1-indexed position i, walking up via i += i & -i\nvoid update(int i, long long delta) {\n    for (; i <= n; i += i & -i)\n        bit[i] += delta;\n}\n\n// sum of [1, i], walking down via i -= i & -i\nlong long prefixSum(int i) {\n    long long s = 0;\n    for (; i > 0; i -= i & -i)\n        s += bit[i];\n    return s;\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點：結構精巧、執行快速、容易實作。",
                "en": "Pro: tiny, fast, easy to implement."
              },
              {
                "zh": "缺點：只適用於可逆的聚合（求和），沒有原生的區間更新。",
                "en": "Con: only invertible aggregates (sum), no native range update."
              },
              {
                "zh": "適用：前綴和、逆序對計數、頻率表等線段樹過於笨重的場景。",
                "en": "Use: prefix sums / inversion counting / frequency tables where a segment tree would be overkill."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "一個陣列搭配 `i & -i` 技巧。",
                "en": "One array plus the `i & -i` trick."
              },
              {
                "zh": "前綴和往下走，單點更新往上走。",
                "en": "Walk down for a prefix sum, up for an update."
              },
              {
                "zh": "兩個方向皆為 $O(\\log n)$。",
                "en": "Both ways are $O(\\log n)$."
              }
            ]
          }
        ]
      }
    ]
  },
  "graph-prim": {
    "category": "Graphs",
    "title": {
      "zh": "Prim 最小生成樹",
      "en": "Prim's MST"
    },
    "slides": [
      {
        "heading": {
          "zh": "Prim 最小生成樹",
          "en": "Prim's MST"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "Prim 演算法以成長單一棵樹的方式建構最小生成樹，每一步都加入離開當前樹的最便宜邊。",
              "en": "Prim's algorithm builds a minimum spanning tree by growing a single tree, each step adding the cheapest edge that leaves the current tree."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "維護一組樹內頂點，並為每個樹外頂點記錄連往樹的最便宜已知邊。",
              "en": "Maintain a set of in-tree vertices and, for every outside vertex, the cheapest known edge connecting it to the tree."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "每一步挑選擁有最小該邊的樹外頂點並把它納入。",
                "en": "Each step picks the outside vertex with the smallest such edge and absorbs it."
              },
              {
                "zh": "切割性質保證所選的邊是安全的。",
                "en": "The cut property guarantees the chosen edge is safe."
              },
              {
                "zh": "與 Kruskal 形成對比，後者對所有邊做全域排序。",
                "en": "Contrasts with Kruskal, which sorts all edges globally."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "從任一頂點開始建樹。",
                "en": "Start the tree from any vertex."
              },
              {
                "zh": "在所有橫跨樹/非樹切割的邊中，挑出權重最小的一條。",
                "en": "Among all edges crossing the tree/non-tree cut, pick the minimum-weight one."
              },
              {
                "zh": "把它的端點加入樹。",
                "en": "Add its endpoint to the tree."
              },
              {
                "zh": "重複直到所有頂點都進入樹。",
                "en": "Repeat until all vertices are in."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  S[\"start from one vertex\"] --> P[\"pick min edge crossing the cut\"]\n  P --> A[\"add endpoint to tree\"]\n  A --> C[\"all vertices in?\"]\n  C -->|no| P\n  C -->|yes| D[\"MST complete\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "示意圖",
          "en": "Layout"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 140\" width=\"360\"><g font-family=\"monospace\" font-size=\"11\"><line x1=\"60\" y1=\"40\" x2=\"180\" y2=\"40\" stroke=\"#f59e0b\" stroke-width=\"3\"/><line x1=\"180\" y1=\"40\" x2=\"300\" y2=\"40\" stroke=\"#cbd5e1\"/><line x1=\"60\" y1=\"40\" x2=\"120\" y2=\"110\" stroke=\"#f59e0b\" stroke-width=\"3\"/><line x1=\"180\" y1=\"40\" x2=\"240\" y2=\"110\" stroke=\"#cbd5e1\"/><circle cx=\"60\" cy=\"40\" r=\"16\" fill=\"#dbeafe\" stroke=\"#1e40af\"/><text x=\"60\" y=\"44\" text-anchor=\"middle\">A</text><circle cx=\"180\" cy=\"40\" r=\"16\" fill=\"#dbeafe\" stroke=\"#1e40af\"/><text x=\"180\" y=\"44\" text-anchor=\"middle\">B</text><circle cx=\"300\" cy=\"40\" r=\"16\" fill=\"#dbeafe\" stroke=\"#1e40af\"/><text x=\"300\" y=\"44\" text-anchor=\"middle\">C</text><circle cx=\"120\" cy=\"110\" r=\"16\" fill=\"#dbeafe\" stroke=\"#1e40af\"/><text x=\"120\" y=\"114\" text-anchor=\"middle\">D</text><circle cx=\"240\" cy=\"110\" r=\"16\" fill=\"#dbeafe\" stroke=\"#1e40af\"/><text x=\"240\" y=\"114\" text-anchor=\"middle\">E</text><text x=\"110\" y=\"30\">2</text><text x=\"235\" y=\"30\">5</text><text x=\"78\" y=\"85\">6</text><text x=\"222\" y=\"85\">7</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "visualizer 走過一個固定的 5 節點加權圖，每一步高亮樹內頂點與所選的邊。",
              "en": "The visualizer steps through a fixed 5-node weighted graph, highlighting tree vertices and the chosen edge each step."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "實作方式",
                "en": "Implementation"
              },
              {
                "zh": "複雜度",
                "en": "Complexity"
              }
            ],
            "rows": [
              [
                {
                  "zh": "二元堆",
                  "en": "binary heap"
                },
                {
                  "zh": "$O(E \\log V)$",
                  "en": "$O(E \\log V)$"
                }
              ],
              [
                {
                  "zh": "鄰接矩陣掃描",
                  "en": "adjacency-matrix scan"
                },
                {
                  "zh": "$O(V^2)$",
                  "en": "$O(V^2)$"
                }
              ],
              [
                {
                  "zh": "空間",
                  "en": "space"
                },
                {
                  "zh": "$O(V + E)$",
                  "en": "$O(V + E)$"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T(V, E) = O(E \\log V)",
            "caption": {
              "zh": "二元堆讓 Prim 在稀疏圖上也能高效運作。",
              "en": "A binary heap makes Prim efficient on sparse graphs."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "for (int count = 0; count < V; count++) {\n    int u = -1;\n    for (int v = 0; v < V; v++)\n        if (!inMST[v] && (u == -1 || key[v] < key[u]))\n            u = v;\n    inMST[u] = true;\n    for (int v = 0; v < V; v++)\n        if (w[u][v] && !inMST[v] && w[u][v] < key[v]) {\n            key[v] = w[u][v];\n            parent[v] = u;\n        }\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點：簡單、在稠密圖上自然高效、始終成長為一棵連通樹。",
                "en": "Pro: simple, naturally efficient on dense graphs, always grows one connected tree."
              },
              {
                "zh": "缺點：在稀疏圖上要快就需要優先佇列。",
                "en": "Con: needs a priority queue to be fast on sparse graphs."
              },
              {
                "zh": "適用：連通加權圖的最小生成樹，尤其是稠密圖。",
                "en": "Use: MST on connected weighted graphs, especially dense ones."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "成長單一棵樹。",
                "en": "Grow one tree."
              },
              {
                "zh": "反覆加入最便宜的橫跨邊。",
                "en": "Repeatedly add the cheapest crossing edge."
              },
              {
                "zh": "切割性質讓每一次選擇都安全。",
                "en": "The cut property keeps every choice safe."
              }
            ]
          }
        ]
      }
    ]
  },
  "graph-bellman-ford": {
    "category": "Graphs",
    "title": {
      "zh": "Bellman-Ford 演算法",
      "en": "Bellman-Ford"
    },
    "slides": [
      {
        "heading": {
          "zh": "Bellman-Ford 演算法",
          "en": "Bellman-Ford"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "Bellman-Ford 計算單源最短路徑，與 Dijkstra 不同，它能處理負邊權，也能偵測負環。",
              "en": "Bellman-Ford computes single-source shortest paths and, unlike Dijkstra, works with negative edge weights; it can also detect negative cycles."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "鬆弛一條邊 `(u, v)` 是指 `dist[v] = min(dist[v], dist[u] + w)`。",
              "en": "Relaxing an edge `(u, v)` means `dist[v] = min(dist[v], dist[u] + w)`."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "一輪會把每條邊鬆弛一次。",
                "en": "One pass relaxes every edge once."
              },
              {
                "zh": "經過 `V-1` 輪後所有最短路徑都已收斂（最短路徑至多有 `V-1` 條邊）。",
                "en": "After `V-1` passes all shortest paths have converged (a shortest path has at most `V-1` edges)."
              },
              {
                "zh": "第 `V` 輪若仍能鬆弛某條邊，就證明存在負環。",
                "en": "A `V`-th pass that still relaxes something proves a negative cycle exists."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "把 `dist[source]` 設為 0，其餘全部設為無限大。",
                "en": "Set `dist[source] = 0` and all others to infinity."
              },
              {
                "zh": "重複 `V-1` 次：鬆弛每一條邊。",
                "en": "Repeat `V-1` times — relax every edge."
              },
              {
                "zh": "可選擇再跑一輪以檢查負環。",
                "en": "Optionally run one more pass to check for a negative cycle."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  I[\"set dist of source to 0\"] --> R[\"relax every edge\"]\n  R --> C[\"done V-1 passes?\"]\n  C -->|no| R\n  C -->|yes| E[\"shortest paths ready\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "示意圖",
          "en": "Layout"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 140\" width=\"320\"><g font-family=\"monospace\" font-size=\"11\"><line x1=\"62\" y1=\"70\" x2=\"123\" y2=\"42\" stroke=\"#94a3b8\"/><line x1=\"62\" y1=\"70\" x2=\"123\" y2=\"98\" stroke=\"#94a3b8\"/><line x1=\"150\" y1=\"38\" x2=\"235\" y2=\"38\" stroke=\"#94a3b8\"/><line x1=\"150\" y1=\"102\" x2=\"235\" y2=\"102\" stroke=\"#94a3b8\"/><line x1=\"150\" y1=\"42\" x2=\"235\" y2=\"96\" stroke=\"#f59e0b\"/><text x=\"86\" y=\"48\">6</text><text x=\"86\" y=\"98\">7</text><text x=\"192\" y=\"32\">5</text><text x=\"192\" y=\"118\">9</text><text x=\"200\" y=\"78\" fill=\"#f59e0b\">-4</text><circle cx=\"50\" cy=\"70\" r=\"15\" fill=\"#fff\" stroke=\"#1e40af\"/><text x=\"50\" y=\"74\" text-anchor=\"middle\">A</text><circle cx=\"135\" cy=\"38\" r=\"15\" fill=\"#fff\" stroke=\"#1e40af\"/><text x=\"135\" y=\"42\" text-anchor=\"middle\">B</text><circle cx=\"135\" cy=\"102\" r=\"15\" fill=\"#fff\" stroke=\"#1e40af\"/><text x=\"135\" y=\"106\" text-anchor=\"middle\">C</text><circle cx=\"250\" cy=\"38\" r=\"15\" fill=\"#fff\" stroke=\"#1e40af\"/><text x=\"250\" y=\"42\" text-anchor=\"middle\">D</text><circle cx=\"250\" cy=\"102\" r=\"15\" fill=\"#fff\" stroke=\"#1e40af\"/><text x=\"250\" y=\"106\" text-anchor=\"middle\">E</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "visualizer 在一個固定的 5 節點有向圖上逐邊推進，並更新每個頂點的距離陣列。",
              "en": "The visualizer steps edge-by-edge through a fixed 5-node directed graph, updating a per-vertex distance array."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "項目",
                "en": "Item"
              },
              {
                "zh": "結果",
                "en": "Result"
              }
            ],
            "rows": [
              [
                {
                  "zh": "時間",
                  "en": "time"
                },
                {
                  "zh": "$O(V \\cdot E)$",
                  "en": "$O(V \\cdot E)$"
                }
              ],
              [
                {
                  "zh": "空間",
                  "en": "space"
                },
                {
                  "zh": "$O(V)$",
                  "en": "$O(V)$"
                }
              ],
              [
                {
                  "zh": "處理負邊權",
                  "en": "handles negative weights"
                },
                {
                  "zh": "是",
                  "en": "yes"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T(V, E) = O(V \\cdot E)",
            "caption": {
              "zh": "共 `V-1` 輪，每輪鬆弛全部 `E` 條邊。",
              "en": "`V-1` passes, each relaxing all `E` edges."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "std::vector<int> dist(V, INT_MAX);\ndist[0] = 0;\n\nfor (int pass = 1; pass <= V - 1; pass++) {\n    for (const Edge& e : edges) {\n        if (dist[e.u] != INT_MAX && dist[e.u] + e.w < dist[e.v])\n            dist[e.v] = dist[e.u] + e.w;\n    }\n}"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點：能處理負邊權、能偵測負環、實作簡單。",
                "en": "Pro: handles negative weights, detects negative cycles, simple to code."
              },
              {
                "zh": "缺點：比 Dijkstra 慢。",
                "en": "Con: slower than Dijkstra."
              },
              {
                "zh": "適用：含負邊的圖，或需要負環偵測時。",
                "en": "Use: graphs with negative edges, or when negative-cycle detection is required."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "對每條邊鬆弛 `V-1` 輪。",
                "en": "Relax every edge for `V-1` passes."
              },
              {
                "zh": "能收斂是因為最短路徑至多有 `V-1` 條邊。",
                "en": "Converges because a shortest path has at most `V-1` edges."
              },
              {
                "zh": "若還能再鬆弛就代表存在負環。",
                "en": "A further relaxation signals a negative cycle."
              }
            ]
          }
        ]
      }
    ]
  },
  "graph-floyd-warshall": {
    "category": "Graphs",
    "title": {
      "zh": "Floyd-Warshall 演算法",
      "en": "Floyd-Warshall"
    },
    "slides": [
      {
        "heading": {
          "zh": "Floyd-Warshall 演算法",
          "en": "Floyd-Warshall"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "Floyd-Warshall 透過讓每個頂點輪流作為每條路徑上的中間點，計算全點對最短路徑。",
              "en": "Floyd-Warshall computes all-pairs shortest paths by letting each vertex in turn act as an intermediate point on every path."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "核心概念",
          "en": "Core Concept"
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": {
              "zh": "使用一個 `V×V` 的距離矩陣；對每個中間頂點 `k`，每一對 `(i, j)` 都嘗試經由 `k` 改善。",
              "en": "A `V×V` distance matrix; for each intermediate vertex `k`, every pair `(i, j)` is improved through `k`."
            }
          },
          {
            "type": "bullets",
            "items": [
              {
                "zh": "更新式為 `dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])`。",
                "en": "The update is `dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])`."
              },
              {
                "zh": "處理完頂點 `k` 後，矩陣存放只用 `0..k` 作為中間點的最短路徑。",
                "en": "After vertex `k` is processed, the matrix holds shortest paths using only intermediates `0..k`."
              },
              {
                "zh": "可處理負邊（在無負環的前提下）。",
                "en": "Works with negative edges (no negative cycle)."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "運作流程",
          "en": "Operation Flow"
        },
        "blocks": [
          {
            "type": "steps",
            "items": [
              {
                "zh": "以直接邊權初始化矩陣（無邊處設為無限大）。",
                "en": "Initialise the matrix with direct edge weights (infinity where no edge)."
              },
              {
                "zh": "對 `k` 從 `0` 到 `V-1`，經由 `k` 鬆弛每一對 `(i, j)`。",
                "en": "For `k` from `0` to `V-1`, relax every pair `(i, j)` through `k`."
              },
              {
                "zh": "最後一個 `k` 處理完後，矩陣即存放全點對最短距離。",
                "en": "After the last `k`, the matrix holds all-pairs shortest distances."
              }
            ]
          },
          {
            "type": "mermaid",
            "code": "flowchart LR\n  I[\"init matrix\"] --> K[\"pick intermediate k\"]\n  K --> U[\"relax every pair through k\"]\n  U --> C[\"all k done?\"]\n  C -->|no| K\n  C -->|yes| D[\"all-pairs done\"]"
          }
        ]
      },
      {
        "heading": {
          "zh": "示意圖",
          "en": "Layout"
        },
        "blocks": [
          {
            "type": "svg",
            "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 160\" width=\"200\"><g font-family=\"monospace\" font-size=\"11\"><rect x=\"40\" y=\"10\" width=\"40\" height=\"40\" fill=\"#fff\" stroke=\"#94a3b8\"/><rect x=\"80\" y=\"10\" width=\"40\" height=\"40\" fill=\"#fef3c7\" stroke=\"#f59e0b\"/><rect x=\"120\" y=\"10\" width=\"40\" height=\"40\" fill=\"#fff\" stroke=\"#94a3b8\"/><rect x=\"40\" y=\"50\" width=\"40\" height=\"40\" fill=\"#fef3c7\" stroke=\"#f59e0b\"/><rect x=\"80\" y=\"50\" width=\"40\" height=\"40\" fill=\"#fef3c7\" stroke=\"#f59e0b\"/><rect x=\"120\" y=\"50\" width=\"40\" height=\"40\" fill=\"#fef3c7\" stroke=\"#f59e0b\"/><rect x=\"40\" y=\"90\" width=\"40\" height=\"40\" fill=\"#fff\" stroke=\"#94a3b8\"/><rect x=\"80\" y=\"90\" width=\"40\" height=\"40\" fill=\"#fef3c7\" stroke=\"#f59e0b\"/><rect x=\"120\" y=\"90\" width=\"40\" height=\"40\" fill=\"#fff\" stroke=\"#94a3b8\"/><text x=\"100\" y=\"150\" text-anchor=\"middle\">row k and column k</text></g></svg>"
          },
          {
            "type": "note",
            "text": {
              "zh": "visualizer 每個中間頂點 `k` 走一步，高亮第 `k` 列與第 `k` 行，並標記該步改善的格子。",
              "en": "The visualizer steps once per intermediate vertex `k`, highlighting row/column `k` and marking the cells improved that step."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "複雜度分析",
          "en": "Complexity Analysis"
        },
        "blocks": [
          {
            "type": "table",
            "headers": [
              {
                "zh": "項目",
                "en": "Item"
              },
              {
                "zh": "結果",
                "en": "Result"
              }
            ],
            "rows": [
              [
                {
                  "zh": "時間",
                  "en": "time"
                },
                {
                  "zh": "$O(V^3)$",
                  "en": "$O(V^3)$"
                }
              ],
              [
                {
                  "zh": "空間",
                  "en": "space"
                },
                {
                  "zh": "$O(V^2)$",
                  "en": "$O(V^2)$"
                }
              ],
              [
                {
                  "zh": "全點對",
                  "en": "all-pairs"
                },
                {
                  "zh": "是",
                  "en": "yes"
                }
              ]
            ]
          },
          {
            "type": "math",
            "tex": "T(V) = O(V^3)",
            "caption": {
              "zh": "三層巢狀迴圈分別跑過 `k`、`i`、`j`。",
              "en": "Three nested loops over `k`, `i`, `j`."
            }
          }
        ]
      },
      {
        "heading": {
          "zh": "程式碼",
          "en": "Source Code"
        },
        "blocks": [
          {
            "type": "code",
            "lang": "cpp",
            "code": "for (int k = 0; k < V; k++)\n    for (int i = 0; i < V; i++)\n        for (int j = 0; j < V; j++)\n            if (dist[i][k] + dist[k][j] < dist[i][j])\n                dist[i][j] = dist[i][k] + dist[k][j];"
          }
        ]
      },
      {
        "heading": {
          "zh": "優缺點與使用時機",
          "en": "Pros, Cons & When to Use"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "優點：一次算出每一對、實作極為簡單、可處理負邊。",
                "en": "Pro: computes every pair at once, trivial to implement, handles negative edges."
              },
              {
                "zh": "缺點：$O(V^3)$，對大型圖不切實際。",
                "en": "Con: $O(V^3)$ — impractical for large graphs."
              },
              {
                "zh": "適用：小型稠密圖，或需要全點對距離時。",
                "en": "Use: small dense graphs, or when all-pairs distances are needed."
              }
            ]
          }
        ]
      },
      {
        "heading": {
          "zh": "小結",
          "en": "Summary"
        },
        "blocks": [
          {
            "type": "bullets",
            "items": [
              {
                "zh": "讓每個頂點 `k` 輪流作為中間點。",
                "en": "Let each vertex `k` serve as an intermediate."
              },
              {
                "zh": "每個 `k` 都鬆弛整個矩陣。",
                "en": "Relax the whole matrix per `k`."
              },
              {
                "zh": "以 $O(V^3)$ 求出全點對最短路徑。",
                "en": "All-pairs shortest paths in $O(V^3)$."
              }
            ]
          }
        ]
      }
    ]
  }
};

SLIDES_DB["tree-traversal"] = {
  "category": "Trees",
  "title": { "zh": "二元樹走訪", "en": "Binary Tree Traversal" },
  "slides": [
    { "heading": { "zh": "什麼是樹走訪", "en": "What is Tree Traversal" },
      "blocks": [
        { "type": "paragraph", "text": { "zh": "走訪是以系統化順序恰好造訪每個節點一次。", "en": "Traversal visits every node exactly once in a systematic order." } },
        { "type": "bullets", "items": [
          { "zh": "前序:節點 → 左 → 右", "en": "Preorder: node → left → right" },
          { "zh": "中序:左 → 節點 → 右(BST 得遞增序)", "en": "Inorder: left → node → right (sorted for a BST)" },
          { "zh": "後序:左 → 右 → 節點", "en": "Postorder: left → right → node" },
          { "zh": "層序:用佇列的廣度優先", "en": "Level-order: breadth-first using a queue" }
        ] }
      ] },
    { "heading": { "zh": "遞迴 vs 迭代", "en": "Recursive vs Iterative" },
      "blocks": [
        { "type": "paragraph", "text": { "zh": "遞迴隱含使用呼叫堆疊;迭代則以顯式 stack(DFS)或 queue(層序)取代。", "en": "Recursion uses the implicit call stack; iteration replaces it with an explicit stack (DFS) or queue (level-order)." } },
        { "type": "code", "lang": "cpp", "file": "tree_traversal.cpp", "code": "void inorderIterative(Node* root) {\n    std::stack<Node*> st; Node* cur = root;\n    while (cur || !st.empty()) {\n        while (cur) { st.push(cur); cur = cur->left; }\n        cur = st.top(); st.pop();\n        std::cout << cur->val << ' ';\n        cur = cur->right;\n    }\n}" }
      ] },
    { "heading": { "zh": "複雜度", "en": "Complexity" },
      "blocks": [
        { "type": "table",
          "headers": [ { "zh": "面向", "en": "Aspect" }, { "zh": "成本", "en": "Cost" } ],
          "rows": [
            [ { "zh": "時間", "en": "Time" }, { "zh": "O(N)", "en": "O(N)" } ],
            [ { "zh": "空間(DFS)", "en": "Space (DFS)" }, { "zh": "O(h)", "en": "O(h)" } ],
            [ { "zh": "空間(層序)", "en": "Space (BFS)" }, { "zh": "O(w)", "en": "O(w)" } ]
          ] }
      ] }
  ]
};
SLIDES_DB["huffman"] = {
  "category": "Trees",
  "title": { "zh": "Huffman 編碼", "en": "Huffman Coding" },
  "slides": [
    { "heading": { "zh": "問題", "en": "The Problem" },
      "blocks": [
        { "type": "paragraph", "text": { "zh": "給定符號頻率,求最小總長度的前綴碼。", "en": "Given symbol frequencies, find a prefix-free code minimizing total encoded length." } },
        { "type": "note", "text": { "zh": "前綴碼:沒有任一碼是另一碼的前綴,故可無歧義解碼。", "en": "Prefix-free: no code is a prefix of another, so decoding is unambiguous." } }
      ] },
    { "heading": { "zh": "貪婪建樹", "en": "Greedy Construction" },
      "blocks": [
        { "type": "steps", "items": [
          { "zh": "每個符號各成一棵單節點樹,放入優先佇列。", "en": "Each symbol becomes a single-node tree in a priority queue." },
          { "zh": "取出頻率最小的兩棵,合併成新節點(頻率相加)。", "en": "Remove the two lowest-frequency trees and merge them (frequencies add)." },
          { "zh": "重複直到只剩一棵樹。", "en": "Repeat until a single tree remains." },
          { "zh": "左邊記 0、右邊記 1,根到葉的路徑即為碼。", "en": "Label left 0, right 1; the root-to-leaf path is each symbol's code." }
        ] },
        { "type": "code", "lang": "cpp", "file": "huffman.cpp", "code": "while (pq.size() > 1) {\n    HNode* a = pq.top(); pq.pop();\n    HNode* b = pq.top(); pq.pop();\n    HNode* m = new HNode(a->freq + b->freq, '\\0');\n    m->l = a; m->r = b;\n    pq.push(m);\n}" }
      ] },
    { "heading": { "zh": "最優性與複雜度", "en": "Optimality & Complexity" },
      "blocks": [
        { "type": "paragraph", "text": { "zh": "貪婪每步取兩最小,可證得加權路徑長最小(最優前綴碼)。", "en": "Greedily merging the two smallest provably minimizes weighted path length (optimal prefix code)." } },
        { "type": "math", "tex": "WPL = \\sum_i f_i \\cdot \\text{depth}(i)", "caption": { "zh": "目標:最小化加權路徑長", "en": "Objective: minimize weighted path length" } },
        { "type": "bullets", "items": [
          { "zh": "建樹:O(N log N)", "en": "Build: O(N log N)" },
          { "zh": "空間:O(N)", "en": "Space: O(N)" }
        ] }
      ] }
  ]
};
SLIDES_DB["graph-aoe"] = {
  "category": "Graphs",
  "title": { "zh": "AOE 網路與關鍵路徑", "en": "AOE Networks & Critical Path" },
  "slides": [
    { "heading": { "zh": "AOE 網路", "en": "AOE Networks" },
      "blocks": [
        { "type": "paragraph", "text": { "zh": "Activity-on-Edge:頂點是事件,邊是有工時的活動,用於專案排程。", "en": "Activity-on-Edge: vertices are events, edges are activities with durations — used for project scheduling." } },
        { "type": "bullets", "items": [
          { "zh": "ee(v):事件最早發生時間(forward pass)", "en": "ee(v): earliest event time (forward pass)" },
          { "zh": "le(v):事件最晚發生時間(backward pass)", "en": "le(v): latest event time (backward pass)" },
          { "zh": "關鍵活動:e(i)=l(i),構成關鍵路徑", "en": "Critical activity: e(i)=l(i), forming the critical path" }
        ] }
      ] },
    { "heading": { "zh": "兩趟掃描", "en": "Two Passes" },
      "blocks": [
        { "type": "steps", "items": [
          { "zh": "依拓樸序做 forward pass 求 ee。", "en": "Forward pass in topological order to get ee." },
          { "zh": "依反拓樸序做 backward pass 求 le。", "en": "Backward pass in reverse topological order to get le." },
          { "zh": "活動 (u,v,w) 關鍵 ⟺ ee[u] = le[v] − w。", "en": "Activity (u,v,w) is critical iff ee[u] = le[v] − w." }
        ] },
        { "type": "math", "tex": "ee(v) = \\max_{(u,v)\\in E}\\, ee(u)+w(u,v)", "caption": { "zh": "forward pass 遞迴式", "en": "Forward-pass recurrence" } }
      ] },
    { "heading": { "zh": "複雜度", "en": "Complexity" },
      "blocks": [
        { "type": "bullets", "items": [
          { "zh": "時間 O(V+E);空間 O(V+E)", "en": "Time O(V+E); Space O(V+E)" },
          { "zh": "關鍵路徑長 = ee(sink) = 專案最短完工時間", "en": "Critical-path length = ee(sink) = minimum project completion time" }
        ] }
      ] }
  ]
};
SLIDES_DB["expr-infix-postfix"] = {
  "category": "Linear Structures",
  "title": { "zh": "中序轉後序與求值", "en": "Infix → Postfix & Evaluation" },
  "slides": [
    { "heading": { "zh": "為什麼用後序式", "en": "Why Postfix" },
      "blocks": [
        { "type": "paragraph", "text": { "zh": "後序式(逆波蘭)不需括號與優先權規則,適合用堆疊機械式求值。", "en": "Postfix (reverse Polish) needs no parentheses or precedence rules and is evaluated mechanically with a stack." } }
      ] },
    { "heading": { "zh": "Shunting-Yard 轉換", "en": "Shunting-Yard Conversion" },
      "blocks": [
        { "type": "steps", "items": [
          { "zh": "運算元直接輸出。", "en": "Operands go straight to output." },
          { "zh": "運算子:先彈出堆疊中優先權 ≥ 自己者,再入堆疊。", "en": "Operator: pop operators with precedence ≥ its own, then push." },
          { "zh": "( 入堆疊;) 彈出到 ( 為止。", "en": "Push ( ; on ) pop until (." },
          { "zh": "掃描完畢,彈出剩餘運算子。", "en": "At end, pop remaining operators." }
        ] },
        { "type": "code", "lang": "cpp", "file": "expr_infix_postfix.cpp", "code": "while (!ops.empty() && ops.top() != '(' &&\n       prec(ops.top()) >= prec(c)) {\n    out += ops.top(); out += ' '; ops.pop();\n}\nops.push(c);" }
      ] },
    { "heading": { "zh": "後序求值", "en": "Postfix Evaluation" },
      "blocks": [
        { "type": "paragraph", "text": { "zh": "由左到右掃描:遇運算元入堆疊,遇運算子彈出兩個、運算後推回。", "en": "Scan left to right: push operands; on an operator pop two, compute, push the result." } },
        { "type": "note", "text": { "zh": "例:A*(B+C)*D → A B C + * D *", "en": "e.g. A*(B+C)*D → A B C + * D *" } }
      ] }
  ]
};
SLIDES_DB["tree-obst"] = {
  "category": "Trees",
  "title": { "zh": "最佳二元搜尋樹", "en": "Optimal Binary Search Tree" },
  "slides": [
    { "heading": { "zh": "問題", "en": "The Problem" },
      "blocks": [
        { "type": "paragraph", "text": { "zh": "已知各 key 的存取頻率,求加權路徑長最小的 BST。", "en": "Given each key's access frequency, find the BST with minimum weighted path length." } },
        { "type": "note", "text": { "zh": "常存取的 key 應靠近根,以降低平均比較次數。", "en": "Frequently accessed keys should sit near the root to reduce average comparisons." } }
      ] },
    { "heading": { "zh": "動態規劃", "en": "Dynamic Programming" },
      "blocks": [
        { "type": "math", "tex": "cost[i][j] = \\min_{i\\le r\\le j}\\big(cost[i][r-1]+cost[r+1][j]\\big) + W(i,j)", "caption": { "zh": "對每個子區間試所有可能的根 r", "en": "Try every possible root r for each subrange" } },
        { "type": "bullets", "items": [
          { "zh": "依子區間長度由小到大填表", "en": "Fill the table by increasing subrange length" },
          { "zh": "W(i,j) = 區間頻率總和", "en": "W(i,j) = sum of frequencies in the range" },
          { "zh": "記錄最佳根以便重建樹", "en": "Record the best root to reconstruct the tree" }
        ] }
      ] },
    { "heading": { "zh": "複雜度", "en": "Complexity" },
      "blocks": [
        { "type": "bullets", "items": [
          { "zh": "時間 O(N³);Knuth 優化可達 O(N²)", "en": "Time O(N³); O(N²) with Knuth's optimization" },
          { "zh": "空間 O(N²)", "en": "Space O(N²)" }
        ] }
      ] }
  ]
};
SLIDES_DB["sort-external"] = {
  "category": "Sorting",
  "title": { "zh": "外部合併排序", "en": "External Merge Sort" },
  "slides": [
    { "heading": { "zh": "為何需要外部排序", "en": "Why External Sorting" },
      "blocks": [
        { "type": "paragraph", "text": { "zh": "資料量大於記憶體時,無法一次內排序,需分段處理並控制 I/O。", "en": "When data exceeds memory, we cannot sort it all at once — we process it in pieces and manage I/O." } }
      ] },
    { "heading": { "zh": "兩階段", "en": "Two Phases" },
      "blocks": [
        { "type": "steps", "items": [
          { "zh": "Run generation:讀入 M 筆、內排序、寫出一個 run。", "en": "Run generation: read M records, sort in memory, write a run." },
          { "zh": "k-way merge:用選擇樹(winner tree)每步取 k 個 run head 的最小值。", "en": "k-way merge: a selection (winner) tree picks the minimum of the k run heads each step." }
        ] },
        { "type": "code", "lang": "cpp", "file": "sort_external.cpp", "code": "while (!pq.empty()) {\n    auto [val, r, pos] = pq.top(); pq.pop();\n    out.push_back(val);\n    if (pos + 1 < (int)runs[r].size())\n        pq.push({runs[r][pos + 1], r, pos + 1});\n}" }
      ] },
    { "heading": { "zh": "成本", "en": "Cost" },
      "blocks": [
        { "type": "bullets", "items": [
          { "zh": "Pass 數 = 1 + ⌈log_k(run 數)⌉", "en": "Number of passes = 1 + ⌈log_k(#runs)⌉" },
          { "zh": "選擇樹讓每次取最小僅需 O(log k)", "en": "The selection tree makes each minimum extraction O(log k)" }
        ] }
      ] }
  ]
};
SLIDES_DB["matrix-sparse"] = {
  "category": "Arrays",
  "title": { "zh": "稀疏矩陣與快速轉置", "en": "Sparse Matrix & Fast Transpose" },
  "slides": [
    { "heading": { "zh": "三元組表示法", "en": "Triple Representation" },
      "blocks": [
        { "type": "paragraph", "text": { "zh": "只儲存非零元素為 (列, 欄, 值) 三元組,節省大量空間。", "en": "Store only nonzero entries as (row, col, value) triples to save space." } },
        { "type": "note", "text": { "zh": "三元組以列為主序排列。", "en": "Triples are kept in row-major order." } }
      ] },
    { "heading": { "zh": "FAST_TRANSPOSE", "en": "FAST_TRANSPOSE" },
      "blocks": [
        { "type": "steps", "items": [
          { "zh": "rowSize[c]:每欄非零數(轉置後的每列數)。", "en": "rowSize[c]: nonzeros per column (row counts of the transpose)." },
          { "zh": "startPos[c]:前綴和求每欄在結果中的起始位置。", "en": "startPos[c]: prefix sums give each column's start in the result." },
          { "zh": "掃描原三元組,將每個放到轉置位置。", "en": "Scan the triples and scatter each to its transposed slot." }
        ] },
        { "type": "code", "lang": "cpp", "file": "matrix_sparse.cpp", "code": "for (const auto& t : a) {\n    int dst = startPos[t.c]++;\n    b[dst] = { t.c, t.r, t.v };\n}" }
      ] },
    { "heading": { "zh": "複雜度", "en": "Complexity" },
      "blocks": [
        { "type": "bullets", "items": [
          { "zh": "轉置 O(cols + terms),優於密集 O(rows×cols)", "en": "Transpose O(cols + terms), better than dense O(rows×cols)" },
          { "zh": "空間 O(terms)", "en": "Space O(terms)" }
        ] }
      ] }
  ]
};
SLIDES_DB["poly-padd"] = {
  "category": "Arrays",
  "title": { "zh": "多項式相加", "en": "Polynomial Addition" },
  "slides": [
    { "heading": { "zh": "表示法", "en": "Representation" },
      "blocks": [
        { "type": "paragraph", "text": { "zh": "多項式以「係數,指數」項列表示,依指數遞減排列。", "en": "A polynomial is a list of (coefficient, exponent) terms in descending exponent order." } }
      ] },
    { "heading": { "zh": "雙指標合併", "en": "Two-Pointer Merge" },
      "blocks": [
        { "type": "steps", "items": [
          { "zh": "比較兩列開頭項的指數。", "en": "Compare the leading exponents of both lists." },
          { "zh": "指數較大者直接取用。", "en": "Take the term with the larger exponent." },
          { "zh": "指數相同則係數相加;和為 0 則捨去該項。", "en": "Equal exponents: add coefficients; drop the term if the sum is zero." }
        ] },
        { "type": "code", "lang": "cpp", "file": "poly_padd.cpp", "code": "else {\n    int sum = A[i].coef + B[j].coef;\n    if (sum != 0) C.push_back({ sum, A[i].exp });\n    i++; j++;\n}" }
      ] },
    { "heading": { "zh": "複雜度", "en": "Complexity" },
      "blocks": [
        { "type": "bullets", "items": [
          { "zh": "時間 O(m + n)(各項僅處理一次)", "en": "Time O(m + n) — each term processed once" },
          { "zh": "空間 O(m + n)", "en": "Space O(m + n)" }
        ] }
      ] }
  ]
};
SLIDES_DB["maze-stack"] = {
  "category": "Linear Structures",
  "title": { "zh": "迷宮回溯(堆疊)", "en": "Maze Backtracking (Stack)" },
  "slides": [
    { "heading": { "zh": "用堆疊解迷宮", "en": "Solving a Maze with a Stack" },
      "blocks": [
        { "type": "paragraph", "text": { "zh": "深度優先搜尋用顯式堆疊記錄目前路徑;走得通就推入,走不通就彈出回溯。", "en": "Depth-first search keeps the current path on an explicit stack: push when you can advance, pop to backtrack." } },
        { "type": "steps", "items": [
          { "zh": "推入起點。", "en": "Push the start cell." },
          { "zh": "嘗試走到第一個未訪的通道鄰格並推入。", "en": "Move to the first unvisited open neighbour and push it." },
          { "zh": "無路可走則彈出(回溯)。", "en": "If stuck, pop (backtrack)." },
          { "zh": "到達終點時,堆疊即為解路徑。", "en": "When you reach the end, the stack is the solution path." }
        ] }
      ] },
    { "heading": { "zh": "複雜度", "en": "Complexity" },
      "blocks": [
        { "type": "bullets", "items": [
          { "zh": "每格最多訪一次:O(R·C)", "en": "Each cell visited at most once: O(R·C)" },
          { "zh": "堆疊/visited 空間 O(R·C)", "en": "Stack/visited space O(R·C)" }
        ] }
      ] }
  ]
};
SLIDES_DB["list-doubly"] = {
  "category": "Linear Structures",
  "title": { "zh": "雙向 / 環狀串列", "en": "Doubly / Circular Linked List" },
  "slides": [
    { "heading": { "zh": "雙向串列", "en": "Doubly Linked List" },
      "blocks": [
        { "type": "paragraph", "text": { "zh": "每個節點同時保有 prev 與 next 指標,可正向與反向走訪。", "en": "Each node holds both prev and next pointers, allowing forward and backward traversal." } },
        { "type": "note", "text": { "zh": "已知節點時,插入/刪除為 O(1)。", "en": "Given a node, insertion/deletion is O(1)." } }
      ] },
    { "heading": { "zh": "環狀串列", "en": "Circular Variant" },
      "blocks": [
        { "type": "bullets", "items": [
          { "zh": "尾節點的 next 指回頭節點。", "en": "The tail's next points back to the head." },
          { "zh": "頭節點的 prev 指向尾節點。", "en": "The head's prev points to the tail." },
          { "zh": "適合輪詢 / 環形緩衝等場景。", "en": "Useful for round-robin / ring buffers." }
        ] }
      ] }
  ]
};
SLIDES_DB["search-fibonacci"] = {
  "category": "Searching & String Matching",
  "title": { "zh": "費氏搜尋", "en": "Fibonacci Search" },
  "slides": [
    { "heading": { "zh": "概念", "en": "Idea" },
      "blocks": [
        { "type": "paragraph", "text": { "zh": "在已排序陣列上,用費氏數來切分搜尋範圍,只需加減、不需除法。", "en": "Search a sorted array by splitting the range at Fibonacci offsets — only additions/subtractions, no division." } },
        { "type": "bullets", "items": [
          { "zh": "取 ≥ n 的最小費氏數作為起點。", "en": "Start from the smallest Fibonacci number ≥ n." },
          { "zh": "探測點 = offset + fib2(夾在陣列範圍內)。", "en": "Probe = offset + fib2 (clamped to the array)." },
          { "zh": "依比較結果讓費氏數往下一階移動。", "en": "Step the Fibonacci numbers down based on the comparison." }
        ] }
      ] },
    { "heading": { "zh": "複雜度", "en": "Complexity" },
      "blocks": [
        { "type": "bullets", "items": [
          { "zh": "時間 O(log N);空間 O(1)", "en": "Time O(log N); Space O(1)" },
          { "zh": "避免除法,對某些硬體較友善。", "en": "Avoids division — friendlier on some hardware." }
        ] }
      ] }
  ]
};
SLIDES_DB["search-interpolation"] = {
  "category": "Searching & String Matching",
  "title": { "zh": "內插搜尋", "en": "Interpolation Search" },
  "slides": [
    { "heading": { "zh": "概念", "en": "Idea" },
      "blocks": [
        { "type": "paragraph", "text": { "zh": "假設資料均勻分佈,用線性內插「猜」目標的位置,而非每次取中點。", "en": "Assuming uniform data, guess the target's position by linear interpolation instead of always taking the midpoint." } },
        { "type": "math", "tex": "pos = lo + \\frac{(target - a[lo])\\,(hi - lo)}{a[hi] - a[lo]}", "caption": { "zh": "內插位置公式", "en": "Interpolation position formula" } }
      ] },
    { "heading": { "zh": "複雜度", "en": "Complexity" },
      "blocks": [
        { "type": "bullets", "items": [
          { "zh": "平均 O(log log N)(均勻分佈時);最壞 O(N)", "en": "Average O(log log N) (uniform data); worst O(N)" },
          { "zh": "需注意 a[hi]=a[lo] 的除以零情形。", "en": "Watch out for division by zero when a[hi] = a[lo]." }
        ] }
      ] }
  ]
};
SLIDES_DB["tree-threaded"] = {
  "category": "Trees",
  "title": { "zh": "引線二元樹", "en": "Threaded Binary Tree" },
  "slides": [
    { "heading": { "zh": "概念", "en": "Idea" },
      "blocks": [
        { "type": "paragraph", "text": { "zh": "一般二元樹有許多浪費的空(null)指標;引線樹讓「右空指標」指向中序後繼。", "en": "A binary tree wastes many null pointers; a threaded tree makes each null right pointer point to the inorder successor." } },
        { "type": "bullets", "items": [
          { "zh": "右指標為空 → 設為指向中序後繼的引線。", "en": "Null right pointer → a thread to the inorder successor." },
          { "zh": "可在 O(1) 額外空間下完成中序走訪(免遞迴/堆疊)。", "en": "Enables inorder traversal in O(1) extra space (no recursion/stack)." }
        ] }
      ] },
    { "heading": { "zh": "走訪", "en": "Traversal" },
      "blocks": [
        { "type": "steps", "items": [
          { "zh": "從根往左走到最左節點。", "en": "From the root, go left to the leftmost node." },
          { "zh": "造訪節點;若右為引線,沿引線到後繼。", "en": "Visit the node; if its right is a thread, follow it to the successor." },
          { "zh": "否則往右子樹再走到最左。", "en": "Otherwise go to the right subtree and then leftmost." }
        ] }
      ] }
  ]
};
SLIDES_DB["tree-mway"] = {
  "category": "Trees",
  "title": { "zh": "m 路搜尋樹", "en": "m-way Search Tree" },
  "slides": [
    { "heading": { "zh": "定義", "en": "Definition" },
      "blocks": [
        { "type": "paragraph", "text": { "zh": "二元搜尋樹的推廣:每個節點最多有 m−1 個排序鍵與 m 個子節點。", "en": "A generalization of the BST: each node has up to m−1 sorted keys and up to m children." } },
        { "type": "note", "text": { "zh": "鍵把鍵值區間切成數段,各段對應一個子指標。", "en": "Keys partition the value range into segments, each with a child pointer." } }
      ] },
    { "heading": { "zh": "插入", "en": "Insertion" },
      "blocks": [
        { "type": "steps", "items": [
          { "zh": "在節點內找到鍵應落的區間。", "en": "Within a node, find the segment the key belongs to." },
          { "zh": "若該子指標為空:節點未滿則直接插入,已滿則新建子節點。", "en": "If that child is null: insert into the node if it has room, else create a new child." },
          { "zh": "否則往該子節點下降,重複。", "en": "Otherwise descend into that child and repeat." }
        ] },
        { "type": "code", "lang": "cpp", "file": "tree_mway.cpp", "code": "if (p->children[i] == nullptr) {\n    if ((int)p->keys.size() < m - 1)\n        p->keys.insert(p->keys.begin() + i, key);\n    else\n        p->children[i] = makeLeaf(key);\n    return root;\n}\np = p->children[i];" }
      ] }
  ]
};
module.exports = SLIDES_DB;
