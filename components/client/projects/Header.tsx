import { Button } from "@/components/ui/button";
import { categories } from "@/data/data";
import { db } from "@/lib/db";
import { jobTypes } from "@/lib/job-types";
import { Filter } from "lucide-react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { jobFilterSchema } from "@/schemas";
import { redirect } from "next/navigation";

interface Metadata {
  title: string;
  // Add other properties as needed
}

async function filterJobs(formData: FormData) {
  "use server";

  const values = Object.fromEntries(formData.entries());

  const { q, type, location } = jobFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
  });

  redirect(`/?${searchParams.toString()}`);
}

export const Header = async ({ metadata }: { metadata: Metadata }) => {
  const locations = await db.job
    .findMany({
      where: { approved: true },
      select: {
        location: true,
      },
      distinct: ["location"],
    })
    .then((result) => result.map(({ location }) => location).filter(Boolean));

  return (
    <article className="max-w-[90%] mx-auto">
      <div className="w-full ">
        <ol className="flex w-full items-center font-semibold dark:text-gray-300">
          <li>
            <Link
              href="/"
              className="flex items-center hover:text-roseRed transition gap-1"
            >
              <FaHome />
              Home
            </Link>
          </li>
          <IoIosArrowForward className="mt-1" />
          <li className="capitalize">{metadata?.title}</li>
        </ol>
      </div>

      <div className="w-full mt-8 sm:mt-1 search">
        <form
          action={filterJobs}
          className="flex items-start sm:items-center p-2 gap-3 w-full "
        >
          <div className="grid relative items-center grow gap-4 bg-white dark:bg-gray-800 rounded sm:grid-cols-3">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                name="q"
                type="text"
                id="simple-search"
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-roseRed focus:border-roseRed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-roseRed dark:focus:border-primary-500"
                placeholder="Search"
              />
            </div>
            <select
              defaultValue=""
              className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-roseRed focus:border-roseRed block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-roseRed dark:focus:border-roseRed"
            >
              <option value="">All Types</option>
              {jobTypes.map((type) => (
                <option key={type || ""} value={type || ""}>
                  {type}
                </option>
              ))}
            </select>
            <select
              defaultValue=""
              className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-roseRed focus:border-roseRed block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-roseRed dark:focus:border-roseRed"
            >
              <option value="">All location</option>
              {locations.map((location) => (
                <option key={location || ""} value={location || ""}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <Button className="bg-gray-900 hover:bg-gray-950 rounded to-white">
            <Filter /> Apply filters
          </Button>
        </form>
      </div>
    </article>
  );
};
