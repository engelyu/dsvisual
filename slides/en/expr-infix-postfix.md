---
marp: true
theme: default
paginate: true
math: katex
title: "Infix → Postfix & Evaluation"
category: "Linear Structures"
---

## Why Postfix

Postfix (reverse Polish) needs no parentheses or precedence rules and is evaluated mechanically with a stack.

---

## Shunting-Yard Conversion

1. Operands go straight to output.
2. Operator: pop operators with precedence ≥ its own, then push.
3. Push ( ; on ) pop until (.
4. At end, pop remaining operators.

```cpp
while (!ops.empty() && ops.top() != '(' &&
       prec(ops.top()) >= prec(c)) {
    out += ops.top(); out += ' '; ops.pop();
}
ops.push(c);
```

---

## Postfix Evaluation

Scan left to right: push operands; on an operator pop two, compute, push the result.

> e.g. A*(B+C)*D → A B C + * D *
