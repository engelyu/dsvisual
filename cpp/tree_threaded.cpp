#include <iostream>

// Right-threaded binary tree: a node's null right pointer becomes a thread to
// its inorder successor, enabling stack-free inorder traversal.
struct Node {
    int val;
    Node* left = nullptr;
    Node* right = nullptr;   // child or thread
    bool rightThread = false;
};

void inorderThreaded(Node* root) {
    Node* cur = root;
    while (cur && cur->left) cur = cur->left;       // leftmost
    while (cur) {
        std::cout << cur->val << ' ';
        if (cur->rightThread) {
            cur = cur->right;                       // follow thread to successor
        } else {
            cur = cur->right;                       // go right...
            while (cur && cur->left) cur = cur->left; // ...then leftmost
        }
    }
}
