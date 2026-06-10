#include <vector>
#include <algorithm>

// Fibonacci search on a sorted array. Returns index of target or -1.
int fibonacciSearch(const std::vector<int>& a, int target) {
    int n = (int)a.size();
    int fib2 = 0, fib1 = 1, fibM = fib2 + fib1;
    while (fibM < n) { fib2 = fib1; fib1 = fibM; fibM = fib2 + fib1; }
    int offset = -1;
    while (fibM > 1) {
        int i = std::min(offset + fib2, n - 1);
        if (a[i] < target) { fibM = fib1; fib1 = fib2; fib2 = fibM - fib1; offset = i; }
        else if (a[i] > target) { fibM = fib2; fib1 = fib1 - fib2; fib2 = fibM - fib1; }
        else return i;
    }
    if (fib1 == 1 && offset + 1 < n && a[offset + 1] == target) return offset + 1;
    return -1;
}
