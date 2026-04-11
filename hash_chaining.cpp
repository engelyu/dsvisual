#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class HashChaining {
private:
    int TABLE_SIZE;
    Node** table;

public:
    HashChaining(int size = 5) {
        TABLE_SIZE = size;
        table = new Node*[TABLE_SIZE];
        for (int i = 0; i < TABLE_SIZE; i++) table[i] = nullptr;
    }

    int hashFunction(int key) {
        return key % TABLE_SIZE;
    }

    void insert(int key) {
        int hashIdx = hashFunction(key);
        Node* newNode = new Node(key);
        // Insert at head for simplicity O(1)
        newNode->next = table[hashIdx];
        table[hashIdx] = newNode;
        cout << "Inserted " << key << " at index " << hashIdx << endl;
    }

    void display() {
        for (int i = 0; i < TABLE_SIZE; i++) {
            cout << "[" << i << "] --> ";
            Node* temp = table[i];
            while (temp) {
                cout << temp->data << " -> ";
                temp = temp->next;
            }
            cout << "NULL\n";
        }
    }
};

int main() {
    HashChaining ht(5);
    ht.insert(33);
    ht.insert(21);
    ht.insert(43); // Collision with 33
    ht.display();
    return 0;
}
