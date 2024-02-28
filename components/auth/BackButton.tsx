"use client";
import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
  linkTo: string;
}

export default function BackButton({ href, label, linkTo }: BackButtonProps) {
  return (
    <div className="w-full flex gap-1 text-blue-600 items-center">
      {label}
      <Link href={href} className="underline font-semibold">
        {linkTo}
      </Link>
    </div>
  );
}
