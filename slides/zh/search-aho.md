---
marp: true
theme: default
paginate: true
math: katex
title: "Aho-Corasick 演算法"
category: "Searching & String Matching"
---

## Aho-Corasick 演算法

Aho-Corasick 先把多個樣式建成一棵字典樹,再以 BFS 計算失敗連結,因此單次掃描文字就能找出每個樣式的所有出現位置。

---

## 核心概念

字典樹提供 goto 邊;失敗連結指向「目前字串最長真後綴」對應的節點,因此遇到失配時不必倒退文字指標。

- 失敗連結以 BFS 由淺至深計算。
- 輸出連結沿失敗鏈合併,因此不會漏掉任何相符。
- 掃描期間文字指標永不向後移動。

---

## 運作流程

1. 把每個樣式插入字典樹。
2. 以 BFS 計算每個節點的失敗連結並合併輸出。
3. 掃描文字,沿 goto 前進或沿失敗連結跳回,抵達輸出節點時回報相符。

<svg id="my-svg" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="flowchart" style="max-width: 824.172px; background-color: transparent;" viewBox="0 0 824.171875 70" role="graphics-document document" aria-roledescription="flowchart-v2"><style>#my-svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;fill:#333;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#my-svg .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#my-svg .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#my-svg .error-icon{fill:#552222;}#my-svg .error-text{fill:#552222;stroke:#552222;}#my-svg .edge-thickness-normal{stroke-width:1px;}#my-svg .edge-thickness-thick{stroke-width:3.5px;}#my-svg .edge-pattern-solid{stroke-dasharray:0;}#my-svg .edge-thickness-invisible{stroke-width:0;fill:none;}#my-svg .edge-pattern-dashed{stroke-dasharray:3;}#my-svg .edge-pattern-dotted{stroke-dasharray:2;}#my-svg .marker{fill:#333333;stroke:#333333;}#my-svg .marker.cross{stroke:#333333;}#my-svg svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;}#my-svg p{margin:0;}#my-svg .label{font-family:"trebuchet ms",verdana,arial,sans-serif;color:#333;}#my-svg .cluster-label text{fill:#333;}#my-svg .cluster-label span{color:#333;}#my-svg .cluster-label span p{background-color:transparent;}#my-svg .label text,#my-svg span{fill:#333;color:#333;}#my-svg .node rect,#my-svg .node circle,#my-svg .node ellipse,#my-svg .node polygon,#my-svg .node path{fill:#ECECFF;stroke:#9370DB;stroke-width:1px;}#my-svg .rough-node .label text,#my-svg .node .label text,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-anchor:middle;}#my-svg .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#my-svg .rough-node .label,#my-svg .node .label,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-align:center;}#my-svg .node.clickable{cursor:pointer;}#my-svg .root .anchor path{fill:#333333!important;stroke-width:0;stroke:#333333;}#my-svg .arrowheadPath{fill:#333333;}#my-svg .edgePath .path{stroke:#333333;stroke-width:1px;}#my-svg .flowchart-link{stroke:#333333;fill:none;}#my-svg .edgeLabel{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .edgeLabel p{background-color:rgba(232,232,232, 0.8);}#my-svg .edgeLabel rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .labelBkg{background-color:rgba(232, 232, 232, 0.5);}#my-svg .cluster rect{fill:#ffffde;stroke:#aaaa33;stroke-width:1px;}#my-svg .cluster text{fill:#333;}#my-svg .cluster span{color:#333;}#my-svg div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:12px;background:hsl(80, 100%, 96.2745098039%);border:1px solid #aaaa33;border-radius:2px;pointer-events:none;z-index:100;}#my-svg .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#333;}#my-svg rect.text{fill:none;stroke-width:0;}#my-svg .icon-shape,#my-svg .image-shape{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .icon-shape p,#my-svg .image-shape p{background-color:rgba(232,232,232, 0.8);padding:2px;}#my-svg .icon-shape .label rect,#my-svg .image-shape .label rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#my-svg .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#my-svg .node .neo-node{stroke:#9370DB;}#my-svg [data-look="neo"].node rect,#my-svg [data-look="neo"].cluster rect,#my-svg [data-look="neo"].node polygon{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node path{stroke:#9370DB;stroke-width:1px;}#my-svg [data-look="neo"].node .outer-path{filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node .neo-line path{stroke:#9370DB;filter:none;}#my-svg [data-look="neo"].node circle{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node circle .state-start{fill:#000000;}#my-svg [data-look="neo"].icon-shape .icon{fill:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].icon-shape .icon-neo path{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg :root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}</style><g><marker id="my-svg_flowchart-v2-pointEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="4.5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 5 L 10 10 L 10 0 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointEnd-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="11.5" refY="7" markerUnits="userSpaceOnUse" markerWidth="10.5" markerHeight="14" orient="auto"><path d="M 0 0 L 11.5 7 L 0 14 z" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="1" refY="7" markerUnits="userSpaceOnUse" markerWidth="11.5" markerHeight="14" orient="auto"><polygon points="0,7 11.5,14 11.5,0" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="11" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-1" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refY="5" refX="12.25" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-2" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="12" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossStart" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="-1" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="17.7" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5;"/></marker><marker id="my-svg_flowchart-v2-crossStart-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="-3.5" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5; stroke-dasharray: 1, 0;"/></marker><g class="root"><g class="clusters"/><g class="edgePaths"><path d="M134.531,35L138.698,35C142.865,35,151.198,35,158.865,35C166.531,35,173.531,35,177.031,35L180.531,35" id="my-svg-L_T_F_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_T_F_0" data-points="W3sieCI6MTM0LjUzMTI1LCJ5IjozNX0seyJ4IjoxNTkuNTMxMjUsInkiOjM1fSx7IngiOjE4NC41MzEyNSwieSI6MzV9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M359.188,35L363.354,35C367.521,35,375.854,35,383.521,35C391.188,35,398.188,35,401.688,35L405.188,35" id="my-svg-L_F_S_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_F_S_0" data-points="W3sieCI6MzU5LjE4NzUsInkiOjM1fSx7IngiOjM4NC4xODc1LCJ5IjozNX0seyJ4Ijo0MDkuMTg3NSwieSI6MzV9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M573.781,35L577.948,35C582.115,35,590.448,35,598.115,35C605.781,35,612.781,35,616.281,35L619.781,35" id="my-svg-L_S_M_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_S_M_0" data-points="W3sieCI6NTczLjc4MTI1LCJ5IjozNX0seyJ4Ijo1OTguNzgxMjUsInkiOjM1fSx7IngiOjYyMy43ODEyNSwieSI6MzV9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/></g><g class="edgeLabels"><g class="edgeLabel"><g class="label" data-id="L_T_F_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_F_S_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_S_M_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g></g><g class="nodes"><g class="node default" id="my-svg-flowchart-T-0" data-look="classic" transform="translate(71.265625, 35)"><rect class="basic label-container" style="" x="-63.265625" y="-27" width="126.53125" height="54"/><g class="label" style="" transform="translate(-33.265625, -12)"><rect/><foreignObject width="66.53125" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>build trie</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-F-1" data-look="classic" transform="translate(271.859375, 35)"><rect class="basic label-container" style="" x="-87.328125" y="-27" width="174.65625" height="54"/><g class="label" style="" transform="translate(-57.328125, -12)"><rect/><foreignObject width="114.65625" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>BFS failure links</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-S-3" data-look="classic" transform="translate(491.484375, 35)"><rect class="basic label-container" style="" x="-82.296875" y="-27" width="164.59375" height="54"/><g class="label" style="" transform="translate(-52.296875, -12)"><rect/><foreignObject width="104.59375" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>scan text once</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-M-5" data-look="classic" transform="translate(719.9765625, 35)"><rect class="basic label-container" style="" x="-96.1953125" y="-27" width="192.390625" height="54"/><g class="label" style="" transform="translate(-66.1953125, -12)"><rect/><foreignObject width="132.390625" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>report all matches</p></span></div></foreignObject></g></g></g></g></g><defs><filter id="my-svg-drop-shadow" height="130%" width="130%"><feDropShadow dx="4" dy="4" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs><defs><filter id="my-svg-drop-shadow-small" height="150%" width="150%"><feDropShadow dx="2" dy="2" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs></svg>

