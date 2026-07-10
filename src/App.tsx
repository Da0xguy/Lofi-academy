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
import CustomCursor from "./components/CustomCursor";
import { motion, AnimatePresence } from "motion/react";
import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { getFirebaseUserProfile, saveFirebaseUserProfile } from "./lib/firestoreUtils";
import confetti from "canvas-confetti";

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
  ExternalLink,
  Menu,
  X,
  Tv,
  BookOpen,
  Twitter
} from "lucide-react";

import { SuiArticlesWidget } from "./components/SuiArticlesWidget";

// Helper to retrieve educational YouTube video tutorials for modules
const getModuleVideo = (module: TrackModule) => {
  if (module.videoUrl && module.videoTitle) {
    return { url: module.videoUrl, title: module.videoTitle };
  }
  
  const lookups: Record<string, { url: string; title: string }> = {
    "basics-intro": { url: "https://www.youtube.com/watch?v=D-Z9L1jL_tM", title: "Sui Explained: Core Architecture & Design Innovations" },
    "basics-move": { url: "https://www.youtube.com/watch?v=3HuxrYlK5Yg", title: "Move Language Essentials: Asset & Ownership Safety on Sui" },
    "basics-staking": { url: "https://www.youtube.com/watch?v=bC6_JcllSxk", title: "How to Stake SUI Coins & Earn Passive Rewards on Testnet" },
    "basics-parallel": { url: "https://www.youtube.com/watch?v=8Vco7C_Cpxo", title: "Deep Dive into Sui’s Parallel Transaction Execution Engine" },
    "basics-objects-explained": { url: "https://www.youtube.com/watch?v=mE6_3d2mK9o", title: "Sui's Object Model: Under the Hood of Pure Asset-Oriented Storage" },
    "basics-gas-fees": { url: "https://www.youtube.com/watch?v=mE6_3d2mK9o", title: "Sui Gas Pricing Model & Storage Fund Economics Tutorial" },
    "defi-swaps": { url: "https://www.youtube.com/watch?v=07-u06zX9vM", title: "Sui DeFi Spring: Automated Market Makers & Swap Protocol Mechanics" },
    "defi-lending": { url: "https://www.youtube.com/watch?v=D-Z9L1jL_tM", title: "Web3 Lending & Borrowing Pools: Decoupling Smart Collateral" },
    "defi-liquid-staking": { url: "https://www.youtube.com/watch?v=07-u06zX9vM", title: "Liquid Staking on Sui: Conversion, Yields & LST Implementations" },
    "defi-derivatives": { url: "https://www.youtube.com/watch?v=07-u06zX9vM", title: "On-Chain Perpetual Swaps & Derivative Order Books" },
    "defi-aggregators": { url: "https://www.youtube.com/watch?v=07-u06zX9vM", title: "DEX Routing Aggregators: Boosting capital efficiency on Sui" },
    "defi-oracles": { url: "https://www.youtube.com/watch?v=mE6_3d2mK9o", title: "Integrating Pyth & Stork Decentralized Oracles on Sui" },
    "protocols-deepbook": { url: "https://www.youtube.com/watch?v=8Vco7C_Cpxo", title: "DeepBook v3 Architecture: Fully On-Chain Shared Order Book" },
    "protocols-kiosk": { url: "https://www.youtube.com/watch?v=NnshbYV0Hno", title: "Sui Kiosk: Enforcing Royalties and Advanced Secure NFT Protections" },
    "protocols-zklogin": { url: "https://www.youtube.com/watch?v=mE6_3d2mK9o", title: "Sui zkLogin In-Depth Tutorial: Sign in via Google & Web2 APIs" },
    "protocols-ptb": { url: "https://www.youtube.com/watch?v=8Vco7C_Cpxo", title: "Mastering Sui Programmable Transaction Blocks (PTB) for Batch Operations" },
    "protocols-multisig": { url: "https://www.youtube.com/watch?v=8Vco7C_Cpxo", title: "Implementing High-Security Multi-Signature Wallets on Sui" },
    "history-mysten": { url: "https://www.youtube.com/watch?v=D-Z9L1jL_tM", title: "Mysten Labs: The Pioneers & Engineers Behind Sui" },
    "history-founders": { url: "https://www.youtube.com/watch?v=D-Z9L1jL_tM", title: "Sui Founders Interview: Redefining Web3 Consensus Foundations" },
    "history-ecosystem-impact": { url: "https://www.youtube.com/watch?v=b-7I1uUvY7k", title: "Sui Ecosystem Review, Global Hacker houses, & Developer Inflow" },
    "move-basics": { url: "https://www.youtube.com/watch?v=3HuxrYlK5Yg", title: "Your First Move Contract: Structs, Capabilities, and Entry Modules" },
    "move-functions": { url: "https://www.youtube.com/watch?v=3HuxrYlK5Yg", title: "Writing Purposive Move Functions, Parameters, & Return Signatures" },
    "move-objects-creation": { url: "https://www.youtube.com/watch?v=3HuxrYlK5Yg", title: "Object Creation and Lifecycle Management in Sui Move" },
    "move-shared-managed": { url: "https://www.youtube.com/watch?v=3HuxrYlK5Yg", title: "Owned vs. Shared Objects: Performance Trade-offs in Move" },
    "raw-rpc-queries": { url: "https://www.youtube.com/watch?v=mE6_3d2mK9o", title: "Connecting Frontends to Sui with the TypeScript SDK" },
    "event-indexers": { url: "https://www.youtube.com/watch?v=mE6_3d2mK9o", title: "Sui WebSockets and GraphQL: Building Real-time Event Monitors" },
    "gas-budget-tuning": { url: "https://www.youtube.com/watch?v=8Vco7C_Cpxo", title: "High-Efficiency Transaction Simulations and Gas Budget Calibration" },
    "move-unit-testing": { url: "https://www.youtube.com/watch?v=3HuxrYlK5Yg", title: "Unit Testing with test_scenario: Sandbox State Control in Move" },
    "move-property-fuzzing": { url: "https://www.youtube.com/watch?v=3HuxrYlK5Yg", title: "Property-Based Fuzzing & Boundary Arithmetic Validations" },
    "move-formal-specification": { url: "https://www.youtube.com/watch?v=3HuxrYlK5Yg", title: "Formal Verification using the Move Prover & Specifications" }
  };

  const lookup = lookups[module.id];
  if (lookup) {
    return lookup;
  }

  // Fallback if not matched
  return {
    url: "https://www.youtube.com/watch?v=3HuxrYlK5Yg",
    title: `Sui Move Course Series: Deep Dive on ${module.title}`
  };
};

