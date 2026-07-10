import React, { useState } from "react";
import { UserProfile, MintResult } from "../types";
import { Wallet, Award, Sparkles, AlertCircle, Share2, Clipboard, ExternalLink, Settings, Eye, CheckCircle, RefreshCw, Calendar, Hash, Lock, ShieldCheck, Upload, Image, Waves, TrendingUp, Shield, BookOpen, Cpu, Trash2, Music, Volume2, VolumeX } from "lucide-react";
import { motion } from "motion/react";
import { ConnectButton } from "@mysten/dapp-kit";
import { AudioPlayerWidget } from "./AudioPlayerWidget";
import { AvatarWrapper } from "./AvatarWrapper";
import { getFirebaseUserProfile, saveFirebaseUserProfile } from "../lib/firestoreUtils";

interface ProfileWidgetProps {
  user: UserProfile;
  onChangeUser: (updates: Partial<UserProfile>) => void;
  completedTracks: string[];
  onMintSuccess: (trackId: string, mintData: MintResult) => void;
  musicMuted?: boolean;
  onToggleMusicMute?: () => void;
}

const avatars = ["yeti", "owl", "cat", "dog", "panda", "penguin", "bunny", "koala", "fox", "frog"];

function renderBadgeIcon(id: string, isMinted: boolean) {
  const iconClass = isMinted ? "w-8 h-8 stroke-2 animate-pulse" : "w-8 h-8 stroke-2 opacity-50";
  switch (id) {
    case "sui-basics":
      return <Waves className={`${iconClass} text-blue-500`} />;
    case "sui-defi":
      return <TrendingUp className={`${iconClass} text-amber-500`} />;
    case "sui-protocols":
      return <Shield className={`${iconClass} text-purple-500`} />;
    case "sui-history":
      return <BookOpen className={`${iconClass} text-emerald-500`} />;
    case "sui-move-coding":
      return <Cpu className={`${iconClass} text-yellow-500`} />;
    case "worthless-nft":
      return <Trash2 className={`${iconClass} text-stone-500`} />;
    default:
      return <Award className={`${iconClass} text-rose-500`} />;
  }
}

function getTrackName(badgeId: string) {
  switch (badgeId) {
    case "sui-basics":
      return "Sui Basics";
    case "sui-defi":
      return "Sui DeFi & Yield Ecosystem";
    case "sui-protocols":
      return "Sui Advanced Protocols";
    case "sui-history":
      return "Sui Genesis & Ecosystem History";
    case "sui-move-coding":
      return "Sui Move Smart Contract Development";
    case "worthless-nft":
      return "Sui Kiosk Playground";
    default:
      return "Sui Learning Track";
  }
}

