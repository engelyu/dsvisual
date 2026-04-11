#include <iostream>
#include <vector>
#include <stdexcept>
using namespace std;

class BinaryHeap {
private:
    vector<int> data;
    bool isMinHeap;

    bool cmp(int a, int b) const {
        return isMinHeap ? (a < b) : (a > b);
    }

    void siftUp(int i) {
        while (i > 0) {
            int p = (i - 1) / 2;
            if (!cmp(data[i], data[p])) break;
            swap(data[i], data[p]);
            i = p;
        }
    }

    void siftDown(int i) {
        int n = static_cast<int>(data.size());
        while (true) {
            int left = 2 * i + 1;
            int right = 2 * i + 2;
            int best = i;

            if (left < n && cmp(data[left], data[best])) best = left;
            if (right < n && cmp(data[right], data[best])) best = right;
            if (best == i) break;

            swap(data[i], data[best]);
            i = best;
        }
    }

public:
    explicit BinaryHeap(bool minHeap = true) : isMinHeap(minHeap) {}

    void insert(int x) {
        data.push_back(x);
        siftUp(static_cast<int>(data.size()) - 1);
    }

    int peek() const {
        if (data.empty()) throw runtime_error("Heap is empty");
        return data[0];
    }

    int extractTop() {
        if (data.empty()) throw runtime_error("Heap is empty");
        int top = data[0];
        data[0] = data.back();
        data.pop_back();
        if (!data.empty()) siftDown(0);
        return top;
    }

    void decreaseOrIncreaseKey(int idx, int newVal) {
        if (idx < 0 || idx >= static_cast<int>(data.size())) {
            throw runtime_error("Index out of range");
        }
        int oldVal = data[idx];
        data[idx] = newVal;
        if (cmp(newVal, oldVal)) siftUp(idx);
        else siftDown(idx);
    }

    void eraseAt(int idx) {
        if (idx < 0 || idx >= static_cast<int>(data.size())) {
            throw runtime_error("Index out of range");
        }
        data[idx] = data.back();
        data.pop_back();
        if (idx < static_cast<int>(data.size())) {
            siftUp(idx);
            siftDown(idx);
        }
    }

    void mergeFrom(const vector<int>& other) {
        for (int v : other) insert(v);
    }

    void printArray() const {
        cout << (isMinHeap ? "MinHeap" : "MaxHeap") << " array: ";
        for (int v : data) cout << v << " ";
        cout << "\n";
    }
};

int main() {
    BinaryHeap h(true);
    h.insert(20);
    h.insert(7);
    h.insert(3);
    h.insert(12);
    h.printArray();

    cout << "Peek: " << h.peek() << "\n";
    cout << "Extract: " << h.extractTop() << "\n";

    h.decreaseOrIncreaseKey(1, 1);
    h.printArray();

    h.eraseAt(0);
    h.printArray();

    h.mergeFrom({9, 4, 15});
    h.printArray();

    return 0;
}
