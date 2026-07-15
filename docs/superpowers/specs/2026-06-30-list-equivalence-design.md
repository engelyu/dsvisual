# Linked-List 等價類(Equivalence Class)視覺化 — 設計文件

- 日期:2026-06-30
- Repo:`/Users/skhuang/course/dsvisual`(main @ 5bac74a)
- 動機:以 linked list 表示等價關係並找出等價類(連通分量)——經典 Horowitz「equivalence relations」演算法。放 `linear` 群組,與樹式的 `tree-dsu`(union-find)互補。

## 1. 範圍

`linear` 群組新增單一方法 `list-equivalence`(**不新增群組**)。沿用既有 dsvisual 模式(純 `*_viz.js` + app.js render + 統一 Step/Run/Reset + 雙語 slides + 單元/E2E),並接入既有難度隨機輸入功能(`random_input` + 🎲)。

## 2. 演算法

- 元素 0..n−1;輸入一組等價對 (i, j)。
- **建鄰接(linked list)**:每個元素一條 linked list `seq[i]`;對每個等價對 (i,j) 於 `seq[i]` 頭端插入 j、`seq[j]` 頭端插入 i(無向、頭插法,同課本)。
- **找等價類**:`out[]` 布林標記;for i = 0..n−1:若 `!out[i]` → 開新類,stack 推入 i、`out[i]=true`;while stack 非空:pop j 加入目前類,走訪 `seq[j]` 鏈,對每個 `!out[k]` 的 k:`out[k]=true`、push k。stack 空 → 該類完成。
- 結果:各等價類 = 圖的連通分量(含單點類)。

## 3. 架構

### 3.1 純模組 `js/list_equivalence_viz.js`(雙重匯出,可單元測試)
- `parseInput(nText, pairsText)` → `{ n, pairs }`:n 解析為整數;pairs 解析 `i=j`(逗號或分號分隔),過濾越界/自環/非數,回傳 `[[i,j],...]`。
- `buildAdjacency(n, pairs)` → `seq`:長度 n 的陣列,`seq[i]` 為該元素的鄰接陣列(頭插順序:後插入者在前)。
- `equivalenceFrames(n, pairs)` → `{ frames, classes, seq }`:
  - `seq`:最終鄰接(如上)。
  - `classes`:等價類陣列,每類為排序後元素陣列;類別依「首次出現的最小起始元素」順序。
  - `frames`:逐步快照,每個 `{ phase, ... }`:
    - Phase 1 `build`:`{ phase:'build', pair:[i,j], seq: <目前 seq 深拷貝> }`(每插入一對一 frame)。
    - Phase 2 `find`:`{ phase:'find', active, stack:[...], out:[bool...], classes:[...目前...], scanning?:{from, to} }`(push/pop/走訪各一 frame)。
    - 最後 `{ phase:'done', classes }`。
- 純函式(不碰 DOM);`module.exports` 供 `node --test`,`window.ListEquivalenceViz` 供瀏覽器。
- `DEFAULT`:`{ n: 12, pairs: [[0,4],[3,1],[6,10],[8,9],[7,4],[6,8],[3,5],[2,11],[11,0]] }`。

### 3.2 render `renderListEquivalence()`(js/app.js 主 closure)
- `let _equivState = null;`;預設用 `ListEquivalenceViz.DEFAULT`。
- `const host = acquireDynamicVizHost(); host.style.width = '100%';`(沿用 recursion 修復後的 host 撐滿做法,避免溢出)。
- 控制列:`<input class="eq-n">`(元素數 n)+ `<input class="eq-pairs">`(等價對,如 `0=4,3=1,6=10`)+ `<button class="eq-build">Build</button>` + `<button class="rand-btn" title="Random">🎲</button>`。
- 舞台(上下或左右兩區):
  - **鄰接區 `.eq-adj`**:n 列,每列 `元素 i → [chain nodes]`,以 linked-list 鏈呈現 `seq[i]`(節點 + 箭頭 + NULL 結尾)。
  - **找類區 `.eq-find`**:目前 stack(直向)、`out[]` 標記、已找到的等價類(著色分組框)。
- `paint(idx)`:依 `frames[idx].phase` 呈現 — build 階段高亮剛插入的鏈節點;find 階段高亮 active 元素、顯示 stack 與 out 標記、逐步組出類別並著色。走完顯示最終 classes。
- `step()` 回傳 `idx < frames.length - 1`;`reset()` idx=0;`host.appendChild(buildStepControls(step, reset, 700))`。
- `.eq-build` onclick(try/catch):`parseInput` → clamp(n ≤ 12、pairs ≤ 20)→ 寫入 `_equivState` → 重繪。
- `.rand-btn` onclick:`RandomInput.randomInputFor('list-equivalence', getInputDifficulty())` → 設 `_equivState` → 重繪。
- 語言 `window.I18N.getCurrentLanguage()`。