export function ProfileWidget({ 
  user, 
  onChangeUser, 
  completedTracks, 
  onMintSuccess,
  musicMuted = false,
  onToggleMusicMute = () => {}
}: ProfileWidgetProps) {
  const [walletType, setWalletType] = useState<string>("Sui Wallet");
  const [customUsername, setCustomUsername] = useState<string>(user.username);
  const [isMinting, setIsMinting] = useState<string | null>(null);
  const [activeMintReceipt, setActiveMintReceipt] = useState<MintResult | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<boolean>(false);
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);
  const [copiedTx, setCopiedTx] = useState<string | null>(null);
  const [inspectorTab, setInspectorTab] = useState<"move" | "ts" | "diagram" | "faq">("move");

  // zkLogin simulated states inside profile
  const [showZkLogin, setShowZkLogin] = useState<boolean>(false);
  const [zkEmail, setZkEmail] = useState<string>("");
  const [zkLoading, setZkLoading] = useState<boolean>(false);
  const [zkError, setZkError] = useState<string>("");

  const handleProfileZkLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!zkEmail || !zkEmail.includes("@")) {
      setZkError("Please enter a valid Google email address.");
      return;
    }

    setZkLoading(true);
    setZkError("");

    try {
      const cleanId = zkEmail.toLowerCase().trim().replace(/[^a-z0-9]/g, "");
      const zkAddress = "0xzk_google_" + cleanId;
      
      const cloudProfile = await getFirebaseUserProfile(zkAddress);
      
      if (cloudProfile) {
        // Merge current local achievements with loaded cloud profile
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

        const mergedProfile = {
          username: cloudProfile.username || user.username || "CozyExplorer",
          avatar: cloudProfile.avatar || user.avatar || "🦊",
          walletAddress: zkAddress,
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

        onChangeUser(mergedProfile);
        await saveFirebaseUserProfile(zkAddress, mergedProfile);
      } else {
        const hasClaimed = user.claimedWelcomeXP || false;
        const newXp = hasClaimed ? user.xp : user.xp + 50;
        const updatedProfile = {
          ...user,
          walletAddress: zkAddress,
          claimedWelcomeXP: true,
          xp: newXp
        };
        onChangeUser(updatedProfile);
        await saveFirebaseUserProfile(zkAddress, updatedProfile);
      }
      setShowZkLogin(false);
      setZkEmail("");
    } catch (err: any) {
      console.error("Profile zkLogin failed:", err);
      setZkError("Verification failed. Please try again.");
    } finally {
      setZkLoading(false);
    }
  };

  const [avatarPrompt, setAvatarPrompt] = useState<string>("");
  const [isGeneratingAvatar, setIsGeneratingAvatar] = useState<boolean>(false);
  const [generatedAvatars, setGeneratedAvatars] = useState<string[]>([]);
  const [avatarError, setAvatarError] = useState<string | null>(null);

  const handleGenerateAIAvatar = async (customPrompt?: string) => {
    setIsGeneratingAvatar(true);
    setAvatarError(null);
    const finalPrompt = customPrompt || avatarPrompt;
    try {
      const res = await fetch("/api/gemini/generate-avatar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: finalPrompt || undefined })
      });
      const data = await res.json();
      if (data.success && data.dataUri) {
        setGeneratedAvatars(prev => [data.dataUri, ...prev.filter(item => item !== data.dataUri).slice(0, 11)]);
        onChangeUser({ avatar: data.dataUri });
      } else {
        setAvatarError(data.error || "Generation query dropped.");
      }
    } catch (err) {
      setAvatarError("Connection to lofi silicon chalet timed out.");
    } finally {
      setIsGeneratingAvatar(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setAvatarError("File too large. Choose an image under 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result && typeof event.target.result === "string") {
        onChangeUser({ avatar: event.target.result });
      }
    };
    reader.readAsDataURL(file);
  };

  const ALL_BADGE_TEMPLATES = [
    {
      id: "sui-basics",
      title: "Sui Basics Badge",
      emoji: "🌊",
      description: "Mastered object storage, parallel pipelines, and consensus systems.",
      borderColor: "border-blue-300",
      glowColor: "shadow-blue-500/10",
      bgClass: "bg-[#B9D7EA]/25 text-blue-900 border-blue-400/80",
    },
    {
      id: "sui-defi",
      title: "Sui DeFi Badge",
      emoji: "📈",
      description: "Mastered Cetus pool structures, Suilend loans, and multi-oracle pairs.",
      borderColor: "border-amber-300",
      glowColor: "shadow-amber-500/10",
      bgClass: "bg-[#E8E1D9]/70 text-amber-900 border-amber-400/80",
    },
    {
      id: "sui-protocols",
      title: "Sui Protocols Badge",
      emoji: "🛡️",
      description: "Mastered DeepBook CLOB orders, Kiosk transfer policies, and zkLogin.",
      borderColor: "border-purple-300",
      glowColor: "shadow-purple-500/10",
      bgClass: "bg-[#E8A0BF]/25 text-purple-900 border-purple-400/80",
    },
    {
      id: "sui-history",
      title: "Sui History Badge",
      emoji: "📖",
      description: "Mastered Diem origins, Mysten Labs founders, and Capy benchmarks.",
      borderColor: "border-[#89A8B2]",
      glowColor: "shadow-teal-500/10",
      bgClass: "bg-[#89A8B2]/25 text-slate-800 border-[#89A8B2]/80",
    },
    {
      id: "sui-move-coding",
      title: "Sui Move Coding Badge",
      emoji: "🎓",
      description: "Mastered abilities (key, store, copy, drop) and module structures.",
      borderColor: "border-yellow-400",
      glowColor: "shadow-yellow-500/10",
      bgClass: "bg-yellow-50/70 text-amber-900 border-yellow-400/80",
    },
    {
      id: "worthless-nft",
      title: "Certified Worthless Shard",
      emoji: "🥫",
      description: "A gorgeous, guaranteed 0.0% economic utility item for testing Kiosks.",
      borderColor: "border-stone-400",
      glowColor: "shadow-stone-500/10",
      bgClass: "bg-stone-50 text-stone-900 border-stone-400/80",
    }
  ];

  const handleCopyTx = (txHash: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(txHash);
    setCopiedTx(txHash);
    setTimeout(() => setCopiedTx(null), 2000);
  };

  // Simulated SUI Wallet Connection
  const handleConnectWallet = () => {
    const randomHex = () => Math.floor(Math.random() * 16).toString(16);
    const mockAddress = "0x" + Array.from({ length: 40 }, randomHex).join("");
    
    onChangeUser({
      walletAddress: mockAddress,
    });
  };

  // Claim welcome quest XP
  const handleClaimWelcomeXP = () => {
    if (user.claimedWelcomeXP) return;
    
    onChangeUser({
      claimedWelcomeXP: true,
      xp: user.xp + 50, // triggers Level check downstream
    });
  };

  // 3. Mint NFT badge via backend simulated smart contract
  const handleMintBadge = async (trackId: string, trackTitle: string) => {
    if (!user.walletAddress) return;
    setIsMinting(trackId);
    setActiveMintReceipt(null);

    try {
      const response = await fetch("/api/sui/mint-badge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wallet: user.walletAddress,
          badgeId: trackId,
          trackName: trackTitle
        })
      });

      const data = await response.json();
      if (data.success) {
        onMintSuccess(trackId, {
          txHash: data.txHash,
          objectId: data.objectId,
          gasUsedSUI: data.gasUsedSUI,
          explorerUrl: data.explorerUrl,
          logs: data.logs,
          timestamp: data.timestamp
        });
        setActiveMintReceipt(data);
      }
    } catch (err) {
      console.error("Mint contract transaction error:", err);
    } finally {
      setIsMinting(null);
    }
  };

  // 4. Copy share text to clipboard
  const handleShareClipboard = () => {
    const text = `🏆 Just completed Sui modules, earned ${user.xp} XP points and reached Level ${user.level} at Lofi Quest Hackathon! 

🎧 Connected SUI wallet: ${user.walletAddress?.slice(0, 6)}...
🐻 Cute Lofi Yeti character is holding my study dashboard! Check out lofitheyeti.com under CLAY Hackathon SUI network!`;

    navigator.clipboard.writeText(text);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div id="profile-deck" className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-4 text-[#3c3c3c]">
      
      {/* COLUMN 1: Wallet Connection & Account profile settings */}
      <div className="bg-white border-2 border-[#3c3c3c] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#3c3c3c] flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#3c3c3c] font-mono mb-4 flex items-center gap-1.5">
            <Wallet size={16} className="text-[#D67B52]" />
            <span>{user.walletAddress ? "Developer Account" : "Challenger Account"}</span>
          </h3>

          <div className="space-y-4">
            {/* Account Card details */}
            <div className="bg-[#F3EFEA] p-4 rounded-2xl border-2 border-[#3c3c3c] text-center relative overflow-hidden shadow-[2px_2px_0px_0px_#3c3c3c]">
              {user.walletAddress ? (
                <div className="absolute right-2 top-2 text-[#89A8B2] text-[9px] font-mono bg-[#89A8B2]/10 border border-[#3c3c3c]/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#89A8B2] animate-ping"></span>
                  CONNECTED
                </div>
              ) : (
                <div className="absolute right-2 top-2 text-[#D67B52] text-[9px] font-mono bg-[#D67B52]/10 border border-[#3c3c3c]/35 px-2 py-0.5 rounded-full flex items-center gap-1 font-bold">
                  GUEST MODE
                </div>
              )}

              {/* Avatar select */}
              <div className="flex justify-center mb-2.5 mt-2">
                <div
                  onClick={() => document.getElementById("avatar-upload-input")?.click()}
                  className="group relative cursor-pointer select-none rounded-full w-16 h-16 transition-transform hover:scale-105 active:scale-95"
                  title="Click to upload custom picture or select avatar"
                >
                  <AvatarWrapper avatar={user.avatar} size={64} className="border-2 border-[#3c3c3c] shadow-[2px_2px_0px_0px_#3c3c3c]" />
                  {/* Interactive EDIT overlay displayed on hover */}
                  <div className="absolute inset-x-0 bottom-0 bg-[#3c3c3c]/60 rounded-b-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pb-0.5 pointer-events-none">
                    <span className="text-[9px] text-white font-mono font-bold leading-none">EDIT</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono text-[#6D5D6E] block">Active Nickname</span>
                <input
                  type="text"
                  value={customUsername}
                  onChange={(e) => {
                    setCustomUsername(e.target.value);
                    onChangeUser({ username: e.target.value });
                  }}
                  className="bg-white text-center font-bold font-mono text-sm py-1 px-3 border-2 border-[#3c3c3c] rounded-xl max-w-full focus:border-[#89A8B2] focus:outline-none text-[#3c3c3c]"
                  placeholder="Set nickname"
                />
              </div>

              <div className="mt-4 pt-2 border-t border-dashed border-[#3c3c3c]/30 text-left font-mono">
                <span className="text-[10px] text-[#6D5D6E] block">Sui Wallet Address</span>
                {user.walletAddress ? (
                  <span className="text-[11px] text-[#D67B52] break-all select-all font-bold font-mono">
                    {user.walletAddress}
                  </span>
                ) : (
                  <span className="text-[10px] text-gray-500 italic block font-sans">
                    No wallet connected.
                  </span>
                )}
              </div>

              {/* Manual Photo File Upload */}
              <div className="pt-2 border-t border-dashed border-[#3c3c3c]/30 mt-3 flex flex-col gap-1.5">
                <label className="w-full h-8 flex items-center justify-center gap-1.5 bg-white hover:bg-stone-100 border-2 border-[#3c3c3c] text-[#3c3c3c] font-bold font-mono rounded-xl text-[10px] shadow-[1px_1px_0px_0px_#3c3c3c] cursor-pointer transition-all active:translate-y-[1px]">
                  <Upload size={12} className="text-[#D67B52]" />
                  <span>Upload Custom Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Avatar Switcher */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-[#6D5D6E] block">Choose Cute Buddy Mascot</span>
              <div className="grid grid-cols-5 gap-2">
                {avatars.map((av) => (
                  <button
                    key={av}
                    onClick={() => onChangeUser({ avatar: av })}
                    className={`p-1 rounded-xl border-2 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center ${
                      user.avatar === av ? "bg-[#89A8B2]/20 border-[#3c3c3c] shadow-[1px_1px_0px_0px_#3c3c3c]" : "bg-[#f8f5f2] border-stone-200 hover:border-stone-400"
                    }`}
                    title={`Mascot: ${av}`}
                  >
                    <AvatarWrapper avatar={av} size={32} className="pointer-events-none" />
                  </button>
                ))}
              </div>
            </div>

            {/* AI Avatar Studio */}
            <div className="space-y-3 bg-[#FAF8F5] p-3.5 border-2 border-[#3c3c3c] rounded-2xl shadow-[2px_2px_0px_0px_#3c3c3c] text-[#3c3c3c]">
              <div className="flex items-center gap-1.5 text-xs font-bold font-mono">
                <Sparkles size={14} className="text-[#D67B52] animate-pulse" />
                <span>AI Yeti Avatar Studio</span>
              </div>
              <p className="text-[10px] text-[#6D5D6E] leading-relaxed">
                Describe any animal companion theme or pick a standard preset to generate custom vector graphics instantly!
              </p>

              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={avatarPrompt}
                  onChange={(e) => setAvatarPrompt(e.target.value)}
                  placeholder="e.g. snowy coding rabbit..."
                  className="flex-1 px-2.5 py-1.5 text-[11px] font-mono border-2 border-[#3c3c3c] rounded-xl focus:border-[#89A8B2] focus:outline-none bg-white text-[#3c3c3c]"
                />
                <button
                  onClick={() => handleGenerateAIAvatar()}
                  disabled={isGeneratingAvatar}
                  className="px-3 bg-[#D67B52] hover:bg-[#D67B52]/90 text-white font-mono font-bold text-[10px] rounded-xl border-2 border-[#3c3c3c] shadow-[1px_1px_0px_0px_#3c3c3c] cursor-pointer flex items-center justify-center gap-1 min-w-[70px] disabled:opacity-50"
                >
                  {isGeneratingAvatar ? "Drawing..." : "Generate"}
                </button>
              </div>

              {/* Preset tags */}
              <div className="flex flex-wrap gap-1">
                {[
                  { label: "🦊 Panda Beanie", p: "a cute cozy red panda wearing a sleepy winter beanie, pastel vector" },
                  { label: "🐻 Wizard Yeti", p: "a lofi magic cute junior yeti holding a warm mug of cocoa, vector pastel" },
                  { label: "🐧 Pink Penguin", p: "a happy baby pink penguin wearing a thick woolen blue scarf, minimalist flat" },
                  { label: "🎧 Space Coding", p: "a tiny fuzzy space puppy wearing cozy purple headphones, modern flat design" }
                ].map((tag) => (
                  <button
                    key={tag.label}
                    onClick={() => handleGenerateAIAvatar(tag.p)}
                    disabled={isGeneratingAvatar}
                    className="text-[9px] font-mono font-bold border border-[#3c3c3c]/35 px-1.5 py-0.5 rounded-lg bg-white hover:bg-stone-100 text-[#3c3c3c]/80 cursor-pointer disabled:opacity-40"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>

              {avatarError && (
                <div className="text-[9px] font-mono font-bold text-red-600 bg-red-50 p-1.5 rounded border border-red-200">
                  ⚠ {avatarError}
                </div>
              )}

              {/* Created collection preview picker */}
              {generatedAvatars.length > 0 && (
                <div className="space-y-1.5 pt-1.5 border-t border-dashed border-[#3c3c3c]/20">
                  <span className="text-[9px] font-mono text-[#6D5D6E] block font-semibold">Your Studio Creations:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {generatedAvatars.map((url, index) => (
                      <button
                        key={index}
                        onClick={() => onChangeUser({ avatar: url })}
                        className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all cursor-pointer hover:scale-105 ${
                          user.avatar === url ? "border-[#D67B52] ring-2 ring-[#D67B52]/20 shadow-sm" : "border-[#3c3c3c]"
                        }`}
                      >
                        <img src={url} alt={`Creation ${index}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Background Music Settings */}
            <div id="music-settings-panel" className="space-y-2 bg-[#FAF8F5] p-3.5 border-2 border-[#3c3c3c] rounded-2xl shadow-[2px_2px_0px_0px_#3c3c3c] text-[#3c3c3c] mt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold font-mono">
                  <Music size={14} className="text-[#D67B52]" />
                  <span>Ambient Lofi Jams</span>
                </div>
                <span className="text-[9px] font-mono font-bold bg-[#89A8B2]/20 text-[#89A8B2] px-1.5 py-0.5 rounded border border-[#3c3c3c]/10">
                  1-HR MIX
                </span>
              </div>
              
              <p className="text-[10px] text-[#6D5D6E] leading-normal font-sans">
                A continuous, high-quality sweet 1-hour lofi track stream designed to help you concentrate on writing secure Sui Move bytecode.
              </p>

              <button
                onClick={onToggleMusicMute}
                className={`w-full py-2 px-3 text-xs font-mono font-bold rounded-xl border-2 border-[#3c3c3c] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[1px_1px_0px_0px_#3c3c3c] hover:translate-y-[-1px] active:translate-y-[1px] ${
                  musicMuted
                    ? "bg-[#E8E1D9] text-[#6D5D6E]"
                    : "bg-[#89A8B2] text-white"
                }`}
              >
                {musicMuted ? (
                  <>
                    <VolumeX size={14} />
                    <span>Unmute Background Music</span>
                  </>
                ) : (
                  <>
                    <Volume2 size={14} className="animate-pulse" />
                    <span>Mute Background Music</span>
                  </>
                )}
              </button>
            </div>

            {/* Optional SUI Wallet Integration */}
            <div className="bg-[#89A8B2]/10 border-2 border-dashed border-[#89A8B2] p-4 rounded-2xl text-center space-y-3 mt-2">
              <span className="text-[10px] font-mono font-bold text-[#89A8B2] block uppercase tracking-wider">
                🔗 SUI BLOCKCHAIN INTEGRATION (OPTIONAL)
              </span>
              <p className="text-[10px] text-[#6D5D6E] font-sans leading-normal">
                {user.walletAddress 
                  ? "Your SUI wallet is connected! You can now mint your module badges as real on-chain NFTs."
                  : "Connect a SUI extension wallet to mint your track achievements as authentic on-chain NFT badges."}
              </p>
              
              <div className="flex justify-center pt-1">
                <ConnectButton connectText="Connect SUI Wallet" />
              </div>

              {user.email && (
                <span className="text-[8px] text-[#89A8B2] font-mono block">
                  Active Account: {user.email}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Global Level Indicator bar */}
        <div className="mt-5 pt-3 border-t border-[#3c3c3c]/30 font-mono">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-[#6D5D6E] font-medium">XP Progress:</span>
            <span className="text-[#D67B52] font-bold">{user.xp} XP</span>
          </div>
          <div className="w-full bg-[#E8E1D9] h-3.5 rounded-full overflow-hidden border-2 border-[#3c3c3c]">
            <motion.div 
              className="bg-[#89A8B2] h-full" 
              initial={{ width: 0 }}
              animate={{ width: `${(user.xp % 100)}%` }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
            ></motion.div>
          </div>
          <div className="flex justify-between text-[10px] text-[#6D5D6E] mt-1 font-semibold">
            <span>Level {user.level}</span>
            <span>{100 - (user.xp % 100)} XP to {user.level + 1}</span>
          </div>
        </div>
      </div>

      {/* COLUMN 2: Welcome Quest & X Progress share widget */}
      <div className="bg-white border-2 border-[#3c3c3c] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#3c3c3c] flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#3c3c3c] font-mono mb-4 flex items-center gap-1.5">
            <Sparkles size={16} className="text-[#D67B52]" />
            <span>Welcome Quest Room</span>
          </h3>

          <div className="space-y-4">
            <div className={`p-4 rounded-2xl border-2 border-[#3c3c3c] transition-all ${
              user.claimedWelcomeXP 
                ? "bg-[#E8A0BF]/15 text-[#3c3c3c] shadow-[2px_2px_0px_0px_#3c3c3c]"
                : "bg-[#F3EFEA] text-[#3c3c3c] shadow-[3px_3px_0px_0px_#3c3c3c]"
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest bg-white text-[#3c3c3c] px-2 py-0.5 rounded border-2 border-[#3c3c3c]">
                  Quest Milestone 1
                </span>
                {user.claimedWelcomeXP ? (
                  <span className="text-xs font-bold text-[#89A8B2]">✓ CLAIMED</span>
                ) : (
                  <span className="text-xs font-bold text-[#D67B52] animate-pulse">ACTIVE</span>
                )}
              </div>

              <h4 className="font-bold text-sm text-[#3c3c3c] flex items-center gap-1">
                🔑 First Connection Bounty
              </h4>
              <p className="text-xs text-[#6D5D6E] mt-1 leading-normal font-sans">
                Establish simulated wallet and claim SUI development starter pack! Awarded 50 XP Points.
              </p>

              <div className="mt-3.5 flex justify-between items-center bg-white p-2 border-2 border-[#3c3c3c] rounded-xl">
                <span className="text-xs font-mono text-[#D67B52] font-bold">+50 XP Booster</span>
                <button
                  onClick={handleClaimWelcomeXP}
                  disabled={!user.walletAddress || user.claimedWelcomeXP}
                  className={`px-3 py-1.5 text-[10px] font-bold font-mono rounded-lg transition-all border-2 border-[#3c3c3c] cursor-pointer ${
                    user.claimedWelcomeXP
                      ? "bg-[#E8E1D9] text-gray-400 cursor-not-allowed border-[#3c3c3c]/50"
                      : user.walletAddress
                        ? "bg-[#D67B52] text-white hover:bg-[#D67B52]/90 shadow-[1px_1px_0px_0px_#3c3c3c]"
                        : "bg-[#E8E1D9] text-gray-400 cursor-not-allowed border-[#3c3c3c]/50"
                  }`}
                >
                  {user.claimedWelcomeXP ? "Claimed ✓" : "Claim XP"}
                </button>
              </div>
            </div>

            {/* Social Sharing preview generator */}
            <div className="bg-[#f8f5f2] p-4 border-2 border-[#3c3c3c] rounded-2xl shadow-[2px_2px_0px_0px_#3c3c3c]">
              <span className="text-[9px] font-mono uppercase text-[#6D5D6E] tracking-wider">Twitter (X) Progress card generator</span>
              <div className="mt-2 text-[11px] bg-white p-2.5 rounded-xl border border-dashed border-[#3c3c3c] text-[#6D5D6E] font-mono italic max-h-24 overflow-y-auto">
                "🏆 Just completed SUI modules, earned {user.xp} XP points and reached Level {user.level} at Lofi Quest Hackathon..."
              </div>

              <button
                onClick={handleShareClipboard}
                id="btn-share-progress"
                disabled={!user.walletAddress}
                className="w-full mt-3 py-2 bg-[#89A8B2] hover:bg-[#89A8B2]/90 border-2 border-[#3c3c3c] text-xs font-mono font-bold text-white rounded-xl transition-all shadow-[2px_2px_0px_0px_#3c3c3c] active:translate-y-[1px] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
              >
                {copyFeedback ? (
                  <>
                    <CheckCircle size={14} className="text-white animate-bounce" />
                    <span>Copied card template!</span>
                  </>
                ) : (
                  <>
                    <Clipboard size={14} className="text-white" />
                    <span>Copy Progress Tweet</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="text-[10px] font-mono text-[#6D5D6E] mt-4 leading-normal">
          ⚠ welcome booster guarantees your score is high enough to unlock DeFi simulator options automatically!
        </div>
      </div>

      {/* COLUMN 3: Sui Kiosk Badge NFT inventory list */}
      <div className="bg-white border-2 border-[#3c3c3c] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#3c3c3c] flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#3c3c3c] font-mono mb-4 flex items-center gap-1.5">
            <Award size={16} className="text-[#D67B52]" />
            <span>Sui Kiosk NFT Inventory</span>
          </h3>

          <div className="space-y-3 font-sans pb-4">
            {/* Basics badge */}
            <BadgeMintRow
              id="sui-basics"
              title="Sui Basics Badge"
              isCompleted={user.completedTracks.includes("sui-basics")}
              mintedData={user.mintedBadges.find((b) => b.trackId === "sui-basics")}
              onMint={() => handleMintBadge("sui-basics", "Sui Basics Badge")}
              isMinting={isMinting === "sui-basics"}
              walletConnected={!!user.walletAddress}
              color="text-[#3c3c3c] bg-[#B9D7EA]/20 border-2 border-[#3c3c3c]"
            />

            {/* DeFi badge */}
            <BadgeMintRow
              id="sui-defi"
              title="Sui DeFi Badge"
              isCompleted={user.completedTracks.includes("sui-defi")}
              mintedData={user.mintedBadges.find((b) => b.trackId === "sui-defi")}
              onMint={() => handleMintBadge("sui-defi", "Sui DeFi Badge")}
              isMinting={isMinting === "sui-defi"}
              walletConnected={!!user.walletAddress}
              color="text-[#3c3c3c] bg-[#E8E1D9]/50 border-2 border-[#3c3c3c]"
            />

            {/* Protocols badge */}
            <BadgeMintRow
              id="sui-protocols"
              title="Sui Protocols Badge"
              isCompleted={user.completedTracks.includes("sui-protocols")}
              mintedData={user.mintedBadges.find((b) => b.trackId === "sui-protocols")}
              onMint={() => handleMintBadge("sui-protocols", "Sui Protocols Badge")}
              isMinting={isMinting === "sui-protocols"}
              walletConnected={!!user.walletAddress}
              color="text-[#3c3c3c] bg-[#E8A0BF]/20 border-2 border-[#3c3c3c]"
            />

            {/* History badge */}
            <BadgeMintRow
              id="sui-history"
              title="Sui History Badge"
              isCompleted={user.completedTracks.includes("sui-history")}
              mintedData={user.mintedBadges.find((b) => b.trackId === "sui-history")}
              onMint={() => handleMintBadge("sui-history", "Sui History Badge")}
              isMinting={isMinting === "sui-history"}
              walletConnected={!!user.walletAddress}
              color="text-[#3c3c3c] bg-[#89A8B2]/20 border-2 border-[#3c3c3c]"
            />

            {/* Move coding badge */}
            <BadgeMintRow
              id="sui-move-coding"
              title="Sui Move Coding"
              isCompleted={user.completedTracks.includes("sui-move-coding")}
              mintedData={user.mintedBadges.find((b) => b.trackId === "sui-move-coding")}
              onMint={() => handleMintBadge("sui-move-coding", "Sui Move Coding Badge")}
              isMinting={isMinting === "sui-move-coding"}
              walletConnected={!!user.walletAddress}
              color="text-[#3c3c3c] bg-yellow-50/40 border-2 border-[#3c3c3c]"
            />
          </div>

          {/* Divider and Claimable Worthless NFT Section */}
          <div className="border-t-2 border-dashed border-[#3c3c3c]/15 pt-4 mt-1">
            <h4 className="text-[10px] font-mono font-bold text-[#D67B52] uppercase tracking-wider mb-2 flex items-center gap-1">
              <span>🎁 Special Souvenir Quest</span>
            </h4>
            <div className="bg-amber-50/50 border-2 border-[#3c3c3c] rounded-2xl p-3 shadow-inner text-stone-800">
              <div className="flex justify-between items-start gap-1">
                <div>
                  <h5 className="text-[12px] font-bold font-serif text-[#3c3c3c] flex items-center gap-1">
                    <span>🥫 Certified Worthless NFT</span>
                  </h5>
                  <p className="text-[10px] text-[#6D5D6E] font-medium leading-normal mt-1">
                    With exactly 0.0% economic utility or commercial value. Claim this trash directly into your Sui Kiosk to demonstrate on-chain permission mechanics!
                  </p>
                </div>
              </div>

              <div className="mt-3 flex justify-between items-center bg-white p-2 border-2 border-[#3c3c3c] rounded-xl text-[10px]">
                {user.mintedBadges.some((b) => b.trackId === "worthless-nft") ? (
                  <>
                    <span className="font-mono text-emerald-700 font-extrabold flex items-center gap-1">
                      <span>✓</span> IN KIOSK
                    </span>
                    <span className="text-[9px] text-[#D67B52] font-mono font-bold">
                      ID: {user.mintedBadges.find((b) => b.trackId === "worthless-nft")?.tokenId}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="font-mono text-[#D67B52] font-bold">Price: $0.00 MIST</span>
                    <button
                      onClick={() => handleMintBadge("worthless-nft", "Certified Worthless Shard")}
                      disabled={isMinting !== null || !user.walletAddress}
                      className={`px-3 py-1 bg-[#D67B52] hover:bg-[#D67B52]/90 text-white font-mono font-bold rounded-lg border-2 border-[#3c3c3c] shadow-[1px_1px_0px_0px_#3c3c3c] cursor-pointer transition-all active:translate-y-[1px] disabled:opacity-40 disabled:cursor-not-allowed`}
                    >
                      {isMinting === "worthless-nft" ? "Claiming..." : "Claim NFT"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic visual log of active mint triggers */}
        {activeMintReceipt && (
          <div className="bg-[#1e1e1e] border-2 border-[#3c3c3c] p-3 rounded-2xl text-[10px] font-mono text-stone-300 mt-4 shadow-[3px_3px_0px_0px_#3c3c3c]">
            <div className="font-extrabold text-[#89A8B2] flex items-center justify-between">
              <span>MINT TRANSACTION COMPLETED</span>
              <a href={activeMintReceipt.explorerUrl} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-0.5 text-[#D67B52] text-[9px] font-bold">
                Explorer <ExternalLink size={10} />
              </a>
            </div>
            <div className="border-t border-[#3c3c3c]/30 gap-1 my-1.5 flex flex-col pt-1.5">
              <div>Object ID: <span className="text-white break-all font-bold">{activeMintReceipt.objectId.slice(0, 16)}...</span></div>
              <div>Gas Settled: <span className="text-yellow-200 font-bold">{activeMintReceipt.gasUsedSUI} SUI</span></div>
            </div>
          </div>
        )}
      </div>
    </div>

      {/* SUI KIOSK: CERTIFIED BADGE SHOWCASE GRID */}
      <div id="badge-showcase-panel" className="bg-white border-2 border-[#3c3c3c] rounded-[24px] p-6 shadow-[4px_4px_0px_0px_#3c3c3c] text-[#3c3c3c]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b-2 border-dashed border-[#3c3c3c]/15">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#3c3c3c] font-mono flex items-center gap-2">
              <Award className="text-[#D67B52]" size={18} />
              <span>Sui Kiosk: Certified Badge Showcase</span>
            </h3>
            <p className="text-xs text-[#6D5D6E] mt-1 font-sans">
              Displaying verified NFT medals minted from the educational move package executions. Hover any unlocked badge to view its acquisition details.
            </p>
          </div>
          <div className="bg-[#FAF8F5] px-3.5 py-1.5 border-2 border-[#3c3c3c] rounded-2xl flex items-center gap-2 font-mono text-xs shadow-[2px_2px_0px_0px_#3c3c3c] self-start sm:self-auto select-none">
            <span className="text-[#6D5D6E] uppercase font-bold text-[10px]">Kiosk Inventory:</span>
            <span className="font-bold text-[#D67B52] bg-amber-50 px-2.2 py-0.5 border border-[#D67B52]/30 rounded">
              {user.mintedBadges.length} / {ALL_BADGE_TEMPLATES.length}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5">
          {ALL_BADGE_TEMPLATES.map((badge) => {
            const mintedInstance = user.mintedBadges.find((b) => b.trackId === badge.id);
            const isMinted = !!mintedInstance;

            return (
              <div 
                key={badge.id}
                className="relative"
                onMouseEnter={() => setHoveredBadge(badge.id)}
                onMouseLeave={() => setHoveredBadge(null)}
              >
                <motion.div 
                  whileHover={isMinted ? { y: -6, scale: 1.02 } : {}}
                  className={`relative p-4 rounded-2xl border-2 border-[#3c3c3c] text-center flex flex-col justify-between items-center h-48 transition-all ${
                    isMinted 
                      ? `${badge.bgClass} shadow-[3px_3px_0px_0px_#3c3c3c]` 
                      : "bg-[#fafafa]/50 border-dashed opacity-50 select-none"
                  }`}
                >
                  {/* Status Indicator bubble */}
                  <div className="absolute top-2.5 right-2.5">
                    {isMinted ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block shadow-sm border border-white" title="Minted in Kiosk"></span>
                    ) : (
                      <Lock size={11} className="text-[#3c3c3c]/40" />
                    )}
                  </div>

                  {/* Icon Medallion Badge circle */}
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 border-[#3c3c3c] ${
                    isMinted ? "bg-white shadow-[2px_2px_0px_0px_#3c3c3c]" : "bg-[#E8E1D9]/40"
                  } mb-3`}>
                    {renderBadgeIcon(badge.id, isMinted)}
                  </div>

                  {/* Descriptions */}
                  <div className="w-full">
                    <span className="text-xs font-bold block text-[#3c3c3c] leading-tight truncate px-1">
                      {badge.title}
                    </span>
                    <span className="text-[9px] font-mono uppercase font-bold text-[#6D5D6E] block mt-1.5 bg-white/70 py-0.5 px-1.5 rounded border border-[#3c3c3c]/10 truncate">
                      {isMinted ? "Verified NFT" : "Locked Slot"}
                    </span>
                  </div>

                  {/* Hover visual CTA */}
                  <div className="text-[10px] text-[#D67B52] font-mono mt-1 font-bold cursor-help flex items-center gap-1 select-none">
                    {isMinted ? "Hover details" : "Study to unlock"}
                  </div>
                </motion.div>

                {/* RELATIVE POSITIONED FLOATING TOOLTIP CARD */}
                {hoveredBadge === badge.id && isMinted && mintedInstance && (
                  <div className="absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 z-[99] w-64 bg-[#232323] text-stone-100 p-4 rounded-2xl border-2 border-[#3c3c3c] shadow-[6px_6px_0px_0px_#3c3c3c] text-xs font-mono animate-in fade-in slide-in-from-bottom-2 duration-150">
                    <div className="font-extrabold text-[#89A8B2] border-b border-stone-700/60 pb-2 mb-2 flex items-center gap-1.5 uppercase tracking-wide">
                      <ShieldCheck size={14} className="text-emerald-400" />
                      <span>{badge.title} Details</span>
                    </div>
                    
                    <p className="text-[11px] text-stone-300 leading-normal font-sans font-medium mb-3">
                      {badge.description}
                    </p>

                    <div className="space-y-2.5 border-t border-stone-800 pt-3">
                      <div>
                        <div className="flex items-center gap-1 text-[10px] text-stone-400 mb-1">
                          <Calendar size={11} className="text-[#D67B52]" />
                          <span className="font-bold uppercase tracking-wider text-[9px]">Minted Date:</span>
                        </div>
                        <div className="bg-[#141414] px-2 py-1 rounded-lg text-[10px] text-stone-200 select-all font-mono border border-stone-800">
                          {mintedInstance.mintedAt || "2026-06-04 15:47 UTC"}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-1 text-[10px] text-stone-400 mb-1">
                          <Hash size={11} className="text-[#89A8B2]" />
                          <span className="font-bold uppercase tracking-wider text-[9px]">Transaction Hash:</span>
                        </div>
                        <div className="bg-[#141414] px-2 py-1 rounded-lg text-[10px] text-stone-200 font-mono flex items-center justify-between border border-stone-800">
                          <span className="truncate pr-1 font-mono select-all text-stone-300" title={mintedInstance.txHash}>
                            {mintedInstance.txHash}
                          </span>
                          <button
                            onClick={(e) => handleCopyTx(mintedInstance.txHash, e)}
                            className="p-1 hover:bg-[#2c2c2c] rounded text-[#89A8B2] hover:text-[#89A8B2]/80 transition-all cursor-pointer flex-shrink-0"
                            title="Copy Tx Hash"
                          >
                            {copiedTx === mintedInstance.txHash ? (
                              <span className="text-[9px] text-[#D67B52] font-semibold">Copied!</span>
                            ) : (
                              <Clipboard size={11} />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-[10px] text-stone-400 pt-1.5 border-t border-stone-800">
                        <span className="uppercase text-[9px] font-bold">Object ID:</span>
                        <span className="text-emerald-400 font-mono bg-[#141414] px-1.5 py-0.5 border border-stone-800 rounded text-[9px]">
                          {mintedInstance.tokenId}
                        </span>
                      </div>

                      <div className="pt-2.5 border-t border-stone-800/80 mt-1.5">
                        <a
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                            `🏆 Just completed the "${getTrackName(badge.id)}" track and minted my on-chain achievement on @SuiNetwork Cozy Lofi Quest! 🏔️✨\n\n🎯 Badge: ${badge.title}\n💬 Details: ${badge.description}\n⛓️ Explorer Receipt: https://suiexplorer.com/txblock/${mintedInstance.txHash}?network=testnet\n\n#Sui #MoveLanguage #LofiQuest`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-white hover:bg-stone-100 text-[#141414] font-bold transition-all text-[11px] font-sans shadow-[2px_2px_0px_0px_#3c3c3c] active:translate-y-[1px] active:translate-x-[1px] active:shadow-[1px_1px_0px_0px_#3c3c3c] cursor-pointer"
                        >
                          <svg className="w-3 h-3 fill-current flex-shrink-0" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                          <span>Share to X (Twitter)</span>
                        </a>
                      </div>
                    </div>

                    {/* Tooltip arrow pointer */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-t-8 border-t-[#232323] border-x-8 border-x-transparent" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SUI KIOSK ARCHITECTURE & SMART CONTRACT INSPECTOR */}
      <div id="kiosk-inspector-panel" className="bg-white border-2 border-[#3c3c3c] rounded-[24px] p-6 shadow-[4px_4px_0px_0px_#3c3c3c] text-[#3c3c3c] flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-dashed border-[#3c3c3c]/15">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#3c3c3c] font-mono flex items-center gap-2">
              <Cpu className="text-[#D67B52]" size={18} />
              <span>Smart Contract & Kiosk Inspector</span>
            </h3>
            <p className="text-xs text-[#6D5D6E] mt-1 font-sans">
              Dive deep into how NFT credentials and Soulbound Badges are actually programmed and secured within the Sui on-chain Kiosk framework.
            </p>
          </div>
          
          {/* Quick Stats bubble */}
          <div className="bg-[#FAF8F5] px-3.5 py-1.5 border-2 border-[#3c3c3c] rounded-2xl flex items-center gap-2 font-mono text-[11px] shadow-[2px_2px_0px_0px_#3c3c3c] self-start sm:self-auto select-none">
            <span className="text-[#6D5D6E] font-bold">Standard:</span>
            <span className="font-extrabold text-[#D67B52] bg-amber-50 px-2 py-0.5 border border-[#D67B52]/30 rounded">
              Sui Kiosk (0x2)
            </span>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {[
            { id: "move", label: "badge.move", icon: <Cpu size={12} /> },
            { id: "ts", label: "mint-badge.ts", icon: <Settings size={12} /> },
            { id: "diagram", label: "On-Chain Flow", icon: <Eye size={12} /> },
            { id: "faq", label: "Interactive FAQ", icon: <BookOpen size={12} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setInspectorTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border-2 font-bold transition-all cursor-pointer ${
                inspectorTab === tab.id
                  ? "bg-[#D67B52] text-white border-[#3c3c3c] shadow-[2px_2px_0px_0px_#3c3c3c]"
                  : "bg-[#FAF8F5] text-[#3c3c3c] border-stone-200 hover:border-[#3c3c3c] hover:bg-[#FAF8F5]/80"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic content canvas */}
        <div className="bg-[#1e1e1e] border-2 border-[#3c3c3c] rounded-2xl overflow-hidden shadow-[2px_2px_0px_0px_#3c3c3c]">
          
          {/* Move tab */}
          {inspectorTab === "move" && (
            <div className="p-4 text-stone-300 font-mono text-[11px] overflow-x-auto max-h-[340px]">
              <div className="flex items-center justify-between border-b border-stone-800 pb-2 mb-3 text-[10px] text-stone-500">
                <span>// SOURCE: SUI_MOVE/SOURCES/BADGE_KIOSK.MOVE</span>
                <span className="text-emerald-500 font-bold">SYNTAX COLORING ACTIVE</span>
              </div>
              <pre className="leading-relaxed select-all">
{`module lofi_quest::badge_kiosk {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::kiosk::{Self, Kiosk, KioskOwnerCap};
    use sui::package;

    /// The Badge NFT representing a completed educational track
    struct StudyBadge has key, store {
        id: UID,
        track_id: vector<u8>,
        xp_value: u64,
        recipient: address,
    }

    /// One-Time-Witness (OTW) for package initialization
    struct BADGE_KIOSK has drop {}

    /// Publisher Capability to authorize custom transfer rules
    struct PublisherCap has key, store {
        id: UID,
    }

    fun init(otw: BADGE_KIOSK, ctx: &mut TxContext) {
        let publisher = package::claim(otw, ctx);
        // ... set up transfer policy, make it soulbound
        transfer::public_transfer(publisher, tx_context::sender(ctx));
    }

    /// Public entry function to mint a certified badge and secure it in the user's Kiosk
    public entry fun mint_to_kiosk(
        track_id: vector<u8>,
        xp_value: u64,
        kiosk: &mut Kiosk,
        cap: &KioskOwnerCap,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        let badge = StudyBadge {
            id: object::new(ctx),
            track_id,
            xp_value,
            recipient: sender,
        };
        // Securely place the badge NFT inside the user's Kiosk
        kiosk::place(kiosk, cap, badge);
    }
}`}
              </pre>
            </div>
          )}

          {/* TS Tab */}
          {inspectorTab === "ts" && (
            <div className="p-4 text-stone-300 font-mono text-[11px] overflow-x-auto max-h-[340px]">
              <div className="flex items-center justify-between border-b border-stone-800 pb-2 mb-3 text-[10px] text-stone-500">
                <span>// FILE: SRC/SERVICES/MINT_BADGE.TS</span>
                <span className="text-blue-400 font-bold">@MYSTEN/SUI COMPATIBLE</span>
              </div>
              <pre className="leading-relaxed select-all">
{`import { Transaction } from "@mysten/sui/transactions";
import { useSignAndExecuteTransaction, useCurrentAccount } from "@mysten/dapp-kit";

// Setup a new transaction block
const tx = new Transaction();

// Target our deployed smart contract package
const PACKAGE_ID = "0xecc5617a61d198d5a1bcbaee8309de725b81a7d2c3848b59828ee7";
const MODULE_NAME = "badge_kiosk";
const FUNCTION_NAME = "mint_to_kiosk";

tx.moveCall({
  target: \`\${PACKAGE_ID}::\${MODULE_NAME}::\${FUNCTION_NAME}\`,
  arguments: [
    tx.pure.vectorU8(new TextEncoder().encode("sui-basics")), // track id
    tx.pure.u64(150), // xp granted
    tx.object(userKioskAddress), // user's kiosk object
    tx.object(userKioskCapAddress), // user's kiosk ownership cap
  ],
});

// Sign and execute on the SUI Testnet with the connected wallet
const { mutate: signAndExecute } = useSignAndExecuteTransaction();

const handleRealMint = () => {
  signAndExecute({
    transaction: tx,
    chain: "sui:testnet",
  }, {
    onSuccess: (result) => {
      console.log("On-Chain Mint Success!", result.digest);
    },
    onError: (error) => {
      console.error("Failed to sign transaction:", error);
    }
  });
};`}
              </pre>
            </div>
          )}

          {/* Diagram Tab */}
          {inspectorTab === "diagram" && (
            <div className="p-6 text-stone-300 font-sans flex flex-col items-center justify-center min-h-[280px]">
              <span className="text-[10px] font-mono uppercase text-stone-500 mb-6 tracking-widest text-center self-stretch border-b border-stone-800 pb-2">
                On-Chain Kiosk Ownership & Storage Pipeline
              </span>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center w-full max-w-2xl text-center text-xs font-mono">
                {/* Publisher cap box */}
                <div className="p-4 rounded-xl border border-stone-700 bg-stone-900 flex flex-col items-center shadow-md">
                  <div className="w-10 h-10 rounded-full bg-orange-950 border border-orange-500 text-orange-400 flex items-center justify-center mb-2 font-bold">
                    CAP
                  </div>
                  <span className="font-bold text-stone-200">1. Publisher Cap</span>
                  <span className="text-[10px] text-stone-400 mt-1">Authorizes minting permissions & enforces Soulbound rules.</span>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex flex-col items-center justify-center text-[#D67B52]">
                  <span className="text-[10px] text-stone-500 mb-1">MINT & PLACE</span>
                  <div className="h-0.5 bg-[#D67B52] w-12 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-r-2 border-t-2 border-[#D67B52] rotate-45" />
                  </div>
                </div>

                {/* Badge NFT box */}
                <div className="p-4 rounded-xl border-2 border-[#D67B52]/40 bg-stone-950 flex flex-col items-center shadow-lg relative">
                  <span className="absolute -top-2 px-2 py-0.5 bg-[#D67B52]/10 border border-[#D67B52]/30 text-[#D67B52] text-[9px] rounded font-bold uppercase">
                    Badge NFT
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[#D67B52]/15 border border-[#D67B52] text-[#D67B52] flex items-center justify-center mb-2 font-bold">
                    NFT
                  </div>
                  <span className="font-bold text-stone-100">2. StudyBadge Object</span>
                  <span className="text-[10px] text-stone-400 mt-1 font-sans">Sui on-chain object housing Track ID, recipient info, and XP metadata.</span>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex flex-col items-center justify-center text-[#89A8B2] md:col-start-2">
                  <span className="text-[10px] text-stone-500 mb-1">KIOSK::PLACE</span>
                  <div className="h-0.5 bg-[#89A8B2] w-12 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-r-2 border-t-2 border-[#89A8B2] rotate-45" />
                  </div>
                </div>

                {/* User Kiosk box */}
                <div className="p-4 rounded-xl border border-stone-700 bg-stone-900 flex flex-col items-center shadow-md md:col-start-3">
                  <div className="w-10 h-10 rounded-full bg-teal-950 border border-teal-500 text-teal-400 flex items-center justify-center mb-2 font-bold">
                    KIOSK
                  </div>
                  <span className="font-bold text-stone-200">3. User's Kiosk</span>
                  <span className="text-[10px] text-stone-400 mt-1">Shared, secure commerce locker where the badge resides forever.</span>
                </div>
              </div>

              <div className="mt-6 p-3 rounded-xl bg-[#141414] border border-stone-800 text-[11px] leading-relaxed max-w-xl text-stone-400 text-center font-sans font-medium">
                🛡️ <strong className="text-stone-300">Soulbound Enforcer:</strong> In step 3, because the badge's <code className="text-[#D67B52] font-mono">TransferPolicy</code> restricts the transfer of <code className="text-[#D67B52] font-mono">StudyBadge</code> objects, the NFT cannot be extracted or sold on secondary marketplaces. It is permanently linked to your wallet!
              </div>
            </div>
          )}

          {/* FAQ Tab */}
          {inspectorTab === "faq" && (
            <div className="p-5 text-stone-300 font-sans space-y-4 max-h-[340px] overflow-y-auto">
              <span className="text-[10px] font-mono uppercase text-stone-500 block border-b border-stone-800 pb-2 tracking-widest">
                Interactive Badge Minting Knowledge Base
              </span>
              
              <div className="space-y-3.5 text-xs font-sans">
                <div className="p-3 bg-stone-900/60 rounded-xl border border-stone-800/80">
                  <h4 className="font-bold text-[#D67B52] flex items-center gap-1.5 mb-1 font-mono">
                    <span>Q: Why does the sandbox use Simulated Minting by default?</span>
                  </h4>
                  <p className="text-stone-400 leading-normal font-medium">
                    To make learning fluid, gas-free, and instantly accessible to everyone! Real testnet transactions require setting up browser extensions, acquiring testnet SUI from faucets, and waiting for on-chain block settlement. Our high-fidelity simulator perfectly mimics the Move contract execution, giving you authentic logs, VM step traces, and gas bills in SUI instantly without any friction.
                  </p>
                </div>

                <div className="p-3 bg-stone-900/60 rounded-xl border border-stone-800/80">
                  <h4 className="font-bold text-[#D67B52] flex items-center gap-1.5 mb-1 font-mono">
                    <span>Q: How can I migrate this to a real deployed smart contract?</span>
                  </h4>
                  <p className="text-stone-400 leading-normal font-medium font-sans">
                    Extremely simple! You first publish the <code className="bg-[#141414] px-1 py-0.5 rounded font-mono text-[10px] text-stone-200">badge_kiosk</code> Move module to the SUI Testnet or Mainnet using the SUI CLI. Once published, you copy your assigned <code className="bg-[#141414] px-1 py-0.5 rounded font-mono text-[10px] text-stone-200">PACKAGE_ID</code> and replace the simulated proxy endpoint address in the client-side code shown in the <strong className="text-stone-300">mint-badge.ts</strong> tab.
                  </p>
                </div>

                <div className="p-3 bg-stone-900/60 rounded-xl border border-stone-800/80">
                  <h4 className="font-bold text-[#D67B52] flex items-center gap-1.5 mb-1 font-mono">
                    <span>Q: What are the unique advantages of Sui Kiosk over other chains?</span>
                  </h4>
                  <p className="text-stone-400 leading-normal font-medium">
                    Traditional blockchains force you to deposit NFTs into marketplace smart contracts to sell them, meaning they leave your wallet. On Sui, Kiosks allow your digital assets to remain inside your own controlled storage account at all times while listing them publicly, combining superior security with absolute asset sovereignty.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Lofi Jams Music Audio Deck relocated under Profile */}
      <div className="bg-white border-4 border-[#3c3c3c] rounded-[24px] p-5 shadow-[4px_4px_0px_0px_#3c3c3c]">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#3c3c3c] font-mono mb-4 flex items-center gap-1.5">
          <span>Lofi study jams audio controller</span>
        </h3>
        <AudioPlayerWidget />
      </div>

    </div>
  );
}

// Sub-compo for each badge row mint interface
interface BadgeMintRowProps {
  id: string;
  title: string;
  isCompleted: boolean;
  mintedData?: any;
  onMint: () => void;
  isMinting: boolean;
  walletConnected: boolean;
  color: string;
}

function BadgeMintRow({ id, title, isCompleted, mintedData, onMint, isMinting, walletConnected, color }: BadgeMintRowProps) {
  return (
    <div className={`flex items-center justify-between p-3 rounded-xl ${color}`}>
      <div className="flex items-center gap-2">
        <motion.div 
          className="inline-flex items-center justify-center p-1.5 rounded-full bg-white border border-[#3c3c3c]/10"
          animate={{ 
            scale: [1, 1.12, 1],
            y: [0, -1, 0]
          }}
          whileHover={{ scale: 1.25, rotate: 10 }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Award size={16} className={isCompleted ? "text-[#D67B52]" : "text-gray-400"} />
        </motion.div>
        <div>
          <span className="text-xs font-bold block text-[#3c3c3c]">{title}</span>
          <span className="text-[10px] text-[#6D5D6E] font-mono font-medium">
            {mintedData 
              ? `Minted id: ${mintedData.tokenId.slice(0, 8)}...`
              : isCompleted 
                ? "Certificate Earned" 
                : "Awaiting Assessment"
            }
          </span>
        </div>
      </div>

      <div>
        {mintedData ? (
          <span className="text-[10px] font-extrabold font-mono text-[#89A8B2] bg-white px-2.5 py-1 rounded-lg border-2 border-[#3c3c3c] shadow-[1px_1px_0px_0px_#3c3c3c] select-none">
            In Kiosk ✓
          </span>
        ) : isCompleted ? (
          <button
            onClick={onMint}
            disabled={isMinting || !walletConnected}
            className={`px-3 py-1.5 text-[9px] font-mono font-bold rounded-lg tracking-wider cursor-pointer border-2 border-[#3c3c3c] transition-all ${
              !walletConnected
                ? "bg-[#E8E1D9] text-gray-400 cursor-not-allowed border-[#3c3c3c]/50"
                : "bg-[#D67B52] text-white hover:bg-[#D67B52]/90 shadow-[1px_1px_0px_0px_#3c3c3c]"
            }`}
          >
            {isMinting ? "Minting..." : "Mint Badge"}
          </button>
        ) : (
          <span className="text-[9px] font-mono text-[#6D5D6E] uppercase tracking-widest flex items-center gap-1 select-none font-bold">
            <span>Locked</span>
            <Lock size={10} />
          </span>
        )}
      </div>
    </div>
  );
}
