#include <stack>
#include <string>
#include <sstream>
#include <cctype>

// Build an expression tree from a postfix expression using a stack of subtrees.
struct ENode {
    std::string val;
    ENode* left = nullptr;
    ENode* right = nullptr;
};

ENode* buildExprTree(const std::string& postfix) {
    std::stack<ENode*> st;
    std::istringstream in(postfix);
    std::string tok;
    auto isOp = [](const std::string& s) {
        return s == "+" || s == "-" || s == "*" || s == "/";
    };
    while (in >> tok) {
        ENode* n = new ENode{ tok, nullptr, nullptr };
        if (isOp(tok)) {
            n->right = st.top(); st.pop();
            n->left = st.top(); st.pop();
        }
        st.push(n);
    }
    return st.empty() ? nullptr : st.top();
}

double evalExprTree(ENode* n) {
    if (!n) return 0;
    if (!n->left && !n->right) return std::stod(n->val);
    double a = evalExprTree(n->left), b = evalExprTree(n->right);
    if (n->val == "+") return a + b;
    if (n->val == "-") return a - b;
    if (n->val == "*") return a * b;
    return a / b;
}
