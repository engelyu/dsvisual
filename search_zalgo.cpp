#include <algorithm>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

// The Z-array: Z[i] is the length of the longest substring starting at i that
// matches a prefix of the string. Built in linear time with a [l, r] window.
vector<int> computeZ(const string& s) {
    int n = static_cast<int>(s.size());
    vector<int> z(n, 0);
    int l = 0, r = 0;
    for (int i = 1; i < n; i++) {
        if (i < r)
            z[i] = min(r - i, z[i - l]);
        while (i + z[i] < n && s[z[i]] == s[i + z[i]])
            z[i]++;
        if (i + z[i] > r) {
            l = i;
            r = i + z[i];
        }
    }
    return z;
}

// String matching: build pattern + '$' + text; an index whose Z-value equals
// the pattern length marks an occurrence; assumes '$' appears in neither the
// pattern nor the text.
vector<int> zSearch(const string& text, const string& pattern) {
    string combined = pattern + "$" + text;
    vector<int> z = computeZ(combined);
    vector<int> matches;
    int m = static_cast<int>(pattern.size());
    for (int i = 0; i < static_cast<int>(combined.size()); i++) {
        if (z[i] == m)
            matches.push_back(i - m - 1); // translate back into text
    }
    return matches;
}

int main() {
    string text = "ABABDABACDABABCABAB";
    string pattern = "ABABCABAB";
    vector<int> matches = zSearch(text, pattern);

    cout << "matches at:";
    for (int idx : matches)
        cout << " " << idx;
    cout << "\n"; // matches at index 10
    return 0;
}
