//project detail page
import { PrismaClient } from "@prisma/client";
import {ProjectRowProps} from "@/types/projects";

const prisma = new PrismaClient();

export default async function ProjectPage({params}: {params: { id: string}}) {
    const projectId = Number(params.id);
    if(!Number.isFinite(projectId)){
        return <div className="max-w-5xl mx-auto px-4 py-6 ">Invalid project ID</div>;
    }
    const project = await prisma.project.findUnique({
        where: { id: projectId},
        select: { id: true, title: true, description: true, durationWeeks: true, projectSkill: { select: {minLevel: true, skill: { select:{ name:true}},},
    } },
    });

    if(!project){
        return <div className="max-w-5xl mx-auto px-4 py-6 ">Project not found</div>; 
    }

    const mainSkill = project.projectSkill[0];
    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold hero">Project title: <span className="text-sky-600">{project.title}</span></h1>
            <p className="mt-4 text-md hero"><span className="font-bold">Project summary:</span> {project.description}</p>
            <p className="mt-2 text-md hero"><span className="font-bold">Estimated effort:</span> {project.durationWeeks} Weeks </p>
            {mainSkill ? (
                <p className="mt-2 text-md hero">
                    <span className="font-bold">Main required skill:</span>{" "}
                    <span className="text-sky-600">{mainSkill.skill.name}</span>{" "}
                    <span className="text-slate-600">({mainSkill.minLevel.toLocaleLowerCase()})</span>
                </p>
            ) : (
                <p className="mt-2 text-md hero text-slate-600">
                    <span className="font-bold">Main required skill: </span>None specified
                </p>
            )}
        </div>
    );
}