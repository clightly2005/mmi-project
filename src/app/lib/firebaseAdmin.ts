
import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import type { ServiceAccount } from "firebase-admin";

let adminApp: App | null = null;

export function getAdminApp(): App | null {
  if (adminApp) return adminApp;

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!raw) {
    console.warn(
      "FIREBASE_SERVICE_ACCOUNT_KEY not set – Firebase Admin disabled in this environment."
    );
    return null;
  }

  let serviceAccount: ServiceAccount;

  try {
    serviceAccount = JSON.parse(raw) as ServiceAccount;
  } catch (error) {
    console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:", error);
    return null;
  }

  if (!serviceAccount.projectId) {
    console.error(
      "Service account JSON is missing project id – check Vercel env value."
    );
    return null;
  }

  adminApp =
    getApps().length === 0
      ? initializeApp({
          credential: cert(serviceAccount),
        })
      : getApps()[0];

  return adminApp;
}
