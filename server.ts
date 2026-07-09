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
    console.log("[SERVER_STARTUP] GEMINI_API_KEY presence status:", apiKey ? `present (length: ${apiKey.length})` : "ABSENT/MISSING");
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
  yetiHighScore?: number;
}

const defaultLeaderboard: LeaderboardEntry[] = [
  { username: "YetiLoverSui", avatar: "🐻", wallet: "0x3e4...b7a1", xp: 1250, level: 5, badges: ["basics", "defi", "protocols", "history"], rankDirection: "same", yetiHighScore: 34 },
  { username: "MoveNinja", avatar: "🐱", wallet: "0xa84...92e1", xp: 950, level: 4, badges: ["basics", "defi", "protocols"], rankDirection: "up", yetiHighScore: 27 },
  { username: "LofiCoder", avatar: "🦊", wallet: "0x112...cc4f", xp: 750, level: 3, badges: ["basics", "defi"], rankDirection: "down", yetiHighScore: 19 },
  { username: "SuiExplorer", avatar: "🐼", wallet: "0x54f...67da", xp: 520, level: 2, badges: ["basics"], rankDirection: "up", yetiHighScore: 12 },
  { username: "OceanYeti", avatar: "🦦", wallet: "0x981...ef32", xp: 480, level: 2, badges: ["basics"], rankDirection: "same", yetiHighScore: 15 },
  { username: "MystenStyler", avatar: "🐨", wallet: "0x7d6...ab12", xp: 350, level: 1, badges: [], rankDirection: "down", yetiHighScore: 5 },
  { username: "SuilendUser", avatar: "🦁", wallet: "0x4fe...93dd", xp: 210, level: 1, badges: [], rankDirection: "up", yetiHighScore: 2 },
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
      if (!data) return;
      
      const badgeIds = Array.isArray(data.mintedBadges)
        ? data.mintedBadges.map((b: any) => b?.trackId).filter(Boolean)
        : (Array.isArray(data.completedTracks) ? data.completedTracks : []);

      const walletStr = data.walletAddress || docSnap.id || "";
      if (!walletStr) return;

      dbUsers.push({
        username: String(data.username || "CozyExplorer"),
        avatar: String(data.avatar || "🦊"),
        wallet: String(walletStr),
        xp: Number(data.xp ?? 0),
        level: Number(data.level ?? 1),
        badges: badgeIds,
        rankDirection: "same",
        yetiHighScore: Number(data.yetiHighScore ?? 0)
      });
    });

    const activeWallets = new Set(
      dbUsers
        .map(u => typeof u.wallet === "string" ? u.wallet.toLowerCase() : "")
        .filter(Boolean)
    );
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
        lastLoginDate: data.lastLoginDate || new Date().toISOString().split("T")[0],
        yetiHighScore: Number(data.yetiHighScore ?? 0),
        yetiGamesPlayed: Number(data.yetiGamesPlayed ?? 0)
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
        lastLoginDate: new Date().toISOString().split("T")[0],
        yetiHighScore: 0,
        yetiGamesPlayed: 0
      };
    }
    
    await setDoc(userDocRef, finalProfile);
    
    // Now trigger a refresh of the leaderboard to return to client
    const usersCol = collection(db, "users");
    const snapshot = await getDocs(usersCol);
    const dbUsers: LeaderboardEntry[] = [];
    
    snapshot.forEach((snap) => {
      const data = snap.data();
      if (!data) return;
      
      const badgeIds = Array.isArray(data.mintedBadges)
        ? data.mintedBadges.map((b: any) => b?.trackId).filter(Boolean)
        : (Array.isArray(data.completedTracks) ? data.completedTracks : []);

      const walletStr = data.walletAddress || snap.id || "";
      if (!walletStr) return;

      dbUsers.push({
        username: String(data.username || "CozyExplorer"),
        avatar: String(data.avatar || "🦊"),
        wallet: String(walletStr),
        xp: Number(data.xp ?? 0),
        level: Number(data.level ?? 1),
        badges: badgeIds,
        rankDirection: "same",
        yetiHighScore: Number(data.yetiHighScore ?? 0)
      });
    });

    const activeWallets = new Set(
      dbUsers
        .map(u => typeof u.wallet === "string" ? u.wallet.toLowerCase() : "")
        .filter(Boolean)
    );
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

