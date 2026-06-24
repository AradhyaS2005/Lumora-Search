import type { MovieResult } from "@/types/movie";
import { processMovie } from "@/app/lib/pipeline";
import { getCache, setCache } from "@/app/lib/cache";
import { scrapeAll } from "@/scrapers";
import { searchMovies } from "@/app/lib/tmdb"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q") ?? "";

  // cache key
  const cacheKey = `search:${query}`;

  // check cache FIRST
  const cached = getCache(cacheKey);

  if (cached) {
    return Response.json(cached);
  }

  // fetch movies from TMDB
  let movies = [];

try {
  movies = await searchMovies(query);
} catch (err) {
  console.error("TMDB search failed:", err);

  return Response.json(
    {
      error: "Movie search temporarily unavailable",
    },
    {
      status: 500,
    }
  );
}

  const results: MovieResult[] = await Promise.all(
    movies.slice(0,5).map(async (movie: any) => {
      const rawOffers = await scrapeAll(movie.title)
      
      
      return processMovie({
        id: movie.id,
        title: movie.title,
        year: movie.release_date?.slice(0,4) || "Unknown",
        poster:
        movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "",
        rawOffers,
      })
    })
  )

  return Response.json(results)
}