---
marp: true
theme: default
paginate: true
math: katex
title: "參數多型(樣板)"
category: "OOP Concepts"
---

## 參數多型(樣板)

樣板是一個通用的藍圖，能一致地適用於多種型別；編譯器對每種被使用的型別產生一份具體的特化版本。

---

## 核心概念

函式樣板（`template<typename T> T maximum(T,T)`）與類別樣板（`template<typename T> class Box`）是兩大形式。樣板在編譯期執行「結構性鴨子型別」——只要型別支援所需操作即可，不需要繼承關係。C++20 的 `concepts` 進一步將所需操作形式化。

- 一份定義，可特化出多種具體型別。
- 在編譯期解析，無執行期開銷。
- 結構性：不需共同基底類別。
- C++20 `concepts` 將所需操作的約束形式化，改善錯誤訊息。

---

## 運作流程

1. 撰寫 `template<typename T>` 定義，用 `T` 代表任意型別。
2. 以具體型別使用樣板（如 `Box<int>`、`maximum(3, 7)`）。
3. 編譯器對每個不同的具體型別各產生一份具體的類別或函式。

<svg id="my-svg" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="flowchart" style="max-width: 496.062px; background-color: transparent;" viewBox="0 0 496.0625 174" role="graphics-document document" aria-roledescription="flowchart-v2"><style>#my-svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;fill:#333;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#my-svg .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#my-svg .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#my-svg .error-icon{fill:#552222;}#my-svg .error-text{fill:#552222;stroke:#552222;}#my-svg .edge-thickness-normal{stroke-width:1px;}#my-svg .edge-thickness-thick{stroke-width:3.5px;}#my-svg .edge-pattern-solid{stroke-dasharray:0;}#my-svg .edge-thickness-invisible{stroke-width:0;fill:none;}#my-svg .edge-pattern-dashed{stroke-dasharray:3;}#my-svg .edge-pattern-dotted{stroke-dasharray:2;}#my-svg .marker{fill:#333333;stroke:#333333;}#my-svg .marker.cross{stroke:#333333;}#my-svg svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;}#my-svg p{margin:0;}#my-svg .label{font-family:"trebuchet ms",verdana,arial,sans-serif;color:#333;}#my-svg .cluster-label text{fill:#333;}#my-svg .cluster-label span{color:#333;}#my-svg .cluster-label span p{background-color:transparent;}#my-svg .label text,#my-svg span{fill:#333;color:#333;}#my-svg .node rect,#my-svg .node circle,#my-svg .node ellipse,#my-svg .node polygon,#my-svg .node path{fill:#ECECFF;stroke:#9370DB;stroke-width:1px;}#my-svg .rough-node .label text,#my-svg .node .label text,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-anchor:middle;}#my-svg .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#my-svg .rough-node .label,#my-svg .node .label,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-align:center;}#my-svg .node.clickable{cursor:pointer;}#my-svg .root .anchor path{fill:#333333!important;stroke-width:0;stroke:#333333;}#my-svg .arrowheadPath{fill:#333333;}#my-svg .edgePath .path{stroke:#333333;stroke-width:1px;}#my-svg .flowchart-link{stroke:#333333;fill:none;}#my-svg .edgeLabel{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .edgeLabel p{background-color:rgba(232,232,232, 0.8);}#my-svg .edgeLabel rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .labelBkg{background-color:rgba(232, 232, 232, 0.5);}#my-svg .cluster rect{fill:#ffffde;stroke:#aaaa33;stroke-width:1px;}#my-svg .cluster text{fill:#333;}#my-svg .cluster span{color:#333;}#my-svg div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:12px;background:hsl(80, 100%, 96.2745098039%);border:1px solid #aaaa33;border-radius:2px;pointer-events:none;z-index:100;}#my-svg .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#333;}#my-svg rect.text{fill:none;stroke-width:0;}#my-svg .icon-shape,#my-svg .image-shape{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .icon-shape p,#my-svg .image-shape p{background-color:rgba(232,232,232, 0.8);padding:2px;}#my-svg .icon-shape .label rect,#my-svg .image-shape .label rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#my-svg .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#my-svg .node .neo-node{stroke:#9370DB;}#my-svg [data-look="neo"].node rect,#my-svg [data-look="neo"].cluster rect,#my-svg [data-look="neo"].node polygon{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node path{stroke:#9370DB;stroke-width:1px;}#my-svg [data-look="neo"].node .outer-path{filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node .neo-line path{stroke:#9370DB;filter:none;}#my-svg [data-look="neo"].node circle{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node circle .state-start{fill:#000000;}#my-svg [data-look="neo"].icon-shape .icon{fill:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].icon-shape .icon-neo path{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg :root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}</style><g><marker id="my-svg_flowchart-v2-pointEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="4.5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 5 L 10 10 L 10 0 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointEnd-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="11.5" refY="7" markerUnits="userSpaceOnUse" markerWidth="10.5" markerHeight="14" orient="auto"><path d="M 0 0 L 11.5 7 L 0 14 z" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="1" refY="7" markerUnits="userSpaceOnUse" markerWidth="11.5" markerHeight="14" orient="auto"><polygon points="0,7 11.5,14 11.5,0" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="11" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-1" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refY="5" refX="12.25" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-2" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="12" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossStart" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="-1" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="17.7" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5;"/></marker><marker id="my-svg_flowchart-v2-crossStart-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="-3.5" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5; stroke-dasharray: 1, 0;"/></marker><g class="root"><g class="clusters"/><g class="edgePaths"><path d="M147.006,62L133.015,66.167C119.025,70.333,91.044,78.667,77.053,86.333C63.063,94,63.063,101,63.063,104.5L63.063,108" id="my-svg-L_T_BI_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_T_BI_0" data-points="W3sieCI6MTQ3LjAwNTU1ODg5NDIzMDc3LCJ5Ijo2Mn0seyJ4Ijo2My4wNjI1LCJ5Ijo4N30seyJ4Ijo2My4wNjI1LCJ5IjoxMTJ9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M237.664,62L237.664,66.167C237.664,70.333,237.664,78.667,237.664,86.333C237.664,94,237.664,101,237.664,104.5L237.664,108" id="my-svg-L_T_BD_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_T_BD_0" data-points="W3sieCI6MjM3LjY2NDA2MjUsInkiOjYyfSx7IngiOjIzNy42NjQwNjI1LCJ5Ijo4N30seyJ4IjoyMzcuNjY0MDYyNSwieSI6MTEyfV0=" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M333.706,62L348.527,66.167C363.348,70.333,392.99,78.667,407.812,86.333C422.633,94,422.633,101,422.633,104.5L422.633,108" id="my-svg-L_T_BS_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_T_BS_0" data-points="W3sieCI6MzMzLjcwNTUyODg0NjE1MzgsInkiOjYyfSx7IngiOjQyMi42MzI4MTI1LCJ5Ijo4N30seyJ4Ijo0MjIuNjMyODEyNSwieSI6MTEyfV0=" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/></g><g class="edgeLabels"><g class="edgeLabel"><g class="label" data-id="L_T_BI_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_T_BD_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_T_BS_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g></g><g class="nodes"><g class="node default" id="my-svg-flowchart-T-0" data-look="classic" transform="translate(237.6640625, 35)"><rect class="basic label-container" style="" x="-104.1484375" y="-27" width="208.296875" height="54"/><g class="label" style="" transform="translate(-74.1484375, -12)"><rect/><foreignObject width="148.296875" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>template T class Box</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-BI-2" data-look="classic" transform="translate(63.0625, 139)"><rect class="basic label-container" style="" x="-55.0625" y="-27" width="110.125" height="54"/><g class="label" style="" transform="translate(-25.0625, -12)"><rect/><foreignObject width="50.125" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>Box int</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-BD-4" data-look="classic" transform="translate(237.6640625, 139)"><rect class="basic label-container" style="" x="-69.5390625" y="-27" width="139.078125" height="54"/><g class="label" style="" transform="translate(-39.5390625, -12)"><rect/><foreignObject width="79.078125" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>Box double</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-BS-6" data-look="classic" transform="translate(422.6328125, 139)"><rect class="basic label-container" style="" x="-65.4296875" y="-27" width="130.859375" height="54"/><g class="label" style="" transform="translate(-35.4296875, -12)"><rect/><foreignObject width="70.859375" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>Box string</p></span></div></foreignObject></g></g></g></g></g><defs><filter id="my-svg-drop-shadow" height="130%" width="130%"><feDropShadow dx="4" dy="4" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs><defs><filter id="my-svg-drop-shadow-small" height="150%" width="150%"><feDropShadow dx="2" dy="2" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs></svg>

