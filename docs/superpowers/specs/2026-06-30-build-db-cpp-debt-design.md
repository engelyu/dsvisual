# build_db 技術債修復:補齊 8 個孤兒 .cpp + mapping + 守衛 — 設計文件

- 日期:2026-06-30
- Repo:`/Users/skhuang/course/dsvisual`(main @ 29f9e66)
- 動機:`js/code_db.js` 是 `build_db.js` 產生的檔,但先前有 8 個 const 被**直接手寫進產生檔**,對應的 `cpp/*.cpp` 與 `build_db.js` mapping 從未提交。因此執行 `node build_db.js`(依 mapping 從 `cpp/` 重生)會**靜默丟掉這 8 個 const**,使 app 每個方法在載入時 `ReferenceError` 而全毀。本工作補齊 8 個可編譯 `.cpp` + mapping,並為 `build_db.js` 加守衛,使產生管線成為單一可信來源且可重複執行。

## 1. 現況(已查證)

- `build_db.js`:`mappings = { '<file>.cpp': '<constName>', ... }`;對每個項目,若 `cpp/<file>` 存在則輸出 `const <constName> = \`<escaped content>\`;`,**檔案不存在則靜默跳過**。跳脫規則:`content.replace(/\\/g,'\\\\').replace(/\`/g,'\\\`').replace(/\$/g,'\\$')`。
- 8 個孤兒 const(在 `code_db.js` 手寫、無 `.cpp`、無 mapping):`codeMagicLatin`、`codeMagicTorus`、`codeMagicFormula`、`codeMagicSymmetry`、`codeNanoBpeEncode`、`codeNanoComputeGraph`、`codeNanoBpeTrain`、`codeNanoNgramNext`。
- 每個都有對應 viz 模組(演算法依據):`js/magic_latin_viz.js`、`js/magic_torus_viz.js`、`js/magic_formula_viz.js`、`js/magic_symmetry_viz.js`、`js/nano_bpe_encode_viz.js`、`js/nano_compute_graph_viz.js`、`js/nano_bpe_train_viz.js`、`js/nano_ngram_next_viz.js`。
- 已確認 `c++`(Apple clang 17,支援 `-std=c++17`)可用。

## 2. 做法(核准:重寫成完整可編譯程式 + 加守衛)

### 2.1 新增 8 個可編譯 C++ 參考程式(`cpp/`)
| cpp 檔 | const | viz 主題(演算法依據 JS) |
|---|---|---|
| `cpp/magic_latin.cpp` | `codeMagicLatin` | Siamese 幻方的 Latin 分解:v = n·a + b + 1(`magic_latin_viz.js`) |
| `cpp/magic_torus.cpp` | `codeMagicTorus` | Siamese 幻方視為環面上的走訪(mod n 環繞)(`magic_torus_viz.js`) |
| `cpp/magic_formula.cpp` | `codeMagicFormula` | O(1) 閉式 getValue(不存 n×n 陣列)(`magic_formula_viz.js`) |
| `cpp/magic_symmetry.cpp` | `codeMagicSymmetry` | 正方形 8 個對稱(二面體群 D₄)(`magic_symmetry_viz.js`) |
| `cpp/nano_bpe_encode.cpp` | `codeNanoBpeEncode` | BPE 編碼(套用已學 merges)(`nano_bpe_encode_viz.js`) |
| `cpp/nano_compute_graph.cpp` | `codeNanoComputeGraph` | 計算圖 / 反向傳播(autodiff)(`nano_compute_graph_viz.js`) |
| `cpp/nano_bpe_train.cpp` | `codeNanoBpeTrain` | BPE 訓練(統計相鄰對、貪婪合併)(`nano_bpe_train_viz.js`) |
| `cpp/nano_ngram_next.cpp` | `codeNanoNgramNext` | n-gram 下一字預測(`nano_ngram_next_viz.js`) |

- 每個 `.cpp` 為**完整、獨立、可編譯**的參考程式:含必要 `#include` 與 `main()`,忠實呈現該 viz 的核心演算法(以對應 `*_viz.js` 模組 + 目前 `code_db.js` 內的節錄為依據),風格與既有 `cpp/*.cpp` 一致。
- **編譯門檻**:`c++ -std=c++17 -fsyntax-only cpp/<file>.cpp` 必須無誤;盡量做到能 compile + run 並印出合理輸出(不強制,但語法檢查為硬性)。
- 內容為**原始未跳脫**的 C++ 原始碼(build_db 會自行重新跳脫)。

