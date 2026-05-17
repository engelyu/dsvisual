# Data Structure & Algorithm Slides Generation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate deep multi-page Marp slide decks (zh + en) for every data structure / algorithm topic from a single structured source, and feed the same content into the in-app slide-viewer.

**Architecture:** A hand-written structured source `slides_db.js` holds per-topic decks with i18n text and raw LaTeX/mermaid. A Node build script `build_slides.js` pre-renders math (KaTeX) and mermaid (mermaid-cli) at build time and emits two products: Marp `.md` files (`slides/{zh,en}/*.md`) and an App data file `slides_rendered.js`. The browser app loads only the pre-rendered file, so it has zero client-side rendering dependencies.

**Tech Stack:** Node.js (CommonJS), `node:test`, `@marp-team/marp-cli`, `@mermaid-js/mermaid-cli`, `katex` (build-time only), Playwright, vanilla browser JS.

**Spec:** `docs/superpowers/specs/2026-05-16-slides-generation-design.md`

---

## File Structure

**Create:**
- `slides_db.js` — hand-written structured content source. `module.exports` only (Node-required by the build script).
- `build_slides.js` — generator module: pure render functions + `main()`. CommonJS.
- `slides_rendered.js` — generated App data file (`window.SLIDES_RENDERED = {...}`). Committed.
- `slides/zh/<id>.md`, `slides/en/<id>.md` — generated Marp decks. Committed.
- `slides/assets/` — external image folder (`.gitkeep` for now).
- `slides/assets/mermaid/` — generated mermaid SVGs cache (committed).
- `slides/README.md` — how to convert decks with Marp.
- `vendor/katex/katex.min.css` + `vendor/katex/fonts/` — vendored KaTeX stylesheet for displaying pre-rendered math.
- `tests/unit/build_slides.test.js` — unit tests for the generator.
- `tests/slides_viewer.spec.js` — Playwright tests for the in-app viewer.

**Modify:**
- `index.html` — load `slides_rendered.js` and `vendor/katex/katex.min.css`; add language-toggle markup in the slide-viewer header.
- `app.js` — `buildSlides()` reads `SLIDES_RENDERED`; add `currentLang` state + language toggle; `openSlides()` remembers current method id.
- `style.css` — multi-page slide content, language button, `figure`/`figcaption`, mermaid SVG container styles.
- `package.json` — devDependencies + `build:slides` / `slides:pdf` scripts.

---

## Data Shapes (used throughout the plan)

**i18n value:** `{ zh: "中文字串", en: "English string" }`. Any text string may embed inline `$...$` LaTeX.

**`slides_db.js`:**
```js
const SLIDES_DB = {
  '<topic-id>': {
    category: 'Basic Linear Structures',      // human-readable category label
    title: { zh: '...', en: '...' },          // topic title
    slides: [ <slide>, ... ],                 // 8-10 slides
  },
  // ...
};
module.exports = SLIDES_DB;
```

**slide:** `{ heading: <i18n>, blocks: [ <block>, ... ] }`

**block** (discriminated by `type`):
| type | shape |
|------|-------|
| `paragraph` | `{ type:'paragraph', text:<i18n> }` |
| `bullets` | `{ type:'bullets', items:[<i18n>, ...] }` |
| `steps` | `{ type:'steps', items:[<i18n>, ...] }` |
| `table` | `{ type:'table', headers:[<i18n>,...], rows:[[<i18n>,...],...] }` |
| `code` | `{ type:'code', lang:'cpp', code:'<plain string>' }` |
| `note` | `{ type:'note', text:<i18n> }` |
| `math` | `{ type:'math', tex:'<plain LaTeX>', caption?:<i18n> }` |
| `image` | `{ type:'image', src:'<path>', alt:<i18n>, caption?:<i18n> }` |
| `svg` | `{ type:'svg', svg:'<inline svg string>' }` |
| `mermaid` | `{ type:'mermaid', code:'<mermaid source>' }` |

**`slides_rendered.js`:**
```js
window.SLIDES_RENDERED = {
  '<topic-id>': {
    slides: {
      zh: [ { title: '<heading text>', body: '<html string>' }, ... ],
      en: [ { title: '<heading text>', body: '<html string>' }, ... ],
    },
  },
  // ...
};
```
Per-slide `{ title, body }` matches the existing `renderSlide()` in `app.js` (which reads `slide.title` and `slide.body`).

**`build_slides.js` exported API** (signatures fixed here, used by every task):
- `pick(i18nValue, lang)` → string
- `escapeHtml(str)` → string
- `inlineHtml(str)` → string — escape + inline-math render (for HTML output)
- `blockToMarkdown(block, lang, ctx)` → string — `ctx = { mermaidSvg: Map }`
- `blockToHtml(block, lang, ctx)` → string — `ctx = { mermaidSvg: Map }`
- `deckToMarkdown(id, deck, lang, ctx)` → string (full `.md` content)
- `deckToHtmlSlides(id, deck, lang, ctx)` → `[ { title, body }, ... ]`
- `collectMermaid(slidesDb)` → `string[]` (unique mermaid sources)
- `main()` → async; pre-renders mermaid, writes all output files

---

## Task 1: Tooling, dependencies, vendored KaTeX CSS

**Files:**
- Modify: `package.json`
- Create: `vendor/katex/katex.min.css`, `vendor/katex/fonts/` (+ contents), `slides/assets/.gitkeep`, `slides/assets/mermaid/.gitkeep`, `slides/README.md`

- [ ] **Step 1: Install build-time dependencies**

Run:
```bash
npm install --save-dev @marp-team/marp-cli @mermaid-js/mermaid-cli katex
```
Expected: the three packages appear under `devDependencies` in `package.json`.

- [ ] **Step 2: Add npm scripts**

In `package.json`, add to the `"scripts"` object:
```json
"build:slides": "node build_slides.js",
"slides:pdf": "marp --pdf --allow-local-files --input-dir slides/zh -o slides/pdf/zh && marp --pdf --allow-local-files --input-dir slides/en -o slides/pdf/en"
```

- [ ] **Step 3: Vendor the KaTeX stylesheet**

