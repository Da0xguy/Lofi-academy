import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Firebase dynamically from the applet configuration
const configPath = path.join(process.cwd(), "firebase-applet-config.json");
const firebaseConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);

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

interface LeaderboardEntry {
  username: string;
  avatar: string;
  wallet: string;
  xp: number;
  level: number;
  badges: string[];
  rankDirection?: "up" | "down" | "same";
}

const defaultLeaderboard: LeaderboardEntry[] = [
  { username: "YetiLoverSui", avatar: "🐻", wallet: "0x3e4...b7a1", xp: 1250, level: 5, badges: ["basics", "defi", "protocols", "history"], rankDirection: "same" },
  { username: "MoveNinja", avatar: "🐱", wallet: "0xa84...92e1", xp: 950, level: 4, badges: ["basics", "defi", "protocols"], rankDirection: "up" },
  { username: "LofiCoder", avatar: "🦊", wallet: "0x112...cc4f", xp: 750, level: 3, badges: ["basics", "defi"], rankDirection: "down" },
  { username: "SuiExplorer", avatar: "🐼", wallet: "0x54f...67da", xp: 520, level: 2, badges: ["basics"], rankDirection: "up" },
  { username: "OceanYeti", avatar: "🦦", wallet: "0x981...ef32", xp: 480, level: 2, badges: ["basics"], rankDirection: "same" },
  { username: "MystenStyler", avatar: "🐨", wallet: "0x7d6...ab12", xp: 350, level: 1, badges: [], rankDirection: "down" },
  { username: "SuilendUser", avatar: "🦁", wallet: "0x4fe...93dd", xp: 210, level: 1, badges: [], rankDirection: "up" },
];

// --------------------------------------------------------
// API Endpoints
// --------------------------------------------------------

// 1. Get Leaderboard & Top 10 with Firestore sync
app.get("/api/sui/leaderboard", async (req, res) => {
  try {
    const usersCol = collection(db, "users");
    const snapshot = await getDocs(usersCol);
    const dbUsers: LeaderboardEntry[] = [];
    
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const badgeIds = Array.isArray(data.mintedBadges)
        ? data.mintedBadges.map((b: any) => b.trackId)
        : (Array.isArray(data.completedTracks) ? data.completedTracks : []);

      dbUsers.push({
        username: data.username || "CozyExplorer",
        avatar: data.avatar || "🦊",
        wallet: data.walletAddress || docSnap.id,
        xp: Number(data.xp ?? 0),
        level: Number(data.level ?? 1),
        badges: badgeIds,
        rankDirection: "same"
      });
    });

    const activeWallets = new Set(dbUsers.map(u => u.wallet.toLowerCase()));
    const finalLeaderboard = [...dbUsers];
    for (const b of defaultLeaderboard) {
      if (!activeWallets.has(b.wallet.toLowerCase())) {
        finalLeaderboard.push(b);
      }
    }

    // Sort descending by XP
    finalLeaderboard.sort((a, b) => b.xp - a.xp);
    res.json({ success: true, leaderboard: finalLeaderboard });
  } catch (err) {
    console.error("Firestore leaderboard retrieval failed:", err);
    res.json({ success: true, leaderboard: defaultLeaderboard });
  }
});

