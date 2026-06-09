# ds2026 講義整理與 dsvisual 對接 — 設計文件

- 日期:2026-06-09
- 範圍:`/Users/skhuang/course/ds2026`(獨立資料夾,非 git repo)
- 對接對象:dsvisual 互動視覺化網站(repo `https://github.com/skhuang/dsvisual`,站台 `https://skhuang.github.io/dsvisual`)

## 1. 背景與問題

`ds2026` 是一套手寫的 **Marp 章節講義**(對應教科書 Horowitz & Sahni,*Fundamentals of Data Structures*),涵蓋第 1–10 章。目前狀態的問題:

1. **重複檔**:4 對 MD5 完全相同的檔案。
2. **命名不一致**:`chap` 與 `chapter` 混用;版本後綴(`_modern_cpp` / `_modern` / `_cpp_design` / `_oop` / `_ai` / `_ai_agents` / `_marp` / `_slides`)無統一規則;另有無章節前綴的孤兒檔(`internal_sorting.md`、`graphs_*.md`)。
3. **無目錄索引**:沒有 README 串起各章,也沒有與 dsvisual 互動示範的對應關係。

### 關鍵認知:版本變體 = 刻意分開的「平行視角講義」

各章的「版本」**不是同一份講義的片段**,而是各自完整、各有獨立大綱與視覺風格的平行講義,沿三條主軸(track)展開:

| Track | 內容 | 現有後綴 |
|---|---|---|
| **core** | 教科書(Horowitz & Sahni、SPARKS 虛擬碼) | 基礎版(`_slides` / `_marp` / 無後綴) |
| **modern_cpp** | STL · OOP · Design Patterns | `_modern_cpp` / `_cpp_design` / `_modern` / `_stl_patterns_oop` / `_oop` |
| **ai_agents** | AI coding agents 視角 | `_ai_agents` / `_ai` / `_with_ai_agents` |

另有兩個僅 ch06 的特殊 track:**advanced_cpp**(平行化、Sanitizers、Fuzzing)、**exercises**(LLM 系統圖論習題集);以及 ch03 的 **en**(英文翻譯版)。

因此「合併某章多個版本」**不能**照字面把 4 個視角串成單一巨檔(ch06 會變成約 8800 行、風格衝突、教學不可用)。本設計把「合併」重新定義為**無損整併 + 保留平行 track**。

## 2. 目標

1. 刪除完全重複檔。
2. 對真正的子集/超集關係做**無損合併**(僅 ch06 與 ch07 各一處)。
3. 其餘變體保留為「同章不同 track」,**統一命名**為 `chapNN_<主題>_<track>.md`(扁平,留在 `ds2026` 根目錄,最少改動)。
4. 產生 `README.md` 目錄索引:依「章 × track」列表,每章交叉連結到 dsvisual 對應的互動示範。

### 非目標(YAGNI)

- 不把講義搬進 dsvisual repo,也不接入 dsvisual 的 `slides_db.js` build 流程(兩者 granularity 不同:dsvisual 是 per-algorithm 產生式,ds2026 是 per-chapter 手寫)。
- 不重寫任何講義內容、不統一各章的視覺主題(各 track 維持原風格)。
- 不把 ds2026 轉成 git repo。

## 3. Track 命名規範

- 檔名格式:`chapNN_<主題slug>_<track>.md`
  - `NN` 為兩位數章號;ch01.5 用 `chap01_5`。
  - `<主題slug>`:見下表(snake_case)。
  - `<track>` ∈ {`core`, `modern_cpp`, `ai_agents`, `advanced_cpp`, `exercises`};語言變體再加 `_en`(如 `core_en`)。
- 主題 slug:`introduction`、`foundations`(ch01.5)、`arrays`、`stacks_queues`、`linked_lists`、`trees`、`graphs`、`internal_sorting`、`external_sorting`、`symbol_tables`、`files`。

## 4. 檔案對照表(完整,共識基準)

