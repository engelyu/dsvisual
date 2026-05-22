#include <cstdlib>
#include <iostream>
#include <vector>
using namespace std;

// A skip list: an ordered map built from a multi-level linked list. Each node
// is promoted to a random number of express lanes, giving expected O(log n).
struct Node {
    int key;
    vector<Node*> forward;
    Node(int k, int level) : key(k), forward(level + 1, nullptr) {}
};

class SkipList {
    static const int MAX_LEVEL = 3; // levels 0..3
    Node* head;
    int level;

    int randomLevel() {
        int lvl = 0;
        while ((rand() & 1) && lvl < MAX_LEVEL)
            lvl++;
        return lvl;
    }

public:
    SkipList() : level(0) { head = new Node(-1, MAX_LEVEL); }

    void insert(int key) {
        vector<Node*> update(MAX_LEVEL + 1, head);
        Node* cur = head;
        for (int i = level; i >= 0; i--) {
            while (cur->forward[i] && cur->forward[i]->key < key)
                cur = cur->forward[i];
            update[i] = cur;
        }
        int lvl = randomLevel();
        if (lvl > level) {
            for (int i = level + 1; i <= lvl; i++)
                update[i] = head;
            level = lvl;
        }
        Node* node = new Node(key, lvl);
        for (int i = 0; i <= lvl; i++) {
            node->forward[i] = update[i]->forward[i];
            update[i]->forward[i] = node;
        }
    }

    bool search(int key) {
        Node* cur = head;
        for (int i = level; i >= 0; i--) {
            while (cur->forward[i] && cur->forward[i]->key < key)
                cur = cur->forward[i];
        }
        cur = cur->forward[0];
        return cur && cur->key == key;
    }

    void remove(int key) {
        vector<Node*> update(MAX_LEVEL + 1, head);
        Node* cur = head;
        for (int i = level; i >= 0; i--) {
            while (cur->forward[i] && cur->forward[i]->key < key)
                cur = cur->forward[i];
            update[i] = cur;
        }
        cur = cur->forward[0];
        if (!cur || cur->key != key)
            return;
        for (int i = 0; i <= level; i++) {
            if (update[i]->forward[i] != cur)
                break;
            update[i]->forward[i] = cur->forward[i];
        }
        delete cur;
        while (level > 0 && !head->forward[level])
            level--;
    }
};

int main() {
    SkipList sl;
    int keys[] = {3, 7, 12, 19, 25};
    for (int k : keys)
        sl.insert(k);

    cout << "search 12? " << sl.search(12) << "\n"; // 1
    cout << "search 20? " << sl.search(20) << "\n"; // 0
    sl.remove(12);
    cout << "search 12 after remove? " << sl.search(12) << "\n"; // 0
    return 0;
}
