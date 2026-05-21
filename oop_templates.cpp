#include <iostream>
#include <string>
using namespace std;

// Function template.
template <typename T>
T maximum(T a, T b) {
    return (a > b) ? a : b;
}

// Class template.
template <typename T>
class Box {
    T value;
public:
    Box(T v) : value(v) {}
    T get() const { return value; }
    void set(T v) { value = v; }
};

int main() {
    cout << maximum(3, 7) << endl;                            // T = int
    cout << maximum(2.5, 1.5) << endl;                        // T = double
    cout << maximum(string("apple"), string("pear")) << endl; // T = string

    Box<int> bi(42);
    Box<string> bs("hello");
    cout << bi.get() << " " << bs.get() << endl;
    return 0;
}
