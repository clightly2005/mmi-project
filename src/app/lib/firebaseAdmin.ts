
import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import type { ServiceAccount } from "firebase-admin";

//cache admin app so only initialise once per runtime rather than each time request hits api route
let adminApp: App | null = null;

//FB json is project_id but type only knows of projectId so need to know about both
type ServiceAccountProId = ServiceAccount & {
  project_id?: string;
};

export function getAdminApp(): App | null {
  if (adminApp) return adminApp; //if already made then reuse it

  //or create it once and return it
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) {
    console.warn( "FB service key not set up - check .env file.");
    return null;
  }

  //for projectId / project_id issue
  let serviceAccount: ServiceAccountProId;

  try {
    serviceAccount = JSON.parse(raw) as ServiceAccount;
  } catch (error) {
    console.error("Failed to parse FB service account key:", error);
    return null;
  }

  const project_id = serviceAccount.project_id ?? serviceAccount.projectId;
  if(!project_id){
    console.error("Service account JSON is missing project_id/projectId - check vercel");
    return null;
  }

  adminApp = getApps().length === 0 ? initializeApp({ credential: cert(serviceAccount), }): getApps()[0];
  return adminApp;
}
