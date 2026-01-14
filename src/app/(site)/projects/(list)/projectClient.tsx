"use client";
import { useState } from "react";
import Search from "@/components/Search";
import ProjectsList from "@/components/ProjectsList";
import Pagination from "@/components/Pagination";
import { ProjectWithSkills } from "@/types/projects";

//puts together the components for the project rows to appear with a functioning pagination and search ability on project titles and skills
export default function ProjectsClient({ initialProjects, currentPage, totalPages, totalResults, query, }: {
  initialProjects: ProjectWithSkills[];
  currentPage: number;
  totalPages: number;
  totalResults: number;
  query: string;
}) {

  const [filteredProjects, setFilteredProjects] = useState(initialProjects);
  return (
    <>
    <div className="space-y-6">
        <Search projects={initialProjects} onFilter={setFilteredProjects}/>
        <Pagination page={currentPage} totalPages={totalPages} totalResults={totalResults} q={query}/>
        <ProjectsList projects={filteredProjects} />
    </div>
    </>
  );
}
