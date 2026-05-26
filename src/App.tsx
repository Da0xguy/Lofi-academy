import React, { useState, useEffect } from "react";
import { initialTracks } from "./data";
import { LearningTrack, TrackModule, UserProfile, MintResult } from "./types";
import { YetiChalkboard } from "./components/YetiChalkboard";
import { DeFiSimulator } from "./components/DeFiSimulator";
import { LeaderboardWidget } from "./components/LeaderboardWidget";
import { ProfileWidget } from "./components/ProfileWidget";
import { TutorFloatingWidget } from "./components/TutorFloatingWidget";
import { AudioPlayerWidget } from "./components/AudioPlayerWidget";
import { LandingPage } from "./components/LandingPage";
import Background from "./components/Background";
import { motion, AnimatePresence } from "motion/react";
import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";

import { 
  Compass, 
  TrendingUp, 
  Coins, 
  Award, 
  Trophy, 
  User, 
  Settings, 
  Sparkles, 
  CheckCircle, 
  CircleAlert, 
  Coffee, 
  Lock, 
  ChevronRight, 
  Flame, 
  Gamepad, 
  Lightbulb,
  ExternalLink
} from "lucide-react";

// Pre-generated static assets mapped from tools outputs
const YETI_STUDY_ASSET = "/src/assets/images/yeti_study_1779633378264.png";
const YETI_BADGE_ASSET = "/src/assets/images/yeti_badge_1779633396226.png";