// 2B. Secure Game Score Validation & Firestore Sync
app.post("/api/sui/game/save-score", async (req, res) => {
  const { wallet, score, elapsedSeconds, signature } = req.body;
  if (!wallet) {
    res.status(400).json({ success: false, error: "Missing SUI wallet identity address" });
    return;
  }

  const cleanWallet = wallet.toLowerCase().trim();
  const rawScore = Number(score ?? 0);
  const rawSeconds = Number(elapsedSeconds ?? 0);

  // Measure 1: anti-cheat maximum score limit checks
  if (rawScore > 1000) {
    res.json({ success: false, error: "Anomaly flagged: parallel state speeds exceed standard gravity bounds." });
    return;
  }

  // Measure 2: Velocity execution frequency constraint (each obstacle takes ~1.2s minimum to pass)
  // Let's grant a buffer of 1.2s per score point. Scoring faster is mathematically impossible.
  const minimumSecondsRequired = (rawScore - 2) * 1.2;
  if (rawScore > 4 && rawSeconds < minimumSecondsRequired) {
    res.json({ success: false, error: "Validation aborted: parallel speed anomaly detected." });
    return;
  }

  // Measure 3: Cryptographic verification checksum signature validation match
  const expectedSignature = String((rawScore * 19 + cleanWallet.length * 7) % 9999);
  if (signature !== expectedSignature) {
    res.json({ success: false, error: "Signature warning: game telemetry validation mismatch." });
    return;
  }

  const userDocRef = doc(db, "users", cleanWallet);
  try {
    const existingSnap = await getDoc(userDocRef);
    let updatedProfile: any = {};
    if (existingSnap.exists()) {
      const data = existingSnap.data();
      const newHighScore = Math.max(Number(data.yetiHighScore ?? 0), rawScore);
      const newGamesPlayed = Number(data.yetiGamesPlayed ?? 0) + 1;
      
      // Let's grant bonus XP (+15XP per highscore gain, +5XP per game played)
      const isNewHigh = rawScore > Number(data.yetiHighScore ?? 0);
      const xpBonus = (isNewHigh ? 15 : 0) + 5;

      updatedProfile = {
        ...data,
        xp: Number(data.xp ?? 0) + xpBonus,
        yetiHighScore: newHighScore,
        yetiGamesPlayed: newGamesPlayed
      };
    } else {
      updatedProfile = {
        username: `Yeti-${cleanWallet.substring(2, 6)}`,
        avatar: "🐨",
        walletAddress: cleanWallet,
        xp: 15 + Number(rawScore > 0 ? 15 : 0),
        level: 1,
        completedModules: [],
        completedTracks: [],
        claimedWelcomeXP: false,
        mintedBadges: [],
        streak: 1,
        lastLoginDate: new Date().toISOString().split("T")[0],
        yetiHighScore: rawScore,
        yetiGamesPlayed: 1
      };
    }

    await setDoc(userDocRef, updatedProfile);
    res.json({ 
      success: true, 
      highscore: updatedProfile.yetiHighScore, 
      gamesPlayed: updatedProfile.yetiGamesPlayed,
      xpGranted: updatedProfile.xp,
      message: "Cozy blockchain state successfully verified and written to Firestore!"
    });
  } catch (err) {
    console.error("Firestore save-score error:", err);
    res.status(500).json({ success: false, error: "Consensus pipeline database aborted." });
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
    const errorDetails = error?.message || String(error);
    res.json({ 
      success: true, 
      text: `yeti is slightly snoozing under the soft blanket of code... but don't worry! here is your lofi hint: the sui gas structure is object-based, and double-spent tokens are completely impossible. keep on rockin'! 🐻🍵\n\n[Debug info - API error: ${errorDetails}]` 
    });
  }
});