Copy the KaTeX distributed CSS and fonts from the installed package into the repo:
```bash
mkdir -p vendor/katex/fonts
cp node_modules/katex/dist/katex.min.css vendor/katex/katex.min.css
cp node_modules/katex/dist/fonts/* vendor/katex/fonts/
```
Expected: `vendor/katex/katex.min.css` exists and references `fonts/...` (relative paths resolve because the CSS sits next to `fonts/`).

- [ ] **Step 4: Create placeholder folders and the slides README**

```bash
mkdir -p slides/assets/mermaid
touch slides/assets/.gitkeep slides/assets/mermaid/.gitkeep
```

Create `slides/README.md`:
```markdown
# Generated Slide Decks

Decks are generated — do not edit `.md` files here by hand. Edit `slides_db.js` then run:

    npm run build:slides

This writes `slides/zh/<id>.md`, `slides/en/<id>.md`, and `slides_rendered.js`.

## Convert to PDF / HTML / PPTX

    npx marp --pdf  --allow-local-files slides/zh/stack-array.md
    npx marp --html --allow-local-files slides/zh/stack-array.md
    npx marp --pptx --allow-local-files slides/zh/stack-array.md

Or convert a whole language folder with `npm run slides:pdf`.
```

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json vendor/katex slides/assets slides/README.md
git commit -m "chore: add slide build tooling, deps, and vendored KaTeX CSS"
```

---

## Task 2: Structured source `slides_db.js` with the reference deck

This task creates `slides_db.js` containing one fully-authored deck — `stack-array` — that exercises every block type. It is the template for all later content.

**Files:**
- Create: `slides_db.js`

- [ ] **Step 1: Write `slides_db.js` with the `stack-array` deck**

Create `slides_db.js`:
```js
// Structured slide content source. Hand-written.
// Consumed only by build_slides.js (Node). Do NOT load this in the browser.
// Text leaves are { zh, en } and may embed inline $...$ LaTeX.

const SLIDES_DB = {
  'stack-array': {
    category: 'Basic Linear Structures',
    title: { zh: '堆疊(陣列實作)', en: 'Stack (Array Implementation)' },
    slides: [
      {
        heading: { zh: '堆疊(陣列實作)', en: 'Stack (Array Implementation)' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '堆疊是一種 LIFO(後進先出)的線性結構,如同一疊盤子:最後放上的最先被取下。',
            en: 'A stack is a LIFO (Last In, First Out) linear structure, like a pile of plates: the last one placed is the first removed.' } },
        ],
      },
      {
        heading: { zh: '核心概念', en: 'Core Concept' },
        blocks: [
          { type: 'paragraph', text: {
            zh: '陣列實作用一塊固定大小的連續記憶體,搭配一個整數索引 `top` 指向頂端元素。',
            en: 'The array implementation uses a fixed-size contiguous block of memory plus an integer index `top` pointing at the top element.' } },
          { type: 'bullets', items: [
            { zh: '`top` 初始為 -1,代表空堆疊。', en: '`top` starts at -1, meaning the stack is empty.' },
            { zh: '`push` 先遞增 `top` 再寫入;`pop` 先讀取再遞減 `top`。', en: '`push` increments `top` then writes; `pop` reads then decrements `top`.' },
            { zh: '容量固定,推入超過上限會發生 Stack Overflow。', en: 'Capacity is fixed; pushing beyond the limit causes a Stack Overflow.' },
          ] },
        ],
      },
      {
        heading: { zh: '運作流程', en: 'Operation Flow' },
        blocks: [
          { type: 'steps', items: [
            { zh: '檢查 `top` 是否已達容量上限,若是則拒絕推入。', en: 'Check whether `top` has reached capacity; if so, reject the push.' },
            { zh: '遞增 `top`,將新值寫入 `arr[top]`。', en: 'Increment `top` and write the new value into `arr[top]`.' },
            { zh: '彈出時讀取 `arr[top]`,再將 `top` 遞減。', en: 'To pop, read `arr[top]`, then decrement `top`.' },
          ] },
          { type: 'mermaid', code: 'flowchart LR\n  E["Empty top=-1"] -->|push a| A["top=0"]\n  A -->|push b| B["top=1"]\n  B -->|pop| A' },
        ],
      },
      {
        heading: { zh: '記憶體結構', en: 'Memory Layout' },
        blocks: [
          { type: 'svg', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 70" width="320" height="70"><g font-family="sans-serif" font-size="13"><rect x="10" y="20" width="50" height="30" fill="#dbeafe" stroke="#2563eb"/><rect x="60" y="20" width="50" height="30" fill="#dbeafe" stroke="#2563eb"/><rect x="110" y="20" width="50" height="30" fill="#fff" stroke="#94a3b8"/><rect x="160" y="20" width="50" height="30" fill="#fff" stroke="#94a3b8"/><text x="35" y="40" text-anchor="middle">a</text><text x="85" y="40" text-anchor="middle">b</text><text x="85" y="15" text-anchor="middle" fill="#2563eb">top</text></g></svg>' },
          { type: 'note', text: {
            zh: '藍色為已使用的格子,白色為閒置空間;`top` 永遠指向最後一個有效元素。',
            en: 'Blue cells are occupied, white cells are free; `top` always points at the last valid element.' } },
        ],
      },
      {
        heading: { zh: '複雜度分析', en: 'Complexity Analysis' },
        blocks: [
          { type: 'table',
            headers: [ { zh: '操作', en: 'Operation' }, { zh: '時間', en: 'Time' }, { zh: '空間', en: 'Space' } ],
            rows: [
              [ { zh: 'push', en: 'push' }, { zh: '$O(1)$', en: '$O(1)$' }, { zh: '$O(N)$', en: '$O(N)$' } ],
              [ { zh: 'pop', en: 'pop' }, { zh: '$O(1)$', en: '$O(1)$' }, { zh: '$O(1)$', en: '$O(1)$' } ],
            ] },
          { type: 'math', tex: 'T_{\\text{push}}(n) = O(1)', caption: {
            zh: '每次推入只做常數次運算,與堆疊大小無關。',
            en: 'Each push performs a constant number of operations, independent of stack size.' } },
        ],
      },
      {
        heading: { zh: '程式碼', en: 'Source Code' },
        blocks: [
          { type: 'code', lang: 'cpp', code: 'bool push(int val) {\n    if (topIndex >= MAX_SIZE - 1) {\n        cout << "Stack Overflow!" << endl;\n        return false;\n    }\n    arr[++topIndex] = val;\n    return true;\n}\n\nint pop() {\n    if (topIndex < 0) return -1;\n    return arr[topIndex--];\n}' },
        ],
      },
      {
        heading: { zh: '優缺點與使用時機', en: 'Pros, Cons & When to Use' },
        blocks: [
          { type: 'bullets', items: [
            { zh: '優點:記憶體連續、無指標額外開銷,快取友善。', en: 'Pro: contiguous memory, no pointer overhead, cache-friendly.' },
            { zh: '缺點:容量固定,需事先決定大小。', en: 'Con: fixed capacity, size must be decided in advance.' },
            { zh: '適用:容量上限已知的場景,如函式呼叫堆疊、括號配對。', en: 'Use when the maximum size is known, e.g. call stacks, bracket matching.' },
          ] },
        ],
      },
      {
        heading: { zh: '小結', en: 'Summary' },
        blocks: [
          { type: 'bullets', items: [
            { zh: 'LIFO:以單一 `top` 索引管理頂端。', en: 'LIFO: a single `top` index manages the top.' },
            { zh: 'push / pop 皆為 $O(1)$。', en: 'Both push and pop are $O(1)$.' },
            { zh: '固定容量是與鏈結串列實作的主要差異。', en: 'Fixed capacity is the key difference from the linked-list implementation.' },
          ] },
        ],
      },
    ],
  },
};