---

## 示意圖

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 160" width="420"><g font-family="monospace" font-size="11"><rect x="130" y="10" width="160" height="36" fill="none" stroke="#a78bfa" stroke-dasharray="5 3"/><text x="210" y="26" text-anchor="middle" fill="#a78bfa">template&lt;typename T&gt;</text><text x="210" y="40" text-anchor="middle" fill="#a78bfa">class Box</text><rect x="30" y="100" width="90" height="30" fill="none" stroke="#f472b6"/><text x="75" y="120" text-anchor="middle" fill="#f472b6">Box&lt;int&gt;</text><rect x="160" y="100" width="100" height="30" fill="none" stroke="#f472b6"/><text x="210" y="120" text-anchor="middle" fill="#f472b6">Box&lt;double&gt;</text><rect x="300" y="100" width="100" height="30" fill="none" stroke="#f472b6"/><text x="350" y="120" text-anchor="middle" fill="#f472b6">Box&lt;string&gt;</text><line x1="75" y1="100" x2="175" y2="46" stroke="#64748b"/><line x1="210" y1="100" x2="210" y2="46" stroke="#64748b"/><line x1="350" y1="100" x2="245" y2="46" stroke="#64748b"/></g></svg>

> visualizer 以虛線方框顯示樣板藍圖，箭頭向下指向三個以具體型別特化的類別。

