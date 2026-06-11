const descDB = {
    'stack-array': `
        <h3>Stack (Array Implementation)</h3>
        <p>A <strong>Stack</strong> is a LIFO (Last In, First Out) data structure, conceptually analogous to a stack of plates. The last element added physically resides on the "top" and is the first to be retrieved.</p>
        <hr>
        <ul>
            <li><strong>Core Mechanism:</strong> Employs a pre-allocated fixed-size array and an integer index pointer (<code>top</code>, typically starting at -1).</li>
            <li><strong>Constraint:</strong> Susceptible to <strong>Stack Overflow</strong> if the user attempts to push items beyond its absolute maximum capacity.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Push Time: O(1)</span>
            <span class="badge time">Pop Time: O(1)</span>
            <span class="badge space">Space: O(N)</span>
        </div>
    `,
    'stack-list': `
        <h3>Stack (Linked List Implementation)</h3>
        <p>A LIFO stack built dynamically without pre-set memory limits.</p>
        <hr>
        <ul>
            <li><strong>Core Mechanism:</strong> Every pushed element is dynamically allocated on the heap as a <code>Node</code>. The <code>top</code> pointer always points to the most recently inserted Node.</li>
            <li><strong>Advantage:</strong> No literal "Overflow" (unless local memory is entirely exhausted). Expands and shrinks smoothly.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Push Time: O(1)</span>
            <span class="badge time">Pop Time: O(1)</span>
            <span class="badge space">Space: O(N)</span>
        </div>
    `,
    'queue': `
        <h3>Queue (Circular Array)</h3>
        <p>A <strong>Queue</strong> is a FIFO (First In, First Out) data structure, imitating a real-world waiting line.</p>
        <hr>
        <ul>
            <li><strong>Core Mechanism:</strong> Uses two pointers, <code>front</code> and <code>rear</code>. Utilizing the modulus mathematical operator <code>%</code> allows the array bounds to seamlessly loop back to zero.</li>
            <li><strong>Advantage:</strong> Circularity prevents the fatal "false full" error of standard continuous arrays when items are dequeued.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Enqueue: O(1)</span>
            <span class="badge time">Dequeue: O(1)</span>
            <span class="badge space">Space: O(N)</span>
        </div>
    `,
    'sort-bucket': `<h3>Bucket Sort</h3><p>A non-comparison sort that distributes elements into a number of buckets. Each bucket is then sorted individually, either using a different sorting algorithm, or by recursively applying the bucket sorting algorithm. It proves extremely efficient when input is uniformly distributed.</p><div class="complexity">Time: <span class="badge badge-green">O(n + k)</span> Space: <span class="badge badge-red">O(n + k)</span></div>`,
    'sort-count': `<h3>Counting Sort</h3><p>An integer sorting algorithm that operates by counting the number of objects that have distinct key values (a kind of hashing). Then uses those counts to determine the positions of each key value in the output sequence.</p><div class="complexity">Time: <span class="badge badge-green">O(n + k)</span> Space: <span class="badge badge-red">O(k)</span></div>`,
    'sort-radix': `<h3>Radix Sort</h3><p>A non-comparative sorting algorithm that avoids comparison by creating and distributing elements into buckets according to their radix. For elements with more than one significant digit, this logical grouping process is repeated for each digit from right to left.</p><div class="complexity">Time: <span class="badge badge-green">O(d * (n + k))</span> Space: <span class="badge badge-red">O(n + k)</span></div>`,
    'sort-shaker': `<h3>Shaker Sort (Cocktail Sort)</h3><p>A variation of Bubble Sort that alternates the sort direction on each pass. After each forward pass that bubbles the largest element right, a backward pass sinks the smallest element left. This bidirectional approach enables small elements to move toward the start more efficiently than standard bubble sort.</p><div class="complexity">Time: <span class="badge badge-red">O(n²)</span> avg, <span class="badge badge-green">O(n)</span> best Space: <span class="badge badge-green">O(1)</span></div>`,
    'heap-binary': `
        <h3>Binary Heap (Priority Queue)</h3>
        <p>A complete binary tree stored in an array, optimized for fast top-priority access.</p>
        <hr>
        <ul>
            <li><strong>Core Mechanism:</strong> Parent-child ordering is maintained by <code>sift up</code> and <code>sift down</code>. You can switch between Min-Heap and Max-Heap comparator modes.</li>
            <li><strong>Use Cases:</strong> Priority scheduling, Dijkstra/Prim support structures, streaming top-k.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Insert: O(log N)</span>
            <span class="badge time">Peek: O(1)</span>
            <span class="badge time">Extract: O(log N)</span>
            <span class="badge time">Merge: O((N+M) log(N+M))</span>
            <span class="badge time">Decrease/Increase: O(log N)</span>
            <span class="badge time">Delete: O(log N)</span>
        </div>
    `,
    'heap-binomial': `
        <h3>Binomial Queue</h3>
        <p>A forest of binomial trees where each degree appears at most once.</p>
        <hr>
        <ul>
            <li><strong>Core Mechanism:</strong> Merge resembles binary addition over tree degrees; linking trees of equal rank is the central operation.</li>
            <li><strong>Strength:</strong> Efficient meld/merge compared to classic binary heap workflows.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Insert: O(1) amortized</span>
            <span class="badge time">Peek: O(log N)</span>
            <span class="badge time">Extract: O(log N)</span>
            <span class="badge time">Merge: O(log N)</span>
            <span class="badge time">Decrease/Increase: O(log N)</span>
            <span class="badge time">Delete: O(log N)</span>
        </div>
    `,
    'heap-fibonacci': `
        <h3>Fibonacci Heap</h3>
        <p>A lazy-merge heap family with very strong amortized bounds for advanced graph algorithms.</p>
        <hr>
        <ul>
            <li><strong>Core Mechanism:</strong> Root-list + deferred consolidation, with <code>cut</code> and <code>cascading cut</code> during key updates.</li>
            <li><strong>Use Cases:</strong> Theoretical optimum for heavy decrease-key workloads.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Insert: O(1) amortized</span>
            <span class="badge time">Peek: O(1)</span>
            <span class="badge time">Extract: O(log N) amortized</span>
            <span class="badge time">Merge: O(1) amortized</span>
            <span class="badge time">Decrease/Increase: O(1) amortized</span>
            <span class="badge time">Delete: O(log N) amortized</span>
        </div>
    `,
    'heap-leftist': `
        <h3>Leftist Heap</h3>
        <p>A merge-friendly heap that keeps a short right spine using null-path-length (NPL) constraints.</p>
        <hr>
        <ul>
            <li><strong>Core Mechanism:</strong> After each merge step, children may swap so that <code>NPL(left) >= NPL(right)</code>.</li>
            <li><strong>Strength:</strong> Merge is the primitive; insert/delete are defined in terms of merge.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Insert: O(log N)</span>
            <span class="badge time">Peek: O(1)</span>
            <span class="badge time">Extract: O(log N)</span>
            <span class="badge time">Merge: O(log N)</span>
            <span class="badge time">Decrease/Increase: O(log N)</span>
            <span class="badge time">Delete: O(log N)</span>
        </div>
    `,
    'heap-skew': `
        <h3>Skew Heap</h3>
        <p>A self-adjusting merge heap with no explicit rank bookkeeping.</p>
        <hr>
        <ul>
            <li><strong>Core Mechanism:</strong> Every merge step swaps children unconditionally, yielding amortized balancing behavior.</li>
            <li><strong>Strength:</strong> Very simple implementation with strong practical merge behavior.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Insert: O(log N) amortized</span>
            <span class="badge time">Peek: O(1)</span>
            <span class="badge time">Extract: O(log N) amortized</span>
            <span class="badge time">Merge: O(log N) amortized</span>
            <span class="badge time">Decrease/Increase: O(log N) amortized</span>
            <span class="badge time">Delete: O(log N) amortized</span>
        </div>
    `,
    'heap-dary': `
        <h3>D-ary Heap (4-ary)</h3>
        <p>A generalization of the binary heap where each node can have four children instead of two.</p>
        <hr>
        <ul>
            <li><strong>Core Mechanism:</strong> Uses a wider branching factor to reduce tree height, trading fewer levels for more child comparisons during <code>sift down</code>.</li>
            <li><strong>Teaching Value:</strong> Makes branching-factor tradeoffs visible in heap maintenance.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Insert: O(log₄ N)</span>
            <span class="badge time">Peek: O(1)</span>
            <span class="badge time">Extract: O(4 log₄ N)</span>
            <span class="badge time">Merge: O((N+M) log₄(N+M))</span>
            <span class="badge time">Decrease/Increase: O(log₄ N)</span>
            <span class="badge time">Delete: O(log₄ N)</span>
        </div>
    `,
    'heap-pairing': `
        <h3>Pairing Heap</h3>
        <p>A practical meld-oriented heap built around repeated pairwise linking of subtrees.</p>
        <hr>
        <ul>
            <li><strong>Core Mechanism:</strong> Insert and merge are handled by a simple <code>meld</code>; extract performs pairwise combination of the removed root's children.</li>
            <li><strong>Teaching Value:</strong> Offers a simpler alternative to Fibonacci heaps while still emphasizing merge-first design.</li>
            <li><strong>Visualizer Note:</strong> The browser model uses an approximated pairing-tree layout to emphasize melding structure.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Insert: O(1) amortized</span>
            <span class="badge time">Peek: O(1)</span>
            <span class="badge time">Extract: O(log N) amortized</span>
            <span class="badge time">Merge: O(1) amortized</span>
            <span class="badge time">Decrease/Increase: O(log N) amortized</span>
            <span class="badge time">Delete: O(log N) amortized</span>
        </div>
    `,
    'graph': `
        <h3>Undirected Graph (Adjacency Matrix)</h3>
        <p>A foundational topological structure meant for connecting generic Nodes (Vertices) using Edges.</p>
        <hr>
        <ul>
            <li><strong>Core Mechanism:</strong> Represented internally as a 2D array grid (a Matrix). A value of <code>1</code> at index <code>[u][v]</code> signifies an active edge between node <code>u</code> and <code>v</code>.</li>
            <li><strong>Concept:</strong> Because this graph is <em>undirected</em>, modifying <code>[u][v]</code> concurrently modifies <code>[v][u]</code> to ensure bidirectional travel.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Add Edge: O(1)</span>
            <span class="badge time">Verify Edge: O(1)</span>
            <span class="badge space">Space: O(V²)</span>
        </div>
    `,
    'graph-kruskal': `
        <h3>Minimum Spanning Tree (Kruskal Algorithm)</h3>
        <p><strong>Kruskal</strong> builds an MST by greedily picking the smallest-weight edge that does not create a cycle.</p>
        <hr>
        <ul>
            <li><strong>Core Mechanism:</strong> Sort edges by weight, then use <code>Disjoint Set Union (Union-Find)</code> to detect cycles efficiently.</li>
            <li><strong>Result:</strong> For a connected graph, MST contains exactly <code>V-1</code> edges with minimum total weight.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Sort Edges: O(E log E)</span>
            <span class="badge time">Union-Find: O(E α(V))</span>
            <span class="badge space">Space: O(V + E)</span>
        </div>
    `,
    'graph-dijkstra': `
        <h3>Dijkstra's Shortest Path Algorithm</h3>
        <p><strong>Dijkstra</strong> computes the shortest path from a source node to all other nodes in a weighted graph with non-negative edge weights.</p>
        <hr>
        <ul>
            <li><strong>Core Mechanism:</strong> Use a priority queue to always process the unvisited node with the smallest distance first, then relax its outgoing edges.</li>
            <li><strong>Greedy Approach:</strong> Once a node is visited, its shortest distance is finalized and never updated.</li>
            <li><strong>Limitation:</strong> Cannot handle negative edge weights. For that, use Bellman-Ford algorithm.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Binary Heap: O((V + E) log V)</span>
            <span class="badge time">Fibonacci Heap: O(E + V log V)</span>
            <span class="badge space">Space: O(V)</span>
        </div>
    `,
    'graph-topo': `
        <h3>Topological Sort</h3>
        <p><strong>Topological Sort</strong> arranges nodes of a directed acyclic graph (DAG) in a linear order such that every edge goes from an earlier node to a later node.</p>
        <hr>
        <ul>
            <li><strong>Kahn's Algorithm (BFS-based):</strong> Remove nodes with in-degree 0 repeatedly, adding them to the result in order.</li>
            <li><strong>DFS-based approach:</strong> Perform DFS and record nodes in reverse post-order.</li>
            <li><strong>Requirement:</strong> Input must be a DAG. If a cycle exists, topological sort is undefined.</li>
            <li><strong>Applications:</strong> Task scheduling, dependency resolution, instruction ordering in compilers.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Time: O(V + E)</span>
            <span class="badge space">Space: O(V)</span>
        </div>
    `,
    'tree-bst': `
        <h3>Binary Search Tree (Standard)</h3>
        <p>An elegant hierarchical associative routing structure.</p>
        <hr>
        <ul>
            <li><strong>Core Rule:</strong> Every node to the <em>left</em> of a parent must be strictly <strong>less than</strong> the parent. Every node to the <em>right</em> must be strictly <strong>greater</strong>.</li>
            <li><strong>Risk:</strong> Standard BSTs possess no balancing logic. If sorted data is inserted consecutively, the tree severely degenerates into an unbalanced linked list (O(N) retrieval).</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Best Search/Insert: O(log N)</span>
            <span class="badge exception">Worst Case: O(N)</span>
            <span class="badge space">Space: O(N)</span>
        </div>
    `,
    'tree-bst': `
        <h3>Binary Search Tree (Standard)</h3>
        <p>An elegant hierarchical associative routing structure.</p>
        <hr>
        <ul>
            <li><strong>Core Rule:</strong> Every node to the <em>left</em> of a parent must be strictly <strong>less than</strong> the parent. Every node to the <em>right</em> must be strictly <strong>greater</strong>.</li>
            <li><strong>Risk:</strong> Standard BSTs possess no balancing logic. If sorted data is inserted consecutively, the tree severely degenerates into an unbalanced linked list (O(N) retrieval).</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Best Search/Insert: O(log N)</span>
            <span class="badge exception">Worst Case: O(N)</span>
            <span class="badge space">Space: O(N)</span>
        </div>
    `,
    'tree-avl': `
        <h3>AVL Height-Balanced Tree</h3>
        <p>A self-balancing binary search tree. Named after their inventors (Adelson-Velsky and Landis).</p>
        <hr>
        <ul>
            <li><strong>Core Mechanism:</strong> Every node monitors its "Height". If a node detects its left and right sub-trees differ in height by more than <strong>1</strong>, it instantly triggers structural re-alignment.</li>
            <li><strong>Rotations:</strong> Uses sophisticated pointer manipulations (Left-Left, Right-Right, Left-Right, Right-Left) to gracefully flatten and distribute depths.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Strict Search: O(log N)</span>
            <span class="badge time">Strict Insert: O(log N)</span>
            <span class="badge space">Space: O(N)</span>
        </div>
    `,
    'tree-rb': `
        <h3>Red-Black Tree</h3>
        <p>An extremely popular self-balancing BST prominently used for maps and sets internally within languages like C++ (std::map) and Java.</p>
        <hr>
        <ul>
            <li><strong>Core Mechanism:</strong> Limits depth extremities via coloring logic. Red nodes cannot have Red children, and the physical path from root to leaf must feature identical Black Node counts.</li>
            <li><strong>Design:</strong> Less strictly balanced than AVL trees resulting in faster bulk insertions but fractionally slower strict look-ups.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Avg Search: O(log N)</span>
            <span class="badge time">Avg Insert: O(log N)</span>
            <span class="badge space">Space: O(N)</span>
        </div>
    `,
    'tree-splay': `
        <h3>Splay Tree</h3>
        <p>A highly adaptable self-balancing search tree featuring powerful implicit caching.</p>
        <hr>
        <ul>
            <li><strong>Core Mechanism:</strong> Whenever a node is accessed, queried, or inserted, the tree aggressively "splays" (rotates via Zig, Zig-Zag, Zig-Zig) until that node becomes the absolute new <strong>Root</strong>.</li>
            <li><strong>Real-World Use:</strong> Brilliant for skewed networks where 20% of the nodes are accessed 80% of the time, keeping popular data automatically close to O(1).</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Amortized Access: O(log N)</span>
            <span class="badge exception">Worst Isolated Query: O(N)</span>
        </div>
    `,
    'list-array': `
        <h3>Array-Based Index List</h3>
        <p>A continuous block of memory mapping elements to numbered indices.</p>
        <hr>
        <ul>
            <li><strong>Core Mechanism:</strong> When inserting items into the physical middle, the program must systematically copy and shift all subsequent values further right.</li>
            <li><strong>Advantage:</strong> Supreme read performance since indices calculate direct literal memory bounds instantly.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Random Read: O(1)</span>
            <span class="badge exception">Mid-Insertion: O(N)</span>
        </div>
    `,
    'list-linked': `
        <h3>Singly Linked List</h3>
        <p>A fragmented sequential list formed by scattered memory addresses chained via directional pointers.</p>
        <hr>
        <ul>
            <li><strong>Core Mechanism:</strong> Head node points forward blindly. Retrieving index '5' implies sequentially traversing <code>next -> next -> next</code>.</li>
            <li><strong>Advantage:</strong> Zero overhead middle insertion because bounds do not physically shift; only two structural pointers are updated.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Front Insertion: O(1)</span>
            <span class="badge exception">Deep Target Read: O(N)</span>
        </div>
    `,
    'search-linear': `
        <h3>Linear Search Algorithm</h3>
        <p>The most barbaric but foolproof technique to locate a target within an unordered array.</p>
        <hr>
        <ul>
            <li><strong>Core Mechanism:</strong> Executes an absolute scan starting exclusively from Index 0, checking every value sequentially in order until encountering a valid match point.</li>
            <li><strong>Application:</strong> Mandatory for chaotic, totally unsorted data sets where geometric estimations are impossible.</li>
        </ul>
        <div class="complexities">
            <span class="badge exception">Worst Case: O(N)</span>
        </div>
    `,
    'search-binary': `
        <h3>Binary Search Algorithm</h3>
        <p>A geometric divide-and-conquer strategy optimized exclusively for pre-sorted arrays.</p>
        <hr>
        <ul>
            <li><strong>Core Mechanism:</strong> Compares the target directly against the absolute Middle element. If target is higher, the entire Left half is violently pruned. Continues bounding until Left pointer surpasses Right pointer.</li>
            <li><strong>Efficiency:</strong> Can pinpoint 1 value amongst 1 million items in precisely 20 logical checks.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Search Time: O(log N)</span>
        </div>
    `,
    'sort-bubble': `
        <h3>Bubble Sort</h3>
        <p>The infamous beginner's sorting loop focused on local adjacency.</p>
        <hr>
        <ul>
            <li><strong>Core Mechanism:</strong> Iteratively checks pairs of adjacent elements, aggressively swapping them if the left side violates sorting logic. Large elements computationally "bubble" their way to the ultimate end bounds.</li>
            <li><strong>Reality:</strong> Universally condemned for large arrays due to immense wasteful localized friction swaps.</li>
        </ul>
        <div class="complexities">
            <span class="badge exception">Avg Time: O(N²)</span>
            <span class="badge space">Relative Space: O(1)</span>
        </div>
    `,
    'sort-select': `
        <h3>Selection Sort</h3>
        <p>An absolute minimal-operation comparative search swap loop.</p>
        <hr>
        <ul>
            <li><strong>Core Mechanism:</strong> Dedicates the entire inner loop simply to identifying the factual Global Minimum of the remaining unsorted grid. Once found, executes a singular swap dropping it to the bounds.</li>
            <li><strong>Advantage:</strong> While agonizingly slow computationally, its extremely low memory assignment writes (max N swaps) has historic niche merit.</li>
        </ul>
        <div class="complexities">
            <span class="badge exception">Avg Time: O(N²)</span>
            <span class="badge space">Relative Space: O(1)</span>
        </div>
    `,
    'sort-insert': `
        <h3>Insertion Sort</h3>
        <p>A fluid relative bounding sorting mechanic mirroring how humans organize a hand of Poker cards.</p>
        <hr>
        <ul>
            <li><strong>Core Mechanism:</strong> Sweeps rightwards sequentially, seizing a specific element and dragging it backwards through the verified chunk until locating its flawless numerical relative resting spot.</li>
            <li><strong>Advantage:</strong> Devastatingly fast (O(N)) on sets that are completely nearly-sorted.</li>
        </ul>
        <div class="complexities">
            <span class="badge exception">Avg Time: O(N²)</span>
            <span class="badge time">Nearly Sorted Time: O(N)</span>
        </div>
    `,
    'sort-quick': `
        <h3>Quick Sort</h3>
        <p>The industry benchmark standard for generalized array sorting built heavily around Pivot Partitioning.</p>
        <hr>
        <ul>
            <li><strong>Core Mechanism:</strong> Nominates an arbitrary bounding <strong>Pivot</strong> element (often the tail-end limit point). Scans and structurally segregates all smaller variables to the left bounds, and greater elements to right bounds. Recursively launches identically on all fragments.</li>
            <li><strong>Risk:</strong> Devastating recursion chain failure (O(N²)) if applied improperly to explicitly inverse or pre-sorted datasets without pivot scrambling.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Avg Time: O(N log N)</span>
            <span class="badge space">Callstack Space: O(log N)</span>
        </div>
    `,
    'sort-merge': `
        <h3>Merge Sort</h3>
        <p>A purely theoretical mathematical divide-and-conquer masterclass ensuring stable operations.</p>
        <hr>
        <ul>
            <li><strong>Core Mechanism:</strong> Slices the master array geometrically in half indefinitely until every node stands completely solitary. Iteratively intertwines blocks hierarchically guaranteeing linear sorted merging logic upwards.</li>
            <li><strong>Tradeoff:</strong> The absolute best algorithm for stability limits, but structurally mandates allocating massive clone arrays.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Ultimate Strict Time: O(N log N)</span>
            <span class="badge exception">Auxiliary Space Overhead: O(N)</span>
        </div>
    `,
    'sort-shell': `
        <h3>Shell Sort</h3>
        <p>An aggressive, fascinating interval-skipping upgrade built upon standard Insertion Sort frames.</p>
        <hr>
        <ul>
            <li><strong>Core Mechanism:</strong> Bypasses localized friction by swapping distant elements. Shrinks "Gaps" (often n/2, n/4...) geometrically. By the exact final step phase (Gap=1 standard Insertion), the data is nearly flawlessly resolved computationally.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Avg Time: O(N^(1.25))</span>
            <span class="badge space">Relative Space: O(1)</span>
        </div>
    `,
    'hash-chain': `
        <h3>Hash Table (Separate Chaining)</h3>
        <p>A resilient Hash Table avoiding absolute overflow by chaining deeply.</p>
        <hr>
        <ul>
            <li><strong>Core Mechanism:</strong> The memory Array contains simple Pointers to Linked List Heads instead of raw values. When multiple elements target the same Index (Collision), they are harmlessly appended to that index's isolated Linked List chain.</li>
            <li><strong>Advantage:</strong> The Table conceptually never runs out of physical space, and avoids catastrophic table-wide shifts during heavy clustering. Load Factor can easily exceed 1.0 safely.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Avg Insert/Lookup: O(1)</span>
            <span class="badge exception">Clustered Worst: O(N)</span>
            <span class="badge space">Space: O(N) Pointer Allocations</span>
        </div>
    `,
    'hash-open': `
        <h3>Hash Table (Open Addressing w/ Linear Probing)</h3>
        <p>A closed-space array format maximizing computational caching efficiency by keeping all memory physically adjacent.</p>
        <hr>
        <ul>
            <li><strong>Core Mechanism:</strong> Every real Array slot can strictly hold <strong>one</strong> element. Upon attempting to insert and detecting an occupied collision, it will <em>Probe</em> (jump sequentially +1) until discovering an empty adjacent territory.</li>
            <li><strong>Risk:</strong> Prone to Primary Clustering. If indexes gather consecutively, new collisions suffer severe cascading displacement delays. The Array will structurally fail entirely at Size = Capacity.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Avg Access: O(1)</span>
            <span class="badge exception">Strict Clustered Overload: O(N)</span>
        </div>
    `,
    'hash-bucket': `
        <h3>Hash Table (Closed Addressing w/ N-Buckets)</h3>
        <p>A fascinating structural hybrid mimicking physical hardware block transfers.</p>
        <hr>
        <ul>
            <li><strong>Core Mechanism:</strong> Transforms standard indices into massive bounded "Blocks" or "Buckets" capable of housing <strong>Multiple Elements</strong> (e.g. 2, 4, 8 spaces per Bucket Address) simultaneously!</li>
            <li><strong>Collision Logistics:</strong> A collision within a single Index operates harmoniously provided the Bucket capacity isn't fully exhausted. If exhausted, it classically falls back to adjacent Block Probing. It balances cache locality hits against clustered pointer overhead.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Avg Bounded Insert: O(1)</span>
            <span class="badge exception">Saturated Block Failure: O(T)</span>
        </div>
    `,
    'tree-trie': `
        <h3>Trie (Prefix Tree)</h3>
        <p>A specialized massive 26-ary tree mapped strictly to the alphabet, dominating Prefix Search.</p>
        <hr>
        <ul>
            <li><strong>Core Mechanism:</strong> Nodes do NOT store characters directly! The character is implicitly defined by the <em>Edge</em> (the pointer index 0-25) chosen to traverse to the next Node. A boolean flag marks a Node as a valid <strong>Word End</strong>.</li>
            <li><strong>Advantage:</strong> Finding a string or all autocomplete prefixes strictly takes time exactly equal to the length of the string, completely independent of how many millions of words exist in the dictionary.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Search Time: O(L) [L = Word Length]</span>
            <span class="badge exception">Space: O(N·L) nodes (N strings, length L)</span>
        </div>
    `,
    'tree-radix': `
        <h3>Radix Tree (Patricia Trie / Compact Trie)</h3>
        <p>An aggressively space-optimized variant of the Trie resolving its horrific memory usage.</p>
        <hr>
        <ul>
            <li><strong>Core Mechanism:</strong> Identifies long "branches" in a standard Trie that only have a single consecutive child (e.g., W-A-T-E-R), and literally compresses them into a single edge labeled "WATER".</li>
            <li><strong>Splitting:</strong> If "WATCH" is inserted later, the node "WATER" logically fractures at the common prefix "WAT", sprouting two terminal forks: "ER" and "CH".</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Search Time: O(L)</span>
            <span class="badge space">Optimal Space: Low compared to Trie</span>
        </div>
    `,
    'tree-ternary': `
        <h3>Ternary Search Tree (TST)</h3>
        <p>A brilliant hybrid mixing Binary Search Trees with Prefix Tries, ideal for spell-checking.</p>
        <hr>
        <ul>
            <li><strong>Core Mechanism:</strong> Every node actually holds a specific Character and has exactly 3 pointers: Left (alphabetically less), Middle (equal to current char, progress to next letter of word), and Right (alphabetically greater).</li>
            <li><strong>Advantage:</strong> Utterly destroys Trie's massive 26-pointer memory overhead by only allocating standard 3-pointer BST nodes, while remaining vastly superior for finding prefixes than a standard BST.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Avg Search: O(log N + L)</span>
        </div>
    `,
    'tree-btree': `
        <h3>B-Tree (Balanced Multi-way Disk Tree)</h3>
        <p>The undisputed king of physical mechanical Hard Drive / Database indexing hierarchies.</p>
        <hr>
        <ul>
            <li><strong>Core Mechanism:</strong> To minimize slow mechanical Disk Reads, a B-Tree Node is a massive literal Block (or "Page", e.g., 4KB) storing multiple sorted Keys side-by-side. An Order-5 tree holds up to 4 Keys and branches to 5 Sub-blocks per node.</li>
            <li><strong>Splitting:</strong> Unlike basic trees that grow downwards, B-Trees grow <strong>upwards</strong>. When a Block becomes 100% full, it physically splits in half and violently violently pushes its median Key up into its Parent block.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Disk Read Operations: Extremely Low O(log_m N)</span>
        </div>
    `,
    'tree-bplus': `
        <h3>B+ Tree (Optimal Database Indexer)</h3>
        <p>The absolute industry standard tree running beneath MySQL, PostgreSQL, and modern filesystems.</p>
        <hr>
        <ul>
            <li><strong>Core Mechanism:</strong> A stricter B-Tree where Internal Nodes strictly ONLY store index routing copies. 100% of the authentic data resides trapped at the absolute bottom Leaf Level.</li>
            <li><strong>Range Scans:</strong> Because all data is at the bottom, every Leaf node is chained horizontally via a Linked List Pointer. A query like <code>SELECT * WHERE age BETWEEN 10 AND 50</code> finds '10' via tree traversal, then instantly glides horizontally across the leaves until '50' without re-climbing!</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Range Query: O(log_m N + K results)</span>
        </div>
    `,
    'oop-inheritance': `
        <h3>Class Inheritance (IS-A Relationship)</h3>
        <p>Inheritance allows derived classes to acquire properties and methods from a base class, enabling code reuse and establishing hierarchical relationships.</p>
        <hr>
        <ul>
            <li><strong>Base Class:</strong> Defines common interface with virtual methods that derived classes override.</li>
            <li><strong>Derived Classes:</strong> Inherit from base class and can override virtual methods to provide specialized behavior.</li>
            <li><strong>Constructor/Destructor Chaining:</strong> When derived object is created, base constructor is called first. On deletion, destructors execute in reverse order (derived to base).</li>
            <li><strong>Virtual Destructor:</strong> Must be virtual to ensure correct cleanup of derived objects through base pointers.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Lookup: O(1)</span>
            <span class="badge space">Memory: One vptr per object</span>
            <span class="badge exception">Compile-time checked</span>
        </div>
    `,
    'oop-polymorphism': `
        <h3>Virtual Functions & Polymorphism</h3>
        <p>Polymorphism enables objects of different types to be used through the same interface, with the correct method selected at runtime.</p>
        <hr>
        <ul>
            <li><strong>Virtual Pointer (vptr):</strong> Every polymorphic object contains a hidden pointer to its class's Virtual Method Table.</li>
            <li><strong>Virtual Table (VTable):</strong> Array of function pointers, one entry per virtual function, pointing to the correct implementation for that class.</li>
            <li><strong>Dynamic Dispatch:</strong> At runtime, virtual function calls are resolved by following vptr to VTable to actual function implementation.</li>
            <li><strong>Override:</strong> Derived class marks method with <code>override</code> keyword, replacing base class entry in VTable.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Dispatch: O(1)</span>
            <span class="badge space">VTable: O(# virtual methods)</span>
            <span class="badge exception">Runtime overhead: One indirection</span>
        </div>
    `,
    'oop-encapsulation': `
        <h3>Encapsulation & Access Levels</h3>
        <p>Encapsulation protects internal object state by controlling access through well-defined public interfaces while hiding implementation details.</p>
        <hr>
        <ul>
            <li><strong>public:</strong> Members accessible from anywhere. Part of the class contract.</li>
            <li><strong>protected:</strong> Members accessible only by derived classes and the class itself. Used for helper methods.</li>
            <li><strong>private:</strong> Members accessible only within the class. Enforces information hiding and invariant protection.</li>
            <li><strong>friend:</strong> Grants specific external functions/classes access to private members, breaking encapsulation when necessary.</li>
            <li><strong>const-correctness:</strong> <code>const</code> methods cannot modify state, enabling read-only access guarantees.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Access Check: O(1)</span>
            <span class="badge space">Zero runtime overhead</span>
            <span class="badge exception">Compile-time enforcement</span>
        </div>
    `,

    // Design Patterns - Creational
    'pattern-singleton': `
        <h2>🔒 Singleton Pattern</h2>
        <p><strong>Ensures a class has only one instance and provides a global access point to it.</strong></p>
        <ul class="key-points">
            <li><strong>Private Constructor:</strong> Prevents instantiation from outside the class.</li>
            <li><strong>Static Instance:</strong> Maintains a single static instance of the class.</li>
            <li><strong>getInstance():</strong> Lazy initialization - creates instance on first call, returns existing instance on subsequent calls.</li>
            <li><strong>Thread Safety:</strong> In multithreaded environments, use locks or atomic operations.</li>
            <li><strong>Use Cases:</strong> Logger, Database connection pool, Configuration manager.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">getInstance(): O(1)</span>
            <span class="badge space">Single instance in memory</span>
            <span class="badge exception">Global state management</span>
        </div>
    `,

    'pattern-factory': `
        <h2>🏭 Factory Method Pattern</h2>
        <p><strong>Defines an interface for creating objects, but lets subclasses decide the exact class to instantiate.</strong></p>
        <ul class="key-points">
            <li><strong>Product Interface:</strong> Base class/interface for all products the factory creates.</li>
            <li><strong>Concrete Products:</strong> Specific implementations inheriting from product interface.</li>
            <li><strong>Factory Method:</strong> Static or instance method that encapsulates object creation logic.</li>
            <li><strong>Decoupling:</strong> Client code depends on abstractions, not concrete classes.</li>
            <li><strong>Use Cases:</strong> Database drivers, UI element creation, plugin systems.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">createVehicle(): O(1)</span>
            <span class="badge space">Per-instance creation</span>
            <span class="badge exception">Polymorphic dispatch</span>
        </div>
    `,

    // Design Patterns - Structural
    'pattern-adapter': `
        <h2>🔌 Adapter Pattern</h2>
        <p><strong>Converts the interface of a class into another interface clients expect, enabling incompatible interfaces to work together.</strong></p>
        <ul class="key-points">
            <li><strong>Legacy Interface:</strong> Existing class with incompatible interface (LegacyData).</li>
            <li><strong>Target Interface:</strong> New interface clients expect (ModernInterface).</li>
            <li><strong>Adapter Class:</strong> Implements target interface and adapts calls to legacy interface.</li>
            <li><strong>Composition:</strong> Holds reference to legacy object and translates method calls.</li>
            <li><strong>Use Cases:</strong> Third-party library integration, API versioning, legacy system integration.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">fetch(): O(1)</span>
            <span class="badge space">Wrapper overhead</span>
            <span class="badge exception">Single level of indirection</span>
        </div>
    `,

    'pattern-decorator': `
        <h2>🎨 Decorator Pattern</h2>
        <p><strong>Attaches additional responsibilities to an object dynamically, providing a flexible alternative to subclassing.</strong></p>
        <ul class="key-points">
            <li><strong>Component Interface:</strong> Base class defining the core object interface (Coffee).</li>
            <li><strong>Concrete Component:</strong> Original object without decorations (SimpleCoffee).</li>
            <li><strong>Decorator:</strong> Base decorator implementing same interface, holding reference to wrapped component.</li>
            <li><strong>Concrete Decorators:</strong> Add specific behaviors/features (Milk, Sugar).</li>
            <li><strong>Composition over Inheritance:</strong> Chain decorators for flexible combinations.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">getDescription(): O(n) where n=decorator chain length</span>
            <span class="badge space">O(n) for decoration chain</span>
            <span class="badge exception">Runtime composition flexibility</span>
        </div>
    `,

    // Design Patterns - Behavioral
    'pattern-observer': `
        <h2>👁️ Observer Pattern</h2>
        <p><strong>Defines a one-to-many dependency between objects so that when one object changes state, all dependents are notified automatically.</strong></p>
        <ul class="key-points">
            <li><strong>Subject:</strong> Maintains list of observers and notifies them of state changes.</li>
            <li><strong>Observer Interface:</strong> Defines update() method called by subject.</li>
            <li><strong>Concrete Observers:</strong> Implement update() to react to notifications.</li>
            <li><strong>Loose Coupling:</strong> Subject knows only about observer interface, not concrete classes.</li>
            <li><strong>Use Cases:</strong> Event systems, MVC pattern, real-time notifications, reactive programming.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">notify(): O(n) where n=observer count</span>
            <span class="badge space">O(n) for observer list</span>
            <span class="badge exception">Asynchronous event propagation</span>
        </div>
    `,

    'pattern-strategy': `
        <h2>⚙️ Strategy Pattern</h2>
        <p><strong>Defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it.</strong></p>
        <ul class="key-points">
            <li><strong>Strategy Interface:</strong> Defines common interface for all algorithms (PaymentStrategy).</li>
            <li><strong>Concrete Strategies:</strong> Implement specific algorithms (CreditCard, Crypto).</li>
            <li><strong>Context:</strong> Uses strategy interface to execute algorithm (PaymentProcessor).</li>
            <li><strong>Runtime Selection:</strong> Strategy can be changed at runtime via setStrategy().</li>
            <li><strong>Use Cases:</strong> Sorting algorithms, compression methods, payment methods, AI behaviors.</li>
        </ul>
        <div class="complexities">
            <span class="badge time">processPayment(): O(1) dispatch, algorithm varies</span>
            <span class="badge space">One active strategy instance</span>
            <span class="badge exception">Polymorphic dispatch overhead</span>
        </div>
    `,
    'tree-traversal': `
        <h3>Binary Tree Traversal</h3>
        <p>Systematic visiting of every node exactly once.</p>
        <hr>
        <ul>
            <li><strong>Preorder:</strong> node → left → right</li>
            <li><strong>Inorder:</strong> left → node → right (sorted for a BST)</li>
            <li><strong>Postorder:</strong> left → right → node</li>
            <li><strong>Level-order:</strong> breadth-first via a queue</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Time: O(N)</span>
            <span class="badge space">Space: O(h) DFS / O(w) BFS</span>
        </div>
    `,
    'huffman': `
        <h3>Huffman Coding</h3>
        <p>Greedy construction of an optimal prefix-free code from symbol frequencies.</p>
        <hr>
        <ul>
            <li><strong>Core:</strong> repeatedly merge the two lowest-frequency subtrees</li>
            <li><strong>Result:</strong> prefix-free codes minimizing total encoded length</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Build: O(N log N)</span>
            <span class="badge space">Space: O(N)</span>
        </div>
    `,
    'graph-aoe': `
        <h3>AOE Networks &amp; Critical Path</h3>
        <p>Activity-on-edge networks model project scheduling.</p>
        <hr>
        <ul>
            <li><strong>Forward pass:</strong> earliest event time ee(v)</li>
            <li><strong>Backward pass:</strong> latest event time le(v)</li>
            <li><strong>Critical activity:</strong> e(i) = l(i); critical path = longest path</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Time: O(V + E)</span>
            <span class="badge space">Space: O(V + E)</span>
        </div>
    `,
    'expr-infix-postfix': `
        <h3>Infix → Postfix (Shunting-Yard)</h3>
        <p>Convert infix expressions to postfix using an operator stack, then evaluate.</p>
        <hr>
        <ul>
            <li><strong>Convert:</strong> operator stack + output queue (precedence rules)</li>
            <li><strong>Evaluate:</strong> value stack over the postfix tokens</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Time: O(N)</span>
            <span class="badge space">Space: O(N)</span>
        </div>
    `,
    'tree-obst': `
        <h3>Optimal Binary Search Tree</h3>
        <p>Given keys with access frequencies, build the BST with minimum weighted path length.</p>
        <hr>
        <ul>
            <li><strong>DP:</strong> cost[i][j] = min over root r of cost[i][r-1]+cost[r+1][j] + W(i,j)</li>
            <li><strong>Fill order:</strong> by increasing subrange length</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Time: O(N³) (O(N²) with Knuth)</span>
            <span class="badge space">Space: O(N²)</span>
        </div>
    `,
    'sort-external': `
        <h3>External Merge Sort</h3>
        <p>Sort data too large for memory: make sorted runs, then k-way merge.</p>
        <hr>
        <ul>
            <li><strong>Phase 1:</strong> read M records, sort in memory, write a run</li>
            <li><strong>Phase 2:</strong> k-way merge runs using a selection/winner tree</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Passes: 1 + ⌈log_k(runs)⌉</span>
            <span class="badge space">Memory: O(M)</span>
        </div>
    `,
    'matrix-sparse': `
        <h3>Sparse Matrix &amp; Fast Transpose</h3>
        <p>Store only nonzero entries as (row, col, value) triples; transpose in O(cols + terms).</p>
        <hr>
        <ul>
            <li><strong>rowSize[c]:</strong> nonzeros per column → row counts of the transpose</li>
            <li><strong>startPos[c]:</strong> prefix sums give each column's start slot</li>
            <li><strong>Place:</strong> scatter each triple to its transposed position</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Transpose: O(cols + terms)</span>
            <span class="badge space">Space: O(terms)</span>
        </div>
    `,
    'poly-padd': `
        <h3>Polynomial Addition</h3>
        <p>Add two polynomials by merging exponent-descending term lists.</p>
        <hr>
        <ul>
            <li><strong>Two pointers:</strong> compare leading exponents</li>
            <li><strong>Equal exponents:</strong> add coefficients; drop zero results</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Time: O(m + n)</span>
            <span class="badge space">Space: O(m + n)</span>
        </div>
    `,
    'maze-stack': `
        <h3>Maze Solving — Stack Backtracking</h3>
        <p>Depth-first search with an explicit stack; the stack holds the current path.</p>
        <hr>
        <ul>
            <li><strong>Advance:</strong> push the first unvisited open neighbour</li>
            <li><strong>Dead end:</strong> pop (backtrack)</li>
            <li><strong>Found:</strong> the stack from S to E is the path</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Time: O(R·C)</span>
            <span class="badge space">Space: O(R·C)</span>
        </div>
    `,
    'list-doubly': `
        <h3>Doubly / Circular Linked List</h3>
        <p>Each node has prev and next pointers, enabling forward and backward traversal.</p>
        <hr>
        <ul>
            <li><strong>Doubly:</strong> ends point to null</li>
            <li><strong>Circular:</strong> head.prev = tail, tail.next = head</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Insert/Delete at node: O(1)</span>
            <span class="badge space">Space: O(N)</span>
        </div>
    `,
    'search-fibonacci': `
        <h3>Fibonacci Search</h3>
        <p>Search a sorted array by splitting at Fibonacci-number offsets (no division).</p>
        <hr>
        <ul>
            <li><strong>Probe:</strong> offset + fib2, clamped to the array</li>
            <li><strong>Shrink:</strong> step the Fibonacci numbers down toward the target</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Time: O(log N)</span>
            <span class="badge space">Space: O(1)</span>
        </div>
    `,
    'search-interpolation': `
        <h3>Interpolation Search</h3>
        <p>Estimate the target's position by linear interpolation within [lo, hi].</p>
        <hr>
        <ul>
            <li><strong>Probe:</strong> pos = lo + (target−a[lo])·(hi−lo) / (a[hi]−a[lo])</li>
            <li><strong>Best on:</strong> roughly uniformly distributed data</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Avg: O(log log N), Worst: O(N)</span>
            <span class="badge space">Space: O(1)</span>
        </div>
    `,
    'tree-threaded': `
        <h3>Threaded Binary Tree</h3>
        <p>Null right pointers become threads to the inorder successor, enabling stack-free traversal.</p>
        <hr>
        <ul>
            <li><strong>Thread:</strong> a null-right node points to its inorder successor</li>
            <li><strong>Traversal:</strong> follow threads instead of recursion / a stack</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Inorder: O(N)</span>
            <span class="badge space">Space: O(1) (no stack)</span>
        </div>
    `,
    'tree-mway': `
        <h3>m-way Search Tree</h3>
        <p>Each node holds up to m−1 sorted keys and up to m children — a generalization of the BST.</p>
        <hr>
        <ul>
            <li><strong>Search:</strong> within a node, descend the child between the bounding keys</li>
            <li><strong>Insert:</strong> fill a non-full node or create a child where the search falls off</li>
        </ul>
        <div class="complexities">
            <span class="badge time">Search: O(h · log m)</span>
            <span class="badge space">Space: O(N)</span>
        </div>
    `,
};
