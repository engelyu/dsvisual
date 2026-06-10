# dsvisual Tier-2 視覺化 — 設計文件

- 日期:2026-06-09
- Repo:`/Users/skhuang/course/dsvisual`(分支 main;檔案已重組為 `cpp/` + `js/`)
- 動機:補齊 ds2026 課程主線教到的 Tier-2 缺口(Tier-1 八項已完成)。

## 1. 範圍

新增 7 個互動視覺化,分 4 批交付,每批一個 plan/PR、可獨立上線:

| # | id | 群組 | 章 | 批次 |
|---|---|---|---|---|
| 1 | `maze-stack` | linear | 3 | E1 |
| 2 | `list-doubly` | linear | 4 | E1 |
| 3 | `search-fibonacci` | searching | 7 | E2 |
| 4 | `search-interpolation` | searching | 7 | E2 |
| 5 | `tree-threaded` | trees | 5 | E3 |
| 6 | `tree-mway` | trees | 10 | E3 |
| 7 | `tree-expression` | trees | 5 | E4 |

群組皆已存在(linear / searching / trees);不新增群組。

## 2. 共用架構(沿用既有、已驗證的模式;檔案位於 cpp/ + js/)

- **純 frame 產生器**:`js/<name>_viz.js`,雙重匯出 IIFE(如 `js/heap_models.js`):瀏覽器 `window.<Name>Viz`、Node 測試 `require('../../js/<name>_viz')`。
- **DOM 繪製函式**加在 `js/app.js` 主 closure,使用既有私有 helper `acquireDynamicVizHost()`、`buildStepControls(onStep,onReset,intervalMs)`、(樹類)`computeTreeLayout()`;語言用 `window.I18N.getCurrentLanguage()`。
- **動畫**:frames + `buildStepControls` 的 Step/Run/Reset(已含 Pause/Resume + Speed 滑桿)。
- **節點繪製通則**(踩過的雷):`.tree-node` 以 `transform: translate(-50%,-50%)` 置中 → 邊端點用 `(x,y)` 不加偏移;含 transform 的 highlight class 須保留 translate;放樹的 stage 容器加 `overflow:hidden`。
- **整合點(js/app.js)**:`METHOD_GROUPS` 註冊、`getCodeForMethod()`、`updateLayout()` 分支(設 code 面板檔名/內容)、`renderAll()` dispatch。**順序注意**:`search-*` 新分支須在通用 `currentMode.includes('search')` catch-all 之前;`list-doubly` 在通用 `includes('list-')` 之前;`tree-*` 在通用 `includes('tree-')` 之前(若有)。
- **C++ 參考**:`cpp/<name>.cpp` + `build_db.js` 的 `mappings` 加 `'<name>.cpp': 'codeXxx'`(`build_db.js` 已讀 `cpp/`、寫 `js/code_db.js`);`node build_db.js` 重生。
- **i18n**:`js/i18n.js`(經 reorg)加 `method.<id>`(en/zh)+ 任何新 UI 標籤。
- **desc_db**:`js/desc_db.js` 加一筆。
- **slides**:`slides_db.js`(留根目錄)加雙語 deck → `npm run build:slides`(輸出 `js/slides_rendered.js` + `slides/zh|en/<id>.md`)。
- **index.html**:在 `js/app.js` 之前以 `<script src="js/<name>_viz.js">` 載入。
- **CSS**:`style.css` 新樣式。
- **測試**:純函式單元測試(`tests/unit/<name>_viz.test.js`)+ Playwright E2E(`tests/<name>.spec.js`,用既有 `loadMethod` 導航)。

## 3. 逐項設計

### 3.1 `maze-stack`(E1,linear)
- **輸入**:可編輯網格文字(列以 `;` 分隔、格以字元;`#`=牆、`.`=通道、`S`=起點、`E`=終點),提供預設迷宮。
- **純函式**:`parseMaze(text)` → `{grid, start, end, rows, cols}`;`buildMazeFrames(maze)` → DFS 回溯(4 向),frame =
  `{ current:[r,c], visited:[[r,c]...], stack:[[r,c]...], action:'visit'|'backtrack'|'found'|'deadend', path:[[r,c]...]|null, msg:{zh,en} }`;回傳 `{frames, path}`(path 為找到的路徑或 null)。
