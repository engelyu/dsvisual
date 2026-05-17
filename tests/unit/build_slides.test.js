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
  assert.match(md, /title: "Title"\n/);
  assert.match(md, /\n## One\n\na\n/);
  assert.match(md, /\n---\n\n## Two\n/);
});

test('deckToMarkdown quotes titles containing YAML-special chars', () => {
  const deck = {
    category: 'Cat', title: { zh: 'X', en: 'Stack: Array' },
    slides: [{ heading: { zh: 'h', en: 'h' }, blocks: [{ type: 'paragraph', text: { zh: 'a', en: 'a' } }] }],
  };
  const md = b.deckToMarkdown('demo', deck, 'en', {});
  assert.match(md, /title: "Stack: Array"\n/);
});

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
