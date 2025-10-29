import { Duration, Proficiency, Focus, Skill } from "../types/modal"


//Arrays to render the options in the dropdowns - replace with api later
export const Skills: Readonly<Skill[]> = [ "Python", "PowerCLI", "PowerShell", "Groovy", "Ruby", "Go",
      "Typescript", "Javascript", "HTML", "CSS", "React", "Next.js", "C#", "C++", "C", "Java", "SQL"
];

export const Focuses: Readonly<Focus[]> = ["Front-end", "Back-end", "Full-stack"];

export const Durations: Readonly<Duration[]> = ["1 week", "2 weeks", "3 weeks", "4 weeks", "1-2 months", "3-4 months", "4-6 months", "6+ months"];

export const Proficiencies: Readonly<Proficiency[]> = ["Novice", "Beginner", "Intermediate","Advanced", "Expert"];

