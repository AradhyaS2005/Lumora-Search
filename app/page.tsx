import SearchBar from "./components/SearchBar";
import { getPopularMovies } from "@/app/lib/tmdb";
import Link from "next/link";

export default async function Home() {
  let popularMovies = [];

  try {
    popularMovies = await getPopularMovies();
  } catch (error) {
    console.error("Failed to fetch popular movies:", error);
  }

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-6 text-center">
        {/*small label*/}
        <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-5">
          Streaming Search
        </p>

        {/*main heading*/}
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
          Lumora
        </h1>

        {/*subtitle*/}
        <p className="mt-5 max-w-xl text-lg text-gray-400">
          Find where your favourite movies and TV shows are streaming, renting,
          or available to buy.
        </p>

        {/*search*/}
        <div className="mt-8">
          <SearchBar />
        </div>

        {/*Popular Searches*/}
        <div className="mt-16 w-full max-w-6xl">
          <h2 className="text-2xl font-semibold mb-6">Popular right now</h2>

          {popularMovies.length > 0 ? (
            <div className="flex justify-center gap-5 overflow-x-auto pb-4">
              {popularMovies.slice(0, 6).map((movie: any) => (
                <Link
                  key={movie.id}
                  href={`/movie/${movie.id}`}
                  className="w-37.5 shrink-0 group"
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/placeholder-movie.png"
                    }
                    alt={movie.title}
                    className="w-full aspect-2/3 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />

                  <p className="mt-2 text-sm font-medium truncate group-hover:text-gray-300">
                    {movie.title}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center text-gray-500">
              <p>Popular movies are temporarily unavailable.</p>
              <p className="mt-1 text-sm">
                You can still search for a movie above.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
