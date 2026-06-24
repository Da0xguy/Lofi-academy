import React, { useRef } from "react";
import { motion, useAnimationFrame } from "motion/react";
import { Music, Coffee, Sparkles, Star, Cloud, Headphones, PenLine, Compass } from "lucide-react";

export default function Background() {
  // Generate coordinates for random grid blinking / pulsing boxes
  const glowingGridIndices = [5, 12, 18, 26, 31, 38, 45, 53, 58];

  // Whimsical drifting lo-fi particles/notes for useAnimationFrame mapping
  const particles = [
    { icon: Music, color: "text-blue-400", size: 16, x: "10%", y: "20%", speedX: 0.0004, speedY: 0.0003, ampX: 25, ampY: 15 },
    { icon: Coffee, color: "text-amber-500", size: 18, x: "85%", y: "15%", speedX: -0.0003, speedY: 0.0005, ampX: 20, ampY: 30 },
    { icon: Sparkles, color: "text-yellow-400", size: 14, x: "70%", y: "45%", speedX: 0.0005, speedY: -0.0004, ampX: 30, ampY: 20 },
    { icon: Star, color: "text-amber-400", size: 12, x: "15%", y: "75%", speedX: -0.0005, speedY: -0.0003, ampX: 15, ampY: 15 },
    { icon: Cloud, color: "text-blue-100", size: 22, x: "40%", y: "12%", speedX: 0.0002, speedY: 0.0002, ampX: 40, ampY: 25 },
    { icon: Headphones, color: "text-purple-400", size: 14, x: "92%", y: "65%", speedX: 0.0003, speedY: 0.0004, ampX: 20, ampY: 20 },
    { icon: PenLine, color: "text-[#D67B52]", size: 12, x: "50%", y: "85%", speedX: -0.0004, speedY: 0.0002, ampX: 25, ampY: 15 },
    { icon: Compass, color: "text-emerald-400", size: 14, x: "6%", y: "45%", speedX: 0.0003, speedY: -0.0005, ampX: 20, ampY: 25 },
  ];

  // Refs for useAnimationFrame targeting to avoid re-renders
  const particleRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);

  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  // useAnimationFrame high performance continuous layout rendering
  useAnimationFrame((time) => {
    // 1. Drifting particles with sine/cosine wave patterns
    particles.forEach((p, i) => {
      const ref = particleRefs[i];
      if (ref.current) {
        const dx = Math.sin(time * p.speedX) * p.ampX;
        const dy = Math.cos(time * p.speedY) * p.ampY;
        const r = Math.sin(time * 0.0005) * 20;
        ref.current.style.transform = `translate3d(${dx}px, ${dy}px, 0) rotate(${r}deg)`;
      }
    });

    // 2. Continuous sweeping laser grid lines
    if (line1Ref.current) {
      const y1 = ((time * 0.02) % 120) - 10; // loops cleanly from -10vh to 110vh
      line1Ref.current.style.transform = `translate3d(0, ${y1}vh, 0)`;
    }
    if (line2Ref.current) {
      const y2 = (((time * 0.013) + 400) % 120) - 10;
      line2Ref.current.style.transform = `translate3d(0, ${y2}vh, 0)`;
    }
    if (line3Ref.current) {
      const x3 = (((time * 0.01) + 200) % 120) - 10;
      line3Ref.current.style.transform = `translate3d(${x3}vw, 0, 0)`;
    }

    // 3. Ambient orbs slow orbit scaling
    if (orb1Ref.current) {
      const o1x = Math.sin(time * 0.0001) * 80;
      const o1y = Math.cos(time * 0.0001) * 60;
      const o1s = 1 + Math.sin(time * 0.0002) * 0.2;
      orb1Ref.current.style.transform = `translate3d(${o1x}px, ${o1y}px, 0) scale(${o1s})`;
    }
    if (orb2Ref.current) {
      const o2x = Math.cos(time * 0.00008) * 90;
      const o2y = Math.sin(time * 0.00008) * 70;
      const o2s = 1 + Math.cos(time * 0.00015) * 0.15;
      orb2Ref.current.style.transform = `translate3d(${o2x}px, ${o2y}px, 0) scale(${o2s})`;
    }
    if (orb3Ref.current) {
      const o3x = Math.sin(time * 0.00012) * 40;
      const o3y = Math.cos(time * 0.00012) * 50;
      const o3s = 1 + Math.sin(time * 0.0001) * 0.2;
      orb3Ref.current.style.transform = `translate3d(${o3x}px, ${o3y}px, 0) scale(${o3s})`;
    }
  });

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 select-none">
      {/* Subtle sweeping retro laser grid lines / line animations in background (powered by useAnimationFrame) */}
      <div 
        ref={line1Ref}
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#89A8B2]/25 dark:via-[#df7345]/20 to-transparent filter blur-[1px] will-change-transform"
        style={{ transform: "translate3d(0, -10vh, 0)" }}
      />
      <div 
        ref={line2Ref}
        className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D67B52]/15 dark:via-[#668894]/15 to-transparent filter blur-[0.5px] will-change-transform"
        style={{ transform: "translate3d(0, -20vh, 0)" }}
      />
      <div 
        ref={line3Ref}
        className="absolute top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-transparent via-[#89A8B2]/15 dark:via-[#df7345]/10 to-transparent filter blur-[1px] will-change-transform"
        style={{ transform: "translate3d(-10vw, 0, 0)" }}
      />

      {/* 1. Multiple slow drifting, blending background ambient glow orbs with useAnimationFrame scaling */}
      <div 
        ref={orb1Ref}
        className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#E8A0BF]/15 dark:bg-[#3C459A]/10 blur-3xl will-change-transform"
      />

      <div 
        ref={orb2Ref}
        className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-[#89A8B2]/12 dark:bg-[#D67B52]/5 blur-3xl will-change-transform"
      />

      <div 
        ref={orb3Ref}
        className="absolute top-10 right-10 w-64 h-64 rounded-full bg-[#D67B52]/10 dark:bg-zinc-800/20 blur-3xl will-change-transform"
      />

      {/* 2. Floating whimsy elements floating up and down with useAnimationFrame */}
      {particles.map((p, idx) => {
        const IconComponent = p.icon;
        return (
          <div
            key={idx}
            ref={particleRefs[idx]}
            className="absolute opacity-40 dark:opacity-30 will-change-transform"
            style={{ left: p.x, top: p.y }}
          >
            <IconComponent size={p.size} className={p.color} />
          </div>
        );
      })}

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
