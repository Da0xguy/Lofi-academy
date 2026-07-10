# Lofi Quest: Cozy Sui Academy & Interactive Move Playgrounds

Welcome to **Lofi Quest**, a beautifully crafted, highly immersive web application combining gamified blockchain education with relaxed lo-fi vibes. Guided by **Yeti the Tutor**, users learn the intricate details of the Sui network, write Move contracts, build multi-step Programmable Transaction Blocks, and earn achievements in a warm, virtual cabin environment.

---

## 📖 Key Project Features

### 1. Robust Gamified Syllabus (6 Tracks of 6 Modules each)
The application defines **6 interactive learning tracks** inside `src/data.ts`. To ensure high educational value, each track features **at least 6 rich modules**, and each module contains **at least 5 detailed chalkboard slides** (steps) ending with a validation quiz.
*   **Track 1: Sui Core & Move Fundamentals**: Basics of objects, storage funds, fast-path consensus, gas pricing, and parallel transaction execution lanes.
*   **Track 2: Deep Dive into DeFi on Sui**: Concentrated liquidity AMMs (CLMM), lending interest equilibrium, liquid staking mechanisms, derivatives, and price oracles.
*   **Track 3: On-Chain Protocols & Mechanics**: DeepBook CLOB, trustless Kiosk transfer policies, gas budget security, zkLogin onboarding, and Multisig security.
*   **Track 4: Sui Evolution & Ecosystem**: Mysten Labs roots, Libra/Diem origins, Capy dynamic nesting historical tests, and the decentralized Walrus storage protocol.
*   **Track 5: Sui Move Coding Foundations**: Direct code syntax, struct abilities (`key`, `store`, `copy`, `drop`), mutable balance modifications, and module entry points.
*   **Track 6: Advanced Move Architecture**: Object destruction, shared states, Admin Cap authorizations, event logs emitting, and reentrancy protections.

### 2. Adaptive User Progression Engine
To reward deep study, user leveling requirements scale up exponentially as skills advance (calculated inside `src/App.tsx`):
*   **Level 1**: `0 - 149 XP` (Standard Beginner)
*   **Level 2**: `150 - 399 XP` (Apprentice Level — requires `+150 XP`)
*   **Level 3**: `400 - 799 XP` (Tactician Level — requires `+250 XP`)
*   **Level 4**: `800 - 1399 XP` (Sage Level — requires `+400 XP`)
*   **Level 5**: `1400+ XP` (Mastery Level — requires `+600 XP`)

### 3. Sandbox DeFi Simulator & PTB Builder
An interactive drag-and-click transaction compiler that models Sui’s game-changing Programmable Transaction Blocks (PTB). Inside `DeFiSimulator.tsx`, players can sequence multi-step transaction loops:
1.  **Mint Test SUI**: Initialize standard coin resources.
2.  **Cetus Pool Swap**: Sell SUI to acquire wrapped stablecoins.
3.  **Suilend Deposit**: Lend stablecoins to unlock interest-yielding voucher positions.
4.  **Liquid Staking**: Convert core tokens to sSUI (Liquid Staked SUI).
Executing these mock calls generates detailed simulated Move transaction logs, consumes virtual gas, and grants live XP payouts!

### 4. Yeti AI Tutor (Gemini 3.5 Flash)
The helpful, character-locked mascot companion. Powered server-side by `gemini-3.5-flash`, the tutor dynamically reads the user’s selected track, current lesson, and chat history to provide supportive, cozy, all-lowercase guidance. If the endpoint is unconfigured or offline, it gracefully falls back to secure local heuristic hints.

### 5. Safe & Cozy Account Authentication (Firebase Sync)
The application features a secure, full-stack email-and-password-based account system backed by Cloud Firestore. Instead of complex Web3 seed-phrase setups, users can instantly register, log in, and securely sync their consensus XP, levels, learning streak, custom avatars, and completed module achievements in the cloud across any device or browser.

### 6. Interactive SUI Kiosk NFT Showcase (Coming Soon)
A dedicated, retro-styled showcase area models Sui's unique **Kiosk** system. Completed track achievements are displayed as custom certificate badges. While the application currently displays these under a **Coming Soon** simulated placeholder (for easy playground exploration), the layout is fully styled and pre-configured to bind to real on-chain SUI transactions, preparing users to mint their educational achievements as authentic on-chain NFTs.

---

## 📂 Codebase Directory Structure

