// tests/unit/dsvisual_render.test.js
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync, spawnSync } = require('node:child_process');

const hasGpp = spawnSync('g++', ['--version']).status === 0;

test('stack_svg emits an <svg> containing the values', { skip: !hasGpp && 'g++ not installed' }, () => {
  const repo = path.join(__dirname, '..', '..');
  const driver = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'svg-')), 'd.cpp');
  fs.writeFileSync(driver, [
    '#include "' + path.join(repo, 'cpp', 'viz', 'dsvisual_render.hpp') + '"',
    '#include <iostream>',
    'int main(){ std::cout << dsvisual::stack_svg({10,20,30}); return 0; }',
  ].join('\n'));
  const bin = driver.replace(/\.cpp$/, '');
  execFileSync('g++', ['-std=c++17', '-O0', '-o', bin, driver]);
  const out = execFileSync(bin).toString();
  assert.ok(out.includes('<svg'));
  assert.ok(out.includes('</svg>'));
  assert.ok(out.includes('10') && out.includes('20') && out.includes('30'));
});
