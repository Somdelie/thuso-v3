"use client";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

export default function Social() {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: "/",
    });
  };
  return (
    <div className="flex items-center gap-x-2 w-full">
      <Button
        className="w-full dark:bg-gray-600 bg-gray-300 dark:text-gray-300 dark:hover:bg-gray-500 rounded"
        size="lg"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        className="w-full dark:bg-gray-600 bg-gray-300 dark:text-gray-300 dark:hover:bg-gray-500 rounded"
        size="lg"
        variant="outline"
        onClick={() => onClick("github")}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
}
