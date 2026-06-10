(function (global) {
  function buildMwayFrames(keys, m) {
    let idc = 0;
    const newNode = (k) => ({ id: 'mw-' + (idc++), keys: [k], children: [null, null] });
    const clone = (n) => n ? { id: n.id, keys: n.keys.slice(), children: n.children.map(clone) } : null;
    let root = null;
    const frames = [];
    const snap = (current, key, path, msg) => frames.push({ tree: clone(root), current, insertedKey: key, descendPath: path.slice(), msg });

    snap(null, null, [], { zh: '空的 m-way 搜尋樹(m = ' + m + ')', en: 'Empty m-way search tree (m = ' + m + ')' });
    for (const key of keys) {
      if (!root) { root = newNode(key); snap(root.id, key, [root.id], { zh: '建立根節點,放入 ' + key, en: 'Create root holding ' + key }); continue; }
      let p = root; const path = [];
      while (true) {
        path.push(p.id);
        let i = 0;
        while (i < p.keys.length && key > p.keys[i]) i++;
        if (i < p.keys.length && p.keys[i] === key) { snap(p.id, key, path, { zh: key + ' 已存在,略過', en: key + ' already present; skip' }); break; }
        if (p.children[i] === null) {
          if (p.keys.length < m - 1) {
            p.keys.splice(i, 0, key); p.children.splice(i, 0, null);
            snap(p.id, key, path, { zh: '節點未滿,於位置 ' + i + ' 插入 ' + key, en: 'Node has room; insert ' + key + ' at slot ' + i });
          } else {
            p.children[i] = newNode(key); path.push(p.children[i].id);
            snap(p.children[i].id, key, path, { zh: '節點已滿,新建子節點放 ' + key, en: 'Node full; create child holding ' + key });
          }
          break;
        }
        p = p.children[i];
      }
    }
    return { frames, tree: root };
  }

  const api = { buildMwayFrames };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.MwayViz = api;
})(typeof window !== 'undefined' ? window : globalThis);
