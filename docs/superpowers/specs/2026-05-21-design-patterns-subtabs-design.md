# Design Patterns Sub-Tabs — 設計文件

## 目標與背景

dsvisual 的 Design Patterns 分類目前是單一 top-level 分類,內含 6 個 GoF 模式(Singleton、Factory Method、Adapter、Decorator、Observer、Strategy)。未來會持續加入更多模式,因此先把 Design Patterns 分類內部以 GoF 三大類(Creational / Structural / Behavioral)用 **3 個 sub-tab** 組織起來,讓後續加入新模式時直接落入對應 tab。

本 spec 範圍**只做 sub-tab 子導覽與既有 6 模式的重新分配**,不新增任何模式。新增模式(Builder、Abstract Factory、Composite、Facade 等)留給後續 spec。

執行方法論:brainstorming → writing-plans → subagent-driven-development → finishing-a-development-branch。

## 範圍

**做:**
- 把 `METHOD_GROUPS` 中單一的 `patterns` group 換成 3 個子 group,各帶 `parent` 標記。
- `renderCategoryNav` 渲染:頂層 pill 列下方新增一條 sub-tab 列,僅在 Design Patterns 啟用時顯示。
- 既有 6 個模式重新分配到 3 個子 group。
- 更新 Playwright 測試輔助函式 `loadMethod` 以支援 sub-tab。
- 新增 sub-tab 行為測試;同步更新受影響的既有測試。
- 新增 sub-tab CSS。

**不做(刻意保持小而聚焦):**
- 不新增任何 pattern 方法。
- 不動任何 `.cpp` 檔、`code_db.js`、`build_db.js`。
- 不動任何簡報 —— 頂層分類仍是「Design Patterns」,6 份 pattern deck 的 `category` 字串維持 `"Design Patterns"`。
- 不動視覺化/渲染邏輯 —— `renderPattern()` 與 `updateLayout` 的 `pattern-` 分支以 `currentMode` 的 `pattern-` 前綴判斷,與 nav group 無關。
- 6 個 pattern 方法本身(id、檔案)不變,只改所屬子 group。

## 資料模型

在 `app.js` 的 `METHOD_GROUPS` 中,把單一 `patterns` group(`{ id: 'patterns', title: 'Design Patterns', methods: [...6...] }`)換成 3 個子 group:

```js
{ id: 'patterns-creational', title: 'Creational', parent: 'patterns',
  parentTitle: 'Design Patterns',
  methods: [ pattern-singleton, pattern-factory ] },
{ id: 'patterns-structural', title: 'Structural', parent: 'patterns',
  parentTitle: 'Design Patterns',
  methods: [ pattern-adapter, pattern-decorator ] },
{ id: 'patterns-behavioral', title: 'Behavioral', parent: 'patterns',
  parentTitle: 'Design Patterns',
  methods: [ pattern-observer, pattern-strategy ] },
```

- 每個方法條目本身(`id`、`title`、`file`、`visualizer`、`controls`)完全不變,只是移到對應子 group 的 `methods` 陣列。
- `parent` 與 `parentTitle` 是新欄位;其他 8 個分類 group 不帶 `parent`。
- 三個子 group 是 `METHOD_GROUPS` 中的一般扁平條目,因此 `getMethodGroupById`、`getMethodGroupForMode`、`renderMethodSections` 等以 group id 運作的函式維持原樣可用。

## 導覽渲染

### `renderCategoryNav` 改寫

目前 `renderCategoryNav` 對每個 `METHOD_GROUPS` 條目渲染一顆 `.category-nav-btn`。改為:

1. **頂層 pill 列**:遍歷 `METHOD_GROUPS`;無 `parent` 的 group → 各自一顆 `.category-nav-btn`(`dataset.group = group.id`);有 `parent` 的 group → 第一次遇到某 `parent` 時建立單一頂層 pill(`textContent = parentTitle`,`dataset.group = parent`,即 `'patterns'`),後續同 `parent` 的 group 不再重複建立。頂層 pill 總數維持 9(8 個原分類 + 1 個 Design Patterns)。

2. **sub-tab 列**:在頂層 pill 列下方新增一個容器 `.category-subtab-row`。對每個有 `parent` 的 group 渲染一顆 `.category-subtab-btn`(`textContent = group.title`,`dataset.subgroup = group.id`,`dataset.parent = parent`)。預設整列隱藏。

3. **顯示/隱藏 sub-tab 列**:當啟用的分類屬於某個 parent(即 active group 帶 `parent`,或使用者點了 parent pill)時,顯示該 parent 的 sub-tab 列;啟用其他無 parent 分類時隱藏整列。

