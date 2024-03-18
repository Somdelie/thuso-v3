import { DataTable } from "@/components/admin/JobsTable";
import { db } from "@/lib/db";

export const metadata = {
  desc: "Jobs",
};

const jobsPage = async () => {
  const jobs = await db.job.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });

  // Map over the jobs and populate the authorName property
  const jobsWithAuthorName = jobs.map((job) => ({
    ...job,
    authorName: job.author?.name ?? "Unknown Author",
  }));

  // console.log(jobs);

  return (
    <div>
      <h2 className="font-semibold dark:text-gray-300 px-2">
        {metadata?.desc}
      </h2>
      {/* 
      {jobs?.map((job) => (
        <div key={job?.id}>
          <p>{job.author?.name}</p>
          <p>{job.authorEmail}</p>
          <p>{job.title}</p>
        </div>
      ))} */}

      <DataTable jobs={jobsWithAuthorName as any} />
    </div>
  );
};

export default jobsPage;
