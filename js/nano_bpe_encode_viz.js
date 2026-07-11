(function (global) {
  // Greedy longest-match BPE encode over a trie built from `vocab`.
  function buildTrie(vocab) {
    const root = {};
    for (const tok of vocab) {
      let n = root;
      for (const ch of tok) { n = (n[ch] = n[ch] || {}); }
      n.$ = tok; // token terminal
    }
    return root;
  }
  function buildFrames(vocab, input) {
    const root = buildTrie(vocab);
    const frames = [];
    const tokens = [];
    const push = (o) => frames.push(Object.assign(
      { cursor: 0, node: '', matchStart: 0, matchEnd: 0, lastToken: null, tokens: tokens.slice(), status: 'walk' }, o));
    push({ status: 'walk', msg: { en: 'start at position 0', zh: '從位置 0 開始' } });
    let i = 0;
    while (i < input.length) {
      let n = root, j = i, best = -1, bestTok = null;
      while (j < input.length && n[input[j]]) {
        n = n[input[j]];
        j++;
        push({ cursor: i, matchStart: i, matchEnd: j, node: input.slice(i, j), lastToken: n.$ || bestTok,
               status: 'walk', msg: { en: 'match "' + input.slice(i, j) + '"', zh: '比對 "' + input.slice(i, j) + '"' } });
        if (n.$) { best = j; bestTok = n.$; }
      }
      let tok, end;
      if (best >= 0) { tok = bestTok; end = best; }
      else { tok = input[i]; end = i + 1; } // byte fallback for unknown char
      tokens.push(tok);
      push({ cursor: i, matchStart: i, matchEnd: end, lastToken: tok, tokens: tokens.slice(),
             status: 'emit', msg: { en: 'emit token "' + tok + '"', zh: '輸出 token "' + tok + '"' } });
      i = end;
      if (i < input.length) push({ cursor: i, status: 'restart',
        msg: { en: 'restart at position ' + i, zh: '從位置 ' + i + ' 重新開始' } });
    }
    push({ cursor: input.length, tokens: tokens.slice(), status: 'done',
           msg: { en: 'done: ' + tokens.length + ' tokens', zh: '完成：' + tokens.length + ' 個 token' } });
    return { frames, vocab, input };
  }
  const api = { buildFrames };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.NanoBpeEncodeViz = api;
})(typeof window !== 'undefined' ? window : globalThis);