### 2.2 `build_db.js`:補 mapping + 加守衛
- 於 `mappings` 加入 8 個項目(`'magic_latin.cpp':'codeMagicLatin'` 等)。
- **守衛**:改寫產生迴圈——若 mapping 指定的 `cpp/<file>` **不存在**,`throw new Error('build_db: missing cpp file for mapping <file> -> <constName>')`(不再靜默 `if (fs.existsSync)` 跳過)。這確保未來任何缺檔會立即失敗,而非靜默漏掉 const。

### 2.3 重新產生 + 驗證
- 執行 `node build_db.js` → 重生 `js/code_db.js`,全部 const(含這 8 個)皆由 `cpp/` 產生。
- **驗證**:
  - 8 個 `.cpp` 皆 `-fsyntax-only` 通過。
  - `node build_db.js` 乾淨執行(守衛不觸發)。
  - **無 const 掉失**:重生後的 `code_db.js` 所含的 const 名稱集合 ⊇ 修改前的集合(每個先前存在的 const 仍存在)。以程式比對修改前/後的 const 名稱集合。
  - app 全部方法可載入、無 `ReferenceError`(既有 Playwright 全套涵蓋各 viz 載入,可作為總體驗證)。
- **預期差異**:這 8 個 const 的**字串內容會改變**(換成新的可編譯程式,取代舊節錄)——如核准,屬預期;其餘 const 內容不變。

## 3. 檔案清單
- 新增:`cpp/magic_latin.cpp`、`cpp/magic_torus.cpp`、`cpp/magic_formula.cpp`、`cpp/magic_symmetry.cpp`、`cpp/nano_bpe_encode.cpp`、`cpp/nano_compute_graph.cpp`、`cpp/nano_bpe_train.cpp`、`cpp/nano_ngram_next.cpp`
- 修改:`build_db.js`(8 mapping + 守衛)、`js/code_db.js`(由 build_db 重生)
- 不動:`js/cloud-config.js`、其餘 viz 程式與測試(除非 const 集合比對顯示問題)

## 4. 測試 / 驗證
- 無新單元測試(這是建構管線 + 參考碼的維護工作)。
- 硬性驗證:(a) 8 個 `.cpp` 語法檢查通過;(b) `node build_db.js` 成功且守衛在缺檔時會 throw(以暫時移除某 mapping 對應檔的方式驗證守衛會 throw,再還原——或直接以缺檔情境的單元檢查);(c) 重生後 const 名稱集合無缺漏;(d) 全套 `npm run test:all` 綠(Playwright 涵蓋各 viz 載入,可捕捉任何 ReferenceError / 顯示碼破損)。
- 計數不變(未增減方法/群組)。

## 5. 驗收標準
- `cpp/` 有 8 個新可編譯參考程式,`build_db.js` 有對應 mapping。
- `build_db.js` 加了缺檔守衛(缺檔即 throw)。
- `node build_db.js` 可重複執行且產生的 `code_db.js` 不再掉失任何 const;8 個目標 const 現由 `cpp/` 產生。
- 全套測試綠;app 各方法正常載入;`js/cloud-config.js` 未動。

## 6. 風險與緩解
- **改到顯示碼**:8 個 viz 的程式碼面板內容更換為新程式——已核准。無測試斷言程式碼字串,故測試中性。
- **忠實度**:每個 `.cpp` 以對應 `*_viz.js` + 現有節錄為依據,審查時對照 viz 邏輯(同先前 nano/magic 任務的審查標準)。
- **重生造成 const 重排**:build_db 依 mapping 順序輸出;重生後 8 個 const 會移到 mapping 中的位置(通常檔尾),`code_db.js` 的 git diff 會顯示這 8 個 const 的移動 + 內容更換——以「const 名稱集合無缺漏 + 其餘 const 值不變」驗證語意正確,重排無害(頂層 const 宣告順序不影響行為)。
- **守衛誤傷**:守衛只在「mapping 有指定但 `.cpp` 不存在」時 throw;補齊 8 檔後所有 mapping 皆有檔,不會誤觸。
- **編譯環境**:已確認 `c++ -std=c++17` 可用。
