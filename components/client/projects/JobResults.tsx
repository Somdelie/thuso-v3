import JobListItem from "@/components/ui/JobListItem";
import { db } from "@/lib/db";
import React from "react";

export const JobResults = async () => {
  const jobs = await db.job.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="mx-auto mt-4 gap-4 overflow-hidden grid sm:grid-cols-3 max-w-[90%] ">
      {jobs?.map((job) => <JobListItem job={job} key={job.id} />)}
    </div>
  );
};
