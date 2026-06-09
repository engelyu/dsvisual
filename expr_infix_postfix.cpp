#include <stack>
#include <string>
#include <cctype>
#include <iostream>

int prec(char op) { return (op == '*' || op == '/') ? 2 : 1; }

// Dijkstra's shunting-yard: infix -> postfix (single-letter operands / digits).
std::string infixToPostfix(const std::string& s) {
    std::stack<char> ops;
    std::string out;
    for (char c : s) {
        if (std::isspace((unsigned char)c)) continue;
        if (std::isalnum((unsigned char)c)) { out += c; out += ' '; }
        else if (c == '(') ops.push(c);
        else if (c == ')') {
            while (!ops.empty() && ops.top() != '(') { out += ops.top(); out += ' '; ops.pop(); }
            if (!ops.empty()) ops.pop(); // discard '('
        } else { // operator
            while (!ops.empty() && ops.top() != '(' && prec(ops.top()) >= prec(c)) { out += ops.top(); out += ' '; ops.pop(); }
            ops.push(c);
        }
    }
    while (!ops.empty()) { out += ops.top(); out += ' '; ops.pop(); }
    return out;
}

// Evaluate a postfix expression of single-digit numbers.
int evalPostfix(const std::string& tokens) {
    std::stack<int> st;
    for (char c : tokens) {
        if (std::isspace((unsigned char)c)) continue;
        if (std::isdigit((unsigned char)c)) st.push(c - '0');
        else {
            int b = st.top(); st.pop();
            int a = st.top(); st.pop();
            if (c == '+') st.push(a + b);
            else if (c == '-') st.push(a - b);
            else if (c == '*') st.push(a * b);
            else st.push(a / b);
        }
    }
    return st.top();
}
