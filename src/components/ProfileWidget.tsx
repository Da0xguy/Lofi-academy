import React, { useState } from "react";
import { UserProfile, MintResult } from "../types";
import { Wallet, Award, Sparkles, AlertCircle, Share2, Clipboard, ExternalLink, Settings, Eye, CheckCircle, RefreshCw } from "lucide-react";
import { motion } from "motion/react";

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
                <div className="flex justify-center mb-2.5">
                  <span className="text-4xl filter drop-shadow">{user.avatar}</span>
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
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#F3EFEA] flex items-center justify-center mx-auto mb-4 border-2 border-[#3c3c3c]">
                <Wallet className="text-[#D67B52] animate-pulse" size={28} />
              </div>

              <h4 className="font-bold text-sm text-[#3c3c3c] mb-1">Unauthenticated Explorer</h4>
              <p className="text-xs text-[#6D5D6E] max-w-xs mx-auto mb-4 leading-relaxed">
                Connect your simulated Sui wallet credentials to claim initial welcome XP and track progress.
              </p>

              <div className="flex bg-[#E8E1D9] p-1 rounded-xl border-2 border-[#3c3c3c] max-w-xs mx-auto mb-3">
                {["Sui Wallet", "Ethos", "WalletConnect"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setWalletType(type)}
                    className={`flex-1 text-[10px] py-1 rounded-lg font-mono font-bold transition-all cursor-pointer ${
                      walletType === type ? "bg-[#3c3c3c] text-white" : "text-[#6D5D6E]"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <button
                onClick={handleConnectWallet}
                className="px-6 py-2.5 bg-[#89A8B2] hover:bg-[#89A8B2]/90 text-white font-bold border-2 border-[#3c3c3c] font-mono text-xs rounded-xl shadow-[3px_3px_0px_0px_#3c3c3c] cursor-pointer transition-all active:translate-y-[2px]"
              >
                Connect Simulated {walletType}
              </button>
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
            <div 
              className="bg-[#89A8B2] h-full transition-all duration-300" 
              style={{ width: `${(user.xp % 100)}%` }}
            ></div>
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
                  {user.claimedWelcomeXP ? "Claimed ✓" : "Claim XP &rarr;"}
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
