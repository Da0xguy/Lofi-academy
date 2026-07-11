import React, { useState } from "react";
import { LearningTrack, TrackModule } from "../types";
import { Award, Compass, Sparkles, Map, CheckCircle2, ChevronRight, HelpCircle, Lock, Star } from "lucide-react";
import YETI_BADGE_ASSET from "../assets/images/yeti_badge_1779633396226.png";

interface SuiTrailMapProps {
  activeTrack: LearningTrack;
  completedModules: string[];
  activeModuleId: string;
  onSelectModule: (mod: TrackModule) => void;
  userXp?: number;
}

export default function SuiTrailMap({
  activeTrack,
  completedModules,
  activeModuleId,
  onSelectModule,
  userXp,
}: SuiTrailMapProps) {
  const [hoveredModId, setHoveredModId] = useState<string | null>(null);

  const modules = activeTrack?.modules || [];
  const totalModules = modules.length;

  // Calculate coordinates for a larger, more immersive SVG viewport of 1200 x 480
  const width = 1200;
  const height = 480;

  const getCoordinates = (index: number) => {
    if (totalModules <= 1) {
      return { x: width / 2, y: height / 2 };
    }
    // Margin on sides
    const startX = 100;
    const endX = width - 100;
    const stepX = (endX - startX) / (totalModules - 1);
    
    const x = startX + index * stepX;
    // Elegant grand serpentine wave: alternating with generous vertical range for taller board
    const y = index % 2 === 0 ? 110 : 370;
    return { x, y };
  };

  // Bezier curve path calculation to mimic organic hand-drawn mountain trails with wider waves
  const getPathD = (index: number) => {
    const p1 = getCoordinates(index);
    const p2 = getCoordinates(index + 1);
    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2;
    // Larger alternating control offset for majestic natural curved trails
    const offset = index % 2 === 0 ? 38 : -38;
    return `M ${p1.x} ${p1.y} Q ${midX} ${midY + offset} ${p2.x} ${p2.y}`;
  };

  // Calculate progress stats
  const completedCount = modules.filter((m) => completedModules.includes(m.id)).length;
  const progressPercent = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

  // Find the current active index, or the furthest unlocked module
  const activeIndex = modules.findIndex((m) => m.id === activeModuleId);
  const currentYetiIndex = activeIndex !== -1 ? activeIndex : 0;

  return (
    <div className="bg-[#FAF8F5] border-2 border-[#3c3c3c] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_0px_#3c3c3c] mb-6 relative overflow-hidden">
      {/* Custom modular CSS animations scoped to this widget */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes yeti-float {
          0%, 100% { transform: translateY(-14px) rotate(-1deg); }
          50% { transform: translateY(-4px) rotate(1deg); }
        }
        @keyframes marker-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes tooltip-pop {
          from { opacity: 0; transform: translate(-50%, 12px) scale(0.95); }
          to { opacity: 1; transform: translate(-50%, 0) scale(1); }
        }
        @keyframes radar-pulse {
          0% { transform: scale(0.65); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes path-dash {
          to { stroke-dashoffset: -20; }
        }
        .yeti-bounce-animation {
          animation: yeti-float 2.4s infinite ease-in-out;
        }
        .active-marker-float {
          animation: marker-float 2s infinite ease-in-out;
        }
        .tooltip-pop-animation {
          animation: tooltip-pop 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .radar-beacon {
          animation: radar-pulse 2s infinite cubic-bezier(0.215, 0.610, 0.355, 1);
        }
        .animated-path-dash {
          animation: path-dash 1.5s infinite linear;
        }
      `}} />

      {/* Decorative snowy ambient background overlay */}
      <div className="absolute top-1.5 right-2 font-mono text-[8px] text-stone-400 font-bold select-none uppercase tracking-widest hidden md:block">
        🗻 SUI ADVENTURE MAP V3 • GPS ACTIVE
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#D67B52] text-white border-2 border-[#3c3c3c] rounded-xl shadow-[2px_2px_0px_0px_#3c3c3c]">
            <Map size={16} />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black font-sans text-[#3c3c3c] uppercase tracking-tight flex items-center gap-1.5">
              <span>Sui Adventure Map</span>
              <span className="text-[9px] bg-amber-500 text-white font-mono px-2 py-0.5 rounded-full border border-[#3c3c3c] normal-case animate-pulse font-black shadow-sm">
                Gamic Playboard
              </span>
            </h3>
            <p className="text-[10px] text-[#6D5D6E] font-medium font-sans">
              Travel along the alpine path. Click any checkpoint to launch learning or quizzes.
            </p>
          </div>
        </div>

        {/* Trail stats meter */}
        <div className="bg-[#E8E1D9]/50 border-2 border-[#3c3c3c] p-2 rounded-xl flex items-center gap-3 min-w-[150px] justify-between shadow-[2px_2px_0px_0px_#3c3c3c]">
          <div className="text-left">
            <span className="text-[9px] font-mono text-stone-600 block uppercase font-black">QUEST MILESTONE</span>
            <span className="text-xs font-mono font-extrabold text-[#3c3c3c]">
              {completedCount} / {totalModules} Cleared
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs font-mono font-black text-[#D67B52]">{progressPercent}%</span>
            <div className="w-16 h-2 bg-stone-200 rounded-full overflow-hidden border border-[#3c3c3c]/30 mt-0.5">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-[#D67B52] transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Map Visual Area */}
      <div className="relative bg-[#B1D3C5]/15 border-2 border-[#3c3c3c] rounded-2xl p-2 sm:p-3 overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-stone-400">
        
        {/* Background Grass and Terrain Texture styling */}
        <div className="absolute inset-0 bg-[#A6CFBE]/10 opacity-70 pointer-events-none" />

        <div className="min-w-[1200px] h-[480px] relative">
          <svg className="absolute inset-0 w-full h-full pointer-events-none select-none">
            {/* Definitions for gorgeous visual filters and gradients */}
            <defs>
              <pattern id="gamic-dots" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="4" cy="4" r="1.5" fill="#2d5241" fillOpacity="0.08" />
              </pattern>
              
              {/* Glowing effects */}
              <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
 
              {/* Rivers & Paths Gradients */}
              <linearGradient id="river-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4A809C" />
                <stop offset="50%" stopColor="#5CA5C6" />
                <stop offset="100%" stopColor="#2E6280" />
              </linearGradient>
 
              <linearGradient id="completed-path-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D67B52" />
              </linearGradient>
            </defs>
 
            {/* Base Grid Texture */}
            <rect width="100%" height="100%" fill="url(#gamic-dots)" rx="12" />
 
            {/* Beautiful Mountains Scenic Backdrop */}
            <g opacity="0.25">
              {/* Mountain 1 */}
              <polygon points="80,240 180,90 280,240" fill="#3A6B54" />
              <polygon points="180,90 145,130 180,150 215,130" fill="#FAF8F5" /> {/* snowy peak */}
              
              {/* Mountain 2 */}
              <polygon points="540,240 660,100 780,240" fill="#3A6B54" />
              <polygon points="660,100 625,140 660,160 695,140" fill="#FAF8F5" /> {/* snowy peak */}
 
              {/* Mountain 3 */}
              <polygon points="950,240 1060,120 1170,240" fill="#2E5C46" />
              <polygon points="1060,120 1030,155 1060,175 1090,155" fill="#FAF8F5" /> {/* snowy peak */}
            </g>
 
            {/* Winding Blue River: "Sui Spring" */}
            <path
              d="M 330 0 C 350 150, 270 300, 300 480"
              fill="none"
              stroke="url(#river-grad)"
              strokeWidth="22"
              strokeLinecap="round"
              opacity="0.95"
            />
            {/* Shimmer water highlights */}
            <path
              d="M 330 0 C 350 150, 270 300, 300 480"
              fill="none"
              stroke="#E0F2FE"
              strokeWidth="2"
              strokeDasharray="12,18"
              opacity="0.4"
            />
 
            {/* Retro wooden bridge graphics crossing the river */}
            <g opacity="0.95">
              <rect x="270" y="220" width="45" height="24" rx="2" fill="#8B4513" stroke="#3c3c3c" strokeWidth="2" />
              {/* bridge steps */}
              <line x1="281" y1="220" x2="281" y2="244" stroke="#D2B48C" strokeWidth="1.5" />
              <line x1="292" y1="220" x2="292" y2="244" stroke="#D2B48C" strokeWidth="1.5" />
              <line x1="303" y1="220" x2="303" y2="244" stroke="#D2B48C" strokeWidth="1.5" />
            </g>
 
            {/* Forests and Nature scenery */}
            {/* Forest Cluster A */}
            <g transform="translate(40, 355)">
              <polygon points="10,0 20,20 0,20" fill="#2d6a4f" stroke="#3c3c3c" strokeWidth="1.5" />
              <polygon points="10,-8 17,10 3,10" fill="#40916c" stroke="#3c3c3c" strokeWidth="1.5" />
              <rect x="8" y="20" width="4" height="6" fill="#8B4513" stroke="#3c3c3c" strokeWidth="1" />
            </g>
            <g transform="translate(70, 375)">
              <polygon points="12,0 24,24 0,24" fill="#1b4332" stroke="#3c3c3c" strokeWidth="1.5" />
              <polygon points="12,-10 20,12 4,12" fill="#2d6a4f" stroke="#3c3c3c" strokeWidth="1.5" />
              <rect x="10" y="24" width="4" height="7" fill="#8B4513" stroke="#3c3c3c" strokeWidth="1" />
            </g>
            <g transform="translate(55, 415)">
              <rect x="0" y="0" width="16" height="6" rx="1.5" fill="#a0522d" stroke="#3c3c3c" strokeWidth="1.2" transform="rotate(-15)" />
              <rect x="2" y="4" width="16" height="6" rx="1.5" fill="#8b4513" stroke="#3c3c3c" strokeWidth="1.2" transform="rotate(10)" />
            </g>
 
            {/* Cute Campfire space */}
            <g transform="translate(440, 108)" className="animate-pulse">
              <line x1="2" y1="18" x2="18" y2="10" stroke="#8b4513" strokeWidth="3" strokeLinecap="round" />
              <line x1="18" y1="18" x2="2" y2="10" stroke="#8b4513" strokeWidth="3" strokeLinecap="round" />
              <path d="M10,2 C10,2 16,8 14,14 C12,18 8,18 6,14 C4,8 10,2 10,2 Z" fill="#ff4500" stroke="#3c3c3c" strokeWidth="1" />
              <path d="M10,6 C10,6 13,10 12,14 C11,16 9,16 8,14 C7,10 10,6 10,6 Z" fill="#ff8c00" />
            </g>
            <text x="430" y="148" className="text-[10px] font-mono font-extrabold fill-stone-700">Yeti Camp</text>
            <circle cx="448" cy="128" r="16" stroke="#D67B52" strokeWidth="1.5" strokeDasharray="3,3" fill="none" opacity="0.4" />
 
            {/* Forest Cluster B */}
            <g transform="translate(820, 68)">
              <polygon points="10,0 20,20 0,20" fill="#2d6a4f" stroke="#3c3c3c" strokeWidth="1.5" />
              <polygon points="10,-8 17,10 3,10" fill="#40916c" stroke="#3c3c3c" strokeWidth="1.5" />
              <rect x="8" y="20" width="4" height="6" fill="#8B4513" stroke="#3c3c3c" strokeWidth="1" />
            </g>
            <g transform="translate(800, 56)">
              <polygon points="12,0 24,18 0,18" fill="#d67b52" stroke="#3c3c3c" strokeWidth="1.5" />
              <polygon points="12,6 20,18 4,18" fill="#eae1d9" stroke="#3c3c3c" strokeWidth="1" />
              <line x1="12" y1="0" x2="12" y2="18" stroke="#3c3c3c" strokeWidth="1" />
            </g>
            <g transform="translate(840, 62)">
              <polygon points="10,0 20,20 0,20" fill="#1b4332" stroke="#3c3c3c" strokeWidth="1.5" />
              <polygon points="10,-8 17,10 3,10" fill="#2d6a4f" stroke="#3c3c3c" strokeWidth="1.5" />
              <rect x="8" y="20" width="4" height="6" fill="#8B4513" stroke="#3c3c3c" strokeWidth="1" />
            </g>

            {/* Forest Cluster C */}
            <g transform="translate(1100, 290)">
              <line x1="5" y1="0" x2="5" y2="28" stroke="#3c3c3c" strokeWidth="2" strokeLinecap="round" />
              <polygon points="5,2 25,7 5,12" fill="#89a8b2" stroke="#3c3c3c" strokeWidth="1.5" />
              <circle cx="5" cy="0" r="2.5" fill="#3c3c3c" />
            </g>
            <text x="1115" y="335" className="text-[10px] font-mono font-black fill-stone-700">Sui Peak</text>

            {/* Connecting paths segment-by-segment with glowing neon states */}
            {modules.map((_, index) => {
              if (index === totalModules - 1) return null;
              const mod1 = modules[index];
              const isCompleted = completedModules.includes(mod1.id);
              const isNextUnlocked = completedModules.includes(mod1.id) || index === 0;
              const pathD = getPathD(index);

              return (
                <g key={`path-${index}`}>
                  {/* Outer shadow / track groove */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#1E3E30"
                    strokeWidth="7"
                    strokeLinecap="round"
                    opacity="0.15"
                  />
                  
                  {/* Underlay dash background */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#3c3c3c"
                    strokeWidth="3.5"
                    strokeDasharray="6,6"
                    strokeLinecap="round"
                    opacity="0.3"
                  />

                  {/* Animated dash line for next-to-solve pathway */}
                  {isNextUnlocked && !isCompleted && (
                    <path
                      d={pathD}
                      fill="none"
                      stroke="#89A8B2"
                      strokeWidth="3"
                      strokeDasharray="5,5"
                      strokeLinecap="round"
                      className="animated-path-dash"
                      style={{ strokeDashoffset: 1 }}
                    />
                  )}
                  
                  {/* Filled highlighted golden path as modules are completed */}
                  {isCompleted && (
                    <g filter="url(#neon-glow)">
                      <path
                        d={pathD}
                        fill="none"
                        stroke="url(#completed-path-grad)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-in-out"
                      />
                    </g>
                  )}
                </g>
              );
            })}

            {/* Landmark Label Signboards */}
            <text x="180" y="325" className="text-[9px] font-mono font-black fill-[#3C5B4E] tracking-widest uppercase">1. Mallow Cabin</text>
            <text x="500" y="325" className="text-[9px] font-mono font-black fill-[#3C5B4E] tracking-widest uppercase">3. Smart Orchard</text>
            <text x="820" y="325" className="text-[9px] font-mono font-black fill-[#3C5B4E] tracking-widest uppercase">5. Consensus Castle</text>
            <text x="1100" y="325" className="text-[9px] font-mono font-black fill-[#3C5B4E] tracking-widest uppercase">7. Yeti Citadel</text>
          </svg>

          {/* Render Interactive Nodes as styled HTML overlays */}
          {modules.map((mod, index) => {
            const coord = getCoordinates(index);
            const isCompleted = completedModules.includes(mod.id);
            const isActive = mod.id === activeModuleId;
            const isYetiSitting = index === currentYetiIndex;

            // Determine state colors
            let nodeBg = "bg-white";
            let nodeBorder = "border-[#3c3c3c]";
            let textColor = "text-[#3c3c3c]";
            let glowAccent = "";

            const requiredXp = mod.requiredXp || 0;
            const isXpLocked = userXp !== undefined && requiredXp > 0 && userXp < requiredXp;

            if (isXpLocked) {
              nodeBg = "bg-stone-200 opacity-60";
              nodeBorder = "border-stone-300 border-b-2";
              textColor = "text-stone-400";
              glowAccent = "cursor-not-allowed";
            } else if (isCompleted) {
              nodeBg = "bg-gradient-to-br from-amber-400 to-amber-500";
              nodeBorder = "border-[#3c3c3c] border-b-4 shadow-[1px_2px_0px_0px_rgba(0,0,0,0.3)]";
              textColor = "text-white";
              glowAccent = "ring-4 ring-amber-400/20";
            } else if (isActive) {
              nodeBg = "bg-[#89A8B2]";
              nodeBorder = "border-[#3c3c3c] border-b-4";
              textColor = "text-white";
              glowAccent = "ring-4 ring-[#89A8B2]/30 animate-pulse";
            } else {
              nodeBg = "bg-stone-50";
              nodeBorder = "border-stone-400 border-b-4 shadow-sm";
              textColor = "text-stone-400";
            }

            return (
              <div
                key={mod.id}
                className="absolute"
                style={{
                  left: `${coord.x}px`,
                  top: `${coord.y}px`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* Active radar beacon ripple underneath the current node */}
                {isActive && (
                  <span className="absolute w-16 h-16 bg-[#89A8B2] rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 radar-beacon pointer-events-none z-0" />
                )}

                {/* Cute Animated Yeti Mascot sitting on the active or current node */}
                {isYetiSitting && (
                  <div
                    className="absolute -top-[58px] left-1/2 -translate-x-1/2 z-10 select-none pointer-events-none flex flex-col items-center yeti-bounce-animation"
                  >
                    {/* Tiny speech bubble next to Yeti */}
                    <div className="bg-white border border-[#3c3c3c] px-1.5 py-0.5 rounded-md text-[7px] font-mono font-bold text-[#3c3c3c] shadow-sm mb-1 whitespace-nowrap">
                      Cozy camp here!
                    </div>
                    <img 
                      src={YETI_BADGE_ASSET} 
                      alt="You" 
                      className="w-10 h-10 rounded-full border-2 border-[#D67B52] shadow-md object-cover bg-white pointer-events-none" 
                      referrerPolicy="no-referrer"
                    />
                    <span className="bg-[#D67B52] text-white text-[7px] font-mono font-black px-1.5 py-0.2 rounded border border-[#FAF8F5] uppercase tracking-wider mt-1 shadow-md whitespace-nowrap">
                      YOU
                    </span>
                  </div>
                )}

                {/* Floating wrapper for active/unlocked checkpoints */}
                <div className={isActive && !isXpLocked ? "active-marker-float" : ""}>
                  {/* Node circle wrapper - styled as a beautiful game token coin */}
                  <button
                    onClick={() => onSelectModule(mod)}
                    onMouseEnter={() => setHoveredModId(mod.id)}
                    onMouseLeave={() => setHoveredModId(null)}
                    className={`w-12 h-12 rounded-full flex flex-col items-center justify-center border-2 font-mono cursor-pointer transition-all duration-300 hover:scale-120 hover:rotate-6 hover:shadow-xl z-10 ${nodeBg} ${nodeBorder} ${textColor} ${glowAccent} relative`}
                    id={`trail-node-${mod.id}`}
                  >
                    {isXpLocked ? (
                      <Lock size={12} className="text-stone-400" />
                    ) : isCompleted ? (
                      <Star size={14} className="text-amber-500 fill-amber-300 drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)] animate-pulse" />
                    ) : (
                      <span className="text-[11px] font-black">{index + 1}</span>
                    )}

                    {/* Completion checkmark badge or golden frame rim */}
                    {isCompleted && !isXpLocked && (
                      <span className="absolute -bottom-1 -right-1 bg-amber-500 text-white rounded-full border border-[#3c3c3c] p-0.5 shadow-sm">
                        <CheckCircle2 size={8} fill="currentColor" className="text-amber-100" />
                      </span>
                    )}
                  </button>
                </div>

                {/* Visual Label below node */}
                <span className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-mono font-extrabold text-[#3c3c3c] bg-white/95 px-1.5 py-0.5 rounded-md border border-[#3c3c3c]/15 max-w-[110px] truncate text-center shadow-sm">
                  {mod.title}
                </span>

                {/* Styled tooltip overlay */}
                {hoveredModId === mod.id && (
                  <div
                    className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 w-52 p-3 bg-white border-2 border-[#3c3c3c] rounded-xl shadow-[4px_4px_0px_0px_#3c3c3c] text-left tooltip-pop-animation"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[8px] font-mono font-black text-[#D67B52] uppercase tracking-wider">
                        Checkpoint {index + 1}
                      </span>
                      {isXpLocked ? (
                        <span className="text-[8px] font-mono font-bold text-rose-600 bg-rose-50 px-1 rounded border border-rose-300">
                          LOCKED: {requiredXp} XP
                        </span>
                      ) : isCompleted ? (
                        <span className="text-[8px] font-mono font-bold text-emerald-600 bg-emerald-50 px-1 rounded border border-emerald-300">
                          COMPLETED
                        </span>
                      ) : (
                        <span className="text-[8px] font-mono font-bold text-stone-500 bg-stone-100 px-1 rounded border border-stone-300">
                          UNLOCKED
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-[#3c3c3c] mb-1 font-sans">{mod.title}</h4>
                    <p className="text-[9px] text-[#6D5D6E] leading-relaxed mb-2 font-medium">
                      {mod.description}
                    </p>
                    <div className="flex items-center justify-between border-t border-dashed border-[#3c3c3c]/10 pt-1.5 font-mono text-[9px]">
                      <span className="text-stone-400">
                        {isXpLocked ? `Requires ${requiredXp} XP` : "Reward:"}
                      </span>
                      <span className="text-[#D67B52] font-black">
                        {isXpLocked ? `(You have ${userXp})` : `${mod.steps.length * 10 + mod.xpValue} XP`}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Guidance note */}
      <div className="mt-3 flex items-center justify-between bg-white/60 p-2 rounded-xl border border-[#3c3c3c]/10 text-[9px] font-mono text-[#6D5D6E]">
        <span className="flex items-center gap-1">
          <Sparkles size={11} className="text-[#D67B52]" />
          <span>Light up the connection lines by proving your smart contract capability!</span>
        </span>
        <span className="hidden sm:inline">Cozy campfires are warm.</span>
      </div>
    </div>
  );
}
