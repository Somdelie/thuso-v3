"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { LogoutButton } from "./LogoutButton";
import {
  Briefcase,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";

export const UserButton = () => {
  const session = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="" alt="@shadcn" />
          <AvatarFallback className="text-white font-semibold">
            {session?.data?.user?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-2 dark:border-gray-800 dark:bg-gray-700 bg-white dark:text-gray-300">
        <DropdownMenuLabel className="text-gray-500">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="" />
        <DropdownMenuGroup className="border-b dark:border-gray-500">
          <DropdownMenuItem>
            <Link
              href="#"
              className="hover:bg-sky-500 dark:hover:bg-gray-800 rounded transition flex items-center w-full gap-3 px-2 py-1"
            >
              <User className="text-gray-500" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href="#"
              className="hover:bg-sky-500 dark:hover:bg-gray-800 rounded transition flex items-center w-full gap-3 px-2 py-1"
            >
              <LayoutDashboard className="text-gray-500" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href="#"
              className="hover:bg-sky-500 dark:hover:bg-gray-800 rounded transition flex items-center w-full gap-3 px-2 py-1"
            >
              <Settings className="text-gray-500" />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuLabel className="text-gray-500">
          Quick Access
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="border-b dark:border-gray-500">
          <DropdownMenuItem>
            <Link
              href="#"
              className="hover:bg-sky-500 dark:hover:bg-gray-800 rounded transition flex items-center w-full gap-3 px-2 py-1"
            >
              <Briefcase className="text-gray-500" />
              New Project
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href="#"
              className="hover:bg-sky-500 dark:hover:bg-gray-800 rounded transition flex items-center w-full gap-3 px-2 py-1"
            >
              <HelpCircle className="text-gray-500" />
              Support
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-gray-500">Api</DropdownMenuLabel>
        <LogoutButton>
          <DropdownMenuItem className="gap-3 bg-sky-500 text-white cursor-pointer hover:opacity-75 dark:bg-gray-800 rounded px-4 py-1">
            <LogOut />
            Log out
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
