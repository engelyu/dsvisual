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
