---
marp: true
theme: default
paginate: true
math: katex
title: "三元搜尋樹 (TST)"
---

## 三元搜尋樹 (TST)

三元搜尋樹(Ternary Search Tree, TST)是 BST 與 Trie 的混合體:每個節點儲存一個字元並擁有三個子指標(left / eq / right),兼顧字首搜尋能力與低記憶體開銷。

---

## 核心概念

每個節點儲存一個字元 `data`,三個子指標的語意分別為:left(當前字元較小)、eq(當前字元相等,進入下一字元)、right(當前字元較大)。

- 插入:逐字元比較,等值走 eq 到下一字元,小於走 left,大於走 right。
- 搜尋時間 $O(\log N + L)$:橫向 BST 搜尋約 $O(\log N)$,縱向字元匹配 $O(L)$。
- 空間:每節點僅 3 個指標,遠優於 Trie 的 26 個指標/節點。
- `isEndOfWord` 標誌設在最後一個字元對應的節點上。

---

## 運作流程

1. 若節點為 `nullptr`:建立新節點並儲存當前字元。
2. 若 `word[index] < node->data`:遞迴至 `left` 子節點,`index` 不變。
3. 若 `word[index] > node->data`:遞迴至 `right` 子節點,`index` 不變。
4. 若 `word[index] == node->data`:若 index 為最後一字元則設 `isEndOfWord`,否則遞迴至 `eq` 子節點並 `index++`。

