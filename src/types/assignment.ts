export type Assignment = {
  id: number;
  startDate: string;
  endDate: string;
  project: {
    title: string;
    durationWeeks: number;
  };
};
//types set for the expected API return so runtime mistakes are reduced