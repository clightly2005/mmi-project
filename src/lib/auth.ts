import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { FirebaseError } from "firebase/app";

function isFirebaseError(error: unknown): error is FirebaseError {
  return typeof error === "object" && error !== null && "code" in error && typeof (error as any).code === "string";
}


export async function sendResetEmail(email: string, setMsg: (msg: string) => void) {
    const auth = getAuth();
  try {
    await sendPasswordResetEmail(auth, email, {
         url: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
      handleCodeInApp: true,
    });
    setMsg("Password reset email sent! Check your inbox");
  } catch (error: unknown) {
    if (isFirebaseError(error)) {
      switch (error.code) {
        case "auth/user-not-found":
          setMsg("No account found with this email.");
          break;
        case "auth/invalid-email":
          setMsg("Invalid email address.");
          break;
        case "auth/too-many-requests":
          setMsg("Too many requests. Try again later.");
          break;
        default:
          setMsg("An error occurred sending the password reset email.");
      }
    } else {
      setMsg("An unexpected error occurred.");
    }
  }
}