import UserCard from "@/components/client/freelancers/Card";
import UserResults from "@/components/client/freelancers/UserResults";
import { Card } from "@/components/ui/card";
import { freelancers } from "@/data/data";
import { db } from "@/lib/db";

export const metadata = {
  title: "freelancers",
};

const Freelancers = async () => {
  const users = await db.user.findMany({
    where: { isAproved: true },
    orderBy: { createdAt: "desc" },
  });
  return (
    <section className="min-h-screen py-8 px-4 sm:py-16 lg:px-6 ">
      <div className="mx-auto mt-4 gap-4 overflow-hidden grid sm:grid-cols-3 max-w-[90%] ">
        {users?.map((user) => <UserCard key={user.id} user={user} />)}
      </div>
    </section>
  );
};

export default Freelancers;
