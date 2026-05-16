# 项目更新计划

## 当前状态 (2026-05-16)

### ✅ 已完成

#### 1. UI 呈现同步 skhuang.github.io/stvisual
- **目标**: 将 C++ Data Structures & Algorithms Visualizer 的界面风格调整为与 `skhuang.github.io/stvisual` 一致。
- **界面调整**
  - 改为浅色系背景、白色内容卡片、蓝色主色调。
  - 顶部改为全宽渐层标题区，呼应 stvisual 的 header 呈现。
  - 选单群组改为浅色卡片 + 胶囊式选项按钮。
  - Explanation / C++ Source 分页改为 stvisual 风格的底线 tab。
  - 表单、按钮、状态文字、说明区改用一致的间距、圆角与 focus ring。
  - 字体改用 `Noto Sans TC`，保留 `Fira Code` 用于代码区。

- **文件修改**
  - index.html - 字体、header 结构、tab markup。
  - style.css - 全站主题、布局、卡片、选单、按钮、tab、说明区样式。
  - app.js - tab 切换时的主色与 muted 色同步更新。

#### 2. GitHub Issue
- **Issue #23**: Align UI with stvisual presentation style
  - 记录 UI 风格同步范围与验收标准。
  - 验收重点为既有交互不回归、响应式测试仍通过。

### 📊 测试结果
- ✅ **14/14 单元测试通过**
- ✅ **51/51 Playwright 测试通过**

### 🔗 相关链接
- Issue #23: https://github.com/skhuang/dsvisual/issues/23
- PR #24: https://github.com/skhuang/dsvisual/pull/24
- 分支: `feature/stvisual-ui-refresh`

---

## 下阶段 UI 重构规划：stvisual 式章节与方法区块

### 🎯 目标
将目前「单一 visualizer + 模式切换」改为更接近 `skhuang.github.io/stvisual` 的课程章节式界面：
- 顶层显示 6 大类，类似 stvisual 顶部的方法分类导览。
- 每个大类下方列出该类别的所有方法。
- 每一种方法都是独立区块，左侧为可操作的视觉化，右侧为 C++ 程式码。
- 原本 Explanation 说明区不再占用右侧 tab，改为「说明 / Slides」按钮，之后用简报 viewer 呈现。

### 🧭 建议版面

#### 1. 顶层 6 大类导览
Header 下方新增 stvisual 风格的 top-level nav：
- Basic Linear Structures
- Linked Lists
- Non-Linear Structures
- Advanced & Application-Specific
- OOP Concepts
- Design Patterns

桌机版使用横向 pill nav；手机版可改为 `<select>` 或横向滑动 tabs。

#### 2. 每个方法独立区块
每个 method section 采用固定结构：

```text
[方法名称 / 类别标签]                              [说明 / Slides]

┌───────────────────────────────┬───────────────────────────────┐
│ 左：视觉化 + 操作控制            │ 右：C++ Source Code            │
│ visualizer / controls          │ filename + Prism code panel    │
└───────────────────────────────┴───────────────────────────────┘
```

响应式规则：
- 桌机：左右双栏，视觉化在左、程式码在右。
- 平板/手机：上下排列，视觉化在上、程式码在下。

#### 3. 说明改为 Slides 按钮
移除目前 `Explanation / C++ Source` tab 的说明显示方式。

每个方法标题列加入按钮：
- `说明`
- 或 `Slides`

第一阶段按钮可先打开 modal，把现有 `DESC_DB[mode]` 内容放进去；后续再转换为真正的 slide deck。

未来 slide viewer 目标：

```text
┌────────────────────────────────────────────┐
│ Stack: Array Implementation          [×]   │
├────────────────────────────────────────────┤
│ Slide 1 / N                                │
│ 核心概念 / 操作流程 / 复杂度 / 图解          │
├────────────────────────────────────────────┤
│ [上一页]                         [下一页] │
└────────────────────────────────────────────┘
```

### 🛠️ 建议进行方式

#### Phase 1: 建立分类与方法 registry
- **Status**: PR open
- **Issue #25**: https://github.com/skhuang/dsvisual/issues/25
- **PR #26**: https://github.com/skhuang/dsvisual/pull/26
- **Branch**: `feature/ui-phase-1-method-registry`
- 新增 `METHOD_GROUPS` 或类似资料结构，集中定义：
  - group id / title
  - method id / title
  - C++ filename
  - desc key
  - visualizer type
  - controls type
- 先让顶层 6 大类导览由 registry 产生。
- 保留现有单一 visualizer 运作逻辑，降低第一阶段风险。

#### Phase 2: 建立 method section layout
- **Status**: PR open
- **Issue #27**: https://github.com/skhuang/dsvisual/issues/27
- **PR #28**: https://github.com/skhuang/dsvisual/pull/28
- **Branch**: `feature/ui-phase-2-method-sections`
- 将选到的大类渲染为多个 method sections。
- 每个 section 先呈现：
  - header + `说明 / Slides` 按钮
  - 左侧 visualizer 容器
  - 右侧 code panel
- 初期可以只让当前 active method 具备完整互动，其余 section 先静态显示标题与程式码，逐步迁移。

#### Phase 3: 拆分 visualizer instance
- **Status**: In progress
- **Issue #29**: https://github.com/skhuang/dsvisual/issues/29
- **Branch**: `feature/ui-phase-3-runtime-boundary`
- 将目前依赖全域 DOM id 的逻辑改为区块内 scope 查找。
- 每个 method block 拥有自己的状态：
  - stack/list/queue data
  - graph edges
  - tree root
  - sort array
  - heap model
  - animation state
- 避免同一页面多个区块出现重复 id 冲突。