<svg id="my-svg" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="flowchart" style="max-width: 415.547px; background-color: transparent;" viewBox="0 0 415.546875 478" role="graphics-document document" aria-roledescription="flowchart-v2"><style>#my-svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;fill:#333;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#my-svg .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#my-svg .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#my-svg .error-icon{fill:#552222;}#my-svg .error-text{fill:#552222;stroke:#552222;}#my-svg .edge-thickness-normal{stroke-width:1px;}#my-svg .edge-thickness-thick{stroke-width:3.5px;}#my-svg .edge-pattern-solid{stroke-dasharray:0;}#my-svg .edge-thickness-invisible{stroke-width:0;fill:none;}#my-svg .edge-pattern-dashed{stroke-dasharray:3;}#my-svg .edge-pattern-dotted{stroke-dasharray:2;}#my-svg .marker{fill:#333333;stroke:#333333;}#my-svg .marker.cross{stroke:#333333;}#my-svg svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;}#my-svg p{margin:0;}#my-svg .label{font-family:"trebuchet ms",verdana,arial,sans-serif;color:#333;}#my-svg .cluster-label text{fill:#333;}#my-svg .cluster-label span{color:#333;}#my-svg .cluster-label span p{background-color:transparent;}#my-svg .label text,#my-svg span{fill:#333;color:#333;}#my-svg .node rect,#my-svg .node circle,#my-svg .node ellipse,#my-svg .node polygon,#my-svg .node path{fill:#ECECFF;stroke:#9370DB;stroke-width:1px;}#my-svg .rough-node .label text,#my-svg .node .label text,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-anchor:middle;}#my-svg .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#my-svg .rough-node .label,#my-svg .node .label,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-align:center;}#my-svg .node.clickable{cursor:pointer;}#my-svg .root .anchor path{fill:#333333!important;stroke-width:0;stroke:#333333;}#my-svg .arrowheadPath{fill:#333333;}#my-svg .edgePath .path{stroke:#333333;stroke-width:1px;}#my-svg .flowchart-link{stroke:#333333;fill:none;}#my-svg .edgeLabel{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .edgeLabel p{background-color:rgba(232,232,232, 0.8);}#my-svg .edgeLabel rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .labelBkg{background-color:rgba(232, 232, 232, 0.5);}#my-svg .cluster rect{fill:#ffffde;stroke:#aaaa33;stroke-width:1px;}#my-svg .cluster text{fill:#333;}#my-svg .cluster span{color:#333;}#my-svg div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:12px;background:hsl(80, 100%, 96.2745098039%);border:1px solid #aaaa33;border-radius:2px;pointer-events:none;z-index:100;}#my-svg .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#333;}#my-svg rect.text{fill:none;stroke-width:0;}#my-svg .icon-shape,#my-svg .image-shape{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .icon-shape p,#my-svg .image-shape p{background-color:rgba(232,232,232, 0.8);padding:2px;}#my-svg .icon-shape .label rect,#my-svg .image-shape .label rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#my-svg .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#my-svg .node .neo-node{stroke:#9370DB;}#my-svg [data-look="neo"].node rect,#my-svg [data-look="neo"].cluster rect,#my-svg [data-look="neo"].node polygon{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node path{stroke:#9370DB;stroke-width:1px;}#my-svg [data-look="neo"].node .outer-path{filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node .neo-line path{stroke:#9370DB;filter:none;}#my-svg [data-look="neo"].node circle{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node circle .state-start{fill:#000000;}#my-svg [data-look="neo"].icon-shape .icon{fill:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].icon-shape .icon-neo path{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg :root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}</style><g><marker id="my-svg_flowchart-v2-pointEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="4.5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 5 L 10 10 L 10 0 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointEnd-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="11.5" refY="7" markerUnits="userSpaceOnUse" markerWidth="10.5" markerHeight="14" orient="auto"><path d="M 0 0 L 11.5 7 L 0 14 z" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="1" refY="7" markerUnits="userSpaceOnUse" markerWidth="11.5" markerHeight="14" orient="auto"><polygon points="0,7 11.5,14 11.5,0" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="11" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-1" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refY="5" refX="12.25" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-2" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="12" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossStart" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="-1" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="17.7" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5;"/></marker><marker id="my-svg_flowchart-v2-crossStart-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="-3.5" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5; stroke-dasharray: 1, 0;"/></marker><g class="root"><g class="clusters"/><g class="edgePaths"><path d="M63.531,74L63.531,82.167C63.531,90.333,63.531,106.667,63.531,120.333C63.531,134,63.531,145,63.531,150.5L63.531,156" id="my-svg-L_R_A_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_R_A_0" data-points="W3sieCI6NjMuNTMxMjUsInkiOjc0fSx7IngiOjYzLjUzMTI1LCJ5IjoxMjN9LHsieCI6NjMuNTMxMjUsInkiOjE2MH1d" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M63.531,214L63.531,220.167C63.531,226.333,63.531,238.667,63.531,250.333C63.531,262,63.531,273,63.531,278.5L63.531,284" id="my-svg-L_A_R2_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_A_R2_0" data-points="W3sieCI6NjMuNTMxMjUsInkiOjIxNH0seyJ4Ijo2My41MzEyNSwieSI6MjUxfSx7IngiOjYzLjUzMTI1LCJ5IjoyODh9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M63.531,342L63.531,348.167C63.531,354.333,63.531,366.667,63.531,378.333C63.531,390,63.531,401,63.531,406.5L63.531,412" id="my-svg-L_R2_T_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_R2_T_0" data-points="W3sieCI6NjMuNTMxMjUsInkiOjM0Mn0seyJ4Ijo2My41MzEyNSwieSI6Mzc5fSx7IngiOjYzLjUzMTI1LCJ5Ijo0MTZ9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/></g><g class="edgeLabels"><g class="edgeLabel" transform="translate(63.53125, 123)"><g class="label" data-id="L_R_A_0" transform="translate(-8.8203125, -12)"><foreignObject width="17.640625" height="24"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"><p>eq</p></span></div></foreignObject></g></g><g class="edgeLabel" transform="translate(63.53125, 251)"><g class="label" data-id="L_A_R2_0" transform="translate(-8.8203125, -12)"><foreignObject width="17.640625" height="24"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"><p>eq</p></span></div></foreignObject></g></g><g class="edgeLabel" transform="translate(63.53125, 379)"><g class="label" data-id="L_R2_T_0" transform="translate(-16.953125, -12)"><foreignObject width="33.90625" height="24"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"><p>right</p></span></div></foreignObject></g></g></g><g class="nodes"><g class="node default" id="my-svg-flowchart-R-0" data-look="classic" transform="translate(63.53125, 47)"><rect class="basic label-container" style="" x="-55.53125" y="-27" width="111.0625" height="54"/><g class="label" style="" transform="translate(-25.53125, -12)"><rect/><foreignObject width="51.0625" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>C(root)</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-A-1" data-look="classic" transform="translate(63.53125, 187)"><rect class="basic label-container" style="" x="-34.71875" y="-27" width="69.4375" height="54"/><g class="label" style="" transform="translate(-4.71875, -12)"><rect/><foreignObject width="9.4375" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>A</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-R2-3" data-look="classic" transform="translate(63.53125, 315)"><rect class="basic label-container" style="" x="-37.59375" y="-27" width="75.1875" height="54"/><g class="label" style="" transform="translate(-7.59375, -12)"><rect/><foreignObject width="15.1875" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>R*</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-T-5" data-look="classic" transform="translate(63.53125, 443)"><rect class="basic label-container" style="" x="-37.5859375" y="-27" width="75.171875" height="54"/><g class="label" style="" transform="translate(-7.5859375, -12)"><rect/><foreignObject width="15.171875" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>T*</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-note1-6" data-look="classic" transform="translate(288.3046875, 47)"><rect class="basic label-container" style="" x="-119.2421875" y="-39" width="238.484375" height="78"/><g class="label" style="" transform="translate(-89.2421875, -24)"><rect/><foreignObject width="178.484375" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>CAR inserted, then CAT:<br />R-&gt;right=T because T &gt; R</p></span></div></foreignObject></g></g></g></g></g><defs><filter id="my-svg-drop-shadow" height="130%" width="130%"><feDropShadow dx="4" dy="4" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs><defs><filter id="my-svg-drop-shadow-small" height="150%" width="150%"><feDropShadow dx="2" dy="2" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs></svg>

