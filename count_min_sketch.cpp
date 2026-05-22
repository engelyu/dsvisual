#include <algorithm>
#include <iostream>
#include <string>
using namespace std;

// A Count-Min Sketch: a probabilistic frequency table. estimate() never
// underestimates a count; hash collisions may inflate it.
class CountMinSketch {
    static const int DEPTH = 3;
    static const int WIDTH = 8;
    int table[DEPTH][WIDTH];

    int hash(int row, const string& s) const {
        unsigned long h = static_cast<unsigned long>(row + 1) * 2654435761UL;
        for (char c : s)
            h = h * 31 + static_cast<unsigned char>(c);
        return static_cast<int>(h % WIDTH);
    }

public:
    CountMinSketch() {
        for (int r = 0; r < DEPTH; r++)
            for (int c = 0; c < WIDTH; c++)
                table[r][c] = 0;
    }

    void update(const string& key) {
        for (int r = 0; r < DEPTH; r++)
            table[r][hash(r, key)]++;
    }

    int estimate(const string& key) const {
        int est = table[0][hash(0, key)];
        for (int r = 1; r < DEPTH; r++)
            est = min(est, table[r][hash(r, key)]);
        return est;
    }
};

int main() {
    CountMinSketch cms;
    for (int i = 0; i < 5; i++)
        cms.update("apple");
    for (int i = 0; i < 2; i++)
        cms.update("banana");
    cms.update("cherry");

    cout << "apple  ~ " << cms.estimate("apple") << "\n";  // >= 5
    cout << "banana ~ " << cms.estimate("banana") << "\n"; // >= 2
    cout << "grape  ~ " << cms.estimate("grape") << "\n";  // >= 0
    return 0;
}
