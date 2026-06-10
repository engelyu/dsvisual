(function (global) {
    function cmpFactory(isMin) {
        return isMin ? (a, b) => a < b : (a, b) => a > b;
    }

    function arityFor(type) {
        return type === 'heap-dary' ? 4 : 2;
    }

    class BaseArrayHeapModel {
        constructor(type, isMin) {
            this.type = type;
            this.isMin = isMin;
            this.data = [];
            this.compare = cmpFactory(isMin);
            this.marked = new Set(); // for Fibonacci heap cascading-cut tracking
            this.arity = arityFor(type);
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
            for (let i = Math.floor((this.data.length - 2) / this.arity); i >= 0; i--) {
                this.siftDown(i);
            }
        }

        parentIndex(index) {
            return Math.floor((index - 1) / this.arity);
        }

        childIndices(index) {
            const children = [];
            for (let offset = 0; offset < this.arity; offset++) {
                const child = index * this.arity + offset + 1;
                if (child < this.data.length) children.push(child);
            }
            return children;
        }

        siftUp(i, events) {
            while (i > 0) {
                const p = this.parentIndex(i);
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
                let best = idx;

                this.childIndices(idx).forEach((child) => {
                    if (events) events.push({ type: 'COMPARE', a: child, b: best });
                    if (this.compare(this.data[child], this.data[best])) best = child;
                });

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
            if (this.type === 'heap-pairing') events.push({ type: 'PAIR_MELD' });
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
                const p = this.parentIndex(idx);
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
                for (const child of this.childIndices(i)) {
                    if (!this.compare(this.data[i], this.data[child]) && this.data[i] !== this.data[child]) {
                        return false;
                    }
                }
            }
            return true;
        }

        pairingEdges() {
            const edges = [];
            if (!this.data.length) return edges;

            const queue = ['h-0'];
            let nextIndex = 1;
            while (queue.length && nextIndex < this.data.length) {
                const parentId = queue.shift();
                const childLimit = parentId === 'h-0' ? 3 : 2;
                for (let count = 0; count < childLimit && nextIndex < this.data.length; count++, nextIndex++) {
                    const childId = 'h-' + nextIndex;
                    edges.push({ from: parentId, to: childId });
                    queue.push(childId);
                }
            }
            return edges;
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
                this.childIndices(i).forEach((child) => edges.push({ from: 'h-' + i, to: 'h-' + child }));
            }

            if (this.type === 'heap-pairing') {
                return { kind: 'pairing', roots: nodes.length ? ['h-0'] : [], nodes, edges: this.pairingEdges() };
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

            if (this.type === 'heap-dary') {
                return { kind: 'd-ary', roots: nodes.length ? ['h-0'] : [], nodes, edges, arity: this.arity };
            }

            return { kind: 'tree', roots: nodes.length ? ['h-0'] : [], nodes, edges };
        }

        calcNpl(index) {
            if (index >= this.data.length) return -1;
            const children = this.childIndices(index);
            const left = children.length > 0 ? this.calcNpl(children[0]) : -1;
            const right = children.length > 1 ? this.calcNpl(children[1]) : -1;
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
