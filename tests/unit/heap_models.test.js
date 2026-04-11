const test = require('node:test');
const assert = require('node:assert/strict');
const { createHeapModel } = require('../../heap_models');

const heapModes = [
    'heap-binary',
    'heap-binomial',
    'heap-fibonacci',
    'heap-leftist',
    'heap-skew',
];

for (const mode of heapModes) {
    test(`${mode}: min-heap invariant with full operations`, () => {
        const h = createHeapModel(mode, true);
        [10, 4, 17, 2, 30, 8].forEach(v => h.insert(v));
        assert.equal(h.validate(), true);
        assert.equal(h.peek().value, 2);

        h.changeKey(17, 1);
        assert.equal(h.validate(), true);
        assert.equal(h.peek().value, 1);

        h.deleteValue(8);
        assert.equal(h.validate(), true);

        const extracted = h.extract();
        assert.equal(extracted.ok, true);
        assert.equal(extracted.value, 1);
        assert.equal(h.validate(), true);

        h.merge([3, 5, 6]);
        assert.equal(h.validate(), true);
        assert.equal(h.peek().value, 2);
    });

    test(`${mode}: max-heap invariant with comparator switch`, () => {
        const h = createHeapModel(mode, false);
        [9, 1, 14, 7, 3, 11].forEach(v => h.insert(v));
        assert.equal(h.validate(), true);
        assert.equal(h.peek().value, 14);

        h.changeKey(1, 20);
        assert.equal(h.validate(), true);
        assert.equal(h.peek().value, 20);

        h.setOrder(true);
        assert.equal(h.validate(), true);
        assert.equal(h.peek().value, 3);
    });
}
