import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import Background from "./Background";
import CustomCursor from "./CustomCursor";
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
    <div id="landing-page-root" className="min-h-screen bg-[#F9F6F0] text-[#3c3c3c] font-sans selection:bg-[#D67B52] selection:text-white pb-24 leading-relaxed overflow-x-hidden relative">
      <CustomCursor />
      <Background />
      
      {/* 1. DUOLINGO STYLE TOP NAVBAR */}
      <nav className="border-b-4 border-[#3c3c3c] bg-[#F3EFEA] sticky top-0 z-40 px-6 py-4 shadow-[0px_4px_0px_0px_rgba(60,60,60,0.1)]">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2.5 font-serif font-black text-xl text-[#3c3c3c] tracking-tight">
            <Compass className="text-[#D67B52] animate-spin" style={{ animationDuration: "30s" }} size={24} />
            <span className="matches-title">Lofi Academy</span>
          </div>
          
          <div className="flex items-center gap-3">
            {toggleDarkMode && (
              <button
                onClick={toggleDarkMode}
                className="p-2 bg-white border-2 border-[#3c3c3c] rounded-xl shadow-[2px_2px_0px_0px_#3c3c3c] text-[#3c3c3c] hover:scale-105 active:translate-y-[1px] transition-all cursor-pointer"
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDarkMode ? (
                  <Moon size={16} className="text-indigo-400" />
                ) : (
                  <Sun size={16} className="text-amber-500" />
                )}
              </button>
            )}
            
            {isWalletConnected && (
              <button
                onClick={onLaunch}
                className="hidden sm:inline-flex px-4 py-2 bg-[#89A8B2] hover:bg-[#89A8B2]/90 text-white font-mono font-bold text-xs rounded-xl border-2 border-[#3c3c3c] shadow-[2px_2px_0px_0px_#3c3c3c] active:translate-y-[2px] transition-all cursor-pointer"
              >
                ENTER ROOM
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* 2. GIGANTIC DUOLINGO HERO ROW */}
      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Animated Yeti Mascot Illustration + Speech Bubble */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          
          {/* Playful Duolingo-style Speech Bubble above the mascot */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
            className="mb-6 relative bg-white border-4 border-[#3c3c3c] px-6 py-4 rounded-2xl shadow-[4px_4px_0px_0px_#3c3c3c] max-w-sm text-center"
          >
            <p className="text-xs sm:text-sm font-bold text-[#3c3c3c] leading-relaxed">
              "Psst... Grab a warm coffee! Learning Sui Move is cozy, interactive, and completely stress-free!"
            </p>
            {/* Bubble arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-4 border-b-4 border-[#3c3c3c] rotate-45 -mt-2"></div>
          </motion.div>

          {/* Large, Beautiful Mascot Showcase Frame */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-sm aspect-square relative border-4 border-[#3c3c3c] rounded-[36px] bg-white shadow-[8px_8px_0px_0px_#3c3c3c] overflow-hidden group"
          >
            <img
              src={YETI_STUDY_ASSET}
              alt="Yeti studying blockchain code in cozy cabin"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 filter brightness-95"
            />
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#3c3c3c] text-white px-4 py-1 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase whitespace-nowrap">
              ❄️ Yeti's Study Log Cabin
            </div>
          </motion.div>

          {/* Quick Stats Under Mascot */}
          <div className="mt-6 flex flex-wrap gap-2.5 justify-center">
            <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full border-2 border-[#3c3c3c] shadow-[1px_1px_0px_0px_#3c3c3c] text-[10px] font-mono font-bold text-[#6D5D6E]">
              <Music size={11} className="text-[#D67B52]" /> Static-Beats Synced
            </span>
            <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full border-2 border-[#3c3c3c] shadow-[1px_1px_0px_0px_#3c3c3c] text-[10px] font-mono font-bold text-[#6D5D6E]">
              <Zap size={11} className="text-amber-500 fill-amber-300/20" /> &lt;0.3s Finality
            </span>
          </div>
        </div>

        {/* Right Side: High-Impact Typography & Chunky CTA buttons */}
        <div className="lg:col-span-7 flex flex-col text-center lg:text-left">
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-sans tracking-tight text-[#3c3c3c] leading-[1.1] mb-6">
            The free, fun, and <span className="text-[#D67B52] relative inline-block">cozy way <span className="absolute left-0 bottom-1 w-full h-2.5 bg-amber-200 -z-10 -rotate-1 rounded"></span></span> to learn Sui!
          </h1>
          
          <p className="text-base md:text-lg text-[#6D5D6E] font-medium leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
            Learn parallel consensus, compile robust smart contracts, and master Web3 concepts in an immersive lofi study space. Play mini-games, review code, and earn souvenir badges!
          </p>

          {/* Sturdy Rounded Call to Action Buttons */}
          <div className="flex flex-col gap-4 max-w-md mx-auto lg:mx-0 w-full">
            {isWalletConnected ? (
              <>
                {/* 3D chunky primary button */}
                <button
                  onClick={onLaunch}
                  className="w-full py-4.5 bg-[#D67B52] hover:bg-[#c26a42] text-white font-sans font-extrabold text-lg rounded-2xl border-2 border-b-6 border-[#3c3c3c] shadow-md hover:translate-y-[2px] hover:border-b-4 active:translate-y-[4px] active:border-b-2 transition-all cursor-pointer text-center uppercase tracking-wider"
                >
                  GET STARTED
                </button>
                
                <a
                  href="#how-it-works-anchor"
                  className="w-full py-4 bg-white hover:bg-[#F3EFEA] text-[#3c3c3c] font-sans font-extrabold text-sm rounded-2xl border-2 border-b-6 border-[#3c3c3c] hover:translate-y-[2px] hover:border-b-4 active:translate-y-[4px] active:border-b-2 transition-all text-center uppercase tracking-wide cursor-pointer"
                >
                  I want to read how it works
                </a>
              </>
            ) : (
              <div className="bg-[#FAF8F5] border-4 border-[#3c3c3c] p-6 rounded-3xl shadow-[4px_4px_0px_0px_#3c3c3c] space-y-4 text-center">
                <div className="inline-flex items-center gap-1.5 bg-orange-50 border-2 border-[#3c3c3c] px-3 py-1 rounded-full text-[10px] font-mono font-bold text-[#D67B52] uppercase">
                  <Lock size={12} className="animate-bounce" /> Sui Wallet Locked
                </div>
                
                <p className="text-xs text-[#6D5D6E] font-semibold leading-relaxed max-w-sm mx-auto">
                  To complete interactive courses, test smart compilers, simulate real-time DEX liquidity, and mint your souvenir badge, let's link your Sui account.
                </p>

                <div className="scale-105 py-1 flex justify-center">
                  <div className="p-1 bg-white border-2 border-[#3c3c3c] rounded-xl shadow-[3px_3px_0px_0px_#3c3c3c]">
                    <ConnectButton connectText="Connect Wallet to Start" />
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* 3. FOUR CORE Pillars (Simplification of Duolingo benefits) */}
      <div id="how-it-works-anchor" className="max-w-6xl mx-auto px-6 py-12 border-t-4 border-[#3c3c3c]/10 mt-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black font-sans text-[#3c3c3c] tracking-tight">
            Why people love learning with Yeti
          </h2>
          <p className="text-sm text-[#6D5D6E] font-medium mt-2">
            No boring lectures. No tedious setup. Just pure interactive lofi magic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 border-4 border-[#3c3c3c] rounded-2xl shadow-[4px_4px_0px_0px_#3c3c3c] flex flex-col justify-between interactive-card">
            <div>
              <div className="w-10 h-10 bg-orange-100 text-[#D67B52] border-2 border-[#3c3c3c] rounded-xl flex items-center justify-center mb-4 shadow-[1.5px_1.5px_0px_0px_#3c3c3c]">
                <Coffee size={18} />
              </div>
              <h4 className="text-base font-bold font-sans text-[#3c3c3c] uppercase">COZY CHALKBOARDS</h4>
              <p className="text-xs text-[#6D5D6E] font-semibold mt-2 leading-relaxed">
                Study clean compiled Move code snippets displayed on green classroom chalkboards. Play sound loops and verify compiler parameters in a warm workspace.
              </p>
            </div>
            <span className="text-[9px] font-mono text-[#D67B52] font-black uppercase mt-4">100% stress free</span>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 border-4 border-[#3c3c3c] rounded-2xl shadow-[4px_4px_0px_0px_#3c3c3c] flex flex-col justify-between interactive-card">
            <div>
              <div className="w-10 h-10 bg-emerald-100 text-emerald-700 border-2 border-[#3c3c3c] rounded-xl flex items-center justify-center mb-4 shadow-[1.5px_1.5px_0px_0px_#3c3c3c]">
                <TrendingUp size={18} />
              </div>
              <h4 className="text-base font-bold font-sans text-[#3c3c3c] uppercase">DEFI SANDBOX</h4>
              <p className="text-xs text-[#6D5D6E] font-semibold mt-2 leading-relaxed">
                Interact with simulated Cetus and Navi Lending interfaces. Learn swap math, slippage, and parallel pipelines safely without risking actual gas coins.
              </p>
            </div>
            <span className="text-[9px] font-mono text-[#89A8B2] font-black uppercase mt-4">Simulators included</span>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 border-4 border-[#3c3c3c] rounded-2xl shadow-[4px_4px_0px_0px_#3c3c3c] flex flex-col justify-between interactive-card">
            <div>
              <div className="w-10 h-10 bg-blue-100 text-[#89A8B2] border-2 border-[#3c3c3c] rounded-xl flex items-center justify-center mb-4 shadow-[1.5px_1.5px_0px_0px_#3c3c3c]">
                <Award size={18} />
              </div>
              <h4 className="text-base font-bold font-sans text-[#3c3c3c] uppercase">SOUVENIR NFTS</h4>
              <p className="text-xs text-[#6D5D6E] font-semibold mt-2 leading-relaxed">
                Connect a mock ledger wallet inside the cabin and mint real cryptographic certificate receipts. Claim a completely worthless but extremely cute digital medal!
              </p>
            </div>
            <span className="text-[9px] font-mono text-stone-500 font-black uppercase mt-4">$0 utility token</span>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 border-4 border-[#3c3c3c] rounded-2xl shadow-[4px_4px_0px_0px_#3c3c3c] flex flex-col justify-between interactive-card">
            <div>
              <div className="w-10 h-10 bg-purple-100 text-purple-700 border-2 border-[#3c3c3c] rounded-xl flex items-center justify-center mb-4 shadow-[1.5px_1.5px_0px_0px_#3c3c3c]">
                <BookOpen size={18} />
              </div>
              <h4 className="text-base font-bold font-sans text-[#3c3c3c] uppercase">ECOSYSTEM UPDATES</h4>
              <p className="text-xs text-[#6D5D6E] font-semibold mt-2 leading-relaxed">
                Access curated newsletters on Mysticeti speeds, zkLogin tools, and DeepBook. Generate custom smart digests to keep you fully updated.
              </p>
            </div>
            <span className="text-[9px] font-mono text-purple-600 font-black uppercase mt-4">Cozy Smart digests</span>
          </div>
        </div>
      </div>

      {/* 4. SUI IN THE WORLD & DEVELOPER EMPOWERMENT (The requested module) */}
      <div className="bg-[#FAF8F5] border-t-4 border-b-4 border-[#3c3c3c] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-mono font-bold text-[#D67B52] bg-[#D67B52]/10 border-2 border-[#3c3c3c] px-3 py-1 rounded-full uppercase tracking-wider">
              SUI GLOBAL ENGAGEMENT
            </span>
            <h2 className="text-3xl font-black font-sans text-[#3c3c3c] mt-3">
              How Sui is Empowering Developers Worldwide
            </h2>
            <p className="text-sm text-[#6D5D6E] font-medium mt-2 leading-relaxed">
              Explore how the Sui Foundation fuels real-world utility, global hub activities, and developer innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 border-2 border-b-4 border-[#3c3c3c] rounded-2xl shadow-[2px_2px_0px_0px_#3c3c3c] relative">
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="text-lg font-bold font-sans text-[#3c3c3c] uppercase">Real-World Utility</h3>
              <p className="text-xs text-[#6D5D6E] font-semibold mt-2 leading-relaxed">
                Major institutions, luxury brands, and mobile operators use Sui to issue high-velocity Real World Assets (RWAs), secure digital identity markers, and process instant global micro-transactions. This bridges purely theoretical blockchain research directly into the hands of real users!
              </p>
            </div>

            <div className="bg-white p-6 border-2 border-b-4 border-[#3c3c3c] rounded-2xl shadow-[2px_2px_0px_0px_#3c3c3c] relative">
              <div className="text-3xl mb-3">🏡</div>
              <h3 className="text-lg font-bold font-sans text-[#3c3c3c] uppercase">Builder Houses</h3>
              <p className="text-xs text-[#6D5D6E] font-semibold mt-2 leading-relaxed">
                The heartbeat of Sui lies in its dynamic, physical community! Through international Sui Builder Houses, developer bootcamps, and legendary decentralized hackerspaces, builders from Tokyo to Paris collaborate in real-time to trigger technical breakthroughs and form alliances.
              </p>
            </div>

            <div className="bg-white p-6 border-2 border-b-4 border-[#3c3c3c] rounded-2xl shadow-[2px_2px_0px_0px_#3c3c3c] relative">
              <div className="text-3xl mb-3">🛠️</div>
              <h3 className="text-lg font-bold font-sans text-[#3c3c3c] uppercase">Developer Grants</h3>
              <p className="text-xs text-[#6D5D6E] font-semibold mt-2 leading-relaxed">
                Sui puts developer needs first! The Sui Foundation distributes millions of dollars in developer grants, academic sponsorships, and startup incubator aid. Alongside direct economic support, builders are empowered with state-of-the-art tooling, instant debugging IDE suites, and SDKs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. INTERACTIVE KNOWLEDGE REVELATOR TAB SLIDER */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3.5xl font-black font-sans text-[#3c3c3c] tracking-tight">
            Structured to decode web3 magic
          </h2>
          <p className="text-xs text-[#6D5D6E] font-mono uppercase tracking-widest font-extrabold mt-1">
            Click tabs to see three vital modern blockchain paradigms
          </p>
        </div>

        {/* Tab selection */}
        <div className="max-w-md mx-auto mb-6">
          <div className="grid grid-cols-3 gap-1.5 bg-white border-2 border-[#3c3c3c] p-1.5 rounded-2xl font-mono font-bold text-xs shadow-[3px_3px_0px_0px_#3c3c3c]">
            {(["sui", "web3", "move"] as const).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setActiveTab(t);
                  setIsAutoplay(false); // Pause on manual action
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

          <div className="flex items-center justify-between px-1 mt-2.5 font-mono text-[9px] text-[#6D5D6E] font-bold">
            <button 
              onClick={() => setIsAutoplay(prev => !prev)}
              className="flex items-center gap-1 px-2 py-0.5 bg-white border-2 border-[#3c3c3c] rounded shadow-[1px_1px_0px_0px_#3c3c3c] cursor-pointer"
            >
              {isAutoplay ? <Pause size={9} /> : <Play size={9} />}
              <span>{isAutoplay ? "Pause Cycle" : "Auto Cycle"}</span>
            </button>
            {isAutoplay && <span>Next tab in {Math.max(1, Math.ceil((5000 - (autoplayProgress / 100) * 5000) / 1000))}s</span>}
          </div>
        </div>

        {/* Tab display */}
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border-4 border-[#3c3c3c] rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_0px_#3c3c3c]"
        >
          {activeTab === "sui" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-[9px] font-mono font-bold text-[#89A8B2] bg-[#89A8B2]/10 border-2 border-[#3c3c3c] px-2 py-0.5 rounded-full uppercase">
                  Parallel Scale Leader
                </span>
                <h3 className="text-xl font-bold font-sans text-[#3c3c3c] mt-2">Why are SUI transactions so fast?</h3>
                <p className="text-xs text-[#6D5D6E] mt-2 font-mono leading-relaxed">
                  Traditional blockchains act like single highways where everything queues up behind one slow truck. Sui processes simple transactions in parallel, bypassing global consensus locks for individual state records.
                </p>
                <div className="space-y-2 mt-4 text-xs font-semibold text-[#3c3c3c]">
                  <div className="flex items-start gap-2">
                    <span className="bg-emerald-100 text-emerald-700 p-0.5 px-1.5 rounded border border-[#3c3c3c] shrink-0 font-bold">✓</span>
                    <p><strong>Sub-300ms finality</strong> — Faster than clicking a Web2 payment API gateway.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="bg-emerald-100 text-emerald-700 p-0.5 px-1.5 rounded border border-[#3c3c3c] shrink-0 font-bold">✓</span>
                    <p><strong>Dynamic gas adjustment</strong> — Epoch values adjust incentives every 24 hours.</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#F3EFEA] border-2 border-[#3c3c3c] p-4 rounded-2xl shadow-inner font-mono text-[10px] space-y-2">
                <div className="text-stone-400 uppercase font-extrabold pb-1 border-b border-[#3c3c3c]/10 flex justify-between">
                  <span>SUI VS TRADITIONAL SPEED</span>
                  <span className="text-emerald-600 animate-pulse">● MEASURED</span>
                </div>
                <div className="space-y-1 text-stone-600 font-bold">
                  <div className="flex justify-between"><span>Bitcoin Block:</span> <span>10 mins</span></div>
                  <div className="flex justify-between"><span>Solana latency:</span> <span>~2.5 seconds</span></div>
                  <div className="flex justify-between text-emerald-700 font-extrabold bg-white p-1 rounded border-2 border-[#3c3c3c]">
                    <span>Sui transaction:</span> <span>0.28 seconds (!)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "web3" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-[9px] font-mono font-bold text-[#D67B52] bg-[#D67B52]/10 border-2 border-[#3c3c3c] px-2 py-0.5 rounded-full uppercase">
                  True Decentralization
                </span>
                <h3 className="text-xl font-bold font-sans text-[#3c3c3c] mt-2">What is Web3 & Cryptography?</h3>
                <p className="text-xs text-[#6D5D6E] mt-2 font-mono leading-relaxed">
                  Web2 servers are owned by huge monolithic companies that track, sell, or delete credentials at will. Web3 utilizes math and cryptographic keypairs to secure ownership inside immutable, decentralized peer networks.
                </p>
                <div className="space-y-2 mt-4 text-xs font-semibold text-[#3c3c3c]">
                  <div className="flex items-start gap-2">
                    <span className="bg-[#89A8B2]/20 text-[#89A8B2] p-0.5 px-1.5 rounded border border-[#3c3c3c] shrink-0 font-bold">🗝️</span>
                    <p><strong>Private Key Ownership</strong> — Digital signatures are generated locally. No central database can hijack your identity.</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#F3EFEA] border-2 border-[#3c3c3c] p-4.5 rounded-2xl shadow-inner font-mono text-[10px] space-y-1.5">
                <div className="text-stone-400 uppercase font-extrabold pb-1.5 border-b border-[#3c3c3c]/10">CRYPTOGRAPHIC WORKFLOW:</div>
                <div className="space-y-1 text-stone-600 font-bold">
                  <p>1. Client signs payload locally with private key</p>
                  <p>2. Hash broadcasted through RPC gateways</p>
                  <p>3. Validators verify public address matches signature</p>
                  <p className="text-emerald-700 bg-white p-1 rounded border border-emerald-400 font-extrabold text-[9px]">4. Consensus confirmed: State updated immutable!</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "move" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-[9px] font-mono font-bold text-indigo-700 bg-indigo-50 border-2 border-[#3c3c3c] px-2 py-0.5 rounded-full uppercase">
                  Object-Centric Move Paradigm
                </span>
                <h3 className="text-xl font-bold font-sans text-[#3c3c3c] mt-2">Why is Sui Move inherently secure?</h3>
                <p className="text-xs text-[#6D5D6E] mt-2 font-mono leading-relaxed">
                  In Ethereum, smart contracts hold values as simple balance lists inside global storage. In Sui Move, assets behave like actual atomic <strong>Objects</strong> stored directly inside your own address coordinates!
                </p>
                <div className="space-y-2 mt-4 text-xs font-semibold text-[#3c3c3c]">
                  <div className="flex items-start gap-2">
                    <span className="bg-amber-100 text-[#D67B52] p-0.5 px-1.5 rounded border border-[#3c3c3c] shrink-0 font-bold">📦</span>
                    <p><strong>Absolute Object Control</strong> — Creators must explicitly import rules to borrow, transfer, or overwrite them.</p>
                  </div>
                </div>
              </div>
              <div className="bg-stone-900 text-stone-200 border-2 border-[#3c3c3c] p-3 rounded-2xl shadow-lg font-mono text-[9px] leading-tight">
                <div className="text-gray-400 border-b border-[#3c3c3c] pb-1 mb-1 uppercase flex justify-between">
                  <span>sui_move_module::custom_badge</span>
                  <span className="text-indigo-400">Move compiled</span>
                </div>
                <pre className="text-emerald-400 font-bold">
{`struct CozyBadge has key, store {
    id: UID,
    title: String,
    xp_granted: u64,
}`}
                </pre>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* 6. PLAYABLE MINI-ARCADE: CONSENSUS SPEEDWAY */}
      <div id="retro-arcade-panel" className="max-w-xl mx-auto px-6 py-6 text-center z-10 relative">
        <div className="bg-white border-4 border-[#3c3c3c] rounded-3xl p-6 shadow-[5px_5px_0px_0px_#3c3c3c]">
          <Gamepad size={36} className="mx-auto text-[#D67B52] mb-2 animate-bounce" />
          
          <h4 className="text-lg font-bold font-sans text-[#3c3c3c] uppercase">Yeti's Parallel Consensus Speedway</h4>
          <p className="text-xs text-[#6D5D6E] font-semibold mt-1 mb-4">
            Avoid transaction congestion blockades & collect MIST gas refund coins!
          </p>

          <div className="flex justify-between items-center bg-[#FAF8F5] px-3.5 py-1.5 border-2 border-[#3c3c3c] rounded-xl mb-3 text-xs font-mono select-none">
            <span className="font-bold flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>VALIDATORS: SYNCED</span>
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
              const rect = e.currentTarget.getBoundingClientRect();
              const relativeY = e.clientY - rect.top;
              if (relativeY < rect.height / 2) {
                handleSwapLane(0);
              } else {
                handleSwapLane(1);
              }
            }}
            className="relative h-44 w-full bg-stone-900 border-4 border-[#3c3c3c] rounded-2xl overflow-hidden shadow-inner font-mono cursor-pointer select-none"
            title="Click Top half for Fast-Path, Bottom half for Consensus!"
          >
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.22)_50%)] bg-[size:100%_4px] opacity-20 z-20"></div>

            {/* Score HUD Display */}
            <div className="absolute top-2 left-3 right-3 flex justify-between text-[10px] font-bold z-20">
              <span className="text-amber-400">SCORE: {gameScore}</span>
              <span className="text-emerald-400 font-mono">
                {hasShield ? "🛡️ SHIELD ENABLED" : "⚡ PARALLEL ROUTING"}
              </span>
              <span className="text-stone-400">HIGH: {highScore}</span>
            </div>

            {/* Tracks */}
            <div className="absolute bottom-22 left-0 right-0 h-0.5 border-t border-dashed border-cyan-800/60 z-0"></div>
            <div className="absolute bottom-24 left-3 text-cyan-500/40 text-[7px] font-black uppercase tracking-wider">
              LANE 0: FAST-PATH (OWNED OBJECT BYPASS)
            </div>

            <div className="absolute bottom-8 left-0 right-0 h-0.5 border-t border-dashed border-amber-800/60 z-0"></div>
            <div className="absolute bottom-10 left-3 text-amber-500/40 text-[7px] font-black uppercase tracking-wider">
              LANE 1: SHARED OBJECT CONSENSUS QUEUE
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-2 bg-stone-950 z-10"></div>

            {/* Yeti Avatar */}
            <motion.div 
              className="absolute left-10 text-2xl z-10 flex items-center transition-all duration-200"
              style={{ 
                bottom: activeLane === 0 ? "42px" : "10px",
                filter: hasShield ? "drop-shadow(0 0 8px rgba(34, 211, 238, 0.8))" : "none"
              }}
              animate={isJumping ? { 
                y: -30, 
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
            </motion.div>

            {/* Collectible Coin */}
            {gameStarted && !gameOver && (
              <motion.div 
                className="absolute text-base z-10"
                style={{ 
                  bottom: coinLane === 0 ? "44px" : "12px", 
                  left: `${coinX}%` 
                }}
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                <span>🪙</span>
              </motion.div>
            )}

            {/* Obstacle Hazard */}
            {gameStarted && !gameOver && (
              <div 
                className="absolute text-lg z-10 flex flex-col items-center"
                style={{ 
                  bottom: blockLane === 0 ? "44px" : "12px", 
                  left: `${blockX}%` 
                }}
              >
                <span>{obstacleType}</span>
              </div>
            )}

            {/* Standby */}
            {!gameStarted && (
              <div className="absolute inset-0 bg-stone-900/95 flex flex-col items-center justify-center p-4 z-20">
                <span className="text-[#D67B52] text-[10px] font-black tracking-widest animate-pulse mb-1">
                  [ ARCADIA CONSENSUS ]
                </span>
                <p className="text-stone-400 text-[9px] max-w-xs leading-tight font-sans">
                  Press arrow keys or click tracks to alter lanes. Space to jump obstacle blockades!
                </p>
                <button className="mt-3 px-3 py-1 bg-indigo-600 border-2 border-stone-700 rounded-lg text-white text-[9px] font-bold cursor-pointer uppercase">
                  INSERT PROTOCOL COIN 🪙
                </button>
              </div>
            )}

            {/* Gameover */}
            {gameOver && (
              <div className="absolute inset-0 bg-red-950/90 flex flex-col items-center justify-center p-4 z-30">
                <span className="text-red-400 text-[10px] font-black uppercase tracking-widest mb-1">
                  💥 TRANSACTION COLLIDED 💥
                </span>
                <p className="text-stone-300 text-[9px] mt-1">
                  Consensus Aborted. Score: <strong className="text-amber-400">{gameScore}</strong> | High: <strong className="text-white">{highScore}</strong>
                </p>
                <button className="mt-3 px-3 py-1 bg-[#D67B52] border-2 border-stone-700 rounded-lg text-white text-[9px] font-extrabold cursor-pointer">
                  REPLAY LEDGER SEQUENCE 🔄
                </button>
              </div>
            )}
          </div>

          {/* Controls feedback bar */}
          <div className="mt-3 flex items-center justify-between gap-2 bg-[#FAF8F5] p-3 border-2 border-[#3c3c3c] rounded-2xl text-left">
            <div>
              <span className="text-[#3c3c3c] text-[9px] font-bold block">ACTIVE LANE SELECTOR:</span>
              <div className="flex gap-1.5 mt-1">
                <button
                  onClick={() => handleSwapLane(0)}
                  disabled={!gameStarted || gameOver}
                  className={`px-2 py-0.5 text-[8px] font-mono font-black border border-[#3c3c3c] rounded cursor-pointer ${
                    activeLane === 0 ? "bg-cyan-100 text-cyan-800" : "bg-white text-stone-500 opacity-60"
                  }`}
                >
                  🟢 LANE 0
                </button>
                <button
                  onClick={() => handleSwapLane(1)}
                  disabled={!gameStarted || gameOver}
                  className={`px-2 py-0.5 text-[8px] font-mono font-black border border-[#3c3c3c] rounded cursor-pointer ${
                    activeLane === 1 ? "bg-amber-100 text-[#D67B52]" : "bg-white text-stone-500 opacity-60"
                  }`}
                >
                  🟡 LANE 1
                </button>
              </div>
            </div>

            <button
              onClick={handleJump}
              className="px-3 py-1.5 bg-indigo-600 text-white border-2 border-[#3c3c3c] font-mono text-[9px] font-bold rounded-lg shadow-[1px_1px_0px_0px_#3c3c3c] cursor-pointer"
            >
              🚀 JUMP [Space]
            </button>
          </div>
        </div>
      </div>

      {/* 7. BOTTOM CALL TO ACTION CONTAINER */}
      <div className="mt-16 text-center max-w-md mx-auto px-6">
        <h3 className="text-2xl font-black font-sans text-[#3c3c3c]">Ready to start learning?</h3>
        <p className="text-xs text-[#6D5D6E] font-semibold mt-1 mb-6">
          Level up, earn genuine XP points, claim certificates, and study secure Move module structures today.
        </p>

        <button
          onClick={onLaunch}
          className="w-full py-4 bg-[#89A8B2] hover:bg-[#72929c] text-white font-sans font-extrabold text-base rounded-2xl border-2 border-b-6 border-[#3c3c3c] hover:translate-y-[2px] hover:border-b-4 active:translate-y-[4px] active:border-b-2 transition-all cursor-pointer uppercase tracking-wider text-center"
        >
          ENTER THE ACADEMY ❄️
        </button>
      </div>

    </div>
  );
}
