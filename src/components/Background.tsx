import React from "react";
import { motion } from "motion/react";

export default function Background() {
  // Generate coordinates for random grid blinking / pulsing boxes
  const glowingGridIndices = [5, 12, 18, 26, 31, 38, 45, 53, 58];

  // Whimsical drifting lo-fi particles/notes for an extra dreamy and animated background atmosphere
  const particles = [
    { label: "🎵", size: "text-base sm:text-lg", x: "10%", y: "20%", delay: 0, duration: 25 },
    { label: "☕", size: "text-lg sm:text-xl", x: "85%", y: "15%", delay: 3, duration: 28 },
    { label: "✨", size: "text-xs sm:text-sm", x: "70%", y: "45%", delay: 5, duration: 22 },
    { label: "⭐", size: "text-[10px] sm:text-xs", x: "15%", y: "75%", delay: 2, duration: 18 },
    { label: "☁️", size: "text-xl sm:text-2xl", x: "40%", y: "12%", delay: 7, duration: 32 },
    { label: "🎧", size: "text-xs sm:text-sm", x: "92%", y: "65%", delay: 1, duration: 24 },
    { label: "✏️", size: "text-[10px] sm:text-xs", x: "50%", y: "85%", delay: 4, duration: 20 },
    { label: "🐚", size: "text-[10px] sm:text-xs", x: "6%", y: "45%", delay: 8, duration: 26 },
  ];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 select-none">
      {/* Subtle sweeping retro laser grid lines / line animations in background */}
      <motion.div 
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#89A8B2]/25 dark:via-[#df7345]/20 to-transparent filter blur-[1px]"
        initial={{ y: "-10vh" }}
        animate={{ y: "110vh" }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div 
        className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D67B52]/15 dark:via-[#668894]/15 to-transparent filter blur-[0.5px]"
        initial={{ y: "-20vh" }}
        animate={{ y: "110vh" }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "linear",
          delay: 5,
        }}
      />
      <motion.div 
        className="absolute top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-transparent via-[#89A8B2]/15 dark:via-[#df7345]/10 to-transparent filter blur-[1px]"
        initial={{ x: "-10vw" }}
        animate={{ x: "110vw" }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
          delay: 2,
        }}
      />

      {/* 1. Multiple slow drifting, blending background ambient glow orbs with interactive scaling */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#E8A0BF]/15 dark:bg-[#3C459A]/10 blur-3xl"
        animate={{
          x: [0, 80, -50, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.25, 0.85, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div 
        className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-[#89A8B2]/12 dark:bg-[#D67B52]/5 blur-3xl"
        animate={{
          x: [0, -90, 60, 0],
          y: [0, 70, -50, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div 
        className="absolute top-10 right-10 w-64 h-64 rounded-full bg-[#D67B52]/10 dark:bg-zinc-800/20 blur-3xl"
        animate={{
          x: [0, -40, 40, 0],
          y: [0, 50, -30, 0],
          scale: [1, 0.9, 1.2, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* 2. Floating whimsy elements floating up and down with random rotations */}
      {particles.map((p, idx) => (
        <motion.div
          key={idx}
          className={`absolute ${p.size} opacity-40 dark:opacity-30`}
          style={{ left: p.x, top: p.y }}
          animate={{
            y: [0, -25, 15, 0],
            x: [0, 15, -10, 0],
            rotate: [0, 20, -20, 0],
            scale: [1, 1.12, 0.93, 1]
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {p.label}
        </motion.div>
      ))}

      <svg 
        className="absolute inset-0 w-full h-full opacity-40 dark:opacity-20 transition-opacity duration-500" 
        viewBox="0 0 960 637" 
        preserveAspectRatio="xMidYMid slice" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#bg-filter-blur)">
          {/* Radial blur orb behind the grid that slowly orbits */}
          <motion.ellipse 
            cx="480" 
            cy="318" 
            rx="160" 
            ry="160" 
            className="fill-[#D67B52]/20 dark:fill-[#3C459A]/30"
            animate={{
              x: [0, 40, -30, 0],
              y: [0, -30, 40, 0],
              scale: [1, 1.15, 0.9, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </g>
        
        <mask id="grid-fade-mask" maskUnits="userSpaceOnUse" x="0" y="32" width="960" height="573">
          <rect y="32" width="960" height="573" fill="url(#mask-radial-gradient)"></rect>
        </mask>

        <g mask="url(#grid-fade-mask)" className="stroke-[#3c3c3c]/15 dark:stroke-zinc-100/10">
          {/* Row 1 */}
          <rect x="123.5" y="41.5" width="79" height="79" />
          <rect x="202.5" y="41.5" width="79" height="79" />
          <rect x="281.5" y="41.5" width="79" height="79" />
          <rect x="360.5" y="41.5" width="79" height="79" />
          <rect x="439.5" y="41.5" width="79" height="79" />
          <rect x="518.5" y="41.5" width="79" height="79" />
          
          <motion.rect 
            x="597.5" y="41.5" width="79" height="79" 
            className="fill-[#D67B52]/10 dark:fill-indigo-500/10"
            animate={{ opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <rect x="676.5" y="41.5" width="79" height="79" />
          <rect x="755.5" y="41.5" width="79" height="79" />

          {/* Row 2 */}
          <rect x="123.5" y="120.5" width="79" height="79" />
          <rect x="202.5" y="120.5" width="79" height="79" />
          <rect x="281.5" y="120.5" width="79" height="79" />
          <rect x="360.5" y="120.5" width="79" height="79" />
          <rect x="439.5" y="120.5" width="79" height="79" />
          
          <motion.rect 
            x="518.5" y="120.5" width="79" height="79" 
            className="fill-[#89A8B2]/15 dark:fill-emerald-500/10"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <rect x="597.5" y="120.5" width="79" height="79" />
          <rect x="676.5" y="120.5" width="79" height="79" />
          <rect x="755.5" y="120.5" width="79" height="79" />

          {/* Row 3 */}
          <rect x="123.5" y="199.5" width="79" height="79" />
          <rect x="202.5" y="199.5" width="79" height="79" />
          <rect x="281.5" y="199.5" width="79" height="79" />
          <rect x="360.5" y="199.5" width="79" height="79" />
          
          <motion.rect 
            x="439.5" y="199.5" width="79" height="79" 
            className="fill-amber-500/10 dark:fill-amber-400/10"
            animate={{ opacity: [0.1, 0.45, 0.1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <rect x="518.5" y="199.5" width="79" height="79" />
          
          <motion.rect 
            x="597.5" y="199.5" width="79" height="79" 
            className="fill-bento-purple/10 dark:fill-purple-500/10"
            animate={{ opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <rect x="676.5" y="199.5" width="79" height="79" />
          <rect x="755.5" y="199.5" width="79" height="79" />

          {/* Row 4 */}
          <rect x="123.5" y="278.5" width="79" height="79" />
          <rect x="202.5" y="278.5" width="79" height="79" />
          <rect x="281.5" y="278.5" width="79" height="79" />
          <rect x="360.5" y="278.5" width="79" height="79" />
          <rect x="439.5" y="278.5" width="79" height="79" />
          <rect x="518.5" y="278.5" width="79" height="79" />
          <rect x="597.5" y="278.5" width="79" height="79" />
          <rect x="676.5" y="278.5" width="79" height="79" />
          <rect x="755.5" y="278.5" width="79" height="79" />

          {/* Row 5 */}
          <rect x="123.5" y="357.5" width="79" height="79" />
          <rect x="202.5" y="357.5" width="79" height="79" />
          <rect x="281.5" y="357.5" width="79" height="79" />
          
          <motion.rect 
            x="360.5" y="357.5" width="79" height="79" 
            className="fill-indigo-500/10 dark:fill-blue-400/10"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />
          <rect x="439.5" y="357.5" width="79" height="79" />
          <rect x="518.5" y="357.5" width="79" height="79" />
          <rect x="597.5" y="357.5" width="79" height="79" />
          <rect x="676.5" y="357.5" width="79" height="79" />
          
          <motion.rect 
            x="755.5" y="357.5" width="79" height="79" 
            className="fill-[#D67B52]/10 dark:fill-red-500/10"
            animate={{ opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />

          {/* Row 6 */}
          <rect x="123.5" y="436.5" width="79" height="79" />
          <rect x="202.5" y="436.5" width="79" height="79" />
          <rect x="281.5" y="436.5" width="79" height="79" />
          <rect x="360.5" y="436.5" width="79" height="79" />
          <rect x="439.5" y="436.5" width="79" height="79" />
          <rect x="518.5" y="436.5" width="79" height="79" />
          <rect x="597.5" y="436.5" width="79" height="79" />
          <rect x="676.5" y="436.5" width="79" height="79" />
          <rect x="755.5" y="436.5" width="79" height="79" />

          {/* Row 7 */}
          <motion.rect 
            x="123.5" y="515.5" width="79" height="79" 
            className="fill-[#89A8B2]/10 dark:fill-emerald-400/10"
            animate={{ opacity: [0.08, 0.32, 0.08] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 2.2 }}
          />
          <rect x="202.5" y="515.5" width="79" height="79" />
          <rect x="281.5" y="515.5" width="79" height="79" />
          <rect x="360.5" y="515.5" width="79" height="79" />
          <rect x="439.5" y="515.5" width="79" height="79" />
          <rect x="518.5" y="515.5" width="79" height="79" />
          <rect x="597.5" y="515.5" width="79" height="79" />
          <rect x="676.5" y="515.5" width="79" height="79" />
          <rect x="755.5" y="515.5" width="79" height="79" />
          <rect x="834.5" y="515.5" width="79" height="79" />
          
          <motion.rect 
            x="913.5" y="515.5" width="79" height="79" 
            className="fill-indigo-500/10 dark:fill-indigo-400/10"
            animate={{ opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>

        <defs>
          <filter id="bg-filter-blur" x="120" y="-40" width="720" height="720" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur" />
          </filter>
          <radialGradient id="paint0_radial_fallback" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(480 318.5) rotate(90) scale(353.19 591.732)">
            <stop stopColor="#D9D9D9" stopOpacity="0.4" />
            <stop offset="0.80" stopColor="#D9D9D9" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="mask-radial-gradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(480 318.5) rotate(90) scale(353.19 591.732)">
            <stop stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="0.8" stopColor="#ffffff" stopOpacity="0.0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
