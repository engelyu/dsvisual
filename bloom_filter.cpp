#include <iostream>
#include <string>
#include <vector>
using namespace std;

// A Bloom filter: a space-efficient probabilistic set. A query may report a
// false positive ("possibly present") but never a false negative.
class BloomFilter {
    static const int SIZE = 32;
    vector<bool> bits;

    int hash1(const string& s) const {
        unsigned long h = 5381;
        for (char c : s)
            h = h * 33 + static_cast<unsigned char>(c);
        return static_cast<int>(h % SIZE);
    }
    int hash2(const string& s) const {
        unsigned long h = 0;
        for (char c : s)
            h = h * 31 + static_cast<unsigned char>(c);
        return static_cast<int>(h % SIZE);
    }
    int hash3(const string& s) const {
        unsigned long h = 7;
        for (char c : s)
            h = h * 17 + static_cast<unsigned char>(c) + 1;
        return static_cast<int>(h % SIZE);
    }

public:
    BloomFilter() : bits(SIZE, false) {}

    void insert(const string& key) {
        bits[hash1(key)] = true;
        bits[hash2(key)] = true;
        bits[hash3(key)] = true;
    }

    bool possiblyContains(const string& key) const {
        return bits[hash1(key)] && bits[hash2(key)] && bits[hash3(key)];
    }
};

int main() {
    BloomFilter bf;
    bf.insert("cat");
    bf.insert("dog");
    bf.insert("bird");

    // "dog" was inserted, so this is always true.
    cout << "contains dog?  " << bf.possiblyContains("dog") << "\n";
    // "fish" was never inserted: 0 means definitely absent, 1 a false positive.
    cout << "contains fish? " << bf.possiblyContains("fish") << "\n";
    return 0;
}
