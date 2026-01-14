"use client";
import toast from "react-hot-toast";
import { useState, FormEvent } from "react";
import SelectField from "./SelectFields";
import { useSkills } from "@/hooks/useSkills";
import { useUser } from "@/hooks/useUser";
import { useEngSkills } from "@/hooks/useEngSkills";

//for when an engineer opens the add a skill button
export default function ProjectModal({ onClose }: { onClose: () => void }) {
  //account data - readonly
  const user = useUser();

  //skill data
  const skills = useSkills();
  const [skill, setSkill] = useState<string | number>("");
  const skillOptions =  skills.map((skill) => skill.name);
  const { skills: engSkills, refresh: refreshEngSkills } = useEngSkills( user?.id );
  const hasEngSkills = !!engSkills?.length;

  //role data 
  const roleName = user?.engineerRole?.name ?? "Not assigned";

  //proficiency data for what skill level u have in the selected skill
  const profOptions = ["Beginner","Novice","Intermediate","Advanced","Expert"] as const;
  type Proficiency = typeof profOptions[number];
  const [proficiency, setProficiency] = useState<Proficiency | "">("");

  
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    //check if user loaded
    if (!user?.id) { console.error("No user loaded"); return;}
    //validate form fields
    if (!skill || !proficiency) { console.error("Skill or proficiency not selected"); return;}

    //turns beginner into BEGINNER for enum db write
    const enumProficiency = (proficiency as Proficiency).toUpperCase();

    //call api route for new engineer skill
    try {
      const res = await fetch("/api/engineer-skill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          skillName: String(skill),
          proficiency: enumProficiency, 
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        console.error("Failed to save engineer skill: ", data);
        return;
      }
      await refreshEngSkills();
      toast.success("Skill added successfully!");
      onClose();
    } catch (error) {
      console.error("Error submitting new skill:", error);
      toast.error((error as Error).message);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70  border border-white/10 shadow-2xl backdrop-blur.">
      <div className="w-full max-w-md overflow-hidden rounded-lg bg-modal shadow-lg">
        <form onSubmit={handleSubmit} id="skills-form" className="max-h-[85vh] overflow-y-auto p-7 pb-28 space-y-5 divider-y divider-white/5">
          <h2 className="mb-1 text-xl font-semibold text-white">Your Profile</h2>
          <p className="text-neutral-200">View your current Skill set below and complete the form fields to add a new one. Please note, when you add a new skill it will request approval from your line manager, so ensure you have evidence.</p>

          <div>
            <label htmlFor="profile" className=" block text-sm font-medium text-slate-100">Account Name </label>
            <input id="profile" type="text" required value={user?.name || ""} readOnly className="mt-2 w-full rounded border bg-white px-3 py-1.5 text-neutral-900" />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-slate-100">Role</label>
            <input id="roleName" type="text" required value={roleName || ""} readOnly className="w-full mt-2 rounded border bg-white px-3 py-1.5 text-neutral-900"></input>
          </div>
          
          <label htmlFor="skillSet" className="block text-sm font-medium mt-6 text-slate-100">
            Skill set: </label>
            <div className="flex flex-wrap gap-2">{ hasEngSkills ? ( engSkills.map((s) => (
              <span key={s.id} className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-900 shadow-sm">{s.skill.name}
                <span className="text-sky-700 px-1.5  text-[10px]"> {s.proficiency} </span></span>
                )) ) : (
                  <span className="text-sm text-slate-400 italic">No skills specified</span>)}
            </div>

          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            <SelectField id="skill" label="Add a skill" value={skill} onChange={(v) => setSkill(v)} options={skillOptions} placeholder="Select a skill"/> 
            <SelectField id="proficiency" label="Proficiency in selected skill" value={proficiency} onChange={(v) => setProficiency(v as Proficiency)} options={profOptions} placeholder="Select level" />
          </div>
         
        </form>

        <div className="sticky bottom-0 flex gap-2 border-t border-white/10 bg-modal/95 p-4 backdrop-blur">
          <button type="button" onClick={onClose} className="w-1/2 rounded border px-3 py-2 text-sm text-gray-200 hover:bg-white/5">
            Close
          </button>
          <button type="submit" form="skills-form" className="w-1/2 rounded bg-sky-600 px-3 py-2 text-sm text-white hover:bg-sky-700">
            Save
          </button>
        </div>
      </div>
    </div>
  );

}
