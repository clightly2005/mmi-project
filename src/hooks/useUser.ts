"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebaseClient";
import { User } from "@/types/user";

//for alot of the application this hook helps with getting the current user logged in with firebase credentials
export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //auth state change
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }
      //get token
      const token = await firebaseUser.getIdToken();
      const res = await fetch("/api/auth/sync", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      const ur = await res.json();
      setUser(ur);
      setLoading(false);
    });

    return () => unsubscribe(); 
  }, []);

  return loading ? null : user;
}
