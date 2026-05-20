const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const f = require('../../format_code');

test('cppFiles returns every .cpp in repo root', () => {
  const files = f.cppFiles();
  assert.ok(files.length >= 50, 'expected at least 50 .cpp files, got ' + files.length);
  assert.ok(files.every((p) => p.endsWith('.cpp')));
  assert.ok(files.some((p) => p.endsWith('/stack_array.cpp')));
});

test('formatCppFile reformats and is idempotent', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'fmt-'));
  const file = path.join(tmp, 'sample.cpp');
  const messy = '#include <iostream>\nint   main(  ){int  x=1;return  x;}\n';
  fs.writeFileSync(file, messy);
  // Copy the repo's .clang-format into the temp dir so clang-format finds it
  fs.copyFileSync(path.join(__dirname, '..', '..', '.clang-format'), path.join(tmp, '.clang-format'));

  f.formatCppFile(file);
  const first = fs.readFileSync(file, 'utf8');
  assert.notEqual(first, messy);
  assert.ok(first.includes('int main()'));

  f.formatCppFile(file);
  const second = fs.readFileSync(file, 'utf8');
  assert.equal(second, first, 'formatting must be idempotent');

  fs.rmSync(tmp, { recursive: true, force: true });
});

test('compileCheck passes for syntactically-valid C++', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cc-'));
  const file = path.join(tmp, 'ok.cpp');
  fs.writeFileSync(file, '#include <iostream>\nint main() { std::cout << 1; return 0; }\n');
  assert.doesNotThrow(() => f.compileCheck(file));
  fs.rmSync(tmp, { recursive: true, force: true });
});

test('compileCheck throws on broken C++', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cc-'));
  const file = path.join(tmp, 'broken.cpp');
  fs.writeFileSync(file, 'int main() { int x = ; return 0; }\n');
  assert.throws(() => f.compileCheck(file), /broken\.cpp|error/i);
  fs.rmSync(tmp, { recursive: true, force: true });
});

test('formatCppString reformats a code string in memory', () => {
  const messy = 'int   sum(int  a,int  b){return  a+b;}';
  const clean = f.formatCppString(messy);
  assert.notEqual(clean, messy);
  assert.ok(clean.includes('int sum(int a, int b)'));
  // Idempotency
  assert.equal(f.formatCppString(clean), clean);
});