---

## TST 結構示意

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 130" width="320" height="130"><g font-family="sans-serif" font-size="12" text-anchor="middle"><circle cx="160" cy="20" r="16" fill="#dbeafe" stroke="#2563eb"/><text x="160" y="25">C</text><circle cx="160" cy="60" r="16" fill="#dbeafe" stroke="#2563eb"/><text x="160" y="65">A</text><circle cx="160" cy="100" r="16" fill="#dcfce7" stroke="#16a34a"/><text x="160" y="105">R*</text><circle cx="220" cy="100" r="16" fill="#dcfce7" stroke="#16a34a"/><text x="220" y="105">T*</text><line x1="160" y1="36" x2="160" y2="44" stroke="#2563eb" stroke-dasharray="4"/><text x="175" y="52" fill="#64748b" font-size="10">eq</text><line x1="160" y1="76" x2="160" y2="84" stroke="#2563eb" stroke-dasharray="4"/><text x="175" y="92" fill="#64748b" font-size="10">eq</text><line x1="172" y1="108" x2="207" y2="108" stroke="#64748b"/><text x="193" y="104" fill="#64748b" font-size="10">right</text></g></svg>

> 插入 "CAR" 後再插入 "CAT":三個字母 C-A 共享 eq 鏈,在第三字元 R/T 分叉:T > R,所以 T 節點成為 R 的 right 子節點。

---

## 複雜度分析

| 操作 | 時間 | 空間 |
| --- | --- | --- |
| 插入字串 | $O(\log N + L)$ | $O(L)$ |
| 搜尋字串 | $O(\log N + L)$ | $O(1)$ |
| 空間合計 | — | $O(N \cdot L)$ |

$$T_{\text{search}} = O(\log N + L)$$

$\log N$ 來自橫向 BST 比較,$L$ 來自縱向字元匹配;每節點僅 3 個指標節省 Trie 的 26 個指標開銷。

---

## 程式碼

```cpp
struct TSTNode {
    char data;
    bool isEndOfWord;
    TSTNode *left, *eq, *right;
    TSTNode(char c) : data(c), isEndOfWord(false),
        left(nullptr), eq(nullptr), right(nullptr) {}
};

TSTNode* insertRecursive(TSTNode* root, const string& word, int idx) {
    if (!root) root = new TSTNode(word[idx]);
    if (word[idx] < root->data)
        root->left = insertRecursive(root->left, word, idx);
    else if (word[idx] > root->data)
        root->right = insertRecursive(root->right, word, idx);
    else {
        if (idx + 1 < (int)word.length())
            root->eq = insertRecursive(root->eq, word, idx + 1);
        else
            root->isEndOfWord = true;
    }
    return root;
}
```

---

## 優缺點與使用時機

- 優點:每節點 3 個指標,記憶體遠優於 Trie 的 26 指標。
- 優點:支援前綴搜尋,比純 BST 更適合字串查詢。
- 缺點:橫向 BST 比較帶來額外 $O(\log N)$ 開銷,比 Trie 稍慢。
- 適用:拼字檢查、字典提示、近似字串匹配等記憶體敏感場景。

---

## 小結

- left / eq / right 三指標融合 BST 橫向比較與 Trie 縱向字元匹配。
- 搜尋 $O(\log N + L)$,每節點僅 3 個指標,是 Trie 的高效替代。
- 最適合記憶體受限但需要前綴搜尋的場景,如嵌入式拼字檢查。
