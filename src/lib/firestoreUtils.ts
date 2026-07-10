import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

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
 * Loads a user's profile from Firestore keyed by a unique identifier (email or wallet address)
 */
export async function getFirebaseUserProfile(userId: string) {
  const cleanId = userId.toLowerCase().trim();
  const path = `users/${cleanId}`;
  try {
    const userDocRef = doc(db, "users", cleanId);
    const userSnapshot = await getDoc(userDocRef);
    if (userSnapshot.exists()) {
      return userSnapshot.data();
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

/**
 * Saves or updates a user's profile in Firestore
 */
export async function saveFirebaseUserProfile(userId: string, profileData: any) {
  const cleanId = userId.toLowerCase().trim();
  const path = `users/${cleanId}`;
  try {
    const userDocRef = doc(db, "users", cleanId);
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
    
    await setDoc(userDocRef, sanitizedPayload);
    return sanitizedPayload;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}
