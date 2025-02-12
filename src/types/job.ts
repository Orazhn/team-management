import { jobTypes } from "./mainEnums";

export interface IJob {
  id?: number;
  title: string;
  description: string;
  salary: number;
  location: string;
  jobType: jobTypes;
  categories: string[];
  updated_at?: Date;
}
