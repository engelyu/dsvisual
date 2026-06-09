# dsvisual Tier-1 剩餘缺口視覺化 — 設計文件

- 日期:2026-06-09
- Repo:`/Users/skhuang/course/dsvisual`(分支 main)
- 動機:補齊 ds2026 課程主線教到、但 dsvisual 尚無互動視覺化的 Tier-1 缺口(`tree-traversal`、`huffman` 已完成)。

## 1. 範圍

新增 6 個互動視覺化,分三批交付,每批一個 plan/PR、可獨立上線:

| # | id | 群組 | 章 |
|---|---|---|---|
| 1 | `graph-aoe` | graphs | 6 |
| 2 | `expr-infix-postfix` | linear | 3 |
| 3 | `tree-obst` | trees | 9 |
| 4 | `sort-external` | sorting | 8 |
| 5 | `matrix-sparse` | **arrays(新群組)** | 2 |
| 6 | `poly-padd` | **arrays(新群組)** | 2/4 |

- **Batch A**:`graph-aoe`、`expr-infix-postfix`
- **Batch B**:`tree-obst`、`sort-external`
- **Batch C**:`matrix-sparse`、`poly-padd`(含新增 `arrays` 群組)

## 2. 共用架構(沿用既有、已驗證的模式)

與 `tree-traversal` / `huffman` 完全相同的整合方式:

- **純 frame 產生器**放獨立檔(雙重匯出 IIFE,如 `heap_models.js`):
  ```js
  (function (global) { /* pure fns */ const api = {...};
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    global.<Name>Viz = api; })(typeof window !== 'undefined' ? window : globalThis);
  ```
  Node 測試 `require()`,瀏覽器 `window.<Name>Viz`。
- **DOM 繪製函式**加在 app.js 主 closure 內,使用既有私有 helper `acquireDynamicVizHost()`、`buildStepControls(onStep,onReset,intervalMs)`、(樹類)`computeTreeLayout()`;語言用 `window.I18N.getCurrentLanguage()`。
- **動畫**:預算 `frames[]` + `buildStepControls` 的 Step/Run/Reset;phase/msg 雙語解說。
- **節點繪製通則**(踩過的雷):`.tree-node` 用 `transform: translate(-50%,-50%)` 置中,故節點視覺中心 = 設定的 `left/top`;**邊端點直接用 `(x,y)`,不可加半徑偏移**;若加 highlight class 含 `transform`,必須保留 `translate(-50%,-50%)`;放樹/圖的 stage 容器加 `overflow:hidden` 以免溢出遮到其他面板。
- **每個 method 的接線**(app.js):`METHOD_GROUPS` 註冊、`getCodeForMethod()`、`updateLayout()` 分支(設 code 面板檔名/內容)、`renderAll()` dispatch;`index.html` 在 `app.js` 前載入新模組;`build_db.js` 映射 + `node build_db.js`;`i18n.js`(zh/en `method.*` + 新標籤);`desc_db.js`;`slides_db.js` 雙語 deck + `npm run build:slides`;`style.css` 新樣式。
- **測試**:純函式單元測試(`tests/unit/*.test.js`,`node --test`)+ Playwright E2E(`tests/*.spec.js`,用既有 `loadMethod` 導航 helper)。

### 新群組 `arrays`
在 `METHOD_GROUPS` 新增 `{ id: 'arrays', title: 'Arrays', methods: [...] }`(對應教科書 Ch2;現有 linear 群組為 stack/queue/list,不適合放矩陣/多項式)。`buildCategoryNav()` 會自動產生其導覽 pill;需在 `i18n.js` 加 `group.arrays` 標籤(zh/en)。`matrix-sparse`、`poly-padd` 放此群組。

## 3. 逐項設計

### 3.1 `graph-aoe`(Batch A,graphs)
- **輸入**:預設 AOE 網路(教科書範例,DAG + 邊權=工時),提供 1–2 個 preset 切換。**不開放自由編輯圖**(編輯 UI 過重,YAGNI)。
- **純函式**:`buildAoeFrames(nodes, edges)`(`nodes:[{id,x,y}]`、`edges:[{u,v,w}]`)→
  `{ frames, ee, le, critical }`。frame =
  `{ phase:'topo'|'forward'|'backward'|'critical', current, ee:{}, le:{}, criticalEdges:[], msg:{zh,en} }`。
  不變式(測試):forward pass 後 `ee[sink]` = 最長路徑長;backward pass `le[source]=0`(或等於 ee 對應);critical activity 為 `e(i)==l(i)`;critical path 長度 = `ee[sink]`。
- **版面**:有向加權圖(可複用/仿 `buildWeightedGraphSvg`,line 3933)+ `ee/le` 表格 + 關鍵邊高亮 + phase/msg + Step/Run/Reset + preset 下拉。

### 3.2 `expr-infix-postfix`(Batch A,linear)
- **輸入**:可編輯中序運算式(預設 `A*(B+C)*D`;支援 `+ - * / ( )` 與單字母/數字 token)。
- **純函式**:
  - `tokenize(infix)` → tokens。
  - `buildShuntingYardFrames(tokens)` → 轉換 frames(運算子堆疊 + 輸出列),回傳 `{frames, postfix}`。
  - `buildPostfixEvalFrames(postfixTokens, env?)` → 求值 frames(值堆疊),回傳 `{frames, value}`(若為純符號則略過求值或代入預設值)。
  frame =`{ phase:'convert'|'eval', token, opStack:[], output:[]|valStack:[], msg:{zh,en} }`。
  不變式:轉換結果為正確 postfix(對數個範例硬斷言);求值結果正確;括號平衡錯誤要回報明確錯誤而非崩潰。
