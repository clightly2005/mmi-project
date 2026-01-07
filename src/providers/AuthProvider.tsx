"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getFirebaseApp } from "../lib/firebaseClient";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";



type AuthContextValue = {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider(props: { children: React.ReactNode}) {
    //gets firebase auth instance for the browser
    const auth = useMemo(() => {
        const app = getFirebaseApp();
        return getAuth(app);
    }, []);

    //local state for current user and loading flag
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    //when component mounts, start listening for auth state chnages
    useEffect(() => {
        function handleAuthChange(firebaseUser: User | null) {
            setUser(firebaseUser);
            setLoading(false);
        }

        const unsubscribe = onAuthStateChanged(auth, handleAuthChange);
        return () => unsubscribe(); //stop listening we=hen provider unmounts
    }, [auth]);

    //auth helpers so every one of the components that need to  can use these
    function normalisedEmail(email: string) {
        return email.trim().toLowerCase();
    }

    async function signIn(email: string, password: string){
        const { signInWithEmailAndPassword } = await import("firebase/auth");
        await signInWithEmailAndPassword(auth, normalisedEmail(email), password);
    }

    async function signUp(email: string, password: string) {
        const { createUserWithEmailAndPassword } = await import("firebase/auth");
        await createUserWithEmailAndPassword(auth, normalisedEmail(email), password);
    }

    async function signOut() {
        const { signOut } = await import("firebase/auth");
        await signOut(auth);
    }

    const contextValue: AuthContextValue = {
        user, loading, signIn, signUp, signOut,
    };

    //render provider so children can call useAuth
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
}

//gives components easy access to the context
export function useAuth(): AuthContextValue {
    const value = useContext(AuthContext);
    if(value === undefined) {
        throw new Error("useAuth must be used inside <AuthProvider>");
    }
    return value;
}