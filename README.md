# 摩斯密码 3日通 | MorseMastery

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCI+CiAgPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHJ4PSIyMCIgZmlsbD0iI0Y1OUUwQiIvPgogIDxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjMwIiBzdHJva2U9IiMwMjA2MTciIHN0cm9rZS13aWR0aD0iOCIgZmlsbD0ibm9uZSIvPgogIDxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjEyIiBmaWxsPSIjMDIwNjE3Ii8+CiAgPHJlY3QgeD0iMjAiIHk9IjQ2IiB3aWR0aD0iMjAiIGhlaWdodD0iOCIgcng9IjQiIGZpbGw9IiMwMjA2MTciLz4KICA8cmVjdCB4PSI2MCIgeT0iNDYiIHdpZHRoPSIyMCIgaGVpZ2h0PSI4IiByeD0iNCIgZmlsbD0iIzAyMDYxNyIvPgo8L3N2Zz4=" alt="MorseMastery Logo" width="100" height="100" align="right" />

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/AI-Google%20Gemini-8E75B2)](https://ai.google.dev/)

[中文](#chinese) | [English](#english)

---

<a name="chinese"></a>
## 🇨🇳 中文文档

### 项目简介
**摩斯密码 3日通 (MorseMastery)** 是一款专为中文用户设计的科学摩斯密码学习工具。

我们抛弃了枯燥的死记硬背，采用 **视觉图像叠加 (Visual Mnemonics)**、**听觉节奏强化** 和 **游戏化演练**，帮助你在 **3天** 内建立起字符与“点(.)”、“划(-)”之间的直觉反射。

### 🌟 核心亮点：AI 智能记忆助手

> **"记不住？让 AI 给你讲个故事。"**

这是本项目最独特的创新功能。摩斯密码本质上是一种抽象符号，初学者最大的痛点是**"记不住"**或**"容易混"**。

我们集成了 **Google Gemini** 大模型，将“被动记忆”转变为“主动联想”：

1.  **用户参与**：当你对某个字符（如 `Q: --.-`）感到难以记忆时，告诉 AI 你的联想线索（例如："Q 像气球" 或 "Queen"）。
2.  **AI 生成**：AI 会结合摩斯码的点划特征与你的线索，即时生成一个生动、逻辑自洽的助记故事（例如："God Save The Queen" 的节奏 `Da-Da-Di-Da`）。
3.  **强化记忆**：通过这种"自己参与构建"的知识，大脑的神经链接将更加牢固，实现过目不忘。

### 核心功能模块

#### 1. 三日通关课程 (Learn)
*   **Day 1 基础信号**：从最简单的对称图形入手（如 E=Eye, T=Table, M=Ma-Ma），建立信心。
*   **Day 2 进阶逻辑**：学习与形状强关联的字符（如 D=Door/门, K=Kangaroo/袋鼠, W=Waves/波浪）。
*   **Day 3 精通复杂**：攻克最难记忆的字符，使用独特的中文节奏助记（如 C=吹呀吹呀, Q=气球/Qi-Qiu）。

#### 2. 实战演练场 (Practice)
*   **视觉瞬记**：训练眼睛看到符号瞬间反应出字母的能力。
*   **听音破译**：像真正的报务员一样，只靠耳朵听声音识别情报。
*   **单词解密**：实战挑战 100+ 个高频英文单词和缩写（如 SOS, HI, OK），并包含不同难度分级。
*   **军衔晋升系统**：通过连胜积累积分，从“见习学员”一路晋升为“王牌电报员”。

#### 3. 强化手册 (Reference)
*   **可视化字典**：直观展示数字（1-0）、标点符号的点划消长规律。
*   **专业缩写库**：收录了业余无线电（HAM）常用的 Q简语（QSL, QTH）和通信缩写（73, 88, TNX），支持点击试听。
*   **SVG 动态渲染**：所有摩斯码均通过 SVG 精确绘制，而非简单的文本字符。

### 技术架构与国际化
本项目采用了**逻辑与内容分离**的架构，便于维护和扩展多语言。

*   **核心逻辑 (`data/visual_config.ts`)**: 存储摩斯码定义、SVG 坐标数据等不可变逻辑。
*   **内容文件 (`locales/*.ts`)**: 存储所有的界面文案、助记词、描述。
    *   `locales/zh.ts`: 中文文案
    *   `locales/en.ts`: 英文文案
*   **管理员维护**: 若要修改助记词或翻译，只需编辑 `locales` 文件夹下的对应文件，无需触碰核心代码。

### 安装与运行

1.  **克隆项目**
    ```bash
    git clone https://github.com/lipeng0820/Morse-Code.git
    cd Morse-Code
    ```

2.  **安装依赖**
    ```bash
    npm install
    ```

3.  **配置环境变量 (可选)**
    如需启用 AI 助记功能，请在根目录创建 `.env` 文件并填入你的 Google Gemini API Key：
    ```env
    VITE_API_KEY=你的_GOOGLE_GEMINI_API_KEY
    ```

4.  **启动本地开发**
    ```bash
    npm run dev
    ```

---

<a name="english"></a>
## 🇬🇧 English Documentation

### Project Overview
**MorseMastery** is a scientifically designed, gamified web application aimed at helping users master Morse Code in just **3 days**. 

We leverage **Visual Mnemonics** (superimposing codes on letters), **Auditory Reinforcement**, and **Gamified Drills** to build intuitive reflexes.

### 🌟 Feature Highlight: AI Memory Assistant

> **"Can't remember? Let AI tell you a story."**

Abstract dots and dashes are hard to memorize. We integrated **Google Gemini** to transform rote memorization into **Active Association**:

1.  **Input Context**: Stuck on a character? Give the AI a clue (e.g., "H looks like a House").
2.  **AI Generation**: The AI generates a custom mnemonic story that mathematically fits the Morse pattern (e.g., "Four corners of a house = 4 dots").
3.  **Memory Reinforcement**: By participating in the creation of the mnemonic, your brain creates stronger neural pathways.

### Key Features

#### 1. The 3-Day Curriculum
*   **Day 1: Basics**: Simple symmetrical shapes (E, T, M).
*   **Day 2: Visual Logic**: Shape-correlated characters (D=Door, W=Waves).
*   **Day 3: Mastery**: Complex rhythmic characters (Q=God Save The Queen).

#### 2. Practice Arena
*   **Sight Reflex**: Flashcard training.
*   **Audio Intercept**: Identify characters by ear (The core radioman skill).
*   **Code Cracker**: Decipher real words and abbreviations (SOS, CQ).
*   **Ranking System**: Climb from "Trainee" to "Ace Operator".

#### 3. Reference Library
*   **Interactive Dictionary**: Numbers, Punctuation, and Prosigns.
*   **Abbreviation List**: Comprehensive list of Amateur Radio Q-Codes and abbreviations.
*   **SVG Visualization**: Precise geometric rendering of all codes.

### Architecture
*   **Logic (`data/visual_config.ts`)**: Immutable Morse logic.
*   **Content (`locales/*.ts`)**: All UI text and mnemonics.

### Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/lipeng0820/Morse-Code.git
    cd Morse-Code
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment (Optional)**
    To enable AI features, create a `.env` file:
    ```env
    VITE_API_KEY=your_google_gemini_api_key
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```

---

**Designed with ❤️ for Morse Code Learners.**