- **不變式(測試)**:對有解預設迷宮 `path` 從 start 到 end、相鄰格皆連通且非牆;對無解迷宮 `path===null` 且最終 stack 清空。
- **版面**:網格(當前/已訪/回溯/最終路徑著色)+ 顯式路徑堆疊面板 + phase/msg。⚠️網格輸入 + stack 面板。

### 3.2 `list-doubly`(E1,linear)
- **輸入**:整數序列(預設 `[10,20,30,40]`)+ 環狀切換(circular on/off)。
- **純函式**:`buildDoublyFrames(initial, ops)` 或以互動操作驅動;核心提供 `insertAt(list, idx, val)`、`deleteAt(list, idx)`、`traverse(list, dir)` 產生 frame =
  `{ nodes:[{val,prev,next}], current, action, circular, msg:{zh,en} }`。為可測試,提供純函式 `applyOps(initial, circular, ops)` → 最終節點陣列。
- **不變式(測試)**:插入/刪除後 prev/next 一致(node.next.prev === node);circular 時 tail.next===head 且 head.prev===tail;非 circular 時兩端為 null。
- **版面**:節點橫列,每節點顯示 prev/next 雙箭頭;circular 時首尾相接弧線或標記。⚠️雙箭頭渲染 + circular 切換。

### 3.3 `search-fibonacci`(E2,searching)
- **輸入**:排序整數陣列(預設)+ 目標值。
- **純函式**:`buildFibSearchFrames(arr, target)` → 費氏數切分;frame =
  `{ probe:idx, lo, fibM, range:[lo,hi], found:bool|idx, msg:{zh,en} }`;回傳 `{frames, foundIndex}`。
- **不變式(測試)**:`foundIndex` 等於 `arr.indexOf(target)`(存在時)或 -1;每步探測點落在當前範圍內。
- **版面**:排序陣列格(範圍/探測高亮)+ Fibonacci 數列面板 + phase/msg。

### 3.4 `search-interpolation`(E2,searching)
- **輸入**:排序整數陣列(預設,值分佈大致均勻)+ 目標值。
- **純函式**:`buildInterpFrames(arr, target)` → 內插估位置 `pos = lo + (target-arr[lo])*(hi-lo)/(arr[hi]-arr[lo])`;frame =
  `{ lo, hi, pos, found:bool|idx, msg:{zh,en} }`;回傳 `{frames, foundIndex}`。
- **不變式(測試)**:`foundIndex === arr.indexOf(target)`(存在)或 -1;探測位置 `lo<=pos<=hi`;除零(arr[hi]===arr[lo])明確處理不崩潰。
- **版面**:排序陣列格 + 內插位置公式顯示 + phase/msg。

### 3.5 `tree-threaded`(E3,trees)
- **輸入**:建 BST(輸入值序列,預設樣本)。
- **純函式**:`buildThreadedFrames(root)` → 計算 inorder 後繼引線(右空指標指向 inorder 後繼),並以引線做 inorder 走訪(免堆疊);frame =
  `{ current:nodeId, threads:[{from,to}], visited:[vals], usingThread:bool, msg:{zh,en} }`;回傳 `{frames, inorder}`。
- **不變式(測試)**:`inorder` 等於 BST 的中序(排序);引線數 = 右子為空的節點數(指向後繼者)。
- **版面**:樹(實線 child 邊)+ 虛線 thread 邊;走訪時當前節點高亮、沿引線移動標記。⚠️虛線 thread 邊 + child 邊。重用 `computeTreeLayout`,遵循節點繪製通則。

### 3.6 `tree-mway`(E3,trees)
- **輸入**:鍵序列 + 階數 `m`(預設 m=3)。
- **純函式**:`buildMwayFrames(keys, m)` → 依序插入到 m-way 搜尋樹(每節點最多 m-1 鍵、m 子);frame =
  `{ tree(snapshot), current:nodeId, insertedKey, descendPath:[nodeId...], msg:{zh,en} }`;回傳 `{frames, tree}`。節點 = `{id, keys:[...], children:[ids]}`。
