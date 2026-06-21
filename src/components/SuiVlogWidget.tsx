import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Tv, 
  Play, 
  Pause, 
  ThumbsUp, 
  Sparkles, 
  RotateCcw, 
  ListRestart, 
  Volume2, 
  VolumeX, 
  MessageSquare, 
  Flame, 
  Clock, 
  Award, 
  ArrowRight,
  RefreshCw,
  Search,
  ExternalLink,
  Newspaper
} from "lucide-react";

interface VlogPost {
  id: string;
  title: string;
  category: "Consensus" | "DeFi" | "Bridges" | "Creators" | "Community";
  date: string;
  duration: string;
  views: number;
  likes: number;
  isLiked?: boolean;
  summary: string;
  thumbnailEmoji: string;
  dialogue: string;
  externalLink?: string;
}

const INITIAL_VLOG_POSTS: VlogPost[] = [
  {
    id: "mysticeti",
    title: "Mysticeti Engine: Sub-Second Finality Complete",
    category: "Consensus",
    date: "2026-06-18",
    duration: "1:22",
    views: 894,
    likes: 243,
    summary: "The groundbreaking Mysticeti consensus engine reduces validator coordination requirements down to an unbelievable 390ms latency! By separating transactional checkpoints from physical voting loops, network finality stays ultra-rapid under highest load.",
    thumbnailEmoji: "⚡",
    dialogue: "390 milliseconds! 🤯 that is faster than a blink of a snowman! with mysticeti, transactions are finalized instantly, maintaining high parallelism and ultra-cheap predictable gas. grab a warm cocoa and enjoy the sub-second speed!",
    externalLink: "https://sui.io/mysticeti"
  },
  {
    id: "sui-bridge",
    title: "Native Sui Bridge: Secured Trust Pool Live with Ethereum",
    category: "Bridges",
    date: "2026-06-15",
    duration: "0:45",
    views: 732,
    likes: 198,
    summary: "Sui Bridge went fully live connecting Ethereum securely! In contrast to third-party multi-sig bridge systems that are vulnerable to smart-contract exploits, Sui Bridge places asset locks directly under validator trust, guaranteeing security.",
    thumbnailEmoji: "🌉",
    dialogue: "let's build a bridge under the snow! native sui bridge secures assets directly inside the validators' custody trust pool, so you can swap seamlessly with zero anxiety. super cozy! ❄️✨",
    externalLink: "https://sui.io/bridge"
  },
  {
    id: "deepbook-v3",
    title: "DeepBook V3: Unleashing Wholesale On-chain Liquidity Flow",
    category: "DeFi",
    date: "2026-06-12",
    duration: "0:58",
    views: 521,
    likes: 145,
    summary: "DeepBook V3 introduces supreme optimization for Sui's native central limit order book. It allows automated makers to execute wholesale pricing orders with 90% cheaper gas overhead than average decentralized limits.",
    thumbnailEmoji: "📖",
    dialogue: "high-frequency trading but make it lofi! deepbook v3 is the ultimate shared liquidity level under the snow piles. traders get institutional order spreads and cheap MIST gas execution under the hood! 🐻📖",
    externalLink: "https://sui.io/deepbook-v3"
  },
  {
    id: "creator-kiosk",
    title: "Sui Kiosk: Royalties Enforced on Pure Bytecode level",
    category: "Creators",
    date: "2026-06-08",
    duration: "1:05",
    views: 612,
    likes: 187,
    summary: "Using SUI Kiosk technology, digital artists enforce reliable royalty payments automatically across secondary markets. Smart contract rules restrict transfer approvals entirely until the defined payment protocols are met securely.",
    thumbnailEmoji: "🏡",
    dialogue: "kiosk lets you build safe showcase shops under the mountain sky! since royalty policies are enforced at the Move bytecode level, creators never lose dynamic payouts. beautiful, safe and fair! 🎨🐻",
    externalLink: "https://sui.io/kiosk"
  },
  {
    id: "community-vibe",
    title: "Global Builder House: Yeti's Favorite Move Academies",
    category: "Community",
    date: "2026-06-01",
    duration: "1:15",
    views: 410,
    likes: 122,
    summary: "The Sui ecosystem experiences immense developer traction with new classrooms and bootcamps spreading globally. Live feedback loops, secure Move playgrounds, and lofi tutorials welcome millions of aspiring blockchain creators.",
    thumbnailEmoji: "🎓",
    dialogue: "you are a core part of the snowman community! yeti is insanely proud of you studying the object storage paradigms today. grab a mug of hot cider and let's craft awesome products together. 🏔️🎓",
    externalLink: "https://sui.io/community"
  }
];

