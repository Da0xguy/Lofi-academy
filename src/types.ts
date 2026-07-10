export interface ModuleStep {
  id: string;
  title: string;
  content: string;
  highlightCode?: string;
  yetiMood: "chill" | "thinking" | "excited" | "proud";
  chalkboardHeader?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface TrackModule {
  id: string;
  title: string;
  description: string;
  xpValue: number;
  steps: ModuleStep[];
  quiz: QuizQuestion[];
  videoUrl?: string;
  videoTitle?: string;
}

export interface LearningTrack {
  id: string;
  title: string;
  description: string;
  iconName: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  modules: TrackModule[];
}

export interface UserProfile {
  username: string;
  avatar: string;
  walletAddress: string | null;
  email?: string | null;
  password?: string | null;
  xp: number;
  level: number;
  completedModules: string[]; // module ids
  completedTracks: string[];  // track ids
  claimedWelcomeXP: boolean;
  mintedBadges: {
    trackId: string;
    tokenId: string;
    txHash: string;
    mintedAt: string;
  }[];
  streak: number;
  lastLoginDate: string;
  yetiHighScore: number;
  yetiGamesPlayed: number;
}

export interface LeaderboardEntry {
  username: string;
  avatar: string;
  wallet: string;
  xp: number;
  level: number;
  badges: string[];
  rankDirection?: "up" | "down" | "same";
  yetiHighScore?: number;
}

export interface MintResult {
  txHash: string;
  objectId: string;
  gasUsedSUI: string;
  explorerUrl: string;
  logs: string[];
  timestamp: string;
}
