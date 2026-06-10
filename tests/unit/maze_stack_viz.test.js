const test = require('node:test');
const assert = require('node:assert/strict');
const { parseMaze, buildMazeFrames } = require('../../js/maze_stack_viz');

const SOLVABLE = 'S....;.###.;.#...;.#.#.;...#E';
const UNSOLVABLE = 'S..;.##;.#E';

test('parseMaze locates S and E', () => {
  const m = parseMaze(SOLVABLE);
  assert.deepEqual(m.start, [0, 0]);
  assert.deepEqual(m.end, [4, 4]);
  assert.equal(m.rows, 5);
  assert.equal(m.cols, 5);
});

test('solvable maze yields a valid path from S to E', () => {
  const m = parseMaze(SOLVABLE);
  const { path } = buildMazeFrames(m);
  assert.ok(path, 'expected a path');
  assert.deepEqual(path[0], [0, 0]);
  assert.deepEqual(path[path.length - 1], [4, 4]);
  for (let i = 1; i < path.length; i++) {
    const d = Math.abs(path[i][0] - path[i - 1][0]) + Math.abs(path[i][1] - path[i - 1][1]);
    assert.equal(d, 1, 'consecutive cells must be adjacent');
  }
  for (const [r, c] of path) assert.notEqual(m.grid[r][c], '#', 'path must avoid walls');
});

test('unsolvable maze yields no path and empties the stack', () => {
  const m = parseMaze(UNSOLVABLE);
  const { frames, path } = buildMazeFrames(m);
  assert.equal(path, null);
  assert.equal(frames[frames.length - 1].stack.length, 0);
});

test('frames carry bilingual msg and stack/visited snapshots', () => {
  const { frames } = buildMazeFrames(parseMaze(SOLVABLE));
  for (const f of frames) { assert.ok(f.msg.zh && f.msg.en); assert.ok(Array.isArray(f.stack) && Array.isArray(f.visited)); }
});
