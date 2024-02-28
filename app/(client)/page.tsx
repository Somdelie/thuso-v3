import { auth } from "@/auth";
import React from "react";

const page = async () => {
  const session = await auth();
  return (
    <div>
      <h1>{session?.user?.email}</h1>
      <h2>{session?.user?.name}</h2>
    </div>
  );
};

export default page;
