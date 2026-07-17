#include <iostream>
#include <vector>
#include <cstdint>

// Number of distinct binary trees with n nodes = the nth Catalan number.
// Recurrence: C0 = 1, Cn = sum_{i=0}^{n-1} Ci * C(n-1-i).
uint64_t catalanRecurrence(int n) {
    std::vector<uint64_t> C(n + 1, 0);
    C[0] = 1;
    for (int m = 1; m <= n; ++m)
        for (int i = 0; i < m; ++i)
            C[m] += C[i] * C[m - 1 - i];
    return C[n];
}

// Closed form Cn = binom(2n, n) / (n + 1), via an exact running product.
uint64_t catalanClosed(int n) {
    uint64_t r = 1;
    for (int i = 0; i < n; ++i) { r = r * (uint64_t)(2 * n - i); r /= (uint64_t)(i + 1); }
    return r / (uint64_t)(n + 1);
}

// The count of distinct binary-tree shapes is exactly the recurrence.
uint64_t countShapes(int n) { return catalanRecurrence(n); }
