#include <iostream>
using namespace std;

class ArrayList {
private:
    int* arr;
    int capacity;
    int size;

    void resize() {
        capacity *= 2;
        int* newArr = new int[capacity];
        for (int i = 0; i < size; i++) newArr[i] = arr[i];
        delete[] arr;
        arr = newArr;
    }

public:
    ArrayList(int cap = 5) {
        capacity = cap;
        size = 0;
        arr = new int[capacity];
    }

    void insertAt(int index, int value) {
        if (index < 0 || index > size) return;
        if (size == capacity) resize();
        for (int i = size; i > index; i--) {
            arr[i] = arr[i - 1]; // shift right
        }
        arr[index] = value;
        size++;
    }

    void removeAt(int index) {
        if (index < 0 || index >= size) return;
        for (int i = index; i < size - 1; i++) {
            arr[i] = arr[i + 1]; // shift left
        }
        size--;
    }

    void print() {
        for (int i = 0; i < size; i++) cout << arr[i] << " ";
        cout << endl;
    }
};

int main() {
    ArrayList list;
    list.insertAt(0, 10);
    list.insertAt(1, 20);
    list.insertAt(1, 15);
    list.print();
    list.removeAt(0);
    list.print();
    return 0;
}
