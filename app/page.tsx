import SearchBar from "./components/SearchBar";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-gray-400 mb-6">
        Find where to stream movies & TV shows
      </p>
      <SearchBar />
      </div>
    </main>
  );
}