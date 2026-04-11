#include <iostream>
#include <vector>
#include <unordered_map>
#include <climits>
using namespace std;

struct FNode {
    int key;
    int degree;
    bool mark;
    FNode* parent;
    FNode* child;
    FNode* left;
    FNode* right;

    explicit FNode(int k)
        : key(k), degree(0), mark(false), parent(nullptr), child(nullptr), left(this), right(this) {}
};

class FibonacciHeap {
private:
    FNode* root = nullptr;
    FNode* best = nullptr;
    int n = 0;
    bool isMinHeap;

    bool cmp(int a, int b) const {
        return isMinHeap ? (a < b) : (a > b);
    }

    static void spliceRight(FNode* a, FNode* b) {
        b->left = a;
        b->right = a->right;
        a->right->left = b;
        a->right = b;
    }

    static void removeNode(FNode* x) {
        x->left->right = x->right;
        x->right->left = x->left;
        x->left = x->right = x;
    }

    void addToRootList(FNode* x) {
        x->parent = nullptr;
        x->mark = false;
        if (!root) {
            root = x;
            best = x;
            return;
        }
        spliceRight(root, x);
        if (cmp(x->key, best->key)) best = x;
    }

    void link(FNode* y, FNode* x) {
        removeNode(y);
        y->parent = x;
        if (!x->child) {
            x->child = y;
        } else {
            spliceRight(x->child, y);
        }
        x->degree++;
        y->mark = false;
    }

    void consolidate() {
        if (!root) return;

        vector<FNode*> roots;
        FNode* p = root;
        do {
            roots.push_back(p);
            p = p->right;
        } while (p != root);

        vector<FNode*> A(64, nullptr);
        for (FNode* w : roots) {
            FNode* x = w;
            int d = x->degree;
            while (A[d]) {
                FNode* y = A[d];
                if (cmp(y->key, x->key)) swap(x, y);
                link(y, x);
                A[d] = nullptr;
                d++;
            }
            A[d] = x;
        }

        root = nullptr;
        best = nullptr;
        for (FNode* x : A) {
            if (!x) continue;
            x->left = x->right = x;
            if (!root) {
                root = best = x;
            } else {
                spliceRight(root, x);
                if (cmp(x->key, best->key)) best = x;
            }
        }
    }

    void cut(FNode* x, FNode* y) {
        if (y->child == x) y->child = (x->right != x) ? x->right : nullptr;
        y->degree--;
        removeNode(x);
        addToRootList(x);
    }

    void cascadingCut(FNode* y) {
        FNode* z = y->parent;
        if (!z) return;
        if (!y->mark) {
            y->mark = true;
        } else {
            cut(y, z);
            cascadingCut(z);
        }
    }

public:
    explicit FibonacciHeap(bool minHeap = true) : isMinHeap(minHeap) {}

    FNode* insert(int key) {
        FNode* x = new FNode(key);
        addToRootList(x);
        n++;
        return x;
    }

    int peek() const {
        if (!best) return isMinHeap ? INT_MAX : INT_MIN;
        return best->key;
    }

    int extractTop() {
        if (!best) return isMinHeap ? INT_MAX : INT_MIN;
        FNode* z = best;

        if (z->child) {
            vector<FNode*> children;
            FNode* c = z->child;
            do {
                children.push_back(c);
                c = c->right;
            } while (c != z->child);

            for (FNode* x : children) {
                removeNode(x);
                addToRootList(x);
                x->parent = nullptr;
            }
        }

        if (z->right == z) {
            root = best = nullptr;
        } else {
            if (root == z) root = z->right;
            removeNode(z);
            best = root;
            consolidate();
        }

        int out = z->key;
        delete z;
        n--;
        return out;
    }

    void decreaseOrIncreaseKey(FNode* x, int newKey) {
        if (!x) return;
        int old = x->key;
        x->key = newKey;
        FNode* y = x->parent;

        bool violates = y && cmp(x->key, y->key);
        if (violates) {
            cut(x, y);
            cascadingCut(y);
        }

        if (!best || cmp(x->key, best->key)) best = x;
        (void)old;
    }

    void erase(FNode* x) {
        if (!x) return;
        decreaseOrIncreaseKey(x, isMinHeap ? INT_MIN : INT_MAX);
        extractTop();
    }

    void merge(FibonacciHeap& other) {
        if (!other.root) return;
        if (!root) {
            root = other.root;
            best = other.best;
            n = other.n;
        } else {
            FNode* aRight = root->right;
            FNode* bLeft = other.root->left;
            root->right = other.root;
            other.root->left = root;
            aRight->left = bLeft;
            bLeft->right = aRight;
            if (cmp(other.best->key, best->key)) best = other.best;
            n += other.n;
        }
        other.root = other.best = nullptr;
        other.n = 0;
    }

    void printTop() const {
        if (!best) cout << "Heap empty\n";
        else cout << (isMinHeap ? "Min" : "Max") << " top: " << best->key << "\n";
    }
};

int main() {
    FibonacciHeap h(true);
    auto* a = h.insert(20);
    auto* b = h.insert(7);
    auto* c = h.insert(3);
    h.printTop();

    h.decreaseOrIncreaseKey(a, 2);
    h.printTop();

    cout << "Extract: " << h.extractTop() << "\n";
    h.printTop();

    h.erase(c);
    h.printTop();

    FibonacciHeap other(true);
    other.insert(5);
    other.insert(1);
    h.merge(other);
    h.printTop();
    (void)b;
    return 0;
}
