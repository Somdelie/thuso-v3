"use client";

import { Avatar } from "@mui/material";
import { LogOut, Settings, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LogoutButton } from "../auth/LogoutButton";
import { ThemeSwitcher } from "../ui/ThemeSwitcher";

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const user = useSession();
  const menuRef = useRef<HTMLDivElement>(null); // Specify the type of ref

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Specify the type of event
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        // Assert event.target as Node
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        <div className="relative" ref={menuRef}>
          <Avatar
            onClick={handleOpen}
            sx={{ backgroundColor: "green", cursor: "pointer" }}
          >
            {user?.data?.user.name?.charAt(0)}
          </Avatar>
          {isOpen ? (
            <div className="absolute border dark:border-gray-900 top-11 -right-4 shadow rounded-b bg-white dark:bg-gray-700">
              <div className="p-2 bg-sky-600">
                <p className="text-xs">{user.data?.user.email}</p>
              </div>
              <div className="py-4">
                <Link
                  href="#"
                  className="flex items-center gap-4 px-4 py-2 border-b border-gray-500 hover:bg-gray-900"
                >
                  <User /> Profile
                </Link>
                <Link
                  href="#"
                  className="flex border-b border-gray-500 items-center gap-4 px-4 py-2 hover:bg-gray-900"
                >
                  <Settings /> Settings
                </Link>
                <LogoutButton>
                  <span className="flex items-center gap-4 px-4 py-2 hover:bg-gray-900">
                    <LogOut />
                    Log out
                  </span>
                </LogoutButton>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
