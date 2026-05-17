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
