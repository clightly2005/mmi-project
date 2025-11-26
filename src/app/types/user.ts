export type User = {
  id: number;
  firebaseUid: string;
  email: string;
  name: string;
  role: "ENGINEER" | "PM";
  engineerRoleId?: number | null;
  engineerRole?: { id: number; name: string } | null;
  engineerSkills?: { id: number; proficiency: string; skill: { id: number; name: string } }[];
};
