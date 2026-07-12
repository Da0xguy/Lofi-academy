# LOFI QUEST: COZY SUI ACADEMY & INTERACTIVE MOVE PLAYGROUND
## Technical and Operational Documentation
*An Interactive Gamified Web Application Combining Lofi Aesthetics with Specialized Blockchain Education.*

---

## 1. Table of Contents
1. **Introduction and Project Overview**
2. **Key Visual and Interactive Features**
3. **Application Architecture & Data Flows**
4. **Codebase Directory Layout**
5. **Technical Component Breakdowns**
6. **Progression, Leveling Heuristics, and Gamification Specs**
7. **Sandbox DeFi & Programmable Transaction Blocks (PTB) Compiler**
8. **Yeti AI Tutor Integration (Gemini 3.5 Flash & Fallbacks)**
9. **Persistent Multi-User Leaderboard Setup**
10. **Build, Setup, and Deployment Guide**

---

## 2. Introduction and Project Overview
**Lofi Quest** is an immersive educational portal designed to teach developers and blockchain enthusiasts the unique features of the high-speed **Sui Network** and its primary smart contract language, **Sui Move**. 

Unlike conventional, dry developmental gateways, Lofi Quest places the user inside a virtual, cozy mountain cabin. Enwrapped in tranquil snowfall and warm fireplace animations, and accompanied by a lofi cassette soundtrack, students are guided through interactive tracks by their personal study companion, **Yeti the Tutor**.

---

## 3. Key Visual and Interactive Features
*   **Dual Aesthetic Modes**: Toggle fluidly between a crisp, high-contrast light theme and a rich, eye-safe cabin dark mode.
*   **Interactive Sui Trail Map & Thematic Backdrops**: A visual serpentine trail map connects modules dynamically. Based on the active track selection, the map dynamically loads customized scenic backing illustrations (e.g., beautiful mountains, liquid staking fields, and the warm, sleeping Yeti lofi room for the **Lofi Foundation**), stylized with subtle blur filters and soft gradient overlays to preserve high contrast and readability.
*   **Interactive Chalkboards**: View custom visual slides containing explanatory schemas, code highlights, and interactive multiple-choice quizzes for each module.
*   **Interactive Synthesizer/Cassette Player**: Includes an integrated lofi audio widget allowing students to play, pause, skip, and adjust the volume of a curated track list of cozy lofi beats.
*   **Interactive Sandbox (PTB & DeFi Builder)**: Construct composite, multi-step transactions (Minting standard SUI coin, swapping tokens in a CLMM pool, depositing assets into a lending market, and staking tokens), executing simulated smart contracts on a virtual machine replica.
*   **Persistent Cloud Records**: All progress metrics, including active experience points (XP), completed modules, user profiles, streaks, and minted badges, synchronize automatically to a secure database.

---

## 4. Application Architecture & Data Flows
The application operates on a full-stack dual-layer architecture:

```
┌────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                              │
│  React (Vite) Front-End App                                            │
│  - Dynamic Component State Tracking                                   │
│  - Fluid UI Transitions & Animations (Framer Motion)                  │
│  - Heuristic Offline Routing Handler                                   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │  JSON API Requests / Responses
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                             SERVER PROXY                               │
│  Express Server (TypeScript)                                           │
│  - Secure API Proxy Router                                             │
│  - Keeps Gemini AI & Database Keys safely hidden from browser inspectors│
│  - Serves compiled static assets in production mode                    │
└───────────────────────┬────────────────────────┬───────────────────────┘
                        │                        │
                        ▼                        ▼
┌───────────────────────────────┐        ┌───────────────────────────────┐
│        DATABASE LAYER         │        │         AI SERVICES           │
│  Cloud Firestore Storage      │        │  Google Gemini 3.5 Flash      │
│  - Syncs Active User Profiles │        │  - Cozy AI companion Yeti     │
│  - Leaderboard aggregations   │        │  - Tailored course feedback   │
└───────────────────────────────┘        └───────────────────────────────┘
```

---

## 5. Codebase Directory Layout

| File / Folder Path | Type | Functional Role / Purpose |
| :--- | :--- | :--- |
| `/server.ts` | Backend | Express server entry point. Sets up endpoint proxies for Gemini and Firestore. |
| `/package.json` | Manifest | Manages npm scripts, compiler configurations, and dev dependencies. |
| `/firestore.rules`| Ruleset | Restricts read/write permissions directly inside the Cloud Firestore setup. |
| `/src/main.tsx` | Entry | Initializes the React virtual DOM and mounts parent layout containers. |
| `/src/App.tsx` | Main Core | Global State Engine. Handles profiles, levels, theme registers, and navigation. |
| `/src/types.ts` | Types | Definitive TypeScript interfaces for Modules, Sliders, Quizzes, and profiles. |
| `/src/data.ts` | Dataset | Full learning syllabus. Contains 36 detailed modules, slides, code segments, and quizzes. |
| `/src/components/`| Folder | Directory housing isolated modular visual UI components: |
| `  ├── LandingPage.tsx` | View | Registration gateway featuring character profiles, usernames, and avatar selection. |
| `  ├── Background.tsx` | Overlay | Snowfall shaders, fireplaces, rain filters, and full light/dark transition animations. |
| `  ├── YetiChalkboard.tsx` | View | Core study whiteboard managing slides, quiz executions, code-highlights, and results. |
| `  ├── ProfileWidget.tsx` | Widget | Cabinet monitoring active streaks, XP targets, level titles, and earned nft badges. |
| `  ├── DeFiSimulator.tsx` | Widget | Interactive drag-and-drop compiler simulating multi-step transactions. |
| `  ├── LeaderboardWidget.tsx`| Widget | Real-time scoreboards syncing active user metrics with database channels. |
| `  ├── AudioPlayerWidget.tsx`| Widget | Retro cassette audio player. |
| `  └── TutorFloatingWidget.tsx` | Widget | Chat interface to query Yeti on particular blockchain subjects. |