```
.
├── server.ts                    # Full-stack backend entry point (Express, Vite proxy, Gemini, & Firestore)
├── package.json                 # Project scripts, node dependencies, and build pipelines
├── tsconfig.json                # TypeScript compilation parameters
├── index.html                   # HTML structure anchor
├── metadata.json                # Application metadata and system permission definitions
├── firebase-blueprint.json      # Intermediary database schema blueprints
├── firestore.rules              # Secure read/write security parameters for Cloud Firestore
└── src
    ├── main.tsx                 # Core React DOM mounting anchor
    ├── App.tsx                  # Primary page visual router & Global State Engine
    ├── index.css                # Global styling stylesheet importing Tailwind CSS 
    ├── types.ts                 # Strongly-typed TypeScript interfaces
    ├── data.ts                  # Raw learning syllabi, slides, quiz structures, and metadata
    ├── firebase.ts              # Local wrapper facilitating browser Firestore queries
    ├── lib
    │   └── utils.ts             # Tailwind class name mergers
    └── components
        ├── LandingPage.tsx      # Entry registration screen (with custom secure Auth Modal for Sign In / Sign Up)
        ├── Background.tsx       # Animated cozy cabin overlay rendering snowfall & fireplaces
        ├── YachtChalkboard.tsx  # Dynamic lesson slide manager, quiz screens, and navigation
        ├── ProfileWidget.tsx    # User stats cabinet tracking progress badges and level progressions
        ├── DeFiSimulator.tsx    # Sandbox transaction-block mock compiling loop
        ├── LeaderboardWidget.tsx# Real-time ranking feed synced from database
        ├── AudioPlayerWidget.tsx# Retro cassette-styled lofi soundtrack synthesizer
        └── TutorFloatingWidget.tsx # Interactive AI Yeti chatbot interface
```

---

## 🏗️ System Architecture & Data Flows

### 1. The React Client (Frontend)
Built with **React 19**, **Vite**, **TypeScript**, and **Tailwind CSS**. 
*   **State Management**: Orchestrated in `src/App.tsx`. A single unified profile state handles local XP tracking, completed modules registers, active level, and custom avatar descriptors.
*   **Micro-Animations**: Framer Motion (`motion/react`) powers smooth, satisfying fade transitions on slide updates, level-up alerts, and button hovers.
*   **Persistence**: Whenever the active user modifies their profile (e.g. completes an assessment, takes a daily bonus, or executes a simulated swap), data synchronizes directly with the backend database.

### 2. The Node/Express Server (Backend)
An Express engine that acts as a secure, sandboxed proxy server to keep API keys completely safe from browser visibility.
*   `GET /api/sui/leaderboard`: Collects all active profiles from Cloud Firestore, appends default offline leaderboard bots, sorts descending by XP values, and returns the compiled Top 10 rankings.
*   `POST /api/sui/leaderboard`: Safely increments user records, validates streak metadata, registers track completion badges, and saves everything to the database.
*   `POST /api/gemini/tutor`: Pulls current lesson contexts and coordinates a conversational chat sequence with the Gemini 3.5 Flash API using protective system instructions.
*   `POST /api/sui/mint-badge`: Simulates cryptographic Move package generation. Generates a mock transaction hash, object identifier, and calculates gas consumption, sending detailed Move compiler console logs back to the user.

---

## 🛠️ Build and Deployment Specifications

Our custom building scripts compile both backend and frontend layers cleanly inside `/dist`:
*   **`npm run dev`**: Launches the Express server in TypeScript execution mode using `tsx`. In this mode, Vite is mounted dynamically as a middleware layer to serve hot assets to port `3000`.
*   **`npm run build`**: 
    1.  Compiles the static frontend React components into optimized browser assets inside the `/dist` directory via Vite.
    2.  Compiles the backend `server.ts` file via `esbuild` into a **single, bundled, self-contained CommonJS file** located at `dist/server.cjs`. This bundler step completely bypasses Node runtime ES module relative-import warnings and optimizes cold start loading speeds on serverless runners.
*   **`npm run start`**: Directly boots the completed, production-ready server utilizing `node dist/server.cjs`.

---

## 🌌 Environment Variables Setup

To unlock the Yeti AI Tutor chat companion, establish a `.env` file in the project's root:

```env
# Documented in .env.example
GEMINI_API_KEY=your_actual_google_gemini_api_key_here
```

*Note: If no key is supplied, Lofi Quest automatically detects the omission and transitions to a local heuristic fallback response system so studying remains fully functional.*

---

## 🐻 Happy Learning on Sui!
*Sip some tea, turn on the lofi beats, and enjoy crafting cozy move code under the snow with Yeti!*
