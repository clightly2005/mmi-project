import { FirebaseError } from "firebase/app";

//to ensure errors are specialised when signing in or up 
export function isFirebaseError(error: unknown): error is FirebaseError {
  if(typeof error !== "object" || error === null) return false;
  const safeError = error as Record<string, unknown>;
  return ( typeof safeError.code === "string" && typeof safeError.message === "string" );
}
