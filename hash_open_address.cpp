#include <iostream>
using namespace std;

class HashOpenAddressing {
private:
    int TABLE_SIZE;
    int* table;
    int curr_size;

public:
    HashOpenAddressing(int size = 5) {
        TABLE_SIZE = size;
        table = new int[TABLE_SIZE];
        for (int i = 0; i < TABLE_SIZE; i++) table[i] = -1; // -1 indicates empty
        curr_size = 0;
    }

    int hashFunction(int key) {
        return key % TABLE_SIZE;
    }

    bool insert(int key) {
        if (curr_size >= TABLE_SIZE) {
            cout << "Hash Table Full!" << endl;
            return false;
        }
        
        int idx = hashFunction(key);
        
        // Linear Probing
        while (table[idx] != -1) {
            cout << "Collision at index " << idx << "! Probing next..." << endl;
            idx = (idx + 1) % TABLE_SIZE;
        }
        
        table[idx] = key;
        curr_size++;
        cout << "Inserted " << key << " securely at index " << idx << endl;
        return true;
    }

    void display() {
        for (int i = 0; i < TABLE_SIZE; i++) {
            if (table[i] != -1) cout << "[" << i << "] --> " << table[i] << endl;
            else cout << "[" << i << "] --> Empty" << endl;
        }
    }
};

int main() {
    HashOpenAddressing ht(5);
    ht.insert(42);
    ht.insert(12);
    ht.insert(32); // Collision with 42! Will slide to empty slot.
    ht.display();
    return 0;
}
