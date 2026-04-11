(function (global) {
    function cmpFactory(isMin) {
        return isMin ? (a, b) => a < b : (a, b) => a > b;
    }

    class BaseArrayHeapModel {
        constructor(type, isMin) {
            this.type = type;
            this.isMin = isMin;
            this.data = [];
            this.compare = cmpFactory(isMin);
            this.marked = new Set(); // for Fibonacci heap cascading-cut tracking
        }

        setOrder(isMin) {
            this.isMin = isMin;
            this.compare = cmpFactory(isMin);
            this.heapify();
            return [{ type: 'REBUILD' }];
        }

        clear() {
            this.data = [];
            this.marked.clear();
        }

        heapify() {
            for (let i = Math.floor(this.data.length / 2) - 1; i >= 0; i--) {
                this.siftDown(i);
            }
        }

        siftUp(i, events) {
            while (i > 0) {
                const p = Math.floor((i - 1) / 2);
                events.push({ type: 'COMPARE', a: i, b: p });
                if (!this.compare(this.data[i], this.data[p])) break;
                [this.data[i], this.data[p]] = [this.data[p], this.data[i]];
                events.push({ type: 'SWAP', a: i, b: p });
                i = p;
            }
        }

        siftDown(i, events) {
            let idx = i;
            while (true) {
                const l = 2 * idx + 1;
                const r = 2 * idx + 2;
                let best = idx;

                if (l < this.data.length) {
                    if (events) events.push({ type: 'COMPARE', a: l, b: best });
                    if (this.compare(this.data[l], this.data[best])) best = l;
                }

                if (r < this.data.length) {
                    if (events) events.push({ type: 'COMPARE', a: r, b: best });
                    if (this.compare(this.data[r], this.data[best])) best = r;
                }

                if (best === idx) break;
                [this.data[idx], this.data[best]] = [this.data[best], this.data[idx]];
                if (events) events.push({ type: 'SWAP', a: idx, b: best });
                idx = best;
            }
        }

        insert(value) {
            const events = [{ type: 'INSERT', value }];
            this.data.push(value);
            this.siftUp(this.data.length - 1, events);
            return { ok: true, events };
        }

        peek() {
            if (!this.data.length) return { ok: false, error: 'Heap is empty' };
            return { ok: true, value: this.data[0], events: [{ type: 'PEEK', index: 0 }] };
        }

        extract() {
            if (!this.data.length) return { ok: false, error: 'Heap is empty' };
            const events = [{ type: 'EXTRACT', index: 0, value: this.data[0] }];
            const top = this.data[0];
            const last = this.data.pop();
            if (this.data.length) {
                this.data[0] = last;
                this.siftDown(0, events);
            }
            if (this.type === 'heap-binomial') events.push({ type: 'MERGE_DEGREE' });
            if (this.type === 'heap-fibonacci') events.push({ type: 'CONSOLIDATE' });
            return { ok: true, value: top, events };
        }

        merge(values) {
            if (!values.length) return { ok: false, error: 'No values to merge' };
            const events = [{ type: 'MERGE_START', count: values.length }];
            values.forEach((v) => {
                this.data.push(v);
                events.push({ type: 'LINK', value: v });
            });
            this.heapify();
            if (this.type === 'heap-fibonacci') events.push({ type: 'CONSOLIDATE' });
            if (this.type === 'heap-skew') events.push({ type: 'SWAP_CHILDREN' });
            return { ok: true, events };
        }

        changeKey(oldValue, newValue) {
            const idx = this.data.indexOf(oldValue);
            if (idx === -1) return { ok: false, error: 'Value not found' };
            const events = [{ type: 'CHANGE_KEY', from: oldValue, to: newValue, index: idx }];
            this.data[idx] = newValue;
            this.siftUp(idx, events);
            this.siftDown(idx, events);
            if (this.type === 'heap-fibonacci') {
                events.push({ type: 'CUT', index: idx });
                this.marked.delete(idx);
                // Simulate cascading-cut by marking parent
                const p = Math.floor((idx - 1) / 2);
                if (p >= 0 && p !== idx) {
                    this.marked.add(p);
                    events.push({ type: 'MARK', index: p });
                }
            }
            if (this.type === 'heap-leftist') events.push({ type: 'NPL_UPDATE' });
            return { ok: true, events };
        }

        deleteValue(value) {
            const idx = this.data.indexOf(value);
            if (idx === -1) return { ok: false, error: 'Value not found' };
            const events = [{ type: 'DELETE', value, index: idx }];
            const last = this.data.pop();
            if (idx < this.data.length) {
                this.data[idx] = last;
                this.siftUp(idx, events);
                this.siftDown(idx, events);
            }
            if (this.type === 'heap-fibonacci') events.push({ type: 'CUT', index: idx });
            return { ok: true, events };
        }

        validate() {
            for (let i = 0; i < this.data.length; i++) {
                const l = 2 * i + 1;
                const r = 2 * i + 2;
                if (l < this.data.length && !this.compare(this.data[i], this.data[l]) && this.data[i] !== this.data[l]) {
                    return false;
                }
                if (r < this.data.length && !this.compare(this.data[i], this.data[r]) && this.data[i] !== this.data[r]) {
                    return false;
                }
            }
            return true;
        }

        snapshot() {
            const nodes = [];
            const edges = [];
            for (let i = 0; i < this.data.length; i++) {
                nodes.push({
                    id: 'h-' + i,
                    value: this.data[i],
                    root: i === 0,
                    npl: this.type === 'heap-leftist' ? this.calcNpl(i) : null,
                    marked: this.type === 'heap-fibonacci' ? this.marked.has(i) : false,
                });
                const l = 2 * i + 1;
                const r = 2 * i + 2;
                if (l < this.data.length) edges.push({ from: 'h-' + i, to: 'h-' + l });
                if (r < this.data.length) edges.push({ from: 'h-' + i, to: 'h-' + r });
            }

            if (this.type === 'heap-binomial' || this.type === 'heap-fibonacci') {
                const roots = [];
                let idx = 0;
                let degree = 0;
                while (idx < nodes.length) {
                    roots.push('h-' + idx);
                    idx += Math.max(1, 1 << Math.min(degree, 3));
                    degree++;
                }
                return { kind: 'forest', roots, nodes, edges };
            }

            return { kind: 'tree', roots: nodes.length ? ['h-0'] : [], nodes, edges };
        }

        calcNpl(index) {
            if (index >= this.data.length) return -1;
            const left = this.calcNpl(2 * index + 1);
            const right = this.calcNpl(2 * index + 2);
            return Math.min(left, right) + 1;
        }
    }

    function createHeapModel(type, isMin) {
        return new BaseArrayHeapModel(type, isMin);
    }

    const api = { createHeapModel };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = api;
    }
    global.HeapModels = api;
})(typeof window !== 'undefined' ? window : globalThis);
