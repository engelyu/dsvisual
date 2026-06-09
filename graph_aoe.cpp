#include <vector>
#include <queue>
#include <algorithm>
#include <climits>

// AOE network: forward pass (earliest), backward pass (latest), critical activities.
struct Edge { int u, v, w; };

void criticalPath(int n, const std::vector<Edge>& edges) {
    std::vector<std::vector<std::pair<int,int>>> out(n + 1), in(n + 1);
    std::vector<int> indeg(n + 1, 0);
    for (const auto& e : edges) { out[e.u].push_back({e.v, e.w}); in[e.v].push_back({e.u, e.w}); indeg[e.v]++; }

    // Topological order (Kahn).
    std::vector<int> order;
    std::queue<int> q;
    for (int i = 1; i <= n; i++) if (indeg[i] == 0) q.push(i);
    std::vector<int> deg = indeg;
    while (!q.empty()) {
        int u = q.front(); q.pop(); order.push_back(u);
        for (auto [v, w] : out[u]) if (--deg[v] == 0) q.push(v);
    }

    std::vector<int> ee(n + 1, 0), le(n + 1, 0);
    for (int u : order) for (auto [p, w] : in[u]) ee[u] = std::max(ee[u], ee[p] + w);
    int sink = order.back();
    for (int i = 1; i <= n; i++) le[i] = ee[sink];
    for (auto it = order.rbegin(); it != order.rend(); ++it) {
        int u = *it;
        for (auto [v, w] : out[u]) le[u] = std::min(le[u], le[v] - w);
    }
    // Activity (u,v,w) is critical when ee[u] == le[v] - w.
    (void)le;
}
