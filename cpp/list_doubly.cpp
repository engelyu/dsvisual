#include <cstddef>

// Doubly linked list (optionally circular).
struct Node { int val; Node* prev; Node* next; };

class DoublyList {
    Node* head = nullptr;
    Node* tail = nullptr;
    bool circular = false;
public:
    explicit DoublyList(bool circ) : circular(circ) {}

    void pushFront(int v) {
        Node* n = new Node{ v, nullptr, head };
        if (head) head->prev = n;
        head = n;
        if (!tail) tail = n;
        if (circular) { head->prev = tail; tail->next = head; }
    }

    void pushBack(int v) {
        Node* n = new Node{ v, tail, nullptr };
        if (!head) { head = tail = n; }
        else { tail->next = n; tail = n; }
        if (circular) { tail->next = head; head->prev = tail; }
    }

    // Insert v before the node at position idx (0-based).
    void insertAt(int idx, int v) {
        if (idx <= 0 || !head) { pushFront(v); return; }
        Node* cur = head;
        for (int i = 0; i < idx && cur->next && cur->next != head; i++) cur = cur->next;
        Node* n = new Node{ v, cur, cur->next };
        if (cur->next) cur->next->prev = n;
        cur->next = n;
        if (cur == tail) tail = n;
    }
};
