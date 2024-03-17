import { DataTable } from "@/components/ui/DataTable";
import { db } from "@/lib/db";
import React from "react";

export const metadata = {
  desc: "freelancers",
};

const freelancersPage = async ({}) => {
  const users = await db.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h2 className="font-semibold dark:text-gray-300 capitalize px-2">
        {metadata?.desc}
      </h2>
      <div className="overflow-hidden">
        {/* <DataTable users={users as any} /> */}
        <DataTable users={users as any} />
      </div>
    </div>
  );
};

export default freelancersPage;
