"use client";

import { useSession } from "next-auth/react";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import UserButton from "./UserButton";

const AdminNavbar = () => {
  const user = useSession();

  return (
    <div className="w-full px-4 sticky border-b-2 dark:border-gray-900 dark:text-white top-0 left-0 bg-white dark:bg-gray-700 h-12 flex items-center justify-between">
      <div>
        {user ? (
          <div className="dark:text-gray-400 grid sm:grid-cols-2 text-sm sm:text-lg">
            Welcome back{" "}
            <span className="font-semibold dark:text-gray-200">
              {user.data?.user.name}
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="flex p-2 items-center gap-4">
        <div className=" items-center gap-2 hidden sm:flex">
          <ThemeSwitcher />
        </div>
        <span className="capitalize">{user.data?.user.role}</span>
        <UserButton />
      </div>
    </div>
  );
};

export default AdminNavbar;