---

## 6. Progression, Leveling Heuristics, and Gamification Specs
Lofi Quest includes deep visual milestones to reward persistent study. As a user completes lessons, passes quizzes, or executes sandbox block sequences, they obtain experience points (XP). 

### 6.1 Exponential Level Progression Table
| Active Level | Title | XP Requirements | Next Threshold Target |
| :---: | :--- | :--- | :---: |
| **1** | standard beginner | `0 - 149 XP` | `150 XP` |
| **2** | apprentice developer | `150 - 399 XP` | `250 XP` (cumulative `400 XP`) |
| **3** | tactician architecture | `400 - 799 XP` | `400 XP` (cumulative `800 XP`) |
| **4** | logic sage | `800 - 1399 XP` | `600 XP` (cumulative `1400 XP`) |
| **5** | move mastery | `1400+ XP` | Completed Core Course |

### 6.2 XP Allocations Matrix
*   **Completing a Lesson Module**: `+40 XP` to `+100 XP` (defined on module level metadata)
*   **Passing a Slide-Quiz**: Included in module completion bonuses.
*   **Executing a Sandbox PTB Sequence**: `+15 XP` per block verification.
*   **Claiming Daily Cozy Bonus**: `+30 XP` (resets every 24 hours).

---

## 7. Sandbox DeFi & Programmable Transaction Blocks (PTB) Compiler
Sui introduces **Programmable Transaction Blocks (PTB)**, allowing users to combine multiple transactions into a single execution block on-chain. Our simulator explicitly mimics this compiler process inside `DeFiSimulator.tsx`:

### 7.1 Simulated Transactions Supported
1.  **Mint Test SUI Tokens**: Receives gas and liquid token values to prepare the sequence.
2.  **Cetus AMM Swap**: Swaps virtual SUI for wrapped USDT with accurate dynamic price calculations.
3.  **Suilend Loan Placement**: Deposits stablecoins into vault buckets to spawn supply positions and earn interest vouchers.
4.  **Liquid Staking Loop**: Lock SUI tokens into the liquid staking pool to secure sSUI (Staked SUI) receipts.

### 7.2 Simulated Compiler Outputs
When a user sequences blocks and clicks "Run Block Sequence", the simulator processes the logic:
*   Generates a mock cryptographic transaction hash (`0x...`).
*   Verifies independent state access arguments (simulating Sui’s parallelism).
*   Calculates gas consumed in MIST and deducts SUI balances.
*   Renders complete, step-by-step console outputs displaying VM step traces (e.g. `MINT_COIN` -> `SWAP_POOL` -> `SUPPLY_COLLATERAL` -> `STAKE_POOL`).

---

## 8. Yeti AI Tutor Integration (Gemini 3.5 Flash)
The helper companion **Yeti** was structured to offer conversational assistance.

### 8.1 API Integration Flow
*   The frontend client sends requests to the proxy endpoint `/api/gemini/tutor` alongside the current lesson context, the chosen track title, and active message logs.
*   The proxy server validates environment configuration metrics and invokes the official `@google/genai` TypeScript SDK using model references to `gemini-3.5-flash`.
*   System instructions mandate that Yeti must speak in a warm, lofi, all-lowercase, cozy conversational voice.
*   If the system is run without a secure `GEMINI_API_KEY`, the server automatically flags the omission and routes requests to high-grade local heuristic replies, guaranteeing flawless service continuity.

---

## 9. Persistent Multi-User Profiles & Leaderboard Setup
To create real community engagement and prevent progress loss, Lofi Quest integrates a cloud database to manage user profiles and coordinate a live scoreboard showing study rankings:

*   **User Profile Database Synchronization**:
    *   `GET /api/user/profile/:userId`: Loads user stats, completed tracks, levels, custom avatar metadata, and streaks from Cloud Firestore on login.
    *   `POST /api/user/profile/:userId`: Securely persists state updates back to Cloud Firestore whenever the user finishes a module slide, executes a simulated PTB, or gains XP.
*   **Leaderboard Pipeline**: 
    *   `GET /api/sui/leaderboard`: Collects top-ranking user documents from Cloud Firestore.
    *   `POST /api/sui/leaderboard`: Syncs active scores on module completion.
*   **Fallback Mock Indexes**: For local setups lacking database configurations, the endpoint blends realistic online bots to present mock competitors, keeping visual panels engaging and warm.

---

## 10. Build, Setup, and Deployment Guide

### 10.1 Local Installation Notes
To run Lofi Quest on local development setups:
1.  Clone the project repository to your storage workspace.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up your local configuration variables file (`.env`):
    ```env
    GEMINI_API_KEY=your-api-key-here
    ```
4.  Launch the development server:
    ```bash
    npm run dev
    ```
5.  Open your internet browser and navigate to `http://localhost:3000`.

### 10.2 Production Compilation and Standalone Server Launches
In production environments, we bundle code to ensure high execution performance and fast startup times:
```bash
# Formats React assets and compiles server.ts to dist/server.cjs
npm run build

# Boots the completed web application instantly
npm run start
```
By utilizing `esbuild` for final server packaging, all relative Node module dependencies resolve at compilation time, ensuring lightweight filesystem footprints.

---

*Documentation designed to support seamless copy/pasting. To open this in Microsoft Word, copy all contents on this page, open a clean document in Word, and paste directly. Headers, bold elements, tables, and scripts are fully supported.*
