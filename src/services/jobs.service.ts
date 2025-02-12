import db from "@/db/drizzle";
import { jobs } from "@/db/schema/jobs";
import { IJob } from "@/types/job";
import { eq } from "drizzle-orm";

class Jobs {
  postJob = async (job: IJob) => {
    await db.insert(jobs).values(job);
  };

  getJobs = async () => {
    const data = await db.select().from(jobs);
    return data;
  };
  deleteJob = async (id: number) => {
    await db.delete(jobs).where(eq(jobs.id, id));
  };
}

export const jobClass = new Jobs();
