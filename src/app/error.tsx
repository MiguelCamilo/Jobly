"use client";

// import Link from "next/link";

import { AlertOctagonIcon } from "lucide-react";

const Error = () => {
  return (
    <div className="flex min-h-screen items-center justify-center space-y-10 px-4">
      <div className="flex flex-col items-center space-y-2 text-center">
        <AlertOctagonIcon className="size-10 text-red-600" />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            <span className='text-red-600'>Uh oh!</span> Something went <span className='text-red-600'>wrong.</span>
          </h1>
          <p className="text-gray-500">
            Dont worry, were on it. Please try again in a few moments.
          </p>
        </div>
        {/* <Link
          className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900"
          href="/"
        >
          Home
        </Link> */}
      </div>
    </div>
  );
};

export default Error;