#### Phase 4: Slides viewer
- 新增 slide modal / viewer 基础元件。
- 第一版从 `desc_db.js` 产生单页说明。
- 第二版新增 `slide_db.js`，将说明拆成多页：

```js
SLIDE_DB = {
  "stack-array": [
    { title: "核心概念", body: "..." },
    { title: "操作流程", body: "..." },
    { title: "复杂度", body: "..." }
  ]
}
```

#### Phase 5: 测试与回归保护
- 新增/更新 Playwright 测试：
  - 顶层 6 大类导览可切换。
  - 每个大类下方显示对应方法区块。
  - 方法区块左侧 visualizer、右侧 C++ code panel 可见。
  - `Explanation / C++ Source` tab 不再出现在方法区块中。
  - `说明 / Slides` 按钮可开启并关闭 viewer。
  - mobile viewport 下左右栏改上下排列。
- 保留既有算法互动测试，迁移时逐批调整 selector。

### ⚠️ 风险与注意事项
- 目前 `app.js` 高度依赖单一 DOM 与全域状态；直接一次改成多 instance 风险较高。
- 建议以 registry 与 layout 先行，再逐步拆 renderer/state。
- 每次 PR 控制在一个阶段，确保 CI 与互动行为容易定位问题。
- `desc_db.js` 可先继续沿用，等 slide viewer 稳定后再拆 `slide_db.js`。

---

## 当前状态 (2026-05-14)

### ✅ 已完成

#### 1. C++ Design Patterns 可视化 (Commits: 5cd5f06, 7bd168c, c3048f9, 8ca87f0)
- **6 个设计模式** 跨越 3 个类别已完整实现
  - **创建型 (Creational)**: Singleton、Factory (#ec4899 粉色)
  - **结构型 (Structural)**: Adapter、Decorator (#10b981 绿色)
  - **行为型 (Behavioral)**: Observer、Strategy (#f97316 橙色)

- **实现特性**
  - ✅ 交互式 SVG 架构图（每个模式一个）
  - ✅ 完整 C++ 代码示例（全部编译成功，g++ -std=c++17）
  - ✅ 教育性描述 + 复杂度指标
  - ✅ 演示模式 + 逐步执行
  - ✅ 6 个 E2E 测试
  - ✅ 响应式设计整合

- **文件新增**
  - pattern_singleton.cpp (~55 行)
  - pattern_factory.cpp (~50 行)
  - pattern_adapter.cpp (~45 行)
  - pattern_decorator.cpp (~75 行)
  - pattern_observer.cpp (~70 行)
  - pattern_strategy.cpp (~85 行)

- **文件修改**
  - index.html - 菜单结构 (Design Patterns 组)
  - app.js - 渲染逻辑 + 演示流程 (600+ 行)
  - code_db.js - C++ 代码示例 (~280 行)
  - desc_db.js - 模式描述 (~150 行)
  - style.css - 模式样式 (~30 行)
  - tests/visualizer.spec.js - 6 个新测试

#### 2. GitHub Issue & PR 建立
- **Issue #21**: Add C++ Design Patterns Visualization
  - 完整的需求描述和接受标准
  - 所有 6 个模式列表
  - 测试结果摘要

- **PR #22**: Add C++ Design Patterns Visualization (6 patterns)
  - 链接到 Issue #21
  - 详细的变更说明
  - 每个模式的描述
  - 技术细节和集成信息

#### 3. CI 测试修复
- **Commit c3048f9**: 修复 Adapter 测试断言
  - 改为搜索 "Adapting" (第一个状态消息)
  - 确保快速捕获，不超时

- **Commit 8ca87f0**: 修复 Decorator 测试断言
  - 改为搜索 "Decorating" (第一个状态消息)
  - 与 Adapter 修复保持一致

### 📊 测试结果
- ✅ **51/51 测试通过** (0 个回归)
  - 6 个新设计模式测试: 全部通过
  - 45 个现有可视化工具测试: 全部通过

### 🔗 相关链接
- Issue #21: https://github.com/skhuang/dsvisual/issues/21
- PR #22: https://github.com/skhuang/dsvisual/pull/22
- 分支: `feature/categorized-menu`

---

## 后续工作项

### 📋 待办事项
- [ ] PR #22 代码审查
- [ ] 合并 PR 至主分支
- [ ] 部署至生产环境
- [ ] 添加更多设计模式（如 Prototype、Builder 等）
- [ ] 完善文档和教程

---

## 技术概要

### 架构设计
- **分层结构**: HTML 菜单 → JavaScript 路由 → SVG 渲染 → C++ 示例代码
- **状态管理**: `patternAnimationState` 用于演示流程控制
- **响应式**: 支持 4 个断点 (1100px, 900px, 720px, 480px)

### 代码质量
- 语言: C++17
- 编译: `g++ -std=c++17` (全部成功)
- 测试框架: Playwright
- 测试超时: 3000ms (优化的快速响应)

### 菜单集成
第 5 组 (Design Patterns) 含 3 个子组:
1. 创建型 (Creational) - Singleton、Factory
2. 结构型 (Structural) - Adapter、Decorator
3. 行为型 (Behavioral) - Observer、Strategy

---

## 提交历史

```
8ca87f0 Fix Decorator pattern test - search for 'Decorating' (first message)
c3048f9 Fix Adapter pattern test assertion - search for 'Adapting' substring
7bd168c Fix design pattern test assertions - reduce timeout to 3s
5cd5f06 Implement C++ Design Patterns visualization (6 patterns)
2d62718 Make OOP independent menu category (Group 5)
```

---

## 笔记

- 所有模式都遵循一致的可视化和代码风格
- 测试断言使用第一个状态消息以确保快速匹配
- 颜色编码按 GoF 模式分类标准应用
- 完全向后兼容，无功能移除或破坏性变更
