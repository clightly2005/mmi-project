"use client";

import Image from "next/image";
import Link from "next/link";
import { useUser }  from "../hooks/useUser";

export type ProjectRowProps = {
  id: number | string;
  title: string;
  description: string;       
  requiredSkills: { name: string; minProf: string }[];
  durationLabel?: string;  
};


export default function ProjectRow({
  id, title, description, requiredSkills, durationLabel,
}: ProjectRowProps) {
  //just for the view button so admins only have this option and favorite for engineer
  const user = useUser();
  if (user === null) return <p className="text-2xl  tracking-tight hero md:text-2xl">Loading...</p>;
  if (!user.role) return <p className="text-2xl  tracking-tight hero md:text-2xl">Fetching profile...</p>;
    
  return (
    <article className="rounded-xl border bg-white/80 p-4 shadow-sm hover:shadow-md transition">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-center">
 
        <div className="md:col-span-3">
          <div className="flex h-28 items-center justify-center rounded-lg bg-neutral-100">
            <Image src="/project.png" alt="Project Icon" width={100} height={100} className="object-contain" />
          </div>
        </div>
       
        <div className="md:col-span-9">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="text-lg font-semibold">
              <p className=" text-sky-500 hover:text-sky-600 ">{title}</p>
            </h3>
            {durationLabel && (
              <span className="rounded-full bg-neutral-300/70 px-2 py-1 text-xs text-neutral-700">
                {durationLabel}
              </span>
            )}
          </div>

          <p className="mt-1 text-sm hero">{description}</p>

          <div className="mt-3">
            <div className="mb-1 text-sm font-medium hero">Required skills</div>
            <div className="flex flex-wrap gap-2">
              {requiredSkills.length ? requiredSkills.map((s) => (
                <span key={s.name} className=" font-bold inline-flex items-center hero gap-1 rounded-full bg-neutral-300/70 px-2 py-1 text-xs">
                  {s.name}
                  <span className="rounded bg-neutral-900 px-1.5 py-0.5 text-[10px] text-white">{s.minProf}</span>
                </span>
              )) : (
                <span className="text-sm text-neutral-500">None specified</span>
              )}
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
          {user?.role === "PM" && (
            <Link href={`/projects/${id}`} className="text-sky-500 hover:text-sky-600 hover:underline">Assign project</Link>
          )}

          {user?.role === "ENGINEER" && (
             <a href={`/projects/${id}`} className="rounded-full border border-yellow-500 bg-yellow-400/50 hover:bg-yellow-400/70 text-neutral-900 px-3 py-1.5 text-sm hover:bg-yellow-60">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
              </svg>
            </a>
          )}
         </div>
        </div>
      </div>
    </article>
  );
}
