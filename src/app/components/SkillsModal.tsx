"use client";

import { useState, FormEvent } from "react";

type Role = "Front-end" | "Back-end" | "Full-stack";
type Duration =
  | "1 week"
  | "2 weeks"
  | "3–4 weeks"
  | "1–2 months"
  | "3–4 months";
type Proficiency = "1 - Novice" | "2 - Beginner" | "3 - Intermediate" | "4 - Advanced" | "5 - Expert";

const SKILLS = ["Python", "TypeScript", "C#", "Java", "Go", "SQL", "React", "Node.js"] as const;
const ROLES: Role[] = ["Front-end", "Back-end", "Full-stack"];
const DURATIONS: Duration[] = ["1 week", "2 weeks", "3–4 weeks", "1–2 months", "3–4 months"];
const PROFICIENCIES: Proficiency[] = [
  "1 - Novice",
  "2 - Beginner",
  "3 - Intermediate",
  "4 - Advanced",
  "5 - Expert",
];

export default function ProjectModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [requirements, setRequirements] = useState("");
  const [skill, setSkill] = useState<typeof SKILLS[number] | "">("");
  const [role, setRole] = useState<Role | "">("");
  const [duration, setDuration] = useState<Duration | "">("");
  const [proficiency, setProficiency] = useState<Proficiency | "">("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Minimal validation
    if (!name || !desc || !skill || !role || !duration || !proficiency) {
      alert("Please complete all fields.");
      return;
    }

    const payload = {
      name,
      description: desc,
      requirements,
      requiredSkill: skill,
      roleNeeded: role,
      estimatedDuration: duration,
      minProficiency: Number(proficiency[0]), // "4 - Advanced" -> 4
    };

    console.log("New project:", payload);
    // TODO: send to API
    onClose();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-bmodal bg-opacity-40">
      <div className="bg-modal rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">New Project</h2>
        <p className="text-neutral-200">Please fill in all fields to submit a new project.</p>

        <form className="space-y-4 my-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-neutral-100">
              Project Name
            </label>
            <input
              id="projectName"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter the project title"
              className="w-full border px-3 py-2 mt-2 rounded bg-white text-neutral-900"
            />
          </div>

          <div>
            <label htmlFor="projectDesc" className="block text-sm font-medium text-neutral-100">
              Project Description
            </label>
            <textarea
              id="projectDesc"
              required
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Outline the project's purpose"
              className="w-full border px-3 py-2 mt-2 rounded bg-white text-neutral-900"
              rows={3}
            />
          </div>

          <div>
            <label htmlFor="requirements" className="block text-sm font-medium text-neutral-100">
              Additional Requirements (optional)
            </label>
            <input
              id="requirements"
              type="text"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="e.g., security clearance, location, tools"
              className="w-full border px-3 py-2 mt-2 rounded bg-white text-neutral-900"
            />
          </div>

          {/* New dropdowns */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="skill" className="block text-sm font-medium text-neutral-100">
                Primary Skill / Language
              </label>
              <select
                id="skill"
                required
                value={skill}
                onChange={(e) => setSkill(e.target.value as typeof SKILLS[number])}
                className="w-full border px-3 py-2 mt-2 rounded bg-white text-neutral-900"
              >
                <option value="" disabled>
                  Select a skill
                </option>
                {SKILLS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="roleNeeded" className="block text-sm font-medium text-neutral-100">
                Role Needed
              </label>
              <select
                id="roleNeeded"
                required
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="w-full border px-3 py-2 mt-2 rounded bg-white text-neutral-900"
              >
                <option value="" disabled>
                  Select a role
                </option>
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-neutral-100">
                Estimated Duration
              </label>
              <select
                id="duration"
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value as Duration)}
                className="w-full border px-3 py-2 mt-2 rounded bg-white text-neutral-900"
              >
                <option value="" disabled>
                  Select duration
                </option>
                {DURATIONS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="proficiency" className="block text-sm font-medium text-neutral-100">
                Minimum Proficiency
              </label>
              <select
                id="proficiency"
                required
                value={proficiency}
                onChange={(e) => setProficiency(e.target.value as Proficiency)}
                className="w-full border px-3 py-2 mt-2 rounded bg-white text-neutral-900"
              >
                <option value="" disabled>
                  Select level
                </option>
                {PROFICIENCIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="w-full button-primary text-white py-2 rounded hover:bg-green-700">
            Save
          </button>
        </form>

        <button onClick={onClose} className="mt-2 text-sm text-gray-300 hover:text-white">
          Close
        </button>
      </div>
    </div>
  );
}
