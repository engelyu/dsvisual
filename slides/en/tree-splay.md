---
marp: true
theme: default
paginate: true
math: katex
title: "Splay Tree"
---

## Splay Tree

A Splay Tree is a self-adjusting BST: after every access (search/insert), the accessed node is rotated to the root via splay operations, keeping recently accessed data near the top. Amortized time complexity is $O(\log N)$.

---

## Core Concept

Splaying consists of three basic rotation patterns chosen based on the target node's position relative to its parent and grandparent.

- Zig: target's parent is the root — perform a single rotation on the parent.
- Zig-Zig: target and parent are both left (or both right) children — rotate grandparent first, then parent (same-direction double rotation).
- Zig-Zag: target and parent are in opposite directions — perform two rotations in alternating directions.
- Locality principle: with 80/20 access patterns, hot nodes self-organize near the root approaching $O(1)$.

---

## Operation Flow

1. Locate the target (or closest) node via standard BST search.
2. Determine the relative positions of target, parent, and grandparent to select Zig/Zig-Zig/Zig-Zag.
3. Execute the corresponding rotation(s), moving the target one or two levels up.
4. Repeat until the target node becomes the new root.

<svg id="my-svg" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="flowchart" style="max-width: 863.672px; background-color: transparent;" viewBox="0 0 863.671875 94" role="graphics-document document" aria-roledescription="flowchart-v2"><style>#my-svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;fill:#333;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#my-svg .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#my-svg .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#my-svg .error-icon{fill:#552222;}#my-svg .error-text{fill:#552222;stroke:#552222;}#my-svg .edge-thickness-normal{stroke-width:1px;}#my-svg .edge-thickness-thick{stroke-width:3.5px;}#my-svg .edge-pattern-solid{stroke-dasharray:0;}#my-svg .edge-thickness-invisible{stroke-width:0;fill:none;}#my-svg .edge-pattern-dashed{stroke-dasharray:3;}#my-svg .edge-pattern-dotted{stroke-dasharray:2;}#my-svg .marker{fill:#333333;stroke:#333333;}#my-svg .marker.cross{stroke:#333333;}#my-svg svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;}#my-svg p{margin:0;}#my-svg .label{font-family:"trebuchet ms",verdana,arial,sans-serif;color:#333;}#my-svg .cluster-label text{fill:#333;}#my-svg .cluster-label span{color:#333;}#my-svg .cluster-label span p{background-color:transparent;}#my-svg .label text,#my-svg span{fill:#333;color:#333;}#my-svg .node rect,#my-svg .node circle,#my-svg .node ellipse,#my-svg .node polygon,#my-svg .node path{fill:#ECECFF;stroke:#9370DB;stroke-width:1px;}#my-svg .rough-node .label text,#my-svg .node .label text,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-anchor:middle;}#my-svg .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#my-svg .rough-node .label,#my-svg .node .label,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-align:center;}#my-svg .node.clickable{cursor:pointer;}#my-svg .root .anchor path{fill:#333333!important;stroke-width:0;stroke:#333333;}#my-svg .arrowheadPath{fill:#333333;}#my-svg .edgePath .path{stroke:#333333;stroke-width:1px;}#my-svg .flowchart-link{stroke:#333333;fill:none;}#my-svg .edgeLabel{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .edgeLabel p{background-color:rgba(232,232,232, 0.8);}#my-svg .edgeLabel rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .labelBkg{background-color:rgba(232, 232, 232, 0.5);}#my-svg .cluster rect{fill:#ffffde;stroke:#aaaa33;stroke-width:1px;}#my-svg .cluster text{fill:#333;}#my-svg .cluster span{color:#333;}#my-svg div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:12px;background:hsl(80, 100%, 96.2745098039%);border:1px solid #aaaa33;border-radius:2px;pointer-events:none;z-index:100;}#my-svg .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#333;}#my-svg rect.text{fill:none;stroke-width:0;}#my-svg .icon-shape,#my-svg .image-shape{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .icon-shape p,#my-svg .image-shape p{background-color:rgba(232,232,232, 0.8);padding:2px;}#my-svg .icon-shape .label rect,#my-svg .image-shape .label rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#my-svg .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#my-svg .node .neo-node{stroke:#9370DB;}#my-svg [data-look="neo"].node rect,#my-svg [data-look="neo"].cluster rect,#my-svg [data-look="neo"].node polygon{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node path{stroke:#9370DB;stroke-width:1px;}#my-svg [data-look="neo"].node .outer-path{filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node .neo-line path{stroke:#9370DB;filter:none;}#my-svg [data-look="neo"].node circle{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node circle .state-start{fill:#000000;}#my-svg [data-look="neo"].icon-shape .icon{fill:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].icon-shape .icon-neo path{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg :root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}</style><g><marker id="my-svg_flowchart-v2-pointEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="4.5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 5 L 10 10 L 10 0 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointEnd-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="11.5" refY="7" markerUnits="userSpaceOnUse" markerWidth="10.5" markerHeight="14" orient="auto"><path d="M 0 0 L 11.5 7 L 0 14 z" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="1" refY="7" markerUnits="userSpaceOnUse" markerWidth="11.5" markerHeight="14" orient="auto"><polygon points="0,7 11.5,14 11.5,0" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="11" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-1" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refY="5" refX="12.25" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-2" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="12" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossStart" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="-1" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="17.7" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5;"/></marker><marker id="my-svg_flowchart-v2-crossStart-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="-3.5" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5; stroke-dasharray: 1, 0;"/></marker><g class="root"><g class="clusters"/><g class="edgePaths"><path d="M187.594,47L197.172,47C206.75,47,225.906,47,244.396,47C262.885,47,280.708,47,289.62,47L298.531,47" id="my-svg-L_A_B_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_A_B_0" data-points="W3sieCI6MTg3LjU5Mzc1LCJ5Ijo0N30seyJ4IjoyNDUuMDYyNSwieSI6NDd9LHsieCI6MzAyLjUzMTI1LCJ5Ijo0N31d" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M551.844,47L562.263,47C572.682,47,593.521,47,613.693,47C633.865,47,653.37,47,663.122,47L672.875,47" id="my-svg-L_B_C_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_B_C_0" data-points="W3sieCI6NTUxLjg0Mzc1LCJ5Ijo0N30seyJ4Ijo2MTQuMzU5Mzc1LCJ5Ijo0N30seyJ4Ijo2NzYuODc1LCJ5Ijo0N31d" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/></g><g class="edgeLabels"><g class="edgeLabel" transform="translate(245.0625, 47)"><g class="label" data-id="L_A_B_0" transform="translate(-32.46875, -12)"><foreignObject width="64.9375" height="24"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"><p>splay(10)</p></span></div></foreignObject></g></g><g class="edgeLabel" transform="translate(614.359375, 47)"><g class="label" data-id="L_B_C_0" transform="translate(-37.515625, -12)"><foreignObject width="75.03125" height="24"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"><p>search(30)</p></span></div></foreignObject></g></g></g><g class="nodes"><g class="node default" id="my-svg-flowchart-A-0" data-look="classic" transform="translate(97.796875, 47)"><rect class="basic label-container" style="" x="-89.796875" y="-39" width="179.59375" height="78"/><g class="label" style="" transform="translate(-59.796875, -24)"><rect/><foreignObject width="119.59375" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>search(10)<br />tree: 10-&gt;20-&gt;30</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-B-1" data-look="classic" transform="translate(427.1875, 47)"><rect class="basic label-container" style="" x="-124.65625" y="-39" width="249.3125" height="78"/><g class="label" style="" transform="translate(-94.65625, -24)"><rect/><foreignObject width="189.3125" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>10 becomes root<br />10: left=null, right=20-&gt;30</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-C-3" data-look="classic" transform="translate(766.2734375, 47)"><rect class="basic label-container" style="" x="-89.3984375" y="-39" width="178.796875" height="78"/><g class="label" style="" transform="translate(-59.3984375, -24)"><rect/><foreignObject width="118.796875" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>splay(30)<br />30 becomes root</p></span></div></foreignObject></g></g></g></g></g><defs><filter id="my-svg-drop-shadow" height="130%" width="130%"><feDropShadow dx="4" dy="4" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs><defs><filter id="my-svg-drop-shadow-small" height="150%" width="150%"><feDropShadow dx="2" dy="2" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs></svg>

