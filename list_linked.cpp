#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class LinkedList {
private:
    Node* head;

public:
    LinkedList() { head = nullptr; }

    void insertAt(int index, int value) {
        if (index < 0) return;
        Node* newNode = new Node(value);
        if (index == 0) {
            newNode->next = head;
            head = newNode;
            return;
        }
        Node* curr = head;
        for (int i = 0; curr != nullptr && i < index - 1; i++) {
            curr = curr->next;
        }
        if (curr == nullptr) return; 
        newNode->next = curr->next;
        curr->next = newNode;
    }

    void removeAt(int index) {
        if (head == nullptr || index < 0) return;
        if (index == 0) {
            Node* temp = head;
            head = head->next;
            delete temp;
            return;
        }
        Node* curr = head;
        for (int i = 0; curr != nullptr && i < index - 1; i++) {
            curr = curr->next;
        }
        if (curr == nullptr || curr->next == nullptr) return;
        Node* temp = curr->next;
        curr->next = temp->next;
        delete temp;
    }

    void print() {
        Node* curr = head;
        while (curr != nullptr) {
            cout << curr->data << " -> ";
            curr = curr->next;
        }
        cout << "NULL\n";
    }
};

int main() {
    LinkedList list;
    list.insertAt(0, 10);
    list.insertAt(1, 30);
    list.insertAt(1, 20);
    list.print();
    list.removeAt(1);
    list.print();
    return 0;
}
