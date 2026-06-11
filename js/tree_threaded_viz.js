(function (global) {
  function makeNode(val) { return { val: val, left: null, right: null, id: 'th-' + val }; }
  function insert(root, val) {
    if (!root) return makeNode(val);
    if (val < root.val) root.left = insert(root.left, val);
    else if (val > root.val) root.right = insert(root.right, val);
    return root;
  }
  function buildTreeFromValues(vals) { let r = null; for (const v of vals) r = insert(r, v); return r; }
  const SAMPLE = [50, 30, 70, 20, 40, 60, 80];

  function inorderNodes(root) {
    const out = [];
    (function rec(n) { if (!n) return; rec(n.left); out.push(n); rec(n.right); })(root);
    return out;
  }

  function buildThreadedFrames(root) {
    const order = inorderNodes(root);
    const inorder = order.map((n) => n.val);
    const threads = [];
    for (let i = 0; i < order.length; i++) {
      if (!order[i].right && i + 1 < order.length) {
        threads.push({ fromId: order[i].id, toId: order[i + 1].id, fromVal: order[i].val, toVal: order[i + 1].val });
      }
    }
    const frames = [];
    const visited = [];
    const snap = (current, usingThread, msg) => frames.push({
      current, threads: threads.map((t) => ({ fromId: t.fromId, toId: t.toId })),
      visited: visited.slice(), usingThread, msg
    });
    snap(null, false, { zh: '建立引線:右指標為空者指向中序後繼', en: 'Build threads: each null-right node points to its inorder successor' });
    for (let i = 0; i < order.length; i++) {
      visited.push(order[i].val);
      const usingThread = i > 0 && !order[i - 1].right;
      snap(order[i].id, usingThread, usingThread
        ? { zh: '沿引線到達後繼 ' + order[i].val, en: 'Follow thread to successor ' + order[i].val }
        : { zh: '造訪 ' + order[i].val + '(往右子樹最左)', en: 'Visit ' + order[i].val + ' (go to right-subtree leftmost)' });
    }
    snap(null, false, { zh: '中序走訪完成(未使用堆疊)', en: 'Inorder traversal done (no stack used)' });
    return { frames, inorder, threads };
  }

  const api = { makeNode, insert, buildTreeFromValues, inorderNodes, buildThreadedFrames, SAMPLE };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.ThreadedViz = api;
})(typeof window !== 'undefined' ? window : globalThis);