---

## Splay Operation Diagram

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 130" width="340" height="130"><g font-family="sans-serif" font-size="11" text-anchor="middle"><text x="65" y="14" fill="#64748b">Before splay(10)</text><circle cx="65" cy="35" r="14" fill="#dbeafe" stroke="#2563eb"/><text x="65" y="40">30</text><circle cx="35" cy="75" r="14" fill="#dbeafe" stroke="#2563eb"/><text x="35" y="80">20</text><circle cx="10" cy="110" r="14" fill="#fef9c3" stroke="#ca8a04"/><text x="10" y="115">10</text><line x1="56" y1="47" x2="44" y2="63" stroke="#64748b"/><line x1="27" y1="87" x2="17" y2="98" stroke="#64748b"/><text x="220" y="14" fill="#64748b">After splay(10)</text><circle cx="220" cy="35" r="14" fill="#fef9c3" stroke="#ca8a04"/><text x="220" y="40">10</text><circle cx="280" cy="75" r="14" fill="#dbeafe" stroke="#2563eb"/><text x="280" y="80">20</text><circle cx="310" cy="110" r="14" fill="#dbeafe" stroke="#2563eb"/><text x="310" y="115">30</text><line x1="228" y1="47" x2="270" y2="63" stroke="#64748b"/><line x1="288" y1="87" x2="300" y2="98" stroke="#64748b"/></g></svg>