### 點擊行為

- 點頂層「Design Patterns」pill → `activateGroup` 啟用其第一個子 group(`patterns-creational`)→ method 下拉選單載入 Creational 的方法,選第一個(`pattern-singleton`)。
- 點某 sub-tab → `activateGroup(子group id)` → 沿用既有 `activateGroup`,method 下拉選單重載該 tab 的方法並選第一個。
- 點其他頂層分類 → sub-tab 列隱藏。

### 高亮狀態

當任一 pattern 子 group 啟用時:
- 「Design Patterns」頂層 pill 顯示 active 樣式(沿用 `.category-nav-btn` 的 active class)。
- 對應的 sub-tab 顯示 active 樣式(`.category-subtab-btn` active class)。

`setActiveCategory(groupId)` 需擴充:若 `groupId` 對應的 group 帶 `parent`,同時把 parent pill 與該 sub-tab 標為 active,並確保 sub-tab 列為顯示狀態。

## CSS

在 `style.css` 末端附加 sub-tab 列樣式,類別以 `category-subtab-` 命名空間:
- `.category-subtab-row` —— 水平列,預設 `display:none`;顯示時 flex 排列,置於頂層 pill 列下方。
- `.category-subtab-btn` —— tab 按鈕樣式(較頂層 pill 輕量,如底線式 tab)。
- `.category-subtab-btn.active` —— 啟用中的 tab 高亮。

沿用既有 CSS 變數(`--accent` 等),不覆蓋既有規則。

## 測試

### `loadMethod` 輔助函式須更新

`tests/visualizer.spec.js` 的 `loadMethod(page, methodId)` 目前只遍歷頂層 `.category-nav-btn`、點擊後檢查 method 下拉選單。重組後,Structural / Behavioral tab 的模式(adapter、decorator、observer、strategy)無法只靠點頂層 pill 抵達。

更新 `loadMethod`:對每個頂層分類按鈕,點擊後先檢查 method 下拉選單;若未找到目標方法**且該分類有 sub-tab 列出現**,則逐一點擊每個 `.category-subtab-btn`,每次點擊後再檢查 method 下拉選單。找到即 `selectOption` 並返回。

### 既有測試影響

- `Phase 1 category nav`:斷言 `.category-nav-btn` 數量為 9 —— 仍成立(sub-tab 用不同 class `.category-subtab-btn`)。
- `Phase 5 regression`:項目 `['Design Patterns', 'pattern-singleton']` —— 仍成立(點「Design Patterns」→ 預設 Creational tab → 第一個方法 `pattern-singleton`)。
- 既有 6 個 pattern 測試(Singleton / Factory / Adapter / Decorator / Observer / Strategy):一旦 `loadMethod` 更新支援 sub-tab,即可通過。
- 跨「動態→靜態」導覽回歸測試:pattern 為靜態檢視,不受影響。

### 新增測試

新增 1 個 Playwright 測試:點「Design Patterns」頂層 pill → 斷言出現 3 顆 `.category-subtab-btn`(Creational / Structural / Behavioral)→ 點「Structural」sub-tab → 斷言 method 下拉選單含 `pattern-adapter` 選項 → 點「Behavioral」→ 含 `pattern-observer`。

### 驗收

- `npm run test:all` 全綠(預估 114 → 115:新增 1 個 sub-tab 測試;既有測試經 `loadMethod` 更新後維持通過)。
- 冪等性:`npm run format:code` 與 `npm run build:slides` 重跑後 `git status` 乾淨(本 spec 不動 `.cpp` 與簡報,理應無 diff)。
- 手動驗證:瀏覽器開啟,確認 9 顆頂層 pill;點 Design Patterns 出現 3 個 sub-tab 且預設停在 Creational;切各 sub-tab method 清單正確;切到其他頂層分類時 sub-tab 列隱藏。

## 不在範圍內

- 新增任何 design pattern(Builder、Abstract Factory、Composite、Facade、Command、State、Template Method、Proxy 等)—— 留給後續的 Batch 1 / Batch 2 spec。
- 其他分類的 sub-tab 化 —— 本 spec 只處理 Design Patterns。
- 簡報 `category` 字串變更。

## 預期產出

`METHOD_GROUPS` 重組為 3 個 pattern 子 group、`renderCategoryNav` 與 `setActiveCategory` 的 sub-tab 支援、sub-tab CSS、`loadMethod` 測試輔助函式更新、1 個新 sub-tab 測試。無 `.cpp`、無簡報、無視覺化變動。
