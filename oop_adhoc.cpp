#include <iostream>
#include <string>
using namespace std;

// Function overloading: same name, different parameter types.
void print(int x) { cout << "int: " << x << endl; }
void print(double x) { cout << "double: " << x << endl; }
void print(const string& x) { cout << "string: " << x << endl; }

// Operator overloading.
struct Vector2D {
    double x, y;
    Vector2D operator+(const Vector2D& o) const {
        return Vector2D{ x + o.x, y + o.y };
    }
};

int main() {
    print(42);            // resolves to print(int)
    print(3.14);          // resolves to print(double)
    print(string("hi"));  // resolves to print(const string&)

    Vector2D a{1, 2}, b{3, 4};
    Vector2D c = a + b;   // operator+
    cout << "sum: (" << c.x << ", " << c.y << ")" << endl;
    return 0;
}