- **版面**:token 流(高亮當前)+ 運算子堆疊(垂直)+ 輸出列;切到 eval 階段顯示值堆疊。**兩個 sub-phase**(轉換完才求值)。

### 3.3 `tree-obst`(Batch B,trees)
- **輸入**:可編輯 key 清單 + 頻率(預設樣本,如 keys=[10,20,30,40],freq=[4,2,6,3])。
- **純函式**:`buildObstFrames(keys, freqs)` → 依鏈長 L=1..n 填 `cost[i][j]`、`root[i][j]`,每格嘗試各 root k。回傳 `{frames, cost, root, tree}`。frame =`{ i, j, tryK, cost:{}, root:{}, msg:{zh,en} }`;最後 `reconstruct(root)` 得最佳 BST。
  不變式:`cost[0][n-1]` = 最小加權路徑長(對小範例硬斷言);重建樹的 inorder = 排序後 keys。
- **版面**:**三角 DP 表格(新面板)**逐格填入 + 當前 (i,j,k) 高亮;最後一個 phase 用 `computeTreeLayout` 畫出重建的最佳 BST(沿用節點繪製通則)。

### 3.4 `sort-external`(Batch B,sorting)
- **輸入**:可編輯整數數列 + 參數記憶體容量 `M`、合併路數 `k`(預設樣本 + M=4, k=3)。
- **純函式**:`buildExternalSortFrames(data, M, k)` →
  Phase1 run generation(連續 M 筆內排序成 run);Phase2 用 **loser tree** 做 k-way merge。回傳 `{frames, runs, output}`。frame =
  `{ phase:'runs'|'merge', runs:[[...]], loserTree:[...], picked, output:[...], msg:{zh,en} }`。
  不變式:輸出為 data 的排序結果;run 數 = ceil(n/M);每次合併從 k 個 run head 取最小。
- **版面**:**多面板**——runs 清單(多列)+ loser/winner tree(用 `computeTreeLayout` 畫)+ 輸出 buffer + phase/msg。最複雜;若 loser tree 過重,Batch B 設計時可先以 winner-tree(selection tree)呈現,維持「每步取最小」的教學重點。

### 3.5 `matrix-sparse`(Batch C,arrays)
- **輸入**:可編輯小網格(預設如 4×4 含數個非零;以文字框輸入「每列逗號分隔」或點格切換)。
- **純函式**:`toTriples(matrix)` → `[{r,c,v}]`(row-major);`buildFastTransposeFrames(matrix)` → FAST_TRANSPOSE:算 `rowSize[]`、`startPos[]`,逐元素放到轉置三元組。回傳 `{frames, triples, transposed}`。frame =`{ phase, scanIndex, rowSize:[], startPos:[], placed:[...], msg:{zh,en} }`。
  不變式:`transposed` = 矩陣轉置(對範例硬斷言);三元組數 = 非零數。
- **版面**:**稠密網格 + 三元組表**;轉置時動畫高亮來源元素與目標位置。

### 3.6 `poly-padd`(Batch C,arrays)
- **輸入**:兩個可編輯多項式(每項係數/指數;預設如 A=3x²+2x+1, B=5x³+4x)。
- **純函式**:`parsePoly(str)` → `[{coef,exp}]`(指數遞減);`buildPaddFrames(A, B)` → 雙指標依指數合併、三情況(A.exp>B.exp / 相等相加 / <)。回傳 `{frames, result}`。frame =`{ i, j, result:[...], action:'takeA'|'add'|'takeB', msg:{zh,en} }`。
  不變式:`result` = A+B(對範例硬斷言;相加為 0 的項要剔除)。
- **版面**:A、B、result 三個 term 清單 + 雙指標高亮。

## 4. 檔案清單(每個 method,沿用既有模式)
- 新增:`<name>_viz.js`(純模組)、`<name>.cpp`、`tests/unit/<name>_viz.test.js`、`tests/<name>.spec.js`
- 修改:`app.js`(註冊 + render fn)、`build_db.js`、`i18n.js`、`desc_db.js`、`slides_db.js`、`index.html`、`style.css`;Batch C 另加 `arrays` 群組(`app.js` + `i18n.js` `group.arrays`)
- 重生成:`code_db.js`、`slides_rendered.js`(+ slides md)

## 5. 驗收標準(每個 method)
- 選單對應群組出現該 method,中英名稱正確(`arrays` 群組於 Batch C 出現)。
- 可用 Step/Run/Reset 逐步;輸入可編輯(`graph-aoe` 為 preset 切換);最終結果正確。
- 節點/邊對齊正確(遵循節點繪製通則);深結構不溢出遮蓋其他面板。
- `node build_db.js` 後 code_db 含新代碼;`npm run build:slides` 產出該 deck 的 zh/en md。
- `npm run test:all`(單元 + Playwright)通過,含新測試。

## 6. 風險與緩解
- **app.js 持續變大**:主邏輯放純模組,app.js 僅註冊 + 繪製;每批小幅增加。
- **純函式須跨 Node/瀏覽器**:純 frame 產生器與 DOM 繪製分離,純函式 `module.exports` 供 `node --test`。
- **`sort-external` 複雜度**:Batch B 設計時若 loser tree 成本過高,降為 winner/selection tree 呈現,保留「每步取最小 + k-way merge」教學重點(於該 plan 明確標註取捨)。
- **新 `arrays` 群組導覽**:`buildCategoryNav` 對無 `parent` 的群組自動生成 pill;需確認 `group.arrays` i18n 鍵存在,否則顯示鍵名。
- **graph-aoe 不可編輯**:以 1–2 個 preset 涵蓋教學需求;若日後要編輯再另開需求。