| 章 | 現有檔 | → 目標檔 | 動作 |
|---|---|---|---|
| 01 | `chap01_introduction.md` | `chap01_introduction_core.md` | rename |
| 01.5 | `chap01_5_stl_oop_patterns.md` | `chap01_5_foundations_modern_cpp.md` | rename |
| 01.5 | `chapter01_5_stl_oop_patterns.md` | — | **刪(重複,= 上者)** |
| 02 | `chap02_arrays.md` | `chap02_arrays_core.md` | rename |
| 02 | `chap02_arrays_modern_cpp.md` | `chap02_arrays_modern_cpp.md` | 不變 |
| 03 | `chap03_stacks_queues.md` | `chap03_stacks_queues_core.md` | rename |
| 03 | `chap03_stacks_queues_en.md` | `chap03_stacks_queues_core_en.md` | rename(語言版) |
| 03 | `chap03_stacks_queues_modern.md` | `chap03_stacks_queues_modern_cpp.md` | rename |
| 04 | `chap04_linked_lists_marp.md` | `chap04_linked_lists_core.md` | rename |
| 04 | `chap04_linked_lists_modern_cpp_marp.md` | `chap04_linked_lists_modern_cpp.md` | rename |
| 05 | `chap05_trees_slides.md` | `chap05_trees_core.md` | rename |
| 05 | `chap05_trees_modern_cpp.md` | `chap05_trees_modern_cpp.md` | 不變 |
| 06 | `chap06_graphs_chapter6_ext1.md` **+** base 的 §6.4 Activity Network 節 | `chap06_graphs_core.md` | **合併** |
| 06 | `chap06_graphs_chapter6.md` | — | **刪(§6.4 併入 core 後)** |
| 06 | `graphs_chapter6.md` | — | **刪(重複,= ext1)** |
| 06 | `chap06_graphs_cpp_design.md` | `chap06_graphs_modern_cpp.md` | rename |
| 06 | `chap06_graphs_cpp_advanced.md` | `chap06_graphs_advanced_cpp.md` | rename |
| 06 | `graphs_cpp_advanced.md` | — | **刪(重複,= cpp_advanced)** |
| 06 | `graphs_llm_exercises.md` | `chap06_graphs_exercises.md` | rename |
| 07 | `chap07_internal_sorting_r3.md` | `chap07_internal_sorting_core.md` | rename |
| 07 | `internal_sorting_r2.md` | — | **刪(重複,= r3)** |
| 07 | `internal_sorting.md` | — | **刪(r3 子集,標題全被涵蓋)** |
| 07 | `chap07_sorting_stl_patterns_oop.md` | `chap07_internal_sorting_modern_cpp.md` | rename |
| 07 | `chap07_sorting_with_ai_agents.md` | `chap07_internal_sorting_ai_agents.md` | rename |
| 08 | `chap08_external_sorting.md` | `chap08_external_sorting_core.md` | rename |
| 08 | `chap08_external_sorting_cpp_design.md` | `chap08_external_sorting_modern_cpp.md` | rename |
| 08 | `chap08_external_sorting_ai_agents.md` | `chap08_external_sorting_ai_agents.md` | 不變 |
| 09 | `chap09_symbol_tables.md` | `chap09_symbol_tables_core.md` | rename |
| 09 | `chap09_symbol_tables_oop.md` | `chap09_symbol_tables_modern_cpp.md` | rename |
| 09 | `chap09_symbol_tables_ai.md` | `chap09_symbol_tables_ai_agents.md` | rename |
| 10 | `chap10_files.md` | `chap10_files_core.md` | rename |

**結果**:25 份講義 → 19 份(刪 6 個檔:4 個 MD5 重複 + ch07 子集 1 + ch06 base 併入 1)。其中 ch06 為唯一的「真合併」。

## 5. ch06 真合併細節

- `chap06_graphs_chapter6_ext1.md`(3144 行,= 教科書 base + 內嵌 C++)幾乎涵蓋 `chap06_graphs_chapter6.md`(1409 行 base),但 base 獨有 **§6.4 Activity Network / Critical Path** 一節,ext1 沒有。base 獨有標題:
  - `Supplementary Topics`、`Critical Path Concepts`、`Forward Pass — Trace (Textbook Fig. 6.32)`、`Computing $ee$: Forward Pass`、`Computing $le$: Backward Pass`、`Slack Table & Critical Activities`、`Software Testing Perspective (Bonus)`
- **合併方式**:以 ext1 為基底,從 base 擷取上述連續投影片(含其前後的 `---` Marp 分隔),接到 ext1 §6.3 之後、結尾之前的適當位置,產生 `chap06_graphs_core.md`。frontmatter 沿用 ext1。
- 合併後刪除 base 與 `graphs_chapter6.md`(= ext1 重複)。
- 驗證:合併後檔案的去重標題集合 ⊇ base ∪ ext1 的標題集合(不得遺漏 base 的 §6.4 投影片)。

## 6. ch07 孤兒處理

- `internal_sorting.md`(1196 行)的 `#`/`##` 標題經 `comm` 比對**全部被** `chap07_internal_sorting_r3.md`(2041 行)涵蓋(r3 另含 C++ 實作等);`internal_sorting_r2.md` 與 r3 之 MD5 完全相同。→ 兩者皆刪,r3 改名為 `_core`。

## 7. README 目錄索引設計

`ds2026/README.md` 內容:

