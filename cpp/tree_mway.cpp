#include <vector>
#include <algorithm>

// m-way search tree (unbalanced): each node holds up to m-1 sorted keys and
// up to m children. Insertion descends; fills a non-full node or creates a
// new child where the search falls off.
struct MwayNode {
    std::vector<int> keys;
    std::vector<MwayNode*> children; // size keys.size()+1
};

MwayNode* makeLeaf(int k) {
    MwayNode* n = new MwayNode();
    n->keys.push_back(k);
    n->children.assign(2, nullptr);
    return n;
}

MwayNode* insert(MwayNode* root, int key, int m) {
    if (!root) return makeLeaf(key);
    MwayNode* p = root;
    while (true) {
        int i = 0;
        while (i < (int)p->keys.size() && key > p->keys[i]) i++;
        if (i < (int)p->keys.size() && p->keys[i] == key) return root; // duplicate
        if (p->children[i] == nullptr) {
            if ((int)p->keys.size() < m - 1) {
                p->keys.insert(p->keys.begin() + i, key);
                p->children.insert(p->children.begin() + i, nullptr);
            } else {
                p->children[i] = makeLeaf(key);
            }
            return root;
        }
        p = p->children[i];
    }
}
