(function (global) {
  function toTriples(matrix) {
    const out = [];
    for (let r = 0; r < matrix.length; r++)
      for (let c = 0; c < matrix[r].length; c++)
        if (matrix[r][c] !== 0) out.push({ r, c, v: matrix[r][c] });
    return out;
  }

  function buildFastTransposeFrames(matrix) {
    const rows = matrix.length;
    const cols = rows ? matrix[0].length : 0;
    const triples = toTriples(matrix);
    const frames = [];

    const rowSize = new Array(cols).fill(0);
    for (const t of triples) rowSize[t.c]++;
    frames.push({ phase: 'rowsize', rowSize: rowSize.slice(), startPos: [], placed: [], scan: -1, msg: { zh: '計算每欄非零數 rowSize[]', en: 'Count nonzeros per column: rowSize[]' } });

    const startPos = new Array(cols).fill(0);
    for (let c = 1; c < cols; c++) startPos[c] = startPos[c - 1] + rowSize[c - 1];
    frames.push({ phase: 'startpos', rowSize: rowSize.slice(), startPos: startPos.slice(), placed: [], scan: -1, msg: { zh: '前綴和求每欄起始位置 startPos[]', en: 'Prefix sums give each column start: startPos[]' } });

    const pos = startPos.slice();
    const placed = new Array(triples.length);
    for (let s = 0; s < triples.length; s++) {
      const t = triples[s];
      const dst = pos[t.c]++;
      placed[dst] = { r: t.c, c: t.r, v: t.v };
      frames.push({ phase: 'place', rowSize: rowSize.slice(), startPos: startPos.slice(), placed: placed.slice(), scan: s, msg: { zh: '放入 (' + t.r + ',' + t.c + ',' + t.v + ') → 轉置位置 ' + dst, en: 'Place (' + t.r + ',' + t.c + ',' + t.v + ') → transposed slot ' + dst } });
    }

    const transposed = [];
    for (let r = 0; r < cols; r++) transposed.push(new Array(rows).fill(0));
    for (const t of placed) if (t) transposed[t.r][t.c] = t.v;
    frames.push({ phase: 'done', rowSize: rowSize.slice(), startPos: startPos.slice(), placed: placed.slice(), scan: -1, msg: { zh: '完成轉置', en: 'Transpose complete' } });

    return { frames, triples, transposed };
  }

  const api = { toTriples, buildFastTransposeFrames };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.SparseViz = api;
})(typeof window !== 'undefined' ? window : globalThis);
