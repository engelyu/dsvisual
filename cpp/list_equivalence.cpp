// Equivalence classes via linked-list adjacency (Horowitz) + stack traversal
#include <iostream>
#include <vector>
#include <stack>
using namespace std;

int main() {
    int n = 12;
    vector<pair<int,int>> rel = {{0,4},{3,1},{6,10},{8,9},{7,4},{6,8},{3,5},{2,11},{11,0}};
    vector<vector<int>> seq(n);
    for (auto& p : rel) { seq[p.first].push_back(p.second); seq[p.second].push_back(p.first); }

    vector<bool> out(n, false);
    for (int i = 0; i < n; ++i) {
        if (out[i]) continue;
        cout << "Class:";
        stack<int> st; st.push(i); out[i] = true;
        while (!st.empty()) {
            int j = st.top(); st.pop();
            cout << " " << j;
            for (int k : seq[j]) if (!out[k]) { out[k] = true; st.push(k); }
        }
        cout << "\n";
    }
    return 0;
}
