(function (global) {
  const DIRS = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // N, E, S, W

  function parseMaze(text) {
    const grid = String(text).split(';').map((row) => row.split(''));
    let start = null, end = null;
    for (let r = 0; r < grid.length; r++)
      for (let c = 0; c < grid[r].length; c++) {
        if (grid[r][c] === 'S') start = [r, c];
        else if (grid[r][c] === 'E') end = [r, c];
      }
    return { grid, start, end, rows: grid.length, cols: grid[0] ? grid[0].length : 0 };
  }

  function buildMazeFrames(maze) {
    const { grid, start, end, rows } = maze;
    const key = (r, c) => r + ',' + c;
    const open = (r, c) => r >= 0 && r < rows && c >= 0 && grid[r] && c < grid[r].length && grid[r][c] !== '#';
    const visited = new Set();
    const stack = [];
    const frames = [];
    const snap = (current, action, path, msg) => frames.push({
      current: current ? current.slice() : null,
      visited: Array.from(visited).map((s) => s.split(',').map(Number)),
      stack: stack.map((p) => p.slice()),
      action, path: path ? path.map((p) => p.slice()) : null, msg
    });
    if (!start || !end) { snap(null, 'deadend', null, { zh: '缺少起點或終點', en: 'Missing start or end' }); return { frames, path: null }; }

    stack.push(start); visited.add(key(start[0], start[1]));
    snap(start, 'visit', null, { zh: '從起點 S 開始,推入堆疊', en: 'Start at S; push onto stack' });
    let found = null;
    while (stack.length) {
      const [r, c] = stack[stack.length - 1];
      if (r === end[0] && c === end[1]) { found = stack.map((p) => p.slice()); snap([r, c], 'found', found, { zh: '到達終點 E!堆疊內容即為路徑', en: 'Reached E! The stack is the path' }); break; }
      let moved = false;
      for (const [dr, dc] of DIRS) {
        const nr = r + dr, nc = c + dc;
        if (open(nr, nc) && !visited.has(key(nr, nc))) {
          visited.add(key(nr, nc)); stack.push([nr, nc]);
          snap([nr, nc], 'visit', null, { zh: '前進到 (' + nr + ',' + nc + '),推入堆疊', en: 'Advance to (' + nr + ',' + nc + '); push' });
          moved = true; break;
        }
      }
      if (!moved) { const dead = stack.pop(); snap(dead, 'backtrack', null, { zh: '死路,回溯(彈出)', en: 'Dead end; backtrack (pop)' }); }
    }
    if (!found) snap(null, 'deadend', null, { zh: '堆疊已空,此迷宮無解', en: 'Stack empty; maze has no solution' });
    return { frames, path: found };
  }

  const api = { parseMaze, buildMazeFrames, DIRS };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.MazeViz = api;
})(typeof window !== 'undefined' ? window : globalThis);
