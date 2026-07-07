import SearchBar from "./components/SearchBar";

export default function Home() {
  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="text-center max-w-3xl px-6">
        <h1 className="text-6xl font-bold mb-6">
          Find Your Next Stream
        </h1>

        <p className="text-xl text-gray-400 mb-10">
          Search across streaming platforms and instantly discover
          where your favorite movies and TV shows are available.
        </p>

        <SearchBar />
      </div>
    </main>
  );
}