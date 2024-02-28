import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";

export default function Social() {
  return (
    <div className="flex items-center gap-x-2 w-full">
      <Button className="w-full" size="lg" variant="outline" onClick={() => {}}>
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button className="w-full" size="lg" variant="outline" onClick={() => {}}>
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
}
