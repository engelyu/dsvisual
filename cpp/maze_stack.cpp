#include <vector>
#include <stack>
#include <string>

// Maze solving by DFS with an explicit stack (the stack IS the current path).
struct Cell { int r, c; };

bool solveMaze(std::vector<std::string>& grid, Cell start, Cell end, std::vector<Cell>& path) {
    const int R = (int)grid.size();
    const int dr[4] = { -1, 0, 1, 0 }, dc[4] = { 0, 1, 0, -1 };
    auto open = [&](int r, int c) {
        return r >= 0 && r < R && c >= 0 && c < (int)grid[r].size() && grid[r][c] != '#';
    };
    std::vector<std::vector<bool>> seen(R, std::vector<bool>());
    for (int r = 0; r < R; r++) seen[r].assign(grid[r].size(), false);
    std::stack<Cell> st;
    st.push(start); seen[start.r][start.c] = true;
    while (!st.empty()) {
        Cell cur = st.top();
        if (cur.r == end.r && cur.c == end.c) {
            std::stack<Cell> tmp = st;
            while (!tmp.empty()) { path.push_back(tmp.top()); tmp.pop(); }
            return true;
        }
        bool moved = false;
        for (int k = 0; k < 4; k++) {
            int nr = cur.r + dr[k], nc = cur.c + dc[k];
            if (open(nr, nc) && !seen[nr][nc]) { seen[nr][nc] = true; st.push({ nr, nc }); moved = true; break; }
        }
        if (!moved) st.pop();
    }
    return false;
}
