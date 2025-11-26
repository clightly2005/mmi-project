"use client";

import { useState, FormEvent } from "react";
import SelectField from "../components/SelectFields";
import { useSkills } from "../hooks/useSkills";
import { useUser } from "../hooks/useUser";

export default function ProjectModal({ onClose }: { onClose: () => void }) {

  //account data - readonly
  const user = useUser();

  //project details
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //skill data
  const skills = useSkills();
  const [skill, setSkill] = useState<string | number>("");
  const skillOptions =  skills.map(skill => skill.name);

  //duration of project (time effort engineer will have taken from availability)
  const durOptions = ["1 week", "2 weeks", "3 weeks", "4 weeks", "5 weeks", "6 weeks", "7 weeks", "8 weeks"];
  type Duration = typeof durOptions[number];
  const [duration, setDuration] = useState<Duration | "">("");
    
  //proficiency data for what skill level u have in the selected skill
  const profOptions = ["Beginner","Novice","Intermediate","Advanced","Expert"] as const;
  type Proficiency = typeof profOptions[number];
  const [proficiency, setProficiency] = useState<Proficiency | "">("");

  
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    
    console.log("New project");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70  border border-white/10 shadow-2xl backdrop-blur.">
      <div className="w-full max-w-md overflow-hidden rounded-lg bg-modal shadow-lg">
        <form onSubmit={handleSubmit} className="max-h-[85vh] overflow-y-auto p-7 pb-28 space-y-5 divider-y divider-white/5">
          <h2 className="mb-1 text-xl font-semibold text-white">New Project</h2>
          <div>
            <label htmlFor="project" className="block mt-8 text-sm font-medium text-slate-100">Request Originator</label>
            <input id="project" type="text" required value={user?.name || ""} readOnly className="mt-2 w-full rounded border bg-white px-3 py-1.5 text-neutral-900" />
          </div>

          <p className="text-neutral-200 mb-8">Please fill in all fields below to create a new project. After submission, it will become visible in the Project's page, where it can be assigned to the appropriate engineer.</p>
          <div>
            <label htmlFor="project" className="block text-sm font-medium text-slate-100">Project Title</label>
            <input id="title" type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter a title" className=" w-full rounded border bg-white px-3 py-1.5 text-neutral-900 my-2" />
            <label htmlFor="description" className="block text-sm font-medium text-slate-100 mt-3">Project Description</label>
            <textarea id="description" required rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter a description" className=" w-full rounded border bg-white px-3 my-2 py-1.5 text-neutral-900" />
          </div>
         
          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            <SelectField id="skill" label="Primary skill required" value={skill} onChange={(v) => setSkill(v)} options={skillOptions} placeholder="Select a skill"/> 
            <SelectField id="proficiency" label="Minimum proficiency" value={proficiency} onChange={(v) => setProficiency(v as Proficiency)} options={profOptions} placeholder="Select a level" />
            <SelectField id="duration" label="Estimated duration" value={duration} onChange={(v) => setDuration(v as Duration)} options={["1 month", "2 months", "3 months", "6 months", "1 year"]} placeholder="Select a duration" />
          </div>

        </form>

        <div className="sticky bottom-0 flex gap-2 border-t border-white/10 bg-modal/95 p-4 backdrop-blur">
          <button type="button" onClick={onClose} className="w-1/2 rounded border px-3 py-2 text-sm text-gray-200 hover:bg-white/5">
            Close
          </button>
          <button form="__implicit" onClick={(e) => (document.querySelector("form") as HTMLFormElement)?.requestSubmit()}
            className="w-1/2 rounded bg-sky-600 px-3 py-2 text-sm text-white hover:bg-sky-700">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
