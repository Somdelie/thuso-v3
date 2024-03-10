import { Header } from "@/components/client/projects/Header";
import { JobResults } from "@/components/client/projects/JobResults";

export const metadata = {
  title: "Jobs",
};

const Jobs = async () => {
  return (
    <section className="min-h-screen py-8 px-4 sm:py-16 lg:px-6 ">
      <Header metadata={metadata} />
      <JobResults />
    </section>
  );
};

export default Jobs;
