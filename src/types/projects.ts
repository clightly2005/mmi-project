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
    projectAssignment?: {
        user?: { name: string } | null;
    }[] | null;
};

export type ProjectRowProps = {
  id: number;
  title: string;
  description: string;       
  requiredSkills: { name: string; minProf: string }[];
  durationLabel?: string;  
  projectType?: string | null;
  assignedTo?: string | null;
};
 