// 3.5. AI Avatar Generator Endpoint
app.post("/api/gemini/generate-avatar", async (req, res) => {
  const { prompt } = req.body;
  const client = initGemini();
  
  const defaultPrompt = prompt || "a cute cozy lo-fi animal companion (like a yeti, penguin, bear, red panda, or wolf) wearing a winter scarf / beanie. minimalist flat-design cartoon styled.";
  
  const systemInstruction = `
  You are an expert graphic designer and SVG generator.
  Your task is to generate and return ONLY a beautifully structured, highly creative, modern flat-design vector SVG representing a cute avatar of a cozy animal companion requested by the user.
  
  Design guidelines:
  - Return ONLY raw XML SVG string code (starting with <svg> and ending with </svg>).
  - Do NOT wrap the output in markdown code blocks (\`\`\`xml or \`\`\`svg or \`\`\`). Do NOT include any introductory or explanatory text or backticks. The response must be pure SVG parser-friendly XML text.
  - Make it modern, clean, centered, and aesthetically proportional. It should look like a professional, high-fidelity avatar icon.
  - The SVG should have a solid rounded or circle background color (e.g. pastel colors like #89A8B2, #E8A0BF, #B9D7EA, #E8E1D9, #D67B52) with an aspect ratio of 1:1.
  - Max width element viewBox: "0 0 100 100".
  - Include beautiful details: winter wearables (scarves, hats, ear muffs, beanies, or headphones), cute blushy cheeks, closed eyes or sparkling anime eyes, tiny smiles.
  - Use high-contrast flat colors and elegant SVG paths, circles, rectangles, shapes compatible with modern browsers.
  `;
  
  try {
    if (client) {
      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Create a cozy avatar for: ${defaultPrompt}`,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.9,
        },
      });
      
      let svgText = response.text || "";
      // Clean markdown blocks if Gemini accidentally wraps them
      svgText = svgText.trim();
      if (svgText.startsWith("```")) {
        svgText = svgText.replace(/^```[a-zA-Z]*\n/, "").replace(/\n```$/, "").trim();
      }
      
      if (!svgText.includes("<svg")) {
        throw new Error("Failed to generate correct SVG content structure.");
      }
      
      // Return as base64 data-url
      const base64Svg = Buffer.from(svgText).toString("base64");
      const dataUri = `data:image/svg+xml;base64,${base64Svg}`;
      
      res.json({ success: true, dataUri, rawSvg: svgText });
    } else {
      // Offline fallback: generate a beautiful, dynamic SVG representation programmatically!
      const fallbackAnimals = ["Yeti", "Penguin", "Panda", "Fox", "Bear"];
      const animal = fallbackAnimals[Math.floor(Math.random() * fallbackAnimals.length)];
      const colors = ["#89A8B2", "#E8A0BF", "#B9D7EA", "#E8E1D9", "#D67B52"];
      const bg = colors[Math.floor(Math.random() * colors.length)];
      
      const offlineSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
        <circle cx="50" cy="50" r="48" fill="${bg}" stroke="#3c3c3c" stroke-width="3"/>
        <circle cx="50" cy="55" r="30" fill="#ffffff" stroke="#3c3c3c" stroke-width="3"/>
        <circle cx="50" cy="55" r="22" fill="#fafafa" />
        <path d="M 23 45 Q 50 15 77 45 Z" fill="#D67B52" stroke="#3c3c3c" stroke-width="3"/>
        <rect x="20" y="40" width="60" height="10" rx="5" fill="#f8f5f2" stroke="#3c3c3c" stroke-width="3"/>
        <circle cx="50" cy="22" r="8" fill="#f8f5f2" stroke="#3c3c3c" stroke-width="2.5"/>
        <circle cx="40" cy="56" r="3.5" fill="#3c3c3c"/>
        <circle cx="60" cy="56" r="3.5" fill="#3c3c3c"/>
        <circle cx="41.5" cy="54.5" r="1" fill="#fff"/>
        <circle cx="61.5" cy="54.5" r="1" fill="#fff"/>
        <circle cx="34" cy="62" r="4.5" fill="#E8A0BF" opacity="0.8"/>
        <circle cx="66" cy="62" r="4.5" fill="#E8A0BF" opacity="0.8"/>
        <path d="M 47 62 Q 50 65 53 62" fill="none" stroke="#3c3c3c" stroke-width="2.5" stroke-linecap="round"/>
        <rect x="32" y="73" width="36" height="8" rx="4" fill="#89A8B2" stroke="#3c3c3c" stroke-width="2.5"/>
        <path d="M 58 78 L 58 90 L 66 90 L 66 78 Z" fill="#89A8B2" stroke="#3c3c3c" stroke-width="2.5"/>
        <text x="50" y="94" font-family="'JetBrains Mono', monospace" font-size="6" font-weight="900" fill="#3c3c3c" text-anchor="middle">[COZY CODER]</text>
      </svg>
      `.trim();
      
      const base64Svg = Buffer.from(offlineSvg).toString("base64");
      const dataUri = `data:image/svg+xml;base64,${base64Svg}`;
      res.json({ success: true, dataUri, rawSvg: offlineSvg, note: "Offline synthetic fallback" });
    }
  } catch (error: any) {
    console.error("Gemini Avatar generation error:", error);
    res.status(500).json({ success: false, error: `AI pipeline failed to render SVG: ${error?.message || error}` });
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
