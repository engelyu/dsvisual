// Fetches private Marp decks from a Google Drive folder using the user's
// own OAuth access token (drive.readonly scope). Pure function — caller
// provides token + folder ID. Per-session in-memory cache.
//
// Ported from rdvisual src/framework/privateDecks.js with two adaptations:
//   1. IIFE wrapper exposing window.privateDecksClient
//   2. Manifest entry field 'method' replaces rdvisual's 'section'
//   3. Lang key 'zh' (not 'zh-TW') matches dsvisual's i18n convention
(function () {
  'use strict';

  const PRIVATE_NUM_OFFSET = 1000;
  const DRIVE_API = 'https://www.googleapis.com/drive/v3/files';

  let cache = { token: null, decks: null };

  function _resetPrivateDecksCache() {
    cache = { token: null, decks: null };
  }

  async function fetchPrivateDecks(opts) {
    const accessToken = opts && opts.accessToken;
    const folderId = opts && opts.folderId;
    if (!folderId || !accessToken) return [];
    if (cache.token === accessToken && cache.decks !== null) return cache.decks;
    const manifest = await fetchManifest(accessToken, folderId);
    if (!manifest || !Array.isArray(manifest.decks)) {
      cache = { token: accessToken, decks: [] };
      return [];
    }
    const decks = [];
    for (let i = 0; i < manifest.decks.length; i++) {
      const entry = manifest.decks[i];
      const num = PRIVATE_NUM_OFFSET + i + 1;
      const deck = await fetchDeck(accessToken, folderId, entry, num);
      if (deck) decks.push(deck);
    }
    cache = { token: accessToken, decks };
    return decks;
  }

  async function fetchManifest(accessToken, folderId) {
    const listed = await listByName(accessToken, folderId, ['private-decks.json']);
    if (listed === null) return null;
    const file = listed.find((f) => f.name === 'private-decks.json');
    if (!file) return null;
    const text = await getFileMedia(accessToken, file.id);
    if (text === null) return null;
    try { return JSON.parse(text); } catch { return null; }
  }

  async function fetchDeck(accessToken, folderId, entry, num) {
    const enName = entry.files && entry.files.en;
    const zhName = entry.files && entry.files.zh;
    if (!entry.id || !entry.method || !enName || !zhName) return null;
    const listed = await listByName(accessToken, folderId, [enName, zhName]);
    if (listed === null) return shellDeck(entry, num, 'error', '', '');
    const enFile = listed.find((f) => f.name === enName);
    const zhFile = listed.find((f) => f.name === zhName);
    if (!enFile || !zhFile) return shellDeck(entry, num, 'denied', '', '');
    const [enResult, zhResult] = await Promise.all([
      getFileMediaWithStatus(accessToken, enFile.id),
      getFileMediaWithStatus(accessToken, zhFile.id),
    ]);
    const worst = pickWorstStatus(enResult.status, zhResult.status);
    return shellDeck(entry, num, worst, enResult.text || '', zhResult.text || '');
  }

  function shellDeck(entry, num, access, enText, zhText) {
    return {
      id: entry.id,
      method: entry.method,
      num: num,
      titleEn: entry.titleEn || entry.id,
      titleZh: entry.titleZh || entry.id,
      en: enText,
      zh: zhText,
      private: true,
      access: access,
    };
  }

  function pickWorstStatus(a, b) {
    if (a === 'error' || b === 'error') return 'error';
    if (a === 'denied' || b === 'denied') return 'denied';
    return 'ok';
  }

  async function listByName(accessToken, folderId, names) {
    const nameClauses = names.map((n) => "name='" + n.replace(/'/g, "\\'") + "'").join(' or ');
    const q = "'" + folderId + "' in parents and (" + nameClauses + ") and trashed=false";
    const params = new URLSearchParams({ q: q, fields: 'files(id,name)', pageSize: '50' });
    try {
      const resp = await fetch(DRIVE_API + '?' + params.toString(), {
        headers: { Authorization: 'Bearer ' + accessToken },
      });
      if (resp.status === 403 || resp.status === 401) return null;
      if (!resp.ok) return [];
      const payload = await resp.json();
      return Array.isArray(payload.files) ? payload.files : [];
    } catch { return null; }
  }

  async function getFileMedia(accessToken, fileId) {
    const r = await getFileMediaWithStatus(accessToken, fileId);
    return r.status === 'ok' ? r.text : null;
  }

  async function getFileMediaWithStatus(accessToken, fileId) {
    try {
      const resp = await fetch(DRIVE_API + '/' + encodeURIComponent(fileId) + '?alt=media', {
        headers: { Authorization: 'Bearer ' + accessToken },
      });
      if (resp.status === 403 || resp.status === 404 || resp.status === 401) {
        return { status: 'denied', text: null };
      }
      if (!resp.ok) return { status: 'error', text: null };
      return { status: 'ok', text: await resp.text() };
    } catch { return { status: 'error', text: null }; }
  }

  window.privateDecksClient = { fetchPrivateDecks: fetchPrivateDecks, _resetPrivateDecksCache: _resetPrivateDecksCache };
})();
