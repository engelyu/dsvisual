#include <vector>

// Interpolation search on a sorted (ideally uniform) array. Returns index or -1.
int interpolationSearch(const std::vector<int>& a, int target) {
    int lo = 0, hi = (int)a.size() - 1;
    while (lo <= hi && target >= a[lo] && target <= a[hi]) {
        if (a[hi] == a[lo]) return (a[lo] == target) ? lo : -1;
        int pos = lo + (int)((long long)(target - a[lo]) * (hi - lo) / (a[hi] - a[lo]));
        if (a[pos] == target) return pos;
        else if (a[pos] < target) lo = pos + 1;
        else hi = pos - 1;
    }
    return -1;
}
