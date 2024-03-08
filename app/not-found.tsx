import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-col w-full min-h-screen text-center justify-center flex">
      <div className=" ">
        <Image
          src="/error-404-.png"
          alt="404 image"
          layout="fill"
          className="mx-auto animate-bounce !relative !object-contain !h-[350px] !w-[350px]"
        />
      </div>
      <div className="mt-6">
        <h1 className="text-4xl text-gray-600 font-bold dark-text-gray-300">
          Page Not Found!!
        </h1>
        <div className="mt-4">
          <Link href="/" className="rounded text-white px-2 py-1 bg-sky-600">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
