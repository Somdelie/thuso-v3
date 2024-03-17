import JobListItem from "@/components/ui/JobListItem";
import { db } from "@/lib/db";
import { Divider } from "@mui/material";
import { Banknote, Globe2, MapPin } from "lucide-react";
import Link from "next/link";
import React from "react";

export const JobResults = async () => {
  const jobs = await db.job.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });
  return (
    <div className="mx-auto mt-4 gap-4 overflow-hidden grid sm:grid-cols-3 max-w-[90%] ">
      {jobs?.map((job) => (
        <div
          key={job.id}
          className=" bg-white dark:bg-gray-700 p-4 dark:text-gray-400"
        >
          <span className="text-roseRed font-semibold">{job.title}</span>
          <div className="flex gap-2 ">
            <Link href={`/projects/${job.id}`}>
              <p className="text-[14px]">{job.description?.slice(0, 65)}...</p>
              <span className="text-xs text-gray-500 flex gap-1 items-center mt-2">
                <MapPin size={16} />
                {job.locationType}
              </span>
              <span className="text-xs text-gray-500 flex gap-1 items-center mt-2">
                <Globe2 size={16} />
                {job.location || "Worldwide"}
              </span>
              <span className="text-xs text-gray-500 flex gap-1 items-center mt-2">
                <Banknote size={16} />
                {job.type}
              </span>
            </Link>
          </div>
          <Divider sx={{ borderColor: "gray", marginY: 2 }} />
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-2 ">
                <span className="">posted by:</span>
                <h1>{job.author?.name}</h1>
              </div>
            </div>
            <button className="bg-roseRed2 dark:bg-gray-900 hover:bg-transparent transition hover:text-roseRed2 hover:border-roseRed2 border border-gray-800 text-gray-100 px-2 py-1 rounded">
              Send Proposal
            </button>
          </div>
        </div>
        // <JobListItem job={job} key={job.id} author={job.author as any} />
      ))}
    </div>
  );
};