// 2. Submit/Update User Progress & XP on Leaderboard
app.post("/api/sui/leaderboard", async (req, res) => {
  const { username, wallet, xp, level, badges, avatar } = req.body;
  if (!wallet) {
    res.status(400).json({ success: false, error: "Missing wallet address" });
    return;
  }
  
  const cleanWallet = wallet.toLowerCase().trim();
  const userDocRef = doc(db, "users", cleanWallet);
  
  try {
    const existingSnap = await getDoc(userDocRef);
    let finalProfile: any = {};
    if (existingSnap.exists()) {
      const data = existingSnap.data();
      finalProfile = {
        username: username || data.username || `Yeti-${cleanWallet.substring(2, 6)}`,
        avatar: avatar || data.avatar || "🐻",
        walletAddress: cleanWallet,
        xp: Math.max(Number(data.xp ?? 0), Number(xp ?? 0)),
        level: Math.max(Number(data.level ?? 1), Number(level ?? 1)),
        completedModules: data.completedModules || [],
        completedTracks: data.completedTracks || [],
        claimedWelcomeXP: data.claimedWelcomeXP || false,
        mintedBadges: data.mintedBadges || [],
        streak: Number(data.streak ?? 1),
        lastLoginDate: data.lastLoginDate || new Date().toISOString().split("T")[0]
      };
      
      if (badges) {
        const existingTrackIds = new Set((finalProfile.mintedBadges || []).map((b: any) => b.trackId));
        for (const trackId of badges) {
          if (!existingTrackIds.has(trackId)) {
            finalProfile.mintedBadges.push({
              trackId: String(trackId),
              tokenId: `token-${Math.random().toString(36).substring(2, 8)}`,
              txHash: `0x_mock_tx_${Math.random().toString(16).substring(2, 10)}`,
              mintedAt: new Date().toISOString()
            });
          }
        }
      }
    } else {
      finalProfile = {
        username: username || `Yeti-${cleanWallet.substring(2, 6)}`,
        avatar: avatar || "🐻",
        walletAddress: cleanWallet,
        xp: Number(xp ?? 0),
        level: Number(level ?? 1),
        completedModules: [],
        completedTracks: [],
        claimedWelcomeXP: false,
        mintedBadges: badges ? badges.map((trackId: string) => ({
          trackId: String(trackId),
          tokenId: `token-${Math.random().toString(36).substring(2, 8)}`,
          txHash: `0x_mock_tx_${Math.random().toString(16).substring(2, 10)}`,
          mintedAt: new Date().toISOString()
        })) : [],
        streak: 1,
        lastLoginDate: new Date().toISOString().split("T")[0]
      };
    }
    
    await setDoc(userDocRef, finalProfile);
    
    // Now trigger a refresh of the leaderboard to return to client
    const usersCol = collection(db, "users");
    const snapshot = await getDocs(usersCol);
    const dbUsers: LeaderboardEntry[] = [];
    
    snapshot.forEach((snap) => {
      const data = snap.data();
      const badgeIds = Array.isArray(data.mintedBadges)
        ? data.mintedBadges.map((b: any) => b.trackId)
        : (Array.isArray(data.completedTracks) ? data.completedTracks : []);

      dbUsers.push({
        username: data.username || "CozyExplorer",
        avatar: data.avatar || "🦊",
        wallet: data.walletAddress || snap.id,
        xp: Number(data.xp ?? 0),
        level: Number(data.level ?? 1),
        badges: badgeIds,
        rankDirection: "same"
      });
    });

    const activeWallets = new Set(dbUsers.map(u => u.wallet.toLowerCase()));
    const finalLeaderboard = [...dbUsers];
    for (const b of defaultLeaderboard) {
      if (!activeWallets.has(b.wallet.toLowerCase())) {
        finalLeaderboard.push(b);
      }
    }
    
    finalLeaderboard.sort((a, b) => b.xp - a.xp);
    res.json({ success: true, leaderboard: finalLeaderboard });
  } catch (err) {
    console.error("Firestore leaderboard save failed:", err);
    res.json({ success: false, error: "Database save error" });
  }
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
  
  let logs: string[] = [];
  if (badgeId === "worthless-nft") {
    logs = [
      `[WARNING] INITIALIZING TRANSFERS FOR A CERTIFIED WORTHLESS ITEM.`,
      `[INFO] Preparing Move call: 0x000abc1e::junk::mint_worthless_garbage`,
      `[INFO] Approving zero-utility transaction protocol for: ${wallet}`,
      `[MOVE_EXEC] Allocating object UID with literally zero real utility or monetary backing...`,
      `[MOVE_EXEC] Locked trash descriptor: ID ${objectId.slice(0, 16)}...`,
      `[MOVE_EXEC] Event emitted: 0x000abc1e::junk::GarbageCreated { recipient: ${wallet.slice(0, 8)}..., asset: "Sui Cozy Lint Block", dynamic_worth: 0.00000000 }`,
      `[SUCCESS] Garbage collector transaction fully settled. Gas of ${gasUsedSUI} SUI was paid, but output value remains $0.00.`
    ];
  } else {
    logs = [
      `[INFO] Preparing Move call: 0xecc5617a::badge_kiosk::mint_to_sender`,
      `[INFO] Checking wallet authentication: Approved for ${wallet}`,
      `[INFO] Verified track completion certificate: "${trackName}"`,
      `[MOVE_EXEC] Allocating object UID...`,
      `[MOVE_EXEC] Borrowing Kiosk ownership authority...`,
      `[MOVE_EXEC] Created Object: ID ${objectId.slice(0, 16)}...`,
      `[MOVE_EXEC] Event emitted: 0xecc5617a::badge_kiosk::BadgeMinted { recipient: ${wallet.slice(0, 8)}..., badge_type: "${badgeId}", xp_granted: 150 }`,
      `[SUCCESS] Transaction executed. Gas used: ${gasUsedSUI} SUI`
    ];
  }

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
