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
  "graph-adjlist": {
    "category": "Graphs",
    "title": { "zh": "鄰接串列", "en": "Adjacency List" },
    "slides": [
      {
        "heading": { "zh": "鄰接串列", "en": "Adjacency List" },
        "blocks": [
          { "type": "paragraph", "text": {
              "zh": "以每個頂點為起點的鏈結串列來表示圖的邊；對稀疏圖比鄰接矩陣更省記憶體。",
              "en": "Represent a graph by, for each vertex, a linked list of its neighbors; far more space-efficient than an adjacency matrix on sparse graphs." } }
        ]
      },
      {
        "heading": { "zh": "核心概念", "en": "Core Concept" },
        "blocks": [
          { "type": "paragraph", "text": {
              "zh": "一個大小為 $V$ 的陣列，每格 `adj[v]` 是一條串列，儲存 $v$ 的所有鄰居。無向圖中每條邊 $(u, v)$ 同時加進 `adj[u]` 與 `adj[v]`。",
              "en": "An array of size $V$ where each cell `adj[v]` is a list storing every neighbor of $v$. For an undirected graph, each edge $(u, v)$ is appended to both `adj[u]` and `adj[v]`." } },
          { "type": "bullets", "items": [
              { "zh": "空間 $O(V + E)$；對稀疏圖明顯優於矩陣的 $O(V^2)$。", "en": "Space $O(V + E)$; clearly beats the matrix's $O(V^2)$ on sparse graphs." },
              { "zh": "遍歷某頂點的鄰居 $O(\\deg(v))$，與該頂點度數成正比。", "en": "Iterating $v$'s neighbors is $O(\\deg(v))$, proportional to its degree." },
              { "zh": "判斷某條邊存在需 $O(\\deg(v))$；矩陣為 $O(1)$。", "en": "Edge-exists query is $O(\\deg(v))$ here vs $O(1)$ in a matrix." }
          ] }
        ]
      },
      {
        "heading": { "zh": "運作流程", "en": "Operation Flow" },
        "blocks": [
          { "type": "steps", "items": [
              { "zh": "建立大小為 $V$ 的串列陣列，每格初始為空。", "en": "Create an array of $V$ empty lists." },
              { "zh": "插入邊 $(u, v)$ 時，把 $v$ 追加到 `adj[u]`，把 $u$ 追加到 `adj[v]`（無向圖）。", "en": "To insert edge $(u, v)$, append $v$ to `adj[u]` and $u$ to `adj[v]` (undirected)." },
              { "zh": "遍歷頂點 $u$ 的所有鄰居時，逐項走 `adj[u]` 串列。", "en": "To iterate all neighbors of $u$, walk through `adj[u]`." }
          ] },
          { "type": "mermaid", "code": "flowchart LR\n  V0[\"adj[0]\"] --> A[1] --> B[4] --> N0[null]\n  V1[\"adj[1]\"] --> C[0] --> D[2] --> E[3] --> F[4] --> N1[null]\n  V2[\"adj[2]\"] --> G[1] --> H[3] --> N2[null]\n  V3[\"adj[3]\"] --> I[1] --> J[2] --> K[4] --> N3[null]\n  V4[\"adj[4]\"] --> L[0] --> M[1] --> O[3] --> N4[null]" }
        ]
      },
      {
        "heading": { "zh": "示意圖", "en": "Layout" },
        "blocks": [
          { "type": "svg", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 110\" width=\"360\"><g font-family=\"monospace\" font-size=\"13\"><text x=\"0\"   y=\"20\">[0] -&gt; 1 -&gt; 4 -&gt; null</text><text x=\"0\"   y=\"40\">[1] -&gt; 0 -&gt; 2 -&gt; 3 -&gt; 4 -&gt; null</text><text x=\"0\"   y=\"60\">[2] -&gt; 1 -&gt; 3 -&gt; null</text><text x=\"0\"   y=\"80\">[3] -&gt; 1 -&gt; 2 -&gt; 4 -&gt; null</text><text x=\"0\"   y=\"100\">[4] -&gt; 0 -&gt; 1 -&gt; 3 -&gt; null</text></g></svg>" },
          { "type": "note", "text": {
              "zh": "同一張 5 節點圖在 visualizer 裡以這樣的串列形式呈現；對照矩陣表示法可看出空間差異。",
              "en": "The same 5-node graph rendered as adjacency lists; compare with the matrix representation to see the space tradeoff." } }
        ]
      },
      {
        "heading": { "zh": "複雜度分析", "en": "Complexity Analysis" },
        "blocks": [
          { "type": "table",
            "headers": [ { "zh": "操作", "en": "Operation" }, { "zh": "時間", "en": "Time" }, { "zh": "空間", "en": "Space" } ],
            "rows": [
              [ { "zh": "建構", "en": "Build" }, { "zh": "$O(V + E)$", "en": "$O(V + E)$" }, { "zh": "$O(V + E)$", "en": "$O(V + E)$" } ],
              [ { "zh": "插入邊", "en": "addEdge" }, { "zh": "$O(1)$", "en": "$O(1)$" }, { "zh": "$O(1)$", "en": "$O(1)$" } ],
              [ { "zh": "遍歷鄰居", "en": "iterate neighbors" }, { "zh": "$O(\\deg(v))$", "en": "$O(\\deg(v))$" }, { "zh": "$O(1)$", "en": "$O(1)$" } ],
              [ { "zh": "邊查詢", "en": "edge query" }, { "zh": "$O(\\deg(v))$", "en": "$O(\\deg(v))$" }, { "zh": "$O(1)$", "en": "$O(1)$" } ],
              [ { "zh": "空間合計", "en": "Total Space" }, { "zh": "—", "en": "—" }, { "zh": "$O(V + E)$", "en": "$O(V + E)$" } ]
            ] },
          { "type": "math", "tex": "O(V + E) \\;\\ll\\; O(V^2) \\text{ when } E \\ll V^2", "caption": {
              "zh": "稀疏圖（$E \\ll V^2$）時鄰接串列的空間明顯較佳。",
              "en": "For sparse graphs ($E \\ll V^2$), the adjacency list is substantially more space-efficient." } }
        ]
      },
      {
        "heading": { "zh": "程式碼", "en": "Source Code" },
        "blocks": [
          { "type": "code", "lang": "cpp", "code": "class Graph {\n    int V;\n    vector<list<int>> adj;\npublic:\n    Graph(int v) : V(v), adj(v) {}\n    void addEdge(int u, int v) {\n        adj[u].push_back(v);\n        adj[v].push_back(u);\n    }\n};" }
        ]
      },
      {
        "heading": { "zh": "優缺點與使用時機", "en": "Pros, Cons & When to Use" },
        "blocks": [
          { "type": "bullets", "items": [
              { "zh": "優點：稀疏圖空間 $O(V+E)$ 比矩陣 $O(V^2)$ 小很多。", "en": "Pro: $O(V+E)$ space for sparse graphs vs $O(V^2)$ for matrix." },
              { "zh": "優點：遍歷鄰居只走 $\\deg(v)$ 個元素，不需掃整列。", "en": "Pro: iterating neighbors visits only $\\deg(v)$ items, not a full row." },
              { "zh": "缺點：邊查詢需走串列（$O(\\deg(v))$），矩陣 $O(1)$。", "en": "Con: edge query is $O(\\deg(v))$ vs $O(1)$ for matrix." },
              { "zh": "適用：稀疏圖、邊集合操作為主、需要遍歷鄰居的演算法（BFS / DFS / Dijkstra）。", "en": "Use for sparse graphs, edge-iteration-heavy algorithms (BFS / DFS / Dijkstra)." }
          ] }
        ]
      },
      {
        "heading": { "zh": "小結", "en": "Summary" },
        "blocks": [
          { "type": "bullets", "items": [
              { "zh": "陣列 + 串列；每邊存兩次（無向）。", "en": "Array + lists; each edge stored twice for undirected." },
              { "zh": "空間 $O(V+E)$，遍歷鄰居 $O(\\deg(v))$。", "en": "Space $O(V+E)$, iterate neighbors $O(\\deg(v))$." },
              { "zh": "對稀疏圖是首選；BFS / DFS / Dijkstra / Kruskal 內部皆使用此表示。", "en": "Default representation for sparse graphs; used internally by BFS / DFS / Dijkstra / Kruskal." }
          ] }
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
  }
};

module.exports = SLIDES_DB;
