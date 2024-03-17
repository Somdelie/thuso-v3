import { getUserById } from "@/data/user";
import { db } from "@/lib/db";

const SingleUser = async ({ params }: { params: { id: string } }) => {
  const userId = params.id;

  const user = await getUserById(userId);

  //   console.log(user);

  return (
    <section className="min-h-screen py-8 px-4 sm:py-16 lg:px-6 ">
      <h1>User: {user?.name}</h1>
      <h2>{user?.jobType}</h2>
      <p>{user?.about}</p>
      <p>
        {user?.address?.city}, {user?.address?.state}, {user?.address?.street}
      </p>
    </section>
  );
};

export default SingleUser;
