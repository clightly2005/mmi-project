import { useEffect, useState } from "react";
import { ProjectWithSkills } from "@/types/projects";

//handles typing and filtering projects by title, desc, skill
type SearchProps = {
    projects: ProjectWithSkills[];
    onFilter: (filtered: ProjectWithSkills[]) => void;
};

export default function Search({projects, onFilter}: SearchProps) {
    const [query, setQuery] = useState('');

    useEffect(() => {
        const trimmed = query.trim().toLowerCase();
        const filtered = projects.filter((project) => {
            if(!trimmed) return true;//when nothing is typed return all
            return(
                project.title.toLowerCase().includes(trimmed) ||
                project.description.toLowerCase().includes(trimmed) ||
                project.projectSkill.some((s) => s.skill.name.toLowerCase().includes(trimmed))
            )
    });
        onFilter(filtered);
    }, [query, projects, onFilter]);
    
    return(
         <form onSubmit={(e) => e.preventDefault()} className="isolate inline-flex -space-x-px rounded-md shadow-xs dark:shadow-none">
            <input type="search" placeholder="Start typing..." className="bg-slate-900 text-white px-3 py-2 rounded outline-none focus:ring-2 focus:ring-sky-600"
            value={query} onChange={(e) => setQuery(e.target.value)}/>
            <button type="submit" className="px-3  rounded mx-1 bg-slate-800 hover:bg-slate-700 ">Search </button>
        </form>
    );
    
}