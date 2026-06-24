"use client";

import BackButton from "@/app/components/BackButton";
import MovieCard from "@/app/components/MovieCard";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { MovieResult } from "@/types/movie";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const [movies, setMovies] = useState<MovieResult[]>([]);
  const [loading, setLoading] = useState(false);

 useEffect(() => {
  if (!query) return;

  setLoading(true);

  fetch(`/api/search?q=${encodeURIComponent(query)}`)
    .then(async (res) => {
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Search failed");
      }

      return data;
    })
    .then((data) => {
      setMovies(Array.isArray(data) ? data : []);
    })
    .catch((err) => {
      console.error("Search error:", err);
      setMovies([]);
    })
    .finally(() => {
      setLoading(false);
    });
}, [query]);

  return (
  <div className="relative pt-12">
    <BackButton />

    <h1 className="m-4 text-xl font-semibold">
      Search Results for: {query}
    </h1>

    {/* LOADING STATE */}
    {loading && (
      <p className="m-4 text-gray-400">Loading...</p>
    )}

    {/* EMPTY STATE */}
    {!loading && movies.length === 0 && (
      <p className="m-4 text-gray-400">No results found</p>
    )}

    {/* RESULTS */}
    <div className="grid gap-4 m-4">
      {!loading &&
        movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
    </div>
  </div>
);
}