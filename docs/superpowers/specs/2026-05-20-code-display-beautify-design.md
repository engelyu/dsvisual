# 設計文件:C++ 程式碼顯示美化(pretty-print + 語法上色 + 面板視覺化)

- **日期**:2026-05-20
- **分支**:`feature/code-display-beautify`
- **狀態**:設計已核可,待撰寫實作計畫

## 1. 目標

讓專案中所有 C++ 程式碼顯示「根據語法 pretty print」並具備一致的美觀外觀,
涵蓋兩個顯示介面:

- **App 主畫面**的方法 C++ 程式碼面板(來源:`code_db.js`)。
- **簡報檢視器** modal 內的 `code` 區塊(來源:`slides_db.js`)。

具體要求:

1. 程式碼依 C++ 語法重新格式化(consistent 縮排、括號、空白)。
2. 加強語法上色,App 面板與簡報程式碼共用同一套主題。
3. 面板視覺化升級(IDE 分頁頭、行號、複製按鈕、深色滾動條、可讀字級)。

## 2. 架構

```
[ .cpp 檔 ]  ──clang-format──►  [ formatted .cpp ]
                                       │
                                       ├──build_db.js──►  code_db.js  ──Prism (runtime)──► App 程式碼面板
                                       │
                                       └─(slides_db.js 內的 code 區塊獨立 clang-format)
                                                  │
                                                  └─build_slides.js (含 Prism 預上色)──► slides_rendered.js / *.md
```

**單一格式化器**:clang-format(一次性 + 可重跑)。
**單一上色器**:Prism(在地 vendored,移除 CDN 相依,與 KaTeX 一致)。
**共用一套 CSS 主題**樣式 App 面板與簡報程式碼,兩處外觀完全一致。

### 為何採 Source-of-truth 路線

`code_db.js` 是 `build_db.js` 從 `.cpp` 原始檔自動產生的。比較過三種方案:

| 方案 | 評估 |
|------|------|
| 採 source-of-truth:格式化 `.cpp` → 重生 `code_db.js` | ✅ 採用。一處改、處處一致。 |
| 只改顯示複本(直接動 `code_db.js`) | ❌ 下次 `build_db.js` 重生會把格式洗掉。`code_db.js` 必須維持「自動產生」狀態。 |
| 顯示期 JS 格式化 | ❌ JS 端的 C++ 格式化器品質差;clang-format 一次到位才對。 |

雖然使用者一開始指定的範圍是「App 面板 + 簡報程式碼」不含 `.cpp`,實作機制上 `.cpp` 必須被格式化
(因為它是 `code_db.js` 的來源)。`.cpp` 的格式化是 App 面板美化的**機制**,不是額外增加的範圍。

## 3. 格式化(clang-format)

### `.clang-format` 規則

放在 repo root,内容基於 LLVM 風格微調:

```yaml
BasedOnStyle: LLVM
IndentWidth: 4
ColumnLimit: 90
AccessModifierOffset: -4
PointerAlignment: Left
AlwaysBreakTemplateDeclarations: Yes
KeepEmptyLinesAtTheStartOfBlocks: false
```

選擇理由:
- `IndentWidth: 4` 與多數既有 `.cpp` 一致。
- `ColumnLimit: 90` 在 App 面板與簡報投影片兩處都不會過度換行(投影片寬度限制較嚴)。
- `PointerAlignment: Left`(`int* x`)較符合現代 C++ 慣例與多數教學書寫法。
- 其餘為 readability 微調。

### `format_code.js`(新增 Node 腳本)

職責:

1. `require('clang-format')` 取得執行檔路徑;對 repo 內每個 `*.cpp` 跑 clang-format,寫回原檔。
2. 重跑 `build_db.js` 重生 `code_db.js`。
3. 讀 `slides_db.js`,對每個 `{ type:'code', lang:'cpp', code:'...' }` 區塊把 `code` 字串
   個別丟給 clang-format,寫回。
4. 重跑 `npm run build:slides` 重生 `.md` 與 `slides_rendered.js`。

可獨立執行 `node format_code.js`,也可透過 npm script `npm run format:code` 一次跑完所有步驟。

### 工作量估算

- 39 個 `.cpp` 檔 + 50 個簡報的 code 區塊。
- clang-format 全自動;預期會產生大量 diff 但行為等價(只有 whitespace + 括號位置變動)。
- 既有 Playwright 測試若有以 `toContainText` 比對程式碼中特定空白/換行位置的,可能需要小幅更新斷言。

## 4. 語法上色(Prism)

### Prism 在地化

- `vendor/prism/prism.min.js` + `prism-cpp.min.js`(只留 C/C++ 語言)。
- `vendor/prism/prism-tomorrow.min.css` 為基礎主題,自製覆寫微調 keyword / 類型 / 字串 / 註解的對比。
- 從 `index.html` 移除三個 CDN script tag + 一個 CDN link。

