import { processStatus } from "./mainEnums";
export interface IProject {
  srNo: number;
  projectName: string;
  startDate: Date;
  finishDate: Date;
  status: processStatus;
  employersId: number[];
}
