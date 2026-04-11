#include <iostream>
#include <climits>
using namespace std;

struct LNode {
    int key;
    int npl;
    LNode* left;
    LNode* right;
    explicit LNode(int k) : key(k), npl(0), left(nullptr), right(nullptr) {}
};

class LeftistHeap {
private:
    LNode* root = nullptr;
    bool isMinHeap;

    bool cmp(int a, int b) const {
        return isMinHeap ? (a < b) : (a > b);
    }

    static int getNpl(LNode* n) {
        return n ? n->npl : -1;
    }

    LNode* mergeNodes(LNode* a, LNode* b) {
        if (!a) return b;
        if (!b) return a;
        if (!cmp(a->key, b->key)) swap(a, b);

        a->right = mergeNodes(a->right, b);
        if (getNpl(a->left) < getNpl(a->right)) swap(a->left, a->right);
        a->npl = getNpl(a->right) + 1;
        return a;
    }

public:
    explicit LeftistHeap(bool minHeap = true) : isMinHeap(minHeap) {}

    void insert(int x) {
        root = mergeNodes(root, new LNode(x));
    }

    int peek() const {
        if (!root) return isMinHeap ? INT_MAX : INT_MIN;
        return root->key;
    }

    int extractTop() {
        if (!root) return isMinHeap ? INT_MAX : INT_MIN;
        int out = root->key;
        LNode* l = root->left;
        LNode* r = root->right;
        delete root;
        root = mergeNodes(l, r);
        return out;
    }

    void merge(LeftistHeap& other) {
        root = mergeNodes(root, other.root);
        other.root = nullptr;
    }

    void clearNode(LNode* n) {
        if (!n) return;
        clearNode(n->left);
        clearNode(n->right);
        delete n;
    }

    ~LeftistHeap() { clearNode(root); }

    void printPreorder(LNode* n) const {
        if (!n) return;
        cout << "(" << n->key << ",npl=" << n->npl << ") ";
        printPreorder(n->left);
        printPreorder(n->right);
    }

    void print() const {
        cout << (isMinHeap ? "Min" : "Max") << " Leftist: ";
        printPreorder(root);
        cout << "\n";
    }
};

int main() {
    LeftistHeap h1(true), h2(true);
    h1.insert(10); h1.insert(3); h1.insert(17);
    h2.insert(8); h2.insert(1); h2.insert(6);

    h1.print();
    h2.print();

    h1.merge(h2);
    h1.print();

    cout << "Peek: " << h1.peek() << "\n";
    cout << "Extract: " << h1.extractTop() << "\n";
    h1.print();
    return 0;
}
