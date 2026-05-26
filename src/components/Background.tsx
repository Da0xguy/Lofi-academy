import React from "react";
import { motion } from "motion/react";

export default function Background() {
  // Generate coordinates for random grid blinking / pulsing boxes
  const glowingGridIndices = [5, 12, 18, 26, 31, 38, 45, 53, 58];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 select-none">
      <svg 
        className="absolute inset-0 w-full h-full opacity-30 dark:opacity-20 transition-opacity duration-500" 
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
            className="fill-bento-terracotta/30 dark:fill-[#3C459A]/30"
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
            <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur" />
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
