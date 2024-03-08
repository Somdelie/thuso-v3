import { getJobs } from "@/actions/get-jobs";
import { Header } from "@/components/client/projects/Header";
import JobListItem from "@/components/ui/JobListItem";
import { db } from "@/lib/db";

export const metadata = {
  title: "Jobs",
};

// async function getJobs() {
//    const jobs = await db.job.findMany({
//      select: {
//        title: true,
//        createdAt: true,
//        description: true,
//        id: true,
//        approved: true,
//        location: true,
//        locationType: true,
//        salary: true,
//        type: true,
//        updatedAt: true,
//      },
//    });
//    console.log(jobs);
//    return jobs;
//  }
const Jobs = async () => {
  const jobs = await db.job.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="min-h-screen py-8 px-4 sm:py-16 lg:px-6 ">
      <Header metadata={metadata} />
      <div className="mx-auto mt-4 gap-4 overflow-hidden grid sm:grid-cols-3 max-w-[90%] ">
        {jobs?.map((job) => <JobListItem job={job} key={job.id} />)}
      </div>
    </section>
  );
};

export default Jobs;
