import React from "react";

import "./Home.scss";
import { SearchBar, MovieList } from "../../components";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <header>
        <h1>Movie Catalog</h1>
        <Link to="/details/-1">
          <span>Create</span>
        </Link>
      </header>

      <SearchBar />

      <MovieList />
    </div>
  );
}
