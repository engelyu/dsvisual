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
    `
};
