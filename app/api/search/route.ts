import type { MovieResult } from "@/types/movie";

import { processMovie } from "@/app/lib/pipeline";
import { getCache, setCache } from "@/app/lib/cache";

import { scrapeAll } from "@/scrapers";

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

  // fetch raw offers from scrapers
  const rawOffers = await scrapeAll(query);

  // build final movie object
  const results: MovieResult[] = [
    processMovie({
      id: 1,

      title: query || "Interstellar",

      year: "2014",

      poster:
        "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",

      rawOffers,
    }),
  ];

  // save to cache
  setCache(cacheKey, results);

  return Response.json(results);
}