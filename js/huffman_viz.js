(function (global) {
  function computeFrequencies(text) {
    const map = new Map();
    for (const ch of text) {
      const key = ch === ' ' ? '␣' : ch;
      map.set(key, (map.get(key) || 0) + 1);
    }
    const arr = Array.from(map, ([sym, freq]) => ({ sym, freq }));
    arr.sort((a, b) => a.freq - b.freq || (a.sym < b.sym ? -1 : a.sym > b.sym ? 1 : 0));
    return arr;
  }

  function buildHuffmanFrames(freqs) {
    let seq = 0;
    const nodes = {};
    function node(props) {
      const id = 'hf-' + seq++;
      nodes[id] = Object.assign({ id: id, freq: 0, sym: null, left: null, right: null, seq: seq }, props);
      return id;
    }
    let forest = freqs.map(f => node({ freq: f.freq, sym: f.sym }));
    const frames = [];
    const orderForest = () => forest.sort((a, b) => nodes[a].freq - nodes[b].freq || nodes[a].seq - nodes[b].seq);
    const pqView = () => orderForest().map(id => ({ sym: nodes[id].sym, freq: nodes[id].freq, id }));
    function snap(picked, merged, phase, msg) {
      frames.push({ forestRoots: forest.slice(), pq: pqView().map(x => ({ sym: x.sym, freq: x.freq })), picked: picked, merged: merged, phase: phase, msg: msg });
    }

    snap(null, null, 'init', { zh: '初始化:每個符號各成一棵單節點樹', en: 'Init: each symbol is a single-node tree' });

    if (forest.length === 1) {
      const only = forest[0];
      const codes = {}; codes[nodes[only].sym] = '0';
      snap(null, null, 'done', { zh: '只有一種符號,給定 1 位元碼', en: 'Single symbol: assign 1-bit code' });
      return { frames, codes, nodes, root: only };
    }

    while (forest.length > 1) {
      orderForest();
      const a = forest[0], b = forest[1];
      snap([a, b], null, 'pick', { zh: '取出兩個最小頻率:' + nodes[a].freq + ' 與 ' + nodes[b].freq, en: 'Pick two smallest: ' + nodes[a].freq + ' and ' + nodes[b].freq });
      const m = node({ freq: nodes[a].freq + nodes[b].freq, left: a, right: b });
      forest = forest.slice(2);
      forest.push(m);
      snap([a, b], m, 'merge', { zh: '合併為頻率 ' + nodes[m].freq + ' 的新節點', en: 'Merge into new node, freq ' + nodes[m].freq });
    }

    const root = forest[0];
    const codes = {};
    (function assign(id, prefix) {
      const n = nodes[id];
      if (n.left === null && n.right === null) { codes[n.sym] = prefix || '0'; return; }
      if (n.left) assign(n.left, prefix + '0');
      if (n.right) assign(n.right, prefix + '1');
    })(root, '');
    snap(null, null, 'done', { zh: '完成 Huffman 樹,產生前綴碼', en: 'Huffman tree complete; prefix codes generated' });
    return { frames, codes, nodes, root };
  }

  const api = { computeFrequencies, buildHuffmanFrames };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.HuffmanViz = api;
})(typeof window !== 'undefined' ? window : globalThis);
