import { getJobById } from "@/data/user";

const SingleUser = async ({ params }: { params: { id: string } }) => {
  const jobId = params.id;

  const job = await getJobById(jobId);

  //   console.log(user);

  return (
    <section className="min-h-screen py-8 px-4 sm:py-16 lg:px-6 ">
      <h1>Job: {job?.title}</h1>
      <p>{job?.author?.name}</p>
    </section>
  );
};

export default SingleUser;