### 3.3 接線(4 處,同既有 dynamic-host 模式)
1. `METHOD_GROUPS`:`linear` 群組 methods 陣列加 `{ id:'list-equivalence', title:'Equivalence Classes (Linked List)', file:'list_equivalence.cpp', visualizer:'equiv', controls:'equiv' }`(置於 `list-doubly` 之後)。
2. `getCodeForMethod` `codeByMethod`:`'list-equivalence': codeListEquivalence`。
3. `updateLayout`:`else if (currentMode === 'list-equivalence') { codeTitle.textContent = 'list_equivalence.cpp'; codeDisplay.textContent = codeListEquivalence; }`。
4. `renderAll`:`else if (currentMode === 'list-equivalence') renderListEquivalence();`(精確 id;放在泛用 `includes('list-')` catch-all 之前,避免被吃)。

### 3.4 其他
- `cpp/list_equivalence.cpp` + `build_db.js` mapping → `codeListEquivalence`(`node build_db.js`)。
- `slides_db.js` 加 `list-equivalence` deck → `npm run build:slides`。
- `js/i18n.js`:`method.list-equivalence`(en/zh)。**無新群組**,不需 `group.*`。
- `index.html`:`<script src="js/list_equivalence_viz.js">` 於 app.js 之前。
- `js/random_input.js`:`randomInputFor` 加 `list-equivalence` 分支,回傳 `{ n, pairs }`;難度:normal 8–10 元素/6–8 對;special 產生單一大類(鏈狀)或全獨立;edge n=1 或無等價對(全單點);large n=12/多對。`.rand-btn` 與 R1/R2 既有 CSS 共用。

## 4. 檔案清單
- 新增:`js/list_equivalence_viz.js`、`tests/unit/list_equivalence.test.js`、`cpp/list_equivalence.cpp`、`slides/{zh,en}/list-equivalence.md`(build 產生)
- 修改:`js/app.js`、`index.html`、`js/i18n.js`、`slides_db.js`、`build_db.js`、`js/code_db.js`(build 產生)、`js/slides_rendered.js`(build 產生)、`js/random_input.js`、`tests/i18n.spec.js`;新增 E2E `tests/list_equivalence.spec.js`
- 不動:`js/cloud-config.js`

## 5. 計數更新(目前 tiles 110 / categories 14 / nav 15)
新增 1 method 到既有 `linear` 群組 →
- `tests/i18n.spec.js`:overview-tile 110 → **111**。
- overview-category 維持 **14**;`tests/visualizer.spec.js` `.category-nav-btn` 維持 **15**(無新群組/pill)。

## 6. 測試
- **單元**(`tests/unit/list_equivalence.test.js`):
  - 已知輸入的 `classes` = 連通分量(以測試內獨立 union-find 參考比對,集合相等)。
  - 每元素恰出現在一個類;所有類聯集 = {0..n−1};類數 = 連通分量數(含單點)。
  - `seq` 對稱:j ∈ seq[i] ⇔ i ∈ seq[j]。
  - `parseInput` 過濾越界/自環/非數。
  - `frames` 非空;最後一個 frame phase='done' 且 classes 與回傳 classes 相同。
  - edge:n=1(單一單點類);無 pairs(n 個單點類)。
- **E2E**(`tests/list_equivalence.spec.js`):載入 `list-equivalence`;斷言 `[data-method-section="list-equivalence"][data-runtime-state="active"]`;鄰接區 `.eq-adj` 與找類區 `.eq-find` 可見;Build 後、按 Step 前進不出錯;🎲 改變輸入。
- 全套 `npm run test:all` 綠(含計數更新)。

## 7. 驗收標準
- `list-equivalence` 可從 nav(linear 群組)載入;輸入 n + 等價對可 Build;Step/Run/Reset 正常;正確呈現 linked-list 鄰接 → 逐步找出等價類並著色;走完顯示所有類。
- 🎲 依難度產生輸入;雙語 slides deck 存在。
- 單元 + E2E 全綠;overview-tile 更新為 111;`js/cloud-config.js` 未動。

## 8. 風險與緩解
- **大輸入溢出**:n ≤ 12、pairs ≤ 20;host 撐滿 wrapper(同 recursion 修復)+ 區塊 overflow 可捲動。
- **正確性**:單元測試以「classes == union-find 連通分量」把關(linked-list 版與參考版一致)。
- **renderAll 被 catch-all 吃掉**:`list-equivalence` 含子字串 `list-`,務必把精確 id 分支放在 `currentMode.includes('list-')` 之前(同 sort-external/其他既有先例)。
- **輸入解析**:Build 以 try/catch 包覆,無效輸入不重繪、不丟例外。
- **與 tree-dsu 混淆**:slides 明確對比 linked-list 等價類 vs union-find(不同表示、同問題)。
