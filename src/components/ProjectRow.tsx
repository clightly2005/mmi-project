"use client";

import { ProjectRowProps } from "../types/projects";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
import { favProject } from "@/hooks/useProjects";

//for showing different images based on the project focus area - software, networks or general tech. 
//I want to have more for databases or risk assements/ security etc so need to add them in the public dir
export function getProjectImage(type?: string) {
  switch (type) {
    case "software":
      return "/project-images/software.jpg";
    case "network":
      return "/project-images/network.jpg";
    case "tech":
      return "/project-images/tech.jpg";
    default:
      return "/project-images/project.png";
  }
}

export default function ProjectRow({ id, title, description, requiredSkills, durationLabel, projectType, assignedTo,
}: ProjectRowProps) {
  const user = useUser();

  //toast pop up to display output, uses fav project  from hook
  async function handleFavourite(projectId: number) {
    try {
      if (!user) throw new Error("User not logged in");
      await favProject(projectId, user.id);
      toast.success("Project favourited!");
    } catch (err) {
      console.error(err);
      toast.error((err as Error).message);
    }
  }

  const isAssigned = Boolean(assignedTo);
  return (
    <article className="overflow-hidden rounded-xl border bg-white/80 shadow-sm hover:shadow-md transition">
    <div className="grid grid-cols-1 md:grid-cols-12">
    <div className="relative h-48 md:h-auto md:col-span-3">
      <Image src={getProjectImage(projectType ?? undefined)} alt={`${projectType ?? "project"} icon`} fill className="object-cover" sizes="(min-width: 768px) 25vw, 100vw"/>
    </div>

    {/*content panel */}
    <div className="md:col-span-9 p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-lg font-semibold"> <span className="text-sky-500">{title}</span> </h3>
        {durationLabel && (
          <span className="rounded-full bg-neutral-300/70 px-2 py-1 text-xs text-sky-900">{durationLabel}</span>
        )}
      </div>

      <p className="mt-1 text-sm hero">{description}</p>
      <div className="mt-3">
        <div className="mb-1 text-sm font-medium hero">Required skill</div>
        <div className="flex mt-1 flex-wrap gap-2">
          {requiredSkills.length ? (
            requiredSkills.map((s) => (
              <span key={s.name} className="font-bold inline-flex items-center hero gap-2 rounded-full bg-neutral-300/70 px-2 py-1 text-xs">
                {s.name}
                <span className="text-sky-600 px-1.5 text-[10px]"> {s.minProf}</span>
              </span>
            ))
          ) : (
            <span className="text-sm text-neutral-500">None specified</span>
          )}
        </div>
      </div>
      <div className="mt-4 mt-auto flex items-center justify-between gap-3">
        {user?.role === "PM" && (
          <div className="flex flex-col gap-2">
            {isAssigned ? (
              <>
                <p className="text-sm mt-3 font-medium hero"> Assigned to: <span className="font-bold text-slate-900">{assignedTo}</span>.{" "}To reassign this project, press{" "}
                <Link href={`/projects/${id}`} className="text-sky-500 hover:text-sky-600 hover:underline">here</Link>.</p>
              </>
            ) : (
              <>
              <div className="flex justify-end">
                <Link href={`/projects/${id}`} className="mt-3 text-sky-500 hover:text-sky-600 hover:underline"> Assign project</Link>
              </div>
              </>
            )}
          </div>
        )}
        {user?.role === "ENGINEER" && (
          <>
          {isAssigned ? ( 
            <h1 className=" text-sm font-medium hero">This project has already been assigned to <span className="font-bold">{assignedTo}</span>. 
            You cannot apply interest.</h1>
          ) : (
            <>
            <h1 className="text-sm font-medium hero">You can apply interest to this project using the favourite button.<br />
              <span className="text-red-700">Please Note:</span> This project requires the Beginner level{" "}
              <span>{requiredSkills[0]?.name}</span> skill to apply for interest.
            </h1>
            <button onClick={() => handleFavourite(id)} className="rounded-full border border-yellow-500 bg-yellow-400/50 hover:bg-yellow-400/70 text-neutral-900 px-3 py-1.5 text-sm transition" aria-label="Favourite this project">
              <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6" >
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd"/>
              </svg>
            </button>
          </>
          )}
          </>
        )}
      </div>
    </div>
  </div>
</article>

  );
}