// Pre-generated static assets mapped from tools outputs
import YETI_STUDY_ASSET from "./assets/images/yeti_study_space_1779949789879.png";
import YETI_BADGE_ASSET from "./assets/images/yeti_badge_1779633396226.png";

export default function App() {
  // 1-hour background music mix player
  const [musicMuted, setMusicMuted] = useState<boolean>(() => {
    return localStorage.getItem("sui_yeti_music_muted") === "true";
  });

  const backgroundAudioRef = React.useRef<HTMLAudioElement | null>(null);

  // Initialize and run background music autonomously when entering page
  useEffect(() => {
    const audio = new Audio("https://archive.org/download/lofi-hip-hop-radio-lofi-beats-to-study-to/Lofi%20Hip%20Hop%20Radio%20lofi%20beats%20to%20study%20to.mp3");
    audio.loop = true;
    audio.volume = 0.22; // Ambient background volume
    audio.muted = musicMuted;
    backgroundAudioRef.current = audio;

    // Try playing immediately
    if (!musicMuted) {
      audio.play().catch(() => {
        console.log("Autoplay blocked by modern browser. Standby for user engagement.");
      });
    }

    // Auto engagement handlers (triggers audio play on first touch/click in page)
    const startAudioPlay = () => {
      if (backgroundAudioRef.current && !musicMuted && backgroundAudioRef.current.paused) {
        backgroundAudioRef.current.play().catch(() => {});
      }
      document.removeEventListener("click", startAudioPlay);
      document.removeEventListener("keydown", startAudioPlay);
    };

    document.addEventListener("click", startAudioPlay);
    document.addEventListener("keydown", startAudioPlay);

    return () => {
      audio.pause();
      document.removeEventListener("click", startAudioPlay);
      document.removeEventListener("keydown", startAudioPlay);
    };
  }, []);

  // Hot sync mute trigger
  useEffect(() => {
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.muted = musicMuted;
      localStorage.setItem("sui_yeti_music_muted", musicMuted ? "true" : "false");
      if (!musicMuted && backgroundAudioRef.current.paused) {
        backgroundAudioRef.current.play().catch(() => {});
      }
    }
  }, [musicMuted]);

  const handleToggleMusicMute = () => {
    setMusicMuted(prev => !prev);
  };

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
  const [activeTab, setActiveTab] = useState<"dashboard" | "simulator" | "articles" | "leaderboard" | "profile">("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

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
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          yetiHighScore: Number(parsed.yetiHighScore ?? 0),
          yetiGamesPlayed: Number(parsed.yetiGamesPlayed ?? 0)
        };
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
      lastLoginDate: new Date().toISOString().split("T")[0],
      yetiHighScore: 0,
      yetiGamesPlayed: 0
    };
  });

  const currentAccount = useCurrentAccount();
  const [isSyncingFirebase, setIsSyncingFirebase] = useState<boolean>(false);
  const loadedFirebaseEmailRef = React.useRef<string | null>(null);

  // Load and merge user profile from Firebase Firestore when Email or SUI wallet address changes
  useEffect(() => {
    const syncEmailWithFirebase = async () => {
      // Primary synchronization key is user.email
      if (user.email) {
        const emailLower = user.email.toLowerCase();
        
        if (loadedFirebaseEmailRef.current === emailLower) {
          // If already loaded/synced this email, and a new SUI wallet is connected, link/sync it
          if (currentAccount?.address && user.walletAddress !== currentAccount.address) {
            setUser((prev) => ({
              ...prev,
              walletAddress: currentAccount.address
            }));
          }
          return;
        }
        
        setIsSyncingFirebase(true);
        try {
          const cloudProfile = await getFirebaseUserProfile(emailLower);
          
          if (cloudProfile) {
            // Merge cloud progress with local progress, taking the highest metrics
            const mergedXP = Math.max(Number(cloudProfile.xp ?? 0), user.xp);
            const mergedLevel = Math.max(Number(cloudProfile.level ?? 1), user.level);
            
            const mergedModules = Array.from(new Set([
              ...(Array.isArray(cloudProfile.completedModules) ? cloudProfile.completedModules : []),
              ...user.completedModules
            ]));
            const mergedTracks = Array.from(new Set([
              ...(Array.isArray(cloudProfile.completedTracks) ? cloudProfile.completedTracks : []),
              ...user.completedTracks
            ]));
            
            const mergedBadges = [
              ...(Array.isArray(cloudProfile.mintedBadges) ? cloudProfile.mintedBadges : [])
            ];
            user.mintedBadges.forEach((localBadge) => {
              if (!mergedBadges.some((cb) => cb.trackId === localBadge.trackId)) {
                mergedBadges.push(localBadge);
              }
            });

            // Auto-link SUI wallet if connected
            const activeWallet = cloudProfile.walletAddress || currentAccount?.address || user.walletAddress || null;

            const mergedProfile = {
              username: cloudProfile.username || user.username || "CozyExplorer",
              avatar: cloudProfile.avatar || user.avatar || "🦊",
              email: user.email,
              password: user.password,
              walletAddress: activeWallet,
              xp: mergedXP,
              level: mergedLevel,
              completedModules: mergedModules,
              completedTracks: mergedTracks,
              claimedWelcomeXP: Boolean(cloudProfile.claimedWelcomeXP || user.claimedWelcomeXP),
              mintedBadges: mergedBadges,
              streak: Math.max(Number(cloudProfile.streak ?? 1), user.streak),
              lastLoginDate: cloudProfile.lastLoginDate || user.lastLoginDate || new Date().toISOString().split("T")[0],
              yetiHighScore: Math.max(Number(cloudProfile.yetiHighScore ?? 0), user.yetiHighScore),
              yetiGamesPlayed: Math.max(Number(cloudProfile.yetiGamesPlayed ?? 0), user.yetiGamesPlayed)
            };

            setUser(mergedProfile);
            await saveFirebaseUserProfile(emailLower, mergedProfile);
          } else {
            // First time this email is used, initialize profile in cloud
            const activeWallet = currentAccount?.address || user.walletAddress || null;
            const updatedProfile = {
              ...user,
              walletAddress: activeWallet,
              claimedWelcomeXP: true
            };
            await saveFirebaseUserProfile(emailLower, updatedProfile);
            setUser(updatedProfile);
          }
          loadedFirebaseEmailRef.current = emailLower;
        } catch (error) {
          console.error("Firebase email syncing failed:", error);
        } finally {
          setIsSyncingFirebase(false);
        }
      } else {
        loadedFirebaseEmailRef.current = null;
      }
    };
    
    syncEmailWithFirebase();
  }, [user.email, currentAccount?.address]);

  // Streak bonus claim option
  const [claimedStreakBonus, setClaimedStreakBonus] = useState<boolean>(false);
  const [leaderboardRefreshCode, setLeaderboardRefreshCode] = useState<number>(0);

  // States for XP and Level up celebratory animations/popups
  const [showLevelUpOverlay, setShowLevelUpOverlay] = useState<boolean>(false);
  const [animateLevelUpHUD, setAnimateLevelUpHUD] = useState<boolean>(false);
  const [animateXPHUD, setAnimateXPHUD] = useState<boolean>(false);

  const prevLevelRef = React.useRef<number>(user.level);
  const prevXPRef = React.useRef<number>(user.xp);

  // Trigger XP indicators flash
  useEffect(() => {
    if (user.xp > prevXPRef.current) {
      setAnimateXPHUD(true);
      const timer = setTimeout(() => setAnimateXPHUD(false), 900);
      return () => clearTimeout(timer);
    }
    prevXPRef.current = user.xp;
  }, [user.xp]);

  // Trigger Level indicators flash and overlay trigger
  useEffect(() => {
    if (prevLevelRef.current !== 0 && user.level > prevLevelRef.current) {
      setAnimateLevelUpHUD(true);
      setShowLevelUpOverlay(true);
      const timer = setTimeout(() => setAnimateLevelUpHUD(false), 2400);
      return () => clearTimeout(timer);
    }
    prevLevelRef.current = user.level;
  }, [user.level]);

  // Dynamic Level evaluation checking XP progress
  useEffect(() => {
    // Level calculation formula: exponentially harder progression
    // Level 1: 0 - 149 XP
    // Level 2: 150 - 399 XP (+150 XP)
    // Level 3: 400 - 799 XP (+250 XP)
    // Level 4: 800 - 1399 XP (+400 XP)
    // Level 5: 1400+ XP (+600 XP)
    let targetLevel = 1;
    if (user.xp >= 1400) targetLevel = 5;
    else if (user.xp >= 800) targetLevel = 4;
    else if (user.xp >= 400) targetLevel = 3;
    else if (user.xp >= 150) targetLevel = 2;

    if (targetLevel !== user.level) {
      setUser((prev) => ({
        ...prev,
        level: targetLevel
      }));
    }
  }, [user.xp]);

  // Save profile coordinates onLocalStorage and Firestore
  useEffect(() => {
    localStorage.setItem("sui_yeti_user", JSON.stringify(user));
    
    // Auto-sync profile updates directly into Firestore
    if (user.email && loadedFirebaseEmailRef.current === user.email.toLowerCase()) {
      const saveToFirestore = async () => {
        try {
          await saveFirebaseUserProfile(user.email!.toLowerCase(), user);
        } catch (error) {
          console.error("Failed to sync profile update to Firebase:", error);
        }
      };
      
      const timer = setTimeout(() => {
        saveToFirestore();
      }, 500); // Debounce to combine rapid consecutive developments
      
      return () => clearTimeout(timer);
    }
  }, [user]);

  // Sync user score to the backend leaderboard on any updates to achievements
  useEffect(() => {
    const syncToLeaderboard = async () => {
      let activeWallet = user.walletAddress;
      if (!activeWallet) {
        let guestId = localStorage.getItem("sui_yeti_guest_wallet");
        if (!guestId) {
          const randomHex = Math.random().toString(16).substring(2, 10);
          guestId = `0x_guest_${randomHex}`;
          localStorage.setItem("sui_yeti_guest_wallet", guestId);
        }
        activeWallet = guestId;
      }

      let retries = 3;
      let delay = 1000;
      let lastError: any = null;

      while (retries > 0) {
        try {
          const response = await fetch("/api/sui/leaderboard", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              wallet: activeWallet,
              username: user.username,
              xp: user.xp,
              level: user.level,
              badges: user.mintedBadges.map((b) => b.trackId),
              avatar: user.avatar
            })
          });
          if (!response.ok) {
            throw new Error(`API Status ${response.status}`);
          }
          setLeaderboardRefreshCode((prev) => prev + 1);
          return; // Success!
        } catch (err) {
          lastError = err;
          retries--;
          if (retries > 0) {
            await new Promise((resolve) => setTimeout(resolve, delay));
            delay *= 2;
          }
        }
      }

      console.error("Failed to sync score to backend leaderboard:", lastError);
    };

    const debounceTimer = setTimeout(() => {
      syncToLeaderboard();
    }, 450);

    return () => clearTimeout(debounceTimer);
  }, [user.walletAddress, user.xp, user.level, JSON.stringify(user.mintedBadges), user.username, user.avatar]);

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
    
    // Smooth scroll to the syllabus modules section
    setTimeout(() => {
      document.getElementById("curriculum-syllabus-container")?.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }, 60);
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

        // Trigger lightweight interactive confetti celebrations!
        try {
          confetti({
            particleCount: 140,
            spread: 80,
            origin: { y: 0.6 }
          });
          
          setTimeout(() => {
            confetti({
              particleCount: 80,
              angle: 60,
              spread: 55,
              origin: { x: 0, y: 0.8 }
            });
          }, 250);
          
          setTimeout(() => {
            confetti({
              particleCount: 80,
              angle: 120,
              spread: 55,
              origin: { x: 1, y: 0.8 }
            });
          }, 400);
        } catch (e) {
          console.error("Confetti trigger failed:", e);
        }
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
        <CustomCursor />
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
        user={user}
        setUser={setUser}
        userXP={user.xp} 
        isDarkMode={darkMode}
        toggleDarkMode={() => {
          React.startTransition(() => {
            setDarkMode(!darkMode);
          });
        }}
        isWalletConnected={!!currentAccount}
      />
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
      <CustomCursor />
      
      {/* 1. TOP HEADER & HUD STATUS */}
      <header className="border-b-4 border-[#3c3c3c] bg-[#F3EFEA] sticky top-0 z-40 px-6 py-4 shadow-[0px_4px_0px_0px_#3c3c3c]/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Logo Branding & Mobile Toggle Row */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div 
              onClick={handleReturnToLanding}
              className="flex items-center gap-3 cursor-pointer hover:opacity-90 active:translate-y-[0.5px] transition-all select-none group"
              title="Return to Guided Introduction"
            >
              <Compass size={24} className="text-[#D67B52] group-hover:rotate-12 transition-transform" />
              <div>
                <h1 className="text-xl font-bold font-serif tracking-tight text-[#3c3c3c] flex items-center gap-1.5 matches-title">
                  Lofi Academy
                </h1>
              </div>
            </div>

            {/* Mobile menu toggle trigger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-[#F3EFEA] border-2 border-[#3c3c3c] rounded-xl shadow-[2px_2px_0px_0px_#3c3c3c] text-[#3c3c3c] font-mono text-xs font-bold active:translate-y-[2px] transition-all"
            >
              <span className="text-[10px] tracking-wider uppercase">Menu</span>
              {mobileMenuOpen ? <X size={14} className="text-[#D67B52]" /> : <Menu size={14} />}
            </button>
          </div>
 
          {/* Real-time Developer HUD Score bar - collapses on mobile */}
          <div className={`${mobileMenuOpen ? "flex" : "hidden md:flex"} flex-wrap items-center gap-4 select-none w-full md:w-auto pt-3 md:pt-0 border-t border-dashed md:border-t-0 border-[#3c3c3c]/20 justify-start md:justify-end`}>
            {/* XP and Level Indicators */}
            <div id="hud-stats" className="flex items-center gap-2 bg-white border-2 border-[#3c3c3c] px-2.5 sm:px-3.5 py-1.5 rounded-2xl shadow-[2px_2px_0px_0px_#3c3c3c] font-mono text-xs">
              <div className="flex items-center gap-1 font-bold">
                <User size={13} className="text-[#89A8B2]" />
                <span className="text-[#3c3c3c] max-w-[65px] sm:max-w-[100px] truncate">{user.username}</span>
              </div>
              <div className="h-4 w-px bg-[#3c3c3c]/30 mx-0.5 sm:mx-1"></div>
              
              {/* Animated XP Container */}
              <motion.div 
                className="flex items-center gap-0.5 relative"
                animate={animateXPHUD ? {
                  scale: [1, 1.25, 0.95, 1.15, 1],
                  color: ["#3c3c3c", "#D67B52", "#3c3c3c"]
                } : {}}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <span className="text-[#6D5D6E] font-bold hidden sm:inline">XP:</span>
                <span className="sm:hidden text-[#D67B52]" title="XP">✨</span>
                <strong className="text-[#D67B52] font-extrabold">{user.xp}</strong>
                <AnimatePresence>
                  {animateXPHUD && (
                    <motion.span 
                      key="xp-bubble"
                      id="hud-xp-bubble"
                      initial={{ opacity: 0, y: 8, scale: 0.8 }}
                      animate={{ opacity: 1, y: -20, scale: 1.1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute left-1/2 -translate-x-1/2 text-[9px] font-black text-[#D67B52] bg-amber-50 border border-[#D67B52] px-1 rounded-md shadow-xs pointer-events-none whitespace-nowrap"
                    >
                      ✨ +XP
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>

              <div className="h-4 w-px bg-[#3c3c3c]/30 mx-0.5 sm:mx-1"></div>

              {/* Animated Level Container */}
              <motion.div 
                className="flex items-center gap-0.5 relative cursor-help"
                animate={animateLevelUpHUD ? {
                  scale: [1, 1.45, 0.9, 1.25, 0.95, 1.1, 1],
                  rotate: [0, -12, 12, -8, 8, -3, 0],
                  color: ["#3c3c3c", "#47a36c", "#3c3c3c"]
                } : {}}
                title="Your Current Lofi Rank Level"
                transition={{ duration: 1.6, ease: "easeInOut" }}
              >
                <span className="text-[#6D5D6E] font-bold hidden sm:inline">Lvl:</span>
                <span className="sm:hidden text-[#89A8B2]" title="Level">🏆</span>
                <strong className="text-[#89A8B2] font-extrabold">{user.level}</strong>
                <AnimatePresence>
                  {animateLevelUpHUD && (
                    <motion.span 
                      key="lvl-bubble"
                      id="hud-lvl-bubble"
                      initial={{ opacity: 0, y: 12, scale: 0.7 }}
                      animate={{ opacity: 1, y: -24, scale: 1.2 }}
                      exit={{ opacity: 0, y: -35 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="absolute left-1/2 -translate-x-1/2 text-[9px] font-black uppercase text-green-700 bg-green-50 border border-green-500 px-1 py-0.5 rounded-md shadow-xs pointer-events-none whitespace-nowrap z-50 animate-bounce"
                    >
                      ⭐ Level Up! ⭐
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Daily Streak Indicator */}
            <div className="flex items-center gap-1.5 bg-white border-2 border-[#3c3c3c] px-2.5 sm:px-3.5 py-1.5 rounded-2xl shadow-[2px_2px_0px_0px_#3c3c3c] font-mono text-xs">
              <Flame size={14} className="text-orange-500 animate-pulse fill-orange-500" />
              <span className="text-[#6D5D6E] font-bold hidden sm:inline">Streak:</span>
              <strong className="text-orange-500 font-extrabold">{user.streak}<span className="hidden sm:inline"> Day</span>🔥</strong>
              
              {!claimedStreakBonus ? (
                <button
                  onClick={handleClaimStreakBonus}
                  id="btn-claim-streak"
                  className="ml-1 px-1.5 py-0.5 bg-[#D67B52] hover:bg-[#D67B52]/90 text-white font-mono font-bold border border-[#3c3c3c] rounded hover:shadow-[1px_1px_0px_0px_#3c3c3c] text-[9px] sm:text-[10px] uppercase cursor-pointer"
                >
                  Bonus
                </button>
              ) : (
                <span className="ml-1 text-[9px] sm:text-[10px] text-green-600 uppercase font-sans font-bold">✓</span>
              )}
            </div>

            {/* Wallet Quick Status indicator */}
            <div className="text-xs font-mono flex items-center gap-2">
              <ConnectButton connectText="Connect Wallet" />
              
              <button
                onClick={() => {
                  React.startTransition(() => {
                    setDarkMode(!darkMode);
                  });
                }}
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
      <nav id="app-tabs-navigation" className={`bg-white border-b-2 border-[#3c3c3c] py-2.5 px-4 sm:px-6 ${mobileMenuOpen ? "block" : "hidden md:block"}`}>
        <div className="max-w-7xl mx-auto flex flex-row items-center justify-start gap-1.5 sm:gap-2 overflow-x-auto text-[12px] sm:text-[13px] font-mono no-scrollbar">
          <button
            onClick={() => {
              handleReturnToLanding();
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap border-2 font-bold text-[#D67B52] border-dashed border-[#D67B52]/60 hover:border-[#D67B52] hover:bg-[#D67B52]/5 text-xs"
            title="Read blockchain mechanics & about pages again"
          >
            <Sparkles size={13} className="animate-pulse shrink-0" />
            <span className="hidden sm:inline">Introduction Guide 📖</span>
            <span className="sm:hidden">Intro 📖</span>
          </button>

          {[
            { id: "dashboard", label: "Quest Room", shortLabel: "Quest Room", mobileLabel: "Quest", symbol: "🧭", icon: Compass },
            { id: "simulator", label: "DeFi Swap/Lend Box", shortLabel: "DeFi Box", mobileLabel: "DeFi", symbol: "📊", icon: TrendingUp },
            { id: "articles", label: "Cozy Gazette", shortLabel: "Cozy Gazette", mobileLabel: "Gazette", symbol: "📰", icon: BookOpen },
            { id: "leaderboard", label: "Leaderboard", shortLabel: "Leaderboard", mobileLabel: "Ranks", symbol: "🏆", icon: Trophy },
            { id: "profile", label: "Profile", shortLabel: "Kiosk", mobileLabel: "Profile", symbol: "👤", icon: User }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => {
                  React.startTransition(() => {
                    setActiveTab(tab.id as any);
                  });
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-1 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap border-2 font-bold text-xs ${
                  isActive 
                     ? "bg-[#F3EFEA] text-[#D67B52] border-[#3c3c3c] shadow-[2px_2px_0px_0px_#3c3c3c]" 
                     : "text-[#6D5D6E] border-transparent hover:border-[#3c3c3c]/40 hover:bg-[#f8f5f2] hover:text-[#3c3c3c]"
                }`}
              >
                <Icon size={13} className="shrink-0" />
                <span className="hidden md:inline">{tab.label}</span>
                <span className="hidden sm:inline md:hidden">{tab.shortLabel}</span>
                <span className="sm:hidden">{tab.mobileLabel}</span>
              </button>
            );
          })}
        </div>
      </nav>

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
              <div id="curriculum-syllabus-container" className="scroll-mt-24 bg-white border-2 border-[#3c3c3c] rounded-3xl p-6 shadow-[4px_4px_0px_0px_#3c3c3c]">
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
                            <span>{isCompleted ? "Review Module ☕" : "Start Quest"}</span>
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
                <div className="flex items-center justify-between bg-[#F3EFEA] p-3 sm:p-4 rounded-2xl border-2 border-[#3c3c3c] shadow-[2px_2px_0px_0px_#3c3c3c] font-mono text-xs text-[#3c3c3c] min-w-0 gap-2">
                  <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 truncate">
                    <span className="text-[#D67B52] animate-spin shrink-0">☕</span>
                    {/* Desktop layout: Full Track and Class */}
                    <div className="hidden md:flex items-center gap-2 truncate">
                      <span className="text-[#6D5D6E] font-bold">Track: <strong className="text-[#3c3c3c] font-extrabold">{activeTrack.title}</strong></span>
                      <span className="text-[#3c3c3c]/40 font-bold">/</span>
                      <span className="text-[#6D5D6E] font-bold">Class: <strong className="text-[#3c3c3c] font-extrabold">{activeModule.title}</strong></span>
                    </div>
                    {/* Mobile layout: Shortened to just Class */}
                    <div className="md:hidden truncate font-bold text-stone-700 flex items-center gap-1 min-w-0">
                      <span className="text-[#6D5D6E] font-medium text-[11px] shrink-0">Class:</span>
                      <span className="truncate text-xs text-[#3c3c3c]">{activeModule.title}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setFlowState("syllabus")}
                    className="text-[#D67B52] hover:text-[#D67B52]/80 font-bold shrink-0 flex items-center justify-center cursor-pointer transition-colors p-1"
                    title="Exit to Course Syllabus"
                  >
                    {/* On desktop show full text, on mobile show a retro styled X close button */}
                    <span className="hidden md:inline text-xs font-mono">&larr; Exit to Course Syllabus</span>
                    <span className="md:hidden flex items-center justify-center bg-white hover:bg-[#F3EFEA] text-[#3c3c3c] border-2 border-[#3c3c3c] rounded-lg p-1.5 shadow-[1.5px_1.5px_0px_0px_#3c3c3c] active:translate-y-[1px]" aria-label="Exit">
                      <X size={14} />
                    </span>
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
                        Submit Answer
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuestion}
                        className="px-6 py-2 bg-[#89A8B2] hover:bg-[#89A8B2]/90 text-white border-2 border-[#3c3c3c] font-bold rounded-xl text-xs font-mono cursor-pointer transition-all shadow-[2px_2px_0px_0px_#3c3c3c] flex items-center gap-1"
                      >
                        <span>{currentQuestionIndex === activeModule.quiz.length - 1 ? "Get Results 🏆" : "Next Question"}</span>
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
                          <Award size={12} /> Special Unlock! Sui Kiosk NFT badge (Coming Soon)
                        </div>
                        <p className="text-[11px] text-[#6D5D6E] mb-2 leading-relaxed">
                          you have successfully finished all curriculum steps under {activeTrack.title}! visit your Sui profile below to view your achievements.
                        </p>
                      </div>
                    )}

                    {/* RECOMMENDED LECTURE REFERENCE */}
                    {activeModule && (
                      <div className="bg-[#FAF8F5] border-2 border-dashed border-[#D67B52]/50 p-3 rounded-2xl text-left">
                        <span className="text-[9px] uppercase font-bold text-[#D67B52] block tracking-wide mb-1 flex items-center gap-1 font-mono">
                          <Tv size={12} className="text-[#D67B52]" /> RECOMMENDED STUDY REFERENCE
                        </span>
                        <div className="flex items-start gap-2">
                          <div className="bg-red-500 text-white rounded-lg px-2 py-1 font-bold text-xs shrink-0 font-mono flex items-center justify-center">
                            YT
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-[10px] font-extrabold text-[#3c3c3c] leading-snug font-mono truncate">
                              {getModuleVideo(activeModule).title}
                            </h4>
                            <p className="text-[9px] text-[#6D5D6E] mt-0.5 leading-snug font-mono">
                              Master this module's on-chain mechanics with a video guide.
                            </p>
                            <a
                              href={getModuleVideo(activeModule).url}
                              target="_blank"
                              rel="noopener noreferrer"
                              referrerPolicy="no-referrer"
                              className="inline-flex items-center gap-1 text-[9px] font-bold text-red-600 hover:text-red-700 transition-colors mt-1 font-mono cursor-pointer border border-red-200 bg-red-50 hover:bg-red-100/70 px-1.5 py-0.5 rounded"
                            >
                              <span>Watch reference video</span>
                              <ExternalLink size={10} />
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="pt-2">
                      <a
                        href={`https://x.com/intent/tweet?text=${encodeURIComponent(
                          `just completed the "${activeModule?.title}" module on Sui Cozy Lofi Quest! 🏔️\n\n🎯 Score: ${correctAnswersCount}/${activeModule?.quiz.length} (${Math.round((correctAnswersCount / activeModule?.quiz.length) * 100)}%)\n✨ XP Granted: +${quizXPAccumulated} XP\n\n${user.completedTracks.includes(activeTrackId) ? `🏆 Unlocked the "${activeTrack.title}" Study Badge Accomplishment!` : "🐻 Cozy coding approved by Yeti!"}\n\nJoin the learning chalet over here:`
                        )}&url=${encodeURIComponent(window.location.href)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 bg-black hover:bg-stone-900 border-2 border-[#3c3c3c] text-white font-bold rounded-xl text-xs font-mono shadow-[2px_2px_0px_0px_#3c3c3c] flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <Twitter size={13} className="fill-white text-white" />
                        <span>Post Accomplishment on X</span>
                      </a>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          React.startTransition(() => {
                            setActiveTab("profile");
                          });
                        }}
                        className="flex-1 py-2.5 bg-[#D67B52] hover:bg-[#D67B52]/90 text-white border-2 border-[#3c3c3c] font-bold rounded-xl text-xs font-mono shadow-[2px_2px_0px_0px_#3c3c3c] transition-all cursor-pointer active:translate-y-[1px]"
                      >
                        Go to Profile Kiosk NFT
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

                    {/* RECOMMENDED LECTURE REFERENCE FOR RETRY */}
                    {activeModule && (
                      <div className="bg-[#FAF8F5] border-2 border-dashed border-[#D67B52]/50 p-3 rounded-2xl text-left">
                        <span className="text-[9px] uppercase font-bold text-[#D67B52] block tracking-wide mb-1 flex items-center gap-1 font-mono">
                          <Tv size={12} className="text-[#D67B52]" /> TUTORIAL VIDEO REFERENCE
                        </span>
                        <div className="flex items-start gap-2">
                          <div className="bg-red-500 text-white rounded-lg px-2 py-1 font-bold text-xs shrink-0 font-mono flex items-center justify-center">
                            YT
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-[10px] font-extrabold text-[#3c3c3c] leading-snug font-mono truncate">
                              {getModuleVideo(activeModule).title}
                            </h4>
                            <p className="text-[9px] text-[#6D5D6E] mt-0.5 leading-snug font-mono">
                              Struggling with a question? Watch a walkthrough to master the concepts!
                            </p>
                            <a
                              href={getModuleVideo(activeModule).url}
                              target="_blank"
                              rel="noopener noreferrer"
                              referrerPolicy="no-referrer"
                              className="inline-flex items-center gap-1 text-[9px] font-bold text-red-600 hover:text-red-700 transition-colors mt-1 font-mono cursor-pointer border border-red-200 bg-red-50 hover:bg-red-100/70 px-1.5 py-0.5 rounded"
                            >
                              <span>Watch video reference</span>
                              <ExternalLink size={10} />
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="pt-1">
                      <a
                        href={`https://x.com/intent/tweet?text=${encodeURIComponent(
                          `currently studying the "${activeModule?.title}" module on Sui Cozy Lofi Quest! 🌨️\n\n🎯 Level: ${user.level} | XP: ${user.xp}\n🐻 Yeti is helping me learn on-chain logic!\n\nJoin me at the learning chalet:`
                        )}&url=${encodeURIComponent(window.location.href)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 bg-stone-100 hover:bg-stone-200 border-2 border-[#3c3c3c] text-[#3c3c3c] font-extrabold rounded-xl text-xs font-mono shadow-[2px_2px_0px_0px_#3c3c3c] flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <Twitter size={13} className="fill-current text-[#3c3c3c]" />
                        <span>Share Progress on X</span>
                      </a>
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
              <motion.div 
                initial="hidden" 
                animate="show" 
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.15
                    }
                  }
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
                  }}
                  className="bg-white border-2 border-[#3c3c3c] p-5 rounded-3xl shadow-[4px_4px_0px_0px_#3c3c3c] flex items-start gap-3 text-[#3c3c3c]"
                >
                  <div className="p-2 bg-amber-100 text-[#D67B52] border-2 border-[#3c3c3c] rounded-xl shadow-[1px_1px_0px_0px_#3c3c3c]">
                    <Coffee size={18} />
                  </div>
                  <div className="text-xs font-sans">
                    <h4 className="font-bold text-[#3c3c3c] font-serif">The Lofi Yeti Paradigm</h4>
                    <p className="text-[#6D5D6E] mt-1 leading-relaxed font-semibold">
                      Lofi Quest combines the high speed parallel execution of Sui with the relaxing workspace style of lofitheyeti.com. Learn complex Move semantics easily while listening to cozy procedurally synched chord progressions.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
                  }}
                  className="bg-white border-2 border-[#3c3c3c] p-5 rounded-3xl shadow-[4px_4px_0px_0px_#3c3c3c] flex items-start gap-3 text-[#3c3c3c]"
                >
                  <div className="p-2 bg-blue-100 text-[#89A8B2] border-2 border-[#3c3c3c] rounded-xl shadow-[1px_1px_0px_0px_#3c3c3c]">
                    <Lightbulb size={18} />
                  </div>
                  <div className="text-xs font-sans">
                    <h4 className="font-bold text-[#3c3c3c] font-serif">Did you know? SUI Epochs</h4>
                    <p className="text-[#6D5D6E] mt-1 leading-relaxed font-semibold">
                      Sui validators run epochs that shift every 24 hours. At each epoch change, gas baseline target values are adjusted, staking nodes compile performance metrics, and pending rewards are distributed to the stakeholders!
                    </p>
                  </div>
                </motion.div>
              </motion.div>
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
            musicMuted={musicMuted}
            onToggleMusicMute={handleToggleMusicMute}
          />
        )}

        {/* =============== SUI COZY ARTICLES TAB AREA =============== */}
        {activeTab === "articles" && (
          <SuiArticlesWidget />
        )}


          </motion.div>
        </AnimatePresence>

      </main>

      {/* Floating Yeti AI tutor (enabled across all interfaces!) */}
      <TutorFloatingWidget
        currentTrack={activeTrack?.title}
        currentLesson={activeModule?.title}
      />

      {/* Level Up Celebration Sparkle Popup Overlay */}
      <AnimatePresence>
        {showLevelUpOverlay && (
          <motion.div
            id="lvl-celebrate-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#3c3c3c]/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 selection:bg-[#D67B52] selection:text-white"
          >
            {/* Ambient burst rays layout or background sparkles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Confetti or dynamic sparkle entities rising */}
              {Array.from({ length: 18 }).map((_, i) => {
                const angle = (i * 360) / 18;
                const distance = 160 + Math.random() * 100;
                const x = Math.cos((angle * Math.PI) / 180) * distance;
                const y = Math.sin((angle * Math.PI) / 180) * distance;
                return (
                  <motion.div
                    key={i}
                    className="absolute left-1/2 top-1/2 text-xl sm:text-2xl"
                    initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                    animate={{
                      x,
                      y,
                      scale: [0, 1.3, 0.8, 0],
                      opacity: [1, 1, 0.8, 0],
                      rotate: [0, 180 + Math.random() * 180],
                    }}
                    transition={{
                      duration: 2.5,
                      delay: Math.random() * 0.2,
                      ease: "easeOut",
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  >
                    {["✨", "⭐", "🎉", "🔥", "☕", "🐻", "SUI", "🎓"][i % 8]}
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ scale: 0.85, y: 50, rotate: -3 }}
              animate={{
                scale: 1,
                y: 0,
                rotate: 0,
                transition: { type: "spring", damping: 14, stiffness: 120 }
              }}
              exit={{ scale: 0.85, y: 40, opacity: 0 }}
              className="relative max-w-sm w-full bg-white border-4 border-[#3c3c3c] rounded-[32px] p-6 sm:p-8 shadow-[8px_8px_0px_0px_#3c3c3c] text-center overflow-hidden"
            >
              {/* Highlight background accent pattern */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#89A8B2] via-[#E8A0BF] to-[#D67B52]" />

              <div className="absolute top-3 right-3 text-stone-400 font-mono text-[9px] select-none font-bold">
                Yeti Milestone! 🐻
              </div>

              {/* Big colorful emoji/sparkle center pop */}
              <motion.div 
                animate={{ scale: [1, 1.2, 0.95, 1.1, 1], rotate: [0, 5, -5, 5, 0] }}
                transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 2 }}
                className="w-20 h-20 bg-[#F3EFEA] border-3 border-[#3c3c3c] rounded-3xl mx-auto flex items-center justify-center text-4xl shadow-[3px_3px_0px_0px_#3c3c3c] mt-2"
              >
                🎓
              </motion.div>

              <h2 className="text-3xl font-extrabold font-serif text-[#3c3c3c] mt-4 tracking-tight">
                Level <span className="text-[#D67B52]">{user.level}</span> Unlocked!
              </h2>

              <p className="font-mono text-xs font-bold text-[#89A8B2] mt-1.5 uppercase tracking-wide">
                Rank: {
                  user.level === 5 ? "🎓 Lofi Mastery Yeti" :
                  user.level === 4 ? "🦉 Parallel Sage" :
                  user.level === 3 ? "⚔️ Move Tactician" :
                  user.level === 2 ? "🎒 Sui Apprentice" : "❄️ Cozy Explorer"
                }
              </p>

              <div className="my-5 p-3.5 bg-[#F3EFEA] border-2 border-[#3c3c3c] rounded-2xl text-left font-serif text-xs leading-relaxed text-[#6D5D6E] relative">
                <span className="absolute -top-3.5 right-3 px-2 py-0.5 bg-white border border-[#3c3c3c] text-[9px] text-[#D67B52] font-mono font-bold rounded">
                  NEW REWARD ✓
                </span>
                <p className="font-bold text-[#3c3c3c] mb-1">
                  {user.level === 5 ? "👑 Total Academy Mastery achieved!" :
                   user.level === 4 ? "🚀 Parallel Gas refunds enabled at Swap Desk!" :
                   user.level === 3 ? "⚡ Risk factors and smart router unlocked!" :
                   "🔓 New smart contract modules ready on Classroom syllabus!"}
                </p>
                <span className="text-[11px] font-mono text-[#89A8B2] font-semibold block mt-1">
                  {user.level === 5 ? "+500 CLAY Rank multiplier bonus granted." :
                   user.level === 4 ? "You can checkout Advanced SDK patterns." :
                   user.level === 3 ? "New profile souvenirs ready to mint." :
                   "Keep studying blocks with the warm presence of Yeti tutor."}
                </span>
              </div>

              {/* Confetti bottom triggers */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setShowLevelUpOverlay(false);
                    // Add some rewarding interactive feedback
                    handleAwardXP(15); // Small award on top as a direct gift!
                  }}
                  className="w-full py-3 bg-[#D67B52] hover:bg-[#D67B52]/90 text-white font-mono text-xs font-black uppercase tracking-wider border-3 border-[#3c3c3c] rounded-2xl shadow-[3px_3px_0px_0px_#3c3c3c] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#3c3c3c] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Claim Extra +15 XP Bonus! ✨</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer copyright */}
      <footer className="border-t-4 border-[#3c3c3c] bg-[#F3EFEA] p-4 text-center text-[10px] text-[#6D5D6E] font-mono">
        <p className="flex items-center justify-center gap-1 select-none font-bold">
          <span>🏔️</span>
          <span>© 2026 Lofi Academy. Built for CLAY Hackathon. All rights preserved.</span>
        </p>
      </footer>

    </motion.div>
  );
}
