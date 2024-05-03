import Link from "next/link";
import Image from "next/image";

import placeholder from "@/assets/placeholder.svg"

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gray-50 p-6 dark:bg-gray-950 sm:p-10">
      <Image
        alt="Not Found"
        className="mb-8 max-w-[300px] sm:max-w-[400px]"
        width={400}
        height={400}
        src={placeholder}
      />
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Page Not Found
        </h1>
        <p className="max-w-[420px] text-gray-500 dark:text-gray-400">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          href="#"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
