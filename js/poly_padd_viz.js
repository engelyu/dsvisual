(function (global) {
  function parsePoly(str) {
    const terms = String(str).split(',').map((s) => s.trim()).filter((s) => s.length).map((s) => {
      const parts = s.split(':');
      return { coef: parseInt(parts[0], 10), exp: parseInt(parts[1], 10) };
    }).filter((t) => Number.isFinite(t.coef) && Number.isFinite(t.exp));
    terms.sort((a, b) => b.exp - a.exp);
    return terms;
  }

  function formatPoly(poly) {
    if (!poly.length) return '0';
    return poly.map((t, idx) => {
      const sign = t.coef < 0 ? '- ' : (idx === 0 ? '' : '+ ');
      const mag = Math.abs(t.coef);
      let body;
      if (t.exp === 0) body = String(mag);
      else if (t.exp === 1) body = (mag === 1 ? 'x' : mag + 'x');
      else body = (mag === 1 ? 'x^' + t.exp : mag + 'x^' + t.exp);
      return sign + body;
    }).join(' ');
  }

  function buildPaddFrames(A, B) {
    const frames = [];
    const result = [];
    let i = 0, j = 0;
    const snap = (action, msg) => frames.push({ i, j, action, result: result.map((t) => ({ coef: t.coef, exp: t.exp })), msg });
    snap('start', { zh: '開始合併兩多項式(依指數遞減)', en: 'Begin merging by descending exponent' });
    while (i < A.length && j < B.length) {
      if (A[i].exp > B[j].exp) { result.push({ coef: A[i].coef, exp: A[i].exp }); snap('takeA', { zh: 'A 指數較大,取 A 項', en: 'A has higher exponent — take A term' }); i++; }
      else if (A[i].exp < B[j].exp) { result.push({ coef: B[j].coef, exp: B[j].exp }); snap('takeB', { zh: 'B 指數較大,取 B 項', en: 'B has higher exponent — take B term' }); j++; }
      else {
        const sum = A[i].coef + B[j].coef;
        if (sum !== 0) result.push({ coef: sum, exp: A[i].exp });
        snap('add', { zh: '指數相同,係數相加 = ' + sum + (sum === 0 ? '(為 0,捨去)' : ''), en: 'Same exponent — add coefficients = ' + sum + (sum === 0 ? ' (zero, dropped)' : '') });
        i++; j++;
      }
    }
    while (i < A.length) { result.push({ coef: A[i].coef, exp: A[i].exp }); snap('takeA', { zh: '附加 A 剩餘項', en: 'Append remaining A term' }); i++; }
    while (j < B.length) { result.push({ coef: B[j].coef, exp: B[j].exp }); snap('takeB', { zh: '附加 B 剩餘項', en: 'Append remaining B term' }); j++; }
    snap('done', { zh: '完成,結果 = ' + formatPoly(result), en: 'Done; result = ' + formatPoly(result) });
    return { frames, result };
  }

  const api = { parsePoly, formatPoly, buildPaddFrames };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.PolyViz = api;
})(typeof window !== 'undefined' ? window : globalThis);
