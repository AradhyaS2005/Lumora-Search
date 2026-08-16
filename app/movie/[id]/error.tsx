"use client";

import Link from "next/link";

export default function Error({
  reset, // function to  try rendering the page again
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-6 text-center">

      <h1 className="text-3xl font-bold">
        Something went wrong
      </h1>

      <p className="mt-3 text-gray-400">
        We couldn't load this movie right now.
      </p>

      <div className="flex gap-4 mt-8">

        <button
          onClick={() => reset()}
          className="px-5 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition"
        >
          Try again
        </button>

        <Link
          href="/"
          className="px-5 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 transition"
        >
          Go home
        </Link>

      </div>

    </main>
  );
}