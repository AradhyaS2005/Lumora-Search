import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-6 text-center">

      <h1 className="text-3xl font-bold">
        Movie not found
      </h1>

      <p className="mt-3 text-gray-400">
        We couldn't find the movie you're looking for.
      </p>

      <Link
        href="/"
        className="mt-8 px-5 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 transition"
      >
        Go home
      </Link>

    </main>
  );
}