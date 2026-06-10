const test = require('node:test');
const assert = require('node:assert/strict');

// Load i18n.js into a Node-compatible shape. The file targets the browser,
// so we mount a minimal globalThis stub before requiring it.
function loadI18n() {
    delete require.cache[require.resolve('../../js/i18n.js')];
    const stubLocalStorage = (() => {
        let store = {};
        return {
            getItem: (k) => (k in store ? store[k] : null),
            setItem: (k, v) => { store[k] = String(v); },
            removeItem: (k) => { delete store[k]; },
            _reset: () => { store = {}; },
        };
    })();
    const stubDoc = {
        documentElement: { lang: '' },
        addEventListener: () => {},
        dispatchEvent: () => {},
        querySelectorAll: () => [],
    };
    globalThis.window = globalThis;
    globalThis.localStorage = stubLocalStorage;
    globalThis.document = stubDoc;
    globalThis.navigator = { language: 'en-US' };
    globalThis.CustomEvent = class CustomEvent {
        constructor(type, init) { this.type = type; this.detail = (init || {}).detail; }
    };
    require('../../js/i18n.js');
    return globalThis.I18N;
}

test('t() returns the requested language', () => {
    const I18N = loadI18n();
    I18N._setTablesForTest({ zh: { greet: '你好' }, en: { greet: 'Hello' } });
    I18N.setLanguage('en');
    assert.equal(I18N.t('greet'), 'Hello');
    I18N.setLanguage('zh');
    assert.equal(I18N.t('greet'), '你好');
});

test('t() substitutes {var} placeholders', () => {
    const I18N = loadI18n();
    I18N._setTablesForTest({ zh: { ratio: '{n} / {total}' }, en: { ratio: '{n} / {total}' } });
    I18N.setLanguage('en');
    assert.equal(I18N.t('ratio', { n: 3, total: 7 }), '3 / 7');
});

test('t() falls back to en when key missing in current lang', () => {
    const I18N = loadI18n();
    I18N._setTablesForTest({ zh: {}, en: { only: 'EN-only' } });
    I18N.setLanguage('zh');
    const warnings = [];
    const origWarn = console.warn;
    console.warn = (...args) => warnings.push(args);
    try {
        assert.equal(I18N.t('only'), 'EN-only');
        assert.ok(warnings.length === 1 && /missing key/.test(warnings[0][0]));
    } finally {
        console.warn = origWarn;
    }
});

test('t() returns the raw key when missing from both tables', () => {
    const I18N = loadI18n();
    I18N._setTablesForTest({ zh: {}, en: {} });
    I18N.setLanguage('en');
    const origWarn = console.warn;
    console.warn = () => {};
    try {
        assert.equal(I18N.t('truly.missing'), 'truly.missing');
    } finally {
        console.warn = origWarn;
    }
});

test('setLanguage() ignores unsupported language', () => {
    const I18N = loadI18n();
    I18N.setLanguage('zh');
    I18N.setLanguage('fr');
    assert.equal(I18N.getCurrentLanguage(), 'zh');
});
