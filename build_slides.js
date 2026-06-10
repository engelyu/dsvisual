'use strict';

const katex = require('katex');
const Prism = require('prismjs');
require('prismjs/components/prism-c');
require('prismjs/components/prism-cpp');

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
    case 'math': {
      const formula = '$$' + block.tex + '$$';
      return block.caption ? formula + '\n\n' + pick(block.caption, lang) : formula;
    }
    case 'image':
      return '![' + pick(block.alt, lang) + '](../' + block.src + ')';
    case 'svg':
      return block.svg;
    case 'mermaid':
      return mermaidSvg(block, ctx);
    default:
      throw new Error('Unknown block type: ' + block.type);
  }
}

function wrapHighlightedLines(highlighted) {
  // Split the Prism-highlighted HTML on newline characters and wrap each line.
  // Prism preserves newlines as literal '\n' between token spans.
  const lines = highlighted.split('\n');
  return lines.map((line) => '<span class="code-line">' + line + '</span>').join('\n');
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
    case 'code': {
      const highlighted = Prism.highlight(
        block.code,
        Prism.languages.cpp,
        'cpp'
      );
      const filename = block.file ? escapeHtml(block.file) : '';
      return (
        '<div class="code-panel" data-language="cpp">' +
          '<div class="code-panel-header">' +
            '<span class="code-panel-dots" aria-hidden="true"><i></i><i></i><i></i></span>' +
            '<span class="code-panel-filename">' + filename + '</span>' +
            '<button type="button" class="code-panel-copy" data-code-copy aria-label="Copy code">⧉ Copy</button>' +
          '</div>' +
          '<pre class="code-panel-body"><code class="language-cpp">' + wrapHighlightedLines(highlighted) + '</code></pre>' +
        '</div>'
      );
    }
    case 'note':
      return '<div class="note">' + inlineHtml(pick(block.text, lang)) + '</div>';
    case 'math': {
      const formula = '<div class="slide-math">' +
        katex.renderToString(block.tex, { displayMode: true, throwOnError: false }) + '</div>';
      return block.caption
        ? formula + '<p class="slide-caption">' + inlineHtml(pick(block.caption, lang)) + '</p>'
        : formula;
    }
    case 'image': {
      const img = '<img src="slides/' + block.src + '" alt="' + escapeHtml(pick(block.alt, lang)) + '">';
      return block.caption
        ? '<figure>' + img + '<figcaption>' + inlineHtml(pick(block.caption, lang)) + '</figcaption></figure>'
        : '<figure>' + img + '</figure>';
    }
    case 'svg':
      return '<div class="slide-figure">' + block.svg + '</div>';
    case 'mermaid':
      return '<div class="slide-figure mermaid-figure">' + mermaidSvg(block, ctx) + '</div>';
    default:
      throw new Error('Unknown block type: ' + block.type);
  }
}

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

function deckToMarkdown(id, deck, lang, ctx) {
  const title = pick(deck.title, lang);
  const frontmatter = [
    '---',
    'marp: true',
    'theme: default',
    'paginate: true',
    'math: katex',
    'title: "' + title.replace(/"/g, '\\"') + '"',
    'category: "' + (deck.category || '').replace(/"/g, '\\"') + '"',
    '---',
  ].join('\n');

  const slides = deck.slides.map((slide) => {
    const heading = '## ' + pick(slide.heading, lang);
    const body = slide.blocks.map((blk) => blockToMarkdown(blk, lang, ctx)).join('\n\n');
    return heading + '\n\n' + body;
  });

  return frontmatter + '\n\n' + slides.join('\n\n---\n\n') + '\n';
}

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
  // -p / --puppeteerConfigFile carries the --no-sandbox args needed on
  // GitHub Actions runners (Ubuntu restricts unprivileged user namespaces);
  // harmless on macOS/Linux dev machines.
  const puppeteerCfg = path.join(__dirname, 'puppeteer-config.json');
  const map = new Map();
  for (const src of sources) {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'mmd-'));
    const inFile = path.join(tmp, 'in.mmd');
    const outFile = path.join(tmp, 'out.svg');
    fs.writeFileSync(inFile, src);
    execFileSync(mmdc, ['-i', inFile, '-o', outFile, '-b', 'transparent', '-p', puppeteerCfg], { stdio: 'pipe' });
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
  fs.writeFileSync(path.join(__dirname, 'js', 'slides_rendered.js'), out);
  console.log('Generated ' + Object.keys(slidesDb).length + ' decks for ' + LANGS.join(', '));
}

module.exports = { pick, escapeHtml, inlineHtml, blockToMarkdown, blockToHtml, collectMermaid, deckToMarkdown, deckToHtmlSlides };

if (require.main === module) {
  main().catch((err) => { console.error(err); process.exit(1); });
}
