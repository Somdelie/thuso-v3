import { db } from "@/lib/db";

export async function getJobs() {
  const jobs = await db.job.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
    include: {
      author: true,
    },
  });
  console.log(jobs);
  return jobs;
}
