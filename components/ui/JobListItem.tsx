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
  author?: any;
}

const variants = {
  hidden: { y: 100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1 } },
};

export default function JobListItem() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <motion.div
      initial="hidden"
      variants={variants}
      whileInView="visible"
      animate={isInView && "animation"}
      className=" bg-white dark:bg-gray-700 p-4 dark:text-gray-400"
    ></motion.div>
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