export default function App() {
  // State for landing page vs main app launch
  const [appLaunched, setAppLaunched] = useState<boolean>(() => {
    return localStorage.getItem("sui_yeti_launched") === "true";
  });

  // Dark mode state implementation
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("sui_yeti_dark_mode") === "true";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("sui_yeti_dark_mode", darkMode ? "true" : "false");
  }, [darkMode]);

  const [appLoading, setAppLoading] = useState<boolean>(false);
  const [loadingPercent, setLoadingPercent] = useState<number>(0);
  const [loadingStatus, setLoadingStatus] = useState<string>("Initializing Sui CLI Sandbox...");

  const handleLaunchApp = () => {
    setAppLoading(true);
    setLoadingPercent(0);
    setLoadingStatus("Booting Sui CLI sandbox environments...");

    const interval = setInterval(() => {
      setLoadingPercent((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 4;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setAppLoading(false);
            setAppLaunched(true);
            localStorage.setItem("sui_yeti_launched", "true");
          }, 350);
          return 100;
        }

        // Dynamically update status logs as loading percentage grows
        if (next < 20) {
          setLoadingStatus("Initializing local bytecode compilers & parsers...");
        } else if (next < 40) {
          setLoadingStatus("Checking Narwhal mempool sequencers & validators...");
        } else if (next < 60) {
          setLoadingStatus("Compiling Move Entry Modules (assisted by Yeti 🐻)...");
        } else if (next < 80) {
          setLoadingStatus("Adjusting gas optimization fee parameters... OK.");
        } else if (next < 95) {
          setLoadingStatus("Syncing retro chord tracks and static ambient loops... 🎧");
        } else {
          setLoadingStatus("Secure object coordinates found. Launching Sui Questroom! 🚀");
        }

        return next;
      });
    }, 110);
  };

  const handleReturnToLanding = () => {
    setAppLaunched(false);
    localStorage.setItem("sui_yeti_launched", "false");
  };

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<"dashboard" | "simulator" | "leaderboard" | "profile">("dashboard");

  // Lessons curriculum state
  const [tracks, setTracks] = useState<LearningTrack[]>(initialTracks);
  const [activeTrackId, setActiveTrackId] = useState<string>("sui-basics");
  const [activeModuleId, setActiveModuleId] = useState<string>("basics-intro");
  
  // Learning Flow state
  const [flowState, setFlowState] = useState<"syllabus" | "classroom" | "quiz" | "quiz-result">("syllabus");
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  
  // Quiz evaluation state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isQuestionSubmitted, setIsQuestionSubmitted] = useState<boolean>(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [quizXPAccumulated, setQuizXPAccumulated] = useState<number>(0);

  // User details state
  const [user, setUser] = useState<UserProfile>(() => {
    // Basic defaults with daily login streak initial setup
    const saved = localStorage.getItem("sui_yeti_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {}
    }
    return {
      username: "CozyExplorer",
      avatar: "🦊",
      walletAddress: null,
      xp: 0,
      level: 1,
      completedModules: [],
      completedTracks: [],
      claimedWelcomeXP: false,
      mintedBadges: [],
      streak: 1,
      lastLoginDate: new Date().toISOString().split("T")[0]
    };
  });

  const currentAccount = useCurrentAccount();

  // Synchronize dApp kit connected wallet address with user profile state
  useEffect(() => {
    if (currentAccount) {
      if (user.walletAddress !== currentAccount.address) {
        setUser((prev) => {
          const updated = {
            ...prev,
            walletAddress: currentAccount.address,
            // If connecting for the first time, award welcome bonus
            xp: prev.claimedWelcomeXP ? prev.xp : prev.xp + 50,
            claimedWelcomeXP: true
          };
          return updated;
        });
      }
    } else {
      if (user.walletAddress !== null) {
        setUser((prev) => {
          const updated = {
            ...prev,
            walletAddress: null
          };
          return updated;
        });
      }
    }
  }, [currentAccount, user.walletAddress]);

  // Streak bonus claim option
  const [claimedStreakBonus, setClaimedStreakBonus] = useState<boolean>(false);
  const [leaderboardRefreshCode, setLeaderboardRefreshCode] = useState<number>(0);

  // Dynamic Level evaluation checking XP progress
  useEffect(() => {
    // Level calculation formula: Level 1 = 0-99 XP, Level 2 = 100-299 XP, etc.
    let targetLevel = 1;
    if (user.xp >= 700) targetLevel = 5;
    else if (user.xp >= 500) targetLevel = 4;
    else if (user.xp >= 300) targetLevel = 3;
    else if (user.xp >= 100) targetLevel = 2;

    if (targetLevel !== user.level) {
      setUser((prev) => ({
        ...prev,
        level: targetLevel
      }));
    }
  }, [user.xp]);

  // Save profile coordinates onLocalStorage
  useEffect(() => {
    localStorage.setItem("sui_yeti_user", JSON.stringify(user));
  }, [user]);

  // Helper. Award dynamic XP safely
  const handleAwardXP = (amount: number) => {
    setUser((prev) => ({
      ...prev,
      xp: prev.xp + amount
    }));
  };

  // Helper selectors
  const activeTrack = tracks.find((t) => t.id === activeTrackId)!;
  const activeModule = activeTrack?.modules.find((m) => m.id === activeModuleId)!;

  // Change curriculum track trigger
  const handleSelectTrack = (trackId: string) => {
    setActiveTrackId(trackId);
    const firstMod = tracks.find((t) => t.id === trackId)?.modules[0];
    if (firstMod) {
      setActiveModuleId(firstMod.id);
    }
    setFlowState("syllabus");
  };

  // Enter active classroom step by step slide
  const handleStartModule = (mod: TrackModule) => {
    setActiveModuleId(mod.id);
    setFlowState("classroom");
    setActiveStepIndex(0);
    
    // Clear quiz variables
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsQuestionSubmitted(false);
    setCorrectAnswersCount(0);
    setQuizXPAccumulated(0);
  };

  // Action: Step next
  const handleNextStep = () => {
    if (activeStepIndex < activeModule.steps.length - 1) {
      setActiveStepIndex((prev) => prev + 1);
    } else {
      // Advance to Assessment Phase directly
      setFlowState("quiz");
    }
  };

  // Action: Step previous
  const handlePrevStep = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex((prev) => prev - 1);
    }
  };

  // Submit select option in active quiz questioned
  const handleSubmitAnswer = () => {
    if (selectedOptionIndex === null || isQuestionSubmitted) return;
    
    const isCorrect = selectedOptionIndex === activeModule.quiz[currentQuestionIndex].correctAnswerIndex;
    if (isCorrect) {
      setCorrectAnswersCount((prev) => prev + 1);
    }
    
    setIsQuestionSubmitted(true);
  };

  // Move to next question or complete quiz
  const handleNextQuestion = () => {
    if (currentQuestionIndex < activeModule.quiz.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
      setIsQuestionSubmitted(false);
    } else {
      // Calculate final quiz score
      const quizLength = activeModule.quiz.length;
      const passRatio = correctAnswersCount / quizLength;
      const passed = passRatio >= 0.7; // 70% required

      const xpFromQuestions = correctAnswersCount * 10;
      const completionXp = passed ? activeModule.xpValue : 0;
      const totalXpEarned = xpFromQuestions + completionXp;

      setQuizXPAccumulated(totalXpEarned);
      handleAwardXP(totalXpEarned);

      // Save module completion states
      if (passed) {
        let updatedCompletedModules = [...user.completedModules];
        if (!updatedCompletedModules.includes(activeModuleId)) {
          updatedCompletedModules.push(activeModuleId);
        }

        // Check if entire track completed to unlock badge
        const allTrackModules = activeTrack.modules.map((m) => m.id);
        const hasCompletedAll = allTrackModules.every((mid) => updatedCompletedModules.includes(mid));
        
        let updatedCompletedTracks = [...user.completedTracks];
        if (hasCompletedAll && !updatedCompletedTracks.includes(activeTrackId)) {
          updatedCompletedTracks.push(activeTrackId);
        }

        setUser((prev) => ({
          ...prev,
          completedModules: updatedCompletedModules,
          completedTracks: updatedCompletedTracks
        }));
      }

      setFlowState("quiz-result");
      setLeaderboardRefreshCode((prev) => prev + 1); // trigger leaderboard update!
    }
  };

  // Action: Receive badge mint receipt
  const handleMintSuccess = (trackId: string, mintData: MintResult) => {
    const updatedMinted = [...user.mintedBadges];
    if (!updatedMinted.some((b) => b.trackId === trackId)) {
      updatedMinted.push({
        trackId: trackId,
        tokenId: mintData.objectId.slice(0, 10),
        txHash: mintData.txHash,
        mintedAt: mintData.timestamp
      });
    }

    setUser((prev) => ({
      ...prev,
      mintedBadges: updatedMinted
    }));
    setLeaderboardRefreshCode((prev) => prev + 1);
  };



  // Action: Take daily streak reward (+25 XP)
  const handleClaimStreakBonus = () => {
    if (claimedStreakBonus) return;
    setClaimedStreakBonus(true);
    handleAwardXP(25);
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "Intermediate": return "text-yellow-700 bg-yellow-100 border-2 border-yellow-600";
      case "Advanced": return "text-purple-700 bg-[#E8E1D9] border-2 border-[#6D5D6E]";
      default: return "text-emerald-700 bg-emerald-100 border-2 border-emerald-600";
    }
  };

  if (appLoading) {
    return (
      <div className="min-h-screen bg-[#F9F6F0] text-[#3c3c3c] flex flex-col items-center justify-center p-6 selection:bg-[#D67B52] selection:text-white">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg bg-white border-4 border-[#3c3c3c] rounded-3xl p-6 md:p-8 shadow-[8px_8px_0px_0px_#3c3c3c] relative overflow-hidden text-center"
        >
          {/* Top retro stripe decor */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-[#D67B52]"></div>
          
          {/* Game controller logo */}
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0], y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-16 h-16 bg-amber-100 text-[#D67B52] border-3 border-[#3c3c3c] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[3px_3px_0px_0px_#3c3c3c] cursor-pointer"
          >
            <Gamepad size={32} className="text-[#D67B52]" />
          </motion.div>

          <h3 className="text-2xl font-serif font-bold text-[#3c3c3c] uppercase tracking-normal mb-1">
            Loading Sui Academy...
          </h3>
          <p className="text-xs font-mono text-[#D67B52] font-semibold tracking-wider uppercase mb-6 flex items-center justify-center gap-1.5">
            <span className="animate-ping w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Est. sub-second connection setup</span>
          </p>

          {/* Glowing Virtual Monitor Display Area */}
          <div className="bg-stone-900 border-3 border-[#3c3c3c] rounded-2xl p-4 mb-6 font-mono text-left relative overflow-hidden shadow-inner">
            {/* Scanlines layer */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(255,0,0,0.06),_rgba(0,255,0,0.02),_rgba(0,0,255,0.06))] bg-[size:100%_4px,_6px_100%]"></div>
            
            <div className="flex justify-between text-stone-500 text-[10px] uppercase font-bold tracking-wider mb-2 border-b border-stone-800 pb-1.5">
              <span>🖥️ CONSOLE LOG</span>
              <span className="text-emerald-500 animate-pulse">{loadingPercent}% COMPLETED</span>
            </div>

            <div className="space-y-1.5 text-[11px] leading-relaxed select-none">
              <div className="text-stone-400 font-bold flex gap-2">
                <span className="text-amber-400">&gt;</span> 
                <span>{loadingStatus}</span>
              </div>
              
              <div className="text-stone-600 flex gap-2 text-[9px]">
                <span>SYSTEM MODE:</span>
                <span className="text-[#89A8B2]">DEVELOPMENT CLIENT SANDBOX</span>
              </div>
              <div className="text-stone-600 flex gap-2 text-[9px]">
                <span>LATENCY STATS:</span>
                <span className="text-emerald-600">300ms MYSTICETI INSTANT ENGINE DISPATCH</span>
              </div>
            </div>
          </div>

          {/* Retro Progress Bar Container */}
          <div className="relative">
            <div className="w-full bg-[#E8E1D9] border-3 border-[#3c3c3c] h-7 rounded-2xl overflow-hidden p-[3px]">
              <div 
                className="bg-gradient-to-r from-[#89A8B2] to-[#D67B52] h-full rounded-xl border border-[#3c3c3c]/30 transition-all duration-100"
                style={{ width: `${loadingPercent}%` }}
              ></div>
            </div>
            {/* Floating indicator */}
            <span className="absolute right-3 -top-7 text-xs font-mono font-bold text-[#3c3c3c]">
              {loadingPercent}%
            </span>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 bg-[#89A8B2]/10 border-2 border-[#3c3c3c]/30 px-3 py-2 rounded-xl text-stone-600 font-medium text-xs font-serif">
            <span>💡 <strong>Study Tip:</strong> SUI utilizes secure, object-centric Move language paradigms, preventing dangerous re-entrancy attacks!</span>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!appLaunched) {
    return (
      <LandingPage 
        onLaunch={handleLaunchApp} 
        userXP={user.xp} 
        isDarkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
        isWalletConnected={!!currentAccount}
      />
    );
  }

  // Restrict app workspace usage completely if the wallet is disconnected
  if (appLaunched && !currentAccount) {
    return (
      <div className="min-h-screen bg-[#F9F6F0] flex flex-col items-center justify-center p-6 selection:bg-[#D67B52] selection:text-white relative">
        <Background />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white border-4 border-[#3c3c3c] rounded-3xl p-8 shadow-[6px_6px_0px_0px_#3c3c3c] text-center flex flex-col items-center gap-5 relative z-10"
        >
          <div className="w-16 h-16 bg-red-100 border-2 border-[#3c3c3c] rounded-2xl flex items-center justify-center text-[#D67B52] animate-bounce shadow-[2px_2px_0px_0px_#3c3c3c]">
            <Lock size={28} />
          </div>
          <h2 className="text-2xl font-bold font-serif text-[#3c3c3c]">Sui Wallet Disconnected</h2>
          <p className="text-xs text-[#6D5D6E] font-medium leading-relaxed font-sans">
            Your Sui Wallet address was disconnected. To continue using the academy questroom, you must keep an active wallet connected.
          </p>
          <div className="p-1 scale-105 rounded-xl bg-white border-2 border-[#3c3c3c] mt-2 shadow-[2px_2px_0px_0px_#3c3c3c] font-mono">
            <ConnectButton connectText="Reconnect SUI Wallet" />
          </div>
          <button 
            onClick={handleReturnToLanding}
            className="text-stone-500 font-mono text-xs hover:text-[#D67B52] underline cursor-pointer mt-4"
          >
            &larr; Return to Guided Introduction
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      id="lofi-quest-app"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-[#F9F6F0] text-[#3c3c3c] flex flex-col font-sans selection:bg-[#D67B52] selection:text-white relative"
    >
      <Background />
      
      {/* 1. TOP HEADER & HUD STATUS */}
      <header className="border-b-4 border-[#3c3c3c] bg-[#F3EFEA] sticky top-0 z-40 px-6 py-4 shadow-[0px_4px_0px_0px_#3c3c3c]/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo Branding */}
          <div 
            onClick={handleReturnToLanding}
            className="flex items-center gap-3 cursor-pointer hover:opacity-90 active:translate-y-[0.5px] transition-all select-none group"
            title="Return to Guided Introduction"
          >
            <Compass size={24} className="text-[#D67B52] group-hover:rotate-12 transition-transform" />
            <div>
              <h1 className="text-xl font-bold font-serif tracking-tight text-[#3c3c3c] flex items-center gap-1.5 matches-title">
                Lofi Quest: Sui Academy
              </h1>
              <span className="text-[10px] font-mono uppercase bg-[#89A8B2]/20 text-[#89A8B2] px-2 py-0.5 rounded border-2 border-[#3c3c3c] tracking-widest block mt-0.5 font-bold group-hover:bg-[#89A8B2]/30 transition-colors">
                CLAY Hackathon MVP
              </span>
            </div>
          </div>
 
          {/* Real-time Developer HUD Score bar */}
          <div className="flex items-center gap-4 flex-wrap select-none">
            {/* XP and Level Indicators */}
            <div id="hud-stats" className="flex items-center gap-2 bg-white border-2 border-[#3c3c3c] px-3.5 py-1.5 rounded-2xl shadow-[2px_2px_0px_0px_#3c3c3c] font-mono text-xs">
              <div className="flex items-center gap-1.5 font-bold">
                <User size={13} className="text-[#89A8B2]" />
                <span className="text-[#3c3c3c]">{user.username}</span>
              </div>
              <div className="h-4 w-px bg-[#3c3c3c]/30 mx-1"></div>
              <div>
                <span className="text-[#6D5D6E] font-bold">XP:</span>{" "}
                <strong className="text-[#D67B52] font-extrabold">{user.xp}</strong>
              </div>
              <div className="h-4 w-px bg-[#3c3c3c]/30 mx-1"></div>
              <div>
                <span className="text-[#6D5D6E] font-bold">Lvl:</span>{" "}
                <strong className="text-[#89A8B2] font-extrabold">{user.level}</strong>
              </div>
            </div>

            {/* Daily Streak Indicator */}
            <div className="flex items-center gap-2 bg-white border-2 border-[#3c3c3c] px-3.5 py-1.5 rounded-2xl shadow-[2px_2px_0px_0px_#3c3c3c] font-mono text-xs">
              <Flame size={14} className="text-orange-500 animate-pulse fill-orange-500" />
              <span className="text-[#6D5D6E] font-bold">Streak:</span>
              <strong className="text-orange-500 font-extrabold">{user.streak} Day</strong>
              
              {!claimedStreakBonus ? (
                <button
                  onClick={handleClaimStreakBonus}
                  id="btn-claim-streak"
                  className="ml-2 px-2 py-0.5 bg-[#D67B52] hover:bg-[#D67B52]/90 text-white font-mono font-bold border border-[#3c3c3c] rounded hover:shadow-[1px_1px_0px_0px_#3c3c3c] text-[10px] uppercase cursor-pointer"
                >
                  +25 Bonus
                </button>
              ) : (
                <span className="ml-2 text-[10px] text-green-600 uppercase font-sans font-bold">Claimed ✓</span>
              )}
            </div>

            {/* Wallet Quick Status indicator */}
            <div className="text-xs font-mono flex items-center gap-2">
              <ConnectButton connectText="Connect Wallet" />
              
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="px-3 py-1.5 bg-white border-2 border-[#3c3c3c] rounded-2xl shadow-[2px_2px_0px_0px_#3c3c3c] font-mono text-xs font-bold text-[#3c3c3c] hover:scale-102 transition-all cursor-pointer flex items-center gap-1.5 active:translate-y-[1px]"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                <span>{darkMode ? "🌙" : "☀️"}</span>
                <span className="hidden sm:inline">{darkMode ? "Dark" : "Light"}</span>
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* 2. SUB-NAV NAVIGATION TABS PANEL */}
      <nav id="app-tabs-navigation" className="bg-white border-b-2 border-[#3c3c3c] py-2.5 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-start gap-2 overflow-x-auto text-[13px] font-mono">
          <button
            onClick={handleReturnToLanding}
            className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap border-2 font-bold text-[#D67B52] border-dashed border-[#D67B52]/60 hover:border-[#D67B52] hover:bg-[#D67B52]/5"
            title="Read blockchain mechanics & about pages again"
          >
            <Sparkles size={14} className="animate-pulse" />
            <span>Introduction Guide 📖</span>
          </button>

          {[
            { id: "dashboard", label: "Dashboard Quest Room", icon: Compass },
            { id: "simulator", label: "DeFi Swap/Lend Box", icon: TrendingUp },
            { id: "leaderboard", label: "CLAY Leaderboard", icon: Trophy },
            { id: "profile", label: "Sui Kiosk Profile", icon: User }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap border-2 font-bold ${
                  isActive 
                    ? "bg-[#F3EFEA] text-[#D67B52] border-[#3c3c3c] shadow-[2px_2px_0px_0px_#3c3c3c]" 
                    : "text-[#6D5D6E] border-transparent hover:border-[#3c3c3c]/40 hover:bg-[#f8f5f2] hover:text-[#3c3c3c]"
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* 3. CORE CHILL AMBIENT STUDY JAMS DECK BAR */}
      <div className="bg-[#F3EFEA] border-b-2 border-[#3c3c3c] px-6 py-3">
        <div className="max-w-7xl mx-auto">
          <AudioPlayerWidget />
        </div>
      </div>

      {/* 4. MASTER CONTENT SCREEN DISPLAY ROUTING */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.22 }}
            className="w-full"
          >
            {/* =============== DASHBOARD TAB AREA =============== */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            
            {/* Tracks visual cards list overview */}
            {flowState === "syllabus" && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {tracks.map((track) => {
                  const isTrackCompleted = user.completedTracks.includes(track.id);
                  const isTrackMinted = user.mintedBadges.some((b) => b.trackId === track.id);
                  const activeClass = activeTrackId === track.id 
                    ? "border-[#D67B52] bg-[#fdfaf7] shadow-[4px_4px_0px_0px_#D67B52]" 
                    : "border-[#3c3c3c] bg-white hover:bg-[#F3EFEA]/20 shadow-[4px_4px_0px_0px_#3c3c3c]";

                  return (
                    <div
                      key={track.id}
                      onClick={() => handleSelectTrack(track.id)}
                      className={`p-4 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between ${activeClass} hover:translate-y-[-1px]`}
                    >
                      <div>
                        {/* Upper row tags */}
                        <div className="flex justify-between items-center mb-2 font-mono">
                          <span className={`text-[9px] px-2 py-0.5 rounded-full uppercase font-bold ${getDifficultyColor(track.difficulty)}`}>
                            {track.difficulty}
                          </span>
                          
                          {isTrackMinted ? (
                            <span className="text-[9px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full border-2 border-emerald-600 uppercase font-extrabold">
                              ✓ MINTED
                            </span>
                          ) : isTrackCompleted ? (
                            <span className="text-[9px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full border-2 border-amber-600 uppercase font-extrabold animate-pulse">
                              EARNED
                            </span>
                          ) : null}
                        </div>

                        <h3 className="font-bold text-sm tracking-tight text-[#3c3c3c]">{track.title}</h3>
                        <p className="text-xs text-[#6D5D6E] mt-1 lines-clamp-2 leading-relaxed h-11 overflow-hidden font-medium">
                          {track.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#3c3c3c]/10 flex justify-between items-center font-mono text-[10px]">
                        <span className="text-[#6D5D6E] font-bold">{track.modules.length} modules</span>
                        <span className="text-[#89A8B2] flex items-center gap-0.5 font-extrabold">
                          Select <ChevronRight size={10} className="mt-0.5" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Learning module steps classroom workspace */}
            {flowState === "syllabus" && (
              <div className="bg-white border-2 border-[#3c3c3c] rounded-3xl p-6 shadow-[4px_4px_0px_0px_#3c3c3c]">
                <div className="flex items-center justify-between border-b-2 border-dashed border-[#3c3c3c]/20 pb-3 mb-5">
                  <div>
                    <span className="text-xs font-mono text-[#D67B52] tracking-wider font-extrabold">Active Curriculum Syllabus:</span>
                    <h2 className="text-lg font-bold text-[#3c3c3c] font-serif mt-1">{activeTrack.title} Development</h2>
                  </div>
                  <span className="text-xs text-[#6D5D6E] font-mono hidden md:inline font-semibold">Pass assessments with 70%+ score to earn badge.</span>
                </div>

                <div className="space-y-4">
                  {activeTrack.modules.map((mod, index) => {
                    const isCompleted = user.completedModules.includes(mod.id);
                    return (
                      <div
                        key={mod.id}
                        className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-[#F3EFEA] hover:bg-white rounded-2xl border-2 border-[#3c3c3c] gap-4 transition-all shadow-[2px_2px_0px_0px_#3c3c3c]/15 hover:shadow-[3px_3px_0px_0px_#3c3c3c]"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-lg bg-white p-2 rounded-xl border-2 border-[#3c3c3c] shrink-0 font-bold shadow-[1px_1px_0px_0px_#3c3c3c]">
                            {isCompleted ? "🤩" : index === 0 ? "🔥" : "🔒"}
                          </span>
                          <div>
                            <h4 className="font-bold text-[#3c3c3c] text-sm flex items-center gap-2">
                              <span>Module {index + 1}: {mod.title}</span>
                              {isCompleted && (
                                <span className="text-[10px] bg-emerald-100 text-emerald-700 font-mono px-2 py-0.2 rounded border-2 border-emerald-600 uppercase font-bold">
                                  Done
                                </span>
                              )}
                            </h4>
                            <p className="text-xs text-[#6D5D6E] mt-1 font-medium">{mod.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto font-mono text-xs">
                          <div className="text-right">
                            <span className="text-[#D67B52] font-extrabold block">{mod.steps.length * 10 + mod.xpValue} XP</span>
                            <span className="text-[10px] text-[#6D5D6E] block font-bold">Assessment include</span>
                          </div>

                          <button
                            onClick={() => handleStartModule(mod)}
                            className="px-5 py-2 bg-[#89A8B2] hover:bg-[#89A8B2]/90 text-white border-2 border-[#3c3c3c] font-bold rounded-xl text-xs hover:scale-102 flex items-center gap-1.5 transition-all shadow-[2px_2px_0px_0px_#3c3c3c] cursor-pointer active:translate-y-[1px]"
                          >
                            <span>{isCompleted ? "Review Module ☕" : "Start Quest &rarr;"}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CLASSROOM LESSON BOARD STATE */}
            {flowState === "classroom" && (
              <div className="space-y-6">
                {/* Visual title guide header */}
                <div className="flex items-center justify-between bg-[#F3EFEA] p-4 rounded-2xl border-2 border-[#3c3c3c] shadow-[2px_2px_0px_0px_#3c3c3c] font-mono text-xs text-[#3c3c3c]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#D67B52] animate-spin">☕</span>
                    <span className="text-[#6D5D6E] font-bold">Track: <strong className="text-[#3c3c3c] font-extrabold">{activeTrack.title}</strong></span>
                    <span className="text-[#3c3c3c]/40 font-bold">/</span>
                    <span className="text-[#6D5D6E] font-bold">Class: <strong className="text-[#3c3c3c] font-extrabold">{activeModule.title}</strong></span>
                  </div>

                  <button
                    onClick={() => setFlowState("syllabus")}
                    className="text-[11px] text-[#D67B52] hover:underline font-bold"
                  >
                    &larr; Exit to Course Syllabus
                  </button>
                </div>

                {/* Chalkboard Render */}
                <YetiChalkboard
                  step={activeModule.steps[activeStepIndex]}
                  stepIndex={activeStepIndex}
                  totalSteps={activeModule.steps.length}
                  onNext={handleNextStep}
                  onPrev={handlePrevStep}
                  yetiStudyAsset={YETI_STUDY_ASSET}
                />
              </div>
            )}

            {/* ASSESSMENT QUIZ STATE */}
            {flowState === "quiz" && (
              <div className="max-w-2xl mx-auto bg-white border-4 border-[#3c3c3c] rounded-3xl p-6 shadow-[6px_6px_0px_0px_#3c3c3c] relative select-none text-[#3c3c3c]">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#3c3c3c] text-white px-4 py-0.5 rounded-full font-mono text-[10px] uppercase font-bold border-2 border-[#3c3c3c]">
                  QUIZ ASSESSMENT CENTER
                </div>

                <div className="flex items-center justify-between border-b-2 border-dashed border-[#3c3c3c]/20 pb-3 mb-4 font-mono text-xs text-[#6D5D6E]">
                  <span>Module: <strong className="text-[#D67B52] font-bold">{activeModule.title}</strong></span>
                  <span className="text-[#89A8B2] font-extrabold">Question {currentQuestionIndex + 1} of {activeModule.quiz.length}</span>
                </div>

                {/* Question */}
                <div className="space-y-5">
                  <h3 className="text-base font-bold text-[#3c3c3c] font-sans tracking-wide leading-relaxed">
                    🌟 {activeModule.quiz[currentQuestionIndex].question}
                  </h3>

                  {/* Options List */}
                  <div className="space-y-2.5">
                    {activeModule.quiz[currentQuestionIndex].options.map((option, oIdx) => {
                      const isSelected = selectedOptionIndex === oIdx;
                      const isCorrect = oIdx === activeModule.quiz[currentQuestionIndex].correctAnswerIndex;
                      
                      let optionStyle = "border-2 border-[#3c3c3c] bg-white text-[#3c3c3c] hover:bg-[#F3EFEA] shadow-[2px_2px_0px_0px_#3c3c3c]";
                      if (isQuestionSubmitted) {
                        if (isCorrect) {
                          optionStyle = "border-2 border-emerald-600 bg-emerald-50 text-emerald-700 shadow-[2px_2px_0px_0px_#10b981]";
                        } else if (isSelected) {
                          optionStyle = "border-2 border-rose-600 bg-rose-50 text-rose-700 shadow-[2px_2px_0px_0px_#f43f5e]";
                        } else {
                          optionStyle = "border-[#3c3c3c]/20 bg-gray-50 text-gray-400 opacity-60 shadow-none";
                        }
                      } else if (isSelected) {
                        optionStyle = "border-2 border-[#D67B52] bg-[#fdfaf7] text-[#D67B52] shadow-[2px_2px_0px_0px_#D67B52] font-semibold";
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isQuestionSubmitted}
                          onClick={() => setSelectedOptionIndex(oIdx)}
                          className={`w-full text-left p-3.5 rounded-xl text-[12px] font-mono transition-all flex items-start gap-2 cursor-pointer ${optionStyle}`}
                        >
                          <span className="font-bold uppercase text-[10px] bg-[#3c3c3c] px-1.5 py-0.5 rounded text-white shrink-0 mt-0.5">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span>{option}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Immediate Answer feedback and walkthrough explanation */}
                  {isQuestionSubmitted && (
                    <div className="p-4 bg-[#F3EFEA] border-2 border-[#3c3c3c] rounded-2xl space-y-2 font-mono text-[11px] leading-relaxed shadow-[2px_2px_0px_0px_#3c3c3c]">
                      <div className={`font-bold uppercase flex items-center gap-1 ${
                        selectedOptionIndex === activeModule.quiz[currentQuestionIndex].correctAnswerIndex 
                          ? "text-emerald-700" 
                          : "text-rose-700"
                      }`}>
                        {selectedOptionIndex === activeModule.quiz[currentQuestionIndex].correctAnswerIndex ? (
                          <>
                            <CheckCircle size={14} />
                            <span>Correct answer! Yeti is dancing!</span>
                          </>
                        ) : (
                          <>
                            <CircleAlert size={14} />
                            <span>Incorrect option selected...</span>
                          </>
                        )}
                      </div>
                      <p className="text-[#6D5D6E] font-medium font-sans">
                        {activeModule.quiz[currentQuestionIndex].explanation}
                      </p>
                    </div>
                  )}

                  {/* Answer Navigation Action Button */}
                  <div className="pt-3 border-t-2 border-dashed border-[#3c3c3c]/20 flex justify-end">
                    {!isQuestionSubmitted ? (
                      <button
                        onClick={handleSubmitAnswer}
                        disabled={selectedOptionIndex === null}
                        className="px-6 py-2 bg-[#D67B52] hover:bg-[#D67B52]/90 disabled:opacity-40 text-white border-2 border-[#3c3c3c] font-bold rounded-xl text-xs font-mono cursor-pointer transition-all shadow-[2px_2px_0px_0px_#3c3c3c]"
                      >
                        Submit Answer &rarr;
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuestion}
                        className="px-6 py-2 bg-[#89A8B2] hover:bg-[#89A8B2]/90 text-white border-2 border-[#3c3c3c] font-bold rounded-xl text-xs font-mono cursor-pointer transition-all shadow-[2px_2px_0px_0px_#3c3c3c] flex items-center gap-1"
                      >
                        <span>{currentQuestionIndex === activeModule.quiz.length - 1 ? "Get Results 🏆" : "Next Question &rarr;"}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* QUIZ COMPLETION RESULT SCREEN */}
            {flowState === "quiz-result" && (
              <div className="max-w-md mx-auto bg-white border-4 border-[#3c3c3c] rounded-3xl p-6 shadow-[6px_6px_0px_0px_#3c3c3c] relative text-center text-[#3c3c3c]">
                <span className="text-4xl block mb-3">🏔️</span>
                
                {correctAnswersCount / activeModule.quiz.length >= 0.7 ? (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold font-serif text-[#10b981]">
                      ★ MODULE QUEST CONQUERED! ★
                    </h2>
                    <p className="text-xs text-[#6D5D6E] max-w-sm mx-auto font-mono font-medium">
                      congratulations explorer! you passed with a score of <strong className="text-[#3c3c3c]">{correctAnswersCount}/{activeModule.quiz.length}</strong> ({Math.round((correctAnswersCount / activeModule.quiz.length) * 100)}%). yeti is very proud of your progress under the snow!
                    </p>

                    <div className="bg-[#F3EFEA] p-3 rounded-2xl border-2 border-[#3c3c3c] text-xs font-mono shadow-[2px_2px_0px_0px_#3c3c3c]">
                      <span className="text-[#6D5D6E] font-bold block">Total Reward Granted:</span>
                      <strong className="text-[#D67B52] text-base font-extrabold">{quizXPAccumulated} XP Points</strong>
                    </div>

                    {user.completedTracks.includes(activeTrackId) && (
                      <div className="p-3 bg-purple-50 border-2 border-purple-300 rounded-2xl text-xs text-purple-900 shadow-[2px_2px_0px_0px_#3c3c3c] font-semibold">
                        <div className="font-bold text-purple-700 flex items-center justify-center gap-1 font-mono uppercase text-[10px] tracking-wider mb-1">
                          <Award size={12} /> Special Unlock! Sui Kiosk NFT badge ready
                        </div>
                        <p className="text-[11px] text-[#6D5D6E] mb-2 leading-relaxed">
                          you have successfully finished all curriculum steps under {activeTrack.title}! visit your Sui profile below to mint onto Kiosk.
                        </p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={() => setActiveTab("profile")}
                        className="flex-1 py-2.5 bg-[#D67B52] hover:bg-[#D67B52]/90 text-white border-2 border-[#3c3c3c] font-bold rounded-xl text-xs font-mono shadow-[2px_2px_0px_0px_#3c3c3c] transition-all cursor-pointer active:translate-y-[1px]"
                      >
                        Go to Profile Kiosk NFT &rarr;
                      </button>
                      <button
                        onClick={() => setFlowState("syllabus")}
                        className="flex-1 py-2.5 bg-[#F3EFEA] hover:bg-[#F3EFEA]/85 border-2 border-[#3c3c3c] text-[#3c3c3c] font-bold rounded-xl text-xs font-mono shadow-[2px_2px_0px_0px_#3c3c3c] transition-all cursor-pointer active:translate-y-[1px]"
                      >
                        Keep Learning
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h2 className="text-lg font-bold text-rose-600 font-serif">
                      ❄️ Yeti's Chalet: Study Session Needed
                    </h2>
                    <p className="text-xs text-[#6D5D6E] font-mono leading-normal font-medium">
                      your score of <strong className="text-[#3c3c3c]">{correctAnswersCount}/{activeModule.quiz.length}</strong> ({Math.round((correctAnswersCount / activeModule.quiz.length) * 100)}%) is slightly below the 70% threshold required to complete this module. 
                    </p>
                    <p className="text-xs text-[#D67B52] font-mono italic font-semibold">
                      "don't worry, my code-crafting friend! take a sip of coffee, ask yeti tutor a question using the chat trigger in the corner, and let's try reading the chalkboard again..."
                    </p>

                    <div className="flex bg-[#F3EFEA] border-2 border-[#3c3c3c] p-2 rounded-xl text-xs font-mono justify-between text-[#6D5D6E] font-bold shadow-[1px_1px_0px_0px_#3c3c3c]">
                      <span>XP Earned (Correct Questions):</span>
                      <strong className="text-[#D67B52] font-extrabold">+{correctAnswersCount * 10} XP</strong>
                    </div>

                    <button
                      onClick={() => handleStartModule(activeModule)}
                      className="w-full py-2.5 bg-[#89A8B2] hover:bg-[#89A8B2]/90 text-white border-2 border-[#3c3c3c] font-bold rounded-xl text-xs font-mono shadow-[2px_2px_0px_0px_#3c3c3c] cursor-pointer transition-all active:translate-y-[1px]"
                    >
                      Re-read Chalkboard & Retry
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Live custom project overview cards as bottom widget row */}
            {flowState === "syllabus" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border-2 border-[#3c3c3c] p-5 rounded-3xl shadow-[4px_4px_0px_0px_#3c3c3c] flex items-start gap-3 text-[#3c3c3c]">
                  <div className="p-2 bg-amber-100 text-[#D67B52] border-2 border-[#3c3c3c] rounded-xl shadow-[1px_1px_0px_0px_#3c3c3c]">
                    <Coffee size={18} />
                  </div>
                  <div className="text-xs font-sans">
                    <h4 className="font-bold text-[#3c3c3c] font-serif">The Lofi Yeti Paradigm</h4>
                    <p className="text-[#6D5D6E] mt-1 leading-relaxed font-semibold">
                      Lofi Quest combines the high speed parallel execution of Sui with the relaxing workspace style of lofitheyeti.com. Learn complex Move semantics easily while listening to cozy procedurally synched chord progressions.
                    </p>
                  </div>
                </div>

                <div className="bg-white border-2 border-[#3c3c3c] p-5 rounded-3xl shadow-[4px_4px_0px_0px_#3c3c3c] flex items-start gap-3 text-[#3c3c3c]">
                  <div className="p-2 bg-blue-100 text-[#89A8B2] border-2 border-[#3c3c3c] rounded-xl shadow-[1px_1px_0px_0px_#3c3c3c]">
                    <Lightbulb size={18} />
                  </div>
                  <div className="text-xs font-sans">
                    <h4 className="font-bold text-[#3c3c3c] font-serif">Did you know? SUI Epochs</h4>
                    <p className="text-[#6D5D6E] mt-1 leading-relaxed font-semibold">
                      Sui validators run epochs that shift every 24 hours. At each epoch change, gas baseline target values are adjusted, staking nodes compile performance metrics, and pending rewards are distributed to the stakeholders!
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* =============== DEFI SIMULATOR TAB AREA =============== */}
        {activeTab === "simulator" && (
          <DeFiSimulator
            onEarnXP={handleAwardXP}
            walletConnected={!!user.walletAddress}
          />
        )}

        {/* =============== LEADERBOARD TAB AREA =============== */}
        {activeTab === "leaderboard" && (
          <LeaderboardWidget
            userWallet={user.walletAddress}
            userXP={user.xp}
            userLevel={user.level}
            userBadges={user.mintedBadges.map((b) => b.trackId)}
            username={user.username}
            avatar={user.avatar}
            refreshTrigger={leaderboardRefreshCode}
          />
        )}

        {/* =============== PROFILE INVENTORY MINT TAB AREA =============== */}
        {activeTab === "profile" && (
          <ProfileWidget
            user={user}
            onChangeUser={(updates) => setUser((p) => ({ ...p, ...updates }))}
            completedTracks={user.completedTracks}
            onMintSuccess={handleMintSuccess}
          />
        )}


          </motion.div>
        </AnimatePresence>

      </main>

      {/* Floating Yeti AI tutor (enabled across all interfaces!) */}
      <TutorFloatingWidget
        currentTrack={activeTrack?.title}
        currentLesson={activeModule?.title}
      />

      {/* Footer copyright */}
      <footer className="border-t-4 border-[#3c3c3c] bg-[#F3EFEA] p-4 text-center text-[10px] text-[#6D5D6E] font-mono">
        <p className="flex items-center justify-center gap-1 select-none font-bold">
          <span>🏔️</span>
          <span>© 2026 Lofi Quest SUI Academy. Built for CLAY Hackathon. All rights preserved.</span>
        </p>
      </footer>

    </motion.div>
  );
}
