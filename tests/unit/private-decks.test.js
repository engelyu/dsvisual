'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

function loadModule(fetchMock) {
  const code = fs.readFileSync(path.join(__dirname, '../../js/private-decks.js'), 'utf8');
  const sandbox = {
    window: {},
    fetch: fetchMock,
    console,
    URLSearchParams,
    encodeURIComponent,
    Array,
    Promise,
    JSON,
  };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox.window.privateDecksClient;
}

const FOLDER = 'FOLDER_ID_123';
const TOKEN = 'TOKEN_ABC';
const MANIFEST_ID = 'MANIFEST_FILE_ID';
const EN_ID = 'EN_FILE_ID';
const ZH_ID = 'ZH_FILE_ID';

const MANIFEST = {
  version: 1,
  decks: [{
    id: 'tree-bst-instructor',
    method: 'tree-bst',
    files: { en: 'tree-bst-instructor.en.md', zh: 'tree-bst-instructor.zh.md' },
    titleEn: 'BST — instructor notes',
    titleZh: 'BST —— 講師補充',
  }],
};
const EN_MD = '---\nmarp: true\n---\n\n# Instructor (EN)';
const ZH_MD = '---\nmarp: true\n---\n\n# 講師 (ZH)';

function makeFetch(responses) {
  let calls = 0;
  const fn = async (url) => {
    calls++;
    const matched = responses.find((r) => url.includes(r.match));
    if (!matched) throw new Error('unmocked fetch: ' + url);
    if (matched.networkError) throw new Error('network down');
    return {
      ok: matched.status === 200,
      status: matched.status,
      async json() { return matched.json; },
      async text() { return matched.text; },
    };
  };
  fn.callCount = () => calls;
  return fn;
}

function happyPath() {
  return [
    { match: "name%3D%27private-decks.json%27", status: 200, json: { files: [{ id: MANIFEST_ID, name: 'private-decks.json' }] } },
    { match: '/files/' + MANIFEST_ID + '?alt=media', status: 200, text: JSON.stringify(MANIFEST) },
    { match: "name%3D%27tree-bst-instructor.en.md%27", status: 200, json: { files: [{ id: EN_ID, name: 'tree-bst-instructor.en.md' }, { id: ZH_ID, name: 'tree-bst-instructor.zh.md' }] } },
    { match: '/files/' + EN_ID + '?alt=media', status: 200, text: EN_MD },
    { match: '/files/' + ZH_ID + '?alt=media', status: 200, text: ZH_MD },
  ];
}

test('private-decks: returns [] when folderId is empty', async () => {
  const m = loadModule(() => { throw new Error('should not fetch'); });
  m._resetPrivateDecksCache();
  const decks = await m.fetchPrivateDecks({ accessToken: TOKEN, folderId: '' });
  assert.equal(decks.length, 0);
});

test('private-decks: returns [] when accessToken is null', async () => {
  const m = loadModule(() => { throw new Error('should not fetch'); });
  m._resetPrivateDecksCache();
  const decks = await m.fetchPrivateDecks({ accessToken: null, folderId: FOLDER });
  assert.equal(decks.length, 0);
});

test('private-decks: returns [] silently on manifest 403', async () => {
  const m = loadModule(makeFetch([{ match: "name%3D%27private-decks.json%27", status: 403, json: {} }]));
  m._resetPrivateDecksCache();
  const decks = await m.fetchPrivateDecks({ accessToken: TOKEN, folderId: FOLDER });
  assert.equal(decks.length, 0);
});

test('private-decks: returns [] silently when manifest file is absent', async () => {
  const m = loadModule(makeFetch([{ match: "name%3D%27private-decks.json%27", status: 200, json: { files: [] } }]));
  m._resetPrivateDecksCache();
  const decks = await m.fetchPrivateDecks({ accessToken: TOKEN, folderId: FOLDER });
  assert.equal(decks.length, 0);
});

test('private-decks: happy path returns one parsed deck', async () => {
  const m = loadModule(makeFetch(happyPath()));
  m._resetPrivateDecksCache();
  const decks = await m.fetchPrivateDecks({ accessToken: TOKEN, folderId: FOLDER });
  assert.equal(decks.length, 1);
  const d = decks[0];
  assert.equal(d.id, 'tree-bst-instructor');
  assert.equal(d.method, 'tree-bst');
  assert.equal(d.titleEn, 'BST — instructor notes');
  assert.equal(d.titleZh, 'BST —— 講師補充');
  assert.equal(d.en, EN_MD);
  assert.equal(d.zh, ZH_MD);
  assert.equal(d.private, true);
  assert.equal(d.access, 'ok');
  assert.ok(d.num >= 1001);
});

test('private-decks: deck marked access=denied when its files 403', async () => {
  const responses = happyPath();
  const i = responses.findIndex((r) => r.match === '/files/' + EN_ID + '?alt=media');
  responses[i] = { match: '/files/' + EN_ID + '?alt=media', status: 403, json: {} };
  const m = loadModule(makeFetch(responses));
  m._resetPrivateDecksCache();
  const decks = await m.fetchPrivateDecks({ accessToken: TOKEN, folderId: FOLDER });
  assert.equal(decks.length, 1);
  assert.equal(decks[0].access, 'denied');
});

test('private-decks: caches results for same access token', async () => {
  const fetch = makeFetch(happyPath());
  const m = loadModule(fetch);
  m._resetPrivateDecksCache();
  await m.fetchPrivateDecks({ accessToken: TOKEN, folderId: FOLDER });
  const before = fetch.callCount();
  await m.fetchPrivateDecks({ accessToken: TOKEN, folderId: FOLDER });
  assert.equal(fetch.callCount(), before);
});