### App 面板上色修正

- `app.js` 渲染 method card 時,`<pre><code>` 加 `class="language-cpp"`(目前缺漏)。
- 在 mount 時呼叫 `Prism.highlightAllUnder(section)`,取代既有的單一 `highlightElement` 呼叫,
  確保整張卡的程式碼都正確上色。

### 簡報程式碼建構期預上色

- `build_slides.js` 的 `blockToHtml('code')` 改成
  `Prism.highlight(code, Prism.languages.cpp, 'cpp')` 取代 `escapeHtml`。
  輸出已是上色好的 HTML token span。
- Prism 在 Node 端使用 `require('prismjs')`(npm 套件,與既有 KaTeX 建構期渲染相同模式)。
- 結果:簡報程式碼自帶上色,瀏覽器零執行期工作。

## 5. 面板視覺化升級

套用於 App 面板與簡報 code 兩處,使用同一份 CSS,外觀一致:

- **編輯器風格頂列**:模仿 IDE 分頁外觀,顯示 `📄 stack_array.cpp`,左邊三個 macOS 風格的小圓點
  (純裝飾,不互動)。
- **行號**:用 CSS counter 做(避免引入 Prism line-numbers 外掛),預設開啟,字色低對比。
- **複製按鈕**:右上角小按鈕,`navigator.clipboard.writeText` 複製原始碼;成功時短暫顯示「Copied」。
- **字級**:從 `0.78rem` 提高到 `0.85rem`,可讀性更好。
- **滾動條**:深色主題訂製滾動條(WebKit `::-webkit-scrollbar`)。

預期外觀:

```
┌─ ⬤ ⬤ ⬤  📄 stack_array.cpp                    [⧉ Copy] ┐
│ 1  #include <iostream>                                  │
│ 2  using namespace std;                                  │
│ 3                                                        │
│ 4  class StackArray {                                    │
│ 5      int arr[MAX_SIZE];                                │
│ 6      int top;                                          │
│ ...                                                      │
└──────────────────────────────────────────────────────────┘
```

## 6. 檔案異動

**新增**

- `.clang-format` — 格式化規則。
- `format_code.js` — 一次性格式化腳本(可重跑)。
- `vendor/prism/prism.min.js`、`prism-cpp.min.js`、`prism-tomorrow.min.css` — 在地化 Prism。

**修改**

- 39 個 `.cpp` 檔(clang-format 後)。
- `code_db.js`(`build_db.js` 重生)。
- `slides_db.js`(code 區塊重新格式化) → 連動 `slides_rendered.js` 與 `slides/{zh,en}/*.md` 重生。
- `index.html` — 移除 Prism CDN 標籤,改載 vendored;移除 `prism-c`(只留 cpp)。
- `app.js` — `<pre><code class="language-cpp">`、`Prism.highlightAllUnder`、複製按鈕事件處理。
- `style.css` — IDE 分頁頭、行號 counter、複製按鈕、自訂滾動條、共用 code-panel 主題。
- `build_slides.js` — `blockToHtml('code')` 改用 `Prism.highlight` 預上色;單元測試對應更新。
- `package.json` — devDep `clang-format` 與 `prismjs`,新增 `format:code` script。

## 7. 測試

- `node --test tests/unit/build_slides.test.js` — `code` block 的測試斷言改為驗證輸出含
  Prism token span。
- `npm run test:all` — 既有 Playwright 測試應全綠;若某些測試以 `toContainText` 比對程式碼字串中
  特定空白/換行位置,需要對應更新。
- 開瀏覽器肉眼驗證 App 面板與簡報的程式碼外觀一致、行號正確、複製按鈕運作。

## 8. 不在此範圍

- 不重寫任何 C++ 程式碼邏輯;只動格式。
- 不改演算法動畫 / 視覺化邏輯。
- 不更換 Prism 為其他上色器。
- 不引入完整的 IDE 行為(自動完成、可編輯、可執行)。

## 9. 風險與已知考量

- **clang-format 風格選擇**:不同風格(LLVM / Google / Mozilla / WebKit)產生的 diff 巨大且
  不可逆地改變既有檔案歷史。本案選 LLVM + 4-space 微調,主要原因是與既有 `.cpp` 大多一致,
  diff 最小、視覺最接近原樣。如未來想換風格,影響面廣,需要再評估。
- **`code_db.js` 的「自動產生」狀態必須維持**:不可手改;一律透過格式化 `.cpp` → 重跑
  `build_db.js`。
- **既有測試斷言**:若依賴特定字串位置或行內容,clang-format 後可能失敗;需在實作階段
  逐一修正。
- **Prism CDN 移除**:既有 `prism-c.min.js` 不再載入,僅留 cpp。所有目前展示的程式碼皆為 C++,
  此調整安全。
