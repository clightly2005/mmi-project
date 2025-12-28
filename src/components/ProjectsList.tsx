
"use client";

import ProjectRow from "./ProjectRow";
import { ProjectWithSkills } from "@/types/projects";


export default function ProjectsList({projects}: {projects: ProjectWithSkills[];}) {
   
    return(
        <div className="space-y-4"> 
            {projects.map((project) => (
                <ProjectRow key={project.id} id={project.id} title={project.title} description={project.description} projectType={project.projectType} durationLabel={`${project.durationWeeks} weeks`}
                requiredSkills={project.projectSkill.map((s) => ({ name: s.skill.name, minProf: s.minLevel,}))}
                />
            ))}
             {projects.length === 0 && ( <p className="text-center text-neutral-500">No projects found.</p>)}
        </div>
    );
}
        