module.exports = SLIDES_DB;
```

- [ ] **Step 2: Verify the file loads in Node**

Run: `node -e "const d=require('./slides_db.js'); console.log(Object.keys(d), d['stack-array'].slides.length)"`
Expected: `[ 'stack-array' ] 8`

- [ ] **Step 3: Commit**

```bash
git add slides_db.js
git commit -m "feat: add slides_db.js schema with stack-array reference deck"
```

---

## Task 3: `build_slides.js` — text block renderers

**Files:**
- Create: `build_slides.js`, `tests/unit/build_slides.test.js`

- [ ] **Step 1: Write the failing test**

Create `tests/unit/build_slides.test.js`:
```js
const test = require('node:test');
const assert = require('node:assert/strict');
const b = require('../../build_slides');

test('pick selects language', () => {
  assert.equal(b.pick({ zh: '中', en: 'EN' }, 'zh'), '中');
  assert.equal(b.pick({ zh: '中', en: 'EN' }, 'en'), 'EN');
});

test('escapeHtml escapes markup', () => {
  assert.equal(b.escapeHtml('<a> & "x"'), '&lt;a&gt; &amp; &quot;x&quot;');
});

test('paragraph → markdown and html', () => {
  const block = { type: 'paragraph', text: { zh: '你好', en: 'Hi' } };
  assert.equal(b.blockToMarkdown(block, 'zh', {}), '你好');
  assert.equal(b.blockToHtml(block, 'en', {}), '<p>Hi</p>');
});

test('bullets → markdown and html', () => {
  const block = { type: 'bullets', items: [{ zh: '一', en: 'one' }, { zh: '二', en: 'two' }] };
  assert.equal(b.blockToMarkdown(block, 'zh', {}), '- 一\n- 二');
  assert.equal(b.blockToHtml(block, 'en', {}), '<ul><li>one</li><li>two</li></ul>');
});

test('steps → ordered markdown and html', () => {
  const block = { type: 'steps', items: [{ zh: '甲', en: 'a' }, { zh: '乙', en: 'b' }] };
  assert.equal(b.blockToMarkdown(block, 'en', {}), '1. a\n2. b');
  assert.equal(b.blockToHtml(block, 'en', {}), '<ol><li>a</li><li>b</li></ol>');
});

test('table → markdown and html', () => {
  const block = { type: 'table',
    headers: [{ zh: '欄', en: 'Col' }],
    rows: [[{ zh: '值', en: 'Val' }]] };
  assert.equal(b.blockToMarkdown(block, 'en', {}), '| Col |\n| --- |\n| Val |');
  assert.equal(b.blockToHtml(block, 'en', {}),
    '<table><thead><tr><th>Col</th></tr></thead><tbody><tr><td>Val</td></tr></tbody></table>');
});

test('code → fenced markdown and escaped html', () => {
  const block = { type: 'code', lang: 'cpp', code: 'if (a < b) x();' };
  assert.equal(b.blockToMarkdown(block, 'zh', {}), '```cpp\nif (a < b) x();\n```');
  assert.equal(b.blockToHtml(block, 'zh', {}), '<pre><code class="language-cpp">if (a &lt; b) x();</code></pre>');
});