---

## 成本與取捨

| 面向 | 成本 |
| --- | --- |
| 執行期 | 零開銷；無間接層，每個特化都是具體程式碼 |
| 編譯期 | 較長；每個型別各編譯一次 |
| 二進位大小 | 隨特化型別數量增長（程式碼膨脹） |

$$\text{code size} \approx O(\text{distinct types used})$$

樣板以更長的編譯時間和更大的二進位換取執行期零開銷。

---

## 程式碼

```cpp
// Function template.
template <typename T>
T maximum(T a, T b) {
    return (a > b) ? a : b;
}

// Class template.
template <typename T>
class Box {
    T value;

public:
    Box(T v) : value(v) {}
    T get() const { return value; }
    void set(T v) { value = v; }
};

int main() {
    cout << maximum(3, 7) << endl;     // T = int
    cout << maximum(2.5, 1.5) << endl; // T = double

    Box<int> bi(42);
    Box<string> bs("hello");
    cout << bi.get() << " " << bs.get() << endl;
}
```

---

## 優缺點與使用時機

- 優點：零執行期成本；完整型別安全；無需繼承即可結構性運作。
- 缺點：程式碼膨脹與較長的編譯時間。
- 缺點：樣板錯誤訊息惡名昭彰地冗長（C++20 `concepts` 可改善）。
- 使用時機：泛用容器與演算法。

---

## 小結

| 多型 | 決定時機 | C++ | Go |
| --- | --- | --- | --- |
| 子型別 | 執行期動態分派 | 抽象類別 + 繼承（名義） | interface（結構化，無繼承） |
| 特設 | 編譯期，看引數靜態型別 | 函式/運算子多載 | 不支援（無函式多載） |
| 參數 | 編譯期，結構化鴨子型別 | templates / C++20 concepts | generics（Go 1.18+） |

- 樣板 = 編譯期參數多型；結構性（鴨子型別）；一份藍圖，多種具體型別。
- 在精神上最接近 Go interface 的結構性型別，但在編譯期而非執行期解析。
- 上方表格對比 C++ 與 Go 中三種多型的決定時機與機制。
