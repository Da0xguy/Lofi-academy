import React, { useState, useEffect } from "react";
import { LeaderboardEntry } from "../types";
import { Trophy, Award, Search, Users, RefreshCw, Star } from "lucide-react";
import { AvatarWrapper } from "./AvatarWrapper";

interface LeaderboardWidgetProps {
  userWallet: string | null;
  userXP: number;
  userLevel: number;
  userBadges: string[];
  username: string;
  avatar: string;
  refreshTrigger: number;
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

export function LeaderboardWidget({
  userWallet,
  userXP,
  userLevel,
  userBadges,
  username,
  avatar,
  refreshTrigger
}: LeaderboardWidgetProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(defaultLeaderboard);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchLeaderboard = async () => {
    setIsLoading(true);
    let retries = 3;
    let delay = 1000;
    let lastError: any = null;

    while (retries > 0) {
      try {
        const response = await fetch("/api/sui/leaderboard");
        if (!response.ok) {
          throw new Error(`API status ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setLeaderboard(data.leaderboard);
          setIsLoading(false);
          return; // Success!
        } else {
          throw new Error(data.error || "Unknown response error");
        }
      } catch (err) {
        lastError = err;
        retries--;
        if (retries > 0) {
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay *= 2;
        }
      }
    }
    console.error("Failed to fetch leaderboard from API after retries:", lastError);
    setLeaderboard(defaultLeaderboard);
    setIsLoading(false);
  };

  // Submit current user details to leaderboard
  const syncCurrentUserToLeaderboard = async () => {
    let activeWallet = userWallet;
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
            username: username,
            xp: userXP,
            level: userLevel,
            badges: userBadges,
            avatar: avatar
          })
        });
        if (!response.ok) {
          throw new Error(`API status ${response.status}`);
        }
        // Fetch fresh rankings on success
        fetchLeaderboard();
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
    console.error("Failed to sync current user scores to leaderboard after retries:", lastError);
  };

  // Sync to backend whenever relevant values or refresh triggers change!
  useEffect(() => {
    fetchLeaderboard();
  }, [refreshTrigger]);

  useEffect(() => {
    syncCurrentUserToLeaderboard();
  }, [userWallet, userXP, userLevel, JSON.stringify(userBadges), username, avatar]);

  // Filter rankings according to query
  const filteredLeaderboard = (leaderboard || []).filter((entry) => {
    if (!entry) return false;
    const nameStr = typeof entry.username === "string" ? entry.username : "";
    const walletStr = typeof entry.wallet === "string" ? entry.wallet : "";
    return (
      nameStr.toLowerCase().includes(searchQuery.toLowerCase()) || 
      walletStr.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div id="leaderboard-deck" className="bg-white border-2 border-[#3c3c3c] rounded-3xl p-6 shadow-[4px_4px_0px_0px_#3c3c3c] text-[#3c3c3c]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b-2 border-dashed border-[#3c3c3c]/30 pb-4 mb-5">
        <div>
          <h2 className="text-xl font-bold font-serif text-[#3c3c3c] flex items-center gap-1.5">
            <Trophy size={20} className="text-[#D67B52]" />
            <span>Leaderboard</span>
          </h2>
          <p className="text-xs text-[#6D5D6E] mt-1 font-sans">
            Real-time global off-chain leaderboard showing top SUI developers studying on Lofi Quest.
          </p>
        </div>

        {/* Refresh & Search block */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-initial">
            <input
              type="text"
              placeholder="Filter by name or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#f8f5f2] text-xs font-mono text-[#3c3c3c] pl-8 pr-4 py-2 rounded-xl border-2 border-[#3c3c3c] focus:border-[#89A8B2] focus:outline-none w-full md:w-56"
            />
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3c3c3c]/60" />
          </div>

          <button
            onClick={fetchLeaderboard}
            disabled={isLoading}
            className="p-2 bg-[#f8f5f2] border-2 border-[#3c3c3c] hover:bg-[#E8E1D9] disabled:opacity-50 rounded-xl hover:text-[#D67B52] cursor-pointer transition-all shadow-[1px_1px_0px_0px_#3c3c3c]"
            title="Refresh list"
          >
            <RefreshCw size={14} className={isLoading ? "animate-spin text-[#89A8B2]" : ""} />
          </button>
        </div>
      </div>

      {isLoading && leaderboard.length === 0 ? (
        <div className="text-center py-12 text-[#6D5D6E] font-mono text-xs flex flex-col items-center gap-2">
          <RefreshCw size={24} className="animate-spin text-[#D67B52]" />
          <span>Synchronizing score registry...</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b-2 border-[#3c3c3c] text-[#3c3c3c] font-bold uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3 w-16 text-center">Rank</th>
                <th className="py-2.5 px-3">Adventurer Name</th>
                <th className="py-2.5 px-3">Wallet Address</th>
                <th className="py-2.5 px-3 text-center">XP Rank</th>
                <th className="py-2.5 px-3 text-center">Lvl</th>
                <th className="py-2.5 px-3 text-right">NFT Badges Unlocked</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaderboard.map((entry, index) => {
                const rank = index + 1;
                const isCurrentUser = userWallet && entry.wallet && typeof entry.wallet === "string" && entry.wallet.toLowerCase() === userWallet.toLowerCase();

                // Custom ranks styles
                let rankVisual: React.ReactNode = rank;
                if (rank === 1) {
                  rankVisual = (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#D67B52]/10 text-[#D67B52] font-mono font-bold border border-[#D67B52]/30 uppercase text-[9px] tracking-wider select-none">
                      <Trophy size={10} className="fill-current text-[#D67B52]" />
                      <span>1st</span>
                    </span>
                  );
                } else if (rank === 2) {
                  rankVisual = (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#89A8B2]/10 text-[#89A8B2] font-mono font-bold border border-[#89A8B2]/30 uppercase text-[9px] tracking-wider select-none">
                      <Trophy size={10} className="fill-current text-[#89A8B2]" />
                      <span>2nd</span>
                    </span>
                  );
                } else if (rank === 3) {
                  rankVisual = (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E8A0BF]/10 text-[#E8A0BF] font-mono font-bold border border-[#E8A0BF]/30 uppercase text-[9px] tracking-wider select-none">
                      <Trophy size={10} className="fill-current text-[#E8A0BF]" />
                      <span>3rd</span>
                    </span>
                  );
                }

                // Rank trend indicator
                let trendIcon: React.ReactNode = null;
                if (entry.rankDirection === "up") {
                  trendIcon = (
                    <span className="inline-flex items-center justify-center w-5 h-5 text-emerald-600 bg-emerald-50 border-2 border-emerald-400 rounded-lg text-[8px] font-mono font-black" title="Moved up in rank compared to last session">
                      ▲
                    </span>
                  );
                } else if (entry.rankDirection === "down") {
                  trendIcon = (
                    <span className="inline-flex items-center justify-center w-5 h-5 text-rose-600 bg-rose-50 border-2 border-rose-400 rounded-lg text-[8px] font-mono font-black animate-pulse" title="Moved down in rank compared to last session">
                      ▼
                    </span>
                  );
                } else {
                  trendIcon = (
                    <span className="inline-flex items-center justify-center w-5 h-5 text-stone-400 bg-stone-50 border-2 border-stone-300 rounded-lg text-[8px] font-mono font-bold" title="No change in rank">
                      ▬
                    </span>
                  );
                }

                return (
                  <tr
                    key={entry.wallet || `entry-${index}`}
                    className={`border-b border-[#3c3c3c]/15 hover:bg-[#F3EFEA]/60 transition-colors ${
                      isCurrentUser ? "bg-[#89A8B2]/10 font-bold border-l-4 border-l-[#89A8B2]" : ""
                    }`}
                  >
                    <td className="py-4 px-3 w-16">
                      <div className="flex items-center justify-center gap-1.5">
                        <span className="font-mono text-[11px] font-bold text-[#6D5D6E]">{rankVisual}</span>
                        {trendIcon}
                      </div>
                    </td>
                    
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-2">
                        <AvatarWrapper avatar={entry.avatar || "yeti"} size={32} />
                        <span className={`font-bold text-[#3c3c3c]`}>
                          {entry.username}
                          {isCurrentUser && <span className="text-[9px] bg-[#D67B52] text-white font-bold px-1.5 py-0.2 ml-1.5 rounded uppercase font-sans">You</span>}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-3 text-[#6D5D6E] select-all font-mono text-[11px] font-semibold">
                      {entry.wallet}
                    </td>

                    <td className="py-4 px-3 text-center">
                      <span className="text-[#D67B52] font-extrabold">{entry.xp}</span>
                      <span className="text-[#6D5D6E] text-[10px] ml-0.5">XP</span>
                    </td>

                    <td className="py-4 px-3 text-center font-bold text-[#3c3c3c]">{entry.level}</td>

                    <td className="py-4 px-3 text-right text-[#3c3c3c]">
                      {Array.isArray(entry.badges) && entry.badges.length > 0 ? (
                        <div className="flex items-center justify-end gap-1 select-none">
                          {entry.badges.map((b, bIdx) => {
                            if (!b) return null;
                            const badgeStr = typeof b === "string" ? b : (typeof b === "object" && (b as any).trackId ? String((b as any).trackId) : JSON.stringify(b));
                            let color = "bg-[#B9D7EA] text-[#3c3c3c]";
                            if (badgeStr === "defi" || badgeStr === "sui-defi") color = "bg-[#E8E1D9] text-[#3c3c3c]";
                            if (badgeStr === "protocols" || badgeStr === "sui-protocols") color = "bg-[#E8A0BF] text-white";
                            if (badgeStr === "history" || badgeStr === "sui-history") color = "bg-[#89A8B2] text-white";
                            
                            return (
                              <span
                                key={`${badgeStr}-${bIdx}`}
                                className={`text-[9px] px-2.5 py-1 rounded-lg uppercase font-bold text-center border-2 border-[#3c3c3c] shadow-[1px_1px_0px_0px_#3c3c3c] ${color}`}
                                title={`${badgeStr} Completed Badge`}
                              >
                                {badgeStr.replace("sui-", "")}
                              </span>
                            );
                          })}
                        </div>
                      ) : (
                        <span className="text-gray-500 italic text-[10px]">No badges minted yet</span>
                      )}
                    </td>
                  </tr>
                );
              })}

              {filteredLeaderboard.length === 0 && (
                <tr>
                   <td colSpan={6} className="text-center py-10 text-gray-500 italic">
                    No results match exploration filter...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Global Hackathon Stats Footer */}
      <div className="mt-5 p-4 bg-[#F3EFEA] rounded-2xl border-2 border-[#3c3c3c] shadow-[2px_2px_0px_0px_#3c3c3c] grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div>
          <span className="text-[10px] text-[#6D5D6E] uppercase block font-mono font-bold">Global XP Distributed</span>
          <strong className="text-[#D67B52] text-base font-mono font-extrabold">
            {leaderboard.reduce((acc, curr) => acc + curr.xp, 0)} XP
          </strong>
        </div>
        <div>
          <span className="text-[10px] text-[#6D5D6E] uppercase block font-mono font-bold">Average Dev Level</span>
          <strong className="text-[#3c3c3c] text-base font-mono font-extrabold">
            {leaderboard.length > 0 
              ? (leaderboard.reduce((acc, curr) => acc + curr.level, 0) / leaderboard.length).toFixed(1) 
              : "1.0"}
          </strong>
        </div>
        <div>
          <span className="text-[10px] text-[#6D5D6E] uppercase block font-mono font-bold">Total Kiosk Badges</span>
          <strong className="text-[#89A8B2] text-base font-mono font-extrabold">
            {leaderboard.reduce((acc, curr) => acc + (curr.badges?.length || 0), 0)} Badges
          </strong>
        </div>
      </div>
    </div>
  );
}
