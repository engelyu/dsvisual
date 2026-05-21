#include <iostream>
#include <vector>
using namespace std;

// Abstract base class — a pure-virtual class is C++'s "interface".
class Shape {
public:
    virtual double area() const = 0;   // pure virtual -> Shape is abstract
    virtual ~Shape() {}
};

class Circle : public Shape {
    double r;
public:
    Circle(double radius) : r(radius) {}
    double area() const override { return 3.14159 * r * r; }
};

class Rectangle : public Shape {
    double w, h;
public:
    Rectangle(double width, double height) : w(width), h(height) {}
    double area() const override { return w * h; }
};

int main() {
    // Shape s;   // compile error: cannot instantiate an abstract class
    vector<Shape*> shapes = { new Circle(2.0), new Rectangle(3.0, 4.0) };
    for (Shape* s : shapes) {
        cout << "area = " << s->area() << endl;
        delete s;
    }
    return 0;
}