---

## 示意圖

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 150" width="240"><g font-family="monospace" font-size="11"><line x1="120" y1="24" x2="60" y2="74" stroke="#94a3b8"/><line x1="120" y1="24" x2="180" y2="74" stroke="#94a3b8"/><line x1="60" y1="86" x2="60" y2="114" stroke="#94a3b8"/><line x1="180" y1="86" x2="180" y2="114" stroke="#94a3b8"/><path d="M168 124 L96 86" stroke="#ef4444" stroke-dasharray="4 3" fill="none"/><g fill="#dbeafe" stroke="#3b82f6"><circle cx="120" cy="16" r="14"/><circle cx="60" cy="80" r="14"/><circle cx="180" cy="80" r="14"/><circle cx="60" cy="124" r="14"/><circle cx="180" cy="124" r="14"/></g><g text-anchor="middle"><text x="120" y="20">root</text><text x="60" y="84">h</text><text x="180" y="84">s</text><text x="60" y="128">e</text><text x="180" y="128">h</text></g><text x="96" y="112" fill="#ef4444">fail</text></g></svg>

> visualizer 分成兩個逐步階段:先建立失敗連結,再掃描文字 `ushers`。

---

## 複雜度分析

| 項目 | 複雜度 |
| --- | --- |
| 建立時間 | $O(\sum |P_i|)$ |
| 掃描 | $O(|text| + \#matches)$ |
| 空間 | $O(\sum |P_i| \cdot \sigma)$ |

$$T_{\text{scan}} = O(|text| + \#matches)$$

文字指標永不倒退,因此掃描是線性的。

---

## 程式碼

```cpp
void build() {
    std::queue<Node*> q;
    root->fail = root;
    for (auto& kv : root->children) {
        kv.second->fail = root;
        q.push(kv.second);
    }
    while (!q.empty()) {
        Node* cur = q.front();
        q.pop();
        for (auto& kv : cur->children) {
            char c = kv.first;
            Node* child = kv.second;
            Node* f = cur->fail;
            while (f != root && !f->children.count(c))
                f = f->fail;
            if (f->children.count(c) && f->children[c] != child)
                child->fail = f->children[c];
            else
                child->fail = root;
            for (int idx : child->fail->output)
                child->output.push_back(idx);
            q.push(child);
        }
    }
}
```

---

## 優缺點與使用時機

- 優點:單次掃描即可處理多個樣式,文字永不倒退。
- 缺點:必須先建構自動機,空間隨樣式總長與字母表增長。
- 適用:多關鍵字過濾、入侵偵測、字典比對。

---

## 小結

- 字典樹的 goto 邊加上 BFS 建立的失敗連結。
- 單次線性掃描即可找出每個樣式。
- 它是 KMP 推廣到多樣式的版本。
