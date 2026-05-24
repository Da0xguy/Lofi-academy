import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize GoogleGenAI with explicit user agent and API key setup
let ai: GoogleGenAI | null = null;
const initGemini = () => {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    } else {
      console.warn("GEMINI_API_KEY environment variable is not defined. AI Yeti Tutor functionality will fall back to local responses.");
    }
  }
  return ai;
};

// Simple file-based database for persistence state
const STATE_FILE = path.join(process.cwd(), "lofi_quest_state.json");

interface LeaderboardEntry {
  username: string;
  avatar: string;
  wallet: string;
  xp: number;
  level: number;
  badges: string[];
}

const defaultLeaderboard: LeaderboardEntry[] = [
  { username: "YetiLoverSui", avatar: "🐻", wallet: "0x3e4...b7a1", xp: 1250, level: 5, badges: ["basics", "defi", "protocols", "history"] },
  { username: "MoveNinja", avatar: "🐱", wallet: "0xa84...92e1", xp: 950, level: 4, badges: ["basics", "defi", "protocols"] },
  { username: "LofiCoder", avatar: "🦊", wallet: "0x112...cc4f", xp: 750, level: 3, badges: ["basics", "defi"] },
  { username: "SuiExplorer", avatar: "🐼", wallet: "0x54f...67da", xp: 520, level: 2, badges: ["basics"] },
  { username: "OceanYeti", avatar: "🦦", wallet: "0x981...ef32", xp: 480, level: 2, badges: ["basics"] },
  { username: "MystenStyler", avatar: "🐨", wallet: "0x7d6...ab12", xp: 350, level: 1, badges: [] },
  { username: "SuilendUser", avatar: "🦁", wallet: "0x4fe...93dd", xp: 210, level: 1, badges: [] },
];

function loadState(): { leaderboard: LeaderboardEntry[] } {
  try {
    if (fs.existsSync(STATE_FILE)) {
      const data = fs.readFileSync(STATE_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading state file, resetting to default.", err);
  }
  
  // Write initial state
  const state = { leaderboard: defaultLeaderboard };
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing default state file", err);
  }
  return state;
}

function saveState(state: { leaderboard: LeaderboardEntry[] }) {
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving state file", err);
  }
}

// --------------------------------------------------------
// API Endpoints
// --------------------------------------------------------

// 1. Get Leaderboard & Top 10
app.get("/api/sui/leaderboard", (req, res) => {
  const state = loadState();
  // Sort descending by XP
  const sorted = [...state.leaderboard].sort((a, b) => b.xp - a.xp);
  res.json({ success: true, leaderboard: sorted });
});

// 2. Submit/Update User Progress & XP on Leaderboard
app.post("/api/sui/leaderboard", (req, res) => {
  const { username, wallet, xp, level, badges, avatar } = req.body;
  if (!wallet) {
    res.status(400).json({ success: false, error: "Missing wallet address" });
    return;
  }
  
  const state = loadState();
  const existingIndex = state.leaderboard.findIndex(
    (item) => item.wallet.toLowerCase() === wallet.toLowerCase()
  );
  
  const finalUsername = username || `Yeti-${wallet.substring(2, 6)}`;
  const finalAvatar = avatar || "🐻";
  
  if (existingIndex >= 0) {
    // Keep high scores or accumulate
    state.leaderboard[existingIndex].xp = Math.max(state.leaderboard[existingIndex].xp, xp || 0);
    state.leaderboard[existingIndex].level = Math.max(state.leaderboard[existingIndex].level, level || 1);
    state.leaderboard[existingIndex].username = finalUsername;
    state.leaderboard[existingIndex].avatar = finalAvatar;
    if (badges) {
      state.leaderboard[existingIndex].badges = Array.from(new Set([...(state.leaderboard[existingIndex].badges || []), ...badges]));
    }
  } else {
    // Add new user
    state.leaderboard.push({
      username: finalUsername,
      avatar: finalAvatar,
      wallet: wallet,
      xp: xp || 0,
      level: level || 1,
      badges: badges || [],
    });
  }
  
  saveState(state);
  res.json({ success: true, leaderboard: state.leaderboard.sort((a, b) => b.xp - a.xp) });
});

