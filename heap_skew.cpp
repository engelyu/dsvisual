#include <iostream>
#include <climits>
using namespace std;

struct SNode {
    int key;
    SNode* left;
    SNode* right;
    explicit SNode(int k) : key(k), left(nullptr), right(nullptr) {}
};

class SkewHeap {
private:
    SNode* root = nullptr;
    bool isMinHeap;

    bool cmp(int a, int b) const {
        return isMinHeap ? (a < b) : (a > b);
    }

    SNode* mergeNodes(SNode* a, SNode* b) {
        if (!a) return b;
        if (!b) return a;
        if (!cmp(a->key, b->key)) swap(a, b);

        a->right = mergeNodes(a->right, b);
        swap(a->left, a->right);
        return a;
    }

    void clearNode(SNode* n) {
        if (!n) return;
        clearNode(n->left);
        clearNode(n->right);
        delete n;
    }

public:
    explicit SkewHeap(bool minHeap = true) : isMinHeap(minHeap) {}

    void insert(int x) {
        root = mergeNodes(root, new SNode(x));
    }

    int peek() const {
        if (!root) return isMinHeap ? INT_MAX : INT_MIN;
        return root->key;
    }

    int extractTop() {
        if (!root) return isMinHeap ? INT_MAX : INT_MIN;
        int out = root->key;
        SNode* l = root->left;
        SNode* r = root->right;
        delete root;
        root = mergeNodes(l, r);
        return out;
    }

    void merge(SkewHeap& other) {
        root = mergeNodes(root, other.root);
        other.root = nullptr;
    }

    ~SkewHeap() { clearNode(root); }

    void printPreorder(SNode* n) const {
        if (!n) return;
        cout << n->key << " ";
        printPreorder(n->left);
        printPreorder(n->right);
    }

    void print() const {
        cout << (isMinHeap ? "Min" : "Max") << " Skew: ";
        printPreorder(root);
        cout << "\n";
    }
};

int main() {
    SkewHeap h1(true), h2(true);
    h1.insert(12); h1.insert(5); h1.insert(30);
    h2.insert(7); h2.insert(2); h2.insert(18);

    h1.print();
    h2.print();

    h1.merge(h2);
    h1.print();

    cout << "Peek: " << h1.peek() << "\n";
    cout << "Extract: " << h1.extractTop() << "\n";
    h1.print();
    return 0;
}
