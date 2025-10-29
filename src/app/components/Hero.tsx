"use client";
//conditionally renders text and modals depending on role assigned to a users account 
import SkillsModal from "../components/SkillsModal";
import ProjectModal from "../components/ProjectModal";
import Image from "next/image";
import { createContext, useContext, useEffect, useState } from "react";

export default function Hero() {
    const [role, setRole] = useState<"user" | "manager">("user"); //change users view
    //modal options depending on user
    const [showSkills, setShowSkills] = useState(false);
    const [showProject, setShowProject] = useState(false);

    return (
        <>
        <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-16 md:grid-cols-2 md:gap-16">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight hero md:text-5xl">
                Project-Employee Match Maker
              </h1>
              <div>
                {role === "user" && (
                   <p className="mt-4 max-w-prose text-blue-950">
                    Welcome! Please check that your skills and proficiency is up to date on your profile and then check out the latest projects.
                   </p>
                )}
                {role === "manager" && (
                   <p className="mt-4 max-w-prose text-blue-950">
                    Welcome! Please create a new project using the button below or assign projects to engineers on the projects page.
                   </p>
                )}
              </div>
              
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {role === "user" && (
                  <button onClick={() => setShowSkills(true)} className="rounded-full button-primary px-5 py-2.5 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-neutral-400" >
                    Change Skill Profile
                  </button>
                )}
    
                {role === "manager" && (
                  <button onClick={() => setShowProject(true)}
                    className="rounded-full button-primary px-5 py-2.5 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-neutral-400">
                    Create a New Project
                  </button>
                )}
    
                {/* DEV: quick role toggle for demoing both button states */}
                <button onClick={() => setRole(role === "user" ? "manager" : "user")}
                  className="rounded-full border border-neutral-400 px-4 py-2 text-sm text-neutral-700 hover:bg-white"
                  aria-label="Toggle demo role">
                  Demo role: {role}
                </button>
              </div>
            </div>
    
            <div className="flex w-full items-center justify-center">
              <div className="relative flex  items-center justify-center rounded-full bg-neutral-100 md:h-[380px] md:w-[380px] sm:h-[280px] sm:w-[280px]">
                <Image src="/logo.png" alt="SkillSync logo"  fill className="object-contain p-8" 
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 380px, 400px"priority />
              </div>
            </div>
          </section>
        
        {showSkills && <SkillsModal onClose={() => setShowSkills(false)} />}
        {showProject && <ProjectModal onClose={() => setShowProject(false)} />}
        </>
    );
}