// 3. AI Tutor Interface / Prompt Chat
app.post("/api/gemini/tutor", async (req, res) => {
  const { prompt, track, lesson, history } = req.body;
  const client = initGemini();
  
  if (!prompt) {
    res.status(400).json({ success: false, error: "Missing prompt" });
    return;
  }
  
  const trackContext = track ? `Currently studying track: ${track}.` : "";
  const lessonContext = lesson ? `Currently on module: ${lesson}.` : "";
  
  const yetiPersona = `
  You are "Yeti the Tutor", a chill, cozy mascot for Lofi Quest and the Sui blockchain academy.
  Your tone is incredibly relaxed, friendly, clear, and lo-fi. You use lower-case text for a cozy aesthetic and often include phrases like "sip some tea...", "nice and steady...", "let's dive into the code vibes...", or "the yeti is meditating on this concept...". You explain complex Sui and Move smart contract topics in a very simple, conversational way.
  
  Rules:
  1. Write in a relaxed, minimalist, conversational style (all lowercase is highly preferred for a cozy feel, but capitalized words are allowed for code constructs or proper names).
  2. Use code blocks for any Sui Move or dev concepts. Keep explanations short, clear and friendly.
  3. Encourage the developer for their hackathon journey and give awesome hints.
  4. Never break character. Always speak as Yeti the Tutor. Include soft emojis like 🐻, 🍵, ❄️, ✨, 🎧.
  `;
  
  try {
    if (client) {
      const messages = [];
      if (history && Array.isArray(history)) {
        for (const msg of history) {
          messages.push({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }],
          });
        }
      }
      
      // Add current track prompt context
      const currentPromptText = `${trackContext} ${lessonContext} Developer says: "${prompt}"`;
      
      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: currentPromptText,
        config: {
          systemInstruction: yetiPersona,
          temperature: 0.8,
        },
      });
      
      const text = response.text || "lofi yeti is resting by the fire right now... tap 'next' to keep exploring or try asking again in a moment. 🐻☕";
      res.json({ success: true, text });
    } else {
      // Fallback local tutor simulator when no API key is specified
      const fallbackReplies = [
        "yeti thinks you're doing amazing! did you know that sui stands out because of its object-centric data model? everything is an object with unique id, rendering global storage lookups lightning fast. grab some tea and read the code tab! 🐻🍵",
        "ah, move is so elegant. unlike solidity, assets in move are secure first-class objects that can't be copied or accidentally dropped. they can only be moved, maintaining strict safety guarantees! ❄️✨",
        "gas on sui is super cool! the network validators agree on standard gas price reference rates at the start of each epoch, keeps things cheap and predictable for everyone listening to lofi tunes. 🎧💧",
        "nice question, questing friend! cetus or turbos operate as centralized liquidity market makers using sui's fast transaction speeds. interactive simulator is loaded below so you can test it live. 🌊☕",
        "minting is underway! once you pass the assessment with 70% or more, we'll send a move transaction to package::mint_badge to create your souvenir NFT. yeti is cheering you on! 🐻👑"
      ];
      const randomReply = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
      res.json({ success: true, text: `[offline mode] ${randomReply}` });
    }
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.json({ 
      success: true, 
      text: "yeti is slightly snoozing under the soft blanket of code... but don't worry! here is your lofi hint: the sui gas structure is object-based, and double-spent tokens are completely impossible. keep on rockin'! 🐻🍵" 
    });
  }
});

// 4. Simulate Badge Minting via Move Contract (Returns Explorer Links & Logs)
app.post("/api/sui/mint-badge", (req, res) => {
  const { wallet, badgeId, trackName } = req.body;
  if (!wallet) {
    res.status(400).json({ success: false, error: "Missing connected wallet" });
    return;
  }
  
  const randomHex = () => Math.floor(Math.random() * 16).toString(16);
  const txHash = "0x" + Array.from({ length: 64 }, randomHex).join("");
  const objectId = "0x" + Array.from({ length: 64 }, randomHex).join("");
  
  const gasUsedMIST = 1012500 + Math.floor(Math.random() * 123400); // UI displays in SUI (1 SUI = 1e9 MIST)
  const gasUsedSUI = (gasUsedMIST / 1_000_000_000).toFixed(6);
  
  const logs = [
    `[INFO] Preparing Move call: 0xecc5617a::badge_kiosk::mint_to_sender`,
    `[INFO] Checking wallet authentication: Approved for ${wallet}`,
    `[INFO] Verified track completion certificate: "${trackName}"`,
    `[MOVE_EXEC] Allocating object UID...`,
    `[MOVE_EXEC] Borrowing Kiosk ownership authority...`,
    `[MOVE_EXEC] Created Object: ID ${objectId.slice(0, 16)}...`,
    `[MOVE_EXEC] Event emitted: 0xecc5617a::badge_kiosk::BadgeMinted { recipient: ${wallet.slice(0, 8)}..., badge_type: "${badgeId}", xp_granted: 150 }`,
    `[SUCCESS] Transaction executed. Gas used: ${gasUsedSUI} SUI`
  ];

  res.json({
    success: true,
    txHash: txHash,
    objectId: objectId,
    gasUsedSUI: gasUsedSUI,
    explorerUrl: `https://suiexplorer.com/txblock/${txHash}?network=testnet`,
    logs: logs,
    timestamp: new Date().toISOString()
  });
});

// Serve frontend assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Lofi Quest Backend Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
