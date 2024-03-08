"use client";
import { Job } from "@prisma/client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { MdLocationCity } from "react-icons/md";
import { Divider } from "@mui/material";
import { Banknote, Globe2, MapPin } from "lucide-react";

interface JobListItemProps {
  job: Job;
}

const variants = {
  hidden: { y: 100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1 } },
};

export default function JobListItem({
  job: {
    title,
    type,
    salary,
    approved,
    createdAt,
    description,
    id,
    location,
    locationType,
  },
}: JobListItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <motion.div
      initial="hidden"
      variants={variants}
      whileInView="visible"
      animate={isInView && "animation"}
      className=" bg-white dark:bg-gray-700 p-4 dark:text-gray-400"
    >
      <span className="text-roseRed font-semibold">{title}</span>
      <div className="flex gap-2 ">
        <Link href="#">
          <p className="text-[14px]">{description?.slice(0, 65)}...</p>
          <span className="text-xs text-gray-500 flex gap-1 items-center mt-2">
            <MapPin size={16} />
            {locationType}
          </span>
          <span className="text-xs text-gray-500 flex gap-1 items-center mt-2">
            <Globe2 size={16} />
            {location || "Worldwide"}
          </span>
          <span className="text-xs text-gray-500 flex gap-1 items-center mt-2">
            <Banknote size={16} />
            {type}
          </span>
        </Link>
      </div>
      <Divider sx={{ borderColor: "gray", marginY: 2 }} />
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2 ">
            <span className="">posted by:</span>
            <h1>John Ndoe</h1>
          </div>
        </div>
        <button className="bg-roseRed2 dark:bg-gray-900 hover:bg-transparent transition hover:text-roseRed2 hover:border-roseRed2 border border-gray-800 text-gray-100 px-2 py-1 rounded">
          Send Proposal
        </button>
      </div>
    </motion.div>
  );
}

{
  /* <article className="flex gap-3 border border-gray-400 dark:border-gray-700 dark:hover:bg-gray-900 rounded p-5 hover:bg-muted/60">
<Image
  src="/placeholder.png"
  alt="logo"
  width={100}
  height={100}
  className="rounded self-center"
/>
<div className="flex-grow space-y-3">
  <div>
    <h2 className="text-xl font-medium text-gray-900 capitalize dark:text-gray-200">
      {title}
    </h2>

    <p className="text-gray-400">{type.toLowerCase()}</p>
  </div>
</div>
</article> */
}