- **不變式(測試)**:每節點鍵數 ≤ m-1、子數 = 鍵數+1(內部節點);中序(展平鍵)= 排序後鍵;搜尋既有鍵能沿 descendPath 找到。
- **版面**:多鍵寬框節點(非 40px 圓點)+ 連到子節點的邊;插入時沿 descendPath 高亮。⚠️多鍵節點寬框渲染(自訂,不用 `.tree-node` 圓點)。

### 3.7 `tree-expression`(E4,trees)
- **輸入**:後序運算式(預設如 `A B C + * D *`;運算元單字母/數字、運算子 `+ - * /`)。亦可由中序輸入經既有 shunting-yard 轉後序(可選,接續 `expr-infix-postfix`)。
- **純函式**:`buildExprTreeFrames(postfixTokens)` → 用堆疊掃描:運算元 push 葉節點;運算子 pop 兩棵子樹、建內部節點 push;frame =
  `{ token, forest:[subtreeRootIds], action:'leaf'|'combine', tree(partial), msg:{zh,en} }`;最終得運算式樹根。另提供 `evalExprTree(root)`(數值運算元時求值)。回傳 `{frames, root, value?}`。
- **不變式(測試)**:對 `3 4 + 5 *` 建樹後 `evalExprTree` = 35;節點數 = token 數;運算子為內部節點(2 子)、運算元為葉。
- **版面**:子樹堆疊面板 + 逐步長成的運算式樹(重用 `computeTreeLayout`);最終可顯示求值。⚠️從 postfix 建樹 + 子樹堆疊面板。

## 4. 檔案清單(每個 method,沿用模式)
- 新增:`js/<name>_viz.js`、`cpp/<name>.cpp`、`tests/unit/<name>_viz.test.js`、`tests/<name>.spec.js`
- 修改:`js/app.js`(註冊 + render fn)、`build_db.js`(mapping)、`js/i18n.js`、`js/desc_db.js`、`slides_db.js`、`index.html`、`style.css`
- 重生成:`js/code_db.js`、`js/slides_rendered.js`(+ slides md)

## 5. 驗收標準(每個 method)
- 選單對應群組出現該 method,中英名稱正確。
- Step/Run/Reset 逐步可用、輸入可編輯、最終結果正確。
- 節點/邊對齊正確(遵循節點繪製通則);深結構不溢出遮蓋其他面板。
- `node build_db.js` 產生含新代碼的 `js/code_db.js`;`npm run build:slides` 產出該 deck 的 zh/en md。
- `npm run test:all`(單元 + Playwright)通過,含新測試;含計數測試(如 `tests/i18n.spec.js` 的 tile/nav 計數、`tests/visualizer.spec.js` 的 nav 按鈕數)每批 +該批新增方法數後更新。

## 6. 風險與緩解
- **dispatch 順序**:`search-*`/`list-doubly`/`tree-*` 新分支須置於通用 `includes(...)` catch-all 之前;以 grep/ORDER 檢查驗證(沿用 Batch B `sort-external` 的做法)。
- **純函式跨 Node/瀏覽器**:純 frame 產生器與 DOM 繪製分離,純函式 `module.exports` 供 `node --test`。
- **多鍵 / 雙指標 / 網格等新渲染**:不套用 `.tree-node` 圓點假設;以各自 CSS 類繪製,避免對齊雷。
- **nav 下拉變高**:每批新增方法到既有群組會讓下拉更高;既有 hover 型測試(如 zoom_gesture 已改用 stack-array)應不受影響,但 Task 收尾跑全套以防回歸,並按需更新 nav/tile 計數測試。
- **search 新法與既有 search 機制差異**:`search-fibonacci`/`search-interpolation` 採新 frames 模式(非既有 sleep 型),自帶 render,不改既有 search-binary/linear。
