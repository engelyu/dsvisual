'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

function loadParser() {
  const code = fs.readFileSync(path.join(__dirname, '../../js/slide-markdown.js'), 'utf8');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox.window.slideMarkdown;
}

test('slide-markdown: parseDeck splits on --- separators', () => {
  const sm = loadParser();
  const md = '---\nmarp: true\n---\n\n# Slide 1\n\n---\n\n# Slide 2\n\n---\n\n# Slide 3';
  const out = sm.parseDeck(md);
  assert.equal(out.slides.length, 3);
});

test('slide-markdown: strips front matter from first slide', () => {
  const sm = loadParser();
  const md = '---\nmarp: true\ntitle: x\n---\n\n# Hello';
  const out = sm.parseDeck(md);
  assert.equal(out.slides.length, 1);
  assert.ok(out.slides[0].html.includes('Hello'));
  assert.ok(!out.slides[0].html.includes('marp:'));
});

test('slide-markdown: renders heading as h-tag', () => {
  const sm = loadParser();
  const out = sm.parseDeck('# Hello\n\n## Sub');
  const html = out.slides[0].html;
  assert.ok(/<h1[^>]*>Hello<\/h1>/.test(html));
  assert.ok(/<h2[^>]*>Sub<\/h2>/.test(html));
});

test('slide-markdown: bullets become <ul><li>', () => {
  const sm = loadParser();
  const out = sm.parseDeck('- one\n- two');
  assert.ok(out.slides[0].html.includes('<ul>'));
  assert.ok(out.slides[0].html.includes('<li>one</li>'));
  assert.ok(out.slides[0].html.includes('<li>two</li>'));
});

test('slide-markdown: notes block captured separately', () => {
  const sm = loadParser();
  const md = '# Title\n\n<!-- speaker note line -->';
  const out = sm.parseDeck(md);
  assert.equal(out.slides.length, 1);
  assert.ok(out.slides[0].notes.includes('speaker note'));
});

test('slide-markdown: empty input returns empty slide array', () => {
  const sm = loadParser();
  const out = sm.parseDeck('');
  assert.ok(Array.isArray(out.slides));
});

test('slide-markdown: inline <svg> passes through verbatim (not escaped)', () => {
  const sm = loadParser();
  const md = '# Title\n\n<svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="4"/></svg>';
  const html = sm.parseDeck(md).slides[0].html;
  assert.ok(html.includes('<svg viewBox="0 0 10 10">'), 'opens with raw <svg>');
  assert.ok(html.includes('<circle cx="5" cy="5" r="4"/>'), 'inner shape preserved');
  assert.ok(html.includes('</svg>'), 'closes with raw </svg>');
  assert.ok(!html.includes('&lt;svg'), 'must not be HTML-escaped');
});

test('slide-markdown: multi-line <svg> block kept intact', () => {
  const sm = loadParser();
  const md = '# T\n\n<svg width="100" height="100">\n  <rect x="0" y="0" width="100" height="100"/>\n  <text x="10" y="20">hi</text>\n</svg>\n\nNext paragraph.';
  const html = sm.parseDeck(md).slides[0].html;
  assert.ok(html.includes('<rect x="0" y="0" width="100" height="100"/>'));
  assert.ok(html.includes('<text x="10" y="20">hi</text>'));
  assert.ok(html.includes('<p>Next paragraph.</p>'), 'subsequent paragraph still parsed');
});

test('slide-markdown: nested <svg> (viewport) balanced by depth count', () => {
  const sm = loadParser();
  const md = '<svg><svg x="10"><circle r="1"/></svg></svg>\n\nAfter.';
  const html = sm.parseDeck(md).slides[0].html;
  assert.ok(html.includes('<svg><svg x="10"><circle r="1"/></svg></svg>'));
  assert.ok(html.includes('<p>After.</p>'));
});
