"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import {usePathname } from "next/navigation";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    
    //will hide nav on auth pages
    const pathname = usePathname();
    const isAuthRoute =  pathname === "/signin" || pathname === "/signup";
    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);
    if(isAuthRoute) return null;

    
    return (       
    <nav className=" shadow-md ">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <h1 className="text-xl font-extrabold text-sky-400 tracking-wide">Matchitect</h1>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-gray-700 rounded "
            aria-label="Toggle menu" >
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="{2}" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
        <div className={`${ menuOpen ? "flex" : "hidden" } 
            md:flex flex-col md:flex-row md:items-center md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-menu md:bg-transparent shadow md:shadow-none p-4 md:p-0`}>
            <Link href="/home" className="block text-white py-1 hover:text-sky-400">
                Home
            </Link>
            <Link href="/projects" className="block text-white py-1 hover:text-sky-400">
                Projects
            </Link>
            <Link href="/signin" className="block text-white py-1 hover:text-sky-400" >
                Logout 
            </Link>     
           
                    
            </div>
        </div>
        </nav>
    )
} 