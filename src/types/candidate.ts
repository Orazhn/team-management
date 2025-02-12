import { candidateStatus } from "./mainEnums";

export interface ICandidate {
  id?: number;
  candidateName: string;
  appliedFor: string;
  appliedDate: string;
  email: string;
  mobileNumber: string;
  candidateStatus: candidateStatus;
  updated_at?: Date;
}
