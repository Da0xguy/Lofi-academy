import { initializeApp } from "firebase/app";
import { initializeFirestore, memoryLocalCache } from "firebase/firestore";
import firebaseConfig from "../firebase-applet-config.json";

const app = initializeApp(firebaseConfig);

// Initialize Firestore referencing the designated databaseId with robust iframe compatibility options:
// - memoryLocalCache() prevents IndexedDB access errors in sandboxed iframes
// - experimentalForceLongPolling forces standard HTTP long polling bypassing WebSocket blocks
// - useFetchStreams: false disables fetch-based streams that fail or timeout behind reverse proxies
export const db = initializeFirestore(app, {
  localCache: memoryLocalCache(),
  experimentalForceLongPolling: true,
  useFetchStreams: false,
} as any, firebaseConfig.firestoreDatabaseId);

