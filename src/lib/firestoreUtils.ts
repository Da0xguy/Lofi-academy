export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {},
    operationType,
    path,
  };
  console.error("Firestore Policy Alert: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

/**
 * Helper to determine if a Firestore error is caused by connection issues/offline mode
 */
export function isOfflineError(error: any): boolean {
  if (!error) return false;
  const msg = (error.message || String(error)).toLowerCase();
  return (
    msg.includes("offline") ||
    msg.includes("could not reach") ||
    msg.includes("unreachable") ||
    msg.includes("network") ||
    msg.includes("failed to fetch") ||
    error.code === "unavailable"
  );
}

/**
 * Loads a user's profile from Firestore keyed by a unique identifier (email or wallet address)
 */
export async function getFirebaseUserProfile(userId: string) {
  const cleanId = userId.toLowerCase().trim();
  const path = `users/${cleanId}`;
  try {
    const response = await fetch(`/api/user/profile/${encodeURIComponent(cleanId)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const resData = await response.json();
    if (resData.success && resData.exists) {
      return resData.data;
    }
    return null;
  } catch (error: any) {
    if (isOfflineError(error)) {
      throw new Error("Failed to connect to Firestore because you are offline. Please check your internet connection.");
    }
    handleFirestoreError(error, OperationType.GET, path);
  }
}

/**
 * Saves or updates a user's profile in Firestore
 */
export async function saveFirebaseUserProfile(userId: string, profileData: any) {
  const cleanId = userId.toLowerCase().trim();
  const path = `users/${cleanId}`;
  
  // Standardizing the payload to prevent shadow/Ghost fields
  const sanitizedPayload = {
    username: profileData.username || "CozyExplorer",
    avatar: profileData.avatar || "🦊",
    walletAddress: profileData.walletAddress || null,
    email: profileData.email || null,
    password: profileData.password || null,
    xp: Number(profileData.xp ?? 0),
    level: Number(profileData.level ?? 1),
    completedModules: Array.isArray(profileData.completedModules) ? profileData.completedModules : [],
    completedTracks: Array.isArray(profileData.completedTracks) ? profileData.completedTracks : [],
    claimedWelcomeXP: Boolean(profileData.claimedWelcomeXP),
    mintedBadges: Array.isArray(profileData.mintedBadges) ? profileData.mintedBadges.map((b: any) => ({
      trackId: String(b.trackId || ""),
      tokenId: String(b.tokenId || ""),
      txHash: String(b.txHash || ""),
      mintedAt: String(b.mintedAt || "")
    })) : [],
    streak: Number(profileData.streak ?? 1),
    lastLoginDate: profileData.lastLoginDate || new Date().toISOString().split("T")[0],
    yetiHighScore: Number(profileData.yetiHighScore ?? 0),
    yetiGamesPlayed: Number(profileData.yetiGamesPlayed ?? 0)
  };

  try {
    const response = await fetch(`/api/user/profile/${encodeURIComponent(cleanId)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(sanitizedPayload)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const resData = await response.json();
    if (resData.success) {
      return resData.data;
    }
    return sanitizedPayload;
  } catch (error: any) {
    if (isOfflineError(error)) {
      console.warn(`[Firestore Offline] setDoc offline queueing for ${cleanId}`);
      // Return the sanitized local payload so the UI can proceed offline
      return sanitizedPayload;
    }
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}
