"use client";
//conditionally renders text and modals depending on role assigned to a users account 
import SkillsModal from "./SkillsModal";
import ProjectModal from "./ProjectModal";
import Image from "next/image";
import {  useState } from "react";
import { useUser }  from "../hooks/useUser";

export default function Hero() {
    const user = useUser();

    const [showSkills, setShowSkills] = useState(false);
    const [showProject, setShowProject] = useState(false);

    if (user === null) return <p className="text-2xl  tracking-tight hero md:text-2xl">Loading...</p>;
    if (!user.role) return <p className="text-2xl  tracking-tight hero md:text-2xl">Fetching profile...</p>;
    
    return (
        <>
        <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-16 md:grid-cols-2 md:gap-16">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight hero md:text-5xl">
                Project-Employee Match Maker
              </h1>
              <div>
                {user?.role === "ENGINEER" && (
                   <p className="mt-4 max-w-prose text-blue-950">
                    Welcome! Please check that your skills and proficiency is up to date on your profile and then check out the latest projects.
                   </p>
                )}
                {user?.role === "PM" && (
                   <p className="mt-4 max-w-prose text-blue-950">
                    Welcome! Please create a new project using the button below or assign projects to engineers on the projects page.
                   </p>
                )}
              </div>
              
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {user?.role === "ENGINEER" && (
                  <button onClick={() => setShowSkills(true)} className="rounded-full button-primary px-5 py-2.5 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-neutral-400" >
                    Change Skill Profile
                  </button>
                )}
    
                {user?.role === "PM" && (
                  <button onClick={() => setShowProject(true)}
                    className="rounded-full button-primary px-5 py-2.5 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-neutral-400">
                    Create a New Project
                  </button>
                )}
    
            
              </div>
            </div>
    
            <div className="flex w-full items-center justify-center">
              <div className="relative flex  items-center justify-center rounded-full bg-neutral-100 md:h-[380px] md:w-[380px] sm:h-[280px] sm:w-[280px]">
                <Image src="/logo.png" alt="SkillSync logo" width={300} height={200}  className="object-contain p-8" 
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 380px, 400px"priority />
              </div>
            </div>
          </section>
        
        {showSkills && <SkillsModal onClose={() => setShowSkills(false)} />}
        {showProject && <ProjectModal onClose={() => setShowProject(false)} />}
        </>
    );
}