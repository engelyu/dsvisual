'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

// Load cloud-integration.js into a sandboxed window-like context.
function loadIntegration() {
  const code = fs.readFileSync(path.join(__dirname, '../../js/cloud-integration.js'), 'utf8');
  const sandbox = {
    window: {},
    globalThis: {},
    location: { protocol: 'http:' },
    firebase: undefined, // simulate Firebase SDK not loaded
  };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox.window;
}

test('cloud-integration: exports both drive.file and drive.readonly in DRIVE_SCOPES', () => {
  const w = loadIntegration();
  assert.ok(Array.isArray(w.DRIVE_SCOPES));
  assert.equal(w.DRIVE_SCOPES.length, 2);
  assert.ok(w.DRIVE_SCOPES.includes('https://www.googleapis.com/auth/drive.file'));
  assert.ok(w.DRIVE_SCOPES.includes('https://www.googleapis.com/auth/drive.readonly'));
});

test('cloud-integration: cloudClient() returns the same instance on repeated calls', () => {
  const w = loadIntegration();
  const a = w.cloudClient();
  const b = w.cloudClient();
  assert.equal(a, b);
});

test('cloud-integration: getAccessToken() returns null in stub mode', () => {
  const w = loadIntegration();
  const c = w.cloudClient();
  assert.equal(typeof c.getAccessToken, 'function');
  assert.equal(c.getAccessToken(), null);
});

test('cloud-integration: getUser() returns null in stub mode', () => {
  const w = loadIntegration();
  const c = w.cloudClient();
  assert.equal(typeof c.getUser, 'function');
  assert.equal(c.getUser(), null);
});
