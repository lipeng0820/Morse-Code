# 摩斯密码 3日通 | MorseMastery

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[English](#english) | [中文](#chinese)

---

<a name="english"></a>
## 🇬🇧 English

### Project Overview
**MorseMastery** is a scientifically designed, gamified web application aimed at helping users master Morse Code in just **3 days**. 

Unlike traditional rote memorization tools, MorseMastery leverages **Visual Mnemonics** (superimposing Morse codes onto letter shapes), **Auditory Reinforcement** (rhythm training), and **Game-based Drills** to create strong neural links.

### Key Features

#### 1. The 3-Day Learning Curriculum
*   **Day 1: Basics & Symmetry**: Learn simple symmetrical letters (E, T, I, M, A, N, O, S, H) using high-contrast visual anchors.
*   **Day 2: Visual Logic**: Master letters with strong shape correlations (e.g., D=Door, K=Kangaroo, W=Waves).
*   **Day 3: Complex Mastery**: Tackle the hardest characters using rhythmic mnemonics (e.g., Q=Qi-Qiu/Balloon, F=Flag).

#### 2. Practice Arena (Gamified)
*   **Sight Reflex**: Flashcard style training to associate visual shapes with characters instantly.
*   **Audio Intercept**: The core skill of a radioman. Listen to the beep pattern and identify the character.
*   **Code Cracking**: Decipher full words, including 100+ high-frequency words and abbreviations (SOS, CQ, THE).
*   **Ranking System**: Progress from "Trainee" to "Ace Operator" based on your score streaks.

#### 3. Reference & Knowledge Base
*   **Interactive Dictionary**: Full list of Numbers (1-0), Punctuation, and Prosigns.
*   **Abbreviation Library**: A comprehensive list of Q-Codes (QTH, QSL) and Chat Abbreviations (73, TNX) used in real Amateur Radio (CW).
*   **Visual Patterns**: Numbers are grouped to show the logical progression of dots and dashes.

### Tech Stack
*   **Frontend**: React 18, TypeScript, Vite
*   **Styling**: Tailwind CSS (Glassmorphism design)
*   **Audio**: Native Web Audio API (Oscillators/GainNodes) for precise timing and pitch control.
*   **Visuals**: Custom SVG rendering for dynamic Morse overlays.
*   **AI**: Integrated Google Gemini API (optional) for generating creative mnemonic tips dynamically.

### Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/morse-mastery.git
    cd morse-mastery
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment (Optional)**
    Create a `.env` file for the AI features (Google Gemini):
    ```env
    VITE_API_KEY=your_google_gemini_api_key
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```

---

<a name="chinese"></a>
## 🇨🇳 中文

### 项目简介
**摩斯密码 3日通 (MorseMastery)** 是一款专为中文用户设计的科学摩斯密码学习工具。

我们抛弃了枯燥的死记硬背，采用 **视觉图像叠加 (Visual Mnemonics)**、**听觉节奏强化** 和 **游戏化演练**，帮助你在 **3天** 内建立起字符与“点(.)”、“划(-)”之间的直觉反射。

### 核心功能

#### 1. 三日通关课程
*   **Day 1 基础信号**：从最简单的对称图形入手（如 E=Eye, T=Table, M=Ma-Ma），建立信心。
*   **Day 2 进阶逻辑**：学习与形状强关联的字符（如 D=Door/门, K=Kangaroo/袋鼠, W=Waves/波浪）。
*   **Day 3 精通复杂**：攻克最难记忆的字符，使用独特的中文节奏助记（如 C=吹呀吹呀, Q=气球/Qi-Qiu）。

#### 2. 实战演练场
*   **视觉瞬记**：训练眼睛看到符号瞬间反应出字母的能力。
*   **听音破译**：像真正的报务员一样，只靠耳朵听声音识别情报。
*   **单词解密**：实战挑战 100+ 个高频英文单词和缩写（如 SOS, HI, OK）。
*   **军衔晋升**：通过连胜积累积分，从“见习学员”晋升为“王牌电报员”。

#### 3. 强化手册 (Reference)
*   **数字与标点**：直观展示数字（1-0）的点划消长规律。
*   **常用缩写库**：收录了业余无线电（HAM）常用的 Q简语（QSL, QTH）和通信缩写（73, 88, TNX），点击即可试听标准发音。
*   **SVG 可视化**：所有摩斯码均通过 SVG 精确绘制，而非简单的文本字符。

### 技术栈
*   **前端框架**: React 18, TypeScript, Vite
*   **样式库**: Tailwind CSS (采用现代毛玻璃拟态风格)
*   **音频引擎**: Web Audio API (原生振荡器实现无延迟、高精度的音频合成)
*   **AI 辅助**: 集成 Google Gemini API，为用户提供无限的创意助记提示。

### 安装与运行

1.  **克隆项目**
    ```bash
    git clone https://github.com/yourusername/morse-mastery.git
    cd morse-mastery
    ```

2.  **安装依赖**
    ```bash
    npm install
    ```

3.  **配置环境变量 (可选)**
    如需使用 AI 助记功能，请在根目录创建 `.env` 文件：
    ```env
    VITE_API_KEY=你的_GOOGLE_GEMINI_API_KEY
    ```

4.  **启动本地开发**
    ```bash
    npm run dev
    ```

---

**Designed with ❤️ for Morse Code Learners.**
