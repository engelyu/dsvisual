# C++ Data Structures & Algorithms Visualizer

An interactive, browser-based visualizer for C++ data structures and algorithms. No backend required — open `index.html` directly in a browser.

## Live Demo

```
open index.html
```

## Features

- Side-by-side **animated visualization** and **C++ source code** display
- Step-through animation with **pause / stop** controls
- Algorithm descriptions with **time & space complexity**
- Covers **37+ data structures and algorithms**

## Supported Algorithms

### Data Structures
| Category | Implementations |
|----------|----------------|
| **Stack** | Array, Linked List |
| **Queue** | Standard Queue |
| **List** | Array-based, Linked List |
| **Graph** | Adjacency representation, traversal |
| **Hash Table** | Chaining, Open Addressing, Bucket Hashing |
| **Heap / Priority Queue** | Binary Heap, Binomial Queue, Fibonacci Heap, Leftist Heap, Skew Heap, 4-ary Heap, Pairing Heap |

### Trees
| Type | Description |
|------|-------------|
| BST | Binary Search Tree |
| AVL | Self-balancing BST with rotations |
| Red-Black Tree | Approximated coloring visualization |
| Splay Tree | Splay (zig/zig-zig/zig-zag) operations |
| Trie | Prefix tree with string input |
| Radix Tree | Compressed prefix tree |
| TST | Ternary Search Tree |
| B-Tree | Multi-way balanced tree |
| B+ Tree | B-Tree variant with leaf-linked data |
| Tree Traversal | Pre/In/Post/Level-order, recursive & iterative |
| Huffman Coding | Greedy optimal prefix-code tree construction |
| Optimal BST | DP table → reconstructed minimum-cost tree |

### Sorting Algorithms
| Algorithm | Category |
|-----------|----------|
| Bubble Sort | Comparison |
| Selection Sort | Comparison |
| Insertion Sort | Comparison |
| Quick Sort | Comparison |
| Merge Sort | Comparison |
| Shell Sort | Comparison |
| Bucket Sort | Non-comparison |
| Counting Sort | Non-comparison |
| Radix Sort | Non-comparison |
| Heap Sort | Non-comparison |
| External Merge Sort | Run generation + winner-tree k-way merge |

### Graphs
| Algorithm | Description |
|-----------|-------------|
| AOE / Critical Path | Forward/backward pass, critical activities |

### Linear Structures / Stack
| Algorithm | Description |
|-----------|-------------|
| Infix → Postfix | Shunting-yard conversion + stack evaluation |
| Maze (Stack Backtracking) | DFS with an explicit path stack |
| Doubly / Circular Linked List | prev/next pointers, forward & backward |

### Arrays
| Algorithm | Description |
|-----------|-------------|
| Sparse Matrix | Triple representation + FAST_TRANSPOSE |
| Polynomial Addition | Two-pointer merge of term lists |

### Search Algorithms
- Linear Search
- Binary Search

## Project Structure

```
dsvisual/
├── index.html          # Main UI (mode toggles, visualization canvas, controls)
├── style.css           # Glassmorphism-style CSS
├── app.js              # Core logic: JS data structure implementations + animation engine
├── code_db.js          # Auto-generated: C++ source strings for display (do not edit manually)
├── desc_db.js          # Algorithm descriptions and complexity notes
├── build_db.js         # Node.js script: rebuilds code_db.js from .cpp files
├── heap_models.js      # Shared heap logic used by UI and unit tests
├── *.cpp               # C++ source files (one per algorithm/data structure)
├── tests/
│   ├── visualizer.spec.js       # Core Playwright suite
│   ├── heap_visualizer.spec.js  # Heap E2E suite
│   └── unit/
│       └── heap_models.test.js  # Node unit tests for heap invariants
└── playwright.config.js
```

## Getting Started

### Prerequisites

- Node.js (for rebuilding the code DB and running tests)
- A modern browser (Chrome recommended)

### Run the Visualizer

No build step needed:

```bash
open index.html
```

### Rebuild `code_db.js` After Editing `.cpp` Files

```bash
node build_db.js
```

This reads all `.cpp` source files and regenerates `code_db.js`, which populates the code panel in the UI.

## Testing

Tests use [Playwright](https://playwright.dev/) and run against the local `index.html`.

### Install dependencies

```bash
npm install
```

### Run tests

```bash
npm test                # Playwright E2E
npm run test:unit       # Heap model unit tests (node:test)
npm run test:all        # Unit + E2E
# or
npx playwright test
```

### View test report

```bash
mpx playwright show-report
```

Tests cover initial load state, mode switching, and UI interaction for all major data structures.

## Interactive Heap Tutorials

All 7 heap modes include guided, step-by-step tutorials to help users understand heap operations and invariants:

### Starting a Tutorial

1. Select a heap mode (e.g., **Binary Heap** or **Fibonacci Heap**)
2. Click the **Start Tutorial** button (appears in the Heap Actions panel)
3. A tutorial overlay panel will appear with:
   - Current step number (e.g., "Step 1 / 8")
   - Guidance text explaining the operation
   - Pre-filled input suggestions
   - Highlighted controls to guide interaction

### Tutorial Flow

Each heap tutorial guides you through 8 operations:

| Step | Operation | Goal |
|------|-----------|------|
| 1 | Insert 12 | Create the root node |
| 2 | Insert 7 | Observe key bubbling / tree restructuring |
| 3 | Insert 19 | Build enough structure to inspect |
| 4 | Peek | Verify which value is at the frontier |
| 5 | Merge [3, 8, 15] | See merge/union behavior |
| 6 | Change 19 → 5 | Watch key adjustment and reordering |
| 7 | Extract | Observe root removal and re-heapification |
| 8 | Heap Stats | Review final heap size and structure info |

### Tutorial Navigation

- **Next**: Manually advance to the next step (auto-advances when you complete the expected operation)
- **Restart**: Reset the heap and tutorial progress to the start
- **Exit**: Close the tutorial and return to free-play mode
- **Mode Switch**: Exiting the tutorial's heap mode automatically closes the tutorial

### Heap Modes with Tutorials

- **Binary Heap**: Classic balanced binary tree with complete-structure guarantee
- **Binomial Heap**: Forest of binomial trees linked by degree
- **Fibonacci Heap**: Lazy forest with cut-based amortized optimization
- **Leftist Heap**: Recursive merge-first structure with null-path-length balance
- **Skew Heap**: Self-adjusting skew structure via aggressive swaps
- **4-ary Heap**: Wider branching factor for shallower trees
- **Pairing Heap**: Pairwise meld operations for amortized efficiency

## Architecture

- **No backend** — entirely static, runs from the filesystem
- **Animation engine** — `animState` (`idle` / `paused` / `stopped`) with `async/await sleep()` for step-by-step animation
- **Data separation** — C++ code and descriptions are stored in separate DB files (`code_db.js`, `desc_db.js`) and regenerated by `build_db.js`
- **Syntax highlighting** — powered by [Prism.js](https://prismjs.com/) (C++ theme)

## License

ISC
