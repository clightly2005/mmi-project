"use client";

import { useState, FormEvent } from "react";
import SelectField from "../components/SelectFields";
import { Skills, Focuses, Durations, Proficiencies } from "../lib/options";
import type { Duration, Proficiency, Focus, Skill } from "../types/modal";

export default function ProjectModal({ onClose }: { onClose: () => void }) {
  // simple form state
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [requirements, setRequirements] = useState("");

  const [skill, setSkill] = useState<Skill | "">("");
  const [role, setRole] = useState<Focus | "">("");
  const [duration, setDuration] = useState<Duration | "">("");
  const [proficiency, setProficiency] = useState<Proficiency | "">("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name || !desc || !skill || !role || !duration || !proficiency) return;

    const payload = {
      name,
      description: desc,
      requiredSkill: skill,
      roleNeeded: role,
      estimatedDuration: duration,
      minProficiency: Number(proficiency), // 1..5
    };

    console.log("New project", payload);//change for api later
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md overflow-hidden rounded-lg bg-modal shadow-lg">
        <form onSubmit={handleSubmit} className="max-h-[85vh] overflow-y-auto p-6 pb-28 space-y-4">
          <h2 className="mb-1 text-xl font-semibold text-white">New Project</h2>
          <p className="text-neutral-200">Please fill in all fields to submit a new project.</p>

          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-neutral-100">
              Project Name
            </label>
            <input id="projectName" type="text" required value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Enter the project title" className="mt-2 w-full rounded border bg-white px-3 py-2 text-neutral-900" />
          </div>

          <div>
            <label htmlFor="projectDesc" className="block text-sm font-medium text-neutral-100">
              Project Description
            </label>
            <textarea id="projectDesc" required value={desc} onChange={(e) => setDesc(e.target.value)}
              placeholder="Outline the project's purpose" rows={3} className="mt-2 w-full rounded border bg-white px-3 py-2 text-neutral-900"/>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <SelectField  id="skill" label="Primary Skill / Language" value={skill} onChange={(v) => setSkill(v as Skill)} options={Skills} placeholder="Select a skill"/>
            <SelectField id="roleNeeded" label="Role Needed" value={role} onChange={(v) => setRole(v as Focus)} options={Focuses} placeholder="Select a role"/>
            <SelectField id="duration" label="Estimated Duration" value={duration} onChange={(v) => setDuration(v as Duration)}  options={Durations} placeholder="Select duration"/>
            <SelectField id="proficiency" label="Minimum Proficiency" value={proficiency} onChange={(v) => setProficiency(v as Proficiency)} options={Proficiencies} placeholder="Select level" />
          </div>
        </form>

        <div className="sticky bottom-0 flex gap-2 border-t border-white/10 bg-modal/95 p-4 backdrop-blur">
          <button type="button" onClick={onClose} className="w-1/2 rounded border px-3 py-2 text-sm text-gray-200 hover:bg-white/5">
            Close
          </button>
          <button form="__implicit" onClick={(e) => (document.querySelector("form") as HTMLFormElement)?.requestSubmit()}
            className="w-1/2 rounded bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
