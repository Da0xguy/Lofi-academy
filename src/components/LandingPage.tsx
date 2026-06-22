import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import Background from "./Background";
import { 
  Sparkles, 
  TrendingUp, 
  Award, 
  Coffee, 
  Flame, 
  Gamepad, 
  Lightbulb,
  Cpu,
  BookOpen,
  Zap,
  Globe,
  Lock,
  Compass,
  Music,
  Heart,
  Terminal,
  ArrowRight,
  Coins,
  Key,
  Check,
  Pause,
  Play,
  ShieldCheck,
  Moon,
  Sun
} from "lucide-react";
import { ConnectButton } from "@mysten/dapp-kit";
import YETI_STUDY_ASSET from "../assets/images/yeti_study_space_1779949789879.png";

// Interactive Background gaming icons
const FLOATING_ITEMS = [
  { id: "game", left: "6%", top: "12%", duration: 25, delay: 0 },
  { id: "star", left: "93%", top: "18%", duration: 28, delay: 1.2 },
  { id: "coin", left: "87%", top: "45%", duration: 20, delay: 0.5 },
  { id: "terminal", left: "8%", top: "65%", duration: 32, delay: 2.1 },
  { id: "zap", left: "95%", top: "8%", duration: 16, delay: 0.2 },
];

interface LandingPageProps {
  onLaunch: () => void;
  userXP: number;
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
  isWalletConnected?: boolean;
  user?: any;
  setUser?: any;
}

