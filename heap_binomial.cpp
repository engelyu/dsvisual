#include <iostream>
#include <vector>
#include <climits>
using namespace std;

struct BNode {
    int key;
    int degree;
    BNode* parent;
    BNode* child;
    BNode* sibling;
    explicit BNode(int k) : key(k), degree(0), parent(nullptr), child(nullptr), sibling(nullptr) {}
};

class BinomialHeap {
private:
    BNode* head = nullptr;
    bool isMinHeap;

    bool cmp(int a, int b) const {
        return isMinHeap ? (a < b) : (a > b);
    }

    BNode* mergeRootLists(BNode* h1, BNode* h2) {
        if (!h1) return h2;
        if (!h2) return h1;

        BNode* newHead = nullptr;
        BNode* tail = nullptr;

        while (h1 && h2) {
            BNode* pick;
            if (h1->degree <= h2->degree) {
                pick = h1;
                h1 = h1->sibling;
            } else {
                pick = h2;
                h2 = h2->sibling;
            }

            if (!newHead) {
                newHead = tail = pick;
            } else {
                tail->sibling = pick;
                tail = pick;
            }
        }
        tail->sibling = h1 ? h1 : h2;
        return newHead;
    }

    void linkTrees(BNode* rootY, BNode* rootZ) {
        rootY->parent = rootZ;
        rootY->sibling = rootZ->child;
        rootZ->child = rootY;
        rootZ->degree++;
    }

    BNode* unionHeaps(BNode* h1, BNode* h2) {
        BNode* newHead = mergeRootLists(h1, h2);
        if (!newHead) return nullptr;

        BNode* prev = nullptr;
        BNode* curr = newHead;
        BNode* next = curr->sibling;

        while (next) {
            bool degreeDiff = curr->degree != next->degree;
            bool tripleSame = next->sibling && next->sibling->degree == curr->degree;

            if (degreeDiff || tripleSame) {
                prev = curr;
                curr = next;
            } else if (cmp(curr->key, next->key)) {
                curr->sibling = next->sibling;
                linkTrees(next, curr);
            } else {
                if (!prev) newHead = next;
                else prev->sibling = next;
                linkTrees(curr, next);
                curr = next;
            }
            next = curr->sibling;
        }

        return newHead;
    }

public:
    explicit BinomialHeap(bool minHeap = true) : isMinHeap(minHeap) {}

    void insert(int key) {
        BNode* single = new BNode(key);
        head = unionHeaps(head, single);
    }

    int peek() const {
        if (!head) return isMinHeap ? INT_MAX : INT_MIN;
        BNode* best = head;
        for (BNode* p = head->sibling; p; p = p->sibling) {
            if (cmp(p->key, best->key)) best = p;
        }
        return best->key;
    }

    int extractTop() {
        if (!head) return isMinHeap ? INT_MAX : INT_MIN;

        BNode* prevBest = nullptr;
        BNode* best = head;
        BNode* prev = nullptr;

        for (BNode* p = head; p; p = p->sibling) {
            if (cmp(p->key, best->key)) {
                best = p;
                prevBest = prev;
            }
            prev = p;
        }

        if (prevBest) prevBest->sibling = best->sibling;
        else head = best->sibling;

        BNode* child = best->child;
        BNode* rev = nullptr;
        while (child) {
            BNode* nxt = child->sibling;
            child->sibling = rev;
            child->parent = nullptr;
            rev = child;
            child = nxt;
        }

        int out = best->key;
        delete best;
        head = unionHeaps(head, rev);
        return out;
    }

    void merge(BinomialHeap& other) {
        head = unionHeaps(head, other.head);
        other.head = nullptr;
    }

    void printRoots() const {
        cout << (isMinHeap ? "Min" : "Max") << " Binomial roots: ";
        for (BNode* p = head; p; p = p->sibling) {
            cout << "(k=" << p->key << ",d=" << p->degree << ") ";
        }
        cout << "\n";
    }
};

int main() {
    BinomialHeap h1(true), h2(true);
    h1.insert(10); h1.insert(3); h1.insert(18);
    h2.insert(7); h2.insert(1); h2.insert(25);

    h1.printRoots();
    h2.printRoots();

    h1.merge(h2);
    h1.printRoots();

    cout << "Peek: " << h1.peek() << "\n";
    cout << "Extract: " << h1.extractTop() << "\n";
    h1.printRoots();
    return 0;
}
