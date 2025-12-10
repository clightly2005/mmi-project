export type ProjectWithSkills = {
    id: number,
    title: string,
    description: string,
    durationWeeks: number,
    projectSkill: {
        minLevel: string,
        skill: { name: string },
    }[];
};

export type ProjectRowProps = {
  id: number | string;
  title: string;
  description: string;       
  requiredSkills: { name: string; minProf: string }[];
  durationLabel?: string;  
};
 