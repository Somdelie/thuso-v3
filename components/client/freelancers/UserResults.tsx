import { db } from "@/lib/db";

const UserResults = async () => {
  const users = await db.user.findMany({
    where: { isAproved: true },
    orderBy: { createdAt: "desc" },
  });
  return (
    <div>
      {users?.map((user) => (
        <div key={user.id}>
          <h1>{user?.name}</h1>
        </div>
      ))}
    </div>
  );
};

export default UserResults;