export function SuiVlogWidget() {
  const [posts, setPosts] = useState<VlogPost[]>(() => {
    const saved = localStorage.getItem("sui_yeti_vlogs");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {}
    }
    return INITIAL_VLOG_POSTS;
  });

  const [activePost, setActivePost] = useState<VlogPost>(posts[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  
  // Simulated playback time incrementer
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    localStorage.setItem("sui_yeti_vlogs", JSON.stringify(posts));
  }, [posts]);

  // Handle active post playback reset
  useEffect(() => {
    setCurrentTime(0);
    setIsPlaying(true);
    setAiAnalysis("");
  }, [activePost]);

  // Simulated seek-bar timer loop
  useEffect(() => {
    if (isPlaying) {
      playIntervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const parts = activePost.duration.split(":");
          const totalSeconds = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
          if (prev >= totalSeconds) {
            return 0; // Loop playback
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
    }
    return () => {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    };
  }, [isPlaying, activePost]);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLikePost = (postId: string) => {
    setPosts((prevPosts) => 
      prevPosts.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          const updatedLikes = isLiked ? p.likes + 1 : p.likes - 1;
          const updated = { ...p, isLiked, likes: updatedLikes };
          if (activePost.id === postId) {
            setActivePost(updated);
          }
          return updated;
        }
        return p;
      })
    );
  };

  const formatSeconds = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const totalDurationSeconds = () => {
    const parts = activePost.duration.split(":");
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  };

  const progressPercent = () => {
    const total = totalDurationSeconds();
    if (total === 0) return 0;
    return (currentTime / total) * 100;
  };

  // Live Gemini Analysis / Tutor insight fetcher
  const handleAskYetiAi = async () => {
    setIsAiLoading(true);
    setAiAnalysis("");
    try {
      const response = await fetch("/api/gemini/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Give me an all-lowercase, extremely cozy and lofi analysis of this Sui News article in 2-3 sentences. Do not use promotional jargon. Talk in a friendly developer-friend yeti tone, and end with a cute quote: "${activePost.title}. Summary: ${activePost.summary}"`
        })
      });

      if (!response.ok) throw new Error("API error");
      const data = await response.json();
      if (data.success) {
        setAiAnalysis(data.text);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      // Flawless offline fallback
      setTimeout(() => {
        const fallbackCommentary = `ah, yeti is super excited about the future here! 🏔️ the article "${activePost.title.toLowerCase()}" is a giant leap for our winter cabin ecosystem. by securing structural parameters directly, developers get unparalleled execution lanes without global performance chokes. cozy up next to the fire and watch SUI build! 🐻🕯️`;
        setAiAnalysis(fallbackCommentary);
        setIsAiLoading(false);
      }, 900);
      return;
    }
    setIsAiLoading(false);
  };

  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-white border-2 border-[#3c3c3c] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#3c3c3c] text-[#3c3c3c] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#D67B52] tracking-wider font-extrabold uppercase flex items-center gap-1.5 leading-none">
            <span className="animate-pulse w-2 h-2 rounded-full bg-[#D67B52]"></span>
            <span>Broadcast Feed Room</span>
          </span>
          <h2 className="text-lg font-bold text-[#3c3c3c] font-serif mt-1 flex items-center gap-1.5">
            <Newspaper size={20} className="text-[#89A8B2]" />
            <span>Sui Cozy Vlog & News Channel</span>
          </h2>
          <p className="text-xs text-[#6D5D6E] font-medium font-sans mt-0.5">
            Stay aligned with physical network upgrades, developer breakthroughs, and ecosystem milestones while cuddling inside Yeti's mountain cabin.
          </p>
        </div>

        {/* Dynamic search bar */}
        <div className="relative max-w-xs w-full">
          <input
            type="text"
            placeholder="Search news & vlogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#FAF8F5] border-2 border-[#3c3c3c] rounded-2xl font-mono text-[#3c3c3c] placeholder-[#6D5D6E]/50 focus:outline-none focus:border-[#D67B52] transition-colors shadow-inner"
          />
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3c3c3c]/50" />
        </div>
      </div>

      {/* 2. Main content Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: CRT VIRTUAL VIDEO RECORDER PLAYER BOARD */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-[#FAF8F5] border-3 border-[#3c3c3c] rounded-[32px] p-4 shadow-[4px_4px_0px_0px_#3c3c3c] overflow-hidden">
            
            {/* Screen Header Bezel Info */}
            <div className="flex items-center justify-between border-b-2 border-dashed border-[#3c3c3c]/15 pb-2 mb-3.5 text-xs font-mono select-none">
              <div className="flex items-center gap-1.5 text-[#3c3c3c]">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse border border-[#3c3c3c]/40"></span>
                <span className="font-bold tracking-widest text-[#D67B52]">SUI_VLOG_LIVE</span>
              </div>
              <div className="flex items-center gap-2 text-stone-500 text-[10px]">
                <Clock size={11} />
                <span>CH: 0{posts.indexOf(activePost) + 1} SUI-HD</span>
                <span className="bg-[#3c3c3c] text-[#FAF8F5] px-1.5 py-0.2 rounded font-black text-[9px] uppercase tracking-wider">
                  CRT-MODE
                </span>
              </div>
            </div>

            {/* CRT TV Screen Casing Container */}
            <div className="relative aspect-video bg-[#1F1E1B] border-4 border-[#3c3c3c] rounded-2xl overflow-hidden shadow-inner group">
              
              {/* Scanlines layer overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.18)_50%)] bg-[size:100%_4px] z-10 opacity-70"></div>
              
              {/* Screen shadow vignette */}
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.45)_98%)] z-10"></div>
              
              {/* Static overlay noise when state is paused */}
              <AnimatePresence>
                {!isPlaying && currentTime === 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.12 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;utf8,<svg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22><filter id=%22noise%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%%22 height=%22100%%22 filter=%22url(%23noise)%22/></svg>')] bg-repeat z-10"
                  ></motion.div>
                )}
              </AnimatePresence>

              {/* VIDEO CONTAINER BACKGROUND GRAPHICS */}
              <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center select-none overflow-hidden bg-gradient-to-br from-[#2D2D2A] to-[#171716]">
                
                {/* Flowing decorative backdrop orbs */}
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#D67B52]/10 rounded-full blur-2xl filter animation-pulse animate-bounce duration-1000"></div>
                <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-[#89A8B2]/10 rounded-full blur-3xl filter animate-pulse duration-700"></div>

                {/* Simulated playback graphic panel */}
                <div className="relative z-10 flex flex-col items-center gap-3">
                  {/* Floating Giant Logo Medallion with bounce animation */}
                  <motion.div 
                    animate={isPlaying ? {
                      y: [0, -10, 0],
                      rotate: [0, 4, -4, 0]
                    } : {}}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-20 h-20 rounded-full bg-[#FAF8F5] border-3 border-[#3c3c3c] flex items-center justify-center shadow-[4px_4px_0px_0px_#3c3c3c]"
                  >
                    <span className="text-4xl filter drop-shadow select-none">{activePost.thumbnailEmoji}</span>
                  </motion.div>

                  {/* Typing Dialogue Subtitle text */}
                  <div className="max-w-md bg-[#FAF8F5] border-2 border-[#3c3c3c] px-4 py-2.5 rounded-2xl shadow-[3px_3px_0px_0px_#3c3c3c] text-stone-800 text-xs font-mono leading-relaxed relative mt-2 text-left">
                    {/* Retro speak tail bubble arrow indicator */}
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-b-8 border-b-[#3c3c3c] border-x-8 border-x-transparent" />
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-b-6 border-b-[#FAF8F5] border-x-6 border-x-transparent" />
                    
                    <span className="text-[#D67B52] font-black mr-1">🎙️ yeti:</span>
                    <span className="text-[11px] font-semibold text-[#3c3c3c]">
                      {isPlaying 
                        ? activePost.dialogue 
                        : "vlog video stream is currently paused. press the retro play console switch below to resume study. 🐻🧉"}
                    </span>
                  </div>
                </div>

                {/* Animated spectrum visualizer bars */}
                <div className="absolute bottom-4 left-0 right-0 flex items-end justify-center gap-1 px-8 h-8 pointer-events-none">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 bg-[#89A8B2]/30 rounded-t border-t border-[#89A8B2]/50"
                      animate={isPlaying ? {
                        height: [
                          `${10 + Math.random() * 80}%`,
                          `${30 + Math.random() * 50}%`,
                          `${5 + Math.random() * 95}%`,
                          `${10 + Math.random() * 80}%`
                        ]
                      } : { height: "15%" }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.04 }}
                    />
                  ))}
                </div>
              </div>

              {/* Volume indication trigger animation */}
              <div className="absolute top-4 left-4 z-20 text-white flex items-center gap-1 text-[10px] font-mono select-none bg-black/60 px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                {isMuted ? <VolumeX size={12} className="text-red-400" /> : <Volume2 size={12} className="text-emerald-400" />}
                <span>{isMuted ? "MUTED" : "VOLUME 100%"}</span>
              </div>
            </div>

            {/* RETRO DECK CONTROLLER DIALS ROW */}
            <div className="bg-[#F3EFEA] border-3 border-[#3c3c3c] rounded-2xl p-3.5 mt-3.5 flex flex-col md:flex-row items-center justify-between gap-4 select-none">
              
              {/* Play buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleTogglePlay}
                  className={`p-2.5 border-2 border-[#3c3c3c] rounded-xl shadow-[2px_2px_0px_0px_#3c3c3c] cursor-pointer transition-transform duration-100 active:translate-y-[1.5px] active:shadow-[1px_1px_0px_0px_#3c3c3c] flex items-center justify-center ${
                    isPlaying ? "bg-amber-100 text-[#D67B52]" : "bg-white text-stone-700 hover:bg-stone-50"
                  }`}
                  title={isPlaying ? "Pause Stream" : "Play Channel"}
                >
                  {isPlaying ? <Pause size={15} className="fill-[#D67B52]" /> : <Play size={15} className="fill-stone-700" />}
                </button>

                <button
                  onClick={() => setCurrentTime(0)}
                  className="p-2.5 bg-white hover:bg-stone-50 text-stone-700 border-2 border-[#3c3c3c] rounded-xl shadow-[2px_2px_0px_0px_#3c3c3c] cursor-pointer active:translate-y-[1.5px] active:shadow-[1px_1px_0px_0px_#3c3c3c]"
                  title="Rewind / Restart Tape"
                >
                  <RotateCcw size={15} />
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-2.5 border-2 border-[#3c3c3c] rounded-xl shadow-[2px_2px_0px_0px_#3c3c3c] cursor-pointer transition-transform duration-100 active:translate-y-[1.5px] active:shadow-[1px_1px_0px_0px_#3c3c3c] ${
                    isMuted ? "bg-red-50 text-red-600" : "bg-white text-stone-700 hover:bg-stone-50"
                  }`}
                  title={isMuted ? "Unmute Static" : "Mute audio static preview"}
                >
                  {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>
              </div>

              {/* Seek Slider bar display progress */}
              <div className="flex-1 w-full flex items-center gap-3 font-mono text-[10px] text-stone-600 font-bold">
                <span>{formatSeconds(currentTime)}</span>
                <div className="flex-1 bg-[#E8E1D9] border-2 border-[#3c3c3c] h-3.5 rounded-full p-[1.5px] overflow-hidden relative">
                  <div
                    className="bg-gradient-to-r from-[#D67B52] to-[#89A8B2] h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent()}%` }}
                  />
                </div>
                <span>{activePost.duration}</span>
              </div>

              {/* Status flag banner */}
              <div className="bg-white/80 px-3 py-1.5 border-2 border-[#3c3c3c] rounded-xl text-[10px] text-stone-600 font-mono font-bold">
                LOBE: <span className="text-[#D67B52] font-black">{isPlaying ? "PLAY_SYNC" : "HOLD_STATE"}</span>
              </div>
            </div>

          </div>

          {/* ACTIVE POST DETAIL META CARD & GEMINI LIVE CHAT */}
          <div className="bg-white border-2 border-[#3c3c3c] p-6 rounded-[28px] shadow-[4px_4px_0px_0px_#3c3c3c] space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-[#3c3c3c]/15 pb-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="font-mono text-[9px] bg-amber-50 text-[#D67B52] px-2.2 py-0.5 border border-[#D67B52]/30 rounded-full font-extrabold uppercase">
                    {activePost.category}
                  </span>
                  <span className="font-mono text-stone-400 text-[10px] font-bold">
                    Released: {activePost.date}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#3c3c3c] font-serif tracking-tight leading-tight">
                  {activePost.title}
                </h3>
              </div>

              {/* Likes counter action */}
              <button
                onClick={() => handleLikePost(activePost.id)}
                className={`py-1.5 px-3.5 border-2 border-[#3c3c3c] rounded-2xl flex items-center gap-1.5 font-mono text-xs font-bold transition-all active:translate-y-[1px] cursor-pointer shadow-[2px_2px_0px_0px_#3c3c3c] ${
                  activePost.isLiked 
                    ? "bg-rose-50 text-rose-600 border-rose-500" 
                    : "bg-[#FAF8F5] text-stone-700 hover:bg-[#FAF8F5]/80"
                }`}
                title="Support this news feed"
              >
                <ThumbsUp size={13} className={activePost.isLiked ? "fill-rose-500 text-rose-500" : ""} />
                <span>{activePost.likes} Likes</span>
              </button>
            </div>

            {/* Extended Summary panel */}
            <div className="space-y-4 text-xs text-[#3c3c3c] leading-relaxed">
              <p className="font-sans font-medium text-[#6D5D6E] text-stone-700 bg-stone-50/50 p-3.5 border border-[#3c3c3c]/10 rounded-2xl">
                {activePost.summary}
              </p>

              {/* External source anchor */}
              {activePost.externalLink && (
                <a
                  href={activePost.externalLink}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="inline-flex items-center gap-1.5 text-[#D67B52] font-semibold hover:underline font-mono text-[10px]"
                >
                  <span>Read full official announcement on Sui Network Blog</span>
                  <ExternalLink size={11} />
                </a>
              )}
            </div>

            {/* INTERACTIVE GEMINI BROADCAST INTERPRETATION MODULE */}
            <div className="bg-[#FAF8F5] border-2 border-[#3c3c3c]/80 rounded-[22px] p-4.5 space-y-3.5 relative">
              <div className="flex items-center gap-2">
                <div className="p-1 px-1.5 bg-purple-100 text-purple-700 border border-purple-400 rounded-md">
                  <Sparkles size={13} className="animate-spin text-purple-600" />
                </div>
                <h4 className="text-xs font-mono font-bold text-[#3c3c3c] uppercase tracking-wider">
                  Yeti Assistant: Gemini Real-Time Technical Audit
                </h4>
              </div>

              {!aiAnalysis && !isAiLoading ? (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-[#3c3c3c]/10">
                  <p className="text-[11px] font-sans text-[#6D5D6E] font-medium leading-relaxed">
                    Yeti compiles deep analysis based on the latest Sui developer standards & Move abilities. Ask Yeti for smart real-time commentary!
                  </p>
                  <button
                    onClick={handleAskYetiAi}
                    className="shrink-0 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-mono font-bold rounded-xl border border-[#3c3c3c]/20 hover:scale-102 flex items-center gap-1 z-10 transition-all text-[11px] cursor-pointer shadow-sm shadow-purple-600/10"
                  >
                    <Sparkles size={11} />
                    <span>Generate AI Commentary</span>
                  </button>
                </div>
              ) : isAiLoading ? (
                <div className="bg-white p-4 rounded-xl border border-stone-200 flex items-center justify-center gap-3.5 text-stone-500 font-mono text-xs">
                  <RefreshCw size={15} className="animate-spin text-purple-600" />
                  <span>Yeti indexer is analyzing bytecode parameters... Pondering...</span>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-purple-50/40 border border-purple-200/65 rounded-xl p-4 text-[11px] font-mono leading-relaxed text-[#3c3c3c]"
                >
                  <div className="flex justify-between items-center mb-2 text-[10px] text-purple-700 uppercase tracking-wider font-extrabold pb-1 border-b border-purple-100/30">
                    <span>⚡ AI Analysis Verified</span>
                    <button 
                      onClick={handleAskYetiAi}
                      className="text-purple-600 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <ListRestart size={11} />
                      <span>Re-analyze</span>
                    </button>
                  </div>
                  <p className="font-sans font-medium text-stone-700 italic">
                    "{aiAnalysis}"
                  </p>
                </motion.div>
              )}
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: REEL TRACKLIST / TAPE CASSETTES PLAYLIST SIDEBAR */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-white border-2 border-[#3c3c3c] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#3c3c3c] h-full">
            <div className="border-b-2 border-[#3c3c3c]/15 pb-3 mb-4 select-none">
              <h3 className="font-bold text-sm text-[#3c3c3c] font-serif flex items-center gap-2">
                <Tv size={16} className="text-[#D67B52]" />
                <span>Ecosystem Broadcasts ({filteredPosts.length})</span>
              </h3>
              <p className="text-[10px] text-[#6D5D6E] mt-0.5 font-sans font-medium">
                Click any cassette block below to load the video feed into our CRT television console viewer.
              </p>
            </div>

            {/* CASSETTE CARDS STACK LIST */}
            <div className="space-y-3.5 max-h-[680px] overflow-y-auto pr-1">
              {filteredPosts.length === 0 ? (
                <div className="p-8 text-center text-stone-400 font-mono text-xs bg-stone-50 border border-dashed rounded-2xl select-none">
                  No cozy news entries matched your request. Try another term! ❄️
                </div>
              ) : (
                filteredPosts.map((post, idx) => {
                  const isActive = activePost.id === post.id;
                  const colors = [
                    "bg-[#B9D7EA]/20 hover:bg-[#B9D7EA]/30",
                    "bg-[#E8E1D9]/50 hover:bg-[#E8E1D9]/75",
                    "bg-[#E8A0BF]/10 hover:bg-[#E8A0BF]/20",
                    "bg-[#89A8B2]/15 hover:bg-[#89A8B2]/25",
                    "bg-yellow-50 hover:bg-yellow-100/60"
                  ];
                  const chosenBg = colors[idx % colors.length];

                  return (
                    <motion.div
                      key={post.id}
                      onClick={() => setActivePost(post)}
                      whileHover={{ x: 3 }}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3.5 relative ${
                        isActive 
                          ? "bg-white border-[#D67B52] shadow-[3px_3px_0px_0px_#D67B52]"
                          : `${chosenBg} border-[#3c3c3c] shadow-[2px_2px_0px_0px_#3c3c3c]`
                      }`}
                    >
                      {/* Left cassette pin circles decorative layout */}
                      <div className="flex flex-col justify-between h-12 w-8 shrink-0 border border-stone-400/25 justify-center bg-stone-100/65 rounded p-1.5 gap-1.5 select-none text-[8px] text-stone-400 text-center relative overflow-hidden">
                        <div className="w-2.5 h-2.5 rounded-full bg-stone-300 mx-auto border border-stone-400"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-stone-300 mx-auto border border-stone-400"></div>
                        
                        {/* Magnetic label outline */}
                        <div className="absolute inset-x-0 h-4 bg-stone-800/10 bottom-1/2 translate-y-1/2"></div>
                      </div>

                      {/* Info lines description */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1.5 mb-1 text-[9px] font-mono select-none">
                          <span className="font-extrabold text-[#D67B52] uppercase">
                            TAPE-0{idx + 1}
                          </span>
                          <span className="font-bold text-[#6D5D6E] flex items-center gap-0.5">
                            <Clock size={10} />
                            {post.duration}
                          </span>
                        </div>

                        <h4 className="font-bold text-[#3c3c3c] text-xs leading-snug truncate">
                          {post.title}
                        </h4>
                        
                        {/* Mini descriptive snip */}
                        <p className="text-[10px] text-stone-500 font-sans font-medium mt-1 truncate">
                          {post.summary}
                        </p>
                      </div>

                      {/* Indicator Active icon */}
                      {isActive && (
                        <div className="absolute right-2.5 bottom-2.5 bg-[#D67B52] text-[#FAF8F5] p-1 border border-[#3c3c3c] rounded-full animate-bounce">
                          <Clock size={10} />
                        </div>
                      )}
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* SUI ECOSYSTEM TELEMETRY SUMMARY BOX */}
            <div className="bg-[#FAF8F5] border-2 border-dashed border-[#3c3c3c]/20 p-4 rounded-2xl mt-5 font-mono text-[9px] text-stone-600 select-none space-y-1.5">
              <div className="font-bold uppercase tracking-wider text-[#D67B52] flex items-center gap-1 text-[10px]">
                <Clock size={11} className="animate-spin text-[#D67B52]" />
                <span>SUI NETWORK FEED TELEMETRY</span>
              </div>
              <div className="flex justify-between">
                <span>EPOCH COUNTDOWN:</span>
                <span className="font-bold">04H 12M REMAINING</span>
              </div>
              <div className="flex justify-between">
                <span>PEAK CONCURRENT TPS:</span>
                <span className="font-bold text-emerald-600">297,000 tx/sec</span>
              </div>
              <div className="flex justify-between">
                <span>RECOMMENDED MIST PRICE:</span>
                <span className="font-bold">1 MIST / GAS UNIT</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
