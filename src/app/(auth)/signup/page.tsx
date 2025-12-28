"use client";
import Image from "next/image";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirebaseApp } from "@/lib/firebaseClient";
import { isFirebaseError} from '@/lib/firebaseErrors'

export default function SignUpPage() {
    const auth = getAuth(getFirebaseApp());
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      setMsg(null);
     
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        //proving identity so user cant fake a token (cryptographically signed by firebase)
        const token = await user.getIdToken();

        //sends token 
        await fetch("/api/users", {
          method: "POST", headers: {"Authorization": `Bearer ${token}` },
          body: JSON.stringify({ uid: user.uid, email: user.email,}),
        });
        setMsg("Account created!");
      } 
      catch (err: unknown){
        if(isFirebaseError(err)){
        if(err.code === 'auth/email-already-in-use'){
          setMsg("This email is already in use. Please sign in instead.");
          return;
        }
        if(err.code === 'auth/invalid-email'){
          setMsg("The email address is not valid. Please re-enter a valid email address.");
          return;
        }
        if(err.code === 'auth/weak-password'){
          setMsg("The password is too weak. Please re-enter a stronger password that is more than 6 chars long.");
          return;
        }    
       }
      }
    }

    return (
        <div className="flex  min-h-full flex-col justify-center py-12 sm:px-6 lg:px-20">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image alt="Skill sync" src="/logo.png"  width={300} height={200}  className="mx-auto h-20 w-auto not-dark:hidden"/>
          <h1 className="mt-6 text-center text-2xl font-bold tracking-tight text-sky-400">Matchitect</h1>
          <h2 className="mt-6 text-center text-xl font-bold tracking-tight hero">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 sm:rounded-lg rounded-md sm:px-12 dark:bg-blue-400/25 dark:shadow-xl dark:outline dark:-outline-offset-1 dark:outline-black/10">
            <form onSubmit={handleSubmit} className="py-4 space-y-3">
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 dark:text-blue-950">
                  Please enter your Email address
                </label>
                <div className="mt-2">
                  <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} 
                    className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 focus:outline-sky-600 sm:text-sm/6 dark:bg-blue-900/5 dark:text-blue-950 dark:outline-blue-600/20 dark:focus:outline-sky-500"/>
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900 dark:text-blue-950">
                  Please create a Password
                </label>
                <div className="mt-2">
                  <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}
                    className="block w-full rounded-md  px-3 py-1.5 text-base outline-1 -outline-offset-1  focus:outline-sky-600 sm:text-sm/6 dark:bg-blue-900/5 dark:text-white dark:outline-blue-600/20 dark:focus:outline-sky-500"/>  
                </div>
                {msg && <p className="text-red-800 dark:text-red-800 text-sm mt-1">{msg}</p>}
              </div>

              <div>
                <button type="submit"
                  className="flex w-full justify-center rounded-md mt-8 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs dark:bg-sky-500 dark:shadow-sm dark:hover:bg-sky-600 dark:focus-visible:outline-sky-800">
                  Sign up
                </button>
              </div>
            </form>
            <p className="mt-10 text-center text-sm/6 text-blue-950">
              Already have an account?{' '}
              <a href="/signin" className="font-semibold dark:hover:text-sky-700 dark:text-sky-950 dark:hover:underline" >
                Login here!
              </a>
           </p>
          </div>
        </div>
      </div>

    );
   
}