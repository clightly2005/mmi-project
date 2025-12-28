export type ProjectWithSkills = {
    id: number,
    title: string,
    description: string,
    durationWeeks: number,
    projectSkill: {
        minLevel: string,
        skill: { name: string },
    }[];
    projectType?: string | null;
};

export type ProjectRowProps = {
  id: number;
  title: string;
  description: string;       
  requiredSkills: { name: string; minProf: string }[];
  durationLabel?: string;  
  projectType?: string | null;
};
 