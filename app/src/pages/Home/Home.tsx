import React from "react";

import { SearchBar, MovieList } from "../../components";

export default function Home() {
  return (
    <div className="home">
      <h1>Movie Catalog</h1>

      <SearchBar />

      <MovieList />
    </div>
  );
}
