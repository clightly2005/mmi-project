import { FirebaseError } from "firebase/app";

export function isFirebaseError(error: unknown): error is FirebaseError {
  if(typeof error !== "object" || error === null) return false;
  const safeError = error as Record<string, unknown>;
  return ( typeof safeError.code === "string" && typeof safeError.message === "string" );
}