1. **標題與簡介**:課程名稱、教科書出處、與 dsvisual 互動網站的關係說明。
2. **如何使用**:Marp 預覽 / 轉 PDF 指令(沿用 dsvisual `slides/README.md` 既有的 `npx marp ...` 範式)。
3. **章節 × Track 總表**:每列一章,欄為 core / modern_cpp / ai_agents / 其他,儲存格連到對應 `.md`。
4. **各章交叉連結**:每章列出對應的 dsvisual 互動示範。

### 交叉連結目標(無 per-slide deep-link)

dsvisual 的 slides 以 `methodId` 在 app 內 modal 顯示(`window.SLIDES_RENDERED[methodId]`),**無 per-slide 的 URL**。因此交叉連結採:

- **逐主題連結** → GitHub repo 上的渲染後 slide markdown(真實可瀏覽):
  `https://github.com/skhuang/dsvisual/blob/main/slides/zh/<id>.md`
- **互動入口** → 站台根 `https://skhuang.github.io/dsvisual`(於各章標註相關 method 名稱)。

### 章 → dsvisual slide id 對應

- **Ch01.5 Foundations**:`oop-encapsulation`, `oop-inheritance`, `oop-polymorphism`, `oop-abstraction`, `oop-templates`, `oop-adhoc`, `pattern-strategy`, `pattern-factory`, `pattern-observer`, `pattern-adapter`, `pattern-decorator`, `pattern-singleton`, `pattern-mvc`, `pattern-di`, `pattern-layered`, `pattern-pipefilter`, `pattern-pubsub`
- **Ch02 Arrays**:`list-array`
- **Ch03 Stacks & Queues**:`stack-array`, `stack-list`, `queue`, `deque`
- **Ch04 Linked Lists**:`list-linked`, `list-array`, `skip-list`
- **Ch05 Trees**:`tree-bst`, `tree-avl`, `tree-rb`, `tree-splay`, `tree-trie`, `tree-radix`, `tree-ternary`, `tree-btree`, `tree-bplus`, `tree-dsu`, `tree-segment`, `tree-fenwick`
- **Ch06 Graphs**:`graph`, `graph-adjlist`, `graph-traversal`, `graph-bfs`, `graph-dfs`, `graph-dijkstra`, `graph-bellman-ford`, `graph-floyd-warshall`, `graph-kruskal`, `graph-prim`, `graph-topo`
- **Ch07 Internal Sorting**:`search-linear`, `search-binary`, `sort-bubble`, `sort-select`, `sort-insert`, `sort-quick`, `sort-merge`, `sort-heap`, `sort-shell`, `sort-shaker`, `sort-bucket`, `sort-count`, `sort-radix`
- **Ch08 External Sorting**:`sort-merge`, `heap-binary`(loser/winner tree 概念)
- **Ch09 Symbol Tables**:`hash-chain`, `hash-open`, `hash-bucket`, `tree-bst`, `skip-list`, `bloom-filter`, `count-min-sketch`, `search-kmp`, `search-bm`, `search-rk`, `search-aho`, `search-zalgo`, `search-strcompare`
- **Ch10 Files**:`tree-btree`, `tree-bplus`

> 注:上述 id 全部存在於 `dsvisual/slides/zh/`(已比對)。實作時逐一確認連結有效。

## 8. 實作順序(概要)

1. 刪 4 個 MD5 重複檔。
2. ch06 真合併產生 `chap06_graphs_core.md`,刪 base 與其重複檔。
3. ch07 刪 `internal_sorting.md`、`internal_sorting_r2.md`。
4. 其餘檔案依對照表 rename。
5. 撰寫 `ds2026/README.md` 目錄索引 + 交叉連結。
6. 驗證(見下)。

## 9. 驗證標準

- 整理後 `ds2026` 僅含 19 份講義 `.md`,檔名全部符合 `chapNN_<主題>_<track>(_en)?.md`。
- 無 MD5 重複的 `.md`。
- ch06 `core` 的去重標題集合涵蓋原 base ∪ ext1(特別是 §6.4 Activity Network 全部投影片)。
- 每份講義仍為合法 Marp(frontmatter 完整、未被 rename/合併破壞)。
- `README.md` 內所有內部 `.md` 連結指向實際存在的檔案;所有 dsvisual slide id 連結對應 `dsvisual/slides/zh/<id>.md` 實際存在。

## 10. 風險與緩解

- **唯一內容風險在 ch06 合併**:採「以 ext1 為基底、只附加 base 獨有節」的策略,並以標題集合涵蓋性驗證,避免遺漏。
- **rename 造成既有外部引用失效**:ds2026 非 repo、無建置流程,外部引用風險低;若有外部教材連到舊檔名,需另行更新(目前未知有此類引用)。
