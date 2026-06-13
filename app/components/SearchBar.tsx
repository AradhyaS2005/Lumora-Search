"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {

  const [query, setQuery] = useState("");

  const router = useRouter();

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {

    if (
      e.key === "Enter" &&
      query.trim() !== ""
    ) {

      router.push(
        `/search?q=${encodeURIComponent(query)}`
      );
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>

      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}

        onChange={(e) =>
          setQuery(e.target.value)
        }

        onKeyDown={handleKeyDown}

        style={{
          padding: "10px",
          width: "300px",
          border: "1px solid gray",
          borderRadius: "5px",
        }}
      />

    </div>
  );
}