#include <iostream>
#include <map>
#include <queue>
#include <string>
#include <vector>
using namespace std;

// Aho-Corasick: a trie of all patterns plus BFS-computed failure links, so a
// single text scan reports every occurrence of every pattern.
struct Node {
    map<char, Node*> children;
    Node* fail = nullptr;
    vector<int> output;
};

class AhoCorasick {
    Node* root;
    vector<string> patterns;

public:
    AhoCorasick() { root = new Node(); }

    void addPattern(const string& p) {
        int idx = static_cast<int>(patterns.size());
        patterns.push_back(p);
        Node* cur = root;
        for (char c : p) {
            if (!cur->children.count(c))
                cur->children[c] = new Node();
            cur = cur->children[c];
        }
        cur->output.push_back(idx);
    }

    void build() {
        queue<Node*> q;
        root->fail = root;
        for (auto& kv : root->children) {
            kv.second->fail = root;
            q.push(kv.second);
        }
        while (!q.empty()) {
            Node* cur = q.front();
            q.pop();
            for (auto& kv : cur->children) {
                char c = kv.first;
                Node* child = kv.second;
                Node* f = cur->fail;
                while (f != root && !f->children.count(c))
                    f = f->fail;
                if (f->children.count(c) && f->children[c] != child)
                    child->fail = f->children[c];
                else
                    child->fail = root;
                for (int idx : child->fail->output)
                    child->output.push_back(idx);
                q.push(child);
            }
        }
    }

    void search(const string& text) {
        Node* cur = root;
        for (int i = 0; i < static_cast<int>(text.size()); i++) {
            char c = text[i];
            while (cur != root && !cur->children.count(c))
                cur = cur->fail;
            if (cur->children.count(c))
                cur = cur->children[c];
            for (int idx : cur->output) {
                int start = i - static_cast<int>(patterns[idx].size()) + 1;
                cout << "match \"" << patterns[idx] << "\" at " << start << "\n";
            }
        }
    }
};

int main() {
    AhoCorasick ac;
    ac.addPattern("he");
    ac.addPattern("she");
    ac.addPattern("his");
    ac.addPattern("hers");
    ac.build();
    ac.search("ushers"); // she@1, he@2, hers@2
    return 0;
}
