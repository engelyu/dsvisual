(function (global) {
  function buildNodes(vals, circular) {
    const n = vals.length;
    return vals.map((v, i) => ({
      val: v,
      prevVal: i > 0 ? vals[i - 1] : (circular && n > 0 ? vals[n - 1] : null),
      nextVal: i < n - 1 ? vals[i + 1] : (circular && n > 0 ? vals[0] : null),
    }));
  }

  function buildDoublyFrames(vals, circular) {
    const nodes = buildNodes(vals, circular);
    const frames = [];
    const snap = (current, dir, msg) => frames.push({
      nodes: nodes.map((x) => ({ val: x.val, prevVal: x.prevVal, nextVal: x.nextVal })),
      current, dir, circular: !!circular, msg
    });
    snap(-1, 'forward', { zh: '建立雙向' + (circular ? '環狀' : '') + '串列', en: 'Build the ' + (circular ? 'circular ' : '') + 'doubly linked list' });
    for (let i = 0; i < nodes.length; i++) snap(i, 'forward', { zh: '沿 next 前進到 ' + nodes[i].val, en: 'Follow next to ' + nodes[i].val });
    for (let i = nodes.length - 1; i >= 0; i--) snap(i, 'backward', { zh: '沿 prev 回到 ' + nodes[i].val, en: 'Follow prev back to ' + nodes[i].val });
    snap(-1, 'forward', { zh: '完成正向與反向走訪', en: 'Forward & backward traversal complete' });
    return { frames, nodes };
  }

  const api = { buildNodes, buildDoublyFrames };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.DoublyViz = api;
})(typeof window !== 'undefined' ? window : globalThis);
