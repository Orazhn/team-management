import db from "@/db/drizzle";
import { candidates } from "@/db/schema/candidates";
import { ICandidate } from "@/types/candidate";
import { candidateStatus } from "@/types/mainEnums";

class Candidates {
  postCandidate = async (candidate: ICandidate) => {
    await db.insert(candidates).values(candidate);
  };

  getCandidates = async () => {
    const data = await db.select().from(candidates);
    return data;
  };
  updateCandidateStatus = async (status: candidateStatus) => {
    await db.update(candidates).set({ candidateStatus: status });
  };
}

export const candidateClass = new Candidates();
