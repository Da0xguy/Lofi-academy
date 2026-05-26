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
}

export function LandingPage({ onLaunch, userXP, isDarkMode = false, toggleDarkMode, isWalletConnected = false }: LandingPageProps) {
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
    return Number(localStorage.getItem("sui_yeti_gamer_hs") || "0");
  });
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [blockX, setBlockX] = useState<number>(100);
  const [obstacleType, setObstacleType] = useState<string>("🧱");

  const obstacles = ["🧱", "⛓️", "⛽", "👾", "📈"];

  const handleJump = () => {
    if (!gameStarted) {
      setGameStarted(true);
      setGameOver(false);
      setGameScore(0);
      setBlockX(100);
      return;
    }
    if (gameOver) {
      setGameOver(false);
      setGameScore(0);
      setBlockX(100);
      return;
    }
    if (isJumping) return;
    setIsJumping(true);
    setTimeout(() => {
      setIsJumping(false);
    }, 450);
  };

  // Keyboard space key listener helper
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        // Only prevent default on landing screen so we don't block main page scrolling if not active game
        if (gameStarted && !gameOver) {
          e.preventDefault();
          handleJump();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameStarted, gameOver, isJumping]);

  // Mini-game clock intervals scheduler
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const timer = setInterval(() => {
      setBlockX((prev) => {
        const next = prev - 1.8;
        if (next <= 0) {
          // Cleared barrier successfully! Award point
          setGameScore((s) => {
            const val = s + 1;
            if (val > highScore) {
              setHighScore(val);
              localStorage.setItem("sui_yeti_gamer_hs", String(val));
            }
            return val;
          });
          setObstacleType(obstacles[Math.floor(Math.random() * obstacles.length)]);
          return 100;
        }

        // Collision checking parameters
        if (next >= 10 && next <= 24) {
          if (!isJumping) {
            setGameOver(true);
            clearInterval(timer);
          }
        }

        return next;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [gameStarted, gameOver, isJumping, highScore]);

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
          <Compass className="text-[#D67B52]" size={18} /> Lofi Quest: Sui Academy
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
                  <span>Enter Academy Questroom</span>
                  <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
                </span>
                <div className="absolute top-0 -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-full group-hover:duration-1000 group-hover:translate-x-0 group-hover:transition-all" />
              </motion.button>
              <a 
                href="#visual-learn-more"
                className="w-full sm:w-auto px-8 py-5 bg-white hover:bg-[#F3EFEA] text-[#3c3c3c] font-mono font-bold text-sm rounded-2xl border-4 border-[#3c3c3c] shadow-[4px_4px_0px_0px_#3c3c3c] cursor-pointer text-center"
              >
                How it works &rarr;
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
        className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Card 1 */}
        <motion.div 
          variants={itemVariants} 
          whileHover={{ y: -5 }}
          className="bg-white p-6 border-4 border-[#3c3c3c] rounded-3xl shadow-[4px_4px_0px_0px_#3c3c3c] flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 bg-orange-100 text-[#D67B52] border-2 border-[#3c3c3c] rounded-xl flex items-center justify-center font-bold mb-4 shadow-[1px_1px_0px_0px_#3c3c3c]">
              ☕
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
              📊
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
              🥫
            </div>
            <h4 className="text-lg font-bold font-serif text-[#3c3c3c]">CLAIM THE VALUELESS NFT GIFT</h4>
            <p className="text-xs text-[#6D5D6E] font-semibold mt-2 leading-relaxed">
              Once inside, connect a mock wallet and mint your certificate into your Sui Kiosk address profiles. You can also trigger the Certified completely, absolutely Worthless NFT to see true ledger object registration logs!
            </p>
          </div>
          <span className="text-[10px] font-mono text-stone-500 font-bold mt-4 uppercase inline-block">Exactly $0 utility souvenir</span>
        </motion.div>
      </motion.div>

      {/* 5B. PLAYABLE MINI-ARCADE: YETI'S BLOCK CONSENSUS JUMP RUNNER */}
      <div className="max-w-4xl mx-auto px-6 py-6 text-center z-10 relative">
        <div className="bg-white border-4 border-[#3c3c3c] rounded-3xl p-6 shadow-[5px_5px_0px_0px_#3c3c3c] max-w-xl mx-auto">
          <Gamepad size={36} className="mx-auto text-indigo-600 mb-3 animate-pulse" />
          
          <h4 className="text-lg font-bold font-serif text-[#3c3c3c] uppercase tracking-wide">Yeti's Consensus Block Runner</h4>
          <p className="text-xs text-[#6D5D6E] font-semibold mt-1 mb-4 max-w-sm mx-auto">
            Interactive background game: Make Yeti jump over unconfirmed block obstacles! Press <strong>[Spacebar]</strong> or click jump!
          </p>

          {/* Arcade Cabinet Screen */}
          <div 
            onClick={handleJump}
            className="relative h-44 w-full bg-stone-900 border-4 border-[#3c3c3c] rounded-2xl overflow-hidden shadow-inner font-mono cursor-pointer select-none group"
            title="Click screen zone to Jump!"
          >
            {/* Ambient grid scanlines effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.22)_50%)] bg-[size:100%_4px] opacity-20"></div>

            {/* Score HUD Overlay */}
            <div className="absolute top-2 left-3 right-3 flex justify-between text-[11px] font-bold z-20">
              <span className="text-amber-400">SCORE: {gameScore}</span>
              <span className="text-stone-400">HI-SCORE: {highScore}</span>
            </div>

            {/* Parallax Star fields and mountain outlines */}
            <div className="absolute bottom-6 left-0 right-0 h-0.5 bg-stone-700"></div>
            <div className="absolute bottom-1 right-2 text-stone-600 text-[8px] tracking-widest font-bold uppercase select-none pointer-events-none">
              Mysticeti Lanes
            </div>

            {/* Yeti Avatar 🐻 */}
            <motion.div 
              className="absolute left-10 text-3xl z-10"
              style={{ bottom: "24px" }}
              animate={isJumping ? { y: -58, rotate: [0, -15, 15, 0] } : { y: 0, rotate: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <span>🐻</span>
              <span className="absolute -top-3 -right-2 text-[10px] animate-bounce">☕</span>
            </motion.div>

            {/* Moving Obstacle Block 🧱 (transaction hash) */}
            {gameStarted && !gameOver && (
              <motion.div 
                className="absolute text-xl z-10 flex flex-col items-center"
                style={{ bottom: "24px", left: `${blockX}%` }}
              >
                <span>{obstacleType}</span>
                <span className="text-[7px] text-rose-400 font-bold bg-stone-950 px-1 border border-rose-500 rounded font-mono">
                  0xSUI
                </span>
              </motion.div>
            )}

            {/* Non-Started state indicator overlay */}
            {!gameStarted && (
              <div className="absolute inset-0 bg-stone-900/90 flex flex-col items-center justify-center p-4">
                <span className="text-indigo-400 text-xs font-bold blink animate-pulse mb-1">
                  [ STANDBY STATUS READY ]
                </span>
                <p className="text-stone-400 text-[10px] max-w-xs leading-normal">
                  Tap anywhere on the arcade machine screen or click button below to activate Yeti consensus!
                </p>
                <button className="mt-3 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 border-2 border-[#3c3c3c] rounded-xl text-white text-[10px] font-semibold shadow-[1px_1px_0px_0px_#3c3c3c] cursor-pointer">
                  INSERT COIN 🪙
                </button>
              </div>
            )}

            {/* Game Over state layout */}
            {gameOver && (
              <div className="absolute inset-0 bg-[#e74c3c]/15 backdrop-blur-[1px] bg-stone-950/90 flex flex-col items-center justify-center p-4 z-30">
                <span className="text-red-500 text-xs font-black uppercase tracking-widest mb-1.5 animate-bounce">
                  💥 Ledger Collision! GAME OVER 💥
                </span>
                <p className="text-stone-400 text-[9px] max-w-xs mb-3">
                  Score: <strong className="text-amber-400">{gameScore}</strong> | High Score: <strong className="text-white">{highScore}</strong>
                </p>
                <button className="px-4 py-1.5 bg-[#D67B52] hover:bg-[#D67B52]/90 border-2 border-[#3c3c3c] rounded-xl text-white text-[10px] font-black shadow-[2px_2px_0px_0px_#3c3c3c] cursor-pointer uppercase">
                  RESTART LEDGER LOOP 🔄
                </button>
              </div>
            )}

          </div>

          {/* Physical Gamepad controls style */}
          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              onClick={handleJump}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 hover:scale-103 transition-transform text-white border-2 border-[#3c3c3c] font-mono text-xs font-bold rounded-xl shadow-[3px_3px_0px_0px_#3c3c3c] cursor-pointer flex items-center gap-2 select-none"
            >
              <span>{gameStarted && !gameOver ? "JUMP YETI! ⬆️" : "START LEDGER GAME 🎮"}</span>
              <span className="bg-indigo-800 text-[9px] px-1 rounded">Space</span>
            </button>
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
          <span>&rarr;</span>
        </motion.button>
      </div>

    </div>
  );
}
