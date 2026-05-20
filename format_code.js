'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const REPO_ROOT = __dirname;
const CLANG_FORMAT = path.join(REPO_ROOT, 'node_modules', '.bin', 'clang-format');

function cppFiles() {
  return fs.readdirSync(REPO_ROOT)
    .filter((name) => name.endsWith('.cpp'))
    .map((name) => path.join(REPO_ROOT, name))
    .sort();
}

function formatCppFile(absPath) {
  // -i edits the file in place; --style=file makes clang-format walk up to
  // find the nearest .clang-format. The file's directory is used as CWD.
  execFileSync(CLANG_FORMAT, ['-i', '--style=file', absPath], {
    cwd: path.dirname(absPath),
    stdio: 'pipe',
  });
}

function compileCheck(absPath) {
  try {
    execFileSync('g++', ['-std=c++17', '-fsyntax-only', absPath], {
      cwd: path.dirname(absPath),
      stdio: 'pipe',
    });
  } catch (err) {
    const stderr = (err.stderr && err.stderr.toString()) || '';
    const stdout = (err.stdout && err.stdout.toString()) || '';
    throw new Error('compileCheck failed for ' + absPath + '\n' + stderr + stdout);
  }
}

function formatCppString(code) {
  // --assume-filename=x.cpp tells clang-format the language; stdin/stdout used.
  const out = execFileSync(CLANG_FORMAT,
    ['--style=file', '--assume-filename=x.cpp'],
    { cwd: REPO_ROOT, input: code, stdio: ['pipe', 'pipe', 'pipe'] });
  return out.toString();
}

module.exports = { cppFiles, formatCppFile, compileCheck, formatCppString };
