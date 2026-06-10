(function (global) {
  function makeNode(val) { return { val: val, left: null, right: null, id: 'tt-' + val }; }

  function insertBST(root, val) {
    if (root === null) return makeNode(val);
    if (val < root.val) root.left = insertBST(root.left, val);
    else if (val > root.val) root.right = insertBST(root.right, val);
    return root; // duplicates ignored
  }

  function buildTreeFromValues(vals) {
    let root = null;
    for (const v of vals) root = insertBST(root, v);
    return root;
  }

  const SAMPLE_VALUES = [50, 30, 70, 20, 40, 60, 80];

  function buildTraversalFrames(root, order, mode) {
    const frames = [];
    const visited = [];
    function snap(current, kind, items, msg) {
      frames.push({
        current: current ? current.id : null,
        visited: visited.slice(),
        aux: { kind: kind, items: items.slice() },
        msg: msg
      });
    }

    if (order === 'levelorder') {
      const queue = [];
      if (root) queue.push(root);
      snap(null, 'queue', queue.map(n => n.val), { zh: '初始化:根節點入佇列', en: 'Init: enqueue root' });
      while (queue.length) {
        const node = queue.shift();
        visited.push(node.val);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
        snap(node, 'queue', queue.map(n => n.val),
          { zh: '出佇列並造訪 ' + node.val + ',子節點入佇列', en: 'Dequeue & visit ' + node.val + ', enqueue children' });
      }
      snap(null, 'queue', [], { zh: '完成,佇列已空', en: 'Done; queue empty' });
      return frames;
    }

    if (mode === 'recursive') {
      const callstack = [];
      function rec(node) {
        if (!node) return;
        callstack.push(node.val);
        if (order === 'preorder') { visited.push(node.val); snap(node, 'callstack', callstack, { zh: '造訪 ' + node.val + '(前序:訪問→左→右)', en: 'Visit ' + node.val + ' (pre: node→L→R)' }); }
        else snap(node, 'callstack', callstack, { zh: '進入 ' + node.val, en: 'Enter ' + node.val });
        rec(node.left);
        if (order === 'inorder') { visited.push(node.val); snap(node, 'callstack', callstack, { zh: '造訪 ' + node.val + '(中序:左→訪問→右)', en: 'Visit ' + node.val + ' (in: L→node→R)' }); }
        rec(node.right);
        if (order === 'postorder') { visited.push(node.val); snap(node, 'callstack', callstack, { zh: '造訪 ' + node.val + '(後序:左→右→訪問)', en: 'Visit ' + node.val + ' (post: L→R→node)' }); }
        callstack.pop();
      }
      snap(null, 'callstack', [], { zh: '開始遞迴走訪', en: 'Begin recursive traversal' });
      rec(root);
      snap(null, 'callstack', [], { zh: '完成', en: 'Done' });
      return frames;
    }

    // iterative
    const stack = [];
    if (order === 'preorder') {
      if (root) stack.push(root);
      snap(null, 'stack', stack.map(n => n.val), { zh: '根入堆疊', en: 'Push root' });
      while (stack.length) {
        const node = stack.pop();
        visited.push(node.val);
        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);
        snap(node, 'stack', stack.map(n => n.val), { zh: '彈出並造訪 ' + node.val + ',右、左子入堆疊', en: 'Pop & visit ' + node.val + ', push R then L' });
      }
    } else if (order === 'inorder') {
      let curr = root;
      while (curr || stack.length) {
        while (curr) { stack.push(curr); snap(curr, 'stack', stack.map(n => n.val), { zh: '沿左鏈下推 ' + curr.val, en: 'Go left, push ' + curr.val }); curr = curr.left; }
        const node = stack.pop();
        visited.push(node.val);
        snap(node, 'stack', stack.map(n => n.val), { zh: '彈出並造訪 ' + node.val + ',轉向右子', en: 'Pop & visit ' + node.val + ', go right' });
        curr = node.right;
      }
    } else { // postorder, two-stack
      const s2 = [];
      if (root) stack.push(root);
      while (stack.length) {
        const node = stack.pop();
        s2.push(node);
        if (node.left) stack.push(node.left);
        if (node.right) stack.push(node.right);
        snap(node, 'stack', stack.map(n => n.val), { zh: '搬移 ' + node.val + ' 到輸出堆疊', en: 'Move ' + node.val + ' to out-stack' });
      }
      while (s2.length) {
        const node = s2.pop();
        visited.push(node.val);
        snap(node, 'stack', s2.map(n => n.val), { zh: '從輸出堆疊彈出並造訪 ' + node.val, en: 'Pop out-stack & visit ' + node.val });
      }
    }
    snap(null, 'stack', [], { zh: '完成', en: 'Done' });
    return frames;
  }

  const api = { makeNode, insertBST, buildTreeFromValues, buildTraversalFrames, SAMPLE_VALUES };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.TreeTraversalViz = api;
})(typeof window !== 'undefined' ? window : globalThis);
