import { db } from "@/lib/db";

export async function getJobs() {
  const jobs = await db.job.findMany({
    select: {
      title: true,
      createdAt: true,
      description: true,
      id: true,
      approved: true,
      location: true,
      locationType: true,
      salary: true,
      type: true,
      updatedAt: true,
    },
  });
  console.log(jobs);
  return jobs;
}
