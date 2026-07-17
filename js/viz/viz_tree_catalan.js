(function (global) {
    const K = () => global.VizKit;

    // Compact SVG for one unlabeled binary-tree shape (null = empty tree).
    function shapeSVG(shape) {
        if (!shape) return '<span class="cat-empty">∅</span>';
        const W = 64, H = 66;
        const nodes = [], edges = [];
        (function place(s, x, y, dx) {
            const id = nodes.length; nodes.push({ x, y });
            if (s.left) { const c = place(s.left, x - dx, y + 18, Math.max(7, dx * 0.6)); edges.push([id, c]); }
            if (s.right) { const c = place(s.right, x + dx, y + 18, Math.max(7, dx * 0.6)); edges.push([id, c]); }
            return id;
        })(shape, W / 2, 9, 15);
        let s = '<svg width="' + W + '" height="' + H + '" class="cat-shape">';
        edges.forEach(([a, b]) => { s += '<line x1="' + nodes[a].x + '" y1="' + nodes[a].y + '" x2="' + nodes[b].x + '" y2="' + nodes[b].y + '" stroke="#94a3b8" stroke-width="1.5"/>'; });
        nodes.forEach((nd) => { s += '<circle cx="' + nd.x + '" cy="' + nd.y + '" r="5" fill="#1a4d8f"/>'; });
        return s + '</svg>';
    }

    let _state = null;
    function renderTreeCatalan() {
        const host = K().acquireDynamicVizHost();
        if (!_state) _state = { n: 3 };
        const st = _state;
        const langOf = K().langOf;
        const res = TreeCatalanViz.buildCatalanFrames(st.n);
        const frames = res.frames;
        const seq = TreeCatalanViz.catalanSequence(10);
        let idx = 0;

        const nBtns = [0, 1, 2, 3, 4].map((k) => '<button type="button" class="cat-nbtn' + (k === st.n ? ' active' : '') + '" data-n="' + k + '">n=' + k + '</button>').join('');
        const seqRows = seq.map((r) => '<tr class="cat-seq-row" data-n="' + r.n + '"><td>C' + r.n + '</td><td>' + r.recurrence + '</td><td>' + r.closed + '</td><td>' + (r.recurrence === r.closed ? '✓' : '✗') + '</td></tr>').join('');

        host.innerHTML =
            '<div class="cat-controls"><span class="sm-hint">' + langOf({ zh: '選 n,枚舉全部 Cₙ 種二元樹形狀(依左子樹大小分組)', en: 'pick n; enumerate all Cₙ binary-tree shapes (grouped by left-subtree size)' }) + '</span></div>' +
            '<div class="cat-ns">' + nBtns + '</div>' +
            '<div class="cat-groups"></div>' +
            '<div class="cat-total"></div>' +
            '<div class="cat-verdict"></div>' +
            '<div class="cat-seqwrap"><div class="cat-seqtitle">' + langOf({ zh: 'Catalan 數 C₀…C₁₀(遞迴 vs 封閉形)', en: 'Catalan numbers C₀…C₁₀ (recurrence vs closed form)' }) + '</div>' +
              '<table class="cat-seq"><thead><tr><th>n</th><th>' + langOf({ zh: '遞迴', en: 'recur.' }) + '</th><th>' + langOf({ zh: '封閉形', en: 'closed' }) + '</th><th>=</th></tr></thead><tbody>' + seqRows + '</tbody></table></div>' +
            '<div class="et-phase"></div>';

        function paint() {
            const fr = frames[idx];
            if (!host.querySelector('.cat-groups')) return;
            const shown = frames.slice(0, idx + 1).filter((f) => f.action === 'group');
            host.querySelector('.cat-groups').innerHTML = shown.map((g) =>
                '<div class="cat-group"><div class="cat-ghead">' +
                    (g.n === 0 ? langOf({ zh: '空樹', en: 'empty tree' })
                        : ('C' + g.leftSize + '·C' + g.rightSize + ' = ' + g.ci + '·' + g.crest + ' = ' + g.product)) +
                '</div><div class="cat-shapes">' + g.groupShapes.map(shapeSVG).join('') + '</div></div>').join('');
            host.querySelector('.cat-total').textContent = langOf({ zh: '累計形狀數 = ', en: 'shapes so far = ' }) + fr.runningTotal;
            const v = host.querySelector('.cat-verdict');
            if (fr.action === 'done') { v.className = 'cat-verdict cat-ok'; v.textContent = langOf(fr.msg); }
            else { v.className = 'cat-verdict'; v.textContent = ''; }
            host.querySelector('.et-phase').textContent = langOf(fr.msg);
        }
        function step() { if (idx < frames.length - 1) { idx++; paint(); return idx < frames.length - 1; } return false; }
        function reset() { idx = 0; paint(); }

        host.appendChild(K().buildStepControls(step, reset, 800));
        paint();

        host.querySelectorAll('.cat-nbtn').forEach((b) => { b.onclick = () => { const k = parseInt(b.getAttribute('data-n'), 10); if (k !== st.n) { st.n = k; renderTreeCatalan(); } }; });
    }

    global.VizRegistry.attach('tree-catalan', {
        render: renderTreeCatalan,
        code: () => (typeof codeTreeCatalan !== 'undefined' ? codeTreeCatalan : ''),
        layout: { host: 'dynamic' },
    });
})(typeof window !== 'undefined' ? window : globalThis);
