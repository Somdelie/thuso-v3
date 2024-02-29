"use client";
import Link from "next/link";
// import "./home.css";
import { navLinks } from "@/data/data";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import MegaMenu from "./MegaMenu";
import { UserButton } from "@/components/auth/UserButton";
import { useSession } from "next-auth/react";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";

const Navbar = () => {
  const pathname = usePathname();
  const session = useSession();

  return (
    <nav
      className={`fixed w-full left-0 top-0 text-gray-700 z-30 px-8 
            dark:bg-gray-700/50 dark:text-gray-400 bg-white/50 backdrop-blur-xl`}
    >
      {/* lg devices */}
      <div className="flex items-center ">
        <div className="flex relative w-full justify-between items-center px-6 py-1 h-[50px]">
          {/* sm devices */}
          <div className="flex items-center gap-3">
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-1"
            >
              <Image
                src="/favicon.png"
                alt="Precedent logo"
                width="20"
                height="20"
                className=" rounded-sm"
              ></Image>
              <Link href="/" className="logo text-green font-semibold">
                Thuso.com
              </Link>
            </motion.span>
          </div>
          <ThemeSwitcher />
          <div className=" hidden sm:flex items-center gap-2 capitalize text-gray-600 dark:text-gray-400">
            {navLinks?.map((link: any, index) => (
              <Link
                href={link.link}
                key={index}
                className={
                  link.link === pathname
                    ? "hover:bg-roseRed bg-roseRed text-white px-2 transition rounded-full"
                    : "hover:bg-roseRed hover:text-white px-2 transition rounded-full"
                }
              >
                {link?.title}
              </Link>
            ))}
            <MegaMenu />
          </div>
          <ThemeSwitcher />
          {session.data ? (
            <div>
              <Link
                href="/projects/create"
                className="px-2 py-1 hidden sm:block bg-roseRed hover:bg-rose-800 rounded text-gray-200"
              >
                Post a Project
              </Link>
              <UserButton />
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-4">
                <Link href="/auth/login" className="font-semibold">
                  Log In
                </Link>
                <Link
                  href="/auth/register"
                  className="px-2 py-1 bg-roseRed hover:bg-rose-800 rounded text-gray-200"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </div>
        {/*------------------------------- Mobile Menu Toggle------------------------- */}
        <div className="relative md:hidden z-40">
          {/* <MobileNav navLinks={navLinks} user={user} pathname={pathname} /> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
