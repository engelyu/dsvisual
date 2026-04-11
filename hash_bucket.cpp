#include <iostream>
using namespace std;

struct Bucket {
    int slots[2];
    int count;
    Bucket() {
        slots[0] = -1; slots[1] = -1;
        count = 0;
    }
};

class HashBucketing {
private:
    int NUM_BUCKETS;
    Bucket* table;

public:
    HashBucketing(int buckets = 4) { // 4 buckets * 2 slots = 8 total capacity
        NUM_BUCKETS = buckets;
        table = new Bucket[NUM_BUCKETS];
    }

    int hashFunction(int key) {
        return key % NUM_BUCKETS;
    }

    bool insert(int key) {
        int idx = hashFunction(key);
        
        // Try filling primary physical bucket block
        if (table[idx].count < 2) {
            table[idx].slots[table[idx].count++] = key;
            cout << "Inserted " << key << " directly into Bucket Index " << idx << endl;
            return true;
        }
        cout << "Bucket " << idx << " is full. Probing to next bucket overflow..." << endl;
        
        // Primary bucket is full; Linear Probing to next adjacent block
        int startIdx = idx;
        idx = (idx + 1) % NUM_BUCKETS;
        while (idx != startIdx) {
            if (table[idx].count < 2) {
                table[idx].slots[table[idx].count++] = key;
                cout << "Overflow Inserted " << key << " into Bucket Index " << idx << endl;
                return true;
            }
            idx = (idx + 1) % NUM_BUCKETS;
        }
        
        cout << "Catastrophic Failure: All Hash Buckets completely saturated!" << endl;
        return false; 
    }
};

int main() {
    HashBucketing ht(4);
    ht.insert(10);
    ht.insert(14); // Collision? 14%4=2, 10%4=2. Fills Bucket 2 nicely.
    ht.insert(22); // 22%4=2! Bucket 2 is FULL! This will overflow to Bucket 3.
    return 0;
}