test('note → blockquote markdown and div html', () => {
  const block = { type: 'note', text: { zh: '提示', en: 'Tip' } };
  assert.equal(b.blockToMarkdown(block, 'en', {}), '> Tip');
  assert.equal(b.blockToHtml(block, 'en', {}), '<div class="note">Tip</div>');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/unit/build_slides.test.js`
Expected: FAIL — `Cannot find module '../../build_slides'`.

- [ ] **Step 3: Write `build_slides.js`**

Create `build_slides.js`:
```js
'use strict';

function pick(i18nValue, lang) {
  if (i18nValue == null) return '';
  if (typeof i18nValue === 'string') return i18nValue;
  return i18nValue[lang] != null ? i18nValue[lang] : (i18nValue.en || '');
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Escape text for HTML output. Inline-math handling is added in Task 4.
function inlineHtml(str) {
  return escapeHtml(str);
}

function blockToMarkdown(block, lang, ctx) {
  switch (block.type) {
    case 'paragraph':
      return pick(block.text, lang);
    case 'bullets':
      return block.items.map((it) => '- ' + pick(it, lang)).join('\n');
    case 'steps':
      return block.items.map((it, i) => (i + 1) + '. ' + pick(it, lang)).join('\n');
    case 'table': {
      const head = '| ' + block.headers.map((h) => pick(h, lang)).join(' | ') + ' |';
      const sep = '| ' + block.headers.map(() => '---').join(' | ') + ' |';
      const rows = block.rows.map(
        (r) => '| ' + r.map((c) => pick(c, lang)).join(' | ') + ' |');
      return [head, sep, ...rows].join('\n');
    }
    case 'code':
      return '```' + (block.lang || '') + '\n' + block.code + '\n```';
    case 'note':
      return '> ' + pick(block.text, lang);
    default:
      throw new Error('Unknown block type: ' + block.type);
  }
}

function blockToHtml(block, lang, ctx) {
  switch (block.type) {
    case 'paragraph':
      return '<p>' + inlineHtml(pick(block.text, lang)) + '</p>';
    case 'bullets':
      return '<ul>' + block.items.map((it) => '<li>' + inlineHtml(pick(it, lang)) + '</li>').join('') + '</ul>';
    case 'steps':
      return '<ol>' + block.items.map((it) => '<li>' + inlineHtml(pick(it, lang)) + '</li>').join('') + '</ol>';
    case 'table': {
      const head = '<thead><tr>' + block.headers.map((h) => '<th>' + inlineHtml(pick(h, lang)) + '</th>').join('') + '</tr></thead>';
      const body = '<tbody>' + block.rows.map(
        (r) => '<tr>' + r.map((c) => '<td>' + inlineHtml(pick(c, lang)) + '</td>').join('') + '</tr>').join('') + '</tbody>';
      return '<table>' + head + body + '</table>';
    }
    case 'code':
      return '<pre><code class="language-' + (block.lang || '') + '">' + escapeHtml(block.code) + '</code></pre>';
    case 'note':
      return '<div class="note">' + inlineHtml(pick(block.text, lang)) + '</div>';
    default:
      throw new Error('Unknown block type: ' + block.type);
  }
}

module.exports = { pick, escapeHtml, inlineHtml, blockToMarkdown, blockToHtml };
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/unit/build_slides.test.js`
Expected: PASS — all 8 tests pass.

- [ ] **Step 5: Commit**

```bash
git add build_slides.js tests/unit/build_slides.test.js
git commit -m "feat: add build_slides.js text block renderers"
```

---

## Task 4: Math rendering — `math` block + inline `$...$`

KaTeX renders `math` blocks (display) and inline `$...$` runs to HTML for the App. Marp keeps `$`/`$$` literally (Marp Core renders it).

**Files:**
- Modify: `build_slides.js`, `tests/unit/build_slides.test.js`

- [ ] **Step 1: Add failing tests**

Append to `tests/unit/build_slides.test.js`:
```js
test('math block → markdown is $$ fenced', () => {
  const block = { type: 'math', tex: 'O(1)' };
  assert.equal(b.blockToMarkdown(block, 'zh', {}), '$$O(1)$$');
});

test('math block caption → markdown line after formula', () => {
  const block = { type: 'math', tex: 'O(1)', caption: { zh: '常數', en: 'constant' } };
  assert.equal(b.blockToMarkdown(block, 'en', {}), '$$O(1)$$\n\nconstant');
});

test('math block → html uses katex span', () => {
  const html = b.blockToHtml({ type: 'math', tex: 'O(1)' }, 'zh', {});
  assert.match(html, /class="katex/);
});

test('inline $...$ in paragraph → katex html', () => {
  const html = b.blockToHtml({ type: 'paragraph', text: { zh: '複雜度 $O(n)$', en: 'cost $O(n)$' } }, 'en', {});
  assert.match(html, /cost <span class="katex/);
});

test('plain text without $ is unaffected', () => {
  assert.equal(b.blockToHtml({ type: 'paragraph', text: { zh: 'x', en: 'plain' } }, 'en', {}), '<p>plain</p>');
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test tests/unit/build_slides.test.js`
Expected: FAIL — new math tests fail (`math` is an unknown block type; no katex output).

- [ ] **Step 3: Implement math support in `build_slides.js`**

At the top of `build_slides.js`, after `'use strict';`, add:
```js
const katex = require('katex');
```

Replace the `inlineHtml` function with:
```js
// Escape text for HTML, then render any inline $...$ runs with KaTeX.
function inlineHtml(str) {
  const parts = String(str).split('$');
  // Even indices are plain text, odd indices are math.
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return katex.renderToString(part, { displayMode: false, throwOnError: false });
    }
    return escapeHtml(part);
  }).join('');
}
```

In `blockToMarkdown`, add a `case 'math'` before `default`:
```js
    case 'math': {
      const formula = '$$' + block.tex + '$$';
      return block.caption ? formula + '\n\n' + pick(block.caption, lang) : formula;
    }
```

In `blockToHtml`, add a `case 'math'` before `default`:
```js
    case 'math': {
      const formula = '<div class="slide-math">' +
        katex.renderToString(block.tex, { displayMode: true, throwOnError: false }) + '</div>';
      return block.caption
        ? formula + '<p class="slide-caption">' + inlineHtml(pick(block.caption, lang)) + '</p>'
        : formula;
    }
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --test tests/unit/build_slides.test.js`
Expected: PASS — all tests (including the 5 new math tests) pass.

- [ ] **Step 5: Commit**

```bash
git add build_slides.js tests/unit/build_slides.test.js
git commit -m "feat: render math blocks and inline LaTeX via KaTeX"
```

---

## Task 5: `image` and `svg` block renderers

**Files:**
- Modify: `build_slides.js`, `tests/unit/build_slides.test.js`

- [ ] **Step 1: Add failing tests**

Append to `tests/unit/build_slides.test.js`:
```js
test('image block → markdown', () => {
  const block = { type: 'image', src: 'assets/x.png', alt: { zh: '圖', en: 'pic' } };
  assert.equal(b.blockToMarkdown(block, 'en', {}), '![pic](../assets/x.png)');
});

test('image block with caption → html figure', () => {
  const block = { type: 'image', src: 'assets/x.png', alt: { zh: '圖', en: 'pic' }, caption: { zh: '說', en: 'cap' } };
  assert.equal(b.blockToHtml(block, 'en', {}),
    '<figure><img src="slides/assets/x.png" alt="pic"><figcaption>cap</figcaption></figure>');
});

test('svg block → markdown and html embed raw svg', () => {
  const block = { type: 'svg', svg: '<svg id="t"></svg>' };
  assert.equal(b.blockToMarkdown(block, 'zh', {}), '<svg id="t"></svg>');
  assert.equal(b.blockToHtml(block, 'zh', {}), '<div class="slide-figure"><svg id="t"></svg></div>');
});
```

Note: `image.src` is authored relative to `slides/` (e.g. `assets/x.png`). Marp `.md` files live in `slides/<lang>/`, so markdown output prefixes `../`. The App runs from repo root, so HTML output prefixes `slides/`.

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test tests/unit/build_slides.test.js`
Expected: FAIL — `image` and `svg` are unknown block types.

- [ ] **Step 3: Implement image/svg in `build_slides.js`**

In `blockToMarkdown`, add before `default`:
```js
    case 'image':
      return '![' + pick(block.alt, lang) + '](../' + block.src + ')';
    case 'svg':
      return block.svg;
```

In `blockToHtml`, add before `default`:
```js
    case 'image': {
      const img = '<img src="slides/' + block.src + '" alt="' + escapeHtml(pick(block.alt, lang)) + '">';
      return block.caption
        ? '<figure>' + img + '<figcaption>' + inlineHtml(pick(block.caption, lang)) + '</figcaption></figure>'
        : '<figure>' + img + '</figure>';
    }
    case 'svg':
      return '<div class="slide-figure">' + block.svg + '</div>';
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --test tests/unit/build_slides.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add build_slides.js tests/unit/build_slides.test.js
git commit -m "feat: render image and inline-svg slide blocks"
```

---

## Task 6: Mermaid pre-rendering

`mermaid` blocks render to SVG at build time. The pure renderers read pre-rendered SVG from `ctx.mermaidSvg` (a `Map` from mermaid source → SVG string), keeping them testable without Puppeteer. The real mermaid-cli call lives in `main()` (Task 8).

**Files:**
- Modify: `build_slides.js`, `tests/unit/build_slides.test.js`

- [ ] **Step 1: Add failing tests**

Append to `tests/unit/build_slides.test.js`:
```js
test('collectMermaid returns unique sources', () => {
  const db = {
    t1: { slides: [{ heading: {}, blocks: [
      { type: 'mermaid', code: 'graph A' },
      { type: 'mermaid', code: 'graph A' },
    ] }] },
    t2: { slides: [{ heading: {}, blocks: [{ type: 'mermaid', code: 'graph B' }] }] },
  };
  assert.deepEqual(b.collectMermaid(db).sort(), ['graph A', 'graph B']);
});

test('mermaid block → markdown embeds pre-rendered svg', () => {
  const ctx = { mermaidSvg: new Map([['graph A', '<svg id="m"></svg>']]) };
  assert.equal(b.blockToMarkdown({ type: 'mermaid', code: 'graph A' }, 'zh', ctx), '<svg id="m"></svg>');
});

test('mermaid block → html wraps pre-rendered svg', () => {
  const ctx = { mermaidSvg: new Map([['graph A', '<svg id="m"></svg>']]) };
  assert.equal(b.blockToHtml({ type: 'mermaid', code: 'graph A' }, 'zh', ctx),
    '<div class="slide-figure mermaid-figure"><svg id="m"></svg></div>');
});

test('mermaid block missing from ctx throws', () => {
  assert.throws(() => b.blockToMarkdown({ type: 'mermaid', code: 'X' }, 'zh', { mermaidSvg: new Map() }));
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test tests/unit/build_slides.test.js`
Expected: FAIL — `collectMermaid` undefined; `mermaid` unknown block type.

- [ ] **Step 3: Implement mermaid handling in `build_slides.js`**

Add this helper function (before `module.exports`):
```js
function collectMermaid(slidesDb) {
  const seen = new Set();
  for (const id of Object.keys(slidesDb)) {
    for (const slide of slidesDb[id].slides) {
      for (const block of slide.blocks) {
        if (block.type === 'mermaid') seen.add(block.code);
      }
    }
  }
  return Array.from(seen);
}

function mermaidSvg(block, ctx) {
  const svg = ctx && ctx.mermaidSvg && ctx.mermaidSvg.get(block.code);
  if (!svg) throw new Error('Mermaid source not pre-rendered: ' + block.code.slice(0, 40));
  return svg;
}
```

In `blockToMarkdown`, add before `default`:
```js
    case 'mermaid':
      return mermaidSvg(block, ctx);
```

In `blockToHtml`, add before `default`:
```js
    case 'mermaid':
      return '<div class="slide-figure mermaid-figure">' + mermaidSvg(block, ctx) + '</div>';
```

Add `collectMermaid` to `module.exports`:
```js
module.exports = { pick, escapeHtml, inlineHtml, blockToMarkdown, blockToHtml, collectMermaid };
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --test tests/unit/build_slides.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add build_slides.js tests/unit/build_slides.test.js
git commit -m "feat: embed pre-rendered mermaid SVG in slide blocks"
```

---

## Task 7: Deck → Marp markdown

**Files:**
- Modify: `build_slides.js`, `tests/unit/build_slides.test.js`

- [ ] **Step 1: Add failing tests**

Append to `tests/unit/build_slides.test.js`:
```js
test('deckToMarkdown emits frontmatter and slide separators', () => {
  const deck = {
    category: 'Cat', title: { zh: '標題', en: 'Title' },
    slides: [
      { heading: { zh: '一', en: 'One' }, blocks: [{ type: 'paragraph', text: { zh: 'a', en: 'a' } }] },
      { heading: { zh: '二', en: 'Two' }, blocks: [{ type: 'paragraph', text: { zh: 'b', en: 'b' } }] },
    ],
  };
  const md = b.deckToMarkdown('demo', deck, 'en', {});
  assert.match(md, /^---\nmarp: true\n/);
  assert.match(md, /math: katex\n/);
  assert.match(md, /title: Title\n/);
  assert.match(md, /\n## One\n\na\n/);
  assert.match(md, /\n---\n\n## Two\n/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/unit/build_slides.test.js`
Expected: FAIL — `deckToMarkdown` is undefined.

- [ ] **Step 3: Implement `deckToMarkdown`**

Add to `build_slides.js` before `module.exports`:
```js
function deckToMarkdown(id, deck, lang, ctx) {
  const title = pick(deck.title, lang);
  const frontmatter = [
    '---',
    'marp: true',
    'theme: default',
    'paginate: true',
    'math: katex',
    'title: ' + title,
    '---',
  ].join('\n');

  const slides = deck.slides.map((slide) => {
    const heading = '## ' + pick(slide.heading, lang);
    const body = slide.blocks.map((blk) => blockToMarkdown(blk, lang, ctx)).join('\n\n');
    return heading + '\n\n' + body;
  });

  return frontmatter + '\n\n' + slides.join('\n\n---\n\n') + '\n';
}
```

Add `deckToMarkdown` to `module.exports`.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/unit/build_slides.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add build_slides.js tests/unit/build_slides.test.js
git commit -m "feat: render decks to Marp markdown"
```

---

## Task 8: Deck → App HTML slides + `main()` wiring

**Files:**
- Modify: `build_slides.js`, `tests/unit/build_slides.test.js`

- [ ] **Step 1: Add failing tests**

Append to `tests/unit/build_slides.test.js`:
```js
test('deckToHtmlSlides returns per-slide title and body', () => {
  const deck = {
    title: { zh: '標題', en: 'Title' },
    slides: [
      { heading: { zh: '一', en: 'One' }, blocks: [{ type: 'paragraph', text: { zh: '甲', en: 'a' } }] },
    ],
  };
  const slides = b.deckToHtmlSlides('demo', deck, 'zh', {});
  assert.equal(slides.length, 1);
  assert.equal(slides[0].title, '一');
  assert.equal(slides[0].body, '<p>甲</p>');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/unit/build_slides.test.js`
Expected: FAIL — `deckToHtmlSlides` is undefined.

- [ ] **Step 3: Implement `deckToHtmlSlides` and `main()`**

Add to `build_slides.js` before `module.exports`:
```js
function deckToHtmlSlides(id, deck, lang, ctx) {
  return deck.slides.map((slide) => ({
    title: pick(slide.heading, lang),
    body: slide.blocks.map((blk) => blockToHtml(blk, lang, ctx)).join('\n'),
  }));
}

const LANGS = ['zh', 'en'];

async function renderMermaidWithCli(sources) {
  const fs = require('fs');
  const os = require('os');
  const path = require('path');
  const { execFileSync } = require('child_process');
  const mmdc = path.join(__dirname, 'node_modules', '.bin', 'mmdc');
  const map = new Map();
  for (const src of sources) {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'mmd-'));
    const inFile = path.join(tmp, 'in.mmd');
    const outFile = path.join(tmp, 'out.svg');
    fs.writeFileSync(inFile, src);
    execFileSync(mmdc, ['-i', inFile, '-o', outFile, '-b', 'transparent'], { stdio: 'pipe' });
    map.set(src, fs.readFileSync(outFile, 'utf8').trim());
    fs.rmSync(tmp, { recursive: true, force: true });
  }
  return map;
}

async function main() {
  const fs = require('fs');
  const path = require('path');
  const slidesDb = require('./slides_db.js');

  const mermaidSvgMap = await renderMermaidWithCli(collectMermaid(slidesDb));
  const ctx = { mermaidSvg: mermaidSvgMap };

  for (const lang of LANGS) {
    fs.mkdirSync(path.join(__dirname, 'slides', lang), { recursive: true });
  }

  const rendered = {};
  for (const id of Object.keys(slidesDb)) {
    const deck = slidesDb[id];
    for (const lang of LANGS) {
      const md = deckToMarkdown(id, deck, lang, ctx);
      fs.writeFileSync(path.join(__dirname, 'slides', lang, id + '.md'), md);
    }
    rendered[id] = {
      slides: {
        zh: deckToHtmlSlides(id, deck, 'zh', ctx),
        en: deckToHtmlSlides(id, deck, 'en', ctx),
      },
    };
  }

  const out = 'window.SLIDES_RENDERED = ' + JSON.stringify(rendered, null, 2) + ';\n';
  fs.writeFileSync(path.join(__dirname, 'slides_rendered.js'), out);
  console.log('Generated ' + Object.keys(slidesDb).length + ' decks for ' + LANGS.join(', '));
}

if (require.main === module) {
  main().catch((err) => { console.error(err); process.exit(1); });
}
```

Add `deckToHtmlSlides` to `module.exports`.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/unit/build_slides.test.js`
Expected: PASS — all unit tests pass.

- [ ] **Step 5: Commit**

```bash
git add build_slides.js tests/unit/build_slides.test.js
git commit -m "feat: render App HTML slides and wire build_slides main()"
```

---

## Task 9: Run the full build and verify Marp conversion

**Files:**
- Create (generated): `slides/zh/stack-array.md`, `slides/en/stack-array.md`, `slides_rendered.js`, `slides/assets/mermaid/*`

- [ ] **Step 1: Run the build**

Run: `npm run build:slides`
Expected: prints `Generated 1 decks for zh, en`; creates `slides/zh/stack-array.md`, `slides/en/stack-array.md`, `slides_rendered.js`.

- [ ] **Step 2: Inspect the generated files**

Run: `head -20 slides/zh/stack-array.md`
Expected: Marp frontmatter (`marp: true` … `math: katex`) followed by `## 堆疊(陣列實作)`.

Run: `grep -c '"title"' slides_rendered.js`
Expected: `16` (8 slides × 2 languages).

Confirm both diagrams became inline SVG (mermaid + authored svg):
Run: `grep -o '<svg' slides/zh/stack-array.md | wc -l`
Expected: `2`.

- [ ] **Step 3: Smoke-test Marp conversion**

Run: `npx marp --html --allow-local-files slides/zh/stack-array.md -o /tmp/stack-array.html`
Expected: exits 0; `/tmp/stack-array.html` created. Open it and confirm 8 slides, the LaTeX formula renders, and both SVGs display.

- [ ] **Step 4: Commit the generated artifacts**

```bash
git add slides/zh slides/en slides_rendered.js slides/assets/mermaid
git commit -m "build: generate stack-array slide deck (zh/en) and rendered data"
```

---

## Task 10: `index.html` — load rendered data, KaTeX CSS, language toggle markup

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add the KaTeX stylesheet**

In `index.html`, inside `<head>`, after the existing stylesheet `<link>`, add:
```html
    <link rel="stylesheet" href="vendor/katex/katex.min.css">
```

- [ ] **Step 2: Load the rendered slides data**

In `index.html`, in the `<script>` block near the bottom, add a line after `<script src="code_db.js"></script>`:
```html
    <script src="slides_rendered.js"></script>
```

- [ ] **Step 3: Add the language toggle to the slide-viewer header**

In `index.html`, the slide-viewer header currently contains a progress `<p>` and title `<h2>`. Add a language toggle button before the close button. Change the header block to:
```html
                <header class="slide-viewer-header">
                    <div>
                        <p id="slide-viewer-progress">Slide 1 / 1</p>
                        <h2 id="slide-viewer-title">Method slides</h2>
                    </div>
                    <div class="slide-viewer-header-actions">
                        <button type="button" id="slide-lang-toggle" class="slide-lang-toggle"
                                data-testid="slide-lang-toggle" aria-label="Switch slide language">中 / EN</button>
                        <button type="button" class="slide-viewer-close" data-slide-close aria-label="Close slides">×</button>
                    </div>
                </header>
```

- [ ] **Step 4: Verify the page still loads**

Run: `npx playwright test tests/visualizer.spec.js --reporter=line` (existing suite — confirms no regression)
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: load rendered slides + KaTeX CSS, add language toggle markup"
```

---

## Task 11: `app.js` — consume `SLIDES_RENDERED`, language toggle

**Files:**
- Modify: `app.js` (the slide-viewer block, ~lines 253-450)

- [ ] **Step 1: Add language state and a current-method reference**

In `app.js`, find `let slideDeck = [];` and `let slideIndex = 0;` (~line 373). Add below them:
```js
    let slideLang = 'zh';
    let slideMethodId = null;
    const slideLangToggle = document.getElementById('slide-lang-toggle');
```

- [ ] **Step 2: Replace `buildSlides()`**

Replace the existing `buildSlides(methodId)` function with:
```js
    function buildSlides(methodId) {
        const entry = window.SLIDES_RENDERED && window.SLIDES_RENDERED[methodId];
        if (!entry || !entry.slides[slideLang] || entry.slides[slideLang].length === 0) {
            return [{ title: getMethodById(methodId)?.title || 'Slides',
                      body: '<p>No slides available.</p>' }];
        }
        return entry.slides[slideLang];
    }
```

- [ ] **Step 3: Make `openSlides()` remember the method id**

In `openSlides(methodId)`, add `slideMethodId = methodId;` as the first line.

- [ ] **Step 4: Wire the language toggle**

After the existing `slideNext.addEventListener(...)` block (~line 447), add:
```js
    if (slideLangToggle) {
        slideLangToggle.addEventListener('click', () => {
            slideLang = slideLang === 'zh' ? 'en' : 'zh';
            slideLangToggle.setAttribute('data-lang', slideLang);
            if (slideMethodId) {
                slideDeck = buildSlides(slideMethodId);
                if (slideIndex >= slideDeck.length) slideIndex = slideDeck.length - 1;
                renderSlide();
            }
        });
    }
```

- [ ] **Step 5: Verify existing suite still passes**

Run: `npx playwright test tests/visualizer.spec.js --reporter=line`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add app.js
git commit -m "feat: slide-viewer reads rendered decks with zh/en toggle"
```

---

## Task 12: `style.css` — slide content styles

**Files:**
- Modify: `style.css`

- [ ] **Step 1: Add styles**

Append to `style.css`:
```css
/* ----- Generated slide decks ----- */
.slide-viewer-header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
}
.slide-lang-toggle {
    border: 1px solid var(--border, #cbd5e1);
    background: #fff;
    border-radius: 999px;
    padding: 4px 12px;
    font-size: 13px;
    cursor: pointer;
}
.slide-lang-toggle:hover { background: #f1f5f9; }
.slide-viewer-body table {
    border-collapse: collapse;
    width: 100%;
    margin: 12px 0;
}
.slide-viewer-body th,
.slide-viewer-body td {
    border: 1px solid var(--border, #cbd5e1);
    padding: 6px 10px;
    text-align: left;
}
.slide-viewer-body .note {
    border-left: 3px solid var(--primary, #2563eb);
    background: #f1f5f9;
    padding: 8px 12px;
    margin: 12px 0;
    border-radius: 4px;
}
.slide-viewer-body .slide-figure,
.slide-viewer-body figure {
    margin: 12px 0;
    text-align: center;
}
.slide-viewer-body .slide-figure svg,
.slide-viewer-body figure img {
    max-width: 100%;
    height: auto;
}
.slide-viewer-body figcaption,
.slide-viewer-body .slide-caption {
    font-size: 13px;
    color: var(--muted, #64748b);
    margin-top: 4px;
}
.slide-viewer-body .slide-math {
    margin: 12px 0;
    text-align: center;
}
```

- [ ] **Step 2: Verify visually**

Open `index.html`, open the `stack-array` slides, page through all 8. Confirm the table, note, SVG, mermaid SVG, and KaTeX formula all display correctly. Toggle language and confirm text switches.

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "style: slide-viewer table, note, figure, math, language toggle"
```

---

## Task 13: Playwright tests for the in-app viewer

**Files:**
- Create: `tests/slides_viewer.spec.js`

- [ ] **Step 1: Write the tests**

Create `tests/slides_viewer.spec.js`:
```js
const { test, expect } = require('@playwright/test');
const path = require('path');

const FILE_URL = 'file://' + path.resolve(__dirname, '..', 'index.html');

async function openStackArraySlides(page) {
  await page.goto(FILE_URL);
  const categoryButtons = page.locator('[data-testid="category-nav"] .category-nav-btn');
  const methodSelect = page.locator('[data-testid="method-select"]');
  const count = await categoryButtons.count();
  for (let i = 0; i < count; i++) {
    await categoryButtons.nth(i).click();
    if (await methodSelect.locator('option[value="stack-array"]').count()) {
      await methodSelect.selectOption('stack-array');
      break;
    }
  }
  await page.locator('.method-slides-btn[data-method="stack-array"]').click();
  await expect(page.locator('[data-testid="slide-viewer"]')).toBeVisible();
}

test('slide deck has multiple pages and navigates', async ({ page }) => {
  await openStackArraySlides(page);
  await expect(page.locator('#slide-viewer-progress')).toContainText('Slide 1 / 8');
  await page.locator('#slide-next').click();
  await expect(page.locator('#slide-viewer-progress')).toContainText('Slide 2 / 8');
});

test('language toggle switches slide content', async ({ page }) => {
  await openStackArraySlides(page);
  await expect(page.locator('#slide-viewer-title')).toHaveText('堆疊(陣列實作)');
  await page.locator('[data-testid="slide-lang-toggle"]').click();
  await expect(page.locator('#slide-viewer-title')).toHaveText('Stack (Array Implementation)');
});

test('math renders via KaTeX and mermaid renders as SVG', async ({ page }) => {
  await openStackArraySlides(page);
  // Navigate to the operation-flow slide (slide 3) which has a mermaid diagram.
  await page.locator('#slide-next').click();
  await page.locator('#slide-next').click();
  await expect(page.locator('#slide-viewer-body svg').first()).toBeVisible();
  // Navigate to the complexity slide (slide 5) which has a KaTeX formula.
  await page.locator('#slide-next').click();
  await page.locator('#slide-next').click();
  await expect(page.locator('#slide-viewer-body .katex').first()).toBeVisible();
});
```

- [ ] **Step 2: Run the tests**

Run: `npx playwright test tests/slides_viewer.spec.js --reporter=line`
Expected: PASS — all 3 tests pass.

- [ ] **Step 3: Run the whole suite for regressions**

Run: `npm run test:all`
Expected: PASS — unit tests and all Playwright tests pass.

- [ ] **Step 4: Commit**

```bash
git add tests/slides_viewer.spec.js
git commit -m "test: slide-viewer multi-page, language toggle, math/mermaid"
```

---

## Task 14: Content authoring — remaining 48 topics

The infrastructure is complete and verified end-to-end with `stack-array`. The remaining topics are authored into `slides_db.js` following the **exact structure of the `stack-array` deck** (Task 2): 8-10 slides per topic in the fixed sequence — Title → Core Concept → Operation Flow → (Layout/Diagram) → Complexity → Source Code → Pros/Cons → Summary.

**Authoring rules (apply to every topic):**
- Every text leaf is `{ zh, en }`. Technical terms (`O(log n)`, `push`, `pop`, identifiers) stay in English inside both languages.
- Use inline `$...$` for complexity expressions; use a `math` block for any derivation/recurrence.
- Each deck includes at least one diagram — a `mermaid` flow/tree/state diagram or an inline `svg`.
- `code` block content is taken from the topic's `.cpp` file / `code_db.js`, trimmed to the most instructive 15-30 lines.
- The `category` field uses the human-readable label from `METHOD_GROUPS` in `app.js`.

**Per-topic procedure:**
1. Read the topic's existing `descDB[id]` entry in `desc_db.js` and its `.cpp` source for accurate facts.
2. Add a `'<id>': { category, title, slides: [...] }` entry to `SLIDES_DB` in `slides_db.js`.
3. Run `npm run build:slides` — must exit 0.
4. Run `node --test tests/unit/build_slides.test.js` — must pass.
5. Smoke-convert one new deck: `npx marp --html --allow-local-files slides/zh/<id>.md -o /tmp/<id>.html`.
6. Commit the batch (source + generated artifacts).

**Batches — one commit per category** (topic ids exactly as in `desc_db.js`):

- [ ] **Batch A — Basic Linear Structures (3):** `stack-list`, `queue`, `list-array`
  - Commit: `feat: author slide decks for basic linear structures`
- [ ] **Batch B — Linked Lists (1):** `list-linked`
  - Commit: `feat: author slide deck for linked list`
- [ ] **Batch C — Trees (9):** `tree-bst`, `tree-avl`, `tree-rb`, `tree-splay`, `tree-trie`, `tree-radix`, `tree-ternary`, `tree-btree`, `tree-bplus`
  - Commit: `feat: author slide decks for tree structures`
- [ ] **Batch D — Graphs (4):** `graph`, `graph-kruskal`, `graph-dijkstra`, `graph-topo`
  - Commit: `feat: author slide decks for graph algorithms`
- [ ] **Batch E — Heaps (7):** `heap-binary`, `heap-binomial`, `heap-fibonacci`, `heap-leftist`, `heap-skew`, `heap-dary`, `heap-pairing`
  - Commit: `feat: author slide decks for heap structures`
- [ ] **Batch F — Hash Tables (3):** `hash-chain`, `hash-open`, `hash-bucket`
  - Commit: `feat: author slide decks for hash tables`
- [ ] **Batch G — Sorting (10):** `sort-bubble`, `sort-select`, `sort-insert`, `sort-quick`, `sort-merge`, `sort-shell`, `sort-bucket`, `sort-count`, `sort-radix`, `sort-shaker`
  - Commit: `feat: author slide decks for sorting algorithms`
- [ ] **Batch H — Searching (2):** `search-linear`, `search-binary`
  - Commit: `feat: author slide decks for search algorithms`
- [ ] **Batch I — OOP Concepts (3):** `oop-inheritance`, `oop-polymorphism`, `oop-encapsulation`
  - Commit: `feat: author slide decks for OOP concepts`
- [ ] **Batch J — Design Patterns (6):** `pattern-singleton`, `pattern-factory`, `pattern-adapter`, `pattern-decorator`, `pattern-observer`, `pattern-strategy`
  - Commit: `feat: author slide decks for design patterns`

After each batch: run `npm run test:all` and have the batch reviewed before starting the next.

- [ ] **Final step — full verification**

Run: `npm run build:slides && npm run test:all`
Expected: `Generated 49 decks for zh, en`; all unit and Playwright tests pass. Confirm `slides/zh/` and `slides/en/` each contain 49 `.md` files.

```bash
git add slides_db.js slides slides_rendered.js
git commit -m "build: regenerate all slide decks"
```

---

## Notes for the executor

- **Task 14 is large** (48 topics of bilingual content). It is safe to split Task 14 into its own follow-up plan/session — Tasks 1-13 deliver a complete, working, tested slide system on their own.
- mermaid-cli uses Puppeteer (headless Chromium). The first `npm run build:slides` may download Chromium; allow extra time. If `mmdc` is missing its browser, run `npx puppeteer browsers install chrome`.
- Generated files (`slides/**`, `slides_rendered.js`) are committed intentionally so the app works without a build step — treat them as build output, never hand-edit.
