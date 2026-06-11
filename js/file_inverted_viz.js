(function (global) {
  'use strict';

  function tokenize(s) { return String(s).toLowerCase().split(/[^a-z0-9]+/).filter(Boolean); }

  function buildInverted(docs) {
    const index = {};
    (docs || []).forEach((doc, di) => {
      const seen = {};
      tokenize(doc).forEach((tok) => {
        if (!seen[tok]) { seen[tok] = true; (index[tok] = index[tok] || []).push(di); }
      });
    });
    return index;
  }

  function buildFrames(docs) {
    const index = {};
    const frames = [];
    function snap(active) { const copy = {}; Object.keys(index).forEach((k) => { copy[k] = index[k].slice(); }); return { index: copy, active: active }; }
    (docs || []).forEach((doc, di) => {
      const seen = {};
      tokenize(doc).forEach((tok) => {
        if (!seen[tok]) { seen[tok] = true; (index[tok] = index[tok] || []).push(di); frames.push(snap({ doc: di, term: tok })); }
      });
    });
    frames.push(snap(null));
    return { frames: frames, index: index };
  }

  function queryFrames(index, term) {
    term = String(term).toLowerCase();
    const postings = (index[term] || []).slice();
    return { frames: [{ term: term, postings: postings }], postings: postings };
  }

  const api = { tokenize: tokenize, buildInverted: buildInverted, buildFrames: buildFrames, queryFrames: queryFrames, SAMPLE_DOCS: ['the cat sat on the mat', 'the dog ran fast', 'cat and dog play', 'a quick brown fox'] };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.FileInvertedViz = api;
})(typeof window !== 'undefined' ? window : globalThis);