> After searching for 10, splay rotates 10 to the root; the next access to 10 costs $O(1)$, demonstrating locality optimization.

---

## Complexity Analysis

| Operation | Amortized Time | Worst Single |
| --- | --- | --- |
| search | $O(\log N)$ | $O(N)$ |
| insert | $O(\log N)$ | $O(N)$ |
| delete | $O(\log N)$ | $O(N)$ |
| Total Space | — | $O(N)$ |

$$T_{\text{amortized}} = O(\log N)\text{ per operation}$$

Amortized analysis guarantees total cost of $m$ operations is $O(m \log N)$; single-call worst case is $O(N)$.

---

## Source Code

```cpp
Node* splay(Node* root, int key) {
    if (!root || root->key == key) return root;
    if (root->key > key) {          // key is in left subtree
        if (!root->left) return root;
        if (root->left->key > key) { // Zig-Zig (left-left)
            root->left->left = splay(root->left->left, key);
            root = rightRotate(root);
        } else if (root->left->key < key) { // Zig-Zag (left-right)
            root->left->right = splay(root->left->right, key);
            if (root->left->right)
                root->left = leftRotate(root->left);
        }
        return root->left ? rightRotate(root) : root;
    } else {                        // key is in right subtree
        if (!root->right) return root;
        if (root->right->key < key) { // Zig-Zig (right-right)
            root->right->right = splay(root->right->right, key);
            root = leftRotate(root);
        }
        return root->right ? leftRotate(root) : root;
    }
}
```

---

## Pros, Cons & When to Use

- Pro: no extra height or color fields needed — minimal memory footprint.
- Pro: locality optimization — frequently accessed nodes self-organize near the root ($O(1)$ on repeat access).
- Con: single-call worst case is $O(N)$ — unsuitable for latency-sensitive real-time systems.
- Use for workloads with strong access locality: caches, compiler symbol tables, routing tables.

---

## Summary

- Every access splays the node to root; three strategies: Zig, Zig-Zig, Zig-Zag.
- Amortized $O(\log N)$; hot data approaches $O(1)$; single worst case $O(N)$.
- Structurally minimal (no extra fields); ideal for dynamic workloads with strong access locality.
