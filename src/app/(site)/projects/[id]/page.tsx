//project detail page
import {ProjectRowProps} from "@/types/projects";

export default function ProjectPage({title}: ProjectRowProps) {
    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
            <p className="mt-4 text-lg hero">Project information will be displayed here.</p>
        </div>
    );
}