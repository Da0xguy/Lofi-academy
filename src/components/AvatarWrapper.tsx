import React from "react";

interface AvatarWrapperProps {
  avatar: string;
  className?: string;
  size?: number;
}

// Map possible emoji strings or mascot string identifiers to clean, colorful vector SVGs
export function getMascotSvg(idOrEmoji: string): React.ReactNode {
  const norm = (idOrEmoji || "").trim().toLowerCase();

  // 1. YETI / BEAR
  if (norm === "yeti" || norm === "🐻" || norm === "bear") {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="#89A8B2" stroke="#3c3c3c" strokeWidth="3" />
        <path d="M 28 42 H 72 V 76 Q 50 88 28 76 Z" fill="#ffffff" stroke="#3c3c3c" strokeWidth="3" />
        {/* Beanie Hat */}
        <path d="M 24 45 Q 50 18 76 45 Z" fill="#D67B52" stroke="#3c3c3c" strokeWidth="3" />
        <rect x="20" y="40" width="60" height="10" rx="5" fill="#f8f5f2" stroke="#3c3c3c" strokeWidth="3" />
        <circle cx="50" cy="22" r="8" fill="#f8f5f2" stroke="#3c3c3c" strokeWidth="2.5" />
        {/* Soft closed eyes */}
        <path d="M 36 56 Q 42 54 44 58" fill="none" stroke="#3c3c3c" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 64 56 Q 58 54 56 58" fill="none" stroke="#3c3c3c" strokeWidth="2.5" strokeLinecap="round" />
        {/* Cute blush cheeks */}
        <circle cx="34" cy="64" r="4" fill="#E8A0BF" opacity="0.8" />
        <circle cx="66" cy="64" r="4" fill="#E8A0BF" opacity="0.8" />
        <path d="M 47 64 Q 50 67 53 64" fill="none" stroke="#3c3c3c" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  // 2. OWL / BIRD
  if (norm === "owl" || norm === "🦉" || norm === "bird") {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="#E8A0BF" stroke="#3c3c3c" strokeWidth="3" />
        {/* Body */}
        <circle cx="50" cy="55" r="28" fill="#7D6F80" stroke="#3c3c3c" strokeWidth="3" />
        <circle cx="50" cy="56" r="20" fill="#f8f5f2" />
        {/* Big cozy spectacles */}
        <circle cx="38" cy="46" r="10" fill="none" stroke="#3c3c3c" strokeWidth="3.5" />
        <circle cx="62" cy="46" r="10" fill="none" stroke="#3c3c3c" strokeWidth="3.5" />
        <line x1="48" y1="46" x2="52" y2="46" stroke="#3c3c3c" strokeWidth="3.5" />
        {/* Eyes inside glasses */}
        <circle cx="38" cy="46" r="3" fill="#3c3c3c" />
        <circle cx="62" cy="46" r="3" fill="#3c3c3c" />
        {/* Orange Beak */}
        <polygon points="50,52 46,58 54,58" fill="#D67B52" stroke="#3c3c3c" strokeWidth="2" />
      </svg>
    );
  }

  // 3. SECURE CAT / CHILLY KITTEN
  if (norm === "cat" || norm === "🐱" || norm === "kitten") {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="#B9D7EA" stroke="#3c3c3c" strokeWidth="3" />
        {/* Ears */}
        <polygon points="22,46 16,16 42,32" fill="#E8E1D9" stroke="#3c3c3c" strokeWidth="2.5" />
        <polygon points="78,46 84,16 58,32" fill="#E8E1D9" stroke="#3c3c3c" strokeWidth="2.5" />
        {/* Face */}
        <circle cx="50" cy="56" r="30" fill="#F3EFEA" stroke="#3c3c3c" strokeWidth="3" />
        <circle cx="42" cy="54" r="3.5" fill="#3c3c3c" />
        <circle cx="58" cy="54" r="3.5" fill="#3c3c3c"/>
        <circle cx="36" cy="59" r="3" fill="#E8A0BF" opacity="0.8" />
        <circle cx="64" cy="59" r="3" fill="#E8A0BF" opacity="0.8" />
        <polygon points="50,59 47,62 53,62" fill="#D67B52" />
        {/* Cozy whiskers */}
        <line x1="28" y1="62" x2="16" y2="60" stroke="#3c3c3c" strokeWidth="2" />
        <line x1="28" y1="65" x2="16" y2="66" stroke="#3c3c3c" strokeWidth="2" />
        <line x1="72" y1="62" x2="84" y2="60" stroke="#3c3c3c" strokeWidth="2" />
        <line x1="72" y1="65" x2="84" y2="66" stroke="#3c3c3c" strokeWidth="2" />
      </svg>
    );
  }

  // 4. CHILLY DOG / SNUG PUPPY
  if (norm === "dog" || norm === "🐶" || norm === "puppy" || norm === "otter" || norm === "🦦") {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="#E8E1D9" stroke="#3c3c3c" strokeWidth="3" />
        {/* Floppy ears */}
        <path d="M 12 36 Q 4 60 16 70 Z" fill="#B2A496" stroke="#3c3c3c" strokeWidth="2.5" />
        <path d="M 88 36 Q 96 60 84 70 Z" fill="#B2A496" stroke="#3c3c3c" strokeWidth="2.5" />
        <circle cx="50" cy="54" r="28" fill="#ffffff" stroke="#3c3c3c" strokeWidth="3" />
        <circle cx="41" cy="50" r="4" fill="#3c3c3c" />
        <circle cx="59" cy="50" r="4" fill="#3c3c3c" />
        {/* Heart shaped snout */}
        <ellipse cx="50" cy="58" rx="7" ry="5" fill="#f8f5f2" stroke="#3c3c3c" strokeWidth="1.5" />
        <circle cx="50" cy="56" r="3" fill="#3c3c3c" />
        <path d="M 50 59 Q 50 63 47 64" fill="none" stroke="#3c3c3c" strokeWidth="2" />
        <path d="M 50 59 Q 50 63 53 64" fill="none" stroke="#3c3c3c" strokeWidth="2" />
      </svg>
    );
  }

  // 5. SLEEPY PANDA / BEAR
  if (norm === "panda" || norm === "🐼" || norm === "lion" || norm === "🦁") {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="#F1F3F5" stroke="#3c3c3c" strokeWidth="3" />
        {/* Ears */}
        <circle cx="24" cy="28" r="10" fill="#3c3c3c" stroke="#3c3c3c" strokeWidth="2" />
        <circle cx="76" cy="28" r="10" fill="#3c3c3c" stroke="#3c3c3c" strokeWidth="2" />
        {/* Face */}
        <circle cx="50" cy="56" r="32" fill="#ffffff" stroke="#3c3c3c" strokeWidth="3" />
        {/* Big eye patches */}
        <ellipse cx="38" cy="52" rx="7" ry="9" fill="#3c3c3c" transform="rotate(-15, 38, 52)" />
        <ellipse cx="62" cy="52" rx="7" ry="9" fill="#3c3c3c" transform="rotate(15, 62, 52)" />
        {/* White eyes inside */}
        <circle cx="39" cy="50" r="2.2" fill="#ffffff" />
        <circle cx="61" cy="50" r="2.2" fill="#ffffff" />
        {/* Snout */}
        <ellipse cx="50" cy="62" rx="4" ry="3" fill="#3c3c3c" />
        <circle cx="32" cy="64" r="3.5" fill="#E8A0BF" opacity="0.6" />
        <circle cx="68" cy="64" r="3.5" fill="#E8A0BF" opacity="0.6" />
      </svg>
    );
  }

  // 6. CHILLY PENGUIN
  if (norm === "penguin" || norm === "🐧") {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="#3c3c3c" stroke="#3c3c3c" strokeWidth="3" />
        {/* Face plate */}
        <ellipse cx="50" cy="55" rx="26" ry="24" fill="#ffffff" stroke="#3c3c3c" strokeWidth="2" />
        <circle cx="41" cy="46" r="3.5" fill="#3c3c3c" />
        <circle cx="59" cy="46" r="3.5" fill="#3c3c3c" />
        {/* Beak */}
        <polygon points="50,49 45,55 55,55" fill="#D67B52" stroke="#3c3c3c" strokeWidth="1.5" />
        {/* Scarf */}
        <rect x="28" y="66" width="44" height="10" rx="5" fill="#E8A0BF" stroke="#3c3c3c" strokeWidth="2" />
        <path d="M 60 74 L 60 88 H 68 L 68 74 Z" fill="#E8A0BF" stroke="#3c3c3c" strokeWidth="2" />
      </svg>
    );
  }

  // 7. WINTER BUNNY / RABBIT
  if (norm === "bunny" || norm === "rabbit" || norm === "🐰") {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="#FFFBF7" stroke="#3c3c3c" strokeWidth="3" />
        {/* Tall Ears */}
        <path d="M 30 38 Q 24 6 36 12 Q 44 26 38 42" fill="#ffffff" stroke="#3c3c3c" strokeWidth="2.5" />
        <path d="M 28 26 Q 26 12 32 15 Q 36 22 34 32" fill="#E8A0BF" opacity="0.6" />
        <path d="M 70 38 Q 76 6 64 12 Q 56 26 62 42" fill="#ffffff" stroke="#3c3c3c" strokeWidth="2.5" />
        <path d="M 72 26 Q 74 12 68 15 Q 64 22 66 32" fill="#E8A0BF" opacity="0.6" />
        {/* Face */}
        <circle cx="50" cy="62" r="26" fill="#ffffff" stroke="#3c3c3c" strokeWidth="3" />
        <circle cx="42" cy="59" r="3" fill="#3c3c3c" />
        <circle cx="58" cy="59" r="3" fill="#3c3c3c" />
        <polygon points="50,64 48,66 52,66" fill="#D67B52" />
        {/* Rosy cheeks */}
        <circle cx="34" cy="66" r="3" fill="#E8A0BF" opacity="0.8" />
        <circle cx="66" cy="66" r="3" fill="#E8A0BF" opacity="0.8" />
      </svg>
    );
  }

  // 8. COZY KOALA
  if (norm === "koala" || norm === "🐨") {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="#90A4AE" stroke="#3c3c3c" strokeWidth="3" />
        {/* Fluffy ears */}
        <circle cx="20" cy="38" r="14" fill="#CFD8DC" stroke="#3c3c3c" strokeWidth="2.5" />
        <circle cx="20" cy="38" r="8" fill="#ECEFF1" />
        <circle cx="80" cy="38" r="14" fill="#CFD8DC" stroke="#3c3c3c" strokeWidth="2.5" />
        <circle cx="80" cy="38" r="8" fill="#ECEFF1" />
        {/* Head */}
        <circle cx="50" cy="56" r="28" fill="#CFD8DC" stroke="#3c3c3c" strokeWidth="3" />
        <circle cx="40" cy="51" r="3.5" fill="#3c3c3c" />
        <circle cx="60" cy="51" r="3.5" fill="#3c3c3c" />
        {/* Big Koala Nose */}
        <rect x="44" y="52" width="12" height="18" rx="6" fill="#455A64" stroke="#3c3c3c" strokeWidth="1.5" />
        <circle cx="32" cy="58" r="3.5" fill="#E8A0BF" opacity="0.8" />
        <circle cx="68" cy="58" r="3.5" fill="#E8A0BF" opacity="0.8" />
      </svg>
    );
  }

  // 9. WARM FOX
  if (norm === "fox" || norm === "🦊") {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="#D67B52" stroke="#3c3c3c" strokeWidth="3" />
        {/* Ears */}
        <polygon points="18,36 12,6 38,24" fill="#D67B52" stroke="#3c3c3c" strokeWidth="2.5" />
        <polygon points="17,14 26,22 19,25" fill="#3c3c3c" />
        <polygon points="82,36 88,6 62,24" fill="#D67B52" stroke="#3c3c3c" strokeWidth="2.5" />
        <polygon points="83,14 74,22 81,25" fill="#3c3c3c" />
        {/* Face */}
        <circle cx="50" cy="56" r="28" fill="#E28F66" stroke="#3c3c3c" strokeWidth="3" />
        {/* White cheeks */}
        <path d="M 22 56 Q 36 78 50 56 Q 64 78 78 56 Z" fill="#ffffff" stroke="#3c3c3c" strokeWidth="2" />
        <circle cx="38" cy="49" r="3.5" fill="#3c3c3c" />
        <circle cx="62" cy="49" r="3.5" fill="#3c3c3c"/>
        <circle cx="50" cy="55" r="3" fill="#3c3c3c" />
        <circle cx="28" cy="54" r="3.5" fill="#E8A0BF" opacity="0.8" />
        <circle cx="72" cy="54" r="3.5" fill="#E8A0BF" opacity="0.8" />
      </svg>
    );
  }

  // 10. MINT FROG
  if (norm === "frog" || norm === "🐸" || norm === "lizard" || norm === "🦎") {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="#81C784" stroke="#3c3c3c" strokeWidth="3" />
        {/* Pop eyes */}
        <circle cx="34" cy="34" r="10" fill="#81C784" stroke="#3c3c3c" strokeWidth="2.5" />
        <circle cx="34" cy="34" r="6" fill="#ffffff" />
        <circle cx="34" cy="34" r="3" fill="#3c3c3c" />
        <circle cx="66" cy="34" r="10" fill="#81C784" stroke="#3c3c3c" strokeWidth="2.5" />
        <circle cx="66" cy="34" r="6" fill="#ffffff" />
        <circle cx="66" cy="34" r="3" fill="#3c3c3c" />
        {/* Face body */}
        <ellipse cx="50" cy="60" rx="34" ry="24" fill="#a5d6a7" stroke="#3c3c3c" strokeWidth="3" />
        <circle cx="30" cy="58" r="4.5" fill="#FFF" opacity="0.4" />
        <circle cx="70" cy="58" r="4.5" fill="#FFF" opacity="0.4" />
        <path d="M 40 58 Q 50 66 60 58" fill="none" stroke="#3c3c3c" strokeWidth="3" strokeLinecap="round" />
        <circle cx="25" cy="62" r="3.5" fill="#E8A0BF" opacity="0.8" />
        <circle cx="75" cy="62" r="3.5" fill="#E8A0BF" opacity="0.8" />
      </svg>
    );
  }

  // Default block: render a beautiful fallback character letter in structured canvas!
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="#89A8B2" stroke="#3c3c3c" strokeWidth="3" />
      <text x="50" y="58" fontFamily="'JetBrains Mono', monospace" fontSize="24" fontWeight="bold" fill="#3c3c3c" textAnchor="middle">
        {idOrEmoji.substring(0, 1).toUpperCase()}
      </text>
    </svg>
  );
}

export function AvatarWrapper({ avatar, className = "w-10 h-10", size = 40 }: AvatarWrapperProps) {
  // If we have a custom photo path, render the picture element safely
  const isImageFile =
    avatar &&
    (avatar.startsWith("data:") ||
      avatar.startsWith("http") ||
      avatar.startsWith("/") ||
      avatar.startsWith("blob:"));

  if (isImageFile) {
    return (
      <div className={`rounded-full overflow-hidden border-2 border-[#3c3c3c] bg-white relative flex-shrink-0 shadow-[1px_1px_0px_0px_#3c3c3c] ${className}`} style={{ width: size, height: size }}>
        <img
          src={avatar}
          alt="Avatar Illustration"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // Otherwise draw our handcrafted vectors
  return (
    <div className={`rounded-full overflow-hidden relative flex-shrink-0 ${className}`} style={{ width: size, height: size }}>
      {getMascotSvg(avatar)}
    </div>
  );
}
