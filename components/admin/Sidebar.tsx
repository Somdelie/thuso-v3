"use client";
import { Divider } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillSchedule } from "react-icons/ai";
import {
  FaFileInvoiceDollar,
  FaInbox,
  FaMapMarkedAlt,
  FaUserFriends,
} from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import { MdOutlineDashboardCustomize, MdSettings } from "react-icons/md";
import { SiFreelancer } from "react-icons/si";
import { TbMessageReport } from "react-icons/tb";

export const AdminLinks = [
  {
    title: "Dashboard",
    link: "/admin",
    icon: <MdOutlineDashboardCustomize />,
  },
  {
    title: "Users",
    link: "/admin/users",
    icon: <FaUserFriends />,
  },
  {
    title: "Users Map",
    link: "/admin/users/map",
    icon: <FaMapMarkedAlt />,
  },
  {
    title: "Jobs",
    link: "/admin/jobs",
    icon: <GrProjects />,
  },
  {
    title: "Freelancers",
    link: "/admin/freelancers",
    icon: <SiFreelancer />,
  },
  {
    title: "Inbox",
    link: "/admin/inbox",
    icon: <FaInbox />,
  },
];

const Others = [
  {
    title: "Settings",
    link: "/admin/settings",
    icon: <MdSettings />,
  },
  {
    title: "Schedules",
    link: "/admin/schedules",
    icon: <AiFillSchedule />,
  },
  {
    title: "Reports",
    link: "/admin/reports",
    icon: <TbMessageReport />,
  },
  {
    title: "Invoices",
    link: "/admin/invoices",
    icon: <FaFileInvoiceDollar />,
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="h-screen w-12 border-r-2 dark:text-gray-300 dark:border-gray-900 sm:w-[250px] sticky left-0 top-0 overflow-x-hidden bg-white dark:bg-gray-700">
      <div className="h-12 flex dark:border-gray-900 items-center border-b-2 justify-center g1">
        <Image
          src="/favicon.png"
          alt="Precedent logo"
          width="20"
          height="20"
          className=" rounded-sm"
        ></Image>
        <Link href="/" className="logo hidden sm:flex text-green font-semibold">
          Thuso.com
        </Link>
      </div>
      <div className="px-2 my-3 text-xs sm:text-[16px] text-gray-400">Main</div>
      <div className="space-y-2 ">
        {AdminLinks.map((link) => (
          <Link
            href={link.link}
            className={
              link.link === pathname
                ? "flex px-3 py-1 bg-sky-600 dark:bg-gray-900 hover:text-white items-center gap-2"
                : "flex px-3 py-1 hover:bg-sky-600 hover:dark:bg-gray-900 hover:text-white items-center gap-2"
            }
            key={link.title}
          >
            <span className="">{link?.icon}</span>
            <span className="hidden sm:flex">{link.title}</span>
          </Link>
        ))}
      </div>
      <Divider sx={{ marginY: 1 }} />
      <span className="mt-8 pt-2 text-xs sm:text-[16px] text-gray-400 px-2">
        Others
      </span>
      <div className="space-y-2 mt-2">
        {Others.map((link) => (
          <Link
            href={link.link}
            className={
              link.link === pathname
                ? "flex px-3 py-1 bg-sky-600 hover:text-white items-center gap-2"
                : "flex px-3 py-1 hover:bg-sky-600 hover:text-white items-center gap-2"
            }
            key={link.title}
          >
            <span className="">{link?.icon}</span>
            <span className="hidden sm:flex">{link.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
