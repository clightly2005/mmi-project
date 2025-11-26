export type EngSkill = {
    id: number;
    userId: number;
    skillId: number;
    proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    skill: {
        id: number;
        name: string;
    };
};
