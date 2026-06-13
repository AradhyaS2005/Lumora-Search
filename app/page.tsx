import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";

export default function Home() {
  return (
    <main>
      <NavBar />
      <h1>Lumora Search</h1>
      <SearchBar />
    </main>
  );
}