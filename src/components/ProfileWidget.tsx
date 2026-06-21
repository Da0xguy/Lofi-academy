import React, { useState } from "react";
import { UserProfile, MintResult } from "../types";
import { Wallet, Award, Sparkles, AlertCircle, Share2, Clipboard, ExternalLink, Settings, Eye, CheckCircle, RefreshCw, Calendar, Hash, Lock, ShieldCheck, Upload, Image } from "lucide-react";
import { motion } from "motion/react";
import { ConnectButton } from "@mysten/dapp-kit";
import { AudioPlayerWidget } from "./AudioPlayerWidget";

interface ProfileWidgetProps {
  user: UserProfile;
  onChangeUser: (updates: Partial<UserProfile>) => void;
  completedTracks: string[];
  onMintSuccess: (trackId: string, mintData: MintResult) => void;
}

const avatars = ["🐻", "🐱", "🐶", "🦊", "🦁", "🐨", "🐸", "🐼", "🦦", "🐰"];

export function ProfileWidget({ user, onChangeUser, completedTracks, onMintSuccess }: ProfileWidgetProps) {
  const [walletType, setWalletType] = useState<string>("Sui Wallet");
  const [customUsername, setCustomUsername] = useState<string>(user.username);
  const [isMinting, setIsMinting] = useState<string | null>(null);
  const [activeMintReceipt, setActiveMintReceipt] = useState<MintResult | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<boolean>(false);
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);
  const [copiedTx, setCopiedTx] = useState<string | null>(null);

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
            <span>Developer Account</span>
          </h3>

          {user.walletAddress ? (
            <div className="space-y-4">
              {/* Account Card details */}
              <div className="bg-[#F3EFEA] p-4 rounded-2xl border-2 border-[#3c3c3c] text-center relative overflow-hidden shadow-[2px_2px_0px_0px_#3c3c3c]">
                <div className="absolute right-2 top-2 text-[#89A8B2] text-[9px] font-mono bg-[#89A8B2]/10 border border-[#3c3c3c]/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#89A8B2] animate-ping"></span>
                  CONNECTED
                </div>

                {/* Avatar select */}
                <div className="flex justify-center mb-2.5 mt-2">
                  {user.avatar && (user.avatar.startsWith("data:") || user.avatar.startsWith("http") || user.avatar.startsWith("/") || user.avatar.startsWith("blob:")) ? (
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className="w-16 h-16 rounded-full border-2 border-[#3c3c3c] object-cover shadow-[2px_2px_0px_0px_#3c3c3c]"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="text-4xl filter drop-shadow">{user.avatar}</span>
                  )}
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
                  <span className="text-[11px] text-[#D67B52] break-all select-all font-bold font-mono">
                    {user.walletAddress}
                  </span>
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
                <div className="grid grid-cols-5 gap-1.5">
                  {avatars.map((av) => (
                    <button
                      key={av}
                      onClick={() => onChangeUser({ avatar: av })}
                      className={`text-xl p-1.5 rounded-xl border-2 transition-all hover:scale-110 cursor-pointer ${
                        user.avatar === av ? "bg-[#89A8B2]/20 border-[#3c3c3c]" : "bg-[#f8f5f2] border-transparent"
                      }`}
                    >
                      {av}
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
                  Describe any animal companion theme or pick a standard preset to generate custom vector graphics instantly via Gemini!
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
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#F3EFEA] flex items-center justify-center mx-auto mb-4 border-2 border-[#3c3c3c]">
                <Wallet className="text-[#D67B52] animate-pulse" size={28} />
              </div>

              <h4 className="font-bold text-sm text-[#3c3c3c] mb-1">Unauthenticated Explorer</h4>
              <p className="text-xs text-[#6D5D6E] max-w-xs mx-auto mb-5 leading-relaxed">
                Connect your developer or personal Sui Wallet to track your track progress, badges, and claim your starter XP.
              </p>

              <div className="flex justify-center">
                <ConnectButton connectText="Connect dApp Wallet" />
              </div>
            </div>
          )}
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
                    <span className="text-3xl filter drop-shadow">{badge.emoji}</span>
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
                    {isMinted ? "Hover details ✨" : "Study to unlock"}
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

      {/* Lofi Jams Music Audio Deck relocated under Profile */}
      <div className="bg-white border-4 border-[#3c3c3c] rounded-[24px] p-5 shadow-[4px_4px_0px_0px_#3c3c3c]">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#3c3c3c] font-mono mb-4 flex items-center gap-1.5">
          <span>🎧 Lofi study jams audio controller</span>
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
        <motion.span 
          className="text-lg inline-block text-center rounded-full"
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
          🏅
        </motion.span>
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
          <span className="text-[9px] font-mono text-[#6D5D6E] uppercase tracking-widest block select-none font-bold">
            Locked 🔑
          </span>
        )}
      </div>
    </div>
  );
}