export function LandingPage({ onLaunch, userXP, isDarkMode = false, toggleDarkMode, isWalletConnected = false, user, setUser }: LandingPageProps) {
  // Coffee click state for playful interactive mascot engagement
  const [coffeeBrewing, setCoffeeBrewing] = useState<boolean>(false);
  const [brewedSips, setBrewedSips] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"sui" | "web3" | "move">("sui");

  // Autoplay carousel slide scrolling properties
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);
  const [autoplayProgress, setAutoplayProgress] = useState<number>(0);

  useEffect(() => {
    if (!isAutoplay) {
      setAutoplayProgress(0);
      return;
    }

    const intervalTime = 100; // tick every 100ms
    const totalTime = 5000;   // 5000ms (5 seconds)
    const step = (intervalTime / totalTime) * 100;

    const timer = setInterval(() => {
      setAutoplayProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          // Flip to next tab organically
          setActiveTab((current) => {
            if (current === "sui") return "web3";
            if (current === "web3") return "move";
            return "sui";
          });
          return 0;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isAutoplay]);

  // Reset progress timeline whenever active tab updates to guarantee full 5s reading duration
  useEffect(() => {
    setAutoplayProgress(0);
  }, [activeTab]);

  // Retro Mini-Game State
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameScore, setGameScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    return user?.yetiHighScore || Number(localStorage.getItem("sui_yeti_gamer_hs") || "0");
  });
  const [gameStartTime, setGameStartTime] = useState<number>(0);

  useEffect(() => {
    if (user?.yetiHighScore && user.yetiHighScore > highScore) {
      setHighScore(user.yetiHighScore);
    }
  }, [user?.yetiHighScore]);

  const [isJumping, setIsJumping] = useState<boolean>(false);

  // Real Sui Multi-Lane Parallel Execution States
  const [activeLane, setActiveLane] = useState<0 | 1>(0); // 0 = upper road (Fast-Path), 1 = lower road (Shared Consensus)
  const [blockX, setBlockX] = useState<number>(100);
  const [blockLane, setBlockLane] = useState<0 | 1>(0);
  const [obstacleType, setObstacleType] = useState<string>("🧱");

  const [coinX, setCoinX] = useState<number>(140);
  const [coinLane, setCoinLane] = useState<0 | 1>(1);
  const [hasShield, setHasShield] = useState<boolean>(false);

  const [gameLogs, setGameLogs] = useState<string[]>([
    "[SYSTEM] Narwhal memory pool initialized. Ready with sub-300ms pipelines.",
    "[SYSTEM] Standby status: INSERT COIN to begin validating transaction paths."
  ]);

  const obstacles = ["🧱", "⛓️", "⛽", "👾", "📈"];

  const appendGameLog = (msg: string) => {
    setGameLogs((prev) => [msg, ...prev.slice(0, 9)]);
  };

  const submitScore = async (finalScore: number) => {
    if (!isWalletConnected || !user?.walletAddress) {
      appendGameLog("[OFFLINE] Connect SUI Kiosk wallet in cabin to write secure highscores to Firebase!");
      return;
    }
    const elapsed = Math.max(1, Math.round((Date.now() - gameStartTime) / 1000));
    const walletStr = user.walletAddress.toLowerCase().trim();
    const signature = String((finalScore * 19 + walletStr.length * 7) % 9999);

    appendGameLog("[LEDGER] Dispatching cryptographic transaction score state to Firebase backend...");
    try {
      const res = await fetch("/api/sui/game/save-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wallet: user.walletAddress,
          score: finalScore,
          elapsedSeconds: elapsed,
          signature
        })
      });
      const data = await res.json();
      if (data.success) {
        appendGameLog(`[CONSENSUS SUCCESS] Saved to Firebase! Highscore: ${data.highscore} | Games: ${data.gamesPlayed} | (+${data.xpGranted - (user.xp || 0)} XP)`);
        if (setUser) {
          setUser((prev: any) => ({
            ...prev,
            yetiHighScore: data.highscore,
            yetiGamesPlayed: data.gamesPlayed,
            xp: data.xpGranted,
            level: Math.floor(data.xpGranted / 200) + 1
          }));
        }
      } else {
        appendGameLog(`[VALIDATION DENIED] ${data.error || "Anomaly detected. Block dropped."}`);
      }
    } catch (err) {
      appendGameLog("[ERROR] Failed to submit score state ledger block to Firebase cloud.");
    }
  };

  const handleJump = () => {
    if (!gameStarted) {
      setGameStarted(true);
      setGameOver(false);
      setGameScore(0);
      setBlockX(100);
      setCoinX(140);
      setHasShield(false);
      setGameStartTime(Date.now());
      setGameLogs([
        "[BOOT] Narwhal validator pool successfully synchronised! Running DAG sequence...",
        "[LANES] 🟢 Lane 0: Fast-Path (Owned states) | 🟡 Lane 1: Shared-Consensus (Shared states)",
        "[RULES] Tap arrow keys (Or click lanes) to swap tracks. Space to Jump!"
      ]);
      return;
    }
    if (gameOver) {
      setGameOver(false);
      setGameScore(0);
      setBlockX(100);
      setCoinX(140);
      setHasShield(false);
      setGameLogs([
        "[BOOT] Pipeline restarted. Cleared collision cache.",
        "[INFO] Initializing new consensus epoch sequence. Go yeti!"
      ]);
      return;
    }
    if (isJumping) return;
    setIsJumping(true);
    appendGameLog(`[INPUT] fast_path::execute_owned_object jump command triggered.`);
    setTimeout(() => {
      setIsJumping(false);
    }, 540);
  };

  const handleSwapLane = (targetLane: 0 | 1) => {
    if (!gameStarted || gameOver) return;
    if (activeLane === targetLane) return;
    setActiveLane(targetLane);
    appendGameLog(
      targetLane === 0 
        ? "[ROUTE] Swapping to Lane 0: Fast-Path Owned Object (Instant execution bypass)" 
        : "[ROUTE] Swapping to Lane 1: Shared Object (Sequential consensus queue)"
    );
  };

  // Keyboard space & arrow keys listener helper
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        if (gameStarted && !gameOver) {
          e.preventDefault();
          handleJump();
        }
      } else if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        if (gameStarted && !gameOver) {
          e.preventDefault();
          handleSwapLane(0);
        }
      } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        if (gameStarted && !gameOver) {
          e.preventDefault();
          handleSwapLane(1);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameStarted, gameOver, isJumping, activeLane]);

  // Mini-game clock intervals scheduler
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const timer = setInterval(() => {
      // Dynamic speed scaling with score
      const speed = 1.65 + Math.min(gameScore * 0.12, 1.95);

      // 1. Move Block
      setBlockX((prev) => {
        const next = prev - speed;
        
        // Block is offscreen
        if (next <= 0) {
          setGameScore((s) => {
            const val = s + 1;
            if (val > highScore) {
              setHighScore(val);
              localStorage.setItem("sui_yeti_gamer_hs", String(val));
            }
            
            // Checkpoint log notification every epoch transition
            if (val % 5 === 0) {
              const epochNum = Math.floor(val / 5) + 1;
              const names = ["Narwhal Mempool", "Bullshark Consensus", "Mysticeti Engine", "Super Cluster", "Sovereign Mainnet"];
              const currentName = names[Math.min(epochNum - 1, names.length - 1)];
              appendGameLog(`[EPOCH SUCCESS] Transited to Epoch #${epochNum} [${currentName}]! Consensus latency slashes further.`);
            } else {
              appendGameLog(`[BLOCK] Block index #${val + 1045} certified and finalized successfully! (+1 score)`);
            }
            return val;
          });
          setBlockLane(Math.random() > 0.45 ? 1 : 0);
          setObstacleType(obstacles[Math.floor(Math.random() * obstacles.length)]);
          return 100;
        }

        // Parallel collision check zone (12% to 19% coordinate range)
        if (next >= 12 && next <= 19) {
          // Both Yeti and block must be on the same lane
          if (activeLane === blockLane && !isJumping) {
            if (hasShield) {
              setHasShield(false);
              appendGameLog("[SHIELD DETONATED] Gas shield absorbed the transaction conflict! 🛡️⚡");
              return 100; // Reset block offscreen
            } else {
              setGameOver(true);
              appendGameLog(`[FATAL COLLISION] Spent transaction collision on Lane ${activeLane === 0 ? '0' : '1'}!`);
              submitScore(gameScore);
              clearInterval(timer);
            }
          }
        }

        return next;
      });

      // 2. Move Coin
      setCoinX((prevCoin) => {
        const nextCoin = prevCoin - speed;

        if (nextCoin <= 0) {
          setCoinLane(Math.random() > 0.5 ? 0 : 1);
          return 140; // Spawn further back than the block
        }

        // Collection detection zone (12% to 19% coordinate range)
        if (nextCoin >= 12 && nextCoin <= 19) {
          if (activeLane === coinLane) {
            setGameScore((s) => {
              const val = s + 2;
              if (val > highScore) {
                setHighScore(val);
                localStorage.setItem("sui_yeti_gamer_hs", String(val));
              }
              return val;
            });
            setHasShield(true);
            appendGameLog("[GAS REVENUE] Collected MIST Coin! (+2 Score) Safe shielding activated! 🧊🪙");
            setCoinLane(Math.random() > 0.5 ? 0 : 1);
            return 140; // Reset offscreen
          }
        }

        return nextCoin;
      });

    }, 45);

    return () => clearInterval(timer);
  }, [gameStarted, gameOver, isJumping, activeLane, blockLane, coinLane, hasShield, gameScore, highScore]);

  const triggerBrewCoffee = () => {
    if (coffeeBrewing) return;
    setCoffeeBrewing(true);
    setTimeout(() => {
      setCoffeeBrewing(false);
      setBrewedSips(prev => prev + 1);
    }, 1800);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <div id="landing-page-root" className="min-h-screen bg-[#F9F6F0] text-[#3c3c3c] font-sans selection:bg-[#D67B52] selection:text-white pb-20 leading-relaxed overflow-x-hidden relative">
      <Background />
      
      {/* Top Utility Nav for Landing Page */}
      <div className="max-w-7xl mx-auto px-6 pt-6 flex justify-between items-center z-10 relative">
        <span className="text-sm font-bold font-serif tracking-tight text-[#3c3c3c] flex items-center gap-1.5 matches-title">
          <Compass className="text-[#D67B52]" size={18} /> Lofi Academy
        </span>
        {toggleDarkMode && (
          <button
            onClick={toggleDarkMode}
            className="px-3 py-1.5 bg-white border-2 border-[#3c3c3c] rounded-xl shadow-[2px_2px_0px_0px_#3c3c3c] font-mono text-xs font-bold text-[#3c3c3c] hover:scale-102 transition-transform cursor-pointer flex items-center gap-1.5 active:translate-y-[1px]"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <span>
              {isDarkMode ? (
                <Moon size={14} className="text-indigo-400" />
              ) : (
                <Sun size={14} className="text-amber-500 animate-spin" style={{ animationDuration: "12s" }} />
              )}
            </span>
            <span className="hidden sm:inline">{isDarkMode ? "Dark" : "Light"}</span>
          </button>
        )}
      </div>
      
      {/* Dynamic Background Floating Gaming Elements Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {FLOATING_ITEMS.map((item, idx) => (
          <motion.div
            key={idx}
            className="absolute text-2xl filter drop-shadow select-none opacity-[0.22] md:opacity-[0.28]"
            style={{ left: item.left, top: item.top }}
            animate={{
              y: [0, -28, 28, 0],
              x: [0, 16, -16, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {item.id === "game" && <Gamepad size={32} className="text-indigo-500/35" />}
            {item.id === "star" && <Sparkles size={28} className="text-yellow-500/40" />}
            {item.id === "coin" && <Coins size={28} className="text-[#D67B52]/40" />}
            {item.id === "terminal" && <Terminal size={28} className="text-emerald-500/35" />}
            {item.id === "zap" && <Zap size={28} className="text-amber-500/45 fill-amber-300/10" />}
          </motion.div>
        ))}
      </div>

      {/* 1. HERO BANNER HEADER SECTOR */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-6 pt-12 pb-6 flex flex-col items-center text-center relative"
      >
        {/* Abstract absolute background graphic rings for Neo-brutalist styling */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[340px] h-[340px] md:w-[600px] md:h-[600px] border-4 border-dashed border-[#3c3c3c]/5 rounded-full pointer-events-none -z-10 animate-spin" style={{ animationDuration: '60s' }}></div>
        <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[240px] h-[240px] md:w-[400px] md:h-[400px] border-2 border-dashed border-[#3c3c3c]/10 rounded-full pointer-events-none -z-10 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }}></div>

        {/* Mascot badge flag */}
        <motion.div 
          whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#89A8B2]/20 border-2 border-[#3c3c3c] text-[#89A8B2] font-mono text-xs font-bold rounded-full mb-6 cursor-pointer shadow-[2px_2px_0px_0px_#3c3c3c]"
        >
          <Sparkles size={14} className="animate-spin text-[#D67B52]" />
          <span>Interactive SUI Move Playground v1.1</span>
        </motion.div>

        {/* Main Display Typography pair */}
        <motion.h1 
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif tracking-tight text-[#3c3c3c] max-w-4xl"
        >
          Cozy Study, Fast Code: <span className="text-[#D67B52] relative inline-block">Sui Academy <span className="absolute left-0 bottom-1 w-full h-3 bg-amber-200 -z-10 -rotate-1 rounded-sm"></span></span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-base md:text-xl text-[#6D5D6E] font-medium mt-6 max-w-2xl leading-relaxed"
        >
          Lofi Quest is a cute Claymorphic space where blockchain concepts feel friendly. Brew warm virtual coffee, chill with procedurally synced chord loops, and master cryptography, parallel consensus, and secure Move contracts under the snowy gaze of Yeti!
        </motion.p>

        {/* Cozy Yeti Cabin Showcase Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="w-full max-w-2xl mt-8 relative group border-4 border-[#3c3c3c] rounded-3xl bg-white shadow-[8px_8px_0px_0px_#3c3c3c] overflow-hidden"
        >
          <img
            src={YETI_STUDY_ASSET}
            alt="Yeti Lofi Log Cabin study space"
            referrerPolicy="no-referrer"
            className="w-full h-auto aspect-video object-cover group-hover:scale-[1.02] transition-all duration-500 filter brightness-95"
          />
          <div className="absolute top-3 left-3 bg-white/95 border-2 border-[#3c3c3c] px-3 py-1 rounded-full text-[10px] font-mono font-bold text-[#3c3c3c] shadow-[2px_2px_0px_0px_#3c3c3c] uppercase tracking-wider">
            🐻 Yeti's Cozy Study Log
          </div>
          <div className="absolute bottom-3 right-3 bg-stone-900/85 backdrop-blur-sm border-2 border-[#3c3c3c] px-3 py-1 rounded-xl text-[9px] font-mono font-extrabold text-amber-300 shadow-[1.5px_1.5px_0px_0px_#3c3c3c] flex items-center gap-1 select-none">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
            <span>RADIO ACTIVE: 104.7 LOFI CHILL BEATS</span>
          </div>
        </motion.div>

        {/* GIGANTIC LAUNCH CALL-TO-ACTION WITH ANIMATION */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="mt-10 flex flex-col items-center justify-center gap-4 w-full max-w-lg"
        >
          {isWalletConnected ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <motion.button
                onClick={onLaunch}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-10 py-5 bg-[#D67B52] hover:bg-[#D67B52]/90 text-white font-serif font-extrabold text-lg md:text-xl rounded-2xl border-4 border-[#3c3c3c] shadow-[6px_6px_0px_0px_#3c3c3c] hover:shadow-[8px_8px_0px_0px_#3c3c3c] cursor-pointer transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Enter Academy</span>
                  <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
                </span>
                <div className="absolute top-0 -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-full group-hover:duration-1000 group-hover:translate-x-0 group-hover:transition-all" />
              </motion.button>
              <a 
                href="#visual-learn-more"
                className="w-full sm:w-auto px-8 py-5 bg-white hover:bg-[#F3EFEA] text-[#3c3c3c] font-mono font-bold text-sm rounded-2xl border-4 border-[#3c3c3c] shadow-[4px_4px_0px_0px_#3c3c3c] cursor-pointer text-center"
              >
                How it works
              </a>
            </div>
          ) : (
            <div className="w-full bg-[#E8E1D9]/40 border-4 border-[#3c3c3c] p-6 rounded-3xl shadow-[5px_5px_0px_0px_#3c3c3c] flex flex-col items-center text-center gap-4">
              <div className="flex items-center gap-2 text-[#D67B52] font-bold bg-[#D67B52]/10 px-3 py-1.5 rounded-xl border-2 border-[#3c3c3c] text-xs uppercase font-mono shadow-[1px_1px_0px_0px_#3c3c3c]">
                <Lock size={12} className="animate-bounce" />
                <span>Sui Wallet Required</span>
              </div>
              <p className="text-xs text-[#6D5D6E] font-sans font-semibold max-w-sm leading-relaxed">
                To access classrooms, complete tasks, analyze Cetus AMM pool statistics, or study secure Move compilations, you need to connect your Sui Wallet first.
              </p>
              <div className="p-1 scale-105 rounded-xl bg-white border-2 border-[#3c3c3c] shadow-[2px_2px_0px_0px_#3c3c3c]">
                <ConnectButton connectText="Connect Wallet to Unlock Academy" />
              </div>
            </div>
          )}
        </motion.div>

        {/* Floating elements animation representation */}
        <div className="flex gap-4 mt-6 text-xs text-[#6D5D6E] font-mono font-bold select-none">
          <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border-2 border-[#3c3c3c] shadow-[1px_1px_0px_0px_#3c3c3c]"><Music size={12} className="text-[#D67B52]" /> Static-Beats Synced</span>
          <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border-2 border-[#3c3c3c] shadow-[1px_1px_0px_0px_#3c3c3c]"><Zap size={12} className="text-yellow-500 fill-yellow-500" /> &lt; 0.5s Latency</span>
          <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border-2 border-[#3c3c3c] shadow-[1px_1px_0px_0px_#3c3c3c]"><Heart size={12} className="text-rose-500 fill-rose-500" /> Free Souvenir Badge</span>
        </div>
      </motion.div>

      {/* 2. THE THREE TAB PILLARS OF UNDERSTANDING */}
      <div id="visual-learn-more" className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3.5xl font-bold font-serif text-[#3c3c3c]">
            Structured To Decode Web3 Magic
          </h2>
          <p className="text-xs text-[#6D5D6E] font-mono uppercase tracking-widest font-extrabold mt-1">
            Click columns below to explore three vital modern blockchain paradigms
          </p>
        </div>

        {/* Column selectors */}
        <div id="visual-pillars-grid" className="max-w-md mx-auto mb-8">
          <div className="grid grid-cols-3 gap-2 bg-white border-2 border-[#3c3c3c] p-1.5 rounded-2xl font-mono font-bold text-xs shadow-[3px_3px_0px_0px_#3c3c3c] relative overflow-hidden">
            {(["sui", "web3", "move"] as const).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setActiveTab(t);
                  setIsAutoplay(false); // Pause on manual user action so they can comfortably read
                }}
                className={`py-2 px-1 rounded-xl transition-all capitalize cursor-pointer relative overflow-hidden ${
                  activeTab === t 
                    ? "bg-[#D67B52] text-white border-2 border-[#3c3c3c] shadow-[1px_1px_0px_0px_#3c3c3c]" 
                    : "text-[#6D5D6E] hover:text-[#3c3c3c]"
                }`}
              >
                <span className="relative z-10">{t === "sui" ? "Sui Ledger" : t === "web3" ? "Web3 Tech" : "Move Lang"}</span>
                {activeTab === t && isAutoplay && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 overflow-hidden">
                    <div 
                      className="bg-white h-full transition-all duration-100 ease-linear"
                      style={{ width: `${autoplayProgress}%` }}
                    />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Autoplay controllers */}
          <div className="flex items-center justify-between px-1 mt-3 font-mono text-[10px] text-[#6D5D6E] font-bold">
            <button 
              onClick={() => {
                setIsAutoplay(prev => !prev);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-white border-2 border-[#3c3c3c] hover:bg-stone-50 active:translate-y-0.5 rounded-lg shadow-[1.5px_1.5px_0px_0px_#3c3c3c] cursor-pointer transition-all uppercase"
            >
              <span className="flex items-center gap-1">
                {isAutoplay ? <Pause size={10} className="text-[#3c3c3c]" /> : <Play size={10} className="text-[#3c3c3c]" />}
                <span>{isAutoplay ? "Pause Autoplay" : "Play Autoplay"}</span>
              </span>
            </button>
            <div className="flex items-center gap-1.5">
              {isAutoplay ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>Autoplay (cycling in {Math.max(1, Math.ceil((5000 - (autoplayProgress / 100) * 5000) / 1000))}s)</span>
                </>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span className="text-stone-500 font-semibold flex items-center gap-1">
                    <span>User Controlled. Click</span>
                    <Play size={8} className="inline text-stone-600 border border-stone-300 rounded p-0.5" />
                    <span>to auto-cycle</span>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white border-4 border-[#3c3c3c] rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_0px_#3c3c3c]"
        >
          {activeTab === "sui" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#89A8B2] bg-[#89A8B2]/10 border-2 border-[#3c3c3c] px-2.5 py-1 rounded-full uppercase">
                  Parallel Scale Leader
                </span>
                <h3 className="text-2xl font-bold font-serif text-[#3c3c3c] mt-3">Why are SUI transactions so fast?</h3>
                <p className="text-xs text-[#6D5D6E] mt-2 font-mono leading-relaxed">
                  traditional blockchains act like single highways. all transactions queues up behind one slow truck! sui processes simple transactions synchronously, bypassing global consensus locks for individual state records.
                </p>
                <div className="space-y-3 mt-4 text-xs font-semibold text-[#3c3c3c]">
                  <div className="flex items-start gap-2.5">
                    <span className="bg-emerald-100 text-emerald-700 p-1 rounded-md border border-[#3c3c3c] shrink-0 font-bold">✓</span>
                    <p><strong>Sub-second finality</strong> — transfers take ~300ms, faster than clicking a Web2 payment API.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="bg-emerald-100 text-emerald-700 p-1 rounded-md border border-[#3c3c3c] shrink-0 font-bold">✓</span>
                    <p><strong>Dynamic gas adjustment</strong> — Sui adjusts epoch incentives every 24 hours to prevent sudden rate spikes.</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#F3EFEA] border-2 border-[#3c3c3c] p-5 rounded-2xl shadow-inner font-mono text-[11px] space-y-2 opacity-95">
                <div className="text-stone-400 uppercase font-extrabold pb-1.5 border-b border-[#3c3c3c]/10 flex justify-between">
                  <span>SUI VS TRADITIONAL SPEED</span>
                  <span className="text-emerald-600 animate-pulse">● MEASURED</span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between"><span>Bitcoin Block Rate:</span> <strong className="text-stone-500">10 mins</strong></div>
                  <div className="flex justify-between"><span>Solana Average latency:</span> <strong className="text-amber-700">2.5 seconds</strong></div>
                  <div className="flex justify-between text-emerald-700 font-extrabold bg-white p-1 rounded border-2 border-[#3c3c3c]">
                    <span>Sui Transaction time:</span> <span>0.28 seconds (!)</span>
                  </div>
                </div>
                <div className="text-[9px] text-[#6D5D6E] leading-relaxed pt-2 opacity-80 border-t border-[#3c3c3c]/10">
                  Sui bypasses massive consensus queues for individual objects by certifying transaction signals instantly on validators.
                </div>
              </div>
            </div>
          )}

          {activeTab === "web3" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#D67B52] bg-[#D67B52]/10 border-2 border-[#3c3c3c] px-2.5 py-1 rounded-full uppercase">
                  True Decentralization
                </span>
                <h3 className="text-2xl font-bold font-serif text-[#3c3c3c] mt-3">What is Web3 and how does cryptography protect you?</h3>
                <p className="text-xs text-[#6D5D6E] mt-2 font-mono leading-relaxed">
                  Web2 servers are owned by huge monolithic companies that track, sell, or delete your credentials at will. Web3 utilizes math and cryptographic keypairs to secure ownership inside immutable, decentralized peer networks.
                </p>
                <div className="space-y-3 mt-4 text-xs font-semibold text-[#3c3c3c]">
                  <div className="flex items-start gap-2.5">
                    <span className="bg-[#89A8B2]/20 text-[#89A8B2] p-1 rounded-md border border-[#3c3c3c] shrink-0 font-bold">🗝️</span>
                    <p><strong>Private Key Ownership</strong> — Transactions require digital signatures generated locally. No central database can hijack your identity.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="bg-[#89A8B2]/20 text-[#89A8B2] p-1 rounded-md border border-[#3c3c3c] shrink-0 font-bold">📡</span>
                    <p><strong>Validator Consensus Nodes</strong> — Thousands of nodes query peer consensus, verifying that your balance cannot be double-spent.</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#F3EFEA] border-2 border-[#3c3c3c] p-5 rounded-2xl shadow-inner font-mono text-[11px] relative">
                <div className="absolute top-2 right-2 text-amber-500">🗝️</div>
                <div className="text-stone-400 uppercase font-extrabold pb-2 mb-3 border-b border-[#3c3c3c]/10">CRYPTOGRAPHIC SIGNATURE WORKFLOW:</div>
                <div className="space-y-2 text-[10px] leading-relaxed text-[#3c3c3c]">
                  <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#D67B52]"></span><span>Frontend structures clear text payload.</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#D67B52]"></span><span>Your <strong>Private Key</strong> signs hash locally inside browser wrapper.</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#D67B52]"></span><span>Signed payload is broadcast through <strong>RPC gateways</strong>.</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span><span className="text-emerald-700 font-bold">Validators verify public address and commit ledger updates.</span></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "move" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 border-2 border-[#3c3c3c] px-2.5 py-1 rounded-full uppercase">
                  Object-Centric Move Paradigm
                </span>
                <h3 className="text-2xl font-bold font-serif text-[#3c3c3c] mt-3">Why is Sui Move inherently secure?</h3>
                <p className="text-xs text-[#6D5D6E] mt-2 font-mono leading-relaxed">
                  In Ethereum, smart contracts hold values as simple balance lists inside global storage grids. In Sui Move, physical assets behave like actual atomic <strong>Objects</strong> that are stored directly inside your address coordinates!
                </p>
                <div className="space-y-3 mt-4 text-xs font-semibold text-[#3c3c3c]">
                  <div className="flex items-start gap-2.5">
                    <span className="bg-amber-100 text-[#D67B52] p-1 rounded-md border border-[#3c3c3c] shrink-0 font-bold">📦</span>
                    <p><strong>Absolute Object Control</strong> — Objects are signed by unique IDs, and creators must explicit import rules to borrow, transfer, or overwrite them.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="bg-amber-100 text-[#D67B52] p-1 rounded-md border border-[#3c3c3c] shrink-0 font-bold">🛡️</span>
                    <p><strong>Zero re-entrancy threats</strong> — Moves compiler prevents arbitrary dynamic contract references, blocking Ethereum-style lock attacks.</p>
                  </div>
                </div>
              </div>
              <div className="bg-stone-900 text-stone-200 border-2 border-[#3c3c3c] p-4 rounded-2xl shadow-lg font-mono text-[10px] leading-relaxed">
                <div className="text-gray-400 border-b border-[#3c3c3c] pb-1.5 mb-2 uppercase flex justify-between">
                  <span>sui_move_module::custom_badge</span>
                  <span className="text-indigo-400">Move compiled</span>
                </div>
                <pre className="text-emerald-400 font-bold font-mono">
{`struct CozyBadge has key, store {
    id: UID,
    title: String,
    xp_granted: u64,
}

public entry fun mint_badge(...) {
    // strict compiled logic
}`}
                </pre>
                <div className="text-gray-500 mt-2 font-mono text-[9px]">
                  Objects have key capabilities defining whether they can be keys (discoverable) or stored (transferable).
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* 3. COZY HERO BENTO SECTION - WITH EXCELLENT ANIMATIONS */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {/* Card 1 */}
        <motion.div 
          variants={itemVariants} 
          whileHover={{ y: -5 }}
          className="bg-white p-6 border-4 border-[#3c3c3c] rounded-3xl shadow-[4px_4px_0px_0px_#3c3c3c] flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 bg-orange-100 text-[#D67B52] border-2 border-[#3c3c3c] rounded-xl flex items-center justify-center font-bold mb-4 shadow-[1px_1px_0px_0px_#3c3c3c]">
              <Coffee size={18} />
            </div>
            <h4 className="text-lg font-bold font-serif text-[#3c3c3c]">COZY GREEN CHALKBOARDS</h4>
            <p className="text-xs text-[#6D5D6E] font-semibold mt-2 leading-relaxed">
              Ditch long exhausting developer documentation! Cozy Yeti maps critical concepts onto elegant green chalkboards. Read snippet blocks, check compiled samples, and test your clarity with non-punishing modular evaluations.
            </p>
          </div>
          <span className="text-[10px] font-mono text-[#D67B52] font-bold mt-4 uppercase inline-block">100% stress free</span>
        </motion.div>

        {/* Card 2 */}
        <motion.div 
          variants={itemVariants} 
          whileHover={{ y: -5 }}
          className="bg-white p-6 border-4 border-[#3c3c3c] rounded-3xl shadow-[4px_4px_0px_0px_#3c3c3c] flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 bg-emerald-100 text-emerald-700 border-2 border-[#3c3c3c] rounded-xl flex items-center justify-center font-bold mb-4 shadow-[1px_1px_0px_0px_#3c3c3c]">
              <TrendingUp size={18} />
            </div>
            <h4 className="text-lg font-bold font-serif text-[#3c3c3c]">INTERACTIVE DEFI PORTFOLIO</h4>
            <p className="text-xs text-[#6D5D6E] font-semibold mt-2 leading-relaxed">
              Simulate actual Decentralized Exchange Swaps on Cetus Router logic, calculate pool slippage rates, or construct deep borrow debt structures at Navi Lending Sandbox. Learn protocol mathematics securely with mock gas settling tools.
            </p>
          </div>
          <span className="text-[10px] font-mono text-[#89A8B2] font-bold mt-4 uppercase inline-block">Real block simulators Included</span>
        </motion.div>

        {/* Card 3 */}
        <motion.div 
          variants={itemVariants} 
          whileHover={{ y: -5 }}
          className="bg-white p-6 border-4 border-[#3c3c3c] rounded-3xl shadow-[4px_4px_0px_0px_#3c3c3c] flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 bg-blue-100 text-[#89A8B2] border-2 border-[#3c3c3c] rounded-xl flex items-center justify-center font-bold mb-4 shadow-[1px_1px_0px_0px_#3c3c3c]">
              <Award size={18} />
            </div>
            <h4 className="text-lg font-bold font-serif text-[#3c3c3c]">CLAIM THE VALUELESS NFT GIFT</h4>
            <p className="text-xs text-[#6D5D6E] font-semibold mt-2 leading-relaxed">
              Once inside, connect a mock wallet and mint your certificate into your Sui Kiosk address profiles. You can also trigger the Certified completely, absolutely Worthless NFT to see true ledger object registration logs!
            </p>
          </div>
          <span className="text-[10px] font-mono text-stone-500 font-bold mt-4 uppercase inline-block">Exactly $0 utility souvenir</span>
        </motion.div>

        {/* Card 4 */}
        <motion.div 
          variants={itemVariants} 
          whileHover={{ y: -5 }}
          className="bg-white p-6 border-4 border-[#3c3c3c] rounded-3xl shadow-[4px_4px_0px_0px_#3c3c3c] flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 bg-purple-100 text-purple-700 border-2 border-[#3c3c3c] rounded-xl flex items-center justify-center font-bold mb-4 shadow-[1px_1px_0px_0px_#3c3c3c]">
              <BookOpen size={18} />
            </div>
            <h4 className="text-lg font-bold font-serif text-[#3c3c3c]">ECOSYSTEM READS & AI DIGESTS</h4>
            <p className="text-xs text-[#6D5D6E] font-semibold mt-2 leading-relaxed">
              Explore our curated library of hot-of-the-press Sui updates! Undergo deep-dives into parallel-lane throughput, Mysticeti finality, and DeepBook v3. Generate instant, on-demand AI digests to distill core lessons into precise takeaways.
            </p>
          </div>
          <span className="text-[10px] font-mono text-purple-600 font-bold mt-4 uppercase inline-block">Powered by Gemini AI</span>
        </motion.div>
      </motion.div>

      {/* 5B. PLAYABLE MINI-ARCADE: YETI'S PARALLEL CONSENSUS MULTI-LANE ARCADE */}
      <div id="retro-arcade-panel" className="max-w-4xl mx-auto px-6 py-6 text-center z-10 relative">
        <div className="bg-white border-4 border-[#3c3c3c] rounded-3xl p-6 shadow-[5px_5px_0px_0px_#3c3c3c] max-w-xl mx-auto">
          <Gamepad size={36} className="mx-auto text-indigo-600 mb-2 animate-pulse" />
          
          <h4 className="text-lg font-bold font-serif text-[#3c3c3c] uppercase tracking-wide">Yeti's Parallel Consensus Arcade</h4>
          <p className="text-xs text-[#6D5D6E] font-semibold mt-1 mb-4 max-w-md mx-auto">
            Sui processes simple transactions in parallel (Fast Path) and shared transactions sequentially. Switch lanes to escape congestion surges!
          </p>

          <div className="flex justify-between items-center bg-[#FAF8F5] px-3.5 py-1.5 border-2 border-[#3c3c3c] rounded-2xl mb-3.5 text-xs font-mono select-none">
            <span className="font-bold flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>NETWORK STATUS: ACTIVE</span>
            </span>
            <span className="text-[#D67B52] font-black uppercase">
              EPOCH {Math.floor(gameScore / 5) + 1}
            </span>
          </div>

          {/* Arcade Cabinet Screen with Multi-Lane visual tracks */}
          <div 
            onClick={(e) => {
              if (!gameStarted || gameOver) {
                handleJump();
                return;
              }
              // Switch lanes based on click height inside container
              const rect = e.currentTarget.getBoundingClientRect();
              const relativeY = e.clientY - rect.top;
              if (relativeY < rect.height / 2) {
                handleSwapLane(0);
              } else {
                handleSwapLane(1);
              }
            }}
            className="relative h-48 w-full bg-stone-900 border-4 border-[#3c3c3c] rounded-2xl overflow-hidden shadow-inner font-mono cursor-pointer select-none group"
            title="Click Top half for Fast-Path, Bottom half for Consensus!"
          >
            {/* Ambient scanlines overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.22)_50%)] bg-[size:100%_4px] opacity-25 z-20"></div>

            {/* Score HUD Display */}
            <div className="absolute top-2 left-3 right-3 flex justify-between text-[11px] font-bold z-20">
              <span className="text-amber-400">LEDGER SCORE: {gameScore}</span>
              <span className="text-emerald-400 font-mono">
                {hasShield ? "🛡️ GAS SHIELD CHARGED" : "⚡ PARALLEL PIPELINE"}
              </span>
              <span className="text-stone-400">HIGH: {highScore}</span>
            </div>

            {/* Track 0 Segment Line (Fast Path) */}
            <div className="absolute bottom-24 left-0 right-0 h-0.5 border-t border-dashed border-cyan-800/60 z-0"></div>
            <div className="absolute bottom-26 left-3 text-cyan-500/40 text-[8px] font-black uppercase tracking-wider">
              LANE 0: FAST-PATH (OWNED OBJECTS BYPASS)
            </div>

            {/* Track 1 Segment Line (Shared Consensus) */}
            <div className="absolute bottom-8 left-0 right-0 h-0.5 border-t border-dashed border-amber-800/60 z-0"></div>
            <div className="absolute bottom-10 left-3 text-amber-500/40 text-[8px] font-black uppercase tracking-wider">
              LANE 1: SHARED METADATA CONSENSUS
            </div>

            {/* Ground separator bar */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-stone-950 z-10"></div>

            {/* Yeti Avatar 🐻 with dynamic vertical lane alignment */}
            <motion.div 
              className={`absolute left-10 text-3xl z-10 flex items-center transition-all duration-250`}
              style={{ 
                bottom: activeLane === 0 ? "46px" : "12px",
                filter: hasShield ? "drop-shadow(0 0 8px rgba(34, 211, 238, 0.8))" : "none"
              }}
              animate={isJumping ? { 
                y: -36, 
                rotate: [0, -10, 10, 0],
                scale: [1, 1.15, 1] 
              } : { 
                y: 0, 
                rotate: 0,
                scale: 1 
              }}
              transition={{ duration: 0.52 }}
            >
              <span>🐻</span>
              {hasShield && (
                <span className="absolute -inset-1 rounded-full border-2 border-cyan-400 animate-ping opacity-60"></span>
              )}
              <span className="absolute -top-3 -right-2 text-[10px] animate-bounce">☕</span>
              
              {/* Floating bubble text above yeti */}
              <div className="absolute left-8 -top-8 bg-white text-stone-900 text-[8px] font-bold px-1.5 py-0.5 rounded border border-stone-400 shadow-sm font-sans flex items-center gap-0.5 whitespace-nowrap z-20">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                <span>
                  {gameScore === 0 ? "Dodge congestion! 🏔️" : gameScore < 5 ? "Epoch 1: Narwhal ⚡" : gameScore < 10 ? "Epoch 2: Bullshark 🦈" : "Epoch 3: Mysticeti 🔥"}
                </span>
              </div>
            </motion.div>

            {/* Collectible GAS MIST Refund Coin 🪙 */}
            {gameStarted && !gameOver && (
              <motion.div 
                className="absolute text-lg z-10"
                style={{ 
                  bottom: coinLane === 0 ? "48px" : "14px", 
                  left: `${coinX}%` 
                }}
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="filter drop-shadow-md">🪙</span>
              </motion.div>
            )}

            {/* Obstacle Hazard representing transaction congestions 🧱 */}
            {gameStarted && !gameOver && (
              <div 
                className="absolute text-xl z-10 flex flex-col items-center"
                style={{ 
                  bottom: blockLane === 0 ? "48px" : "14px", 
                  left: `${blockX}%` 
                }}
              >
                <span>{obstacleType}</span>
                <span className={`text-[6px] font-extrabold px-1 border rounded font-mono uppercase tracking-wider block ${
                  blockLane === 0 ? "text-cyan-400 border-cyan-500/50 bg-stone-950" : "text-amber-400 border-amber-500/50 bg-stone-950"
                }`}>
                  {blockLane === 0 ? "Owned Hack" : "Queue Jam"}
                </span>
              </div>
            )}

            {/* Standby screen layer */}
            {!gameStarted && (
              <div className="absolute inset-0 bg-stone-900/95 flex flex-col items-center justify-center p-4 z-20">
                <span className="text-[#D67B52] text-xs font-black tracking-widest animate-pulse mb-1">
                  [ MULTI-LANE CONSENSUS ENGAGED ]
                </span>
                <p className="text-stone-400 text-[10px] max-w-xs leading-normal font-sans">
                  Use Up/Down Arrow keys or click tracks to alter lanes between Fast-Path and Consensus tracks. Avoid blockades & collect MIST gas 🪙!
                </p>
                <button className="mt-3.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 border-2 border-[#3c3c3c] rounded-xl text-white text-[10px] font-bold shadow-[2px_2px_0px_0px_#3c3c3c] cursor-pointer uppercase">
                  INSERT PROTOCOL COIN 🪙
                </button>
              </div>
            )}

            {/* Crash gameover state layer */}
            {gameOver && (
              <div className="absolute inset-0 bg-red-950/90 flex flex-col items-center justify-center p-4 z-30">
                <span className="text-red-400 text-xs font-black uppercase tracking-widest mb-1 animate-bounce">
                  💥 TRANSACTION COLLISION CRASH 💥
                </span>
                <p className="text-stone-300 text-[10px] max-w-xs font-serif leading-none mt-1">
                  Ledger aborted. Score: <strong className="text-amber-400">{gameScore}</strong> | Highest Verified Score: <strong className="text-white">{highScore}</strong>
                </p>
                <button className="mt-3.5 px-4 py-1.5 bg-[#D67B52] hover:bg-[#D67B52]/90 border-2 border-[#3c3c3c] rounded-xl text-white text-[10px] font-extrabold shadow-[2px_2px_0px_0px_#3c3c3c] cursor-pointer">
                  REPLAY LEDGER SYMPOSIUM 🔄
                </button>
              </div>
            )}
          </div>

          {/* Parallel controls feedback bar */}
          <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 bg-[#FAF8F5] p-3 border-2 border-[#3c3c3c] rounded-2xl text-left">
            <div>
              <span className="text-[#3c3c3c] text-[10px] font-bold block">ACTIVE LANE SELECTOR:</span>
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => handleSwapLane(0)}
                  disabled={!gameStarted || gameOver}
                  className={`px-2.5 py-1 text-[9px] font-mono font-black border-2 border-[#3c3c3c] rounded-lg shadow-[1px_1px_0px_0px_#3c3c3c] transition-all cursor-pointer ${
                    activeLane === 0 
                      ? "bg-cyan-100 text-cyan-800" 
                      : "bg-white text-stone-500 opacity-60"
                  }`}
                >
                  🟢 LANE 0: FAST PATH
                </button>
                <button
                  onClick={() => handleSwapLane(1)}
                  disabled={!gameStarted || gameOver}
                  className={`px-2.5 py-1 text-[9px] font-mono font-black border-2 border-[#3c3c3c] rounded-lg shadow-[1px_1px_0px_0px_#3c3c3c] transition-all cursor-pointer ${
                    activeLane === 1 
                      ? "bg-amber-100 text-[#D67B52]" 
                      : "bg-white text-stone-500 opacity-60"
                  }`}
                >
                  🟡 LANE 1: CONSENSUS
                </button>
              </div>
            </div>

            <button
              onClick={handleJump}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white border-2 border-[#3c3c3c] font-mono text-[10px] font-extrabold rounded-xl shadow-[2px_2px_0px_0px_#3c3c3c] cursor-pointer active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_#3c3c3c] max-height-[32px] self-end"
            >
              🚀 JUMP YETI [Space]
            </button>
          </div>

          {/* REAL TIME TRANSACTION MONITOR LOG WINDOW */}
          <div className="bg-stone-900 border-2 border-[#3c3c3c] rounded-2xl p-3.5 mt-3 text-left font-mono text-[9px] text-stone-300 shadow-[2px_2px_0px_0px_#3c3c3c]">
            <div className="flex items-center justify-between border-b border-stone-800 pb-1.5 mb-2 select-none text-[8px] text-stone-400 font-extrabold uppercase">
              <span className="flex items-center gap-1">
                <Cpu size={10} className="text-cyan-400 animate-spin" />
                <span>Validator Node Ledger Stream</span>
              </span>
              <span className="text-[#D67B52]">Latency: 280ms (Mysticeti)</span>
            </div>
            <div className="space-y-1 max-h-[85px] overflow-y-auto font-mono scrollbar-none scroll-smooth">
              {gameLogs.map((log, idx) => (
                <div key={idx} className="truncate select-text">
                  <span className="text-stone-500">[{new Date().toLocaleTimeString().split(" ")[0]}]:</span>{" "}
                  <span className={log.includes("[FATAL]") || log.includes("[CRASH]") ? "text-red-400" : log.includes("[GAS]") || log.includes("[EPOCH]") ? "text-cyan-300 font-bold" : "text-stone-300"}>
                    {log}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 6. COZY STICKY FOOTER REDIRECT BOX */}
      <div className="mt-16 text-center max-w-md mx-auto px-6">
        <h3 className="text-xl font-bold font-serif text-[#3c3c3c]">Ready to start SUI Move Academy?</h3>
        <p className="text-xs text-[#6D5D6E] font-medium mt-1 mb-4">
          Complete tasks to level up, earn XP points, verify swap slippage structures and secure your profile.
        </p>

        <motion.button
          onClick={onLaunch}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-4 bg-[#89A8B2] hover:bg-[#89A8B2]/90 text-white font-serif font-extrabold text-base rounded-xl border-2 border-[#3c3c3c] shadow-[3px_3px_0px_0px_#3c3c3c] cursor-pointer cursor-semibold flex items-center justify-center gap-2"
        >
          <span>Launch Lofi Quest Room Now</span>
        </motion.button>
      </div>

    </div>
  );
}
