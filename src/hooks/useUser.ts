"use client";
import { useEffect, useState } from "react";
import { auth } from "../lib/firebaseClient";
import { User } from "../types/user";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      // Now Firebase is ready, get the token
      const token = await firebaseUser.getIdToken();

      const res = await fetch("/api/auth/sync", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setUser(data); // assuming your API returns the plain user object
      setLoading(false);
    });

    return () => unsubscribe(); // cleanup listener
  }, []);

  return loading ? null : user;
}
