"use client";

import { useState } from "react";
import Search from "../../../components/Search";
import ProjectsList from "../../../components/ProjectsList";
import Pagination from "../../../components/Pagination";
import { ProjectWithSkills } from "@/types/projects";

export default function ProjectsClient({
  initialProjects,
  totalResults,
  page,
  totalPages
}: {
  initialProjects: ProjectWithSkills[];
  totalResults: number;
  page: number;
  totalPages: number;
}) {

  const [filteredProjects, setFilteredProjects] = useState(initialProjects);

  return (
    <>
    <div className="space-y-6">
        <Search
          projects={initialProjects}
          onFilter={setFilteredProjects}
        />
      

      <Pagination
        page={page}
        totalPages={totalPages}
        totalResults={totalResults}
      />

      <ProjectsList projects={filteredProjects} />
    </div>
    </>
  );
}
