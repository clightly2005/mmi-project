"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { isFirebaseError } from  "@/lib/firebaseErrors";
import { getFirebaseApp } from "@/lib/firebaseClient";
import { sendResetEmail } from "@/lib/auth";

//sign in page a user hits initially
export default function SignInPage() {
    const router = useRouter();
    const auth = getAuth(getFirebaseApp());
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState<string | null>(null);

    
    async function handleSignin(e: React.FormEvent) {
      e.preventDefault();
      setMsg(null)
      try {
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/home");
      } catch (err: unknown){
        //narrowing to firebase errors from lib file
        if(isFirebaseError(err)) {
          switch(err.code){
            case "auth/invalid-email": 
              setMsg("The email address is not valid. Please re enter a valid address");
              break;
            case "auth/weak-password":
              setMsg("The passwored entered is too weak. Please re-enter a stronger password - more than 6 chars");
              break;
            case "auth/user-not-found":
              setMsg("No account found with this email address. If you have not used Matchitect before, please sign up below");
              break;
            default:
              setMsg(err.message)
          }
          return;//prev hitting fallback regardless
        }
        //fallback 
        if (err instanceof Error){
          setMsg(err.message)
        } else{
          setMsg("Unexpected error occured. Please try again");
        }
      }
    }
   
     
    return (
      <div className="flex  min-h-full flex-col justify-center py-12 sm:px-6 lg:px-20">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image alt="Skill sync" src="/logo.png" width={300} height={200}  className="mx-auto h-20 w-auto not-dark:hidden" />
          <h1 className="mt-6 text-center text-2xl font-bold tracking-tight text-sky-400">Matchitect</h1>
          <h2 className="mt-6 text-center text-xl font-bold tracking-tight hero">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 sm:rounded-lg rounded-md sm:px-12 dark:bg-blue-400/25 dark:shadow-xl dark:outline dark:-outline-offset-1 dark:outline-black/10">
            <form onSubmit={handleSignin} className="py-4 space-y-3">//support pressing enter
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 dark:text-blue-950">
                  Email address
                </label>
                <div className="mt-2">
                  <input type="email" value={email} spellCheck={false} autoCapitalize="none" autoCorrect="off" onChange={(e)=>setEmail(e.target.value)} 
                    className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 focus:outline-sky-600 sm:text-sm/6 dark:bg-blue-900/5 dark:text-blue-950 dark:outline-blue-600/20 dark:focus:outline-sky-500"/>
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900 dark:text-blue-950">
                  Password
                </label>
                <div className="mt-2">
                  <input type="password" value={password} spellCheck={false} autoCorrect="off" onChange={(e)=>setPassword(e.target.value)}
                    className="block w-full rounded-md  px-3 py-1.5 text-base outline-1 -outline-offset-1  focus:outline-sky-600 sm:text-sm/6 dark:bg-blue-900/5 dark:text-white dark:outline-blue-600/20 dark:focus:outline-sky-500"/>
                  {msg && <p className="text-red-800 dark:text-red-800 text-sm mt-1">{msg}</p>}
                </div>
                <p className="mt-4 text-center text-sm text-sky-600 hover:underline cursor-pointer" onClick={() => sendResetEmail(email, setMsg)}>
                  Forgot password?
                </p>

              </div>

              <div>
                <button type="submit"
                  className="flex w-full justify-center rounded-md mt-8 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs dark:bg-sky-500 dark:shadow-sm dark:hover:bg-sky-600 dark:focus-visible:outline-sky-800">
                  Sign in
                </button>
              </div>
            </form>
            <p className="mt-10 text-center text-sm/6 text-blue-950">
              No account?{" " }
              <a href="/signup" className="font-semibold dark:hover:text-sky-600 dark:text-sky-950 dark:hover:underline" >
                Sign up here!
              </a>
           </p>
          </div>
        </div>
    </div>
  );
}


